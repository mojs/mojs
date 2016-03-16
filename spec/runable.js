(function() {
  var Runable, Thenable, h;

  h = mojs.h;

  Runable = mojs.Runable;

  Thenable = mojs.Thenable;

  describe('Runable ->', function() {
    describe('extention ->', function() {
      return it('should extend Thenable', function() {
        var rn;
        rn = new Runable;
        return expect(rn instanceof Thenable).toBe(true);
      });
    });
    describe('_vars method ->', function() {});
    describe('_transformHistoryRecord method ->', function() {
      it('should add property to the record', function() {
        var result, tr;
        tr = new Runable().then({
          radius: 0
        }).then({
          radius: 50
        });
        result = tr._transformHistoryRecord(0, 'x', 20);
        expect(tr._history[0].x).toBe(20);
        return expect(!!result).toBe(false);
      });
      it('should return true if old value is delta', function() {
        var result, tr;
        tr = new Runable({
          radius: {
            0: 50
          }
        }).then({
          radius: 0
        }).then({
          radius: 50
        });
        result = tr._transformHistoryRecord(0, 'radius', 20);
        expect(tr._history[0].radius[20]).toBe(50);
        return expect(!!result).toBe(true);
      });
      it('should rewrite everything until first delta', function() {
        var result, tr;
        tr = new Runable({
          radius: 75
        }).then({
          radius: 0
        }).then({
          radius: 50
        });
        result = tr._transformHistoryRecord(0, 'radius', 20);
        expect(tr._history[0].radius).toBe(20);
        expect(!!result).toBe(false);
        result = tr._transformHistoryRecord(1, 'radius', 20);
        expect(tr._history[1].radius[20]).toBe(0);
        return expect(!!result).toBe(true);
      });
      it('should rewrite everything until first defined item', function() {
        var result, tr;
        tr = new Runable({
          duration: 2000
        }).then({
          radius: 0
        }).then({
          radius: 50,
          duration: 5000
        }).then({
          radius: 50
        });
        result = tr._transformHistoryRecord(0, 'duration', 1000);
        expect(tr._history[0].duration).toBe(1000);
        expect(!!result).toBe(false);
        result = tr._transformHistoryRecord(1, 'duration', 1000);
        expect(tr._history[1].duration).toBe(1000);
        return expect(!!result).toBe(true);
      });
      return it('should save new delta value and modify the next', function() {
        var delta, result, tr;
        tr = new Runable({
          radius: 75
        }).then({
          radius: 0
        }).then({
          radius: 50
        });
        delta = {
          20: 100
        };
        result = tr._transformHistoryRecord(0, 'radius', delta);
        expect(tr._history[0].radius[20]).toBe(100);
        expect(!!result).toBe(false);
        result = tr._transformHistoryRecord(1, 'radius', delta);
        expect(tr._history[1].radius[100]).toBe(0);
        return expect(!!result).toBe(true);
      });
    });
    describe('_transformHistory method ->', function() {
      return it('should call _transformHistoryFor for every new property ->', function() {
        var tr;
        tr = new Runable({}).then({
          radius: 0
        }).then({
          radius: 50
        });
        spyOn(tr, '_transformHistoryFor');
        tr._transformHistory({
          x: 20
        });
        expect(tr._transformHistoryFor).toHaveBeenCalledWith('x', 20);
        return expect(tr._transformHistoryFor.calls.count()).toBe(1);
      });
    });
    describe('_transformHistoryFor method ->', function() {
      it('should call _transformHistoryRecord for every history record', function() {
        var tr;
        tr = new Runable().then({
          radius: 0
        }).then({
          radius: 50
        });
        spyOn(tr, '_transformHistoryRecord');
        tr._transformHistoryFor('x', 20);
        expect(tr._transformHistoryRecord).toHaveBeenCalledWith(0, 'x', 20);
        expect(tr._transformHistoryRecord).toHaveBeenCalledWith(1, 'x', 20);
        return expect(tr._transformHistoryRecord).toHaveBeenCalledWith(2, 'x', 20);
      });
      return it('should stop looping if _transformHistoryRecord returns true', function() {
        var r, tr;
        tr = new Runable().then({
          radius: 0
        }).then({
          radius: 50
        });
        r = 0;
        tr._transformHistoryRecord = function() {
          return r++ === 1;
        };
        spyOn(tr, '_transformHistoryRecord').and.callThrough();
        tr._transformHistoryFor('x', 20);
        expect(tr._transformHistoryRecord).toHaveBeenCalledWith(0, 'x', 20);
        expect(tr._transformHistoryRecord).toHaveBeenCalledWith(1, 'x', 20);
        return expect(tr._transformHistoryRecord).not.toHaveBeenCalledWith(2, 'x', 20);
      });
    });
    describe('_resetTween method ->', function() {
      it('should set props to the tween', function() {
        var props, tr;
        tr = new Runable;
        props = {
          fill: 'hotpink',
          duration: 2000
        };
        tr._props = props;
        spyOn(tr.tween, '_setProps').and.callThrough();
        tr._resetTween(tr.tween, props);
        expect(props.shiftTime).toBe(0);
        return expect(tr.tween._setProps).toHaveBeenCalledWith(props);
      });
      return it('should pass shift time', function() {
        var props, shiftTime, tr;
        tr = new Runable;
        props = {
          fill: 'hotpink',
          duration: 2000
        };
        tr._props = props;
        spyOn(tr.tween, '_setProps').and.callThrough();
        shiftTime = 500;
        tr._resetTween(tr.tween, props, shiftTime);
        expect(props.shiftTime).toBe(shiftTime);
        return expect(tr.tween._setProps).toHaveBeenCalledWith(props);
      });
    });
    describe('_resetTweens method ->', function() {
      it('should reset options on all tweens', function() {
        var tr;
        tr = new Runable().then({
          fill: 'cyan'
        }).then({
          fill: 'yellow'
        });
        spyOn(tr.timeline._timelines[0], '_setProps');
        spyOn(tr.timeline._timelines[1], '_setProps');
        spyOn(tr.timeline._timelines[2], '_setProps');
        tr._resetTweens();
        expect(tr.timeline._timelines[0]._setProps).toHaveBeenCalledWith(tr._history[0]);
        expect(tr.timeline._timelines[1]._setProps).toHaveBeenCalledWith(tr._history[1]);
        return expect(tr.timeline._timelines[2]._setProps).toHaveBeenCalledWith(tr._history[2]);
      });
      it('should loop thru all tweens', function() {
        var shift, tr, tweens;
        tr = new Runable().then({
          fill: 'cyan'
        }).then({
          fill: 'yellow'
        });
        spyOn(tr, '_resetTween');
        tr._resetTweens();
        tweens = tr.timeline._timelines;
        shift = 0;
        expect(tr._resetTween).toHaveBeenCalledWith(tweens[0], tr._history[0], shift);
        shift += tweens[0]._props.repeatTime;
        expect(tr._resetTween).toHaveBeenCalledWith(tweens[1], tr._history[1], shift);
        shift += tweens[1]._props.repeatTime;
        return expect(tr._resetTween).toHaveBeenCalledWith(tweens[2], tr._history[2], shift);
      });
      return it('should call _recalcTotalDuration on the timeline', function() {
        var tr;
        tr = new Runable().then({
          fill: 'cyan'
        }).then({
          fill: 'yellow'
        });
        spyOn(tr.timeline, '_recalcTotalDuration');
        tr._resetTweens();
        return expect(tr.timeline._recalcTotalDuration).toHaveBeenCalled();
      });
    });
    return describe('run method ->', function() {
      it('should extend defaults with passed object', function() {
        var byte, o;
        byte = new Runable({
          strokeWidth: {
            10: 5
          }
        });
        spyOn(byte, '_extendDefaults');
        o = {
          strokeWidth: 20
        };
        byte.run(o);
        return expect(byte._extendDefaults).toHaveBeenCalledWith(o);
      });
      it('should not transform history if object was not passed', function() {
        var byte;
        byte = new Runable({
          strokeWidth: {
            10: 5
          }
        });
        spyOn(byte, '_transformHistory');
        byte.run();
        return expect(byte._transformHistory).not.toHaveBeenCalled();
      });
      it('should not override deltas', function() {
        var byte;
        byte = new Runable();
        byte._deltas['strokeWidth'] = {
          10: 5
        };
        byte.run({
          stroke: 'green'
        });
        return expect(byte._deltas.strokeWidth).toBeDefined();
      });
      it('should start tween', function() {
        var byte;
        byte = new Runable({
          strokeWidth: {
            10: 5
          }
        });
        spyOn(byte, 'stop');
        spyOn(byte, 'play');
        byte.run();
        expect(byte.stop).toHaveBeenCalled();
        return expect(byte.play).toHaveBeenCalled();
      });
      it('should accept new options', function() {
        var byte;
        byte = new Runable({
          strokeWidth: {
            10: 5
          }
        });
        byte.run({
          strokeWidth: 25
        });
        expect(byte._props.strokeWidth).toBe(25);
        return expect(byte._deltas.strokeWidth).not.toBeDefined();
      });
      it('should not modify old options', function() {
        var byte;
        byte = new Runable({
          strokeWidth: {
            10: 5
          },
          radius: 33
        });
        byte._props.radius = 33;
        byte.run({
          strokeWidth: 25
        });
        return expect(byte._props.radius).toBe(33);
      });
      it('should call _recalcTotalDuration on timeline', function() {
        var byte;
        byte = new Runable;
        spyOn(byte.timeline, '_recalcTotalDuration');
        byte.run({
          duration: 2000
        });
        return expect(byte.timeline._recalcTotalDuration).toHaveBeenCalled();
      });
      it('should call _transformHistory', function() {
        var byte, o;
        byte = new Runable;
        spyOn(byte, '_transformHistory');
        o = {
          duration: 2000
        };
        byte.run(o);
        return expect(byte._transformHistory).toHaveBeenCalledWith(o);
      });
      it('should not call _transformHistory if optionless', function() {
        var byte;
        byte = new Runable;
        spyOn(byte, '_transformHistory');
        byte.run();
        return expect(byte._transformHistory).not.toHaveBeenCalled();
      });
      it('shoud not warn if history is 1 record long', function() {
        var byte;
        byte = new Runable({
          duration: 2000
        });
        spyOn(h, 'warn');
        byte.run({
          duration: 100,
          delay: 100,
          repeat: 1,
          yoyo: false,
          easing: 'Linear.None',
          onStart: function() {},
          onUpdate: function() {},
          onComplete: function() {}
        });
        expect(h.warn).not.toHaveBeenCalled();
        expect(byte._history[0].duration).toBe(100);
        return expect(byte._props.duration).toBe(100);
      });
      return it('shoud work with no arguments passed', function() {
        var byte;
        byte = new Runable({
          duration: 2000
        }).then({
          radius: 500
        });
        return expect(function() {
          return byte.run();
        }).not.toThrow();
      });
    });
  });

}).call(this);
