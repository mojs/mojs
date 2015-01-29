(function() {
  var Timeline, Tween;

  Tween = window.mojs.Tween;

  Timeline = window.mojs.Timeline;

  describe('Tween ->', function() {
    it('should have timelines var', function() {
      var t;
      t = new Tween;
      expect(t.timelines.length).toBe(0);
      return expect(t.duration).toBe(0);
    });
    describe('add method ->', function() {
      it('should add timeline', function() {
        var t;
        t = new Tween;
        t.add(new Timeline);
        expect(t.timelines.length).toBe(1);
        return expect(t.timelines[0] instanceof Timeline).toBe(true);
      });
      return it('should calc self duration', function() {
        var t;
        t = new Tween;
        t.add(new Timeline({
          duration: 500,
          delay: 200
        }));
        expect(t.duration).toBe(700);
        t.add(new Timeline({
          duration: 500,
          delay: 200,
          repeat: 1
        }));
        return expect(t.duration).toBe(1400);
      });
    });
    describe('update method ->', function() {
      return it('should update the current time on every timeline', function() {
        var t, time;
        t = new Tween;
        t.add(new Timeline({
          duration: 500,
          delay: 200
        }));
        t.add(new Timeline({
          duration: 500,
          delay: 100
        }));
        spyOn(t.timelines[0], 'update');
        spyOn(t.timelines[1], 'update');
        t.update(time = Date.now() + 200);
        expect(t.timelines[0].update).toHaveBeenCalledWith(time);
        return expect(t.timelines[1].update).toHaveBeenCalledWith(time);
      });
    });
    describe('start method ->', function() {
      it('should get the start time', function() {
        var t;
        t = new Tween;
        t.start();
        expect(t.startTime).toBeDefined();
        return expect(t.endTime).toBe(t.startTime + t.duration);
      });
      it('should start every timeline', function() {
        var t;
        it('should update the current time on every timeline', function() {});
        t = new Tween;
        t.add(new Timeline({
          duration: 500,
          delay: 200
        }));
        t.add(new Timeline({
          duration: 500,
          delay: 100
        }));
        spyOn(t.timelines[0], 'start');
        spyOn(t.timelines[1], 'start');
        t.start();
        expect(t.timelines[0].start).toHaveBeenCalledWith(t.startTime);
        return expect(t.timelines[1].start).toHaveBeenCalledWith(t.startTime);
      });
      return it('should call the startLoop method', function() {
        var t;
        t = new Tween;
        spyOn(t, 'startLoop');
        t.start();
        return expect(t.startLoop).toHaveBeenCalled();
      });
    });
    describe('loop ->', function() {
      it('should loop over', function(dfr) {
        var t;
        t = new Tween;
        t.add(new Timeline({
          duration: 500,
          delay: 200
        }));
        t.startLoop();
        spyOn(t, 'loop');
        return setTimeout(function() {
          expect(t.loop).toHaveBeenCalled();
          return dfr();
        }, 100);
      });
      it('should call update fun', function(dfr) {
        var t;
        t = new Tween;
        t.add(new Timeline({
          duration: 500,
          delay: 200
        }));
        t.startLoop();
        spyOn(t, 'update');
        return setTimeout(function() {
          expect(t.update).toHaveBeenCalledWith(jasmine.any(Number));
          return dfr();
        }, 100);
      });
      return it('should stop at the end', function(dfr) {
        var t;
        t = new Tween;
        t.add(new Timeline({
          duration: 20
        }));
        t.start();
        return setTimeout(function() {
          expect(t.isRunning).toBe(false);
          return dfr();
        }, 100);
      });
    });
    describe('startLoop method ->', function() {
      it('should call loop method', function(dfr) {
        var t;
        t = new Tween;
        spyOn(t, 'loop');
        t.startLoop();
        return setTimeout(function() {
          expect(t.loop).toHaveBeenCalled();
          return dfr();
        }, 60);
      });
      it('should set isRunning flag', function() {
        var t;
        t = new Tween;
        expect(t.isRunning).toBeFalsy();
        t.startLoop();
        return expect(t.isRunning).toBe(true);
      });
      return it('should call loop only once', function() {
        var t;
        t = new Tween;
        t.startLoop();
        spyOn(t, 'loop');
        t.startLoop();
        return expect(t.loop).not.toHaveBeenCalled();
      });
    });
    describe('stopLoop method ->', function() {
      return it('should set isRunning to false', function() {
        var t;
        t = new Tween;
        t.startLoop();
        t.stopLoop();
        return expect(t.isRunning).toBe(false);
      });
    });
    describe('onComplete callback ->', function() {
      it('should be defined', function() {
        var t;
        t = new Tween({
          onComplete: function() {}
        });
        return expect(t.o.onComplete).toBeDefined();
      });
      it('should call onComplete callback', function(dfr) {
        var t;
        t = new Tween({
          onComplete: function() {}
        });
        t.add(new Timeline({
          duration: 10
        }));
        spyOn(t.o, 'onComplete');
        t.start();
        return setTimeout(function() {
          expect(t.o.onComplete).toHaveBeenCalled();
          return dfr();
        }, 100);
      });
      it('should be called just once', function(dfr) {
        var cnt, t;
        cnt = 0;
        t = new Tween({
          onComplete: function() {
            return cnt++;
          }
        });
        t.add(new Timeline({
          duration: 20
        }));
        t.start();
        return setTimeout((function() {
          expect(cnt).toBe(1);
          return dfr();
        }), 100);
      });
      return it('should have the right scope', function(dfr) {
        var isRightScope, t;
        isRightScope = false;
        t = new Tween({
          onComplete: function() {
            return isRightScope = this instanceof Tween;
          }
        });
        t.add(new Timeline({
          duration: 20
        }));
        t.start();
        return setTimeout((function() {
          expect(isRightScope).toBe(true);
          return dfr();
        }), 100);
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
          onStart: function() {}
        });
        t.add(new Timeline({
          duration: 10
        }));
        spyOn(t.o, 'onStart');
        t.start();
        return expect(t.o.onStart).toHaveBeenCalled();
      });
      return it('should have the right scope', function() {
        var isRightScope, t;
        isRightScope = false;
        t = new Tween({
          onStart: function() {
            return isRightScope = this instanceof Tween;
          }
        });
        t.add(new Timeline({
          duration: 20
        }));
        t.start();
        return expect(isRightScope).toBe(true);
      });
    });
  });

}).call(this);
