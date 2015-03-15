###
  :: mo · js :: motion graphics toolbelt for the web
  LegoMushroom - Oleg Solomka 2015 MIT
  v0.106.2 unstable
###
window.mojs = revision: '0.106.2', isDebug: true

h           = require './h'
Burst       = require './burst'
Swirl       = require './Swirl'
Transit     = require './transit'
Stagger     = require './stagger'
MotionPath  = require './motion-path'
Timeline    = require './tween/timeline'
Tween       = require './tween/tween'

# paths = document.getElementById 'js-svg'
# # path1 = document.getElementById 'js-path1'
# # path2 = document.getElementById 'js-path2'
# # path3 = document.getElementById 'js-path3'

tr = new Transit
  type: 'cross'
  x: 300, y: 300
  radius: 50: 75
  isShowInit: true
  isShowEnd: true
  strokeWidth: 2
  stroke: 'cyan'
  duration: 1000
  delay: 1000
.then
  radiusX: 50
  fill: 'green'
  stroke: 'deeppink'
  onStart: -> console.log 'a'
.then
  radiusY: 50
  fill: 'green'
  stroke: 'deeppink'
# for item, i in tr.history
#   console.log item.radius, item.radiusX, item.radiusY

# console.log tr.history

# mp = new MotionPath(
#   path:     '#js-path1'
#   el:       tr.el
#   duration: 2000
#   delay: 2000
#   onUpdate:-> console.log 'aa'
# ).then
#   isReverse: true


# delta = {}

# .then
#   strokeDashoffset: '100%'
  # delay: 0

# stagger = new Stagger
#   els:              paths
#   strokeWidth:      3
#   delay:            'stagger(100)'
#   duration:         2000
#   isShowEnd:        true
#   isShowInit:       true
#   # easing:           'Sinusoidal.Out'
#   strokeDashoffset:  { '100%': 0 }
#   # isRunLess:        true
#   # opacity:          0: 3

# isRunLess = false
# delayStart = 0
# mainTween = new Tween
# yellow = '#F9DD5E'
# cyan   = '#11CDC5'
# circleRadius = 8
# s = 1
# burst = new Burst
#   x: 100, y: 300
#   degree: 180
#   angle:  90
#   radius: { 10: 25 }
#   ctx: paths
#   # radiusY: { 5: 15 }
#   type: 'line'
#   stroke: yellow
#   strokeWidth: 2
#   delay: (delayStart+650)*s
#   isRunLess: isRunLess
#   childOptions: radius: { 7: 0 }#, angle: 0

# burst2 = new Burst
#   x: 100, y: 300
#   degree: 180
#   angle:  90
#   radius: { 10: 25 }
#   # radiusY: { 5: 15 }
#   type: 'line'
#   stroke: cyan
#   strokeWidth: 2
#   delay: (delayStart+1950)*s
#   isRunLess: isRunLess
#   childOptions: radius: { 7: 0 }

# circle = new Transit
#   x: 100, y: 80
#   type: 'circle'
#   radius: 3*circleRadius
#   fill: 'transparent'
#   strokeWidth: 2
#   stroke: '#FC2D79'
#   isShowInit: true
#   isShowEnd:  true
#   strokeDasharray:  '100% 200%'
#   strokeDashoffset: {'100%': '50%'}
#   angle: 180
#   delay: (delayStart+900)*s
#   duration: 300*s
#   isRunLess: isRunLess
# .then
#   strokeDashoffset: '100%'
#   angle: 360
#   delay: 0

# ball = new Transit
#   type:   'circle'
#   stroke: 'white'
#   strokeWidth: 2
#   fill:   'transparent'
#   radius:  circleRadius
#   radiusX: circleRadius/2
#   radiusY: circleRadius
#   x: 100, y: -20
#   isShowInit: true
#   isShowEnd:  true
#   shiftY: {0: 300}
#   duration: 600*s
#   easing: 'Cubic.In'
#   delay: delayStart*s
#   isRunLess: isRunLess

# .then
#   shiftY:  305
#   radiusX: 1.5*circleRadius
#   radiusY: circleRadius/2
#   easing: 'Cubic.Out'
#   duration: 150*s
#   delay: 0

# .then
#   shiftY:  100
#   radiusX: circleRadius
#   radiusY: circleRadius
#   easing: 'Cubic.Out'
#   duration: 600*s

# .then
#   shiftY:  300
#   radiusX: circleRadius/2
#   radiusY: circleRadius
#   easing: 'Cubic.In'
#   duration: 600*s
#   delay: 0

# .then
#   shiftY:  305
#   radiusX: 1.5*circleRadius
#   radiusY: circleRadius/2
#   easing: 'Cubic.Out'
#   duration: 150*s
#   delay: 0

# .then
#   shiftY:  150
#   radiusX: circleRadius
#   radiusY: circleRadius
#   easing: 'Cubic.Out'
#   duration: 600*s

# mainTween.add ball.tween
# mainTween.add burst.tween
# mainTween.add circle.tween

# slider = document.getElementById 'js-slider'
# slider.addEventListener 'input', (e)->
#   # console.log (@value/100000)
#   mainTween.setProgress (@value/100000)
#   # burst.tween.setProgress (@value/100000)

# # burst = new Burst
# #   fill:      ['deeppink', 'cyan', 'yellow']
# #   # strokeWidth: 'rand(1,3)': 0
# #   # fill:        'transparent'
# #   count:       5
# #   # degree:      140
# #   radius:      0: 75
# #   isSwirl:     true
# #   isRunLess:   true
# #   # fill:        'transparent'
# #   # strokeDasharray: '100%'
# #   # strokeDashoffset: '-1000': 0
# #   duration:         800
# #   delay:            'stagger(2000, rand(0,150))'
# #   childOptions:     radius: 'rand(2,6)': 0

# # tw = new Tween


# # tw.add stagger.tween
# # tw.add burst.tween




# # # stagger.tween.setProgress .65

# # # .then radius: 0, duration: 2000
# # # .then radius: 75#, delay: 0

# # # mp = new MotionPath(
# # #   path:     '#js-path1'
# # #   el:       burst.el
# # #   duration: 2000
# # #   # repeat: 99999
# # #   # isReverse: true
# # #   # isRunLess: true
# # #   pathStart: 0
# # #   pathEnd:   1
# # #   # fill: { container: 'body' }
# # #   # onStart:-> burst.show()
# # #   # onChainUpdate:(p)-> burst.tween.setProgress(p)
# # # )
# # # # .then duration: 500, pathStart: .25, pathEnd:  .5
# # # # .then duration: 500, pathStart: .5,  pathEnd:  .75
# # # # .then duration: 500, pathStart: .75, pathEnd:  1

# # # mp.run()

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "mojs", [], -> mojs
### istanbul ignore next ###
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = mojs
### istanbul ignore next ###
window?.mojs = mojs
