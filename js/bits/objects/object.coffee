Bit  = require '../bit'

class Object extends Bit
  constructor:(@o={})-> @vars()
  vars:->
    # get CANVAS context
    @ctx   = @o.ctx or @ctx
    @px    = @h.pixel

    @parent     = @default prop: 'parent', def: @h.body
    @color      = @default prop: 'color' , def: '#222'
    @fill       = @default prop: 'fill' ,  def: '#222'

    @lineWidth= @default prop: 'lineWidth',def: 1
    @lineCap  = @default prop: 'lineCap',  def: 'round'
    @opacity  = @default prop: 'opacity',  def: 1
    @isClearLess  = @default prop: 'isClearLess',  def: false
    @angle        = @default prop: 'angle',       def: 0
    @lineDash     = @default prop: 'lineDash',    def: []
    @lineDashOffset = @default prop: 'lineDashOffset', def: 0

    @radius     = @default prop: 'radius', def: 50
    @radiusX    = @defaultPart prop: 'radiusX', def: @radius
    @radiusY    = @defaultPart prop: 'radiusY', def: @radius
    @size       = width: 2*@radiusX, height: 2*@radiusY
    defPosition = {x: @size.width/2, y: @size.height/2}
    @position   = @default prop: 'position', def: defPosition

    @colorObj = @h.makeColorObj @color
    @fillObj  = @h.makeColorObj @fill

  renderStart:->
    name = @name or 'object'
    if !@ctx then console.error("#{name}.render: no context!"); return
    @isClearLess or @ctx.clear()
    @ctx.save(); @ctx.beginPath()

  preRender:->  @renderStart(); @rotation(); @radiusRender()
  postRender:->
    c = @fillObj
    @ctx.fillStyle = "rgba(#{c.r},#{c.g},#{c.b}, #{@opacity-(1-c.a)})"
    # @ctx.closePath()
    @ctx.fill();  @ctx.restore(); @stroke()

  rotation:->
    x = @position.x; y = @position.y
    @ctx.translate(x,y); @ctx.rotate(@angle*@h.DEG); @ctx.translate(-x,-y)

  radiusRender:->
    @ctx.translate(@position.x-4*@radiusX, @position.y-4*@radiusY)
    @ctx.scale(4*@radiusX, 4*@radiusY)

  stroke:->
    @ctx.lineWidth   = @lineWidth*@px
    @ctx.lineCap     = @lineCap
    @ctx.lineDashOffset = @lineDashOffset
    @ctx.setLineDash?(@lineDash)
    c = @colorObj
    @ctx.strokeStyle = "rgba(#{c.r},#{c.g},#{c.b}, #{@opacity-(1-c.a)})"
    (@lineWidth > 0) and @ctx.stroke()

module.exports = Object


