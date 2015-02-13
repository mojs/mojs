# ignore coffescript sudo code
### istanbul ignore next ###

bitsMap   = require './bitsMap'
Transit   = require './transit'
Swirl     = require './swirl'
h         = require './h'
Tween     = require './tween'

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
    # size props
    radius:             { 25: 75 }
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

  childDefaults:
    #-- intersection starts
    radius:             { 7 : 0 }
    angle:              0
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
    angle:      1
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
      option = @getOption(i); option.ctx = @ctx
      option.isDrawLess = option.isRunLess = option.isTweenLess = true
      @props.randomAngle  and (option.angleShift  = @generateRandomAngle())
      @props.randomRadius and (option.radiusScale = @generateRandomRadius())
      @transits.push new Swirl option
  addBitOptions:->
    points = @props.count
    @degreeCnt = if @props.degree % 360 is 0 then points else points-1
    step = @props.degree/@degreeCnt
    for transit, i in @transits
      pointStart = @h.getRadialPoint
        radius: if @deltas.radius? then @deltas.radius.start else @props.radius
        angle:  i*step + @props.angle
        center: x: @props.center, y: @props.center
      pointEnd = @h.getRadialPoint
        radius: if @deltas.radius? then @deltas.radius.end else @props.radius
        angle:  i*step + @props.angle
        center: x: @props.center, y: @props.center
      x = {}; y = {}
      x[pointStart.x] = pointEnd.x; y[pointStart.y] = pointEnd.y
      transit.o.x = x; transit.o.y = y
      transit.extendDefaults()

  draw:(progress)-> @drawEl()

  isNeedsTransform:->
    @isPropChanged('shiftX')or@isPropChanged('shiftY')or@isPropChanged('angle')
  fillTransform:->
    "rotate(#{@props.angle}deg) translate(#{@props.shiftX}, #{@props.shiftY})"
  createTween:->
    super
    i = @transits.length
    while(i--)
      @tween.add @transits[i].timeline
    !@o.isRunLess and @startTween()
    
  calcSize:->
    largestSize = -1
    for transit, i in @transits
      transit.calcSize()
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
    for key, value of @childDefaults
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
    # 1. merge @o and o
    # 2. get i option from merged object
    # 3. pass the object to transit then
    # i = @transits.length
    # while(i--)
    #   @transits[i].then(o)

    

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "Burst", [], -> Burst
### istanbul ignore next ###
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = Burst
### istanbul ignore next ###
window?.mojs ?= {}
### istanbul ignore next ###
window?.mojs.Burst = Burst

