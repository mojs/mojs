h = require './helpers'
Bubble = require './bits/Bubble'


# TODO
# chains
# positions

bubble = new Bubble
  lineWidth:    2
  lineWidthEnd: 0

  color:        '#FF0000'
  colorEnd:     '#0000FF'

  duration:     500
  degreeEnd:    0
  angleEnd: 180

window.addEventListener 'click', (e)->
  # console.log h.rand -360,360
  bubble.el.style.top  = "#{e.y-(bubble.size/2)}px"
  bubble.el.style.left = "#{e.x-(bubble.size/2)}px"
  bubble.run()
