Burst  = require './bits/burst'
Bubble = require './bits/bubble'
Quirk = require './bits/quirk'
h = require './helpers'

canvas = document.getElementById 'js-canvas'

bubble1  = new Quirk
  radius: 200
  duration: 800
  strokeWidth: 5
  angle: 60
  delay: 1400
  rotate: 360
  # initialRotation: 90
  # cnt: 5
  # rate: .75

window.addEventListener 'click', (e)->
  style1 = h.getStyle bubble1.el

  size1 = parseInt(style1.width, 10)

  bubble1.el.style.position = 'absolute'
  bubble1.el.style.top  = "#{e.y-(size1/2)}px"
  bubble1.el.style.left = "#{e.x-(size1/2)}px"

  bubble1.run
    radius: h.rand 50,100
    initialRotation: h.rand -90, 90
    delay: 0
    # lineCap: 'butt'

# animationLoop = (time)->
#   requestAnimationFrame animationLoop
#   TWEEN.update(time)

# animationLoop()