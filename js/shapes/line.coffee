# ignore coffescript sudo code
### istanbul ignore next ###

Bit = require './bit'

class Line extends Bit
  draw:->
    radiusX = if @props.radiusX? then @props.radiusX else @props.radius
    @setAttrsIfChanged
      x1:  @props.x - radiusX
      x2:  @props.x + radiusX
      y1:  @props.y
      y2:  @props.y
    super

module.exports = Line
