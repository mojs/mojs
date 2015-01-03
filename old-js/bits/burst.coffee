Byte      = require './byte'

# TODO
class Burst extends Byte
  vars:->
    super
    @Shape = @shapes[@shape.toLowerCase()] or Line

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

  run:(@oa={}, from)->
    super; it = @
    if !@oa.isChain
      @from =
        radiusX: @radiusX
        radiusY: @radiusY
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
      radiusX:     @radiusXEnd
      radiusY:     @radiusYEnd
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
    @mixPosition(@oa.isChain)
    @addElements()

    @degreeCnt = if @degree % 360 is 0 then @cnt else @cnt-1
    @rotStep    = @degree/@degreeCnt
  
    tween = @initTween(@oa.isChain).onUpdate -> it.draw.call(@, it)
    @tweens.push tween

  draw:(it)->
    degreeCnt = it.degreeCnt
    rotStep   = it.rotStep

    it.rotate angle: @angle*it.h.DEG
    it.ctx.clear()

    step = @degree/degreeCnt
    angle = 0
    rotAngle = 0
    for el, i in it.els
      rotation = (angle+it.angle)*it.h.DEG
      if it.isOwnContext
        x = 2*it.centerX + Math.cos(rotation)*@radiusX
        y = 2*it.centerY + Math.sin(rotation)*@radiusY
      else
        x = (@x or it.position.x) + Math.cos(rotation)*@radiusX
        y = (@y or it.position.y) + Math.sin(rotation)*@radiusY
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

    if it.isOwnContext
      if @x or @y then it.setPosition(@x or 0, @y or 0)

  addElements:->
    @els ?= []; @els.length = 0
    for i in [0...@cnt]
      @els.push new @Shape
        ctx: @ctx
        parentSize: x: @sizeX, y: @sizeY
        # position:   x: 2*@centerX, y: 2*@centerY
        isClearLess: true
        radius: @bitRadius
        color: @color
        fill: @fill
        spikes: @bitSpikes
        rate: @bitRate
        lineDash: @lineDash

  mixStarSpikesProps:->
    @from.spikes = @spikes
    @to.spikes   = @spikesEnd

    @from.rate = @rate
    @to.rate   = @rateEnd

module.exports = Burst





