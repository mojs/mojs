# ignore coffescript sudo code
### istanbul ignore next ###

bitsMap   = require './bitsMap'
Transit   = require './transit'
Swirl     = require './swirl'
h         = require './h'

class Burst extends Transit
  defaults:
    # presentation props
    points:             5
    type:               'circle'
    degree:             360
    # position props/el props
    x:                  0
    y:                  0
    shiftX:             0
    shiftY:             0
    opacity:            1
    # size props
    radius:             { 25: 75 }
    angle:              0
    size:               null
    sizeGap:            0
    # callbacks
    onInit:             null
    onStart:            null
    onComplete:         null
    onCompleteChain:    null
    onUpdate:           null
    # tween props
    duration:           500
    delay:              0
    repeat:             1
    yoyo:               false
    easing:             'Linear.None'
    randomAngle:        0
    randomRadius:       0
    isSwirl:            false
    swirlFrequency:     3
    swirlSize:          10

  childDefaults:
    # presentation props
    strokeWidth:        { 2 : 0 }
    strokeOpacity:      1
    strokeDasharray:    ''
    strokeDashoffset:   ''
    stroke:             '#ff00ff'
    fill:               'transparent'
    fillOpacity:        'transparent'
    strokeLinecap:      ''
    points:             5
    type:               'circle'
    # position props/el props
    x:                  0
    y:                  0
    shiftX:             0
    shiftY:             0
    opacity:            1
    # size props
    radius:             { 7 : 0 }
    angle:              0
    size:               null
    sizeGap:            0
    # callbacks
    onInit:             null
    onStart:            null
    onComplete:         null
    onCompleteChain:    null
    onUpdate:           null
    # tween props
    duration:           500
    delay:              0
    repeat:             1
    yoyo:               false
    easing:             'Linear.None'

  init:->
    @childOptions = @o.childOptions or {}
    h.extend(@childOptions, @childDefaults); delete @o.childOptions
    super
  run:(o)->
    super
    if @props.randomAngle or @props.randomRadius or @props.isSwirl
      i = @transits.length
      while(i--)
        @props.randomAngle  and @generateRandomAngle(i)
        @props.randomRadius and @generateRandomRadius(i)
        @props.isSwirl      and @transits[i].generateSwirl()
  createBit:->
    @transits = []
    for i in [0...@props.points]
      option = @getOption(i); option.ctx = @ctx
      option.isDrawLess = true; option.isRunLess = true
      option.isSwirlLess    = !@props.isSwirl
      option.swirlSize      = @o.swirlSize
      option.swirlFrequency = @o.swirlFrequency
      @props.randomAngle  and (option.angleShift = @generateRandomAngle())
      @props.randomRadius and (option.radiusScale = @generateRandomRadius())
      @transits.push new Swirl option
  addBitOptions:->
    radiusStart = @deltas.radius?.start or @props.radius
    radiusEnd   = @deltas.radius?.end or @props.radius
    points = @props.points
    @degreeCnt = if @props.degree % 360 is 0 then points else points-1
    step = @props.degree/@degreeCnt
    for transit, i in @transits
      pointStart = @h.getRadialPoint
        radius: radiusStart
        angle:  i*step
        center: x: @props.center, y: @props.center
      pointEnd = @h.getRadialPoint
        radius: radiusEnd
        angle:  i*step
        center: x: @props.center, y: @props.center
      x = {}; y = {}
      x[pointStart.x] = pointEnd.x
      y[pointStart.y] = pointEnd.y
      @transits[i].o.x = x; @transits[i].o.y = y
      transit.extendDefaults()

  draw:(progress)-> @drawEl()
    
  setProgress:(progress)->
    # t0 = performance.now()
    super; i = @transits.length
    while(i--)
      @transits[i]
        .setProgress(progress)
        .draw()
    # t1 = performance.now()
    # console.log t1 - t0
  calcSize:->
    largestSize = -1
    for transit, i in @transits
      if largestSize < transit.props.size
        largestSize = transit.props.size
    selfSize = if @deltas.radius
      start = Math.abs @deltas.radius.start
      end   = Math.abs @deltas.radius.end
      Math.max start, end
    else parseFloat @props.radius
    @props.size   = largestSize + 2*selfSize
    @props.center = @props.size/2
    @addBitOptions()
  getOption:(i)->
    option = {}
    for key, value of @childOptions
      option[key] = @getPropByMod propName: key, i: i
    option
  getPropByMod:(o)->
    prop = @[o.from or 'childOptions'][o.propName]
    if @h.isArray(prop) then prop[o.i % prop.length] else prop
  generateRandomAngle:(i)->
    randomness = parseFloat(@props.randomAngle)
    randdomness = if randomness > 1 then 1 else if randomness < 0 then 0
    if randomness then start = (1-randomness)*180; end = (1+randomness)*180
    else start = (1-.5)*180; end = (1+.5)*180
    @h.rand(start, end)
  generateRandomRadius:(i)->
    randomness = parseFloat(@props.randomRadius)
    randdomness = if randomness > 1 then 1 else if randomness < 0 then 0
    start = if randomness then (1-randomness)*100 else (1-.5)*100
    @h.rand(start, 100)/100

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "Burst", [], -> Burst
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = Burst
### istanbul ignore next ###
window?.mojs ?= {}
window?.mojs.Burst = Burst

