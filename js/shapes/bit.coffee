h       = require '../h'
class Bit
  ns:                   'http://www.w3.org/2000/svg'
  type:                 'line'
  ratio:                1
  defaults:
    radius:             50
    radiusX:            undefined
    radiusY:            undefined
    points:             3
    x:                  0
    y:                  0
    angle:              0
    'stroke':           'hotpink'
    'stroke-width':     2
    'stroke-opacity':   1
    'fill':             'transparent'
    'fill-opacity':     1
    'stroke-dasharray': ''
    'stroke-dashoffset':''
    'stroke-linecap':   ''
  constructor:(@o={})-> @init()
  init:-> @vars(); @render(); @
  vars:->
    if @o.ctx and @o.ctx.tagName is 'svg' then @ctx = @o.ctx
    else if !@o.el
      h.error 'You should pass a real context(ctx) to the bit'
      # --> COVER return if not ctx and not el
      # return true
    @state = []; @drawMapLength = @drawMap.length
    @extendDefaults()
    @calcTransform()
  calcTransform:->
    rotate    = "rotate(#{@props.angle}, #{@props.x}, #{@props.y})"
    @props.transform = "#{rotate}"
  extendDefaults:->
    @props ?= {}
    for key, value of @defaults
      @props[key] = if @o[key]? then @o[key] else value
  setAttr:(attr, value)->
    if typeof attr is 'object'
      keys = Object.keys(attr); len = keys.length; el = value or @el
      while(len--)
        key = keys[len]; val = attr[key]
        el.setAttribute key, val
    else @el.setAttribute attr, value
  setProp:(attr, value)->
    if typeof attr is 'object'
      for key, val of attr
        @props[key] = val
    else @props[attr] = value
  render:->
    @isRendered = true
    if @o.el? then @el = @o.el; @isForeign = true
    else
      @el = document.createElementNS @ns, @type or 'line'
      !@o.isDrawLess and @draw(); @ctx.appendChild @el

  drawMap: [
    'stroke', 'stroke-width', 'stroke-opacity', 'stroke-dasharray', 'fill',
    'stroke-dashoffset', 'stroke-linecap', 'fill-opacity', 'transform',
    ]
  draw:->
    @props.length = @getLength()
    len = @drawMapLength
    while(len--)
      name = @drawMap[len]
      if name is 'stroke-dasharray' or name is 'stroke-dashoffset'
        if h.isArray(@props[name])
          stroke = ''
          for dash, i in @props[name]
            cast = if dash.units is '%' then dash.value * (@props.length/100)
            else dash.value
            stroke += "#{cast} "
            @props[name] = stroke
      @setAttrIfChanged name, @props[name]
  setAttrIfChanged:(name)->
    if @state[name] isnt (value = @props[name])
      @el.setAttribute name, value
      @state[name] = value
  getLength:-> 2*if @props.radiusX? then @props.radiusX else @props.radius

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "Bit", [], -> Bit
### istanbul ignore next ###
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = Bit
### istanbul ignore next ###
window?.mojs ?= {}
### istanbul ignore next ###
window?.mojs.Bit = Bit












