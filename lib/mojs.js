(function() {
  window.mojs = {
    revision: '0.168.0',
    isDebug: true,
    helpers: require('./h'),
    shapesMap: require('./shapes/shapesMap'),
    Burst: require('./burst'),
    Transit: require('./transit'),
    Swirl: require('./swirl'),
    Stagger: require('./stagger'),
    Spriter: require('./spriter'),
    MotionPath: require('./motion-path'),
    Tween: require('./tween/tween'),
    Timeline: require('./tween/timeline'),
    tweener: require('./tween/tweener'),
    easing: require('./easing/easing')
  };

  mojs.h = mojs.helpers;

  mojs.delta = mojs.h.delta;


  /* istanbul ignore next */

  if ((typeof define === "function") && define.amd) {
    define("mojs", [], function() {
      return mojs;
    });
  }


  /* istanbul ignore next */

  if ((typeof module === "object") && (typeof module.exports === "object")) {
    module.exports = mojs;
  }

}).call(this);
