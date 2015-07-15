(function() {
  var Timeline, easing, h;

  Timeline = window.mojs.Timeline;

  easing = window.mojs.easing;

  h = window.mojs.h;

  describe('Timeline ->', function() {
    describe('init ->', function() {
      return it('calc totalDuration and totalTime', function() {
        var t;
        t = new Timeline({
          duration: 1000,
          delay: 100
        });
        expect(t.props.totalDuration).toBe(1000);
        expect(t.props.totalTime).toBe(1100);
        t = new Timeline({
          duration: 1000,
          delay: 100,
          repeat: 5
        });
        expect(t.props.totalDuration).toBe(6500);
        return expect(t.props.totalTime).toBe(6600);
      });
    });
    describe('defaults ->', function() {
      it('should have vars', function() {
        var t;
        t = new Timeline;
        expect(t.props).toBeDefined();
        expect(t.h).toBeDefined();
        return expect(t.progress).toBe(0);
      });
      it('should have defaults', function() {
        var t;
        t = new Timeline;
        expect(t.defaults.duration).toBe(600);
        expect(t.defaults.delay).toBe(0);
        expect(t.defaults.yoyo).toBe(false);
        return expect(t.defaults.isChained).toBe(false);
      });
      return it('should extend defaults to options', function() {
        var t;
        t = new Timeline({
          duration: 1000
        });
        expect(t.o.duration).toBe(1000);
        return expect(t.o.delay).toBe(0);
      });
    });
    describe('isChained option ->', function() {
      it('should recieve isChained option', function() {
        var t;
        t = new Timeline({
          duration: 1000,
          isChained: true
        });
        return expect(t.o.isChained).toBe(true);
      });
      return it('should fallback to default isChained option', function() {
        var t;
        t = new Timeline({
          duration: 1000
        });
        return expect(t.o.isChained).toBe(false);
      });
    });
    describe('start ->', function() {
      it('should calculate start time', function() {
        var now, t;
        t = new Timeline({
          duration: 1000,
          delay: 500
        }).start();
        now = performance.now() + 500;
        expect(t.props.startTime).not.toBeGreaterThan(now);
        return expect(t.props.startTime).toBeGreaterThan(now - 50);
      });
      it('should recieve the start time', function() {
        var t;
        t = new Timeline({
          duration: 1000
        }).start(1);
        return expect(t.props.startTime).toBe(1);
      });
      it('should calculate end time', function() {
        var t;
        t = new Timeline({
          duration: 1000,
          delay: 500
        }).start();
        return expect(t.props.endTime).toBe(t.props.startTime + 1000);
      });
      it('should calculate end time if repeat', function() {
        var t, time;
        t = new Timeline({
          duration: 1000,
          delay: 500,
          repeat: 2
        }).start();
        time = t.props.startTime + (3 * (1000 + 500)) - 500;
        return expect(t.props.endTime).toBeCloseTo(time, 5);
      });
      return it('should restart flags', function() {
        var t;
        t = new Timeline({
          duration: 20,
          repeat: 2
        }).start();
        t.update(t.props.startTime + 10);
        t.update(t.props.startTime + 60);
        expect(t.isCompleted).toBe(true);
        expect(t.isStarted).toBe(true);
        t.start();
        expect(t.isCompleted).toBe(false);
        return expect(t.isStarted).toBe(false);
      });
    });
    describe('update method ->', function() {
      it('should update progress', function() {
        var t, time;
        t = new Timeline({
          duration: 1000,
          delay: 500
        });
        t.start();
        time = t.props.startTime + 200;
        t.update(time);
        return expect(t.progress).toBe(.2);
      });
      it('should update progress with repeat', function() {
        var t;
        t = new Timeline({
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
        t = new Timeline({
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
        t = new Timeline({
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
        t = new Timeline({
          duration: 1000,
          delay: 200,
          repeat: 2
        });
        t.start();
        t.update(t.props.startTime + 1000);
        return expect(t.progress).toBeCloseTo(1, 5);
      });
      it('should not call update method if timeline isnt active "-"', function() {
        var t;
        t = new Timeline({
          duration: 1000,
          onUpdate: function() {}
        });
        t.start();
        spyOn(t, 'onUpdate');
        t.update(performance.now() - 500);
        return expect(t.onUpdate).not.toHaveBeenCalled();
      });
      it('should not call update method if timeline isnt active "+"', function() {
        var cnt, t;
        cnt = 0;
        t = new Timeline({
          duration: 1000,
          onUpdate: function() {
            return cnt++;
          }
        });
        t.start();
        t.update(performance.now() + 1500);
        return expect(cnt).toBe(1);
      });
      return it('should set Timeline to the end if Timeline ended', function() {
        var t;
        t = new Timeline({
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
        t = new Timeline({
          onUpdate: function() {}
        });
        return expect(t.o.onUpdate).toBeDefined();
      });
      it('should call onUpdate callback with the current progress', function() {
        var t;
        t = new Timeline({
          duration: 1000,
          easing: 'bounce.out',
          onUpdate: function() {}
        });
        spyOn(t, 'onUpdate');
        t.start();
        t.update(t.props.startTime + 500);
        return expect(t.onUpdate).toHaveBeenCalledWith(t.easedProgress);
      });
      return it('should have the right scope', function() {
        var isRightScope, t;
        isRightScope = false;
        t = new Timeline({
          onUpdate: function() {
            return isRightScope = this instanceof Timeline;
          }
        });
        t.start();
        t.update(t.props.startTime + 200);
        return expect(isRightScope).toBe(true);
      });
    });
    describe('onStart callback ->', function() {
      it('should be defined', function() {
        var t;
        t = new Timeline({
          onStart: function() {}
        });
        t.start();
        return expect(t.o.onStart).toBeDefined();
      });
      it('should call onStart callback', function() {
        var t;
        t = new Timeline({
          duration: 32,
          onStart: function() {}
        });
        t.start();
        spyOn(t.o, 'onStart');
        t.update(t.props.startTime + 1);
        return expect(t.o.onStart).toHaveBeenCalled();
      });
      it('should be called just once', function() {
        var cnt, t;
        cnt = 0;
        t = new Timeline({
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
        t = new Timeline({
          onStart: function() {
            return isRightScope = this instanceof Timeline;
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
        t = new Timeline({
          onReverseComplete: function() {}
        });
        return expect(t.o.onReverseComplete).toBeDefined();
      });
      it('should call onReverseComplete callback', function() {
        var t;
        t = new Timeline({
          duration: 100,
          onReverseComplete: function() {}
        }).start();
        spyOn(t.o, 'onReverseComplete');
        t.update(t.props.startTime + 55);
        t.update(t.props.startTime);
        return expect(t.o.onReverseComplete).toHaveBeenCalled();
      });
      it('should onReverseComplete only once', function() {
        var cnt, t;
        cnt = 0;
        t = new Timeline({
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
        t = new Timeline({
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
        t = new Timeline({
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
        t = new Timeline({
          duration: 100,
          onReverseComplete: function() {
            return isRightScope = this instanceof Timeline;
          }
        }).start();
        t.update(t.props.startTime + 55);
        t.update(t.props.startTime);
        return expect(isRightScope).toBe(true);
      });
      it('should setProgress to 0 if progress went before startTime', function() {
        var t;
        t = new Timeline({
          duration: 100,
          onReverseComplete: function() {},
          onUpdate: function() {}
        }).start();
        spyOn(t, 'onUpdate');
        t.update(t.props.startTime + 55);
        t.update(t.props.startTime - 20);
        expect(t.onUpdate).toHaveBeenCalledWith(0);
        return expect(t.progress).toBe(0);
      });
      return it('should not setProgress to 0 if timeline isChained', function() {
        var t;
        t = new Timeline({
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
        t = new Timeline({
          onComplete: function() {}
        });
        return expect(t.o.onComplete).toBeDefined();
      });
      it('should call onComplete callback', function() {
        var t;
        t = new Timeline({
          duration: 100,
          onComplete: function() {}
        }).start();
        spyOn(t.o, 'onComplete');
        t.update(t.props.startTime + 101);
        return expect(t.o.onComplete).toHaveBeenCalled();
      });
      it('should be called just once', function() {
        var cnt, t;
        cnt = 0;
        t = new Timeline({
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
        t = new Timeline({
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
        t = new Timeline({
          duration: 1,
          onComplete: function() {
            return isRightScope = this instanceof Timeline;
          }
        });
        t.start().update(t.props.startTime + 2);
        return expect(isRightScope).toBe(true);
      });
      return it('should fire after the last onUpdate', function(dfr) {
        var proc, t;
        proc = 0;
        t = new Timeline({
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
        t = new Timeline({
          onFirstUpdate: function() {}
        });
        return expect(t.o.onFirstUpdate).toBeDefined();
      });
      it('should call onFirstUpdate callback', function() {
        var t;
        t = new Timeline({
          duration: 100,
          onFirstUpdate: function() {}
        }).start();
        spyOn(t.o, 'onFirstUpdate');
        t.update(t.props.startTime + 3);
        return expect(t.o.onFirstUpdate).toHaveBeenCalled();
      });
      it('should be called just once', function() {
        var cnt, t;
        cnt = 0;
        t = new Timeline({
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
        t = new Timeline({
          duration: 10,
          onFirstUpdate: function() {
            return isRightScope = this instanceof Timeline;
          }
        });
        t.start().update(t.props.startTime + 2);
        return expect(isRightScope).toBe(true);
      });
      it('should be called after progress went further the timeline', function() {
        var isRightScope, t;
        isRightScope = false;
        t = new Timeline({
          duration: 10,
          onFirstUpdate: function() {}
        }).start();
        t.update(t.props.startTime + 1);
        t.update(t.props.startTime + 12);
        spyOn(t.o, 'onFirstUpdate');
        t.update(t.props.startTime + 9);
        return expect(t.o.onFirstUpdate).toHaveBeenCalled();
      });
      it('should be called before onStart callback', function() {
        var isOnStart, isOnStartCalled, t;
        isOnStart = false;
        isOnStartCalled = true;
        t = new Timeline({
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
        t = new Timeline({
          duration: 10,
          onFirstUpdate: function() {}
        }).start();
        t.update(t.props.startTime + 1);
        t.update(t.props.startTime + -1);
        spyOn(t.o, 'onFirstUpdate');
        t.update(t.props.startTime + 2);
        return expect(t.o.onFirstUpdate).toHaveBeenCalled();
      });
    });
    describe('onFirstUpdateBackward callback ->', function() {
      it('should be defined', function() {
        var t;
        t = new Timeline({
          onFirstUpdateBackward: function() {}
        });
        return expect(t.o.onFirstUpdateBackward).toBeDefined();
      });
      it('should be called only on backward progress', function() {
        var isRightScope, t;
        isRightScope = false;
        t = new Timeline({
          duration: 100,
          onFirstUpdateBackward: function() {}
        }).start();
        t.update(t.props.startTime + 500);
        spyOn(t.o, 'onFirstUpdateBackward');
        t.update(t.props.startTime + 40);
        return expect(t.o.onFirstUpdateBackward).toHaveBeenCalled();
      });
      it('should be called just once', function() {
        var cnt, t;
        cnt = 0;
        t = new Timeline({
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
        t = new Timeline({
          duration: 10,
          onFirstUpdateBackward: function() {
            return isRightScope = this instanceof Timeline;
          }
        });
        t.start();
        t.update(t.props.startTime + 12);
        t.update(t.props.startTime + 9);
        return expect(isRightScope).toBe(true);
      });
      it('should be called after progress went further the timeline', function() {
        var t;
        t = new Timeline({
          duration: 10,
          onFirstUpdateBackward: function() {}
        }).start();
        t.prevTime = t.props.startTime + 11;
        t.update(t.props.startTime + 9);
        t.update(t.props.startTime + 12);
        spyOn(t.o, 'onFirstUpdateBackward');
        t.update(t.props.startTime + 9);
        return expect(t.o.onFirstUpdateBackward).toHaveBeenCalled();
      });
      it('should not be called at the start', function() {
        var t;
        t = new Timeline({
          duration: 10,
          onFirstUpdateBackward: function() {}
        }).start();
        spyOn(t.o, 'onFirstUpdateBackward');
        t.update(t.props.startTime + 1);
        return expect(t.o.onFirstUpdateBackward).not.toHaveBeenCalled();
      });
      it('should be called even if new time is less then start time', function() {
        var t;
        t = new Timeline({
          duration: 100,
          onFirstUpdateBackward: function() {}
        }).start();
        t.update(t.props.startTime + 500);
        spyOn(t.o, 'onFirstUpdateBackward');
        t.update(t.props.startTime - 40);
        return expect(t.o.onFirstUpdateBackward).toHaveBeenCalled();
      });
      return it('should be called ONCE if new time is less then start time', function() {
        var cnt, t;
        cnt = 0;
        t = new Timeline({
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
        t = new Timeline({
          yoyo: true
        });
        return expect(t.o.yoyo).toBe(true);
      });
      return it('should toggle the progress direction on repeat', function() {
        var t, time;
        t = new Timeline({
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
        t = new Timeline({
          easing: 'Linear.None'
        });
        return expect(typeof t.props.easing).toBe('function');
      });
      it('should parse standart easing', function() {
        var t;
        t = new Timeline({
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
        t = new Timeline({
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
        t = new Timeline({
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
    describe('setProc method ->', function() {
      it('should set the current progress', function() {
        var t;
        t = new Timeline({
          easing: 'Bounce.Out'
        });
        t.setProc(.75);
        expect(t.progress).toBe(.75);
        return expect(t.easedProgress.toFixed(2)).toBe('0.97');
      });
      it('should set new timeline options', function() {
        var t;
        t = new Timeline({
          duration: 100,
          delay: 0
        });
        t.setProp({
          duration: 1000,
          delay: 200
        });
        expect(t.o.duration).toBe(1000);
        return expect(t.o.delay).toBe(200);
      });
      it('should work with arguments', function() {
        var t;
        t = new Timeline({
          duration: 100
        });
        t.setProp('duration', 1000);
        return expect(t.o.duration).toBe(1000);
      });
      it('should call calcDimentions method', function() {
        var t;
        t = new Timeline({
          duration: 100
        });
        spyOn(t, 'calcDimentions');
        t.setProp('duration', 1000);
        return expect(t.calcDimentions).toHaveBeenCalled();
      });
      return it('should update the totalTime', function() {
        var t;
        t = new Timeline({
          duration: 100
        });
        t.setProp('duration', 1000);
        return expect(t.props.totalTime).toBe(1000);
      });
    });
    describe('parseEasing method ->', function() {
      it('should parse function easing', function() {
        var fun, t;
        t = new Timeline({
          duration: 100
        });
        fun = function() {};
        expect(t.parseEasing(fun)).toBe(fun);
        return expect(typeof t.parseEasing(fun)).toBe('function');
      });
      describe('easing name option ->', function() {
        return it('should parse string easing', function() {
          var t;
          t = new Timeline({
            duration: 100
          });
          return expect(typeof t.parseEasing('cubic.in')).toBe('function');
        });
      });
      describe('SVG path option ->', function() {
        it('should parse SVG path easing', function() {
          var t;
          t = new Timeline({
            duration: 100
          });
          return expect(typeof t.parseEasing('M0,100 L100,0')).toBe('function');
        });
        return it('should call easing.path method', function() {
          var t;
          t = new Timeline({
            duration: 100
          });
          spyOn(window.mojs.easing, 'path');
          t.parseEasing('M0,100 L100,0');
          return expect(window.mojs.easing.path).toHaveBeenCalled();
        });
      });
      return describe('bezier option ->', function() {
        it('should parse bezier easing', function() {
          var t;
          t = new Timeline({
            duration: 100
          });
          return expect(typeof t.parseEasing([0.42, 0, 1, 1])).toBe('function');
        });
        return it('should call bezier method', function() {
          var t;
          t = new Timeline({
            duration: 100
          });
          spyOn(window.mojs.easing, 'bezier');
          t.parseEasing([0.42, 0, 1, 1]);
          return expect(window.mojs.easing.bezier).toHaveBeenCalled();
        });
      });
    });
    return describe('splitEasing method', function() {
      var t;
      t = new Timeline({
        duration: 100
      });
      it('should split easing string to array', function() {
        expect(t.splitEasing('Linear.None')[0]).toBe('linear');
        return expect(t.splitEasing('Linear.None')[1]).toBe('none');
      });
      it('should return default easing Linear.None if argument is bad', function() {
        expect(t.splitEasing(4)[0]).toBe('linear');
        return expect(t.splitEasing(4)[1]).toBe('none');
      });
      it('should return default easing Linear.None if argument is bad #2', function() {
        expect(t.splitEasing('')[0]).toBe('linear');
        return expect(t.splitEasing('')[1]).toBe('none');
      });
      it('should return default easing Linear.None if argument is bad #3', function() {
        expect(t.splitEasing('Linear..None')[0]).toBe('linear');
        return expect(t.splitEasing('Linear..None')[1]).toBe('none');
      });
      it('should work with lovercase easing', function() {
        expect(t.splitEasing('linear..none')[0]).toBe('linear');
        return expect(t.splitEasing('linear..none')[1]).toBe('none');
      });
      return it('should work with function easing', function() {
        easing = function() {
          return console.log('function');
        };
        return expect(t.splitEasing(easing) + '').toBe(easing + '');
      });
    });
  });

}).call(this);
