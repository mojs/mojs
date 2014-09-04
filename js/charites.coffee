Bubble = require './bits/Bubble'
Burst  = require './bits/Burst'

class Charites
  Bubble: Bubble
  Burst:  Burst

charites = new Charites

if (typeof define is "function") and define.amd
  define "charites", [], -> charites

# TODO
#   chains on run?
wrapper = document.getElementById 'js-wrapper'
bubble = new charites.Burst
  parent:   wrapper
  # radius:    0
  # radiusEnd: 100
  radius:    { start: 0, end: 100 }
  # radiusEndX: 200
  # radiusX:   { 100: -100 }
  lineWidth: { 2: 0 }
  shape:     'line'
  duration: 500
  cnt:      5
  color:    'deeppink'
  # lineDash: [40]
  # lineDashOffset: { 40: -40}
  # lineDashOffsetEnd: -40
  # bitRate: .1
  # bitRateEnd: 2
  angle: {0: 100}
  bitAngle: {0: -360}
  # degree: 240
  # bitRadius: {start: 10, end: 10}
  # angle:    0
  # angleEnd: 10
  # bitAngleEnd: 360
  # onComplete: -> console.log 'b'
  # onStart: -> console.log 'a'
  # isShowStart: true
  # isShowEnd:   true

window.addEventListener 'click', (e)->
  bubble.setPosition e.x, e.y
  bubble.run()

















