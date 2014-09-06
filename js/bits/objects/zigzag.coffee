Object = require './object'

class ZigZag extends Object
  name: 'ZigZag'

  vars:->
    super
    @rate   = @default prop: 'rate', def: .25
    @spikes = @default prop: 'spikes', def: 10

  render:->
    @preRender()

    for i in [0...@spikes]
      method = if i is 0 then 'moveTo' else 'lineTo'
      y = if i % 2 is 0 then @rate else -@rate
      x = 0+(i*(2/(@spikes-1)))
      @ctx[method](x,1+y)

    @postRender()


module.exports = ZigZag