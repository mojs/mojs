(function() {
  var Timeline, Tween, easing, h, tweener;

  Tween = window.mojs.Tween;

  Timeline = window.mojs.Timeline;

  easing = window.mojs.easing;

  h = window.mojs.h;

  tweener = window.mojs.tweener;

  describe('Tween ->', function() {
    describe('name ->', function() {
      it('should set self custom name', function() {
        var name, t;
        tweener['_Tweens'] = void 0;
        name = 'Light tween 1';
        t = new Tween({
          name: name
        });
        return expect(t._props.name).toBe(name);
      });
      return it('should make generic name if no one was specified', function() {
        var t;
        tweener['_Tweens'] = void 0;
        t = new Tween;
        expect(t._props.name).toBe('Tween 1');
        t = new Tween;
        return expect(t._props.name).toBe('Tween 2');
      });
    });
    describe('constructor ->', function() {
      return it('should increment _name+s on tweener', function() {
        var t;
        tweener['_Tweens'] = void 0;
        t = new Tween;
        expect(tweener['_Tweens']).toBe(1);
        t = new Tween;
        expect(tweener['_Tweens']).toBe(2);
        t = new Tween;
        return expect(tweener['_Tweens']).toBe(3);
      });
    });
    describe('defaults ->', function() {
      it('should have vars', function() {
        var t;
        t = new Tween;
        expect(t._props).toBeDefined();
        expect(t._negativeShift).toBe(0);
        expect(t._progressTime).toBe(0);
        expect(t.progress).toBe(0);
        return expect(t._state).toBe('stop');
      });
      it('should have defaults', function() {
        var t;
        t = new Tween;
        expect(t._defaults.duration).toBe(600);
        expect(t._defaults.delay).toBe(0);
        expect(t._defaults.yoyo).toBe(false);
        expect(t._defaults.speed).toBe(1);
        expect(t._defaults.name).toBe(null);
        expect(t._defaults.nameBase).toBe('Tween');
        expect(t._defaults.onStart).toBeDefined();
        expect(t._defaults.onRepeatStart).toBeDefined();
        expect(t._defaults.onFirstUpdate).toBeDefined();
        expect(t._defaults.onRepeatComplete).toBeDefined();
        expect(t._defaults.onComplete).toBeDefined();
        expect(t._defaults.onUpdate).toBeDefined();
        expect(t._defaults.onProgress).toBeDefined();
        return expect(t._defaults.isChained).toBe(false);
      });
      return it('should extend defaults to props', function() {
        var t;
        t = new Tween({
          duration: 1000
        });
        expect(t._props.duration).toBe(1000);
        return expect(t._props.delay).toBe(0);
      });
    });
    describe('init ->', function() {
      it('should calc time, repeatTime', function() {
        var t;
        t = new Tween({
          duration: 1000,
          delay: 100
        });
        expect(t._props.time).toBe(1100);
        return expect(t._props.repeatTime).toBe(1100);
      });
      return it('should calc time, repeatTime #2', function() {
        var t;
        t = new Tween({
          duration: 1000,
          delay: 100,
          repeat: 2
        });
        expect(t._props.time).toBe(1100);
        return expect(t._props.repeatTime).toBe(3300);
      });
    });
    describe('isChained option ->', function() {
      it('should receive isChained option', function() {
        var t;
        t = new Tween({
          duration: 1000,
          isChained: true
        });
        return expect(t._props.isChained).toBe(true);
      });
      return it('should fallback to default isChained option', function() {
        var t;
        t = new Tween({
          duration: 1000
        });
        return expect(t._props.isChained).toBe(false);
      });
    });
    describe('_setStartTime method ->', function() {
      it('should calculate start time', function() {
        var expectedTime, t;
        t = new Tween({
          duration: 1000,
          delay: 500
        })._setStartTime();
        expectedTime = performance.now() + 500;
        expect(t._props.startTime).toBeGreaterThan(expectedTime - 50);
        return expect(t._props.startTime).not.toBeGreaterThan(expectedTime);
      });
      it('should receive the start time', function() {
        var t;
        t = new Tween({
          duration: 1000
        })._setStartTime(1);
        return expect(t._props.startTime).toBe(1);
      });
      it('should calculate end time', function() {
        var delay, duration, endTime, t;
        duration = 1000;
        delay = 500;
        t = new Tween({
          duration: duration,
          delay: delay
        })._setStartTime();
        endTime = t._props.startTime + t._props.repeatTime - t._props.delay;
        return expect(t._props.endTime).toBe(endTime);
      });
      it('should calculate end time with repeat', function() {
        var delay, duration, endTime, t;
        duration = 1000;
        delay = 500;
        t = new Tween({
          duration: duration,
          delay: delay,
          repeat: 2
        })._setStartTime();
        endTime = t._props.startTime + t._props.repeatTime - t._props.delay;
        return expect(t._props.endTime).toBe(endTime);
      });
      it('should calculate end time if repeat', function() {
        var delay, duration, t, time;
        duration = 1000;
        delay = 500;
        t = new Tween({
          duration: duration,
          delay: delay,
          repeat: 2
        })._setStartTime();
        time = t._props.startTime + (3 * (duration + delay)) - delay;
        return expect(t._props.endTime).toBe(time);
      });
      it('should calculate startTime and endTime if shifted', function() {
        var delay, duration, endTime, expectedTime, t;
        duration = 1000;
        delay = 500;
        t = new Tween({
          duration: duration,
          delay: delay,
          repeat: 2
        });
        t._setProp('shiftTime', 500);
        t._setStartTime();
        expectedTime = performance.now() + 500 + delay;
        expect(t._props.startTime).toBeGreaterThan(expectedTime - 50);
        expect(t._props.startTime).not.toBeGreaterThan(expectedTime);
        endTime = t._props.startTime + (3 * (duration + delay)) - delay;
        return expect(t._props.endTime).toBe(endTime);
      });
      it('should restart flags', function() {
        var t;
        t = new Tween({
          duration: 20,
          repeat: 2
        })._setStartTime();
        t._update(t._props.startTime + 10);
        t._update(t._props.startTime + 60);
        expect(t._isCompleted).toBe(true);
        expect(t._isStarted).toBe(false);
        expect(t._isRepeatCompleted).toBe(true);
        t._setStartTime();
        expect(t._isCompleted).toBe(false);
        expect(t._isRepeatCompleted).toBe(false);
        return expect(t._isStarted).toBe(false);
      });
      it('should not restart _repeatComplete flag is second param is false', function() {
        var t;
        t = new Tween({
          duration: 20,
          repeat: 2
        })._setStartTime();
        t._update(t._props.startTime + 10);
        t._update(t._props.startTime + 60);
        expect(t._isRepeatCompleted).toBe(true);
        t._setStartTime(1, false);
        return expect(t._isRepeatCompleted).toBe(true);
      });
      it('should set _playTime', function() {
        var now, t;
        t = new Tween;
        t._setStartTime();
        now = performance.now();
        expect(t._playTime).toBeDefined();
        return expect(Math.abs(t._playTime - now)).not.toBeGreaterThan(10);
      });
      it('should set _playTime to passed time', function() {
        var now, t;
        t = new Tween;
        now = performance.now() + 50;
        t._setStartTime(now);
        return expect(t._playTime).toBe(now);
      });
      it('should set _playTime to _resumeTime if present', function() {
        var resumeTime, t;
        t = new Tween;
        resumeTime = 3200;
        t._resumeTime = resumeTime;
        t._setStartTime();
        return expect(t._playTime).toBe(resumeTime);
      });
      return it('should reset _resumeTime', function() {
        var t;
        t = new Tween;
        t._resumeTime = 3200;
        t._setStartTime();
        return expect(t._resumeTime).toBe(null);
      });
    });
    describe('_update method ->', function() {
      it('should update progress', function() {
        var t, time;
        t = new Tween({
          duration: 1000,
          delay: 500
        });
        t._setStartTime();
        time = t._props.startTime + 199;
        t._update(time);
        expect(t.progress).toBe(0);
        time = t._props.startTime + 200;
        t._update(time);
        return expect(t.progress).toBeCloseTo(.2, 5);
      });
      it('should update progress with repeat', function() {
        var t;
        t = new Tween({
          duration: 1000,
          delay: 200,
          repeat: 2
        });
        t._setStartTime();
        t._update(t._props.startTime + 1399);
        expect(t.progress).toBeCloseTo(0);
        t._update(t._props.startTime + 1400);
        expect(t.progress).toBeCloseTo(.2);
        t._update(t._props.startTime + 2700);
        expect(t.progress).toBeCloseTo(.3);
        t._update(t._props.startTime + 3400);
        return expect(t.progress).toBe(1);
      });
      it('should update progress to 1 if in delay gap and previous time value was smaller then the current one', function() {
        var t;
        t = new Tween({
          duration: 1000,
          delay: 200,
          repeat: 2
        });
        t._setStartTime();
        t._update(t._props.startTime + 300);
        t._update(t._props.startTime + 500);
        t._update(t._props.startTime + 1100);
        return expect(t.progress).toBe(1);
      });
      it('should update progress to 1 if in delay gap and previous time value was bigger then the current one', function() {
        var t;
        t = new Tween({
          duration: 1000,
          delay: 200,
          repeat: 2
        });
        t._setStartTime();
        t._update(t._props.startTime + 1300);
        t._update(t._props.startTime + 1100);
        return expect(t.progress).toBe(0);
      });
      it('should update progress to 1 on the end', function() {
        var t;
        t = new Tween({
          duration: 1000,
          delay: 200,
          repeat: 2
        });
        t._setStartTime();
        t._update(t._props.startTime + 200);
        expect(t.progress).toBeCloseTo(0);
        t._update(t._props.startTime + 500);
        expect(t.progress).toBeCloseTo(.5);
        t._update(t._props.startTime + 1000);
        return expect(t.progress).toBeCloseTo(1, 5);
      });
      it('should return true on the end', function() {
        var returnValue, t;
        t = new Tween({
          duration: 1000,
          delay: 200
        });
        t._setStartTime();
        t._update(t._props.startTime + t._props.duration / 2);
        returnValue = t._update(t._props.startTime + 1000);
        expect(t.progress).toBeCloseTo(1, 5);
        expect(t._isCompleted).toBe(true);
        expect(t._isRepeatCompleted).toBe(true);
        return expect(returnValue).toBe(true);
      });
      it('should return true on the start', function() {
        var returnValue, t;
        t = new Tween({
          duration: 1000,
          delay: 200,
          onUpdate: function(p) {
            return console.log(p);
          }
        });
        t._setStartTime();
        t._update(t._props.startTime + t._props.duration / 2);
        returnValue = t._update(t._props.startTime - 1000);
        expect(t.progress).toBeCloseTo(0, 5);
        return expect(returnValue).toBe(true);
      });
      it('should not call update method if timeline isnt active "-"', function() {
        var t;
        t = new Tween({
          duration: 1000,
          onUpdate: function() {}
        });
        t._setStartTime();
        spyOn(t, 'onUpdate');
        t._update(t._props.startTime - 500);
        return expect(t.onUpdate).not.toHaveBeenCalled();
      });
      it('should not call update method if timeline isnt active but was "-"', function() {
        var t;
        t = new Tween({
          duration: 1000,
          onUpdate: function() {}
        });
        t._setStartTime();
        spyOn(t, 'onUpdate');
        t._update(t._props.startTime + 500);
        t._update(t._props.startTime + 200);
        expect(t._isInActiveArea).toBe(true);
        t._update(t._props.startTime - 500);
        expect(t._isInActiveArea).toBe(false);
        expect(t.onUpdate).toHaveBeenCalledWith(0, 0, false, false);
        t._update(t._props.startTime - 500);
        expect(t._isInActiveArea).toBe(false);
        return expect(t.onUpdate.calls.count()).toBe(2);
      });
      it('should not call update method if timeline isnt active "+"', function() {
        var t;
        t = new Tween({
          duration: 1000,
          onUpdate: function() {}
        });
        spyOn(t, 'onUpdate');
        t._setStartTime();
        t._update(performance.now() + 1500);
        return expect(t.onUpdate).not.toHaveBeenCalled();
      });
      it('should not call update method if timeline isnt active but was "+"', function() {
        var t;
        t = new Tween({
          duration: 1000,
          onUpdate: function() {}
        });
        spyOn(t, 'onUpdate');
        t._setStartTime();
        t._update(t._props.startTime + 200);
        t._update(t._props.startTime + 500);
        expect(t._isInActiveArea).toBe(true);
        t._update(t._props.startTime + 1500);
        expect(t._isInActiveArea).toBe(false);
        return expect(t.onUpdate).toHaveBeenCalledWith(1, 1, true, false);
      });
      it('should set Tween to the end if Tween ended', function() {
        var t;
        t = new Tween({
          duration: 1000,
          delay: 500
        });
        t._setStartTime();
        t._update(t._props.startTime + 200);
        t._update(t._props.startTime + 1200);
        return expect(t.progress).not.toBe(1);
      });
      it('should save progress time to _progressTime', function() {
        var delay, duration, t, time, updateTime;
        delay = 500;
        duration = 1000;
        t = new Tween({
          duration: duration,
          delay: delay
        });
        t._setStartTime();
        updateTime = 199;
        time = t._props.startTime + updateTime;
        t._update(time - 1);
        t._update(time);
        return expect(t._progressTime).toBeCloseTo(delay + updateTime, 5);
      });
      it('should save progress start point time to _progressTime', function() {
        var delay, duration, t, time, updateTime;
        delay = 500;
        duration = 1000;
        t = new Tween({
          duration: duration,
          delay: delay
        });
        t._setStartTime();
        updateTime = 199;
        time = t._props.startTime - 2 * delay;
        t._update(time - 1);
        t._update(time);
        return expect(t._progressTime).toBe(0);
      });
      it('should save progress 0 at the end time to _progressTime', function() {
        var delay, duration, t, time, updateTime;
        delay = 500;
        duration = 1000;
        t = new Tween({
          duration: duration,
          delay: delay,
          repeat: 2
        });
        t._setStartTime();
        updateTime = 199;
        time = t._props.startTime + 4 * (duration + delay);
        t._update(time - 1);
        t._update(time);
        return expect(t._progressTime).toBeCloseTo(t._props.repeatTime, 3);
      });
      it('should update with reversed time if _props.isReversed', function() {
        var delay, duration, shift, t, time;
        delay = 500;
        duration = 1000;
        t = new Tween({
          duration: duration,
          delay: delay,
          repeat: 2
        });
        t._setStartTime();
        t._setProp('isReversed', true);
        shift = 200;
        time = t._props.startTime + shift;
        t._update(time - 1);
        t._update(time);
        return expect(t._prevTime).toBeCloseTo(t._props.endTime - delay - shift, 3);
      });
      it('should update save reversed time to _prevTime on when skipping frame', function() {
        var duration, shift, t, time;
        duration = 1000;
        t = new Tween({
          duration: duration
        });
        t._setStartTime();
        t._setProp('isReversed', true);
        shift = 200;
        time = t._props.startTime + shift;
        t._update(time);
        return expect(t._prevTime).toBeCloseTo(t._props.endTime - t._progressTime, 3);
      });
      it('should recalculate time for speed if defined', function() {
        var delay, duration, speed, startPoint, t, time;
        delay = 50;
        duration = 1000;
        speed = 2;
        t = new Tween({
          speed: speed,
          duration: duration,
          delay: delay,
          repeat: 2
        });
        t.play().pause();
        time = t._props.startTime + duration / 4;
        startPoint = t._props.startTime - delay;
        t._update(time - 1);
        t._update(time);
        return expect(t._prevTime).toBe(startPoint + speed * (time - startPoint));
      });
      it('should ignore speed if _playTime is not set', function() {
        var delay, duration, speed, t, time;
        delay = 200;
        duration = 1000;
        speed = 2;
        t = new Tween({
          speed: speed,
          duration: duration,
          delay: delay,
          repeat: 2
        });
        t._setStartTime();
        time = t._props.startTime + duration / 2;
        t._playTime = null;
        t._update(time);
        return expect(t._prevTime).toBe(time);
      });
      it('should save _onEdge property', function() {
        var duration, t;
        duration = 1000;
        t = new Tween({
          duration: duration,
          repeat: 1
        });
        t._setStartTime();
        t._update(t._props.startTime);
        t._update(t._props.startTime + duration / 2);
        expect(t._onEdge).toBe(0);
        t._update(t._props.startTime + duration + 1);
        expect(t._onEdge).toBe(1);
        t._update(t._props.startTime + duration + 2);
        return expect(t._onEdge).toBe(0);
      });
      it('should save _onEdge property || reverse', function() {
        var duration, t;
        duration = 1000;
        t = new Tween({
          duration: duration,
          repeat: 1
        });
        t._setStartTime();
        t._update(t._props.endTime - 1);
        t._update(t._props.endTime - duration / 2);
        expect(t._onEdge).toBe(0);
        t._update(t._props.endTime - duration - 1);
        expect(t._onEdge).toBe(-1);
        t._update(t._props.endTime - duration - 2);
        return expect(t._onEdge).toBe(0);
      });
      it('should receive _prevTime', function() {
        var prevTime, t, time;
        t = new Tween({
          duration: 1000,
          delay: 200,
          repeat: 2,
          onStart: function() {}
        });
        t._setStartTime();
        prevTime = 1;
        time = 2;
        spyOn(t, '_updateInActiveArea').and.callThrough();
        spyOn(t._props, 'onStart');
        t._update(t._props.startTime + 1300, time, prevTime);
        expect(t._updateInActiveArea).toHaveBeenCalled();
        return expect(t._props.onStart).toHaveBeenCalledWith(true, false);
      });
      it('should receive _prevTime #2', function() {
        var prevTime, t, time;
        t = new Tween({
          duration: 1000,
          delay: 200,
          repeat: 2,
          onStart: function() {}
        });
        t._setStartTime();
        t._prevTime = 2;
        prevTime = 1;
        time = 2;
        spyOn(t, '_updateInActiveArea').and.callThrough();
        spyOn(t._props, 'onStart');
        t._update(t._props.startTime + 1300, time, prevTime);
        expect(t._updateInActiveArea).toHaveBeenCalled();
        return expect(t._props.onStart).toHaveBeenCalledWith(true, false);
      });
      it('should call callbacks if on edge "+1" + was yoyo', function() {
        var duration, t, tm;
        tm = new mojs.Timeline({
          repeat: 2,
          yoyo: true
        });
        duration = 1000;
        t = new Tween({
          duration: duration,
          onStart: function() {},
          onRepeatStart: function() {},
          onUpdate: function() {},
          onProgress: function() {},
          onRepeatComplete: function() {},
          onComplete: function() {},
          onFirstUpdate: function() {}
        });
        tm.add(t);
        tm.setProgress(0);
        tm.setProgress(.25);
        tm.setProgress(.35);
        tm.setProgress(.55);
        spyOn(t._props, 'onStart');
        spyOn(t._props, 'onRepeatStart');
        tm.setProgress(.85);
        expect(t._props.onStart).toHaveBeenCalledWith(false, false);
        return expect(t._props.onRepeatStart).toHaveBeenCalledWith(false, false);
      });
      it('should call callbacks if on edge "+1" + wasn\'t yoyo', function() {
        var duration, t, tm;
        tm = new mojs.Timeline({
          repeat: 2
        });
        duration = 1000;
        t = new Tween({
          duration: duration,
          onStart: function() {},
          onRepeatStart: function() {},
          onUpdate: function() {},
          onProgress: function() {},
          onRepeatComplete: function() {},
          onComplete: function() {},
          onFirstUpdate: function() {}
        });
        tm.add(t);
        tm.setProgress(0);
        tm.setProgress(.25);
        tm.setProgress(.35);
        tm.setProgress(.55);
        spyOn(t._props, 'onRepeatComplete');
        spyOn(t._props, 'onComplete');
        tm.setProgress(.85);
        expect(t._props.onRepeatComplete).toHaveBeenCalledWith(true, false);
        return expect(t._props.onComplete).toHaveBeenCalledWith(true, false);
      });
      it('should call callbacks if on edge "-1" + was yoyo', function() {
        var duration, t, tm;
        tm = new mojs.Timeline({
          repeat: 1,
          yoyo: true
        });
        duration = 1000;
        t = new Tween({
          duration: duration,
          onStart: function() {},
          onRepeatStart: function() {},
          onUpdate: function() {},
          onProgress: function() {},
          onRepeatComplete: function() {},
          onComplete: function() {},
          onFirstUpdate: function() {}
        });
        tm.add(t);
        tm.setProgress(0);
        tm.setProgress(.25);
        tm.setProgress(.35);
        tm.setProgress(.55);
        tm.setProgress(.56);
        tm.setProgress(.54);
        spyOn(t._props, 'onRepeatComplete');
        spyOn(t._props, 'onComplete');
        tm.setProgress(.25);
        expect(t._props.onRepeatComplete).toHaveBeenCalledWith(true, false);
        return expect(t._props.onComplete).toHaveBeenCalledWith(true, false);
      });
      return it('should call callbacks if on edge "-1" + wasn\'t yoyo', function() {
        var duration, t, tm;
        tm = new mojs.Timeline({
          repeat: 1
        });
        duration = 1000;
        t = new Tween({
          duration: duration,
          onStart: function() {},
          onRepeatStart: function() {},
          onUpdate: function() {},
          onProgress: function() {},
          onRepeatComplete: function() {},
          onComplete: function() {},
          onFirstUpdate: function() {}
        });
        tm.add(t);
        tm.setProgress(1);
        tm.setProgress(.85);
        spyOn(t._props, 'onRepeatStart');
        spyOn(t._props, 'onStart');
        tm.setProgress(.45);
        expect(t._props.onRepeatStart).toHaveBeenCalledWith(false, false);
        return expect(t._props.onStart).toHaveBeenCalledWith(false, false);
      });
    });
    it('should call callbacks if on edge "-1" + was yoyo', function() {
      var duration, t, tm;
      tm = new mojs.Timeline({
        repeat: 1,
        yoyo: true
      });
      duration = 1000;
      t = new Tween({
        yoyo: true,
        duration: duration,
        onStart: function() {},
        onRepeatStart: function() {},
        onUpdate: function() {},
        onProgress: function() {},
        onRepeatComplete: function() {},
        onComplete: function() {},
        onFirstUpdate: function() {}
      });
      tm.add(t);
      tm.setProgress(1);
      tm.setProgress(.85);
      spyOn(t._props, 'onRepeatComplete');
      spyOn(t._props, 'onComplete');
      tm.setProgress(.45);
      expect(t._props.onRepeatComplete).toHaveBeenCalledWith(true, false);
      return expect(t._props.onComplete).toHaveBeenCalledWith(true, false);
    });
    it('should call callbacks if on edge "+1" + wasn\'t yoyo', function() {
      var duration, t, tm;
      tm = new mojs.Timeline({
        repeat: 2,
        yoyo: true
      });
      duration = 1000;
      t = new Tween({
        repeat: 2,
        yoyo: true,
        speed: .5,
        duration: duration,
        delay: duration / 2,
        onStart: function() {},
        onRepeatStart: function() {},
        onUpdate: function() {},
        onProgress: function() {},
        onRepeatComplete: function() {},
        onComplete: function() {},
        onFirstUpdate: function() {}
      });
      tm.add(t);
      tm.setProgress(.05);
      tm.setProgress(.1);
      tm.setProgress(.15);
      tm.setProgress(.2);
      tm.setProgress(.25);
      tm.setProgress(.3);
      spyOn(t._props, 'onRepeatComplete');
      spyOn(t._props, 'onComplete');
      tm.setProgress(.35);
      expect(t._props.onRepeatComplete).toHaveBeenCalledWith(true, false);
      return expect(t._props.onComplete).toHaveBeenCalledWith(true, false);
    });
    it('should call callbacks if on edge "+1" + wasn\'t yoyo', function() {
      var duration, t, tm;
      tm = new mojs.Timeline({
        repeat: 2,
        yoyo: true
      });
      duration = 1000;
      t = new Tween({
        repeat: 2,
        yoyo: true,
        speed: 2,
        duration: duration,
        delay: duration / 2,
        onStart: function() {},
        onRepeatStart: function() {},
        onUpdate: function() {},
        onProgress: function() {},
        onRepeatComplete: function() {},
        onComplete: function() {},
        onFirstUpdate: function() {}
      });
      tm.add(t);
      tm.setProgress(.05);
      tm.setProgress(.1);
      tm.setProgress(.15);
      tm.setProgress(.2);
      tm.setProgress(.25);
      tm.setProgress(.3);
      spyOn(t._props, 'onRepeatComplete');
      spyOn(t._props, 'onComplete');
      tm.setProgress(.35);
      expect(t._props.onRepeatComplete).toHaveBeenCalledWith(true, false);
      return expect(t._props.onComplete).toHaveBeenCalledWith(true, false);
    });
    describe('onUpdate callback ->', function() {
      it('should be defined', function() {
        var t;
        t = new Tween({
          onUpdate: function() {}
        });
        return expect(t._props.onUpdate).toBeDefined();
      });
      it('should call onUpdate callback with the current progress', function() {
        var t;
        t = new Tween({
          duration: 1000,
          easing: 'bounce.out',
          onUpdate: function() {}
        });
        spyOn(t, 'onUpdate');
        t._setStartTime();
        t._update(t._props.startTime + 499);
        t._update(t._props.startTime + 500);
        return expect(t.onUpdate).toHaveBeenCalledWith(t.easedProgress, t.progress, true, false);
      });
      it('should have the right scope', function() {
        var isRightScope, t;
        isRightScope = false;
        t = new Tween({
          onUpdate: function() {
            return isRightScope = this instanceof Tween;
          }
        });
        t._setStartTime();
        t._update(t._props.startTime + 199);
        t._update(t._props.startTime + 200);
        return expect(isRightScope).toBe(true);
      });
      it('should not be called on delay', function() {
        var t;
        t = new Tween({
          delay: 200,
          repeat: 2,
          onUpdate: function() {}
        });
        spyOn(t, 'onUpdate').and.callThrough();
        t._setStartTime();
        t._update(t._props.startTime + t._props.duration + 50);
        t._update(t._props.startTime + t._props.duration + 100);
        t._update(t._props.startTime + t._props.duration + 150);
        return expect(t.onUpdate.calls.count()).toBe(0);
      });
      it('should be called just once on delay', function() {
        var t;
        t = new Tween({
          delay: 200,
          repeat: 2,
          onUpdate: function() {}
        });
        t._setStartTime();
        t._update(t._props.startTime + 50);
        t._update(t._props.startTime + t._props.duration / 2);
        spyOn(t, 'onUpdate').and.callThrough();
        t._update(t._props.startTime + t._props.duration + 50);
        t._update(t._props.startTime + t._props.duration + 100);
        t._update(t._props.startTime + t._props.duration + 150);
        return expect(t.onUpdate.calls.count()).toBe(1);
      });
      it('should pass eased progress and raw progress', function() {
        var easedProgress, progress, t;
        easedProgress = null;
        progress = null;
        t = new Tween({
          easing: 'cubic.out',
          onUpdate: function(ep, p) {
            easedProgress = ep;
            return progress = p;
          }
        });
        t._setProgress(.5);
        return expect(easedProgress).toBe(mojs.easing.cubic.out(progress));
      });
      it('should run with right context', function() {
        var isRightContext, t;
        isRightContext = null;
        t = new Tween({
          onUpdate: function() {
            return isRightContext = this === t;
          }
        });
        t.setProgress(0);
        t.setProgress(.1);
        return expect(isRightContext).toBe(true);
      });
      it('should run with custom context', function() {
        var contextObj, isRightContext, t;
        isRightContext = null;
        contextObj = {};
        t = new Tween({
          callbacksContext: contextObj,
          onUpdate: function() {
            return isRightContext = this === contextObj;
          }
        });
        t.setProgress(0);
        t.setProgress(.1);
        return expect(isRightContext).toBe(true);
      });

      /*
        TWEEN IN NORMAL DIRECTION
       */
      it('should be called with 1 and 0 on each repeat period', function() {
        var completeCnt, completeDirection, duration, firstUpdateCnt, firstUpdateDirection, oneCnt, repeatCnt, repeatCompleteDirection, repeatStartCnt, repeatStartDirection, startCnt, startDirection, t, timeShift, updateDirection, updateValue, zeroCnt;
        zeroCnt = 0;
        oneCnt = 0;
        startCnt = 0;
        completeCnt = 0;
        repeatCnt = 0;
        repeatStartCnt = 0;
        firstUpdateCnt = 0;
        firstUpdateDirection = null;
        startDirection = null;
        completeDirection = null;
        repeatStartDirection = null;
        repeatCompleteDirection = null;
        duration = 50;
        updateValue = null;
        updateDirection = null;
        t = new Tween({
          repeat: 1,
          duration: duration,
          onUpdate: function(p, ep, isForward) {
            updateDirection = isForward;
            updateValue = p;
            (p === 0) && zeroCnt++;
            return (p === 1) && oneCnt++;
          },
          onRepeatComplete: function(isForward) {
            repeatCompleteDirection = isForward;
            return repeatCnt++;
          },
          onRepeatStart: function(isForward) {
            repeatStartDirection = isForward;
            return repeatStartCnt++;
          },
          onStart: function(isForward) {
            startDirection = isForward;
            return startCnt++;
          },
          onComplete: function(isForward) {
            completeDirection = isForward;
            return completeCnt++;
          },
          onFirstUpdate: function(isForward) {
            firstUpdateDirection = isForward;
            return firstUpdateCnt++;
          }
        });
        t._setStartTime();
        timeShift = 0;
        t._update(t._props.startTime + timeShift);
        expect(updateValue).toBe(null);
        expect(updateDirection).toBe(null);
        expect(t._wasUknownUpdate).toBe(true);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(0);
        expect(repeatStartDirection).toBe(null);
        expect(repeatCnt).toBe(0);
        expect(repeatCompleteDirection).toBe(null);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(firstUpdateCnt).toBe(0);
        expect(firstUpdateDirection).toBe(null);
        t._update(t._props.startTime + timeShift + (duration / 2));
        expect(updateValue).toBeCloseTo(.5, 5);
        expect(updateDirection).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(1);
        expect(repeatStartDirection).toBe(true);
        expect(repeatCnt).toBe(0);
        expect(repeatCompleteDirection).toBe(null);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(true);
        t._update(t._props.startTime + timeShift + duration);
        expect(updateValue).toBeCloseTo(0, 5);
        expect(updateDirection).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(1);
        expect(repeatStartCnt).toBe(2);
        expect(repeatStartDirection).toBe(true);
        expect(repeatCnt).toBe(1);
        expect(repeatCompleteDirection).toBe(true);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(true);
        timeShift = duration;
        t._update(t._props.startTime + timeShift + (duration / 2));
        expect(updateValue).toBeCloseTo(.5, 5);
        expect(updateDirection).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(1);
        expect(repeatStartCnt).toBe(2);
        expect(repeatStartDirection).toBe(true);
        expect(repeatCnt).toBe(1);
        expect(repeatCompleteDirection).toBe(true);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(true);
        t._update(t._props.startTime + timeShift + duration);
        expect(updateValue).toBeCloseTo(1, 5);
        expect(updateDirection).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(1);
        expect(zeroCnt).toBe(1);
        expect(repeatStartCnt).toBe(2);
        expect(repeatStartDirection).toBe(true);
        expect(repeatCnt).toBe(2);
        expect(repeatCompleteDirection).toBe(true);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(true);
        expect(firstUpdateCnt).toBe(1);
        return expect(firstUpdateDirection).toBe(true);
      });
      it('should be called with 1 and 0 on each repeat period if missed time', function() {
        var completeCnt, completeDirection, duration, firstUpdateCnt, firstUpdateDirection, gap, oneCnt, repeatCnt, repeatCompleteDirection, repeatStartCnt, repeatStartDirection, startCnt, startDirection, t, timeShift, updateDirection, updateValue, zeroCnt;
        zeroCnt = 0;
        oneCnt = 0;
        startCnt = 0;
        completeCnt = 0;
        repeatCnt = 0;
        repeatStartCnt = 0;
        firstUpdateCnt = 0;
        firstUpdateDirection = null;
        startDirection = null;
        completeDirection = null;
        repeatStartDirection = null;
        repeatCompleteDirection = null;
        duration = 50;
        updateValue = null;
        updateDirection = null;
        t = new Tween({
          repeat: 1,
          duration: duration,
          onUpdate: function(p, ep, isForward) {
            updateDirection = isForward;
            updateValue = p;
            (p === 0) && zeroCnt++;
            return (p === 1) && oneCnt++;
          },
          onRepeatComplete: function(isForward) {
            repeatCompleteDirection = isForward;
            return repeatCnt++;
          },
          onRepeatStart: function(isForward) {
            repeatStartDirection = isForward;
            return repeatStartCnt++;
          },
          onStart: function(isForward) {
            startDirection = isForward;
            return startCnt++;
          },
          onComplete: function(isForward) {
            completeDirection = isForward;
            return completeCnt++;
          },
          onFirstUpdate: function(isForward) {
            firstUpdateDirection = isForward;
            return firstUpdateCnt++;
          }
        });
        t._setStartTime();
        gap = 5;
        timeShift = 0;
        t._update(t._props.startTime + timeShift + gap);
        expect(updateValue).toBe(null);
        expect(updateDirection).toBe(null);
        expect(t._wasUknownUpdate).toBe(true);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(0);
        expect(repeatStartDirection).toBe(null);
        expect(repeatCnt).toBe(0);
        expect(repeatCompleteDirection).toBe(null);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(firstUpdateCnt).toBe(0);
        expect(firstUpdateDirection).toBe(null);
        t._update(t._props.startTime + timeShift + (duration / 2));
        expect(updateValue).toBeCloseTo(.5, 5);
        expect(updateDirection).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(1);
        expect(repeatStartDirection).toBe(true);
        expect(repeatCnt).toBe(0);
        expect(repeatCompleteDirection).toBe(null);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(true);
        t._update(t._props.startTime + timeShift + duration - gap);
        expect(updateValue).toBeCloseTo(.9, 5);
        expect(updateDirection).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(1);
        expect(repeatStartDirection).toBe(true);
        expect(repeatCnt).toBe(0);
        expect(repeatCompleteDirection).toBe(null);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(true);
        timeShift = duration;
        t._update(t._props.startTime + timeShift + gap);
        expect(updateValue).toBeCloseTo(.1, 5);
        expect(updateDirection).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(2);
        expect(repeatStartDirection).toBe(true);
        expect(repeatCnt).toBe(1);
        expect(repeatCompleteDirection).toBe(true);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(true);
        t._update(t._props.startTime + timeShift + (duration / 2));
        expect(updateValue).toBeCloseTo(.5, 5);
        expect(updateDirection).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(2);
        expect(repeatStartDirection).toBe(true);
        expect(repeatCnt).toBe(1);
        expect(repeatCompleteDirection).toBe(true);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(true);
        timeShift = 2 * duration;
        t._update(t._props.startTime + timeShift + gap);
        expect(updateValue).toBeCloseTo(1);
        expect(updateDirection).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(1);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(2);
        expect(repeatStartDirection).toBe(true);
        expect(repeatCnt).toBe(2);
        expect(repeatCompleteDirection).toBe(true);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(true);
        expect(firstUpdateCnt).toBe(1);
        return expect(firstUpdateDirection).toBe(true);
      });
      it('should be called with 1 and 0 on each repeat period if delay', function() {
        var completeCnt, completeDirection, delay, duration, firstUpdateCnt, firstUpdateDirection, oneCnt, repeatCnt, repeatCompleteDirection, repeatStartCnt, repeatStartDirection, startCnt, startDirection, t, timeShift, updateDirection, updateValue, zeroCnt;
        zeroCnt = 0;
        oneCnt = 0;
        startCnt = 0;
        completeCnt = 0;
        repeatCnt = 0;
        repeatStartCnt = 0;
        firstUpdateCnt = 0;
        firstUpdateDirection = null;
        startDirection = null;
        completeDirection = null;
        repeatStartDirection = null;
        repeatCompleteDirection = null;
        duration = 50;
        delay = 20;
        updateValue = null;
        updateDirection = null;
        t = new Tween({
          repeat: 2,
          duration: duration,
          delay: delay,
          onUpdate: function(p, ep, isForward) {
            updateDirection = isForward;
            updateValue = p;
            (p === 0) && zeroCnt++;
            return (p === 1) && oneCnt++;
          },
          onRepeatComplete: function(isForward) {
            repeatCompleteDirection = isForward;
            return repeatCnt++;
          },
          onRepeatStart: function(isForward) {
            repeatStartDirection = isForward;
            return repeatStartCnt++;
          },
          onStart: function(isForward) {
            startDirection = isForward;
            return startCnt++;
          },
          onComplete: function(isForward) {
            completeDirection = isForward;
            return completeCnt++;
          },
          onFirstUpdate: function(isForward) {
            firstUpdateDirection = isForward;
            return firstUpdateCnt++;
          }
        });
        t._setStartTime();
        timeShift = 0;
        t._update(t._props.startTime + timeShift);
        expect(updateValue).toBe(null);
        expect(updateDirection).toBe(null);
        expect(t._wasUknownUpdate).toBe(true);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(0);
        expect(repeatStartDirection).toBe(null);
        expect(repeatCnt).toBe(0);
        expect(repeatCompleteDirection).toBe(null);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(firstUpdateCnt).toBe(0);
        expect(firstUpdateDirection).toBe(null);
        t._update(t._props.startTime + timeShift + (duration / 2));
        expect(updateValue).toBeCloseTo(.5, 5);
        expect(updateDirection).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(1);
        expect(repeatStartDirection).toBe(true);
        expect(repeatCnt).toBe(0);
        expect(repeatCompleteDirection).toBe(null);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(true);
        t._update(t._props.startTime + timeShift + duration);
        expect(updateValue).toBeCloseTo(1, 5);
        expect(updateDirection).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(1);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(1);
        expect(repeatStartDirection).toBe(true);
        expect(repeatCnt).toBe(1);
        expect(repeatCompleteDirection).toBe(true);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(true);
        timeShift = duration + delay;
        t._update(t._props.startTime + timeShift);
        expect(updateValue).toBeCloseTo(0, 5);
        expect(updateDirection).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(1);
        expect(zeroCnt).toBe(1);
        expect(repeatStartCnt).toBe(2);
        expect(repeatStartDirection).toBe(true);
        expect(repeatCnt).toBe(1);
        expect(repeatCompleteDirection).toBe(true);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(true);
        t._update(t._props.startTime + timeShift + (duration / 2));
        expect(updateValue).toBeCloseTo(.5, 5);
        expect(updateDirection).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(1);
        expect(zeroCnt).toBe(1);
        expect(repeatStartCnt).toBe(2);
        expect(repeatStartDirection).toBe(true);
        expect(repeatCnt).toBe(1);
        expect(repeatCompleteDirection).toBe(true);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(true);
        t._update(t._props.startTime + timeShift + duration);
        expect(updateValue).toBeCloseTo(1, 5);
        expect(updateDirection).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(2);
        expect(zeroCnt).toBe(1);
        expect(repeatStartCnt).toBe(2);
        expect(repeatStartDirection).toBe(true);
        expect(repeatCnt).toBe(2);
        expect(repeatCompleteDirection).toBe(true);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(true);
        timeShift = 2 * (duration + delay);
        t._update(t._props.startTime + timeShift);
        expect(updateValue).toBeCloseTo(0, 5);
        expect(updateDirection).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(2);
        expect(zeroCnt).toBe(2);
        expect(repeatStartCnt).toBe(3);
        expect(repeatStartDirection).toBe(true);
        expect(repeatCnt).toBe(2);
        expect(repeatCompleteDirection).toBe(true);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(true);
        t._update(t._props.startTime + timeShift + (duration / 2));
        expect(updateValue).toBeCloseTo(.5, 5);
        expect(updateDirection).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(2);
        expect(zeroCnt).toBe(2);
        expect(repeatStartCnt).toBe(3);
        expect(repeatStartDirection).toBe(true);
        expect(repeatCnt).toBe(2);
        expect(repeatCompleteDirection).toBe(true);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(true);
        t._update(t._props.startTime + timeShift + duration);
        expect(updateValue).toBeCloseTo(1, 5);
        expect(updateDirection).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(3);
        expect(zeroCnt).toBe(2);
        expect(repeatStartCnt).toBe(3);
        expect(repeatStartDirection).toBe(true);
        expect(repeatCnt).toBe(3);
        expect(repeatCompleteDirection).toBe(true);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(true);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(true);
        t._update(t._props.startTime + timeShift + duration + delay / 2);
        expect(updateValue).toBeCloseTo(1, 5);
        expect(updateDirection).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(3);
        expect(zeroCnt).toBe(2);
        expect(repeatStartCnt).toBe(3);
        expect(repeatStartDirection).toBe(true);
        expect(repeatCnt).toBe(3);
        expect(repeatCompleteDirection).toBe(true);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(true);
        expect(firstUpdateCnt).toBe(1);
        return expect(firstUpdateDirection).toBe(true);
      });
      it('should be called with 1 and 0 on each repeat period if in delay', function() {
        var completeCnt, completeDirection, delay, duration, firstUpdateCnt, firstUpdateDirection, oneCnt, repeatCnt, repeatCompleteDirection, repeatStartCnt, repeatStartDirection, startCnt, startDirection, t, timeShift, updateDirection, updateValue, zeroCnt;
        zeroCnt = 0;
        oneCnt = 0;
        startCnt = 0;
        completeCnt = 0;
        repeatCnt = 0;
        repeatStartCnt = 0;
        firstUpdateCnt = 0;
        firstUpdateDirection = null;
        startDirection = null;
        completeDirection = null;
        repeatStartDirection = null;
        repeatCompleteDirection = null;
        duration = 50;
        delay = 20;
        updateValue = null;
        updateDirection = null;
        t = new Tween({
          repeat: 2,
          duration: duration,
          delay: delay,
          onUpdate: function(p, ep, isForward) {
            updateDirection = isForward;
            updateValue = p;
            (p === 0) && zeroCnt++;
            return (p === 1) && oneCnt++;
          },
          onRepeatComplete: function(isForward) {
            repeatCompleteDirection = isForward;
            return repeatCnt++;
          },
          onRepeatStart: function(isForward) {
            repeatStartDirection = isForward;
            return repeatStartCnt++;
          },
          onStart: function(isForward) {
            startDirection = isForward;
            return startCnt++;
          },
          onComplete: function(isForward) {
            completeDirection = isForward;
            return completeCnt++;
          },
          onFirstUpdate: function(isForward) {
            firstUpdateDirection = isForward;
            return firstUpdateCnt++;
          }
        });
        t._setStartTime();
        timeShift = 0;
        t._update(t._props.startTime + timeShift);
        expect(updateValue).toBe(null);
        expect(updateDirection).toBe(null);
        expect(t._wasUknownUpdate).toBe(true);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(0);
        expect(repeatStartDirection).toBe(null);
        expect(repeatCnt).toBe(0);
        expect(repeatCompleteDirection).toBe(null);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(firstUpdateCnt).toBe(0);
        expect(firstUpdateDirection).toBe(null);
        t._update(t._props.startTime + timeShift + (duration / 2));
        expect(updateValue).toBe(.5);
        expect(updateDirection).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(1);
        expect(repeatStartDirection).toBe(true);
        expect(repeatCnt).toBe(0);
        expect(repeatCompleteDirection).toBe(null);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(true);
        t._update(t._props.startTime + timeShift + duration + delay / 2);
        expect(updateValue).toBeCloseTo(1, 5);
        expect(updateDirection).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(1);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(1);
        expect(repeatStartDirection).toBe(true);
        expect(repeatCnt).toBe(1);
        expect(repeatCompleteDirection).toBe(true);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(true);
        timeShift = duration + delay;
        t._update(t._props.startTime + timeShift + 10);
        expect(updateValue).toBeCloseTo(.2, 5);
        expect(updateDirection).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(1);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(2);
        expect(repeatStartDirection).toBe(true);
        expect(repeatCnt).toBe(1);
        expect(repeatCompleteDirection).toBe(true);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(true);
        t._update(t._props.startTime + timeShift + (duration / 2));
        expect(updateValue).toBeCloseTo(.5, 5);
        expect(updateDirection).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(1);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(2);
        expect(repeatStartDirection).toBe(true);
        expect(repeatCnt).toBe(1);
        expect(repeatCompleteDirection).toBe(true);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(true);
        t._update(t._props.startTime + timeShift + duration + delay / 2);
        expect(updateValue).toBeCloseTo(1, 5);
        expect(updateDirection).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(2);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(2);
        expect(repeatStartDirection).toBe(true);
        expect(repeatCnt).toBe(2);
        expect(repeatCompleteDirection).toBe(true);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(true);
        timeShift = 2 * (duration + delay);
        t._update(t._props.startTime + timeShift + 10);
        expect(updateValue).toBeCloseTo(.2, 5);
        expect(updateDirection).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(2);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(3);
        expect(repeatStartDirection).toBe(true);
        expect(repeatCnt).toBe(2);
        expect(repeatCompleteDirection).toBe(true);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(true);
        t._update(t._props.startTime + timeShift + (duration / 2));
        expect(updateValue).toBeCloseTo(.5, 5);
        expect(updateDirection).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(2);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(3);
        expect(repeatStartDirection).toBe(true);
        expect(repeatCnt).toBe(2);
        expect(repeatCompleteDirection).toBe(true);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(true);
        t._update(t._props.startTime + timeShift + duration + delay / 2);
        expect(updateValue).toBeCloseTo(1, 5);
        expect(updateDirection).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(3);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(3);
        expect(repeatStartDirection).toBe(true);
        expect(repeatCnt).toBe(3);
        expect(repeatCompleteDirection).toBe(true);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(true);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(true);
        t._update(t._props.startTime + timeShift + duration + delay / 2 + 10);
        expect(updateValue).toBeCloseTo(1, 5);
        expect(updateDirection).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(3);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(3);
        expect(repeatStartDirection).toBe(true);
        expect(repeatCnt).toBe(3);
        expect(repeatCompleteDirection).toBe(true);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(true);
        expect(firstUpdateCnt).toBe(1);
        return expect(firstUpdateDirection).toBe(true);
      });
      it('should be called with 0 and 1 on each repeat period || reverse', function() {
        var completeCnt, completeDirection, duration, firstUpdateCnt, firstUpdateDirection, oneCnt, repeatCnt, repeatCompleteDirection, repeatStartCnt, repeatStartDirection, startCnt, startDirection, t, timeShift, updateDirection, updateValue, zeroCnt;
        zeroCnt = 0;
        oneCnt = 0;
        startCnt = 0;
        completeCnt = 0;
        repeatCnt = 0;
        repeatStartCnt = 0;
        firstUpdateCnt = 0;
        firstUpdateDirection = null;
        startDirection = null;
        completeDirection = null;
        repeatStartDirection = null;
        repeatCompleteDirection = null;
        duration = 50;
        updateValue = null;
        updateDirection = null;
        t = new Tween({
          repeat: 2,
          duration: duration,
          onUpdate: function(p, ep, isForward) {
            updateDirection = isForward;
            updateValue = p;
            (p === 0) && zeroCnt++;
            return (p === 1) && oneCnt++;
          },
          onRepeatComplete: function(isForward) {
            repeatCompleteDirection = isForward;
            return repeatCnt++;
          },
          onRepeatStart: function(isForward) {
            repeatStartDirection = isForward;
            return repeatStartCnt++;
          },
          onStart: function(isForward) {
            startDirection = isForward;
            return startCnt++;
          },
          onComplete: function(isForward) {
            completeDirection = isForward;
            return completeCnt++;
          },
          onFirstUpdate: function(isForward) {
            firstUpdateDirection = isForward;
            return firstUpdateCnt++;
          }
        });
        t._setStartTime();
        timeShift = 3 * duration;
        t._update(t._props.startTime + timeShift);
        expect(updateValue).toBe(null);
        expect(updateDirection).toBe(null);
        expect(t._wasUknownUpdate).toBe(true);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(0);
        expect(repeatStartDirection).toBe(null);
        expect(repeatCnt).toBe(0);
        expect(repeatCompleteDirection).toBe(null);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(firstUpdateCnt).toBe(0);
        expect(firstUpdateDirection).toBe(null);
        t._update(t._props.startTime + timeShift - duration / 2);
        expect(updateValue).toBeCloseTo(.5, 5);
        expect(updateDirection).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(t._isCompleted).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(0);
        expect(repeatStartDirection).toBe(null);
        expect(repeatCnt).toBe(1);
        expect(repeatCompleteDirection).toBe(false);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        timeShift = 2 * duration;
        t._update(t._props.startTime + timeShift);
        expect(updateValue).toBeCloseTo(0, 5);
        expect(updateDirection).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(1);
        expect(repeatStartCnt).toBe(1);
        expect(repeatStartDirection).toBe(false);
        expect(repeatCnt).toBe(1);
        expect(repeatCompleteDirection).toBe(false);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        t._update(t._props.startTime + timeShift - duration / 2);
        expect(updateValue).toBeCloseTo(.5, 5);
        expect(updateDirection).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(1);
        expect(repeatStartCnt).toBe(1);
        expect(repeatStartDirection).toBe(false);
        expect(repeatCnt).toBe(2);
        expect(repeatCompleteDirection).toBe(false);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        timeShift = duration;
        t._update(t._props.startTime + timeShift);
        expect(updateValue).toBeCloseTo(0, 5);
        expect(updateDirection).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(2);
        expect(repeatStartCnt).toBe(2);
        expect(repeatStartDirection).toBe(false);
        expect(repeatCnt).toBe(2);
        expect(repeatCompleteDirection).toBe(false);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        t._update(t._props.startTime + timeShift - duration / 2);
        expect(updateValue).toBeCloseTo(.5, 5);
        expect(updateDirection).toBe(false);
        expect(updateDirection).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(2);
        expect(repeatStartCnt).toBe(2);
        expect(repeatStartDirection).toBe(false);
        expect(repeatCnt).toBe(3);
        expect(repeatCompleteDirection).toBe(false);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        timeShift = 0;
        t._update(t._props.startTime + timeShift);
        expect(updateValue).toBeCloseTo(0, 5);
        expect(updateDirection).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(3);
        expect(repeatStartCnt).toBe(3);
        expect(repeatStartDirection).toBe(false);
        expect(repeatCnt).toBe(3);
        expect(repeatCompleteDirection).toBe(false);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(false);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        t._update(t._props.startTime + timeShift - duration / 2);
        expect(updateValue).toBeCloseTo(0, 5);
        expect(updateDirection).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(3);
        expect(repeatStartCnt).toBe(3);
        expect(repeatStartDirection).toBe(false);
        expect(repeatCnt).toBe(3);
        expect(repeatCompleteDirection).toBe(false);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(false);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        return expect(firstUpdateDirection).toBe(false);
      });
      it('should be called with 0 and 1 on each repeat period if missed time || reverse', function() {
        var completeCnt, completeDirection, duration, firstUpdateCnt, firstUpdateDirection, gap, oneCnt, repeatCnt, repeatCompleteDirection, repeatStartCnt, repeatStartDirection, startCnt, startDirection, t, timeShift, updateDirection, updateValue, zeroCnt;
        zeroCnt = 0;
        oneCnt = 0;
        startCnt = 0;
        completeCnt = 0;
        repeatCnt = 0;
        repeatStartCnt = 0;
        firstUpdateCnt = 0;
        firstUpdateDirection = null;
        startDirection = null;
        completeDirection = null;
        repeatStartDirection = null;
        repeatCompleteDirection = null;
        duration = 50;
        updateValue = null;
        updateDirection = null;
        t = new Tween({
          repeat: 2,
          duration: duration,
          onUpdate: function(p, pe, isForward) {
            updateDirection = isForward;
            updateValue = p;
            (p === 0) && zeroCnt++;
            return (p === 1) && oneCnt++;
          },
          onRepeatComplete: function(isForward) {
            repeatCompleteDirection = isForward;
            return repeatCnt++;
          },
          onRepeatStart: function(isForward) {
            repeatStartDirection = isForward;
            return repeatStartCnt++;
          },
          onStart: function(isForward) {
            startDirection = isForward;
            return startCnt++;
          },
          onComplete: function(isForward) {
            completeDirection = isForward;
            return completeCnt++;
          },
          onFirstUpdate: function(isForward) {
            firstUpdateDirection = isForward;
            return firstUpdateCnt++;
          }
        });
        t._setStartTime();
        gap = 5;
        timeShift = 3 * duration;
        t._update(t._props.startTime + timeShift + gap);
        expect(updateValue).toBe(null);
        expect(updateDirection).toBe(null);
        expect(t._wasUknownUpdate).toBe(true);
        expect(zeroCnt).toBe(0);
        expect(oneCnt).toBe(0);
        expect(repeatStartCnt).toBe(0);
        expect(repeatStartDirection).toBe(null);
        expect(repeatCnt).toBe(0);
        expect(repeatCompleteDirection).toBe(null);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(firstUpdateCnt).toBe(0);
        expect(firstUpdateDirection).toBe(null);
        t._update(t._props.startTime + timeShift - (duration / 2));
        expect(updateValue).toBeCloseTo(.5, 5);
        expect(updateDirection).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(0);
        expect(repeatStartDirection).toBe(null);
        expect(repeatCnt).toBe(1);
        expect(repeatCompleteDirection).toBe(false);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        t._update(t._props.startTime + timeShift - duration + gap);
        expect(updateValue).toBeCloseTo(.1, 5);
        expect(updateDirection).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(0);
        expect(repeatStartDirection).toBe(null);
        expect(repeatCnt).toBe(1);
        expect(repeatCompleteDirection).toBe(false);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        timeShift = 2 * duration;
        t._update(t._props.startTime + timeShift - gap);
        expect(updateValue).toBeCloseTo(.9, 5);
        expect(updateDirection).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(1);
        expect(repeatStartDirection).toBe(false);
        expect(repeatCnt).toBe(2);
        expect(repeatCompleteDirection).toBe(false);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        t._update(t._props.startTime + timeShift - (duration / 2));
        expect(updateValue).toBeCloseTo(.5, 5);
        expect(updateDirection).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(1);
        expect(repeatStartDirection).toBe(false);
        expect(repeatCnt).toBe(2);
        expect(repeatCompleteDirection).toBe(false);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        t._update(t._props.startTime + timeShift - duration + gap);
        expect(updateValue).toBeCloseTo(.1, 5);
        expect(updateDirection).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(1);
        expect(repeatStartDirection).toBe(false);
        expect(repeatCnt).toBe(2);
        expect(repeatCompleteDirection).toBe(false);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        timeShift = duration;
        t._update(t._props.startTime + timeShift - duration - gap);
        expect(updateValue).toBeCloseTo(0, 5);
        expect(updateDirection).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(1);
        expect(repeatStartCnt).toBe(2);
        expect(repeatStartDirection).toBe(false);
        expect(repeatCnt).toBe(2);
        expect(repeatCompleteDirection).toBe(false);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(false);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        t._update(t._props.startTime + timeShift - (duration / 2));
        expect(updateValue).toBe(.5);
        expect(updateDirection).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(1);
        expect(repeatStartCnt).toBe(3);
        expect(repeatStartDirection).toBe(true);
        expect(repeatCnt).toBe(2);
        expect(repeatCompleteDirection).toBe(false);
        expect(startCnt).toBe(2);
        expect(startDirection).toBe(true);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(firstUpdateCnt).toBe(2);
        expect(firstUpdateDirection).toBe(true);
        t._update(t._props.startTime - gap);
        expect(updateValue).toBeCloseTo(0, 5);
        expect(updateDirection).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(2);
        expect(repeatStartCnt).toBe(4);
        expect(repeatStartDirection).toBe(false);
        expect(repeatCnt).toBe(2);
        expect(repeatCompleteDirection).toBe(false);
        expect(startCnt).toBe(3);
        expect(startDirection).toBe(false);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(firstUpdateCnt).toBe(2);
        expect(firstUpdateDirection).toBe(true);
        t._update(t._props.startTime - gap - 15);
        expect(updateValue).toBeCloseTo(0, 5);
        expect(updateDirection).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(2);
        expect(repeatStartCnt).toBe(4);
        expect(repeatStartDirection).toBe(false);
        expect(repeatCnt).toBe(2);
        expect(repeatCompleteDirection).toBe(false);
        expect(startCnt).toBe(3);
        expect(startDirection).toBe(false);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(firstUpdateCnt).toBe(2);
        return expect(firstUpdateDirection).toBe(true);
      });
      it('should be called with 0 and 1 on each repeat period if in delay || reverse', function() {
        var completeCnt, completeDirection, delay, duration, firstUpdateCnt, firstUpdateDirection, oneCnt, repeatCnt, repeatCompleteDirection, repeatStartCnt, repeatStartDirection, startCnt, startDirection, t, timeShift, updateDirection, updateValue, zeroCnt;
        zeroCnt = 0;
        oneCnt = 0;
        startCnt = 0;
        completeCnt = 0;
        repeatCnt = 0;
        repeatStartCnt = 0;
        firstUpdateCnt = 0;
        firstUpdateDirection = null;
        startDirection = null;
        completeDirection = null;
        repeatStartDirection = null;
        repeatCompleteDirection = null;
        duration = 50;
        delay = 20;
        updateValue = null;
        updateDirection = null;
        t = new Tween({
          repeat: 2,
          duration: duration,
          delay: delay,
          onUpdate: function(p, pe, isForward) {
            updateDirection = isForward;
            updateValue = p;
            (p === 0) && zeroCnt++;
            return (p === 1) && oneCnt++;
          },
          onRepeatComplete: function(isForward) {
            repeatCompleteDirection = isForward;
            return repeatCnt++;
          },
          onRepeatStart: function(isForward) {
            repeatStartDirection = isForward;
            return repeatStartCnt++;
          },
          onStart: function(isForward) {
            startDirection = isForward;
            return startCnt++;
          },
          onComplete: function(isForward) {
            completeDirection = isForward;
            return completeCnt++;
          },
          onFirstUpdate: function(isForward) {
            firstUpdateDirection = isForward;
            return firstUpdateCnt++;
          }
        });
        t._setStartTime();
        timeShift = 3 * (duration + delay) - delay;
        t._update(t._props.startTime + timeShift + 5);
        expect(updateValue).toBe(null);
        expect(updateDirection).toBe(null);
        expect(t._wasUknownUpdate).toBe(true);
        expect(zeroCnt).toBe(0);
        expect(oneCnt).toBe(0);
        expect(repeatStartCnt).toBe(0);
        expect(repeatStartDirection).toBe(null);
        expect(repeatCnt).toBe(0);
        expect(repeatCompleteDirection).toBe(null);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(firstUpdateCnt).toBe(0);
        expect(firstUpdateDirection).toBe(null);
        t._update(t._props.startTime + timeShift - (duration / 2));
        expect(updateValue).toBeCloseTo(.5, 5);
        expect(updateDirection).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(0);
        expect(repeatStartDirection).toBe(null);
        expect(repeatCnt).toBe(1);
        expect(repeatCompleteDirection).toBe(false);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        t._update(t._props.startTime + timeShift - duration - 5);
        expect(updateValue).toBeCloseTo(0, 5);
        expect(updateDirection).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(1);
        expect(repeatStartCnt).toBe(1);
        expect(repeatStartDirection).toBe(false);
        expect(repeatCnt).toBe(1);
        expect(repeatCompleteDirection).toBe(false);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        timeShift = 2 * (duration + delay) - delay;
        t._update(t._props.startTime + timeShift - duration / 2);
        expect(updateValue).toBeCloseTo(.5, 5);
        expect(updateDirection).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(1);
        expect(repeatStartCnt).toBe(1);
        expect(repeatStartDirection).toBe(false);
        expect(repeatCnt).toBe(2);
        expect(repeatCompleteDirection).toBe(false);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        t._update(t._props.startTime + timeShift - duration - 5);
        expect(updateValue).toBeCloseTo(0, 5);
        expect(updateDirection).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(2);
        expect(repeatStartCnt).toBe(2);
        expect(repeatStartDirection).toBe(false);
        expect(repeatCnt).toBe(2);
        expect(repeatCompleteDirection).toBe(false);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        timeShift = duration;
        t._update(t._props.startTime + timeShift - duration / 2);
        expect(updateValue).toBeCloseTo(.5, 5);
        expect(updateDirection).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(2);
        expect(repeatStartCnt).toBe(2);
        expect(repeatStartDirection).toBe(false);
        expect(repeatCnt).toBe(3);
        expect(repeatCompleteDirection).toBe(false);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        t._update(t._props.startTime + timeShift - duration - 5);
        expect(updateValue).toBeCloseTo(0, 5);
        expect(updateDirection).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(3);
        expect(repeatStartCnt).toBe(3);
        expect(repeatStartDirection).toBe(false);
        expect(repeatCnt).toBe(3);
        expect(repeatCompleteDirection).toBe(false);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(false);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        t._update(t._props.startTime + timeShift - duration - 15);
        expect(updateValue).toBeCloseTo(0, 5);
        expect(updateDirection).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(3);
        expect(repeatStartCnt).toBe(3);
        expect(repeatStartDirection).toBe(false);
        expect(repeatCnt).toBe(3);
        expect(repeatCompleteDirection).toBe(false);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(false);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        return expect(firstUpdateDirection).toBe(false);
      });
      it('should be called with 0 and 1 on each repeat period if delay || reverse', function() {
        var completeCnt, completeDirection, delay, duration, firstUpdateCnt, firstUpdateDirection, oneCnt, repeatCnt, repeatCompleteDirection, repeatStartCnt, repeatStartDirection, startCnt, startDirection, t, timeShift, updateDirection, updateValue, zeroCnt;
        zeroCnt = 0;
        oneCnt = 0;
        startCnt = 0;
        completeCnt = 0;
        repeatCnt = 0;
        repeatStartCnt = 0;
        firstUpdateCnt = 0;
        firstUpdateDirection = null;
        startDirection = null;
        completeDirection = null;
        repeatStartDirection = null;
        repeatCompleteDirection = null;
        duration = 500;
        delay = 200;
        updateValue = null;
        updateDirection = null;
        t = new Tween({
          repeat: 2,
          duration: duration,
          delay: delay,
          onUpdate: function(p, pe, isForward) {
            updateDirection = isForward;
            updateValue = p;
            (p === 0) && zeroCnt++;
            return (p === 1) && oneCnt++;
          },
          onRepeatComplete: function(isForward) {
            repeatCompleteDirection = isForward;
            return repeatCnt++;
          },
          onRepeatStart: function(isForward) {
            repeatStartDirection = isForward;
            return repeatStartCnt++;
          },
          onStart: function(isForward) {
            startDirection = isForward;
            return startCnt++;
          },
          onComplete: function(isForward) {
            completeDirection = isForward;
            return completeCnt++;
          },
          onFirstUpdate: function(isForward) {
            firstUpdateDirection = isForward;
            return firstUpdateCnt++;
          }
        });
        t._setStartTime();
        timeShift = 3 * (duration + delay) - delay;
        t._update(t._props.startTime + timeShift);
        expect(updateValue).toBe(null);
        expect(updateDirection).toBe(null);
        expect(t._wasUknownUpdate).toBe(true);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(0);
        expect(repeatStartDirection).toBe(null);
        expect(repeatCnt).toBe(0);
        expect(repeatCompleteDirection).toBe(null);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(firstUpdateCnt).toBe(0);
        expect(firstUpdateDirection).toBe(null);
        t._update(t._props.startTime + timeShift - (duration / 2));
        expect(updateValue).toBeCloseTo(.5, 5);
        expect(updateDirection).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(0);
        expect(repeatStartDirection).toBe(null);
        expect(repeatCnt).toBe(1);
        expect(repeatCompleteDirection).toBe(false);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        t._update(t._props.startTime + timeShift - duration);
        expect(updateValue).toBeCloseTo(0, 5);
        expect(updateDirection).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(1);
        expect(repeatStartCnt).toBe(1);
        expect(repeatStartDirection).toBe(false);
        expect(repeatCnt).toBe(1);
        expect(repeatCompleteDirection).toBe(false);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        timeShift = 2 * (duration + delay) - delay;
        t._update(t._props.startTime + timeShift - duration / 2);
        expect(updateValue).toBeCloseTo(.5, 5);
        expect(updateDirection).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(1);
        expect(repeatStartCnt).toBe(1);
        expect(repeatStartDirection).toBe(false);
        expect(repeatCnt).toBe(2);
        expect(repeatCompleteDirection).toBe(false);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        timeShift = 2 * (duration + delay) - delay;
        t._update(t._props.startTime + timeShift - duration);
        expect(updateValue).toBeCloseTo(0, 5);
        expect(updateDirection).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(2);
        expect(repeatStartCnt).toBe(2);
        expect(repeatStartDirection).toBe(false);
        expect(repeatCnt).toBe(2);
        expect(repeatCompleteDirection).toBe(false);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        timeShift = duration;
        t._update(t._props.startTime + timeShift - duration / 2);
        expect(updateValue).toBeCloseTo(.5, 5);
        expect(updateDirection).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(2);
        expect(repeatStartCnt).toBe(2);
        expect(repeatStartDirection).toBe(false);
        expect(repeatCnt).toBe(3);
        expect(repeatCompleteDirection).toBe(false);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        t._update(t._props.startTime + timeShift - duration);
        expect(updateValue).toBeCloseTo(0, 5);
        expect(updateDirection).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(3);
        expect(repeatStartCnt).toBe(3);
        expect(repeatStartDirection).toBe(false);
        expect(repeatCnt).toBe(3);
        expect(repeatCompleteDirection).toBe(false);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(false);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        t._update(t._props.startTime + timeShift - duration - 10);
        expect(updateValue).toBeCloseTo(0, 5);
        expect(updateDirection).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(3);
        expect(repeatStartCnt).toBe(3);
        expect(repeatStartDirection).toBe(false);
        expect(repeatCnt).toBe(3);
        expect(repeatCompleteDirection).toBe(false);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(false);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        t._update(t._props.startTime + timeShift - duration / 2);
        expect(updateValue).toBeCloseTo(.5, 5);
        expect(updateDirection).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(3);
        expect(repeatStartCnt).toBe(4);
        expect(repeatStartDirection).toBe(true);
        expect(repeatCnt).toBe(3);
        expect(repeatCompleteDirection).toBe(false);
        expect(startCnt).toBe(2);
        expect(startDirection).toBe(true);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(firstUpdateCnt).toBe(2);
        return expect(firstUpdateDirection).toBe(true);
      });

      /*
        TWEEN IN NORMAL DIRECTION || YOYO
       */
      it('should be called with 1 and 0 on each repeat period || yoyo', function() {
        var completeCnt, completeDirection, completeYoyo, duration, firstUpdateCnt, firstUpdateDirection, firstUpdateYoyo, oneCnt, repeatCnt, repeatCompleteDirection, repeatCompleteYoyo, repeatStartCnt, repeatStartDirection, repeatStartYoyo, startCnt, startDirection, startYoyo, t, timeShift, updateDirection, updateValue, updateYoyo, zeroCnt;
        zeroCnt = 0;
        oneCnt = 0;
        startCnt = 0;
        startDirection = null;
        startYoyo = null;
        firstUpdateCnt = 0;
        firstUpdateDirection = null;
        firstUpdateYoyo = null;
        updateValue = null;
        updateDirection = null;
        updateYoyo = null;
        repeatStartDirection = null;
        repeatCompleteDirection = null;
        repeatCompleteYoyo = null;
        repeatCnt = 0;
        repeatStartCnt = 0;
        repeatStartYoyo = null;
        completeCnt = 0;
        completeDirection = null;
        completeYoyo = null;
        duration = 500;
        t = new Tween({
          repeat: 1,
          yoyo: true,
          duration: duration,
          onUpdate: function(p, ep, isForward, isYoyo) {
            updateYoyo = isYoyo;
            updateDirection = isForward;
            updateValue = p;
            (p === 0) && zeroCnt++;
            return (p === 1) && oneCnt++;
          },
          onRepeatComplete: function(isForward, isYoyo) {
            repeatCompleteYoyo = isYoyo;
            repeatCompleteDirection = isForward;
            return repeatCnt++;
          },
          onRepeatStart: function(isForward, isYoyo) {
            repeatStartYoyo = isYoyo;
            repeatStartDirection = isForward;
            return repeatStartCnt++;
          },
          onStart: function(isForward, isYoyo) {
            startYoyo = isYoyo;
            startDirection = isForward;
            return startCnt++;
          },
          onComplete: function(isForward, isYoyo) {
            completeYoyo = isYoyo;
            completeDirection = isForward;
            return completeCnt++;
          },
          onFirstUpdate: function(isForward, isYoyo) {
            firstUpdateYoyo = isYoyo;
            firstUpdateDirection = isForward;
            return firstUpdateCnt++;
          }
        });
        t._setStartTime();
        timeShift = 0;
        t._update(t._props.startTime + timeShift);
        expect(updateValue).toBe(null);
        expect(updateDirection).toBe(null);
        expect(updateYoyo).toBe(null);
        expect(t._wasUknownUpdate).toBe(true);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(0);
        expect(repeatStartDirection).toBe(null);
        expect(repeatStartYoyo).toBe(null);
        expect(repeatCnt).toBe(0);
        expect(repeatCompleteDirection).toBe(null);
        expect(repeatCompleteYoyo).toBe(null);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(completeYoyo).toBe(null);
        expect(firstUpdateCnt).toBe(0);
        expect(firstUpdateDirection).toBe(null);
        expect(firstUpdateYoyo).toBe(null);
        t._update(t._props.startTime + timeShift + (duration / 2));
        expect(updateValue).toBeCloseTo(.5, 5);
        expect(updateDirection).toBe(true);
        expect(updateYoyo).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(1);
        expect(repeatStartDirection).toBe(true);
        expect(repeatStartYoyo).toBe(false);
        expect(repeatCnt).toBe(0);
        expect(repeatCompleteDirection).toBe(null);
        expect(repeatCompleteYoyo).toBe(null);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(startYoyo).toBe(false);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(completeYoyo).toBe(null);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(true);
        expect(firstUpdateYoyo).toBe(false);
        t._update(t._props.startTime + timeShift + duration);
        expect(updateValue).toBeCloseTo(1, 5);
        expect(updateDirection).toBe(true);
        expect(updateYoyo).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(1);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(2);
        expect(repeatStartDirection).toBe(true);
        expect(repeatStartYoyo).toBe(true);
        expect(repeatCnt).toBe(1);
        expect(repeatCompleteDirection).toBe(true);
        expect(repeatCompleteYoyo).toBe(false);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(true);
        timeShift = duration;
        t._update(t._props.startTime + timeShift + (duration / 4));
        expect(updateValue).toBeCloseTo(.75, 5);
        expect(updateDirection).toBe(true);
        expect(updateYoyo).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(1);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(2);
        expect(repeatStartDirection).toBe(true);
        expect(repeatStartYoyo).toBe(true);
        expect(repeatCnt).toBe(1);
        expect(repeatCompleteDirection).toBe(true);
        expect(repeatCompleteYoyo).toBe(false);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(startYoyo).toBe(false);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(completeYoyo).toBe(null);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(true);
        expect(firstUpdateYoyo).toBe(false);
        t._update(t._props.startTime + timeShift + duration);
        expect(updateValue).toBeCloseTo(0, 5);
        expect(updateDirection).toBe(true);
        expect(updateYoyo).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(1);
        expect(zeroCnt).toBe(1);
        expect(repeatStartCnt).toBe(2);
        expect(repeatStartDirection).toBe(true);
        expect(repeatStartYoyo).toBe(true);
        expect(repeatCnt).toBe(2);
        expect(repeatCompleteDirection).toBe(true);
        expect(repeatCompleteYoyo).toBe(true);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(startYoyo).toBe(false);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(true);
        expect(completeYoyo).toBe(true);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(true);
        return expect(firstUpdateYoyo).toBe(false);
      });
      it('should be called with 1 and 0 on each repeat period if missed time || yoyo', function() {
        var completeCnt, completeDirection, completeYoyo, duration, firstUpdateCnt, firstUpdateDirection, firstUpdateYoyo, gap, oneCnt, repeatCnt, repeatCompleteDirection, repeatCompleteYoyo, repeatStartCnt, repeatStartDirection, repeatStartYoyo, startCnt, startDirection, startYoyo, t, timeShift, updateDirection, updateValue, updateYoyo, zeroCnt;
        zeroCnt = 0;
        oneCnt = 0;
        startCnt = 0;
        startDirection = null;
        startYoyo = null;
        firstUpdateCnt = 0;
        firstUpdateDirection = null;
        firstUpdateYoyo = null;
        updateValue = null;
        updateDirection = null;
        updateYoyo = null;
        repeatStartDirection = null;
        repeatCompleteDirection = null;
        repeatCompleteYoyo = null;
        repeatCnt = 0;
        repeatStartCnt = 0;
        repeatStartYoyo = null;
        completeCnt = 0;
        completeDirection = null;
        completeYoyo = null;
        duration = 50;
        t = new Tween({
          repeat: 1,
          yoyo: true,
          duration: duration,
          onUpdate: function(p, ep, isForward, isYoyo) {
            updateYoyo = isYoyo;
            updateDirection = isForward;
            updateValue = p;
            (p === 0) && zeroCnt++;
            return (p === 1) && oneCnt++;
          },
          onRepeatComplete: function(isForward, isYoyo) {
            repeatCompleteYoyo = isYoyo;
            repeatCompleteDirection = isForward;
            return repeatCnt++;
          },
          onRepeatStart: function(isForward, isYoyo) {
            repeatStartYoyo = isYoyo;
            repeatStartDirection = isForward;
            return repeatStartCnt++;
          },
          onStart: function(isForward, isYoyo) {
            startYoyo = isYoyo;
            startDirection = isForward;
            return startCnt++;
          },
          onComplete: function(isForward, isYoyo) {
            completeYoyo = isYoyo;
            completeDirection = isForward;
            return completeCnt++;
          },
          onFirstUpdate: function(isForward, isYoyo) {
            firstUpdateYoyo = isYoyo;
            firstUpdateDirection = isForward;
            return firstUpdateCnt++;
          }
        });
        t._setStartTime();
        gap = 5;
        timeShift = 0;
        t._update(t._props.startTime + timeShift + gap);
        expect(updateValue).toBe(null);
        expect(updateDirection).toBe(null);
        expect(t._wasUknownUpdate).toBe(true);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(0);
        expect(repeatStartDirection).toBe(null);
        expect(repeatCnt).toBe(0);
        expect(repeatCompleteDirection).toBe(null);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(firstUpdateCnt).toBe(0);
        expect(firstUpdateDirection).toBe(null);
        t._update(t._props.startTime + timeShift + (duration / 2));
        expect(updateValue).toBeCloseTo(.5, 5);
        expect(updateDirection).toBe(true);
        expect(updateYoyo).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(1);
        expect(repeatStartDirection).toBe(true);
        expect(repeatStartYoyo).toBe(false);
        expect(repeatCnt).toBe(0);
        expect(repeatCompleteDirection).toBe(null);
        expect(repeatCompleteYoyo).toBe(null);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(startYoyo).toBe(false);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(completeYoyo).toBe(null);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(true);
        expect(firstUpdateYoyo).toBe(false);
        t._update(t._props.startTime + timeShift + duration - gap);
        expect(updateValue).toBeCloseTo(.9, 5);
        expect(updateDirection).toBe(true);
        expect(updateYoyo).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(1);
        expect(repeatStartDirection).toBe(true);
        expect(repeatStartYoyo).toBe(false);
        expect(repeatCnt).toBe(0);
        expect(repeatCompleteDirection).toBe(null);
        expect(repeatCompleteYoyo).toBe(null);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(startYoyo).toBe(false);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(completeYoyo).toBe(null);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(true);
        expect(firstUpdateYoyo).toBe(false);
        timeShift = duration;
        t._update(t._props.startTime + timeShift + gap);
        expect(updateValue).toBeCloseTo(.9, 5);
        expect(updateDirection).toBe(true);
        expect(updateYoyo).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(2);
        expect(repeatStartDirection).toBe(true);
        expect(repeatStartYoyo).toBe(true);
        expect(repeatCnt).toBe(1);
        expect(repeatCompleteDirection).toBe(true);
        expect(repeatCompleteYoyo).toBe(false);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(startYoyo).toBe(false);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(completeYoyo).toBe(null);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(true);
        expect(firstUpdateYoyo).toBe(false);
        t._update(t._props.startTime + timeShift + (duration / 4));
        expect(updateValue).toBeCloseTo(.75, 5);
        expect(updateDirection).toBe(true);
        expect(updateYoyo).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(2);
        expect(repeatStartDirection).toBe(true);
        expect(repeatStartYoyo).toBe(true);
        expect(repeatCnt).toBe(1);
        expect(repeatCompleteDirection).toBe(true);
        expect(repeatCompleteYoyo).toBe(false);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(startYoyo).toBe(false);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(completeYoyo).toBe(null);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(true);
        expect(firstUpdateYoyo).toBe(false);
        timeShift = 2 * duration;
        t._update(t._props.startTime + timeShift + gap);
        expect(updateValue).toBeCloseTo(0);
        expect(updateDirection).toBe(true);
        expect(updateYoyo).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(1);
        expect(repeatStartCnt).toBe(2);
        expect(repeatStartDirection).toBe(true);
        expect(repeatStartYoyo).toBe(true);
        expect(repeatCnt).toBe(2);
        expect(repeatCompleteDirection).toBe(true);
        expect(repeatCompleteYoyo).toBe(true);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(startYoyo).toBe(false);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(true);
        expect(completeYoyo).toBe(true);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(true);
        return expect(firstUpdateYoyo).toBe(false);
      });
      it('should be called with 1 and 0 on each repeat period if delay || yoyo', function() {
        var completeCnt, completeDirection, completeYoyo, delay, duration, firstUpdateCnt, firstUpdateDirection, firstUpdateYoyo, oneCnt, repeatCnt, repeatCompleteDirection, repeatCompleteYoyo, repeatStartCnt, repeatStartDirection, repeatStartYoyo, startCnt, startDirection, startYoyo, t, timeShift, updateDirection, updateValue, updateYoyo, zeroCnt;
        zeroCnt = 0;
        oneCnt = 0;
        startCnt = 0;
        startDirection = null;
        startYoyo = null;
        firstUpdateCnt = 0;
        firstUpdateDirection = null;
        firstUpdateYoyo = null;
        updateValue = null;
        updateDirection = null;
        updateYoyo = null;
        repeatStartDirection = null;
        repeatCompleteDirection = null;
        repeatCompleteYoyo = null;
        repeatCnt = 0;
        repeatStartCnt = 0;
        repeatStartYoyo = null;
        completeCnt = 0;
        completeDirection = null;
        completeYoyo = null;
        duration = 50;
        delay = 20;
        t = new Tween({
          repeat: 2,
          yoyo: true,
          duration: duration,
          delay: delay,
          onUpdate: function(p, ep, isForward, isYoyo) {
            updateYoyo = isYoyo;
            updateDirection = isForward;
            updateValue = p;
            (p === 0) && zeroCnt++;
            return (p === 1) && oneCnt++;
          },
          onRepeatComplete: function(isForward, isYoyo) {
            repeatCompleteYoyo = isYoyo;
            repeatCompleteDirection = isForward;
            return repeatCnt++;
          },
          onRepeatStart: function(isForward, isYoyo) {
            repeatStartYoyo = isYoyo;
            repeatStartDirection = isForward;
            return repeatStartCnt++;
          },
          onStart: function(isForward, isYoyo) {
            startYoyo = isYoyo;
            startDirection = isForward;
            return startCnt++;
          },
          onComplete: function(isForward, isYoyo) {
            completeYoyo = isYoyo;
            completeDirection = isForward;
            return completeCnt++;
          },
          onFirstUpdate: function(isForward, isYoyo) {
            firstUpdateYoyo = isYoyo;
            firstUpdateDirection = isForward;
            return firstUpdateCnt++;
          }
        });
        t._setStartTime();
        timeShift = 0;
        t._update(t._props.startTime + timeShift);
        expect(updateValue).toBe(null);
        expect(updateDirection).toBe(null);
        expect(t._wasUknownUpdate).toBe(true);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(0);
        expect(repeatStartDirection).toBe(null);
        expect(repeatCnt).toBe(0);
        expect(repeatCompleteDirection).toBe(null);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(firstUpdateCnt).toBe(0);
        expect(firstUpdateDirection).toBe(null);
        t._update(t._props.startTime + timeShift + (duration / 2));
        expect(updateValue).toBeCloseTo(.5, 5);
        expect(updateDirection).toBe(true);
        expect(updateYoyo).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(1);
        expect(repeatStartDirection).toBe(true);
        expect(repeatStartYoyo).toBe(false);
        expect(repeatCnt).toBe(0);
        expect(repeatCompleteDirection).toBe(null);
        expect(repeatCompleteYoyo).toBe(null);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(startYoyo).toBe(false);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(completeYoyo).toBe(null);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(true);
        expect(firstUpdateYoyo).toBe(false);
        t._update(t._props.startTime + timeShift + duration);
        expect(updateValue).toBe(1, 5);
        expect(updateDirection).toBe(true);
        expect(updateYoyo).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(1);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(1);
        expect(repeatStartDirection).toBe(true);
        expect(repeatStartYoyo).toBe(false);
        expect(repeatCnt).toBe(1);
        expect(repeatCompleteDirection).toBe(true);
        expect(repeatCompleteYoyo).toBe(false);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(startYoyo).toBe(false);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(completeYoyo).toBe(null);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(true);
        expect(firstUpdateYoyo).toBe(false);
        timeShift = duration + delay;
        t._update(t._props.startTime + timeShift);
        expect(updateValue).toBe(1, 5);
        expect(updateDirection).toBe(true);
        expect(updateYoyo).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(2);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(2);
        expect(repeatStartDirection).toBe(true);
        expect(repeatStartYoyo).toBe(true);
        expect(repeatCnt).toBe(1);
        expect(repeatCompleteDirection).toBe(true);
        expect(repeatCompleteYoyo).toBe(false);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(startYoyo).toBe(false);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(completeYoyo).toBe(null);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(true);
        expect(firstUpdateYoyo).toBe(false);
        t._update(t._props.startTime + timeShift + (duration / 4));
        expect(updateValue).toBeCloseTo(.75, 5);
        expect(updateDirection).toBe(true);
        expect(updateYoyo).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(2);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(2);
        expect(repeatStartDirection).toBe(true);
        expect(repeatStartYoyo).toBe(true);
        expect(repeatCnt).toBe(1);
        expect(repeatCompleteDirection).toBe(true);
        expect(repeatCompleteYoyo).toBe(false);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(startYoyo).toBe(false);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(completeYoyo).toBe(null);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(true);
        expect(firstUpdateYoyo).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(2);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(2);
        expect(repeatStartDirection).toBe(true);
        expect(repeatStartYoyo).toBe(true);
        expect(repeatCnt).toBe(1);
        expect(repeatCompleteDirection).toBe(true);
        expect(repeatCompleteYoyo).toBe(false);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(startYoyo).toBe(false);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(completeYoyo).toBe(null);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(true);
        expect(firstUpdateYoyo).toBe(false);
        timeShift = 2 * (duration + delay);
        t._update(t._props.startTime + timeShift);
        expect(updateValue).toBeCloseTo(0, 5);
        expect(updateDirection).toBe(true);
        expect(updateYoyo).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(zeroCnt).toBe(1);
        expect(oneCnt).toBe(2);
        expect(repeatStartCnt).toBe(3);
        expect(repeatStartDirection).toBe(true);
        expect(repeatStartYoyo).toBe(false);
        expect(repeatCnt).toBe(2);
        expect(repeatCompleteDirection).toBe(true);
        expect(repeatCompleteYoyo).toBe(true);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(startYoyo).toBe(false);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(completeYoyo).toBe(null);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(true);
        expect(firstUpdateYoyo).toBe(false);
        t._update(t._props.startTime + timeShift + (duration / 4));
        expect(updateValue).toBeCloseTo(.25, 5);
        expect(updateDirection).toBe(true);
        expect(updateYoyo).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(2);
        expect(zeroCnt).toBe(1);
        expect(repeatStartCnt).toBe(3);
        expect(repeatStartDirection).toBe(true);
        expect(repeatStartYoyo).toBe(false);
        expect(repeatCnt).toBe(2);
        expect(repeatCompleteDirection).toBe(true);
        expect(repeatCompleteYoyo).toBe(true);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(startYoyo).toBe(false);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(completeYoyo).toBe(null);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(true);
        expect(firstUpdateYoyo).toBe(false);
        t._update(t._props.startTime + timeShift + duration);
        expect(updateValue).toBeCloseTo(1, 5);
        expect(updateDirection).toBe(true);
        expect(updateYoyo).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(3);
        expect(zeroCnt).toBe(1);
        expect(repeatStartCnt).toBe(3);
        expect(repeatStartDirection).toBe(true);
        expect(repeatStartYoyo).toBe(false);
        expect(repeatCnt).toBe(3);
        expect(repeatCompleteDirection).toBe(true);
        expect(repeatCompleteYoyo).toBe(false);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(startYoyo).toBe(false);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(true);
        expect(completeYoyo).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(true);
        expect(firstUpdateYoyo).toBe(false);
        t._update(t._props.startTime + timeShift + duration + delay / 2);
        expect(updateValue).toBeCloseTo(1, 5);
        expect(updateDirection).toBe(true);
        expect(updateYoyo).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(3);
        expect(zeroCnt).toBe(1);
        expect(repeatStartCnt).toBe(3);
        expect(repeatStartDirection).toBe(true);
        expect(repeatStartYoyo).toBe(false);
        expect(repeatCnt).toBe(3);
        expect(repeatCompleteDirection).toBe(true);
        expect(repeatCompleteYoyo).toBe(false);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(startYoyo).toBe(false);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(true);
        expect(completeYoyo).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(true);
        return expect(firstUpdateYoyo).toBe(false);
      });
      it('should be called with 1 and 0 on each repeat period if in delay || yoyo', function() {
        var completeCnt, completeDirection, completeYoyo, delay, duration, firstUpdateCnt, firstUpdateDirection, firstUpdateYoyo, oneCnt, repeatCnt, repeatCompleteDirection, repeatCompleteYoyo, repeatStartCnt, repeatStartDirection, repeatStartYoyo, startCnt, startDirection, startYoyo, t, timeShift, updateDirection, updateValue, updateYoyo, zeroCnt;
        zeroCnt = 0;
        oneCnt = 0;
        startCnt = 0;
        startDirection = null;
        startYoyo = null;
        firstUpdateCnt = 0;
        firstUpdateDirection = null;
        firstUpdateYoyo = null;
        updateValue = null;
        updateDirection = null;
        updateYoyo = null;
        repeatStartDirection = null;
        repeatCompleteDirection = null;
        repeatCompleteYoyo = null;
        repeatCnt = 0;
        repeatStartCnt = 0;
        repeatStartYoyo = null;
        completeCnt = 0;
        completeDirection = null;
        completeYoyo = null;
        duration = 50;
        delay = 20;
        t = new Tween({
          repeat: 1,
          yoyo: true,
          duration: duration,
          delay: delay,
          onUpdate: function(p, ep, isForward, isYoyo) {
            updateYoyo = isYoyo;
            updateDirection = isForward;
            updateValue = p;
            (p === 0) && zeroCnt++;
            return (p === 1) && oneCnt++;
          },
          onRepeatComplete: function(isForward, isYoyo) {
            repeatCompleteYoyo = isYoyo;
            repeatCompleteDirection = isForward;
            return repeatCnt++;
          },
          onRepeatStart: function(isForward, isYoyo) {
            repeatStartYoyo = isYoyo;
            repeatStartDirection = isForward;
            return repeatStartCnt++;
          },
          onStart: function(isForward, isYoyo) {
            startYoyo = isYoyo;
            startDirection = isForward;
            return startCnt++;
          },
          onComplete: function(isForward, isYoyo) {
            completeYoyo = isYoyo;
            completeDirection = isForward;
            return completeCnt++;
          },
          onFirstUpdate: function(isForward, isYoyo) {
            firstUpdateYoyo = isYoyo;
            firstUpdateDirection = isForward;
            return firstUpdateCnt++;
          }
        });
        t._setStartTime();
        timeShift = 0;
        t._update(t._props.startTime + timeShift);
        expect(updateValue).toBe(null);
        expect(updateDirection).toBe(null);
        expect(t._wasUknownUpdate).toBe(true);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(0);
        expect(repeatStartDirection).toBe(null);
        expect(repeatCnt).toBe(0);
        expect(repeatCompleteDirection).toBe(null);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(firstUpdateCnt).toBe(0);
        expect(firstUpdateDirection).toBe(null);
        t._update(t._props.startTime + timeShift + (duration / 2));
        expect(updateValue).toBe(.5);
        expect(updateDirection).toBe(true);
        expect(updateYoyo).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(1);
        expect(repeatStartDirection).toBe(true);
        expect(repeatStartYoyo).toBe(false);
        expect(repeatCnt).toBe(0);
        expect(repeatCompleteDirection).toBe(null);
        expect(repeatCompleteYoyo).toBe(null);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(startYoyo).toBe(false);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(completeYoyo).toBe(null);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(true);
        expect(firstUpdateYoyo).toBe(false);
        t._update(t._props.startTime + timeShift + duration + delay / 2);
        expect(updateValue).toBeCloseTo(1, 5);
        expect(updateDirection).toBe(true);
        expect(updateYoyo).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(1);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(1);
        expect(repeatStartDirection).toBe(true);
        expect(repeatStartYoyo).toBe(false);
        expect(repeatCnt).toBe(1);
        expect(repeatCompleteDirection).toBe(true);
        expect(repeatCompleteYoyo).toBe(false);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(startYoyo).toBe(false);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(completeYoyo).toBe(null);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(true);
        expect(firstUpdateYoyo).toBe(false);
        timeShift = duration + delay;
        t._update(t._props.startTime + timeShift + 10);
        expect(updateValue).toBeCloseTo(.8, 5);
        expect(updateDirection).toBe(true);
        expect(updateYoyo).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(1);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(2);
        expect(repeatStartDirection).toBe(true);
        expect(repeatStartYoyo).toBe(true);
        expect(repeatCnt).toBe(1);
        expect(repeatCompleteDirection).toBe(true);
        expect(repeatCompleteYoyo).toBe(false);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(startYoyo).toBe(false);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(completeYoyo).toBe(null);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(true);
        expect(firstUpdateYoyo).toBe(false);
        t._update(t._props.startTime + timeShift + (duration / 4));
        expect(updateValue).toBeCloseTo(.75, 5);
        expect(updateDirection).toBe(true);
        expect(updateYoyo).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(1);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(2);
        expect(repeatStartDirection).toBe(true);
        expect(repeatStartYoyo).toBe(true);
        expect(repeatCnt).toBe(1);
        expect(repeatCompleteDirection).toBe(true);
        expect(repeatCompleteYoyo).toBe(false);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(startYoyo).toBe(false);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(completeYoyo).toBe(null);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(true);
        expect(firstUpdateYoyo).toBe(false);
        t._update(t._props.startTime + timeShift + duration + delay / 2);
        expect(updateValue).toBeCloseTo(0, 5);
        expect(updateDirection).toBe(true);
        expect(updateYoyo).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(1);
        expect(zeroCnt).toBe(1);
        expect(repeatStartCnt).toBe(2);
        expect(repeatStartDirection).toBe(true);
        expect(repeatStartYoyo).toBe(true);
        expect(repeatCnt).toBe(2);
        expect(repeatCompleteDirection).toBe(true);
        expect(repeatCompleteYoyo).toBe(true);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(startYoyo).toBe(false);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(true);
        expect(completeYoyo).toBe(true);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(true);
        expect(firstUpdateYoyo).toBe(false);
        timeShift = 2 * (duration + delay);
        t._update(t._props.startTime + timeShift + 10);
        expect(updateValue).toBeCloseTo(0, 5);
        expect(updateDirection).toBe(true);
        expect(updateYoyo).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(1);
        expect(zeroCnt).toBe(1);
        expect(repeatStartCnt).toBe(2);
        expect(repeatStartDirection).toBe(true);
        expect(repeatStartYoyo).toBe(true);
        expect(repeatCnt).toBe(2);
        expect(repeatCompleteDirection).toBe(true);
        expect(repeatCompleteYoyo).toBe(true);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(true);
        expect(startYoyo).toBe(false);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(true);
        expect(completeYoyo).toBe(true);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(true);
        return expect(firstUpdateYoyo).toBe(false);
      });
      it('should be called with 0 and 1 on each repeat period || reverse yoyo', function() {
        var completeCnt, completeDirection, completeYoyo, duration, firstUpdateCnt, firstUpdateDirection, firstUpdateYoyo, oneCnt, repeatCnt, repeatCompleteDirection, repeatCompleteYoyo, repeatStartCnt, repeatStartDirection, repeatStartYoyo, startCnt, startDirection, startYoyo, t, timeShift, updateDirection, updateValue, updateYoyo, zeroCnt;
        zeroCnt = 0;
        oneCnt = 0;
        startCnt = 0;
        startDirection = null;
        startYoyo = null;
        firstUpdateCnt = 0;
        firstUpdateDirection = null;
        firstUpdateYoyo = null;
        updateValue = null;
        updateDirection = null;
        updateYoyo = null;
        repeatStartDirection = null;
        repeatCompleteDirection = null;
        repeatCompleteYoyo = null;
        repeatCnt = 0;
        repeatStartCnt = 0;
        repeatStartYoyo = null;
        completeCnt = 0;
        completeDirection = null;
        completeYoyo = null;
        duration = 50;
        t = new Tween({
          repeat: 2,
          yoyo: true,
          duration: duration,
          onUpdate: function(p, ep, isForward, isYoyo) {
            updateYoyo = isYoyo;
            updateDirection = isForward;
            updateValue = p;
            (p === 0) && zeroCnt++;
            return (p === 1) && oneCnt++;
          },
          onRepeatComplete: function(isForward, isYoyo) {
            repeatCompleteYoyo = isYoyo;
            repeatCompleteDirection = isForward;
            return repeatCnt++;
          },
          onRepeatStart: function(isForward, isYoyo) {
            repeatStartYoyo = isYoyo;
            repeatStartDirection = isForward;
            return repeatStartCnt++;
          },
          onStart: function(isForward, isYoyo) {
            startYoyo = isYoyo;
            startDirection = isForward;
            return startCnt++;
          },
          onComplete: function(isForward, isYoyo) {
            completeYoyo = isYoyo;
            completeDirection = isForward;
            return completeCnt++;
          },
          onFirstUpdate: function(isForward, isYoyo) {
            firstUpdateYoyo = isYoyo;
            firstUpdateDirection = isForward;
            return firstUpdateCnt++;
          }
        });
        t._setStartTime();
        timeShift = 3 * duration;
        t._update(t._props.startTime + timeShift);
        expect(updateValue).toBe(null);
        expect(updateDirection).toBe(null);
        expect(t._wasUknownUpdate).toBe(true);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(0);
        expect(repeatStartDirection).toBe(null);
        expect(repeatCnt).toBe(0);
        expect(repeatCompleteDirection).toBe(null);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(firstUpdateCnt).toBe(0);
        expect(firstUpdateDirection).toBe(null);
        t._update(t._props.startTime + timeShift - duration / 4);
        expect(updateValue).toBeCloseTo(.75, 5);
        expect(updateDirection).toBe(false);
        expect(updateYoyo).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(0);
        expect(repeatStartDirection).toBe(null);
        expect(repeatStartYoyo).toBe(null);
        expect(repeatCnt).toBe(1);
        expect(repeatCompleteDirection).toBe(false);
        expect(repeatCompleteYoyo).toBe(false);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(startYoyo).toBe(null);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(completeYoyo).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        expect(firstUpdateYoyo).toBe(false);
        timeShift = 2 * duration;
        t._update(t._props.startTime + timeShift);
        expect(updateValue).toBeCloseTo(0, 5);
        expect(updateDirection).toBe(false);
        expect(updateYoyo).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(1);
        expect(repeatStartCnt).toBe(1);
        expect(repeatStartDirection).toBe(false);
        expect(repeatStartYoyo).toBe(false);
        expect(repeatCnt).toBe(1);
        expect(repeatCompleteDirection).toBe(false);
        expect(repeatCompleteYoyo).toBe(false);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(startYoyo).toBe(null);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(completeYoyo).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        expect(firstUpdateYoyo).toBe(false);
        t._update(t._props.startTime + timeShift - duration / 4);
        expect(updateValue).toBeCloseTo(.25, 5);
        expect(updateDirection).toBe(false);
        expect(updateYoyo).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(1);
        expect(repeatStartCnt).toBe(1);
        expect(repeatStartDirection).toBe(false);
        expect(repeatStartYoyo).toBe(false);
        expect(repeatCnt).toBe(2);
        expect(repeatCompleteDirection).toBe(false);
        expect(repeatCompleteYoyo).toBe(true);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(startYoyo).toBe(null);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(completeYoyo).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        expect(firstUpdateYoyo).toBe(false);
        timeShift = duration;
        t._update(t._props.startTime + timeShift);
        expect(updateValue).toBeCloseTo(1, 5);
        expect(updateDirection).toBe(false);
        expect(updateYoyo).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(1);
        expect(zeroCnt).toBe(1);
        expect(repeatStartCnt).toBe(2);
        expect(repeatStartDirection).toBe(false);
        expect(repeatStartYoyo).toBe(true);
        expect(repeatCnt).toBe(2);
        expect(repeatCompleteDirection).toBe(false);
        expect(repeatCompleteYoyo).toBe(true);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(startYoyo).toBe(null);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(completeYoyo).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        expect(firstUpdateYoyo).toBe(false);
        t._update(t._props.startTime + timeShift - duration / 4);
        expect(updateValue).toBeCloseTo(.75, 5);
        expect(updateDirection).toBe(false);
        expect(updateYoyo).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(1);
        expect(zeroCnt).toBe(1);
        expect(repeatStartCnt).toBe(2);
        expect(repeatStartDirection).toBe(false);
        expect(repeatStartYoyo).toBe(true);
        expect(repeatCnt).toBe(3);
        expect(repeatCompleteDirection).toBe(false);
        expect(repeatCompleteYoyo).toBe(false);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(startYoyo).toBe(null);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(completeYoyo).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        expect(firstUpdateYoyo).toBe(false);
        timeShift = 0;
        t._update(t._props.startTime + timeShift);
        expect(updateValue).toBeCloseTo(0, 5);
        expect(updateDirection).toBe(false);
        expect(updateYoyo).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(1);
        expect(zeroCnt).toBe(2);
        expect(repeatStartCnt).toBe(3);
        expect(repeatStartDirection).toBe(false);
        expect(repeatStartYoyo).toBe(false);
        expect(repeatCnt).toBe(3);
        expect(repeatCompleteDirection).toBe(false);
        expect(repeatCompleteYoyo).toBe(false);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(false);
        expect(startYoyo).toBe(false);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(completeYoyo).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        expect(firstUpdateYoyo).toBe(false);
        t._update(t._props.startTime + timeShift - duration / 2);
        expect(updateValue).toBeCloseTo(0, 5);
        expect(updateDirection).toBe(false);
        expect(updateYoyo).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(1);
        expect(zeroCnt).toBe(2);
        expect(repeatStartCnt).toBe(3);
        expect(repeatStartDirection).toBe(false);
        expect(repeatStartYoyo).toBe(false);
        expect(repeatCnt).toBe(3);
        expect(repeatCompleteDirection).toBe(false);
        expect(repeatCompleteYoyo).toBe(false);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(false);
        expect(startYoyo).toBe(false);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(completeYoyo).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        return expect(firstUpdateYoyo).toBe(false);
      });
      it('should be called with 0 and 1 on each repeat period if missed time || yoyo reverse', function() {
        var completeCnt, completeDirection, completeYoyo, duration, firstUpdateCnt, firstUpdateDirection, firstUpdateYoyo, gap, oneCnt, repeatCnt, repeatCompleteDirection, repeatCompleteYoyo, repeatStartCnt, repeatStartDirection, repeatStartYoyo, startCnt, startDirection, startYoyo, t, timeShift, updateDirection, updateValue, updateYoyo, zeroCnt;
        zeroCnt = 0;
        oneCnt = 0;
        startCnt = 0;
        startDirection = null;
        startYoyo = null;
        firstUpdateCnt = 0;
        firstUpdateDirection = null;
        firstUpdateYoyo = null;
        updateValue = null;
        updateDirection = null;
        updateYoyo = null;
        repeatStartDirection = null;
        repeatCompleteDirection = null;
        repeatCompleteYoyo = null;
        repeatCnt = 0;
        repeatStartCnt = 0;
        repeatStartYoyo = null;
        completeCnt = 0;
        completeDirection = null;
        completeYoyo = null;
        duration = 50;
        t = new Tween({
          repeat: 2,
          yoyo: true,
          duration: duration,
          onUpdate: function(p, ep, isForward, isYoyo) {
            updateYoyo = isYoyo;
            updateDirection = isForward;
            updateValue = p;
            (p === 0) && zeroCnt++;
            return (p === 1) && oneCnt++;
          },
          onRepeatComplete: function(isForward, isYoyo) {
            repeatCompleteYoyo = isYoyo;
            repeatCompleteDirection = isForward;
            return repeatCnt++;
          },
          onRepeatStart: function(isForward, isYoyo) {
            repeatStartYoyo = isYoyo;
            repeatStartDirection = isForward;
            return repeatStartCnt++;
          },
          onStart: function(isForward, isYoyo) {
            startYoyo = isYoyo;
            startDirection = isForward;
            return startCnt++;
          },
          onComplete: function(isForward, isYoyo) {
            completeYoyo = isYoyo;
            completeDirection = isForward;
            return completeCnt++;
          },
          onFirstUpdate: function(isForward, isYoyo) {
            firstUpdateYoyo = isYoyo;
            firstUpdateDirection = isForward;
            return firstUpdateCnt++;
          }
        });
        t._setStartTime();
        gap = 5;
        timeShift = 3 * duration;
        t._update(t._props.startTime + timeShift + gap);
        expect(updateValue).toBe(null);
        expect(updateDirection).toBe(null);
        expect(t._wasUknownUpdate).toBe(true);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(0);
        expect(repeatStartDirection).toBe(null);
        expect(repeatCnt).toBe(0);
        expect(repeatCompleteDirection).toBe(null);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(firstUpdateCnt).toBe(0);
        expect(firstUpdateDirection).toBe(null);
        t._update(t._props.startTime + timeShift - (duration / 2));
        expect(updateValue).toBeCloseTo(.5, 5);
        expect(updateDirection).toBe(false);
        expect(updateYoyo).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(0);
        expect(repeatStartDirection).toBe(null);
        expect(repeatStartYoyo).toBe(null);
        expect(repeatCnt).toBe(1);
        expect(repeatCompleteDirection).toBe(false);
        expect(repeatCompleteYoyo).toBe(false);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(startYoyo).toBe(null);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(completeYoyo).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        expect(firstUpdateYoyo).toBe(false);
        t._update(t._props.startTime + timeShift - duration + gap);
        expect(updateValue).toBeCloseTo(.1, 5);
        expect(updateDirection).toBe(false);
        expect(updateYoyo).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(0);
        expect(repeatStartDirection).toBe(null);
        expect(repeatStartYoyo).toBe(null);
        expect(repeatCnt).toBe(1);
        expect(repeatCompleteDirection).toBe(false);
        expect(repeatCompleteYoyo).toBe(false);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(startYoyo).toBe(null);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(completeYoyo).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        expect(firstUpdateYoyo).toBe(false);
        timeShift = 2 * duration;
        t._update(t._props.startTime + timeShift - gap);
        expect(updateValue).toBeCloseTo(.1, 5);
        expect(updateDirection).toBe(false);
        expect(updateYoyo).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(1);
        expect(repeatStartDirection).toBe(false);
        expect(repeatStartYoyo).toBe(false);
        expect(repeatCnt).toBe(2);
        expect(repeatCompleteDirection).toBe(false);
        expect(repeatCompleteYoyo).toBe(true);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(startYoyo).toBe(null);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(completeYoyo).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        expect(firstUpdateYoyo).toBe(false);
        t._update(t._props.startTime + timeShift - (duration / 4));
        expect(updateValue).toBeCloseTo(.25, 5);
        expect(updateDirection).toBe(false);
        expect(updateYoyo).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(1);
        expect(repeatStartDirection).toBe(false);
        expect(repeatStartYoyo).toBe(false);
        expect(repeatCnt).toBe(2);
        expect(repeatCompleteDirection).toBe(false);
        expect(repeatCompleteYoyo).toBe(true);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(startYoyo).toBe(null);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(completeYoyo).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        expect(firstUpdateYoyo).toBe(false);
        timeShift = duration;
        t._update(t._props.startTime + timeShift - gap);
        expect(updateValue).toBeCloseTo(.9, 5);
        expect(updateDirection).toBe(false);
        expect(updateYoyo).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(2);
        expect(repeatStartDirection).toBe(false);
        expect(repeatStartYoyo).toBe(true);
        expect(repeatCnt).toBe(3);
        expect(repeatCompleteDirection).toBe(false);
        expect(repeatCompleteYoyo).toBe(false);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(startYoyo).toBe(null);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(completeYoyo).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        expect(firstUpdateYoyo).toBe(false);
        timeShift = duration;
        t._update(t._props.startTime - gap);
        expect(updateValue).toBeCloseTo(0, 5);
        expect(updateDirection).toBe(false);
        expect(updateYoyo).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(1);
        expect(repeatStartCnt).toBe(3);
        expect(repeatStartDirection).toBe(false);
        expect(repeatStartYoyo).toBe(false);
        expect(repeatCnt).toBe(3);
        expect(repeatCompleteDirection).toBe(false);
        expect(repeatCompleteYoyo).toBe(false);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(false);
        expect(startYoyo).toBe(false);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(completeYoyo).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        expect(firstUpdateYoyo).toBe(false);
        t._update(t._props.startTime + timeShift - (duration / 4));
        expect(updateValue).toBeCloseTo(.75, 5);
        expect(updateDirection).toBe(true);
        expect(updateYoyo).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(1);
        expect(repeatStartCnt).toBe(4);
        expect(repeatStartDirection).toBe(true);
        expect(repeatStartYoyo).toBe(false);
        expect(repeatCnt).toBe(3);
        expect(repeatCompleteDirection).toBe(false);
        expect(repeatCompleteYoyo).toBe(false);
        expect(startCnt).toBe(2);
        expect(startDirection).toBe(true);
        expect(startYoyo).toBe(false);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(completeYoyo).toBe(false);
        expect(firstUpdateCnt).toBe(2);
        expect(firstUpdateDirection).toBe(true);
        expect(firstUpdateYoyo).toBe(false);
        t._update(t._props.startTime - gap);
        expect(updateValue).toBeCloseTo(0, 5);
        expect(updateDirection).toBe(false);
        expect(updateYoyo).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(2);
        expect(repeatStartCnt).toBe(5);
        expect(repeatStartDirection).toBe(false);
        expect(repeatStartYoyo).toBe(false);
        expect(repeatCnt).toBe(3);
        expect(repeatCompleteDirection).toBe(false);
        expect(repeatCompleteYoyo).toBe(false);
        expect(startCnt).toBe(3);
        expect(startDirection).toBe(false);
        expect(startYoyo).toBe(false);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(completeYoyo).toBe(false);
        expect(firstUpdateCnt).toBe(2);
        expect(firstUpdateDirection).toBe(true);
        expect(firstUpdateYoyo).toBe(false);
        t._update(t._props.startTime - gap - 15);
        expect(updateValue).toBeCloseTo(0, 5);
        expect(updateDirection).toBe(false);
        expect(updateYoyo).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(2);
        expect(repeatStartCnt).toBe(5);
        expect(repeatStartDirection).toBe(false);
        expect(repeatStartYoyo).toBe(false);
        expect(repeatCnt).toBe(3);
        expect(repeatCompleteDirection).toBe(false);
        expect(repeatCompleteYoyo).toBe(false);
        expect(startCnt).toBe(3);
        expect(startDirection).toBe(false);
        expect(startYoyo).toBe(false);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(completeYoyo).toBe(false);
        expect(firstUpdateCnt).toBe(2);
        expect(firstUpdateDirection).toBe(true);
        return expect(firstUpdateYoyo).toBe(false);
      });
      it('should be called with 0 and 1 on each repeat period if in delay || yoyo reverse', function() {
        var completeCnt, completeDirection, completeYoyo, delay, duration, firstUpdateCnt, firstUpdateDirection, firstUpdateYoyo, oneCnt, repeatCnt, repeatCompleteDirection, repeatCompleteYoyo, repeatStartCnt, repeatStartDirection, repeatStartYoyo, startCnt, startDirection, startYoyo, t, timeShift, updateDirection, updateValue, updateYoyo, zeroCnt;
        zeroCnt = 0;
        oneCnt = 0;
        startCnt = 0;
        startDirection = null;
        startYoyo = null;
        firstUpdateCnt = 0;
        firstUpdateDirection = null;
        firstUpdateYoyo = null;
        updateValue = null;
        updateDirection = null;
        updateYoyo = null;
        repeatStartDirection = null;
        repeatCompleteDirection = null;
        repeatCompleteYoyo = null;
        repeatCnt = 0;
        repeatStartCnt = 0;
        repeatStartYoyo = null;
        completeCnt = 0;
        completeDirection = null;
        completeYoyo = null;
        duration = 500;
        delay = 200;
        t = new Tween({
          repeat: 2,
          yoyo: true,
          duration: duration,
          delay: delay,
          onUpdate: function(p, ep, isForward, isYoyo) {
            updateYoyo = isYoyo;
            updateDirection = isForward;
            updateValue = p;
            (p === 0) && zeroCnt++;
            return (p === 1) && oneCnt++;
          },
          onRepeatComplete: function(isForward, isYoyo) {
            repeatCompleteYoyo = isYoyo;
            repeatCompleteDirection = isForward;
            return repeatCnt++;
          },
          onRepeatStart: function(isForward, isYoyo) {
            repeatStartYoyo = isYoyo;
            repeatStartDirection = isForward;
            return repeatStartCnt++;
          },
          onStart: function(isForward, isYoyo) {
            startYoyo = isYoyo;
            startDirection = isForward;
            return startCnt++;
          },
          onComplete: function(isForward, isYoyo) {
            completeYoyo = isYoyo;
            completeDirection = isForward;
            return completeCnt++;
          },
          onFirstUpdate: function(isForward, isYoyo) {
            firstUpdateYoyo = isYoyo;
            firstUpdateDirection = isForward;
            return firstUpdateCnt++;
          }
        });
        t._setStartTime();
        timeShift = 3 * (duration + delay) - delay;
        t._update(t._props.startTime + timeShift + 5);
        expect(updateValue).toBe(null);
        expect(updateDirection).toBe(null);
        expect(t._wasUknownUpdate).toBe(true);
        expect(zeroCnt).toBe(0);
        expect(oneCnt).toBe(0);
        expect(repeatStartCnt).toBe(0);
        expect(repeatStartDirection).toBe(null);
        expect(repeatCnt).toBe(0);
        expect(repeatCompleteDirection).toBe(null);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(firstUpdateCnt).toBe(0);
        expect(firstUpdateDirection).toBe(null);
        t._update(t._props.startTime + timeShift - (duration / 4));
        expect(updateValue).toBeCloseTo(.75, 5);
        expect(updateDirection).toBe(false);
        expect(updateYoyo).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(0);
        expect(repeatStartDirection).toBe(null);
        expect(repeatStartYoyo).toBe(null);
        expect(repeatCnt).toBe(1);
        expect(repeatCompleteDirection).toBe(false);
        expect(repeatCompleteYoyo).toBe(false);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(startYoyo).toBe(null);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(completeYoyo).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        expect(firstUpdateYoyo).toBe(false);
        t._update(t._props.startTime + timeShift - duration - 5);
        expect(updateValue).toBeCloseTo(0, 5);
        expect(updateDirection).toBe(false);
        expect(updateYoyo).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(1);
        expect(repeatStartCnt).toBe(1);
        expect(repeatStartDirection).toBe(false);
        expect(repeatStartYoyo).toBe(false);
        expect(repeatCnt).toBe(1);
        expect(repeatCompleteDirection).toBe(false);
        expect(repeatCompleteYoyo).toBe(false);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(startYoyo).toBe(null);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(completeYoyo).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        expect(firstUpdateYoyo).toBe(false);
        timeShift = 2 * (duration + delay) - delay;
        t._update(t._props.startTime + timeShift - duration / 4);
        expect(updateValue).toBeCloseTo(.25, 5);
        expect(updateDirection).toBe(false);
        expect(updateYoyo).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(1);
        expect(repeatStartCnt).toBe(1);
        expect(repeatStartDirection).toBe(false);
        expect(repeatStartYoyo).toBe(false);
        expect(repeatCnt).toBe(2);
        expect(repeatCompleteDirection).toBe(false);
        expect(repeatCompleteYoyo).toBe(true);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(startYoyo).toBe(null);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(completeYoyo).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        expect(firstUpdateYoyo).toBe(false);
        t._update(t._props.startTime + timeShift - duration - 5);
        expect(updateValue).toBeCloseTo(1, 5);
        expect(updateDirection).toBe(false);
        expect(updateYoyo).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(1);
        expect(zeroCnt).toBe(1);
        expect(repeatStartCnt).toBe(2);
        expect(repeatStartDirection).toBe(false);
        expect(repeatStartYoyo).toBe(true);
        expect(repeatCnt).toBe(2);
        expect(repeatCompleteDirection).toBe(false);
        expect(repeatCompleteYoyo).toBe(true);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(startYoyo).toBe(null);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(completeYoyo).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        expect(firstUpdateYoyo).toBe(false);
        timeShift = duration;
        t._update(t._props.startTime + timeShift - duration / 4);
        expect(updateValue).toBeCloseTo(.75, 5);
        expect(updateDirection).toBe(false);
        expect(updateYoyo).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(1);
        expect(zeroCnt).toBe(1);
        expect(repeatStartCnt).toBe(2);
        expect(repeatStartDirection).toBe(false);
        expect(repeatStartYoyo).toBe(true);
        expect(repeatCnt).toBe(3);
        expect(repeatCompleteDirection).toBe(false);
        expect(repeatCompleteYoyo).toBe(false);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(startYoyo).toBe(null);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(completeYoyo).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        expect(firstUpdateYoyo).toBe(false);
        t._update(t._props.startTime + timeShift - duration - 5);
        expect(updateValue).toBeCloseTo(0, 5);
        expect(updateDirection).toBe(false);
        expect(updateYoyo).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(1);
        expect(zeroCnt).toBe(2);
        expect(repeatStartCnt).toBe(3);
        expect(repeatStartDirection).toBe(false);
        expect(repeatStartYoyo).toBe(false);
        expect(repeatCnt).toBe(3);
        expect(repeatCompleteDirection).toBe(false);
        expect(repeatCompleteYoyo).toBe(false);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(false);
        expect(startYoyo).toBe(false);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(completeYoyo).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        expect(firstUpdateDirection).toBe(false);
        t._update(t._props.startTime + timeShift - duration - 15);
        expect(updateValue).toBeCloseTo(0, 5);
        expect(updateDirection).toBe(false);
        expect(updateYoyo).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(1);
        expect(zeroCnt).toBe(2);
        expect(repeatStartCnt).toBe(3);
        expect(repeatStartDirection).toBe(false);
        expect(repeatStartYoyo).toBe(false);
        expect(repeatCnt).toBe(3);
        expect(repeatCompleteDirection).toBe(false);
        expect(repeatCompleteYoyo).toBe(false);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(false);
        expect(startYoyo).toBe(false);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(completeYoyo).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        return expect(firstUpdateDirection).toBe(false);
      });
      return it('should be called with 0 and 1 on each repeat period if delay || yoyo reverse', function() {
        var completeCnt, completeDirection, completeYoyo, delay, duration, firstUpdateCnt, firstUpdateDirection, firstUpdateYoyo, oneCnt, repeatCnt, repeatCompleteDirection, repeatCompleteYoyo, repeatStartCnt, repeatStartDirection, repeatStartYoyo, startCnt, startDirection, startYoyo, t, timeShift, updateDirection, updateValue, updateYoyo, zeroCnt;
        zeroCnt = 0;
        oneCnt = 0;
        startCnt = 0;
        startDirection = null;
        startYoyo = null;
        firstUpdateCnt = 0;
        firstUpdateDirection = null;
        firstUpdateYoyo = null;
        updateValue = null;
        updateDirection = null;
        updateYoyo = null;
        repeatStartDirection = null;
        repeatCompleteDirection = null;
        repeatCompleteYoyo = null;
        repeatCnt = 0;
        repeatStartCnt = 0;
        repeatStartYoyo = null;
        completeCnt = 0;
        completeDirection = null;
        completeYoyo = null;
        duration = 500;
        delay = 200;
        t = new Tween({
          repeat: 2,
          yoyo: true,
          duration: duration,
          delay: delay,
          onUpdate: function(p, ep, isForward, isYoyo) {
            updateYoyo = isYoyo;
            updateDirection = isForward;
            updateValue = p;
            (p === 0) && zeroCnt++;
            return (p === 1) && oneCnt++;
          },
          onRepeatComplete: function(isForward, isYoyo) {
            repeatCompleteYoyo = isYoyo;
            repeatCompleteDirection = isForward;
            return repeatCnt++;
          },
          onRepeatStart: function(isForward, isYoyo) {
            repeatStartYoyo = isYoyo;
            repeatStartDirection = isForward;
            return repeatStartCnt++;
          },
          onStart: function(isForward, isYoyo) {
            startYoyo = isYoyo;
            startDirection = isForward;
            return startCnt++;
          },
          onComplete: function(isForward, isYoyo) {
            completeYoyo = isYoyo;
            completeDirection = isForward;
            return completeCnt++;
          },
          onFirstUpdate: function(isForward, isYoyo) {
            firstUpdateYoyo = isYoyo;
            firstUpdateDirection = isForward;
            return firstUpdateCnt++;
          }
        });
        t._setStartTime();
        timeShift = 3 * (duration + delay) - delay;
        t._update(t._props.startTime + timeShift);
        expect(updateValue).toBe(null);
        expect(updateDirection).toBe(null);
        expect(t._wasUknownUpdate).toBe(true);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(0);
        expect(repeatStartDirection).toBe(null);
        expect(repeatCnt).toBe(0);
        expect(repeatCompleteDirection).toBe(null);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(completeCnt).toBe(0);
        expect(completeDirection).toBe(null);
        expect(firstUpdateCnt).toBe(0);
        expect(firstUpdateDirection).toBe(null);
        t._update(t._props.startTime + timeShift - (duration / 2));
        expect(updateValue).toBeCloseTo(.5, 5);
        expect(updateDirection).toBe(false);
        expect(updateYoyo).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(0);
        expect(repeatStartCnt).toBe(0);
        expect(repeatStartDirection).toBe(null);
        expect(repeatStartYoyo).toBe(null);
        expect(repeatCnt).toBe(1);
        expect(repeatCompleteDirection).toBe(false);
        expect(repeatCompleteYoyo).toBe(false);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(startYoyo).toBe(null);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(completeYoyo).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        expect(firstUpdateYoyo).toBe(false);
        t._update(t._props.startTime + timeShift - duration);
        expect(updateValue).toBeCloseTo(0, 5);
        expect(updateDirection).toBe(false);
        expect(updateYoyo).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(1);
        expect(repeatStartCnt).toBe(1);
        expect(repeatStartDirection).toBe(false);
        expect(repeatStartYoyo).toBe(false);
        expect(repeatCnt).toBe(1);
        expect(repeatCompleteDirection).toBe(false);
        expect(repeatCompleteYoyo).toBe(false);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(startYoyo).toBe(null);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(completeYoyo).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        expect(firstUpdateYoyo).toBe(false);
        timeShift = 2 * (duration + delay) - delay;
        t._update(t._props.startTime + timeShift - duration / 4);
        expect(updateValue).toBeCloseTo(.25, 5);
        expect(updateDirection).toBe(false);
        expect(updateYoyo).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(0);
        expect(zeroCnt).toBe(1);
        expect(repeatStartCnt).toBe(1);
        expect(repeatStartDirection).toBe(false);
        expect(repeatStartYoyo).toBe(false);
        expect(repeatCnt).toBe(2);
        expect(repeatCompleteDirection).toBe(false);
        expect(repeatCompleteYoyo).toBe(true);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(startYoyo).toBe(null);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(completeYoyo).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        expect(firstUpdateYoyo).toBe(false);
        timeShift = 2 * (duration + delay) - delay;
        t._update(t._props.startTime + timeShift - duration);
        expect(updateValue).toBeCloseTo(1, 5);
        expect(updateDirection).toBe(false);
        expect(updateYoyo).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(1);
        expect(zeroCnt).toBe(1);
        expect(repeatStartCnt).toBe(2);
        expect(repeatStartDirection).toBe(false);
        expect(repeatStartYoyo).toBe(true);
        expect(repeatCnt).toBe(2);
        expect(repeatCompleteDirection).toBe(false);
        expect(repeatCompleteYoyo).toBe(true);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(startYoyo).toBe(null);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(completeYoyo).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        expect(firstUpdateYoyo).toBe(false);
        timeShift = duration;
        t._update(t._props.startTime + timeShift - duration / 4);
        expect(updateValue).toBeCloseTo(.75, 5);
        expect(updateDirection).toBe(false);
        expect(updateYoyo).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(1);
        expect(zeroCnt).toBe(1);
        expect(repeatStartCnt).toBe(2);
        expect(repeatStartDirection).toBe(false);
        expect(repeatStartYoyo).toBe(true);
        expect(repeatCnt).toBe(3);
        expect(repeatCompleteDirection).toBe(false);
        expect(startCnt).toBe(0);
        expect(startDirection).toBe(null);
        expect(startYoyo).toBe(null);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(completeYoyo).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        expect(firstUpdateYoyo).toBe(false);
        t._update(t._props.startTime + timeShift - duration);
        expect(updateValue).toBeCloseTo(0, 5);
        expect(updateDirection).toBe(false);
        expect(updateYoyo).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(1);
        expect(zeroCnt).toBe(2);
        expect(repeatStartCnt).toBe(3);
        expect(repeatStartDirection).toBe(false);
        expect(repeatStartYoyo).toBe(false);
        expect(repeatCnt).toBe(3);
        expect(repeatCompleteDirection).toBe(false);
        expect(repeatCompleteYoyo).toBe(false);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(false);
        expect(startYoyo).toBe(false);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(completeYoyo).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        expect(firstUpdateYoyo).toBe(false);
        t._update(t._props.startTime + timeShift - duration - 10);
        expect(updateValue).toBeCloseTo(0, 5);
        expect(updateDirection).toBe(false);
        expect(updateYoyo).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(1);
        expect(zeroCnt).toBe(2);
        expect(repeatStartCnt).toBe(3);
        expect(repeatStartDirection).toBe(false);
        expect(repeatStartYoyo).toBe(false);
        expect(repeatCnt).toBe(3);
        expect(repeatCompleteDirection).toBe(false);
        expect(repeatCompleteYoyo).toBe(false);
        expect(startCnt).toBe(1);
        expect(startDirection).toBe(false);
        expect(startYoyo).toBe(false);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(completeYoyo).toBe(false);
        expect(firstUpdateCnt).toBe(1);
        expect(firstUpdateDirection).toBe(false);
        expect(firstUpdateYoyo).toBe(false);
        t._update(t._props.startTime + timeShift - duration / 4);
        expect(updateValue).toBeCloseTo(.75, 5);
        expect(updateDirection).toBe(true);
        expect(updateYoyo).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(1);
        expect(zeroCnt).toBe(2);
        expect(repeatStartCnt).toBe(4);
        expect(repeatStartDirection).toBe(true);
        expect(repeatStartYoyo).toBe(false);
        expect(repeatCnt).toBe(3);
        expect(repeatCompleteDirection).toBe(false);
        expect(repeatCompleteYoyo).toBe(false);
        expect(startCnt).toBe(2);
        expect(startDirection).toBe(true);
        expect(startYoyo).toBe(false);
        expect(completeCnt).toBe(1);
        expect(completeDirection).toBe(false);
        expect(completeYoyo).toBe(false);
        expect(firstUpdateCnt).toBe(2);
        expect(firstUpdateDirection).toBe(true);
        return expect(firstUpdateYoyo).toBe(false);
      });
    });
    describe('specific _update behaviour', function() {
      it('should call repeatComplete if immediately returned inside Timeline', function() {
        var t, tm;
        tm = new Timeline({
          repeat: 1,
          yoyo: true
        });
        t = new Tween({
          onStart: function(isForward, isYoyo) {},
          onRepeatStart: function(isForward, isYoyo) {},
          onComplete: function(isForward, isYoyo) {},
          onRepeatComplete: function(isForward, isYoyo) {},
          onFirstUpdate: function(isForward, isYoyo) {},
          onProgress: function(p, isForward, isYoyo) {},
          onUpdate: function(ep, p, isForward, isYoyo) {}
        });
        tm.add(t);
        tm.setProgress(0);
        tm.setProgress(.1);
        tm.setProgress(.35);
        tm.setProgress(.5);
        tm.setProgress(.6);
        spyOn(t._props, 'onRepeatComplete');
        tm.setProgress(.5);
        return expect(t._props.onRepeatComplete).toHaveBeenCalledWith(true, false);
      });
      it('should call repeatComplete only once when in delay', function() {
        var delay, duration, t;
        duration = 2000;
        delay = 1000;
        t = new Tween({
          repeat: 1,
          yoyo: true,
          duration: duration,
          delay: delay
        });
        spyOn(t._props, 'onRepeatComplete');
        t.setProgress(1);
        t.setProgress(.85);
        t.setProgress(.75);
        t.setProgress(.6);
        t.setProgress(.45);
        t.setProgress(.25);
        return expect(t._props.onRepeatComplete.calls.count()).toBe(2);
      });
      return it('should not call onComplete and onRepeatComplete on start', function() {
        var et, st, tm, tw;
        tm = new mojs.Timeline({
          repeat: 1,
          yoyo: true
        });
        tw = new mojs.Tween({
          duration: 2000,
          onStart: function(isForward, isYoyo) {},
          onRepeatStart: function(isForward, isYoyo) {},
          onComplete: function(isForward, isYoyo) {},
          onRepeatComplete: function(isForward, isYoyo) {},
          onFirstUpdate: function(isForward, isYoyo) {},
          onProgress: function(p, isForward, isYoyo) {},
          onUpdate: function(ep, p, isForward, isYoyo) {}
        });
        tm.add(tw);
        tm._setStartTime();
        st = tm._props.startTime;
        et = tm._props.endTime;
        tm._update(st);
        tm._update(st + 1000);
        tm._update(st + 2000);
        tm._update(st + 3000);
        tm._update(st + 3100);
        tm._update(st + 3300);
        spyOn(tw._props, 'onRepeatComplete');
        spyOn(tw._props, 'onComplete');
        tm._update(tm._props.endTime - .0000000000001);
        expect(tw._props.onRepeatComplete).not.toHaveBeenCalled();
        return expect(tw._props.onComplete).not.toHaveBeenCalled();
      });
    });
    describe('_getPeriod method ->', function() {
      it('should get current period', function() {
        var delay, duration, t, timeShift;
        duration = 50;
        delay = 20;
        t = new Tween({
          repeat: 3,
          duration: duration,
          delay: delay
        });
        t._setStartTime();
        expect(t._getPeriod(t._props.startTime)).toBe(0);
        expect(t._getPeriod(t._props.startTime + duration / 2)).toBe(0);
        expect(t._getPeriod(t._props.startTime + duration)).toBe(1);
        timeShift = duration + delay;
        expect(t._getPeriod(t._props.startTime + timeShift - delay / 2)).toBe('delay');
        expect(t._delayT).toBe(1);
        expect(t._getPeriod(t._props.startTime + timeShift)).toBe(1);
        expect(t._getPeriod(t._props.startTime + timeShift + duration / 2)).toBe(1);
        expect(t._getPeriod(t._props.startTime + timeShift + duration)).toBe(2);
        timeShift = 2 * (duration + delay);
        expect(t._getPeriod(t._props.startTime + timeShift - delay / 2)).toBe('delay');
        expect(t._delayT).toBe(2);
        expect(t._getPeriod(t._props.startTime + timeShift)).toBe(2);
        expect(t._getPeriod(t._props.startTime + timeShift + duration / 2)).toBe(2);
        expect(t._getPeriod(t._props.startTime + timeShift + duration)).toBe(3);
        timeShift = 3 * (duration + delay);
        expect(t._getPeriod(t._props.startTime + timeShift - delay / 2)).toBe('delay');
        expect(t._delayT).toBe(3);
        expect(t._getPeriod(t._props.startTime + timeShift)).toBe(3);
        expect(t._getPeriod(t._props.startTime + timeShift + duration / 2)).toBe(3);
        return expect(t._getPeriod(t._props.startTime + timeShift + duration)).toBe(4);
      });
      it('should get the current period with no delay', function() {
        var duration, t, timeShift;
        duration = 50;
        t = new Tween({
          repeat: 3,
          duration: duration
        });
        t._setStartTime();
        expect(t._getPeriod(t._props.startTime)).toBe(0);
        expect(t._getPeriod(t._props.startTime + duration / 2)).toBe(0);
        expect(t._getPeriod(t._props.startTime + duration)).toBe(1);
        expect(t._getPeriod(t._props.startTime + duration + 1)).toBe(1);
        timeShift = duration;
        expect(t._getPeriod(t._props.startTime + timeShift + duration / 2)).toBe(1);
        expect(t._getPeriod(t._props.startTime + timeShift + duration)).toBe(2);
        expect(t._getPeriod(t._props.startTime + timeShift + duration + 1)).toBe(2);
        timeShift = 2 * duration;
        expect(t._getPeriod(t._props.startTime + timeShift + duration / 2)).toBe(2);
        expect(t._getPeriod(t._props.startTime + timeShift + duration)).toBe(3);
        expect(t._getPeriod(t._props.startTime + timeShift + duration + 1)).toBe(3);
        timeShift = 3 * duration;
        expect(t._getPeriod(t._props.startTime + timeShift + duration / 2)).toBe(3);
        expect(t._getPeriod(t._props.startTime + timeShift + duration)).toBe(4);
        return expect(t._getPeriod(t._props.startTime + timeShift + duration + 1)).toBe(4);
      });
      it('should return period number if time > endTime', function() {
        var delay, duration, t, timeShift;
        duration = 50;
        delay = 20;
        t = new Tween({
          repeat: 2,
          duration: duration,
          delay: delay
        });
        t._setStartTime();
        timeShift = 3 * (duration + delay) - delay;
        return expect(t._getPeriod(t._props.startTime + timeShift + delay / 2)).toBe(3);
      });
      it('should round instead of floor if time >= endTime', function() {
        var duration, t;
        duration = 50 + 3 / 2.123;
        t = new Tween({
          repeat: 2,
          duration: duration
        });
        t._setStartTime();
        return expect(t._getPeriod(t._props.startTime + 3 * duration)).toBe(3);
      });
      return it('should not fail because of precision error', function() {
        var delay, duration, t;
        duration = 500 + 4 / 10000.123;
        delay = 200 + 4 / 10000.123;
        t = new Tween({
          repeat: 2,
          duration: duration,
          delay: delay
        });
        t._setStartTime();
        return expect(t._getPeriod(t._props.endTime)).toBe(3);
      });
    });
    describe('onComplete callback ->', function() {
      it('should be defined', function() {
        var t;
        t = new Tween({
          onComplete: function() {}
        });
        return expect(t._props.onComplete).toBeDefined();
      });
      it('should call onComplete callback', function() {
        var t;
        t = new Tween({
          duration: 100,
          onComplete: function() {}
        })._setStartTime();
        spyOn(t._props, 'onComplete');
        t._update(t._props.startTime + 50);
        t._update(t._props.startTime + 51);
        t._update(t._props.startTime + 101);
        return expect(t._props.onComplete).toHaveBeenCalled();
      });
      it('should be called just once', function() {
        var cnt, t;
        cnt = 0;
        t = new Tween({
          duration: 32,
          onComplete: function() {
            return cnt++;
          }
        })._setStartTime();
        spyOn(t._props, 'onComplete');
        t._update(t._props.startTime + 0);
        t._update(t._props.startTime + 10);
        t._update(t._props.startTime + 20);
        t._update(t._props.startTime + 30);
        t._update(t._props.startTime + 34);
        expect(t._props.onComplete).toHaveBeenCalledWith(true, false);
        return expect(t._props.onComplete.calls.count()).toBe(1);
      });
      it('should be called just once when inside timeline', function() {
        var duration, t, tm;
        tm = new mojs.Timeline;
        duration = 32;
        t = new Tween({
          duration: duration,
          onComplete: function() {}
        })._setStartTime();
        tm.add(t);
        tm._setStartTime();
        spyOn(t._props, 'onComplete');
        tm._update(t._props.startTime + 0);
        tm._update(t._props.startTime + duration / 2);
        tm._update(t._props.startTime + duration);
        expect(t._props.onComplete).toHaveBeenCalledWith(true, false);
        return expect(t._props.onComplete.calls.count()).toBe(1);
      });
      it('should fire only once when inside timeline #2', function() {
        var cnt, delay, duration, t1, t2, tm;
        cnt = 0;
        duration = 50;
        delay = 10;
        tm = new mojs.Timeline;
        t1 = new Tween({
          delay: delay,
          duration: duration,
          onComplete: function() {
            return cnt++;
          }
        });
        t2 = new Tween({
          delay: 2 * delay,
          duration: 2 * duration
        });
        tm.add(t1, t2);
        tm._setStartTime();
        tm._update(t1._props.startTime);
        tm._update(t1._props.startTime + duration / 2);
        tm._update(t1._props.startTime + duration + delay / 2);
        tm._update(t1._props.startTime + duration + delay + 1);
        tm._update(t1._props.startTime + 2 * duration + delay / 2);
        tm._update(t1._props.startTime + 2 * (duration + delay));
        tm._update(t1._props.startTime + 2 * (duration + delay) + delay);
        tm._update(t1._props.startTime + 2 * (duration + delay) + 2 * delay);
        tm._update(t1._props.startTime + 2 * (duration + delay) + 3 * delay);
        tm._update(t1._props.startTime + 2 * (duration + delay) + 4 * delay);
        return expect(cnt).toBe(1);
      });
      it('should reset isCompleted flag', function() {
        var t;
        t = new Tween({
          duration: 32
        })._setStartTime();
        t._update(t._props.startTime + 10);
        t._update(t._props.startTime + 11);
        t._update(t._props.endTime);
        expect(t._isCompleted).toBe(true);
        t._update(t._props.startTime + 10);
        return expect(t._isCompleted).toBe(false);
      });
      it('should have the right scope', function() {
        var isRightScope, t;
        isRightScope = null;
        t = new Tween({
          duration: 10,
          onComplete: function() {
            return isRightScope = this instanceof Tween;
          }
        });
        t._setStartTime()._update(t._props.startTime + 2);
        t._setStartTime()._update(t._props.startTime + 3);
        t._setStartTime()._update(t._props.startTime + 11);
        return expect(isRightScope).toBe(true);
      });
      return it('should fire after the last onUpdate', function(dfr) {
        var proc, t;
        proc = 0;
        t = new Tween({
          duration: 32,
          onUpdate: function(p) {
            return proc = p;
          },
          onComplete: function() {
            expect(proc).toBe(1);
            return dfr();
          }
        });
        t._setStartTime();
        t._update(t._props.startTime + 1);
        t._update(t._props.startTime + 2);
        return t._update(t._props.startTime + 32);
      });
    });
    describe('onStart callback ->', function() {
      it('should be defined', function() {
        var t;
        t = new Tween({
          onStart: function() {}
        });
        return expect(t._props.onStart).toBeDefined();
      });
      it('should restart if tween was completed', function() {
        var startCnt, t;
        startCnt = 0;
        t = new Tween({
          onStart: function() {
            return startCnt++;
          }
        });
        t._setStartTime();
        t._update(t._props.startTime + t._props.duration / 2);
        expect(startCnt).toBe(0);
        t._update(t._props.startTime + t._props.duration / 2 + 10);
        expect(startCnt).toBe(1);
        t._update(t._props.startTime + t._props.duration);
        expect(startCnt).toBe(1);
        t._update(t._props.startTime - 10);
        expect(startCnt).toBe(2);
        t._update(t._props.startTime + t._props.duration / 2);
        return expect(startCnt).toBe(3);
      });
      it('should run before onComplete if tween ended', function() {
        var callback, startCnt, t;
        startCnt = 0;
        callback = null;
        t = new Tween({
          onStart: function() {
            if (callback == null) {
              callback = 'start';
            }
            return startCnt++;
          },
          onComplete: function() {
            return callback != null ? callback : callback = 'complete';
          }
        });
        t._setStartTime();
        t._update(t._props.startTime + t._props.duration / 2);
        expect(startCnt).toBe(0);
        t._update(t._props.startTime + t._props.duration / 2 + 10);
        expect(startCnt).toBe(1);
        t._update(t._props.startTime + t._props.duration);
        expect(startCnt).toBe(1);
        return expect(callback).toBe('start');
      });
      it('should run with right context', function() {
        var isRightContext, t;
        isRightContext = null;
        t = new Tween({
          onStart: function() {
            return isRightContext = this === t;
          }
        });
        t.setProgress(0);
        t.setProgress(.1);
        return expect(isRightContext).toBe(true);
      });
      return it('should run with custom context', function() {
        var contextObj, isRightContext, t;
        isRightContext = null;
        contextObj = {};
        t = new Tween({
          callbacksContext: contextObj,
          onStart: function() {
            return isRightContext = this === contextObj;
          }
        });
        t.setProgress(0);
        t.setProgress(.1);
        return expect(isRightContext).toBe(true);
      });
    });
    describe('onFirstUpdate callback ->', function() {
      it('should be defined', function() {
        var t;
        t = new Tween({
          onFirstUpdate: function() {}
        });
        return expect(t._props.onFirstUpdate).toBeDefined();
      });
      it('should run with right context', function() {
        var isRightContext, t;
        isRightContext = null;
        t = new Tween({
          onFirstUpdate: function() {
            return isRightContext = this === t;
          }
        });
        t.setProgress(0);
        t.setProgress(.1);
        return expect(isRightContext).toBe(true);
      });
      return it('should run with custom context', function() {
        var contextObj, isRightContext, t;
        isRightContext = null;
        contextObj = {};
        t = new Tween({
          callbacksContext: contextObj,
          onFirstUpdate: function() {
            return isRightContext = this === contextObj;
          }
        });
        t.setProgress(0);
        t.setProgress(.1);
        return expect(isRightContext).toBe(true);
      });
    });
    describe('onRepeatStart callback ->', function() {
      it('should be defined', function() {
        var t;
        t = new Tween({
          onRepeatStart: function() {}
        });
        return expect(t._props.onRepeatStart).toBeDefined();
      });
      it('should run with right context', function() {
        var isRightContext, t;
        isRightContext = null;
        t = new Tween({
          onRepeatStart: function() {
            return isRightContext = this === t;
          }
        });
        t.setProgress(0);
        t.setProgress(.1);
        return expect(isRightContext).toBe(true);
      });
      return it('should run with custom context', function() {
        var contextObj, isRightContext, t;
        isRightContext = null;
        contextObj = {};
        t = new Tween({
          callbacksContext: contextObj,
          onRepeatStart: function() {
            return isRightContext = this === contextObj;
          }
        });
        t.setProgress(0);
        t.setProgress(.1);
        return expect(isRightContext).toBe(true);
      });
    });
    describe('onRepeatComplete callback ->', function() {
      it('should be defined', function() {
        var t;
        t = new Tween({
          onRepeatComplete: function() {}
        });
        return expect(t._props.onRepeatComplete).toBeDefined();
      });
      it('should run with right context', function() {
        var isRightContext, t;
        isRightContext = null;
        t = new Tween({
          onRepeatComplete: function() {
            return isRightContext = this === t;
          }
        });
        t.setProgress(0);
        t.setProgress(.1);
        t.setProgress(1);
        return expect(isRightContext).toBe(true);
      });
      return it('should run with custom context', function() {
        var contextObj, isRightContext, t;
        isRightContext = null;
        contextObj = {};
        t = new Tween({
          callbacksContext: contextObj,
          onRepeatComplete: function() {
            return isRightContext = this === contextObj;
          }
        });
        t.setProgress(0);
        t.setProgress(.1);
        t.setProgress(1);
        return expect(isRightContext).toBe(true);
      });
    });
    describe('yoyo option ->', function() {
      return it('should receive yoyo option', function() {
        var t;
        t = new Tween({
          yoyo: true
        });
        return expect(t._props.yoyo).toBe(true);
      });
    });
    describe('easing ->', function() {
      it('should parse easing string', function() {
        var t;
        t = new Tween({
          easing: 'Linear.None'
        });
        return expect(typeof t._props.easing).toBe('function');
      });
      it('should parse standart easing', function() {
        var t;
        t = new Tween({
          easing: 'Sin.Out',
          duration: 100
        });
        t._setStartTime();
        t._update(t._props.startTime + 49);
        expect(t.progress).toBe(0);
        expect(t.easedProgress).toBe(void 0);
        t._update(t._props.startTime + 50);
        return expect(t.easedProgress).toBe(easing.sin.out(t.progress));
      });
      it('should work with easing function', function() {
        var easings, t;
        easings = {
          one: function() {
            var a;
            return a = 1;
          }
        };
        t = new Tween({
          easing: easings.one
        });
        return expect(t._props.easing.toString()).toBe(easings.one.toString());
      });
      return it('should work with easing function', function(dfr) {
        var easings, t;
        easings = {
          one: function(k) {
            return k;
          }
        };
        spyOn(easings, 'one');
        t = new Tween({
          easing: easings.one
        });
        t._setStartTime();
        t._update(t._props.startTime + 39);
        t._update(t._props.startTime + 40);
        return setTimeout((function() {
          expect(easings.one).toHaveBeenCalled();
          return dfr();
        }), 50);
      });
    });
    describe('_setProgress method ->', function() {
      it('should set the current progress', function() {
        var t;
        t = new Tween({
          easing: 'Bounce.Out'
        });
        t._setProgress(.75);
        expect(t.progress).toBe(.75);
        return expect(t.easedProgress.toFixed(2)).toBe('0.97');
      });
      it('should set return self', function() {
        var obj, t;
        t = new Tween({
          easing: 'Bounce.Out'
        });
        obj = t._setProgress(.75);
        return expect(obj).toBe(t);
      });
      return it('should save prevYoyo to props', function() {
        var obj, t;
        t = new Tween({
          easing: 'Bounce.Out'
        });
        obj = t._setProgress(.75, 1, true);
        return expect(t._props.wasYoyo).toBe(true);
      });
    });
    describe('_setProp method ->', function() {
      it('should set new timeline options', function() {
        var t;
        t = new Tween({
          duration: 100,
          delay: 0
        });
        t._setProp({
          duration: 1000,
          delay: 200
        });
        expect(t._props.duration).toBe(1000);
        return expect(t._props.delay).toBe(200);
      });
      it('should work with arguments', function() {
        var t;
        t = new Tween({
          duration: 100
        });
        t._setProp('duration', 1000);
        return expect(t._props.duration).toBe(1000);
      });
      it('should call _calcDimentions method', function() {
        var t;
        t = new Tween({
          duration: 100
        });
        spyOn(t, '_calcDimentions');
        t._setProp('duration', 1000);
        return expect(t._calcDimentions).toHaveBeenCalled();
      });
      it('should update the time', function() {
        var t;
        t = new Tween({
          duration: 100,
          delay: 100
        });
        t._setProp('duration', 1000);
        return expect(t._props.time).toBe(1100);
      });
      return it('should parse easing', function() {
        var t;
        t = new Tween({
          duration: 100
        });
        t._setProp('easing', 'elastic.in');
        return expect(t._props.easing).toBe(mojs.easing.elastic["in"]);
      });
    });
    describe('_subPlay method ->', function() {
      describe('_prevTime recalculation ->', function() {
        it('should set _resumeTime', function() {
          var now, t;
          t = new Tween;
          now = performance.now();
          t.play();
          return expect(now - t._playTime).not.toBeGreaterThan(5);
        });
        it('should recalc _prevTime play + play', function(dfr) {
          var t;
          t = new Tween;
          t.play();
          return setTimeout(function() {
            var now, prevTime;
            t.pause();
            now = performance.now();
            t.play().pause();
            prevTime = t._props.startTime + t._progressTime;
            expect(t._prevTime).toBe(prevTime);
            return dfr();
          }, 200);
        });
        it('should recalc _prevTime play + play regarding delay', function(dfr) {
          var delay, t;
          delay = 200;
          t = new Tween({
            delay: delay
          });
          t.play();
          return setTimeout(function() {
            var now, prevTime;
            t.pause();
            now = performance.now();
            t.play().pause();
            prevTime = t._props.startTime + t._progressTime - delay;
            expect(t._prevTime).toBe(prevTime);
            return dfr();
          }, 200);
        });
        it('should recalc _prevTime playBackward + playBackward', function(dfr) {
          var t;
          t = new Tween;
          t.playBackward();
          return setTimeout(function() {
            var now, prevTime;
            t.pause();
            now = performance.now();
            t.playBackward().pause();
            prevTime = t._props.endTime - t._progressTime;
            expect(t._prevTime).toBe(prevTime);
            return dfr();
          }, 200);
        });
        it('should flip _progressTime if changing direction', function(dfr) {
          var t;
          t = new Tween;
          t.play();
          return setTimeout(function() {
            var now, progressTime;
            t.pause();
            now = performance.now();
            progressTime = t._progressTime;
            t.playBackward().pause();
            expect(t._progressTime).toBe(t._props.repeatTime - progressTime);
            return dfr();
          }, 200);
        });
        it('should flip _progressTime if changing direction #pauseless 1', function(dfr) {
          var t;
          t = new Tween;
          t.play();
          return setTimeout(function() {
            var now, progressTime;
            now = performance.now();
            progressTime = t._progressTime;
            t.playBackward().pause();
            expect(t._progressTime).toBe(t._props.repeatTime - progressTime);
            return dfr();
          }, 200);
        });
        it('should flip _progressTime if changing direction', function(dfr) {
          var t;
          t = new Tween;
          t.playBackward();
          return setTimeout(function() {
            var now, progressTime;
            t.pause();
            now = performance.now();
            progressTime = t._progressTime;
            t.play().pause();
            expect(t._progressTime).toBe(t._props.repeatTime - progressTime);
            return dfr();
          }, 200);
        });
        return it('should flip _progressTime if changing direction #pauseless 2', function(dfr) {
          var t;
          t = new Tween;
          t.playBackward();
          return setTimeout(function() {
            var now, progressTime;
            now = performance.now();
            progressTime = t._progressTime;
            t.play().pause();
            expect(t._progressTime).toBe(t._props.repeatTime - progressTime);
            return dfr();
          }, 200);
        });
      });
      it('should recalc startTime', function(dfr) {
        var duration, shift, t;
        duration = 1000;
        shift = 200;
        t = new Tween({
          duration: duration
        });
        t.play();
        return setTimeout(function() {
          var startTime;
          t.pause();
          startTime = performance.now() - Math.abs(shift) - t._progressTime;
          spyOn(t, '_setStartTime');
          t.play(shift);
          expect(Math.abs(startTime - t._setStartTime.calls.argsFor(0)[0])).not.toBeGreaterThan(5);
          return dfr();
        }, duration / 2);
      });
      it('should pass false as second param to _setStartTime', function(dfr) {
        var duration, shift, t;
        duration = 1000;
        shift = 200;
        t = new Tween({
          duration: duration
        });
        t.play();
        return setTimeout(function() {
          var startTime;
          t.pause();
          startTime = performance.now() - Math.abs(shift) - t._progressTime;
          spyOn(t, '_setStartTime');
          t.play(shift);
          expect(t._setStartTime.calls.argsFor(0)[1]).toBe(false);
          return dfr();
        }, duration / 2);
      });
      return it('should recalc startTime regarding speed', function(dfr) {
        var duration, shift, speed, t;
        duration = 1000;
        shift = 200;
        speed = .5;
        t = new Tween({
          duration: duration,
          speed: speed
        });
        t.play();
        return setTimeout(function() {
          var startTime;
          t.pause();
          startTime = performance.now() - Math.abs(shift) - t._progressTime;
          spyOn(t, '_setStartTime');
          t.play(shift);
          expect(Math.abs(startTime - t._setStartTime.calls.argsFor(0)[0])).not.toBeGreaterThan(5);
          return dfr();
        }, duration / 2);
      });
    });
    describe('play method ->', function() {
      it('should get the start time', function() {
        var p, t;
        t = new Tween;
        t.play();
        p = t._props;
        expect(p.startTime).toBeDefined();
        return expect(p.endTime).toBe(p.startTime + p.repeatTime);
      });
      it('should set _state to "play"', function() {
        var t;
        t = new Tween;
        t.play();
        return expect(t._state).toBe('play');
      });
      it('should reset _progressTime to 0 if tween ended', function() {
        var t, time;
        t = new Tween;
        t._setStartTime();
        time = t._props.startTime;
        t.setProgress(1).play();
        return expect(Math.abs(time - t._props.startTime)).not.toBeGreaterThan(5);
      });
      it('should reset isReversed to false', function() {
        var t;
        t = new Tween;
        t._props.isReversed = true;
        t.play();
        return expect(t._props.isReversed).toBe(false);
      });
      it('should call the setStartTime method', function() {
        var t;
        t = new Tween;
        spyOn(t, '_setStartTime');
        t.play();
        return expect(t._setStartTime).toHaveBeenCalled();
      });
      it('should add itself to tweener', function() {
        var t;
        t = new Tween;
        spyOn(tweener, 'add');
        t.play();
        return expect(tweener.add).toHaveBeenCalled();
      });
      it('should receive progress time', function() {
        var shift, startTime, t, time;
        t = new Tween;
        t._setStartTime();
        time = t._props.startTime;
        shift = 200;
        t.play(shift);
        startTime = time - shift;
        return expect(startTime - t._props.startTime).not.toBeGreaterThan(5);
      });
      it('should treat negative progress time as positive', function() {
        var shift, t, time;
        t = new Tween;
        t._setStartTime();
        time = t._props.startTime;
        shift = -200;
        t.play(shift);
        return expect(Math.abs(t._props.startTime - (time - Math.abs(shift)))).not.toBeGreaterThan(5);
      });
      it('should encount time progress', function() {
        var duration, progress, start, t;
        duration = 1000;
        t = new Tween({
          duration: duration
        });
        progress = .5;
        t.setProgress(progress - .1);
        t.setProgress(progress);
        t.play();
        start = performance.now() - progress * t._props.repeatTime;
        return expect(Math.abs(t._props.startTime - start)).not.toBeGreaterThan(5);
      });
      it('should return immediately if already playing', function() {
        var t;
        t = new Tween({
          duration: 1000
        });
        t.play();
        spyOn(t, '_subPlay');
        t.play();
        return expect(t._subPlay).not.toHaveBeenCalled();
      });
      it('should run if already playing but ended', function(dfr) {
        var duration, t;
        duration = 50;
        t = new Tween({
          duration: duration
        });
        t.play();
        return setTimeout(function() {
          spyOn(t, '_subPlay');
          t.play();
          expect(t._subPlay).toHaveBeenCalled();
          return dfr();
        }, 2 * duration);
      });
      return it('should call _subPlay with "play" string', function() {
        var duration, t;
        duration = 50;
        t = new Tween({
          duration: duration
        });
        spyOn(t, '_subPlay');
        t.play();
        return expect(t._subPlay).toHaveBeenCalledWith(0, 'play');
      });
    });
    describe('reverse method ->', function() {
      it('should set _state to "reverse"', function() {
        var t;
        t = new Tween;
        t.playBackward();
        return expect(t._state).toBe('reverse');
      });
      it('should return self', function() {
        var obj, t;
        t = new Tween;
        obj = t.playBackward(200);
        return expect(obj).toBe(t);
      });
      it('should overwrite play state', function() {
        var t;
        t = new Tween;
        t.playBackward(200);
        expect(t._prevState).toBe('stop');
        return expect(t._state).toBe('reverse');
      });
      it('should recalc _progressTime', function() {
        var duration, progress, t;
        duration = 1000;
        t = new Tween({
          duration: duration
        });
        t.setProgress(.75);
        progress = t._progressTime;
        t.playBackward();
        return expect(t._progressTime).toBe(progress);
      });
      it('should recalc _progressTime if previous state was "play"', function() {
        var duration, progress, t;
        duration = 1000;
        t = new Tween({
          duration: duration
        });
        t.setProgress(.75);
        progress = t._progressTime;
        t.play().playBackward();
        return expect(t._progressTime).toBe(t._props.repeatTime - progress);
      });
      it('should return immediately if already reversing', function() {
        var t;
        t = new Tween({
          duration: 1000
        });
        t.playBackward();
        spyOn(t, '_subPlay');
        t.playBackward();
        return expect(t._subPlay).not.toHaveBeenCalled();
      });
      it('should run if already reversing but ended', function(dfr) {
        var duration, t;
        duration = 50;
        t = new Tween({
          duration: duration
        });
        t.playBackward();
        return setTimeout(function() {
          spyOn(t, '_subPlay');
          t.playBackward();
          expect(t._subPlay).toHaveBeenCalled();
          return dfr();
        }, 2 * duration);
      });
      return it('should call _subPlay with "reverse" string', function() {
        var duration, t;
        duration = 50;
        t = new Tween({
          duration: duration
        });
        spyOn(t, '_subPlay');
        t.playBackward();
        return expect(t._subPlay).toHaveBeenCalledWith(0, 'reverse');
      });
    });
    describe('stop method', function() {
      it('should call removeFromTweener method with self', function() {
        var timeline;
        tweener.removeAll();
        timeline = new Tween({
          duration: 2000
        });
        timeline.play();
        spyOn(timeline, '_removeFromTweener');
        timeline.stop();
        return expect(timeline._removeFromTweener).toHaveBeenCalled();
      });
      it('should reset progress to 0 if played', function() {
        var tw;
        tweener.removeAll();
        tw = new Tween({
          duration: 2000
        });
        tw.play();
        spyOn(tw, 'setProgress');
        tw.stop();
        return expect(tw.setProgress).toHaveBeenCalledWith(0);
      });
      it('should reset progress to 1 if playedBackward', function() {
        var tw;
        tweener.removeAll();
        tw = new Tween({
          duration: 2000
        });
        tw.playBackward();
        spyOn(tw, 'setProgress');
        tw.stop();
        return expect(tw.setProgress).toHaveBeenCalledWith(1);
      });
      it('should receive progress to set', function() {
        var tw;
        tweener.removeAll();
        tw = new Tween({
          duration: 2000
        });
        tw.playBackward();
        spyOn(tw, 'setProgress');
        tw.stop(.5);
        return expect(tw.setProgress).toHaveBeenCalledWith(.5);
      });
      it('should reset _prevTime to null', function() {
        var tw;
        tweener.removeAll();
        tw = new Tween({
          duration: 2000
        });
        tw.play();
        tw.stop();
        return expect(tw._prevTime).toBe(null);
      });
      it('should set _state to "stop"', function() {
        var t;
        t = new Tween;
        t.stop();
        return expect(t._state).toBe('stop');
      });
      it('should set isReversed to false', function() {
        var t;
        t = new Tween;
        t._props.isReversed = true;
        t.play().stop();
        return expect(t._props.isReversed).toBe(false);
      });
      return it('should return immediately if already stopped', function() {
        var t;
        t = new Tween;
        t.stop();
        t._props.isReversed = true;
        t.stop();
        return expect(t._props.isReversed).toBe(true);
      });
    });
    describe('pause method ->', function() {
      it('should call t.remove method with self', function() {
        var timeline;
        tweener.removeAll();
        timeline = new Tween({
          duration: 2000
        });
        timeline.play();
        spyOn(timeline, '_removeFromTweener');
        timeline.pause();
        return expect(timeline._removeFromTweener).toHaveBeenCalled();
      });
      return it('should set _state to "pause"', function() {
        var t;
        t = new Tween;
        return t.pause();
      });
    });
    describe('_setPlaybackState method ->', function() {
      it('should set playback state', function() {
        var t;
        t = new Tween;
        t._setPlaybackState('play');
        return expect(t._state).toBe('play');
      });
      return it('should track previous playback state', function() {
        var t;
        t = new Tween;
        t._setPlaybackState('play');
        t._setPlaybackState('pause');
        expect(t._prevState).toBe('play');
        return expect(t._state).toBe('pause');
      });
    });
    describe('_removeFromTweener method ->', function() {
      return it('should call tweener.remove method with self', function() {
        var timeline;
        tweener.removeAll();
        timeline = new Tween({
          duration: 2000
        });
        timeline.play();
        timeline._removeFromTweener();
        return expect(tweener.tweens.length).toBe(0);
      });
    });
    describe('_complete method ->', function() {
      it('should call onComplete callback', function() {
        var fun, isCalled, tw;
        isCalled = null;
        fun = function() {
          return isCalled = true;
        };
        tw = new Tween({
          onComplete: fun
        });
        tw._complete();
        return expect(isCalled).toBe(true);
      });
      it('should set isCompleted to true', function() {
        var tw;
        tw = new Tween;
        tw._complete();
        return expect(tw._isCompleted).toBe(true);
      });
      it('should set isStarted flag to false', function() {
        var tw;
        tw = new Tween;
        tw._complete();
        return expect(tw._isStarted).toBe(false);
      });
      return it('should set isFirstUpdate flag to false', function() {
        var tw;
        tw = new Tween;
        tw._complete();
        return expect(tw._isFirstUpdate).toBe(false);
      });
    });
    describe('_start method ->', function() {
      it('should call onStart callback', function() {
        var fun, isCalled, tw;
        isCalled = null;
        fun = function() {
          return isCalled = true;
        };
        tw = new Tween({
          onStart: fun
        });
        tw._start();
        return expect(isCalled).toBe(true);
      });
      it('should set isStarted to true', function() {
        var tw;
        tw = new Tween;
        tw._start();
        return expect(tw._isStarted).toBe(true);
      });
      it('should set isCompleted flag to false', function() {
        var tw;
        tw = new Tween;
        tw._start();
        return expect(tw._isCompleted).toBe(false);
      });
      return it('should be called just once', function() {
        var tw;
        tw = new Tween;
        tw._start();
        tw._isCompleted = true;
        tw._start();
        return expect(tw._isCompleted).toBe(true);
      });
    });
    describe('_repeatComplete method ->', function() {
      it('should call onRepeatComplete callback', function() {
        var fun, isCalled, tw;
        isCalled = null;
        fun = function() {
          return isCalled = true;
        };
        tw = new Tween({
          onRepeatComplete: fun
        });
        tw._repeatComplete();
        return expect(isCalled).toBe(true);
      });
      it('should call onRepeatComplete callback only once', function() {
        var cnt, fun, tw;
        cnt = 0;
        fun = function() {
          return cnt++;
        };
        tw = new Tween({
          onRepeatComplete: fun
        });
        tw._repeatComplete();
        tw._repeatComplete();
        return expect(cnt).toBe(1);
      });
      return it('should set isRepeatCompleted to true', function() {
        var tw;
        tw = new Tween;
        tw._repeatComplete();
        return expect(tw._isRepeatCompleted).toBe(true);
      });
    });
    describe('_repeatStart method ->', function() {
      it('should call onRepeatStart callback', function() {
        var fun, isCalled, tw;
        isCalled = null;
        fun = function() {
          return isCalled = true;
        };
        tw = new Tween({
          onRepeatStart: fun
        });
        tw._repeatStart();
        return expect(isCalled).toBe(true);
      });
      it('should call onRepeatStart callback only once', function() {
        var cnt, fun, tw;
        cnt = 0;
        fun = function() {
          return cnt++;
        };
        tw = new Tween({
          onRepeatStart: fun
        });
        tw._repeatStart();
        tw._repeatStart();
        return expect(cnt).toBe(1);
      });
      return it('should set isRepeatStart to true', function() {
        var tw;
        tw = new Tween;
        tw._repeatStart();
        return expect(tw._isRepeatStart).toBe(true);
      });
    });
    describe('_firstUpdate method ->', function() {
      it('should call onFirstUpdate callback', function() {
        var fun, isCalled, tw;
        isCalled = null;
        fun = function() {
          return isCalled = true;
        };
        tw = new Tween({
          onFirstUpdate: fun
        });
        tw._firstUpdate();
        return expect(isCalled).toBe(true);
      });
      return it('should call onFirstUpdate callback only once', function() {
        var cnt, fun, tw;
        cnt = 0;
        fun = function() {
          return cnt++;
        };
        tw = new Tween({
          onFirstUpdate: fun
        });
        tw._firstUpdate();
        tw._firstUpdate();
        return expect(cnt).toBe(1);
      });
    });
    describe('callbacks order || forward ->', function() {
      it('should have the right order when normal direction || start', function() {
        var order, tw;
        order = [];
        tw = new Tween({
          onStart: function() {
            return order.push('start');
          },
          onRepeatStart: function() {
            return order.push('repeat-start');
          },
          onFirstUpdate: function() {
            return order.push('first-update');
          },
          onUpdate: function() {
            return order.push('update');
          },
          onRepeatComplete: function() {
            return order.push('repeat-complete');
          },
          onComplete: function() {
            return order.push('complete');
          }
        });
        tw._setStartTime();
        tw._update(tw._props.startTime);
        tw._update(tw._props.startTime + 10);
        expect(order[0]).toBe('start');
        expect(order[1]).toBe('repeat-start');
        expect(order[2]).toBe('first-update');
        expect(order[3]).toBe('update');
        return expect(order[4]).toBe(void 0);
      });
      it('should have the right order when normal direction || start #2', function() {
        var duration, isReact, order, tw;
        order = [];
        isReact = false;
        duration = 500;
        tw = new Tween({
          duration: duration,
          onStart: function() {
            return isReact && order.push('start');
          },
          onRepeatStart: function() {
            return isReact && order.push('repeat-start');
          },
          onFirstUpdate: function() {
            return isReact && order.push('first-update');
          },
          onUpdate: function() {
            return isReact && order.push('update');
          },
          onRepeatComplete: function() {
            return isReact && order.push('repeat-complete');
          },
          onComplete: function() {
            return isReact && order.push('complete');
          }
        });
        tw._setStartTime();
        tw._update(tw._props.startTime);
        tw._update(tw._props.startTime + duration / 2);
        tw._update(tw._props.startTime + duration / 2 + 10);
        tw._update(tw._props.startTime + duration / 2 - 10);
        tw._update(tw._props.startTime);
        isReact = true;
        tw._update(tw._props.startTime + duration / 2);
        expect(order[0]).toBe('start');
        expect(order[1]).toBe('repeat-start');
        expect(order[2]).toBe('first-update');
        return expect(order[3]).toBe('update');
      });
      it('should have the right order when normal direction || end', function() {
        var duration, order, tw;
        order = [];
        duration = 500;
        tw = new Tween({
          duration: duration,
          onStart: function() {
            return order.push('start');
          },
          onRepeatStart: function() {
            return order.push('repeat-start');
          },
          onFirstUpdate: function() {
            return order.push('first-update');
          },
          onUpdate: function() {
            return order.push('update');
          },
          onRepeatComplete: function() {
            return order.push('repeat-complete');
          },
          onComplete: function() {
            return order.push('complete');
          }
        });
        tw._setStartTime();
        tw._update(tw._props.startTime + 10);
        tw._update(tw._props.startTime + duration / 2);
        tw._update(tw._props.startTime + duration);
        expect(order[0]).toBe('start');
        expect(order[1]).toBe('repeat-start');
        expect(order[2]).toBe('first-update');
        expect(order[3]).toBe('update');
        expect(order[4]).toBe('update');
        expect(order[5]).toBe('repeat-complete');
        expect(order[6]).toBe('complete');
        return expect(order[7]).toBe(void 0);
      });
      it('should have the right order when normal direction || repeat end', function() {
        var duration, order, tw;
        order = [];
        duration = 500;
        tw = new Tween({
          repeat: 1,
          duration: duration,
          onStart: function() {
            return order.push('start');
          },
          onRepeatStart: function() {
            return order.push('repeat-start');
          },
          onFirstUpdate: function() {
            return order.push('first-update');
          },
          onUpdate: function() {
            return order.push('update');
          },
          onRepeatComplete: function() {
            return order.push('repeat-complete');
          },
          onComplete: function() {
            return order.push('complete');
          }
        });
        tw._setStartTime();
        tw._update(tw._props.startTime + 10);
        tw._update(tw._props.startTime + duration / 2);
        tw._update(tw._props.startTime + duration + 10);
        tw._update(tw._props.startTime + duration + duration / 2);
        tw._update(tw._props.startTime + duration + duration);
        expect(order[0]).toBe('start');
        expect(order[1]).toBe('repeat-start');
        expect(order[2]).toBe('first-update');
        expect(order[3]).toBe('update');
        expect(order[4]).toBe('repeat-complete');
        expect(order[5]).toBe('repeat-start');
        expect(order[6]).toBe('update');
        expect(order[7]).toBe('update');
        expect(order[8]).toBe('update');
        expect(order[9]).toBe('repeat-complete');
        expect(order[10]).toBe('complete');
        return expect(order[11]).toBe(void 0);
      });
      return it('should have the right order when normal direction || end + delay', function() {
        var delay, duration, order, tw;
        order = [];
        duration = 500;
        delay = 200;
        tw = new Tween({
          repeat: 1,
          duration: duration,
          delay: delay,
          onStart: function() {
            return order.push('start');
          },
          onRepeatStart: function() {
            return order.push('repeat-start');
          },
          onFirstUpdate: function() {
            return order.push('first-update');
          },
          onUpdate: function() {
            return order.push('update');
          },
          onRepeatComplete: function() {
            return order.push('repeat-complete');
          },
          onComplete: function() {
            return order.push('complete');
          }
        });
        tw._setStartTime();
        tw._update(tw._props.startTime + 10);
        tw._update(tw._props.startTime + duration / 2);
        tw._update(tw._props.startTime + duration + delay / 2);
        tw._update(tw._props.startTime + duration + delay + 10);
        tw._update(tw._props.startTime + duration + delay + duration / 2);
        tw._update(tw._props.startTime + duration + delay + duration);
        expect(order[0]).toBe('start');
        expect(order[1]).toBe('repeat-start');
        expect(order[2]).toBe('first-update');
        expect(order[3]).toBe('update');
        expect(order[4]).toBe('update');
        expect(order[5]).toBe('repeat-complete');
        expect(order[6]).toBe('repeat-start');
        expect(order[7]).toBe('update');
        expect(order[8]).toBe('update');
        expect(order[9]).toBe('update');
        expect(order[10]).toBe('repeat-complete');
        expect(order[11]).toBe('complete');
        return expect(order[12]).toBe(void 0);
      });
    });
    describe('callbacks order || backward ->', function() {
      it('should have the right order when reverse direction || start', function() {
        var duration, order, tw;
        order = [];
        duration = 500;
        tw = new Tween({
          duration: duration,
          onStart: function() {
            return order.push('start');
          },
          onRepeatStart: function() {
            return order.push('repeat-start');
          },
          onFirstUpdate: function() {
            return order.push('first-update');
          },
          onUpdate: function() {
            return order.push('update');
          },
          onRepeatComplete: function() {
            return order.push('repeat-complete');
          },
          onComplete: function() {
            return order.push('complete');
          }
        });
        tw._setStartTime();
        tw._update(tw._props.startTime + duration - duration / 4);
        tw._update(tw._props.startTime + duration / 2);
        expect(order[0]).toBe('complete');
        expect(order[1]).toBe('repeat-complete');
        expect(order[2]).toBe('first-update');
        expect(order[3]).toBe('update');
        return expect(order[4]).toBe(void 0);
      });
      it('should have the right order when reverse direction || end', function() {
        var duration, order, tw;
        order = [];
        duration = 500;
        tw = new Tween({
          duration: duration,
          onStart: function() {
            return order.push('start');
          },
          onRepeatStart: function() {
            return order.push('repeat-start');
          },
          onFirstUpdate: function() {
            return order.push('first-update');
          },
          onUpdate: function() {
            return order.push('update');
          },
          onRepeatComplete: function() {
            return order.push('repeat-complete');
          },
          onComplete: function() {
            return order.push('complete');
          }
        });
        tw._setStartTime();
        tw._update(tw._props.startTime + duration);
        tw._update(tw._props.startTime + duration / 2);
        tw._update(tw._props.startTime + 10);
        tw._update(tw._props.startTime);
        expect(order[0]).toBe('complete');
        expect(order[1]).toBe('repeat-complete');
        expect(order[2]).toBe('first-update');
        expect(order[3]).toBe('update');
        expect(order[4]).toBe('update');
        expect(order[5]).toBe('update');
        expect(order[6]).toBe('repeat-start');
        expect(order[7]).toBe('start');
        return expect(order[8]).toBe(void 0);
      });
      it('should have the right order when reverse direction || repeat end', function() {
        var duration, order, tw;
        order = [];
        duration = 500;
        tw = new Tween({
          repeat: 1,
          duration: duration,
          onStart: function() {
            return order.push('start');
          },
          onRepeatStart: function() {
            return order.push('repeat-start');
          },
          onFirstUpdate: function() {
            return order.push('first-update');
          },
          onUpdate: function() {
            return order.push('update');
          },
          onRepeatComplete: function() {
            return order.push('repeat-complete');
          },
          onComplete: function() {
            return order.push('complete');
          }
        });
        tw._setStartTime();
        tw._update(tw._props.startTime + duration + duration);
        tw._update(tw._props.startTime + duration + duration / 2);
        tw._update(tw._props.startTime + duration + 10);
        tw._update(tw._props.startTime + duration / 2);
        tw._update(tw._props.startTime + 10);
        tw._update(tw._props.startTime);
        expect(order[0]).toBe('complete');
        expect(order[1]).toBe('repeat-complete');
        expect(order[2]).toBe('first-update');
        expect(order[3]).toBe('update');
        expect(order[4]).toBe('update');
        expect(order[5]).toBe('repeat-start');
        expect(order[6]).toBe('repeat-complete');
        expect(order[7]).toBe('update');
        expect(order[8]).toBe('update');
        expect(order[9]).toBe('update');
        expect(order[10]).toBe('repeat-start');
        expect(order[11]).toBe('start');
        return expect(order[12]).toBe(void 0);
      });
      it('should have the right order when reverse direction || end + delay', function() {
        var delay, duration, order, tw;
        order = [];
        duration = 500;
        delay = 200;
        tw = new Tween({
          repeat: 1,
          duration: duration,
          delay: delay,
          onStart: function() {
            return order.push('start');
          },
          onRepeatStart: function() {
            return order.push('repeat-start');
          },
          onFirstUpdate: function() {
            return order.push('first-update');
          },
          onUpdate: function() {
            return order.push('update');
          },
          onRepeatComplete: function() {
            return order.push('repeat-complete');
          },
          onComplete: function() {
            return order.push('complete');
          }
        });
        tw._setStartTime();
        tw._update(tw._props.startTime + duration + delay + duration);
        tw._update(tw._props.startTime + duration + delay + duration / 2);
        tw._update(tw._props.startTime + duration + delay + 10);
        tw._update(tw._props.startTime + duration + delay / 2);
        tw._update(tw._props.startTime + duration / 2);
        tw._update(tw._props.startTime + 10);
        tw._update(tw._props.startTime);
        expect(order[0]).toBe('complete');
        expect(order[1]).toBe('repeat-complete');
        expect(order[2]).toBe('first-update');
        expect(order[3]).toBe('update');
        expect(order[4]).toBe('update');
        expect(order[5]).toBe('update');
        expect(order[6]).toBe('repeat-start');
        expect(order[7]).toBe('repeat-complete');
        expect(order[8]).toBe('update');
        expect(order[9]).toBe('update');
        expect(order[10]).toBe('update');
        expect(order[11]).toBe('repeat-start');
        expect(order[12]).toBe('start');
        return expect(order[13]).toBe(void 0);
      });
      it('should have the right order when reverse direction || end + delay #2', function() {
        var delay, duration, order, tw;
        order = [];
        duration = 500;
        delay = 200;
        tw = new Tween({
          repeat: 1,
          duration: duration,
          delay: delay,
          onStart: function() {
            return order.push('start');
          },
          onRepeatStart: function() {
            return order.push('repeat-start');
          },
          onFirstUpdate: function() {
            return order.push('first-update');
          },
          onUpdate: function() {
            return order.push('update');
          },
          onRepeatComplete: function() {
            return order.push('repeat-complete');
          },
          onComplete: function() {
            return order.push('complete');
          }
        });
        tw._setStartTime();
        tw._update(tw._props.startTime + duration + delay + duration);
        tw._update(tw._props.startTime + duration + delay + duration / 2);
        tw._update(tw._props.startTime + duration + delay + 10);
        tw._update(tw._props.startTime + duration + delay / 2);
        tw._update(tw._props.startTime + duration / 2);
        tw._update(tw._props.startTime + 10);
        tw._update(tw._props.startTime - 10);
        expect(order[0]).toBe('complete');
        expect(order[1]).toBe('repeat-complete');
        expect(order[2]).toBe('first-update');
        expect(order[3]).toBe('update');
        expect(order[4]).toBe('update');
        expect(order[5]).toBe('update');
        expect(order[6]).toBe('repeat-start');
        expect(order[7]).toBe('repeat-complete');
        expect(order[8]).toBe('update');
        expect(order[9]).toBe('update');
        expect(order[10]).toBe('update');
        expect(order[11]).toBe('repeat-start');
        expect(order[12]).toBe('start');
        return expect(order[13]).toBe(void 0);
      });
      return it('should have the right order when reverse direction || end + delay #3', function() {
        var delay, duration, isReact, order, tw;
        order = [];
        duration = 500;
        delay = 200;
        isReact = false;
        tw = new Tween({
          repeat: 1,
          duration: duration,
          delay: delay,
          onStart: function() {
            return isReact && order.push('start');
          },
          onRepeatStart: function() {
            return isReact && order.push('repeat-start');
          },
          onFirstUpdate: function() {
            return isReact && order.push('first-update');
          },
          onUpdate: function() {
            return isReact && order.push('update');
          },
          onRepeatComplete: function() {
            return isReact && order.push('repeat-complete');
          },
          onComplete: function() {
            return isReact && order.push('complete');
          }
        });
        tw._setStartTime();
        tw._update(tw._props.startTime);
        tw._update(tw._props.startTime + duration / 2);
        tw._update(tw._props.startTime + duration);
        tw._update(tw._props.startTime + duration + delay);
        tw._update(tw._props.startTime + duration + delay + duration / 2);
        tw._update(tw._props.startTime + duration + delay + duration + 10);
        isReact = true;
        tw._update(tw._props.startTime + duration + delay + duration / 2);
        tw._update(tw._props.startTime + duration + delay + 10);
        tw._update(tw._props.startTime + duration + delay / 2);
        tw._update(tw._props.startTime + duration / 2);
        tw._update(tw._props.startTime + 10);
        tw._update(tw._props.startTime - 10);
        expect(order[0]).toBe('complete');
        expect(order[1]).toBe('repeat-complete');
        expect(order[2]).toBe('first-update');
        expect(order[3]).toBe('update');
        expect(order[4]).toBe('update');
        expect(order[5]).toBe('update');
        expect(order[6]).toBe('repeat-start');
        expect(order[7]).toBe('repeat-complete');
        expect(order[8]).toBe('update');
        expect(order[9]).toBe('update');
        expect(order[10]).toBe('update');
        expect(order[11]).toBe('repeat-start');
        expect(order[12]).toBe('start');
        return expect(order[13]).toBe(void 0);
      });
    });
    it('should have the right order when reverse direction || end + delay #3', function() {
      var delay, duration, isReact, order, tw;
      order = [];
      duration = 500;
      delay = 200;
      isReact = false;
      tw = new Tween({
        duration: duration,
        onStart: function() {
          return isReact && order.push('start');
        },
        onRepeatStart: function() {
          return isReact && order.push('repeat-start');
        },
        onFirstUpdate: function() {
          return isReact && order.push('first-update');
        },
        onUpdate: function() {
          return isReact && order.push('update');
        },
        onRepeatComplete: function() {
          return isReact && order.push('repeat-complete');
        },
        onComplete: function() {
          return isReact && order.push('complete');
        }
      });
      tw._setStartTime();
      tw._update(tw._props.startTime);
      tw._update(tw._props.startTime + duration / 2);
      tw._update(tw._props.startTime + duration);
      isReact = true;
      tw._update(tw._props.startTime + duration / 2);
      tw._update(tw._props.startTime - 10);
      expect(order[0]).toBe('complete');
      expect(order[1]).toBe('repeat-complete');
      expect(order[2]).toBe('first-update');
      expect(order[3]).toBe('update');
      expect(order[4]).toBe('update');
      expect(order[5]).toBe('repeat-start');
      expect(order[6]).toBe('start');
      return expect(order[7]).toBe(void 0);
    });
    describe('negative delay', function() {
      it('should save negative delay to _negativeShift property', function() {
        var tw;
        tw = new Tween({
          delay: -200
        });
        return expect(tw._negativeShift).toBe(-200);
      });
      it('should set negative delay to 0', function() {
        var tw;
        tw = new Tween({
          delay: -200
        });
        expect(tw._negativeShift).toBe(-200);
        return expect(tw._props.delay).toBe(0);
      });
      return it('should calculate startTime regarding negative delay', function() {
        var delay, time, tw;
        delay = -200;
        tw = new Tween({
          delay: delay
        });
        time = performance.now();
        tw._setStartTime(time);
        return expect(tw._props.startTime).toBe(time - 200);
      });
    });
    describe('setProgress method ->', function() {
      it('should call _setStartTime if there is no this._props.startTime', function() {
        var t;
        t = new Tween;
        spyOn(t, '_setStartTime');
        t.setProgress(.5);
        return expect(t._setStartTime).toHaveBeenCalled();
      });
      it('should return self', function() {
        var result, t;
        t = new Tween;
        result = t.setProgress(.5);
        return expect(result).toBe(t);
      });
      it('should call self _update', function() {
        var duration, progress, t;
        duration = 500;
        progress = .75;
        t = new Tween({
          duration: duration
        });
        spyOn(t, '_update');
        t.setProgress(progress);
        return expect(t._update).toHaveBeenCalledWith(t._props.startTime + (progress * duration));
      });
      it('should not set the progress less then 0', function() {
        var delay, t;
        delay = 5000;
        t = new Tween({
          delay: delay
        });
        spyOn(t, '_update');
        t.setProgress(-1.5);
        return expect(t._update).toHaveBeenCalledWith(t._props.startTime - delay);
      });
      it('should not set the progress more then 1', function() {
        var delay, t;
        delay = 200;
        t = new Tween({
          delay: delay
        });
        spyOn(t, '_update');
        t.setProgress(1.5);
        return expect(t._update).toHaveBeenCalledWith((t._props.startTime - delay) + t._props.repeatTime);
      });
      return it('should set _playTime to null', function() {
        var delay, t;
        delay = 200;
        t = new Tween({
          delay: delay
        });
        t.play().pause();
        t.setProgress(.5);
        return expect(t._playTime).toBe(null);
      });
    });
    describe('onComplete callback ->', function() {
      it('should be called just once when finished and inside Timeline ->', function() {
        var completeCnt, completeDirection, debug, duration, firstUpdateCnt, firstUpdateDirection, oneCnt, repeatCnt, repeatCompleteDirection, repeatStartCnt, repeatStartDirection, startCnt, startDirection, tm, tw, updateDirection, updateValue, zeroCnt;
        zeroCnt = 0;
        oneCnt = 0;
        startCnt = 0;
        completeCnt = 0;
        repeatCnt = 0;
        repeatStartCnt = 0;
        firstUpdateCnt = 0;
        firstUpdateDirection = null;
        startDirection = null;
        completeDirection = null;
        repeatStartDirection = null;
        repeatCompleteDirection = null;
        duration = 50;
        updateValue = null;
        updateDirection = null;
        debug = false;
        tm = new Timeline;
        tw = new Tween({
          duration: duration,
          onUpdate: function(p, ep, isForward) {
            debug && console.log("ONUPDATE " + p);
            updateDirection = isForward;
            updateValue = p;
            (p === 0) && zeroCnt++;
            return (p === 1) && oneCnt++;
          },
          onRepeatComplete: function(isForward) {
            debug && console.log("REPEAT COMPLETE " + isForward);
            repeatCompleteDirection = isForward;
            return repeatCnt++;
          },
          onRepeatStart: function(isForward) {
            debug && console.log("REPEAT START " + isForward);
            repeatStartDirection = isForward;
            return repeatStartCnt++;
          },
          onStart: function(isForward) {
            debug && console.log("START " + isForward);
            startDirection = isForward;
            return startCnt++;
          },
          onComplete: function(isForward) {
            debug && console.log("COMPLETE " + isForward);
            completeDirection = isForward;
            return completeCnt++;
          },
          onFirstUpdate: function(isForward) {
            debug && console.log("FIRST UPDATE " + isForward);
            firstUpdateDirection = isForward;
            return firstUpdateCnt++;
          }
        });
        tm.add(tw);
        tm.setProgress(0);
        tm.setProgress(.5);
        tm.setProgress(.9);
        tm.setProgress(1);
        tm.setProgress(.9);
        tm.setProgress(.8);
        return expect(completeCnt).toBe(2);
      });
      it('should run with right context', function() {
        var isRightContext, t;
        isRightContext = null;
        t = new Tween({
          onComplete: function() {
            return isRightContext = this === t;
          }
        });
        t.setProgress(0);
        t.setProgress(.1);
        t.setProgress(1);
        return expect(isRightContext).toBe(true);
      });
      return it('should run with custom context', function() {
        var contextObj, isRightContext, t;
        isRightContext = null;
        contextObj = {};
        t = new Tween({
          callbacksContext: contextObj,
          onComplete: function() {
            return isRightContext = this === contextObj;
          }
        });
        t.setProgress(0);
        t.setProgress(.1);
        t.setProgress(1);
        return expect(isRightContext).toBe(true);
      });
    });
    describe('_progress method ->', function() {
      return it('should call onProgress callback', function() {
        var duration, time, tw;
        duration = 1000;
        tw = new Tween({
          duration: duration,
          onProgress: function() {}
        });
        spyOn(tw._props, 'onProgress');
        tw._setStartTime();
        time = tw._props.startTime + duration / 2;
        tw._prevTime = time - 1;
        tw._progress(.5, time);
        return expect(tw._props.onProgress).toHaveBeenCalledWith(.5, true);
      });
    });
    describe('onProgress callback ->', function() {
      it('should be called with current progress and direction', function() {
        var duration, time, tw;
        duration = 1000;
        tw = new Tween({
          duration: duration,
          onProgress: function() {}
        });
        spyOn(tw, '_progress').and.callThrough();
        spyOn(tw._props, 'onProgress');
        tw._setStartTime();
        time = tw._props.startTime + duration / 2;
        tw._update(time - 1);
        tw._update(time);
        expect(tw._progress).toHaveBeenCalledWith(.5, time);
        return expect(tw._props.onProgress).toHaveBeenCalledWith(.5, true);
      });
      it('should include all delays and repeats', function() {
        var delay, duration, p, repeat, resultProgress, startPoint, time, tw;
        duration = 1000;
        delay = 200;
        repeat = 2;
        tw = new Tween({
          duration: duration,
          delay: delay,
          repeat: repeat,
          onProgress: function() {}
        });
        spyOn(tw, '_progress').and.callThrough();
        spyOn(tw._props, 'onProgress');
        tw._setStartTime();
        time = tw._props.startTime + 2 * (duration + delay) + duration / 2;
        tw._update(time - 1);
        tw._update(time);
        p = tw._props;
        startPoint = p.startTime - p.delay;
        resultProgress = (time - startPoint) / p.repeatTime;
        expect(tw._progress).toHaveBeenCalledWith(resultProgress, time);
        return expect(tw._props.onProgress).toHaveBeenCalledWith(resultProgress, true);
      });
      it('should be called only in active bounds regarding delay "-"', function() {
        var delay, duration, p, startPoint, time, tw;
        duration = 1000;
        delay = 200;
        tw = new Tween({
          duration: duration,
          delay: delay,
          onProgress: function() {}
        });
        tw._setStartTime();
        p = tw._props;
        startPoint = p.startTime - p.delay;
        spyOn(tw, '_progress').and.callThrough();
        spyOn(tw._props, 'onProgress');
        time = p.startTime - delay / 2;
        tw._update(time - 1);
        tw._update(time);
        expect(tw._progress).toHaveBeenCalledWith((delay / 2) / p.repeatTime, time);
        expect(tw._progress.calls.count()).toBe(1);
        return expect(tw._props.onProgress).toHaveBeenCalledWith((delay / 2) / p.repeatTime, true);
      });
      it('should be called only in active bounds "-"', function() {
        var delay, duration, time, tw;
        duration = 1000;
        delay = 200;
        tw = new Tween({
          duration: duration,
          delay: delay,
          onProgress: function() {}
        });
        spyOn(tw, '_progress').and.callThrough();
        spyOn(tw._props, 'onProgress');
        tw._setStartTime();
        time = (tw._props.startTime - delay) - delay / 2;
        tw._update(time - 1);
        tw._update(time);
        expect(tw._progress).not.toHaveBeenCalled();
        return expect(tw._props.onProgress).not.toHaveBeenCalled();
      });
      it('should be called only in active bounds "+"', function() {
        var duration, time, tw;
        duration = 1000;
        tw = new Tween({
          duration: duration,
          onProgress: function() {}
        });
        spyOn(tw, '_progress').and.callThrough();
        spyOn(tw._props, 'onProgress');
        tw._setStartTime();
        time = tw._props.startTime + 2 * duration;
        tw._update(time - 1);
        tw._update(time);
        expect(tw._progress).not.toHaveBeenCalled();
        return expect(tw._props.onProgress).not.toHaveBeenCalled();
      });
      it('should be called only once after active bounds "-"', function() {
        var duration, time, tw;
        duration = 1000;
        tw = new Tween({
          duration: duration,
          onProgress: function() {}
        });
        tw._setStartTime();
        time = tw._props.startTime + duration / 2;
        tw._update(time);
        tw._update(time - 10);
        spyOn(tw, '_progress').and.callThrough();
        spyOn(tw._props, 'onProgress');
        tw._update(time - duration);
        tw._update(time - duration - 10);
        expect(tw._progress).toHaveBeenCalledWith(0, time - duration, false);
        expect(tw._progress.calls.count()).toBe(1);
        expect(tw._props.onProgress).toHaveBeenCalledWith(0, false);
        return expect(tw._props.onProgress.calls.count()).toBe(1);
      });
      it('should be called only once after active bounds "+"', function() {
        var duration, time, tw;
        duration = 1000;
        tw = new Tween({
          duration: duration,
          onProgress: function() {}
        });
        tw._setStartTime();
        time = tw._props.startTime + duration / 2;
        tw._update(time);
        tw._update(time + 10);
        spyOn(tw, '_progress').and.callThrough();
        spyOn(tw._props, 'onProgress');
        tw._update(time + duration);
        tw._update(time + duration + 10);
        expect(tw._progress).toHaveBeenCalledWith(1, time + duration);
        expect(tw._progress.calls.count()).toBe(1);
        expect(tw._props.onProgress).toHaveBeenCalledWith(1, true);
        return expect(tw._props.onProgress.calls.count()).toBe(1);
      });
      it('should run with right context', function() {
        var isRightContext, t;
        isRightContext = null;
        t = new Tween({
          onProgress: function() {
            return isRightContext = this === t;
          }
        });
        t.setProgress(0);
        t.setProgress(.1);
        return expect(isRightContext).toBe(true);
      });
      return it('should run with custom context', function() {
        var contextObj, isRightContext, t;
        isRightContext = null;
        contextObj = {};
        t = new Tween({
          callbacksContext: contextObj,
          onProgress: function() {
            return isRightContext = this === contextObj;
          }
        });
        t.setProgress(0);
        t.setProgress(.1);
        return expect(isRightContext).toBe(true);
      });
    });
    describe('_normPrevTimeForward method', function() {
      return it('should return normalized _prevTimee', function() {
        var duration, p, tw;
        duration = 1000;
        tw = new Tween({
          duration: duration,
          onProgress: function() {}
        });
        tw._setStartTime();
        p = tw._props;
        return expect(tw._normPrevTimeForward()).toBe(p.startTime + tw._progressTime - p.delay);
      });
    });
    describe('playback ->', function() {
      return it('should set state to stop when finished', function(dfr) {
        var duration, t;
        duration = 50;
        t = new Tween({
          duration: duration
        });
        t.play();
        return setTimeout(function() {
          expect(t._state).toBe('stop');
          return dfr();
        }, 2 * duration);
      });
    });
    describe('_onTweenerFinish method', function() {
      return it('should set _state to stop', function(dfr) {
        var duration, tw;
        duration = 50;
        tw = new Tween({
          duration: duration
        });
        tw.play();
        return setTimeout(function() {
          expect(tw._state).toBe('stop');
          expect(tw._prevState).toBe('play');
          return dfr();
        }, 2 * duration);
      });
    });
    return describe('callbacksContext option', function() {
      return it('should receive callbacks context object', function() {
        var obj, tw;
        obj = {};
        tw = new Tween({
          callbacksContext: obj
        });
        return expect(tw._props.callbacksContext).toBe(obj);
      });
    });
  });

}).call(this);
