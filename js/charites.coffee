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
#   className
#   fix rotation
#   options syntax sugar
wrapper = document.getElementById 'js-wrapper'
bubble = new charites.Burst
  parent:   wrapper
  radius:    0
  radiusEnd: 100
  shape:     'line'
  lineWidth:     2
  lineWidthEnd:  0
  duration: 5000
  cnt: 5
  color:    'deeppink'
  # lineDash: [40*5]
  # lineDashOffset:    40*5
  # lineDashOffsetEnd: -40*5
  # bitRate: .1
  # bitRateEnd: 2
  bitSpikes: 20
  # degree: 240
  bitRadius: 0
  bitRadiusEnd: 20
  angle:    0
  angleEnd: 400
  # bitAngleEnd: 360
  # onComplete: -> console.log 'b'
  # onStart: -> console.log 'a'
  # isShowStart: true
  # isShowEnd:   true

window.addEventListener 'click', (e)->
  bubble.setPosition e.x, e.y
  bubble.run()

















