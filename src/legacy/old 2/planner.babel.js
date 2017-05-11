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
   * _vars - function do declare `variables` after `_defaults` were extended
   *         by `options` and saved to `_props`
   *
   * @return {type}  description
   */
  _vars() {
    // blueprint plan for callbacks
    this._plan = [];
    // get total duration time
    this._calcTotalTime();
    // create plan
    this.createPlan();
  }

  /**
   * createPlan - function to create an tween animation plan.
   *
   *  0 -> isDelay
   *  1 -> onUpdate
   *  2 -> isYoyo
   *  3 -> isYoyoBackward
   *  4 -> onStart
   *  5 -> onStartBackward
   *  6 -> onRepeatStart
   *  7 -> onRepeatStartBackward
   *  8 -> onRepeatComplete
   *  9 -> onRepeatCompleteBackward
   *  10 -> onComplete
   *  11 -> onCompleteBackward
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

    const { delay, duration, repeat } = this._props;
    // current time shift by `delay`
    // then add `8` to be sure we always are in the middle of the frame
    let time = delay + (step/2);

    while (time <= this._totalTime) {
      const prevPeriod = this._getPeriod(time - step);
      const period = this._getPeriod(time);
      const nextPeriod = this._getPeriod(time + step);
      const prevFrame = this._plan[this._plan.length-1];

      // delay
      let frameSnapshot = 0;
      if (period !== 'delay') {
        frameSnapshot = 1;
      }

      // *  0 -> isDelay
      // *  1 -> onUpdate
      // *  2 -> isYoyo
      // *  3 -> isYoyoBackward
      // *  4 -> onStart
      // *  5 -> onStartBackward
      // *  6 -> onRepeatStart
      // *  7 -> onRepeatStartBackward
      // *  8 -> onRepeatComplete
      // *  9 -> onRepeatCompleteBackward
      // *  10 -> onComplete
      // *  11 -> onCompleteBackward

      const isPrevFrame = prevFrame !== undefined;
      const isPrevDelay = prevPeriod === 'delay';

      // onStart
      if (!isPrevFrame) {
        frameSnapshot = frameSnapshot | (1 << 4);
      }

      // onRepeatStart
      if (!isPrevFrame || (isPrevDelay && period !== 'delay') || prevPeriod === period - 1) {
        frameSnapshot = frameSnapshot | (1 << 6);
      }

      // onRepeatStartBackward
      if ((period === 'delay' && nextPeriod !== 'delay') || (nextPeriod === period + 1 && nextPeriod < this._props.repeat+1) ) {
        frameSnapshot = frameSnapshot | (1 << 7);
      }

      // onRepeatComplete
      if ((period === 'delay' && prevPeriod !== 'delay') || (prevPeriod === period - 1 && prevPeriod !== -1)) {
        frameSnapshot = frameSnapshot | (1 << 8);
      }

      // onRepeatCompleteBackward
      if (period !== 'delay' && nextPeriod === 'delay' || nextPeriod === period + 1) {
        frameSnapshot = frameSnapshot | (1 << 9);
      }

      this._plan.push(frameSnapshot);
      time += step;
    }

    // onCompleteBackward
    const lastIndex = this._plan.length - 1;
    this._plan[lastIndex] = this._plan[lastIndex] | (1 << 11);

    // if (this._props.isReverse) { this.reverse(); }

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

  /**
   * reverse - function to reverse the plan.
   *
   * @return {Object} This planner.
   */
  // reverse() {
  //   this._plan.reverse();
  //
  //   return this;
  // }

}
