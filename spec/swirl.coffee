Transit = mojs.Transit
Swirl   = mojs.Swirl

tr = new Transit
describe 'Swirl ->', ->
  describe 'extension ->', ->
    it 'should extend Transit class', ->
      swirl = new Swirl
      expect(swirl instanceof Transit).toBe true
    it 'should have skipPropsDelta', ->
      swirl = new Swirl
      expect(swirl.skipPropsDelta.x).toBe 1
      expect(swirl.skipPropsDelta.y).toBe 1
  describe 'position calc ->', ->
    it 'should calc position radius', ->
      swirl = new Swirl x: {0:10}, y: {0:20}
      expect(swirl.positionDelta.radius).toBe Math.sqrt (10*10 + 20*20)
    it 'should calc position angle', ->
      swirl = new Swirl x: {0:10}, y: {0:10}
      expect(swirl.positionDelta.angle).toBe 135
    it 'should calc position angle', ->
      swirl = new Swirl x: {0:-10}, y: {0:-10}
      expect(swirl.positionDelta.angle).toBe - 45
    it 'should calc position angle', ->
      swirl = new Swirl x: {0:0}, y: {0:-10}
      expect(swirl.positionDelta.angle).toBe 0
    it 'should calc position angle', ->
      swirl = new Swirl x: {0:-10}, y: {0:0}
      expect(swirl.positionDelta.angle).toBe 270
    it 'should save startX and StartY values', ->
      swirl = new Swirl x: {0:10}, y: {10:10}
      expect(swirl.positionDelta.x.start).toBe 0
      expect(swirl.positionDelta.y.start).toBe 10
    it 'should set start position anyways', ->
      swirl = new Swirl x: {0:10}, y: 0, isRunLess: true
      expect(swirl.props.x).toBe '0.0000px'
      expect(swirl.props.y).toBe '0.0000px'
    it 'should call super extendDefaults method', ->
      swirl = new Swirl radius: [{ 20: 50 }, 20]
      spyOn Swirl.__super__, 'extendDefaults'
      swirl.extendDefaults()
      expect(Swirl.__super__.extendDefaults).toHaveBeenCalled()

  describe 'setProgress ->', ->
    it 'should call super setProgress method', ->
      swirl = new Swirl radius: [{ 20: 50 }, 20]
      spyOn Swirl.__super__, 'setProgress'
      swirl.setProgress .5
      expect(Swirl.__super__.setProgress).toHaveBeenCalledWith .5
    it 'should set x/y progress', ->
      swirl = new Swirl x: {0:10}, y: {0:10}, isRunLess: true, isSwirlLess: true
      swirl.setProgress .5
      expect(swirl.props.x).toBe '5.0000px'
      expect(swirl.props.y).toBe '5.0000px'
    it 'should set x/y progress', ->
      swirl = new Swirl x: {0:10}, y: {0:10}, isRunLess: true, isSwirlLess: true
      swirl.setProgress 1
      expect(swirl.props.x).toBe '10.0000px'
      expect(swirl.props.y).toBe '10.0000px'
    it 'should set negative x/y progress', ->
      swirl = new Swirl
        x: {0:'-10'}, y: {0:'-10'}, isRunLess: true, isSwirlLess: true
      swirl.setProgress 1
      expect(swirl.props.x).toBe '-10.0000px'
      expect(swirl.props.y).toBe '-10.0000px'

    it 'should set plain x/y progress if foreign context', ->
      swirl = new Swirl
        x: {0:10}, y: {0:10}, ctx: tr.ctx,
        isRunLess: true, isSwirlLess: true
      swirl.setProgress 1
      expect(swirl.props.x+'').toBe '10.0000'
      expect(swirl.props.y+'').toBe '10.0000'
    it 'should respect angleShift value', ->
      swirl = new Swirl
        x: {0:10}, y: {0:10}, isRunLess: true,
        isSwirlLess: true, angleShift: 90
      swirl.setProgress .5
      expect(swirl.props.x).toBe '-5.0000px'
      expect(swirl.props.y).toBe '5.0000px'
    it 'should respect radiusScale value', ->
      swirl = new Swirl
        x: {0:10}, y: {0:10}, isRunLess: true,
        isSwirlLess: true, radiusScale: .5
      swirl.setProgress 1
      expect(swirl.props.x).toBe '5.0000px'
      expect(swirl.props.y).toBe '5.0000px'
    it 'should set add swirl if option was passed', ->
      swirl = new Swirl x: {0:10}, y: {0:10}, isRunLess: true
      swirl.setProgress .5
      expect(swirl.props.x).not.toBe '5.0000px'
      expect(swirl.props.y).not.toBe '5.0000px'
  describe 'generateSwirl method ->', ->
    it 'should generate simple swirl', ->
      swirl = new Swirl swirlSize: 3, swirlFrequency: 2
      swirl.generateSwirl()
      expect(swirl.props.swirlSize).toBe      3
      expect(swirl.props.swirlFrequency).toBe 2
    it 'should generate rand swirl', ->
      swirl = new Swirl swirlSize: 'rand(10,20)', swirlFrequency: 'rand(3,7)'
      swirl.generateSwirl()
      expect(swirl.props.swirlSize).toBeGreaterThan     9
      expect(swirl.props.swirlSize).not.toBeGreaterThan 20
    it 'should not generate simple swirl is isSwirlLess was passed', ->
      swirl = new Swirl isSwirlLess: true
      spyOn swirl, 'generateSwirl'
      swirl.init()
      expect(swirl.generateSwirl).not.toHaveBeenCalled()
  describe 'getSwirl method ->', ->
    it 'should calc swirl based on swirlFrequency and swirlSize props', ->
      swirl = new Swirl
      swirl1 = swirl.getSwirl(.5)
      freq = Math.sin(swirl.props.swirlFrequency*.5)
      sign = swirl.props.signRand
      expect(swirl1).toBe sign*swirl.props.swirlSize*freq
