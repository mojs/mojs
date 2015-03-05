# ignore coffescript sudo code
### istanbul ignore next ###
h        = require './h'
Timeline = require './tween/timeline'
Tween    = require './tween/tween'
Transit  = require './transit'

class Stagger extends Transit
  ownDefaults:
    delay: 'stagger(200)'
    els:   null

  constructor:(@o={})-> @vars()

  vars:->
    h.extend(@ownDefaults, @defaults); @defaults = @ownDefaults
    super
    if h.isDOM(@props.els)
      if @props.els.childNodes then @props.els = @props.els.childNodes

  createBit:->
    super
  

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

