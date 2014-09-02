Byte      = require './byte'


# TODO
class Burst extends Byte
  vars:->
    super
    Shape = @shapes[@shape.toLowerCase()] or Circle

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

    @canvasSize
      plusCoef: 2*Math.max(@bitRadius, @bitRadiusEnd) + 2
      mulCoef: 1

    @els ?= []; @els.length = 0
    for i in [0...@cnt]
      @els.push new Shape
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

  run:(@oa={})->
    super; it = @

    @from =
      rx: @radiusX
      ry: @radiusY
      bitAngle: @bitAngle
      lineWidth: @lineWidth
      bitRadius: @bitRadius
      degree: @degree
      angle: @angle
      spikes: @bitSpikesEnd
      bitRate: @bitRate
      lineDashOffset: @lineDashOffset
    @to =
      rx: 2*@radiusEndX
      ry: 2*@radiusEndY
      bitAngle: @bitAngleEnd
      lineWidth: @lineWidthEnd
      bitRadius: @bitRadiusEnd
      degree: @degreeEnd
      angle: @angleEnd
      spikes: @spikesEnd
      bitRate:     @bitRateEnd
      lineDashOffset: @lineDashOffsetEnd


    @mixStarSpikesProps()
    @mixLineDash()
    @mixColor()
    @mixFill()
    
    # fix this
    degreeCnt = if @degree % 360 is 0 then @cnt else @cnt-1


    rotStep  = @degree/degreeCnt
    @initTween().onUpdate ->
      it.ctx.clear()
      step = @degree/degreeCnt
      angle = 0
      rotAngle = 0
      for el, i in it.els
        rotation = (angle+it.angle+@angle)*it.h.DEG
        x = 2*it.center + Math.cos(rotation)*@rx
        y = 2*it.center + Math.sin(rotation)*@ry
        el.setProp
          position:   x:x, y:y
          angle:      (rotAngle) + @bitAngle
          lineWidth:  @lineWidth
          fillObj:    it.updateFill(@)
          radiusX:    @bitRadius
          radiusY:    @bitRadius
          spikes:     @spikes
          rate:       @bitRate
          lineDash:   it.updateLineDash(@)
          lineDashOffset: @lineDashOffset

        angle += step
        rotAngle += rotStep

  mixStarSpikesProps:->
    @from.spikes = @spikes
    @to.spikes   = @spikesEnd

    @from.rate = @rate
    @to.rate   = @rateEnd

module.exports = Burst