(function() {
  describe('mojs ->', function() {
    it('should have revision', function() {
      return expect(typeof mojs.revision).toBe('string');
    });
    it('should have isDebug = true', function() {
      return expect(mojs.isDebug).toBe(true);
    });
    it('should have helpers defined', function() {
      return expect(mojs.helpers).toBeDefined();
    });
    it('should expose helpers to h variable', function() {
      return expect(mojs.h).toBe(mojs.helpers);
    });
    it('should expose h.delta mojs', function() {
      return expect(mojs.delta).toBe(mojs.helpers.delta);
    });
    it('should have bitsMap', function() {
      return expect(mojs.bitsMap).toBeDefined();
    });
    it('should have Circle', function() {
      return expect(mojs.Circle).toBeDefined();
    });
    it('should have Cross', function() {
      return expect(mojs.Cross).toBeDefined();
    });
    it('should have Line', function() {
      return expect(mojs.Line).toBeDefined();
    });
    it('should have Rect', function() {
      return expect(mojs.Rect).toBeDefined();
    });
    it('should have Polygon', function() {
      return expect(mojs.Polygon).toBeDefined();
    });
    it('should have Equal', function() {
      return expect(mojs.Equal).toBeDefined();
    });
    it('should have Zigzag', function() {
      return expect(mojs.Zigzag).toBeDefined();
    });
    it('should have Burst', function() {
      return expect(mojs.Burst).toBeDefined();
    });
    it('should have Transit', function() {
      return expect(mojs.Transit).toBeDefined();
    });
    it('should have Swirl', function() {
      return expect(mojs.Swirl).toBeDefined();
    });
    it('should have Stagger', function() {
      return expect(mojs.Stagger).toBeDefined();
    });
    it('should have Staggler', function() {
      return expect(mojs.Staggler).toBeDefined();
    });
    it('should have Spriter', function() {
      return expect(mojs.Spriter).toBeDefined();
    });
    it('should have MotionPath', function() {
      return expect(mojs.MotionPath).toBeDefined();
    });
    it('should have Timeline', function() {
      return expect(mojs.Timeline).toBeDefined();
    });
    it('should have Tween', function() {
      return expect(mojs.Tween).toBeDefined();
    });
    it('should have tweener', function() {
      return expect(mojs.tweener).toBeDefined();
    });
    return it('should have easing', function() {
      return expect(mojs.easing).toBeDefined();
    });
  });

}).call(this);
