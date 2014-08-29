h = require './helpers'
Bubble = require './bits/Bubble'
Burst  = require './bits/Burst'


# TODO
# chains

bubble = new Burst
  radius:    20
  radiusEnd: 400
  shape: 'circle'
  lineWidth:    20
  lineWidthEnd: 0
  duration: 500
  bitAngle:     0
  bitAngleEnd: 240
  cnt: 5
  fill:    'deeppink'
  # fillEnd: 'rgba(0,255,0,1)'
  bitRadius:    20
  bitRadiusEnd: 0
  angleEnd: 200


window.addEventListener 'click', (e)->
  bubble.el.style.top  = "#{e.y-(bubble.size/2)}px"
  bubble.el.style.left = "#{e.x-(bubble.size/2)}px"
  bubble.run()
