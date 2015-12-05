
window.mojs =
  revision:   '0.149.3', isDebug: true
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

# tm = new mojs.Timeline repeat: 1
# tween = new mojs.Tween
#   # isIt:       true
#   # yoyo:       true
#   # delay:        2000
#   repeat:       2
#   onStart:    -> console.log('--->>> start')
#   onUpdate:   (p)-> console.log(p)
#   onComplete: -> console.log('--->>> complete')
#   onRepeatStart: -> console.log('--->>> repeat start')
#   onRepeatComplete: -> console.log('--->>> repeat complete')


# tween.play()

# # tween.play()

# tm.add tween
# tm.play()

# launcher = new mojs.Tween
#   duration: 400
#   onUpdate:(p)-> tm.setProgress 1-p

# launcher.play()

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "mojs", [], -> mojs
### istanbul ignore next ###
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = mojs
# ### istanbul ignore next ###
# return window?.mojs = mojs
