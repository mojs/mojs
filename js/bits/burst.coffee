require '../polyfills'
h  = require '../helpers'
Bit  = require './bit'


class Burst extends Bit
  run:(@oa={})->
    @vars()
    
    TWEEN.remove @tween
    TWEEN.remove @tween2
    it = @
    @tween2 = new TWEEN.Tween(r: @radius*@rate, d: @rotate/2 )
      .to({r: @radius-@radiusSlice, d: @rotate }, @duration/2)
      .easing( TWEEN.Easing[@easingArr[0]][@easingArr[1]] )
      .onUpdate -> it.draw2.call @, it

    from =
      lw: @radius*@fillRate
      r:  @radius*@rate
      p:  0
      d:  0

    @tween = new TWEEN.Tween(from)
      .to({r: @radius-@radiusSlice, p: 1, lw: 0, d: @rotate/2 }, @duration/2)
      .easing( TWEEN.Easing[@easingArr[0]][@easingArr[1]] )
      .onUpdate -> it.draw.call @, it
      .delay(@delay).start().delay(@delay2).chain(@tween2)

  vars:->
    super
    @degreeRate = 1
    @step = (@degreeRate*2*Math.PI)/(@cnt)
    @rotateStep = @degreeRate*360/(@cnt)
    @bitWidth = @default(prop: 'bitWidth', def: 1)
    @initialRotation = @default prop: 'initialRotation', def: 0
    @default 'delay2', 0
    h.lock
      lock: 'burstRotationLock'
      fun:=> @initialRotation *= Math.PI/180

    @default prop: 'rotate', def: 0
    @oa.rotate? and h.unlock lock: 'burstRotateLock'
    h.lock
      lock: 'burstRotateLock'
      fun:=> @rotate *= Math.PI/180

    @radiusSlice = if @lineCap isnt 'butt' then @bitWidth else 0

  draw:(it)->
    ctx = it.ctx
    ctx.clear()
    ctx.beginPath()

    angle = it.initialRotation

    for i in [0..it.cnt]
      x1  = it.x+(Math.cos(angle+@d)*(it.radius*it.rate))
      y1   = it.y+(Math.sin(angle+@d)*(it.radius*it.rate))
      x2  = it.x+(Math.cos(angle+@d)*(@r))
      y2   = it.y+(Math.sin(angle+@d)*(@r))
      it.drawLine
        point1: { x: x1, y: y1 }
        point2: { x: x2, y: y2 }
        ctx: ctx
      angle += it.step
    
    ctx.stroke()
    # ctx.arc(it.x, it.y, @r, 0, 2 * Math.PI, false)
    ctx.lineWidth = it.bitWidth*h.pixel
    ctx.strokeStyle = it.color
    ctx.lineCap = it.lineCap
    ctx.stroke()
    # @p is 1 and ctx.clear()

  drawLine:(o)->
    o.ctx.moveTo(o.point1.x,o.point1.y)
    o.ctx.lineTo(o.point2.x,o.point2.y)

  draw2:(it)->
    ctx = it.ctx
    ctx.clear()
    ctx.beginPath()

    angle = it.initialRotation

    for i in [0..it.cnt]
      x1  = it.x+(Math.cos(angle+@d)*(@r))
      y1  = it.y+(Math.sin(angle+@d)*(@r))
      x2  = it.x+(Math.cos(angle+@d)*(it.radius-it.radiusSlice))
      y2  = it.y+(Math.sin(angle+@d)*(it.radius-it.radiusSlice))
      it.drawLine
        point1: { x: x1, y: y1 }
        point2: { x: x2, y: y2 }
        ctx: ctx
      angle += it.step
    
    ctx.stroke()
    ctx.lineWidth = it.bitWidth*h.pixel
    ctx.strokeStyle = it.color
    ctx.lineCap = it.lineCap
    @p is 1 and ctx.clear()
    ctx.stroke()




module.exports = do -> Burst