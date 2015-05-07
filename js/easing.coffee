bezier     = require './bezier-easing'
PathEasing = require('./path-easing')

class Easing
  bezier:     bezier
  PathEasing: PathEasing
  path:       (new PathEasing 'creator').create
  linear: none: (k) -> k
  ease:
    in:     bezier.apply @, [ 0.42,   0,     1,      1   ]
    out:    bezier.apply @, [ 0,      0,    0.58,    1   ]
    inout:  bezier.apply @, [ 0.42,   0,    0.58,    1   ]
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
  sin:
    in:     (k) -> 1 - Math.cos(k * Math.PI / 2)
    out:    (k) -> Math.sin k * Math.PI / 2
    inout:  (k) -> 0.5 * (1 - Math.cos(Math.PI * k))
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

easing = new Easing
module.exports = easing
