Bit = require './bit'

class Circle extends Bit
  vars:->
    @radius   = @default prop: 'radius', def: 50
    @radiusX  = @defaultPart prop: 'radiusX', def: @radius
    @radiusY  = @defaultPart prop: 'radiusY', def: @radius
    @size     = width: 2*@radiusX, height: 2*@radiusY
    defPosition = {x: @size.width, y: @size.height}
    @position = @default prop: 'position', def: defPosition
    @angle    = @default prop: 'angle',  def: 0
    @degree   = @default prop: 'degree', def: 360
    @degreeOffset = @default prop: 'degreeOffset', def: 0

    @lineDash     = @default prop: 'lineDash',    def: []

    super

  render:->
    # console.time 'render'
    if !@ctx then console.error('Circle.render: no context!'); return
    @isClearLess or @ctx.clear()

    @ctx.save(); @ctx.beginPath()

    # rotation
    @ctx.translate(@o.parentSize.x,@o.parentSize.y)
    @ctx.rotate(@angle*Math.PI/180)
    @ctx.translate(-@o.parentSize.x,-@o.parentSize.y)

    # ellipse
    angle = Math.PI/180
    @ctx.translate(@position.x-2*@radiusX, @position.y-2*@radiusY)
    @ctx.scale(2*@radiusX, 2*@radiusY)
    @ctx.arc(1, 1, 1, @degreeOffset*angle, (@degree+@degreeOffset)*angle, false)
    @ctx.restore()

    @ctx.lineWidth   = @lineWidth*@px
    @ctx.lineCap     = @lineCap
    @ctx.setLineDash(@lineDash)
    c = @colorObj; @ctx.strokeStyle = "rgba(#{c.r},#{c.g},#{c.b}, #{c.a})"
    (@lineWidth > 0) and @ctx.stroke()
    
    # @ctx.restore()
    # console.timeEnd 'render'


module.exports = Circle