import ClassProto from '../class-proto';
import defaults from './tween-defaults';
import TweenPlanner from './planner';
import tweener from './tweener';

/**
 * TODO:
 *  - add `p`, `isForward` and `isYoyo` parameters for `onUpdate`
 *  - add `reverse` callback
 *  - add `onProgress` callback
 *  - make new `playBackward` function
 *  - make new `replayBackward` function
 *  - add `p` and `isForward` parameter for `onProgress`
 *  - if jump - the `onUpdate` should be called just once
 *  - make `setSpeed` work
 *  - get rid of `_elapsed`
 *  - cover `_vars`
 */

export default class Tween extends ClassProto {
  /**
   * constructor - needed to get to bounded `_envokeCallBacks`
   *               and `_envokeCallBacksRev` functions.
   *
   * @param  {Object} Options.
   *
   * @extends ClassProto.
   * @return {Object} This tween.
   */
  constructor(o) {
    super(o);

    const { isReverse } = this._props;
    // `shorthand` to `_envokeCallBacks`
    this._cb = this._envokeCallBacks;
    // `shorthand` to `_envokeCallBacksRev`
    this._cbr = this._envokeCallBacksRev;
  }
  /**
   * _declareDefaults - function to declare module defaults.
   *                    In this case defaults are the `tween defaults`
   *                    since we will plan for tween.
   * @private
   * @extends ClassProto.
   */
  _declareDefaults() { return this._defaults = defaults; }

  /**
   * _vars - function do declare `variables` after `_defaults` were extended
   *         by `options` and saved to `_props`
   * @extends ClassProto.
   */
  _vars() {
    this._planner = new TweenPlanner(this._o);
    this._plan = this._planner._plan;

    /**
     * TODO: cover
     */
    this._prevTime = -Infinity;

    /**
     * TODO: cover
     */
    this._totalTime = this._planner._totalTime;

    /**
     * TODO: cover
     */
    this._resumeTime = undefined;

    /**
     * TODO: cover
     */
    this._elapsed = 0;
    this._frameIndex = -1;

    /**
     * TODO: cover
     */
    this._negativeShift = 0;

    /**
     * TODO: cover
     */
    this._isReversed = false;

    /**
     * TODO: cover
     */
    this._state = 'stop';

    /**
     * TODO: cover
     */
    this._prevState = 'stop';

    // forward triggers
    this._trgFwd = [ 4, 16, 256, 64, 1024 ];
    // reverse triggers
    this._trgRev = [ 8, 32, 512, 128, 2048 ];
    // triggers to invoke callbacks
    this._trg = this._trgFwd;
  }

  /**
   * _setStartTime - function to set animation start time.
   *
   * @private
   * @param {Number} Time to set.
   */
  _setStartTime(time) {
    const { shiftTime, isReverse } = this._props;
    let { delay, duration } = this._props;

    if (time === undefined) { time = performance.now(); }
    // set starting point for tween animation
    this._startPoint = time;
    // for reverse tweens the start time should not be delayed since tween can't
    // have delay at the end:
    // |---=====|---=====|---=====|  <<< backward
    //                            ^
    delay = (isReverse) ? 0 : delay;
    // start time of the tween is `startPoint` + `delay`
    this._startTime = this._startPoint + delay;
    // add shifts to the start time
    // - negativeShift is negative delay in options hash
    // - shift time is shift of the parent
    this._startTime += this._negativeShift + shiftTime;
    // periodStart is used to calculate progress for `onUpdate`
    this._periodStart = this._startTime - (delay + duration);
    // set play time to the startTimes
    // if playback controls are used - use _resumeTime as play time,
    // else use shifted startTime -- shift is needed for timelines append chains
    this._playTime = (this._resumeTime !== undefined)
      ? this._resumeTime : time + shiftTime;
    // reset the resume time
    this._resumeTime = undefined;
  }

  /**
   * _setPlaybackState - Method set playback state string.
   *
   * @private
   * @param {String} State name
   */
  _setPlaybackState(state) {
    // save previous state
    this._prevState = this._state;
    this._state = state;

    // get previous state
    const wasPause = this._prevState === 'pause';
    const wasStop = this._prevState === 'stop';
    const wasPlay = this._prevState === 'play';
    const wasReverse = this._prevState === 'playBackward';
    const wasPlaying = wasPlay || wasReverse;
    const wasStill = wasStop || wasPause;

    if ((state === 'play' || state === 'playBackward') && wasStill) {
      this._props.onPlaybackStart();
    }
    if (state === 'pause' && wasPlaying) {
      this._props.onPlaybackPause();
    }
    if (state === 'stop' && (wasPlaying || wasPause)) {
      this._props.onPlaybackStop();
    }
  }

