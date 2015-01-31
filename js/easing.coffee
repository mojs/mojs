Easing =
  Linear: None: (k) -> k
  Quadratic:
    In: (k) -> k * k
    Out: (k) -> k * (2 - k)
    InOut: (k) ->
      return 0.5 * k * k  if (k *= 2) < 1
      -0.5 * (--k * (k - 2) - 1)
  Cubic:
    In: (k) -> k * k * k
    Out: (k) -> --k * k * k + 1
    InOut: (k) ->
      return 0.5 * k * k * k  if (k *= 2) < 1
      0.5 * ((k -= 2) * k * k + 2)
  Quartic:
    In: (k) -> k * k * k * k
    Out: (k) -> 1 - (--k * k * k * k)
    InOut: (k) ->
      return 0.5 * k * k * k * k  if (k *= 2) < 1
      -0.5 * ((k -= 2) * k * k * k - 2)
  Quintic:
    In: (k) ->
      k * k * k * k * k
    Out: (k) ->
      --k * k * k * k * k + 1
    InOut: (k) ->
      return 0.5 * k * k * k * k * k  if (k *= 2) < 1
      0.5 * ((k -= 2) * k * k * k * k + 2)
  Sinusoidal:
    In: (k) -> 1 - Math.cos(k * Math.PI / 2)
    Out: (k) -> Math.sin k * Math.PI / 2
    InOut: (k) -> 0.5 * (1 - Math.cos(Math.PI * k))
  Exponential:
    In: (k) -> (if k is 0 then 0 else Math.pow(1024, k - 1))
    Out: (k) -> (if k is 1 then 1 else 1 - Math.pow(2, -10 * k))
    InOut: (k) ->
      return 0  if k is 0
      return 1  if k is 1
      return 0.5 * Math.pow(1024, k - 1)  if (k *= 2) < 1
      0.5 * (-Math.pow(2, -10 * (k - 1)) + 2)
  Circular:
    In: (k) ->    1 - Math.sqrt(1 - k * k)
    Out: (k) ->   Math.sqrt 1 - (--k * k)
    InOut: (k) ->
      return -0.5 * (Math.sqrt(1 - k * k) - 1) if (k *= 2) < 1
      0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1)
  Elastic:
    In: (k) ->
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
      -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p))
    Out: (k) ->
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
    InOut: (k) ->
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
  Back:
    In: (k) ->
      s = 1.70158
      k * k * ((s + 1) * k - s)
    Out: (k) ->
      s = 1.70158
      --k * k * ((s + 1) * k + s) + 1
    InOut: (k) ->
      s = 1.70158 * 1.525
      return 0.5 * (k * k * ((s + 1) * k - s))  if (k *= 2) < 1
      0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2)
  Bounce:
    In: (k) ->
      1 - Easing.Bounce.Out(1 - k)
    Out: (k) ->
      if k < (1 / 2.75)
        7.5625 * k * k
      else if k < (2 / 2.75)
        7.5625 * (k -= (1.5 / 2.75)) * k + 0.75
      else if k < (2.5 / 2.75)
        7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375
      else
        7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375
    InOut: (k) ->
      return Easing.Bounce.In(k * 2) * 0.5  if k < 0.5
      Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "Easing", [], -> Easing
### istanbul ignore next ###
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = Easing
### istanbul ignore next ###
window?.mojs ?= {}
### istanbul ignore next ###
window?.mojs.Easing = Easing




