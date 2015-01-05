h = require './h'

class Bit
  ns: 'http://www.w3.org/2000/svg'
  type: 'line'
  defaults:
    radius:             50
    radiusX:            null
    radiusY:            null
    strokeWidth:        2
    stroke:             'hotpink'
    fill:               'transparent'
    strokeDasharray:    ''
    strokeDashoffset:   ''
    x:                  0
    y:                  0
    deg:                0
  constructor:(@o={})-> @vars(); @render()
  vars:->
    if @o.ctx and @o.ctx.tagName is 'svg' then @ctx = @o.ctx
    else throw Error 'You should pass a real context(ctx) to the bit'
    @props ?= {}
    # extends defaults by options to properties
    for key, value of @defaults
      @props[key] = @o[key] or value

    rotate    = "rotate(#{@props.deg}, #{@props.x}, #{@props.y})"
    @props.transform = "#{rotate}"

  setAttr:(attr, value)->
    if typeof attr is 'object'
      for key, val of attr
        # handle camelCase
        keySnake = key.split(/(?=[A-Z])/).join('-').toLowerCase()

        if h.stylePropsMap[key] then (value or @el).style[keySnake] = val
        else (value or @el).setAttribute keySnake, val
    else @el.setAttribute attr, value
  render:->
    @isRendered = true
    @el = document.createElementNS @ns, @type or 'line'
    !@o.isDrawLess and @draw()
    @ctx.appendChild @el
  draw:->
    @setAttr
      stroke:           @props.stroke
      strokeWidth:      @props.strokeWidth
      strokeDasharray:  @props.strokeDasharray
      strokeDashoffset: @props.strokeDashoffset
      fill:             @props.fill
      transform:        @props.transform


### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "Bit", [], -> Bit
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = Bit
### istanbul ignore next ###
window?.mojs ?= {}
window?.mojs.Bit = Bit












