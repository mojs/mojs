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
      return expect(t.props.totalTime).toBe(0);
    });
    describe('add method ->', function() {
      it('should add timeline', function() {
        var t;
        t = new Tween;
        t.add(new Timeline);
        expect(t.timelines.length).toBe(1);
        return expect(t.timelines[0] instanceof Timeline).toBe(true);
      });
      it('should calc self duration', function() {
        var t;
        t = new Tween;
        t.add(new Timeline({
          duration: 500,
          delay: 200
        }));
        expect(t.props.totalTime).toBe(700);
        t.add(new Timeline({
          duration: 500,
          delay: 200,
          repeat: 1
        }));
        return expect(t.props.totalTime).toBe(1400);
      });
      return it('should work with another tweens', function() {
        var t, t1;
        t1 = new Tween({
          isIt: true
        });
        t = new Tween;
        t.add(new Timeline({
          duration: 500,
          delay: 200
        }));
        t.add(new Timeline({
          duration: 500,
          delay: 200,
          repeat: 1
        }));
        t1.add(t);
        return expect(t1.props.totalTime).toBe(1400);
      });
    });
    describe('append method ->', function() {
      it('should add timeline', function() {
        var t;
        t = new Tween;
        t.append(new Timeline);
        expect(t.timelines.length).toBe(1);
        return expect(t.timelines[0] instanceof Timeline).toBe(true);
      });
      it('should delay the timeline to duration', function() {
        var t;
        t = new Tween;
        t.add(new Timeline({
          duration: 1000,
          delay: 200
        }));
        t.append(new Timeline({
          duration: 500,
          delay: 500
        }));
        return expect(t.timelines[1].o.delay).toBe(1700);
      });
      it('should recalc duration', function() {
        var t;
        t = new Tween;
        t.add(new Timeline({
          duration: 1000,
          delay: 200
        }));
        t.append(new Timeline({
          duration: 500,
          delay: 500
        }));
        return expect(t.props.totalTime).toBe(2200);
      });
      it('should work with array', function() {
        var t, tm1, tm2;
        t = new Tween;
        t.add(new Timeline({
          duration: 1000,
          delay: 200
        }));
        tm1 = new Timeline({
          duration: 500,
          delay: 500
        });
        tm2 = new Timeline({
          duration: 500,
          delay: 700
        });
        t.append([tm1, tm2]);
        expect(t.timelines.length).toBe(3);
        return expect(t.props.totalTime).toBe(2400);
      });
      it('should work with array #2', function() {
        var t, tm1, tm2;
        t = new Tween;
        t.add(new Timeline({
          duration: 1000,
          delay: 200
        }));
        tm1 = new Timeline({
          duration: 500,
          delay: 500
        });
        tm2 = new Timeline({
          duration: 500,
          delay: 700
        });
        spyOn(t, 'recalcDuration');
        t.append([tm1, tm2]);
        return expect(t.recalcDuration).toHaveBeenCalled();
      });
      it('should work with array #2', function() {
        var t;
        t = new Tween;
        t.append(new Timeline({
          duration: 1000,
          delay: 200
        }));
        return expect(t.timelines.length).toBe(1);
      });
      return it('should add element index', function() {
        var t;
        t = new Tween;
        t.append(new Timeline({
          duration: 1000,
          delay: 200
        }));
        t.append(new Timeline({
          duration: 1000,
          delay: 200
        }));
        expect(t.timelines[0].index).toBe(0);
        return expect(t.timelines[1].index).toBe(1);
      });
    });
    describe('remove method ->', function() {
      it('should remove timeline', function() {
        var t, timeline;
        t = new Tween;
        timeline = new Timeline;
        t.add(timeline);
        t.remove(timeline);
        return expect(t.timelines.length).toBe(0);
      });
      return it('should remove tween', function() {
        var t, t1, timeline;
        t1 = new Tween;
        t = new Tween;
        timeline = new Timeline;
        t.add(timeline);
        t1.add(t);
        t1.remove(t);
        return expect(t1.timelines.length).toBe(0);
      });
    });
    describe('recalcDuration method ->', function() {
      return it('should recalculate duration', function() {
        var t, timeline, timeline2;
        t = new Tween;
        timeline = new Timeline({
          duration: 100
        });
        timeline2 = new Timeline({
          duration: 1000
        });
        t.add(timeline);
        t.timelines.push(timeline2);
        t.recalcDuration();
        return expect(t.props.totalTime).toBe(1000);
      });
    });
    describe('start method ->', function() {
      it('should get the start time', function() {
        var t;
        t = new Tween;
        t.start();
        expect(t.props.startTime).toBeDefined();
        return expect(t.props.endTime).toBe(t.props.startTime + t.props.totalTime);
      });
      it('should call the prepareStart method', function() {
        var t;
        t = new Tween;
        spyOn(t, 'prepareStart');
        t.start();
        return expect(t.prepareStart).toHaveBeenCalled();
      });
      it('should restart flags', function() {
        var t;
        t = new Tween;
        t.add(new Timeline({
          duration: 20
        }));
        t.start();
        t.update(t.props.startTime + 5);
        t.update(t.props.startTime + 60);
        expect(t.isCompleted).toBe(true);
        t.start();
        return expect(t.isCompleted).toBe(false);
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
        expect(t.timelines[0].start).toHaveBeenCalledWith(t.props.startTime);
        return expect(t.timelines[1].start).toHaveBeenCalledWith(t.props.startTime);
      });
      it('should add itself to tweener', function() {
        var t;
        t = new Tween;
        spyOn(tweener, 'add');
        t.start();
        return expect(tweener.add).toHaveBeenCalled();
      });
      return it('should not add itself to tweener if time was passed', function() {
        var t;
        t = new Tween;
        spyOn(tweener, 'add');
        t.start(10239123);
        return expect(tweener.add).not.toHaveBeenCalled();
      });
    });
    describe('stop method ->', function() {
      return it('should call t.remove method with self', function() {
        var t, timeline;
        tweener.tweens = [];
        t = new Tween;
        timeline = new Timeline({
          duration: 2000
        });
        t.add(timeline);
        t.start();
        t.stop();
        return expect(tweener.tweens.length).toBe(0);
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
    describe('onUpdate callback ->', function() {
      it('should be defined', function() {
        var t;
        t = new Tween({
          onUpdate: function() {}
        });
        return expect(t.onUpdate).toBeDefined();
      });
      it('should call onUpdate callback', function(dfr) {
        var t;
        t = new Tween({
          onUpdate: function() {}
        });
        t.add(new Timeline({
          duration: 20
        }));
        spyOn(t, 'onUpdate');
        t.start();
        return setTimeout(function() {
          expect(t.onUpdate).toHaveBeenCalled();
          return dfr();
        }, 100);
      });
      it('should have the right scope', function(dfr) {
        var isRightScope, t;
        isRightScope = false;
        t = new Tween({
          onUpdate: function() {
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
      it('should pass the current progress', function() {
        var t;
        t = new Tween({
          onUpdate: function() {}
        });
        t.add(new Timeline({
          duration: 20
        }));
        spyOn(t, 'onUpdate');
        t.start();
        t.update(t.props.startTime + 10);
        return expect(t.onUpdate).toHaveBeenCalledWith(.5);
      });
      it('should not run if time is less then startTime', function() {
        var t;
        t = new Tween({
          onUpdate: function() {}
        });
        t.add(new Timeline({
          duration: 20
        }));
        spyOn(t, 'onUpdate');
        t.start();
        t.update(t.props.startTime - 10);
        return expect(t.onUpdate).not.toHaveBeenCalled();
      });
      it('should run if time is greater then endTime', function() {
        var t;
        t = new Tween({
          onUpdate: function() {}
        });
        t.add(new Timeline({
          duration: 20
        }));
        spyOn(t, 'onUpdate');
        t.start();
        t.update(t.props.startTime + 25);
        return expect(t.onUpdate).toHaveBeenCalledWith(1);
      });
      return it('should run if time is greater then endTime just once', function() {
        var cnt, t;
        cnt = 0;
        t = new Tween({
          onUpdate: function() {
            return cnt++;
          }
        });
        t.add(new Timeline({
          duration: 20
        }));
        t.getDimentions();
        t.update(t.props.startTime + 25);
        t.update(t.props.startTime + 26);
        t.update(t.props.startTime + 27);
        return expect(cnt).toBe(1);
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
    describe('update method ->', function() {
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
      it('should not update the current time on every timeline if isCompleted', function() {
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
        t.getDimentions();
        t.update(t.props.startTime + 2000);
        spyOn(t.timelines[0], 'update');
        spyOn(t.timelines[1], 'update');
        t.update(t.props.startTime + 2000);
        expect(t.timelines[0].update).not.toHaveBeenCalled();
        return expect(t.timelines[1].update).not.toHaveBeenCalled();
      });
      it('should return true is ended', function() {
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
      return it('should work with tweens', function() {
        var t, t1, t2, ti1, ti2, ti3, ti4, time;
        t = new Tween;
        t1 = new Tween;
        t2 = new Tween;
        ti1 = new Timeline({
          duration: 500,
          delay: 200
        });
        spyOn(ti1, 'update');
        ti2 = new Timeline({
          duration: 500,
          delay: 100
        });
        spyOn(ti2, 'update');
        ti3 = new Timeline({
          duration: 100,
          delay: 0
        });
        spyOn(ti3, 'update');
        ti4 = new Timeline({
          duration: 800,
          delay: 500
        });
        spyOn(ti4, 'update');
        t1.add(ti1);
        t1.add(ti2);
        t2.add(ti3);
        t2.add(ti4);
        t.add(t1);
        t.add(t2);
        t.start();
        t.update(time = t.props.startTime + 300);
        expect(ti1.update).toHaveBeenCalledWith(time);
        expect(ti2.update).toHaveBeenCalledWith(time);
        expect(ti3.update).toHaveBeenCalledWith(time);
        return expect(ti4.update).toHaveBeenCalledWith(time);
      });
    });
    return describe('setProgress method ->', function() {
      it('should call the update on every child with progress time', function() {
        var t, t1, t2, ti1, ti2, ti3, ti4, time;
        t = new Tween;
        t1 = new Tween;
        t2 = new Tween;
        ti1 = new Timeline({
          duration: 500,
          delay: 200
        });
        spyOn(ti1, 'update');
        ti2 = new Timeline({
          duration: 500,
          delay: 100
        });
        spyOn(ti2, 'update');
        ti3 = new Timeline({
          duration: 100,
          delay: 0
        });
        spyOn(ti3, 'update');
        ti4 = new Timeline({
          duration: 800,
          delay: 500
        });
        spyOn(ti4, 'update');
        t1.add(ti1);
        t1.add(ti2);
        t2.add(ti3);
        t2.add(ti4);
        t.add(t1);
        t.add(t2);
        t.prepareStart();
        t.startTimelines();
        t.setProgress(.5);
        time = t.props.startTime + 650;
        expect(ti1.update).toHaveBeenCalledWith(time);
        expect(ti2.update).toHaveBeenCalledWith(time);
        expect(ti3.update).toHaveBeenCalledWith(time);
        return expect(ti4.update).toHaveBeenCalledWith(time);
      });
      it('should call self update', function() {
        var t, t1, t2, ti1, ti2, ti3, ti4;
        t = new Tween;
        t1 = new Tween;
        t2 = new Tween;
        ti1 = new Timeline({
          duration: 500,
          delay: 200
        });
        ti2 = new Timeline({
          duration: 500,
          delay: 100
        });
        ti3 = new Timeline({
          duration: 100,
          delay: 0
        });
        ti4 = new Timeline({
          duration: 800,
          delay: 500
        });
        t1.add(ti1);
        t1.add(ti2);
        t2.add(ti3);
        t2.add(ti4);
        t.add(t1);
        t.add(t2);
        t.prepareStart();
        t.startTimelines();
        spyOn(t, 'update');
        t.setProgress(.5);
        return expect(t.update).toHaveBeenCalledWith(t.props.startTime + 650);
      });
      it('should not set the progress more then 1', function() {
        var t, t1;
        t = new Tween;
        t1 = new Tween;
        t1.add(new Timeline({
          duration: 500,
          delay: 200
        }));
        t.add(t1);
        t.prepareStart();
        t.startTimelines();
        spyOn(t, 'update');
        t.setProgress(1.5);
        return expect(t.update).toHaveBeenCalledWith(t.props.startTime + t.props.totalTime);
      });
      return it('should not set the progress less then 0', function() {
        var t, t1;
        t = new Tween;
        t1 = new Tween;
        t1.add(new Timeline({
          duration: 500,
          delay: 200
        }));
        t.add(t1);
        t.prepareStart();
        t.startTimelines();
        spyOn(t, 'update');
        t.setProgress(-1.5);
        return expect(t.update).toHaveBeenCalledWith(t.props.startTime);
      });
    });
  });

}).call(this);
