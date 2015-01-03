(function() {
  describe('Main', function() {
    it('should run tests', function() {
      return expect(mojs["var"]).toBe('var');
    });
    it('should have method', function() {
      return expect(mojs.method).toBeDefined();
    });
    it('should have tar', function() {
      mojs.method2();
      return expect(mojs.tar).toBe('nar');
    });
    return it('should have mar', function() {
      mojs.method();
      return expect(mojs.gar).toBe('mar');
    });
  });

}).call(this);
