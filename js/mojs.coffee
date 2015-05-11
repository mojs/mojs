
mojs =
  revision:   '0.118.1', isDebug: true
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

# sp = new mojs.Spriter
#   el:         document.querySelector '#js-sprite'
#   duration:   500
#   delay:      1000
#   easing:     'cubic.out'

# el = document.querySelector '#js-el'
# tm = new mojs.Timeline
#   duration: 3000
#   repeat:   10
#   onUpdate:(p)->
#     r = Math.floor 255*p
#     el.style.background = "rgb(#{r},#{r},#{r})"

# tw = new mojs.Tween
# tw.add tm

# tw.start()

# tr = new mojs.Transit(
#   type:       'circle'
#   radius:     0: 100
#   x: 300,     y: 300
#   duration:   3000
#   isRunLess:  true
#   fill:      'red'
#   onStart: -> console.log 'start'
# ).then(
#   radius:   100: 200
#   fill:      'green': 'green'
# ).then(
#   radius:   200: 300
#   fill:      'blue': 'blue'
# )

# tr.run()
# setInterval ->
#   tr.run()
# , 12000



### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "mojs", [], -> mojs
### istanbul ignore next ###
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = mojs
### istanbul ignore next ###
return window?.mojs = mojs
