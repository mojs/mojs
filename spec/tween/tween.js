(function() {
  var Tween, easing, h, tweener;

  Tween = window.mojs.Tween;

  easing = window.mojs.easing;

  h = window.mojs.h;

  tweener = window.mojs.tweener;

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
    describe('start ->', function() {
      it('should calculate start time', function() {
        var expectedTime, t;
        t = new Tween({
          duration: 1000,
          delay: 500
        }).start();
        expectedTime = performance.now() + 500;
        expect(t.props.startTime).toBeGreaterThan(expectedTime - 50);
        return expect(t.props.startTime).not.toBeGreaterThan(expectedTime);
      });
      it('should recieve the start time', function() {
        var t;
        t = new Tween({
          duration: 1000
        }).start(1);
        return expect(t.props.startTime).toBe(1);
      });
      it('should calculate end time', function() {
        var delay, duration, endTime, t;
        duration = 1000;
        delay = 500;
        t = new Tween({
          duration: duration,
          delay: delay
        }).start();
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
        }).start();
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
        }).start();
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
        t.start();
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
        }).start();
        t.update(t.props.startTime + 10);
        t.update(t.props.startTime + 60);
        expect(t.isCompleted).toBe(true);
        expect(t.isStarted).toBe(false);
        t.start();
        expect(t.isCompleted).toBe(false);
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
        t.start();
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
        t.start();
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
        t.start();
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
        t.start();
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
        t.start();
        t.update(t.props.startTime + 1000);
        return expect(t.progress).toBeCloseTo(1, 5);
      });
      it('should return true on the end', function() {
        var returnValue, t;
        t = new Tween({
          duration: 1000,
          delay: 200
        });
        t.start();
        returnValue = t.update(t.props.startTime + 1000);
        expect(t.progress).toBeCloseTo(1, 5);
        expect(t.isCompleted).toBe(true);
        return expect(returnValue).toBe(true);
      });
      it('should set progress to 1 on delay gaps', function() {
        var t;
        t = new Tween({
          duration: 1000,
          delay: 200
        });
        t.start();
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
        t.start();
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
        t.start();
        t.update(performance.now() + 1500);
        return expect(cnt).toBe(1);
      });
      return it('should set Tween to the end if Tween ended', function() {
        var t;
        t = new Tween({
          duration: 1000,
          delay: 500
        });
        t.start();
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
        t.start();
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
        t.start();
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
        t.start();
        t.update(t.props.startTime + t.props.duration + 50);
        t.update(t.props.startTime + t.props.duration + 100);
        t.update(t.props.startTime + t.props.duration + 150);
        return expect(t.onUpdate.calls.count()).toBe(1);
      });
      return it('should pass eased progress and raw progress', function() {
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
    });
    describe('onStart callback ->', function() {
      it('should be defined', function() {
        var t;
        t = new Tween({
          onStart: function() {}
        });
        t.start();
        return expect(t.props.onStart).toBeDefined();
      });
      it('should call onStart callback', function() {
        var t;
        t = new Tween({
          duration: 32,
          onStart: function() {}
        });
        t.start();
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
        }).start();
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
        t.start();
        t.update(t.props.startTime + 1);
        return expect(isRightScope).toBe(true);
      });
    });
    describe('onReverseComplete callback ->', function() {
      it('should be defined', function() {
        var t;
        t = new Tween({
          onReverseComplete: function() {}
        });
        return expect(t.props.onReverseComplete).toBeDefined();
      });
      it('should call onReverseComplete callback', function() {
        var t;
        t = new Tween({
          duration: 100,
          onReverseComplete: function() {}
        }).start();
        spyOn(t.props, 'onReverseComplete');
        t.update(t.props.startTime + 55);
        t.update(t.props.startTime);
        return expect(t.props.onReverseComplete).toHaveBeenCalled();
      });
      it('should onReverseComplete only once', function() {
        var cnt, t;
        cnt = 0;
        t = new Tween({
          duration: 100,
          onReverseComplete: function() {
            return cnt++;
          }
        }).start();
        t.update(t.props.startTime + 55);
        t.update(t.props.startTime);
        t.update(t.props.startTime - 20);
        t.update(t.props.startTime - 30);
        expect(cnt).toBe(1);
        return expect(t.isOnReverseComplete).toBe(true);
      });
      it('should reset isOnReverseComplete flag', function() {
        var cnt, t;
        cnt = 0;
        t = new Tween({
          duration: 100,
          onReverseComplete: function() {
            return cnt++;
          }
        }).start();
        t.update(t.props.startTime + 55);
        t.update(t.props.startTime);
        t.update(t.props.startTime - 20);
        t.update(t.props.startTime - 30);
        t.update(t.props.startTime + 1);
        return expect(t.isOnReverseComplete).toBe(false);
      });
      it('should reset isOnReverseComplete flag #2', function() {
        var cnt, t;
        cnt = 0;
        t = new Tween({
          duration: 100,
          onReverseComplete: function() {
            return cnt++;
          }
        }).start();
        t.update(t.props.startTime + 55);
        t.update(t.props.startTime);
        t.update(t.props.startTime - 20);
        t.update(t.props.startTime - 30);
        t.update(t.props.endTime);
        return expect(t.isOnReverseComplete).toBe(false);
      });
      it('should have the right scope', function() {
        var isRightScope, t;
        isRightScope = null;
        t = new Tween({
          duration: 100,
          onReverseComplete: function() {
            return isRightScope = this instanceof Tween;
          }
        }).start();
        t.update(t.props.startTime + 55);
        t.update(t.props.startTime);
        return expect(isRightScope).toBe(true);
      });
      it('should setProgress to 0 if progress went before startTime', function() {
        var t;
        t = new Tween({
          duration: 100,
          onReverseComplete: function() {},
          onUpdate: function() {}
        }).start();
        spyOn(t, 'onUpdate');
        t.update(t.props.startTime + 55);
        t.update(t.props.startTime - 20);
        expect(t.onUpdate).toHaveBeenCalledWith(0, 0);
        return expect(t.progress).toBe(0);
      });
      return it('should not setProgress to 0 if timeline isChained', function() {
        var t;
        t = new Tween({
          duration: 100,
          isChained: true,
          onReverseComplete: function() {},
          onUpdate: function() {}
        }).start();
        spyOn(t, 'onUpdate');
        t.update(t.props.startTime + 55);
        t.update(t.props.startTime - 20);
        return expect(t.onUpdate).not.toHaveBeenCalledWith(0);
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
        }).start();
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
        }).start();
        t.update(t.props.startTime + 33);
        t.update(t.props.startTime + 33);
        return expect(cnt).toBe(1);
      });
      it('should reset isCompleted flag', function() {
        var t;
        t = new Tween({
          duration: 32,
          onComplete: function() {}
        }).start();
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
        t.start().update(t.props.startTime + 2);
        return expect(isRightScope).toBe(true);
      });
      return it('should fire after the last onUpdate', function(dfr) {
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
        return t.start().update(t.props.startTime + 2);
      });
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
        }).start();
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
        }).start();
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
        t.start().update(t.props.startTime + 2);
        return expect(isRightScope).toBe(true);
      });
      it('should be called after progress went further the timeline', function() {
        var isRightScope, t;
        isRightScope = false;
        t = new Tween({
          duration: 10,
          onFirstUpdate: function() {}
        }).start();
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
        }).start();
        t.update(t.props.startTime + 1);
        return expect(isOnStartCalled).toBe(false);
      });
      return it('should be called after progress went before the timeline', function() {
        var isRightScope, t;
        isRightScope = false;
        t = new Tween({
          duration: 10,
          onFirstUpdate: function() {}
        }).start();
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
        }).start();
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
        }).start();
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
        t.start();
        t.update(t.props.startTime + 12);
        t.update(t.props.startTime + 9);
        return expect(isRightScope).toBe(true);
      });
      it('should be called after progress went further the timeline', function() {
        var t;
        t = new Tween({
          duration: 10,
          onFirstUpdateBackward: function() {}
        }).start();
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
        }).start();
        spyOn(t.props, 'onFirstUpdateBackward');
        t.update(t.props.startTime + 1);
        return expect(t.props.onFirstUpdateBackward).not.toHaveBeenCalled();
      });
      it('should be called even if new time is less then start time', function() {
        var t;
        t = new Tween({
          duration: 100,
          onFirstUpdateBackward: function() {}
        }).start();
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
        }).start();
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
        }).start();
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
        t.start();
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
        t.start();
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
        t.run();
        expect(t.props.startTime).toBeDefined();
        return expect(t.props.endTime).toBe(t.props.startTime + t.props.repeatTime);
      });
      it('should call the setStartTime method', function() {
        var t, time;
        t = new Tween;
        spyOn(t, 'start');
        time = 0;
        t.run(time);
        return expect(t.start).toHaveBeenCalledWith(time);
      });
      it('should add itself to tweener', function() {
        var t;
        t = new Tween;
        spyOn(tweener, 'add');
        t.run();
        return expect(tweener.add).toHaveBeenCalled();
      });
      return it('should not add itself to tweener if time was passed', function() {
        var t;
        t = new Tween;
        spyOn(tweener, 'add');
        t.run(10239123);
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
        timeline.run();
        timeline._removeFromTweener();
        return expect(tweener.tweens.length).toBe(0);
      });
    });
    describe('stop method', function() {
      it('should call r_emoveFromTweener method with self', function() {
        var timeline;
        tweener.removeAll();
        timeline = new Tween({
          duration: 2000
        });
        timeline.run();
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
        timeline.run();
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
        timeline.run();
        spyOn(timeline, '_removeFromTweener');
        timeline.pause();
        return expect(timeline._removeFromTweener).toHaveBeenCalled();
      });
    });
    return describe('_complete method ->', function() {
      it('should set progress to 1', function() {
        var tw;
        tw = new Tween;
        spyOn(tw, 'setProgress');
        tw._complete();
        return expect(tw.setProgress).toHaveBeenCalledWith(1);
      });
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
  });

}).call(this);
