(function() {
  var Tween, createUpdateInPeriod, createUpdateInPeriodWithGap, easing, h, r_createUpdateInPeriod, r_createUpdateInPeriodWithGap, tweener;

  Tween = window.mojs.Tween;

  easing = window.mojs.easing;

  h = window.mojs.h;

  tweener = window.mojs.tweener;

  createUpdateInPeriod = function(t, duration) {
    return function(timeShift) {
      t._update(t._props.startTime + timeShift);
      t._update(t._props.startTime + timeShift + (duration / 2));
      return t._update(t._props.startTime + timeShift + duration);
    };
  };

  createUpdateInPeriodWithGap = function(t, duration, gap) {
    if (gap == null) {
      gap = 5;
    }
    return function(timeShift) {
      t._update(t._props.startTime + timeShift + gap);
      t._update(t._props.startTime + timeShift + (duration / 2));
      return t._update(t._props.startTime + timeShift + duration - gap);
    };
  };

  r_createUpdateInPeriod = function(t, duration) {
    return function(timeShift) {
      t._update(t._props.startTime + timeShift + duration);
      t._update(t._props.startTime + timeShift + (duration / 2));
      return t._update(t._props.startTime + timeShift);
    };
  };

  r_createUpdateInPeriodWithGap = function(t, duration, gap) {
    if (gap == null) {
      gap = 5;
    }
    return function(timeShift) {
      t._update(t._props.startTime + timeShift + duration - gap);
      t._update(t._props.startTime + timeShift + (duration / 2));
      return t._update(t._props.startTime + timeShift + gap);
    };
  };

  describe('Tween ->', function() {
    describe('defaults ->', function() {
      it('should have vars', function() {
        var t;
        t = new Tween;
        expect(t._props).toBeDefined();
        expect(t.h).toBeDefined();
        return expect(t.progress).toBe(0);
      });
      it('should have defaults', function() {
        var t;
        t = new Tween;
        expect(t._defaults.duration).toBe(600);
        expect(t._defaults.delay).toBe(0);
        expect(t._defaults.yoyo).toBe(false);
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
      it('should recieve isChained option', function() {
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
    describe('setStartTime ->', function() {
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
      it('should recieve the start time', function() {
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
      return it('should calculate startTime and endTime if shifted', function() {
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
    });
    describe('update method ->', function() {
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
        expect(t.onUpdate).toHaveBeenCalledWith(0, 0, false);
        t._update(t._props.startTime - 500);
        expect(t._isInActiveArea).toBe(false);
        return expect(t.onUpdate.calls.count()).toBe(3);
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
        return expect(t.onUpdate).toHaveBeenCalledWith(1, 1, true);
      });
      return it('should set Tween to the end if Tween ended', function() {
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
        return expect(t.onUpdate).toHaveBeenCalledWith(t.easedProgress, t.progress, true);
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
        expect(zeroCnt).toBe(1);
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
        expect(oneCnt).toBe(1);
        expect(zeroCnt).toBe(2);
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
        expect(oneCnt).toBe(1);
        expect(zeroCnt).toBe(2);
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
        expect(zeroCnt).toBe(2);
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
        expect(zeroCnt).toBe(1);
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
        expect(zeroCnt).toBe(1);
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
        expect(oneCnt).toBe(1);
        expect(zeroCnt).toBe(2);
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
        expect(zeroCnt).toBe(2);
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
        expect(oneCnt).toBe(2);
        expect(zeroCnt).toBe(2);
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
        expect(zeroCnt).toBe(1);
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
        expect(zeroCnt).toBe(1);
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
        expect(zeroCnt).toBe(2);
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
        expect(zeroCnt).toBe(2);
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
        expect(zeroCnt).toBe(2);
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
        expect(zeroCnt).toBe(3);
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
        expect(zeroCnt).toBe(3);
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
        expect(zeroCnt).toBe(3);
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
        expect(zeroCnt).toBe(3);
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
        expect(zeroCnt).toBe(1);
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
        expect(zeroCnt).toBe(1);
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
        expect(zeroCnt).toBe(2);
        expect(oneCnt).toBe(1);
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
        expect(zeroCnt).toBe(2);
        expect(oneCnt).toBe(1);
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
        expect(zeroCnt).toBe(2);
        expect(oneCnt).toBe(2);
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
        expect(zeroCnt).toBe(3);
        expect(oneCnt).toBe(2);
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
        expect(zeroCnt).toBe(3);
        expect(oneCnt).toBe(2);
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
        expect(zeroCnt).toBe(3);
        expect(oneCnt).toBe(3);
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
        expect(zeroCnt).toBe(3);
        expect(oneCnt).toBe(3);
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
        expect(oneCnt).toBe(1);
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
        expect(oneCnt).toBe(1);
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
        expect(oneCnt).toBe(2);
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
        expect(oneCnt).toBe(2);
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
        expect(oneCnt).toBe(3);
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
        expect(oneCnt).toBe(3);
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
        expect(oneCnt).toBe(3);
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
        expect(zeroCnt).toBe(0);
        expect(oneCnt).toBe(1);
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
        expect(zeroCnt).toBe(0);
        expect(oneCnt).toBe(1);
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
        expect(zeroCnt).toBe(1);
        expect(oneCnt).toBe(2);
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
        expect(zeroCnt).toBe(1);
        expect(oneCnt).toBe(2);
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
        expect(zeroCnt).toBe(1);
        expect(oneCnt).toBe(2);
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
        expect(zeroCnt).toBe(2);
        expect(oneCnt).toBe(2);
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
        expect(zeroCnt).toBe(2);
        expect(oneCnt).toBe(2);
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
        expect(zeroCnt).toBe(3);
        expect(oneCnt).toBe(2);
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
        expect(zeroCnt).toBe(3);
        expect(oneCnt).toBe(2);
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
        expect(zeroCnt).toBe(0);
        expect(oneCnt).toBe(1);
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
        expect(zeroCnt).toBe(1);
        expect(oneCnt).toBe(1);
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
        expect(zeroCnt).toBe(1);
        expect(oneCnt).toBe(2);
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
        expect(zeroCnt).toBe(2);
        expect(oneCnt).toBe(2);
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
        expect(zeroCnt).toBe(2);
        expect(oneCnt).toBe(3);
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
        expect(zeroCnt).toBe(3);
        expect(oneCnt).toBe(3);
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
        expect(zeroCnt).toBe(3);
        expect(oneCnt).toBe(3);
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
        expect(zeroCnt).toBe(0);
        expect(oneCnt).toBe(1);
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
        expect(oneCnt).toBe(1);
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
        expect(zeroCnt).toBe(1);
        expect(oneCnt).toBe(2);
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
        expect(zeroCnt).toBe(2);
        expect(oneCnt).toBe(2);
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
        expect(zeroCnt).toBe(2);
        expect(oneCnt).toBe(3);
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
        expect(zeroCnt).toBe(3);
        expect(oneCnt).toBe(3);
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
        expect(zeroCnt).toBe(3);
        expect(oneCnt).toBe(3);
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
        expect(zeroCnt).toBe(3);
        expect(oneCnt).toBe(3);
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
          yoyo: true,
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
        expect(zeroCnt).toBe(1);
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
        t._update(t._props.startTime + timeShift + (duration / 4));
        expect(updateValue).toBeCloseTo(.75, 5);
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
        expect(updateValue).toBe(0);
        expect(updateDirection).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(1);
        expect(zeroCnt).toBe(2);
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
      it('should be called with 1 and 0 on each repeat period if missed time || yoyo', function() {
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
          yoyo: true,
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
        expect(zeroCnt).toBe(1);
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
        expect(zeroCnt).toBe(1);
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
        expect(updateValue).toBeCloseTo(.9, 5);
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
        t._update(t._props.startTime + timeShift + (duration / 4));
        expect(updateValue).toBeCloseTo(.75, 5);
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
        timeShift = 2 * duration;
        t._update(t._props.startTime + timeShift + gap);
        expect(updateValue).toBeCloseTo(0);
        expect(updateDirection).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(1);
        expect(zeroCnt).toBe(2);
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
      it('should be called with 1 and 0 on each repeat period if delay || yoyo', function() {
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
          yoyo: true,
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
        expect(zeroCnt).toBe(1);
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
        expect(zeroCnt).toBe(1);
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
        expect(updateValue).toBe(1);
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
        t._update(t._props.startTime + timeShift + (duration / 4));
        expect(updateValue).toBeCloseTo(.75, 5);
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
        expect(updateValue).toBe(0);
        expect(updateDirection).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(1);
        expect(zeroCnt).toBe(2);
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
        expect(oneCnt).toBe(1);
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
        t._update(t._props.startTime + timeShift + (duration / 4));
        expect(updateValue).toBeCloseTo(.25, 5);
        expect(updateDirection).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(1);
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
        expect(oneCnt).toBe(2);
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
        expect(oneCnt).toBe(2);
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
      it('should be called with 1 and 0 on each repeat period if in delay || yoyo', function() {
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
          yoyo: true,
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
        expect(zeroCnt).toBe(1);
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
        expect(zeroCnt).toBe(1);
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
        expect(updateValue).toBeCloseTo(.8, 5);
        expect(updateDirection).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(zeroCnt).toBe(1);
        expect(oneCnt).toBe(1);
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
        t._update(t._props.startTime + timeShift + (duration / 4));
        expect(updateValue).toBeCloseTo(.75, 5);
        expect(updateDirection).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(zeroCnt).toBe(1);
        expect(oneCnt).toBe(1);
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
        expect(updateValue).toBe(0);
        expect(updateDirection).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(zeroCnt).toBe(2);
        expect(oneCnt).toBe(1);
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
        expect(zeroCnt).toBe(2);
        expect(oneCnt).toBe(1);
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
        t._update(t._props.startTime + timeShift + (duration / 4));
        expect(updateValue).toBeCloseTo(.25, 5);
        expect(updateDirection).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(zeroCnt).toBe(2);
        expect(oneCnt).toBe(1);
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
        expect(zeroCnt).toBe(2);
        expect(oneCnt).toBe(2);
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
        expect(zeroCnt).toBe(2);
        expect(oneCnt).toBe(2);
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
      it('should be called with 0 and 1 on each repeat period || reverse yoyo', function() {
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
          yoyo: true,
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
        t._update(t._props.startTime + timeShift - duration / 4);
        expect(updateValue).toBeCloseTo(.75, 5);
        expect(updateDirection).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(1);
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
        expect(oneCnt).toBe(1);
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
        t._update(t._props.startTime + timeShift - duration / 4);
        expect(updateValue).toBeCloseTo(.25, 5);
        expect(updateDirection).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(1);
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
        expect(updateValue).toBe(1);
        expect(updateDirection).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(2);
        expect(zeroCnt).toBe(1);
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
        t._update(t._props.startTime + timeShift - duration / 4);
        expect(updateValue).toBeCloseTo(.75, 5);
        expect(updateDirection).toBe(false);
        expect(updateDirection).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(oneCnt).toBe(2);
        expect(zeroCnt).toBe(1);
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
        expect(oneCnt).toBe(2);
        expect(zeroCnt).toBe(2);
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
        expect(oneCnt).toBe(2);
        expect(zeroCnt).toBe(2);
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
      it('should be called with 0 and 1 on each repeat period if missed time || yoyo reverse', function() {
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
          yoyo: true,
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
        expect(zeroCnt).toBe(0);
        expect(oneCnt).toBe(1);
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
        expect(zeroCnt).toBe(0);
        expect(oneCnt).toBe(1);
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
        expect(updateValue).toBeCloseTo(.1, 5);
        expect(updateDirection).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(zeroCnt).toBe(1);
        expect(oneCnt).toBe(1);
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
        t._update(t._props.startTime + timeShift - (duration / 4));
        expect(updateValue).toBeCloseTo(.25, 5);
        expect(updateDirection).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(zeroCnt).toBe(1);
        expect(oneCnt).toBe(1);
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
        expect(updateValue).toBeCloseTo(.9, 5);
        expect(updateDirection).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(zeroCnt).toBe(1);
        expect(oneCnt).toBe(1);
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
        expect(zeroCnt).toBe(2);
        expect(oneCnt).toBe(1);
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
        t._update(t._props.startTime + timeShift - (duration / 4));
        expect(updateValue).toBeCloseTo(.75, 5);
        expect(updateDirection).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(zeroCnt).toBe(2);
        expect(oneCnt).toBe(1);
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
        expect(zeroCnt).toBe(3);
        expect(oneCnt).toBe(1);
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
        expect(zeroCnt).toBe(3);
        expect(oneCnt).toBe(1);
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
      it('should be called with 0 and 1 on each repeat period if in delay || yoyo reverse', function() {
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
          yoyo: true,
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
        t._update(t._props.startTime + timeShift - (duration / 4));
        expect(updateValue).toBeCloseTo(.75, 5);
        expect(updateDirection).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(zeroCnt).toBe(0);
        expect(oneCnt).toBe(1);
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
        expect(zeroCnt).toBe(1);
        expect(oneCnt).toBe(1);
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
        t._update(t._props.startTime + timeShift - duration / 4);
        expect(updateValue).toBeCloseTo(.25, 5);
        expect(updateDirection).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(zeroCnt).toBe(1);
        expect(oneCnt).toBe(1);
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
        expect(updateValue).toBe(1);
        expect(updateDirection).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(zeroCnt).toBe(1);
        expect(oneCnt).toBe(2);
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
        t._update(t._props.startTime + timeShift - duration / 4);
        expect(updateValue).toBeCloseTo(.75, 5);
        expect(updateDirection).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(zeroCnt).toBe(1);
        expect(oneCnt).toBe(2);
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
        expect(zeroCnt).toBe(2);
        expect(oneCnt).toBe(2);
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
        expect(zeroCnt).toBe(2);
        expect(oneCnt).toBe(2);
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
      return it('should be called with 0 and 1 on each repeat period if delay || yoyo reverse', function() {
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
          yoyo: true,
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
        expect(zeroCnt).toBe(0);
        expect(oneCnt).toBe(1);
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
        expect(oneCnt).toBe(1);
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
        t._update(t._props.startTime + timeShift - duration / 4);
        expect(updateValue).toBeCloseTo(.25, 5);
        expect(updateDirection).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(zeroCnt).toBe(1);
        expect(oneCnt).toBe(1);
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
        expect(updateValue).toBe(1);
        expect(updateDirection).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(zeroCnt).toBe(1);
        expect(oneCnt).toBe(2);
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
        t._update(t._props.startTime + timeShift - duration / 4);
        expect(updateValue).toBeCloseTo(.75, 5);
        expect(updateDirection).toBe(false);
        expect(t._wasUknownUpdate).toBe(false);
        expect(zeroCnt).toBe(1);
        expect(oneCnt).toBe(2);
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
        expect(zeroCnt).toBe(2);
        expect(oneCnt).toBe(2);
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
        expect(zeroCnt).toBe(2);
        expect(oneCnt).toBe(2);
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
        t._update(t._props.startTime + timeShift - duration / 4);
        expect(updateValue).toBeCloseTo(.75, 5);
        expect(updateDirection).toBe(true);
        expect(t._wasUknownUpdate).toBe(false);
        expect(zeroCnt).toBe(2);
        expect(oneCnt).toBe(2);
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
      return it('should round instead of floor if time >= endTime', function() {
        var duration, t;
        duration = 50 + 3 / 2.123;
        t = new Tween({
          repeat: 2,
          duration: duration
        });
        t._setStartTime();
        return expect(t._getPeriod(t._props.startTime + 3 * duration)).toBe(3);
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
        expect(t._props.onComplete).toHaveBeenCalledWith(true);
        return expect(t._props.onComplete.calls.count()).toBe(1);
      });
      it('should be called just once when inside timeline', function() {
        var t, tm;
        tm = new mojs.Timeline;
        t = new Tween({
          duration: 32,
          onComplete: function() {}
        })._setStartTime();
        tm.add(t);
        tm._setStartTime();
        spyOn(t._props, 'onComplete');
        tm._update(t._props.startTime + 0);
        tm._update(t._props.startTime + 10);
        tm._update(t._props.startTime + 32);
        expect(t._props.onComplete).toHaveBeenCalledWith(true);
        return expect(t._props.onComplete.calls.count()).toBe(1);
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
      it('should fire after the last onUpdate', function(dfr) {
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
      return it('should fire only once if inside timeline', function() {
        var cnt, delay, duration, t1, t2, tm;
        cnt = 0;
        duration = 50;
        delay = 10;
        tm = new mojs.Timeline({
          repeat: 1
        });
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
        tm._update(t1._props.startTime + duration / 2 + delay / 2);
        tm._update(t1._props.startTime + duration + delay + 1);
        tm._update(t1._props.startTime + 2 * duration + delay / 2);
        tm._update(t1._props.startTime + 2 * (duration + delay));
        return expect(cnt).toBe(2);
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
      return it('should run before onComplete if tween ended', function() {
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
    });
    describe('onFirstUpdate callback ->', function() {
      return it('should be defined', function() {
        var t;
        t = new Tween({
          onFirstUpdate: function() {}
        });
        return expect(t._props.onFirstUpdate).toBeDefined();
      });
    });
    describe('onRepeatStart callback ->', function() {
      return it('should be defined', function() {
        var t;
        t = new Tween({
          onRepeatStart: function() {}
        });
        return expect(t._props.onRepeatStart).toBeDefined();
      });
    });
    describe('onRepeatComplete callback ->', function() {
      return it('should be defined', function() {
        var t;
        t = new Tween({
          onRepeatComplete: function() {}
        });
        return expect(t._props.onRepeatComplete).toBeDefined();
      });
    });
    describe('yoyo option ->', function() {
      return it('should recieve yoyo option', function() {
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
      return it('should set return self', function() {
        var obj, t;
        t = new Tween({
          easing: 'Bounce.Out'
        });
        obj = t._setProgress(.75);
        return expect(obj).toBe(t);
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
    describe('run method ->', function() {
      it('should get the start time', function() {
        var t;
        t = new Tween;
        t.play();
        expect(t._props.startTime).toBeDefined();
        return expect(t._props.endTime).toBe(t._props.startTime + t._props.repeatTime);
      });
      it('should call the setStartTime method', function() {
        var t, time;
        t = new Tween;
        spyOn(t, '_setStartTime');
        time = 0;
        t.play(time);
        return expect(t._setStartTime).toHaveBeenCalledWith(time);
      });
      it('should add itself to tweener', function() {
        var t;
        t = new Tween;
        spyOn(tweener, 'add');
        t.play();
        return expect(tweener.add).toHaveBeenCalled();
      });
      return it('should not add itself to tweener if time was passed', function() {
        var t;
        t = new Tween;
        spyOn(tweener, 'add');
        t.play(10239123);
        return expect(tweener.add).not.toHaveBeenCalled();
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
      return it('should reset progress to 0', function() {
        var tw;
        tweener.removeAll();
        tw = new Tween({
          duration: 2000
        });
        tw.play();
        spyOn(tw, '_setProgress');
        tw.stop();
        return expect(tw._setProgress).toHaveBeenCalledWith(0);
      });
    });
    describe('pause method ->', function() {
      return it('should call t.remove method with self', function() {
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
    describe('callbacks order || forward', function() {
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
        return expect(order[4]).toBe('update');
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
        expect(order[5]).toBe('update');
        expect(order[6]).toBe('repeat-complete');
        return expect(order[7]).toBe('complete');
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
        expect(order[4]).toBe('update');
        expect(order[5]).toBe('update');
        expect(order[6]).toBe('repeat-complete');
        expect(order[7]).toBe('repeat-start');
        expect(order[8]).toBe('update');
        expect(order[9]).toBe('update');
        expect(order[10]).toBe('update');
        expect(order[11]).toBe('update');
        expect(order[12]).toBe('repeat-complete');
        return expect(order[13]).toBe('complete');
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
        expect(order[5]).toBe('update');
        expect(order[6]).toBe('repeat-complete');
        expect(order[7]).toBe('repeat-start');
        expect(order[8]).toBe('update');
        expect(order[9]).toBe('update');
        expect(order[10]).toBe('update');
        expect(order[11]).toBe('update');
        expect(order[12]).toBe('repeat-complete');
        return expect(order[13]).toBe('complete');
      });
    });
    describe('callbacks order || backward', function() {
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
        return expect(order[4]).toBe('update');
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
        expect(order[6]).toBe('update');
        expect(order[7]).toBe('repeat-start');
        return expect(order[8]).toBe('start');
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
        expect(order[5]).toBe('update');
        expect(order[6]).toBe('update');
        expect(order[7]).toBe('repeat-start');
        expect(order[8]).toBe('repeat-complete');
        expect(order[9]).toBe('update');
        expect(order[10]).toBe('update');
        expect(order[11]).toBe('update');
        expect(order[12]).toBe('update');
        expect(order[13]).toBe('repeat-start');
        expect(order[14]).toBe('start');
        return expect(order[15]).toBe(void 0);
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
        expect(order[6]).toBe('update');
        expect(order[7]).toBe('repeat-start');
        expect(order[8]).toBe('repeat-complete');
        expect(order[9]).toBe('update');
        expect(order[10]).toBe('update');
        expect(order[11]).toBe('update');
        expect(order[12]).toBe('update');
        expect(order[13]).toBe('repeat-start');
        expect(order[14]).toBe('start');
        return expect(order[15]).toBe(void 0);
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
        expect(order[6]).toBe('update');
        expect(order[7]).toBe('repeat-start');
        expect(order[8]).toBe('repeat-complete');
        expect(order[9]).toBe('update');
        expect(order[10]).toBe('update');
        expect(order[11]).toBe('update');
        expect(order[12]).toBe('update');
        expect(order[13]).toBe('repeat-start');
        expect(order[14]).toBe('start');
        return expect(order[15]).toBe(void 0);
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
        expect(order[11]).toBe('update');
        expect(order[12]).toBe('repeat-start');
        expect(order[13]).toBe('start');
        return expect(order[14]).toBe(void 0);
      });
    });
    return it('should have the right order when reverse direction || end + delay #3', function() {
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
  });

}).call(this);
