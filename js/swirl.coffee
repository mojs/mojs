# ignore coffescript sudo code
### istanbul ignore next ###

Transit   = require './transit'
class Swirl extends Transit
  skipPropsDelta:
    x: 1
    y: 1
  # init:->
  #   console.log @o
  #   super
  extendDefaults:->
    super
    x = if @o.x and typeof @o.x is 'object'
      val = @h.parseDelta 'x', @o.x
      console.log val
      
      start: val.start.value
      end:   val.end.value
      delta: val.delta
      units: val.end.unit
    else
      x = parseFloat(@o.x or @defaults.x)
      { start: x, end: x, delta: 0, units: 'px' }
    y = if @o.y and typeof @o.y is 'object'
      val = @h.parseDelta 'y', @o.y
      
      start: val.start.value
      end:   val.end.value
      delta: val.delta
      units: val.end.unit
    else
      y = parseFloat(@o.y or @defaults.y)
      { start: y, end: y, delta: 0, units: 'px' }

    @positionDelta =
      radius: Math.max Math.abs(x.delta), Math.abs(y.delta)
      angle:  90 + Math.atan(y.delta/x.delta)*(180/Math.PI)
      x: x, y: y

    @props.x = "#{x.start}#{x.units}"
    @props.y = "#{y.start}#{y.units}"

  setProgress:(progress)->
    super
    point = @h.getRadialPoint
      angle:  @positionDelta.angle
      radius: @positionDelta.radius*progress
      center: x: @positionDelta.x.start, y: @positionDelta.y.start
    @o.isIt and console.log point
    @props.x = point.x.toFixed(4)+@positionDelta.y.units
    @props.y = point.y.toFixed(4)+@positionDelta.y.units
    # console.log @bit
  #   # t0 = performance.now()
  #   super; i = @transits.length
  #   while(i--)
  #     @transits[i]
  #       .setProgress(progress)
  #       .draw()
  #   # t1 = performance.now()
  #   # console.log t1 - t0
  # calcSize:->
  #   largestSize = -1
  #   for transit, i in @transits
  #     if largestSize < transit.props.size
  #       largestSize = transit.props.size
  #   selfSize = if @deltas.radius
  #     start = Math.abs @deltas.radius.start
  #     end   = Math.abs @deltas.radius.end
  #     Math.max start, end
  #   else parseFloat @props.radius
  #   @props.size   = largestSize + 2*selfSize
  #   @props.center = @props.size/2
  # getOption:(i)->
  #   option = {}
  #   for key, value of @childOptions
  #     option[key] = @getPropByMod propName: key, i: i
  #   option
  # getPropByMod:(o)->
  #   prop = @[o.from or 'childOptions'][o.propName]
  #   if @h.isArray(prop) then prop[o.i % prop.length] else prop
  # generateRandomAngle:(i)->
  #   randomness = parseFloat(@props.randomAngle)
  #   randdomness = if randomness > 1 then 1 else if randomness < 0 then 0
  #   if randomness then start = (1-randomness)*180; end = (1+randomness)*180
  #   else start = (1-.5)*180; end = (1+.5)*180
  #   @transits[i].angleRand = @h.rand(start, end)# + @h.rand(0,10)*85
  # generateRandomRadius:(i)->
  #   randomness = parseFloat(@props.randomRadius)
  #   randdomness = if randomness > 1 then 1 else if randomness < 0 then 0
  #   start = if randomness then (1-randomness)*100 else (1-.5)*100
  #   @transits[i].radiusRand = @h.rand(start, 100)/100
  # generateSwirl:(i)->
  #   sign = if @h.rand(0, 1) then -1 else 1
  #   @transits[i].signRand = sign
  #   @transits[i].swirlSize = @generateSwirlProp i: i, name: 'swirlSize'
  #   @transits[i].swirlFrequency = @generateSwirlProp i:i,name:'swirlFrequency'
  # generateSwirlProp:(o)->
  #   if !isFinite @props[o.name]
  #     prop = @getPropByMod propName: o.name, i: o.i, from: 'o'
  #     prop = @h.parseIfRand(prop or @props[o.name])
  #   else @props[o.name]
  # getSwirl:(proc, i)->
  #   transit = @transits[i]
  #   transit.signRand*transit.swirlSize*Math.sin(transit.swirlFrequency*proc)

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "Swirl", [], -> Swirl
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = Swirl
### istanbul ignore next ###
window?.mojs ?= {}
window?.mojs.Swirl = Swirl

