
mojs =
  revision:   '0.125.0', isDebug: true
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

# stretchEasing = mojs.easing.path('M0,0 C0,0 31.4848633,29.7739254
#                                   55.2021484,-4.28613761e-07
#                                   C74.9160156,-20.18457
#                                   100,0 100,0')


# mp = new mojs.MotionPath
#   path: 'M0,0 L100,100'
#   el: document.createElement 'div'
#   duration: 1500
#   onUpdate: (p)->
#     stretchP = stretchEasing(p)
#     console.log stretchP

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "mojs", [], -> mojs
### istanbul ignore next ###
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = mojs
### istanbul ignore next ###
return window?.mojs = mojs
