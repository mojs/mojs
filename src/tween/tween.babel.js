import ClassProto from '../class-proto';
import defaults from './tween-defaults';
import TweenPlanner from './planner';
import tweener from './tweener';

export default class Tween extends ClassProto {
  /**
   * _declareDefaults - function to declare module defaults.
   *                    In this case defaults are the `tween defaults`
   *                    since we will plan for tween.
   * @private
   */
  _declareDefaults() { return this._defaults = defaults; }

  /**
   * _vars - function do declare `variables` after `_defaults` were extended
   *         by `options` and saved to `_props`
   */
  _vars() {
    this._planner = new TweenPlanner(this._o);

    /**
     * TODO: cover
     */
    this._plan = this._planner.createPlan();

    /**
     * TODO: cover
     */
    this._totalTime = this._planner._totalTime;

    /**
     * TODO: cover
     */
    this._elapsed = 0;
    this._frameIndex = 0;
  }

  /**
   * _setStartTime - function to set animation start time.
   *
   * @private
   * @param {Number} Time to set.
   */
  _setStartTime(time) {
    if (time === undefined) { time = performance.now(); }
    this._startTime = time;
  }

  /**
   * _envokeCallBacks - function to envoke callbacks regarding frame snapshot.
   *
   * @private
   * @param {Number} Frame snapshot.
   */
  _envokeCallBacks(snapshot) {
    if (snapshot === 0) { return; };
    let mask = 1;

    const props = this._props;

    (snapshot & (mask <<= 1)) && props.onStart();
    (snapshot & (mask <<= 1)) && props.onRepeatStart();
    (snapshot & (mask <<= 1)) && props.onUpdate();
    (snapshot & (mask <<= 1)) && props.onRepeatComplete();
    (snapshot & (mask <<= 1)) && props.onComplete();
  }

  /**
   * update - function to envoke callbacks regarding current time.
   *
   * @public
   * @param {Number} Current time.
   */
  update(time) {
    const deltaTime = time - this._startTime;

    if (deltaTime > this._totalTime) {
      while (this._frameIndex < this._plan.length) {
        const snapshot = this._plan[this._frameIndex];
        this._envokeCallBacks(snapshot);
        this._elapsed += 16;
        this._frameIndex++;
      }
      return true;
    }

    while (this._elapsed <= deltaTime) {
      const snapshot = this._plan[this._frameIndex];
      this._envokeCallBacks(snapshot);
      this._elapsed += 16;
      this._frameIndex++;
    }
  }

  /**
   * play - description
   *
   * @public
   * @return {Object} This tween.
   */
  play() {
    this._setStartTime();
    tweener.add(this);
    return this;
  }

  /**
   * onTweenerFinish - callback that will be invoked when
   *                   `tween` playback completed.
   *
   */
  onTweenerFinish() {}

}
