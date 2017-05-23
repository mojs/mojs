import { Tweenie } from '../tween/tweenie';
import { Timeline } from '../tween/timeline';
import { Tweenable } from '../tween/tweenable';
import { Delta } from './delta';
import { separateTweenieOptions } from './separate-tweenie-options';

/* ------------------- */
/* The `Deltas` class  */
/* ------------------- */

const Super = Tweenable.__mojsClass;
const Deltas = Object.create(Super);

/**
 * `init` - function init the class.
 *
 * @extends @Tweenable
 * @public
 */
Deltas.init = function(o = {}) {
  // super call
  Super.init.call(this, o);

  // clone the options
  const options = { ...o };
  // get `timeline` options and remove them immediately
  const timelineOptions = options.timeline;
  delete options.timeline;

  // save the el object and remove it immediately
  this._el = options.el;
  delete options.el;

  // set up the main `tweenie`
  this._setupTweenie(options);
  // set up the `timeline`
  this._setupTimeline(timelineOptions);
  // parse deltas from options that left so far
  this._parseProperties(options);
};

/**
 * `_setupTweenie` - function to set up main tweenie.
 *
 * @param {Object} Options.
 */
Deltas._setupTweenie = function(options) {
  // separate main tweenie options
  const tweenieOptions = separateTweenieOptions(options);
  // create tween
  this.tween = new Tweenie({
    ...tweenieOptions,
    // update plain deltas on update
    // and call the previous `onUpdate` if present
    onUpdate: (ep, p, isForward) => {
      // update plain deltas
      this._upd_deltas(ep, p, isForward);
      // envoke onUpdate if present
      tweenieOptions.onUpdate && tweenieOptions.onUpdate(ep, p, isForward);
    }
  });
};

/**
 * `_setupTimeline` - function to set up main timeline.
 *
 * @param {Object} Timeline options.
 */
Deltas._setupTimeline = function(options) {
  this.timeline = new Timeline(options);
  this.timeline.add(this.tween);
};

/**
 * `_parseProperties` - function to parse deltas and static properties.
 *
 * @param {Object} Options.
 */
Deltas._parseProperties = function(options) {
  // deltas that have tween
  this._tweenDeltas = [];
  // deltas that don't have tween
  this._plainDeltas = [];
  // static properties
  this._staticProps = {};

  // loop thru options and create deltas with objects
  for (let key in options) {
    const value = options[key];
    // if value is tatic save it to static props
    if (typeof value !== 'object') {
      this._staticProps[key] = value;
      continue;
    }
    // if value is not static, create delta object
    const delta = new Delta({ key, object: value, target: this._el });
    // check if delta has own tween and add to `_tweenDeltas`
    if (delta.tween) { this._tweenDeltas.push(delta); }
    // else add to plain deltas
    else { this._plainDeltas.push(delta); }
  }
  // add tween deltas to the timeline
  this.timeline.add(this._tweenDeltas);
};

/**
 * `_upd_deltas` - function to update the plain deltas.
 *
 * @private
 * @param {Number} Eased progress.
 * @param {Number} Progress.
 * @param {Boolean} If forward update direction.
 * @returns {Object} This delta.
 */
Deltas._upd_deltas = function(ep, p, isForward) {
  // update plain deltas
  for (let i = 0; i < this._plainDeltas.length; i++ ) {
    this._plainDeltas[i].update(ep, p, isForward);
  }
};

/**
 * Imitate `class` with wrapper
 *
 * @param {Object} Options object.
 * @returns {Object} Tweenie instance.
 */
const wrap = (o) => {
  const instance = Object.create(Deltas);
  instance.init(o);

  return instance;
};

wrap.__mojsClass = Deltas;

export { wrap as Deltas };
