# ignore coffescript sudo code
### istanbul ignore next ###

Bit = require('./bit').default;

class Rect extends Bit
  # shape:   'rect'
  # ratio:   1.43
  _declareDefaults:->
    super
    this._defaults.shape = 'rect'
    this._defaults.ratio = 1.43
  draw:->
    super
    radiusX = if @_props.radiusX? then @_props.radiusX else @_props.radius
    radiusY = if @_props.radiusY? then @_props.radiusY else @_props.radius
    @setAttrsIfChanged
      width:  2*radiusX
      height: 2*radiusY
      x:      parseFloat(@_props.x) - radiusX
      y:      parseFloat(@_props.y) - radiusY
      rx:     @_props.rx
      ry:     @_props.ry

  getLength:->
    radiusX = if @_props.radiusX? then @_props.radiusX else @_props.radius
    radiusY = if @_props.radiusY? then @_props.radiusY else @_props.radius
    2*radiusX + 2*radiusY

module.exports = Rect
