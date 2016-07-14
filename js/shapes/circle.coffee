# ignore coffescript sudo code
### istanbul ignore next ###

Bit = require('./bit').default or require('./bit');

class Circle extends Bit
  _declareDefaults: ->
    super
    @_defaults.shape = 'ellipse'
    
  _draw:->
    rx = if @_props.radiusX? then @_props.radiusX else @_props.radius
    ry = if @_props.radiusY? then @_props.radiusY else @_props.radius
    @_setAttrIfChanged 'rx', rx
    @_setAttrIfChanged 'ry', ry
    @_setAttrIfChanged 'cx', @_props.width/2
    @_setAttrIfChanged 'cy', @_props.height/2
    # @_setAttrIfChanged 'cx', @_props.width/2
    # @_setAttrIfChanged 'cy', @_props.height/2
    # @setAttrsIfChanged rx: rx, ry: ry, cx: @_props.x, cy: @_props.y
    super
  _getLength:->
    radiusX = if @_props.radiusX? then @_props.radiusX else @_props.radius
    radiusY = if @_props.radiusY? then @_props.radiusY else @_props.radius
    # Math.pow is needed for safari's 6.0.5 odd bug
    # pow = Math.pow;
    2*Math.PI*Math.sqrt((radiusX*radiusX + radiusY*radiusY)/2)

module.exports = Circle
