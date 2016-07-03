(function() {
  var Thenable, Tunable, h, oldFun;

  h = mojs.h;

  Tunable = mojs.Tunable;

  Thenable = mojs.Thenable;

  oldFun = Tunable.prototype._declareDefaults;

  describe('Tunable ->', function() {
    it('set the _defaults up', function() {
      var defaults;
      defaults = {
        stroke: 'transparent',
        strokeOpacity: 1,
        strokeLinecap: '',
        strokeWidth: 2,
        strokeDasharray: 0,
        strokeDashoffset: 0,
        fill: 'deeppink',
        fillOpacity: 1,
        left: 0,
        top: 0,
        x: 0,
        y: 0,
        rx: 0,
        ry: 0,
        angle: 0,
        scale: 1,
        opacity: 1,
        points: 3,
        radius: {
          0: 50
        },
        radiusX: null,
        radiusY: null,
        isShowStart: false,
        isShowEnd: false,
        size: null,
        sizeGap: 0,
        callbacksContext: null
      };
      return Tunable.prototype._declareDefaults = function() {
        return this._defaults = defaults;
      };
    });
    describe('extention ->', function() {
      return it('should extend Thenable', function() {
        var rn;
        rn = new Tunable;
        return expect(rn instanceof Thenable).toBe(true);
      });
    });
    describe('_vars method ->', function() {});
    describe('_transformHistoryRecord method ->', function() {
      it('should add property to the record', function() {
        var result, tr;
        tr = new Tunable().then({
          radius: 0
        }).then({
          radius: 50
        });
        result = tr._transformHistoryRecord(0, 'x', 20);
        expect(tr._history[0].x).toBe(20);
        return expect(result).toBe(20);
      });
      it('should return null if next is different delta and index is 0', function() {
        var result, tr;
        tr = new Tunable({
          radius: {
            0: 50
          }
        }).then({
          radius: {
            100: 0
          }
        }).then({
          radius: 50
        });
        result = tr._transformHistoryRecord(0, 'radius', 20);
        expect(tr._history[0].radius).toBe(20);
        return expect(result).toBe(null);
      });
      it('should return null if old value is delta but index isnt 0', function() {
        var result, tr;
        tr = new Tunable({
          radius: {
            0: 50
          }
        }).then({
          radius: 0
        }).then({
          radius: 50
        });
        result = tr._transformHistoryRecord(1, 'radius', 20);
        expect(tr._history[1].radius[20]).toBe(0);
        return expect(result).toBe(null);
      });
      it('should rewrite everything until first delta # 0 index', function() {
        var result, tr;
        tr = new Tunable({
          radius: 75
        }).then({
          radius: 0
        }).then({
          radius: 50
        });
        result = tr._transformHistoryRecord(0, 'radius', 20);
        expect(tr._history[0].radius).toBe(20);
        expect(result).toBe(20);
        result = tr._transformHistoryRecord(1, 'radius', 20);
        expect(tr._history[1].radius[20]).toBe(0);
        return expect(result).toBe(null);
      });
      it('should rewrite everything until first delta # non 0 index', function() {
        var result, tr;
        tr = new Tunable({
          radius: 75
        }).then({
          radius: 0
        }).then({
          y: -200
        });
        result = tr._transformHistoryRecord(1, 'y', 20);
        expect(tr._history[1].y).toBe(20);
        return expect(result).toBe(20);
      });
      it('should rewrite everything until first defined item', function() {
        var result, tr;
        tr = new Tunable({
          duration: 2000,
          isIt: 1
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
        expect(result).toBe(1000);
        result = tr._transformHistoryRecord(1, 'duration', 1000);
        expect(tr._history[1].duration).toBe(1000);
        return expect(result).toBe(null);
      });
      it('should save new delta value and modify the next', function() {
        var delta, result, tr;
        tr = new Tunable({
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
        expect(result).toBe(100);
        result = tr._transformHistoryRecord(1, 'radius', 100);
        expect(tr._history[1].radius[100]).toBe(0);
        return expect(result).toBe(null);
      });
      it('should save new delta value and not modify the next', function() {
        var delta, result, tr;
        tr = new Tunable({
          radius: 75
        }).then({
          radius: {
            100: 0
          }
        }).then({
          radius: 50
        });
        delta = {
          20: 100
        };
        result = tr._transformHistoryRecord(0, 'radius', delta);
        expect(tr._history[0].radius[20]).toBe(100);
        return expect(result).toBe(null);
      });
      it('should return newValue if old value is delta and index is 0', function() {
        var result, tr;
        tr = new Tunable({
          duration: 2000
        }).then({
          duration: 300
        }).then({
          duration: 500
        });
        result = tr._transformHistoryRecord(0, 'duration', 500);
        expect(tr._history[0].duration).toBe(500);
        return expect(result).toBe(null);
      });
      it('should always stop at 0 index if tween prop', function() {
        var result, tr;
        tr = new Tunable({
          duration: 2000
        }).then({
          radius: 20
        }).then({
          radius: 30
        });
        result = tr._transformHistoryRecord(0, 'delay', 500);
        expect(tr._history[0].delay).toBe(500);
        return expect(result).toBe(null);
      });
      it('should immediately return null if new value is null ', function() {
        var result, tr;
        tr = new Tunable({
          duration: 2000
        }).then({
          radius: 20
        }).then({
          radius: 30
        });
        result = tr._transformHistoryRecord(0, 'delay', null);
        expect(tr._history[0].delay).toBe(void 0);
        return expect(result).toBe(null);
      });
      return it('should receive current and next history records', function() {
        var curr, next, result, tr;
        tr = new Tunable({
          duration: 2000
        }).then({
          radius: 20
        }).then({
          radius: 30
        });
        curr = {
          fill: 'red'
        };
        next = {
          fill: 'green'
        };
        result = tr._transformHistoryRecord(1, 'fill', 'green', curr, next);
        expect(curr).toEqual({
          fill: 'green'
        });
        return expect(result).toBe(null);
      });
    });
    describe('_transformHistory method ->', function() {
      return it('should call _transformHistoryFor for every new property ->', function() {
        var tr;
        tr = new Tunable({}).then({
          radius: 0
        }).then({
          radius: 50
        });
        spyOn(tr, '_transformHistoryFor');
        tr._transformHistory({
          x: 20,
          y: 'stagger(225, 10)'
        });
        expect(tr._transformHistoryFor).toHaveBeenCalledWith('x', '20px');
        expect(tr._transformHistoryFor).toHaveBeenCalledWith('y', '225px');
        return expect(tr._transformHistoryFor.calls.count()).toBe(2);
      });
    });
    describe('_transformHistoryFor method ->', function() {
      it('should call _transformHistoryRecord for every history record', function() {
        var tr;
        tr = new Tunable().then({
          radius: 0
        }).then({
          radius: 50
        });
        spyOn(tr, '_transformHistoryRecord').and.callThrough();
        tr._transformHistoryFor('x', 20);
        expect(tr._transformHistoryRecord).toHaveBeenCalledWith(0, 'x', 20);
        expect(tr._transformHistoryRecord).toHaveBeenCalledWith(1, 'x', 20);
        return expect(tr._transformHistoryRecord).toHaveBeenCalledWith(2, 'x', 20);
      });
      return it('should stop looping if _transformHistoryRecord returns null', function() {
        var r, tr;
        tr = new Tunable().then({
          radius: 0
        }).then({
          radius: 50
        });
        r = 0;
        tr._transformHistoryRecord = function() {
          if (r++ === 1) {
            return null;
          } else {
            return 20;
          }
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
        tr = new Tunable;
        props = {
          fill: 'hotpink',
          duration: 2000
        };
        tr._props = props;
        spyOn(tr.tween, '_setProp').and.callThrough();
        tr._resetTween(tr.tween, props);
        expect(props.shiftTime).toBe(0);
        return expect(tr.tween._setProp).toHaveBeenCalledWith(props);
      });
      return it('should pass shift time', function() {
        var props, shiftTime, tr;
        tr = new Tunable;
        props = {
          fill: 'hotpink',
          duration: 2000
        };
        tr._props = props;
        spyOn(tr.tween, '_setProp').and.callThrough();
        shiftTime = 500;
        tr._resetTween(tr.tween, props, shiftTime);
        expect(props.shiftTime).toBe(shiftTime);
        return expect(tr.tween._setProp).toHaveBeenCalledWith(props);
      });
    });
    describe('_resetTweens method ->', function() {
      it('should reset options on all tweens', function() {
        var tr;
        tr = new Tunable().then({
          fill: 'cyan'
        }).then({
          fill: 'yellow'
        });
        spyOn(tr.timeline._timelines[0], '_setProp');
        spyOn(tr.timeline._timelines[1], '_setProp');
        spyOn(tr.timeline._timelines[2], '_setProp');
        tr._resetTweens();
        expect(tr.timeline._timelines[0]._setProp).toHaveBeenCalledWith(tr._history[0]);
        expect(tr.timeline._timelines[1]._setProp).toHaveBeenCalledWith(tr._history[1]);
        return expect(tr.timeline._timelines[2]._setProp).toHaveBeenCalledWith(tr._history[2]);
      });
      it('should loop thru all tweens', function() {
        var shift, tr, tweens;
        tr = new Tunable().then({
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
      it('should set new props on timeline', function() {
        var timeline, tr;
        tr = new Tunable().then({
          fill: 'cyan'
        }).then({
          fill: 'yellow'
        });
        timeline = {};
        tr._props.timeline = timeline;
        spyOn(tr.timeline, '_setProp');
        tr._resetTweens();
        return expect(tr.timeline._setProp).toHaveBeenCalledWith(timeline);
      });
      it('should call _recalcTotalDuration on the timeline', function() {
        var tr;
        tr = new Tunable().then({
          fill: 'cyan'
        }).then({
          fill: 'yellow'
        });
        spyOn(tr.timeline, '_recalcTotalDuration');
        tr._resetTweens();
        return expect(tr.timeline._recalcTotalDuration).toHaveBeenCalled();
      });
      return it('should not throw if `isTimelineLess`', function() {
        var fun, tr;
        tr = new Tunable().then({
          fill: 'cyan'
        }).then({
          fill: 'yellow'
        });
        tr.timeline = tr.tween;
        fun = function() {
          return tr._resetTweens();
        };
        return expect(fun).not.toThrow();
      });
    });
    describe('tune method ->', function() {
      it('should extend defaults with passed object', function() {
        var byte, o;
        byte = new Tunable({
          strokeWidth: {
            10: 5
          }
        });
        spyOn(byte, '_tuneNewOptions');
        o = {
          strokeWidth: 20
        };
        byte.tune(o);
        return expect(byte._tuneNewOptions).toHaveBeenCalledWith(o);
      });
      it('should not transform history if object was not passed', function() {
        var byte;
        byte = new Tunable({
          strokeWidth: {
            10: 5
          }
        });
        spyOn(byte, '_transformHistory');
        byte.tune();
        return expect(byte._transformHistory).not.toHaveBeenCalled();
      });
      it('should not override deltas', function() {
        var byte;
        byte = new Tunable();
        byte._deltas['strokeWidth'] = {
          10: 5
        };
        byte.tune({
          stroke: 'green'
        });
        return expect(byte._deltas.strokeWidth).toBeDefined();
      });
      it('should rewrite history', function() {
        var byte;
        byte = new Tunable();
        byte._props = {
          fill: 'cyan',
          strokeWidth: 5,
          opacity: 1
        };
        byte.tune({
          fill: 'yellow'
        });
        expect(byte._history[0].fill).toBe('yellow');
        expect(byte._history[0].strokeWidth).toBe(5);
        return expect(byte._history[0].opacity).toBe(1);
      });
      it('should accept new options', function() {
        var byte;
        byte = new Tunable({
          strokeWidth: {
            10: 5
          }
        });
        byte.tune({
          strokeWidth: 25
        });
        expect(byte._props.strokeWidth).toBe(25);
        return expect(byte._deltas.strokeWidth).not.toBeDefined();
      });
      it('should not modify old options', function() {
        var byte;
        byte = new Tunable({
          strokeWidth: {
            10: 5
          },
          radius: 33
        });
        byte._props.radius = 33;
        byte.tune({
          strokeWidth: 25
        });
        return expect(byte._props.radius).toBe(33);
      });
      it('should restore array props', function() {
        var byte;
        byte = new Tunable({
          strokeWidth: {
            10: 5
          },
          radius: 33
        });
        byte._props.strokeDasharray = 'stagger(100, 20)';
        byte.tune({
          strokeDasharray: 'stagger(150, 100)'
        });
        return expect(byte._history[0].strokeDasharray).toBe(150);
      });
      it('should call _recalcTotalDuration on timeline', function() {
        var byte;
        byte = new Tunable;
        spyOn(byte.timeline, '_recalcTotalDuration');
        byte.tune({
          duration: 2000
        });
        return expect(byte.timeline._recalcTotalDuration).toHaveBeenCalled();
      });
      it('should call _transformHistory', function() {
        var byte, o;
        byte = new Tunable;
        spyOn(byte, '_transformHistory');
        o = {
          duration: 2000
        };
        byte.tune(o);
        return expect(byte._transformHistory).toHaveBeenCalledWith(o);
      });
      it('should not call _transformHistory if optionless', function() {
        var byte;
        byte = new Tunable;
        spyOn(byte, '_transformHistory');
        byte.tune();
        return expect(byte._transformHistory).not.toHaveBeenCalled();
      });
      it('shoud not warn if history is 1 record long', function() {
        var byte;
        byte = new Tunable({
          duration: 2000
        });
        spyOn(h, 'warn');
        byte.tune({
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
        byte = new Tunable({
          duration: 2000
        }).then({
          radius: 500
        });
        return expect(function() {
          return byte.tune();
        }).not.toThrow();
      });
    });
    describe('_tuneSubModules method ->', function() {
      return it('should call _tuneNewOptions on every sub module', function() {
        var rn;
        rn = new Tunable({
          radius: 20
        }).then({
          radius: 40
        }).then({
          radius: 70
        });
        spyOn(rn._modules[0], '_tuneNewOptions');
        spyOn(rn._modules[1], '_tuneNewOptions');
        spyOn(rn._modules[2], '_tuneNewOptions');
        rn._tuneSubModules();
        expect(rn._modules[0]._tuneNewOptions).not.toHaveBeenCalled();
        expect(rn._modules[1]._tuneNewOptions).toHaveBeenCalled();
        return expect(rn._modules[2]._tuneNewOptions).toHaveBeenCalled();
      });
    });
    describe('generate method ->', function() {
      it('should call tune with _o', function() {
        var rn;
        rn = new Tunable({
          radius: 20
        });
        spyOn(rn, 'tune').and.callThrough();
        rn.generate();
        return expect(rn.tune).toHaveBeenCalledWith(rn._o);
      });
      return it('should return this', function() {
        var rn;
        rn = new Tunable({
          radius: 20
        });
        return expect(rn.generate()).toBe(rn);
      });
    });
    describe('_isRewriteNext ->', function() {
      it('should return true is the next record === the current one', function() {
        var currentValue, nextValue, tn;
        tn = new Tunable({
          radius: 20
        });
        currentValue = 20;
        nextValue = 20;
        return expect(tn._isRewriteNext(currentValue, nextValue)).toBe(true);
      });
      it('should return false is the next record !== the current one', function() {
        var currentValue, nextValue, tn;
        tn = new Tunable({
          radius: 20
        });
        currentValue = 20;
        nextValue = 21;
        return expect(tn._isRewriteNext(currentValue, nextValue)).toBe(false);
      });
      it('should return false if there is no newxt item', function() {
        var currentValue, nextValue, tn;
        tn = new Tunable({
          radius: 20
        });
        currentValue = 20;
        nextValue = null;
        return expect(tn._isRewriteNext(currentValue, nextValue)).toBe(false);
      });
      it('should true if next is ∆ and start value === current one', function() {
        var currentValue, nextValue, tn;
        tn = new Tunable({
          radius: 20
        });
        currentValue = 20;
        nextValue = {
          20: 100
        };
        return expect(tn._isRewriteNext(currentValue, nextValue)).toBe(true);
      });
      it('should true if deltas', function() {
        var currentValue, nextValue, tn;
        tn = new Tunable({
          radius: 20
        });
        currentValue = {
          50: 20
        };
        nextValue = {
          20: 100
        };
        return expect(tn._isRewriteNext(currentValue, nextValue)).toBe(true);
      });
      return it('should current and next are null', function() {
        var currentValue, nextValue, tn;
        tn = new Tunable({
          radius: 20
        });
        currentValue = null;
        nextValue = null;
        return expect(tn._isRewriteNext(currentValue, nextValue)).toBe(true);
      });
    });
    return it('clean the _defaults  up', function() {
      return Tunable.prototype._declareDefaults = oldFun;
    });
  });

}).call(this);
