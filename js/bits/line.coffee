Bit = require './bit'

class Line extends Bit
  vars:->
    @start    = @default prop: 'start' ,   def: {x: 0, y: 0}
    @end      = @default prop: 'end' ,     def: {x: 0, y: 0}
    @position = @default prop: 'position', def: {x: 0, y: 0}
    @lineWidth= @default prop: 'lineWidth',def: 1
    @lineCap  = @default prop: 'lineCap',def: 1

    @size     = width: (@end.x-@start.x)+@lineWidth, height: @end.y-@start.y
    super

  render:->
    @ctx.clear()
    @ctx.beginPath()

    @ctx.moveTo 0, 0
    @ctx.lineTo (@end.x-@start.x)*@px,   (@end.y-@start.y)*@px

    @ctx.lineWidth   = @lineWidth*@px
    @ctx.strokeStyle = @color
    @ctx.lineCap     = @lineCap
    @ctx.stroke()


module.exports = Line