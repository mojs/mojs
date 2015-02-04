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
    onStart:            null
    onComplete:         null
    onCompleteChain:    null
    onUpdate:           null
    # tween props = share with children
    duration:           500
    delay:              0
    repeat:             1
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

  childDefaults:
    radius:             { 7 : 0 }
    points:             3
    angle:              0
    # callbacks
    onStart:            null
    onComplete:         null
    onUpdate:           null

  # run:(o)->
  #   super
  #   if @props.randomAngle or @props.randomRadius or @props.isSwirl
  #     i = @transits.length
  #     while(i--)
  #       tr = @transits[i]
  #       @props.randomAngle  and tr.setProp angleShift: @generateRandomAngle()
  #       @props.randomRadius and tr.setProp radiusScale: @generateRandomRadius()
  #       @props.isSwirl      and tr.generateSwirl()
  #       option = @getOption(i); option.ctx = @ctx
  #       option.isDrawLess = option.isRunLess = option.isTweenLess = true

  createBit:->
    @transits = []
    for i in [0...@props.points]
      option = @getOption(i); option.ctx = @ctx
      option.isDrawLess = option.isRunLess = option.isTweenLess = true
      @props.randomAngle  and (option.angleShift  = @generateRandomAngle())
      @props.randomRadius and (option.radiusScale = @generateRandomRadius())
      @transits.push new Swirl option
  addBitOptions:->
    # points = @props.points
    # @degreeCnt = if @props.degree % 360 is 0 then points else points-1
    # step = @props.degree/@degreeCnt
    # # console.clear()
    # for transit, i in @transits
    #   pointStart = @h.getRadialPoint
    #     radius: if @deltas.radius? then @deltas.radius.start else @props.radius
    #     angle:  i*step + @props.angle
    #     center: x: @props.center, y: @props.center
    #   pointEnd = @h.getRadialPoint
    #     radius: if @deltas.radius? then @deltas.radius.end else @props.radius
    #     angle:  i*step + @props.angle
    #     center: x: @props.center, y: @props.center
    #   x = {}; y = {}
    #   x[pointStart.x] = pointEnd.x; y[pointStart.y] = pointEnd.y
    #   transit.o.x = x; transit.o.y = y
    #   transit.extendDefaults()

  draw:(progress)-> @drawEl()

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
    for key, value of @o.childOptions
      # firstly try to find the prop in @o.childOptions
      option[key]  = @getPropByMod key: key, i: i
      # if fail - continue to this objects
      option[key] ?= @getPropByMod key: key, i: i, from: @childDefaults
      option[key] ?= @getPropByMod key: key, i: i, from: @o
      option[key] ?= @getPropByMod key: key, i: i, from: @defaults
    option
  getPropByMod:(o)->
    prop = (o.from or @o.childOptions)?[o.key]
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
### istanbul ignore next ###
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = Burst
### istanbul ignore next ###
window?.mojs ?= {}
### istanbul ignore next ###
window?.mojs.Burst = Burst

