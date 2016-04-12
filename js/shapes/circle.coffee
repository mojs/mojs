# ignore coffescript sudo code
### istanbul ignore next ###

Bit = require('./bit').default;
class Circle extends Bit
  _declareDefaults: ->
    super
    this._defaults.shape = 'ellipse';
  draw:->
    rx = if @_props.radiusX? then @_props.radiusX else @_props.radius
    ry = if @_props.radiusY? then @_props.radiusY else @_props.radius
    @setAttrIfChanged 'rx', rx
    @setAttrIfChanged 'ry', ry
    @setAttrIfChanged 'cx', @_props.x
    @setAttrIfChanged 'cy', @_props.y
    # @setAttrsIfChanged rx: rx, ry: ry, cx: @_props.x, cy: @_props.y
    super
  getLength:->
    radiusX = if @_props.radiusX? then @_props.radiusX else @_props.radius
    radiusY = if @_props.radiusY? then @_props.radiusY else @_props.radius
    # Math.pow is needed for safari's 6.0.5 odd bug
    # pow = Math.pow;
    2*Math.PI*Math.sqrt((radiusX*radiusX + radiusY*radiusY)/2)

module.exports = Circle
