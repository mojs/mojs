Bit = require './bit'


# TODO
# add rotation option
# add angle option
# add stroske dash array option

class Circle extends Bit
  vars:->
    @radius   = @default prop: 'radius', def: 50
    @radiusX  = @defaultPart prop: 'radiusX', def: @radius
    @radiusY  = @defaultPart prop: 'radiusY', def: @radius
    @size     = width: 2*@radiusX, height: 2*@radiusY
    defPosition = {x: @size.width, y: @size.height}
    @position = @default prop: 'position', def: defPosition
    @deg      = @default prop: 'deg', def: 0
    super

  render:->
    # console.time 'render'
    if !@ctx then console.error('Circle.render: no context!'); return
    @isClearLess or @ctx.clear()
    
    @ctx.save()
    @ctx.translate(-50,-50)
    @ctx.rotate(20*Math.PI/180)
    @ctx.beginPath()

    # i = 0 * Math.PI

    # while i < (2 * Math.PI) + 0.1
    #   xPos = @position.x - (2*@radiusY * Math.sin(i))
    #    * Math.sin(@deg * Math.PI) + (2*@radiusX * Math.cos(i))
    #     * Math.cos(@deg * Math.PI)
    #   yPos = @position.y + (2*@radiusX * Math.cos(i))
    #    * Math.sin(@deg * Math.PI) + (2*@radiusY * Math.sin(i))
    #     * Math.cos(@deg * Math.PI)
    #   if i is 0
    #     @ctx.moveTo xPos, yPos
    #   else
    #     @ctx.lineTo xPos, yPos
    #   i += 0.1

    lx = @position.x - 2*@radiusX
    rx = @position.x + 2*@radiusX
    ty = @position.y - 2*@radiusY
    dy = @position.y + 2*@radiusY
    magic = 0.551784
    xmagic = 2*@radiusX*magic
    ymagic = 2*@radiusY*magic

    xMagic = @position.x+xmagic
    yMagic = @position.y+ymagic
    yMagic2 = @position.y-ymagic
    xMagic2 = @position.x-xmagic

    
    @ctx.moveTo @position.x, ty
    @ctx.bezierCurveTo(xMagic,ty,rx,yMagic2,rx,@position.y)
    @ctx.bezierCurveTo(rx,yMagic,xMagic,dy,@position.x,dy)
    @ctx.bezierCurveTo(xMagic2,dy,lx,yMagic,lx,@position.y)
    @ctx.bezierCurveTo(lx,yMagic2,xMagic2,ty,@position.x,ty)

    @ctx.lineWidth   = @lineWidth*@px

    c = @colorObj
    @ctx.strokeStyle = "rgba(#{c.r},#{c.g},#{c.b}, #{c.a})"
    @ctx.lineCap     = @lineCap

    (@lineWidth > 0) and @ctx.stroke()
    @ctx.restore()
    # console.timeEnd 'render'


module.exports = Circle