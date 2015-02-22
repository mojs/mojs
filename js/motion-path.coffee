h         = require './h'
Tween     = require './tween'
Timeline  = require './timeline'
resize    = require './vendor/resize'

# TODO
#   switch to jasmine 2.0 + add travis ci
#   fix ff callbacks
#   junk?

class MotionPath
  NS: 'http://www.w3.org/2000/svg'
  constructor:(@o={})->
    @vars()
    if !@isRunLess then @run()
    else if @isPresetPosition then @presetPosition()
    @

  vars:->
    @getScaler = h.bind @getScaler, @
    @resize = resize
    @duration   = @o.duration or 1000
    @delay      = @o.delay or 0
    @yoyo       = @o.yoyo or false
    @easing     = @o.easing or 'Linear.None'; @easings = @easing.split('.')
    @repeat     = @o.repeat or 0
    @offsetX    = @o.offsetX or 0
    @offsetY    = @o.offsetY or 0
    @angleOffset= @o.angleOffset
    @isAngle    = @o.isAngle or false
    @isReverse  = @o.isReverse or false
    @isRunLess  = @o.isRunLess or false
    @pathStart  = @o.pathStart or 0
    @pathEnd    = @o.pathEnd or 1
    if pathStart < 0 then pathStart = 0
    if pathStart > 1 then pathStart = 1
    if pathEnd   < 0 then pathEnd   = 0
    if pathEnd   > 1 then pathEnd   = 1
    @isPresetPosition = @o.isPresetPosition or true
    @transformOrigin = @o.transformOrigin
    # callbacks
    @onStart    = @o.onStart
    @onComplete = @o.onComplete
    @onUpdate   = @o.onUpdate
    @postVars()

  postVars:->
    @el         = @parseEl @o.el
    @path       = @getPath()
    @len        = @path.getTotalLength()
    @fill       = @o.fill
    if @fill?
      @container  = @parseEl @fill.container
      @fillRule   = @fill.fillRule or 'all'
      @getScaler()
      return if !@container
      
      @removeEvent @container, 'onresize', @getScaler
      @addEvent    @container, 'onresize', @getScaler

  addEvent:(el, type, handler)->
    # @o.isIt and console.log 'add'
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
    if typeof @o.path is 'string'
      return if @o.path.charAt(0).toLowerCase() is 'm'
        path = document.createElementNS @NS, 'path'
        path.setAttributeNS(null, 'd', @o.path); path
      else document.querySelector @o.path
    # DOM node
    if @o.path.style
      return @o.path

  getScaler:()->
    # @o.isIt and console.log 'get'
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

  presetPosition:-> @setProgress(@pathStart)

  run:(o)->
    if o?.path then @o.path = o.path
    if o?.el then @o.el = o.el
    if o?.fill then @o.fill = o.fill
    o and @extendDefaults o
    o and @postVars(); it = @
    @timeline = new Timeline
      duration:   @duration
      delay:      @delay
      yoyo:       @yoyo
      repeat:     @repeat
      easing:     'linear.none'
      onStart:    => @onStart?()
      onComplete: => @onComplete?()
      onUpdate:   (p)=> @setProgress p
    @tween = new Tween; @tween.add @timeline
    @tween.start()

  setProgress:(p)->
    # o and @extendDefaults o
    len = if !@isReverse then p*@len else (1-p)*@len
    point = @path.getPointAtLength len
    if @isAngle or @angleOffset?
      prevPoint = @path.getPointAtLength len - 1
      x1 = point.y - prevPoint.y
      x2 = point.x - prevPoint.x
      @angle = Math.atan(x1/x2)*h.DEG2
      if (typeof @angleOffset) isnt 'function'
        @angle += @angleOffset or 0
      else
        @angle = @angleOffset(@angle, p)
    else @angle = 0
    
    x = point.x + @offsetX; y = point.y + @offsetY
    if @scaler then x *= @scaler.x; y *= @scaler.y

    rotate = if @angle isnt 0 then "rotate(#{@angle}deg)" else ''
    transform = "translate(#{x}px,#{y}px) #{rotate} translateZ(0)"
    @el.style["#{h.prefix.js}Transform"] = transform
    @el.style['transform'] = transform
    if @transformOrigin
      # transform origin could be a function
      tOrigin = if typeof @transformOrigin is 'function'
        @transformOrigin(@angle, p)
      else @transformOrigin
      @el.style["#{h.prefix.js}TransformOrigin"] = tOrigin
      @el.style['transformOrigin'] = tOrigin
    @onUpdate?(p)

  extendDefaults:(o)->
    for key, value of o
      @[key] = value

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

