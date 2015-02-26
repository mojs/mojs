h         = require './h'
Tween     = require './tween'
Timeline  = require './timeline'
resize    = require './vendor/resize'

class MotionPath
  NS: 'http://www.w3.org/2000/svg'
  defaults:
    delay:    0
    duration:         1000
    easing:           null
    repeat:           0
    yoyo:             false
    offsetX:          0
    offsetY:          0
    angleOffset:      null
    pathStart:        0
    pathEnd:          1
    transformOrigin:  null

    isAngle:          false
    isReverse:        false
    isRunLess:        false
    isPresetPosition: true

    onStart:          null
    onComplete:       null
    onUpdate:         null

  constructor:(@o={})-> @vars(); @createTween(); @

  vars:->
    @getScaler = h.bind(@getScaler, @); @resize = resize
    @props = h.cloneObj(@defaults)
    @extendOptions @o
    @history = [h.cloneObj(@props)]
    @postVars()

  postVars:->
    @props.pathStart = h.clamp @props.pathStart, 0, 1
    @props.pathEnd   = h.clamp @props.pathEnd, @props.pathStart, 1
    @onUpdate = @props.onUpdate
    @el         = @parseEl @props.el
    @path       = @getPath()
    @len        = @path.getTotalLength()
    @slicedLen  = @len*(@props.pathEnd - @props.pathStart)
    @startLen   = @props.pathStart*@len
    @fill       = @props.fill
    if @fill?
      @container  = @parseEl @props.fill.container
      @fillRule   = @props.fill.fillRule or 'all'
      @getScaler()
      return if !@container
      @removeEvent @container, 'onresize', @getScaler
      @addEvent    @container, 'onresize', @getScaler

  addEvent:(el, type, handler)->
    if el.addEventListener then @container.addEventListener type, handler
    else if el.attachEvent then @container.attachEvent type, handler

  removeEvent:(el, type, handler)->
    if el.removeEventListener
      @container.removeEventListener type, handler
    else if el.detachEvent then @container.detachEvent type, handler

  parseEl:(el)->
    return document.querySelector el if typeof el is 'string'
    return el if el instanceof HTMLElement

  getPath:->
    if typeof @props.path is 'string'
      return if @props.path.charAt(0).toLowerCase() is 'm'
        path = document.createElementNS @NS, 'path'
        path.setAttributeNS(null, 'd', @props.path); path
      else document.querySelector @props.path
    # DOM node
    if @props.path.style
      return @props.path

  getScaler:()->
    @cSize =
      width:  @container.offsetWidth  or 0
      height: @container.offsetHeight or 0

    start = @path.getPointAtLength 0
    end   = @path.getPointAtLength @len

    size = {}
    size.width  = if end.x >= start.x then end.x-start.x else start.x-end.x
    size.height = if end.y >= start.y then end.y-start.y else start.y-end.y

    @scaler = {}

    calcWidth  = =>
      @scaler.x = @cSize.width/size.width
      if !isFinite(@scaler.x) then @scaler.x = 1
    calcHeight = =>
      @scaler.y = @cSize.height/size.height
      if !isFinite(@scaler.y) then @scaler.y = 1
    calcBoth   = -> calcWidth(); calcHeight()

    switch @fillRule
      when 'all'
        calcBoth()
      when 'width'
        calcWidth();  @scaler.y = @scaler.x
      when 'height'
        calcHeight(); @scaler.x = @scaler.y
      else
        calcBoth()

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
    @timeline = new Timeline
      duration:   @props.duration
      delay:      @props.delay
      yoyo:       @props.yoyo
      repeat:     @props.repeat
      easing:     @props.easing
      onStart:    => @props.onStart?.apply @
      onComplete: => @props.onComplete?.apply @
      onUpdate:  (p)=> @setProgress(p)
      onFirstUpdateBackward:=> @history.length > 1 and @tuneOptions @history[0]
    @tween = new Tween# onUpdate:(p)=> @o.onChainUpdate?(p)
    @tween.add(@timeline)
    if !@props.isRunLess then @startTween()
    else if @props.isPresetPosition then @setProgress(0, true)

  startTween:-> setTimeout (=> @tween?.start()), 1

  setProgress:(p, isInit)->
    len = @startLen+if !@props.isReverse then p*@slicedLen else (1-p)*@slicedLen

    point = @path.getPointAtLength len
    if @props.isAngle or @props.angleOffset?
      prevPoint = @path.getPointAtLength len - 1
      x1 = point.y - prevPoint.y
      x2 = point.x - prevPoint.x
      atan = Math.atan(x1/x2); !isFinite(atan) and (atan = 0)
      @angle = atan*h.RAD_TO_DEG
      if (typeof @props.angleOffset) isnt 'function'
        @angle += @props.angleOffset or 0
      else @angle = @props.angleOffset(@angle, p)
    else @angle = 0
    
    x = point.x + @props.offsetX; y = point.y + @props.offsetY
    if @scaler then x *= @scaler.x; y *= @scaler.y

    rotate = if @angle isnt 0 then "rotate(#{@angle}deg)" else ''
    transform = "translate(#{x}px,#{y}px) #{rotate} translateZ(0)"
    @el.style["#{h.prefix.css}transform"] = transform
    @el.style['transform'] = transform

    if @props.transformOrigin
      # transform origin could be a function
      tOrigin = if typeof @props.transformOrigin is 'function'
        @props.transformOrigin(@angle, p)
      else @props.transformOrigin
      @el.style["#{h.prefix.css}transform-origin"] = tOrigin
      @el.style['transform-origin'] = tOrigin
    !isInit and @onUpdate?(p)

  extendDefaults:(o)->
    for key, value of o
      @[key] = value

  extendOptions:(o)->
    for key, value of o
      @props[key] = value

  then:(o)->
    prevOptions = @history[@history.length-1]
    for key, value of prevOptions
      o[key] ?= value
    @history.push o
    # get tween timing values
    keys = Object.keys(h.tweenOptionMap); i = keys.length; opts = {}
    while(i--)
      key = keys[i]; opts[key] = o[key] or prevOptions[key]
    it = @
    opts.onUpdate      = (p)=> @setProgress p
    opts.onStart       = => @props.onStart?.apply @
    opts.onComplete    = => @props.onComplete?.apply @
    opts.onFirstUpdate = -> it.tuneOptions it.history[@index]
    @tween.append new Timeline(opts)
    @

  tuneOptions:(o)-> @extendOptions(o); @postVars()

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "motion-path", [], -> MotionPath
### istanbul ignore next ###
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = MotionPath
### istanbul ignore next ###
window?.mojs ?= {}
### istanbul ignore next ###
window?.mojs.MotionPath = MotionPath

