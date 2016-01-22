
window.mojs =
  revision:   '0.166.8', isDebug: true
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

# # TODO:

# tm = new mojs.Timeline repeat: 1, yoyo: true

# tw = new mojs.Tween
#   isIt: 1
#   repeat: 2
#   speed: .5
#   # yoyo: true
#   duration: 2000
#   delay: 1000
#   onStart:(isForward, isYoyo)-># console.log("onStart, isForward: #{isForward}, isYoyo: #{isYoyo}")
#   onRepeatStart:(isForward, isYoyo)-># console.log("repeat start, isForward: #{isForward}, isYoyo: #{isYoyo}")
#   onComplete:(isForward, isYoyo)-># console.log("complete, isForward: #{isForward}, isYoyo: #{isYoyo}")
#   onRepeatComplete:(isForward, isYoyo)-># console.log("repeat complete, isForward: #{isForward}, isYoyo: #{isYoyo}")
#   onFirstUpdate:(isForward, isYoyo)-># console.log("first update, isForward: #{isForward}, isYoyo: #{isYoyo}")
#   onProgress:(p, isForward, isYoyo)-># console.log("progress, #{p.toFixed(4)}, isForward: #{isForward}, isYoyo: #{isYoyo}")
#   onUpdate:(ep, p, isForward, isYoyo)->
#     # console.log("********** ONUPDATE: #{p.toFixed(4)}, isForward: #{isForward}, isYoyo: #{isYoyo}")
#     mojs.h.style el, 'transform', "translateX(#{400*p}px)"

# tm.add tw

# el = document.querySelector '#js-el1'
# playEl      = document.querySelector('#js-play')
# reverseEl   = document.querySelector('#js-reverse')
# pauseEl     = document.querySelector('#js-pause')
# stopEl      = document.querySelector('#js-stop')
# rangeSlider = document.querySelector ('#js-range-slider')

# runner = tw

# playEl.addEventListener 'click',  ->
#   # console.clear();
#   runner.play()
# reverseEl.addEventListener 'click', -> runner.playBackward()
# pauseEl.addEventListener 'click', -> runner.pause()
# stopEl.addEventListener 'click', -> runner.stop()

# range = parseInt( rangeSlider.getAttribute('max'), 10 );
# rangeSlider.oninput = (e)->
#   proc = (1*rangeSlider.value)/range
#   runner.setProgress proc

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "mojs", [], -> mojs
### istanbul ignore next ###
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = mojs
# ### istanbul ignore next ###
# return window?.mojs = mojs
