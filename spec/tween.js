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
    it('should have the right scope', function() {
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
    describe('onComplete callback ->', function() {
      it('should be defined', function() {
        var t;
        t = new Tween({
          onComplete: function() {}
        });
        return expect(t.o.onComplete).toBeDefined();
      });
      it('should call onComplete callback', function() {
        var t;
        t = new Tween({
          duration: 100,
          onComplete: function() {}
        }).start();
        spyOn(t.o, 'onComplete');
        t.update(t.props.startTime + 101);
        return expect(t.o.onComplete).toHaveBeenCalled();
      });
      it('should be called just once', function() {
        var cnt, t;
        cnt = 0;
        t = new Tween({
          duration: 32,
          onComplete: function() {
            return cnt++;
          }
        }).start();
        t.update(t.props.startTime + 33);
        t.update(t.props.startTime + 33);
        return expect(cnt).toBe(1);
      });
      return it('should have the right scope', function() {
        var isRightScope, t;
        isRightScope = false;
        t = new Tween({
          duration: 1,
          onComplete: function() {
            return isRightScope = this instanceof Tween;
          }
        });
        t.start().update(t.props.startTime + 2);
        return expect(isRightScope).toBe(true);
      });
    });
    return describe('yoyo option ->', function() {
      it('should recieve yoyo option', function() {
        var t;
        t = new Tween({
          yoyo: true
        });
        return expect(t.o.yoyo).toBe(true);
      });
      return it('should toggle the progress direction on repeat', function() {
        var t, time;
        t = new Tween({
          repeat: 2,
          duration: 10,
          yoyo: true
        }).start();
        time = t.props.startTime;
        t.update(time + 1);
        expect(t.progress).toBe(.1);
        t.update(time + 5);
        expect(t.progress).toBe(.5);
        t.update(time + 10);
        expect(t.progress).toBe(1);
        t.update(time + 11);
        expect(t.progress).toBe(.9);
        t.update(time + 15);
        expect(t.progress).toBe(.5);
        t.update(time + 19);
        expect(parseFloat(t.progress.toFixed(1))).toBe(.1);
        t.update(time + 20);
        expect(t.progress).toBe(0);
        t.update(time + 21);
        expect(t.progress).toBe(.1);
        t.update(time + 25);
        expect(t.progress).toBe(.5);
        t.update(time + 29);
        expect(t.progress).toBe(.9);
        t.update(time + 30);
        expect(t.progress).toBe(1);
        return expect(t.isCompleted).toBe(true);
      });
    });
  });

}).call(this);
