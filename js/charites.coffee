Bubble = require './bits/bubble'


setTimeout ->
  new Bubble
    radius: 50
, 1000

animationLoop = (time)->
  requestAnimationFrame animationLoop
  TWEEN.update(time)

animationLoop()