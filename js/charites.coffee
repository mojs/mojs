Burst = require './bits/burst'
h = require './helpers'

canvas = document.getElementById 'js-canvas'




bubble1  = new Burst
  radius: 100
  duration: 1000
  delay: 200
  initialRotation: 45
  cnt: 2
  rate: 0.5
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
  rad = h.rand 30, 50
  bubble1.run
    duration: 11400
    radius: rad
    rate: 0
    bitWidth: 1
    initialRotation: 30

animationLoop = (time)->
  requestAnimationFrame animationLoop
  TWEEN.update(time)

animationLoop()