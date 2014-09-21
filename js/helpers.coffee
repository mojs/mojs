TWEEN  = require './vendor/tween'

class Helpers
  pixel: 2
  # SHORTCUTS
  doc:  document
  body: document.body
  deg: Math.PI/180
  DEG: Math.PI/180
  s: 1

  time:(time)-> time*@s

  isFF:->    navigator.userAgent.toLowerCase().indexOf('firefox') > -1
  isIE:->    @isIE9l() or @isIE10g()
  isIE9l:->  navigator.userAgent.toLowerCase().indexOf('msie') > -1
  isIE10g:-> navigator.userAgent.toLowerCase().indexOf('rv') > -1
  
  constructor:(@o={})->
    @animationLoop = @animationLoop.bind @
    @div = document.createElement 'div'

    @computedStyle = (elem)->
      if window.getComputedStyle then getComputedStyle(elem, '')
      else elem.currentStyle

    @shortColors =
      aqua:   'rgb(0,255,255)'
      black:  'rgb(0,0,0)'
      blue:   'rgb(0,0,255)'
      fuchsia:'rgb(255,0,255)'
      gray:   'rgb(128,128,128)'
      green:  'rgb(0,128,0)'
      lime:   'rgb(0,255,0)'
      maroon: 'rgb(128,0,0)'
      navy:   'rgb(0,0,128)'
      olive:  'rgb(128,128,0)'
      purple: 'rgb(128,0,128)'
      red:    'rgb(255,0,0)'
      silver: 'rgb(192,192,192)'
      teal:   'rgb(0,128,128)'
      white:  'rgb(255,255,255)'
      yellow: 'rgb(255,255,0)'
      orange: 'rgb(255,128,0)'

  slice:(value, max)-> if value > max then max else value
  
  sliceMod:(value, max)->
    if value > 0 then (if value > max then max else value)
    else if value < -max then -max else value

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

  isObj:(obj)-> !!obj and (obj.constructor is Object)

  makeColorObj:(color)->
    # HEX
    if color[0] is '#'
      result = /^#?([a-f\d]{1,2})([a-f\d]{1,2})([a-f\d]{1,2})$/i.exec(color)
      colorObj = {}
      if result
        r = if result[1].length is 2 then result[1] else result[1]+result[1]
        g = if result[2].length is 2 then result[2] else result[2]+result[2]
        b = if result[3].length is 2 then result[3] else result[3]+result[3]
        colorObj =
          r: parseInt(r, 16)
          g: parseInt(g, 16)
          b: parseInt(b, 16)
          a: 1
    
    # not HEX
    # console.log color
    # shorthand color and rgb()
    if color[0] isnt '#'
      isRgb = color[0] is 'r' and color[1] is 'g' and color[2] is 'b'
      # rgb color
      if isRgb
        rgbColor = color
      # shorthand color name
      if !isRgb
        rgbColor = if !@shortColors[color]
          @div.style.color = color
          if @isFF() or @isIE() then @computedStyle(@div).color
          else @div.style.color
        else @shortColors[color]

      regexString1 = '^rgba?\\((\\d{1,3}),\\s?(\\d{1,3}),'
      regexString2 = '\\s?(\\d{1,3}),?\\s?(\\d{1}|0?\\.\\d{1,})?\\)$'
      result = new RegExp(regexString1 + regexString2, 'gi').exec(rgbColor)
      colorObj = {}
      alpha = parseFloat(result[4] or 1)
      if result
        colorObj =
          r: parseInt(result[1],10)
          g: parseInt(result[2],10)
          b: parseInt(result[3],10)
          a: if alpha? and !isNaN(alpha) then alpha else 1
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

  animationLoop:()->
    if !TWEEN.getAll().length then @isAnimateLoop = false
    return if !@isAnimateLoop
    TWEEN.update()
    requestAnimationFrame @animationLoop

  startAnimationLoop:->
    return if @isAnimateLoop
    @isAnimateLoop = true
    requestAnimationFrame @animationLoop

  stopAnimationLoop:->
    @isAnimateLoop = false

module.exports = do -> new Helpers


