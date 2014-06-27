require '../polyfills'
h  = require '../helpers'
Bit  = require './bit'


class Bubble extends Bit
  animate:(@oa={})->
    @vars()
    
    TWEEN.remove @tween
    it = @
    @tween = new TWEEN.Tween(r: 0, p: 0, lw: @radius*@rate)
      .to({r: @radius, p: 1, lw: 0}, @duration)
      .easing( TWEEN.Easing[@easingArr[0]][@easingArr[1]] )
      .onUpdate ->
        ctx = it.ctx
        (@r < 0) and (@r = -@r)
        if @lw > @r then @lw = @r

        ctx.clear()
        ctx.beginPath()
        ctx.arc(it.x, it.y, @r, 0, 2 * Math.PI, false)
        ctx.lineWidth = @lw*h.pixel
        ctx.strokeStyle = it.color
        ctx.stroke()
        @p is 1 and ctx.clear()

      .delay(@delay).start()

  draw:->
    


module.exports = do -> Bubble