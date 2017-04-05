import ClassProto from '../class-proto';
import defaults from './tween-defaults';

export default class Planner extends ClassProto {
  /**
   * _declareDefaults - function to declare module defaults.
   *                    In this case defaults are the `tween defaults`
   *                    since we will plan for tween.
   *
   * @private
   */
  _declareDefaults() { return this._defaults = defaults; }

  /**
   * _extendDefaults - Method to copy `_o` options to `_props` object
   *                  with fallback to `_defaults`.
   * @private
   */
  _extendDefaults() {
    super._extendDefaults();

    const { delay, duration, speed } = this._props;
    // save the original `delay` property
    this._originalDelay = delay;
    // save the original `duration` property
    this._originalDuration = duration;
    // normalize `delay` and `duration` regarding `speed`
    this._normalizeDelayAndDuration();
  }

  /**
   * _normalizeDelayAndDuration - function to normalize `delay` and `duration`
   *                              regarding `speed` property.
   *
   * @return {type}  description
   */
  _normalizeDelayAndDuration() {
    const { speed } = this._props;
    // normalize `delay` regarding `speed`
    this._props.delay = this._originalDelay / speed;
    // normalize `duration` regarding `speed`
    this._props.duration = this._originalDuration / speed;
  }

  /**
   * _vars - function do declare `variables` after `_defaults` were extended
   *         by `options` and saved to `_props`
   *
   * @return {type}  description
   */
  _vars() {
    this._plan = [];

    // get total duration time
    this._calcTotalTime();
  }

  /**
   * createPlan - function to create an tween animation plan.
   *
   * @public
   */
  createPlan() {
    // reset plan
    this._plan.length = 0;
    // recalculate total duration time
    this._calcTotalTime();

    // frame size (60fps)
    const step = 16;
    // current time
    let time = this._props.delay;

    // this._o.isIt && console.log(this._totalTime);
    while (time <= this._totalTime) {
      const prevPeriod = this._getPeriod(time - step);
      const period = this._getPeriod(time);
      const nextPeriod = this._getPeriod(time + step);
      const prevFrame = this._plan[this._plan.length-1];

      // this._o.isIt && console.log(`time: ${time}, prevPeriod: ${prevPeriod}, period: ${period}, nextPeriod: ${nextPeriod}`);
      let frameSnapshot = 0;

      if (period === 'delay') {
        this._plan.push(frameSnapshot);
        time += step;
        continue;
      }

      // onUpdate
      frameSnapshot = frameSnapshot | (1 << 3);

      const isPrevFrame = prevFrame !== undefined;

      if (!isPrevFrame) {
        // onStart
        frameSnapshot = frameSnapshot | (1 << 1);
      }

      const isPrevDelay = prevPeriod === 'delay';
      // onRepeatStart
      if (!isPrevFrame || isPrevDelay || prevPeriod === period - 1) {
        frameSnapshot = frameSnapshot | (1 << 2);
      }

      // onRepeatComplete
      if (nextPeriod === 'delay' || nextPeriod === period + 1) {
        this._o.isIt && console.log(`yep`);
        frameSnapshot = frameSnapshot | (1 << 4);
      }

      // this._o.isIt && console.log(`frameSnapshot: ${frameSnapshot}`);

      this._plan.push(frameSnapshot);

      time += step;
    }

    // onComplete
    const lastIndex = this._plan.length - 1;
    this._o.isIt && console.log(`lastItem: ${this._plan[lastIndex]}`);
    this._plan[lastIndex] = this._plan[lastIndex] | (1 << 5);

    return this._plan;
  }

  /**
   * _calcBounds - function to calculate `totalTime`
   */
  _calcTotalTime() {
    const { delay, duration, repeat } = this._props;
    const time = duration + delay;

    this._totalTime = time * (repeat + 1);
  }

  /**
   * _getPeriod - Method to get current period number.
   *
   * @private
   * @param {Number} Time to get the period for.
   * @returns {Number} Current period number.
   */
  _getPeriod(time) {
    const { delay, duration } = this._props;

    const TTime = delay + duration;
    let period = time / TTime;
    // if time if equal to endTime we need to set the elapsed
    // time to 0 to fix the occasional precision js bug, which
    // causes 0 to be something like 1e-12
    const elapsed = (time < this._totalTime) ? time % TTime : 0;
    // If the latest period, round the result, otherwise floor it.
    // Basically we always can floor the result, but because of js
    // precision issues, sometimes the result is 2.99999998 which
    // will result in 2 instead of 3 after the floor operation.
    period = (time >= this._totalTime)
      ? Math.round(period) : Math.floor(period);
    // if time is larger then the end time
    if (time > this._totalTime) {
      // set equal to the periods count
      return Math.round(this._totalTime/TTime);
    // if in delay gap, set _delayT to current
    // period number and return "delay"
    } else if (elapsed > 0 && elapsed < delay) {
      return 'delay';
    // if right at the end of one repeat period and there is delay
    // period should be `delay` vs `period + 1`
    } else if (elapsed === 0 && time < this._totalTime && time < delay) {
      return 'delay';
    } else if (elapsed === 0 && time > delay) {
      return period-1;
    }
    // if the end of period and there is a delay
    return period;
  }

}
