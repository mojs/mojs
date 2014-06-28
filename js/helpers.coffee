class Helpers
  pixel: 1
  constructor:(@o={})->

  # SHORTCUTS
  doc:  document
  body: document.body

  getStyle:(el)->
    if window.getComputedStyle
      computedStyle = getComputedStyle(el, null)
    else
      computedStyle = el.currentStyle

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


