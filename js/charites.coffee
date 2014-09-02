Bubble = require './bits/Bubble'
Burst  = require './bits/Burst'

class Charites
  Bubble: Bubble
  Burst:  Burst

charites = new Charites

# # TODO
# # chains
# wrapper = document.getElementById 'js-wrapper'
# bubble = new charites.Burst
#   parent:   wrapper
#   radius:    100
#   radiusEnd: 200
#   shape:     'line'
#   lineWidth:     1
#   lineWidthEnd:  0
#   duration: 500
#   cnt: 4
#   color:    'deeppink'
#   lineDash: [40*5]
#   lineDashOffset:    40*5
#   lineDashOffsetEnd: -40*5
#   # degree: 240
#   bitRadius: 50
#   # angle:    200
#   # angleEnd: 400
#   bitAngle: 360
#   # onComplete: -> console.log 'b'
#   # onStart: -> console.log 'a'

# window.addEventListener 'click', (e)->
#   bubble.el.style.top  = "#{e.y-(bubble.size/2)}px"
#   bubble.el.style.left = "#{e.x-(bubble.size/2)}px"
#   bubble.run()


if (typeof define is "function") and define.amd
  define "charites", [], -> charites