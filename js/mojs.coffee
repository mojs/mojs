
window.mojs =
  revision:   '0.163.4', isDebug: true
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

# if (true)

#   RANGE_MAX   = 10000
#   rangeSlider = document.querySelector('#js-range-slider')
#   obj         = document.querySelector('#js-el1')
#   play        = document.querySelector('#js-play')
#   reverse     = document.querySelector('#js-reverse')
#   pause       = document.querySelector('#js-pause')
#   stop        = document.querySelector('#js-stop')

#   tm = new mojs.Timeline
#     delay: 3000,
#     # speed: .5,
#     isIt1: 1,
#     onUpdate:(p)-> console.log(p)
#   # tm0 = new mojs.Timeline speed: 1, delay: 200

#   tw = new mojs.Tween
#     # repeat: 3
#     # yoyo: true
#     # isIt: true
#     # delay: 500
#     speed:    2
#     duration: 1000
#     isIt2: 1
#     onStart:->
#       console.log "START"
#       console.time 'duration'
#       console.timeEnd 'delay'
#     onComplete:->
#       console.timeEnd 'duration'
#       console.log "COMPLETE"
#     onRepeatStart:-> console.log "REPEAT START"
#     onRepeatComplete:-> console.log "REPEAT COMPLETE"
#     onFirstUpdate:-> console.log "FIRST UPDATE"
#     onUpdate:(pe, p, isForward)->
#       mojs.h.style( obj, 'transform', "translate3d(#{400*pe}px, 0, 0)" )
#       # console.log "TWEEN ON_UPDATE: #{pe.toFixed(5)}, #{isForward}"

#   play.addEventListener 'click', ->
#     console.time 'delay'
#     tm.play()
#   reverse.addEventListener 'click', -> tm.reverse()
#   pause.addEventListener 'click', -> tm.pause()
#   stop.addEventListener 'click', -> tm.stop()
#   stop.addEventListener 'click', -> tm.stop()

#   tm
#     .add(tw)
#     # .play()
#   # tm.add tm0

#   rangeSlider.oninput = (e)->
#     proc = (1*rangeSlider.value)/10000
#     tm.setProgress proc

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "mojs", [], -> mojs
### istanbul ignore next ###
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = mojs
# ### istanbul ignore next ###
# return window?.mojs = mojs
