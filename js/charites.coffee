Bubble = require './bits/Bubble'
Burst  = require './bits/Burst'

class Charites
  Bubble: Bubble
  Burst:  Burst

charites = new Charites

if (typeof define is "function") and define.amd
  define "charites", [], -> charites










# TODO
# chains
wrapper = document.getElementById 'js-wrapper'
bubble = new charites.Burst
  parent:   wrapper
  radius:    0
  radiusEnd: 200
  shape:     'line'
  lineWidth:     10
  # lineWidthEnd:  1
  duration: 500
  cnt: 3
  color:    'deeppink'
  # lineDash: [40*5]
  # lineDashOffset:    40*5
  # lineDashOffsetEnd: -40*5
  # bitRate: .1
  # bitRateEnd: 2
  bitSpikes: 20
  # degree: 240
  bitRadius: 20
  # angle:    200
  # angleEnd: 400
  # bitAngleEnd: 360
  # onComplete: -> console.log 'b'
  # onStart: -> console.log 'a'

window.addEventListener 'click', (e)->
  bubble.el.style.top  = "#{e.y-(bubble.size/2)}px"
  bubble.el.style.left = "#{e.x-(bubble.size/2)}px"
  bubble.run()

















