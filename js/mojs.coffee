
window.mojs =
  revision:   '0.154.9', isDebug: true
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

# RANGE_MAX = 10000
# rangeSlider = document.querySelector('#js-range-slider')

# tw2 = new mojs.Tween duration: 4400

# obj = document.querySelector('#js-el1')

# tw = new mojs.Tween
#   repeat: 2
#   yoyo: true
#   # isIt: true
#   # delay: 200
#   isIt2: true
#   onUpdate:(pe, p, isForward)->
#     mojs.h.style( obj, 'transform', "translate3d(#{200*pe}px, 0, 0)" )
#     console.log "ON_UPDATE: #{pe.toFixed(5)}, #{isForward}"

#   onStart:(isForward)->    console.log "ON_START: #{isForward}"
#   onComplete:(isForward)-> console.log "ON_COMPLETE: #{isForward}"
#   onRepeatStart:(isForward)-> console.log "ON_REPEAT_START: #{isForward}"
#   onRepeatComplete:(isForward)-> console.log "ON_REPEAT_COMPLETE: #{isForward}"
#   onFirstUpdate:(isForward)-> console.log "ON_FIRST_UPDATE: #{isForward}"

# tm = new mojs.Timeline
# tm.add tw#, tw2
# # tm.play()

# rangeSlider.oninput = (e)->
#   proc = (1*rangeSlider.value)/10000
#   tm.setProgress proc

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "mojs", [], -> mojs
### istanbul ignore next ###
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = mojs
# ### istanbul ignore next ###
# return window?.mojs = mojs
