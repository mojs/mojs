h          = mojs.h
PathEasing = mojs.easing.PathEasing

describe 'PathEasing ->', ->
  it 'should be a function', ->
    expect(typeof mojs.easing.PathEasing).toBe 'function'
  it 'should not init if "creator" was passed', ->
    pe = new PathEasing 'creator'
    expect(pe.precision).not.toBeDefined()

  describe 'variables ->', ->
    it 'should have _eps defined', ->
      pe = new PathEasing 'M0,0 10,10'
      expect(pe._eps).toBeDefined()

  describe 'path parsing ->', ->
    it 'should parse path', ->
      path = 'M0,0 10,10'
      spyOn h, 'parsePath'
      pe = new PathEasing path
      expect(h.parsePath).toHaveBeenCalledWith path
    it 'should save path and pathLength', ->
      path = 'M0,0 10,10'
      pe = new PathEasing path
      expect(pe.path).toBeDefined()
      expect(pe.pathLength).toBe pe.path.getTotalLength()
    it 'should error if path wasnt parsed', ->
      path = 'M0,0 10,10'
      spyOn h, 'error'
      spyOn h, 'parsePath' # spoil the parsePath method
      pe = new PathEasing path
      expect(h.error).toHaveBeenCalled()

  describe 'options ->', ->
    it 'should recieve "precision" option', ->
      path = 'M0,0 10,10'
      pe = new PathEasing path, precision: 10
      expect(pe.precision).toBe 10
    it 'should recieve "rect" option', ->
      path = 'M0,0 10,10'
      pe = new PathEasing path, rect: 200
      expect(pe.rect).toBe 200

  describe '_preSample method ->', ->
    it 'should pre sample the path', ->
      pe = new PathEasing 'M0,100 100,0'
      expect(pe._samples['0']).toBeDefined()
      expect(pe._samples['0.01']).toBeDefined()
      expect(pe._samples['0.02']).toBeDefined()
      expect(pe._samples['0.5']).toBeDefined()

  describe 'create method ->', ->
    it 'should create new instance of path-easing and return sample method', ->
      pe = new PathEasing 'creator'
      easing = pe.create('M0,100 100,0', precision: 10)
      expect(typeof easing).toBe 'function'
      expect(easing(.5)).toBe .5
      # expect(easing.toString()).toBe pe.sample.toString()

  describe 'sample method ->', ->
    it 'should clamp x value', ->
      path = 'M0,100 100,0'
      pe = new PathEasing path
      expect(pe.sample(-.5)).toBeCloseTo 0, 5
      expect(pe.sample(1.5)).toBeCloseTo 1, 5
    it 'should return y', ->
      path = 'M0,100 100,0'
      pe = new PathEasing path
      expect(pe.sample(.7)).toBe .7
    it 'should sample y', ->
      path = 'M0,100 100,0'
      pe = new PathEasing path, isIt: true
      expect(pe.sample(.705)).toBe .705
    it 'should return nearest value if it less then _eps', ->
      path = 'M0,100 100,0'
      pe = new PathEasing path, isIt: true
      expect(pe.sample(.70000000000005)).toBe .7










