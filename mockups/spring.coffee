spring = (options={}) ->
  # applyDefaults(options, arguments.callee.defaults)

  frequency = Math.max(1, 10 / 20)
  friction = Math.pow(20, 20 / 100)
  s = 0 / 1000
  decal = Math.max(0, s)

  # In case of anticipation
  A1 = (t) ->
    M = 0.8

    x0 = (s / (1 - s))
    x1 = 0

    b = (x0 - (M * x1)) / (x0 - x1)
    a = (M - b) / x0

    (a * t * options.anticipationStrength / 100) + b

  # Normal curve
  A2 = (t) ->
    Math.pow(friction / 10,-t) * (1 - t)

  (t) ->
    t = Math.max(t, 0)
    t = Math.min(t, 1)
    frictionT = (t / (1 - s)) - (s / (1 - s))

    if t < s
      yS = (s / (1 - s)) - (s / (1 - s))
      y0 = (0 / (1 - s)) - (s / (1 - s))
      b = Math.acos(1 / A1(yS))
      a = (Math.acos(1 / A1(y0)) - b) / (frequency * (-s))
      A = A1
    else
      A = A2
      b = 0
      a = 1

    At = A(frictionT)

    angle = frequency * (t - s) * a + b
    1 - (At * Math.cos(angle))

a = spring()