  /**
   * _subPlay - Method to launch play. Used as launch
   *            method for bothplay and reverse methods.
   *
   * @private
   * @param {Number} Shift time in milliseconds.
   * @param {String} Play or reverse state.
   */
  _subPlay(shift = 0, state) {
    // check if direction of playback changes,
    // if so, the _progressTime needs to be flipped
    const _state = this._state;
    const _prevState = this._prevState;

    const isPause = _state === 'pause';
    const isPlay = _state === 'play';
    const isPlayBackward = _state === 'playBackward';
    const isPrevPlayBackward = _prevState === 'playBackward';
    const wasPlay = (isPlay || ( isPause && _prevState === 'play'));
    const wasReverse = (isPlayBackward || (isPause && isPrevPlayBackward));
    const isFlip = (wasPlay && state === 'playBackward') ||
                   (wasReverse && state === 'play');
    // if tween was ended, set progress to 0 if not, set to elapsed progress
    this._elapsed = (this._elapsed >= this._totalTime) ? 0 : this._elapsed;
    // flip the _elapsed if playback direction changed
    if (isFlip) { this._elapsed = this._totalTime - this._elapsed; }
    // set resume time and normalize prev/start times
    this._setResumeTime(state, shift);
    // add self to tweener = play
    tweener.add(this);
    return this;
  }

  /**
   * _setResumeTime - Method to set _resumeTime, _startTime and _prevTime.
   *
   * @private
   * @param {String} Current state. [play, reverse]
   * @param {Number} Time shift.
   */
  _setResumeTime(state, shift = 0) {
    // get current moment as resume time
    this._resumeTime = performance.now();
    // set start time regarding passed `shift` and `procTime`
    const startTime = this._resumeTime - Math.abs(shift) - this._elapsed;
    // set the new start time
    this._setStartTime(startTime, false);
    // if we have prevTime - we need to normalize
    // it for the current resume time
    if (this._prevTime > -Infinity) {
      const { _startTime, _elapsed, _totalTime } = this;
      this._prevTime = (state === 'play')
        ? this._startPoint + _elapsed
        : (_startTime + _totalTime - this._props.delay) - this._elapsed;
    }
  }

  /**
   * _envokeCallBacks - function to envoke callbacks regarding frame snapshot.
   *
   *  0 -> isDelay
   *  1 -> onUpdate
   *  2 -> isYoyo
   *  3 -> isYoyoBackward
   *  4 -> onStart
   *  5 -> onStartBackward
   *  6 -> onRepeatStart
   *  7 -> onRepeatStartBackward
   *  8 -> onRepeatComplete
   *  9 -> onRepeatCompleteBackward
   *  10 -> onComplete
   *  11 -> onCompleteBackward
   *
   * @private
   * @bound
   * @param {Number} Frame snapshot.
   */
  _envokeCallBacks = (snapshot, time) => {
      if (snapshot === 0) { return; }; // delay

      const props = this._props;
      const triggers = this._trg;
      const isYoyo = (snapshot & triggers[0]) > 0;
      const isOnRepeatStart = (snapshot & triggers[3]) > 0;
      const isOnRepeatComplete = (snapshot & triggers[2]) > 0;
      let isUpdate = false;

      // `onStart` callback
      ((snapshot & triggers[1]) > 0) && props.onStart(true, isYoyo);

      // `onRepeatComplete` callback
      if (isOnRepeatComplete === true) {
        if (isOnRepeatStart === false) {
          const { duration } = this._props;
          const updateTime = Math.min(time, this._periodStart + duration);
          const progress = (updateTime - this._periodStart) / duration;
          props.onUpdate(progress, progress, true, isYoyo);
          isUpdate = true;
        }
        props.onRepeatComplete(true, isYoyo);
      }

      if (isOnRepeatStart === true) {
        props.onRepeatStart(true, isYoyo);
        // recalculate period start on each repeat start
        const {duration, delay} = this._props;
        this._periodStart = this._periodStart + delay + duration;
      };

      if ((snapshot & 1) > 0 && isUpdate === false) {
        const {duration} = this._props;
        const updateTime = Math.min(time, this._periodStart + duration);
        const progress = (updateTime - this._periodStart) / duration;
        props.onUpdate(progress, progress, true, isYoyo);
      }

      ((snapshot & triggers[4]) > 0) && props.onComplete(true, isYoyo);
  }

