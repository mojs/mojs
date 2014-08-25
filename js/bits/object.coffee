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
    @angle        = @default prop: 'angle',       def: 0
    @lineDash     = @default prop: 'lineDash',    def: []

    @radius     = @default prop: 'radius', def: 50
    @radiusX    = @defaultPart prop: 'radiusX', def: @radius
    @radiusY    = @defaultPart prop: 'radiusY', def: @radius
    @size       = width: 2*@radiusX, height: 2*@radiusY
    defPosition = {x: @size.width/2, y: @size.height/2}
    @position   = @default prop: 'position', def: defPosition

    @colorObj = @h.makeColorObj @color

  setProp:(props)->
    for propName, propValue of props
      @[propName] = propValue
    @render?()

  renderStart:->
    name = @name or 'object'
    if !@ctx then console.error("#{name}.render: no context!"); return
    @isClearLess or @ctx.clear()
    @ctx.save(); @ctx.beginPath()

  rotation:->
    @ctx.translate(@o.parentSize.x,@o.parentSize.y)
    @ctx.rotate(@angle*Math.PI/180)
    @ctx.translate(-@o.parentSize.x,-@o.parentSize.y)

  ellipse:->
    angle = Math.PI/180
    @ctx.translate(@position.x-2*@radiusX, @position.y-2*@radiusY)
    @ctx.scale(2*@radiusX, 2*@radiusY)
    @ctx.arc(1, 1, 1, @degreeOffset*angle, (@degree+@degreeOffset)*angle, false)

  stroke:->
    @ctx.lineWidth   = @lineWidth*@px
    @ctx.lineCap     = @lineCap
    @ctx.setLineDash?(@lineDash)
    c = @colorObj
    @ctx.strokeStyle = "rgba(#{c.r},#{c.g},#{c.b}, #{@opacity-(1-c.a)})"
    (@lineWidth > 0) and @ctx.stroke()


module.exports = Object


