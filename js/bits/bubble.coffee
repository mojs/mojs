Byte      = require './byte'

class Bubble extends Byte
  vars:->
    super

    @degree       = @default prop: 'degree',       def: 360
    @degreeEnd    = @default prop: 'degreeEnd',    def: @degree
    
    @degreeOffset    = @default prop: 'degreeOffset',    def: 0
    @degreeOffsetEnd = @default prop: 'degreeOffsetEnd', def: @degreeOffset

    @degree    = @h.slice @degree,    360
    @degreeEnd = @h.slice @degreeEnd, 360

    @spikes    = @default prop: 'spikes',    def: 5
    @spikesEnd = @default prop: 'spikesEnd', def: @spikes

    @rate      = @default prop: 'rate',    def: .25
    @rateEnd   = @default prop: 'rateEnd', def: @rate

    # if @shape isnt 'circle' and @shape isnt 'star' and @shape isnt 'cross'
    #   @canvasSize mulCoef: 1.484848

    # if @shape is 'star' and (@starInnerRadius isnt @starInnerRadiusEnd)
    #   coef = if @starInnerRadiusEnd > 1 then @starInnerRadiusEnd else 1
    #   @canvasSize mulCoef: coef


  run:(@oa={}, from)->
    super; it = @
    if !@oa.isChain
      @from =
        radiusX:      2*@radiusX
        radiusY:      2*@radiusY
        lineWidth:   @lineWidth
        angle:   @angleStart
        degree:  @degree
        degreeOffset: @degreeOffset
        opacity: @opacity
        lineDashOffset: @lineDashOffset
    else @from = from
    @to =
      radiusX:      2*@radiusXEnd
      radiusY:      2*@radiusYEnd
      lineWidth:   @lineWidthEnd
      angle:   @angleEnd
      degree:  @degreeEnd
      degreeOffset: @degreeOffsetEnd
      opacity: @opacityEnd
      lineDashOffset: @lineDashOffsetEnd

    @mixStarSpikesProps()
    @mixLineDash()
    @mixColor(@oa.isChain)
    @mixFill(@oa.isChain)

    @calcSize()
    
    @addElements()

    @tween = @initTween(@oa.isChain).onUpdate -> it.draw.call(@, it)

  draw:(it)->
    it.rotate angle: @angle*it.h.DEG

    it.object.setProp
      radiusX:    @radiusX/2
      radiusY:    @radiusY/2
      position:   x: 2*it.center, y: 2*it.center
      lineWidth:  @lineWidth
      # angle:      @angle
      # degree:     @degree
      # degreeOffset: @degreeOffset
      # lineDash:   it.updateLineDash(@)
      # colorObj:   it.updateColor(@)
      fillObj:   it.updateFill(@)
      # opacity:    @opacity
      # spikes:     @spikes
      # rate:       @rate
      # lineDashOffset: @lineDashOffset

    it.ctx.restore()


  addElements:->
    Shape = @shapes[@shape.toLowerCase()] or Circle

    @object = new Shape
      ctx: @ctx
      position:   x: @center, y: @center
      rate:     @rate
      lineCap: @lineCap
      # spikes:   @spikes
      lineDash: @lineDash
      fill:     @fill

  mixStarSpikesProps:->
    @from.spikes = @spikes
    @to.spikes   = @spikesEnd

    @from.rate = @rate
    @to.rate   = @rateEnd

module.exports = Bubble