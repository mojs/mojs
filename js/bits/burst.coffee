Byte      = require './byte'


# TODO
#   size calculations
#   angle
#   degree

class Burst extends Byte
  vars:->
    super
    Shape = @shapes[@shape.toLowerCase()] or Circle

    @cnt          = @default prop: 'cnt', def: 3
    @degree       = @default prop: 'degree', def: 360
    @bitAngle     = @default prop: 'bitAngle', def: 0
    @bitAngleEnd  = @default prop: 'bitAngleEnd', def: @bitAngle

    @bitRadius     = @default prop: 'bitRadius',    def: 10
    @bitRadiusEnd  = @default prop: 'bitRadiusEnd', def: @bitRadius

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

  run:(@oa={})->
    super; it = @

    @from =
      rx: @radiusX
      ry: @radiusY
      bitAngle: @bitAngle
      lineWidth: @lineWidth
      bitRadius: @bitRadius
    @to =
      rx: @radiusEndX
      ry: @radiusEndY
      bitAngle: @bitAngleEnd
      lineWidth: @lineWidthEnd
      bitRadius: @bitRadiusEnd

    @mixStarSpikesProps()
    @mixLineDash()
    @mixColor()
    @mixFill()

    console.log @degree
    step = @degree/@cnt
    @initTween().onUpdate ->
      it.ctx.clear()
      angle = 0
      for el, i in it.els
        rotation = (angle+it.angle)*it.h.DEG
        x = 2*it.center + Math.cos(rotation)*@rx
        y = 2*it.center + Math.sin(rotation)*@ry
        el.setProp
          position: x:x, y:y
          angle: @bitAngle
          lineWidth: @lineWidth
          fillObj: it.updateFill(@)
          radiusX:  @bitRadius
          radiusY:  @bitRadius

        angle += step

  mixStarSpikesProps:->
    @from.spikes = @spikes
    @to.spikes   = @spikesEnd

    @from.rate = @rate
    @to.rate   = @rateEnd

module.exports = Burst