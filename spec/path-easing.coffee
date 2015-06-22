h          = mojs.h
PathEasing = mojs.easing.PathEasing

describe 'PathEasing ->', ->
  # it 'should be a function', ->
  #   expect(typeof mojs.easing.PathEasing).toBe 'function'
  # it 'should not init if "creator" was passed', ->
  #   pe = new PathEasing 'creator'
  #   expect(pe.precision).not.toBeDefined()

  describe 'variables ->', ->
    it 'should have _eps defined', ->
      pe = new PathEasing 'M0,0 10,10'
      expect(pe._eps).toBeDefined()
    it 'should have _eps defined', ->
      pe = new PathEasing 'M0,0 10,10'
      expect(pe._stepsCount).toBe 5000
      expect(pe._step).toBe       1/pe._stepsCount
    it 'should have _boundsPrevProgress defined', ->
      pe = new PathEasing 'M0,0 10,10'
      expect(pe._boundsPrevProgress).toBe -1


  # describe 'path parsing ->', ->
  #   it 'should parse path', ->
  #     path = 'M0,0 10,10'
  #     spyOn h, 'parsePath'
  #     pe = new PathEasing path
  #     expect(h.parsePath).toHaveBeenCalledWith path
  #   it 'should save path and pathLength', ->
  #     path = 'M0,0 10,10'
  #     pe = new PathEasing path
  #     expect(pe.path).toBeDefined()
  #     expect(pe.pathLength).toBe pe.path.getTotalLength()
  #   it 'should error if path wasnt parsed', ->
  #     path = 'M0,0 10,10'
  #     spyOn h, 'error'
  #     spyOn h, 'parsePath' # spoil the parsePath method
  #     pe = new PathEasing path
  #     expect(h.error).toHaveBeenCalled()

  # describe 'options ->', ->
  #   it 'should recieve "precision" option', ->
  #     path = 'M0,0 10,10'
  #     pe = new PathEasing path, precision: 10
  #     expect(pe.precision).toBe 10
  #   it 'should recieve "rect" option', ->
  #     path = 'M0,0 10,10'
  #     pe = new PathEasing path, rect: 200
  #     expect(pe.rect).toBe 200

  describe '_preSample method ->', ->
    it 'should pre sample the path', ->
      pe = new PathEasing 'M0,100 100,0'
      len = pe.pathLength
      expect(pe._samples[0]).toBeDefined()
      expect(pe._samples[1]).toBeDefined()
      expect(pe._samples[2]).toBeDefined()
      expect(pe._samples[50]).toBeDefined()
      expect(pe._samples[pe._stepsCount-1]).toBeDefined()

  describe 'sample method ->', ->
    # it 'should clamp x value', ->
    #   path = 'M0,100 100,0'
    #   pe = new PathEasing path
    #   expect(pe.sample(-.5)).toBeCloseTo 0, 5
    #   expect(pe.sample(1.5)).toBeCloseTo 1, 5
    # it 'should return y', ->
    #   path = 'M0,100 100,0'
    #   pe = new PathEasing path
    #   expect(pe.sample(.7)).toBe .7
    # it 'should sample y', ->
    #   path = 'M0,100 100,0'
    #   pe = new PathEasing path
    #   expect(pe.sample(.706)).toBeCloseTo .706, 4

  describe '_hardSample method', ->
    # it 'should return y', ->
    #   pe1 = new PathEasing 'M0,100 100,0'
    #   p = 0.203231
    #   bounds = pe1._findBounds pe1._samples, p
    #   value = pe1._hardSample p, bounds.start.length, bounds.end.length
    #   expect(value).toBeCloseTo p, 4

  describe '_findBounds method', ->
    it 'should find lowest and highest bounderies',->
      pe1 = new PathEasing 'M0,100 100,0'
      progress = .735
      bounds = pe1._findBounds pe1._samples, progress
    it 'should save previous start index', ->
      pe1 = new PathEasing 'M0,100 100,0'
      progress = .735
      bounds = pe1._findBounds pe1._samples, progress
      expect(pe1._boundsStartIndex).toBeGreaterThan 3600
      expect(pe1._boundsPrevProgress).toBe .735

    it 'should reset previous start index if current
        progress is smaller then previous one', ->
      pe1 = new PathEasing 'M0,100 100,0'
      progress = .735; newProgress = progress - .1
      bounds = pe1._findBounds pe1._samples, progress
      bounds = pe1._findBounds pe1._samples, newProgress
      expect(pe1._boundsStartIndex).toBe   0
      expect(pe1._boundsPrevProgress).toBe newProgress

  describe '_resolveY method', ->
    it 'should resolve Y from point', ->
      pe1 = new PathEasing('M0,100 100,0'); y = 10
      expect(pe1._resolveY(y: y)).toBe 1-(y/100)

  # describe 'create method ->', ->
  #   it 'should create new instance of path-easing and return it\'s method', ->
  #     pe = new PathEasing 'creator'
  #     easing = pe.create('M0,100 100,0', precision: 10)
  #     expect(typeof easing).toBe 'function'
  #     expect(easing(.5)).toBe .5







