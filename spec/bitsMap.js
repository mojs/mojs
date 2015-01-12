(function() {
  var bitsMap;

  bitsMap = window.mojs.bitsMap;

  describe('bitsMap ->', function() {
    it('should have h object', function() {
      return expect(bitsMap.h).toBeDefined();
    });
    it('should have all available shapes', function() {
      expect(bitsMap.map.bit).toBeDefined();
      expect(bitsMap.map.circle).toBeDefined();
      expect(bitsMap.map.line).toBeDefined();
      expect(bitsMap.map.rect).toBeDefined();
      return expect(bitsMap.map.triangle).toBeDefined();
    });
    return describe('getBit', function() {
      it('should get bit by string', function() {
        return expect(bitsMap.getBit('bit')).toBeDefined();
      });
      return it('should console.error if bit was not found', function() {
        spyOn(bitsMap.h, 'error');
        bitsMap.getBit('');
        return expect(bitsMap.h.error).toHaveBeenCalled();
      });
    });
  });

}).call(this);
