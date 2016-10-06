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
    it('should expose shapesMap.addShape mojs', function() {
      return expect(mojs.addShape).toBe(mojs.shapesMap.addShape);
    });
    it('should expose shapesMap.customShape mojs', function() {
      return expect(mojs.CustomShape).toBe(mojs.shapesMap.custom);
    });
    it('should have Burst', function() {
      return expect(mojs.Burst).toBeDefined();
    });
    it('should have Shape', function() {
      return expect(mojs.Shape).toBeDefined();
    });
    it('should have Transit alias', function() {
      return expect(mojs.Transit).toBe(mojs.Shape);
    });
    it('should have Html', function() {
      return expect(mojs.Html).toBeDefined();
    });
    it('should have ShapeSwirl', function() {
      return expect(mojs.ShapeSwirl).toBeDefined();
    });
    it('should have Swirl alias', function() {
      return expect(mojs.Swirl).toBe(mojs.ShapeSwirl);
    });
    it('should have stagger', function() {
      return expect(mojs.stagger).toBeDefined();
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
    it('should have Tweenable', function() {
      return expect(mojs.Tweenable).toBeDefined();
    });
    it('should have Thenable', function() {
      return expect(mojs.Thenable).toBeDefined();
    });
    it('should have Tunable', function() {
      return expect(mojs.Tunable).toBeDefined();
    });
    it('should have Module', function() {
      return expect(mojs.Module).toBeDefined();
    });
    it('should have tweener', function() {
      return expect(mojs.tweener).toBeDefined();
    });
    it('should have easing', function() {
      return expect(mojs.easing).toBeDefined();
    });
    it('should have shapesMap', function() {
      return expect(mojs.shapesMap).toBeDefined();
    });
    it('should have _pool', function() {
      expect(typeof mojs._pool).toBe('object');
      return expect(mojs._pool).toBe(mojs._pool);
    });
    it('should have delta', function() {
      return expect(mojs._pool.Delta).toBeDefined();
    });
    return it('should have deltas', function() {
      return expect(mojs._pool.Deltas).toBeDefined();
    });
  });

}).call(this);
