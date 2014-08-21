Bit = require './bit'

class Circle extends Bit
  vars:->
    @radius   = @default prop: 'radius', def: 50
    @radiusX  = @defaultPart prop: 'radiusX', def: @radius
    @radiusY  = @defaultPart prop: 'radiusY', def: @radius
    @size     = width: 2*@radiusX, height: 2*@radiusY
    defPosition = {x: @size.width, y: @size.height}
    @position = @default prop: 'position', def: defPosition
    super

  render:->
    if !@ctx then console.error('Circle.render: no context!'); return
    @isClearLess or @ctx.clear()
    @ctx.beginPath()
    lx = @position.x - 2*@radiusX
    rx = @position.x + 2*@radiusX
    ty = @position.y - 2*@radiusY
    dy = @position.y + 2*@radiusY
    magic = 0.551784
    xmagic = 2*@radiusX*magic
    ymagic = 2*@radiusY*magic

    @ctx.moveTo @position.x, ty
    @ctx.bezierCurveTo(@position.x+xmagic,ty,rx,@position.y-ymagic,rx,@position.y)
    @ctx.bezierCurveTo(rx,@position.y+ymagic,@position.x+xmagic,dy,@position.x,dy)
    @ctx.bezierCurveTo(@position.x-xmagic,dy,lx,@position.y+ymagic,lx,@position.y)
    @ctx.bezierCurveTo(lx,@position.y-ymagic,@position.x-xmagic,ty,@position.x,ty)

    @ctx.lineWidth   = @lineWidth*@px

    c = @colorObj
    @ctx.strokeStyle = "rgba(#{c.r},#{c.g},#{c.b}, #{c.a})"
    @ctx.lineCap     = @lineCap

    (@lineWidth > 0) and @ctx.stroke()


module.exports = Circle