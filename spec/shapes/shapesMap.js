(function() {
  var h, shapesMap;

  shapesMap = window.mojs.shapesMap;

  h = mojs.h;

  describe('shapesMap ->', function() {
    it('should have all available shapes', function() {
      expect(shapesMap.bit).toBeDefined();
      expect(shapesMap.circle).toBeDefined();
      expect(shapesMap.line).toBeDefined();
      expect(shapesMap.zigzag).toBeDefined();
      expect(shapesMap.rect).toBeDefined();
      expect(shapesMap.polygon).toBeDefined();
      expect(shapesMap.cross).toBeDefined();
      expect(shapesMap.equal).toBeDefined();
      return expect(shapesMap.curve).toBeDefined();
    });
    return describe('getShape', function() {
      it('should get bit by string', function() {
        return expect(shapesMap.getShape('bit')).toBeDefined();
      });
      return it('should console.error if bit was not found', function() {
        spyOn(h, 'error');
        shapesMap.getShape('');
        return expect(h.error).toHaveBeenCalled();
      });
    });
  });

}).call(this);
