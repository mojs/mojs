# ignore coffescript sudo code
### istanbul ignore next ###

Bit = require './bit'

class Circle extends Bit
  shape: 'ellipse'
  draw:->
    rx = if @props.radiusX? then @props.radiusX else @props.radius
    ry = if @props.radiusY? then @props.radiusY else @props.radius
    @setAttrsIfChanged rx: rx, ry: ry, cx: @props.x, cy: @props.y
    super
  getLength:->
    radiusX = if @props.radiusX? then @props.radiusX else @props.radius
    radiusY = if @props.radiusY? then @props.radiusY else @props.radius
    # Math.pow is needed for safari's 6.0.5 odd bug
    2*Math.PI*Math.sqrt((Math.pow(radiusX,2) + Math.pow(radiusY,2))/2)

module.exports = Circle
