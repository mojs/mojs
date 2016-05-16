shapesMap = window.mojs.shapesMap
h = mojs.h

describe 'shapesMap ->', ->
  it 'should have all available shapes', ->
    expect(shapesMap.bit)       .toBeDefined()
    expect(shapesMap.circle)    .toBeDefined()
    expect(shapesMap.line)      .toBeDefined()
    expect(shapesMap.zigzag)    .toBeDefined()
    expect(shapesMap.rect)      .toBeDefined()
    expect(shapesMap.polygon)   .toBeDefined()
    expect(shapesMap.cross)     .toBeDefined()
    expect(shapesMap.equal)     .toBeDefined()
    expect(shapesMap.curve)     .toBeDefined()
  describe 'getShape', ->
    it 'should get bit by string', ->
      expect(shapesMap.getShape('bit')).toBeDefined()
    it 'should console.error if bit was not found', ->
      spyOn h, 'error'
      shapesMap.getShape('')
      expect(h.error).toHaveBeenCalled()


