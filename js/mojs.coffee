mojs =
  revision:   '0.144.8', isDebug: true
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

# tm0 = new mojs.Timeline isIt: '1'#, onUpdate:(p)-> console.log p
# tm1 = new mojs.Timeline
# tm2 = new mojs.Timeline isIt: '2'

# tw1 = new mojs.Tween onUpdate:(p)-> console.log "tw1: #{p}"
# tm1.add tw1

# tw2 = new mojs.Tween onUpdate:(p)-> console.log "tw2: #{p}"
# tm2.add tw2

# tm0.add tm1
# tm0.append tm2

# tm0.start()






### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "mojs", [], -> mojs
### istanbul ignore next ###
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = mojs
### istanbul ignore next ###
return window?.mojs = mojs

