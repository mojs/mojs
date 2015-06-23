
mojs =
  revision:   '0.122.0', isDebug: true
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

tween = new mojs.Tween
  onUpdate:(p)->
    console.log p
  onComplete:->
    console.log 'comple'
  onReverseComplete:->
    console.log 'rev comple'
  onFirstUpdateBackward:->
    console.log 'first back'
  onFirstUpdate:->
    console.log 'first forw'

tween.setProgress .5
tween.setProgress .75
tween.setProgress .95
tween.setProgress 1.95
tween.setProgress 2.95
tween.setProgress .95
tween.setProgress .25
tween.setProgress 0
tween.setProgress -1
# tween.start()



### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "mojs", [], -> mojs
### istanbul ignore next ###
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = mojs
### istanbul ignore next ###
return window?.mojs = mojs
