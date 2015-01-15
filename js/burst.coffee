# ignore coffescript sudo code
### istanbul ignore next ###

bitsMap   = require './bitsMap'
Transit   = require './transit'

class Burst extends Transit
  defaults:
    # burst props
    burstPoints:        5
    burstRadius:        { 50: 75 }
    burstDegree:        360
    # presentation props
    strokeWidth:        2
    strokeOpacity:      1
    strokeDasharray:    ''
    strokeDashoffset:   ''
    stroke:             '#ff00ff'
    fill:               'transparent'
    fillOpacity:        'transparent'
    strokeLinecap:      ''
    points:             5
    # position props/el props
    x:                  0
    y:                  0
    shiftX:             0
    shiftY:             0
    opacity:            1
    # size props
    radius:             50
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

  createBit:->
    @transits = []
    for i in [0...@props.points]
      bitClass = bitsMap.getBit(@o.type or @type); option = @getOption(i)
      option.ctx = @ctx; option.isDrawLess = true
      @transits.push new Transit option

  draw:->

  calcSize:->
    largestSize = -1
    for transit, i in @transits
      if largestSize < transit.props.size
        largestSize = transit.props.size

    console.log @deltas
    # if typeof @props.burstRadius is 'object'
    #   start =

    @props.size   = largestSize
    @props.center = largestSize/2

  getOption:(i)->
    option = {}
    for key, value of @o
      option[key] = @getPropByMod key, i
    option
  getPropByMod:(name, i)->
    prop = @o[name]
    if @h.isArray(prop) then @o[name][i % prop.length] else prop

burst = new Burst

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "Burst", [], -> Burst
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = Burst
### istanbul ignore next ###
window?.mojs ?= {}
window?.mojs.Burst = Burst

