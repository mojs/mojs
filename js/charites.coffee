h = require './helpers'
Bubble = require './bits/Bubble'


# TODO
# chains
# positions

bubble = new Bubble
  radius: 50
  radiusEnd: 200
  color:    'orange'
  colorEnd: 'black'
  lineWidth: 3
  lineWidthEnd: 0

  duration: 5000

  angleEnd: 360

window.addEventListener 'click', (e)->
  # console.log h.rand -360,360
  bubble.el.style.top  = "#{e.y-(bubble.size/2)}px"
  bubble.el.style.left = "#{e.x-(bubble.size/2)}px"
  bubble.run()
