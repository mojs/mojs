Burst = require './bits/burst'

# setTimeout ->
#   burst = new Burst
#     lineWidth: 2
#     lineCap: 'round'
#     duration:  500
#     radiusStart: 100
#     radiusEnd:   120
#     cnt: 3
#     # easing2:    'Sinusoidal.Out'
#     colorMap: ['#ff0', '#0ff', '#f0f', '#0ff']
#     initialRotation: 75
#     rotation: 30
#     isRunLess: true

#   # setTimeout ->
#   #   burst.run rotation: -30
#   # , 2000

# , 1000

burst = new Burst
  lineWidth: 2
  lineCap: 'round'
  duration:  300
  radiusStart: 15
  radiusEnd:   30
  cnt: 5
  angle: 180
  # easing2:    'Sinusoidal.Out'
  # colorMap: ['#ff0', '#0ff', '#f0f', '#0ff']
  initialRotation: 180
  rotation: 90
  isRunLess: true


window.addEventListener 'click', (e)->
  burst.el.style.top  = "#{e.y-(burst.size/2)}px"
  burst.el.style.left = "#{e.x-(burst.size/2)}px"
  burst.run()
