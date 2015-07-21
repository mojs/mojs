(function() {
  var Staggler;

  Staggler = mojs.Staggler;

  describe('Staggler ->', function() {
    describe('_getOptionByMod method ->', function() {
      it('should get an option by modulo of i', function() {
        var options, s;
        options = {
          bit: ['foo', 'bar', 'baz']
        };
        s = new Staggler;
        expect(s._getOptionByMod('bit', 0, options)).toBe('foo');
        expect(s._getOptionByMod('bit', 1, options)).toBe('bar');
        expect(s._getOptionByMod('bit', 2, options)).toBe('baz');
        expect(s._getOptionByMod('bit', 3, options)).toBe('foo');
        return expect(s._getOptionByMod('bit', 7, options)).toBe('bar');
      });
      return it('should return option if it isnt defined by array', function() {
        var options, s;
        options = {
          bit: 'foo'
        };
        s = new Staggler;
        expect(s._getOptionByMod('bit', 0, options)).toBe('foo');
        return expect(s._getOptionByMod('bit', 1, options)).toBe('foo');
      });
    });
    return describe('_getOptionByIndex method ->', function() {
      return it('should get option by modulo of index', function() {
        var option1, options, s;
        options = {
          bax: ['foo', 'bar', 'baz'],
          qux: 200,
          norf: ['norf', 300]
        };
        s = new Staggler;
        option1 = s._getOptionByIndex(0, options);
        expect(option1.bax).toBe('foo');
        expect(option1.qux).toBe(200);
        return expect(option1.norf).toBe('norf');
      });
    });
  });

}).call(this);
