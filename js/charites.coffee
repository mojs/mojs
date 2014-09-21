h      = require './helpers'
Bubble = require './bits/Bubble'
Burst  = require './bits/Burst'

class Charites
  Bubble: Bubble
  Burst:  Burst

charites = new Charites

if (typeof define is "function") and define.amd
  define "charites", [], -> charites
else if typeof module is "object" and typeof module?.exports is "object"
  module.exports = charites
else window?.charites = charites

canvas = document.getElementById 'js-canvas'

canvas.setAttribute 'width', 400
canvas.setAttribute 'height', 400

bubble = new charites.Burst
  # parent:   wrapper
  el: canvas
  radius:    {5: 50}
  fill: {'#000': '#ff0000'}
  color: {'#f0f': 'orange'}
  lineWidth: {5:1}
  shape:     'line'
  position: {x: {400: 0}, y: {400: 0} }
  duration: 5000
  bitRadius: {2: 0}

bubble = new charites.Bubble
  # parent:   wrapper
  # el: canvas
  radius:    {5: 50}
  fill: {'#000': '#ff0000'}
  color: {'#f0f': 'orange'}
  lineWidth: {5:1}
  shape:     'line'
  position: {x: {0: 400}, y: {0: 400} }
  duration: 5000
  bitRadius: {2: 0}
  # dimentions: { x: 400, y: 400 }

