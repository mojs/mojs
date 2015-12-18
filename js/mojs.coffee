
window.mojs =
  revision:   '0.159.0', isDebug: true
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
  Tween       : require './tween/tween'
  Timeline    : require './tween/timeline'
  tweener     : require './tween/tweener'
  easing      : require './easing/easing'

mojs.h     = mojs.helpers
mojs.delta = mojs.h.delta

# RANGE_MAX   = 10000
# rangeSlider = document.querySelector('#js-range-slider')
# obj         = document.querySelector('#js-el1')

# tw = new mojs.Tween
#   repeat: 3
#   yoyo: true
#   isIt: true
#   # delay: 500
#   duration: 3000
#   onStart:->
#   onComplete:->
#   onRepeatStart:->
#   onRepeatComplete:->
#   onFirstUpdate:->
#   onUpdate:(pe, p, isForward)->
#     mojs.h.style( obj, 'transform', "translate3d(#{200*pe}px, 0, 0)" )
#     # console.log "TWEEN ON_UPDATE: #{pe.toFixed(5)}, #{isForward}"

# tw._setProp( 'isReversed', true )

# setTimeout =>
#   tw
#     # .setProgress( 1 )
#     .play( 0 );
# , 1000

# rangeSlider.oninput = (e)->
#   proc = (1*rangeSlider.value)/10000
#   tw.setProgress proc

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "mojs", [], -> mojs
### istanbul ignore next ###
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = mojs
# ### istanbul ignore next ###
# return window?.mojs = mojs
