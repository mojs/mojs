class Bit
  ns: 'http://www.w3.org/2000/svg'
  type: 'line'
  defaults:
    radius:      50
    strokeWidth: 2
    strokeColor: 'hotpink'
    fillColor:   'deeppink'
    x:    0
    y:    0
    deg:  0
  constructor:(@o={})-> @vars(); @render()
  vars:->
    if @o.ctx and @o.ctx.tagName is 'svg' then @ctx = @o.ctx
    else throw Error 'You should pass a real context(ctx) to the bit'
    @props ?= {}
    # extends defaults by options to properties
    for key, value of @defaults
      @props[key] = @o[key] or value

    @props.cX = @props.x - @props.radius
    @props.cY = @props.y - @props.radius

    translate = "translate(#{@props.cX}, #{@props.cY})"
    rotate    = "rotate(#{@props.deg}, #{@props.cX}, #{@props.cY})"
    @props.transform = "#{translate} #{rotate}"

  setAttr:(attr, value)->
    if typeof attr is 'object'
      for key, value of attr
        # handle camelCase
        key = key.split(/(?=[A-Z])/).join('-').toLowerCase()
        @el.setAttribute key, value
    else @el.setAttribute attr, value
  render:->
    @isRendered = true
    @el = document.createElementNS @ns, 'line'
    !@o.isDrawLess and @draw()
    @ctx.appendChild @el
  draw:->


### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "Bit", [], -> Bit
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = Bit
window?.mojs ?= {}
window?.mojs.Bit = Bit












