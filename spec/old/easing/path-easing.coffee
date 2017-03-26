h          = mojs.h
PathEasing = mojs.easing.PathEasing

describe 'PathEasing ->', ->
  it 'should be a function', ->
    expect(typeof mojs.easing.PathEasing).toBe 'function'
  it 'should not init if "creator" was passed', ->
    pe = new PathEasing 'creator'
    expect(pe.precision).not.toBeDefined()
  it 'should have path property', ->
    pe = new PathEasing 'creator'
    easing = pe.create 'M 0, 0 L 100,100'
    expect(easing.path instanceof SVGElement).toBe true

  describe 'variables ->', ->
    it 'should have _eps defined', ->
      pe = new PathEasing 'M0,0 L10,10'
      expect(pe._eps).toBeDefined()
    it 'should have _eps defined', ->
      pe = new PathEasing 'M0,0 L10,10'
      expect(pe._precompute).toBe 1450
      expect(pe._step).toBe       1/pe._precompute
    it 'should have _boundsPrevProgress defined', ->
      pe = new PathEasing 'M0,0 L10,10'
      expect(pe._boundsPrevProgress).toBe -1

  describe 'path parsing ->', ->
    it 'should parse path', ->
      path = 'M0,0 L10,10'
      spyOn h, 'parsePath'
      pe = new PathEasing path
      expect(h.parsePath).toHaveBeenCalledWith path
    it 'should save path and pathLength', ->
      path = 'M0,0 L10,10'
      pe = new PathEasing path
      expect(pe.path).toBeDefined()
      expect(pe.pathLength).toBe pe.path.getTotalLength()
    it 'should error if path wasnt parsed', ->
      path = 'M0,0 L10,10'
      spyOn h, 'error'
      spyOn h, 'parsePath' # spoil the parsePath method
      pe = new PathEasing path
      expect(h.error).toHaveBeenCalled()
    it 'should work with scientific notation', ->
      path = 'M0,0 C0,0 31.4848633,29.7739254 55.2021484,-4.28613761e-07
              C74.9160156,-20.18457 100,0 100,0'
      pe = new PathEasing path
      testFun = -> pe.sample .8
      expect(testFun).not.toThrow()

  describe 'options ->', ->
    it 'should recieve "_approximateMax" option', ->
      path = 'M0,0 L10,10'
      pe = new PathEasing path, approximateMax: 10
      expect(pe._approximateMax).toBe 10
    it 'should recieve "rect" option', ->
      path = 'M0,0 L10,10'
      pe = new PathEasing path, rect: 200
      expect(pe._rect).toBe 200
    it 'should recieve "eps" option', ->
      path = 'M0,0 L10,10'
      eps = .00001
      pe = new PathEasing path, eps: eps
      expect(pe._eps).toBe eps
    
    describe 'precompute option ->', ->
      it 'should recieve "precompute" option', ->
        path = 'M0,0 L10,10'
        precompute = 10000
        pe = new PathEasing path, precompute: precompute
        expect(pe._precompute).toBe precompute
      it 'should not be larger than 10000', ->
        path = 'M0,0 L10,10'
        precompute = 20000
        pe = new PathEasing path, precompute: precompute
        expect(pe._precompute).toBe 10000
      it 'should not be smaller than 100', ->
        path = 'M0,0 L10,10'
        precompute = 20
        pe = new PathEasing path, precompute: precompute
        expect(pe._precompute).toBe 100

  describe '_preSample method ->', ->
    it 'should pre sample the path', ->
      pe = new PathEasing 'M0,100 100,0'
      len = pe.pathLength
      expect(pe._samples[0]).toBeDefined()
      expect(pe._samples[1]).toBeDefined()
      expect(pe._samples[2]).toBeDefined()
      expect(pe._samples[50]).toBeDefined()
      expect(pe._samples[pe._precompute-1]).toBeDefined()

  describe 'sample method ->', ->
    it 'should clamp x value', ->
      path = 'M0,100 100,0'
      pe = new PathEasing path
      expect(pe.sample(-.5)).toBeCloseTo 0, 3
      expect(pe.sample(1.5)).toBeCloseTo 1, 1
    it 'should return y', ->
      path = 'M0,100 100,0'
      pe = new PathEasing path
      expect(Math.abs(pe.sample(.7) - .7)).toBeLessThan pe._eps
    it 'should sample y', ->
      pe = new PathEasing 'M0,100 100,0'
      for i in [1...20]
        progress = 1/i
        expect(Math.abs(pe.sample(progress) - progress)).toBeLessThan pe._eps
    it 'should call _findApproximate method if bounds are not close enough',->
      pe = new PathEasing 'M0,100 100,0', precompute: 100, eps: 0.001
      spyOn pe, '_findApproximate'
      pe.sample(0.015)
      expect(pe._findApproximate).toHaveBeenCalled()

  describe '_checkIfBoundsCloseEnough method ->', ->
    it 'should return start value if it is close enough', ->
      pe = new PathEasing 'M0,100 100,0'
      value = .5
      pe._checkIfBoundsCloseEnough(value, {
        start: {point: {x: value+(pe._eps/2)}},
        end:   {point: {x: .75}}
        })
    it 'should return end value if it is close enough', ->
      pe = new PathEasing 'M0,100 100,0'
      value = .5
      pe._checkIfBoundsCloseEnough(value, {
        start: {point: {x: .25}},
        end:   {point: {x: value+(pe._eps/2)}}
        })

  describe '_approximate method ->',->
    it 'should find approximation', ->
      pe = new PathEasing 'M0,100 100,0', eps: 0.001, precompute: 2000
      s = pe._samples
      approximation = pe._approximate s[11], s[12], s[11].progress+0.0003
      point1 = pe.path.getPointAtLength approximation
      length2 = s[11].length + .3*(s[12].length - s[11].length)
      point2 = pe.path.getPointAtLength length2
      expect(point1.x).toBeCloseTo point2.x, 1
  describe '_findApproximate method',->
    it 'should return y', ->
      pe1 = new PathEasing 'M0,100 100,0'
      p = 0.203231
      bounds = pe1._findBounds pe1._samples, p
      value = pe1._findApproximate p, bounds.start, bounds.end
      expect(value).toBeCloseTo p, 4
    it 'should stop if running for a log time( _approximateMax < 1)', ->
      pe1 = new PathEasing 'M0,100 100,0', precompute: 100
      p = 0.015
      start = {point: {x: 0.01}, length: 0}
      end   = {point: {x: 0.02}, length: 1}
      spyOn(pe1, '_findApproximate').and.callThrough()
      value = pe1._findApproximate p, start, end, 1
      expect(pe1._findApproximate.calls.count()).toBe 1


    it 'should call self recursivelly if not precise enough
        but no more then _approximateMax value', ->
      pe = new PathEasing 'M0,100 100,0', precompute: 100, eps: .00000001
      p = 0.015
      start = {point: {x: 0.01}, length: 10}
      end   = {point: {x: 0.5}, length: 20}
      spyOn(pe, '_findApproximate').and.callThrough()
      value = pe._findApproximate p, start, end
      expect(pe._findApproximate.calls.count()).toEqual 5

  describe '_findBounds method ->', ->
    it 'should find lowest and highest bounderies',->
      pe1 = new PathEasing 'M0,100 100,0'
      progress = .735
      bounds = pe1._findBounds pe1._samples, progress
    it 'should save previous start index', ->
      pe1 = new PathEasing 'M0,100 100,0'
      progress = .735
      bounds = pe1._findBounds pe1._samples, progress
      expect(pe1._boundsStartIndex).toBeGreaterThan 100
      expect(pe1._boundsPrevProgress).toBe .735
    it 'should return [0] item if progress is 0', ->
      pe1 = new PathEasing 'M0,100 100,0'
      progress = 0
      bounds = pe1._findBounds pe1._samples, progress
      expect(bounds.start).toBeDefined()
      expect(bounds.start.point.x).toBeCloseTo 0, 1
    it 'should cache index in reverse order', ->
      pe1 = new PathEasing 'M0,100 100,0'
      progress = .735; newProgress = progress - .2
      bounds = pe1._findBounds pe1._samples, progress
      bounds = pe1._findBounds pe1._samples, newProgress
      expect(pe1._boundsStartIndex).toBeLessThan 1400
      expect(pe1._boundsPrevProgress).toBe newProgress
    it 'should cache previous return object', ->
      pe1 = new PathEasing 'M0,100 100,0'
      bounds = pe1._findBounds pe1._samples, .735
      expect(pe1._prevBounds).toBe bounds
    it 'should detect if previous progress is the current one', ->
      pe1 = new PathEasing 'M0,100 100,0'
      progress = .735; newProgress = progress - .2
      bounds1 = pe1._findBounds pe1._samples, progress
      bounds2 = pe1._findBounds pe1._samples, progress
      expect(bounds1).toBe bounds2

    it 'should not return the end bound', ->
      pe = new PathEasing 'M0,100 C0,100 5.01160836,100 8.74856937,100.270866
                            C15.1440434,57.219434 23.7860103,98.447299
                            23.7860103,100.097037 C30.2913574,71.1380541
                            36.1603623,98.3939125 36.160361,100.162142
                            C41.9325738,44.182975 49.1344299,98.9199542
                            49.1344299,100.053418 C53.6287224,80.2298508
                            59.2720971,99.9303714 59.2720971,99.9303714
                            C59.2720971,99.9303714 63.6855469,84.1318359
                            70.2742418,100.003578 C72.8310547,113.017578
                            74.5979385,101.614397 75,100 C76.9232712,85.1240234
                            82.3889542,100.577847 94.1109085,100 L100,100'
      bounds = true
      for i in [1...1000]
        bounds = pe._findBounds pe._samples, 1/i
        if !bounds.end? then break

      expect(bounds.end).not.toBeNull()

    it 'should not return the end bound #2', ->
      pe = new PathEasing 'M0,100 C0,100 5.01160836,100 8.74856937,100.270866
                            C15.1440434,57.219434 23.7860103,98.447299
                            23.7860103,100.097037 C30.2913574,71.1380541
                            36.1603623,98.3939125 36.160361,100.162142
                            C41.9325738,44.182975 49.1344299,98.9199542
                            49.1344299,100.053418 C53.6287224,80.2298508
                            59.2720971,99.9303714 59.2720971,99.9303714
                            C59.2720971,99.9303714 63.6855469,84.1318359
                            70.2742418,100.003578 C72.8310547,113.017578
                            74.5979385,101.614397 75,100 C76.9232712,85.1240234
                            82.3889542,100.577847 94.1109085,100 L100,100'
      bounds = true
      for i in [1...1000]
        bounds = pe._findBounds Math.random()
        if !bounds.end? then break

      expect(bounds.end).not.toBeNull()

  describe '_resolveY method', ->
    it 'should resolve Y from point', ->
      pe1 = new PathEasing('M0,100 100,0'); y = 10
      expect(pe1._resolveY(y: y)).toBe 1-(y/100)

  describe 'create method ->', ->
    it 'should create new instance of path-easing and return it\'s method', ->
      pe = new PathEasing 'creator'
      easing = pe.create('M0,100 100,0', precision: 10)
      expect(typeof easing).toBe 'function'
      expect(Math.abs(easing(.5)-.5)).toBeLessThan .01

  describe '_normalizePath method', ->
    it 'should normalize start x value to 0', ->
      pe = new PathEasing 'creator'
      newPath = pe._normalizePath('M0.1,0 L100,100')
      expect(newPath).toBe 'M0,0 L100,100'
    it 'should normalize end x value to rect.x value', ->
      pe = new PathEasing 'creator'
      newPath = pe._normalizePath('M0.1,0 L99,100')
      expect(newPath).toBe 'M0,0 L100,100'
    it 'should normalize end x value for the latest
        segment only and strip Z', ->
      pe = new PathEasing 'creator'
      path = 'M0.1,0 C68,-3.5 69,6 70,14 C70,21 74,27 74,18 C77,-0.6
              100,0 101,0 Z'
      newPath = pe._normalizePath(path)
      normPath = 'M0,0 C68,-3.5 69,6 70,14 C70,21 74,27 74,18 C77,-0.6
                  100,0 100,0'
      expect(newPath).toBe normPath
    it 'should normalize path and set it to the DOM', ->
      pe = new PathEasing 'creator'
      path = 'M0.1,0 C68,-3.5 69,6 70,14 C70,21 74,27 74,18 C77,-0.6 100,0
              101,0 Z'
      normPath = 'M0,0 C68,-3.5 69,6 70,14 C70,21 74,27 74,18 C77,-0.6 100,0
                  100,0'
      IEnormPath = 'M 0 0 C 68 -3.5 69 6 70 14 C 70 21 74 27 74 18 C 77 -0.6
                    100 0 100 0'
      easing = pe.create path
      attr = easing.path.getAttribute('d')
      isNormPath = attr is normPath or attr is IEnormPath
      expect(isNormPath).toBe true

    it 'should normalize path and set it to the DOM', ->
      pe = new PathEasing 'creator'
      path = 'M2,99.9660556 L3.13085938,99.9660558
       C11.128418,-42.5141612 24.73576,10.33894 24.7357688,10.33894
       C24.7357688,10.33894 35.4207115,6.43611673 35.420711,19.5517
       C35.420711,19.551763 35.4207115,28.52044 38.4679491,20.10104
       C45.9122391,-2.417068 48.24804,19.32803 49.42055,19.325
       C49.4205546,6.880008 55.05924,-3.51334643 59,15.87858
       C60.6251608,22.5931723 56.89184,-3.3408203 65.49511,-3.34082
       C68.7340668,-3.542523 69.730594,6.60260412 70.3281,14.02343
       C70.9301836,21.50049 74.0961573,27.0302603 74.78883,18.83163
       C77.5927734,-0.603027419 100,0 101,0'

      normPath = 'M0,99.9660556 L3.13085938,99.9660558
       C11.128418,-42.5141612 24.73576,10.33894 24.7357688,10.33894
       C24.7357688,10.33894 35.4207115,6.43611673 35.420711,19.5517
       C35.420711,19.551763 35.4207115,28.52044 38.4679491,20.10104
       C45.9122391,-2.417068 48.24804,19.32803 49.42055,19.325
       C49.4205546,6.880008 55.05924,-3.51334643 59,15.87858
       C60.6251608,22.5931723 56.89184,-3.3408203 65.49511,-3.34082
       C68.7340668,-3.542523 69.730594,6.60260412 70.3281,14.02343
       C70.9301836,21.50049 74.0961573,27.0302603 74.78883,18.83163
       C77.5927734,-0.603027419 100,0 100,0'

      IEnormPath = 'M 0 99.9661 L 3.13086 99.9661 C 11.1284 -42.5142
        24.7358 10.3389 24.7358 10.3389 C 24.7358 10.3389 35.4207 6.43612
        35.4207 19.5517 C 35.4207 19.5518 35.4207 28.5204 38.4679 20.101
        C 45.9122 -2.41707 48.248 19.328 49.4206 19.325 C 49.4206 6.88001
        55.0592 -3.51335 59 15.8786 C 60.6252 22.5932 56.8918 -3.34082
        65.4951 -3.34082 C 68.7341 -3.54252 69.7306 6.6026 70.3281 14.0234
        C 70.9302 21.5005 74.0962 27.0303 74.7888 18.8316 C 77.5928
        -0.603027 100 0 100 0'
      
      easing = pe.create path
      attr = easing.path.getAttribute('d')
      isNormPath = (attr is normPath) or (attr is IEnormPath)
      expect(isNormPath).toBe true

  describe '_normalizeSegment method', ->
    it 'should normalize segment by passed value', ->
      pe = new PathEasing 'creator'
      expect(pe._normalizeSegment('0.1522, 100 ', 0)).toBe '0,100'
    it 'should last value of the segment', ->
      pe = new PathEasing 'creator'
      segment = ' 0.1522, 100 20, 30 12,10'
      normSegment = '0.1522,100 20,30 100,10'
      expect(pe._normalizeSegment(segment, 100)).toBe normSegment

  describe '_getSegmentPairs', ->
    it 'should normalize an array by pairs', ->
      pe = new PathEasing 'creator'
      pairs = pe._getSegmentPairs(['0.12', '102'])
      expect(pairs[0][0]).toBe '0.12'
      expect(pairs[0][1]).toBe '102'
      pairs = pe._getSegmentPairs(['0.12', '102', 200, 12])
      expect(pairs[0][0]).toBe '0.12'
      expect(pairs[0][1]).toBe '102'
      expect(pairs[1][0]).toBe 200
      expect(pairs[1][1]).toBe 12

    it 'should error if array is not even', ->
      pe = new PathEasing 'creator'
      spyOn h, 'error'
      pairs = pe._getSegmentPairs(['0.12', '102', 200])
      expect(h.error).toHaveBeenCalled()



    





