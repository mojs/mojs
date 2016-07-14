# ignore coffescript sudo code
### istanbul ignore next ###

Bit = require('./bit').default or require('./bit');;

class Cross extends Bit
  # shape: 'path'
  _declareDefaults: ->
    super
    @_defaults.tag = 'path'
  _draw:->
    super
    p = @_props
    radiusX = if @_props.radiusX? then @_props.radiusX else @_props.radius
    radiusY = if @_props.radiusY? then @_props.radiusY else @_props.radius

    isRadiusX = radiusX is @_prevRadiusX
    isRadiusY = radiusY is @_prevRadiusY
    # skip if nothing changed
    return if ( isRadiusX and isRadiusY )

    x = @_props.width/2; y = @_props.height/2
    x1 = x-radiusX; x2 = x+radiusX
    line1 = "M#{x1},#{y} L#{x2},#{y}"
    y1 = y-radiusY; y2 = y+radiusY
    line2 = "M#{x},#{y1} L#{x},#{y2}"
    d = "#{line1} #{line2}"
    @el.setAttribute 'd', d

    # save the properties
    @_prevRadiusX = radiusX
    @_prevRadiusY = radiusY

  _getLength:->
    radiusX = if @_props.radiusX? then @_props.radiusX else @_props.radius
    radiusY = if @_props.radiusY? then @_props.radiusY else @_props.radius
    2*(radiusX+radiusY)

module.exports = Cross
