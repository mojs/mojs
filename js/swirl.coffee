# ignore coffescript sudo code
### istanbul ignore next ###

# TODO
#   - add shift swirl
Transit   = require './transit'
class Swirl extends Transit
  skipPropsDelta: x: 1, y: 1
  vars:-> super; !@o.isSwirlLess and @generateSwirl()
  extendDefaults:->
    super
    x = @getPosValue('x'); y = @getPosValue('y')
    # xDelta = Math.abs(x.delta); yDelta = Math.abs(y.delta)
    ang = if y.delta is 0 or x.delta is 0 then 1 else x.delta/y.delta
    @positionDelta =
      radius: Math.sqrt(x.delta*x.delta + y.delta*y.delta)
      angle:  90+Math.atan(ang)*(Math.PI/180)
      x: x
      y: y
    @o.angleShift  ?= 0; @o.radiusScale ?= 1
    @props.angleShift   = @h.parseIfRand @o.angleShift
    @props.radiusScale  = @h.parseIfRand @o.radiusScale
  getPosValue:(name)->
    optVal = @o[name]
    if optVal and typeof optVal is 'object'
      val = @h.parseDelta name, optVal
      start:  val.start.value,
      end:    val.end.value
      delta:  val.delta,
      units:  val.end.unit
    else
      val = parseFloat(optVal or @defaults[name])
      { start: val, end: val, delta: 0, units: 'px' }
  setProgress:(progress)->
    angle = @positionDelta.angle + @props.angleShift
    if !@o.isSwirlLess then angle += @getSwirl(progress)
    point = @h.getRadialPoint
      angle:  angle
      radius: @positionDelta.radius*progress*@props.radiusScale
      center: x: @positionDelta.x.start, y: @positionDelta.y.start
    x = point.x.toFixed(4); y = point.y.toFixed(4)
    @props.x = if @o.ctx then x else x+@positionDelta.x.units
    @props.y = if @o.ctx then y else y+@positionDelta.y.units
    super
  generateSwirl:->
    @props.signRand = if @h.rand(0, 1) then -1 else 1
    @o.swirlSize ?= 10; @o.swirlFrequency ?= 3
    @props.swirlSize      = @h.parseIfRand @o.swirlSize
    @props.swirlFrequency = @h.parseIfRand @o.swirlFrequency
  getSwirl:(progress)->
    @props.signRand*@props.swirlSize*Math.sin(@props.swirlFrequency*progress)

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "Swirl", [], -> Swirl
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = Swirl
### istanbul ignore next ###
window?.mojs ?= {}
window?.mojs.Swirl = Swirl

