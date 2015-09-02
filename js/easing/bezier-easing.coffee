h = require '../h'

###*
 * Copyright (c) 2014 Gaëtan Renaudeau http://goo.gl/El3k7u
 * Adopted from https://github.com/gre/bezier-easing
###
#  TODO: remove 3 ### istanbul ignore next ### statements
#        and cover the gaps

class BezierEasing
  constructor:(o)-> @vars(); return @generate
  vars:-> @generate = h.bind @generate, @
  generate:(mX1, mY1, mX2, mY2)->
    # params parsing
    if arguments.length < 4
      return @error 'Bezier function expects 4 arguments'
    for i in [0...4]
      arg = arguments[i]
      if (typeof arg isnt "number" or isNaN(arg) or !isFinite(arg))
        return @error 'Bezier function expects 4 arguments'
    if (mX1 < 0 or mX1 > 1 or mX2 < 0 or mX2 > 1)
      return @error 'Bezier x values should be > 0 and < 1'
    # These values are established by empiricism with
    # tests (tradeoff: performance VS precision)
    NEWTON_ITERATIONS = 4
    NEWTON_MIN_SLOPE = 0.001
    SUBDIVISION_PRECISION = 0.0000001
    SUBDIVISION_MAX_ITERATIONS = 10
    kSplineTableSize = 11
    kSampleStepSize = 1.0 / (kSplineTableSize - 1.0)
    float32ArraySupported = 'Float32Array' in global

    A = (aA1, aA2) -> 1.0 - 3.0 * aA2 + 3.0 * aA1
    B = (aA1, aA2) -> 3.0 * aA2 - 6.0 * aA1
    C = (aA1) -> 3.0 * aA1

    # Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
    calcBezier = (aT, aA1, aA2) ->
      ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT

    # Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
    getSlope = (aT, aA1, aA2) ->
      3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1)

    newtonRaphsonIterate = (aX, aGuessT) ->
      i = 0
      while i < NEWTON_ITERATIONS
        currentSlope = getSlope(aGuessT, mX1, mX2)
        ### istanbul ignore if ###
        return aGuessT if currentSlope is 0.0
        currentX = calcBezier(aGuessT, mX1, mX2) - aX
        aGuessT -= currentX / currentSlope
        ++i
      aGuessT

    calcSampleValues = ->
      i = 0
      while i < kSplineTableSize
        mSampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2)
        ++i
      return
    ### istanbul ignore next ###
    binarySubdivide = (aX, aA, aB) ->
      currentX = undefined; currentT = undefined; i = 0
      loop
        currentT = aA + (aB - aA) / 2.0
        currentX = calcBezier(currentT, mX1, mX2) - aX
        if currentX > 0.0 then aB = currentT
        else aA = currentT
        isBig = Math.abs(currentX) > SUBDIVISION_PRECISION
        unless isBig and ++i < SUBDIVISION_MAX_ITERATIONS
          break
      currentT

    getTForX = (aX) ->
      intervalStart = 0.0
      currentSample = 1
      lastSample = kSplineTableSize - 1
      while currentSample != lastSample and mSampleValues[currentSample] <= aX
        intervalStart += kSampleStepSize
        ++currentSample
      --currentSample
      # Interpolate to provide an initial guess for t
      delta = (mSampleValues[currentSample + 1] - mSampleValues[currentSample])
      dist = (aX - mSampleValues[currentSample]) / delta
      guessForT = intervalStart + dist * kSampleStepSize
      initialSlope = getSlope(guessForT, mX1, mX2)

      if initialSlope >= NEWTON_MIN_SLOPE
        newtonRaphsonIterate aX, guessForT
      else
        ### istanbul ignore next ###
        if initialSlope == 0.0 then guessForT
        else binarySubdivide aX, intervalStart, intervalStart + kSampleStepSize

    precompute = ->
      _precomputed = true
      calcSampleValues() if mX1 != mY1 or mX2 != mY2

    mSampleValues = if !float32ArraySupported then new Array(kSplineTableSize)
    else new Float32Array(kSplineTableSize)
    _precomputed = false

    f = (aX) ->
      if !_precomputed then precompute()
      if mX1 == mY1 and mX2 == mY2 then return aX
      # linear
      # Because JavaScript number are imprecise,
      # we should guarantee the extremes are right.
      return 0 if aX == 0
      return 1 if aX == 1
      calcBezier getTForX(aX), mY1, mY2

    str = "bezier(" + [mX1, mY1, mX2, mY2] + ")"
    f.toStr = -> str
    f

  error:(msg)-> h.error msg

bezierEasing = new BezierEasing

module.exports = bezierEasing




