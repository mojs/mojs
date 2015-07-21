
Staggler = mojs.Staggler

describe 'Staggler ->', ->
  describe '_getOptionByMod method ->', ->
    it 'should get an option by modulo of i', ->
      options = bit: ['foo', 'bar', 'baz']
      s = new Staggler
      expect(s._getOptionByMod('bit', 0, options)).toBe 'foo'
      expect(s._getOptionByMod('bit', 1, options)).toBe 'bar'
      expect(s._getOptionByMod('bit', 2, options)).toBe 'baz'
      expect(s._getOptionByMod('bit', 3, options)).toBe 'foo'
      expect(s._getOptionByMod('bit', 7, options)).toBe 'bar'
    it 'should return option if it isnt defined by array', ->
      options = bit: 'foo'
      s = new Staggler
      expect(s._getOptionByMod('bit', 0, options)).toBe 'foo'
      expect(s._getOptionByMod('bit', 1, options)).toBe 'foo'
  
  describe '_getOptionByIndex method ->', ->
    it 'should get option by modulo of index', ->
      options =
        bax:  ['foo', 'bar', 'baz']
        qux:  200
        norf: ['norf', 300]
      s = new Staggler
      option1 = s._getOptionByIndex 0, options
      expect(option1.bax) .toBe 'foo'
      expect(option1.qux) .toBe 200
      expect(option1.norf).toBe 'norf'

