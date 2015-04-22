
mojs =
  revision:   '0.114.2', isDebug: true
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
  MotionPath  : require './motion-path'
  Timeline    : require './tween/timeline'
  Tween       : require './tween/tween'
  tweener     : require './tween/tweener'
  easing      : require './easing'

mojs.h     = mojs.helpers
mojs.delta = mojs.h.delta


burst = new mojs.Burst
  # isRunLess: true
  x: 200, y: 200
  isShowEnd: true
  type: 'line'
  stroke: 'deeppink'
  strokeWidth: 2:0
  # delay: 'stagger(100)'
  # childOptions: angle: 45: 0

document.body.addEventListener 'click', (e)->
  burst.run(x: e.x, y: e.y)

# angle = 0
# mp = new mojs.MotionPath
#   el:       document.querySelector('#js-el')
#   path:     {x: 1000}
#   duration: 1600
#   # delay:  2000
#   yoyo:     true
#   repeat:   10
#   easing:   'cubic.out'
#   curvature: x: '50%', y: '0%'
#   motionBlur: 1

# angle = 0
# setInterval ->
#   point = mp.angToCoords(angle)
#   mp.el.style['box-shadow'] = "#{point.x*10}px #{point.y*10}px 0 black"
#   angle = (angle+1) % 360
# , 10


### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "mojs", [], -> mojs
### istanbul ignore next ###
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = mojs
### istanbul ignore next ###
return window?.mojs = mojs
