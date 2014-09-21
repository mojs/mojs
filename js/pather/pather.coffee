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
    @delay = @o.delay or 0
    @yoyo = @o.yoyo or false
    @easing = @o.easin or 'Linear.None'
    @repeat = @o.repeat or 0

  run:->
    it = @
    @tween = new @T.Tween({}).to({}, @duration)
      .onUpdate ->
        console.log @
        # @path.getPointAtLength @progress()
      .delay(@delay)
      .yoyo(@yoyo)
      .easing @easing
      .repeat(@repeat-1)
      .start()

    h.startAnimationLoop()

Pather

module.exports = Pather