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
  # sin:
  #   in:     (k) -> 1 - Math.cos(k * Math.PI / 2)
  #   out:    (k) -> Math.sin k * Math.PI / 2
  #   inout:  (k) -> 0.5 * (1 - Math.cos(Math.PI * k))
  # exp:
  #   in:     (k) -> (if k is 0 then 0 else Math.pow(1024, k - 1))
  #   out:    (k) -> (if k is 1 then 1 else 1 - Math.pow(2, -10 * k))
  #   inout:  (k) ->
  #     return 0  if k is 0
  #     return 1  if k is 1
  #     return 0.5 * Math.pow(1024, k - 1)  if (k *= 2) < 1
  #     0.5 * (-Math.pow(2, -10 * (k - 1)) + 2)
  # circ:
  #   in:     (k) ->    1 - Math.sqrt(1 - k * k)
  #   out:    (k) ->   Math.sqrt 1 - (--k * k)
  #   inout:  (k) ->
  #     return -0.5 * (Math.sqrt(1 - k * k) - 1) if (k *= 2) < 1
  #     0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1)
  # elastic:
  #   in: (k) ->
  #     s = undefined
  #     # a = 0.1
  #     p = 0.4
  #     return 0  if k is 0
  #     return 1  if k is 1
  #     # if a < 1
  #     a = 1
  #     s = p / 4
  #     # else
  #     #   s = p * Math.asin(1 / a) / (2 * Math.PI)
  #     -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI)/p))
  #   out: (k) ->
  #     s = undefined
  #     # a = 0.1
  #     p = 0.4
  #     return 0  if k is 0
  #     return 1  if k is 1
  #     # if not a or a < 1
  #     a = 1
  #     s = p / 4
  #     # else
  #     #   s = p * Math.asin(1 / a) / (2 * Math.PI)
  #     a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1
  #   inout: (k) ->
  #     s = undefined
  #     # a = 0.1
  #     p = 0.4
  #     return 0  if k is 0
  #     return 1  if k is 1
  #     # if not a or a < 1
  #     a = 1
  #     s = p / 4
  #     # else
  #     #   s = p * Math.asin(1 / a) / (2 * Math.PI)
  #     if (k *= 2) < 1
  #       return -0.5*(a*Math.pow(2, 10*(k -= 1))*Math.sin((k-s)*(2*Math.PI)/p))
  #     a*Math.pow(2, -10*(k -= 1))*Math.sin((k - s)*(2 * Math.PI) / p)*0.5+1
  # back:
  #   in: (k) ->
  #     s = 1.70158
  #     k * k * ((s + 1) * k - s)
  #   out: (k) ->
  #     s = 1.70158
  #     --k * k * ((s + 1) * k + s) + 1
  #   inout: (k) ->
  #     s = 1.70158 * 1.525
  #     return 0.5 * (k * k * ((s + 1) * k - s))  if (k *= 2) < 1
  #     0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2)
  # bounce:
  #   in: (k) -> 1 - easing.bounce.out(1 - k)
  #   out: (k) ->
  #     if k < (1 / 2.75)
  #       7.5625 * k * k
  #     else if k < (2 / 2.75)
  #       7.5625 * (k -= (1.5 / 2.75)) * k + 0.75
  #     else if k < (2.5 / 2.75)
  #       7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375
  #     else
  #       7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375
  #   inout: (k) ->
  #     return easing.bounce.in(k * 2) * 0.5  if k < 0.5
  #     easing.bounce.out(k * 2 - 1) * 0.5 + 0.5

easing = new Easing
module.exports = easing




