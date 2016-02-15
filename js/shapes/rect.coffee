# ignore coffescript sudo code
### istanbul ignore next ###

Bit = require './bit'

class Rect extends Bit
  shape:   'rect'
  ratio:  1.43
  draw:->
    super
    radiusX = if @props.radiusX? then @props.radiusX else @props.radius
    radiusY = if @props.radiusY? then @props.radiusY else @props.radius
    @setAttrsIfChanged
      width:  2*radiusX
      height: 2*radiusY
      x:      @props.x - radiusX
      y:      @props.y - radiusY

  getLength:->
    radiusX = if @props.radiusX? then @props.radiusX else @props.radius
    radiusY = if @props.radiusY? then @props.radiusY else @props.radius
    2*radiusX + 2*radiusY

module.exports = Rect
