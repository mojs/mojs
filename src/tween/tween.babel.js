import { ClassProto } from '../class-proto';
import { tweenDefaults } from './tween-defaults';
import tweener from './tweener';
import { Tweenie } from './tweenie';

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
          onStart: time => this._onStart(time),
          onComplete: time => this._onComplete(time),
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
    const { delay, duration } = this._props;

    this._start = startTime + delay;

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
    this._act.update(time);
    this._prevTime = time;
  },

  /**
   * _chimeOut - Tweenies `onChimeOut` callback handler.
   * @param {Boolean} Is forward direction.
   * @param {Number} The current update time.
   */
  _chimeOut(isForward, time) {
    if (isForward === false) { return; }

    this._active++;
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
    const tweenie = this._tweenies[this._active];
    if (tweenie !== void 0) {
      this._act = tweenie;
      tweenie.update(time);
    } else { this._active++; }
  },

  /**
   * `_onComplete` - Tweenies `onStart` callback handler
   */
  _onComplete() {
    const { onRepeatComplete } = this._props;

    onRepeatComplete();
  },

  /**
   * `_onStart` - Tweenies `onStart` callback handler
   */
  _onStart() {
    const { onRepeatStart } = this._props;

    onRepeatStart();
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
