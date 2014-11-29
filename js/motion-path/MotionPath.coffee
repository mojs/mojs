h = require '../helpers'
require '../polyfills'
TWEEN  = require '../vendor/tween'
resize = require '../vendor/resize'
# TODO
#   add fill to elemement option
#     on el's resize scaler should recalc
#     progress bounds
#   fix ff callbacks
#   junk?

class MotionPath
  NS: 'http://www.w3.org/2000/svg'
  constructor:(@o={})->
    @vars()
    if !@isRunLess then @run()
    else
      if @isPresetPosition then @presetPosition()
    @

  vars:->
    @T = TWEEN
    @h = h
    @resize = resize
    @duration = @o.duration or 1000
    @delay    = @o.delay or 0
    @yoyo     = @o.yoyo or false
    @easing   = @o.easing or 'Linear.None'; @easings = @easing.split('.')
    @repeat   = @o.repeat or 0
    @offsetX    = @o.offsetX or 0
    @offsetY    = @o.offsetY or 0
    @angleOffset= @o.angleOffset
    @isAngle    = @o.isAngle or false
    @isReverse  = @o.isReverse or false
    @isRunLess  = @o.isRunLess or false
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
      @cSize =
        width:  @container.offsetWidth  or 0
        height: @container.offsetHeight or 0

      @getScaler()

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
    start = @path.getPointAtLength 0
    end   = @path.getPointAtLength @len

    size = {}
    size.width  = if end.x >= start.x then end.x-start.x else start.x-end.x
    size.height = if end.y >= start.y then end.y-start.y else start.y-end.y

    @scaler = {}

    calcWidth  = => @scaler.x = @cSize.width/size.width or 1
    calcHeight = => @scaler.y = @cSize.height/size.height or 1
    calcBoth   = => calcWidth(); calcHeight()

    switch @fillRule
      when 'all'
        calcBoth()
      when 'width'
        calcWidth();  @scaler.y = @scaler.x
      when 'height'
        calcHeight(); @scaler.x = @scaler.y
      else
        calcBoth()

  presetPosition:-> @setProgress(0)

  run:(o={})->
    if o.path then @o.path = o.path
    if o.el then @o.el = o.el
    if o.fill then @o.fill = o.fill
    o and @extendDefaults o
    @postVars(); it = @

    @tween = new @T.Tween({p:0}).to({p:1}, @duration)
      .onStart => @onStart?()
      .onComplete => @onComplete?()
      .onUpdate -> it.setProgress @p
      .delay(@delay)
      .yoyo(@yoyo)
      .easing @T.Easing[@easings[0]][@easings[1]]
      .repeat(@repeat-1)
      .start()
    h.startAnimationLoop()

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

MotionPath

module.exports = MotionPath