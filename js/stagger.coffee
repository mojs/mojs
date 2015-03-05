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

  vars:->
    h.extend(@ownDefaults, @defaults); @defaults = @ownDefaults
    super; @parseEls()

  parseEls:->
    if h.isDOM(@props.els)
      if @props.els.childNodes
        @props.els = Array::slice.call @props.els.childNodes, 0
    else if @props.els + '' is '[object NodeList]'
      @props.els = Array::slice.call @props.els, 0
    else if typeof @props.els is 'string'
      els = document.querySelector @props.els
      @props.els = Array::slice.call els.childNodes, 0

  createBit:->
    @transits = []; len = @props.els.length
    for i in [0...len]
      # option = @getOption(i); option.ctx = @ctx
      # option.isDrawLess = option.isRunLess = option.isTweenLess = true
      # @props.randomAngle  and (option.angleShift  = @generateRandomAngle())
      # @props.randomRadius and (option.radiusScale = @generateRandomRadius())
      @transits.push new Transit bit: @getPropByMod 'els', i

  getPropByMod:(name, i)->
    prop = @props[name]; if h.isArray(prop) then prop[i % prop.length] else prop

  calcSize:->
  draw:->

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

