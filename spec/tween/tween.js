(function() {
  var Tween, createUpdateInPeriod, createUpdateInPeriodWithGap, easing, h, r_createUpdateInPeriod, r_createUpdateInPeriodWithGap, tweener;

  Tween = window.mojs.Tween;

  easing = window.mojs.easing;

  h = window.mojs.h;

  tweener = window.mojs.tweener;

  createUpdateInPeriod = function(t, duration) {
    return function(timeShift) {
      t.update(t.props.startTime + timeShift);
      t.update(t.props.startTime + timeShift + (duration / 2));
      return t.update(t.props.startTime + timeShift + duration);
    };
  };

  createUpdateInPeriodWithGap = function(t, duration, gap) {
    if (gap == null) {
      gap = 5;
    }
    return function(timeShift) {
      t.update(t.props.startTime + timeShift + gap);
      t.update(t.props.startTime + timeShift + (duration / 2));
      return t.update(t.props.startTime + timeShift + duration - gap);
    };
  };

  r_createUpdateInPeriod = function(t, duration) {
    return function(timeShift) {
      t.update(t.props.startTime + timeShift + duration);
      t.update(t.props.startTime + timeShift + (duration / 2));
      return t.update(t.props.startTime + timeShift);
    };
  };

  r_createUpdateInPeriodWithGap = function(t, duration, gap) {
    if (gap == null) {
      gap = 5;
    }
    return function(timeShift) {
      t.update(t.props.startTime + timeShift + duration - gap);
      t.update(t.props.startTime + timeShift + (duration / 2));
      return t.update(t.props.startTime + timeShift + gap);
    };
  };

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
        expect(t.defaults.yoyo).toBe(false);
        return expect(t.defaults.isChained).toBe(false);
      });
      return it('should extend defaults to props', function() {
        var t;
        t = new Tween({
          duration: 1000
        });
        expect(t.props.duration).toBe(1000);
        return expect(t.props.delay).toBe(0);
      });
    });
    describe('init ->', function() {
      it('should calc time, repeatTime', function() {
        var t;
        t = new Tween({
          duration: 1000,
          delay: 100
        });
        expect(t.props.time).toBe(1100);
        return expect(t.props.repeatTime).toBe(1100);
      });
      return it('should calc time, repeatTime #2', function() {
        var t;
        t = new Tween({
          duration: 1000,
          delay: 100,
          repeat: 2
        });
        expect(t.props.time).toBe(1100);
        return expect(t.props.repeatTime).toBe(3300);
      });
    });
    describe('isChained option ->', function() {
      it('should recieve isChained option', function() {
        var t;
        t = new Tween({
          duration: 1000,
          isChained: true
        });
        return expect(t.props.isChained).toBe(true);
      });
      return it('should fallback to default isChained option', function() {
        var t;
        t = new Tween({
          duration: 1000
        });
        return expect(t.props.isChained).toBe(false);
      });
    });
    describe('setStartTime ->', function() {
      it('should calculate start time', function() {
        var expectedTime, t;
        t = new Tween({
          duration: 1000,
          delay: 500
        }).setStartTime();
        expectedTime = performance.now() + 500;
        expect(t.props.startTime).toBeGreaterThan(expectedTime - 50);
        return expect(t.props.startTime).not.toBeGreaterThan(expectedTime);
      });
      it('should recieve the start time', function() {
        var t;
        t = new Tween({
          duration: 1000
        }).setStartTime(1);
        return expect(t.props.startTime).toBe(1);
      });
      it('should calculate end time', function() {
        var delay, duration, endTime, t;
        duration = 1000;
        delay = 500;
        t = new Tween({
          duration: duration,
          delay: delay
        }).setStartTime();
        endTime = t.props.startTime + t.props.repeatTime - t.props.delay;
        return expect(t.props.endTime).toBe(endTime);
      });
      it('should calculate end time with repeat', function() {
        var delay, duration, endTime, t;
        duration = 1000;
        delay = 500;
        t = new Tween({
          duration: duration,
          delay: delay,
          repeat: 2
        }).setStartTime();
        endTime = t.props.startTime + t.props.repeatTime - t.props.delay;
        return expect(t.props.endTime).toBe(endTime);
      });
      it('should calculate end time if repeat', function() {
        var delay, duration, t, time;
        duration = 1000;
        delay = 500;
        t = new Tween({
          duration: duration,
          delay: delay,
          repeat: 2
        }).setStartTime();
        time = t.props.startTime + (3 * (duration + delay)) - delay;
        return expect(t.props.endTime).toBe(time);
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
        t.setProp('shiftTime', 500);
        t.setStartTime();
        expectedTime = performance.now() + 500 + delay;
        expect(t.props.startTime).toBeGreaterThan(expectedTime - 50);
        expect(t.props.startTime).not.toBeGreaterThan(expectedTime);
        endTime = t.props.startTime + (3 * (duration + delay)) - delay;
        return expect(t.props.endTime).toBe(endTime);
      });
      return it('should restart flags', function() {
        var t;
        t = new Tween({
          duration: 20,
          repeat: 2
        }).setStartTime();
        t.update(t.props.startTime + 10);
        t.update(t.props.startTime + 60);
        expect(t.isCompleted).toBe(true);
        expect(t.isStarted).toBe(false);
        expect(t.isRepeatCompleted).toBe(true);
        t.setStartTime();
        expect(t.isCompleted).toBe(false);
        expect(t.isRepeatCompleted).toBe(false);
        return expect(t.isStarted).toBe(false);
      });
    });
    describe('update method ->', function() {
      it('should update progress', function() {
        var t, time;
        t = new Tween({
          duration: 1000,
          delay: 500
        });
        t.setStartTime();
        time = t.props.startTime + 200;
        t.update(time);
        return expect(t.progress).toBeCloseTo(.2, 5);
      });
      it('should update progress with repeat', function() {
        var t;
        t = new Tween({
          duration: 1000,
          delay: 200,
          repeat: 2
        });
        t.setStartTime();
        t.update(t.props.startTime + 1400);
        expect(t.progress).toBeCloseTo(.2);
        t.update(t.props.startTime + 2700);
        expect(t.progress).toBeCloseTo(.3);
        t.update(t.props.startTime + 3400);
        return expect(t.progress).toBe(1);
      });
      it('should update progress to 1 if in delay gap and previous time value was smaller then the current one', function() {
        var t;
        t = new Tween({
          duration: 1000,
          delay: 200,
          repeat: 2
        });
        t.setStartTime();
        t.update(t.props.startTime + 300);
        t.update(t.props.startTime + 1100);
        return expect(t.progress).toBe(1);
      });
      it('should update progress to 1 if in delay gap and previous time value was bigger then the current one', function() {
        var t;
        t = new Tween({
          duration: 1000,
          delay: 200,
          repeat: 2
        });
        t.setStartTime();
        t.update(t.props.startTime + 1300);
        t.update(t.props.startTime + 1100);
        return expect(t.progress).toBe(0);
      });
      it('should update progress to 1 on the end', function() {
        var t;
        t = new Tween({
          duration: 1000,
          delay: 200,
          repeat: 2
        });
        t.setStartTime();
        t.update(t.props.startTime + 1000);
        return expect(t.progress).toBeCloseTo(1, 5);
      });
      it('should return true on the end', function() {
        var returnValue, t;
        t = new Tween({
          duration: 1000,
          delay: 200
        });
        t.setStartTime();
        returnValue = t.update(t.props.startTime + 1000);
        expect(t.progress).toBeCloseTo(1, 5);
        expect(t.isCompleted).toBe(true);
        expect(t.isRepeatCompleted).toBe(true);
        return expect(returnValue).toBe(true);
      });
      it('should set progress to 1 on delay gaps', function() {
        var t;
        t = new Tween({
          duration: 1000,
          delay: 200
        });
        t.setStartTime();
        spyOn(t, '_complete').and.callThrough();
        t.update(t.props.startTime + 20, true);
        t.update(t.props.startTime - 20, true);
        expect(t.progress).toBe(1);
        return expect(t._complete).toHaveBeenCalled();
      });
      it('should not call update method if timeline isnt active "-"', function() {
        var t;
        t = new Tween({
          duration: 1000,
          onUpdate: function() {}
        });
        t.setStartTime();
        spyOn(t, 'onUpdate');
        t.update(t.props.startTime - 500);
        return expect(t.onUpdate).not.toHaveBeenCalled();
      });
      it('should not call update method if timeline isnt active "+"', function() {
        var cnt, t;
        cnt = 0;
        t = new Tween({
          duration: 1000,
          onUpdate: function() {
            return cnt++;
          }
        });
        t.setStartTime();
        t.update(performance.now() + 1500);
        return expect(cnt).toBe(1);
      });
      return it('should set Tween to the end if Tween ended', function() {
        var t;
        t = new Tween({
          duration: 1000,
          delay: 500
        });
        t.setStartTime();
        t.update(t.props.startTime + 1200);
        return expect(t.progress).toBe(1);
      });
    });
    describe('onUpdate callback ->', function() {
      it('should be defined', function() {
        var t;
        t = new Tween({
          onUpdate: function() {}
        });
        return expect(t.props.onUpdate).toBeDefined();
      });
      it('should call onUpdate callback with the current progress', function() {
        var t;
        t = new Tween({
          duration: 1000,
          easing: 'bounce.out',
          onUpdate: function() {}
        });
        spyOn(t, 'onUpdate');
        t.setStartTime();
        t.update(t.props.startTime + 500);
        return expect(t.onUpdate).toHaveBeenCalledWith(t.easedProgress, t.progress);
      });
      it('should have the right scope', function() {
        var isRightScope, t;
        isRightScope = false;
        t = new Tween({
          onUpdate: function() {
            return isRightScope = this instanceof Tween;
          }
        });
        t.setStartTime();
        t.update(t.props.startTime + 200);
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
        t.setStartTime();
        t.update(t.props.startTime + t.props.duration + 50);
        t.update(t.props.startTime + t.props.duration + 100);
        t.update(t.props.startTime + t.props.duration + 150);
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
        t.setProgress(.5);
        return expect(easedProgress).toBe(mojs.easing.cubic.out(progress));
      });

      /*
        TWEEN IN NORMAL DIRECTION
       */
      it('should be called with 1 and 0 on each repeat period', function() {
        var duration, oneCnt, repeatCnt, t1, updateInPeriod, zeroCnt;
        zeroCnt = 0;
        oneCnt = 0;
        repeatCnt = 0;
        duration = 50;
        t1 = new Tween({
          repeat: 1,
          duration: duration,
          onUpdate: function(p) {
            (p === 0) && zeroCnt++;
            return (p === 1) && oneCnt++;
          },
          onRepeatComplete: function() {
            return repeatCnt++;
          }
        });
        updateInPeriod = createUpdateInPeriod(t1, duration);
        t1.setStartTime();
        updateInPeriod(0);
        expect(oneCnt).toBe(1);
        expect(zeroCnt).toBe(2);
        expect(repeatCnt).toBe(1);
        updateInPeriod(duration);
        expect(oneCnt).toBe(2);
        expect(zeroCnt).toBe(2);
        return expect(repeatCnt).toBe(2);
      });
      it('should be called with 1 and 0 on each repeat period if missed time', function() {
        var duration, oneCnt, repeatCnt, t1, updateInPeriod, zeroCnt;
        zeroCnt = 0;
        oneCnt = 0;
        repeatCnt = 0;
        duration = 50;
        t1 = new Tween({
          repeat: 2,
          duration: duration,
          onUpdate: function(p) {
            (p === 0) && zeroCnt++;
            return (p === 1) && oneCnt++;
          },
          onRepeatComplete: function() {
            return repeatCnt++;
          }
        });
        updateInPeriod = createUpdateInPeriodWithGap(t1, duration);
        t1.setStartTime();
        updateInPeriod(0);
        updateInPeriod(duration);
        expect(zeroCnt).toBe(1);
        expect(oneCnt).toBe(1);
        expect(repeatCnt).toBe(1);
        updateInPeriod(2 * duration);
        expect(zeroCnt).toBe(2);
        expect(oneCnt).toBe(2);
        return expect(repeatCnt).toBe(2);
      });
      it('should be called with 1 and 0 on each repeat period if delay', function() {
        var delay, duration, oneCnt, repeatCnt, t1, updateInPeriod, zeroCnt;
        zeroCnt = 0;
        oneCnt = 0;
        repeatCnt = 0;
        duration = 50;
        delay = 20;
        t1 = new Tween({
          repeat: 2,
          duration: duration,
          delay: delay,
          onUpdate: function(p) {
            (p === 0) && zeroCnt++;
            return (p === 1) && oneCnt++;
          },
          onRepeatComplete: function() {
            return repeatCnt++;
          }
        });
        updateInPeriod = createUpdateInPeriod(t1, duration);
        t1.setStartTime();
        updateInPeriod(0);
        expect(zeroCnt).toBe(1);
        expect(oneCnt).toBe(1);
        expect(repeatCnt).toBe(1);
        updateInPeriod(duration + delay);
        expect(oneCnt).toBe(2);
        expect(zeroCnt).toBe(2);
        expect(repeatCnt).toBe(2);
        updateInPeriod(2 * (duration + delay));
        expect(oneCnt).toBe(3);
        expect(zeroCnt).toBe(3);
        return expect(repeatCnt).toBe(3);
      });
      it('should be called with 1 and 0 on each repeat period if in delay', function() {
        var delay, duration, oneCnt, repeatCnt, t, timeShift, zeroCnt;
        zeroCnt = 0;
        oneCnt = 0;
        repeatCnt = 0;
        duration = 50;
        delay = 20;
        t = new Tween({
          repeat: 2,
          duration: duration,
          delay: delay,
          onUpdate: function(p) {
            (p === 0) && zeroCnt++;
            return (p === 1) && oneCnt++;
          },
          onRepeatComplete: function() {
            return repeatCnt++;
          }
        });
        t.setStartTime();
        timeShift = 0;
        t.update(t.props.startTime + timeShift);
        t.update(t.props.startTime + timeShift + (duration / 2));
        t.update(t.props.startTime + timeShift + duration + delay / 2);
        expect(oneCnt).toBe(1);
        expect(zeroCnt).toBe(1);
        expect(repeatCnt).toBe(1);
        timeShift = duration + delay;
        t.update(t.props.startTime + timeShift + 5);
        t.update(t.props.startTime + timeShift + (duration / 2));
        t.update(t.props.startTime + timeShift + duration + delay / 2);
        expect(oneCnt).toBe(2);
        expect(zeroCnt).toBe(2);
        expect(repeatCnt).toBe(2);
        timeShift = 2 * (duration + delay);
        t.update(t.props.startTime + timeShift + 5);
        t.update(t.props.startTime + timeShift + (duration / 2));
        t.update(t.props.startTime + timeShift + duration + delay / 2);
        expect(oneCnt).toBe(3);
        expect(zeroCnt).toBe(3);
        return expect(repeatCnt).toBe(3);
      });

      /*
        TWEEN IN REVERSE DIRECTION
       */
      it('should be called with 0 and 1 on each repeat period || reverse', function() {
        var duration, oneCnt, repeatCnt, t1, updateInPeriod, zeroCnt;
        zeroCnt = 0;
        oneCnt = 0;
        repeatCnt = 0;
        duration = 50;
        t1 = new Tween({
          repeat: 1,
          duration: duration,
          onUpdate: function(p) {
            (p === 0) && zeroCnt++;
            return (p === 1) && oneCnt++;
          },
          onRepeatComplete: function() {
            return repeatCnt++;
          }
        });
        updateInPeriod = r_createUpdateInPeriod(t1, duration);
        t1.setStartTime();
        updateInPeriod(duration);
        expect(oneCnt).toBe(1);
        expect(zeroCnt).toBe(1);
        expect(repeatCnt).toBe(1);
        updateInPeriod(0);
        expect(oneCnt).toBe(2);
        expect(zeroCnt).toBe(2);
        return expect(repeatCnt).toBe(2);
      });
      it('should be called with 1 and 0 on each repeat period if missed time || reverse', function() {
        var delay, duration, gap, oneCnt, repeatCnt, t, timeShift, zeroCnt;
        zeroCnt = 0;
        oneCnt = 0;
        repeatCnt = 0;
        duration = 50;
        delay = 20;
        gap = 5;
        t = new Tween({
          repeat: 2,
          duration: duration,
          delay: delay,
          onUpdate: function(p) {
            (p === 0) && zeroCnt++;
            return (p === 1) && oneCnt++;
          },
          onRepeatComplete: function() {
            return repeatCnt++;
          }
        });
        t.setStartTime();
        timeShift = 2 * (duration + delay);
        t.update(t.props.startTime + timeShift + duration - gap);
        t.update(t.props.startTime + timeShift + (duration / 2));
        t.update(t.props.startTime + timeShift + gap);
        expect(oneCnt).toBe(1);
        expect(zeroCnt).toBe(0);
        expect(repeatCnt).toBe(1);
        timeShift = duration + delay;
        t.update(t.props.startTime + timeShift + duration - gap);
        t.update(t.props.startTime + timeShift + (duration / 2));
        t.update(t.props.startTime + timeShift + gap);
        expect(oneCnt).toBe(2);
        expect(zeroCnt).toBe(1);
        expect(repeatCnt).toBe(2);
        timeShift = 0;
        t.update(t.props.startTime + timeShift + duration - gap);
        t.update(t.props.startTime + timeShift + (duration / 2));
        t.update(t.props.startTime + timeShift + gap);
        expect(oneCnt).toBe(3);
        expect(zeroCnt).toBe(2);
        expect(repeatCnt).toBe(3);
        t.update(t.props.startTime + timeShift);
        expect(oneCnt).toBe(3);
        expect(zeroCnt).toBe(3);
        return expect(repeatCnt).toBe(3);
      });
      return it('should be called with 1 and 0 on each repeat period if delay and missed time || reverse', function() {
        var delay, duration, gap, oneCnt, repeatCnt, t, timeShift, zeroCnt;
        zeroCnt = 0;
        oneCnt = 0;
        repeatCnt = 0;
        duration = 50;
        delay = 20;
        gap = 5;
        t = new Tween({
          repeat: 2,
          isIt: true,
          duration: duration,
          delay: delay,
          onUpdate: function(p) {
            console.log(p);
            (p === 0) && zeroCnt++;
            return (p === 1) && oneCnt++;
          },
          onRepeatComplete: function() {
            console.log('*** REPEAT ***');
            return repeatCnt++;
          }
        });
        t.setStartTime();
        timeShift = 2 * (duration + delay);
        t.update(t.props.startTime + timeShift + duration - gap);
        t.update(t.props.startTime + timeShift + (duration / 2));
        t.update(t.props.startTime + timeShift + gap);
        expect(oneCnt).toBe(1);
        expect(zeroCnt).toBe(0);
        expect(repeatCnt).toBe(1);
        t.update(t.props.startTime + timeShift + gap - delay / 2);
        expect(repeatCnt).toBe(1);
        timeShift = duration;
        t.update(t.props.startTime + timeShift + duration - gap);
        return expect(repeatCnt).toBe(2);
      });
    });
    describe('onStart callback ->', function() {
      it('should be defined', function() {
        var t;
        t = new Tween({
          onStart: function() {}
        });
        t.setStartTime();
        return expect(t.props.onStart).toBeDefined();
      });
      it('should call onStart callback', function() {
        var t;
        t = new Tween({
          duration: 32,
          onStart: function() {}
        });
        t.setStartTime();
        spyOn(t.props, 'onStart');
        t.update(t.props.startTime + 1);
        return expect(t.props.onStart).toHaveBeenCalled();
      });
      it('should be called just once', function() {
        var cnt, t;
        cnt = 0;
        t = new Tween({
          duration: 32,
          onStart: function() {
            return cnt++;
          }
        }).setStartTime();
        t.update(t.props.startTime + 1);
        t.update(t.props.startTime + 1);
        return expect(cnt).toBe(1);
      });
      return it('should have the right scope', function() {
        var isRightScope, t;
        isRightScope = false;
        t = new Tween({
          onStart: function() {
            return isRightScope = this instanceof Tween;
          }
        });
        t.setStartTime();
        t.update(t.props.startTime + 1);
        return expect(isRightScope).toBe(true);
      });
    });
    describe('_getPeriod method ->', function() {
      it('should get the current period', function() {
        var delay, duration, t, timeShift;
        duration = 50;
        delay = 20;
        t = new Tween({
          repeat: 3,
          duration: duration,
          delay: delay
        });
        t.setStartTime();
        expect(t._getPeriod(t.props.startTime)).toBe(0);
        expect(t._getPeriod(t.props.startTime + duration / 2)).toBe(0);
        expect(t._getPeriod(t.props.startTime + duration)).toBe(0);
        timeShift = duration + delay;
        expect(t._getPeriod(t.props.startTime + timeShift - delay / 2)).toBe(1);
        expect(t._getPeriod(t.props.startTime + timeShift)).toBe(1);
        expect(t._getPeriod(t.props.startTime + timeShift + duration / 2)).toBe(1);
        expect(t._getPeriod(t.props.startTime + timeShift + duration)).toBe(1);
        timeShift = 2 * (duration + delay);
        expect(t._getPeriod(t.props.startTime + timeShift - delay / 2)).toBe(2);
        expect(t._getPeriod(t.props.startTime + timeShift)).toBe(2);
        expect(t._getPeriod(t.props.startTime + timeShift + duration / 2)).toBe(2);
        expect(t._getPeriod(t.props.startTime + timeShift + duration)).toBe(2);
        timeShift = 3 * (duration + delay);
        expect(t._getPeriod(t.props.startTime + timeShift - delay / 2)).toBe(3);
        expect(t._getPeriod(t.props.startTime + timeShift)).toBe(3);
        expect(t._getPeriod(t.props.startTime + timeShift + duration / 2)).toBe(3);
        return expect(t._getPeriod(t.props.startTime + timeShift + duration)).toBe(3);
      });
      return it('should get the current period with no delay', function() {
        var duration, t, timeShift;
        duration = 50;
        t = new Tween({
          isIt2: true,
          repeat: 3,
          duration: duration
        });
        t.setStartTime();
        expect(t._getPeriod(t.props.startTime)).toBe(0);
        expect(t._getPeriod(t.props.startTime + duration / 2)).toBe(0);
        expect(t._getPeriod(t.props.startTime + duration)).toBe(0);
        expect(t._getPeriod(t.props.startTime + duration + 1)).toBe(1);
        timeShift = duration;
        expect(t._getPeriod(t.props.startTime + timeShift + duration / 2)).toBe(1);
        expect(t._getPeriod(t.props.startTime + timeShift + duration)).toBe(1);
        expect(t._getPeriod(t.props.startTime + timeShift + duration + 1)).toBe(2);
        timeShift = 2 * duration;
        expect(t._getPeriod(t.props.startTime + timeShift + duration / 2)).toBe(2);
        expect(t._getPeriod(t.props.startTime + timeShift + duration)).toBe(2);
        expect(t._getPeriod(t.props.startTime + timeShift + duration + 1)).toBe(3);
        timeShift = 3 * duration;
        expect(t._getPeriod(t.props.startTime + timeShift + duration / 2)).toBe(3);
        expect(t._getPeriod(t.props.startTime + timeShift + duration)).toBe(3);
        return expect(t._getPeriod(t.props.startTime + timeShift + duration + 1)).toBe(4);
      });
    });
    describe('onComplete callback ->', function() {
      it('should be defined', function() {
        var t;
        t = new Tween({
          onComplete: function() {}
        });
        return expect(t.props.onComplete).toBeDefined();
      });
      it('should call onComplete callback', function() {
        var t;
        t = new Tween({
          duration: 100,
          onComplete: function() {}
        }).setStartTime();
        spyOn(t.props, 'onComplete');
        t.update(t.props.startTime + 101);
        return expect(t.props.onComplete).toHaveBeenCalled();
      });
      it('should be called just once', function() {
        var cnt, t;
        cnt = 0;
        t = new Tween({
          duration: 32,
          onComplete: function() {
            return cnt++;
          }
        }).setStartTime();
        t.update(t.props.startTime + 33);
        t.update(t.props.startTime + 33);
        return expect(cnt).toBe(1);
      });
      it('should reset isCompleted flag', function() {
        var t;
        t = new Tween({
          duration: 32,
          onComplete: function() {}
        }).setStartTime();
        t.update(t.props.startTime + 10);
        t.update(t.props.endTime);
        expect(t.isCompleted).toBe(true);
        t.update(t.props.startTime + 10);
        return expect(t.isCompleted).toBe(false);
      });
      it('should have the right scope', function() {
        var isRightScope, t;
        isRightScope = false;
        t = new Tween({
          duration: 1,
          onComplete: function() {
            return isRightScope = this instanceof Tween;
          }
        });
        t.setStartTime().update(t.props.startTime + 2);
        return expect(isRightScope).toBe(true);
      });
      it('should fire after the last onUpdate', function(dfr) {
        var proc, t;
        proc = 0;
        t = new Tween({
          duration: 1,
          onUpdate: function(p) {
            return proc = p;
          },
          onComplete: function() {
            expect(proc).toBe(1);
            return dfr();
          }
        });
        return t.setStartTime().update(t.props.startTime + 2);
      });
      return it('should fire only once if inside timeline', function() {
        var cnt, t1, t2, tm;
        cnt = 0;
        tm = new mojs.Timeline({
          repeat: 1
        });
        t1 = new Tween({
          delay: 10,
          duration: 50,
          onComplete: function() {
            return cnt++;
          }
        });
        t2 = new Tween({
          delay: 20,
          duration: 100
        });
        tm.add(t1, t2);
        tm.setStartTime();
        tm.update(t1.props.startTime);
        tm.update(t1.props.startTime + 11);
        tm.update(t1.props.startTime + 56);
        tm.update(t1.props.startTime + 61);
        tm.update(t1.props.startTime + 102);
        tm.update(t1.props.startTime + 120);
        tm.update(t1.props.startTime + 137);
        tm.update(t1.props.startTime + 169);
        tm.update(t1.props.startTime + 182);
        tm.update(t1.props.startTime + 201);
        tm.update(t1.props.startTime + 220);
        tm.update(t1.props.startTime + 231);
        return expect(cnt).toBe(2);
      });
    });
    it('should update with 0 if in timeline with yoyo and repeat', function() {
      var delay1, duration1, progress, t1, t2, timeShift, tm;
      progress = null;
      duration1 = 50;
      delay1 = 10;
      tm = new mojs.Timeline({
        repeat: 4
      });
      t1 = new Tween({
        delay: delay1,
        duration: duration1,
        yoyo: true,
        repeat: 1,
        onUpdate: function(p) {
          return progress = p;
        }
      });
      t2 = new Tween({
        delay: 20,
        duration: 100
      });
      tm.add(t1);
      tm.setStartTime();
      tm.update(t1.props.startTime);
      tm.update(t1.props.startTime + 2);
      tm.update(t1.props.startTime + duration1 - 4);
      tm.update(t1.props.startTime + duration1);
      timeShift = duration1 + delay1;
      tm.update(t1.props.startTime + timeShift);
      tm.update(t1.props.startTime + timeShift + 2);
      tm.update(t1.props.startTime + timeShift + duration1 - 4);
      tm.update(t1.props.startTime + timeShift + timeShift);
      return expect(progress).toBe(0);
    });
    it('should update with 0 if in timeline with yoyo and repeat #2', function() {
      var delay1, duration1, progress, t1, t2, timeShift, tm;
      progress = null;
      duration1 = 50;
      delay1 = 10;
      tm = new mojs.Timeline({
        repeat: 4
      });
      t1 = new Tween({
        delay: delay1,
        duration: duration1,
        yoyo: true,
        repeat: 1,
        onUpdate: function(p) {
          return progress = p;
        }
      });
      t2 = new Tween({
        delay: 20,
        duration: 100
      });
      tm.add(t1, t2);
      tm.setStartTime();
      tm.update(t1.props.startTime);
      tm.update(t1.props.startTime + 2);
      tm.update(t1.props.startTime + duration1 - 4);
      tm.update(t1.props.startTime + duration1);
      timeShift = duration1 + delay1;
      tm.update(t1.props.startTime + timeShift);
      tm.update(t1.props.startTime + timeShift + 2);
      tm.update(t1.props.startTime + timeShift + duration1 - 4);
      tm.update(t1.props.startTime + timeShift + timeShift);
      return expect(progress).toBe(0);
    });
    describe('onFirstUpdate callback ->', function() {
      it('should be defined', function() {
        var t;
        t = new Tween({
          onFirstUpdate: function() {}
        });
        return expect(t.props.onFirstUpdate).toBeDefined();
      });
      it('should call onFirstUpdate callback', function() {
        var t;
        t = new Tween({
          duration: 100,
          onFirstUpdate: function() {}
        }).setStartTime();
        spyOn(t.props, 'onFirstUpdate');
        t.update(t.props.startTime + 3);
        return expect(t.props.onFirstUpdate).toHaveBeenCalled();
      });
      it('should be called just once', function() {
        var cnt, t;
        cnt = 0;
        t = new Tween({
          duration: 100,
          onFirstUpdate: function() {
            return cnt++;
          }
        }).setStartTime();
        t.update(t.props.startTime + 3);
        t.update(t.props.startTime + 3);
        t.update(t.props.startTime + 3);
        return expect(cnt).toBe(1);
      });
      it('should have the right scope', function() {
        var isRightScope, t;
        isRightScope = false;
        t = new Tween({
          duration: 10,
          onFirstUpdate: function() {
            return isRightScope = this instanceof Tween;
          }
        });
        t.setStartTime().update(t.props.startTime + 2);
        return expect(isRightScope).toBe(true);
      });
      it('should be called after progress went further the timeline', function() {
        var isRightScope, t;
        isRightScope = false;
        t = new Tween({
          duration: 10,
          onFirstUpdate: function() {}
        }).setStartTime();
        t.update(t.props.startTime + 1);
        t.update(t.props.startTime + 12);
        spyOn(t.props, 'onFirstUpdate');
        t.update(t.props.startTime + 9);
        return expect(t.props.onFirstUpdate).toHaveBeenCalled();
      });
      it('should be called before onStart callback', function() {
        var isOnStart, isOnStartCalled, t;
        isOnStart = false;
        isOnStartCalled = true;
        t = new Tween({
          duration: 10,
          onStart: function() {
            return isOnStart = true;
          },
          onFirstUpdate: function() {
            return isOnStartCalled = isOnStart;
          }
        }).setStartTime();
        t.update(t.props.startTime + 1);
        return expect(isOnStartCalled).toBe(false);
      });
      return it('should be called after progress went before the timeline', function() {
        var isRightScope, t;
        isRightScope = false;
        t = new Tween({
          duration: 10,
          onFirstUpdate: function() {}
        }).setStartTime();
        t.update(t.props.startTime + 1);
        t.update(t.props.startTime + -1);
        spyOn(t.props, 'onFirstUpdate');
        t.update(t.props.startTime + 2);
        return expect(t.props.onFirstUpdate).toHaveBeenCalled();
      });
    });
    describe('onFirstUpdateBackward callback ->', function() {
      it('should be defined', function() {
        var t;
        t = new Tween({
          onFirstUpdateBackward: function() {}
        });
        return expect(t.props.onFirstUpdateBackward).toBeDefined();
      });
      it('should be called only on backward progress', function() {
        var isRightScope, t;
        isRightScope = false;
        t = new Tween({
          duration: 100,
          onFirstUpdateBackward: function() {}
        }).setStartTime();
        t.update(t.props.startTime + 500);
        spyOn(t.props, 'onFirstUpdateBackward');
        t.update(t.props.startTime + 40);
        return expect(t.props.onFirstUpdateBackward).toHaveBeenCalled();
      });
      it('should be called just once', function() {
        var cnt, t;
        cnt = 0;
        t = new Tween({
          duration: 100,
          onFirstUpdateBackward: function() {
            return cnt++;
          }
        }).setStartTime();
        t.prevTime = t.props.startTime + 103;
        t.update(t.props.startTime + 90);
        t.update(t.props.startTime + 80);
        t.update(t.props.startTime + 70);
        return expect(cnt).toBe(1);
      });
      it('should have the right scope', function() {
        var isRightScope, t;
        isRightScope = false;
        t = new Tween({
          duration: 10,
          onFirstUpdateBackward: function() {
            return isRightScope = this instanceof Tween;
          }
        });
        t.setStartTime();
        t.update(t.props.startTime + 12);
        t.update(t.props.startTime + 9);
        return expect(isRightScope).toBe(true);
      });
      it('should be called after progress went further the timeline', function() {
        var t;
        t = new Tween({
          duration: 10,
          onFirstUpdateBackward: function() {}
        }).setStartTime();
        t.prevTime = t.props.startTime + 11;
        t.update(t.props.startTime + 9);
        t.update(t.props.startTime + 12);
        spyOn(t.props, 'onFirstUpdateBackward');
        t.update(t.props.startTime + 9);
        return expect(t.props.onFirstUpdateBackward).toHaveBeenCalled();
      });
      it('should not be called at the start', function() {
        var t;
        t = new Tween({
          duration: 10,
          onFirstUpdateBackward: function() {}
        }).setStartTime();
        spyOn(t.props, 'onFirstUpdateBackward');
        t.update(t.props.startTime + 1);
        return expect(t.props.onFirstUpdateBackward).not.toHaveBeenCalled();
      });
      it('should be called even if new time is less then start time', function() {
        var t;
        t = new Tween({
          duration: 100,
          onFirstUpdateBackward: function() {}
        }).setStartTime();
        t.update(t.props.startTime + 500);
        spyOn(t.props, 'onFirstUpdateBackward');
        t.update(t.props.startTime - 40);
        return expect(t.props.onFirstUpdateBackward).toHaveBeenCalled();
      });
      return it('should be called ONCE if new time is less then start time', function() {
        var cnt, t;
        cnt = 0;
        t = new Tween({
          duration: 100,
          onFirstUpdateBackward: function() {
            return cnt++;
          }
        }).setStartTime();
        t.update(t.props.startTime + 500);
        t.update(t.props.startTime - 40);
        t.update(t.props.startTime - 100);
        return expect(cnt).toBe(1);
      });
    });
    describe('yoyo option ->', function() {
      it('should recieve yoyo option', function() {
        var t;
        t = new Tween({
          yoyo: true
        });
        return expect(t.props.yoyo).toBe(true);
      });
      return it('should toggle the progress direction on repeat', function() {
        var t, time;
        t = new Tween({
          repeat: 2,
          duration: 10,
          yoyo: true
        }).setStartTime();
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
    describe('easing ->', function() {
      it('should parse easing string', function() {
        var t;
        t = new Tween({
          easing: 'Linear.None'
        });
        return expect(typeof t.props.easing).toBe('function');
      });
      it('should parse standart easing', function() {
        var t;
        t = new Tween({
          easing: 'Sin.Out',
          duration: 100
        });
        t.setStartTime();
        t.update(t.props.startTime + 50);
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
        return expect(t.props.easing.toString()).toBe(easings.one.toString());
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
        t.setStartTime();
        t.update(t.props.startTime + 40);
        return setTimeout((function() {
          expect(easings.one).toHaveBeenCalled();
          return dfr();
        }), 50);
      });
    });
    describe('setProgress method ->', function() {
      return it('should set the current progress', function() {
        var t;
        t = new Tween({
          easing: 'Bounce.Out'
        });
        t.setProgress(.75);
        expect(t.progress).toBe(.75);
        return expect(t.easedProgress.toFixed(2)).toBe('0.97');
      });
    });
    describe('setProp method ->', function() {
      it('should set new timeline options', function() {
        var t;
        t = new Tween({
          duration: 100,
          delay: 0
        });
        t.setProp({
          duration: 1000,
          delay: 200
        });
        expect(t.props.duration).toBe(1000);
        return expect(t.props.delay).toBe(200);
      });
      it('should work with arguments', function() {
        var t;
        t = new Tween({
          duration: 100
        });
        t.setProp('duration', 1000);
        return expect(t.props.duration).toBe(1000);
      });
      it('should call calcDimentions method', function() {
        var t;
        t = new Tween({
          duration: 100
        });
        spyOn(t, 'calcDimentions');
        t.setProp('duration', 1000);
        return expect(t.calcDimentions).toHaveBeenCalled();
      });
      it('should update the time', function() {
        var t;
        t = new Tween({
          duration: 100,
          delay: 100
        });
        t.setProp('duration', 1000);
        return expect(t.props.time).toBe(1100);
      });
      return it('should parse easing', function() {
        var t;
        t = new Tween({
          duration: 100
        });
        t.setProp('easing', 'elastic.in');
        return expect(t.props.easing).toBe(mojs.easing.elastic["in"]);
      });
    });
    describe('run method ->', function() {
      it('should get the start time', function() {
        var t;
        t = new Tween;
        t.play();
        expect(t.props.startTime).toBeDefined();
        return expect(t.props.endTime).toBe(t.props.startTime + t.props.repeatTime);
      });
      it('should call the setStartTime method', function() {
        var t, time;
        t = new Tween;
        spyOn(t, 'setStartTime');
        time = 0;
        t.play(time);
        return expect(t.setStartTime).toHaveBeenCalledWith(time);
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
        var timeline;
        tweener.removeAll();
        timeline = new Tween({
          duration: 2000
        });
        timeline.play();
        spyOn(timeline, 'setProgress');
        timeline.stop();
        return expect(timeline.setProgress).toHaveBeenCalledWith(0);
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
      it('should set progress to 1', function() {
        var tw;
        tw = new Tween;
        spyOn(tw, 'setProgress');
        tw._complete();
        return expect(tw.setProgress).toHaveBeenCalledWith(1);
      });
      it('should set progress to number that was passed', function() {
        var tw;
        tw = new Tween;
        spyOn(tw, 'setProgress');
        tw._complete(0);
        return expect(tw.setProgress).toHaveBeenCalledWith(0);
      });
      it('should call onRepeatComplete callback', function() {
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
      it('should call onRepeatComplete callback', function() {
        var fun, isCalled, tw;
        isCalled = null;
        fun = function() {
          return isCalled = true;
        };
        tw = new Tween({
          onRepeatComplete: fun
        });
        tw._complete();
        return expect(isCalled).toBe(true);
      });
      it('should set isOnReverseComplete to false', function() {
        var tw;
        tw = new Tween;
        tw._complete();
        return expect(tw.isOnReverseComplete).toBe(false);
      });
      it('should set isCompleted to true', function() {
        var tw;
        tw = new Tween;
        tw._complete();
        return expect(tw.isCompleted).toBe(true);
      });
      return it('should set isStarted flag to false', function() {
        var tw;
        tw = new Tween;
        tw._complete();
        return expect(tw.isStarted).toBe(false);
      });
    });
    return describe('_repeatComplete method ->', function() {
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
        return expect(tw.isRepeatCompleted).toBe(true);
      });
    });
  });

}).call(this);
