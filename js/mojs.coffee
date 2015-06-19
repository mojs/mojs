
mojs =
  revision:   '0.119.0', isDebug: true
  helpers     : require './h'
  Bit         : require './shapes/bit'
  bitsMap     : require './shapes/bitsMap'
  Circle      : require './shapes/circle'
  Cross       : require './shapes/cross'
  Line        : require './shapes/line'
  Rect        : require './shapes/rect'
  Polygon     : require './shapes/polygon'
  Equal       : require './shapes/equal'
  Zigzag      : require './shapes/zigzag'
  Burst       : require './burst'
  Transit     : require './transit'
  Swirl       : require './swirl'
  Stagger     : require './stagger'
  Spriter     : require './spriter'
  MotionPath  : require './motion-path'
  Timeline    : require './tween/timeline'
  Tween       : require './tween/tween'
  tweener     : require './tween/tweener'
  easing      : require './easing'

mojs.h     = mojs.helpers
mojs.delta = mojs.h.delta


el = document.querySelector '#js-sprite'
easing = mojs.easing.path 'M0,100 C4.00577744,92.3519448
                            8.46993511,63.9895504 13.1512887,0.0901667719
                            L21.3497674,0.0450612221 C21.3497674,-1.77229627
                            30.5883328,115.057627 42.9949846,0.0450612221
                            L48.1345723,0.0450612221 C48.1345723,-0.774700647
                            54.5357691,56.4124428 63.0607938,0.0450612221
                            L66.17434,0.0450612221 C66.17434,-0.960124778
                            70.5072591,29.23993 76.7835754,0.0450612221
                            L78.6555388,0.0450612221 C78.6555388,0.000360393587
                            81.8632425,16.4914595 86.0928122,0.0450612221
                            L87.2894428,0.0450612221 C87.2894428,-0.761743229
                            89.1622181,9.6571475 92.2144672,0.0450612221
                            L93.1382971,0.0450612221 C93.1382971,-0.227841855
                            94.7579743,4.40567189 96.9144218,0.0450612221
                            L97.5682773,0.0450612221 C97.5682773,-0.227841855
                            98.9774879,1.86613741 100,0.0450612221'

timeline = new mojs.Timeline
  delay:    1000
  duration: 12600
  onUpdate:(p)->
    # console.time 'sample'
    ease = easing(p)
    # console.log ease
    # console.timeEnd 'sample'
    # console.log p, ease
    # mojs.easing.bounce.out
    el.style.transform = "translateY(#{600*ease}px)"

tween = new mojs.Tween

tween.add timeline
tween.start()


### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "mojs", [], -> mojs
### istanbul ignore next ###
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = mojs
### istanbul ignore next ###
return window?.mojs = mojs
