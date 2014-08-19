Burst = require './bits/burst'

burst = new Burst
  # delay1: 1000
  # delay2: 1000
  lineWidth: 2
  # lineWidthMiddle: 80
  lineWidthEnd: 2
  lineCap: 'round'
  duration:  500
  # duration2:  2000
  radiusStart: 30
  # radiusStartX:25
  radiusEnd:   50
  # radiusEndX:  200
  opacity: .25
  cnt: 5
  # angle: 90
  # easing2:    'Bounce.Out'
  # colorMap: ['#ff0', '#0ff', '#f0f', '#0ff']
  # initialRotation: 180
  # rotation: -130
  isRunLess: true
  # fade: 'inOut'

window.addEventListener 'click', (e)->
  burst.el.style.top  = "#{e.y-(burst.size/2)}px"
  burst.el.style.left = "#{e.x-(burst.size/2)}px"
  burst.run()
