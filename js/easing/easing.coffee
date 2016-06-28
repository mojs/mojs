bezier      = require './bezier-easing'
PathEasing  = require './path-easing'
mix         = require './mix'
h           = require '../h'
approximate = require('./approximate').default or require('./approximate');

sin = Math.sin
PI  = Math.PI

class Easing
  bezier:     bezier
  PathEasing: PathEasing
  path:       (new PathEasing 'creator').create
  approximate: approximate
  # ---

  # Method to inverse the easing value
  # @param {Number} Value to inverse
  # @return {Number} Inversed value
  inverse:(p)-> 1 - p

  # EASINGS
  linear:   none: (k) -> k
  ease:
    in:     bezier.apply @, [ 0.42,   0,     1,      1 ]
    out:    bezier.apply @, [ 0,      0,    0.58,    1 ]
    inout:  bezier.apply @, [ 0.42,   0,    0.58,    1 ]
  sin:
    in:     (k) -> 1 - Math.cos(k * PI / 2)
    out:    (k) -> sin k * PI / 2
    inout:  (k) -> 0.5 * (1 - Math.cos(PI * k))
  quad:
    in:     (k) -> k * k
    out:    (k) -> k * (2 - k)
    inout:  (k) ->
      return 0.5 * k * k  if (k *= 2) < 1
      -0.5 * (--k * (k - 2) - 1)
  cubic:
    in:     (k) -> k * k * k
    out:    (k) -> --k * k * k + 1
    inout:  (k) ->
      return 0.5 * k * k * k  if (k *= 2) < 1
      0.5 * ((k -= 2) * k * k + 2)
  quart:
    in:     (k) -> k * k * k * k
    out:    (k) -> 1 - (--k * k * k * k)
    inout:  (k) ->
      return 0.5 * k * k * k * k  if (k *= 2) < 1
      -0.5 * ((k -= 2) * k * k * k - 2)
  quint:
    in:     (k) -> k * k * k * k * k
    out:    (k) -> --k * k * k * k * k + 1
    inout:  (k) ->
      return 0.5 * k * k * k * k * k  if (k *= 2) < 1
      0.5 * ((k -= 2) * k * k * k * k + 2)
  expo:
    in:     (k) -> (if k is 0 then 0 else Math.pow(1024, k - 1))
    out:    (k) -> (if k is 1 then 1 else 1 - Math.pow(2, -10 * k))
    inout:  (k) ->
      return 0  if k is 0
      return 1  if k is 1
      return 0.5 * Math.pow(1024, k - 1)  if (k *= 2) < 1
      0.5 * (-Math.pow(2, -10 * (k - 1)) + 2)
  circ:
    in:     (k) ->    1 - Math.sqrt(1 - k * k)
    out:    (k) ->   Math.sqrt 1 - (--k * k)
    inout:  (k) ->
      return -0.5 * (Math.sqrt(1 - k * k) - 1) if (k *= 2) < 1
      0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1)
  back:
    in: (k) ->
      s = 1.70158
      k * k * ((s + 1) * k - s)
    out: (k) ->
      s = 1.70158
      --k * k * ((s + 1) * k + s) + 1
    inout: (k) ->
      s = 1.70158 * 1.525
      return 0.5 * (k * k * ((s + 1) * k - s))  if (k *= 2) < 1
      0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2)
  elastic:
    in: (k) ->
      s = undefined
      # a = 0.1
      p = 0.4
      return 0  if k is 0
      return 1  if k is 1
      # if a < 1
      a = 1
      s = p / 4
      # else
      #   s = p * Math.asin(1 / a) / (2 * Math.PI)
      -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI)/p))
    out: (k) ->
      s = undefined
      # a = 0.1
      p = 0.4
      return 0  if k is 0
      return 1  if k is 1
      # if not a or a < 1
      a = 1
      s = p / 4
      # else
      #   s = p * Math.asin(1 / a) / (2 * Math.PI)
      a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1
    inout: (k) ->
      s = undefined
      # a = 0.1
      p = 0.4
      return 0  if k is 0
      return 1  if k is 1
      # if not a or a < 1
      a = 1
      s = p / 4
      # else
      #   s = p * Math.asin(1 / a) / (2 * Math.PI)
      if (k *= 2) < 1
        return -0.5*(a*Math.pow(2, 10*(k -= 1))*Math.sin((k-s)*(2*Math.PI)/p))
      a*Math.pow(2, -10*(k -= 1))*Math.sin((k - s)*(2 * Math.PI) / p)*0.5+1
  bounce:
    in: (k) -> 1 - easing.bounce.out(1 - k)
    out: (k) ->
      if k < (1 / 2.75)
        7.5625 * k * k
      else if k < (2 / 2.75)
        7.5625 * (k -= (1.5 / 2.75)) * k + 0.75
      else if k < (2.5 / 2.75)
        7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375
      else
        7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375
    inout: (k) ->
      return easing.bounce.in(k * 2) * 0.5  if k < 0.5
      easing.bounce.out(k * 2 - 1) * 0.5 + 0.5

  # ---

  # Method to parse easing
  # @method parseEasing
  # 
  # @param {String, Function, Array}
  #   - *String*: Easing name delimited by dot e.g "cubic.in" or "elastic.out"
  #     all avaliable options you can find at
  #     [easing module](easing.coffee.html) page.
  #   - *String*: SVG path coordinates in rectangle of 100x100
  #   - *Function*: function that recieve current time and returns modified one
  #     e.g. *function (k) { return k*k; }*. The function can be created by
  #     calling mojs.easing.bezier(0.55,0.085,0.68,0.53) or
  #     mojs.easing.path('M0,0 ...') function. 
  #
  # @return {Function}
  parseEasing:(easing)->

    if !easing? then easing = 'linear.none'
    
    type = typeof easing
    if type is 'string'
      return if easing.charAt(0).toLowerCase() is 'm'
        @path(easing)
      else
        easing = @_splitEasing(easing)
        easingParent = @[easing[0]]
        if !easingParent
          h.error "Easing with name \"#{easing[0]}\" was not found, 
                    fallback to \"linear.none\" instead"
          return @['linear']['none']
        easingParent[easing[1]]
    if h.isArray(easing) then return @bezier.apply(@, easing)
    if 'function' then return easing
  # ---

  # Method to parse easing name string
  # @method splitEasing
  # 
  # @param {String} easing name. All easing names can be found
  #                 at [easing module](easing.coffee.html) page.
  # @return {Array}
  _splitEasing:(string)->
    return string if typeof string is 'function'
    if typeof string is 'string' and string.length
      split = string.split '.'
      firstPart   = split[0].toLowerCase() or 'linear'
      secondPart  = split[1].toLowerCase() or 'none'
      [ firstPart, secondPart ]
    else ['linear', 'none']

easing = new Easing;

easing.mix = mix easing

module.exports = easing
