class Helpers
  pixel: 1
  constructor:(@o={})->
    console.log 'helpers'

  # SHORTCUTS
  doc:  document
  body: document.body

module.exports = do -> new Helpers



# extends:(child, parent) ->
#   ctor = ->
#     @constructor = child
#     return
#   for key of parent
#     child[key] = parent[key]  if __hasProp_.call(parent, key)
#   ctor:: = parent::
#   child:: = new ctor
#   child.__super__ = parent::
#   child

if !CanvasRenderingContext2D::clear
  CanvasRenderingContext2D::clear = (preserveTransform)->
    if preserveTransform
      @save()
      @setTransform 1, 0, 0, 1, 0, 0
    @clearRect 0, 0, @canvas.width, @canvas.height
    @restore()  if preserveTransform
    return



