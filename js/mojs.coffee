
mojs =
  revision:   '0.127.0', isDebug: true
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

# tm = new mojs.Timeline
#   delay: 1000
#   # onComplete: -> console.log 'tm: a'
#   # onUpdate:(p)-> console.log "tm: #{p}"
# tw = new mojs.Tween repeat: 2, isIt: true, onComplete: -> console.log 'tween end'
# tw.add tm

# tm1 = new mojs.Timeline
#   delay: 1000
#   onComplete: -> console.log 'tm1: a'
#   onUpdate:(p)-> console.log "tm1: #{p}"
# tw2 = new mojs.Tween repeat: 2, isIt: true
# tw2.add tm1

# tw.add tw2

# tw.start()

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "mojs", [], -> mojs
### istanbul ignore next ###
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = mojs
### istanbul ignore next ###
return window?.mojs = mojs
