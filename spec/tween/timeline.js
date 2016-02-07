(function() {
  var Timeline, Transit, Tween, h, tweener;

  Timeline = window.mojs.Timeline;

  Tween = window.mojs.Tween;

  tweener = window.mojs.tweener;

  Transit = window.mojs.Transit;

  h = mojs.h;

  describe('Timeline ->', function() {
    beforeEach(function() {
      return tweener.removeAll();
    });
    it('should extend Tween', function() {
      expect(Timeline.prototype instanceof Tween).toBe(true);
      return expect(Tween.isPrototypeOf(Timeline)).toBe(true);
    });
    describe('name ->', function() {
      it('should set self custom name', function() {
        var name, t;
        name = 'Light timeline 1';
        t = new Timeline({
          name: name
        });
        return expect(t._props.name).toBe(name);
      });
      return it('should make generic name if no one was specified', function() {
        var t;
        t = new Timeline;
        expect(t._props.name).toBe('Timeline 1');
        t = new Timeline;
        return expect(t._props.name).toBe('Timeline 2');
      });
    });
    describe('constructor ->', function() {
      return it('should increment _name+s on tweener', function() {
        var t;
        tweener['_Timelines'] = void 0;
        t = new Timeline;
        expect(tweener['_Timelines']).toBe(1);
        t = new Timeline;
        expect(tweener['_Timelines']).toBe(2);
        t = new Timeline;
        return expect(tweener['_Timelines']).toBe(3);
      });
    });
    describe('defaults ->', function() {
      return it('should have defaults', function() {
        var t;
        t = new Timeline;
        expect(t._defaults.repeat).toBe(0);
        expect(t._defaults.delay).toBe(0);
        expect(t._defaults.duration).toBe(0);
        expect(t._defaults.yoyo).toBe(false);
        expect(t._defaults.easing).toBe('Linear.None');
        expect(t._defaults.onStart).toBe(null);
        expect(t._defaults.onComplete).toBe(null);
        expect(t._defaults.onRepeatStart).toBe(null);
        expect(t._defaults.onRepeatComplete).toBe(null);
        expect(t._defaults.onFirstUpdate).toBe(null);
        expect(t._defaults.onUpdate).toBe(null);
        expect(t._defaults.onProgress).toBe(null);
        return expect(t._defaults.isChained).toBe(false);
      });
    });
    describe('_extendDefaults method ->', function() {
      it('should call super _extendDefaults function', function() {
        var t;
        t = new Timeline;
        spyOn(Timeline.prototype, '_extendDefaults');
        t._extendDefaults();
        return expect(Timeline.prototype._extendDefaults).toHaveBeenCalled();
      });
      return it('should extend defaults by options', function() {
        var t;
        t = new Timeline({
          duration: 200
        });
        return expect(t._props.duration).toBe(0);
      });
    });
    describe('_vars method ->', function() {
      it('should declare _timelines array', function() {
        var t;
        t = new Timeline;
        expect(h.isArray(t._timelines)).toBe(true);
        return expect(t._timelines.length).toBe(0);
      });
      it('should call super _vars function', function() {
        var t;
        t = new Timeline;
        spyOn(Timeline.prototype, '_vars');
        t._vars();
        return expect(Timeline.prototype._vars).toHaveBeenCalled();
      });
      return it('should override Tween\'s name', function() {
        var t;
        t = new Timeline;
        return expect(t._name).toBe('Timeline');
      });
    });
    describe('add method ->', function() {
      it('should add timeline', function() {
        var t, tw;
        t = new Timeline;
        tw = new Tween;
        t.add(tw);
        expect(t._timelines.length).toBe(1);
        return expect(t._timelines[0]).toBe(tw);
      });
      it('should return self for chaining', function() {
        var obj, t;
        t = new Timeline;
        obj = t.add(new Tween);
        return expect(obj).toBe(t);
      });
      it('should treat a module with timeline object as a timeline', function() {
        var t, tr;
        t = new Timeline;
        tr = new Transit;
        t.add(tr);
        expect(t._timelines.length).toBe(1);
        expect(t._timelines[0] instanceof Timeline).toBe(true);
        return expect(t._timelines[0] === tr.timeline).toBe(true);
      });
      it('should work with arrays of tweens', function() {
        var t, t1, t2, tm;
        t = new Timeline;
        t1 = new Tween({
          duration: 1000
        });
        t2 = new Tween({
          duration: 1500
        });
        tm = new Timeline;
        t.add([t1, t2, tm]);
        expect(t._timelines.length).toBe(3);
        expect(t._timelines[0] === t1).toBe(true);
        expect(t._timelines[1] === t2).toBe(true);
        return expect(t._timelines[2] === tm).toBe(true);
      });
      it('should work with arguments', function() {
        var t1, t2, tween;
        tween = new Timeline;
        t1 = new Tween({
          duration: 500,
          delay: 200
        });
        t2 = new Tween({
          duration: 500,
          delay: 500
        });
        tween.add(t1, t2);
        return expect(tween._timelines.length).toBe(2);
      });
      it('should work with mixed arguments', function() {
        var t, t1, t2, t3, tm;
        t = new Timeline;
        t1 = new Tween({
          duration: 1000
        });
        t2 = new Tween({
          duration: 1500
        });
        t3 = new Tween;
        tm = new Timeline;
        t.add([t1, t2, tm], t3);
        expect(t._timelines.length).toBe(4);
        expect(t._timelines[0] === t1).toBe(true);
        expect(t._timelines[1] === t2).toBe(true);
        expect(t._timelines[2] === tm).toBe(true);
        return expect(t._timelines[3] === t3).toBe(true);
      });
      return it('should calc self duration', function() {
        var t;
        t = new Timeline;
        t.add(new Tween({
          duration: 500,
          delay: 200
        }));
        expect(t._props.time).toBe(700);
        t.add(new Tween({
          duration: 500,
          delay: 200,
          repeat: 1
        }));
        expect(t._props.time).toBe(1400);
        return it('should work with another tweens', function() {
          var t1;
          t1 = new Timeline;
          t = new Timeline;
          t.add(new Tween({
            duration: 500,
            delay: 200
          }));
          t.add(new Tween({
            duration: 500,
            delay: 200,
            repeat: 1
          }));
          t1.add(t);
          return expect(t1._props.repeatTime).toBe(1400);
        });
      });
    });
    describe('_setProgress method ->', function() {
      it('should call super _setProgress method', function() {
        var t;
        t = new Timeline;
        spyOn(Tween.prototype, '_setProgress');
        t._setProgress(1, 2);
        return expect(Tween.prototype._setProgress).toHaveBeenCalledWith(1, 2);
      });
      it('should save previous yoyo value', function() {
        var progress, t, time;
        t = new Timeline({
          yoyo: true,
          repeat: 1
        });
        progress = .75;
        time = 2;
        t._setProgress(progress - .1, time, true);
        t._setProgress(progress, time, true);
        return expect(t._prevYoyo).toBe(true);
      });
      it('should call _update method on every timeline forward', function() {
        var progress, t, time, tw1, tw2;
        t = new Timeline;
        tw1 = new Tween;
        tw2 = new Tween;
        t.add(tw1, tw2);
        spyOn(tw1, '_update');
        spyOn(tw2, '_update');
        t._setStartTime();
        progress = .75;
        time = t._props.startTime + progress * t._props.duration;
        t._update(time - 1);
        t._update(time);
        expect(tw1._update).toHaveBeenCalledWith(time, time - 1, void 0, 0);
        return expect(tw2._update).toHaveBeenCalledWith(time, time - 1, void 0, 0);
      });
      it('should call _update method on every timeline backward', function() {
        var progress, t, time, tw1, tw2;
        t = new Timeline;
        tw1 = new Tween;
        tw2 = new Tween;
        t.add(tw1, tw2);
        spyOn(tw1, '_update');
        spyOn(tw2, '_update');
        t._setStartTime();
        progress = .75;
        time = t._props.startTime + progress * t._props.duration;
        t._update(time + 1);
        t._update(time);
        expect(tw1._update).toHaveBeenCalledWith(time, time + 1, void 0, 0);
        return expect(tw2._update).toHaveBeenCalledWith(time, time + 1, void 0, 0);
      });
      it('should call _update method on every timeline forward yoyo', function() {
        var progress, t, time, tw1, tw2;
        t = new Timeline({
          yoyo: true,
          isIt: 1
        });
        tw1 = new Tween;
        tw2 = new Tween;
        t.add(tw1, tw2);
        spyOn(tw1, '_update');
        spyOn(tw2, '_update');
        t._setStartTime();
        progress = .75;
        time = t._props.startTime + progress * t._props.duration;
        t._update(time - 1);
        t._update(time);
        expect(tw1._update).toHaveBeenCalledWith(time, time - 1, void 0, 0);
        return expect(tw2._update).toHaveBeenCalledWith(time, time - 1, void 0, 0);
      });
      return it('should call _update method on every timeline backward yoyo', function() {
        var progress, t, time, tw1, tw2;
        t = new Timeline({
          yoyo: true,
          isIt: 1
        });
        tw1 = new Tween;
        tw2 = new Tween;
        t.add(tw1, tw2);
        spyOn(tw1, '_update');
        spyOn(tw2, '_update');
        t._setStartTime();
        progress = .75;
        time = t._props.startTime + progress * t._props.duration;
        t._update(time + 1);
        t._update(time);
        expect(tw1._update).toHaveBeenCalledWith(time, time + 1, void 0, 0);
        return expect(tw2._update).toHaveBeenCalledWith(time, time + 1, void 0, 0);
      });
    });
    describe('_setStartTime method ->', function() {
      it('should call super _setStartTime method', function() {
        var t;
        t = new Timeline;
        spyOn(Timeline.prototype, '_setStartTime');
        t._setStartTime();
        return expect(Timeline.prototype._setStartTime).toHaveBeenCalled();
      });
      return it('should call _startTimelines method', function() {
        var t;
        t = new Timeline;
        spyOn(t, '_startTimelines');
        t._setStartTime();
        return expect(t._startTimelines).toHaveBeenCalledWith(t._props.startTime, true);
      });
    });
    describe('_startTimelines method ->', function() {
      it('should set time to startTime if no time was passed', function() {
        var t;
        t = new Timeline;
        t.add(new Tween({
          duration: 500
        }), new Tween({
          duration: 600
        }));
        spyOn(t._timelines[0], '_setStartTime');
        spyOn(t._timelines[1], '_setStartTime');
        t._startTimelines(null);
        expect(t._timelines[0]._setStartTime).toHaveBeenCalledWith(t._props.startTime, true);
        return expect(t._timelines[1]._setStartTime).toHaveBeenCalledWith(t._props.startTime, true);
      });
      it('should add self shiftTime to child timelines', function() {
        var shift, t, time;
        t = new Timeline;
        t.add(new Tween({
          duration: 500
        }));
        time = 0;
        shift = 500;
        t._setProp({
          'shiftTime': shift
        });
        t._setStartTime(time);
        return expect(t._timelines[0]._props.startTime).toBe(time + shift);
      });
      return it('should set _prevTime on each child if from subplay', function(dfr) {
        var t;
        t = new Timeline;
        t.add(new Tween({
          duration: 500
        }));
        t.play();
        return setTimeout(function() {
          t.pause().playBackward().pause();
          expect(t._timelines[0]._prevTime).toBe(t._timelines[0]._normPrevTimeForward());
          return dfr();
        }, 50);
      });
    });
    describe('_pushTimeline method ->', function() {
      it('should push timeline to timelines and calc repeatTime', function() {
        var t, tw;
        t = new Timeline;
        tw = new Tween({
          duration: 4000
        });
        t._pushTimeline(tw);
        expect(t._timelines.length).toBe(1);
        expect(t._timelines[0] instanceof Tween).toBe(true);
        expect(t._timelines[0]).toBe(tw);
        return expect(t._props.duration).toBe(4000);
      });
      it('should calc time regarding tween\'s speed', function() {
        var t, tw;
        t = new Timeline;
        tw = new Tween({
          duration: 4000,
          speed: .1
        });
        t._pushTimeline(tw);
        expect(t._timelines.length).toBe(1);
        expect(t._timelines[0] instanceof Tween).toBe(true);
        expect(t._timelines[0]).toBe(tw);
        return expect(t._props.duration).toBe(40000);
      });
      return it('should call _recalcDuration method', function() {
        var t, tw;
        t = new Timeline;
        tw = new Tween({
          duration: 4000
        });
        spyOn(t, '_recalcDuration');
        t._pushTimeline(tw);
        return expect(t._recalcDuration).toHaveBeenCalledWith(tw);
      });
    });
    describe('append method ->', function() {
      it('should add timeline', function() {
        var t;
        t = new Timeline;
        t.append(new Tween);
        expect(t._timelines.length).toBe(1);
        return expect(t._timelines[0] instanceof Tween).toBe(true);
      });
      it('should call _calcDimentions method', function() {
        var t;
        t = new Timeline;
        spyOn(t, '_calcDimentions');
        t.append(new Tween);
        return expect(t._calcDimentions).toHaveBeenCalled();
      });
      it('should treat every argument as new append call', function() {
        var t, tm1, tm2;
        t = new Timeline;
        tm1 = new Tween({
          duration: 1000,
          delay: 500
        });
        tm2 = new Tween({
          duration: 1000,
          delay: 700
        });
        t.append(tm1, tm2);
        expect(t._timelines.length).toBe(2);
        expect(t._timelines[0] instanceof Tween).toBe(true);
        expect(t._timelines[1] instanceof Tween).toBe(true);
        expect(t._timelines[1]._props.shiftTime).toBe(1500);
        return expect(t._props.time).toBe(3200);
      });
      it('should treat arrays as parallel tweens #1', function() {
        var t, tm1, tm2, tm3;
        t = new Timeline;
        tm1 = new Tween({
          duration: 500,
          delay: 500
        });
        tm2 = new Tween({
          duration: 500,
          delay: 700
        });
        tm3 = new Tween({
          duration: 500,
          delay: 700
        });
        t.append(tm1, [tm2, tm3]);
        return expect(t._props.time).toBe(2200);
      });
      it('should treat arrays as parallel tweens #2', function() {
        var t, tm1, tm2, tm3;
        t = new Timeline;
        tm1 = new Tween({
          duration: 500,
          delay: 800
        });
        tm2 = new Tween({
          duration: 500,
          delay: 700
        });
        tm3 = new Tween({
          duration: 500,
          delay: 700
        });
        t.append([tm2, tm3], tm1);
        return expect(t._props.repeatTime).toBe(1200 + 1300);
      });
      it('should arguments time = array time', function() {
        var t1, t2, time, tm0, tm1, tm2;
        t1 = new Timeline({
          delay: 2500
        });
        t2 = new Timeline({
          delay: 2500
        });
        tm0 = new Tween({
          duration: 3000,
          delay: 200
        });
        tm1 = new Tween({
          duration: 500,
          delay: 800
        });
        tm2 = new Tween({
          duration: 500,
          delay: 800
        });
        t1.add(tm0);
        t2.add(tm0);
        t1.append(tm1);
        t2.append([tm2]);
        time = performance.now();
        t1._setStartTime(time);
        t2._setStartTime(time);
        return expect(Math.abs(tm2._props.startTime - tm1._props.startTime)).not.toBeGreaterThan(20);
      });
      it('should delay the timeline to duration', function() {
        var t;
        t = new Timeline;
        t.add(new Tween({
          duration: 1000,
          delay: 200
        }));
        t.append(new Tween({
          duration: 500,
          delay: 500
        }));
        return expect(t._timelines[1]._props.shiftTime).toBe(1200);
      });
      it('should recalc duration', function() {
        var t;
        t = new Timeline;
        t.add(new Tween({
          duration: 1000,
          delay: 200
        }));
        t.append(new Tween({
          duration: 500,
          delay: 500
        }));
        return expect(t._props.time).toBe(2200);
      });
      it('should work with array', function() {
        var t, tm1, tm2;
        t = new Timeline;
        t.add(new Tween({
          duration: 1000,
          delay: 200
        }));
        tm1 = new Tween({
          duration: 500,
          delay: 500
        });
        tm2 = new Tween({
          duration: 500,
          delay: 700
        });
        t.append([tm1, tm2]);
        expect(t._timelines.length).toBe(3);
        return expect(t._props.time).toBe(2400);
      });
      it('should work with one argument', function() {
        var t;
        t = new Timeline;
        t.append(new Tween({
          duration: 1000,
          delay: 200
        }));
        return expect(t._timelines.length).toBe(1);
      });
      it('should work with multiple arguments', function() {
        var t, tm1, tm2;
        t = new Timeline;
        tm1 = new Tween({
          duration: 500,
          delay: 500
        });
        tm2 = new Tween({
          duration: 500,
          delay: 700
        });
        t.append(tm1, tm2);
        return expect(t._timelines.length).toBe(2);
      });
      it('should work with array and set the indexes', function() {
        var t, tm1, tm2;
        t = new Timeline;
        t.add(new Tween({
          duration: 1000,
          delay: 200
        }));
        tm1 = new Tween({
          duration: 500,
          delay: 500
        });
        tm2 = new Tween({
          duration: 500,
          delay: 700
        });
        t.append([tm1, tm2]);
        expect(tm1.index).toBe(1);
        return expect(tm2.index).toBe(1);
      });
      return it('should add element index', function() {
        var t;
        t = new Timeline;
        t.append(new Tween({
          duration: 1000,
          delay: 200
        }));
        t.append(new Tween({
          duration: 1000,
          delay: 200
        }));
        expect(t._timelines[0].index).toBe(0);
        return expect(t._timelines[1].index).toBe(1);
      });
    });
    describe('_recalcTotalDuration method ->', function() {
      return it('should recalculate duration', function() {
        var t, timeline, timeline2;
        t = new Timeline;
        timeline = new Tween({
          duration: 100
        });
        timeline2 = new Tween({
          duration: 1000
        });
        t.add(timeline);
        t._timelines.push(timeline2);
        t._recalcTotalDuration();
        return expect(t._props.duration).toBe(1000);
      });
    });
    return describe('setProgress method ->', function() {
      it('should call _setStartTime if there is no this._props.startTime', function() {
        var t;
        t = new Timeline;
        spyOn(t, '_setStartTime');
        t.setProgress(.5);
        return expect(t._setStartTime).toHaveBeenCalled();
      });
      it('should return self', function() {
        var result, t;
        t = new Timeline;
        result = t.setProgress(.5);
        return expect(result).toBe(t);
      });
      it('should call self update', function() {
        var duration, progress, t;
        duration = 500;
        progress = .75;
        t = new Timeline;
        t.add(new Tween({
          duration: duration
        }));
        spyOn(t, '_update');
        t.setProgress(progress);
        return expect(t._update).toHaveBeenCalledWith(t._props.startTime + (progress * duration));
      });
      it('should not set the progress less then 0', function() {
        var delay, t, t1;
        delay = 5000;
        t = new Timeline({
          delay: delay
        });
        t1 = new Timeline;
        t1.add(new Tween({
          duration: 500,
          delay: 200
        }));
        t.add(t1);
        spyOn(t, '_update');
        t.setProgress(-1.5);
        return expect(t._update).toHaveBeenCalledWith(t._props.startTime - delay);
      });
      return it('should not set the progress more then 1', function() {
        var delay, t, t1;
        delay = 200;
        t = new Timeline({
          delay: delay
        });
        t1 = new Timeline;
        t1.add(new Tween({
          duration: 500,
          delay: 200
        }));
        t.add(t1);
        spyOn(t, '_update');
        t.setProgress(1.5);
        return expect(t._update).toHaveBeenCalledWith((t._props.startTime - delay) + t._props.repeatTime);
      });
    });
  });

}).call(this);
