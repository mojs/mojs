h      = require './helpers'
Bubble = require './bits/Bubble'
Burst  = require './bits/Burst'

class Charites
  Bubble: Bubble
  Burst:  Burst

charites = new Charites

if (typeof define is "function") and define.amd
  define "charites", [], -> charites
else window.charites = charites

# # TODO
# #  add size option
# #  fill syntax sugar
# #  position syntax sugar
  
# wrapper = document.getElementById 'js-wrapper'
# bubble = new charites.Bubble
#   parent:   wrapper
#   radius:    {50: 100}
#   lineWidth: {40:1}
#   shape:     'star'
#   duration: 1000
#   cnt:      5
#   color:    'deeppink'
#   # angle: {45: 45}
#   # bitRadius: {10: 2  }
#   delay: 0
#   lineCap: 'none'
#   position: x: 400, y: 400
#   # degree: 180
#   bitRadius: 20
#   bitRadiusEnd: 20
#   rate: .5
#   rateEnd: 2.5

# for i in [0..20]
#   a = h.rand(1,20)
#   r = h.rand(-200,200)
#   bubble.chain
#     duration: 1000
#     rateEnd: if i % 2 is 0 then .5 else 2.5
#     # angleEnd: r


# window.addEventListener 'click', (e)->
#   # bubble.setPosition e.x, e.y
#   a = h.rand(1,20)
#   r = h.rand(-20,20)
#   # console.log a
#   bubble.run
#     # lineWidthEnd: a
#     # angleEnd:     r
#     position: x:e.x, y:e.y
#     # bitSpikes: 3
#     duration: 500
#     # fillEnd: '#0F0'
#     # colorEnd: 'black'
#     # bitRadiusEnd: 20


















