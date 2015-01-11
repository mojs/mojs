# ignore coffescript sudo code
### istanbul ignore next ###

Bit       = require './bit'
Line      = require './line'
Circle    = require './circle'
Triangle  = require './triangle'
Rect      = require './rect'
h         = require './h'
TWEEN     = require './vendor/tween'

elsMap =
  circle:     Circle
  triangle:   Triangle
  line:       Line
  rect:       Rect

class Byte extends Bit
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
    # position props/el props
    x:                  0
    y:                  0
    shiftX:             0
    shiftY:             0
    opacity:            1
    # size props
    radius:             50
    deg:                0
    size:               null
    sizeGap:            0
    # callbacks
    onStart:            null
    onComplete:         null
    onUpdate:           null
    # tween props
    duration:           500
    delay:              0
    repeat:             1
    yoyo:               false
    easing:             'Linear.None'

  vars:->
    @h = h; @chainArr ?= []
    @extendDefaults(); @calcTransform()

  calcTransform:->
    @props.transform = "rotate(#{@props.deg},#{@props.center},#{@props.center})"

  render:->
    # console.log @isRendered
    if !@isRendered
      if !@o.ctx?
        @ctx = document.createElementNS @ns, 'svg'
        @ctx.style.position  = 'absolute'
        @ctx.style.width     = '100%'
        @ctx.style.height    = '100%'
        @createBit(); @calcSize()

        @el   = document.createElement 'div'
        size  = "#{@props.size/16}rem"
        @el.style.position  = 'absolute'
        @el.style.top       = @props.y.string
        @el.style.left      = @props.x.string
        @el.style.opacity   = @props.opacity
        @el.style.width     = size
        @el.style.height    = size
        @h.setPrefixedStyle @el, 'backface-visibility', 'hidden'

        @el.appendChild @ctx
        (@o.parent or document.body).appendChild @el
      else @ctx = @o.ctx; @createBit()
      
      @isRendered = true

    !@o.isDrawLess and @draw()
    @createTween()
    @

  chain:(options)-> @chainArr.push { type: 'chain', options: options }; @
  then:(options)->  @chainArr.push { type: 'then',  options: options }; @

  createBit:->
    bitClass = elsMap[@o.type or @type]
    @bit = new bitClass ctx: @ctx, isDrawLess: true

  setProgress:(progress)->
    @props.onUpdate?.call(@, progress)

    @progress = if progress < 0 or !progress then 0
    else if progress > 1 then 1 else progress
    for key, value of @deltas
      switch value.type
        when 'array' # strokeDasharray/strokeDashoffset
          @props[key] = ''
          for num, i in value.delta
            @props[key] += "#{value.start[i] + num*@progress} "
        when 'number'
          @props[key] = value.start + value.delta*@progress
        when 'unit'
          units = value.end.unit
          @props[key] = "#{value.start.value+value.delta*@progress}#{units}"
        when 'color'
          r = parseInt (value.start.r + value.delta.r*@progress), 10
          g = parseInt (value.start.g + value.delta.g*@progress), 10
          b = parseInt (value.start.b + value.delta.b*@progress), 10
          a = parseInt (value.start.a + value.delta.a*@progress), 10
          @props[key] = "rgba(#{r},#{g},#{b},#{a})"
    @draw()
    
    if progress is 1 and @o.isRunLess then @runChain()
    
  runChain:->
    return if !@chainArr.length
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
        console.warn "::mojs:: new end value expected instead of object,
         using end(#{end}) value", value
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
        # get the end value
        value[Object.keys(value)[0]]
      else value
    # console.log 'ops', opts
    opts

  draw:->
    @bit.setProp
      x:                  @props.center
      y:                  @props.center
      stroke:             @props.stroke
      strokeWidth:        @props.strokeWidth
      strokeOpacity:      @props.strokeOpacity
      strokeDasharray:    @props.strokeDasharray
      strokeDashoffset:   @props.strokeDashoffset
      strokeLinecap:      @props.strokeLinecap
      fill:               @props.fill
      fillOpacity:        @props.fillOpacity
      radius:             @props.radius
      transform:          @calcTransform()
    @bit.draw()

    if @el
      @el.style.left    = @props.x
      @el.style.top     = @props.y
      @el.style.opacity = @props.opacity

      translate = "translate(#{@props.shiftX}, #{@props.shiftY})"
      @h.setPrefixedStyle @el, 'transform', translate

  calcSize:->
    return if @o.size? or @o.ctx

    dRadius = @deltas['radius']; dStroke = @deltas['strokeWidth']
    radius = if dRadius?
      Math.max Math.abs(dRadius.start), Math.abs(dRadius.end)
    else @props.radius
    stroke = if dStroke?
      Math.max Math.abs(dStroke.start), Math.abs(dStroke.end)
    else @props.strokeWidth
    @props.size   = 2*radius + stroke
    @props.size   *= @bit.ratio
    @props.size   += 2*@props.sizeGap
    @props.center = @props.size/2

  extendDefaults:->
    @props  ?= {}
    @deltas ?= {}
    for key, defaultsValue of @defaults
      optionsValue = @o[key]
      # if non-object value - just save it to @props
      if !(optionsValue and typeof optionsValue is 'object')
        @props[key] = @o[key] or defaultsValue
        # position property parse with units
        if @h.posPropsMap[key]
          @props[key] = @h.parseUnit(@props[key]).string
        continue
      # if delta object was passed: like { 20: 75 }
      start = Object.keys(optionsValue)[0]
      # color values
      if isNaN parseFloat(start)
        if key is 'strokeLinecap'
          console?.warn '::mojs:: Sorry, stroke-linecap propety is not
            animateable yet, using the start value'
          @props[key] = start; continue
        end           = optionsValue[start]
        startColorObj = h.makeColorObj start
        endColorObj   = h.makeColorObj end
        @deltas[key]  =
          start:  startColorObj
          end:    endColorObj
          type:   'color'
          delta:
            r: endColorObj.r - startColorObj.r
            g: endColorObj.g - startColorObj.g
            b: endColorObj.b - startColorObj.b
            a: endColorObj.a - startColorObj.a
      # color strokeDasharray/strokeDashoffset
      else if key is 'strokeDasharray' or key is 'strokeDashoffset'
        end   = optionsValue[start]
        startArr  = h.strToArr start
        endArr    = h.strToArr end
        h.normDashArrays startArr, endArr
        @deltas[key] =
          start:  startArr
          end:    endArr
          delta:  h.calcArrDelta startArr, endArr
          type:   'array'
      ## plain numeric value ##
      else
        ## filter tween-related properties
        # defined in helpers.tweenOptionMap
        # because tween-related props shouldn't
        ## have deltas
        if !@h.tweenOptionMap[key]
          # position values
          if @h.posPropsMap[key]
            end   = @h.parseUnit optionsValue[start]
            start = @h.parseUnit start
            @deltas[key] =
              start:  start
              end:    end
              delta:  end.value - start.value
              type:   'unit'
            @props[key] = start.string
          else
            end   = parseFloat optionsValue[start]
            start = parseFloat start
            @deltas[key] =
              start:  start
              end:    end
              delta:  end - start
              type:   'number'
            @props[key] = start
        else @props[key] = start

  createTween:->
    it = @
    if @props.onComplete then @props.onComplete = @h.bind(@props.onComplete, @)

    easings = h.splitEasing(@props.easing)
    ease = if typeof easings is 'function' then easings
    else TWEEN.Easing[easings[0]][easings[1]]

    @tween = new @TWEEN.Tween({ p: 0 }).to({ p: 1 }, @props.duration)
      .delay(@props.delay)
      .easing(ease)
      .onUpdate -> it.setProgress @p
      .repeat @props.repeat-1
      .yoyo @props.yoyo
      .onComplete => @runChain(); @props.onComplete?()
    !@o.isRunLess and @startTween()

  startTween:->
    @props.onStart?.call @
    @h.startAnimationLoop()
    @tween.start()

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "Byte", [], -> Byte
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = Byte
### istanbul ignore next ###
window?.mojs ?= {}
window?.mojs.Byte = Byte

