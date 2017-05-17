import { ClassProto } from '../class-proto';
import { tweenieDefaults } from './tweenie-defaults';
import { tweener } from './tweener';
import { parseEasing } from '../easing/parse-easing';

/* -------------------- */
/* The `Tweenie` class  */
/* -------------------- */

/**
 * TODO:
 *    - add `onRefresh` callbacks
 *    - add `yoyo` option for repeat
 */

const Tweenie = Object.create(ClassProto);
/**
 * _declareDefaults - function to declare `_defaults` object.
 *
 * @private
 * @override ClassProto
 */
Tweenie._declareDefaults = function() {
  this._defaults = tweenieDefaults;
};

/* ---------------------- */
/* The `Public` functions */
/* ---------------------- */

/**
 * play - function to `play` the tween.
 *
 * @public
 * @param {Number} Repeat count
 * @returns {Object} This tween.
 */
Tweenie.play = function(repeat) {
  if (this._state === 'play') {
    return this;
  }

  // if repeat passed - save it
  if (repeat !== void 0) {
    this._repeat = repeat;
  }

  this._setState('play');
  this._setupPlay('play');

  this._playTime = performance.now();
  this._speed = this._props.speed;

  return this;
};

/**
 * pause - function to `pause` the tween.
 *
 * @public
 * @returns {Object} This tween.
 */
Tweenie.pause = function() {
  if (this._state === 'pause' || this._state === 'stop') { return this; }

  tweener.remove(this);
  this._setState('pause');
  // reset speed variable to `1` because speed should not be applied
  // when setProgress is used
  this._speed = 1;

  return this;
};

/*
 * stop - function to stop the tween.
 *
 * @public
 * @param {Number} Progress to stop with in [0...1]
 * @returns {Object} This tweenie.
 */
Tweenie.stop = function(progress) {
  if (this._state === 'stop') { return this; }

  var stopProc = (progress !== void 0) ? progress
    /* if no progress passsed - set 1 if tween
       is playingBackward, otherwise set to 0 */
    : (this._props.isReverse === true) ? 1 : 0

  tweener.remove(this);
  this.setProgress(stopProc);
  this.reset();

  return this;
};

/**
 * play - function to `replay`(`retart`) the tween.
 *
 * @public
 * @param {Number} Repeat count.
 * @returns {Object} This tween.
 */
Tweenie.replay = function(repeat) {
  this.reset();
  this.play(repeat);

  return this;
};

/**
 * setSpeed - function to set speed.
 *
 * @public
 * @param {Number} Speed in [0..∞]
 * @return {Object} This tween.
 */
Tweenie.setSpeed = function(speed) {
  this._props.speed = speed;

  if (this._state === 'play') {
    this.setStartTime();
    this._speed = speed;
    this._playTime = performance.now();
  }

  return this;
};

/**
 * reverse - function to `reverse` the tween.
 *
 * @public
 * @returns {Object} This tween.
 */
Tweenie.reverse = function() {
  this._props.isReverse = !this._props.isReverse;
  // reverse callbacks in the `_cbs`
  this._reverseCallbacks();

  if (this._elapsed > 0) {
    const { delay } = this._props;
    this._elapsed = (this._end - this._spot) - (this._elapsed - delay);
  }

  this.setStartTime();

  return this;
};

/**
 * setProgress - function to set tween progress.
 *
 * @public
 * @param {Number} Progress to set.
 * @return {Object} This tween.
 */
Tweenie.setProgress = function(progress = 0) {
  (this._start === void 0) && this.setStartTime();

  const time = (progress === 1)
    ? this._end : this._spot + progress*(this._end - this._spot);

  // set initial time
  if (this._prevTime === void 0) {
    this._prevTime = this._start;
  }

  this.update(time);

  return this;
};

/**
 * reset - function to reset the `Tweenie`.
 */
Tweenie.reset = function() {
  this._isActive = false;
  this._elapsed = 0;
  this._setState('stop');
  delete this._prevTime;
};

