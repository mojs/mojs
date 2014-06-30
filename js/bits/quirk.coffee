h  = require '../helpers'
Bit  = require './bit'
TWEEN  = require '../vendor/tween'

class Quirk extends Bit
  run:(@oa={})->
    @vars()
    TWEEN.remove @tween
    TWEEN.remove @tween2
    it = @
    h.startAnimationLoop()

    from2 =
      angle: @angle*h.deg
      rotate: @direction*(@rotate/2)
    to2 =
      angle: 0
      rotate: @direction*@rotate

    @tween2 = new TWEEN.Tween(from2)
      .to(to2, @duration/2)
      .easing( TWEEN.Easing[@easingArr[0]][@easingArr[1]] )
      .onUpdate -> it.draw2.call @, it
      .onComplete -> h.stopAnimationLoop()

    from =
      angle: 0
      rotate: 0
    to =
      angle: @angle*h.deg
      rotate: @direction*(@rotate/2)

    @tween = new TWEEN.Tween(from)
      .to(to, @duration/2)
      .easing( TWEEN.Easing[@easingArr[0]][@easingArr[1]] )
      .onUpdate -> it.draw.call @, it
      .delay(@delay).start().delay(@delay2).chain(@tween2)

  vars:->
    super
    @default prop: 'angle',     def: 180
    @default prop: 'rotate',    def: 360
    @default prop: 'direction', def: 1

  draw:(it)->
    rotate = @rotate*h.deg
    startAngle = rotate-(@angle/2)
    endAngle = rotate+(@angle/2)
    ctx = it.ctx
    ctx.clear()
    ctx.beginPath()
    ctx.arc(it.x, it.y, it.radius-it.strokeWidth, startAngle, endAngle, false)
    ctx.lineWidth = it.strokeWidth*h.pixel
    ctx.lineCap = it.lineCap
    ctx.strokeStyle = it.color
    ctx.stroke()

  draw2:(it)->
    rotate = @rotate*h.deg
    startAngle = rotate-(@angle/2)
    endAngle = rotate+(@angle/2)
    ctx = it.ctx
    ctx.clear()
    ctx.beginPath()
    ctx.arc(it.x, it.y, it.radius-it.strokeWidth, startAngle, endAngle, false)
    ctx.lineWidth = it.strokeWidth*h.pixel
    ctx.lineCap = it.lineCap
    ctx.strokeStyle = it.color
    ctx.stroke()
    @p is 1 and ctx.clear()

module.exports = Quirk