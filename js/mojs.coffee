
window.mojs =
  revision:   '0.166.3', isDebug: true
  helpers     : require './h'
  shapesMap   : require './shapes/shapesMap'
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

# tm = new mojs.Timeline repeat: 1, yoyo: true

# tw = new mojs.Tween
#   isIt: 1
#   onStart:(isForward)-> # console.log("onStart, #{isForward}")
#   onRepeatStart:(isForward)-> # console.log("repeat start, #{isForward}")
#   onComplete:(isForward)-> # console.log("complete, #{isForward}")
#   onRepeatComplete:(isForward)-> # console.log("repeat complete, #{isForward}")
#   onFirstUpdate:(isForward)-> # console.log("first update, #{isForward}")
#   onProgress:(p, isForward)-> # console.log("progress, #{p}, #{isForward}")
#   onUpdate:(ep, p, isForward)-> # console.log("********** ONUPDATE: #{p}, #{isForward}")

# tm.add tw

# rangeSlider = document.querySelector ('#js-range-slider')

# rangeSlider.oninput = (e)->
#   proc = (1*rangeSlider.value)/6
#   tm.setProgress proc

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "mojs", [], -> mojs
### istanbul ignore next ###
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = mojs
# ### istanbul ignore next ###
# return window?.mojs = mojs
