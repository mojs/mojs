Bubble = require './bits/Bubble'
Burst  = require './bits/Burst'

class Charites
  Bubble: Bubble
  Burst:  Burst

charites = new Charites

if (typeof define is "function") and define.amd
  define "charites", [], -> charites

# TODO
#   chains on run?
#   line dash in syntax sugar
wrapper = document.getElementById 'js-wrapper'
bubble = new charites.Bubble
  parent:   wrapper
  radius:    100
  # radiusX:   { 0: 100 }
  lineWidth: { 2: 0 }
  shape:     'circle'
  duration: 500
  cnt:      5
  color:    'deeppink'
  lineDash: [40]
  lineDashEnd: [0]


window.addEventListener 'click', (e)->
  bubble.setPosition e.x, e.y
  bubble.run()

















