bitsMap = window.mojs.shapesMap
h = mojs.h

describe 'bitsMap ->', ->
  it 'should have all available shapes', ->
    expect(bitsMap.bit)       .toBeDefined()
    expect(bitsMap.circle)    .toBeDefined()
    expect(bitsMap.line)      .toBeDefined()
    expect(bitsMap.zigzag)    .toBeDefined()
    expect(bitsMap.rect)      .toBeDefined()
    expect(bitsMap.polygon)   .toBeDefined()
    expect(bitsMap.cross)     .toBeDefined()
    expect(bitsMap.equal)     .toBeDefined()
  describe 'getBit', ->
    it 'should get bit by string', ->
      expect(bitsMap.getBit('bit')).toBeDefined()
    it 'should console.error if bit was not found', ->
      spyOn h, 'error'
      bitsMap.getBit('')
      expect(h.error).toHaveBeenCalled()


