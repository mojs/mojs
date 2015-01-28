(function() {
  var Tween;

  Tween = window.mojs.Tween;

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
        return expect(t.defaults.yoyo).toBe(false);
      });
      return it('should extend defaults to options', function() {
        var t;
        t = new Tween({
          duration: 1000
        });
        expect(t.o.duration).toBe(1000);
        return expect(t.o.delay).toBe(0);
      });
    });
    describe('start ->', function() {
      it('calculate start time', function() {
        var now, t;
        t = new Tween({
          duration: 1000,
          delay: 500
        }).start();
        now = Date.now() + 500;
        expect(t.props.startTime).not.toBeGreaterThan(now);
        return expect(t.props.startTime).toBeGreaterThan(now - 50);
      });
      it('calculate end time', function() {
        var t;
        t = new Tween({
          duration: 1000,
          delay: 500
        }).start();
        return expect(t.props.endTime).toBe(t.props.startTime + 1000);
      });
      it('calculate end time if repeat', function() {
        var t;
        t = new Tween({
          duration: 1000,
          delay: 500,
          repeat: 2
        }).start();
        return expect(t.props.endTime).toBe(t.props.startTime + (3 * (1000 + 500)) - 500);
      });
      it('set isStarted flag', function() {
        var t;
        t = new Tween({
          duration: 1000,
          delay: 500
        }).start();
        return expect(t.isStarted).toBe(true);
      });
      return it('set call onStart callback', function() {
        var t;
        t = new Tween({
          duration: 1000,
          delay: 500
        });
        spyOn(t.o, 'onStart');
        t.start();
        return expect(t.o.onStart).toHaveBeenCalled();
      });
    });
    return describe('update time ->', function() {
      it('should update elapsed time', function() {
        var t, time;
        t = new Tween({
          duration: 1000,
          delay: 500
        });
        t.start();
        time = t.props.startTime + 200;
        t.update(time);
        expect(t.props.elapsed).toBe(200);
        return expect(t.progress).toBe(.2);
      });
      it('should update elapsed time with repeat', function() {
        var t;
        t = new Tween({
          duration: 1000,
          delay: 200,
          repeat: 2,
          isIt: true
        });
        t.start();
        t.update(t.props.startTime + 1400);
        expect(t.progress).toBe(.2);
        t.update(t.props.startTime + 2700);
        expect(t.progress).toBe(.3);
        t.update(t.props.startTime + 3400);
        return expect(t.progress).toBe(1);
      });
      it('should return true if the tween was completed', function() {
        var returnValue, t, time;
        t = new Tween({
          duration: 1000,
          delay: 500
        });
        t.start();
        time = t.props.startTime + 1200;
        returnValue = t.update(time);
        return expect(returnValue).toBe(true);
      });
      return it('should set tween to the end if tween ended', function() {
        var t;
        t = new Tween({
          duration: 1000,
          delay: 500
        });
        t.start();
        t.update(t.props.startTime + 1200);
        return expect(t.props.elapsed).toBe(1000);
      });
    });
  });

}).call(this);
