(function() {
  var Timeline, Tween, tweener;

  Tween = window.mojs.Tween;

  Timeline = window.mojs.Timeline;

  tweener = window.mojs.tweener;

  describe('Tween ->', function() {
    beforeEach(function() {
      return tweener.removeAll();
    });
    it('should have timelines var', function() {
      var t;
      t = new Tween;
      expect(t.timelines.length).toBe(0);
      return expect(t.props.totalTime).toBe(0);
    });
    it('should have initial state flags', function() {
      var t;
      t = new Tween;
      return expect(t.state).toBe('stop');
    });
    describe('add method ->', function() {
      it('should add timeline', function() {
        var t;
        t = new Tween;
        t.add(new Timeline);
        expect(t.timelines.length).toBe(1);
        return expect(t.timelines[0] instanceof Timeline).toBe(true);
      });
      it('should return self for chaining', function() {
        var obj, t;
        t = new Tween;
        obj = t.add(new Timeline);
        return expect(obj).toBe(t);
      });
      it('should work with arrays of tweens', function() {
        var t, t1, t2;
        t = new Tween;
        t1 = new Timeline({
          duration: 1000
        });
        t2 = new Timeline({
          duration: 1500
        });
        t.add([t1, t2, new Tween]);
        expect(t.timelines.length).toBe(3);
        expect(t.props.totalTime).toBe(1500);
        expect(t.timelines[0] instanceof Timeline).toBe(true);
        expect(t.timelines[1] instanceof Timeline).toBe(true);
        return expect(t.timelines[2] instanceof Tween).toBe(true);
      });
      it('should work with arguments', function() {
        var t1, t2, tween;
        tween = new Tween;
        t1 = new Timeline({
          duration: 500,
          delay: 200
        });
        t2 = new Timeline({
          duration: 500,
          delay: 500
        });
        tween.add(t1, t2);
        expect(tween.props.totalTime).toBe(1000);
        return expect(tween.timelines.length).toBe(2);
      });
      it('should work with mixed arguments', function() {
        var t, t1, t2;
        t = new Tween;
        t1 = new Timeline({
          duration: 1000
        });
        t2 = new Timeline({
          duration: 1500
        });
        t.add([t1, new Timeline, new Tween], t2);
        expect(t.timelines.length).toBe(4);
        expect(t.props.totalTime).toBe(1500);
        expect(t.timelines[0] instanceof Timeline).toBe(true);
        expect(t.timelines[1] instanceof Timeline).toBe(true);
        expect(t.timelines[2] instanceof Tween).toBe(true);
        return expect(t.timelines[3] instanceof Timeline).toBe(true);
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
        t1 = new Tween;
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
    describe('pushTimeline method ->', function() {
      return it('should push timeline to timelines and calc totalTime', function() {
        var t;
        t = new Tween;
        t.pushTimeline(new Timeline({
          duration: 4000
        }));
        expect(t.timelines.length).toBe(1);
        expect(t.timelines[0] instanceof Timeline).toBe(true);
        return expect(t.props.totalTime).toBe(4000);
      });
    });
    describe('repeat option', function() {
      it('should increase totalTime', function() {
        var t;
        t = new Tween({
          repeat: 2
        });
        t.add(new Timeline({
          duration: 200
        }));
        expect(t.props.totalTime).toBe(400);
        return expect(t.props.time).toBe(200);
      });
      it('should set nearest start time', function() {
        var t;
        t = new Tween({
          repeat: 2
        });
        t.add(new Timeline({
          duration: 200
        }));
        t.setProgress(.6);
        return expect(t.timelines[0].progress).toBe(.2);
      });
      return it('should end at 1', function(dfr) {
        var proc, t;
        t = new Tween({
          repeat: 2
        });
        proc = -1;
        t.add(new Timeline({
          duration: 50,
          onUpdate: function(p) {
            return proc = p;
          },
          onComplete: function() {
            expect(proc).toBe(1);
            return dfr();
          }
        }));
        return t.start();
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
      it('should work with one argument', function() {
        var t;
        t = new Tween;
        t.append(new Timeline({
          duration: 1000,
          delay: 200
        }));
        return expect(t.timelines.length).toBe(1);
      });
      it('should work with array and set the indexes', function() {
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
        expect(tm1.index).toBe(1);
        return expect(tm2.index).toBe(1);
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
      it('should call the setStartTime method', function() {
        var t, time;
        t = new Tween;
        spyOn(t, 'setStartTime');
        time = 0;
        t.start(time);
        return expect(t.setStartTime).toHaveBeenCalledWith(time);
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
      it('should not add itself to tweener if time was passed', function() {
        var t;
        t = new Tween;
        spyOn(tweener, 'add');
        t.start(10239123);
        return expect(tweener.add).not.toHaveBeenCalled();
      });
      return it('should set state to "play"', function() {
        var t, timeline;
        tweener.tweens = [];
        t = new Tween;
        timeline = new Timeline({
          duration: 2000
        });
        t.add(timeline);
        t.start();
        return expect(t.state).toBe('play');
      });
    });
    describe('removeFromTweener method ->', function() {
      return it('should call t.remove method with self', function() {
        var t, timeline;
        tweener.tweens = [];
        t = new Tween;
        timeline = new Timeline({
          duration: 2000
        });
        t.add(timeline);
        t.start();
        t.removeFromTweener();
        return expect(tweener.tweens.length).toBe(0);
      });
    });
    describe('pause method ->', function() {
      it('should call t.remove method with self', function() {
        var t, timeline;
        tweener.tweens = [];
        t = new Tween;
        timeline = new Timeline({
          duration: 2000
        });
        t.add(timeline);
        t.start();
        spyOn(t, 'removeFromTweener');
        t.pause();
        return expect(t.removeFromTweener).toHaveBeenCalled();
      });
      return it('should set state to "pause"', function() {
        var t, timeline;
        tweener.tweens = [];
        t = new Tween;
        timeline = new Timeline({
          duration: 2000
        });
        t.add(timeline);
        t.start();
        t.pause();
        return expect(t.state).toBe('pause');
      });
    });
    describe('stop method ->', function() {
      it('should call t.removeFromTweener method with self', function() {
        var t, timeline;
        tweener.tweens = [];
        t = new Tween;
        timeline = new Timeline({
          duration: 2000
        });
        t.add(timeline);
        t.start();
        spyOn(t, 'removeFromTweener');
        t.stop();
        return expect(t.removeFromTweener).toHaveBeenCalled();
      });
      it('should reset progress to 0', function() {
        var t, timeline;
        tweener.tweens = [];
        t = new Tween;
        timeline = new Timeline({
          duration: 2000
        });
        t.add(timeline);
        t.start();
        spyOn(t, 'setProgress');
        t.stop();
        return expect(t.setProgress).toHaveBeenCalledWith(0);
      });
      return it('should set state to "stop"', function() {
        var t, timeline;
        tweener.tweens = [];
        t = new Tween;
        timeline = new Timeline({
          duration: 2000
        });
        t.add(timeline);
        t.start();
        t.stop();
        return expect(t.state).toBe('stop');
      });
    });
    describe('restart method ->', function() {
      it('should call stop method', function() {
        var t, timeline;
        tweener.tweens = [];
        t = new Tween;
        timeline = new Timeline({
          duration: 2000
        });
        t.add(timeline);
        t.start();
        spyOn(t, 'stop');
        t.restart();
        return expect(t.stop).toHaveBeenCalled();
      });
      return it('should call start method', function() {
        var t, timeline;
        tweener.tweens = [];
        t = new Tween;
        timeline = new Timeline({
          duration: 2000
        });
        t.add(timeline);
        t.start();
        spyOn(t, 'start');
        t.restart();
        return expect(t.start).toHaveBeenCalled();
      });
    });
    describe('onReverseComplete callback ->', function() {
      it('should be defined', function() {
        var t;
        t = new Tween({
          onReverseComplete: function() {}
        });
        return expect(t.o.onReverseComplete).toBeDefined();
      });
      it('should call onReverseComplete callback', function() {
        var t;
        t = new Tween({
          onReverseComplete: function() {}
        });
        t.add(new Timeline({
          duration: 10
        }));
        spyOn(t.o, 'onReverseComplete');
        t.start();
        t.setProgress(.5);
        t.setProgress(0);
        return expect(t.o.onReverseComplete).toHaveBeenCalled();
      });
      return it('should not be called on start', function() {
        var t;
        t = new Tween({
          onReverseComplete: function() {}
        });
        t.add(new Timeline({
          duration: 10
        }));
        spyOn(t.o, 'onReverseComplete');
        t.start();
        t.setProgress(0);
        return expect(t.o.onReverseComplete).not.toHaveBeenCalled();
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
      it('should have the right scope', function(dfr) {
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
      return it('should fire after the last onUpdate', function(dfr) {
        var proc, tween;
        proc = 0;
        tween = new Tween({
          onUpdate: function(p) {
            return proc = p;
          },
          onComplete: function() {
            expect(proc).toBe(1);
            return dfr();
          }
        });
        tween.add(new Timeline({
          duration: 20
        }));
        tween.start();
        return tween.update(tween.props.startTime + 22);
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
      return it('should run if time is greater then endTime', function() {
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
        t.update(time = performance.now() + 200);
        expect(t.timelines[0].update).toHaveBeenCalledWith(time);
        return expect(t.timelines[1].update).toHaveBeenCalledWith(time);
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
        return expect(t.update(performance.now() + 2000)).toBe(true);
      });
      it('should not go further then endTime', function() {
        var t;
        t = new Tween;
        t.add(new Timeline({
          duration: 500,
          delay: 200
        }));
        t.start();
        t.update(t.props.startTime + 1000);
        return expect(t.prevTime).toBe(t.props.endTime);
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
    describe('setProgress method ->', function() {
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
        t.setStartTime();
        t.setProgress(.5);
        time = t.props.startTime + 650;
        expect(ti1.update).toHaveBeenCalledWith(time);
        expect(ti2.update).toHaveBeenCalledWith(time);
        expect(ti3.update).toHaveBeenCalledWith(time);
        return expect(ti4.update).toHaveBeenCalledWith(time);
      });
      it('should call setStartTime if there is no @props.startTime', function() {
        var t;
        t = new Tween;
        spyOn(t, 'setStartTime');
        t.setProgress(.5);
        return expect(t.setStartTime).toHaveBeenCalled();
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
        t.setStartTime();
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
        t.setStartTime();
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
        t.setStartTime();
        spyOn(t, 'update');
        t.setProgress(-1.5);
        return expect(t.update).toHaveBeenCalledWith(t.props.startTime);
      });
    });
    describe('setStartTime method', function() {
      return it('should call startTimelines methods', function() {
        var t, t1, time;
        t = new Tween;
        t1 = new Tween;
        t1.add(new Timeline({
          duration: 500,
          delay: 200
        }));
        spyOn(t, 'startTimelines');
        time = 0;
        t.setStartTime(time);
        return expect(t.startTimelines).toHaveBeenCalledWith(time);
      });
    });
    return describe('time track', function() {
      return it('should save the current time track', function() {
        var t;
        t = new Tween;
        t.add(new Timeline({
          duration: 500
        }));
        t.setProgress(.5);
        return expect(t.prevTime).toBe(t.props.startTime + 250);
      });
    });
  });

}).call(this);
