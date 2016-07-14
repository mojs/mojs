# ## MotionPath
# Class for moving object along path or curve
#
# @class MotionPath
h         = require './h'
resize    = require './vendor/resize'
Tween     = require('./tween/tween').default
Timeline  = require('./tween/timeline').default

class MotionPath
  # ---
  # ### Defaults/APIs
  # ---
  defaults:
    # Defines motion path or arc to animate **el's** position.  
    # 
    # Can be defined
    #   - by **String**:
    #     - **CSS selector** e.g. '#js-path', '.path' etc
    #     - **SVG path** [line commands](http://goo.gl/LzvV6P)
    #       e.g 'M0,0 L100, 300'
    #   - by **SVGPathElement** e.g document.getElementById('#js-path')
    #   - by **Arc shift** e.g { x: 200, y: 100 }. If motion path was defined by
    #     arc shift, [curvature option](#property-curvature)
    #     defines arc curvature.
    #     
    # @property   path
    # @type       {String, SVGPathElement, Object}
    # 
    # @codepen CSS selector:      http://codepen.io/sol0mka/pen/emqbLN/
    # @codepen SVG line commands: http://codepen.io/sol0mka/pen/dPxaMm/
    # @codepen SVGPathElement:    http://codepen.io/sol0mka/pen/xbvMyj/
    # @codepen Arc shift:         http://codepen.io/sol0mka/pen/QweYKW/
    path:             null
    # ---

    # Defines curve size for path defined by arc shift.  
    # Curvature amount can be defined by number representing *px*
    # or percents(string) representing amount relative to shift length.
    # @example
    #   { x: 200, y: 100 } or { x: '50%', y: '20%' } or mix
    # @example
    #   // will fallback to defaults for omitted axes
    #   { x: 200 }   // fallbacks to { x: 200, y: '50%' }
    #   { y: '25%' } // fallbacks to { x: '75%', y: '25%' }
    # 
    # @property   curvature
    # @type       {Object}
    # 
    # @codepen http://codepen.io/sol0mka/pen/vEobbM/
    curvature:        x: '75%', y: '50%'
    # ---

    # Defines if composite layer should be forced on el to prevent
    # paint during animation.
    # @type       {Boolean}
    isCompositeLayer:   true
    # ---

    # Delay before animation starts, *ms*
    # @property   delay
    # @type       {Number}
    # 
    # @codepen http://codepen.io/sol0mka/pen/wBVNLM/
    delay:            0
    # ---

    # Duration of animation, *ms*
    # @property   duration
    # @type       {Number}
    duration:         1000
    # ---

    # Easing. The option will be passed to tween.parseEasing method.
    # Please see the [tween module](tween.coffee.html#parseEasing) for
    # all avaliable options.
    #
    # @property   easing
    # @type       {String, Function, Array}
    #
    # @codepen String:              http://codepen.io/sol0mka/pen/GgVeKR/
    # @codepen Bezier cubic curve:  http://codepen.io/sol0mka/pen/WbVmeo/
    # @codepen Custom function:     http://codepen.io/sol0mka/pen/XJvGrE/
    easing:           null
    # ---

    # Animation repeat count
    # @property   repeat
    # @type       {Integer}
    #
    # @codepen http://codepen.io/sol0mka/pen/emqbLN/
    repeat:           0
    # ---

    # Defines if animation should be alternated on repeat.
    # 
    # @property   yoyo
    # @type       {Boolean}
    # 
    # @codepen http://codepen.io/sol0mka/pen/gbVEbb/
    yoyo:             false
    # ---

    # Callback **onStart** fires once if animation was started.
    # 
    # @property   onStart
    # @type       {Function}
    # 
    # @codepen http://codepen.io/sol0mka/pen/VYoRRe/
    onStart:          null
    # ---

    # Callback **onComplete** fires once if animation was completed.
    # 
    # @property   onComplete
    # @type       {Function}
    # 
    # @codepen http://codepen.io/sol0mka/pen/ZYgPPm/
    onComplete:       null
    # ---

    # Callback **onUpdate** fires every raf frame on motion
    # path update. Recieves **progress** of type **Number**
    # in range *[0,1]* as argument.
    # 
    # @property   onUpdate
    # @type       {Function}
    # 
    # @codepen http://codepen.io/sol0mka/pen/YPmgMq/
    onUpdate:         null
    # ---

    # Defines additional horizontal offset from center of path, *px*
    # @property   offsetX
    # @type       {Number}
    # 
    # @codepen http://codepen.io/sol0mka/pen/gbVEbb/
    offsetX:          0
    # ---

    # Defines additional vertical offset from center of path, *px*
    # @property   offsetY
    # @type       {Number}
    # 
    # @codepen http://codepen.io/sol0mka/pen/OPKqNN/
    offsetY:          0
    # ---

    # Defines angle offset for path curves
    # @property   angleOffset
    # @type       {Number, Function}
    # @example
    #   // function
    #   new MotionPath({
    #     //...
    #     angleOffset: function(currentAngle) {
    #       return if (currentAngle < 0) { 90 } else {-90}
    #     }
    #   });
    #   
    # @codepen Number:    http://codepen.io/sol0mka/pen/JogzXw
    # @codepen Function:  http://codepen.io/sol0mka/pen/MYNxer
    angleOffset:      null
    # ---

    # Defines lower bound for path coordinates in rangle *[0,1]*
    # So specifying pathStart of .5 will start animation
    # form the 50% progress of your path.
    # @property   pathStart
    # @type       {Number}
    # @example
    #   // function
    #   new MotionPath({
    #     //...
    #     pathStart: .5
    #   });
    #
    # @codepen http://codepen.io/sol0mka/pen/azeMBQ/
    pathStart:        0
    # ---

    # Defines upper bound for path coordinates in rangle *[0,1]*
    # So specifying pathEnd of .5 will end animation
    # at the 50% progress of your path.
    # @property   pathEnd
    # @type       {Number}
    # @example
    #   // function
    #   new MotionPath({
    #     //...
    #     pathEnd: .5
    #   });
    #   
    # @codepen http://codepen.io/sol0mka/pen/wBVOJo/
    pathEnd:          1
    # ---

    # Defines motion blur on element in range of *[0,1]*
    # 
    # @property   motionBlur
    # @type       {Number}
    motionBlur:       0
    # ---

    # Defines transform-origin CSS property for **el**.
    # Can be defined by **string** or **function**.
    # Function recieves current angle as agrumnet and
    # should return transform-origin value as a strin.
    # 
    # @property   transformOrigin
    # @type       {String, Function}
    # @example
    #   // function
    #   new MotionPath({
    #     //...
    #     isAngle: true,
    #     transformOrigin: function (currentAngle) {
    #       return  6*currentAngle + '% 0';
    #     }
    #   });
    #   
    # @codepen Function:  http://codepen.io/sol0mka/pen/pvMYwp
    transformOrigin:  null
    # ---

    # Defines if path curves angle should be set to el.
    # 
    # @property   isAngle
    # @type       {Boolean}
    # @codepen http://codepen.io/sol0mka/pen/GgVexq/
    isAngle:          false
    # ---

    # Defines motion path direction.
    # 
    # @property   isReverse
    # @type       {Boolean}
    # @codepen http://codepen.io/sol0mka/pen/KwOERQ/
    isReverse:        false
    # ---

    # Defines if animation should not start after init.
    # Animation can be then started with calling [run]() method.
    # 
    # @property   isRunLess
    # @type       {Boolean}
    # 
    # @codepen *Please see at codepen for proper results*: http://
    # codepen.io/sol0mka/pen/raXRKQ/
    isRunLess:        false
    # ---

    # Defines if **el's** position should be preset immediately after init.
    # If set to false **el** will remain at it's position until
    # actual animation started on delay end or [run]() method call.
    # 
    # @property   isPresetPosition
    # @type       {Boolean}
    # 
    # @codepen http://codepen.io/sol0mka/pen/EaqMOJ/
    isPresetPosition: true
  # ---
  # ### Class body docs
  # ---
  constructor:(@o={})-> return if @vars(); @createTween(); @

  vars:->
    @getScaler = h.bind(@getScaler, @); @resize = resize
    @props = h.cloneObj(@defaults)
    @extendOptions @o
    # reset motionBlur for safari and IE
    @isMotionBlurReset = h.isSafari or h.isIE
    @isMotionBlurReset and (@props.motionBlur = 0)
    @history = [h.cloneObj(@props)]
    @postVars()
  # ---

  # Method to transform coordinates and curvature
  # to svg path
  #
  # @method curveToPath
  #
  # @param {Object} coordinates of end point **x** and **y**
  # @param {Object} coordinates of the control point
  #                 of the quadratic bezier curve, relative to
  #                 start and end coordinates **x** and **y**
  #
  # @return {SVGElement} svg path
  curveToPath:(o)->
    path = document.createElementNS h.NS , 'path'
    start = o.start
    endPoint  = x: start.x + o.shift.x, y: start.x + o.shift.y
    curvature = o.curvature

    dX = o.shift.x; dY = o.shift.y
    radius = Math.sqrt(dX*dX + dY*dY); percent = radius/100
    angle  = Math.atan(dY/dX)*(180/Math.PI) + 90
    if o.shift.x < 0 then angle = angle + 180

    # get point on line between start end end
    curvatureX = h.parseUnit curvature.x
    curvatureX = if curvatureX.unit is '%' then curvatureX.value*percent
    else curvatureX.value
    curveXPoint = h.getRadialPoint
      center: x: start.x, y: start.y
      radius: curvatureX
      angle:  angle
    # get control point with center in curveXPoint
    curvatureY = h.parseUnit curvature.y
    curvatureY = if curvatureY.unit is '%' then curvatureY.value*percent
    else curvatureY.value
    curvePoint = h.getRadialPoint
      center: x: curveXPoint.x, y: curveXPoint.y
      radius: curvatureY
      angle:  angle+90

    path.setAttribute 'd', "M#{start.x},#{start.y}
       Q#{curvePoint.x},#{curvePoint.y}
       #{endPoint.x},#{endPoint.y}"

    path

  postVars:->
    @props.pathStart = h.clamp @props.pathStart, 0, 1
    @props.pathEnd   = h.clamp @props.pathEnd, @props.pathStart, 1
    @angle = 0; @speedX = 0; @speedY = 0; @blurX = 0; @blurY = 0
    @prevCoords = {}; @blurAmount = 20
    # clamp motionBlur in range of [0,1]
    @props.motionBlur = h.clamp @props.motionBlur, 0, 1
    
    @onUpdate   = @props.onUpdate
    if !@o.el
      h.error 'Missed "el" option. It could be a selector,
                DOMNode or another module.'
      return true
    
    @el = @parseEl @props.el
    @props.motionBlur > 0 and @createFilter()

    @path       = @getPath()
    if !@path.getAttribute('d')
      h.error('Path has no coordinates to work with, aborting'); return true
    @len        = @path.getTotalLength()
    @slicedLen  = @len*(@props.pathEnd - @props.pathStart)
    @startLen   = @props.pathStart*@len
    @fill       = @props.fill
    if @fill?
      @container  = @parseEl @props.fill.container
      @fillRule   = @props.fill.fillRule or 'all'
      @getScaler()
      if @container?
        @removeEvent @container, 'onresize', @getScaler
        @addEvent    @container, 'onresize', @getScaler

  addEvent:   (el, type, handler)-> el.addEventListener    type, handler, false
  removeEvent:(el, type, handler)-> el.removeEventListener type, handler, false
  createFilter:->
    div = document.createElement 'div'
    @filterID = "filter-#{h.getUniqID()}"
    div.innerHTML = """<svg id="svg-#{@filterID}"
          style="visibility:hidden; width:0px; height:0px">
        <filter id="#{@filterID}" y="-20" x="-20" width="40" height="40">
          <feOffset
            id="blur-offset" in="SourceGraphic"
            dx="0" dy="0" result="offset2"></feOffset>
          <feGaussianblur
            id="blur" in="offset2"
            stdDeviation="0,0" result="blur2"></feGaussianblur>
          <feMerge>
            <feMergeNode in="SourceGraphic"></feMergeNode>
            <feMergeNode in="blur2"></feMergeNode>
          </feMerge>
        </filter>
      </svg>"""

    svg = div.querySelector "#svg-#{@filterID}"
    @filter       = svg.querySelector '#blur'
    @filterOffset = svg.querySelector '#blur-offset'
    document.body.insertBefore svg, document.body.firstChild
    @el.style['filter'] = "url(##{@filterID})"
    @el.style["#{h.prefix.css}filter"] = "url(##{@filterID})"

  parseEl:(el)->
    return document.querySelector el if typeof el is 'string'
    return el if el instanceof HTMLElement
    if el._setProp? then @isModule = true; return el

  getPath:->
    path = h.parsePath(@props.path); return path if path
    
    if @props.path.x or @props.path.y
      @curveToPath
        start: x: 0, y: 0
        shift: {x: (@props.path.x or 0), y: (@props.path.y or 0)}
        curvature:
          x: @props.curvature.x or @defaults.curvature.x
          y: @props.curvature.y or @defaults.curvature.y

  getScaler:()->
    @cSize =
      width:  @container.offsetWidth  or 0
      height: @container.offsetHeight or 0
    start = @path.getPointAtLength 0
    end   = @path.getPointAtLength @len
    
    size = {}; @scaler = {}
    size.width  = if end.x >= start.x then end.x-start.x else start.x-end.x
    size.height = if end.y >= start.y then end.y-start.y else start.y-end.y

    switch @fillRule
      when 'all'
        @calcWidth(size); @calcHeight(size)
      when 'width'
        @calcWidth(size);  @scaler.y = @scaler.x
      when 'height'
        @calcHeight(size); @scaler.x = @scaler.y
      # else @calcBoth(size)

  calcWidth:(size)->
    @scaler.x = @cSize.width/size.width
    !isFinite(@scaler.x) and (@scaler.x = 1)
  calcHeight:(size)=>
    @scaler.y = @cSize.height/size.height
    !isFinite(@scaler.y) and (@scaler.y = 1)

  run:(o)->
    if o
      fistItem = @history[0]
      for key, value of o
        if h.callbacksMap[key] or h.tweenOptionMap[key]
          h.warn "the property \"#{key}\" property can not
            be overridden on run yet"
          delete o[key]
        else @history[0][key] = value
      @tuneOptions o
    @startTween()

  createTween:->
    @tween = new Tween
      duration:   @props.duration
      delay:      @props.delay
      yoyo:       @props.yoyo
      repeat:     @props.repeat
      easing:     @props.easing
      onStart:    => @props.onStart?.apply @
      onComplete: =>
        @props.motionBlur and @setBlur
          blur: {x: 0, y: 0}, offset: {x: 0, y: 0}
        @props.onComplete?.apply @
      onUpdate:  (p)=> @setProgress(p)
      onFirstUpdate:(isForward, isYoyo)=>
        if !isForward then @history.length > 1 and @tuneOptions @history[0]
    @timeline = new Timeline# onUpdate:(p)=> @o.onChainUpdate?(p)
    @timeline.add(@tween)
    !@props.isRunLess and @startTween()
    @props.isPresetPosition and @setProgress(0, true)

  startTween:-> setTimeout (=> @timeline?.play()), 1

  setProgress:(p, isInit)->
    len = @startLen+if !@props.isReverse then p*@slicedLen else (1-p)*@slicedLen
    point = @path.getPointAtLength len
    # get x and y coordinates
    x = point.x + @props.offsetX; y = point.y + @props.offsetY
    @_getCurrentAngle point, len, p
    @_setTransformOrigin(p)
    @_setTransform(x, y, p, isInit)
    @props.motionBlur and @makeMotionBlur(x, y)
  setElPosition:(x,y,p)->
    rotate    = if @angle isnt 0 then "rotate(#{@angle}deg)" else ''
    isComposite = @props.isCompositeLayer and h.is3d
    composite = if isComposite then 'translateZ(0)' else ''
    transform = "translate(#{x}px,#{y}px) #{rotate} #{composite}"
    h.setPrefixedStyle @el, 'transform', transform
  setModulePosition:(x, y)->
    @el._setProp shiftX: "#{x}px", shiftY: "#{y}px", angle: @angle
    @el._draw()
  _getCurrentAngle:(point, len, p)->
    isTransformFunOrigin = typeof @props.transformOrigin is 'function'
    if @props.isAngle or @props.angleOffset? or isTransformFunOrigin
      prevPoint = @path.getPointAtLength len - 1
      x1 = point.y - prevPoint.y; x2 = point.x - prevPoint.x
      atan = Math.atan(x1/x2); !isFinite(atan) and (atan = 0)
      @angle = atan*h.RAD_TO_DEG
      if (typeof @props.angleOffset) isnt 'function'
        @angle += @props.angleOffset or 0
      else @angle = @props.angleOffset.call @, @angle, p
    else @angle = 0
  _setTransform:(x,y,p,isInit)->
    # get real coordinates relative to container size
    if @scaler then x *= @scaler.x; y *= @scaler.y
    # call onUpdate but not on the very first(0 progress) call
    transform = null
    if !isInit then transform = @onUpdate?(p, { x: x, y: y, angle: @angle })
    # set position and angle
    # 1: if motion path is for module
    if @isModule then @setModulePosition(x,y)
    # 2: if motion path is for DOM node
    else
      # if string was returned from the onUpdate call
      # then set this string to the @el
      if typeof transform isnt 'string' then @setElPosition(x,y,p)
      else h.setPrefixedStyle @el, 'transform', transform

  _setTransformOrigin:(p)->
    if @props.transformOrigin
      isTransformFunOrigin = typeof @props.transformOrigin is 'function'
      # transform origin could be a function
      tOrigin = if !isTransformFunOrigin then @props.transformOrigin
      else @props.transformOrigin(@angle, p)
      h.setPrefixedStyle @el, 'transform-origin', tOrigin
  makeMotionBlur:(x, y)->
    # if previous coords are not defined yet -- set speed to 0
    tailAngle = 0; signX = 1; signY = 1
    if !@prevCoords.x? or !@prevCoords.y? then @speedX = 0; @speedY = 0
    # else calculate speed based on the largest axes delta
    else
      dX = x-@prevCoords.x; dY = y-@prevCoords.y
      if dX > 0 then signX = -1
      if signX < 0 then signY = -1
      @speedX = Math.abs(dX); @speedY = Math.abs(dY)
      tailAngle = Math.atan(dY/dX)*(180/Math.PI) + 90
    absoluteAngle = tailAngle - @angle
    coords = @angToCoords absoluteAngle
    # get blur based on speed where 1px per 1ms is very fast
    # and motionBlur coefficient
    @blurX = h.clamp (@speedX/16)*@props.motionBlur, 0, 1
    @blurY = h.clamp (@speedY/16)*@props.motionBlur, 0, 1
    @setBlur
      blur:
        x: 3*@blurX*@blurAmount*Math.abs(coords.x)
        y: 3*@blurY*@blurAmount*Math.abs(coords.y)
      offset:
        x: 3*signX*@blurX*coords.x*@blurAmount
        y: 3*signY*@blurY*coords.y*@blurAmount
    # save previous coords
    @prevCoords.x = x; @prevCoords.y = y

  setBlur:(o)->
    if !@isMotionBlurReset
      @filter.setAttribute 'stdDeviation', "#{o.blur.x},#{o.blur.y}"
      @filterOffset.setAttribute 'dx', o.offset.x
      @filterOffset.setAttribute 'dy', o.offset.y

  extendDefaults:(o)->
    for key, value of o
      @[key] = value
  extendOptions:(o)->
    for key, value of o
      @props[key] = value
  then:(o)->
    prevOptions = @history[@history.length-1]; opts = {}
    for key, value of prevOptions
      # don't copy callbacks and tween options(only duration)
      # get prev options if not defined
      if !h.callbacksMap[key] and !h.tweenOptionMap[key] or key is 'duration'
        o[key] ?= value
      # if property is callback and not defined in then options -
      # define it as undefined :) to override old callback,
      # because we are inside the prevOptions hash and it means
      # the callback was previously defined
      else o[key] ?= undefined
      # get animation timing values to feed the tween
      if h.tweenOptionMap[key]
        # copy all props, if prop is duration - fallback to previous value
        opts[key] = if key isnt 'duration' then o[key]
        else if o[key]? then o[key] else prevOptions[key]
    @history.push(o); it = @
    opts.onUpdate      = (p)=> @setProgress p
    opts.onStart       = => @props.onStart?.apply @
    opts.onComplete    = => @props.onComplete?.apply @
    opts.onFirstUpdate = -> it.tuneOptions it.history[@index]
    opts.isChained = !o.delay
    @timeline.append new Tween(opts)
    @

  tuneOptions:(o)-> @extendOptions(o); @postVars()

  angToCoords:(angle)->
    angle = angle % 360
    radAngle = ((angle-90)*Math.PI)/180
    x = Math.cos(radAngle); y = Math.sin(radAngle)
    x = if x < 0 then Math.max(x, -0.7) else Math.min(x, .7)
    y = if y < 0 then Math.max(y, -0.7) else Math.min(y, .7)
    x: x*1.428571429
    y: y*1.428571429
    # x: Math.cos(radAngle), y: Math.sin(radAngle)

module.exports = MotionPath

