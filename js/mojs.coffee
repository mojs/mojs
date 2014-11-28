# h      = require './helpers'
Bubble = require './bits/Bubble'
Burst  = require './bits/Burst'
MotionPath = require './motion-path/MotionPath'

class Mojs
  Bubble: Bubble
  Burst:  Burst
  MotionPath: MotionPath

mojs = new Mojs

if (typeof define is "function") and define.amd
  define "mojs", [], -> mojs
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = mojs
window?.mojs = mojs

i = 0
motionPath = new MotionPath
  # repeat: 5
  duration: 15000
  # yoyo: true
  # isAngle: true
  # path: '#js-svg-path'
  path: 'M0.55859375,593.527344 C0.55859375,593.527344 -37.2335443,231.85498 148.347656,187.753906 C333.928857,143.652832 762.699219,412.414062 762.699219,412.414062 L1132.85547,1.15625'
  isRunLess: true
  el:         document.getElementById('js-el')
  fill: container:  document.getElementById('js-container')

console.log document.getElementById('js-el')
setTimeout =>
  motionPath.run
    duration: 10000
    isAngle: false
, 2000


# canvas = document.getElementById 'js-canvas'
# bubble = new charites.Burst
#   # parent:   wrapper
#   # el: canvas
#   radius:    {5: 50}
#   fill: {'#000': '#ff0000'}
#   color: {'#f0f': 'orange'}
#   lineWidth: {5:1}
#   shape:     'line'
#   position: {x: {400: 0}, y: {400: 0} }
#   duration: 5000
#   bitRadius: {2: 0}

# bubble = new charites.Bubble
#   # parent:   wrapper
#   # el: canvas
#   radius:    {5: 50}
#   fill: {'#000': '#ff0000'}
#   color: {'#f0f': 'orange'}
#   lineWidth: {5:1}
#   shape:     'line'
#   position: {x: {0: 400}, y: {0: 400} }
#   duration: 5000
#   bitRadius: {2: 0}
#   # dimentions: { x: 400, y: 400 }

