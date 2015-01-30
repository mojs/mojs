(function() {
  var Timeline, Tween, tweener;

  Tween = window.mojs.Tween;

  Timeline = window.mojs.Timeline;

  tweener = window.mojs.tweener;

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
      it('should add itself to tweener', function() {
        var t;
        t = new Tween;
        spyOn(t.t, 'add');
        t.start();
        return expect(t.t.add).toHaveBeenCalled();
      });
      return it('should restart flags', function() {
        var t;
        t = new Tween;
        t.add(new Timeline({
          duration: 20
        }));
        t.start();
        t.update(t.startTime + 5);
        t.update(t.startTime + 60);
        expect(t.isCompleted).toBe(true);
        t.start();
        return expect(t.isCompleted).toBe(false);
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
        }, 200);
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
    describe('onStart callback ->', function() {
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
    return describe('update method ->', function() {
      it('should update the current time on every timeline', function() {
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
      return it('should return true is ended', function() {
        var t;
        t = new Tween;
        t.add(new Timeline({
          duration: 500,
          delay: 200
        }));
        t.add(new Timeline({
          duration: 500,
          delay: 100
        }));
        t.start();
        return expect(t.update(Date.now() + 2000)).toBe(true);
      });
    });
  });

}).call(this);
