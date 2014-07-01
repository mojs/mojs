h = require '../helpers'

class Bit
  oa: {}
  constructor:(@o={})->
    @vars()
    @imidiate and @run()

  vars:->
    @size = @o.size or 100
    @size *= h.pixel

    @cnt = @default(prop:'cnt', def: 3)

    @oldRadius = @radius
    @radius = @default(prop:'radius', def: 50)

    @oa.radius? and h.unlock lock: 'bitRadiusLock'
    h.lock
      lock: 'bitRadiusLock'
      fun:=> @radius *= h.pixel

    @default prop: 'lineCap', def:'round'

    @el = @o.el or @el or @createContext()
    @o.el? and (@foreignContext = true)
    @ctx = @ctx or @el.getContext('2d')

    @radius isnt @oldRadius and @setElSize()

    @color        = @default(prop:'color', def: 'deeppink')
    @rate         = @default(prop:'rate', def: .5)
    @fillRate     = @default(prop:'fillRate', def: .33)
    @duration     = @default(prop:'duration', def: 600)
    @delay        = @default(prop:'delay', def: 0)
    @strokeWidth  = @default(prop: 'strokeWidth', def: 1)

    @easing = @default(prop:'easing', def: 'Linear.None')

    @easingArr = @easing.split('.')

    @imidiate = @o.imidiate
    @imidiate ?= true

    @x = if @foreignContext then @default(prop:'x', def: @radius) else @radius
    @y = if @foreignContext then @default(prop: 'y', def: @radius) else @radius

  createContext:->
    #just in case
    return if @foreignContext
    @el = document.createElement 'canvas'
    h.body.appendChild @el

  setElSize:->
    @el.setAttribute 'width',  2*@radius
    @el.setAttribute 'height', 2*@radius

    # for retina
    if h.pixel > 1
      @el.style.width   = "#{@radius}px"
      @el.style.height  = "#{@radius}px"
    @el

  default:(o)->
    prop = o.prop
    def  = o.def
    @[prop] = if @oa[prop]?
      @oa[prop]
    else if @[prop]?
      @[prop]
    else if @o[prop]?
      @o[prop]
    else def

    # @[prop] = @oa[prop] or @[prop] or @o[prop] or def


module.exports = Bit
