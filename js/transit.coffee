# ignore coffescript sudo code
### istanbul ignore next ###
h         = require './h'
# TWEEN     = require './vendor/tween'
bitsMap   = require './bitsMap'

Timeline = require './timeline'
Tween    = require './tween'

class Transit extends bitsMap.map.bit
  # TWEEN: TWEEN
  progress: 0
  defaults:
    # presentation props
    strokeWidth:        2
    strokeOpacity:      1
    strokeDasharray:    ''
    strokeDashoffset:   ''
    stroke:             'transparent'
    fill:               'deeppink'
    fillOpacity:        'transparent'
    strokeLinecap:      ''
    points:             3
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
    onStart:            null
    onComplete:         null
    # onCompleteChain:    null
    onUpdate:           null
    # tween props
    duration:           500
    delay:              0
    repeat:             0
    yoyo:               false
    easing:             'Linear.None'
  vars:->
    @h ?= h; @lastSet ?= {}
    @extendDefaults()
    o = {}; @h.extend(o, @o); @history = [o]
    @timelines = []

  render:->
    if !@isRendered# or isForce
      if !@o.ctx?
        if !@ctx?
          @ctx = document.createElementNS @ns, 'svg'
          @ctx.style.position  = 'absolute'
          @ctx.style.width     = '100%'
          @ctx.style.height    = '100%'
        @createBit(); @calcSize()
        if !@el?
          @el = document.createElement 'div'
          @el.appendChild @ctx
          (@o.parent or document.body).appendChild @el
        @setElStyles()
      else
        @ctx = @o.ctx; @createBit(); @calcSize()
      @isRendered = true

    @setProgress 0, true
    @createTween()
    @

  setElStyles:->
    # size        = "#{@props.size/@h.remBase}rem"
    size        = "#{@props.size}px"
    marginSize  = "#{-@props.size/2}px"
    @el.style.position    = 'absolute'
    @el.style.top         = @props.y
    @el.style.left        = @props.x
    @el.style.opacity     = @props.opacity
    @el.style.width       = size
    @el.style.height      = size
    @el.style['margin-left'] = marginSize
    @el.style['margin-top']  = marginSize
    @h.setPrefixedStyle @el, 'backface-visibility', 'hidden'
    if @o.isShowInit then @show() else @hide()

  show:->
    return if @isShown or !@el?
    @el.style.display = 'block'
    @isShown = true
  hide:->
    return if (@isShown is false) or !@el?
    @el.style.display = 'none'
    @isShown = false

  draw:->
    @bit.setProp
      x:                  @origin.x
      y:                  @origin.y
      stroke:             @props.stroke
      'stroke-width':     @props.strokeWidth
      'stroke-opacity':   @props.strokeOpacity
      'stroke-dasharray': @props.strokeDasharray
      'stroke-dashoffset':@props.strokeDashoffset
      'stroke-linecap':   @props.strokeLinecap
      fill:               @props.fill
      'fill-opacity':     @props.fillOpacity
      radius:             @props.radius
      points:             @props.points
      transform:          @calcTransform()

    @bit.draw()
    @drawEl()

  drawEl:->
    return if !@el?
    @isPropChanged('x') and (@el.style.left = @props.x)
    @isPropChanged('y') and (@el.style.top  = @props.y)
    @isPropChanged('opacity') and (@el.style.opacity = @props.opacity)
    if @isNeedsTransform()
      @h.setPrefixedStyle @el, 'transform', @fillTransform()
  fillTransform:-> "translate(#{@props.shiftX}, #{@props.shiftY})"
  isNeedsTransform:-> @isPropChanged('shiftX') or @isPropChanged('shiftY')

  isPropChanged:(name)->
    @lastSet[name] ?= {}
    @lastSet[name].isChanged = if @lastSet[name].value isnt @props[name]
      @lastSet[name].value = @props[name]; true
    else false
  calcTransform:->
    @props.transform = "rotate(#{@props.angle},#{@origin.x},#{@origin.y})"
  calcSize:->
    return if @o.size
    dRadius = @deltas['radius']; dStroke = @deltas['strokeWidth']
    radius = if dRadius?
      Math.max Math.abs(dRadius.start), Math.abs(dRadius.end)
    else @props.radius
    stroke = if dStroke?
      Math.max Math.abs(dStroke.start), Math.abs(dStroke.end)
    else @props.strokeWidth
    @props.size   = 2*radius + 2*stroke
    @props.size   *= @bit.ratio
    @props.size   += 2*@props.sizeGap
    @props.center = @props.size/2

  createBit:->
    bitClass = bitsMap.getBit(@o.type or @type)
    @bit = new bitClass ctx: @ctx, isDrawLess: true

  setProgress:(progress, isShow)->
    if !isShow then @show(); @onUpdate?(progress)

    @progress = if progress < 0 or !progress then 0
    else if progress > 1 then 1 else progress
    # calc the curent value from deltas
    @calcCurrentProps(progress); @calcOrigin()
    @draw(progress)
    # if progress is 1 then @props.onComplete?.call(@)#;  @runChain();
    @

  calcCurrentProps:(progress)->
    keys = Object.keys(@deltas); len = keys.length
    while(len--)
      key = keys[len]; value = @deltas[key]
      @props[key] = switch value.type
        when 'array' # strokeDasharray/strokeDashoffset
          str = ''
          for num, i in value.delta
            str += "#{value.start[i] + num*@progress} "
          str
        when 'number'
          value.start + value.delta*progress
        when 'unit'
          units = value.end.unit
          "#{value.start.value+value.delta*progress}#{units}"
        when 'color'
          r = parseInt (value.start.r + value.delta.r*progress), 10
          g = parseInt (value.start.g + value.delta.g*progress), 10
          b = parseInt (value.start.b + value.delta.b*progress), 10
          a = parseInt (value.start.a + value.delta.a*progress), 10
          "rgba(#{r},#{g},#{b},#{a})"

  calcOrigin:->
    @origin = if @o.ctx
      x: parseFloat(@props.x), y: parseFloat(@props.y)
    else x: @props.center, y: @props.center

  extendDefaults:(o)->
    @props ?= {}; fromObject = o or @defaults
    # override deltas only if options obj wasnt passed
    !o? and (@deltas = {})
    for key, defaultsValue of fromObject
      # skip props from skipProps object
      continue if @skipProps?[key]
      # if options object was passed = save the value to
      # options object and delete the old delta value
      if o
        @o[key] = defaultsValue; optionsValue = defaultsValue
        delete @deltas[key]
      # else get the value from options or fallback to defaults
      else optionsValue = if @o[key]? then @o[key] else defaultsValue
      # if non-object value - just save it to @props
      # if is not an object or is array
      isObject = (optionsValue? and (typeof optionsValue is 'object'))
      if !isObject or @h.isArray(optionsValue)
        if typeof optionsValue is 'string' and optionsValue.match /rand/
          optionsValue = @h.parseRand optionsValue
        @props[key] = optionsValue
        # position property parse with units
        if @h.posPropsMap[key]
          @props[key] = @h.parseUnit(@props[key]).string
        continue

      # if delta object was passed: like { 20: 75 }
      # calculate delta
      if (key is 'x' or key is 'y') and !@o.ctx
        @h.warn 'Consider to animate shiftX/shiftY properties instead of x/y,
         as it would be much more performant', optionsValue
      # skip props defined in skipPropsDelta map
      # needed for modules based on transit like swirl
      if @skipPropsDelta?[key] then continue
      delta = @h.parseDelta key, optionsValue, @defaults[key]
      # stoke-linecap filter
      if delta.type? then @deltas[key] = delta
      # and set the start value to props
      @props[key] = delta.start
    @onUpdate = @props.onUpdate

  mergeThenOptions:(start, end)->
    o = {}; @h.extend o, start
    keys = Object.keys(end); i = keys.length
    while(i--)
      key = keys[i]; endKey = end[key]
      # if this is a tween value or new value is an obect
      # then just save it
      if @h.tweenOptionMap[key] or typeof endKey is 'object'
        o[key] = if endKey? then endKey else start[key]
        continue
      startKey = start[key]
      startKey ?= @defaults[key]
      # if start value is object - use the end value
      if typeof startKey is 'object'
        startKeys = Object.keys(startKey); startKey = startKey[startKeys[0]]
      if endKey? then o[key] = {}; o[key][startKey] = endKey
      else o[key] = startKey
    o

  then:(o={})->
    merged = @mergeThenOptions @history[@history.length-1], o
    @history.push merged
    # copy the tween options from passed o or current props
    keys = Object.keys(@h.tweenOptionMap); i = keys.length; opts = {}
    opts[keys[i]] = merged[keys[i]] while(i--)
    it = @
    opts.onUpdate      = (p)=> @setProgress p#; @onUpdate?()
    opts.onStart       = => @props.onStart?.apply @
    opts.onComplete    = => @props.onComplete?.apply @
    opts.onFirstUpdate = ->
      console.log 'first'
      it.tuneOptions it.history[@index]
    @tween.append new Timeline(opts)
    @
  tuneOptions:(o)-> @extendDefaults(o); @calcSize(); @setElStyles()
  # TWEEN
  createTween:->
    it = @
    onComplete = if @props.onComplete then @h.bind(@props.onComplete, @)
    else null
    @timeline = new Timeline
      duration: @props.duration
      delay:    @props.delay
      repeat:   @props.repeat
      yoyo:     @props.yoyo
      easing:   @props.easing
      onUpdate:   (p)=> @setProgress p
      onComplete: => @props.onComplete?.apply @
      onStart:    => @props.onStart?.apply @
      onFirstUpdateBackward:=>
        console.log 'backward'
        @tuneOptions @history[0]
    @tween = new Tween; @tween.add @timeline
    !@o.isRunLess and @startTween()

  run:(o)->
    o and @transformHistory(o)
    @tuneNewOption(o)
    o = {}; @h.extend(o, @o)#; @history.push o
    @history[0] = o
    !@o.isDrawLess and @setProgress(0, true)
    @startTween()

  # add new options to history on run call
  transformHistory:(o)->
    keys = Object.keys(o); i = -1
    len = keys.length; historyLen = @history.length
    # loop over the passed options
    while(++i < len)
      key = keys[i]; j = 0
      # loop over the history skipping the firts item
      while(++j < historyLen)
        optionRecord = @history[j][key]
        if optionRecord?
          # if history record is object
          if typeof optionRecord is 'object'
            # get the end value and delete the record
            valueKeys = Object.keys(optionRecord)
            value = optionRecord[valueKeys[0]]
            delete @history[j][key][valueKeys[0]]
            # if delta in history and object in passed value
            # :: new {100: 50} was {200: 40}
            if typeof o[key] is 'object'
              valueKeys2 = Object.keys(o[key])
              value2 = o[key][valueKeys2[0]]
              @history[j][key][value2] = value
            # :: new 20 was {200: 40}
            else @history[j][key][o[key]] = value
            break
          else @history[j][key] = o[key]
        else @history[j][key] = o[key]

  tuneNewOption:(o, isForeign)->
    # if type is defined and it's different
    # than the current type - warn and delete
    if o? and o.type? and o.type isnt (@o.type or @type)
      @h.warn 'Sorry, type can not be changed on run'
      delete o.type
    # extend defaults only if options obj was passed
    if o? and Object.keys(o).length
      @extendDefaults(o); @resetTimeline()
      !isForeign and @tween.recalcDuration()
      @calcSize()
      !isForeign and @setElStyles()
  # defer tween start to wait for "then" functions
  startTween:-> setTimeout (=> @tween?.start()), 1
  resetTimeline:->
    timelineOptions = {}
    for key, i in Object.keys @h.tweenOptionMap
      timelineOptions[key] = @props[key]
    timelineOptions.onStart    = @props.onStart
    timelineOptions.onComplete = @props.onComplete
    @timeline.setProp timelineOptions

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "Transit", [], -> Transit
### istanbul ignore next ###
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = Transit
### istanbul ignore next ###
window?.mojs ?= {}
### istanbul ignore next ###
window?.mojs.Transit = Transit

