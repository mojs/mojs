###
  :: mo · js :: motion graphics toolbelt for the web
  LegoMushroom - Oleg Solomka 2015 MIT
  v0.106.6 unstable
###
window.mojs = revision: '0.106.6', isDebug: true

h           = require './h'
Burst       = require './burst'
Swirl       = require './Swirl'
Transit     = require './transit'
Stagger     = require './stagger'
MotionPath  = require './motion-path'
Timeline    = require './tween/timeline'
Tween       = require './tween/tween'

# burst = new mojs.Transit
#   x: 300, y: 300
#   delay:    1000
#   duration: 3000
#   type:     'line'
#   strokeWidth: 2
#   stroke:   'white'
#   # angle:  20
#   randomAngle: 1
#   isShowInit: true
#   isShowEnd:  true
#   # isResetAngles: true
#   radius:   10: 100
#   childOptions: radius: 10

# @slider = document.querySelector 'input'
# @slider.addEventListener 'input', (e)-> burst.tween.setProgress (@value/100000)


### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "mojs", [], -> mojs
### istanbul ignore next ###
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = mojs
### istanbul ignore next ###
window?.mojs = mojs
