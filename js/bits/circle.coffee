Bit = require './bit'

class Circle extends Bit
  vars:->
    @radius   = @default prop: 'radius', def: 50
    @radiusX  = @defaultPart prop: 'radiusX', def: @radius
    @radiusY  = @defaultPart prop: 'radiusY', def: @radius
    @size     = width: 2*@radiusX, height: 2*@radiusY
    defPosition = {x: @size.width, y: @size.height}
    @position = @default prop: 'position', def: defPosition
    @angle      = @default prop: 'angle', def: 0
    super

  render:->
    # console.time 'render'
    if !@ctx then console.error('Circle.render: no context!'); return
    @isClearLess or @ctx.clear()
    
    @ctx.save()

    # deg = 45
    # step = @deg/100
    # x = 800*step
    # y = 400*step
    @ctx.beginPath()

    @ctx.translate(@position.x-2*@radiusX, @position.y-2*@radiusY)
    @ctx.scale(2*@radiusX, 2*@radiusY)
    @ctx.arc(1, 1, 1, 0, 2 * Math.PI, false)

    # @ctx.translate(@o.parentSize.x,@o.parentSize.y)
    # @ctx.rotate(@angle*Math.PI/180)
    # @ctx.translate(-@o.parentSize.x,-@o.parentSize.y)

    # lx = @position.x - 2*@radiusX
    # rx = @position.x + 2*@radiusX
    # ty = @position.y - 2*@radiusY
    # dy = @position.y + 2*@radiusY
    # magic = 0.551784
    # xmagic = 2*@radiusX*magic
    # ymagic = 2*@radiusY*magic

    # xMagic = @position.x+xmagic
    # yMagic = @position.y+ymagic
    # yMagic2 = @position.y-ymagic
    # xMagic2 = @position.x-xmagic
 
    # @ctx.moveTo @position.x, ty
    # @ctx.bezierCurveTo(xMagic,ty,rx,yMagic2,rx,@position.y)
    # @ctx.bezierCurveTo(rx,yMagic,xMagic,dy,@position.x,dy)
    # @ctx.bezierCurveTo(xMagic2,dy,lx,yMagic,lx,@position.y)
    # @ctx.bezierCurveTo(lx,yMagic2,xMagic2,ty,@position.x,ty)

    @ctx.restore()
    @ctx.lineWidth   = @lineWidth*@px
    c = @colorObj
    @ctx.strokeStyle = "rgba(#{c.r},#{c.g},#{c.b}, #{c.a})"
    @ctx.lineCap     = @lineCap
    (@lineWidth > 0) and @ctx.stroke()
    # console.timeEnd 'render'


module.exports = Circle