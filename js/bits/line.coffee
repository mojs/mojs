Bit = require './bit'

class Line extends Bit
  vars:->
    super
    @start    = @default prop: 'start' ,   def: {x: 0, y: 0}
    @end      = @default prop: 'end' ,     def: {x: 0, y: 0}
    @position = @default prop: 'position', def: {x: 0, y: 0}

  render:->
    @ctx.clear()
    @ctx.beginPath()

    @ctx.moveTo @start.x, @start.y
    @ctx.lineTo @end.x,   @end.y

    @ctx.strokeStyle = @color
    @ctx.stroke()


module.exports = Line