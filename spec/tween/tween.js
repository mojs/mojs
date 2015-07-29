(function() {
  var Tween, easing, h, tweener;

  Tween = window.mojs.Tween;

  easing = window.mojs.easing;

  h = window.mojs.h;

  tweener = window.mojs.tweener;

  describe('Tween ->', function() {
    describe('defaults ->', function() {
      it('should have vars', function() {
        var t;
        t = new Tween;
        expect(t.props).toBeDefined();
        expect(t.h).toBeDefined();
        return expect(t.progress).toBe(0);
      });
      it('should have defaults', function() {
        var t;
        t = new Tween;
        expect(t.defaults.duration).toBe(600);
        expect(t.defaults.delay).toBe(0);
        expect(t.defaults.yoyo).toBe(false);
        return expect(t.defaults.isChained).toBe(false);
      });
      return it('should extend defaults to props', function() {
        var t;
        t = new Tween({
          duration: 1000
        });
        expect(t.props.duration).toBe(1000);
        return expect(t.props.delay).toBe(0);
      });
    });
    describe('init ->', function() {
      it('should calc time, repeatTime', function() {
        var t;
        t = new Tween({
          duration: 1000,
          delay: 100
        });
        expect(t.props.time).toBe(1100);
        return expect(t.props.repeatTime).toBe(1100);
      });
      it('should calc time, repeatTime #2', function() {
        var t;
        t = new Tween({
          duration: 1000,
          delay: 100,
          repeat: 2
        });
        expect(t.props.time).toBe(1100);
        return expect(t.props.repeatTime).toBe(3300);
      });
      it('should calculate shiftedRepeatTime', function() {
        var t;
        t = new Tween({
          duration: 1000,
          delay: 100,
          repeat: 2
        });
        expect(t.props.time).toBe(1100);
        expect(t.props.repeatTime).toBe(3300);
        return expect(t.props.shiftedRepeatTime).toBe(3200);
      });
      return it('should calculate shiftedRepeatTime #2', function() {
        var t;
        t = new Tween({
          duration: 1000,
          delay: 100,
          repeat: 2
        });
        t.setProp('shiftTime', 700);
        expect(t.props.time).toBe(1100);
        expect(t.props.repeatTime).toBe(3300);
        return expect(t.props.shiftedRepeatTime).toBe(3900);
      });
    });
    describe('isChained option ->', function() {
      it('should recieve isChained option', function() {
        var t;
        t = new Tween({
          duration: 1000,
          isChained: true
        });
        return expect(t.props.isChained).toBe(true);
      });
      return it('should fallback to default isChained option', function() {
        var t;
        t = new Tween({
          duration: 1000
        });
        return expect(t.props.isChained).toBe(false);
      });
    });
    describe('start ->', function() {
      it('should calculate start time', function() {
        var expectedTime, t;
        t = new Tween({
          duration: 1000,
          delay: 500
        }).start();
        expectedTime = performance.now() + 500;
        expect(t.props.startTime).toBeGreaterThan(expectedTime - 50);
        return expect(t.props.startTime).not.toBeGreaterThan(expectedTime);
      });
      it('should recieve the start time', function() {
        var t;
        t = new Tween({
          duration: 1000
        }).start(1);
        return expect(t.props.startTime).toBe(1);
      });
      it('should calculate end time', function() {
        var delay, duration, t;
        duration = 1000;
        delay = 500;
        t = new Tween({
          duration: duration,
          delay: delay
        }).start();
        return expect(t.props.endTime).toBe(t.props.startTime + t.props.shiftedRepeatTime);
      });
      it('should calculate end time with repeat', function() {
        var delay, duration, t;
        duration = 1000;
        delay = 500;
        t = new Tween({
          duration: duration,
          delay: delay,
          repeat: 2
        }).start();
        return expect(t.props.endTime).toBe(t.props.startTime + t.props.shiftedRepeatTime);
      });
      it('should calculate end time if repeat', function() {
        var delay, duration, t, time;
        duration = 1000;
        delay = 500;
        t = new Tween({
          duration: duration,
          delay: delay,
          repeat: 2
        }).start();
        time = t.props.startTime + (3 * (duration + delay)) - delay;
        return expect(t.props.endTime).toBe(time);
      });
      it('should calculate startTime and endTime if shifted', function() {
        var delay, duration, endTime, expectedTime, t;
        duration = 1000;
        delay = 500;
        t = new Tween({
          duration: duration,
          delay: delay,
          repeat: 2
        });
        t.setProp('shiftTime', 500);
        t.start();
        expectedTime = performance.now() + 500 + delay;
        expect(t.props.startTime).toBeGreaterThan(expectedTime - 50);
        expect(t.props.startTime).not.toBeGreaterThan(expectedTime);
        endTime = t.props.startTime + (3 * (duration + delay)) - delay + t.props.shiftTime;
        expect(t.props.endTime).toBe(endTime);
        return expect(t.props.endTime).toBe(t.props.startTime + t.props.shiftedRepeatTime);
      });
      return it('should restart flags', function() {
        var t;
        t = new Tween({
          duration: 20,
          repeat: 2
        }).start();
        t.update(t.props.startTime + 10);
        t.update(t.props.startTime + 60);
        expect(t.isCompleted).toBe(true);
        expect(t.isStarted).toBe(true);
        t.start();
        expect(t.isCompleted).toBe(false);
        return expect(t.isStarted).toBe(false);
      });
    });
    return describe('update method ->', function() {
      it('should update progress', function() {
        var t, time;
        t = new Tween({
          duration: 1000,
          delay: 500
        });
        t.start();
        time = t.props.startTime + 200;
        t.update(time);
        return expect(t.progress).toBeCloseTo(.2, 5);
      });
      return it('should update progress with repeat', function() {
        var t;
        t = new Tween({
          duration: 1000,
          delay: 200,
          repeat: 2
        });
        t.start();
        t.update(t.props.startTime + 1400);
        expect(t.progress).toBeCloseTo(.2);
        t.update(t.props.startTime + 2700);
        expect(t.progress).toBeCloseTo(.3);
        t.update(t.props.startTime + 3400);
        return expect(t.progress).toBe(1);
      });
    });
  });

}).call(this);
