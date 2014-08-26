Byte   = require './byte'
Circle = require './circle'
Square = require './Square'
Line = require './line'
h = require '../helpers'

# TODO
# fix safari
# test browsers

class Bubble extends Byte

  vars:->
    super
    
    @degree       = @default prop: 'degree',       def: 360
    @degreeEnd    = @default prop: 'degreeEnd',    def: @degree
    
    @degreeOffset    = @default prop: 'degreeOffset',    def: 0
    @degreeOffsetEnd = @default prop: 'degreeOffsetEnd', def: @degreeOffset

    @degree    = h.slice @degree,    360
    @degreeEnd = h.slice @degreeEnd, 360

    @circle = new Square
      ctx: @ctx
      parentSize: x: @sizeX, y: @sizeY
      position: x: 2*@center, y: 2*@center

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

    @mixLineDash()
    @mixColor()
    @initTween().onUpdate ->
      it.circle.setProp
        radiusX: @rx
        radiusY: @ry
        lineWidth: @lineW
        angle: @angle
        degree: @degree
        degreeOffset: @degreeOffset
        lineDash: it.updateLineDash(@)
        colorObj: it.updateColors(@)
        opacity: @opacity

module.exports = Bubble