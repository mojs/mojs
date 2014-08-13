Burst = require './bits/burst'

setTimeout ->
  burst = new Burst
    lineWidth: 5
    lineCap: 'round'
    duration:  500
    radiusStart: 20
    radiusEnd:   200
    easing2:    'Quadratic.Out'
    duration2:  700

, 1000
