# Utils methods and map objects
#
# @class Helpers
class Helpers
  # ---

  # SVG namespace
  # 
  # @property   NS
  # @type       {String}
  NS: 'http://www.w3.org/2000/svg'
  # ---

  # CSS styles for console.log/warn/error ::mojs:: badge styling
  #
  # @property   logBadgeCss
  # @type       {String}
  logBadgeCss: 'background:#3A0839;color:#FF512F;border-radius:5px;
    padding: 1px 5px 2px; border: 1px solid #FF512F;'
  # ---

  # Shortcut map for the 16 standart web colors
  # used to coerce literal name to rgb
  #
  # @property   shortColors
  # @type       {Object}
  # REMOVE WHEN ALL MODULES WILL USE DELTAS CLASS
  shortColors:
    transparent: 'rgba(0,0,0,0)'
    none:        'rgba(0,0,0,0)'
    aqua:        'rgb(0,255,255)'
    black:       'rgb(0,0,0)'
    blue:        'rgb(0,0,255)'
    fuchsia:     'rgb(255,0,255)'
    gray:        'rgb(128,128,128)'
    green:       'rgb(0,128,0)'
    lime:        'rgb(0,255,0)'
    maroon:      'rgb(128,0,0)'
    navy:        'rgb(0,0,128)'
    olive:       'rgb(128,128,0)'
    purple:      'rgb(128,0,128)'
    red:         'rgb(255,0,0)'
    silver:      'rgb(192,192,192)'
    teal:        'rgb(0,128,128)'
    white:       'rgb(255,255,255)'
    yellow:      'rgb(255,255,0)'
    orange:      'rgb(255,128,0)'
  # ---
  # none-tweenable props
  chainOptionMap: {} # callbacksContext: 1
  callbacksMap:
    onRefresh:        1
    onStart:          1
    onComplete:       1
    onFirstUpdate:    1
    onUpdate:         1
    onProgress:       1
    onRepeatStart:    1
    onRepeatComplete: 1
    onPlaybackStart:    1
    onPlaybackPause:    1
    onPlaybackStop:     1
    onPlaybackComplete: 1
  tweenOptionMap:
    duration:         1
    delay:            1
    speed:            1
    repeat:           1
    easing:           1
    backwardEasing:   1
    isYoyo:           1
    shiftTime:        1
    isReversed:       1
    callbacksContext: 1
  unitOptionMap:
    left:             1
    top:              1
    x:                1
    y:                1
    rx:               1
    ry:               1
  # strokeDashPropsMap:
  #   strokeDasharray:  1
  #   # strokeDashoffset: 1
  RAD_TO_DEG: 180/Math.PI
  # DEG_TO_RAD: Math.PI/180
  constructor:-> @vars()
  vars:->
    @prefix = @getPrefix()
    @getRemBase()
    @isFF = @prefix.lowercase is 'moz'; @isIE = @prefix.lowercase is 'ms'
    ua = navigator.userAgent
    @isOldOpera = ua.match /presto/gim
    @isSafari   = ua.indexOf('Safari') > -1
    @isChrome   = ua.indexOf('Chrome') > -1
    @isOpera    = ua.toLowerCase().indexOf("op") > -1
    @isChrome and @isSafari   and (@isSafari = false)
    (ua.match /PhantomJS/gim) and (@isSafari = false)
    @isChrome and @isOpera  and (@isChrome = false)
    @is3d = @checkIf3d()

    @uniqIDs = -1

    @div = document.createElement('div')
    document.body.appendChild @div

    @defaultStyles = @computedStyle @div

  # ---

  # Clones object by iterating thru object properties
  #
  # @method cloneObj
  # @param {Object} to clone
  # @param {Object} with key names that will be excluded
  #                 from the new object, key value should
  #                 be truthy
  # @example
  #   h.cloneObj({ foo: 'bar', baz: 'bar' }, { baz: 1 })
  #   // result: { foo: 'bar' }
  # @return {Object} new object
  cloneObj:(obj, exclude)->
    keys = Object.keys(obj); newObj = {}; i = keys.length
    while(i--)
      key = keys[i]
      if exclude? then newObj[key] = obj[key] if !exclude[key]
      else newObj[key] = obj[key]
    newObj
  # ---

  # Copies keys and values from the second object to the first if
  # key was not defined on the first object
  #
  # @method extend
  #
  # @param {Object} to copy values to
  # @param {Object} from copy values from
  #
  # @example
  #   var objA = { foo: 'bar' }, objB = { baz: 'bax' };
  #   h.extend(objA, objB)
  #   // result: objA{ foo: 'bar', baz: 'bax' }
  #
  # @return {Object} the first modified object
  extend:(objTo, objFrom)->
    for key, value of objFrom
      objTo[key] ?= objFrom[key]
    objTo

  getRemBase:->
    html = document.querySelector('html')
    style = getComputedStyle(html)
    @remBase = parseFloat style.fontSize

  clamp:(value, min, max)->
    if value < min then min else if value > max then max else value
    # Math.min Math.max(value, min), max
  setPrefixedStyle:(el, name, value)->
    (name is 'transform') and (el.style["#{@prefix.css}#{name}"] = value)
    el.style[name] = value
  # ---
  # 
  # Sets styles on element with prefix(if needed) on el
  # 
  # @method style
  # @param {DOMNode}          element to set the styles on
  # @param {String, Object}   style name or style: value object
  # @param {String}           style value
  # @example
  #   h.style(el, 'width', '20px')
  # @example
  #   h.style(el, { width: '20px', height: '10px' })
  style:(el, name, value)->
    if typeof name is 'object'
      keys = Object.keys(name); len = keys.length
      while(len--)
        key = keys[len]; value = name[key]
        @setPrefixedStyle el, key, value
    else @setPrefixedStyle el, name, value

  prepareForLog:(args)->
    args = Array::slice.apply args
    args.unshift('::'); args.unshift(@logBadgeCss); args.unshift('%cmo·js%c')
    args
  log:->
    return if mojs.isDebug is false
    console.log.apply console, @prepareForLog arguments
  warn:->
    return if mojs.isDebug is false
    console.warn.apply console, @prepareForLog arguments
  error:->
    return if mojs.isDebug is false
    console.error.apply console, @prepareForLog arguments
  parseUnit:(value)->
    if typeof value is 'number'
      return returnVal =
        unit:     'px'
        isStrict: false
        value:    value
        string:   if value is 0 then "#{value}" else "#{value}px"
    else if typeof value is 'string'
      regex = /px|%|rem|em|ex|cm|ch|mm|in|pt|pc|vh|vw|vmin|deg/gim
      unit = value.match(regex)?[0]; isStrict = true
      # if a plain number was passed set isStrict to false and add px
      if !unit then unit = 'px'; isStrict = false
      amount = parseFloat value
      return returnVal =
        unit:     unit
        isStrict: isStrict
        value:    amount
        string:   if amount is 0 then "#{amount}" else "#{amount}#{unit}"
    value
  bind:(func, context) ->
    wrapper = ->
      args = Array::slice.call(arguments)
      unshiftArgs = bindArgs.concat(args)
      func.apply context, unshiftArgs
    bindArgs = Array::slice.call(arguments, 2)
    wrapper
  getRadialPoint:(o={})->
    # return if !o.radius? or !o.angle? or !o.center?
    radAngle = (o.angle-90)*0.017453292519943295 # Math.PI/180
    radiusX = if o.radiusX? then o.radiusX else o.radius
    radiusY = if o.radiusY? then o.radiusY else o.radius
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
    # plain number
    if typeof string is 'number' and !isNaN(string)
      arr.push @parseUnit string
      return arr
    # string array
    string.trim().split(/\s+/gim).forEach (str)=>
      arr.push @parseUnit @parseIfRand str
    arr
  
  calcArrDelta:(arr1, arr2)->
    # if !arr1? or !arr2? then throw Error 'Two arrays should be passed'
    # if !@isArray(arr1)or!@isArray(arr2) then throw Error 'Two arrays expected'
    delta = []
    for num, i in arr1
      delta[i] = @parseUnit "#{arr2[i].value - arr1[i].value}#{arr2[i].unit}"
    delta

  isArray:(variable)-> variable instanceof Array

  normDashArrays:(arr1, arr2)->
    # if !arr1? or !arr2? then throw Error 'Two arrays should be passed'
    arr1Len = arr1.length; arr2Len = arr2.length
    if arr1Len > arr2Len
      lenDiff = arr1Len-arr2Len; startI = arr2.length
      for i in [0...lenDiff]
        currItem = i + startI
        arr2.push @parseUnit "0#{arr1[currItem].unit}"
    else if arr2Len > arr1Len
      lenDiff = arr2Len-arr1Len; startI = arr1.length
      for i in [0...lenDiff]
        currItem = i + startI
        arr1.push @parseUnit "0#{arr2[currItem].unit}"
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
          @computedStyle(@div).color
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
  parseStagger:(string, index)->
    value = string.split(/stagger\(|\)$/)[1].toLowerCase()
    # split the value in case it contains base
    # the regex splits 0,0 0,1 1,0 1,1 combos
    # if num taken as 1, rand() taken as 0
    splittedValue = value.split(/(rand\(.*?\)|[^\(,\s]+)(?=\s*,|\s*$)/gim)
    # if contains the base value
    value = if splittedValue.length > 3
      base = @parseUnit(@parseIfRand(splittedValue[1])); splittedValue[3]
    # if just a plain value
    else base = @parseUnit(0); splittedValue[1]
    
    value = @parseIfRand(value)
    # parse with units
    unitValue = @parseUnit(value)
    number = index*unitValue.value + base.value
    # add units only if option had a unit before
    unit = if base.isStrict then base.unit
    else if unitValue.isStrict then unitValue.unit else ''
    
    if unit then "#{number}#{unit}" else number

  # ---

  # Method to parse stagger or return the passed value if
  # it has no stagger expression in it.
  parseIfStagger:(value, i)->
    if !(typeof value is 'string' and value.match /stagger/g) then value
    else @parseStagger(value, i)
    

  # if passed string has rand function then get the rand value
  parseIfRand:(str)->
    if typeof str is 'string' and str.match(/rand\(/) then @parseRand(str)
    else str
  # if delta object was passed: like { 20: 75 }
  parseDelta:(key, value, index)->
    # clone the delta object before proceed
    value = @cloneObj value
    # parse delta easing
    easing = value.easing
    if easing? then easing = mojs.easing.parseEasing( easing )
    delete value.easing
    # parse delta curve
    curve = value.curve
    if curve? then curve = mojs.easing.parseEasing( curve )
    delete value.curve

    start = Object.keys(value)[0]
    end   = value[start]
    delta = start: start
    # color values
    if isNaN(parseFloat(start)) and !start.match(/rand\(/) and !start.match(/stagger\(/)
      if key is 'strokeLinecap'
        @warn "Sorry, stroke-linecap property is not animatable
           yet, using the start(#{start}) value instead", value
        # @props[key] = start;
        return delta
      startColorObj = @makeColorObj start
      endColorObj   = @makeColorObj end
      delta  =
        type:     'color'
        name:     key
        start:    startColorObj
        end:      endColorObj
        easing:   easing
        curve:    curve
        delta:
          r: endColorObj.r - startColorObj.r
          g: endColorObj.g - startColorObj.g
          b: endColorObj.b - startColorObj.b
          a: endColorObj.a - startColorObj.a
    # color strokeDasharray/strokeDashoffset
    else if key is 'strokeDasharray' or key is 'strokeDashoffset' or key is 'origin'
      startArr  = @strToArr start
      endArr    = @strToArr end
      @normDashArrays startArr, endArr

      for start, i in startArr
        end = endArr[i]
        @mergeUnits start, end, key

      delta =
        type:     'array'
        name:     key
        start:    startArr
        end:      endArr
        delta:    @calcArrDelta startArr, endArr
        easing:   easing
        curve:    curve
    ## plain numeric value ##
    else
      ## filter tween-related properties
      # defined in helpers.chainOptionMap
      # because tween-related props shouldn't
      ## have deltas
      if !@callbacksMap[key] and !@tweenOptionMap[key]
        # position values defined in unitOptionMap
        if @unitOptionMap[key]
          end   = @parseUnit @parseStringOption end,   index
          start = @parseUnit @parseStringOption start, index
          @mergeUnits start, end, key
          delta =
            type:     'unit'
            name:     key
            start:    start
            end:      end
            delta:    end.value - start.value
            easing:   easing
            curve:    curve
        else
          # not position but numeric values
          end   = parseFloat @parseStringOption  end,   index
          start = parseFloat @parseStringOption  start, index
          delta =
            type:     'number'
            name:     key
            start:    start
            end:      end
            delta:    end - start
            easing:   easing
            curve:    curve
    delta

  mergeUnits:(start, end, key)->
    if !end.isStrict and start.isStrict
      end.unit = start.unit
      end.string = "#{end.value}#{end.unit}"
    else if end.isStrict and !start.isStrict
      start.unit = end.unit
      start.string = "#{start.value}#{start.unit}"
    else if end.isStrict and start.isStrict
      if end.unit isnt start.unit
        start.unit = end.unit
        start.string = "#{start.value}#{start.unit}"
        @warn "Two different units were specified on \"#{key}\" delta
           property, mo · js will fallback to end \"#{end.unit}\" unit "

  rand:(min,max)-> (Math.random() * ((max) - min)) + min
  isDOM:(o)->
    return false if !o?
    # if typeof Node is 'function' then o instanceof Node
    isNode = typeof o.nodeType is 'number' and typeof o.nodeName is 'string'
    typeof o is 'object' and isNode
  getChildElements:(element)->
    childNodes = element.childNodes
    children = []
    i = childNodes.length
    while i--
      if childNodes[i].nodeType == 1
        children.unshift childNodes[i]
    children
  delta:(start, end)->
    type1 = typeof start; type2 = typeof end
    isType1 = type1 is 'string' or type1 is 'number' and !isNaN(start)
    isType2 = type2 is 'string' or type2 is 'number' and !isNaN(end)
    if !isType1 or !isType2
      @error "delta method expects Strings or Numbers at input
         but got - #{start}, #{end}"
      return
    obj = {}; obj[start] = end; obj
  # ---

  # Returns uniq id
  #
  # @method getUniqID
  # @return {Number}
  getUniqID:-> ++@uniqIDs
  # ---

  # Returns an uniq id
  #
  # @method parsePath
  # @return {SVGPath}
  parsePath:(path)->
    if typeof path is 'string'
      return if path.charAt(0).toLowerCase() is 'm'
        domPath = document.createElementNS @NS, 'path'
        domPath.setAttributeNS(null, 'd', path); domPath
      else document.querySelector path
    return path if path.style
  # ---

  # Returns uniq id
  #
  # @method parsePath
  # @return {SVGPath}
  closeEnough:(num1, num2, eps)-> Math.abs(num1-num2) < eps
  # ---

  # Method to check if 3d transform are supported
  checkIf3d:->
    div = document.createElement 'div'
    @style div, 'transform', 'translateZ(0)'
    style = div.style; prefixed = "#{@prefix.css}transform"
    tr = if style[prefixed]? then style[prefixed] else style.transform
    tr isnt ''
  ###
    Method to check if variable holds pointer to an object.
    @param {Any} Variable to test
    @returns {Boolean} If variable is object.
  ###
  isObject:(variable)-> variable != null and typeof variable is 'object'
  ###
    Method to get first value of the object.
    Used to get end value on ∆s.
    @param {Object} Object to get the value of.
    @returns {Any} The value of the first object' property.
  ###
  getDeltaEnd: (obj)-> key = Object.keys(obj)[0]; return obj[key]
  ###
    Method to get first key of the object.
    Used to get start value on ∆s.
    @param {Object} Object to get the value of.
    @returns {String} The key of the first object' property.
  ###
  getDeltaStart: (obj)-> key = Object.keys(obj)[0]; return key
  ###
    Method to check if propery exists in callbacksMap or tweenOptionMap.
    @param {String} Property name to check for
    @returns {Boolean} If property is tween property.
  ###
  isTweenProp:(keyName)-> @tweenOptionMap[keyName] or @callbacksMap[keyName]
  ###
    Method to parse string property value
    which can include both `rand` and `stagger `
    value in various positions.
    @param {String} Property name to check for.
    @param {Number} Optional index for stagger.
    @returns {Number} Parsed option value.
  ###
  parseStringOption: ( value, index = 0 ) ->
    if typeof value is 'string'
      value = @parseIfStagger( value, index )
      value = @parseIfRand( value )
    value
  ###
    Method to get the last item of array.
    @private
    @param {Array} Array to get the last item in.
    @returns {Any} The last item of array.
  ###
  getLastItem: (arr) -> arr[arr.length-1]
  ###
    Method parse HTMLElement.
    @private
    @param {String, Object} Selector string or HTMLElement.
    @returns {Object} HTMLElement.
  ###
  parseEl: ( el )->
    if h.isDOM( el ) then return el
    else if ( typeof el is 'string' )
      el = document.querySelector( el )
    
    if ( el == null ) then h.error( "Can't parse HTML element: ", el );
    el
  ###
    Method force compositor layer on HTMLElement.
    @private
    @param {Object} HTMLElement.
    @returns {Object} HTMLElement.
  ###
  force3d: ( el )->
    this.setPrefixedStyle el, 'backface-visibility', 'hidden'
    el
  ###
    Method to check if value is delta.
    @private
    @param {Any} Property to check.
    @returns {Boolean} If value is delta.
  ###
  isDelta: ( optionsValue )->
    isObject = this.isObject( optionsValue )
    isObject = isObject && !optionsValue.unit
    return !(!isObject or this.isArray(optionsValue) or this.isDOM(optionsValue))

h = new Helpers
module.exports = h