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
    it('should have Burst', function() {
      return expect(mojs.Burst).toBeDefined();
    });
    it('should have Transit', function() {
      return expect(mojs.Transit).toBeDefined();
    });
    it('should have Swirl', function() {
      return expect(mojs.Swirl).toBeDefined();
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
    it('should have Runable', function() {
      return expect(mojs.Runable).toBeDefined();
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
    return it('should have shapesMap', function() {
      return expect(mojs.shapesMap).toBeDefined();
    });
  });

}).call(this);
