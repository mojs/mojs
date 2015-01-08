# ignore coffescript sudo code
### istanbul ignore next ###

Bit       = require './bit'
Line      = require './line'
Circle    = require './circle'
Triangle  = require './triangle'
Rect      = require './rect'
h         = require './h'

elsMap =
  circle:     Circle
  triangle:   Triangle
  line:       Line
  rect:       Rect

class Byte extends Bit
  progress: 0
  defaults:
    radius:             50
    strokeWidth:        2
    strokeOpacity:      1
    strokeDasharray:    ''
    strokeDashoffset:   ''
    stroke:             '#ff00ff'
    fill:               'transparent'
    fillOpacity:        1
    duration:           500
    delay:              0
    x:                  0
    y:                  0
    deg:                0
    size:               null
  vars:-> @extendDefaults(); @calcTransform()

  calcTransform:->
    @props.transform = "rotate(#{@props.deg},#{@props.center},#{@props.center})"

  render:->
    if !@o.ctx?
      @ctx = document.createElementNS @ns, 'svg'
      @ctx.style.position  = 'absolute'
      @ctx.style.width     = '100%'
      @ctx.style.height    = '100%'
      @createBit(); @calcSize()

      @el   = document.createElement 'div'
      size  = "#{@props.size/16}rem"
      @el.style.position  = 'absolute'
      @el.style.width     = size
      @el.style.height    = size

      @el.style['backface-visibility'] = 'hidden'
      @el.style["#{h.prefix.css}backface-visibility"] = 'hidden'

      @el.appendChild @ctx
      (@o.parent or document.body).appendChild @el
    else @ctx = @o.ctx; @createBit()

    !@o.isDrawLess and @draw()

  createBit:->
    bitClass = elsMap[@o.type or @type]
    @bit = new bitClass ctx: @ctx, isDrawLess: true

  setProgress:(progress)->
    @progress = if progress < 0 or !progress then 0
    else if progress > 1 then 1 else progress
    for key, value of @deltas

      # strokeDasharray/strokeDashoffset
      if value.delta instanceof Array
        @props[key] = ''
        for num, i in value.delta
          @props[key] += "#{value.start[i] + num*@progress} "
      else # number or color
        if !value.delta.r? # if not a color
          @props[key] = value.start + value.delta*@progress
        else # if color
          r = parseInt (value.start.r + value.delta.r*@progress), 10
          g = parseInt (value.start.g + value.delta.g*@progress), 10
          b = parseInt (value.start.b + value.delta.b*@progress), 10
          a = parseInt (value.start.a + value.delta.a*@progress), 10
          @props[key] = "rgba(#{r},#{g},#{b},#{a})"

    @draw()

  draw:->
    @bit.setProp
      x:                  @props.center
      y:                  @props.center
      stroke:             @props.stroke
      strokeWidth:        @props.strokeWidth
      strokeOpacity:      @props.strokeOpacity
      strokeDasharray:    @props.strokeDasharray
      strokeDashoffset:   @props.strokeDasharray
      fill:               @props.fill
      fillOpacity:        @props.fillOpacity
      radius:             @props.radius
      transform:          @calcTransform()
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
    @props.size   *= @bit.ratio
    @props.center = @props.size/2

  extendDefaults:->
    @props  ?= {}
    @deltas ?= {}
    for key, defaultsValue of @defaults
      # if { 20: 75 } was passed
      optionsValue = @o[key]
      if optionsValue and typeof optionsValue is 'object'
        start = Object.keys(optionsValue)[0]
        # if color was passed
        if isNaN parseFloat(start)
          end           = optionsValue[start]
          startColorObj = h.makeColorObj start
          endColorObj   = h.makeColorObj end
          @deltas[key]  =
            start:  startColorObj
            end:    endColorObj
            delta:
              r: endColorObj.r - startColorObj.r
              g: endColorObj.g - startColorObj.g
              b: endColorObj.b - startColorObj.b
              a: endColorObj.a - startColorObj.a
        else if key is 'strokeDasharray' or key is 'strokeDashoffset'
          end   = optionsValue[start]
          startArr  = h.strToArr start
          endArr    = h.strToArr end
          h.normDashArrays startArr, endArr
          @deltas[key] =
            start:  startArr
            end:    endArr
            delta:  h.calcArrDelta startArr, endArr
        else # plain numeric value
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

