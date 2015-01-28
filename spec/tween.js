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
      return it('calculate end time if repeat', function() {
        var t;
        t = new Tween({
          duration: 1000,
          delay: 500,
          repeat: 2
        }).start();
        return expect(t.props.endTime).toBe(t.props.startTime + (3 * (1000 + 500)) - 500);
      });
    });
    describe('update time ->', function() {
      it('should update progress', function() {
        var t, time;
        t = new Tween({
          duration: 1000,
          delay: 500
        });
        t.start();
        time = t.props.startTime + 200;
        t.update(time);
        return expect(t.progress).toBe(.2);
      });
      it('should update progress with repeat', function() {
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
      return it('should set tween to the end if tween ended', function() {
        var t;
        t = new Tween({
          duration: 1000,
          delay: 500
        });
        t.start();
        t.update(t.props.startTime + 1200);
        return expect(t.progress).toBe(1);
      });
    });
    return describe('onUpdate callback ->', function() {
      it('should be defined', function() {
        var t;
        t = new Tween({
          onUpdate: function() {}
        });
        return expect(t.o.onUpdate).toBeDefined();
      });
      it('should call onUpdate callback with the current progress', function() {
        var t;
        t = new Tween({
          duration: 1000,
          onUpdate: function() {}
        });
        spyOn(t, 'onUpdate');
        t.start();
        t.update(t.props.startTime + 500);
        return expect(t.onUpdate).toHaveBeenCalledWith(.5);
      });
      return it('should have the right scope', function() {
        var isRightScope, t;
        isRightScope = false;
        t = new Tween({
          onUpdate: function() {
            return isRightScope = this instanceof Tween;
          }
        });
        t.update(t.props.startTime + 200);
        return expect(isRightScope).toBe(true);
      });
    });
  });

  describe('onStart callback ->', function() {
    it('should be defined', function() {
      var t;
      t = new Tween({
        onStart: function() {}
      });
      t.start();
      return expect(t.o.onStart).toBeDefined();
    });
    it('should call onStart callback', function() {
      var t;
      t = new Tween({
        duration: 32,
        onStart: function() {}
      });
      t.start();
      spyOn(t.o, 'onStart');
      t.update(t.props.startTime + 1);
      return expect(t.o.onStart).toHaveBeenCalled();
    });
    it('should be called just once', function() {
      var cnt, t;
      cnt = 0;
      t = new Tween({
        duration: 32,
        onStart: function() {
          return cnt++;
        }
      }).start();
      t.update(t.props.startTime + 1);
      t.update(t.props.startTime + 1);
      return expect(cnt).toBe(1);
    });
    return it('should have the right scope', function() {
      var isRightScope, t;
      isRightScope = false;
      t = new Tween({
        onStart: function() {
          return isRightScope = this instanceof Tween;
        }
      });
      t.start();
      t.update(t.props.startTime + 1);
      return expect(isRightScope).toBe(true);
    });
  });

}).call(this);
