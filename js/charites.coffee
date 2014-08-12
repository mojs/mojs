BurstLine = require './bits/burst-line'
Bit       = require './bits/bit'

setTimeout ->
  burst = new BurstLine
    lineWidth: 2
    lineCap: 'round'
    start: x: 0,  y: 0
    end:   x: 600,  y: 600
    duration:  500

, 1000
