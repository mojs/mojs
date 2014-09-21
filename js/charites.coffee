h      = require './helpers'
Bubble = require './bits/Bubble'
Burst  = require './bits/Burst'

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
# canvas = document.getElementById 'js-canvas'

pather = new Pather


