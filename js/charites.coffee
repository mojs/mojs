Burst = require './bits/burst'

setTimeout ->
  burst = new Burst
    lineWidth: 5
    lineCap: 'round'
    start: x: 0,  y: 0
    end:   x: 600,  y: 600
    duration:  500

, 1000
