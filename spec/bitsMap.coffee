bitsMap = window.mojs.bitsMap

describe 'bitsMap ->', ->
  it 'should have h object', -> expect(bitsMap.h).toBeDefined()
  it 'should have all available shapes', ->
    expect(bitsMap.map.bit)      .toBeDefined()
    expect(bitsMap.map.circle)   .toBeDefined()
    expect(bitsMap.map.line)     .toBeDefined()
    expect(bitsMap.map.rect)     .toBeDefined()
    expect(bitsMap.map.triangle) .toBeDefined()
  describe 'getBit', ->
    it 'should get bit by string', ->
      expect(bitsMap.getBit('bit')).toBeDefined()
    it 'should console.error if bit was not found', ->
      spyOn bitsMap.h, 'error'
      bitsMap.getBit('')
      expect(bitsMap.h.error).toHaveBeenCalled()