/* --------------------- */
/* The `Private` functions */
/* --------------------- */

/**
 * _setupPlay - function to setup before `play`.
 *
 * @public
 * @param {Sting} Direction ['play', 'reverse']
 * @returns {Object} This tween.
 */
Tweenie._setupPlay = function(type) {
  this.setStartTime();
  tweener.add(this);
};

/**
 * _vars - function do declare `variables` after `_defaults` were extended
 *         by `options` and saved to `_props`
 *
 * @return {type}  description
 */
Tweenie._vars = function() {
  const {
    isReverse,
    onStart,
    onComplete,
    onChimeIn,
    onChimeOut,
    delay,
    duration
  } = this._props;

  this._isActive = false;
  // time progress
  this._elapsed = 0;
  // initial state
  this._state = 'stop';
  // set "id" speed
  this._speed = 1;

  this._time = delay + duration;

  // this._prevTime = -Infinity;
  this._prevTime;

  // callbacks array - used to flip the callbacks order on `isReverse`
  this._cbs = [ onStart, onComplete, 0, 1 ];
  // chime callbacks
  this._chCbs = [ onChimeIn, onChimeOut ];
  // if `isReverse` - flip the callbacks
  if (isReverse === true) {
    this._reverseCallbacks();
  }
};

/**
 * setStartTime - function to set `startTime`
 *
 * @param {Number, Undefined} Start time to set.
 */
Tweenie.setStartTime = function(startTime = performance.now()) {
  const { delay, duration, repeat, shiftTime } = this._props;

  // if `elapsed` is greated that end bound -> reset it to `0`
  if (this._elapsed >= (this._end - this._spot)) {
    this._elapsed = 0;
  }
  // `_spot` - is the animation initialization spot
  // `_elapsed` is how much time elapsed in the `active` period,
  // needed for `play`/`pause` functionality
  this._spot = startTime - this._elapsed + shiftTime;
  // play time is needed to recalculate time regarding `speed`
  this._playTime = this._spot;
  // `_start` - is the active animation start time bound
  this._start = this._spot + delay;
  // `_end` - is the active animation end time bound
  this._end = this._start + duration;
};

/**
 * update - function to update `Tweenie` with current time.
 *
 * @param {Number} The current update time.
 */
Tweenie.update = function(time) {
  const { onUpdate, isReverse, index, easing, backwardEasing } = this._props;

  // recalculate `time` regarding `speed`
  time = this._playTime + this._speed*(time - this._playTime);

  // save elapsed time
  this._elapsed = time - this._spot;

  // `onSkip` forward
  if (time >= this._end && this._prevTime <= this._start) {
    // if `prevTime` was <= `_start` might need a refresh
    this._props.onSkip(true, index, time, this._prevTime);
  }

  // `onSkip` backward
  if (time <= this._start && this._prevTime >= this._end) {
    this._props.onSkip(false, index, time, this._prevTime);
  }

  // if forward progress
  const isForward = time > this._prevTime;
  const ease = (isForward !== isReverse) ? easing : backwardEasing;

  if (time >= this._start && time <= this._end && this._prevTime !== void 0) {
    let isActive;
    const p = (time - this._start) / this._props.duration;
    const progress = isReverse === false ? p : 1 - p;
    onUpdate(ease(progress), progress, isForward, time);

    if (time > this._start && this._isActive === false && isForward === true) {
      // `onStart`
      this._cbs[0](isForward, isReverse, index);
      // `onChimeIn`
      this._chCbs[0](isForward, isReverse, index, time);
    }

    if (time === this._start) {
      // `onStart`
      this._cbs[0](isForward, isReverse, index);
      // `onChimeIn`
      this._chCbs[0](isForward, isReverse, index, time);
      // set `isActive` to `true` for forward direction
      // but set it to `false` for backward
      isActive = isForward;
    }

    if (time < this._end && this._isActive === false && isForward === false) {
      // `onComplete`
      this._cbs[1](false, isReverse, index);
      // `onChimeOut`
      this._chCbs[1](isForward, isReverse, index, time);
    }

    if (time === this._end) {
      // `onComplete`
      this._cbs[1](isForward, isReverse, index);
      // `onChimeOut`
      this._chCbs[1](isForward, isReverse, index, time);
      // set `isActive` to `false` for forward direction
      // but set it to `true` for backward
      isActive = !isForward;
    }

    this._isActive = (isActive === undefined) ? true : isActive;

    this._prevTime = time;

    return !this._isActive;
  }

  if (time > this._end && this._isActive === true) {
    // one
    onUpdate(ease(this._cbs[3]), this._cbs[3], isForward, time);
    // `onComplete`
    this._cbs[1](isForward, isReverse, index);
    // `onChimeOut`
    this._chCbs[1](isForward, isReverse, index, time);
    this._isActive = false;
    this._prevTime = time;
    return true;
  }

  if (time < this._start && this._isActive === true) {
    // zero
    onUpdate(ease(this._cbs[2]), this._cbs[2], isForward, time);
    // `onStart`
    this._cbs[0](isForward, isReverse, index);
    // `onChimeIn`
    this._chCbs[0](isForward, isReverse, index, time);

    this._isActive = false;
    this._prevTime = time;

    return true;
  }

  this._prevTime = time;
};

