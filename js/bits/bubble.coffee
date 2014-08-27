Byte      = require './byte'
Circle    = require './circle'
Rectangle = require './rectangle'
Triangle  = require './triangle'
Star      = require './star'
Cross     = require './cross'
Line      = require './line'
h         = require '../helpers'

# TODO
# fix safari
# test browsers

class Bubble extends Byte
  vars:->
    super
    @shape        = @default prop: 'shape',       def: 'circle'

    @degree       = @default prop: 'degree',       def: 360
    @degreeEnd    = @default prop: 'degreeEnd',    def: @degree
    
    @degreeOffset    = @default prop: 'degreeOffset',    def: 0
    @degreeOffsetEnd = @default prop: 'degreeOffsetEnd', def: @degreeOffset

    @degree    = h.slice @degree,    360
    @degreeEnd = h.slice @degreeEnd, 360

    @starSpikes    = @default prop: 'starSpikes',    def: 5
    @starSpikesEnd = @default prop: 'starSpikesEnd', def: @starSpikes

    @starInnerRadius    = @default prop: 'starInnerRadius',    def: .5
    def = @starInnerRadius
    @starInnerRadiusEnd = @default prop: 'starInnerRadiusEnd', def: def

    if @shape isnt 'circle' and @shape isnt 'star' and @shape isnt 'cross'
      @canvasSize mulCoef: 1.484848

    if @shape is 'star' and (@starInnerRadius isnt @starInnerRadiusEnd)
      coef = if @starInnerRadiusEnd > 1 then @starInnerRadiusEnd else 1
      @canvasSize mulCoef: coef

    Shape = switch @shape.toLowerCase()
      when 'circle'
        Circle
      when 'rectangle'
        Rectangle
      when 'triangle'
        Triangle
      when 'star'
        Star
      when 'cross'
        Cross
      else Circle

    @circle = new Shape
      ctx: @ctx
      parentSize: x: @sizeX, y: @sizeY
      position: x: 2*@center, y: 2*@center

  mixStarSpikesProps:->
    @from.spikes = @starSpikes
    @to.spikes   = @starSpikesEnd

    @from.innerRadius = @starInnerRadius
    @to.innerRadius   = @starInnerRadiusEnd

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
      it.circle.setProp
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
        innerRadius: @innerRadius

module.exports = Bubble