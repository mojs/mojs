# ignore coffescript sudo code
### istanbul ignore next ###

Bit = require('./bit').default or require('./bit');

class Equal extends Bit
  # shape: 'path'
  # ratio: 1.43
  _declareDefaults:->
    super
    this._defaults.shape = 'path'
    # this._defaults.ratio = 1.43
  _draw:->
    super
    return if !@_props.points
    radiusX = if @_props.radiusX? then @_props.radiusX else @_props.radius
    radiusY = if @_props.radiusY? then @_props.radiusY else @_props.radius
    x1 = @_props.x-radiusX; x2 = @_props.x+radiusX
    d = ''; yStep = 2*radiusY/(@_props.points-1)
    yStart = @_props.y-radiusY
    for i in [0...@_props.points]
      y = "#{i*yStep + yStart}"
      d += "M#{x1}, #{y} L#{x2}, #{y} "
    @setAttr d: d
  _getLength:-> 2*if @_props.radiusX? then @_props.radiusX else @_props.radius
  
module.exports = Equal
