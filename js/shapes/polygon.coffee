# ignore coffescript sudo code
### istanbul ignore next ###

Bit = require('./bit').default or require('./bit');
h   = require '../h'

class Polygon extends Bit
  ###
    Method to declare defaults.
    @overrides @ Bit
  ###
  _declareDefaults:->
    super
    this._defaults.tag    = 'path'
    this._defaults.points = 3
  ###
    Method to draw the shape.
    @overrides @ Bit
  ###
  _draw:->
    p    = @_props
    step = 360/(@_props.points)
    # reuse radial points buffer
    if !@_radialPoints? then @_radialPoints = []
    else @_radialPoints.length = 0

    for i in [0...@_props.points]
      @_radialPoints.push h.getRadialPoint
        radius:   @_props.radius
        radiusX:  @_props.radiusX
        radiusY:  @_props.radiusY
        angle:    (i*step)
        center:   x: p.width/2, y: p.height/2
    d = ''
    for point, i in @_radialPoints
      char = if i is 0 then 'M' else 'L'
      d += "#{char}#{point.x.toFixed(4)},#{point.y.toFixed(4)} "

    @el.setAttribute 'd', (d += 'z')
    super
  ###
    Method to get length of the shape.
    @overrides @ Bit
  ###
  _getLength:-> @_getPointsPerimiter( @_radialPoints );

module.exports = Polygon
