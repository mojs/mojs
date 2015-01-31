var Easing;

Easing = {
  Linear: {
    None: function(k) {
      return k;
    }
  },
  Quadratic: {
    In: function(k) {
      return k * k;
    },
    Out: function(k) {
      return k * (2 - k);
    },
    InOut: function(k) {
      if ((k *= 2) < 1) {
        return 0.5 * k * k;
      }
      return -0.5 * (--k * (k - 2) - 1);
    }
  },
  Cubic: {
    In: function(k) {
      return k * k * k;
    },
    Out: function(k) {
      return --k * k * k + 1;
    },
    InOut: function(k) {
      if ((k *= 2) < 1) {
        return 0.5 * k * k * k;
      }
      return 0.5 * ((k -= 2) * k * k + 2);
    }
  },
  Quartic: {
    In: function(k) {
      return k * k * k * k;
    },
    Out: function(k) {
      return 1 - (--k * k * k * k);
    },
    InOut: function(k) {
      if ((k *= 2) < 1) {
        return 0.5 * k * k * k * k;
      }
      return -0.5 * ((k -= 2) * k * k * k - 2);
    }
  },
  Quintic: {
    In: function(k) {
      return k * k * k * k * k;
    },
    Out: function(k) {
      return --k * k * k * k * k + 1;
    },
    InOut: function(k) {
      if ((k *= 2) < 1) {
        return 0.5 * k * k * k * k * k;
      }
      return 0.5 * ((k -= 2) * k * k * k * k + 2);
    }
  },
  Sinusoidal: {
    In: function(k) {
      return 1 - Math.cos(k * Math.PI / 2);
    },
    Out: function(k) {
      return Math.sin(k * Math.PI / 2);
    },
    InOut: function(k) {
      return 0.5 * (1 - Math.cos(Math.PI * k));
    }
  },
  Exponential: {
    In: function(k) {
      if (k === 0) {
        return 0;
      } else {
        return Math.pow(1024, k - 1);
      }
    },
    Out: function(k) {
      if (k === 1) {
        return 1;
      } else {
        return 1 - Math.pow(2, -10 * k);
      }
    },
    InOut: function(k) {
      if (k === 0) {
        return 0;
      }
      if (k === 1) {
        return 1;
      }
      if ((k *= 2) < 1) {
        return 0.5 * Math.pow(1024, k - 1);
      }
      return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
    }
  },
  Circular: {
    In: function(k) {
      return 1 - Math.sqrt(1 - k * k);
    },
    Out: function(k) {
      return Math.sqrt(1 - (--k * k));
    },
    InOut: function(k) {
      if ((k *= 2) < 1) {
        return -0.5 * (Math.sqrt(1 - k * k) - 1);
      }
      return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
    }
  },
  Elastic: {
    In: function(k) {
      var a, p, s;
      s = void 0;
      p = 0.4;
      if (k === 0) {
        return 0;
      }
      if (k === 1) {
        return 1;
      }
      a = 1;
      s = p / 4;
      return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
    },
    Out: function(k) {
      var a, p, s;
      s = void 0;
      p = 0.4;
      if (k === 0) {
        return 0;
      }
      if (k === 1) {
        return 1;
      }
      a = 1;
      s = p / 4;
      return a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1;
    },
    InOut: function(k) {
      var a, p, s;
      s = void 0;
      p = 0.4;
      if (k === 0) {
        return 0;
      }
      if (k === 1) {
        return 1;
      }
      a = 1;
      s = p / 4;
      if ((k *= 2) < 1) {
        return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
      }
      return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
    }
  },
  Back: {
    In: function(k) {
      var s;
      s = 1.70158;
      return k * k * ((s + 1) * k - s);
    },
    Out: function(k) {
      var s;
      s = 1.70158;
      return --k * k * ((s + 1) * k + s) + 1;
    },
    InOut: function(k) {
      var s;
      s = 1.70158 * 1.525;
      if ((k *= 2) < 1) {
        return 0.5 * (k * k * ((s + 1) * k - s));
      }
      return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
    }
  },
  Bounce: {
    In: function(k) {
      return 1 - Easing.Bounce.Out(1 - k);
    },
    Out: function(k) {
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
    InOut: function(k) {
      if (k < 0.5) {
        return Easing.Bounce.In(k * 2) * 0.5;
      }
      return Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;
    }
  }
};


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Easing", [], function() {
    return Easing;
  });
}


/* istanbul ignore next */

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Easing;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Easing = Easing;
}
