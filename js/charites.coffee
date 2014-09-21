h      = require './helpers'
Bubble = require './bits/Bubble'
Burst  = require './bits/Burst'
Pather = require './pather/pather'

class Charites
  Bubble: Bubble
  Burst:  Burst
  Pather: Pather

charites = new Charites

if (typeof define is "function") and define.amd
  define "charites", [], -> charites
else if typeof module is "object" and typeof module?.exports is "object"
  module.exports = charites
else window?.charites = charites

pather = new Pather
  repeat: 5
  # path: document.getElementById 'js-svg-path'
  # path: '#js-svg-path'
  path: document.getElementById('js-svg-path').getAttribute 'd'


# canvas = document.getElementById 'js-canvas'
# bubble = new charites.Burst
#   # parent:   wrapper
#   # el: canvas
#   radius:    {5: 50}
#   fill: {'#000': '#ff0000'}
#   color: {'#f0f': 'orange'}
#   lineWidth: {5:1}
#   shape:     'line'
#   position: {x: {400: 0}, y: {400: 0} }
#   duration: 5000
#   bitRadius: {2: 0}

# bubble = new charites.Bubble
#   # parent:   wrapper
#   # el: canvas
#   radius:    {5: 50}
#   fill: {'#000': '#ff0000'}
#   color: {'#f0f': 'orange'}
#   lineWidth: {5:1}
#   shape:     'line'
#   position: {x: {0: 400}, y: {0: 400} }
#   duration: 5000
#   bitRadius: {2: 0}
#   # dimentions: { x: 400, y: 400 }

