Bubble = require './bits/bubble'


setTimeout ->
  new Bubble
    easing: 'Cubic.InOut'
    # radius: 200
    # duration: 400
    # rate: .15
, 1000

animationLoop = (time)->
  requestAnimationFrame animationLoop
  TWEEN.update(time)

animationLoop()