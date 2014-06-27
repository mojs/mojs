require '../polyfills'
h  = require '../helpers'
Bit  = require './bit'


class Bubble extends Bit
  constructor:(@o={})->
    super
    @animate()

  animate:->
    ctx = @el.getContext('2d')
    centerX = @radius
    centerY = @radius

    tween = new TWEEN.Tween(r: 0, p: 0, lw: @radius*@rate)
      .to({r: @radius, p: 1, lw: 0}, @duration)
      .easing( TWEEN.Easing[@easingArr[0]][@easingArr[1]] )
      .onUpdate ->
        ctx.clear()
        ctx.beginPath()
        (@r < 0) and (@r = -@r)
        if @lw > @r then @lw = @r
        ctx.arc(centerX, centerY, @r, 0, 2 * Math.PI, false)
        ctx.lineWidth = @lw*h.pixel
        ctx.strokeStyle = 'deeppink'
        ctx.stroke()
        @p is 1 and ctx.clear()

      .start()

  draw:->
    


module.exports = do -> Bubble