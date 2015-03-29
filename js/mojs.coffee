
mojs =
  revision: '0.109.2', isDebug: true
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

# circle = new mojs.Transit
#   x: 150,           y: 150
#   type:             'rect'
#   radius:           50
#   fill:             'transparent'
#   strokeWidth:      1
#   stroke:           'hotpink'
#   # strokeDasharray:  '0 100': '100 rand(10%,50%)'
#   delay:            1500
#   duration:         1500
#   angle:            45: 180
#   isShowInit:       true
#   isShowEnd:        true
#   isRunLess:        true
# .then
#   angle:  45
#   # delay: 500
# .then
#   angle:  180
#   delay: 2500
# .then
#   angle:  45
#   # delay: 500

# @slider = document.querySelector 'input'
# @slider.addEventListener 'input', (e)->
#   circle.tween.setProgress (@value/100000)

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "mojs", [], -> mojs
### istanbul ignore next ###
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = mojs
### istanbul ignore next ###
window?.mojs = mojs
