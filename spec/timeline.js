(function() {
  var Timeline;

  Timeline = window.mojs.Timeline;

  describe('Timeline ->', function() {
    describe('defaults ->', function() {
      it('should have vars', function() {
        var t;
        t = new Timeline;
        expect(t.props).toBeDefined();
        expect(t.h).toBeDefined();
        return expect(t.progress).toBe(0);
      });
      it('should have defaults', function() {
        var t;
        t = new Timeline;
        expect(t.defaults.duration).toBe(600);
        expect(t.defaults.delay).toBe(0);
        return expect(t.defaults.yoyo).toBe(false);
      });
      return it('should extend defaults to options', function() {
        var t;
        t = new Timeline({
          duration: 1000
        });
        expect(t.o.duration).toBe(1000);
        return expect(t.o.delay).toBe(0);
      });
    });
    describe('init ->', function() {
      return it('calculate steps count', function() {
        var t;
        t = new Timeline({
          duration: 1000,
          delay: 500
        });
        expect(t.props.durationSteps).toBe(1000 / 16);
        return expect(t.props.delaySteps).toBe(500 / 16);
      });
    });
    describe('tick ->', function() {
      it('should add ticks to totalElapsed', function() {
        var t;
        t = new Timeline;
        t.tick();
        return expect(t.props.totalElapsed).toBe(1);
      });
      it('should add ticks to durationElapsed', function() {
        var t;
        t = new Timeline;
        t.tick();
        return expect(t.props.durationElapsed).toBe(1);
      });
      it('should add ticks to delayElapsed', function() {
        var t;
        t = new Timeline({
          delay: 200
        });
        t.tick();
        expect(t.props.delayElapsed).toBe(1);
        return expect(t.props.durationElapsed).toBe(0);
      });
      it('should add ticks to durationElapsed only after the delayElapsed', function() {
        var t;
        t = new Timeline({
          delay: 32
        });
        t.tick();
        t.tick();
        expect(t.props.delayElapsed).toBe(2);
        return expect(t.props.durationElapsed).toBe(0);
      });
      it('should resolve delayElapsed -> durationElapsed border', function() {
        var t;
        t = new Timeline({
          delay: 32
        });
        t.tick();
        t.tick(2.5);
        expect(t.props.delayElapsed).toBe(2);
        return expect(t.props.durationElapsed).toBe(1.5);
      });
      return it('durationElapsed should not greater than duration', function() {
        var t;
        t = new Timeline({
          delay: 32,
          duration: 32
        });
        t.tick();
        t.tick(5.5);
        expect(t.props.delayElapsed).toBe(2);
        return expect(t.props.durationElapsed).toBe(2);
      });
    });
    describe('progress ->', function() {
      describe('getProgress ->', function() {
        it('should calculate the current progress', function() {
          var t;
          t = new Timeline({
            duration: 32
          });
          t.tick();
          return expect(t.getProgress()).toBe(.5);
        });
        return it('should not be bigger then 1', function() {
          var t;
          t = new Timeline({
            duration: 32
          });
          t.tick(5);
          return expect(t.getProgress()).toBe(1);
        });
      });
      return it('should calculate the current progress', function() {
        var t;
        t = new Timeline({
          duration: 32
        });
        t.tick();
        return expect(t.progress).toBe(.5);
      });
    });
    describe('onUpdate callback ->', function() {
      it('should be defined', function() {
        var t;
        t = new Timeline({
          onUpdate: function() {}
        });
        return expect(t.o.onUpdate).toBeDefined();
      });
      it('should call onUpdate callback with the current progress', function() {
        var t;
        t = new Timeline({
          duration: 32,
          onUpdate: function() {}
        });
        spyOn(t, 'onUpdate');
        t.tick();
        return expect(t.onUpdate).toHaveBeenCalledWith(.5);
      });
      return it('should have the right scope', function() {
        var isRightScope, t;
        isRightScope = false;
        t = new Timeline({
          onUpdate: function() {
            return isRightScope = this instanceof Timeline;
          }
        });
        t.tick();
        return expect(isRightScope).toBe(true);
      });
    });
    describe('onStart callback ->', function() {
      it('should be defined', function() {
        var t;
        t = new Timeline({
          onStart: function() {}
        });
        return expect(t.o.onStart).toBeDefined();
      });
      it('should call onStart callback', function() {
        var t;
        t = new Timeline({
          duration: 32,
          onStart: function() {}
        });
        spyOn(t.o, 'onStart');
        t.tick();
        return expect(t.o.onStart).toHaveBeenCalled();
      });
      it('should be called just once', function() {
        var cnt, t;
        cnt = 0;
        t = new Timeline({
          duration: 32,
          onStart: function() {
            return cnt++;
          }
        });
        t.tick();
        t.tick();
        t.tick();
        return expect(cnt).toBe(1);
      });
      return it('should have the right scope', function() {
        var isRightScope, t;
        isRightScope = false;
        t = new Timeline({
          onStart: function() {
            return isRightScope = this instanceof Timeline;
          }
        });
        t.tick();
        return expect(isRightScope).toBe(true);
      });
    });
    describe('onComplete callback ->', function() {
      it('should be defined', function() {
        var t;
        t = new Timeline({
          onComplete: function() {}
        });
        return expect(t.o.onComplete).toBeDefined();
      });
      it('should call onComplete callback', function() {
        var t;
        t = new Timeline({
          duration: 32,
          onComplete: function() {}
        });
        spyOn(t.o, 'onComplete');
        t.tick();
        t.tick();
        return expect(t.o.onComplete).toHaveBeenCalled();
      });
      it('should be called just once', function() {
        var cnt, t;
        cnt = 0;
        t = new Timeline({
          duration: 32,
          onComplete: function() {
            return cnt++;
          }
        });
        t.tick();
        t.tick();
        t.tick();
        return expect(cnt).toBe(1);
      });
      return it('should have the right scope', function() {
        var isRightScope, t;
        isRightScope = false;
        t = new Timeline({
          duration: 1,
          onComplete: function() {
            return isRightScope = this instanceof Timeline;
          }
        });
        t.tick();
        return expect(isRightScope).toBe(true);
      });
    });
    describe('repeat option ->', function() {
      it('should recieve repeat option', function() {
        var t;
        t = new Timeline({
          onComplete: function() {}
        });
        return expect(t.o.repeat).toBeDefined();
      });
      it('should decrease the repeat option onComplete', function() {
        var t;
        t = new Timeline({
          repeat: 5,
          duration: 1
        });
        t.tick();
        return expect(t.o.repeat).toBe(4);
      });
      it('should not decrease the repeat option less then 0', function() {
        var t;
        t = new Timeline({
          repeat: 5,
          duration: 1
        });
        t.tick();
        t.tick();
        t.tick();
        t.tick();
        t.tick();
        t.tick();
        t.tick();
        return expect(t.o.repeat).toBe(0);
      });
      it('should call onComplete after the repeat', function() {
        var t;
        t = new Timeline({
          repeat: 5,
          duration: 1,
          onComplete: function() {}
        });
        spyOn(t.o, 'onComplete');
        t.tick();
        expect(t.o.onComplete).not.toHaveBeenCalled();
        t.tick();
        t.tick();
        t.tick();
        t.tick();
        t.tick();
        return expect(t.o.onComplete).toHaveBeenCalled();
      });
      it('should call onComplete after the repeat only once', function() {
        var cnt, t;
        cnt = 0;
        t = new Timeline({
          repeat: 5,
          duration: 1,
          onComplete: function() {
            return cnt++;
          }
        });
        t.tick();
        t.tick();
        t.tick();
        t.tick();
        t.tick();
        expect(cnt).toBe(0);
        t.tick();
        return expect(cnt).toBe(1);
      });
      return it('should null the isCompleted flag and elapsed', function() {
        var t;
        t = new Timeline({
          repeat: 5,
          duration: 1
        });
        t.tick();
        expect(t.isCompleted).toBe(false);
        expect(t.props.durationElapsed).toBe(0);
        expect(t.props.delayElapsed).toBe(0);
        return expect(t.props.totalElapsed).toBe(0);
      });
    });
    return describe('yoyo option ->', function() {
      return it('should toggle the progress diraction on repeat', function() {
        var t;
        t = new Timeline({
          repeat: 2,
          duration: 64,
          yoyo: true
        });
        t.tick();
        expect(t.progress).toBe(.25);
        t.tick();
        expect(t.progress).toBe(.5);
        t.tick();
        expect(t.progress).toBe(.75);
        t.tick();
        expect(t.progress).toBe(1);
        t.tick();
        expect(t.progress).toBe(.75);
        expect(t.isReversed).toBe(true);
        t.tick();
        expect(t.progress).toBe(.5);
        expect(t.isReversed).toBe(true);
        t.tick();
        expect(t.progress).toBe(.25);
        expect(t.isReversed).toBe(true);
        t.tick();
        expect(t.progress).toBe(0);
        expect(t.isReversed).toBe(false);
        t.tick();
        expect(t.progress).toBe(.25);
        expect(t.isReversed).toBe(false);
        t.tick();
        expect(t.progress).toBe(.5);
        expect(t.isReversed).toBe(false);
        t.tick();
        expect(t.progress).toBe(.75);
        expect(t.isReversed).toBe(false);
        t.tick();
        expect(t.progress).toBe(1);
        return expect(t.isCompleted).toBe(true);
      });
    });
  });

}).call(this);
