import defaults from './tween-defaults';

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
  // state of the tween {boolean}
  let isRunning = false;
  // playing state of the tween {boolean}
  let isReversed = false;
  // if second update (for the first update will be set to `undefined`){boolean}
  let wasUknownUpdate;
  // start time of the tween
  let startTime;
  // play time of the tween - analog to start time but used when you hit `play`
  // oppose to if you just seek the tween
  let playTime;
  // time of 1 `repeat cycle`
  let repeatTime;
  // progress of the tween in `ms` {number}
  let progressTime = 0;
  // if tween is completed {boolean}
  let isCompleted = false;
  // if tween is started - there was at least one update in its
  // `active` zone {boolean}
  let isStarted = false;
  // if tween was updated at least once {boolean}
  let isFirstUpdate = false;
  // previous update time
  let prevTime;
  // if prev period was `yoyo` (flipped) period {boolean}
  let isPrevYoyo;
  // tween object to return
  const tween = {};

  /**
   * Properties of the tween exxtended by defaults,
   * all of them should be prefixed with `$` internaly.
   */

  const $delay = (o.delay != null) ? o.delay : defaults.delay;
  const $speed = (o.speed != null) ? o.speed : defaults.speed;

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
    subPlay(shift, 'play');
    setPlaybackState('play');
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
    subPlay(shift, 'reverse');
    setPlaybackState('reverse');
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
    removeFromTweener();
    setPlaybackState('pause');
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

    const stopProc = (progress != null) ? progress
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
        play(shift ;
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
    playTime = null;
    // progress should be in range of [0..1]
    ( progress < 0 ) && ( progress = 0 );
    ( progress > 1 ) && ( progress = 1 );
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
    removeFromTweener();
    setPlaybackState('stop');
    progressTime     = 0;
    isCompleted      = false;
    isStarted        = false;
    isFirstUpdate    = false;
    wasUknownUpdate  = undefined;
    prevTime         = undefined;
    isPrevYoyo         = undefined;
    isReversed       = false;
    return tween;
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

  return tween;
}
