import { pow } from './pow';

/**
 * `addBasicEasing` - function to add `basic easing functions`.
 *
 * @param {Object} `mojs` object.
 */
const addBasicEasing = (mojs) => {
  /**
   * `Quad` easing. Has `in`/`out`/`inout` options.
   * @param {Number} Progress in range of `[0...1]`
   * @returns {Number} Eased progress in range of `[0...1]`
   */
  mojs.easing.quad = pow(2);

  /**
   * `Cubic` easing. Has `in`/`out`/`inout` options.
   * @param {Number} Progress in range of `[0...1]`
   * @returns {Number} Eased progress in range of `[0...1]`
   */
  mojs.easing.cubic = pow(3);

  /**
   * `Quart` easing. Has `in`/`out`/`inout` options.
   * @param {Number} Progress in range of `[0...1]`
   * @returns {Number} Eased progress in range of `[0...1]`
   */
  mojs.easing.quart = pow(4);

  /**
   * `Quint` easing. Has `in`/`out`/`inout` options.
   * @param {Number} Progress in range of `[0...1]`
   * @returns {Number} Eased progress in range of `[0...1]`
   */
  mojs.easing.quint = pow(5);

  /**
   * `Expo` easing. Has `in`/`out`/`inout` options.
   * @param {Number} Progress in range of `[0...1]`
   * @returns {Number} Eased progress in range of `[0...1]`
   */
  mojs.easing.expo = {
    in: (k) => { return (k === 0) ? 0 : Math.pow(1024, k - 1); },
    out: (k) => { return (k === 1) ? 1 : 1 - Math.pow(2, -10 * k); },
    inout: (k) => {
      if (k === 0 || k === 1) {
				return k;
			}

			if ((k *= 2) < 1) {
				return 0.5 * Math.pow(1024, k - 1);
			}

			return 0.5 * (- Math.pow(2, - 10 * (k - 1)) + 2);
    }
  };

  /**
   * `Circ` easing. Has `in`/`out`/`inout` options.
   * @param {Number} Progress in range of `[0...1]`
   * @returns {Number} Eased progress in range of `[0...1]`
   */
  mojs.easing.circ = {
    in: (k) => { return 1 - Math.sqrt(1 - k * k); },
    out: (k) => { return Math.sqrt(1 - (--k * k)); },
    inout: function(k) {
      if ((k *= 2) < 1) {
				return -0.5 * (Math.sqrt(1 - k * k) - 1);
			}
      return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
    }
  };

  /**
   * `Elastic` easing. Has `in`/`out`/`inout` options.
   * @param {Number} Progress in range of `[0...1]`
   * @returns {Number} Eased progress in range of `[0...1]`
   */
  mojs.easing.elastic = {
    in: (k) =>  {
      const p = 0.4;
      const a = 1;
      const s = p / 4;

      if (k === 0 || k === 1) { return k; }
      return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
    },
    out: (k) => {
      const p = 0.4;
      const a = 1;
      const s = p / 4;

      if (k === 0 || k === 1) { return k; }
      return a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1;
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
  };

  /**
   * `Back` easing. Has `in`/`out`/`inout` options.
   * @param {Number} Progress in range of `[0...1]`
   * @returns {Number} Eased progress in range of `[0...1]`
   */
  mojs.easing.back = {
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
  };

  /**
   * `Bounce` easing. Has `in`/`out`/`inout` options.
   * @param {Number} Progress in range of `[0...1]`
   * @returns {Number} Eased progress in range of `[0...1]`
   */
  mojs.easing.bounce = {
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
  };

};

export { addBasicEasing as addBasicEasing };
