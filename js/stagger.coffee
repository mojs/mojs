# ignore coffescript sudo code
### istanbul ignore next ###
h        = require './h'
Timeline = require './tween/timeline'
Tween    = require './tween/tween'
Transit  = require './transit'

class Stagger extends Transit
  

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "Stagger", [], -> Stagger
### istanbul ignore next ###
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = Stagger
### istanbul ignore next ###
window?.mojs ?= {}
### istanbul ignore next ###
window?.mojs.Stagger = Stagger

