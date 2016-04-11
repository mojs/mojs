# ignore coffescript sudo code
### istanbul ignore next ###

Bit = require('./bit').default;

class Circle extends Bit
  vars: ->
    super
    this.shape = 'ellipse';
  draw:->
    rx = if @props.radiusX? then @props.radiusX else @props.radius
    ry = if @props.radiusY? then @props.radiusY else @props.radius
    @setAttrIfChanged 'rx', rx
    @setAttrIfChanged 'ry', ry
    @setAttrIfChanged 'cx', @props.x
    @setAttrIfChanged 'cy', @props.y
    # @setAttrsIfChanged rx: rx, ry: ry, cx: @props.x, cy: @props.y
    super
  getLength:->
    radiusX = if @props.radiusX? then @props.radiusX else @props.radius
    radiusY = if @props.radiusY? then @props.radiusY else @props.radius
    # Math.pow is needed for safari's 6.0.5 odd bug
    # pow = Math.pow;
    2*Math.PI*Math.sqrt((radiusX*radiusX + radiusY*radiusY)/2)

module.exports = Circle
