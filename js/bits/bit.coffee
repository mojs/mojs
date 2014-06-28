h = require '../helpers'

class Bit
  oa: {}
  constructor:(@o={})->
    @vars()
    @imidiate and @run()

  vars:->
    @size = @o.size or 100
    @size *= h.pixel

    @oldRadius = @radius
    @radius = @default('radius', 50)
    @radius *= h.pixel

    @el = @o.el or @el or @createContext()
    @o.el? and (@foreignContext = true)
    @ctx = @ctx or @el.getContext('2d')

    @radius isnt @oldRadius and @setElSize()

    @color    = @default('color', 'deeppink')
    @rate     = @default('rate', .5)
    @fillRate = @default('fillRate', .33)
    @duration = @default('duration', 600)
    @delay    = @default('delay', 0)

    @easing = @default('easing', 'Linear.None')
    @easingArr = @easing.split('.')

    @imidiate = @o.imidiate
    @imidiate ?= true

    @x = if @foreignContext then @default('x', @radius) else @radius
    @y = if @foreignContext then @default('y', @radius) else @radius

  createContext:->
    #just in case
    return if @foreignContext
    @el = document.createElement 'canvas'
    h.body.appendChild @el

  setElSize:->
    console.log 'set'
    @el.setAttribute 'width',  2*@radius
    @el.setAttribute 'height', 2*@radius

    # for retina
    if h.pixel > 1
      @el.style.width   = "#{@radius}px"
      @el.style.height  = "#{@radius}px"
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
