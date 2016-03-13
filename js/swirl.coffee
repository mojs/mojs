# ignore coffescript sudo code
### istanbul ignore next ###

Transit = require('./transit').default
h       = require('./h')
class Swirl extends Transit
  _skipPropsDelta: x: 1, y: 1
  _vars:-> super; !@_o.isSwirlLess and @generateSwirl()
  _extendDefaults:->
    super
    x = @getPosValue('x'); y = @getPosValue('y')
    angle = 90 + Math.atan((y.delta/x.delta) or 0)*(180/Math.PI)
    if x.delta < 0 then angle += 180
    @positionDelta =
      radius: Math.sqrt(x.delta*x.delta + y.delta*y.delta)
      angle:  angle
      x: x
      y: y
    @_o.radiusScale ?= 1
    @_props.angleShift   = h.parseIfRand(@_o.angleShift or 0)
    @_props.radiusScale  = h.parseIfRand @_o.radiusScale

  getPosValue:(name)->
    optVal = @_o[name]
    if optVal and typeof optVal is 'object'
      val = h.parseDelta name, optVal
      start:  val.start.value,
      end:    val.end.value
      delta:  val.delta,
      units:  val.end.unit
    else
      val = parseFloat(optVal or @_defaults[name])
      { start: val, end: val, delta: 0, units: 'px' }
  _setProgress:( progress )->
    angle = @positionDelta.angle# + @_props.angleShift
    if @_o.isSwirl then angle += @getSwirl(progress)
    point = h.getRadialPoint
      angle:  angle
      radius: @positionDelta.radius*progress*@_props.radiusScale
      center: x: @positionDelta.x.start, y: @positionDelta.y.start
    x = point.x.toFixed(4); y = point.y.toFixed(4)
    @_props.x = if @_o.ctx then x else x+@positionDelta.x.units
    @_props.y = if @_o.ctx then y else y+@positionDelta.y.units
    super
  generateSwirl:->
    @_props.signRand = if Math.round(h.rand(0, 1)) then -1 else 1
    @_o.swirlSize ?= 10; @_o.swirlFrequency ?= 3
    @_props.swirlSize      = h.parseIfRand @_o.swirlSize
    @_props.swirlFrequency = h.parseIfRand @_o.swirlFrequency
  getSwirl:(progress)->
    @_props.signRand*@_props.swirlSize*Math.sin(@_props.swirlFrequency*progress)

module.exports = Swirl

