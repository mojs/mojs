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
  _declareDefaults() { return this._defaults = {...defaults}; }

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
   * _createPlan - function to create an tween animation plan.
   *
   * @private
   */
  _createPlan() {
    const { duration } = this._props;

    // reset plan
    this._plan.length = 0;
    // recalculate total duration time
    this._calcTotalTime();

    // frame size (60fps)
    const step = 16;
    // current time
    let time = 0;

    while (time < duration) {
      const prevPeriod = this._getPeriod(time-step);
      const period = this._getPeriod(time);
      const nextPeriod = this._getPeriod(time+step);
      const prevFrame = this._plan[this._plan.length-1];
      let frameSnapshot = 0;

      if (period === 'delay') {
        this._plan.push(0);
        continue;
      }

      // ((id & (1 << 0))) && (this._o.onRefresh());
      // ((id & (1 << 1))) && (this._o.onStart());
      // ((id & (1 << 2))) && (this._o.onRepeatStart());
      // ((id & (1 << 3))) && (this._o.onFirstUpdate());
      // ((id & (1 << 4)) && (this._o.onUpdate());
      // ((id & (1 << 5))) && (this._o.onRepeatComplete());
      // ((id & (1 << 6))) && (this._o.onComplete());

      // ((id & (1 << 0))) && (this._o.onRefresh());
      // ((id & (1 << 1))) && (this._o.onStart());
      // ((id & (1 << 2))) && (this._o.onRepeatStart());
      // ((id & (1 << 3))) && (this._o.onFirstUpdate());
      // ((id & (1 << 4)) && (this._o.onUpdate());
      // ((id & (1 << 5))) && (this._o.onRepeatComplete());
      // ((id & (1 << 6))) && (this._o.onComplete());

      if (period != 'delay') {
        // onUpdate
        frameSnapshot = frameSnapshot | (1 << 4);

        const isPrevFrame = prevFrame !== undefined;

        if (!isPrevFrame) {
          // onRefresh
          frameSnapshot = frameSnapshot | (1 << 0);
          // onStart
          frameSnapshot = frameSnapshot | (1 << 1);
        }

        const isPrevDelay = prevPeriod === 'delay';
        // onRepeatStart
        if (!isPrevFrame || isPrevDelay || prevPeriod === period - 1) {
          frameSnapshot = frameSnapshot | (1 << 2);
        }
      }


      this._plan.push(frameSnapshot);

      time += step;
    }
  }


  /**
   * _calcBounds - function to calculate `totalTime`
   *
   * @return {type}  description
   */
  _calcTotalTime() {
    const { delay, duration, repeat } = this._props;
    const time = duration + delay;

    this._totalTime = (time * (repeat + 1)) - delay;
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

    /**
     * Time normalization. Since we omit the first `delay` period when setting
     * a starttime, we can drop the first `delay` period entirely, but here,
     * we need to add the `delay` pretending the delay already elapsed.
     */
    time += delay;

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
    period = (time >= this._totalTime) ? Math.round(period) : Math.floor(period);
    // if time is larger then the end time
    if (time > this._totalTime) {
      // set equal to the periods count
      period = Math.round(this._totalTime / TTime );
    // if in delay gap, set _delayT to current
    // period number and return "delay"
    } else if (elapsed > 0 && elapsed < delay) {
      period = 'delay';
    }
    // if the end of period and there is a delay
    return period;
  }

}
