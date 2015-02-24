TWEEN = require './vendor/tween'

class Helpers
  TWEEN:  TWEEN
  logBadgeCss: 'background:#3A0839;color:#FF512F;border-radius:5px;
    padding: 1px 5px 2px; border: 1px solid #FF512F;'
  shortColors:
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
  # none-tweenable props
  chainOptionMap:
    duration:         1
    delay:            1
    repeat:           1
    easing:           1
    yoyo:             1
    onStart:          1
    onComplete:       1
    onCompleteChain:  1
    onUpdate:         1
    points:           1
  callbacksMap:
    onStart:          1
    onComplete:       1
    onCompleteChain:  1
    onUpdate:         1
  tweenOptionMap:
    duration:         1
    delay:            1
    repeat:           1
    easing:           1
    yoyo:             1
  posPropsMap:
    x:                1
    y:                1
    shiftX:           1
    shiftY:           1

    burstX:           1
    burstY:           1
    burstShiftX:      1
    burstShiftY:      1

  RAD_TO_DEG: 180/Math.PI
  constructor:-> @vars()
  vars:->
    @prefix = @getPrefix()
    @getRemBase()
    @isFF = @prefix.lowercase is 'moz'
    @isIE = @prefix.lowercase is 'ms'
    @isOldOpera = navigator.userAgent.match /presto/gim

    @div = document.createElement('div')
    document.body.appendChild @div

  cloneObj:(obj, exclude)->
    keys = Object.keys(obj); newObj = {}; i = keys.length
    while(i--)
      key = keys[i]
      # skip the keys defined in exclude object
      if exclude? then newObj[key] = obj[key] if !exclude[key]
      else newObj[key] = obj[key]
    newObj
  extend:(objTo, objFrom)->
    for key, value of objFrom
      objTo[key] ?= objFrom[key]
  getRemBase:->
    html = document.querySelector('html')
    style = getComputedStyle(html)
    @remBase = parseFloat style.fontSize

  clamp:(value, min, max)-> Math.min Math.max(value, min), max

  setPrefixedStyle:(el, name, value)->
    prefixedName            = "#{@prefix.css}#{name}"
    el.style[name]          = value
    el.style[prefixedName]  = value
  prepareForLog:(args)->
    args = Array::slice.apply args
    args.unshift('::'); args.unshift(@logBadgeCss); args.unshift('%cmo·js%c')
    args
  log:->    console.log.apply   console, @prepareForLog arguments
  warn:->   console.warn.apply  console, @prepareForLog arguments
  error:->  console.error.apply console, @prepareForLog arguments
  parseUnit:(value)->
    if typeof value is 'number'
      return returnVal =
        unit:     'px'
        value:   value
        string:   "#{value}px"
    else if typeof value is 'string'
      regex = /px|%|rem|em|ex|cm|ch|mm|in|pt|pc|vh|vw|vmin/gim
      unit = value.match(regex)?[0] or 'px'
      amount = parseFloat value
      return returnVal =
        unit:     unit
        value:    amount
        string:   "#{amount}#{unit}"
  bind:(func, context) ->
    wrapper = ->
      args = Array::slice.call(arguments)
      unshiftArgs = bindArgs.concat(args)
      func.apply context, unshiftArgs
    bindArgs = Array::slice.call(arguments, 2)
    wrapper
  getRadialPoint:(o={})->
    return if !o.radius? or !o.angle? or !o.center?
    radAngle = (o.angle-90)*(Math.PI/180)
    radiusX = if o.radiusX? then o.radiusX else o.radius
    radiusY = if o.radiusY? then o.radiusY else o.radius
    # console.log radiusX, radiusY
    point =
      x: o.center.x + (Math.cos(radAngle)*radiusX)
      y: o.center.y + (Math.sin(radAngle)*radiusY)
  getPrefix:->
    styles = window.getComputedStyle(document.documentElement, "")
    v = Array::slice.call(styles).join("").match(/-(moz|webkit|ms)-/)
    pre = (v or (styles.OLink is "" and [
      ""
      "o"
    ]))[1]
    dom = ("WebKit|Moz|MS|O").match(new RegExp("(" + pre + ")", "i"))[1]
    dom: dom
    lowercase: pre
    css: "-" + pre + "-"
    js: pre[0].toUpperCase() + pre.substr(1)
  strToArr:(string)->
    arr = []
    if typeof string is 'number' and !isNaN(string)
      arr.push string
      return arr
    string.trim().split(/\s+/gim).forEach (str)->
      number = parseFloat str
      if isNaN(number)
        throw Error 'Fail to parse strokeDasharray/strokeDashoffset value,
         check the syntax please'
      arr.push number
    arr
  calcArrDelta:(arr1, arr2)->
    if !arr1? or !arr2? then throw Error 'Two arrays should be passed'
    if !@isArray(arr1) or !@isArray(arr2) then throw Error 'Two arrays expected'
    delta = []
    for num, i in arr1
      delta[i] = arr2[i] - arr1[i]
    delta

  isArray:(variable)-> variable instanceof Array

  normDashArrays:(arr1, arr2)->
    if !arr1? or !arr2? then throw Error 'Two arrays should be passed'
    # newArr1 = arr1.slice(0); newArr2 = arr2.slice(0)
    arr1Len = arr1.length; arr2Len = arr2.length
    if arr1Len > arr2Len
      for i in [0...arr1Len-arr2Len]
        arr2.push 0
    else if arr2Len > arr1Len
      for i in [0...arr2Len-arr1Len]
        arr1.push 0
    [ arr1, arr2 ]

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
          if @isFF or @isIE or @isOldOpera
            style = @computedStyle(@div)
            @computedStyle(@div).color
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

  computedStyle:(el)-> getComputedStyle el

  splitEasing:(string)->
    return string if typeof string is 'function'
    if typeof string is 'string' and string.length
      split = string.split '.'
      firstPart   = @capitalize   split[0] or 'Linear'
      secondPart  = @capitalize   split[1] or 'None'
      [ firstPart, secondPart ]
    else ['Linear', 'None']
  capitalize:(str)->
    if typeof str isnt 'string'
      throw Error 'String expected - nothing to capitalize'
    str.charAt(0).toUpperCase() + str.substring(1)
  parseRand:(string)->
    randArr = string.split /rand\(|\,|\)/
    units = @parseUnit randArr[2]
    rand = @rand(parseFloat(randArr[1]), parseFloat(randArr[2]))
    if units.unit and randArr[2].match(units.unit)then rand + units.unit
    else rand
  parseIfRand:(str)->
    if typeof str is 'string' and str.match(/rand\(/) then @parseRand(str)
    else str
  parseDelta:(key, value)->
    # if delta object was passed: like { 20: 75 }
    start = Object.keys(value)[0]
    end   = value[start]
    delta = start: start
    # color values
    if isNaN(parseFloat(start)) and !start.match(/rand\(/)
      if key is 'strokeLinecap'
        @warn "Sorry, stroke-linecap property is not animatable
           yet, using the start(#{start}) value instead", value
        # @props[key] = start;
        return delta
      startColorObj = @makeColorObj start
      endColorObj   = @makeColorObj end
      delta  =
        start:  startColorObj
        end:    endColorObj
        type:   'color'
        delta:
          r: endColorObj.r - startColorObj.r
          g: endColorObj.g - startColorObj.g
          b: endColorObj.b - startColorObj.b
          a: endColorObj.a - startColorObj.a
    # color strokeDasharray/strokeDashoffset
    else if key is 'strokeDasharray' or key is 'strokeDashoffset'
      startArr  = @strToArr start
      endArr    = @strToArr end
      @normDashArrays startArr, endArr
      delta =
        start:  startArr
        end:    endArr
        delta:  @calcArrDelta startArr, endArr
        type:   'array'
    ## plain numeric value ##
    else
      ## filter tween-related properties
      # defined in helpers.chainOptionMap
      # because tween-related props shouldn't
      ## have deltas
      if !@chainOptionMap[key]
        # position values defined in posPropsMap
        if @posPropsMap[key]
          end   = @parseUnit @parseIfRand end
          start = @parseUnit @parseIfRand start
          delta =
            start:  start
            end:    end
            delta:  end.value - start.value
            type:   'unit'
          # @props[key] = start.string
        else
          # none position but numeric values
          end   = parseFloat @parseIfRand    end
          start = parseFloat @parseIfRand  start
          delta =
            start:  start
            end:    end
            delta:  end - start
            type:   'number'
          # @props[key] = start
      # else @props[key] = start
    delta

  rand:(min,max)-> (Math.random() * ((max) - min)) + min

h = new Helpers

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "Helpers", [], -> h
### istanbul ignore next ###
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = h
### istanbul ignore next ###
window?.mojs ?= {}
### istanbul ignore next ###
window?.mojs.helpers = h