  /**
   * _envokeCallBacksRev - function to envoke callbacks regarding frame snapshot.
   *
   *  0 -> isDelay
   *  1 -> onUpdate
   *  2 -> isYoyo
   *  3 -> isYoyoBackward
   *  4 -> onStart
   *  5 -> onStartBackward
   *  6 -> onRepeatStart
   *  7 -> onRepeatStartBackward
   *  8 -> onRepeatComplete
   *  9 -> onRepeatCompleteBackward
   *  10 -> onComplete
   *  11 -> onCompleteBackward
   *
   * @private
   * @bound
   * @param {Number} Frame snapshot.
   */
  _envokeCallBacksRev = (snapshot, time) => {
    this._o.isIt && console.log(`snapshot: ${snapshot}, time: ${time}`);
      if (snapshot === 0) { return; }; // delay

      const props = this._props;
      const triggers = this._trg;
      const isYoyo = (snapshot & triggers[0]) > 0;
      const isOnRepeatStart = (snapshot & triggers[3]) > 0;
      const isOnRepeatComplete = (snapshot & triggers[2]) > 0;

      ((snapshot & triggers[4]) > 0) && props.onComplete(false, isYoyo);

      // `onRepeatComplete` callback
      if (isOnRepeatComplete === true) {
        props.onRepeatComplete(true, isYoyo);
      }

      if ((snapshot & 1) > 0) {
        const {duration} = this._props;
        const updateTime = Math.min(time, this._periodStart + duration);
        const progress = (updateTime - this._periodStart) / duration;
        props.onUpdate(progress, progress, false, isYoyo);
      }

      if (isOnRepeatStart === true) {
        props.onRepeatStart(true, isYoyo);
        // recalculate period start on each repeat start
        const {duration, delay} = this._props;
        this._periodStart = this._periodStart + delay + duration;
      };

      // `onStart` callback
      ((snapshot & triggers[1]) > 0) && props.onStart(false, isYoyo);
  }

  /** PUBLIC FUNCTIONS **/

  /**
   * update - function to envoke callbacks regarding current time.
   *
   * @public
   * @param {Number} Current time.
   */
  update(time) {
    if (this._prevUpdateTime === time) { return; }

    this._o.isIt && console.log(`update: ${time - this._startTime}`);

    // if forward direction
    if (time > this._prevTime) {
      this._prevUpdateTime = time;
      // normal update in forward direction
      if (time >= this._startTime) {
        let isUpdate = false;
        while (this._frameIndex*16 + 16 <= time - this._startTime && this._frameIndex < this._plan.length) {
          this._frameIndex++;
          this._cb(this._plan[this._frameIndex], time);
          this._prevTime = time;
          isUpdate = true;
        }
        // if update time jumped after end time, make sure that
        // all appropriate callbacks called
        if (time >= (this._startTime + this._totalTime - this._props.delay)) {
          // onRepeatComplete + onComplete + onUpdate
          this._cb(1281, time);
          // reset flags because tween is ended
          this._prevTime = +Infinity;
          this._frameIndex = this._plan.length;
          // return `true` indicating that tween is completed
          return true;
        }

        // if did not update - call the update
        if (isUpdate === false) {
          this._cb(1, time);
        }
      }

    // if backward direction
    // can be called only on `seek` backward
  } else if (time < this._prevTime) {
      this._prevUpdateTime = time;

      this._trg = this._trgRev;

      this._o.isIt && console.log(`elpased: ${this._frameIndex*16}, frameIndex: ${this._frameIndex}, time: ${time - this._startTime}`, this._plan);

      let isUpdate = false;
      while (this._frameIndex*16 >= time - this._startTime) {
        this._frameIndex--;
        this._cbr(this._plan[this._frameIndex], time);
        this._prevTime = time;
        isUpdate = true;
        // should react on `endTime` but not inside the reapeat time,
        // so we have `>=` in the loop body and this `if` here
        if (this._frameIndex*16 === time - this._startTime) { break; }
      }
      // if update time jumped after end time, make sure that
      // all appropriate callbacks called
      if (time <= this._startTime) {
        // onRepeatStart + onStart + onUpdate
        this._cbr(161, time);
        // reset flags because tween is ended
        this._prevTime = -Infinity;
        this._frameIndex = -1;
        // return `true` indicating that tween is completed
        return true;
      }
    }

  }

  /**
   * play - function to play the tween.
   *
   * @public
   * @return {Object} This tween.
   */
  play(shift = 0) {
    if (this._state === 'play' && this._isRunning) { return this; }
    this._isReversed = false;
    this._subPlay(shift, 'play');
    this._setPlaybackState('play');

    return this;
  }

