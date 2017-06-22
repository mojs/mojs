import { Tween } from '../tween/tween';
import { Timeline } from '../tween/timeline';
import { Tweenable } from '../tween/tweenable';
import { Delta } from './delta';
import { separateTweenOptions } from './separate-tween-options';
import { staggerProperty } from '../helpers/stagger-property';
// TODO: should point to paMotionPath stub
import { MotionPath } from './motion-path';

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

  // get `customProperties` options and remove them immediately
  this._customProperties = options.customProperties || {};
  this._render = this._customProperties.render || (() => {});
  this._pipeObj = this._customProperties.pipeObj || {};
  delete options.customProperties;

  // save the el object and remove it immediately
  this._el = options.el || {};
  delete options.el;
  // create support object for complex properties
  this._supportProps = {};
  // set up the main `tween`
  this._setupTween(options);
  // set up the `timeline`
  this._setupTimeline(timelineOptions);
  // parse deltas from options that left so far
  this._parseProperties(options);
};

/**
 * `_setupTween` - function to set up main tween.
 *
 * @param {Object} Options.
 */
Deltas._setupTween = function(options) {
  // separate main tween options
  const tweenOptions = separateTweenOptions(options);
  // create tween
  this.tween = new Tween({
    ...tweenOptions,
    // update plain deltas on update
    // and call the previous `onUpdate` if present
    onUpdate: (ep, p, isForward) => {
      // update plain deltas
      this._upd_deltas(ep, p, isForward);
      // envoke onUpdate if present
      tweenOptions.onUpdate && tweenOptions.onUpdate(ep, p, isForward);
    }
  });
};

/**
 * `_setupTimeline` - function to set up main timeline.
 *
 * @param {Object} Timeline options.
 */
Deltas._setupTimeline = function(options = {}) {
  const support = {
    props: this._supportProps,
    pipeObj: this._pipeObj
  };

  this.timeline = new Timeline({
    ...options,
    onUpdate: (ep, p, isForward) => {
      // call render function
      this._render(this._el, support, ep, p, isForward);
      // envoke onUpdate if present
      options.onUpdate && options.onUpdate(ep, p, isForward);
    }
  });
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
      // find out property `el`, it can be `supportProps` if the `isSkipRender`
      // is set for the property in the `customProperties`
      const custom = this._customProperties[key];
      const target = (custom && custom.isSkipRender)
        ? this._supportProps
        : this._el;
      // parse if `stagger(20, 40)` defined
      const property = staggerProperty(value, this.index);
      this._staticProps[key] = property;
      target[key] = property;
      continue;
    }
    // check the delta type
    let delta;
    if (value.path !== undefined) {
      delta = new MotionPath({
        el: this._el,
        ...value,
        supportProps: this._supportProps,
        property: key,
        index: this.index
      });
    } else {
      // if value is not motion path, create delta object
      delta = new Delta({
        key,
        target: this._el,
        supportProps: this._supportProps,
        object: value,
        customProperties: this._customProperties,
        index: this.index
      });
    }

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
 * Imitate `class` with wrapper.
 *
 * @param {Object} Options object.
 * @returns {Object} `Html` instance.
 */
const wrap = (o) => {
  const instance = Object.create(Deltas);
  instance.init(o);

  return instance;
};

wrap.__mojsClass = Deltas;

export { wrap as Deltas };
