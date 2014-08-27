h = require './helpers'
Bubble = require './bits/Bubble'


# TODO
# chains
# positions

bubble = new Bubble
  radius: 200
  radiusX: 1
  radiusEnd: 10
  radiusEndX: 1
  lineWidth:    3
  lineWidthEnd: 1
  shape: 'cross'
  color: 'deeppink'
  duration: 500
  angleEnd: 60
  # starSpikes:    5
  # starSpikesEnd: 15
  # starInnerRadius:    .8
  # starInnerRadiusEnd: .8

window.addEventListener 'click', (e)->
  # console.log h.rand -360,360
  bubble.el.style.top  = "#{e.y-(bubble.size/2)}px"
  bubble.el.style.left = "#{e.x-(bubble.size/2)}px"
  bubble.run()
