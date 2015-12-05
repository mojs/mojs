(function() {
  var tween;

  window.mojs = {
    revision: '0.149.1',
    isDebug: true,
    helpers: require('./h'),
    Bit: require('./shapes/bit'),
    bitsMap: require('./shapes/bitsMap'),
    Circle: require('./shapes/circle'),
    Cross: require('./shapes/cross'),
    Line: require('./shapes/line'),
    Rect: require('./shapes/rect'),
    Polygon: require('./shapes/polygon'),
    Equal: require('./shapes/equal'),
    Zigzag: require('./shapes/zigzag'),
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

  tween = new mojs.Tween({
    delay: 2000,
    repeat: 2,
    onStart: function() {
      return console.log('--->>> start');
    },
    onUpdate: function(p) {
      return console.log(p);
    },
    onComplete: function() {
      return console.log('--->>> complete');
    },
    onRepeatComplete: function() {
      return console.log('--->>> repeat complete');
    }
  });

  tween.play();


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
