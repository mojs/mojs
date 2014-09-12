Byte      = require './byte'

# TODO
class Burst extends Byte
  vars:->
    super
    @Shape = @shapes[@shape.toLowerCase()] or Circle

    @cnt          = @default prop: 'cnt', def: 3
    @degree       = @default prop: 'degree', def: 360
    @degreeEnd    = @default prop: 'degreeEnd', def: @degree
    @bitSpikes       = @default prop: 'bitSpikes', def: 5
    @bitSpikesEnd    = @default prop: 'bitSpikesEnd', def: @bitSpikes
    @bitAngle     = @default prop: 'bitAngle', def: 0
    @bitAngleEnd  = @default prop: 'bitAngleEnd', def: @bitAngle

    @bitRate     = @default prop: 'bitRate', def: .5
    @bitRateEnd  = @default prop: 'bitRateEnd', def: @bitRate

    @bitRadius     = @default prop: 'bitRadius',    def: 10
    @bitRadiusEnd  = @default prop: 'bitRadiusEnd', def: @bitRadius
    
    @lineDashOffset = @default prop: 'lineDashOffset', def: 0
    @lineDashOffsetEnd = @default prop: 'lineDashOffsetEnd', def:@lineDashOffset


  run:(@oa={}, from)->
    super; it = @
    if !@oa.isChain
      @from =
        radiusX: 2*@radiusX
        radiusY: 2*@radiusY
        bitAngle: @bitAngle
        lineWidth: @lineWidth
        bitRadius: @bitRadius
        degree: @degree
        angle: @angle
        spikes: @bitSpikesEnd
        bitRate: @bitRate
        lineDashOffset: @lineDashOffset
    else @from = from
    @to =
      radiusX:     2*@radiusXEnd
      radiusY:     2*@radiusYEnd
      bitAngle:    @bitAngleEnd
      lineWidth:   @lineWidthEnd
      bitRadius:   @bitRadiusEnd
      degree:      @degreeEnd
      angle:       @angleEnd
      spikes:      @spikesEnd
      bitRate:     @bitRateEnd
      lineDashOffset: @lineDashOffsetEnd

    @mixStarSpikesProps()
    @mixLineDash()
    @mixColor(@oa.isChain)
    @mixFill(@oa.isChain)
    
    @calcSize()
    
    @addElements()
  
    @degreeCnt = if @degree % 360 is 0 then @cnt else @cnt-1
    @rotStep    = @degree/@degreeCnt
  
    @tween = @initTween(@oa.isChain).onUpdate -> it.draw.call(@, it)

  draw:(it)->
    # console.log 'draw'
    degreeCnt = it.degreeCnt
    rotStep   = it.rotStep

    it.rotate angle: @angle*it.h.DEG
    it.ctx.clear()

    step = @degree/degreeCnt
    angle = 0
    rotAngle = 0
    for el, i in it.els
      rotation = (angle+it.angle)*it.h.DEG
      x = 2*it.center + Math.cos(rotation)*@radiusX
      y = 2*it.center + Math.sin(rotation)*@radiusY
      el.setProp
        position:   x:x, y:y
        angle:      (rotAngle) + @bitAngle
        lineWidth:  @lineWidth
        fillObj:    it.updateFill(@)
        colorObj:   it.updateColor(@)
        radiusX:    @bitRadius
        radiusY:    @bitRadius
        spikes:     @spikes
        rate:       @bitRate
        lineDash:   it.updateLineDash(@)
        lineDashOffset: @lineDashOffset
      angle += step
      rotAngle += rotStep
    it.ctx.restore()

  addElements:->
    @els ?= []; @els.length = 0
    for i in [0...@cnt]
      @els.push new @Shape
        ctx: @ctx
        parentSize: x: @sizeX, y: @sizeY
        position:   x: 2*@center, y: 2*@center
        isClearLess: true
        radius: @bitRadius
        color: @color
        fill: @fill
        spikes: @bitSpikes
        rate: @bitRate
        lineDash: @lineDash
    
  rotate:(o)->
    @ctx.save()
    @ctx.translate(2*@centerX,2*@centerY)
    @ctx.rotate(o.angle)
    @ctx.translate(-2*@centerX,-2*@centerY)

  mixStarSpikesProps:->
    @from.spikes = @spikes
    @to.spikes   = @spikesEnd

    @from.rate = @rate
    @to.rate   = @rateEnd

module.exports = Burst