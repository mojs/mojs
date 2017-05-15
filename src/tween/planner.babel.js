import { ClassProto } from '../class-proto';

const Planner = Object.create(ClassProto);

/**
 * _vars - function do declare `variables` after `_defaults` were extended
 *         by `options` and saved to `_props`
 *
 * @return {type}  description
 */
Planner._vars = function() {
  // blueprint plan for callbacks
  this._plan = [];
  // create plan
  this.createPlan();
}

/**
 * createPlan - function to create an tween animation plan.
 *
 * @public
 */
Planner.createPlan = function() {
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

    // *  0 -> none
    // *  1 -> onUpdate
    // *  2 -> onStart&onChimeIn
    // *  3 -> onEnd&onChimeOut

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

  return this._plan;
}

/**
 * Imitate `class` with wrapper
 *
 * @param {Object} Options object.
 * @returns {Object} Tweenie instance.
 */
const wrap = (o) => {
  const instance = Object.create(Planner);
  instance.init(o);

  return instance;
};

wrap.__mojsClass = Planner;

export { wrap as TweenPlanner };
