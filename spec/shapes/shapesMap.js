(function() {
  var bitsMap, h;

  bitsMap = window.mojs.shapesMap;

  h = mojs.h;

  describe('bitsMap ->', function() {
    it('should have all available shapes', function() {
      expect(bitsMap.bit).toBeDefined();
      expect(bitsMap.circle).toBeDefined();
      expect(bitsMap.line).toBeDefined();
      expect(bitsMap.zigzag).toBeDefined();
      expect(bitsMap.rect).toBeDefined();
      expect(bitsMap.polygon).toBeDefined();
      expect(bitsMap.cross).toBeDefined();
      return expect(bitsMap.equal).toBeDefined();
    });
    return describe('getBit', function() {
      it('should get bit by string', function() {
        return expect(bitsMap.getBit('bit')).toBeDefined();
      });
      return it('should console.error if bit was not found', function() {
        spyOn(h, 'error');
        bitsMap.getBit('');
        return expect(h.error).toHaveBeenCalled();
      });
    });
  });

}).call(this);
