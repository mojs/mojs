Bit = require './bit'

class Line extends Bit
  vars:->
    @start    = @default prop: 'start' ,   def: {x: 0, y: 0}
    @end      = @default prop: 'end' ,     def: {x: 0, y: 0}
    @position = @default prop: 'position', def: {x: 0, y: 0}
    @lineWidth= @default prop: 'lineWidth',def: 1
    @lineCap  = @default prop: 'lineCap',  def: 1
    @opacity  = @default prop: 'opacity',  def: 1
    @angle      = @default prop: 'angle',  def: 0
    @transformOrigin = @default prop: 'transform-origin', def: 'center'

    @x = @end.x - @start.x; @y = @end.y - @start.y
    @length = Math.sqrt(@x*@x + @y*@y)
    @radius = @length/2

    @minX = Math.min @start.x, @end.x
    @maxX = Math.max @start.x, @end.x

    @minY = Math.min @start.y, @end.y
    @maxY = Math.max @start.y, @end.y

    # @centerX = @minX + (@maxX/2)
    # @centerY = @minY + (@maxY/2)
    # @centerX = 300
    # @centerY = 300

    # x = @centerX + Math.cos(@angle)*@radius
    # y = @centerY + Math.sin(@angle)*@radius

    # console.log @centerX, @centerY

    @size     = width: (@end.x-@start.x)+@lineWidth, height: @end.y-@start.y
    super

  render:->
    # @vars()
    if !@ctx then console.error('Line.render: no context!'); return
    @ctx.clear()
    # @ctx.save()
    # console.log @angle*Math.PI/180
    # @ctx.translate(@centerX, @centerY)
    # @ctx.rotate(@angle*(Math.PI/180))

    @ctx.beginPath()

    @ctx.moveTo  (@start.x)*@px, (@start.y)*@px
    @ctx.lineTo  (@end.x)*@px,   (@end.y)*@px

    @ctx.lineWidth   = @lineWidth*@px
    
    c = @colorObj
    @ctx.strokeStyle = "rgba(#{c.r},#{c.g},#{c.b}, #{@opacity})"
    @ctx.lineCap     = @lineCap
    @ctx.stroke()

    # @ctx.restore()



module.exports = Line