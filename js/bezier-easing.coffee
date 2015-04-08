h = require './h'

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

    # These values are established by empiricism with tests (tradeoff: performance VS precision)
    NEWTON_ITERATIONS = 4
    NEWTON_MIN_SLOPE = 0.001
    SUBDIVISION_PRECISION = 0.0000001
    SUBDIVISION_MAX_ITERATIONS = 10
    kSplineTableSize = 11
    kSampleStepSize = 1.0 / (kSplineTableSize - 1.0)
    float32ArraySupported = 'Float32Array' in global

    A = (aA1, aA2) ->
      1.0 - 3.0 * aA2 + 3.0 * aA1

    B = (aA1, aA2) ->
      3.0 * aA2 - 6.0 * aA1

    C = (aA1) ->
      3.0 * aA1

    # Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.

    calcBezier = (aT, aA1, aA2) ->
      ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT

    # Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.

    getSlope = (aT, aA1, aA2) ->
      3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1)

    binarySubdivide = (aX, aA, aB) ->
      currentX = undefined
      currentT = undefined
      i = 0
      loop
        currentT = aA + (aB - aA) / 2.0
        currentX = calcBezier(currentT, mX1, mX2) - aX
        if currentX > 0.0
          aB = currentT
        else
          aA = currentT
        unless Math.abs(currentX) > SUBDIVISION_PRECISION and ++i < SUBDIVISION_MAX_ITERATIONS
          break
      currentT


    newtonRaphsonIterate = (aX, aGuessT) ->
      i = 0
      while i < NEWTON_ITERATIONS
        currentSlope = getSlope(aGuessT, mX1, mX2)
        if currentSlope == 0.0
          return aGuessT
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

    getTForX = (aX) ->
      intervalStart = 0.0
      currentSample = 1
      lastSample = kSplineTableSize - 1
      while currentSample != lastSample and mSampleValues[currentSample] <= aX
        intervalStart += kSampleStepSize
        ++currentSample
      --currentSample
      # Interpolate to provide an initial guess for t
      dist = (aX - mSampleValues[currentSample]) / (mSampleValues[currentSample + 1] - mSampleValues[currentSample])
      guessForT = intervalStart + dist * kSampleStepSize
      initialSlope = getSlope(guessForT, mX1, mX2)
      if initialSlope >= NEWTON_MIN_SLOPE
        newtonRaphsonIterate aX, guessForT
      else if initialSlope == 0.0
        guessForT
      else
        binarySubdivide aX, intervalStart, intervalStart + kSampleStepSize

    precompute = ->
      _precomputed = true
      if mX1 != mY1 or mX2 != mY2
        calcSampleValues()
      return

    if arguments.length != 4
      throw new Error('BezierEasing requires 4 arguments.')
    i = 0
    while i < 4
      if typeof arguments[i] != 'number' or isNaN(arguments[i]) or !isFinite(arguments[i])
        throw new Error('BezierEasing arguments should be integers.')
      ++i
    if mX1 < 0 or mX1 > 1 or mX2 < 0 or mX2 > 1
      throw new Error('BezierEasing x values must be in [0, 1] range.')
    mSampleValues = if float32ArraySupported then new Float32Array(kSplineTableSize) else new Array(kSplineTableSize)
    _precomputed = false

    f = (aX) ->
      if !_precomputed
        precompute()
      if mX1 == mY1 and mX2 == mY2
        return aX
      # linear
      # Because JavaScript number are imprecise, we should guarantee the extremes are right.
      if aX == 0
        return 0
      if aX == 1
        return 1
      calcBezier getTForX(aX), mY1, mY2

    f.getControlPoints = ->
      [
        {
          x: mX1
          y: mY1
        }
        {
          x: mX2
          y: mY2
        }
      ]
    f

  error:(msg)-> h.error msg

bezierEasing = new BezierEasing

module.exports = bezierEasing




