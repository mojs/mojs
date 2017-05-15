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
  // frame size (60fps)
  const step = 16;

  const { duration } = this._props;
  // current time shift by `delay`
  // then add `8` to be sure we always are in the middle of the frame
  let time = (step/2);

  // *  0 -> onUpdate
  // *  1 -> onStart&onChimeIn
  // *  2 -> onEnd&onChimeOut

  while (time <= duration) {
    let frameSnapshot = 0;

    // onStart
    if (time === step/2) {
      frameSnapshot = frameSnapshot | (1 << 1);
    }

    this._plan.push(frameSnapshot);
    time += step;
  }

  // onCompleteBackward
  const lastIndex = this._plan.length - 1;
  this._plan[lastIndex] = this._plan[lastIndex] | (1 << 2);

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
