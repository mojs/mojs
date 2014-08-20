Bit = require './bit'

class Circle extends Bit
  vars:->
    @radius   = @default prop: 'radius', def: 50
    @size     = width: 2*@radius, height: 2*@radius
    defPosition = {x: @size.width, y: @size.height}
    @position = @default prop: 'position', def: defPosition
    @lineWEnd = @o.lineWidthEnd
    super

  render:->
    if !@ctx then console.error('Circle.render: no context!'); return
    @isClearLess or @ctx.clear()

    @ctx.beginPath()
    lwe = @lineWEnd
    x = (@position.x+(lwe/2))*@px
    y = (@position.y+(lwe/2))*@px
    @ctx.arc(x, y, @radius*@px, 0, 2*Math.PI)
   
    @ctx.lineWidth   = @lineWidth*@px

    c = @colorObj
    @ctx.strokeStyle = "rgba(#{c.r},#{c.g},#{c.b}, #{c.a})"
    @ctx.lineCap     = @lineCap

    (@lineWidth > 0) and @ctx.stroke()


module.exports = Circle