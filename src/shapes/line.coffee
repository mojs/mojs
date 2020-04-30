# ignore coffescript sudo code
### istanbul ignore next ###

Bit = require('./bit').default or require('./bit');

class Line extends Bit
  _declareDefaults:->
    super
    this._defaults.tag = 'line'
  _draw:->
    radiusX = if @_props.radiusX? then @_props.radiusX else @_props.radius
    x = @_props.width/2
    y = @_props.height/2
    @_setAttrIfChanged 'x1', x - radiusX
    @_setAttrIfChanged 'x2', x + radiusX
    @_setAttrIfChanged 'y1', y
    @_setAttrIfChanged 'y2', y
    super

module.exports = Line
