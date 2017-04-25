import { ClassProto } from '../class-proto';
import { tweenieDefaults } from './tweenie-defaults';

const Tweenie = {
  /**
   * _declareDefaults - function to declare `_defaults` object.
   *
   * @private
   * @override ClassProto
   */
  _declareDefaults() {
    this._defaults = tweenieDefaults;
  },

  /**
   * _vars - function do declare `variables` after `_defaults` were extended
   *         by `options` and saved to `_props`
   *
   * @return {type}  description
   */
  _vars() {
    const { isReverse } = this._props;
    const { onStart, onComplete, onChimeIn, onChimeOut } = this._props;

    // callbacks array - used to flip the callbacks order on `isReverse`
    this._cbs = [ onStart, onComplete, 0, 1 ];
    // chime callbacks
    this._chCbs = [ onChimeIn, onChimeOut ];
    // if `isReverse` - flip the callbacks
    if (isReverse === true) {
      this._cbs = [ this._cbs[1], this._cbs[0], 1 - this._cbs[2], 1 - this._cbs[3] ];
    }
  },

  // TODO: cover
  /**
   * setStartTime - function to set `startTime`
   *
   * @param {Number} Start time to set.
   */
  setStartTime(startTime = 0) {
    const { delay, duration } = this._props;

    this._start = startTime + delay;
    this._end = this._start + duration;
    this._time = delay + duration;
    this._isActive = false;
  },

  onTweenerFinish() {},

  /**
   * update - function to update `Tweenie` with current time.
   */
  update(time) {
    const { onUpdate, isReverse } = this._props;

    if (time >= this._start && time <= this._end) {
      let isActive;

      if (time > this._start && this._isActive === false) {
        // TODO: cover passing time to the callback
        // `onChimeIn`
        this._chCbs[0](time);
        // `onStart`
        this._cbs[0]();
      }

      if (time === this._start) {
        // TODO: cover passing time to the callback
        // `onChimeIn`
        this._chCbs[0](time);
        // `onStart`
        this._cbs[0]();
        isActive = false;
      }

      const p = (time - this._start) / this._props.duration;
      onUpdate(isReverse === false ? p : 1 - p);

      if (time < this._prevTime && this._isActive === false) {
        // `onComplete`
        this._cbs[1]();
        // TODO: cover passing time to the callback
        // `onChimeOut`
        this._chCbs[1](time);
      }

      if (time === this._end) {
        // `onComplete`
        this._cbs[1]();
        // TODO: cover passing time to the callback
        // `onChimeOut`
        this._chCbs[1](time);
        isActive = false;
      }

      this._isActive = (isActive === undefined) ? true : isActive;
    }

    if (time > this._end && this._isActive === true) {
      // one
      onUpdate(this._cbs[3]);
      // `onComplete`
      this._cbs[1]();
      // TODO: cover passing time to the callback
      // `onChimeOut`
      this._chCbs[1](time);
      this._isActive = false;
      // TODO: cover
      this._prevTime = time;
      // TODO: cover
      return true;
    }

    if (time < this._start && this._isActive === true) {
      // TODO: cover passing time to the callback
      // `onChimeIn`
      this._chCbs[0](time);
      // `onStart`
      this._cbs[0]();
      // zero
      onUpdate(this._cbs[2]);
      this._isActive = false;
    }

    this._prevTime = time;
  }
}
// extend classProto
Tweenie.__proto__ = ClassProto;

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
}

export { wrap as Tweenie };
