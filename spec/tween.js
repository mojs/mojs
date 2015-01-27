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
    describe('update time ->', function() {
      it('should update elapsed time', function() {
        var t, time;
        t = new Tween({
          duration: 1000,
          delay: 500
        });
        t.start();
        time = t.props.startTime + 200;
        t.update(time);
        return expect(t.props.elapsed).toBe(200);
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
    describe('progress ->', function() {
      return describe('getProgress ->', function() {
        it('should calculate the current progress', function() {
          var t;
          t = new Tween({
            duration: 1000
          });
          t.start();
          t.update(t.props.startTime + 500);
          return expect(t.getProgress()).toBe(.5);
        });
        return it('should not be bigger then 1', function() {
          var t;
          t = new Tween({
            duration: 1000
          });
          t.start();
          t.update(t.props.startTime + 1500);
          return expect(t.getProgress()).toBe(1);
        });
      });
    });
    describe('onUpdate callback ->', function() {
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
    return describe('onStart callback ->', function() {
      it('should be defined', function() {
        var t;
        t = new Tween({
          onStart: function() {}
        });
        return expect(t.o.onStart).toBeDefined();
      });
      it('should call onStart callback', function() {
        var t;
        t = new Tween({
          duration: 32,
          onStart: function() {}
        });
        spyOn(t.o, 'onStart');
        t.start();
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
        });
        t.start();
        t.start();
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
        return expect(isRightScope).toBe(true);
      });
    });
  });

}).call(this);
