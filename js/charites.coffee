Bubble = require './bits/bubble'
h = require './helpers'

bubble1  = new Bubble
  imidiate: false
  radius: 25

window.addEventListener 'click', (e)->
  style1 = h.getStyle bubble1.el

  size1 = parseInt(style1.width, 10)

  bubble1.el.style.position = 'absolute'
  bubble1.el.style.top  = "#{e.y-(size1/2)}px"
  bubble1.el.style.left = "#{e.x-(size1/2)}px"
  bubble1.animate
    duration: 400



animationLoop = (time)->
  requestAnimationFrame animationLoop
  TWEEN.update(time)

animationLoop()