# ignore coffescript sudo code
### istanbul ignore next ###

bitsMap   = require './shapes/bitsMap'
Tween     = require './tween/tween'
Transit   = require './transit'
Swirl     = require './swirl'
h         = require './h'

class Burst extends Transit
  skipProps: childOptions: 1
  defaults:
    # presentation props
    count:              5
    degree:             360
    opacity:            1
    randomAngle:        0
    randomRadius:       0
    # position props/el props
    x:                  100
    y:                  100
    shiftX:             0
    shiftY:             0
    easing:             'Linear.None'
    # size props
    radius:             { 25: 75 }
    radiusX:            undefined
    radiusY:            undefined
    angle:              0
    size:               null
    sizeGap:            0
    # callbacks
    duration:           600
    delay:              0
    onStart:            null
    onComplete:         null
    onCompleteChain:    null
    onUpdate:           null
    isResetAngles:      false

  childDefaults:
    #-- intersection starts
    radius:             { 7 : 0 }
    radiusX:            undefined
    radiusY:            undefined
    angle:              0
    opacity:            1
    # callbacks
    onStart:            null
    onComplete:         null
    onUpdate:           null
    #-- intersection ends
    points:             3
    duration:           500
    delay:              0
    repeat:             0
    yoyo:               false
    easing:             'Linear.None'
    type:               'circle'
    fill:               'deeppink'
    fillOpacity:        1
    isSwirl:            false
    swirlSize:          10
    swirlFrequency:     3
    stroke:             'transparent'
    strokeWidth:        0
    strokeOpacity:      1
    strokeDasharray:    ''
    strokeDashoffset:   ''
    strokeLinecap:      null
  optionsIntersection:
    radius:     1
    radiusX:    1
    radiusY:    1
    angle:      1
    opacity:    1
    onStart:    1
    onComplete: 1
    onUpdate:   1
  run:(o)->
    if o? and Object.keys(o).length
      if o.count or o.childOptions?.count
        @h.warn 'Sorry, count can not be changed on run'
      @extendDefaults(o)
      # copy child options to options
      keys = Object.keys(o.childOptions or {})
      @o.childOptions ?= {}
      for key, i in keys
        @o.childOptions[key] = o.childOptions[key]
      # tune transits
      len = @transits.length
      while(len--)
        transit = @transits[len]
        transit.tuneNewOption @getOption(len), true
      @tween.recalcDuration()
    if @props.randomAngle or @props.randomRadius
      len = @transits.length
      while(len--)
        tr = @transits[len]
        @props.randomAngle  and tr.setProp angleShift:  @generateRandomAngle()
        @props.randomRadius and tr.setProp radiusScale: @generateRandomRadius()
    @startTween()
    
  createBit:->
    @transits = []
    for i in [0...@props.count]
      option = @getOption(i); option.ctx = @ctx; option.index = i
      option.isDrawLess = option.isRunLess = option.isTweenLess = true
      @props.randomAngle  and (option.angleShift  = @generateRandomAngle())
      @props.randomRadius and (option.radiusScale = @generateRandomRadius())
      @transits.push new Swirl option

  addBitOptions:->
    points = @props.count
    @degreeCnt = if @props.degree % 360 is 0 then points else points-1 or 1
    
    step = @props.degree/@degreeCnt
    for transit, i in @transits
      aShift = transit.props.angleShift
      pointStart = @getSidePoint 'start', i*step + aShift
      pointEnd   = @getSidePoint 'end',   i*step + aShift

      transit.o.x = @getDeltaFromPoints 'x', pointStart, pointEnd
      transit.o.y = @getDeltaFromPoints 'y', pointStart, pointEnd

      if !@props.isResetAngles
        angleAddition = i*step + 90
        transit.o.angle = if typeof transit.o.angle isnt 'object'
          transit.o.angle + angleAddition + aShift
        else
          keys = Object.keys(transit.o.angle); start = keys[0]
          end   = transit.o.angle[start]
          newStart = parseFloat(start) + angleAddition + aShift
          newEnd   = parseFloat(end)   + angleAddition + aShift
          delta = {}; delta[newStart] = newEnd
          delta
      transit.extendDefaults()

  getSidePoint:(side, angle)->
    sideRadius = @getSideRadius side
    pointStart = @h.getRadialPoint
      radius:  sideRadius.radius
      radiusX: sideRadius.radiusX
      radiusY: sideRadius.radiusY
      angle:   angle
      center:  x: @props.center, y: @props.center
  getSideRadius:(side)->
    radius:  @getRadiusByKey 'radius',  side
    radiusX: @getRadiusByKey 'radiusX', side
    radiusY: @getRadiusByKey 'radiusY', side
  getRadiusByKey:(key, side)->
    if @deltas[key]? then @deltas[key][side]
    else if @props[key]? then @props[key]
  getDeltaFromPoints:(key, pointStart, pointEnd)->
    delta = {}
    if pointStart[key] is pointEnd[key] then delta = pointStart[key]
    else delta[pointStart[key]] = pointEnd[key]; delta
  draw:(progress)-> @drawEl()

  isNeedsTransform:->
    @isPropChanged('shiftX')or@isPropChanged('shiftY')or@isPropChanged('angle')
  fillTransform:->
    "rotate(#{@props.angle}deg) translate(#{@props.shiftX}, #{@props.shiftY})"
  createTween:->
    super; i = @transits.length; @tween.add(@transits[i].timeline) while(i--)
    
  calcSize:->
    largestSize = -1
    for transit, i in @transits
      transit.calcSize()
      if largestSize < transit.props.size
        largestSize = transit.props.size
    radius = @calcMaxRadius()
    @props.size   = largestSize + 2*radius
    @props.size   += 2*@props.sizeGap
    @props.center = @props.size/2
    @addBitOptions()

  getOption:(i)->
    option = {}; keys = Object.keys(@childDefaults); len = keys.length
    while(len--)
      key = keys[len]
      # firstly try to find the prop in @o.childOptions
      option[key]  = @getPropByMod key: key, i: i, from: @o.childOptions
      # if fail
      # if the same option could be defined for parent and child
      # get the option from childDefaults and continue
      if @optionsIntersection[key]
        option[key] ?= @getPropByMod key: key, i: i, from: @childDefaults
        continue
      # else check the option on parent
      option[key] ?= @getPropByMod key: key, i: i, from: @o
      option[key] ?= @getPropByMod key: key, i: i, from: @childDefaults
    option
  getPropByMod:(o)->
    prop = (o.from or @o.childOptions)?[o.key]
    if @h.isArray(prop) then prop[o.i % prop.length] else prop
  generateRandomAngle:(i)->
    randomness = parseFloat(@props.randomAngle)
    randdomness = if randomness > 1 then 1 else if randomness < 0 then 0
    @h.rand(0, if randomness then randomness*360 else 180)
  generateRandomRadius:(i)->
    randomness = parseFloat(@props.randomRadius)
    randdomness = if randomness > 1 then 1 else if randomness < 0 then 0
    start = if randomness then (1-randomness)*100 else (1-.5)*100
    @h.rand(start, 100)/100

  then:(o)->
    @h.error "Burst's \"then\" method is under consideration,
      you can vote for it in github repo issues"
    # 1. merge @o and o
    # 2. get i option from merged object
    # 3. pass the object to transit then
    # 4. transform self chain on run
    # i = @transits.length
    # while(i--)
    #   @transits[i].then(o)
    @

module.exports = Burst
