Bit  = require './bit'

class Object extends Bit
  constructor:(@o={})-> @vars()
  vars:->
    # get CANVAS context
    @ctx   = @o.ctx or @ctx
    @px    = @h.pixel

    @parent     = @default prop: 'parent', def: @h.body
    @color      = @default prop: 'color' , def: '#222'

    @lineWidth= @default prop: 'lineWidth',def: 1
    @lineCap  = @default prop: 'lineCap',  def: 'round'
    @opacity  = @default prop: 'opacity',  def: 1
    @isClearLess  = @default prop: 'isClearLess',  def: false

    @colorObj = @h.makeColorObj @color

  setProp:(props)->
    for propName, propValue of props
      @[propName] = propValue
    @render?()

module.exports = Object


