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

# TODO
#  add size option
wrapper = document.getElementById 'js-wrapper'
bubble = new charites.Burst
  parent:   wrapper
  radius:    {20: 80}
  fill: {'#000': '#ff0000'}
  color: {'#f0f': 'orange'}
  lineWidth: {20:1}
  shape:     'line'
  position: {x: {0:600}, y: {0, 300} }
















