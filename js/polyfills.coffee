module.exports = do ->
  # clear canvas fun
  if !CanvasRenderingContext2D::clear
    CanvasRenderingContext2D::clear = (preserveTransform)->
      if preserveTransform
        @save()
        @setTransform 1, 0, 0, 1, 0, 0
      @clearRect 0, 0, @canvas.width, @canvas.height
      @restore()  if preserveTransform
      return


