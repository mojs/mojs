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

  /**
   * _vars - function do declare `variables` after `_defaults` were extended
   *         by `options` and saved to `_props`
   *
   * @override ClassProto
   * @return {type}  description
   */
  _vars() {
    this._tweenies = [];
    this._p = 0;

    this._createTweenies();
  },

  /**
   * Function to create tweenies.
   *
   */
  _createTweenies() {
    const { repeat, delay, duration, onUpdate } = this._props;

    for (let i = 0; i <= repeat; i++) {
      this._tweenies.push(
        Tweenie({
          index: i,
          onUpdate,
          delay,
          duration,
          onStart: (isForward, isYoyo, time, index) => {
            this._onStart(isForward, isYoyo, time, index);
          },
          onComplete: (isForward, isYoyo, time, index) => {
            this._onComplete(isForward, isYoyo, time, index);
          },
          onChimeOut: (isForward, time) => { this._chimeOut(isForward, time); },
          onChimeIn: (isForward, time) => { this._chimeIn(isForward, time); }
        })
      );
    }
    // setup active `Tweenie` index
    this._active = 0;
    this._act = this._tweenies[0];
  },

  /**
   * setStartTime - function to set `startTime`
   *
   * @param {Number, Undefined} Start time to set.
   */
  setStartTime(startTime = performance.now()) {
    const { delay, duration, repeat } = this._props;

    this._spot = startTime;
    this._start = startTime + delay;
    this._time = (repeat + 1) * (delay + duration);

    this._tweenies[0].setStartTime(this._start);
    for (let i = 1; i < this._tweenies.length; i++) {
      this._tweenies[i].setStartTime(this._tweenies[i-1]._end);
    }

    this._end = this._tweenies[this._tweenies.length-1]._end;
  },

  /**
   * update - function to update `Tween` with current time.
   */
  update(time) {
    if (time >= this._spot && time <= this._end) {
      this._p = (time - this._spot) / this._time;
      this._props.onProgress(this._p);
    }

    this._act.update(time);
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
   * @param {Number} Update time that triggers the callback.
   * @param {Number} Update period.
   */
  _onComplete(isForward, isYoyo, time, index) {
    const { onRepeatComplete, onComplete } = this._props;
    // if forward direction call the `onRepeatComplete` before `onComplete`
    if (isForward === true) {
      onRepeatComplete(isForward, isYoyo, time, index);
    }
    if (index === this._tweenies.length-1) {
      onComplete(isForward, isYoyo, time, index);
    }
    // if forward direction call the `onRepeatComplete` after `onComplete`
    if (isForward === false) {
      onRepeatComplete(isForward, isYoyo, time, index);
    }
  },

  /**
   * `_onStart` - Tweenies `onStart` callback handler
   * @param {Boolean} isForward direction.
   * @param {Boolean} isYoyo period.
   * @param {Number} Update time that triggers the callback.
   * @param {Number} Update period.
   */
  _onStart(isForward, isYoyo, time, index) {
    const { onRepeatStart, onStart } = this._props;
    // if forward direction call the `onRepeatStart` before `onStart`
    if (isForward === false) { onRepeatStart(isForward, isYoyo, time, index); }
    if (index === 0) { onStart(isForward, isYoyo, time, index); }
    // if forward direction call the `onRepeatStart` before `onStart`
    if (isForward === true) { onRepeatStart(isForward, isYoyo, time, index); }
  },

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
