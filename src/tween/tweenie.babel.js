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

    this._time = delay + duration;

    // this._prevTime = -Infinity;
    this._prevTime;

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

    console.log(startTime);
    this._start = startTime + delay;
    this._end = this._start + duration;
  },

  onTweenerFinish() {},

  /**
   * update - function to update `Tweenie` with current time.
   */
  update(time) {
    const { onUpdate, isReverse, index } = this._props;
    this._o.isIt && console.log(`time: ${time}`);
    // if forward progress
    const isForward = time > this._prevTime;
    if (time >= this._start && time <= this._end && this._prevTime !== void 0) {
      let isActive;
      const p = (time - this._start) / this._props.duration;
      onUpdate(isReverse === false ? p : 1 - p);

      if (time > this._start && this._isActive === false && isForward == true) {
        // TODO: cover passing time to the callback
        // `onChimeIn`
        this._chCbs[0](isForward, time, index);
        // `onStart`
        this._cbs[0](isForward, isReverse, index);
      }

      if (time === this._start) {
        // TODO: cover passing time to the callback
        // `onChimeIn`
        this._chCbs[0](isForward, time, index);
        // `onStart`
        this._cbs[0](isForward, isReverse, index);
        // set `isActive` to `true` for forward direction
        // but set it to `false` for backward
        isActive = isForward;
        this._o.isIt && console.log(`equal: ${time}`);
      }

      if (time < this._end && this._isActive === false && isForward === false) {
        // `onComplete`
        this._cbs[1](false, isReverse, index);
        // TODO: cover passing time to the callback
        // `onChimeOut`
        this._chCbs[1](isForward, time, index);
      }

      if (time === this._end) {
        // `onComplete`
        this._cbs[1](isForward, isReverse, index);
        // TODO: cover passing time to the callback
        // `onChimeOut`
        this._chCbs[1](isForward, time, index);
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
      onUpdate(this._cbs[3]);
      // `onComplete`
      this._cbs[1](isForward, isReverse, index);
      // TODO: cover passing time to the callback
      // `onChimeOut`
      this._chCbs[1](isForward, time, index);
      this._isActive = false;
      this._prevTime = time;
      return true;
    }

    if (time < this._start) {
      // if `prevTime` was >= `_endTime` might need a refresh
      if (this._prevTime >= this._end) {
        this._props.onRefresh(true);
      }

      if (this._isActive === true) {
        // zero
        onUpdate(this._cbs[2]);
        // TODO: cover passing time to the callback
        // `onChimeIn`
        this._chCbs[0](isForward, time, index);
        // `onStart`
        this._cbs[0](isForward, isReverse, index);
        this._isActive = false;
        this._prevTime = time;

        return true;
      }
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
