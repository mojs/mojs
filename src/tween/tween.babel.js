import { ClassProto } from '../class-proto';
import { tweenDefaults } from './tween-defaults';
import { Tweenie } from './tweenie';
import tweener from './tweener';
import { staggerProperty } from '../helpers/stagger-property';

const Tween = {
  /**
   * _declareDefaults - function to declare `_defaults` object.
   *
   * @private
   * @override ClassProto
   */
  _declareDefaults() {
    // ! see tween defaults for public properties and callbacks !
    this._defaults = tweenDefaults;
  },

  /* -------------------- */
  /* The `Public` methods */
  /* -------------------- */

  /**
   * play - function to `play` the tween.
   *
   * @public
   * @returns {Object} This tween.
   */
  play() {
    if (this._state === 'play') {
      return this;
    }

    this._setState('play');
    this._setupPlay('play');

    this._playTime = performance.now();
    this._speed = this._props.speed;

    return this;
  },

  /**
   * pause - function to `pause` the tween.
   *
   * @public
   * @returns {Object} This tween.
   */
  pause() {
    if (this._state === 'pause' || this._state === 'stop') { return this; }

    tweener.remove(this);
    this._setState('pause');
    // reset speed variable to `1` because speed should not be applied
    // when setProgress is used
    this._speed = 1;

    return this;
  },

  /**
   * reverse - function to `reverse` the tween.
   *
   * @public
   * @returns {Object} This tween.
   */
  reverse() {
    this._props.isReverse = !this._props.isReverse;
    // flip the onChime* callbacks
    this._cb.reverse();

    if (this._elapsed > 0) {
      const { isReverse, delay } = this._props;
      this._checkActiveTweenie();
      this.update = (isReverse === true) ? this._updateRev : this._updateFwd;
      this._elapsed = (this._end - this._spot) - (this._elapsed - delay);
    } else { this._setupUpdateFunction(); }

    return this;
  },

  /**
   * setSpeed - function to set speed.
   *
   * @public
   * @param {Number} Speed in [0..∞]
   * @return {Object} This tween.
   */
  setSpeed(speed) {
    this._props.speed = speed;

    if (this._state === 'play') {
      this.setStartTime();
      this._speed = speed;
      this._playTime = performance.now();
    }

    return this;
  },

  // /**
  //  * setProgress - function to set tween progress.
  //  *
  //  * @public
  //  * @param {Number} Progress to set.
  //  * @return {Object} This tween.
  //  */
  // setProgress(progress = 0) {
  //   (this._start === void 0) && this.setStartTime();
  //
  //   const time = (progress === 1)
  //     ? this._end : this._spot + progress*(this._end - this._spot);
  //
  //   if (progress > this._progress) {
  //     this._setProgressFwd(time);
  //   } else {
  //     this._setProgressBwd(time);
  //   }
  //
  //   this._progress = progress;
  //   return this;
  // },
  //
  // /**
  //  * _setProgressFwd - function to set progress in forward direction.
  //  *
  //  * @private
  //  * @param {Number} Time to update the tween with.
  //  */
  // _setProgressFwd(time) {
  //
  //   this._importantSpots
  //
  //   for (let i = this._active; i < this._tweenies.length; i++) {
  //     const tweenie = this._tweenies[i];
  //
  //     if (time > tweenie._end) {
  //       if (tweenie !== this._act) {
  //         this.update(tweenie._start);
  //       }
  //       this.update(tweenie._end);
  //     } else {
  //       this.update(time);
  //       break;
  //     }
  //   }
  // },
  //
  // /**
  //  * _setProgressBwd - function to set progress in backward direction.
  //  *
  //  * @private
  //  * @param {Number} Time to update the tween with.
  //  */
  // _setProgressBwd(time) {
  //   // console.log(`set backward: ${time}, ${this._active}`);
  //
  //   for (let i = this._active; i >= 0; i--) {
  //     const tweenie = this._tweenies[i];
  //
  //     if (time < tweenie._start) {
  //       if (tweenie !== this._act) { this.update(tweenie._end); }
  //       this.update(tweenie._start);
  //     } else {
  //       this.update(time);
  //       break;
  //     }
  //   }
  // },

  /**
   * _checkActiveTweenie - function to check if active tweenie was set right on
   *                       `reverse` function.
   * @private
   */
  _checkActiveTweenie() {
    const { isReverse } = this._props;

    if ((isReverse === true) && (this._spot + this._elapsed < this._act._start)) {
      this._active--;
      this._act = this._tweenies[this._active];
    } else if ((isReverse === false) && (this._spot + this._elapsed > this._act._end)) {
      this._active++;
      this._act = this._tweenies[this._active];
    }
  },

  /**
   * play - function to declare `play` the tween.
   *
   * @public
   * @param {Sting} Direction ['play', 'reverse']
   * @returns {Object} This tween.
   */
  _setupPlay(type) {
    this.setStartTime();
    tweener.add(this);
  },

  /**
   * _vars - function do declare `variables` after `_defaults` were extended
   *         by `options` and saved to `_props`
   *
   * @override ClassProto
   * @return {type}  description
   */
  _vars() {
    this._tweenies = [];
    this._state = 'stop';
    // time progress
    this._elapsed = 0;
    // progress that is set with `setProgress` function
    this._progress = 0;
    // set "id" speed
    this._speed = 1;

    const { isReverse, onChimeIn, onChimeOut } = this._props;
    this._cb = [ onChimeIn, onChimeOut ];
    if (isReverse) {
      this._cb.reverse();
    }

    // create period tweenies
    this._createTweenies();
    // setup initial update function
    this._setupUpdateFunction();
  },

  /**
   * _setupUpdateFunction - function to set up the intial `update` function
   *                        regarding `isReverse` and `repeat` options.
   *
   * @return {type}  description
   */
  _setupUpdateFunction() {
    const { repeat, isReverse } = this._props;
    // setup `update` function to `updateFwd` by default
    // and to `updateRev` if reversed, add `U` suffix if
    // update should go `undefined` tweenie
    const suffix = (repeat > 0) ? 'U' : '';
    const ending = (isReverse === true) ? 'Rev' : 'Fwd';
    const name = `_update${suffix}${ending}`;

    // if ne repeat - there is just one tweenie,
    // so we need to set up it as active for further updates
    if (repeat === 0) {
      this._active = (isReverse === false) ? 0 : this._tweenies.length-1;
      this._act = this._tweenies[this._active];
    }

    this.update = this[name];
  },

  /**
   * Function to create tweenies.
   */
  _createTweenies() {
    const {
      repeat,
      delay,
      duration,
      onUpdate,
      onRefresh,
      isReverse,
      isPeriodReverse
    } = this._props;

    let end = 0;
    for (let index = 0; index <= repeat; index++) {
      this._tweenies.push(
        Tweenie({
          index,
          delay,
          isReverse: staggerProperty(isPeriodReverse, index),
          duration,
          onUpdate,
          onRefresh,
          onStart: (isForward, isReverse, index) => {
            this._onStart(isForward, isReverse, index);
          },
          onComplete: (isForward, isReverse, index) => {
            this._onComplete(isForward, isReverse, index);
          },
          onChimeOut: (isForward, isReverse, index, time) => { this._chimeOut(isForward, isReverse, index, time); },
          onChimeIn: (isForward, isReverse, index, time) => { this._chimeIn(isForward, isReverse, index, time); }
        })
      );
    }

    this._first = this._tweenies[0];
    this._last = this._tweenies[this._tweenies.length-1];
  },

  /**
   * setStartTime - function to set `startTime`
   *
   * @param {Number, Undefined} Start time to set.
   */
  setStartTime(startTime = performance.now()) {
    const { delay, duration, repeat } = this._props;

    // if `elapsed` is greated that end bound -> reset it to `0`
    if (this._elapsed >= (this._end - this._spot)) {
      this._elapsed = 0;
    }

    this._importantSpots = [];

    // `_spot` - is the animation initialization spot
    // `_elapsed` is how much time elapsed in the `active` period,
    // needed for `play`/`pause` functionality
    this._spot = startTime - this._elapsed;
    // play time is needed to recalculate time regarding `speed`
    this._playTime = this._spot;
    // `_start` - is the active animation start time bound
    this._start = this._spot + delay;

    this._importantSpots.push(this._start);

    // set start time on all tweenies
    this._tweenies[0].setStartTime(this._start - delay);

    if (this._tweenies[0]._start !== this._start) {
      this._importantSpots.push(this._tweenies[0]._start);
    }

    this._importantSpots.push(this._tweenies[0]._end);

    for (let i = 1; i < this._tweenies.length; i++) {
      this._tweenies[i].setStartTime(this._tweenies[i-1]._end);
      this._importantSpots.push(this._tweenies[i]._start);
      this._importantSpots.push(this._tweenies[i]._end);
    }
    // `_end` - is the active animation end time bound
    this._end = this._tweenies[this._tweenies.length-1]._end;
  },

  /**
   * _updateFwd - function to update `Tween` with forward current time.
   *
   * @private
   * @param {Number} Current update time.
   */
  _updateFwd(time) {
    time = this._playTime + this._speed*(time - this._playTime);

    if (time > this._end) { this._ac = true; }

    // save elapsed time
    this._elapsed = time - this._spot;

    this._act.update(time);
  },

  /**
   * _updateRev - function to update `Tween` with reversed current time.
   * @param {Number} Current update time.
   */
  _updateRev(time) {
    time = this._playTime + this._speed*(time - this._playTime);
    // save elapsed time
    this._elapsed = time - this._spot;

    if (time > this._end) { this._ac = true; }


    this._act.update(this._end + (this._start - time));
  },

  /**
   * _updateFwd - function to update `Tween` with forward current time
   *              for `undefined` tweenies.
   *
   * @private
   * @param {Number} Current update time.
   */
  _updateUFwd(time) {
    time = this._playTime + this._speed*(time - this._playTime);

    if (time < this._start || time > this._end) {
      // cover
      this._first._prevTime = time;
      this._last._prevTime = time;
      return;
    }

    this._first.update(time);
    this._last.update(time);

    if (this._first._isActive === true) {
      this._active = 0;
      this._act = this._first;
      this.update = this._updateFwd;
      return;
    }
    if (this._last._isActive === true) {
      this._active = this._tweenies.length-1;
      this._act = this._last;
      this.update = this._updateFwd;
    }
  },

  /**
   * _updateRev - function to update `Tween` with reversed current time
   *              for `undefined` tweenies.
   * @param {Number} Current update time.
   */
  _updateURev(time) {
    time = this._playTime + this._speed*(time - this._playTime);

    time = this._end + (this._start - time);

    if (time < this._start || time > this._end) {
      this._first._prevTime = time;
      this._last._prevTime = time;
      return;
    }

    this._first.update(time);
    this._last.update(time);

    if (this._first._isActive === true) {
      this._active = 0;
      this._act = this._first;
      this.update = this._updateRev;
      return;
    }
    if (this._last._isActive === true) {
      this._active = this._tweenies.length-1;
      this._act = this._last;
      this.update = this._updateRev;
    }
  },

  /**
   * _chimeOut - Tweenies `onChimeOut` callback handler.
   *
   * @private
   * @param {Boolean} Is forward direction.
   * @param {Boolean} Is reversed.
   * @param {Number} Period index.
   * @param {Number} Update time.
   */
  _chimeOut(isForward, isPeriodReverse, i, time) {
    if (i === this._tweenies.length-1) {
      this._props.onComplete(isForward, isPeriodReverse, i);
      this._ac = isForward;
      // chimeOut/chimeIn
      const { isReverse, index } = this._props;
      this._cb[1](isForward, isReverse, index, time);
    }

    this._props.onRepeatChimeOut(isForward, isPeriodReverse, i, time);

    if (isForward === false) { return; }

    this._active++;
    // if the next tween is present, update it with
    // the current time and set it as active(`_act`)
    const tweenie = this._tweenies[this._active];
    if (tweenie !== void 0) {
      tweenie._prevTime = this._tweenies[this._active-1]._prevTime;
      this._act = tweenie;
      tweenie.update(time);
    } else { this._active--; }
  },

  /**
   * _chimeIn - Tweenies `onChimeIn` callback handler.
   *
   * @private
   * @param {Boolean} Is forward direction.
   * @param {Boolean} Is reversed.
   * @param {Number} Period index.
   * @param {Number} Update time.
   */
  _chimeIn(isForward, isPeriodReverse, i, time) {
    if (i === 0) {
      this._props.onStart(isForward, isPeriodReverse, i);
      this._ac = !isForward;

      // chimeIn/chimeOut
      const { isReverse, index } = this._props;
      this._cb[0](isForward, isReverse, index, time);
    }

    this._props.onRepeatChimeIn(isForward, isPeriodReverse, i, time);

    if (isForward === true) { return; }

    this._active--;
    // if the previous tween is present, update it with
    // the current time and set it as active(`_act`)
    const tweenie = this._tweenies[this._active];
    if (tweenie !== void 0) {
      tweenie._prevTime = this._tweenies[this._active+1]._prevTime;
      this._act = tweenie;
      tweenie.update(time);
    } else { this._active++; }
  },

  /**
   * `_onComplete` - Tweenies `onComplete` callback handler.
   * @param {Boolean} isForward direction.
   * @param {Boolean} isYoyo period.
   * @param {Number} Update period.
   */
  _onComplete(isForward, isYoyo, index) {
    const { onRepeatComplete } = this._props;
    // if forward direction call the `onRepeatComplete` before `onComplete`
    if (isForward === true) {
      onRepeatComplete(isForward, isYoyo, index);
    }

    // if forward direction call the `onRepeatComplete` after `onComplete`
    if (isForward === false) {
      onRepeatComplete(isForward, isYoyo, index);
    }
  },

  /**
   * `_onStart` - Tweenies `onStart` callback handler
   * @param {Boolean} isForward direction.
   * @param {Boolean} isYoyo period.
   * @param {Number} Update period.
   */
  _onStart(isForward, isYoyo, index) {
    const { onRepeatStart, onStart, isReverse } = this._props;
    // if forward direction call the `onRepeatStart` before `onStart`
    if (isForward === false) { onRepeatStart(isForward, isYoyo, index); }

    // if (index === 0) {
    //   onStart(isForward, isYoyo, index);
    //   this._ac = !isForward;
    // }

    // if forward direction call the `onRepeatStart` before `onStart`
    if (isForward === true) { onRepeatStart(isForward, isYoyo, index); }
  },

  /* ------------------- */
  /* The `Playback` part */
  /* ------------------- */

  /*
   * Method set playback `_state` string and call appropriate callbacks.
   *
   * @private
   * @param {String} State name [play, pause, 'stop', 'reverse']
   */
  _setState(state) {
    // save previous state
    this._prevState = this._state;
    this._state     = state;

    // callbacks
    var wasPause   = this._prevState === 'pause',
        wasStop    = this._prevState === 'stop',
        wasPlay    = this._prevState === 'play',
        wasReverse = this._prevState === 'reverse',
        wasPlaying = wasPlay || wasReverse,
        wasStill   = wasStop || wasPause;

    if ((state === 'play' || state === 'reverse') && wasStill) {
      this._props.onPlaybackStart(state, this._prevState);
    }
    if ( state === 'pause' && wasPlaying ) {
      this._props.onPlaybackPause();
    }
    if ( state === 'stop' && (wasPlaying || wasPause)) {
      this._props.onPlaybackStop();
    }
  },

  /**
   * onTweenerFinish - function that is called when the tweeener finished
   *                   playback for this tween and removed it from the queue
   *
   */
  onTweenerFinish() {
    this._setState('stop');
    this.reset();
    this._props.onPlaybackComplete();
  },

  /**
   * reset - function to reset the tween.
   */
  reset() {
    // reset all tweenies
    for (let i = 0; i < this._tweenies.length; i++) {
      this._tweenies[i].reset();
    }

    this._ac = false;
    this._elapsed = 0;
    this._setupUpdateFunction();
  },


};
// extend classProto
Tween.__proto__ = ClassProto;

/**
 * Imitate `class` with wrapper
 *
 * @param {Object} Options object.
 * @returns {Object} Tweenie instance.
 */
const wrap = (o) => {
  const instance = Object.create(Tween);
  instance.init(o);
  return instance;
}

export { wrap as Tween };
