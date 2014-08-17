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

  slice:(value, max)-> if value > max then max else value

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

  rand:(min,max)-> Math.floor((Math.random() * ((max + 1) - min)) + min)

  bind:(func, context) ->
    wrapper = ->
      args = Array::slice.call(arguments)
      unshiftArgs = bindArgs.concat(args)
      func.apply context, unshiftArgs
    bindArgs = Array::slice.call(arguments, 2)
    wrapper

  makeColorObj:(hex) ->
    result = /^#?([a-f\d]{1,2})([a-f\d]{1,2})([a-f\d]{1,2})$/i.exec(hex)
    colorObj = {}
    if result
      r = if result[1].length is 2 then result[1] else result[1]+result[1]
      g = if result[2].length is 2 then result[2] else result[2]+result[2]
      b = if result[3].length is 2 then result[3] else result[3]+result[3]
      colorObj =
        r: parseInt(r, 16)
        g: parseInt(g, 16)
        b: parseInt(b, 16)
    colorObj

  size:(obj)->
    i = 0
    for key, value of obj
      i++
    i

  isSizeChange:(o)->
    isRadius = o.radiusStart or o.radiusEnd
    isRadiusAxes1 = o.radiusStartX or o.radiusStartY
    isRadiusAxes2 = o.radiusEndX or o.radiusEndX
    isLineWidth = o.lineWidth or o.lineWidthMiddle or o.lineWidthEnd

    isRadius or isRadiusAxes1 or isRadiusAxes2 or isLineWidth

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


