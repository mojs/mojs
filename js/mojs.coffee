
mojs =
  revision:   '0.115.1', isDebug: true
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

# h = mojs.h

# pe = new mojs.easing.path 'M0,100 L100,0'
# pe = new mojs.easing.path '#js-path'
# circle = document.querySelector '#js-circle'

# tm = new mojs.Timeline
#   delay: 1000
#   duration: 2000
#   onUpdate:(p)->
#     y = pe.sample p
#     circle.setAttribute 'cx', p*100
#     circle.setAttribute 'cy', y*100

# tw = new mojs.Tween

# tw.add tm
# tw.start()


# console.log pe.sample .7

# path = pe.path
# console.log(path.getPointAtLength(path.getTotalLength()*.7))

# path = document.querySelector '#js-path'
# i = 25
# fun = (i)->
#   path.getPointAtLength(50+i)

# console.time '1'
# while(i--)
#   fun(i)
# console.timeEnd '1'


# console.log(path.getTotalLength())

# path = document.createElementNS h.NS, 'path'
# circle = document.createElementNS h.NS, 'circle'
# svg = document.createElementNS h.NS, 'svg'
# pathId = 'js-path'; path.setAttribute 'id', pathId

# # path.setAttribute 'd', 'M0,100 L100,0'
# path.setAttribute 'd', 'M0,100 L10,20 L20,90 L30,30 L40,80 L100, 0'
# path.setAttribute 'stroke', 'red'
# path.setAttribute 'fill', 'none'
# path.setAttribute 'pathLength', '0.25'
# circle.setAttribute 'r', '10'

# svg.appendChild(circle); svg.appendChild(path)
# document.body.appendChild svg

# totalLength = path.getTotalLength()
# point = path.getPointAtLength(totalLength*.5)

# circle.setAttribute 'cx', point.x
# circle.setAttribute 'cy', point.y

# console.log(path)
# console.log(point)
# console.log(totalLength)

# burst = new mojs.Burst
#   # isRunLess: true
#   x: 200, y: 200
#   isShowEnd: true
#   type: 'line'
#   stroke: 'deeppink'
#   strokeWidth: 2:0
#   count: 5
#   # delay: 'stagger(100)'
#   # childOptions: angle: 45: 0

# document.body.addEventListener 'click', (e)->
#   burst.run(x: e.x, y: e.y, isResetAngles: true, childOptions: angle: {0:90})

# angle = 0
# mp = new mojs.MotionPath
#   el:       document.querySelector('#js-el')
#   path:     {x: 1000}
#   duration: 1600
#   # delay:  2000
#   yoyo:     true
#   repeat:   10
#   easing:   'cubic.out'
#   curvature: x: '50%', y: '0%'
#   motionBlur: 1

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
