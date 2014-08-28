h = require './helpers'
Bubble = require './bits/Bubble'


# TODO
# chains

bubble = new Bubble
  radius:    150
  # radiusEnd: 100
  lineWidth:    3
  # lineWidthEnd: 3
  shape: 'triangle'
  duration: 1000
  # delay: 1500
  spikes:    3
  lineDash:     [1600]
  lineDashOffset: 1600
  lineDashOffsetEnd: 0

window.addEventListener 'click', (e)->
  bubble.el.style.top  = "#{e.y-(bubble.size/2)}px"
  bubble.el.style.left = "#{e.x-(bubble.size/2)}px"
  bubble.run()
