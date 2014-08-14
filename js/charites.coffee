Burst = require './bits/burst'

setTimeout ->
  burst = new Burst
    lineWidth: 2
    lineCap: 'round'
    duration:  500
    radiusStart: 30
    radiusEnd:   40
    cnt: 3
    # easing2:    'Sinusoidal.Out'
    colorMap: ['#ff0', '#0ff', '#f0f', '#0ff']
    initialRotation: 75
    rotation: 30

  setTimeout ->
    burst.run rotation: -30
  , 2000

, 1000
