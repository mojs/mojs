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
    this._isActive = false;
  },

  onTweenerFinish() {},

  /**
   * update - function to update `Tweenie` with current time.
   */
  update(time) {
    const { onUpdate } = this._props;

    if (time >= this._start && time <= this._end) {
      let isActive;

      if (time > this._start && this._isActive === false) {
        this._props.onStart();
      }

      if (time === this._start) {
        this._props.onStart();
        isActive = false;
      }

      onUpdate((time - this._start) / this._props.duration);

      if (time < this._prevTime && this._isActive === false) {
        this._props.onComplete();
      }

      if (time === this._end) {
        this._props.onComplete();
        isActive = false;
      }

      this._isActive = (isActive === undefined) ? true : isActive;
    }

    if (time > this._end && this._isActive === true) {
      onUpdate(1);
      this._props.onComplete();
      this._isActive = false;
      // TODO: cover
      this._prevTime = time;
      // TODO: cover
      return true;
    }

    if (time < this._start && this._isActive === true) {
      this._props.onStart();
      onUpdate(0);
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
