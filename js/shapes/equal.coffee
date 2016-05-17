# ignore coffescript sudo code
### istanbul ignore next ###

Bit = require('./bit').default or require('./bit');

class Equal extends Bit
  # shape: 'path'
  # ratio: 1.43
  _declareDefaults:->
    super
    this._defaults.tag = 'path'
    this._defaults.points = 2
  _draw:->
    super
    return if !@_props.points
    radiusX = if @_props.radiusX? then @_props.radiusX else @_props.radius
    radiusY = if @_props.radiusY? then @_props.radiusY else @_props.radius
    x = @_props.width/2; y = @_props.height/2
    x1 = x-radiusX; x2 = x+radiusX
    d = ''; yStep = 2*radiusY/(@_props.points-1)
    yStart = y-radiusY
    for i in [0...@_props.points]
      y = "#{i*yStep + yStart}"
      d += "M#{x1}, #{y} L#{x2}, #{y} "
    @el.setAttribute 'd', d
  _getLength:-> 2*if @_props.radiusX? then @_props.radiusX else @_props.radius
  
module.exports = Equal
