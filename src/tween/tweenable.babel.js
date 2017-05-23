import { ClassProto } from '../class-proto';

/* --------------------- */
/* The `Tweenable` class */
/* --------------------- */

const Super = ClassProto;
const Tweenable = Object.create(Super);

/**
 * `init` - lifecycle initialization function.
 *
 * @private
 * @extends @ ClassProto
 */
Tweenable.init = function(o) {
  Super.init.call(this, o);
  // proxy all tweenie public methods to `timeline` with fallback to `tween`
  const methods = [ 'play', 'pause', 'stop', 'replay', 'setSpeed', 'reverse', 'setProgress', 'reset', 'setStartTime' ];
  for (let i = 0; i < methods.length; i++) {
    const method = methods[i];
    this[method] = (...rest) => {
      rest; // otherwise rest arguments got lost
      (this.timeline || this.tween)[method](...rest);
    }
  }
};

/**
 * Imitate `class` with wrapper
 *
 * @param {Object} Options object.
 * @returns {Object} Tweenie instance.
 */
const wrap = (o) => {
  const instance = Object.create(Tweenable);
  instance.init(o);

  return instance;
};

wrap.__mojsClass = Tweenable;

export { wrap as Tweenable };