/**
 * Function to reverse callbacks.
 */
Tweenie._reverseCallbacks = function() {
  this._cbs = [ this._cbs[1], this._cbs[0], this._cbs[3], this._cbs[2] ];
};

/*
 * Method set playback `_state` string and call appropriate callbacks.
 *
 * @private
 * @param {String} State name [play, pause, 'stop', 'reverse']
 */
Tweenie._setState = function(state) {
  // save previous state
  this._prevState = this._state;
  this._state = state;

  // callbacks
  var wasPause = this._prevState === 'pause',
      wasStop = this._prevState === 'stop',
      wasPlay = this._prevState === 'play',
      wasReverse = this._prevState === 'reverse',
      wasPlaying = wasPlay || wasReverse,
      wasStill = wasStop || wasPause;

  if ((state === 'play' || state === 'reverse') && wasStill) {
    this._props.onPlaybackStart(state, this._prevState);
  }
  if ( state === 'pause' && wasPlaying ) {
    this._props.onPlaybackPause();
  }
  if ( state === 'stop' && (wasPlaying || wasPause)) {
    this._props.onPlaybackStop();
  }
};

/**
 * onTweenerFinish - function that is called when the tweeener finished
 *                   playback for this tween and removed it from the queue
 *
 */
Tweenie.onTweenerFinish = function() {
  const count = this._repeat - 1;
  const isForward = !this._props.isReverse;
  this._props.onPlaybackComplete(isForward, count > 0 ? count : 0);

  this.reset();

  if (this._repeat > 0) {
    this.play(count);
  }
};

/**
 * _extendDefaults - Method to copy `_o` options to `_props` object
 *                  with fallback to `_defaults`.
 * @private
 * @overrides @ ClassProto
 */
Tweenie._extendDefaults = function() {
  // super call
  ClassProto._extendDefaults.call(this);
  // parse `easing`
  this._props.easing = parseEasing(this._props.easing);
  // parse `backwardEasing`, fallback to `easing` if
  // `backwardEasing` is `null`/`undefined`
  const { easing, backwardEasing } = this._props;
  this._props.backwardEasing = (backwardEasing != null)
                                ? parseEasing(backwardEasing) : easing;
};

/**
 * Imitate `class` with wrapper
 *
 * @param {Object} Options object.
 * @returns {Object} Tweenie instance.
 */
const wrap = (o) => {
  const instance = Object.create(Tweenie);
  instance.init(o);

  return instance;
};

wrap.__mojsClass = Tweenie;

export { wrap as Tweenie };
