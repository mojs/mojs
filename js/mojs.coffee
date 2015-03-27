###
  :: mo · js :: motion graphics toolbelt for the web
  LegoMushroom - Oleg Solomka 2015 MIT
  v0.109.0 unstable
###
window.mojs = revision: '0.109.0', isDebug: true

h           = require './h'
Burst       = require './burst'
Swirl       = require './Swirl'
Transit     = require './transit'
Stagger     = require './stagger'
MotionPath  = require './motion-path'
Timeline    = require './tween/timeline'
Tween       = require './tween/tween'

circle = new mojs.Transit
  x: 75,           y: 75
  type:             'rect'
  radius:           50
  fill:             'transparent'
  strokeWidth:      0
  stroke:           'hotpink'
  strokeDasharray:  '0 100': '100 rand(10%,50%)'
  delay:            1500
  duration:         1500
  angle:            45: 100
  isShowInit:       true
  isShowEnd:        true

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
