Byte      = require './byte'
Circle    = require './circle'
Rectangle = require './rectangle'
Triangle  = require './triangle'
Star      = require './star'
Cross     = require './cross'
Line      = require './line'
ZigZag    = require './zigzag'
h         = require '../helpers'

# TODO
# fix safari
# test browsers

class Bubble extends Byte
  shapes:
    circle:    Circle
    rectangle: Rectangle
    triangle:  Triangle
    star:      Star
    cross:     Cross
    line:      Line
    zigzag:    ZigZag
  vars:->
    super
    @shape        = @default prop: 'shape',       def: 'circle'

    @degree       = @default prop: 'degree',       def: 360
    @degreeEnd    = @default prop: 'degreeEnd',    def: @degree
    
    @degreeOffset    = @default prop: 'degreeOffset',    def: 0
    @degreeOffsetEnd = @default prop: 'degreeOffsetEnd', def: @degreeOffset

    @degree    = h.slice @degree,    360
    @degreeEnd = h.slice @degreeEnd, 360

    @spikes    = @default prop: 'spikes',    def: 5
    @spikesEnd = @default prop: 'spikesEnd', def: @spikes
    
    @rate      = @default prop: 'rate',    def: .25
    @rateEnd   = @default prop: 'rateEnd', def: @rate

    if @shape isnt 'circle' and @shape isnt 'star' and @shape isnt 'cross'
      @canvasSize mulCoef: 1.484848

    if @shape is 'star' and (@starInnerRadius isnt @starInnerRadiusEnd)
      coef = if @starInnerRadiusEnd > 1 then @starInnerRadiusEnd else 1
      @canvasSize mulCoef: coef

    Shape = @shapes[@shape.toLowerCase()] or Circle

    @object = new Shape
      ctx: @ctx
      parentSize: x: @sizeX, y: @sizeY
      position: x: 2*@center, y: 2*@center
      rate:   @rate
      spikes: @spikes

  run:(@oa={})->
    super; it = @

    @from =
      rx:      @radiusX
      ry:      @radiusY
      lineW:   @lineWidth
      angle:   @angleStart
      degree:  @degree
      degreeOffset: @degreeOffset
      opacity: @opacity
    @to =
      rx:      @radiusEndX
      ry:      @radiusEndY
      lineW:   @lineWidthEnd
      angle:   @angleEnd
      degree:  @degreeEnd
      degreeOffset: @degreeOffsetEnd
      opacity: @opacityEnd

    if @shape.toLowerCase() is 'star'
      @mixStarSpikesProps()

    @mixLineDash()
    @mixColor()

    @initTween().onUpdate ->
      it.object.setProp
        radiusX:    @rx
        radiusY:    @ry
        lineWidth:  @lineW
        angle:      @angle
        degree:     @degree
        degreeOffset: @degreeOffset
        lineDash:   it.updateLineDash(@)
        colorObj:   it.updateColors(@)
        opacity:    @opacity
        spikes:     @spikes or 5
        rate: @rate

  mixStarSpikesProps:->
    @from.spikes = @spikes
    @to.spikes   = @spikesEnd

    @from.rate = @rate
    @to.rate   = @rateEnd

module.exports = Bubble