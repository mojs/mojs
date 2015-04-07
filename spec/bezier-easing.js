(function() {
  var bezier;

  bezier = mojs.easing.bezier;

  describe('bezier easing ->', function() {
    it('should be a function', function() {
      return expect(typeof bezier).toBe('function');
    });
    it('should return a function', function() {
      return expect(typeof bezier(0, 0, 1, 1)).toBe('function');
    });
    return describe('arguments parsing ->', function() {
      it('should error if no arguments', function() {
        spyOn(mojs.h, 'error');
        expect(bezier()).toBe(void 0);
        return expect(mojs.h.error).toHaveBeenCalled();
      });
      it('should error if 1 argument', function() {
        spyOn(mojs.h, 'error');
        expect(bezier(1)).toBe(void 0);
        return expect(mojs.h.error).toHaveBeenCalled();
      });
      it('should error if 2 arguments', function() {
        spyOn(mojs.h, 'error');
        expect(bezier(2, 1)).toBe(void 0);
        return expect(mojs.h.error).toHaveBeenCalled();
      });
      it('should error if 3 arguments', function() {
        spyOn(mojs.h, 'error');
        expect(bezier(2, 1, 3)).toBe(void 0);
        return expect(mojs.h.error).toHaveBeenCalled();
      });
      return it('should error if 3 arguments', function() {
        spyOn(mojs.h, 'error');
        expect(bezier(2, 1, 3)).toBe(void 0);
        return expect(mojs.h.error).toHaveBeenCalled();
      });
    });
  });

}).call(this);
