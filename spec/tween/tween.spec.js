var Tween = mojs.Tween;

var helpers = mojs.__helpers__;
var ClassProto = helpers.ClassProto;
var tweenDefaults = helpers.tweenDefaults;

var eps = 0.0000001;

describe('tween', function () {

  describe('extension', function() {
    it('should extend `ClassProto`', function () {
      var tween = new Tween;
      expect(tween instanceof ClassProto).toBe(true);
    });
  });

  describe('initialization ->', function() {

    it('should have `defaults` of `tween` ->', function () {
      var tween = new Tween;
      expect(tween._defaults).toEqual(tweenDefaults);
    });

    // it('should create plan array ->', function () {
    //   var planner = new TweenPlanner;
    //   expect(planner._plan).toEqual([]);
    // });

  });

});