  /**
   * playBackward - function to play the Tween in backward direction.
   *
   * @public
   * @param  {Number} Shift time in milliseconds.
   * @return {Object} This tween.
   */
  playBackward(shift = 0) {
    if (this._state === 'playBackward' && this._isRunning) { return this; }
    this._isReversed = true;
    this._subPlay(shift, 'playBackward');
    this._setPlaybackState('playBackward');

    return this;
  }

  /**
   * replay - API method to replay(restart) the Tween.
   *
   * @public
   * @param   {Number} Shift time in milliseconds.
   * @returns {Object} This tween.
   */
  replay(shift = 0) {
    this.reset();
    this.play(shift);

    return this;
  }

  /**
   * replayBackward - API method to replay(restart) backward the Tween.
   *
   * @public
   * @param   {Number} Shift time in milliseconds.
   * @returns {Object} This tween.
   */
  replayBackward(shift = 0) {
    this.reset();
    this.playBackward(shift);

    return this;
  }

  /**
   * pause - function to pause the tween
   *
   * @public
   * @return {Object} This tween.
   */
  pause() {
    if (this._state === 'pause' || this._state === 'stop')  { return this; }
    tweener.remove(this);
    this._setPlaybackState('pause');

    return this;
  }

  /**
   * resume - API method to resume the Tween.
   *
   * @public
   * @param {Number} Shift time in milliseconds.
   * @return {Object} Tween this.
   */
  resume(shift = 0) {
    if ( this._state !== 'pause' ) { return this; }

    switch (this._prevState) {
      case 'play':
        this.play(shift);
        break;
      case 'playbackward':
        this.playBackward(shift);
        break;
    }

    return this;
  }

  /**
   * stop - function to stop the Tween.
   *
   * @public
   * @param {Number} Progress to set when stopped [0...1].
   * @returns {Object} This tween.
   */
  stop(progress) {
    if ( this._state === 'stop' ) { return this; }

    this._elapsed = 0;
    const stopProc = (progress != null) ? progress
      /* if no progress passsed - set 1 if tween
         is playingBackward, otherwise set to 0 */
      : ( this._state === 'playBackward' ) ? 1 : 0

    this.setProgress(stopProc);
    this.reset();

    return this;
  }

  /**
   * stop - function to to reset tween's state and properties.
   *
   * @public
   * @returns {Object} This tween.
   */
  reset() {
    tweener.remove(this);
    this._setPlaybackState('stop');
    this._elapsed = 0;
    this._frameIndex = -1;

    return this;
  }

  /**
   * setProgress - API method to set progress on tween.
   *
   * @public
   * @param {Number} Progress to set.
   * @returns {Object} This tween.
   */
  setProgress(progress) {
    // set start time if there is no one yet.
    !this._startTime && this._setStartTime();
    // reset play time
    this._playTime = undefined;
    // progress should be in range of [0..1]
    (progress < 0) && (progress = 0);
    (progress > 1) && (progress = 1);
    // update self with calculated time
    const startPoint = this._startTime - this._props.delay;
    this.update(startPoint + progress * this._totalTime);

    return this;
  }

  /**
   * setSpeed - Method to set tween's speed.
   *
   * @public
   * @param {Number} Speed value.
   * @returns {Object} This tween.
   */
  setSpeed(speed) {
    /**
     * TODO: recalculate `plan` if speed changes.
     */
    this._props.speed = speed;
    // if playing - normalize _startTime and _prevTime to the current point.
    if (this._state === 'play' || this._state === 'playingBackward') {
      this._setResumeTime(this._state);
    }

    return this;
  }

  /**
   * onTweenerFinish - callback that will be invoked when
   *                   `tween` playback completed.
   *
   * @public
   */
  onTweenerFinish() {
    this._setPlaybackState('stop');
    this._props.onPlaybackComplete();

    return this;
  }

  /**
   * reverse - function to reverse the tween.
   *
   * @return {Obejct} This tween.
   */
  // reverse() {
  //   this._planner.reverse();
  //
  //   // console.log(`-> reverse`);
  //
  //   // reverse the `_frameIndex` to stay on the same index in `_plan`
  //   if (this._frameIndex !== -1 && this._frameIndex !== this._plan.length) {
  //     this._frameIndex = this._plan.length-1 - this._frameIndex;
  //   }
  //
  //   this._reverseTime = this._frameIndex*16;
  //
  //   const { _cb, _cbr } = this;
  //   this._cb = _cbr;
  //   this._cbr = _cb;
  //
  //   this._props.isReverse = !this._props.isReverse;
  //
  //   return this;
  // }
}
