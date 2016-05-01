# ignore coffescript sudo code
### istanbul ignore next ###

Bit = require('./bit').default or require('./bit');

class Zigzag extends Bit
  _declareDefaults:->
    super
    @_defaults.shape = 'path';
    # @_defaults.ratio = 1.43;
  draw:->
    return if !@_props.points
    radiusX = if @_props.radiusX? then @_props.radiusX else @_props.radius
    radiusY = if @_props.radiusY? then @_props.radiusY else @_props.radius
    points = ''; stepX = 2*radiusX/@_props.points
    stepY  = 2*radiusY/@_props.points; strokeWidth = @_props['stroke-width']
    
    xStart = @_props.x - radiusX - strokeWidth
    yStart = @_props.y - radiusY - strokeWidth

    @_length = 0

    for i in [@_props.points...0]
      iX = xStart + i*stepX + strokeWidth; iY = yStart + i*stepY + strokeWidth
      iX2 = xStart + (i-1)*stepX + strokeWidth
      iY2 = yStart + (i-1)*stepY + strokeWidth

      @_length += stepX + stepY

      char = if i is @_props.points then 'M' else 'L'
      points += "#{char}#{iX},#{iY} l0, -#{stepY} l-#{stepX}, 0"

    @setAttr d: points
    super
  getLength:-> @_length

module.exports = Zigzag
