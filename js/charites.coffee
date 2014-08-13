Burst = require './bits/burst'

setTimeout ->
  burst = new Burst
    lineWidth: 5
    lineCap: 'round'
    duration:  500
    radiusStart: 20
    radiusEnd:   100
    easing2:    'Sinusoidal.Out'
    colorMap: ['#ff0', '#0ff', '#f0f']

, 1000
