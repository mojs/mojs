Bubble = require './bits/bubble'
h = require './helpers'

canvas = document.getElementById 'js-canvas'

bubble1  = new Bubble
  radius: 20
  imidiate: false
  # el: canvas

window.addEventListener 'click', (e)->
  style1 = h.getStyle bubble1.el

  size1 = parseInt(style1.width, 10)

  bubble1.el.style.position = 'absolute'
  bubble1.el.style.top  = "#{e.y-(size1/2)}px"
  bubble1.el.style.left = "#{e.x-(size1/2)}px"
  bubble1.run
    duration: 300
    color: 'green'
    x: 100
    y: 150

animationLoop = (time)->
  requestAnimationFrame animationLoop
  TWEEN.update(time)

animationLoop()