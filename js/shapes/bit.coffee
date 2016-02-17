h       = require '../h'

class Bit
  ns:                     'http://www.w3.org/2000/svg'
  shape:                  'line'
  ratio:                  1
  defaults:
    radius:               50
    radiusX:              undefined
    radiusY:              undefined
    points:               3
    x:                    0
    y:                    0
    angle:                0
    stroke:               'hotpink'
    'stroke-width':       2
    'stroke-opacity':     1
    fill:                 'transparent'
    'fill-opacity':       1
    'stroke-dasharray':   ''
    'stroke-dashoffset':  ''
    'stroke-linecap':     ''
  constructor:(@o={})-> @vars(); @render(); @
  vars:->
    if @o.ctx and @o.ctx.tagName is 'svg' then @ctx = @o.ctx
    else if !@o.el
      h.error 'You should pass a real context(ctx) to the bit'
      # --> COVER return if not ctx and not el
      # return true
    @state = {}; @drawMapLength = @drawMap.length
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
      @el = document.createElementNS @ns, @shape or 'line'
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
      switch name
        when 'stroke-dasharray', 'stroke-dashoffset'
          @castStrokeDash name
          # name is 'stroke-dashoffset' and console.log @props[name]
      @setAttrsIfChanged name, @props[name]

    @state.radius = @props.radius

  castStrokeDash:(name)->
    # if array of values
    if h.isArray(@props[name])
      stroke = ''
      for dash, i in @props[name]
        cast = if dash.unit is '%' then @castPercent(dash.value) else dash.value
        stroke += "#{cast} "
      @props[name] = if stroke is '0 ' then stroke = '' else stroke
      return @props[name] = stroke
    # if single value
    if typeof @props[name] is 'object'
      stroke = if @props[name].unit is '%'
        @castPercent(@props[name].value)
      else @props[name].value
      @props[name] = if stroke is 0 then stroke = '' else stroke

  castPercent:(percent)-> percent * (@props.length/100)
  setAttrsIfChanged:(name, value)->
    if typeof name is 'object'
      keys = Object.keys(name); len = keys.length
      while(len--)
        key = keys[len]; value = name[key]; @setAttrIfChanged key, value
    else
      value ?= @props[name]
      @setAttrIfChanged name, value
  setAttrIfChanged:(name, value)->
    if @isChanged(name, value)
      @el.setAttribute(name, value); @state[name] = value
  isChanged:(name, value)-> value ?= @props[name]; @state[name] isnt value
  getLength:->
    if @el?.getTotalLength? and @el.getAttribute('d') then @el.getTotalLength()
    else 2*if @props.radiusX? then @props.radiusX else @props.radius

module.exports = Bit
