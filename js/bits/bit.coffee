h = require '../helpers'
require '../polyfills'

class Bit
  oa: {} # options

  x:   0
  y:   0
  deg: 0
  px: h.pixel

  constructor:(@o={})->
    @vars?()
    @setProp x: 10

  vars:->
    @parent = @default prop: 'parent', def: h.body
    @color  = @default prop: 'color' , def: '#333'
    # create element if it is not exist
    @el = @o.el or @el or @createElement()
    # get CANVAS context
    @ctx = @ctx or @el.getContext('2d')

  setProp:(props)->
    for propName, propValue of props
      @[propName] = propValue

    @render()

  createElement:->
    # return if @foreignContext
    @el = document.createElement 'canvas'
    @parent.appendChild @el
    @setElSize()
    @el

  setElSize:(size)->
    width  = @size.width*@px
    height = @size.height*@px or @size.width*@px
    @el.setAttribute 'width',  width
    @el.setAttribute 'height', height
    if @px > 1
      @el.style.width   = "#{width/2}px"
      @el.style.height  = "#{height/2}px"

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

module.exports = Bit


