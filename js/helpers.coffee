class Helpers
  pixel: 2
  constructor:(@o={})->

  # SHORTCUTS
  doc:  document
  body: document.body

  getStyle:(el)->
    if window.getComputedStyle
      computedStyle = getComputedStyle(el, null)
    else
      computedStyle = el.currentStyle

  rand:(min,max)->
    Math.floor((Math.random() * ((max + 1) - min)) + min)

  lock:(o)->
    !@[o.lock] and o.fun()
    @[o.lock] = true
  unlock:(o)->
    @[o.lock] = false

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


