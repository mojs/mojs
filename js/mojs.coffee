
mojs =
  revision:   '0.113.1', isDebug: true
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

# path = document.querySelector '#js-path'

# moPath = new mojs.MotionPath
#   path: 'M 0,0'
#   el: document.createElement 'div'

# points = [
#   {x: 0,    y: -100}
#   {x: 100,  y: -100}
#   {x: 100,  y: 0}
#   {x: 100,  y: 100}
#   {x: 0,    y: 100}
#   {x: -100, y: 100}
#   {x: -100, y: 0}
#   {x: -100, y: -100}
#   {x: -100, y: -100}
# ]
# radiuses = [100, 4*141.42]
# ys = [20, 2*28.84]
# i = -1
# setInterval =>
#   i++
#   path2 = moPath.curveToPath
#     start:     x: 200,  y: 200
#     shift:     points[i%(points.length-1)]
#     curvature: x: '100%', y: '50%'
#     isIt: true

#   path.setAttribute 'd', path2.getAttribute 'd'

# , 1000


### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "mojs", [], -> mojs
### istanbul ignore next ###
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = mojs
### istanbul ignore next ###
return window?.mojs = mojs
