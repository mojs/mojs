var Deltas = mojs.Deltas;
var Rig = mojs.Rig;
var Tweenable = helpers.Tweenable;

describe('`rig` ->', function () {
  describe('extension ->', function() {
    it('should extend `ClassProto`', function () {
      var rig = new Rig();
      expect(Tweenable.__mojsClass.isPrototypeOf(rig)).toBe(true);
    });

    it('should have `_defaults`', function () {
      var rig = new Rig();

      expect(rig._defaults.direction).toBe(1);
      expect(rig._defaults.curvature).toBe(0);
      expect(rig._defaults.center).toBe(.5);
      expect(rig._defaults.x1).toBe(0);
      expect(rig._defaults.y1).toBe(0);
      expect(rig._defaults.x2).toBe(0);
      expect(rig._defaults.y2).toBe(100);
    });
  });

  describe('`_render` ->', function() {
    it('should', function () {
    });
  });

});
