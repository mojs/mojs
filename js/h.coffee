class Helpers
  div:    document.createElement 'div'
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
  constructor:-> @vars()
  vars:->
    @prefix = @getPrefix()
    @isFF = @prefix.lowercase is 'moz'
    @isIE = @prefix.lowercase is 'ms'
  getRadialPoint:(o={})->
    return if !o.radius? or !o.angle? or !o.center?
    radAngle = (o.angle-90)*(Math.PI/180)
    point =
      x: o.center.x + (Math.cos(radAngle)*o.radius)
      y: o.center.y + (Math.sin(radAngle)*o.radius)
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
          if @isFF or @isIE then @computedStyle(@div).color
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

  # stylePropsMap:
  #   # width:              1
  #   # height:             1
  #   fill:               1
  #   fillOpacity:        1
  #   opacity:            1
  #   stroke:             1
  #   strokeWidth:        1
  #   strokeDasharray:    1
  #   strokeOffset:       1
  #   strokeLinejoin:     1
  #   strokeLinecap:      1

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "Helpers", [], -> new Helpers
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = new Helpers
### istanbul ignore next ###
window?.mojs ?= {}
window?.mojs.helpers = new Helpers

