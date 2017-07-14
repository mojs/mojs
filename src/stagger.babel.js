import { Timeline } from './tween/timeline.babel.js';
import { Tweenable } from './tween/tweenable.babel.js';
import { staggerProperty } from './helpers/stagger-property.babel.js';

/* -------------------- */
/* The `Stagger` class  */
/* -------------------- */

const Super = Tweenable.__mojsClass;
const Stagger = Object.create(Super);

/**
 * `init` - function init the class.
 *
 * @extends @Tweenable
 * @public
 */
Stagger.init = function (o = {}, Module) {
  // super call
  Super.init.call(this, o);
  // create main timeline
  this._createTimeline(o.timeline);
  // create modules
  this._createModules(Module);
};

/**
 * `_createModules` - function to create modules.
 *
 * @private
 * @param {Object} Child module class.
 */
Stagger._createModules = function (Module) {
  this._modules = [];
  const { items, el = {} } = this._o;
  const modulesCount = items || el.length || 1;

  for (let i = 0; i < modulesCount; i++) {
    const module = new Module({
      ...this._getStaggerOptions(this._o, i),
      totalItemsInStagger: modulesCount,
    });
    this._modules.push(module);
    this.timeline.add(module);
  }
};

/**
 * `_getStaggerOptions` - get stagger options for a single module.
 *
 * @private
 * @param {Object} Stagger options.
 * @param {Number} Index of a module.
 */
Stagger._getStaggerOptions = function (options, i, modulesCount) {
  // pass index to child properties
  const o = { index: i };

  const keys = Object.keys(options);
  for (let j = 0; j < keys.length; j++) {
    const key = keys[j];
    o[key] = staggerProperty(options[key], i, modulesCount);
  }

  return o;
};

/**
 * `_createTimeline` - function to create a timeline.
 *
 * @private
 * @param {Object} Timeline options.
 */
Stagger._createTimeline = function (options) {
  this.timeline = new Timeline(options);

  delete this._o.timeline;
};

/**
 * function to wrap a Module with the stagger wrapper.
 */
const stagger = (Module) => { // eslint-disable-line arrow-body-style
  return (options) => {
    const instance = Object.create(Stagger);
    instance.init(options, Module);

    return instance;
  };
};

export { stagger };
