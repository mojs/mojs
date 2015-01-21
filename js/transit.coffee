# ignore coffescript sudo code
### istanbul ignore next ###

h         = require './h'
TWEEN     = require './vendor/tween'
bitsMap   = require './bitsMap'

class Transit extends bitsMap.map.bit
  TWEEN: TWEEN
  progress: 0
  defaults:
    # presentation props
    strokeWidth:        2
    strokeOpacity:      1
    strokeDasharray:    ''
    strokeDashoffset:   ''
    stroke:             '#ff00ff'
    fill:               'transparent'
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
  vars:->
    @h ?= h; @chainArr ?= []; @lastSet ?= {}
    @extendDefaults() #; @calcTransform()
  render:->
    if !@isRendered
      if !@o.ctx?
        @ctx = document.createElementNS @ns, 'svg'
        @ctx.style.position  = 'absolute'
        @ctx.style.width     = '100%'
        @ctx.style.height    = '100%'
        @createBit(); @calcSize()
        @el = document.createElement 'div'
        @setElStyles()
        @el.appendChild @ctx
        (@o.parent or document.body).appendChild @el
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
    @el.style.display = 'block'; @isShown = true
  hide:->
    return if (@isShown is false) or !@el?
    @el.style.display = 'none'; @isShown = false

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
    return if !@el
    @isPropChanged('x') and (@el.style.left = @props.x)
    @isPropChanged('y') and (@el.style.top  = @props.y)
    @isPropChanged('opacity') and (@el.style.opacity = @props.opacity)
    if @isPropChanged('shiftX') or @isPropChanged('shiftY')
      translate = "translate(#{@props.shiftX}, #{@props.shiftY})"
      @h.setPrefixedStyle @el, 'transform', translate
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
    !isShow and @show()
    @onUpdate?(progress)

    @progress = if progress < 0 or !progress then 0
    else if progress > 1 then 1 else progress

    keys = Object.keys(@deltas); len = keys.length
    while(len--)
      key = keys[len]; value = @deltas[key]
      switch value.type
        when 'array' # strokeDasharray/strokeDashoffset
          str = ''
          for num, i in value.delta
            str += "#{value.start[i] + num*@progress} "
          @props[key] = str
        when 'number'
          @props[key] = value.start + value.delta*progress
        when 'unit'
          units = value.end.unit
          @props[key] = "#{value.start.value+value.delta*progress}#{units}"
        when 'color'
          r = parseInt (value.start.r + value.delta.r*progress), 10
          g = parseInt (value.start.g + value.delta.g*progress), 10
          b = parseInt (value.start.b + value.delta.b*progress), 10
          a = parseInt (value.start.a + value.delta.a*progress), 10
          @props[key] = "rgba(#{r},#{g},#{b},#{a})"
    
    @calcOrigin()
    @draw progress
    if progress is 1 then @runChain(); @props.onComplete?.call @
    @

  calcOrigin:->
    @origin = if @o.ctx
      x: parseFloat(@props.x), y: parseFloat(@props.y)
    else x: @props.center, y: @props.center

  extendDefaults:->
    @props  ?= {}
    @deltas = {}

    for key, defaultsValue of @defaults
      optionsValue = if @o[key]? then @o[key] else defaultsValue
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
      delta = @h.parseDelta key, optionsValue
      if delta.type? then @deltas[key] = delta
      # and set the start value to props
      @props[key] = delta.start

    @onUpdate = @props.onUpdate

  # CHAINS
  chain:(options)->
    options.type = @o.type
    @chainArr.push { type: 'chain', options: options }; return @
  then:(options)->  @chainArr.push { type: 'then',  options: options }; @
  runChain:->
    if !@chainArr.length
      !@o.isShowEnd and @hide(); return @props.onCompleteChain?.call @

    chain = @chainArr.shift()
    if chain.type is 'chain'
      @o = chain.options
    if chain.type is 'then'
      @mergeThenOptions chain

    @init()
  mergeThenOptions:(chain)->
    opts = @copyEndOptions()
    return if !opts
    options = chain.options
    for key, value of options
      if typeof value is 'object'
        keys = Object.keys value
        # get end value
        end = value[keys[0]]
        # write the old start value
        start = opts[key]
        @h.warn "new end value expected instead of object,
         using end(#{end}) value instead", value
        opts[key] = {}
        opts[key][start] = end
      else
        if !@h.tweenOptionMap[key]
          currValue = opts[key]
          nextValue = value
          opts[key] = {}
          opts[key][currValue] = nextValue
        else opts[key] = value
    @o = opts
  copyEndOptions:->
    opts = {}
    for key, value of @o
      opts[key] = if typeof value is 'object'
        value[Object.keys(value)[0]]
      else value
    opts

  # TWEEN
  createTween:->
    it = @
    # onComplete = if @props.onComplete then @h.bind(@props.onComplete, @)
    # else null

    easings = h.splitEasing(@props.easing)
    ease = if typeof easings is 'function' then easings
    else TWEEN.Easing[easings[0]][easings[1]]

    @tween = new @TWEEN.Tween({ p: 0 }).to({ p: 1 }, @props.duration)
      .delay(@props.delay)
      .easing(ease)
      .onUpdate -> it.setProgress @p
      .repeat @props.repeat-1
      .yoyo @props.yoyo
      # .onComplete => @tween.isComplete = true
    !@o.isRunLess and @startTween()
  run:(o)->
    for key, value of o
      @o[key] = value
    @vars(); @calcSize(); @setElStyles()
    !@o.isDrawLess and @setProgress 0
    @startTween()
  startTween:->
    @props.onStart?.call @
    @h.startAnimationLoop()
    @tween.start()

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "Transit", [], -> Transit
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = Transit
### istanbul ignore next ###
window?.mojs ?= {}
window?.mojs.Transit = Transit

