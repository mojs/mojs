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
      it('should error if 3 arguments', function() {
        spyOn(mojs.h, 'error');
        expect(bezier(2, 1, 3)).toBe(void 0);
        return expect(mojs.h.error).toHaveBeenCalled();
      });
      it('should error if string argument', function() {
        spyOn(mojs.h, 'error');
        expect(bezier(2, 1, 3, 'a')).toBe(void 0);
        return expect(mojs.h.error).toHaveBeenCalled();
      });
      it('should error if NaN argument', function() {
        spyOn(mojs.h, 'error');
        expect(bezier(2, 1, 3, NaN)).toBe(void 0);
        return expect(mojs.h.error).toHaveBeenCalled();
      });
      it('should error if Infinity argument', function() {
        spyOn(mojs.h, 'error');
        expect(bezier(2, 1, 3, Infinity)).toBe(void 0);
        return expect(mojs.h.error).toHaveBeenCalled();
      });
      it('should error if Infinity argument', function() {
        spyOn(mojs.h, 'error');
        expect(bezier(2, 1, 3, Infinity)).toBe(void 0);
        return expect(mojs.h.error).toHaveBeenCalled();
      });
      it('should error if x < 0', function() {
        spyOn(mojs.h, 'error');
        expect(bezier(0.5, 0.5, -5, 0.5)).toBe(void 0);
        return expect(mojs.h.error).toHaveBeenCalled();
      });
      it('should error if x < 0 #2', function() {
        spyOn(mojs.h, 'error');
        expect(bezier(-2, 0.5, 1, 0.5)).toBe(void 0);
        return expect(mojs.h.error).toHaveBeenCalled();
      });
      it('should error if x < 0 #3', function() {
        spyOn(mojs.h, 'error');
        expect(bezier(-Math.random() - 0.000001, 0.5, 0.5, 0.5)).toBe(void 0);
        return expect(mojs.h.error).toHaveBeenCalled();
      });
      it('should error if x > 1', function() {
        spyOn(mojs.h, 'error');
        expect(bezier(0.5, 0.5, 5, 0.5)).toBe(void 0);
        return expect(mojs.h.error).toHaveBeenCalled();
      });
      it('should error if x > 1 #2', function() {
        spyOn(mojs.h, 'error');
        expect(bezier(2, 0.5, 1, 0.5)).toBe(void 0);
        return expect(mojs.h.error).toHaveBeenCalled();
      });
      return it('should error if x > 1 #3', function() {
        spyOn(mojs.h, 'error');
        expect(bezier(0.5, 0.5, 1.000001 + Math.random(), 0.5)).toBe(void 0);
        return expect(mojs.h.error).toHaveBeenCalled();
      });
    });
  });

}).call(this);
