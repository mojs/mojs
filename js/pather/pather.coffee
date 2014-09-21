h = require '../helpers'
require '../polyfills'
TWEEN  = require '../vendor/tween'

class Pather

  constructor:(@o={})->
    console.log @o
    @vars()
    @run()

  vars:->
    @T = TWEEN
    @duration = @o.duration or 1000
    @delay    = @o.delay or 0
    @yoyo     = @o.yoyo or false
    @easing   = @o.easing or 'Linear.None'; @easings = @easing.split('.')
    @repeat   = @o.repeat or 0
    @NS = 'http://www.w3.org/2000/svg'
    @path = @getPath()

  getPath:->
    if typeof @o.path is 'string'
      return if @o.path.charAt(0).toLowerCase() is 'm'
        svg  = document.createElementNS @NS, 'svg'
        path = document.createElementNS @NS, 'path'
        path.setAttributeNS(null, 'd', @o.path); path
      else document.querySelector @o.path
    # DOM node
    if @o.path.addEventListener
      return @o.path

  run:->
    len = @path.getTotalLength(); it = @
    start = if @direction then 0 else len
    end   = if @direction then len else 0
    @tween = new @T.Tween({p:0, len: start}).to({p:1, len:end}, @duration)
      .onUpdate ->
        # @p is 1 and console.log 'start'
        console.log it.path.getPointAtLength @len

      .delay(@delay)
      .yoyo(@yoyo)
      .easing @T.Easing[@easings[0]][@easings[1]]
      .repeat(@repeat-1)
      .start()

    h.startAnimationLoop()

Pather

module.exports = Pather