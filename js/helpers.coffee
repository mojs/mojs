TWEEN  = require './vendor/tween'

class Helpers
  pixel: 2
  # SHORTCUTS
  doc:  document
  body: document.body
  deg: Math.PI/180
  s: 1

  time:(time)-> time*@s

  constructor:(@o={})-> @animationLoop = @animationLoop.bind @

  clone:(obj)->
    target = {}
    for key, value of obj
      target[key] = value
    target

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


