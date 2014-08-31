h = require './helpers'
Bubble = require './bits/Bubble'
Burst  = require './bits/Burst'


# TODO
# chains
bubble = new Burst
  radius:    100
  radiusEnd: 200
  shape:     'line'
  lineWidth:     1
  lineWidthEnd:  0
  duration: 500
  cnt: 4
  color:    'deeppink'
  lineDash: [40*5]
  lineDashOffset:    40*5
  lineDashOffsetEnd: -40*5
  # degree: 240
  bitRadius: 50
  # angle:    200
  # angleEnd: 400
  bitAngle: 360


window.addEventListener 'click', (e)->
  bubble.el.style.top  = "#{e.y-(bubble.size/2)}px"
  bubble.el.style.left = "#{e.x-(bubble.size/2)}px"
  bubble.run()
