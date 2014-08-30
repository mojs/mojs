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
  duration: 2000
  # bitAngle:     0
  # bitAngleEnd: 240
  cnt: 3
  fill:    'deeppink'
  color:   'pink'
  # fillEnd: 'rgba(0,255,0,1)'
  bitRadius:    20
  bitRadiusEnd: 0
  # angleEnd: 200

  degree: 180
  angle: 191


window.addEventListener 'click', (e)->
  bubble.el.style.top  = "#{e.y-(bubble.size/2)}px"
  bubble.el.style.left = "#{e.x-(bubble.size/2)}px"
  bubble.run()
