# ignore coffescript sudo code
### istanbul ignore next ###

bitsMap   = require './bitsMap'
Transit   = require './transit'
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

  run:->
    if @props.randomAngle or @props.randomRadius or @props.isSwirl
      i = @transits.length
      while(i--)
        @props.randomAngle  and @generateRandomAngle(i)
        @props.randomRadius and @generateRandomRadius(i)
        @props.isSwirl      and @generateSwirl(i)
    super

  createBit:->
    @transits = []
    for i in [0...@props.points]
      bitClass = bitsMap.getBit(@o.type or @type); option = @getOption(i)
      option.ctx = @ctx; option.isDrawLess = true; option.isRunLess = true
      @transits.push new Transit option
      @props.randomAngle  and @generateRandomAngle(i)
      @props.randomRadius and @generateRandomRadius(i)
      @props.isSwirl      and @generateSwirl(i)
  draw:(progress)->
    points = @props.points
    @degreeCnt = if @props.degree % 360 is 0 then points else points-1
    step = @props.degree/@degreeCnt
    i = @transits.length
    while(i--)
      transit = @transits[i]
      radius  = @props.radius*(transit.radiusRand or 1)
      angle   = i*step+(transit.angleRand or 1)
      if @props.isSwirl then angle += @getSwirl progress, i
      point   = @h.getRadialPoint
        radius: radius
        angle:  angle
        center: x: @props.center, y: @props.center
      transit.setProp
        x: point.x
        y: point.y
        angle: angle-90
    @drawEl()
  
  setProgress:(progress)->
    super
    i = @transits.length
    while(i--)
      @transits[i].setProgress progress
      @transits[i].draw()

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
    @transits[i].angleRand = @h.rand(start, end)# + @h.rand(0,10)*85
  generateRandomRadius:(i)->
    randomness = parseFloat(@props.randomRadius)
    randdomness = if randomness > 1 then 1 else if randomness < 0 then 0
    start = if randomness then (1-randomness)*100 else (1-.5)*100
    @transits[i].radiusRand = @h.rand(start, 100)/100
  generateSwirl:(i)->
    sign = if @h.rand(0, 1) then -1 else 1
    @transits[i].signRand = sign
    @transits[i].swirlSize = @generateSwirlProp i: i, name: 'swirlSize'
    @transits[i].swirlFrequency = @generateSwirlProp i:i,name:'swirlFrequency'
  generateSwirlProp:(o)->
    if !isFinite @props[o.name]
      prop = @getPropByMod propName: o.name, i: o.i, from: 'o'
      prop = @h.parseIfRand(prop or @props[o.name])
    else @props[o.name]
  getSwirl:(proc, i)->
    transit = @transits[i]
    transit.signRand*transit.swirlSize*Math.sin(transit.swirlFrequency*proc)

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "Burst", [], -> Burst
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = Burst
### istanbul ignore next ###
window?.mojs ?= {}
window?.mojs.Burst = Burst

