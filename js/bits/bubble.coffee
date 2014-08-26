Byte   = require './byte'
Circle = require './circle'
Line = require './line'
h = require '../helpers'

# TODO
# fix safari
# test browsers

class Bubble extends Byte

  vars:->
    super
    @circle = new Circle
      ctx: @ctx
      parentSize: x: @sizeX, y: @sizeY
      position: x: 2*@center, y: 2*@center

  run:(@oa={})->
    super
    it = @

    @from =
      rx: @radiusX
      ry: @radiusY
      lineW:   @lineWidth
      angle:   @angleStart
      degree:  @degree
      degreeOffset: @degreeOffset
      opacity: @opacity
    @to =
      rx: @radiusEndX
      ry: @radiusEndY
      lineW:   @lineWidthEnd
      angle:   @angleEnd
      degree:  @degreeEnd
      degreeOffset: @degreeOffsetEnd
      opacity: @opacityEnd

    @mixLineDash()
    @mixColor()

    it.colorObjTween = h.clone @colorObj
    tween = new @TWEEN.Tween(@from).to(@to,@duration*@s)
      .delay(@delay*@s)
      .onUpdate ->
        i = 0; lineDash = []
        it.that()
        if it.lineDash and it.lineDashEnd
          for key, val of @
            if key is 'lineDash0' or key is "lineDash#{i}"
              lineDash.push val
              i++

        it.colorObjTween.r = parseInt(@r,10)
        it.colorObjTween.g = parseInt(@g,10)
        it.colorObjTween.b = parseInt(@b,10)
        it.colorObjTween.a = parseInt(@a,10)
        it.circle.setProp
          radiusX: @rx
          radiusY: @ry
          lineWidth: @lineW
          angle: @angle
          degree: @degree
          degreeOffset: @degreeOffset
          lineDash: lineDash
          colorObj: it.colorObjTween
          opacity: @opacity

        # console.log @lineW
      .easing @TWEEN.Easing[@easings[0]][@easings[1]]
      .repeat(@repeat-1)
      .yoyo(@yoyo)
      .start()

    @tweens.push tween

module.exports = Bubble