# ignore coffescript sudo code
### istanbul ignore next ###

Bit       = require './bit'
Line      = require './line'
Circle    = require './circle'
Rect      = require './rect'
h         = require './h'

elsMap =
  circle:   Circle
  line:     Line
  rect:     Rect

class Byte extends Bit
  progress: 0
  defaults:
    radius:       50
    strokeWidth:  2
    stroke:       '#ff00ff'
    fill:         'transparent'
    duration:     500
    delay:        0
    x:            0
    y:            0
    deg:          0
    size:         null
  vars:-> @extendDefaults(); @calcTransform(); @calcSize()
  render:->
    if !@o.ctx?
      @el   = document.createElement 'div'
      size  = "#{@props.size/16}rem"
      @el.style.position  = 'absolute'
      @el.style.width     = size
      @el.style.height    = size
      # console.log "#{h.prefix.css}backface-visibility"
      @el.style['transform'] = 'translateZ(0px)'
      @el.style["#{h.prefix.css}transform"] = 'translateZ(0px)'

      @ctx = document.createElementNS @ns, 'svg'
      @ctx.style.position  = 'absolute'
      @ctx.style.width     = '100%'
      @ctx.style.height    = '100%'
      @el.appendChild @ctx
      (@o.parent or document.body).appendChild @el
    else @ctx = @o.ctx

    bitClass = elsMap[@o.type or @type]
    @bit = new bitClass ctx: @ctx, isDrawLess: true
    !@o.isDrawLess and @draw()

  setProgress:(progress)->
    @progress = if progress < 0 or !progress then 0
    else if progress > 1 then 1 else progress
    for key, value of @deltas
      @props[key] = value.start + value.delta*@progress
    @draw()

  draw:->
    @bit.setProp
      x:                  @props.center
      y:                  @props.center
      stroke:             @props.stroke
      strokeWidth:        @props.strokeWidth
      strokeDasharray:    @props.strokeDasharray
      strokeDashoffset:   @props.strokeDasharray
      fill:               @props.fill
      radius:             @props.radius
      deg:                @props.deg
    @bit.draw()

  calcSize:->
    return if @o.size? or @o.ctx

    dRadius = @deltas['radius']; dStroke = @deltas['strokeWidth']
    radius = if dRadius?
      Math.max Math.abs(dRadius.start), Math.abs(dRadius.end)
    else @props.radius
    stroke = if dStroke?
      Math.max Math.abs(dStroke.start), Math.abs(dStroke.end)
    else @props.strokeWidth
    @props.size   = 2*radius + stroke
    @props.center = @props.size/2

  extendDefaults:->
    @props  ?= {}
    @deltas ?= {}
    for key, defaultsValue of @defaults
      # if { 20: 75 } was passed
      optionsValue = @o[key]
      if optionsValue and typeof optionsValue is 'object'
        start = Object.keys(optionsValue)
        end   = parseFloat optionsValue[start]
        start = parseFloat start
        @deltas[key] =
          start:  start
          end:    end
          delta:  end - start
        @props[key] = start
      else @props[key] = @o[key] or defaultsValue

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "Byte", [], -> Byte
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = Byte
### istanbul ignore next ###
window?.mojs ?= {}
window?.mojs.Byte = Byte

