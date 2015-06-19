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
      expect(pe._samples['0.001']).toBeDefined()
      expect(pe._samples['0.002']).toBeDefined()
      expect(pe._samples['0.5']).toBeDefined()

  describe 'create method ->', ->
    it 'should create new instance of path-easing and return it\'s method', ->
      pe = new PathEasing 'creator'
      easing = pe.create('M0,100 100,0', precision: 10)
      expect(typeof easing).toBe 'function'
      expect(easing(.5)).toBe .5

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
      pe = new PathEasing path
      expect(pe.sample(.706)).toBeCloseTo .706, 4
    it 'should return nearest value if it less then _eps', ->
      path = 'M0,100 100,0'
      pe = new PathEasing path
      expect(pe.sample(.70000000000005)).toBe .7
    it 'should return nearest value if it less then _eps', ->
      path = 'M0,100 100,0'
      pe = new PathEasing path
      expect(pe.sample(.7099999999999999999)).toBe pe._samples['0.71']

  describe '_hardSample method', ->
    it 'should return y', ->
      pe1 = new PathEasing 'M0,100 100,0'
      pe2 = new PathEasing 'M0,100 100,0'
      searchValue = 0.203231
      value = pe1._hardSample searchValue, 0.7065, 0.7067
      value = pe2._hardSample searchValue, 0, 1

      pe1.isIt  = true
      # console.log pe1.sample 0.7065
      
      # count = 60
      # console.time 'old'
      # for i in [0..count]
      #   value = pe1._hardSample searchValue, 0, 1
      # console.timeEnd 'old'

      # console.time 'new'
      # for i in [0..count]
      #   value = pe2._hardSample searchValue, 0.203, 0.2035
      # console.timeEnd 'new'


      # pathY = 1-(pe.path.getPointAtLength(pe.pathLength*searchValue).y/100)
      # # console.log value
      # expect(value).toBeCloseTo pathY, 5


  describe '_findSmaller method', ->
    it 'should find item that is smaller then current',->
      pe = new PathEasing 'M0,100 100,0'
      index = pe._findSmaller Object.keys(pe._samples), 0.1
      expect(index.value).toBe 0.099
      expect(index.index).toBe 99
    # it 'should return 0 if start index is 0',->
    #   pe = new PathEasing 'M0,100 100,0'
    #   index = pe._findSmaller Object.keys(pe._samples), 0
    #   expect(index.value).toBe 0
    #   expect(index.index).toBe 0

  # describe '_findLarger method', ->
  #   it 'should find item that is smaller then current',->
  #     pe = new PathEasing 'M0,100 100,0'
  #     index = pe._findLarger Object.keys(pe._samples), 0.1, 10
  #     expect(index).toBe 0.101
  #   it 'should return 1 if end index is 1',->
  #     pe = new PathEasing 'M0,100 100,0'
  #     index = pe._findLarger Object.keys(pe._samples), 1
  #     expect(index).toBe 1










