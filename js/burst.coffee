# ignore coffescript sudo code
### istanbul ignore next ###

bitsMap   = require './bitsMap'
Transit   = require './transit'

class Burst extends Transit
  deltasMap:
    burstX:             1
    burstY:             1
    burstShiftX:        1
    burstShiftY:        1
    burstAngle:         1
    burstDegree:        1
    burstRadius:        1
  defaults:
    # burst props
    burstX:             0
    burstY:             0
    burstShiftX:        0
    burstShiftY:        0
    burstAngle:         0
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
    type:               'circle'
    # position props/el props
    x:                  0
    y:                  0
    shiftX:             0
    shiftY:             0
    opacity:            1
    # size props
    radius:             20
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
      option.ctx = @ctx; option.isDrawLess = true; option.isRunLess = true
      @transits.push new Transit option
  draw:->
    step = @props.burstDegree/@props.points
    i = @transits.length
    while(i--)
      point = @h.getRadialPoint
        radius: @props.burstRadius
        angle:  i*step
        center: x: @props.center, y: @props.center
      @transits[i].setProp
        x: point.x
        y: point.y

  setElStyles:->
    # cover
    size        = "#{@props.size/@h.remBase}rem"
    marginSize  = "#{-@props.size/(2*@h.remBase)}rem"
    @el.style.position    = 'absolute'
    @el.style.top         = @props.burstY
    @el.style.left        = @props.burstX
    @el.style.opacity     = @props.opacity
    @el.style.width       = size
    @el.style.height      = size
    @el.style['marginLeft'] = marginSize
    @el.style['marginTop']  = marginSize
    @h.setPrefixedStyle @el, 'backface-visibility', 'hidden'

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
    selfSize = if @deltas.burstRadius
      start = Math.abs @deltas.burstRadius.start
      end   = Math.abs @deltas.burstRadius.end
      Math.max start, end
    else parseFloat @props.burstRadius
    @props.size   = largestSize/2 + 2*selfSize
    @props.center = @props.size/2
  getOption:(i)->
    option = {}
    for key, value of @o
      option[key] = @getPropByMod key, i
    option
  getPropByMod:(name, i)->
    prop = @o[name]
    if @h.isArray(prop) then @o[name][i % prop.length] else prop

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "Burst", [], -> Burst
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = Burst
### istanbul ignore next ###
window?.mojs ?= {}
window?.mojs.Burst = Burst

