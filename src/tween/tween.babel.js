import { ClassProto } from '../class-proto';
import { tweenDefaults } from './tween-defaults';
import { Tweenie } from './tweenie';
import tweener from './tweener';

const Tween = {
  /**
   * _declareDefaults - function to declare `_defaults` object.
   *
   * @private
   * @override ClassProto
   */
  _declareDefaults() {
    this._defaults = tweenDefaults;
  },

  /* -------------------- */
  /* The `Public` methods */
  /* -------------------- */

  // /**
  //  * reverse - function to reverse tween direction.
  //  *
  //  * @private
  //  * @override ClassProto
  //  */
  // reverse() {
  //   // change the update function
  //   this.update = this._updateRev();
  // },

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

    // create period tweenies
    this._createTweenies();

    const { repeat, isReverse } = this._props;
    // setup `update` function to `updateFwd` by default
    // and to `updateRev` if reversed, add `U` suffix if
    // update should go `undefined` tweenie
    const suffix = (repeat > 0) ? 'U' : '';
    const ending = (isReverse === true) ? 'Rev' : 'Fwd';
    const name = `_update${suffix}${ending}`;

    this.update = this[name];
  },

  /**
   * Function to create tweenies.
   *
   */
  _createTweenies() {
    const {
      repeat,
      delay,
      duration,
      onUpdate,
      onRefresh,
      isReverse
    } = this._props;

    let end = 0;
    for (let i = 0; i <= repeat; i++) {
      this._tweenies.push(
        Tweenie({
          index: i,
          delay: delay,
          duration,
          onUpdate,
          onRefresh,
          onStart: (isForward, isYoyo, index) => {
            this._onStart(isForward, isYoyo, index);
          },
          onComplete: (isForward, isYoyo, index) => {
            this._onComplete(isForward, isYoyo, index);
          },
          onChimeOut: (isForward, time) => { this._chimeOut(isForward, time); },
          onChimeIn: (isForward, time) => { this._chimeIn(isForward, time); }
        })
      );
    }
    // setup active `Tweenie` index
    // TODO: cover
    this._active = (isReverse) ? this._tweenies.length-1 : 0;
    this._act = this._tweenies[this._active];

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

    this._start = startTime + delay;

    this._tweenies[0].setStartTime(this._start - delay);
    for (let i = 1; i < this._tweenies.length; i++) {
      this._tweenies[i].setStartTime(this._tweenies[i-1]._end);
    }

    this._end = this._tweenies[this._tweenies.length-1]._end;
  },

  /**
   * _updateFwd - function to update `Tween` with forward current time.
   *
   * @private
   * @param {Number} Current update time.
   */
  _updateFwd(time) {
    this._act.update(time);
  },

  /**
   * _updateRev - function to update `Tween` with reversed current time.
   * @param {Number} Current update time.
   */
  _updateRev(time) {
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
   * @param {Boolean} Is forward direction.
   * @param {Number} The current update time.
   */
  _chimeOut(isForward, time) {
    if (isForward === false) { return; }

    this._active++;
    // if the next tween is present, update it with
    // the current time and set it as active(`_act`)
    const tweenie = this._tweenies[this._active];
    if (tweenie !== void 0) {
      this._act = tweenie;
      tweenie.update(time);
    } else { this._active--; }
  },

  /**
   * _chimeIn - Tweenies `onChimeIn` callback handler.
   */
  _chimeIn(isForward, time) {
    if (isForward === true) { return; }

    this._active--;
    // if the previous tween is present, update it with
    // the current time and set it as active(`_act`)
    const tweenie = this._tweenies[this._active];
    if (tweenie !== void 0) {
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
    const { onRepeatComplete, onComplete } = this._props;
    // if forward direction call the `onRepeatComplete` before `onComplete`
    if (isForward === true) {
      onRepeatComplete(isForward, isYoyo, index);
    }
    if (index === this._tweenies.length-1) {
      onComplete(isForward, isYoyo, index);
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
    const { onRepeatStart, onStart } = this._props;
    // if forward direction call the `onRepeatStart` before `onStart`
    if (isForward === false) { onRepeatStart(isForward, isYoyo, index); }
    if (index === 0) { onStart(isForward, isYoyo, index); }
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

  // /*
  //  * Method to set _resumeTime, _startTime and _prevTime.
  //  *
  //  * @private
  //  * @param {String} Current state. [play, reverse]
  //  * @param {Number} Time shift.
  //  */
  // _setResumeTime(state, shift = 0) {
  //   // get current moment as resume time
  //   this._resumeTime = performance.now();
  //   // set start time regarding passed `shift` and `procTime`
  //   const startTime = this._resumeTime - Math.abs(shift) - this._progressTime;
  //   this.setStartTime(startTime, false);
  // },

  onTweenerFinish() {},
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
