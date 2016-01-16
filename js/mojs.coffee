
window.mojs =
  revision:   '0.166.5', isDebug: true
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

# TODO:
# - stop to 1 when reversed

# tw = new mojs.Tween
#   # repeat: 1
#   speed: .5
#   # yoyo: true
#   duration: 2000
#   onStart:(isForward)-># console.log("onStart, #{isForward}")
#   onRepeatStart:(isForward)-># console.log("repeat start, #{isForward}")
#   onComplete:(isForward)-># console.log("complete, #{isForward}")
#   onRepeatComplete:(isForward)-># console.log("repeat complete, #{isForward}")
#   onFirstUpdate:(isForward)-># console.log("first update, #{isForward}")
#   onProgress:(p, isForward)-># console.log("progress, #{p.toFixed(4)}, #{isForward}")
#   onUpdate:(ep, p, isForward)->
#     # console.log("********** ONUPDATE: #{p.toFixed(4)}, #{isForward}")
#     mojs.h.style el, 'transform', "translateX(#{400*p}px)"

# el = document.querySelector '#js-el1'
# playEl      = document.querySelector('#js-play')
# reverseEl   = document.querySelector('#js-reverse')
# pauseEl     = document.querySelector('#js-pause')
# stopEl      = document.querySelector('#js-stop')
# rangeSlider = document.querySelector ('#js-range-slider')

# runner = tw

# playEl.addEventListener 'click',  -> runner.play()
# reverseEl.addEventListener 'click', -> runner.playBackward();
# pauseEl.addEventListener 'click', -> runner.pause();
# stopEl.addEventListener 'click', -> runner.stop();

# rangeSlider.oninput = (e)->
#   proc = (1*rangeSlider.value)/6
#   runner.setProgress proc

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "mojs", [], -> mojs
### istanbul ignore next ###
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = mojs
# ### istanbul ignore next ###
# return window?.mojs = mojs
