# ignore coffescript sudo code
### istanbul ignore next ###

Bit = require('./bit').default or require('./bit');

class Rect extends Bit
  # shape:   'rect'
  # ratio:   1.43
  _declareDefaults:->
    super
    this._defaults.tag = 'rect'
    this._defaults.rx  = 0
    this._defaults.ry  = 0
    # this._defaults.ratio = 1.43
  _draw:->
    super
    p = @_props
    radiusX = if p.radiusX? then p.radiusX else p.radius
    radiusY = if p.radiusY? then p.radiusY else p.radius
    @_setAttrIfChanged 'width', 2*radiusX
    @_setAttrIfChanged 'height', 2*radiusY
    @_setAttrIfChanged 'x', (p.width/2) - radiusX
    @_setAttrIfChanged 'y', (p.height/2) - radiusY
    @_setAttrIfChanged 'rx', p.rx
    @_setAttrIfChanged 'ry', p.ry

  _getLength:->
    radiusX = if @_props.radiusX? then @_props.radiusX else @_props.radius
    radiusY = if @_props.radiusY? then @_props.radiusY else @_props.radius
    2*(2*radiusX + 2*radiusY)

module.exports = Rect
