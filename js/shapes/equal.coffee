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
    p = @_props
    return if !@_props.points

    radiusX = if @_props.radiusX? then @_props.radiusX else @_props.radius
    radiusY = if @_props.radiusY? then @_props.radiusY else @_props.radius

    isRadiusX = radiusX is @_prevRadiusX
    isRadiusY = radiusY is @_prevRadiusY
    isPoints  = p.points is @_prevPoints
    # skip if nothing changed
    return if ( isRadiusX and isRadiusY and isPoints )

    x = @_props.width/2; y = @_props.height/2
    x1 = x-radiusX; x2 = x+radiusX
    d = ''; yStep = 2*radiusY/(@_props.points-1)
    yStart = y-radiusY
    for i in [0...@_props.points]
      y = "#{i*yStep + yStart}"
      d += "M#{x1}, #{y} L#{x2}, #{y} "

    @el.setAttribute 'd', d

    # save the properties
    @_prevPoints  = p.points
    @_prevRadiusX = radiusX
    @_prevRadiusY = radiusY

  _getLength:->
    2*if @_props.radiusX? then @_props.radiusX else @_props.radius
  
module.exports = Equal
