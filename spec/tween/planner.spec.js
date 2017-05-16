var helpers = mojs.__helpers__;
var TweenPlanner = helpers.TweenPlanner;
var ClassProto = helpers.ClassProto;
var tweenDefaults = helpers.tweenDefaults;

var eps = 0.0000001;

describe('tween planner ->', function() {

  describe('extension', function() {
    it('should extend `ClassProto`', function () {
      var planner = new TweenPlanner;
      expect(ClassProto.isPrototypeOf(planner)).toBe(true);
    });
  });

  describe('createPlan function ->', function() {
    it('should create a plan #duration', function () {
      var planner = new TweenPlanner({
        duration: 128
      });

      expect(planner._plan)
        .toEqual([ 2, 0, 0, 0, 0, 0, 0, 4 ]);
    });
  });
});
