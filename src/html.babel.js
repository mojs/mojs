import { Tweenable } from './tween/tweenable';
import { Deltas } from './delta/deltas';
import { ClassProto } from './class-proto';

/* ----------------- */
/* The `Html` class  */
/* ----------------- */

const Super = Tweenable.__mojsClass;
const Html = Object.create(Super);

/**
 * `_declareDefaults` - Method to declare `_defaults`.
 *
 * @private
 * @overrides @ ClassProto
 */
Html._declareDefaults = function() {
  this._defaults = {
    is3d: false,
    el: null,
    customProperties: {},

    x: 0,
    y: 0,
    z: 0,

    skewX: 0,
    skewY: 0,

    angle: 0,
    angleX: 0,
    angleY: 0,
    angleZ: 0,

    scale: 1,
    scaleX: 1,
    scaleY: 1,
    scaleZ: 1
  };
};

/**
 * `init` - function init the class.
 *
 * @public
 * @extends @Tweenable
 */
Html.init = function(o = {}) {
  // super call
  Super.init.call(this, o);
  // setup deltas
  this._setupDeltas();
};

/**
 * `_setupDeltas` - function to set up `Deltas`.
 *
 * @private
 */
Html._setupDeltas = function() {
  const customProperties = this._getCustomProperties();

  this._deltas = new Deltas({
    ...this._props,
    customProperties
  });
  // save the `timeline` to make the `tweenable` work
  this.timeline = this._deltas.timeline;
};

/**
* `_render` - function to render the component.
*
* @private
* @param {Object} Target object to render to.
* @param {Array} Support objects.
*          @param {Object} support[0] Support object that will have
*                                     all properties that are `isSkipRender`.
*          @param {Object} support[1] Support render (original `render`
*                                     from `customProperties` in this context).
*/
Html._render = function(target, support) {
  // get the supportProps
  const { props, pipeObj } = support;

  target.transform = `translate(${props.x}, ${props.y}) rotate(${props.angle}deg) skew(${props.skewX}deg, ${props.skewY}deg) scale(${props.scale})`;

  // call the `supportRender`
  pipeObj(target, support);
};

/**
 * `_render3d` - function to render the component with 3d styles.
 *
 * @private
 * @param {Object} Target object to render to.
 * @param {Array} Support objects.
 *          @param {Object} support[0] Support object that will have
 *                                     all properties that are `isSkipRender`.
 *          @param {Object} support[1] Support render (original `render`
 *                                     from `customProperties` in this context).
 */
Html._render3d = function(target, support) {
  // get the supportProps
  const { props, pipeObj } = support;

  const rotateZ = (props.angleZ !== undefined) ? props.angleZ : props.angle;
  const scaleX = (props.scaleX !== undefined) ? props.scaleX : props.scale;
  const scaleY = (props.scaleY !== undefined) ? props.scaleY : props.scale;
  const scaleZ = (props.scaleZ !== undefined) ? props.scaleZ : props.scale;

  target.transform = `translate3d(${props.x}, ${props.y}, ${props.z}) rotateX(${props.angleX}deg) rotateY(${props.angleY}deg) rotateZ(${rotateZ}deg) skew(${props.skewX}deg, ${props.skewY}deg) scale3d(${scaleX}, ${scaleY}, ${scaleZ})`;
  // call the `supportRender`
  pipeObj(target, support);
};

/**
 * `_getCustomProperties` - function to create customProperties.
 *
 * @private
 * @return {Object} Custom properties.
 */
Html._getCustomProperties = function() {
  const unitProps = ['x', 'y', 'z'];
  const numberProps = ['angle', 'angleX', 'angleY', 'angleZ', 'skewX', 'skewY', 'scale', 'scaleX', 'scaleY', 'scaleZ'];
  const { customProperties } = this._props;
  const originalRender = customProperties.render;

  const customProps = {
    ...customProperties
  };

  for (let i = 0; i< unitProps.length; i++) {
    const prop = unitProps[i];
    customProps[prop] = { type: 'unit', isSkipRender: true };
  }

  for (let i = 0; i< numberProps.length; i++) {
    const prop = numberProps[i];
    customProps[prop] = { type: 'number', isSkipRender: true };
  }

  // if at least one of the `_default` properties set, pass the `render`
  // function regarding the fact if the 3d property used
  // otherwise pass thru the original `render` function
  customProps.render = (this._isRender())
    ? (this._is3dProperties()) ? this._render3d : this._render
    : originalRender;

  customProps.pipeObj = (this._isRender()) ? originalRender || (() => {}) : (() => {});

  return customProps;
};

/**
 * `_isRender` - function to check if render function
 *               should be used (one of the defaults defined).
 *
 * @return {Boolean} If render should be used
 */
Html._isRender = function() {
  const ignoreProperties = {
    el: 1,
    customProperties: 1,
    is3d: 1
  };

  for (let prop in this._defaults) {
    if (ignoreProperties[prop]) {
      continue;
    }

    if (this._o[prop] !== void 0) {
      return true
    }
  }

  return false;
};

/**
 * `_is3dProperties` - function to detect if the `3d` properties should be used.
 *
 * @return {Boolean} If 3d.
 */
Html._is3dProperties = function() {
  const isRotate3d = (this._o.angleX != null) || (this._o.angleY != null) || (this._o.angleZ != null);
  return this._is3d || (this._o.z != null) || (this._o.scaleZ != null) || isRotate3d;
}

/**
 * `_extendDefaults` - Method to copy `_o` options to `_props` object
 *                  with fallback to `_defaults`.
 *
 * @private
 * @overrides @ ClassProto
 */
Html._extendDefaults = function() {
  // super call
  ClassProto._extendDefaults.call(this);
  // delete `is3d` from options since we will pass them to `Deltas`
  this._is3d = this._props.is3d;
  delete this._props.is3d;
  // if el was passed as `selector`(`string`), find the element in the DOM
  this.el = this._props.el;
  if (typeof this.el === 'string') {
    this.el = document.querySelector(this.el);
  }
  // set the `el` on options to element style
  // since this what we will pass to deltas
  this._props.el = this.el.style;
};

/**
 * Imitate `class` with wrapper.
 *
 * @param {Object} Options object.
 * @returns {Object} `Html` instance.
 */
const wrap = (o) => {
  const instance = Object.create(Html);
  instance.init(o);

  return instance;
};

wrap.__mojsClass = Html;

export { wrap as Html };
