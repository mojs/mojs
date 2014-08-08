h = require '../helpers'

class Bit
  oa: {} # options

  x:   0
  y:   0
  deg: 0

  constructor:(@o={})->
    @vars?()
    @setProp x: 10

  vars:->
    @parent = @default prop: 'parent', def: h.body

    # create element if it is not exist
    @el = @o.el or @el or @createElement()
    # get CANVAS context
    @ctx = @ctx or @el.getContext('2d')

  setProp:(props)->
    for propName, propValue of props
      @[propName] = propValue

    @render()

  render:-> console.log 'render'

  createElement:->
    return if @foreignContext
    @el = document.createElement 'canvas'
    @parent.appendChild @el

  setElSize:(size)->
    @el.setAttribute 'width',  size.width
    @el.setAttribute 'height', size.height or size.width

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


