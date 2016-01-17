(function() {
  var Timeline, Tween, easing, h, tweener;

  Tween = window.mojs.Tween;

  Timeline = window.mojs.Timeline;

  easing = window.mojs.easing;

  h = window.mojs.h;

  tweener = window.mojs.tweener;

  describe('Tween ->', function() {
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
        expect(t._defaults.speed).toBeDefined();
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
      it('should set _playTime', function() {
        var now, t;
        t = new Tween;
        t._setStartTime();
        now = performance.now();
        expect(t._playTime).toBeDefined();
        return expect(Math.abs(t._playTime - now)).not.toBeGreaterThan(10);
      });
      return it('should set _playTime to passed time', function() {
        var now, t;
        t = new Tween;
        now = performance.now() + 50;
        t._setStartTime(now);
        return expect(t._playTime).toBe(now);
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
        t._update(t._props.startTime + 500);
        expect(t.progress).toBeCloseTo(0);
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
        return expect(t._progressTime).toBe(delay + updateTime);
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
      return it('should save _onEdge property || reverse', function() {
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
    });
    return describe('onUpdate callback ->', function() {
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
      it('should be called just once on delay', function() {
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
        expect(updateValue).toBe(0);
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
        expect(updateValue).toBe(1);
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
        expect(updateValue).toBe(1);
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
        expect(updateValue).toBe(0);
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
        expect(updateValue).toBe(1);
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
        expect(updateValue).toBe(0);
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
        expect(updateValue).toBe(1);
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
        expect(updateValue).toBe(1);
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
        expect(updateValue).toBe(1);
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
        expect(updateValue).toBe(1);
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
        expect(updateValue).toBe(1);
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
        expect(updateValue).toBe(1);
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
        expect(updateValue).toBe(0);
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
        expect(updateValue).toBe(0);
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
        expect(updateValue).toBe(0);
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
        expect(updateValue).toBe(0);
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
        expect(updateValue).toBe(0);
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
        expect(updateValue).toBe(0);
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
        expect(updateValue).toBe(0);
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
        expect(updateValue).toBe(0);
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
        expect(updateValue).toBe(0);
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
        expect(updateValue).toBe(0);
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
        expect(updateValue).toBe(0);
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
        expect(updateValue).toBe(0);
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
        expect(updateValue).toBe(0);
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
        expect(updateValue).toBe(0);
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
        expect(updateValue).toBe(0);
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
        expect(updateValue).toBe(1);
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
        expect(updateValue).toBe(0);
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
      return it('should be called with 1 and 0 on each repeat period if missed time || yoyo', function() {
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
          isIt: 1,
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
        return expect(updateYoyo).toBe(false);
      });
    });
  });

}).call(this);
