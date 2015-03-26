###
  :: mo · js :: motion graphics toolbelt for the web
  LegoMushroom - Oleg Solomka 2015 MIT
  v0.108.1 unstable
###
window.mojs = revision: '0.108.1', isDebug: true

h           = require './h'
Burst       = require './burst'
Swirl       = require './Swirl'
Transit     = require './transit'
Stagger     = require './stagger'
MotionPath  = require './motion-path'
Timeline    = require './tween/timeline'
Tween       = require './tween/tween'

# circle = new mojs.Transit
#   x: 155,           y: 155
#   type:             'rect'
#   radius:           3*20
#   fill:             'transparent'
#   strokeWidth:      2
#   stroke:           'hotpink'
#   # strokeDasharray:  '100% 200%'
#   # strokeDashoffset: {'0%': '50%'}
#   # angle:            180
#   delay:            500
#   duration:         500
#   angle:            45: 100
#   isShowInit:       true
#   isShowEnd:        true
#   isRunLess:        true
# .then
#   strokeDashoffset: '100%'
#   angle:            360
#   delay:            0
# .then
#   strokeDashoffset: '100%'
#   angle:            -360
#   delay:            0

# tms = circle.tween.timelines
# tms[0].isIt = true
# tms[1].isIt = false

# circle.run({})

# setTimeout ->
#   console.log '------>>>>>>> set'
#   circle.tween.setProgress 0
# , 2000


# burst = new mojs.Burst
#   x: 300, y: 300
#   # delay:    1000
#   count:    3
#   # degree:   270
#   degree:   240
#   duration: 3000
#   type:     'line'
#   strokeWidth: 2
#   stroke:   'white'
#   # angle:  20
#   # randomAngle: 1
#   isShowInit: true
#   isShowEnd:  true
#   # isResetAngles: true
#   radius:   10: 50
#   childOptions: radius: 10

#@slider = document.querySelector 'input'
#@slider.addEventListener 'input', (e)->
#  circle.tween.setProgress (@value/100000)


### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "mojs", [], -> mojs
### istanbul ignore next ###
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = mojs
### istanbul ignore next ###
window?.mojs = mojs
