h = require '../helpers'

class Bit
  oa: {}
  constructor:(@o={})->
    @vars()
    @imidiate and @run()

  vars:->
    @size = @o.size or 100
    @size *= h.pixel
    @radius = @o.radius or @size/2 or 50
    @radius *= h.pixel

    @color    = @default('color', 'deeppink')
    @rate     = @default('rate', .5)
    @fillRate = @default('fillRate', .33)
    @duration = @default('duration', 600)
    @delay    = @default('delay', 0)

    @easing = @default('easing', 'Linear.None')
    @easingArr = @easing.split('.')

    @imidiate = @o.imidiate
    @imidiate ?= true

    @o.el? and (@foreignContext = true)

    @x = if @foreignContext then @default('x', @radius) else @radius
    @y = if @foreignContext then @default('y', @radius) else @radius
    
    @el = @o.el or @el or @createContext()

    @ctx = @ctx or @el.getContext('2d')

  createContext:->
    #just in case
    return if @foreignContext
    @el = document.createElement 'canvas'
    @el.setAttribute 'width',  2*@radius
    @el.setAttribute 'height', 2*@radius

    # for retina
    if h.pixel > 1
      @el.style.width   = "#{@radius}px"
      @el.style.height  = "#{@radius}px"
    h.body.appendChild @el
    @el

  default:(prop, def)->
    @[prop] = if @oa[prop]?
      @oa[prop]
    else if @[prop]?
      @[prop]
    else if @o[prop]?
      @o[prop]
    else def
    # @[prop] = @oa[prop] or @[prop] or @o[prop] or def


module.exports = do -> Bit
