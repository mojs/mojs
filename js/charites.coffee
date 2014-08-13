Burst = require './bits/burst'

setTimeout ->
  burst = new Burst
    lineWidth: 2
    lineCap: 'round'
    duration:  500
    radiusStart: 20
    radiusEnd:   40
    # easing2:    'Sinusoidal.Out'
    colorMap: ['#ff0', '#0ff', '#f0f', '#0ff']
    initialRotation: 75
    rotation: 30

, 1000
