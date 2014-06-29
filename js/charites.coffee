Burst  = require './bits/burst'
Bubble = require './bits/bubble'
h = require './helpers'

canvas = document.getElementById 'js-canvas'

bubble1  = new Bubble
  radius: 30
  duration: 500
  delay: 2000
  rate: .95
  # imidiate: false
  # el: canvas

# setInterval ->
#   bubble1.run
#     duration: 400
#     radius: 100
# , 1000

window.addEventListener 'click', (e)->
  style1 = h.getStyle bubble1.el

  size1 = parseInt(style1.width, 10)

  bubble1.el.style.position = 'absolute'
  bubble1.el.style.top  = "#{e.y-(size1/2)}px"
  bubble1.el.style.left = "#{e.x-(size1/2)}px"

  bubble1.run
    duration: 400
    radius: 50
    rate: .5
    bitWidth: 2
    cnt: 4
    rotate: 0
    # lineCap: 'butt'
