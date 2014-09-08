h      = require './helpers'
Bubble = require './bits/Bubble'
Burst  = require './bits/Burst'

class Charites
  Bubble: Bubble
  Burst:  Burst

charites = new Charites

if (typeof define is "function") and define.amd
  define "charites", [], -> charites

# TODO
#   chains
#     merge options on chain
#     if no active tween then run

wrapper = document.getElementById 'js-wrapper'
bubble = new charites.Burst
  parent:   wrapper
  radius:    {50: 100}
  # radiusX:   { 0: 100 }
  lineWidth: { 2: 0 }
  shape:     'circle'
  duration: 5000
  cnt:      5
  color:    'deeppink'
  lineDash: { '400, 20': '800, 200' }
  angle: {0: 200}
  onComplete:-> console.log 'a'
  # lineDash: [40]
  # lineDashEnd: [0]


window.addEventListener 'click', (e)->
  bubble.setPosition e.x, e.y
  a = h.rand(1,20)
  # console.log a
  bubble.chain
    lineWidthEnd: a

















