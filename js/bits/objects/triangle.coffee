Object = require './object'

class Triangle extends Object
  name: 'Triangle'

  vars:-> super; @spikes = @default prop: 'spikes', def: 3

  render:->
    @preRender()

    angle = 30
    step = 360/@spikes
    for i in [0..@spikes]
      rotation = (angle+@angle)*@h.DEG
      x = 1 + Math.cos(rotation)
      y = 1 + Math.sin(rotation)
      angle += step

      method = if i is 0 then 'moveTo' else 'lineTo'
      @ctx[method](x, y)

    @ctx.closePath()

    @postRender()


module.exports = Triangle