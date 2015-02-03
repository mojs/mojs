# ignore coffescript sudo code
### istanbul ignore next ###

bitsMap   = require './bitsMap'
Transit   = require './transit'
Swirl     = require './swirl'
h         = require './h'
Tween     = require './tween'

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
    # tween props = defaults for children
    duration:           500
    delay:              0
    repeat:             1
    yoyo:               false
    easing:             'Linear.None'
    # burst specific options
    randomAngle:        0
    randomRadius:       0
    isSwirl:            false
    swirlFrequency:     3
    swirlSize:          10

  childDefaults:
    # presentation props
    strokeWidth:        { 2 : 0 }
    strokeOpacity:      null
    strokeDasharray:    null
    strokeDashoffset:   null
    stroke:             null
    fill:               'transparent'
    fillOpacity:        'transparent'
    strokeLinecap:      ''
    points:             5
    type:               null
    # position props/el props
    x:                  0
    y:                  0
    shiftX:             0
    shiftY:             0
    opacity:            1
    # size props
    radius:             { 7 : 0 }
    angle:              0
    sizeGap:            0
    # callbacks
    onInit:             null
    onStart:            null
    onComplete:         null
    onCompleteChain:    null
    onUpdate:           null
    # tween props
    duration:           null
    delay:              null
    repeat:             null
    yoyo:               null
    easing:             null
  priorityOptionMap:
    duration:         1
    delay:            1
    repeat:           1
    easing:           1
    yoyo:             1
    swirlSize:        1
    swirlFrequency:   1
    isSwirl:          1
    fill:             1
    fillOpacity:      1
    stroke:           1
    strokeWidth:      1
    strokeOpacity:    1
    type:             1
    strokeDasharray:  1
    strokeDashoffset: 1
    strokeLinecap:    1
  init:->
    @childOptions = @o.childOptions or {}
    h.extend(@childOptions, @childDefaults); delete @o.childOptions
    super
  run:(o)->
    super
    if @props.randomAngle or @props.randomRadius or @props.isSwirl
      i = @transits.length
      while(i--)
        tr = @transits[i]
        @props.randomAngle  and tr.setProp angleShift: @generateRandomAngle()
        @props.randomRadius and tr.setProp radiusScale: @generateRandomRadius()
        @props.isSwirl      and tr.generateSwirl()
        option = @getOption(i); option.ctx = @ctx
        option.isDrawLess = option.isRunLess = option.isTweenLess = true

  createBit:->
    @transits = []
    for i in [0...@props.points]
      option = @getOption(i); option.ctx = @ctx
      option.isDrawLess = option.isRunLess = option.isTweenLess = true
      # prioritize the child option
      # over parent's one but use the latest
      # as a default value
      for key, value of @priorityOptionMap
        if key isnt 'isSwirl'
          option[key] ?= @o[key]
        else option['isSwirlLess'] ?= !@props.isSwirl
      @props.randomAngle  and (option.angleShift  = @generateRandomAngle())
      @props.randomRadius and (option.radiusScale = @generateRandomRadius())
      @transits.push new Swirl option
  addBitOptions:->
    points = @props.points
    @degreeCnt = if @props.degree % 360 is 0 then points else points-1
    step = @props.degree/@degreeCnt
    # console.clear()
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
  # setProgress:(p)-> console.log p
  isNeedsTransform:->
    @isPropChanged('shiftX')or@isPropChanged('shiftY')or@isPropChanged('angle')
  fillTransform:->
    "rotate(#{@props.angle}deg) translate(#{@props.shiftX}, #{@props.shiftY})"
  createTween:->
    # if !@o.isTweenLess
    @tween = new Tween
      onUpdate:   (p)=> @setProgress(p); @props.onUpdate?.apply @, arguments
      onComplete: => @props.onComplete?.apply @
      onStart:    => @props.onStart?.apply @
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

