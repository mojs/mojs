Bit = require './bit'

class Circle extends Bit
  vars:->
    @radius   = @default prop: 'radius', def: 50
    @size     = width: 2*@radius, height: 2*@radius
    defPosition = {x: @size.width/2, y: @size.height/2}
    @position = @default prop: 'position', def: defPosition
    super

  render:->
    if !@ctx then console.error('Circle.render: no context!'); return
    @isClearLess or @ctx.clear()

    @ctx.beginPath()
    @ctx.arc(@position.x*@px, @position.y*@px, @radius*@px, 0, 2*Math.PI)
   
    @ctx.lineWidth   = @lineWidth*@px

    c = @colorObj
    @ctx.strokeStyle = "rgba(#{c.r},#{c.g},#{c.b}, #{c.a})"
    @ctx.lineCap     = @lineCap
    @ctx.stroke()


module.exports = Circle