/**
 * Unit tests for tween planner.
 */

var helpers = mojs.__helpers__;
var TweenPlanner = helpers.TweenPlanner;
var ClassProto = helpers.ClassProto;
var tweenDefaults = helpers.tweenDefaults;

var eps = 0.0000001;

describe('tween planner', function() {

  describe('extension', function() {
    it('should extend `ClassProto`', function () {
      var planner = new TweenPlanner;
      expect(planner instanceof ClassProto).toBe(true);
    });
  });

  describe('initialization ->', function() {
    it('should have `defaults` of `tween` ->', function () {
      var planner = new TweenPlanner;
      expect(planner._defaults).toEqual(tweenDefaults);
    });

    it('should create plan array ->', function () {
      var planner = new TweenPlanner;
      expect(planner._plan).toEqual([]);
    });

    it('should normalize `delay` and `duration regarding `speed` #slow ->', function () {
      var duration = 2000;
      var delay = 200;
      var speed = .2;
      var planner = new TweenPlanner({
        speed: speed,
        delay: delay,
        duration: duration
      });
      var props = planner._props;

      expect(props.delay).toBe(delay/speed);
      expect(props.duration).toBe(duration/speed);
      expect(planner._originalDelay).toBe(delay);
      expect(planner._originalDuration).toBe(duration);
    });

    it('should normalize `delay` and `duration regarding `speed` #fast ->', function () {
      var duration = 2000;
      var delay = 200;
      var speed = 4;
      var planner = new TweenPlanner({
        speed: speed,
        delay: delay,
        duration: duration
      });
      var props = planner._props;

      expect(props.delay).toBe(delay/speed);
      expect(props.duration).toBe(duration/speed);
    });

  });

  describe('createPlan function ->', function() {
    it('should call _calcTotalTime function', function () {
      var planner = new TweenPlanner({
        duration: 2000
      });
      spyOn(planner, '_calcTotalTime');
      planner.createPlan();
      expect(planner._calcTotalTime).toHaveBeenCalled();
    });

    it('should create a plan #duration', function () {
      var planner = new TweenPlanner({
        duration: 200
      });
      planner.createPlan();

      expect(planner._plan)
        .toEqual([ 14, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 56 ]);
    });

    it('should create a plan #delay #duration', function () {
      var planner = new TweenPlanner({
        duration: 200,
        delay: 50
      });
      planner.createPlan();

      expect(planner._plan)
        .toEqual([ 14, 8, 8, 8, 8, 8, 8, 8, 8, 24, 12, 8, 40 ]);
    });

    it('should create a plan #delay #duration #repeat', function () {
      var planner = new TweenPlanner({
        duration: 100,
        delay: 50,
        repeat: 2
      });
      planner.createPlan();

      expect(planner._plan)
        .toEqual([ 14, 8, 8, 8, 8, 8, 24, 0, 0, 0, 12, 8, 8, 8, 8, 24, 0, 0, 0, 12, 8, 24, 12, 8, 40 ]);
    });

    it('should create a plan #delay #duration #repeat #speed #fast', function () {
      var planner = new TweenPlanner({
        repeat: 2,
        duration: 100,
        delay: 50,
        speed: 4
      });
      planner.createPlan();

      expect(planner._plan)
        .toEqual([ 14, 24, 0, 28, 0, 28, 44 ]);
    });
  });

  describe('_calcTotalTime function ->', function() {
    it('should calculate `totalTime #duration` ', function () {
      var duration = 2000;
      var options = { duration: duration };
      var planner = new TweenPlanner(options);

      planner._calcTotalTime();
      expect(planner._totalTime).toBe(duration);
    });

    it('should calculate `totalTime #delay #duration` ', function () {
      var duration = 2000;
      var delay = 200;
      var options = { duration: duration, delay: delay };
      var planner = new TweenPlanner(options);

      planner._calcTotalTime();
      expect(planner._totalTime).toBe(duration);
    });

    it('should calculate `totalTime #delay #duration #repeat` ', function () {
      var duration = 2000;
      var delay = 200;
      var repeat = 3;
      var planner = new TweenPlanner({
        duration: duration,
        delay: delay,
        repeat: repeat
      });

      planner._calcTotalTime();
      expect(planner._totalTime).toBe((repeat+1)*(delay+duration) - delay);
    });

    it('should be called on initialization` ', function () {
      var duration = 2000;
      var delay = 200;
      var repeat = 3;
      var planner = new TweenPlanner({
        duration: duration,
        delay: delay,
        repeat: repeat
      });

      expect(planner._totalTime).toBe((repeat+1)*(delay+duration) - delay);
    });

  });

  describe('_getPeriod function ->', function() {
    it('should get current period #delay #duration', function() {
      var duration = 50;
      var delay = 20;
      var planner = new TweenPlanner({
        delay: delay,
        duration: duration
      });

      expect(planner._getPeriod(eps)).toBe(0);
      expect(planner._getPeriod(duration/2)).toBe(0);
      expect(planner._getPeriod(duration + delay/2)).toBe(1);
    });

    it('should get current period #delay #duration #repeat', function() {
      var duration = 50;
      var delay = 20;
      var repeat = 3;
      var planner = new TweenPlanner({
        delay: delay,
        duration: duration,
        repeat: repeat
      });

      var period = duration + delay;

      expect(planner._getPeriod(eps)).toBe(0);
      expect(planner._getPeriod(duration/2)).toBe(0);

      expect(planner._getPeriod(duration + delay/2)).toBe('delay');

      expect(planner._getPeriod(period + eps + duration/2)).toBe(1);
      expect(planner._getPeriod(period + eps + duration)).toBe('delay');
      expect(planner._getPeriod(period + eps + duration + delay/2)).toBe('delay');

      period = 2 * (duration + delay);

      expect(planner._getPeriod(period + eps)).toBe(2);
      expect(planner._getPeriod(period + eps + duration/2)).toBe(2);
      expect(planner._getPeriod(period + eps + duration)).toBe('delay');
      expect(planner._getPeriod(period + eps + duration + delay/2)).toBe('delay');

      period = 3 * (duration + delay);

      expect(planner._getPeriod(period + eps)).toBe(3);
      expect(planner._getPeriod(period + eps + duration/2)).toBe(3);
      // since all repeat perods elapsed - we will have `4` instead of `delay`
      expect(planner._getPeriod(period + eps + duration)).toBe(4);
      expect(planner._getPeriod(period + eps + duration + delay/2)).toBe(4);

    });
    it('should get the current period with no delay', function() {
      var duration = 50;
      var repeat = 3;
      var planner = new TweenPlanner({
        repeat: 3,
        duration: duration
      });

      expect(planner._getPeriod(eps)).toBe(0);
      expect(planner._getPeriod(duration / 2)).toBe(0);
      expect(planner._getPeriod(duration)).toBe(1);
      expect(planner._getPeriod(duration + eps)).toBe(1);
      var period = duration;
      expect(planner._getPeriod(period + duration / 2)).toBe(1);
      expect(planner._getPeriod(period + duration)).toBe(2);
      expect(planner._getPeriod(period + duration + eps)).toBe(2);

      period = 2 * duration;
      expect(planner._getPeriod(period + duration / 2)).toBe(2);
      expect(planner._getPeriod(period + duration)).toBe(3);
      expect(planner._getPeriod(period + duration + eps)).toBe(3);

      period = 3 * duration;
      expect(planner._getPeriod(period + duration / 2)).toBe(3);
      expect(planner._getPeriod(period + duration)).toBe(4);
      expect(planner._getPeriod(period + duration + eps)).toBe(4);
    });

    it('should return period number if time > endTime', function() {
      var duration = 50;
      var delay = 20;
      var repeat = 2;
      var planner = new TweenPlanner({
        delay: delay,
        duration: duration,
        repeat: repeat
      });

      var period = 3 * (duration + delay) - delay;
      expect(planner._getPeriod(period + delay / 2)).toBe(3);
    });
    it('should round instead of floor if time >= endTime', function() {
      var duration = 50 + 3 / 2.123;
      var repeat = 2;
      var planner = new TweenPlanner({
        duration: duration,
        repeat: repeat
      });

      expect(planner._getPeriod(3 * duration)).toBe(3);
    });

    it('should not fail because of precision error', function() {
      var duration = 500 + 4 / 10000.123;
      var delay = 200 + 4 / 10000.123;
      var repeat = 2;
      var planner = new TweenPlanner({
        delay: delay,
        duration: duration,
        repeat: repeat
      });

      return expect(planner._getPeriod(planner._totalTime)).toBe(3);
    });
  });


});
