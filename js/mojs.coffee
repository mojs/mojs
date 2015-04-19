
mojs =
  revision:   '0.114.0', isDebug: true
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

mp = new mojs.MotionPath
  el:       document.querySelector('#js-el')
  path:     {x: 500}
  duration: 1500
  yoyo:     true
  repeat:   200
  # easing:   'cubic.out'
  curvature: x: '75%', y: '150%'
  motionBlur: 1
  # isAngle: true
  # isRunLess: true

# mp.setProgress .75
# mp.setProgress .5

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
