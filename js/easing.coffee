bezier = require './bezier-easing'

class Easing
  bezier: bezier
  linear: none: (k) -> k
  quad:
    in:     bezier.apply @, [ 0.55,  0.085, 0.68,   0.53 ]
    out:    bezier.apply @, [ 0.25,  0.46,  0.45,   0.94 ]
    inout:  bezier.apply @, [ 0.455, 0.03,  0.515, 0.955 ]
  cubic:
    in:     bezier.apply @, [ 0.55,  0.055, 0.675,  0.19 ]
    out:    bezier.apply @, [ 0.215, 0.61,  0.355,   1   ]
    inout:  bezier.apply @, [ 0.645, 0.045, 0.355,   1   ]
  quart:
    in:     bezier.apply @, [ 0.895, 0.03,  0.685,  0.22 ]
    out:    bezier.apply @, [ 0.165, 0.84,  0.44,    1   ]
    inout:  bezier.apply @, [ 0.77,   0,    0.175,   1   ]
  quint:
    in:     bezier.apply @, [ 0.895, 0.03,  0.685,  0.22 ]
    out:    bezier.apply @, [ 0.165, 0.84,  0.44,    1   ]
    inout:  bezier.apply @, [ 0.77,   0,    0.175,   1   ]
  sin:
    in:     bezier.apply @, [ 0.47,   0,    0.745,  0.715]
    out:    bezier.apply @, [ 0.39,  0.575, 0.565,   1   ]
    inout:  bezier.apply @, [ 0.445, 0.05,  0.55,   0.95 ]
  exp:
    in:     bezier.apply @, [ 0.95,  0.05,  0.795,  0.035]
    out:    bezier.apply @, [ 0.19,   1,     0.22,    1  ]
    inout:  bezier.apply @, [ 1,      0,      0,      1  ]
  circ:
    in:     bezier.apply @, [ 0.6,   0.04,  0.98,   0.335]
    out:    bezier.apply @, [ 0.075, 0.82,  0.165,    1  ]
    inout:  bezier.apply @, [ 0.785, 0.135, 0.15,   0.86 ]
  back:
    in:     bezier.apply @, [ 0.6,    0,    0.735,  0.045]
    out:    bezier.apply @, [ 0.175, 0.885, 0.32,     1  ]
    inout:  bezier.apply @, [ 0.68,   0,    0.265,    1  ]
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




