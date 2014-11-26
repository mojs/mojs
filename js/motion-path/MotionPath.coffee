h = require '../helpers'
require '../polyfills'
TWEEN  = require '../vendor/tween'
# TODO
#   add fill to elemement option
#   fix ff callbacks
#   junk?

class MotionPath
  NS: 'http://www.w3.org/2000/svg'
  constructor:(@o={})->
    @vars()
    if !@isRunLess then @run()
    @

  vars:->
    @T = TWEEN
    @h = h
    @duration = @o.duration or 1000
    @delay    = @o.delay or 0
    @yoyo     = @o.yoyo or false
    @easing   = @o.easing or 'Linear.None'; @easings = @easing.split('.')
    @repeat   = @o.repeat or 0
    @path     = @getPath()
    @offsetX    = @o.offsetX or 0
    @offsetY    = @o.offsetY or 0
    @angleOffset= @o.angleOffset
    @isAngle    = @o.isAngle or false
    @isReverse  = @o.isReverse or false
    @isRunLess  = @o.isRunLess or false
    # callbacks
    @onStart    = @o.onStart
    @onComplete = @o.onComplete
    @onUpdate   = @o.onUpdate
    # @onAngle    = @o.onAngle
    @el = @getEl()

  getEl:->
    if !@o.el then throw new Error 'MotionPath needs an el to be animated'
    return document.querySelector @o.el if typeof @o.el is 'string'
    return @o.el if @o.el.style?

  getPath:->
    if typeof @o.path is 'string'
      return if @o.path.charAt(0).toLowerCase() is 'm'
        path = document.createElementNS @NS, 'path'
        path.setAttributeNS(null, 'd', @o.path); path
      else document.querySelector @o.path
    # DOM node
    if @o.path.style
      return @o.path

  run:(o={})->
    @extendDefaults o
    len = @path.getTotalLength(); it = @
    start = if !@isReverse then 0 else len
    end   = if !@isReverse then len else 0
    @tween = new @T.Tween({p:0, len: start}).to({p:1, len:end}, @duration)
      .onStart => @onStart?()
      .onComplete => @onComplete?()
      .onUpdate ->
        point = it.path.getPointAtLength @len
        
        if it.isAngle or it.angleOffset?
          prevPoint = it.path.getPointAtLength @len - 1
          x1 = point.y - prevPoint.y
          x2 = point.x - prevPoint.x
          it.angle = Math.atan(x1/x2)*h.DEG2
          if (typeof it.angleOffset) isnt 'function'
            it.angle += it.angleOffset or 0
          else
            it.angle = it.angleOffset(it.angle, @p)
        else it.angle = 0

        # it.angle = if it.onAngle? then it.onAngle?(it.angle) else it.angle

        x = point.x + it.offsetX; y = point.y + it.offsetY
        transform = "translate(#{x}px,#{y}px) rotate(#{it.angle}deg)"
        it.el.style["#{h.prefix.js}Transform"] = transform
        it.el.style['transform'] = transform
        it.onUpdate?.apply @, arguments
      .delay(@delay)
      .yoyo(@yoyo)
      .easing @T.Easing[@easings[0]][@easings[1]]
      .repeat(@repeat-1)
      .start()

    h.startAnimationLoop()

  extendDefaults:(o)->
    for key, value of o
      @[key] = value if @[key]?

MotionPath

module.exports = MotionPath