# ignore coffescript sudo code
### istanbul ignore next ###

Bit = require('./bit').default;

class Equal extends Bit
  # shape: 'path'
  # ratio: 1.43
  vars:->
    super
    this.shape = 'path';
    this.ratio = 1.43;
  draw:->
    super
    return if !@props.points
    radiusX = if @props.radiusX? then @props.radiusX else @props.radius
    radiusY = if @props.radiusY? then @props.radiusY else @props.radius
    x1 = @props.x-radiusX; x2 = @props.x+radiusX
    d = ''; yStep = 2*radiusY/(@props.points-1)
    yStart = @props.y-radiusY
    for i in [0...@props.points]
      y = "#{i*yStep + yStart}"
      d += "M#{x1}, #{y} L#{x2}, #{y} "
    @setAttr d: d
  getLength:-> 2*if @props.radiusX? then @props.radiusX else @props.radius
  
module.exports = Equal
