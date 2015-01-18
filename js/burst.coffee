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
    isRandom:           false


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
    if @props.isRandom
      i = @transits.length
      while(i--)
        @generateRandom(i)
    super

  createBit:->
    @transits = []
    for i in [0...@props.points]
      bitClass = bitsMap.getBit(@o.type or @type); option = @getOption(i)
      option.ctx = @ctx; option.isDrawLess = true; option.isRunLess = true
      @transits.push new Transit option
      @props.isRandom and @generateRandom(i)
  draw:->
    points = @props.points
    @degreeCnt = if @props.degree % 360 is 0 then points else points-1
    step = @props.degree/@degreeCnt
    i = @transits.length
    while(i--)
      transit = @transits[i]
      radius = @props.radius*(transit.radiusRand or 1)
      angle = i*step*(transit.stepRand or 1)
      point = @h.getRadialPoint
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
    # console.log largestSize, transit.props
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
      option[key] = @getPropByMod key, i
    option
  getPropByMod:(name, i)->
    prop = @childOptions[name]
    if @h.isArray(prop) then prop[i % prop.length] else prop

  generateRandom:(i)->
    @transits[i].radiusRand = @h.rand(50, 100)/100
    @transits[i].stepRand   = @h.rand(75, 125)/100 + @h.rand(0,5)*90

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "Burst", [], -> Burst
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = Burst
### istanbul ignore next ###
window?.mojs ?= {}
window?.mojs.Burst = Burst

