
mojs =
  revision:   '0.129.2', isDebug: true
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

# tw = new mojs.Tween
#   repeat: 2
#   delay: 3000
#   onComplete: -> console.log 'tw comple'

# tw2 = new mojs.Tween
#   delay: 3000
#   # repeat: 2

# tw2.add new mojs.Timeline
#     duration: 2000
#     onUpdate:(p)-> console.log "tm2: #{p}"

# timeline = new mojs.Timeline
#   duration: 2000
#   onUpdate:(p)-> console.log "tm1: #{p}"

# tw.add timeline, tw2
# tw.start()
# console.log tw.props.startTime, tw2.props.startTime

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "mojs", [], -> mojs
### istanbul ignore next ###
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = mojs
### istanbul ignore next ###
return window?.mojs = mojs
