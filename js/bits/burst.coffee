require '../polyfills'
h  = require '../helpers'
Bit  = require './bit'


class Burst extends Bit
  run:(@oa={})->
    @vars()
    
    TWEEN.remove @tween
    TWEEN.remove @tween2
    it = @

    @tween2 = new TWEEN.Tween(r: @radius*@rate )
      .to({r: @radius }, @duration/2)
      .easing( TWEEN.Easing[@easingArr[0]][@easingArr[1]] )
      .onUpdate -> it.draw2.call @, it

    @tween = new TWEEN.Tween(r: @radius*@rate, p: 0, lw: @radius*@fillRate)
      .to({r: @radius, p: 1, lw: 0}, @duration/2)
      .easing( TWEEN.Easing[@easingArr[0]][@easingArr[1]] )
      .onUpdate -> it.draw.call @, it
      .delay(@delay).chain(@tween2).start()

  vars:->
    super
    @degreeRate = 1
    @step = (@degreeRate*2*Math.PI)/(@cnt)
    @rotateStep = @degreeRate*360/(@cnt)
    @bitWidth = @default(prop: 'bitWidth', def: 1)
    @initialRotation = @default prop: 'initialRotation', def: 0
    h.lock
      lock: 'isRotationLock'
      fun:=>
        @initialRotation *= Math.PI/180

    # @initialRotation = (2*Math.PI/360)*@initialRotation

  draw:(it)->
    ctx = it.ctx
    ctx.clear()
    ctx.beginPath()

    rotateAngle = 0
    angle = it.initialRotation

    for i in [0..it.cnt]
      x1  = it.x+(Math.cos(angle)*(it.radius*it.rate))
      y1   = it.y+(Math.sin(angle)*(it.radius*it.rate))
      x2  = it.x+(Math.cos(angle)*(@r))
      y2   = it.y+(Math.sin(angle)*(@r))
      it.drawLine
        point1: { x: x1, y: y1 }
        point2: { x: x2, y: y2 }
        ctx: ctx
      rotateAngle += it.rotateStep
      angle += it.step
    
    ctx.stroke()
    # ctx.arc(it.x, it.y, @r, 0, 2 * Math.PI, false)
    ctx.lineWidth = it.bitWidth*h.pixel
    ctx.strokeStyle = it.color
    ctx.stroke()
    # @p is 1 and ctx.clear()

  drawLine:(o)->
    o.ctx.moveTo(o.point1.x,o.point1.y)
    o.ctx.lineTo(o.point2.x,o.point2.y)

  draw2:(it)->
    ctx = it.ctx
    ctx.clear()
    ctx.beginPath()

    rotateAngle = 0
    angle = it.initialRotation

    for i in [0..it.cnt]
      x1  = it.x+(Math.cos(angle)*(@r))
      y1   = it.y+(Math.sin(angle)*(@r))
      x2  = it.x+(Math.cos(angle)*(it.radius))
      y2   = it.y+(Math.sin(angle)*(it.radius))
      it.drawLine
        point1: { x: x1, y: y1 }
        point2: { x: x2, y: y2 }
        ctx: ctx
      rotateAngle += it.rotateStep
      angle += it.step
    
    ctx.stroke()
    # ctx.arc(it.x, it.y, @r, 0, 2 * Math.PI, false)
    ctx.lineWidth = it.bitWidth*h.pixel
    ctx.strokeStyle = it.color
    ctx.stroke()




module.exports = do -> Burst