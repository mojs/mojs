# ignore coffescript sudo code
### istanbul ignore next ###

Bit = require('./bit').default;

class Cross extends Bit
  # shape: 'path'
  _declareDefaults: ->
    super
    @_defaults.shape = 'path'
  draw:->
    super
    radiusX = if @_props.radiusX? then @_props.radiusX else @_props.radius
    radiusY = if @_props.radiusY? then @_props.radiusY else @_props.radius
    x = parseInt(@_props.x, 10); y = parseInt(@_props.y, 10)
    x1 = x-radiusX; x2 = x+radiusX
    line1 = "M#{x1},#{@_props.y} L#{x2},#{@_props.y}"
    y1 = y-radiusY; y2 = y+radiusY
    line2 = "M#{@_props.x},#{y1} L#{@_props.x},#{y2}"
    d = "#{line1} #{line2}"
    @setAttr d: d
  getLength:->
    radiusX = if @_props.radiusX? then @_props.radiusX else @_props.radius
    radiusY = if @_props.radiusY? then @_props.radiusY else @_props.radius
    2*(radiusX+radiusY)

module.exports = Cross
