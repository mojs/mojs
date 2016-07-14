# ignore coffescript sudo code
### istanbul ignore next ###

Bit = require('./bit').default or require('./bit');

class Zigzag extends Bit
  _declareDefaults:->
    super
    @_defaults.tag    = 'path'
    @_defaults.points = 3
    # @_defaults.ratio = 1.43;
  _draw:->
    super
    p = this._props
    return if !@_props.points
    
    radiusX = if @_props.radiusX? then @_props.radiusX else @_props.radius
    radiusY = if @_props.radiusY? then @_props.radiusY else @_props.radius

    isRadiusX = radiusX is @_prevRadiusX
    isRadiusY = radiusY is @_prevRadiusY
    isPoints  = p.points is @_prevPoints
    # skip if nothing changed
    return if ( isRadiusX and isRadiusY and isPoints )

    x = p.width/2
    y = p.height/2

    currentX = x-radiusX
    currentY = y
    stepX    = (2*radiusX) / (p.points-1)
    yFlip    = -1

    delta = Math.sqrt(stepX*stepX + radiusY*radiusY)
    length = -delta

    points = "M#{currentX}, #{y} "
    for i in [0...p.points]
      points   += "L#{currentX}, #{currentY} "
      currentX += stepX
      length   += delta

      currentY = if yFlip is -1 then y-radiusY else y
      yFlip    = -yFlip

    @_length = length
    @el.setAttribute 'd', points
    
    # save the properties
    @_prevPoints  = p.points
    @_prevRadiusX = radiusX
    @_prevRadiusY = radiusY
    
  _getLength:-> @_length

module.exports = Zigzag
