h = require '../helpers'
require '../polyfills'
TWEEN  = require '../vendor/tween'

class MotionPath
  NS: 'http://www.w3.org/2000/svg'
  constructor:(@o={})->
    @vars()
    @run()
    @

  vars:->
    @T = TWEEN
    @duration = @o.duration or 1000
    @delay    = @o.delay or 0
    @yoyo     = @o.yoyo or false
    @easing   = @o.easing or 'Linear.None'; @easings = @easing.split('.')
    @repeat   = @o.repeat or 0
    @path = @getPath()
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

  run:->
    len = @path.getTotalLength(); it = @
    start = if @direction then 0 else len
    end   = if @direction then len else 0
    @tween = new @T.Tween({p:0, len: start}).to({p:1, len:end}, @duration)
      .onUpdate ->
        point = it.path.getPointAtLength @len
        it.el.style['transform'] = "translate(#{point.x}px,#{point.y}px)"
      .delay(@delay)
      .yoyo(@yoyo)
      .easing @T.Easing[@easings[0]][@easings[1]]
      .repeat(@repeat-1)
      .start()

    h.startAnimationLoop()

MotionPath

module.exports = MotionPath