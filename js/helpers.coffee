TWEEN  = require './vendor/tween'

class Helpers
  pixel: 2
  # SHORTCUTS
  doc:  document
  body: document.body

  constructor:(@o={})->
    @animationLoop = @animationLoop.bind @

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

  animationLoop: (time)->
    return if !@isAnimateLoop
    requestAnimationFrame @animationLoop
    TWEEN.update(time)

  startAnimationLoop:->
    return if @isAnimateLoop
    @isAnimateLoop = true
    @animationLoop()

  stopAnimationLoop:->
    @isAnimateLoop = false

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


