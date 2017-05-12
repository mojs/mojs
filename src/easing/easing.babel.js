const { cos, sin, pow, sqrt, PI } = Math;
import { parseEasing } from './parse-easing';

/**
 * TODO:
 *  [] add `setParent` public method.
 */

/**
 * `easing` - object that holds all easing avaliable in `mojs`.
 */
const easing = {
  // parseEasing,
  /**
   * `Linear` easing, also `null` or `id` easing - simply returns whatever
   * passed to the function.
   * @param {Number} Progress in range of `[0...1]`
   * @returns {Number} Eased progress in range of `[0...1]`
   */
  linear: { none: k => k },

  /**
   * `Sin` easing. Has `in`/`out`/`inout` options.
   * @param {Number} Progress in range of `[0...1]`
   * @returns {Number} Eased progress in range of `[0...1]`
   */
  sin: {
     in: (k) => { return 1 - cos(k * PI / 2); },
     out: (k) => { return sin(k * PI / 2); },
     inout: (k) => { return 0.5 * (1 - cos(PI * k)); }
  },

  /**
   * `Quad` easing. Has `in`/`out`/`inout` options.
   * @param {Number} Progress in range of `[0...1]`
   * @returns {Number} Eased progress in range of `[0...1]`
   */
  quad: {
    in: (k) => { return k * k; },
    out: (k) => { return k * (2 - k); },
    inout: (k) => {
      return k<.5 ? 2*k*k : -1+(4-2*k)*k;
    }
  },

  /**
   * `Cubic` easing. Has `in`/`out`/`inout` options.
   * @param {Number} Progress in range of `[0...1]`
   * @returns {Number} Eased progress in range of `[0...1]`
   */
  cubic: {
    in: (k) => { return k * k * k; },
    out: (k) => { return --k * k * k + 1; },
    inout: (k) => {
      return k<.5 ? 4*k*k*k : (k-1)*(2*k-2)*(2*k-2)+1;
    }
  },

  /**
   * `Quart` easing. Has `in`/`out`/`inout` options.
   * @param {Number} Progress in range of `[0...1]`
   * @returns {Number} Eased progress in range of `[0...1]`
   */
  quart: {
    in: (k) => { return k * k * k * k; },
    out: (k) => { return 1 - (--k * k * k * k); },
    inout: (k) => {
      return k<.5 ? 8*k*k*k*k : 1-8*(--k)*k*k*k;
    }
  },

  /**
   * `Quint` easing. Has `in`/`out`/`inout` options.
   * @param {Number} Progress in range of `[0...1]`
   * @returns {Number} Eased progress in range of `[0...1]`
   */
  quint: {
    in: (k) => { return k * k * k * k * k; },
    out: (k) => { return --k * k * k * k * k + 1; },
    inout: (k) => {
      return k<.5 ? 16*k*k*k*k*k : 1+16*(--k)*k*k*k*k;
    }
  },

  /**
   * `Expo` easing. Has `in`/`out`/`inout` options.
   * @param {Number} Progress in range of `[0...1]`
   * @returns {Number} Eased progress in range of `[0...1]`
   */
  expo: {
    in: (k) => { return (k === 0) ? 0 : pow(1024, k - 1); },
    out: (k) => { return (k === 1) ? 1 : 1 - pow(2, -10 * k); },
    inout: (k) => {
      if (k === 0 || k === 1) {
				return k;
			}

			if ((k *= 2) < 1) {
				return 0.5 * Math.pow(1024, k - 1);
			}

			return 0.5 * (- Math.pow(2, - 10 * (k - 1)) + 2);
    }
  },

  /**
   * `Circ` easing. Has `in`/`out`/`inout` options.
   * @param {Number} Progress in range of `[0...1]`
   * @returns {Number} Eased progress in range of `[0...1]`
   */
  circ: {
    in: (k) => { return 1 - sqrt(1 - k * k); },
    out: (k) => { return sqrt(1 - (--k * k)); },
    inout: function(k) {
      if ((k *= 2) < 1) {
				return - 0.5 * (Math.sqrt(1 - k * k) - 1);
			}
      return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
    }
  },

  /**
   * `Elastic` easing. Has `in`/`out`/`inout` options.
   * @param {Number} Progress in range of `[0...1]`
   * @returns {Number} Eased progress in range of `[0...1]`
   */
  elastic: {
    in: (k) =>  {
      const p = 0.4;
      const a = 1;
      const s = p / 4;

      if (k === 0 || k === 1) { return k; }
      return -(a * pow(2, 10 * (k -= 1)) * sin((k - s) * (2 * PI) / p));
    },
    out: (k) => {
      const p = 0.4;
      const a = 1;
      const s = p / 4;

      if (k === 0 || k === 1) { return k; }
      return a * pow(2, -10 * k) * sin((k - s) * (2 * PI) / p) + 1;
    },
    inout: (k) => {
      if (k === 0 || k === 1) {
				return k;
			}

			k *= 2;

			if (k < 1) {
				return -0.5 * Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
			}

			return 0.5 * Math.pow(2, -10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI) + 1;
    }
  },

  /**
   * `Back` easing. Has `in`/`out`/`inout` options.
   * @param {Number} Progress in range of `[0...1]`
   * @returns {Number} Eased progress in range of `[0...1]`
   */
  back: {
    in: (k) => {
      const s = 1.70158;
      return k * k * ((s + 1) * k - s);
    },
    out: (k) => {
      const s = 1.70158;
      return --k * k * ((s + 1) * k + s) + 1;
    },
    inout: (k) => {
      var s = 1.70158 * 1.525;

			if ((k *= 2) < 1) {
				return 0.5 * (k * k * ((s + 1) * k - s));
			}

			return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
    }
  },

  /**
   * `Bounce` easing. Has `in`/`out`/`inout` options.
   * @param {Number} Progress in range of `[0...1]`
   * @returns {Number} Eased progress in range of `[0...1]`
   */
  bounce: {
    in: (k) => { return 1 - easing.bounce.out(1 - k); },
    out: (k) => {
      if (k < (1 / 2.75)) {
        return 7.5625 * k * k;
      } else if (k < (2 / 2.75)) {
        return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
      } else if (k < (2.5 / 2.75)) {
        return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
      } else {
        return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
      }
    },
    inout: (k) => {
      return ( k < 0.5 )
        ? easing.bounce.in(k * 2) * 0.5
        : easing.bounce.out(k * 2 - 1) * 0.5 + 0.5;
    }
  }
};

export { easing as easing };
