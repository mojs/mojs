Bit = require './bit'

class Line extends Bit
  vars:->
    @start    = @default prop: 'start' ,   def: {x: 0, y: 0}
    @end      = @default prop: 'end' ,     def: {x: 0, y: 0}
    @position = @default prop: 'position', def: {x: 0, y: 0}
    @size     = width: (@end.x-@start.x)+@lineWidth, height: @end.y-@start.y
    
    super

  render:->
    console.log 'render'
    # @vars()
    if !@ctx then console.error('Line.render: no context!'); return
    @isClearLess or @ctx.clear()
    # @ctx.save()
    # console.log @angle*Math.PI/180
    # @ctx.translate(@centerX, @centerY)
    # @ctx.rotate(@angle*(Math.PI/180))

    @ctx.beginPath()
    # @ctx.setLineDash([100])

    @ctx.moveTo  (@start.x)*@px, (@start.y)*@px
    @ctx.lineTo  (@end.x)*@px,   (@end.y)*@px

    @ctx.lineWidth   = @lineWidth*@px
    
    c = @colorObj
    @ctx.strokeStyle = "rgba(#{c.r},#{c.g},#{c.b}, #{@opacity})"
    @ctx.lineCap     = @lineCap
    @ctx.stroke()

    # @ctx.restore()



module.exports = Line