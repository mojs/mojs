require '../polyfills'
h  = require '../helpers'
Bit  = require './bit'
TWEEN  = require '../vendor/tween'

class Burst extends Bit
  run:(@oa={})->
    @vars()
    
    TWEEN.remove @tween ; TWEEN.remove @tween2; it = @

    from2 =
      r: @radius*@rate
      d: @rotate*h.deg/2
      strokeWidth: if @shrinkStroke then @strokeWidth/2 else @strokeWidth

    to2 =
      r: @radius-@radiusSlice
      d: @rotate*h.deg
      strokeWidth: if @shrinkStroke then 0 else @strokeWidth

    @tween2 = new TWEEN.Tween(from2)
      .to(to2, @duration/2)
      .easing( TWEEN.Easing[@easingArr[0]][@easingArr[1]] )
      .onUpdate -> it.drawLines2.call @, it
      .onComplete -> h.stopAnimationLoop()

    from =
      lw: @radius*@fillRate
      r:  @radius*@rate
      p:  0
      d:  0
      strokeWidth: @strokeWidth

    to =
      r: @radius-@radiusSlice
      p: 1
      lw: 0
      d: @rotate*h.deg/2
      strokeWidth: if @shrinkStroke then @strokeWidth/2 else @strokeWidth


    h.startAnimationLoop()
    @tween = new TWEEN.Tween(from)
      .to(to, @duration/2)
      .easing( TWEEN.Easing[@easingArr[0]][@easingArr[1]] )
      .onUpdate -> it.drawLines.call @, it
      .delay(@delay).start().delay(@delay2).chain(@tween2)

  vars:->
    super
    @default prop:'angle', def: 360
    @step = ((@angle/360)*2*Math.PI)/(@cnt)
    @rotateStep = (@angle/360)*360/(@cnt)
    @initialRotation = @default prop: 'initialRotation', def: 0
    @default 'delay2', 0
    @default prop: 'rotate', def: 0
    @radiusSlice = if @lineCap isnt 'butt' then @strokeWidth else 0

    @default prop: 'shrinkStroke', def: false

  drawLine:(o)->
    o.ctx.moveTo(o.point1.x,o.point1.y)
    o.ctx.lineTo(o.point2.x,o.point2.y)

  drawLines:(it)->
    ctx = it.ctx
    ctx.clear()
    ctx.beginPath()

    angle = it.initialRotation*h.deg

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
    ctx.lineWidth = @strokeWidth*h.pixel
    ctx.strokeStyle = it.color
    ctx.lineCap = it.lineCap
    ctx.stroke()

  drawLines2:(it)->
    ctx = it.ctx
    ctx.clear()
    ctx.beginPath()

    angle = it.initialRotation*h.deg

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
    ctx.lineWidth = @strokeWidth*h.pixel
    ctx.strokeStyle = it.color
    ctx.lineCap = it.lineCap
    @p is 1 and ctx.clear()
    ctx.stroke()


module.exports = Burst