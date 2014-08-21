Bit = require './bit'

# TODO
# ellipse

class Circle extends Bit
  vars:->
    @radius   = @default prop: 'radius', def: 50
    @radiusX  = @defaultPart prop: 'radiusX', def: @radius
    @radiusY  = @defaultPart prop: 'radiusY', def: @radius
    @size     = width: 2*@radius, height: 2*@radius
    defPosition = {x: @size.width, y: @size.height}
    @position = @default prop: 'position', def: defPosition
    super

  render:->
    if !@ctx then console.error('Circle.render: no context!'); return
    @isClearLess or @ctx.clear()

    @ctx.beginPath()
    lx = @position.x - @radiusX
    rx = @position.x + @radiusX
    ty = @position.y - @radiusY
    dy = @position.y + @radiusY
    magic = 0.551784
    xmagic = @radiusX*magic
    ymagic = @radiusY*magic

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