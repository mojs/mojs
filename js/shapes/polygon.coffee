# ignore coffescript sudo code
### istanbul ignore next ###

Bit = require('./bit').default;
h   = require '../h'

class Polygon extends Bit
  _declareDefaults:->
    super
    this._defaults.shape = 'path'
  draw:->
    # !@isDraw and @drawShape()
    @drawShape()
    super
  drawShape:->
    # @_props.points = parseInt(@_props.points)
    step = 360/(@_props.points); @radialPoints = []
    for i in [0...@_props.points]
      @radialPoints.push h.getRadialPoint
        radius:   @_props.radius
        radiusX:  @_props.radiusX
        radiusY:  @_props.radiusY
        angle:    (i*step)
        center:   x: parseFloat(@_props.x), y: parseFloat(@_props.y)
    d = ''
    for point, i in @radialPoints
      char = if i is 0 then 'M' else 'L'
      d += "#{char}#{point.x.toFixed(4)},#{point.y.toFixed(4)} "

    @setAttr d: d += 'z'

  getLength:-> @el.getTotalLength()

module.exports = Polygon
