Transit = mojs.Transit
Swirl   = mojs.Swirl

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
      expect(swirl.positionDelta.radius).toBe 20
    it 'should calc position angle', ->
      swirl = new Swirl x: {0:10}, y: {0:10}
      expect(swirl.positionDelta.angle).toBe 135
    it 'should save startX and StartY values', ->
      swirl = new Swirl x: {0:10}, y: {10:10}
      expect(swirl.positionDelta.x.start).toBe 0
      expect(swirl.positionDelta.y.start).toBe 10
    it 'should set start position anyways', ->
      swirl = new Swirl x: {0:10}, y: 0, isRunLess: true
      expect(parseInt(swirl.props.x, 10)).toBe 0
      expect(parseInt(swirl.props.y, 10)).toBe 0
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
      swirl = new Swirl x: {0:10}, y: {0:10}, isRunLess: true, isIt: true
      swirl.setProgress .5
      expect(swirl.props.x).toBe '3.5355px'
      expect(swirl.props.y).toBe '3.5355px'

