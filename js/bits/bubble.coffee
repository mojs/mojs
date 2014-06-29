require '../polyfills'
h  = require '../helpers'
Bit  = require './bit'


class Bubble extends Bit
  run:(@oa={})->
    @vars()
    
    TWEEN.remove @tween
    it = @
    h.startAnimationLoop()
    @tween = new TWEEN.Tween(r: @radius*@rate, p: 0, lw: @radius*@fillRate)
      .to({r: @radius, p: 1, lw: 0}, @duration)
      .easing( TWEEN.Easing[@easingArr[0]][@easingArr[1]] )
      .onUpdate -> it.draw.call @, it
      .onComplete -> h.stopAnimationLoop()
      .delay(@delay).start()

  draw:(it)->
    ctx = it.ctx
    (@r < 0) and (@r = -@r)
    # if @lw > @r then @lw = @r
    ctx.clear()
    ctx.beginPath()
    ctx.arc(it.x, it.y, @r, 0, 2 * Math.PI, false)
    ctx.lineWidth = @lw*h.pixel
    ctx.strokeStyle = it.color
    ctx.stroke()
    @p is 1 and ctx.clear()


module.exports = do -> Bubble