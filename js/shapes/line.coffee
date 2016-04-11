# ignore coffescript sudo code
### istanbul ignore next ###

Bit = require('./bit').default;

class Line extends Bit
  draw:->
    radiusX = if @_props.radiusX? then @_props.radiusX else @_props.radius
    @setAttrsIfChanged
      x1:  @_props.x - radiusX
      x2:  @_props.x + radiusX
      y1:  @_props.y
      y2:  @_props.y
    super

module.exports = Line
