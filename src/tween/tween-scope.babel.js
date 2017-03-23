import tweener from './tweener';
import parseEasing from '../easing/helpers/parse-easing';
import defaults from './tween-defaults';
import fallbackFactory from '../helpers/fallback';

/**
 * TODO:
 *  - optimize `Math.floor` and `Math.round`.
 */

/**
 * Tween factory to create a tween.
 *
 * @param {Object} Tween options.
 * @returns {Object} Newly created tween.
 */
const tweenFactory = (o = {}) => {
  // state of the tween {string}
  let state = 'stop';
  // previous state of the tween {string}
  let prevState = 'stop';
  // if second update (for the first update will be set to `undefined`){boolean}
  let wasUknownUpdate;
  // start time of the tween
  let startTime;
  // end time of the tween including all repeat periods
  let endTime;
  // play time of the tween - analog to start time but used when you hit `play`
  // oppose to if you just seek the tween
  let playTime;
  // progress of the tween in `ms` {number}
  let progressTime = 0;
  // previous update time
  let prevTime;
  // time when tween was resumed
  let resumeTime;
  // progress of the tween
  let progress = 0;
  // progress piped thrue easing
  let easedProgress = 0;
  // negative shift for negative delays
  let negativeShift = 0;
  // delay period
  let delayT;
  // if current time is on edge of some periods [-1, 0, 1]
  let onEdge = 0;
  // if previous update was in `yoyo` period
  let wasYoyo = false;
  // tween object to return
  const tween = {};

  /**
   * Flags
   */
  // if tween is completed
  let isCompleted = false;
  // if tween is completed after repeat period
  let isRepeatCompleted = false;
  // if tween is started repeat period
  let isRepeatStart = false;
  // if tween is started - there was at least one update in its
  // `active` zone {boolean}
  let isStarted = false;
  // if tween was updated at least once {boolean}
  let isFirstUpdate = false;
  // If updateTime is in active tween area {boolean}
  let isInActiveArea = false;
  // If tween refreshed after finish and start over(in delay period) {boolean}
  let isRefreshed = false;
  // state of the tween {boolean}
  let isRunning = false;
  // playing state of the tween {boolean}
  let isReversed = false;

  /**
   * Properties of the tween extended by defaults,
   * all of them should be prefixed with `$` internaly.
   */

  const fallback = fallbackFactory(o, defaults);

  const $shiftTime = o.shiftTime || 0;
  let $delay = fallback('delay');
  const $duration = fallback('duration');
  const $repeat = fallback('repeat');
  let $speed = fallback('speed');
  const $isYoyo = fallback('isYoyo');

  // callbacks
  const $onStart = fallback('onStart');
  const $onRefresh = fallback('onRefresh');
  const $onComplete = fallback('onComplete');
  const $onRepeatStart = fallback('onRepeatStart');
  const $onRepeatComplete = fallback('onRepeatComplete');
  const $onFirstUpdate = fallback('onFirstUpdate');
  const $onUpdate = fallback('onUpdate');
  const $onProgress = fallback('onProgress');
  // playback callbacks
  const $onPlaybackStart = fallback('onPlaybackStart');
  const $onPlaybackPause = fallback('onPlaybackPause');
  const $onPlaybackStop = fallback('onPlaybackStop');
  const $onPlaybackComplete = fallback('onPlaybackComplete');
  // lifecycle callbacks
  const $onSetStartTime = fallback('onSetStartTime');

  // easing
  const $easing = fallback('easing');
  const $parsedEasing = parseEasing($easing);
  $parsedEasing.setParent(tween);

  const $backEasing = o.backwardEasing;
  let $parsedBackEasing;
  // this easing is for `backward` direction always should hold something,
  // if `backwardEasing` is not set - it should hold `parsedEasing`
  let $ensuredBackEasing = $parsedEasing;
  if ($backEasing) {
    $parsedBackEasing = $ensuredBackEasing = parseEasing($backEasing);
    $parsedBackEasing.setParent(tween);
  }

  /***** Private Methods *****/

  if ($delay < 0) {
    negativeShift = $delay;
    $delay = 0;
  }

  /**
   * Calculate dimentions.
   */
  // one repeat period time
  let time = $delay + $duration;
  // total time of the tween
  let repeatTime = time * ($repeat + 1);

  /**
   * _removeFromTweener - Method to remove the Tween from the tweener.
   *
   * @private
   * @returns {Object} Self.
   */
  const _removeFromTweener = () => { tweener.remove(tween); }

  /**
   * _start - Method to set tween's state to start and call onStart callback.
   *
   * @private
   * @param {Number} Progress to set.
   * @param {Boolean} Is yoyo period.
   */
  const _start = (time, isYoyo) => {
    if (isStarted) { return; }
    $onStart(time > this._prevTime, isYoyo);
    isCompleted = isFirstUpdate = false;
    isStarted = true;
  }

  /**
   * _complete - Method to set tween's state to complete.
   *
   * @method _complete
   * @private
   * @param {Number} Current time.
   * @param {Boolean} Is yoyo period.
   */
  const _complete = (time, isYoyo) => {
    if (isCompleted) { return; }
    $onComplete(time > prevTime, isYoyo);

    isCompleted = true;
    isStarted = isFirstUpdate = false;
  }

  /**
   * _repeatStart - Method call onRepeatStart calback and set flags.
   *
   * @private
   * @param {Number} Current update time.
   * @param {Boolean} Is yoyo period.
   */
  const _repeatStart = (time, isYoyo) => {
    if (isRepeatStart) { return; }
    $onRepeatStart(time > this._prevTime, isYoyo);
    isRepeatStart = true;
  }

  /**
   * _repeatComplete - Method call onRepeatComplete callback and set flags.
   *
   * @private
   * @param {Number} Current update time.
   * @param {Boolean} Is repeat period.
   */
  const _repeatComplete = (time, isYoyo) => {
    if (this._isRepeatCompleted) { return; }
    $onRepeatComplete(time > this._prevTime, isYoyo);
    this._isRepeatCompleted = true;
  }

  /**
   * _firstUpdate - Method to run onFirstUpdate callback.
   *
   * @private
   * @param {Number} Current update time.
   * @param {Boolean} Is yoyo period.
   */
  const _firstUpdate = (time, isYoyo) => {
    if (isFirstUpdate) { return; }
    $onFirstUpdate(time > prevTime, isYoyo);
    isFirstUpdate = true;
  }

  /**
   * _subPlay - Method to launch play. Used as launch
   * method for bothplay and reverse methods.
   *
   * @private
   * @param {Number} Shift time in milliseconds.
   * @param {String} Play or reverse state.
   * @return {Object} Self.
   */
  const _subPlay = (shift = 0, state) => {
    // check if direction of playback changes,
    // if so, the _progressTime needs to be flipped
    const isPause = state === 'pause';
    const isPlay = state === 'play';
    const isReverse = state === 'reverse';

    const wasPlay = (isPlay || (isPause && prevState === 'play'));
    const wasReverse = (isReverse || (isPause && prevState === 'reverse'));
    const isFlip = (wasPlay && isReverse) || (wasReverse && isPlay);

    // if tween was ended, set progress to 0 if not, set to elapsed progress
    progressTime = (progressTime >= repeatTime) ? 0 : progressTime;
    // flip the _progressTime if playback direction changed
    if (isFlip) { progressTime = repeatTime - progressTime; }
    // set resume time and normalize prev/start times
    _setResumeTime(state, shift);
    // add self to tweener = play
    tweener.add(this);
  }

  /**
   * _normPrevTimeForward - function to recalculate `prevTime`
   *                        for forward direction.
   @private
   @return {Number} Normalized prev time.
   */
  const _normPrevTimeForward = () => {
    return startTime + (progressTime - $delay);
  }

  /**
   * _setResumeTime - Method to set _resumeTime, _startTime and _prevTime.
   *
   * @private
   * @param {String} Current state. ['play', 'reverse']
   * @param {Number} Time shift.
   */
  const _setResumeTime = (state, shift = 0) => {
    // get current moment as resume time
    resumeTime = performance.now();
    // set start time regarding passed `shift` and `procTime`
    const startTime = resumeTime - Math.abs(shift) - progressTime;
    setStartTime(startTime, false);
    // if we have prevTime - we need to normalize
    // it for the current resume time
    if (prevTime !== undefined) {
      prevTime = (state === 'play')
                  // recalculate prevTime for forward direction.
                  ? _normPrevTimeForward()
                  : endTime - progressTime;
    }
  }

  /**
   * _setProgress - Method to set Tween's progress and call onUpdate callback.
   *
   * @private
   * @override @ Module
   * @param {Number} Progress to set.
   * @param {Number} Current update time.
   * @param {Boolean} Is yoyo perido. Used in Timeline to pass to Tween.
   * @returns {Object} Self.
   */
  const _setProgress = (proc, time, isYoyo) => {
    const isForward = time > prevTime;

    progress = proc;
    // get the current easing for `forward` direction regarding `yoyo`
    easedProgress = (isForward !== isYoyo)
                      ? $parsedEasing(proc)
                      : $ensuredBackEasing(proc);

    // call the Tween's callback
    $onUpdate(easedProgress, progress, isForward, isYoyo);
    // save previous `isYoyo` state
    wasYoyo = isYoyo;
  }

  /**
   * _getPeriod - Method to get current period number.
   *
   * @private
   * @param {Number} Time to get the period for.
   * @returns {Number} Current period number.
   */
  const _getPeriod = (time) => {
    const TTime = $delay + $duration;
    const dTime = $delay + time - startTime;
    let T = dTime / TTime;
    // if time if equal to endTime we need to set the elapsed
    // time to 0 to fix the occasional precision js bug, which
    // causes 0 to be something like 1e-12
    const elapsed = (time < endTime) ? dTime % TTime : 0;
    // If the latest period, round the result, otherwise floor it.
    // Basically we always can floor the result, but because of js
    // precision issues, sometimes the result is 2.99999998 which
    // will result in 2 instead of 3 after the floor operation.
    T = ( time >= endTime ) ? Math.round(T) : Math.floor(T);
    // if time is larger then the end time
    if (time > endTime) {
      // set equal to the periods count
      T = Math.round((endTime - startTime + $delay) / TTime);
    // if in delay gap, set _delayT to current
    // period number and return "delay"
    } else if (elapsed > 0 && elapsed < p.delay) {
      delayT = T; T = 'delay';
    }
    // if the end of period and there is a delay
    return T;
  }

  /**
   * Method to handle tween's progress in inactive area.
   *
   * @private
   * @param {Number} Current update time.
   */
  const _updateInInactiveArea = (time) => {
    if (!isInActiveArea) { return; }
    // complete if time is larger then end time
    if (time > endTime && !isCompleted) {
      $onProgress(1, time > prevTime);
      // get period number
      const T = this._getPeriod( p.endTime );
      const isYoyo = $isYoyo && (T % 2 === 0);

      _setProgress((isYoyo) ? 0 : 1, time, isYoyo);
      _repeatComplete(time, isYoyo);
      _complete( time, isYoyo);
    }
    // if was active and went to - inactive area "-"
    if (time < prevTime && time < startTime && !isStarted && !_isCompleted) {
      // if was in active area and didn't fire onStart callback
      $onProgress(0, time > prevTime);
      _setProgress( 0, time, false );
      isRepeatStart = false;
      _repeatStart( time, false );
      _start( time, false );
    }
    isInActiveArea = false;
  }

  /*
    Method to handle tween's progress in active area.
    @private
    @param {Number} Current update time.
  */
  const _updateInActiveArea = (time) => {
    const delayDuration = $delay + $duration;
    const startPoint = startTime - $delay;
    const elapsed = (time - startTime + $delay) % delayDuration;
    const TCount = Math.round((endTime - startTime + $delay) / delayDuration);
    const T = _getPeriod(time);
    const TValue = delayT;
    const prevT = _getPeriod(_prevTime);
    const TPrevValue = delayT;

    // "zero" and "one" value regarding yoyo and it's period
    const isYoyo = $isYoyo && (T % 2 === 1);
    const isYoyoPrev = $isYoyo && (prevT % 2 === 1);
    const yoyoZero = (isYoyo) ? 1 : 0;
    const yoyoOne = 1-yoyoZero;

    if (time === endTime) {
      wasUknownUpdate = false;
      // if `time` is equal to `endTime`, T represents the next period,
      // so we need to decrement T and calculate "one" value regarding yoyo
      const isYoyo = ($isYoyo && ((T-1) % 2 === 1));
      _setProgress((isYoyo ? 0 : 1), time, isYoyo);
      if (time > prevTime) { isRepeatCompleted = false; }
      _repeatComplete(time, isYoyo);
      _complete(time, isYoyo);
    }

    // reset callback flags
    isCompleted = isRefreshed = false;
    // if time is inside the duration area of the tween
    if (startPoint + elapsed >= startTime) {
      isInActiveArea = true;
      isRepeatCompleted = isRepeatStart = isStarted = false;
      // active zone or larger then end
      const elapsed2 = (time - startTime) % delayDuration;
      const proc = elapsed2 / props.duration;
      // |=====|=====|=====| >>>
      //      ^1^2
      const isOnEdge = (T > 0) && (prevT < T);
      // |=====|=====|=====| <<<
      //      ^2^1
      const isOnReverseEdge = (prevT > T);

      // for use in timeline
      onEdge = 0;
      isOnEdge && (onEdge = 1);
      isOnReverseEdge && (onEdge = -1);

      if (wasUknownUpdate) {
        if (time > prevTime) {
          start(time, isYoyo);
          repeatStart(time, isYoyo);
          firstUpdate(time, isYoyo);
        }
        // if backward direction and
        // if ( time < this._prevTime && time !== this._props.startTime ) {
        if (time < prevTime) {
          complete(time, isYoyo);
          repeatComplete(time, isYoyo);
          firstUpdate(time, isYoyo);
          // reset isCompleted immediately
          isCompleted = false;
        }
      }

      if (isOnEdge) {
        // if not just after delay
        // |---=====|---=====|---=====| >>>
        //            ^1 ^2
        // because we have already handled
        // 1 and onRepeatComplete in delay gap
        if (progress !== 1) {
          repeatComplete(time, $isYoyo && ((T-1) % 2 === 1));
        }
        // if on edge but not at very start
        // |=====|=====|=====| >>>
        // ^!    ^here ^here
        if (prevT >= 0) { repeatStart(time, isYoyo); }
      }

      if (time > prevTime) {
        //  |=====|=====|=====| >>>
        // ^1  ^2
        if ( !isStarted && prevTime <= startTime ) {
          start(time, isYoyo);
          repeatStart(time, isYoyo);
          // it was zero anyways

          // restart flags immediately in case if we will
          // return to '-' inactive area on the next step
          isStarted = isRepeatStart = false;
        }
        firstUpdate(time, isYoyo);
      }

      if (isOnReverseEdge) {
        const isPrevEqualToCount = prevT === TCount;
        // if on edge but not at very end
        // |=====|=====|=====| <<<
        //       ^here ^here ^not here
        if ( progress !== 0 && progress !== 1 && isPrevEqualToCount) {
          repeatStart(time, isYoyoPrev);
        }
        // if on very end edge
        // |=====|=====|=====| <<<
        //       ^!    ^! ^2 ^1
        // we have handled the case in this.wasUknownUpdate
        // block so filter that
        if (isPrevEqualToCount && !wasUknownUpdate) {
          complete(time, isYoyo);
          repeatComplete(time, isYoyo);
          firstUpdate(time, isYoyo);
          // reset isComplete flag call
          // cuz we returned to active area
          // isRepeatCompleted = false;
          isCompleted = false;
        }
        repeatComplete(time, isYoyo);
      }

      if (prevT === 'delay') {
        // if just before delay gap
        // |---=====|---=====|---=====| <<<
        //               ^2    ^1
        if ( T < TPrevValue ) { repeatComplete(time, isYoyo); }
        // if just after delay gap
        // |---=====|---=====|---=====| >>>
        //            ^1  ^2
        if ( T === TPrevValue && T > 0 ) { repeatStart(time, isYoyo); }
      }

      const isProcZero = proc === 0;

      // swap progress and repeatStart based on direction
      if (time > prevTime) {
        // if progress is equal 0 and progress grows
        if (isProcZero) { repeatStart(time, isYoyo); }
        if (time !== endTime) {
          _setProgress(((isYoyo) ? 1-proc : proc), time, isYoyo);
        }
      } else {
        if ( time !== endTime ) {
          _setProgress(((isYoyo) ? 1-proc : proc), time, isYoyo);
        }
        // if progress is equal 0 and progress grows
        if (isProcZero) { this._repeatStart( time, isYoyo ); }
      }

      if ( time === startTime ) { start(time, isYoyo); }
    // delay gap - react only once
    } else if ( isInActiveArea ) {
      // because T will be string of "delay" here,
      // let's normalize it be setting to TValue
      const t = (T === 'delay') ? TValue : T;
      const isGrows = time > this._prevTime;
      // decrement period if forward direction of update
      isGrows && t--;
      // calculate normalized yoyoZero value
      const yoyoZero = (($isYoyo && (t % 2 === 1)) ? 1 : 0);
      // if was in active area and previous time was larger
      // |---=====|---=====|---=====| <<<
      //   ^2 ^1    ^2 ^1    ^2 ^1
      const isntYoyoZero = yoyoZero === 1;
      if (time < prevTime) {
        _setProgress(yoyoZero, time, isntYoyoZero);
        repeatStart(time, isntYoyoZero);
      }
      // set 1 or 0 regarding direction and yoyo
      _setProgress(((isGrows) ? 1-yoyoZero : yoyoZero ), time, isntYoyoZero);
      // if time grows
      if ( time > prevTime ) {
        // if reverse direction and in delay gap, then progress will be 0
        // if so we don't need to call the onRepeatComplete callback
        // |---=====|---=====|---=====| <<<
        //   ^0       ^0       ^0
        // OR we have flipped 0 to 1 regarding yoyo option
        if (progress !== 0 || isntYoyoZero) {
          // since we repeatComplete for previous period
          // invert isYoyo option
          // is elapsed is 0 - count as previous period
          repeatComplete( time, isntYoyoZero);
        }
      }
      // set flag to indicate inactive area
      isInActiveArea = false;
    }
    // we've got the first update now
    this.wasUknownUpdate = false;
  }

  /**
   * _update - Method to update tween's progress.
   *
   * @private
   * @param {Number} Current update time.
   * -- next params only present when parent Timeline calls the method.
   * @param {Number} Previous Timeline's update time.
   * @param {Boolean} Was parent in yoyo period.
   * @param {Number} [-1, 0, 1] If update is on edge.
   *              -1 = edge jump in negative direction.
   *               0 = no edge jump.
   *               1 = edge jump in positive direction.
   */
  const _update = (time, timelinePrevTime, wasYoyo, onEdge) => {
    // if we don't the _prevTime thus the direction we are heading to,
    // but prevTime was passed thus we are child of a Timeline
    // set _prevTime to passed one and pretent that there was unknown
    // update to not to block start/complete callbacks
    if (prevTime === undefined && timelinePrevTime !== undefined) {
      if ($speed && playTime) {
        // play point + ( speed * delta )
        prevTime = playTime + ($speed * (timelinePrevTime - playTime));
      }
      wasUknownUpdate = true;
    }

    const startPoint = startTime - $delay;
    // if speed param was defined - calculate
    // new time regarding speed
    if ($speed && playTime) {
      // play point + (speed * delta)
      time = playTime + ($speed * (time - playTime));
    }

    // due to javascript precision issues, after speed mapping
    // we can get very close number that was made from progress of 1
    // and in fact represents `endTime` if so, set the time to `endTime`
    if ( Math.abs(endTime - time) < 0.00000001 ) { time = endTime; }

    // if parent is onEdge but not very start nor very end
    if (onEdge && wasYoyo !== undefined)  {
      const T = _getPeriod(time);
      const isYoyo = !!($isYoyo && $repeat && (T % 2 === 1));

      // for timeline
      // notify children about edge jump
      if (timelines) {
        for (var i = 0; i < timelines.length; i++) {
          timelines[i]._update(time, timelinePrevTime, wasYoyo, onEdge);
        }
      }

      // forward edge direction
      if (onEdge === 1) {
        // jumped from yoyo period?
        if (wasYoyo) {
          prevTime = time + 1;
          _repeatStart(time, isYoyo);
          _start(time, isYoyo);
        } else {
          prevTime = time - 1;
          _repeatComplete(time, isYoyo);
          _complete(time, isYoyo);
        }
      // backward edge direction
      } else if (onEdge === -1) {
        // jumped from yoyo period?
        if (wasYoyo) {
          prevTime = time - 1;
          _repeatComplete( time, isYoyo );
          _complete( time, isYoyo );
        } else {
          // call _start callbacks only if prev time was in active area
          // not always true for append chains
          if (prevTime >= startTime && prevTime <= endTime) {
            prevTime = time + 1;
            _repeatStart(time, isYoyo);
            _start(time, isYoyo);
            // reset isCompleted immediately to prevent onComplete cb
            isCompleted = true;
          }
        }
      }
      // reset the _prevTime - drop one frame to undestand
      // where we are heading
      prevTime = undefined;
    }
    // if in active area and not ended - save progress time
    // for pause/play purposes.
    if (time > startPoint && time < endTime) {
      progressTime = time - startPoint;
    }
    // else if not started or ended set progress time to 0
    else if (time <= startPoint) { progressTime = 0; }
    else if (time >= endTime) {
      // set progress time to repeat time + tiny cofficient
      // to make it extend further than the end time
      progressTime = repeatTime + .00000000001;
    }
    // reverse time if _props.isReversed is set
    if (isReversed) { time = endTime - progressTime; }
    // We need to know what direction we are heading to,
    // so if we don't have the previous update value - this is very first
    // update, - skip it entirely and wait for the next value
    if (prevTime === undefined) {
      prevTime = time;
      wasUknownUpdate = true;
      return false;
    }

    // ====== AFTER SKIPPED FRAME ======

    // handle onProgress callback
    if (time >= startPoint && time <= endTime) {
      $onProgress((time - startPoint) / repeatTime, time > prevTime);
    }
    /*
      if time is inside the active area of the tween.
      active area is the area from start time to end time,
      with all the repeat and delays in it
    */
    if ((time >= startTime) && (time <= endTime)) {
      _updateInActiveArea(time);
    } else {
      // if was in active area - update in inactive area but just once -
      // right after the active area
      if (isInActiveArea) { _updateInInactiveArea(time); }
      else if (!isRefreshed) {
        // onRefresh callback
        // before startTime
        if (time < startTime && progress !== 0) {
          $onRefresh(true, $parsedEasing(0), 0);
          isRefreshed = true;
        }
      }
    }

    prevTime = time;
    return (time >= endTime) || (time <= startPoint);
  }

  /**
   * _setPlaybackState - Method set playback state string.
   *
   * @private
   * @param {String} State name.
   */
  const _setPlaybackState = (stateName) => {
    // save previous state
    prevState = state;
    state = stateName;

    const wasPause   = prevState === 'pause';
    const wasPlaying = prevState === 'play' || prevState === 'reverse';
    const wasStill   = prevState === 'stop' || wasPause;

    if ((state === 'play' || state === 'reverse') && wasStill) {
      $onPlaybackStart();
    }
    if (state === 'pause' && wasPlaying) { $onPlaybackPause(); }
    if (state === 'stop' && (wasPlaying || wasPause)) { $onPlaybackStop(); }
  }

  /***** Public Methods *****/

  /**
   * play - API method to play the Tween.
   *
   * @public
   * @param  {Number} Shift time in milliseconds.
   * @return {Object} Self.
   */
  const play = (shift = 0) => {
    if (state === 'play' && isRunning) { return tween; }
    isReversed = false;
    _subPlay(shift, 'play');
    _setPlaybackState('play');
    return tween;
  }

  /**
   * playBackward - API method to play the Tween in reverse.
   *
   * @public
   * @param  {Number} Shift time in milliseconds.
   * @return {Object} Self.
   */
  const playBackward = (shift = 0) => {
    if (state === 'reverse' && isRunning) { return tween; }
    isReversed = true;
    _subPlay(shift, 'reverse');
    _setPlaybackState('reverse');
    return tween;
  }

  /**
   * pause - API method to pause Tween.
   *
   * @public
   * @returns {Object} Self.
   */
  const pause = () => {
    if (state === 'pause' || state === 'stop')  { return tween; }
    _removeFromTweener();
    _setPlaybackState('pause');
    return tween;
  }

  /**
   * stop - API method to stop the Tween.
   *
   * @public
   * @param   {Number} Progress [0..1] to set when stopped.
   * @returns {Object} Self.
   */
  const stop = (progress) => {
    if ( state === 'stop' ) { return tween; }
    // reset to initial `wasUknownUpdate`
    wasUknownUpdate = undefined;

    const stopProc = (progress !== undefined) ? progress
      // if no progress passsed - set to `1` if `tween`
      // is `playingBackward`, otherwise set to `0`
      : ( state === 'reverse' ) ? 1 : 0

    setProgress(stopProc);
    reset();
    return tween;
  }

  /**
   * replay - API method to replay(restart) the Tween.
   *
   * @public
   @param   {Number} Shift time in milliseconds.
   @returns {Object} Self.
   */
  const replay = (shift = 0) => {
    // reset the `tween`
    reset();
    // play it
    play(shift);
    return tween;
  }

  /**
   * replayBackward - API method to replay(restart) backward the Tween.
   *
   * @public
   * @param   {Number} Shift time in milliseconds.
   * @returns {Object} Self.
   */
  const replayBackward = (shift = 0) => {
    // reset the tween
    reset();
    // play it backward
    playBackward(shift);
    return tween;
  }

  /**
   * resume - API method to resume the Tween.
   *
   * @public
   * @param  {Number} Shift time in milliseconds.
   * @return {Object} Self.
   */
  const resume = (shift = 0) => {
    if ( state !== 'pause' ) { return tween; }

    switch (prevState) {
      // if `prevState` was `play` - play it
      case 'play':
        play(shift);
        break;
      case 'reverse':
        // if `prevState` was `reverse` - play it backward
        playBackward(shift);
        break;
    }

    return tween;
  }

  /**
   * setProgress - API method to set progress on tween.
   *
   * @public
   * @param {Number} Progress to set.
   * @returns {Object} Self.
   */
  const setProgress = (progress) => {
    // set start time if there is no one yet.
    startTime && setStartTime();
    // reset play time, because we `seek` the tween
    playTime = undefined;
    // progress should be in range of [0..1]
    (progress < 0) && ( progress = 0 );
    (progress > 1) && ( progress = 1 );
    // update self with calculated time
    update((startTime - $delay) + progress*repeatTime);
    return tween;
  }

  /**
   * setSpeed - Method to set tween's speed.
   *
   * @public
   * @param {Number} Speed value.
   * @returns this.
   */
  const setSpeed = (speed = 1) => {
    $speed = speed;
    // if playing - normalize _startTime and _prevTime to the current point.
    if ( state === 'play' || state === 'reverse' ) { setResumeTime( state ); }
    return tween;
  }

  /**
   * reset - Method to reset tween's state and properties.
   *
   * @public
   * @returns this.
   */
  const reset = () => {
    _removeFromTweener();
    _setPlaybackState('stop');
    progressTime     = 0;
    isCompleted      = false;
    isStarted        = false;
    isFirstUpdate    = false;
    wasUknownUpdate  = undefined;
    prevTime         = undefined;
    isReversed       = false;
    return tween;
  }

  /**
   * refresh - call refresh callback.
   *
   * @param  {type} isBefore description
   */
  const refresh = (isBefore) => {
    const progress = (isBefore) ? 0 : 1;

    $onRefresh(isBefore, $parsedEasing(progress), progress);
    return tween;
  }

  /**
   * setStartTime - Method for setting start and end time to props.
   *
   * @public
   * @param {Number(Timestamp)}, {Null} Start time.
   * @param {Boolean} Should reset flags.
   */
  const setStartTime = (time, isResetFlags = true ) => {
    // reset flags
    if (isResetFlags) {
      isCompleted = isRepeatCompleted = isStarted = false;
    }
    // set start time to passed time or to the current moment
    const startSpot = (time === undefined) ? performance.now() : time;
    // calculate bounds
    // - negativeShift is negative delay in options object
    // - shift time is shift of the parent
    startTime = startSpot + $delay + negativeShift + $shiftTime;
    // because `startTime` is shifted on `$delay` => remocve one `$delay`
    // from the $repeatTime
    endTime = startTime + ($repeatTime - $delay);
    // set play time to the startTimes
    // if playback controls are used - use _resumeTime as play time,
    // else use shifted startTime -- shift is needed for timelines append chains
    playTime = (resumeTime !== undefined) ? resumeTime : startTime + $shiftTime;
    this._resumeTime = undefined;

    // if from `_subPlay` and `_prevTime` is set and state is `stop`
    // prevTime normalizing is for play/pause functionality, so no
    // need to normalize if the timeline is in `stop` state.
    if (!isResetFlags && prevTime !== undefined && !(state === 'stop')) {
      prevTime = _normPrevTimeForward();
    }

    const callbackTime = (time === undefined) ? startTime : time;
    $onSetStartTime(callbackTime, isResetFlags);
  }

  /**
   * Method which is called when the tween is removed
   * from tweener when finished.
   *
   * @private
   */
  const onTweenerFinish = () => {
    _setPlaybackState('stop');
    $onPlaybackComplete();
  }

  /**
   * getTotalTime - function to get total tween duration.
   *
   * @public
   * @returns {Number} Total tween duration.
   */
  const getTotalTime = () => {
    return (repeatTime / $speed) + $shiftTime + negativeShift;
  }

  /**
   * Expose public methods:
   */
  tween.play = play;
  tween.playBackward = playBackward;
  tween.pause = pause;
  tween.resume = resume;
  tween.stop = stop;
  tween.replay = replay;
  tween.setProgress = setProgress;
  tween.setSpeed = setSpeed;
  tween.reset = reset;
  tween.onTweenerFinish = onTweenerFinish;
  tween.setStartTime = setStartTime;

  return tween;
}
