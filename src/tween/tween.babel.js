import ClassProto from '../class-proto';
import defaults from './tween-defaults';
import TweenPlanner from './planner';
import tweener from './tweener';

export default class Tween extends ClassProto {
  /**
   * _declareDefaults - function to declare module defaults.
   *                    In this case defaults are the `tween defaults`
   *                    since we will plan for tween.
   * @private
   */
  _declareDefaults() { return this._defaults = defaults; }

  /**
   * _vars - function do declare `variables` after `_defaults` were extended
   *         by `options` and saved to `_props`
   */
  _vars() {
    this._planner = new TweenPlanner(this._o);

    /**
     * TODO: cover
     */
    this._plan = this._planner.createPlan();

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
    this._frameIndex = 0;

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
  }

  /**
   * _setStartTime - function to set animation start time.
   *
   * @private
   * @param {Number} Time to set.
   */
  _setStartTime(time) {
    if (time === undefined) { time = performance.now(); }

    const { delay, shiftTime } = this._props;

    // calculate bounds
    // - negativeShift is negative delay in options hash
    // - shift time is shift of the parent
    this._startTime = time + this._negativeShift + delay + shiftTime;
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

    if ((state === 'play' || state === 'playBackward') && wasStill ) {
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
    const wasReverse = (isPlayBackward || ( isPause && isPrevPlayBackward));
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
    if (this._prevTime !== undefined) {
      const { _startTime, _elapsed, _totalTime } = this;
      this._prevTime = (state === 'play')
        ? _startTime + _elapsed - this._props.delay
        : (_startTime + _totalTime - this._props.delay) - this._elapsed;
    }
  }

  /**
   * _envokeCallBacks - function to envoke callbacks regarding frame snapshot.
   *
   * @private
   * @param {Number} Frame snapshot.
   */
  _envokeCallBacks(snapshot) {
    if (snapshot === 0) { return; };
    let mask = 1;

    const props = this._props;

    (snapshot & (mask <<= 1)) && props.onStart();
    (snapshot & (mask <<= 1)) && props.onRepeatStart();
    (snapshot & (mask <<= 1)) && props.onUpdate();
    (snapshot & (mask <<= 1)) && props.onRepeatComplete();
    (snapshot & (mask <<= 1)) && props.onComplete();
  }

  /** PUBLIC FUNCTIONS **/

  /**
   * update - function to envoke callbacks regarding current time.
   *
   * @public
   * @param {Number} Current time.
   */
  update(time) {
    const deltaTime = time - this._startTime;

    if (deltaTime > this._totalTime) {
      while (this._frameIndex < this._plan.length) {
        const snapshot = this._plan[this._frameIndex];
        this._envokeCallBacks(snapshot);
        this._elapsed += 16;
        this._frameIndex++;
      }
      return true;
    }

    while (this._elapsed <= deltaTime) {
      this._envokeCallBacks(this._plan[this._frameIndex]);
      this._elapsed += 16;
      this._frameIndex++;
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
    this._props.isReversed = true;
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
        this.play( shift );
        break;
      case 'playbackward':
        this.playBackward( shift );
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

    this._elapsed  = 0;
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
    this._frameIndex = 0;
    // this._isCompleted      = false;
    // this._isStarted        = false;
    // this._isFirstUpdate    = false;
    // this._props.isReversed = false;

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
    var props = this._props;
    // set start time if there is no one yet.
    !this._startTime && this._setStartTime();
    // reset play time
    this._playTime = undefined;
    // progress should be in range of [0..1]
    (progress < 0) && (progress = 0);
    (progress > 1) && (progress = 1);
    // update self with calculated time
    const startPoint = this._startTime - this._props.delay;
    this.update(startPoint + progress*this._totalTime);

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
}
