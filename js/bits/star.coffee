Object = require './object'

class Star extends Object
  name: 'Star'
  vars:->
    super
    @spikes       = @default prop: 'spikes',       def: 5
    @innerRadius  = @default prop: 'innerRadius',  def: .5
    @innerRadius  = @h.slice @innerRadius, 1
  render:->
    @renderStart(); @rotation(); @radius()

    rot = Math.PI/2 * 3
    cx = 1; cy = 1
    x = cx; y = cy
    r0 = @innerRadius; r1 = 1
    step = Math.PI/@spikes

    @ctx.moveTo cx, cy - r0
    i = 0
    while i < @spikes
      x = cx + Math.cos(rot) * r0
      y = cy + Math.sin(rot) * r0
      @ctx.lineTo x, y
      rot += step
      x = cx + Math.cos(rot) * r1
      y = cy + Math.sin(rot) * r1
      @ctx.lineTo x, y
      rot += step
      i++
    @ctx.lineTo cx, cy - r0

    @ctx.closePath(); @ctx.restore(); @stroke()


module.exports = Star