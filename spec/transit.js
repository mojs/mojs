(function() {
  var Bit, Byte, Rect, Transit, Tweenable, h, ns, svg;

  Byte = mojs.Transit;

  Transit = mojs.Transit;

  Bit = mojs.shapesMap.getShape('bit');

  Tweenable = mojs.Tweenable;

  Rect = mojs.shapesMap.getShape('rect');

  h = mojs.helpers;

  ns = 'http://www.w3.org/2000/svg';

  svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, 'svg') : void 0;

  console.warn = function() {};

  console.error = function() {};

  describe('Transit ->', function() {
    it('should have own _vars function ->', function() {
      var byte;
      byte = new Byte;
      expect(byte._vars).toBeDefined();
      return expect(function() {
        return byte._vars();
      }).not.toThrow();
    });
    describe('extension ->', function() {
      return it('should extend Tweenable class', function() {
        var byte;
        byte = new Byte;
        return expect(byte instanceof Tweenable).toBe(true);
      });
    });
    describe('defaults object ->', function() {
      return it('should have defaults object', function() {
        var byte;
        byte = new Byte;
        expect(byte.defaults).toBeDefined();
        expect(byte.defaults.stroke).toBe('transparent');
        expect(byte.defaults.strokeOpacity).toBe(1);
        expect(byte.defaults.strokeLinecap).toBe('');
        expect(byte.defaults.strokeWidth).toBe(2);
        expect(byte.defaults.strokeDasharray).toBe(0);
        expect(byte.defaults.strokeDashoffset).toBe(0);
        expect(byte.defaults.fill).toBe('deeppink');
        expect(byte.defaults.fillOpacity).toBe(1);
        expect(byte.defaults.left).toBe(0);
        expect(byte.defaults.top).toBe(0);
        expect(byte.defaults.x).toBe(0);
        expect(byte.defaults.y).toBe(0);
        expect(byte.defaults.rx).toBe(0);
        expect(byte.defaults.ry).toBe(0);
        expect(byte.defaults.angle).toBe(0);
        expect(byte.defaults.scale).toBe(1);
        expect(byte.defaults.opacity).toBe(1);
        expect(byte.defaults.points).toBe(3);
        expect(byte.defaults.radius[0]).toBe(50);
        expect(byte.defaults.radiusX).toBe(null);
        expect(byte.defaults.radiusY).toBe(null);
        expect(byte.defaults.isShowEnd).toBe(false);
        expect(byte.defaults.isShowStart).toBe(false);
        expect(byte.defaults.size).toBe(null);
        return expect(byte.defaults.sizeGap).toBe(0);
      });
    });
    describe('origin object ->', function() {
      return it('should have origin object', function() {
        var byte;
        byte = new Byte;
        expect(byte.origin).toBeDefined();
        return expect(typeof byte.origin).toBe('object');
      });
    });
    describe('options object ->', function() {
      it('should receive empty options object by default', function() {
        var byte;
        byte = new Byte;
        return expect(byte._o).toBeDefined();
      });
      return it('should receive options object', function() {
        var byte;
        byte = new Byte({
          option: 1
        });
        return expect(byte._o.option).toBe(1);
      });
    });
    describe('index option ->', function() {
      it('should receive index option', function() {
        var byte;
        byte = new Byte({
          index: 5
        });
        return expect(byte.index).toBe(5);
      });
      return it('should fallback to 0', function() {
        var byte;
        byte = new Byte;
        return expect(byte.index).toBe(0);
      });
    });
    describe('_isDelta method ->', function() {
      return it('should detect if value is not a delta value', function() {
        var byte;
        byte = new Byte({
          radius: 45,
          stroke: {
            'deeppink': 'pink'
          }
        });
        expect(byte._isDelta(45)).toBe(false);
        expect(byte._isDelta('45')).toBe(false);
        expect(byte._isDelta(['45'])).toBe(false);
        expect(byte._isDelta({
          unit: 'px',
          value: 20
        })).toBe(false);
        return expect(byte._isDelta({
          20: 30
        })).toBe(true);
      });
    });
    describe('_extendDefaults method ->', function() {
      it('should extend defaults object to properties', function() {
        var byte;
        byte = new Byte({
          radius: 45,
          radiusX: 50
        });
        expect(byte._props.radius).toBe(45);
        return expect(byte._props.radiusX).toBe(50);
      });
      it('should extend defaults object to properties if 0', function() {
        var byte;
        byte = new Byte({
          radius: 0
        });
        return expect(byte._props.radius).toBe(0);
      });
      it('should extend defaults object to properties if object was passed', function() {
        var byte;
        byte = new Byte({
          radius: {
            45: 55
          }
        });
        return expect(byte._props.radius).toBe(45);
      });
      it('should ignore properties defined in skipProps object', function() {
        var byte;
        byte = new Byte({
          radius: 45
        });
        byte.skipProps = {
          radius: 1
        };
        byte._o.radius = 50;
        byte._extendDefaults();
        return expect(byte._props.radius).toBe(45);
      });
      it('should extend defaults object to properties if array was passed', function() {
        var byte;
        byte = new Byte({
          radius: [50, 100]
        });
        return expect(byte._props.radius.join(', ')).toBe('50, 100');
      });
      it('should extend defaults object to properties if rand was passed', function() {
        var byte;
        byte = new Byte({
          radius: 'rand(0, 10)'
        });
        expect(byte._props.radius).toBeDefined();
        expect(byte._props.radius).toBeGreaterThan(-1);
        return expect(byte._props.radius).not.toBeGreaterThan(10);
      });
      it('should receive object to iterate from', function() {
        var byte, fillBefore;
        byte = new Byte({
          radius: 'rand(0, 10)',
          fill: 'deeppink'
        });
        fillBefore = byte._props.fill;
        byte._extendDefaults({
          radius: 10
        });
        expect(byte._props.radius).toBe(10);
        return expect(byte._props.fill).toBe(fillBefore);
      });
      return it('should work with new values', function() {
        var byte, onStart;
        onStart = function() {};
        byte = new Byte({
          radius: 10
        }).then({
          onStart: onStart
        });
        return expect(byte.history[1].onStart).toBe(onStart);
      });
    });
    describe('stagger values', function() {
      return it('should extend defaults object to properties if stagger was passed', function() {
        var byte;
        byte = new Byte({
          radius: 'stagger(200)'
        });
        byte.index = 2;
        byte._extendDefaults();
        return expect(byte._props.radius).toBe(400);
      });
    });
    describe('options history ->', function() {
      it('should have history array', function() {
        var byte;
        byte = new Byte;
        return expect(h.isArray(byte.history)).toBe(true);
      });
      it('should save options to history array', function() {
        var byte;
        byte = new Byte({
          radius: 20
        });
        return expect(byte.history.length).toBe(1);
      });
      return it('should extend options by defaults on run first add', function() {
        var byte;
        byte = new Byte({
          opacity: .5
        });
        byte.run();
        return expect(byte.history[0].radius[0]).toBe(50);
      });
    });
    describe('_transformHistory method ->', function() {
      return it('should call _transformHistoryFor for every new property ->', function() {
        var tr;
        tr = new Transit({}).then({
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
        tr = new Transit().then({
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
        tr = new Transit().then({
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
    describe('_transformHistoryRecord method ->', function() {
      it('should add property to the record', function() {
        var result, tr;
        tr = new Transit().then({
          radius: 0
        }).then({
          radius: 50
        });
        result = tr._transformHistoryRecord(0, 'x', 20);
        expect(tr.history[0].x).toBe(20);
        return expect(!!result).toBe(false);
      });
      it('should return true if old value is delta', function() {
        var result, tr;
        tr = new Transit({
          radius: {
            0: 50
          }
        }).then({
          radius: 0
        }).then({
          radius: 50
        });
        result = tr._transformHistoryRecord(0, 'radius', 20);
        expect(tr.history[0].radius[20]).toBe(50);
        return expect(!!result).toBe(true);
      });
      it('should rewrite everything until first delta', function() {
        var result, tr;
        tr = new Transit({
          radius: 75
        }).then({
          radius: 0
        }).then({
          radius: 50
        });
        result = tr._transformHistoryRecord(0, 'radius', 20);
        expect(tr.history[0].radius).toBe(20);
        expect(!!result).toBe(false);
        result = tr._transformHistoryRecord(1, 'radius', 20);
        expect(tr.history[1].radius[20]).toBe(0);
        return expect(!!result).toBe(true);
      });
      it('should rewrite everything until first defined item', function() {
        var result, tr;
        tr = new Transit({
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
        expect(tr.history[0].duration).toBe(1000);
        expect(!!result).toBe(false);
        result = tr._transformHistoryRecord(1, 'duration', 1000);
        expect(tr.history[1].duration).toBe(1000);
        return expect(!!result).toBe(true);
      });
      return it('should save new delta value and modify the next', function() {
        var delta, result, tr;
        tr = new Transit({
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
        expect(tr.history[0].radius[20]).toBe(100);
        expect(!!result).toBe(false);
        result = tr._transformHistoryRecord(1, 'radius', delta);
        expect(tr.history[1].radius[100]).toBe(0);
        return expect(!!result).toBe(true);
      });

      /* old tests */

      /* old tests */
    });
    describe('then method ->', function() {
      it('should add new tween with options', function() {
        var byte;
        byte = new Byte({
          radius: 20,
          duration: 1000
        });
        byte.then({
          radius: 5
        });
        return expect(byte.timeline._timelines.length).toBe(2);
      });
      it('should return if no options passed or options are empty', function() {
        var byte;
        byte = new Byte({
          radius: 20,
          duration: 1000,
          delay: 10
        });
        spyOn(byte, '_mergeThenOptions');
        byte.then();
        return expect(byte._mergeThenOptions).not.toHaveBeenCalled();
      });
      it('should inherit radius for radiusX/Y options', function() {
        var byte;
        byte = new Byte({
          radius: 20,
          duration: 1000
        });
        byte.then({
          radiusX: 5
        });
        return expect(byte.history[1].radiusX[20]).toBe(5);
      });
      it('should inherit radius for radiusX/Y options in further chain', function() {
        var byte;
        byte = new Byte({
          radius: 20,
          duration: 1000
        });
        byte.then({
          radiusX: 5
        });
        byte.then({
          radiusY: 40
        });
        return expect(byte.history[1].radiusX[20]).toBe(5);
      });
      it('should inherit radius for radiusX/Y options in further chain #2', function() {
        var byte;
        byte = new Byte({
          radius: 20,
          duration: 1000
        });
        byte.then({
          radiusX: 5
        });
        byte.then({
          radiusY: 40,
          radiusX: 50
        });
        expect(byte.history[2].radiusX[5]).toBe(50);
        return expect(byte.history[2].radiusY[20]).toBe(40);
      });
      it('should add new timeline with options #2', function() {
        var byte;
        byte = new Byte({
          radius: 20,
          duration: 1000,
          delay: 10,
          yoyo: true
        });
        byte.then({
          radius: 5
        });
        expect(byte.timeline._timelines[1]._props.duration).toBe(1000);
        expect(byte.timeline._timelines[1]._props.yoyo).toBe(false);
        return expect(byte.timeline._timelines[1]._props.shiftTime).toBe(1010);
      });
      it('should merge then options and add them to the history', function() {
        var byte;
        byte = new Byte({
          radius: 20,
          duration: 1000,
          delay: 10
        });
        byte.then({
          radius: 5,
          yoyo: true,
          delay: 100
        });
        expect(byte.history.length).toBe(2);
        expect(byte.history[1].radius[20]).toBe(5);
        expect(byte.history[1].duration).toBe(1000);
        expect(byte.history[1].delay).toBe(100);
        return expect(byte.history[1].yoyo).toBe(true);
      });
      it('should always merge then options with the last history item', function() {
        var byte;
        byte = new Byte({
          radius: 20,
          duration: 1000,
          delay: 10
        });
        byte.then({
          radius: 5,
          yoyo: true,
          delay: 100
        });
        byte.then({
          radius: {
            100: 10
          },
          delay: 0,
          stroke: 'green'
        });
        expect(byte.history.length).toBe(3);
        expect(byte.history[2].radius[100]).toBe(10);
        expect(byte.history[2].duration).toBe(1000);
        expect(byte.history[2].delay).toBe(0);
        expect(byte.history[2].yoyo).toBe(void 0);
        return expect(byte.history[2].stroke['transparent']).toBe('green');
      });
      it('should not copy callbacks', function() {
        var byte, onStart, onUpdate;
        onUpdate = function() {};
        onStart = function() {};
        byte = new Byte({
          radius: 20,
          duration: 1000,
          delay: 200,
          onUpdate: onUpdate,
          onStart: onStart
        });
        byte.then({
          radius: 5,
          yoyo: true,
          delay: 100
        });
        expect(byte.history.length).toBe(2);
        expect(byte.history[1].radius[20]).toBe(5);
        expect(byte.history[1].duration).toBe(1000);
        expect(byte.history[1].delay).toBe(100);
        expect(byte.history[1].yoyo).toBe(true);
        expect(byte.history[1].onComplete).toBe(void 0);
        expect(byte.history[1].onUpdate).toBeDefined();
        expect(byte.history[1].onUpdate).not.toBe(onUpdate);
        byte.timeline.setProgress(.73);
        byte.timeline.setProgress(.74);
        byte.timeline.setProgress(.75);
        expect(byte._props.onComplete).not.toBeDefined();
        return expect(byte._props.onStart).not.toBeDefined();
      });
      describe('onUpdate binding', function() {
        it('should override onUpdate', function() {
          var tr;
          tr = new Transit().then({
            fill: 'red'
          });
          return expect(typeof tr.timeline._timelines[1].onUpdate).toBe('function');
        });
        it('should not override onUpdate function if exists', function() {
          var args, isRightScope, options, tr;
          isRightScope = null;
          args = null;
          options = {
            onUpdate: function() {
              isRightScope = this === tr;
              return args = arguments;
            }
          };
          tr = new Transit().then(options);
          expect(typeof tr.timeline._timelines[1].onUpdate).toBe('function');
          tr.timeline.setProgress(0);
          tr.timeline.setProgress(.1);
          tr.timeline.setProgress(.8);
          expect(isRightScope).toBe(true);
          expect(args[0]).toBe(.6);
          expect(args[1]).toBe(.6);
          expect(args[2]).toBe(true);
          return expect(args[3]).toBe(false);
        });
        return it('should call _setProgress method', function() {
          var options, tr;
          options = {
            onUpdate: function() {}
          };
          tr = new Transit().then(options);
          tr.timeline.setProgress(0);
          spyOn(tr, '_setProgress');
          tr.timeline.setProgress(.8);
          return expect(tr._setProgress).toHaveBeenCalledWith(.6);
        });
      });
      describe('onFirstUpdate binding', function() {
        it('should override onFirstUpdate', function() {
          var tr;
          tr = new Transit().then({
            fill: 'red'
          });
          return expect(typeof tr.timeline._timelines[1]._props.onFirstUpdate).toBe('function');
        });
        it('should not override onFirstUpdate function if exists', function() {
          var args, isRightScope, options, tr;
          isRightScope = null;
          args = null;
          options = {
            onFirstUpdate: function() {
              isRightScope = this === tr;
              return args = arguments;
            }
          };
          tr = new Transit().then(options);
          expect(typeof tr.timeline._timelines[1]._props.onFirstUpdate).toBe('function');
          tr.timeline.setProgress(0);
          tr.timeline.setProgress(.1);
          tr.timeline.setProgress(.4);
          tr.timeline.setProgress(.5);
          tr.timeline.setProgress(.8);
          expect(isRightScope).toBe(true);
          expect(args[0]).toBe(true);
          return expect(args[1]).toBe(false);
        });
        return it('should call _tuneOptions method', function() {
          var tr;
          tr = new Transit().then({
            onUpdate: function() {}
          });
          tr.timeline.setProgress(0);
          tr.timeline.setProgress(.2);
          spyOn(tr, '_tuneOptions');
          tr.timeline.setProgress(.8);
          return expect(tr._tuneOptions).toHaveBeenCalledWith(tr.history[1]);
        });
      });
      it('should bind onFirstUpdate function #1', function() {
        var byte, type1, type2;
        byte = new Byte({
          radius: 20,
          duration: 1000,
          delay: 10
        });
        byte.then({
          radius: 5,
          yoyo: true,
          delay: 100
        });
        byte.then({
          radius: {
            100: 10
          },
          delay: 200,
          stroke: 'green'
        });
        type1 = typeof byte.timeline._timelines[1]._props.onFirstUpdate;
        type2 = typeof byte.timeline._timelines[2]._props.onFirstUpdate;
        expect(type1).toBe('function');
        return expect(type2).toBe('function');
      });
      it('should bind onFirstUpdate function #2', function() {
        var byte, type1, type2;
        byte = new Byte({
          radius: 20,
          duration: 1000,
          delay: 10
        });
        byte.then({
          radius: 5,
          yoyo: true,
          delay: 100
        });
        byte.then({
          radius: {
            100: 10
          },
          delay: 200,
          stroke: 'green'
        });
        type1 = typeof byte.timeline._timelines[1]._props.onFirstUpdate;
        type2 = typeof byte.timeline._timelines[2]._props.onFirstUpdate;
        expect(type1).toBe('function');
        return expect(type2).toBe('function');
      });
      return it('should call _overrideUpdateCallbacks method with merged object', function() {
        var byte;
        byte = new Byte({
          radius: 20,
          duration: 1000,
          delay: 10
        });
        spyOn(byte, '_overrideUpdateCallbacks');
        byte.then({
          fill: 'red'
        });
        return expect(byte._overrideUpdateCallbacks).toHaveBeenCalled();
      });
    });
    describe('_tuneOptions method ->', function() {
      it('should call _extendDefaults with options', function() {
        var byte, o;
        byte = new Byte;
        o = {
          radius: 50
        };
        spyOn(byte, '_tuneOptions');
        byte._tuneOptions(o);
        return expect(byte._tuneOptions).toHaveBeenCalled();
      });
      return it('should call _calcSize and _setElStyles methods', function() {
        var byte;
        byte = new Byte;
        spyOn(byte, '_calcSize');
        spyOn(byte, '_setElStyles');
        byte._tuneOptions({
          radius: 50
        });
        expect(byte._calcSize).toHaveBeenCalled();
        return expect(byte._setElStyles).toHaveBeenCalled();
      });
    });
    describe('size calculations ->', function() {
      it('should calculate size el size depending on largest value', function() {
        var byte;
        byte = new Byte({
          radius: {
            25: -100
          },
          strokeWidth: {
            6: 4
          }
        });
        return expect(byte._props.size).toBe(212);
      });
      it('should calculate size el size based on radiusX/Y', function() {
        var byte;
        byte = new Byte({
          radius: {
            25: -100
          },
          radiusX: 200,
          strokeWidth: {
            6: 4
          }
        });
        return expect(byte._props.size).toBe(412);
      });
      it('should calculate size el size based on radiusX/Y', function() {
        var byte;
        byte = new Byte({
          radius: {
            25: -100
          },
          radiusX: 200,
          radiusY: 300,
          strokeWidth: {
            6: 4
          }
        });
        return expect(byte._props.size).toBe(612);
      });
      it('should calculate size el size based on radiusX/Y', function() {
        var byte;
        byte = new Byte({
          radius: {
            25: -100
          },
          radiusY: 30,
          strokeWidth: {
            6: 4
          }
        });
        return expect(byte._props.size).toBe(212);
      });
      it('should calculate size el size based on radiusX/Y', function() {
        var byte;
        byte = new Byte({
          radius: 50,
          radiusY: 30,
          strokeWidth: {
            6: 4
          }
        });
        return expect(byte._props.size).toBe(112);
      });
      it('should have sizeGap option', function() {
        var byte;
        byte = new Byte({
          radius: {
            25: -100
          },
          strokeWidth: {
            6: 4
          },
          sizeGap: 40
        });
        return expect(byte._props.size).toBe(292);
      });
      it('should calculate size el size depending on shape\'s ratio', function() {
        var byte, rect;
        byte = new Byte({
          radius: {
            25: -100
          },
          strokeWidth: {
            6: 4
          },
          shape: 'rect'
        });
        svg = document.createElementNS(ns, 'svg');
        rect = new Rect({
          ctx: svg
        });
        return expect(byte._props.size).toBe(212 * rect.ratio);
      });
      it('should not calculate size el size if size was passed', function() {
        var byte;
        byte = new Byte({
          radius: 100,
          strokeWidth: 5,
          size: 400
        });
        return expect(byte._props.size).toBe(400);
      });
      it('should not calculate size el size if external context was passed', function() {
        var byte;
        byte = new Byte({
          radius: 100,
          strokeWidth: 5,
          size: 400,
          ctx: svg
        });
        return expect(byte._props.size).toBe(400);
      });
      it('should calculate center based on el size', function() {
        var byte;
        byte = new Byte({
          radius: {
            25: -100
          },
          strokeWidth: {
            4: 6
          }
        });
        expect(byte._props.size).toBe(212);
        return expect(byte._props.center).toBe(106);
      });
      it('should increase size if elastic.out/inout easing', function() {
        var byte;
        byte = new Byte({
          radius: {
            25: -100
          },
          strokeWidth: {
            4: 6
          },
          easing: 'Elastic.Out'
        });
        expect(byte._props.size).toBe(212 * 1.25);
        expect(byte._props.center).toBe(byte._props.size / 2);
        byte = new Byte({
          radius: {
            25: -100
          },
          strokeWidth: {
            4: 6
          },
          easing: 'Elastic.InOut'
        });
        expect(byte._props.size).toBe(212 * 1.25);
        return expect(byte._props.center).toBe(byte._props.size / 2);
      });
      return it('should increase size if back.out/inout easing', function() {
        var byte;
        byte = new Byte({
          radius: {
            25: -100
          },
          strokeWidth: {
            4: 6
          },
          easing: 'back.Out'
        });
        expect(byte._props.size).toBe(212 * 1.1);
        expect(byte._props.center).toBe(byte._props.size / 2);
        byte = new Byte({
          radius: {
            25: -100
          },
          strokeWidth: {
            4: 6
          },
          easing: 'Back.InOut'
        });
        expect(byte._props.size).toBe(212 * 1.1);
        return expect(byte._props.center).toBe(byte._props.size / 2);
      });
    });
    describe('el creation ->', function() {
      it('should create el', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        return expect(byte.el.tagName.toLowerCase()).toBe('div');
      });
      it('should create context', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        return expect(byte.el.firstChild.tagName.toLowerCase()).toBe('svg');
      });
      it('should set context styles', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        svg = byte.el.firstChild;
        expect(svg.style.position).toBe('absolute');
        expect(svg.style.width).toBe('100%');
        return expect(svg.style.height).toBe('100%');
      });
      it('should not create context and el if context was passed', function() {
        var byte;
        svg.isSvg = true;
        byte = new Byte({
          ctx: svg
        });
        expect(byte.el).toBe(byte.bit.el);
        expect(byte.ctx).toBeDefined();
        return expect(byte.ctx.isSvg).toBe(true);
      });
      it('should set el size', function() {
        var byte;
        byte = new Byte({
          radius: 25,
          strokeWidth: 2,
          x: 10,
          y: 20
        });
        expect(byte.el.style.position).toBe('absolute');
        expect(byte.el.style.width).toBe('54px');
        expect(byte.el.style.height).toBe('54px');
        expect(byte.el.style.display).toBe('none');
        expect(byte.el.style['margin-left']).toBe('-27px');
        expect(byte.el.style['margin-top']).toBe('-27px');
        expect(byte.el.style['marginLeft']).toBe('-27px');
        expect(byte.el.style['marginTop']).toBe('-27px');
        return expect(byte.isShown).toBe(false);
      });
      it('should skip props if foreign context', function() {
        var byte;
        byte = new Byte({
          radius: 25,
          strokeWidth: 2,
          x: 10,
          y: 20,
          ctx: svg
        });
        expect(byte.el.style.display).toBe('none');
        expect(byte.el.style.opacity).toBe('1');
        expect(byte.el.style.position).not.toBe('absolute');
        expect(byte.el.style.width).not.toBe('54px');
        expect(byte.el.style.height).not.toBe('54px');
        expect(byte.el.style['margin-left']).not.toBe('-27px');
        expect(byte.el.style['margin-top']).not.toBe('-27px');
        expect(byte.el.style['marginLeft']).not.toBe('-27px');
        expect(byte.el.style['marginTop']).not.toBe('-27px');
        return expect(byte.isShown).toBe(false);
      });
      it('should set display: block if isShowStart was passed', function() {
        var byte;
        byte = new Byte({
          isShowStart: true
        });
        expect(byte.el.style.display).toBe('block');
        return expect(byte.isShown).toBe(true);
      });
      it('should set el size', function() {
        var byte;
        byte = new Byte({
          radius: 25,
          strokeWidth: 2,
          x: 10,
          y: 20
        });
        byte.isRendered = false;
        h.remBase = 8;
        byte._render();
        h.remBase = 16;
        expect(byte.el.style.position).toBe('absolute');
        expect(byte.el.style.width).toBe('54px');
        expect(byte.el.style.height).toBe('54px');
        expect(byte.el.style['margin-left']).toBe('-27px');
        expect(byte.el.style['margin-top']).toBe('-27px');
        expect(byte.el.style['marginLeft']).toBe('-27px');
        return expect(byte.el.style['marginTop']).toBe('-27px');
      });
      it('should create bit', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        expect(byte.bit).toBeDefined();
        return expect(byte.bit.o.isDrawLess).toBe(true);
      });
      it('should create bit based on shape option or fallback to circle', function() {
        var byte, byte2;
        byte = new Byte({
          radius: 25,
          shape: 'rect'
        });
        byte2 = new Byte({
          radius: 25
        });
        expect(byte.bit.shape).toBe('rect');
        return expect(byte2.bit.shape).toBe('ellipse');
      });
      it('should add itself to body', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        return expect(byte.el.parentNode.tagName.toLowerCase()).toBe('body');
      });
      return it('should add itself to parent if the option was passed', function() {
        var byte, div;
        div = typeof document.createElement === "function" ? document.createElement('div') : void 0;
        div.isDiv = true;
        byte = new Byte({
          radius: 25,
          parent: div
        });
        return expect(byte.el.parentNode.isDiv).toBe(true);
      });
    });
    describe('opacity set ->', function() {
      it('should set a position with respect to units', function() {
        var byte;
        byte = new Byte({
          opacity: .5
        });
        return expect(byte.el.style.opacity).toBe('0.5');
      });
      return it('should animate opacity', function(dfr) {
        var byte;
        byte = new Byte({
          opacity: {
            1: 0
          },
          duration: 100,
          onComplete: function() {
            expect(byte.el.style.opacity).toBe('0');
            return dfr();
          }
        });
        return byte.run();
      });
    });
    describe('position set ->', function() {
      return describe('x/y coordinates ->', function() {
        it('should set a position with respect to units', function() {
          var byte;
          byte = new Byte({
            left: 100,
            top: 50
          });
          expect(byte.el.style.left).toBe('100px');
          return expect(byte.el.style.top).toBe('50px');
        });
        it('should animate position', function(dfr) {
          var byte;
          byte = new Byte({
            left: {
              100: '200px'
            },
            duration: 100,
            onComplete: function() {
              expect(byte.el.style.left).toBe('200px');
              return dfr();
            }
          });
          return byte.play();
        });
        it('should warn when x/y animated position and not foreign context', function() {
          var byte;
          spyOn(console, 'warn');
          byte = new Byte({
            left: {
              100: '200px'
            }
          });
          byte.run();
          return expect(console.warn).toHaveBeenCalled();
        });
        it('should notwarn when x/y animated position and foreign context', function() {
          var byte;
          spyOn(console, 'warn');
          byte = new Byte({
            left: {
              100: '200px'
            },
            ctx: svg
          });
          byte.run();
          return expect(console.warn).not.toHaveBeenCalled();
        });
        it('should animate position with respect to units', function(dfr) {
          var byte;
          byte = new Byte({
            left: {
              '20%': '50%'
            },
            duration: 100
          });
          byte.play();
          return setTimeout(function() {
            expect(byte.el.style.left).toBe('50%');
            return dfr();
          }, 500);
        });
        it('end unit that were not specified should fallback to start unit', function() {
          var byte;
          byte = new Byte({
            left: {
              '20%': 50
            },
            duration: 200
          });
          byte.play();
          expect(byte.deltas.left.start.unit).toBe('%');
          return expect(byte.deltas.left.end.unit).toBe('%');
        });
        it('should fallback to end units if units are different', function(dfr) {
          var byte;
          byte = new Byte({
            left: {
              '20%': '50px'
            },
            duration: 200,
            onComplete: function() {
              expect(byte.el.style.left).toBe('50px');
              return dfr();
            }
          });
          return byte.play();
        });
        return describe('x/y coordinates ->', function() {
          it('should set a position with respect to units', function() {
            var byte, s, tr;
            byte = new Byte({
              x: 100,
              y: 50
            });
            s = byte.el.style;
            tr = s.transform || s["" + mojs.h.prefix.css + "transform"];
            return expect(tr).toBe('translate(100px, 50px) scale(1)');
          });
          it('should animate position', function(dfr) {
            var byte;
            byte = new Byte({
              x: {
                100: '200px'
              },
              duration: 200,
              onComplete: function() {
                var s, tr;
                s = byte.el.style;
                tr = s.transform || s["" + mojs.h.prefix.css + "transform"];
                expect(tr).toBe('translate(200px, 0px) scale(1)');
                return dfr();
              }
            });
            return byte.play();
          });
          it('should animate position with respect to units', function(dfr) {
            var byte;
            byte = new Byte({
              x: {
                '20%': '50%'
              },
              duration: 200,
              onComplete: function() {
                var s, tr;
                s = byte.el.style;
                tr = s.transform || s["" + mojs.h.prefix.css + "transform"];
                expect(tr).toBe('translate(50%, 0px) scale(1)');
                return dfr();
              }
            });
            return byte.play();
          });
          return it('should fallback to end units if units are differnt', function(dfr) {
            var byte;
            byte = new Byte({
              x: {
                '20%': '50px'
              },
              y: {
                0: '50%'
              },
              duration: 200,
              onComplete: function() {
                var s, tr;
                s = byte.el.style;
                tr = s.transform || s["" + mojs.h.prefix.css + "transform"];
                expect(tr).toBe('translate(50px, 50%) scale(1)');
                return dfr();
              }
            });
            return byte.play();
          });
        });
      });
    });
    describe('_show method ->', function() {
      it('should set display: block to el', function() {
        var byte;
        byte = new Byte;
        byte._show();
        return expect(byte.el.style.display).toBe('block');
      });
      return it('should return if isShow is already true', function() {
        var byte;
        byte = new Byte;
        byte._show();
        byte.el.style.display = 'inline';
        byte._show();
        return expect(byte.el.style.display).toBe('inline');
      });
    });
    describe('_hide method ->', function() {
      return it('should set display: block to el', function() {
        var byte;
        byte = new Byte;
        byte._hide();
        return expect(byte.el.style.display).toBe('none');
      });
    });
    describe('_mergeThenOptions method ->', function() {
      it('should merge 2 objects', function() {
        var byte, end, mergedOpton, start;
        byte = new Byte;
        start = {
          radius: 10,
          duration: 10,
          fill: '#ff00ff',
          strokeWidth: {
            10: 20
          }
        };
        end = {
          radius: 20,
          duration: 500,
          opacity: {
            2: 1
          }
        };
        mergedOpton = byte._mergeThenOptions(start, end);
        expect(mergedOpton.radius[10]).toBe(20);
        expect(mergedOpton.duration).toBe(500);
        expect(mergedOpton.fill).toBe('#ff00ff');
        expect(mergedOpton.strokeWidth).toBe(20);
        return expect(mergedOpton.opacity[2]).toBe(1);
      });
      it('should merge 2 objects if the first was an object', function() {
        var byte, end, mergedOpton, start;
        byte = new Byte;
        start = {
          radius: {
            10: 0
          }
        };
        end = {
          radius: 20
        };
        mergedOpton = byte._mergeThenOptions(start, end);
        return expect(mergedOpton.radius[0]).toBe(20);
      });
      it('should use the second value if it is an object', function() {
        var byte, end, mergedOpton, start;
        byte = new Byte;
        start = {
          radius: 10
        };
        end = {
          radius: {
            20: 0
          }
        };
        mergedOpton = byte._mergeThenOptions(start, end);
        return expect(mergedOpton.radius[20]).toBe(0);
      });
      it('should save the old tween values', function() {
        var byte, end, mergedOpton, start;
        byte = new Byte;
        start = {
          duration: 10
        };
        end = {
          radius: {
            20: 0
          }
        };
        mergedOpton = byte._mergeThenOptions(start, end);
        return expect(mergedOpton.duration).toBe(10);
      });
      it('should fallback to default value is start is undefined', function() {
        var byte, end, mergedOpton, start;
        byte = new Byte;
        start = {
          radius: 10,
          duration: 1000
        };
        end = {
          radius: 20,
          duration: 500,
          stroke: '#ff00ff'
        };
        mergedOpton = byte._mergeThenOptions(start, end);
        return expect(mergedOpton.stroke['transparent']).toBe('#ff00ff');
      });
      it('should use start value if end value is null or undefined', function() {
        var byte, end, mergedOpton, start;
        byte = new Byte;
        start = {
          radius: 10,
          duration: 1000,
          fill: 'orange',
          points: 5
        };
        end = {
          radius: 20,
          duration: null,
          points: void 0,
          fill: null,
          stroke: '#ff00ff'
        };
        mergedOpton = byte._mergeThenOptions(start, end);
        expect(mergedOpton.duration).toBe(1000);
        expect(mergedOpton.fill).toBe('orange');
        return expect(mergedOpton.points).toBe(5);
      });
      it('should use end of the start value if end value is null or undefined', function() {
        var byte, end, mergedOpton, start;
        byte = new Byte;
        start = {
          radius: 10,
          duration: 1000,
          fill: {
            'orange': 'cyan'
          },
          points: 5
        };
        end = {
          radius: 20,
          duration: null,
          points: void 0,
          fill: null,
          stroke: '#ff00ff'
        };
        mergedOpton = byte._mergeThenOptions(start, end);
        return expect(mergedOpton.fill).toBe('cyan');
      });
      it('should work with new tween values', function() {
        var byte, end, mergedOpton, start;
        byte = new Byte;
        start = {
          radius: 10
        };
        end = {
          duration: 1000,
          delay: 200,
          repeat: 2,
          easing: 'elastic.in'
        };
        mergedOpton = byte._mergeThenOptions(start, end);
        expect(mergedOpton.duration).toBe(1000);
        expect(mergedOpton.delay).toBe(200);
        expect(mergedOpton.repeat).toBe(2);
        return expect(mergedOpton.easing).toBe('elastic.in');
      });
      it('should fallback to radius for radiusX/radiusY props', function() {
        var byte, end, mergedOpton, start;
        byte = new Byte;
        start = {
          radius: 10
        };
        end = {
          radiusX: 200,
          radiusY: 100
        };
        mergedOpton = byte._mergeThenOptions(start, end);
        expect(mergedOpton.radiusX[10]).toBe(200);
        return expect(mergedOpton.radiusY[10]).toBe(100);
      });
      it("should fallback to radius for radiusX/radiusY props and not ovveride previous values", function() {
        var byte, end, mergedOpton, start;
        byte = new Byte;
        start = {
          radius: 10,
          radiusY: 20
        };
        end = {
          radiusX: 200,
          radiusY: 100
        };
        mergedOpton = byte._mergeThenOptions(start, end);
        expect(mergedOpton.radiusX[10]).toBe(200);
        return expect(mergedOpton.radiusY[20]).toBe(100);
      });
      it("should always take sub radius values", function() {
        var end, mergedOpton, start, tr;
        tr = new Transit;
        start = {
          radiusX: {
            50: 200
          },
          radius: 50
        };
        end = {
          radiusX: 500,
          radius: 800
        };
        mergedOpton = tr._mergeThenOptions(start, end);
        return expect(mergedOpton.radiusX[200]).toBe(500);
      });
      return it('should push merged options to the history', function() {
        var byte, end, mergedOpton, start;
        byte = new Byte;
        start = {
          radius: 10,
          duration: 1000,
          fill: 'orange',
          points: 5
        };
        end = {
          radius: 20,
          duration: null,
          points: void 0,
          fill: null,
          stroke: '#ff00ff'
        };
        mergedOpton = byte._mergeThenOptions(start, end);
        return expect(byte.history[1]).toBe(mergedOpton);
      });
    });
    describe('_render method ->', function() {
      it('should call draw method', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        spyOn(byte, '_draw');
        byte._render();
        return expect(byte._draw).toHaveBeenCalled();
      });
      it('should call _setElStyles method', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        spyOn(byte, '_setElStyles');
        byte._render();
        return expect(byte._setElStyles).toHaveBeenCalled();
      });
      it('should call _createBit method', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        spyOn(byte, '_createBit');
        byte.isRendered = false;
        byte._render();
        return expect(byte._createBit).toHaveBeenCalled();
      });
      it('should set isRendered to true method', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        expect(byte.isRendered).toBe(true);
        byte.isRendered = false;
        byte._render();
        return expect(byte.isRendered).toBe(true);
      });
      it('should call _calcSize method', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        spyOn(byte, '_calcSize');
        byte.isRendered = false;
        byte._render();
        return expect(byte._calcSize).toHaveBeenCalled();
      });
      return it('should not create new el', function() {
        var byte, cnt;
        byte = new Byte({
          radius: 25
        });
        cnt = document.body.children.length;
        byte._render(true);
        return expect(cnt).toBe(document.body.children.length);
      });
    });
    describe('_draw method ->', function() {
      it('should call _setProp method', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        spyOn(byte.bit, 'setProp');
        byte._draw();
        return expect(byte.bit.setProp).toHaveBeenCalled();
      });
      it('should set all attributes to shape\'s properties', function() {
        var byte;
        byte = new Byte({
          radius: 25,
          x: 20,
          y: 30,
          rx: 15,
          ry: 25,
          stroke: 'red',
          strokeWidth: 2,
          strokeOpacity: .5,
          strokeLinecap: 'round',
          strokeDasharray: 200,
          strokeDashoffset: 100,
          fill: 'cyan',
          fillOpacity: .5,
          radius: 100,
          radiusX: 22,
          radiusY: {
            20: 0
          },
          points: 4
        });
        byte._draw();
        expect(byte.bit.props.x).toBe(byte.origin.x);
        expect(byte.bit.props.y).toBe(byte.origin.y);
        expect(byte.bit.props.rx).toBe(byte._props.rx);
        expect(byte.bit.props.ry).toBe(byte._props.ry);
        expect(byte.bit.props.stroke).toBe(byte._props.stroke);
        expect(byte.bit.props['stroke-width']).toBe(byte._props.strokeWidth);
        expect(byte.bit.props['stroke-opacity']).toBe(byte._props.strokeOpacity);
        expect(byte.bit.props['stroke-linecap']).toBe(byte._props.strokeLinecap);
        expect(byte.bit.props['stroke-dasharray']).toBe(byte._props.strokeDasharray[0].value + ' ');
        expect(byte.bit.props['stroke-dashoffset']).toBe(byte._props.strokeDashoffset[0].value + ' ');
        expect(byte.bit.props['fill']).toBe(byte._props.fill);
        expect(byte.bit.props['fill-opacity']).toBe(byte._props.fillOpacity);
        expect(byte.bit.props['radius']).toBe(byte._props.radius);
        expect(byte.bit.props['radiusX']).toBe(byte._props.radiusX);
        expect(byte.bit.props['radiusY']).toBe(byte._props.radiusY);
        expect(byte.bit.props['points']).toBe(byte._props.points);
        return expect(byte.bit.props['transform']).toBe(byte._calcShapeTransform());
      });
      it('should set x/y to center', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        byte._draw();
        expect(byte.bit.props.x).toBe(byte._props.center);
        return expect(byte.bit.props.y).toBe(byte._props.center);
      });
      it('should set x/y to props.x/props.y if context was passed', function() {
        var byte;
        byte = new Byte({
          radius: 25,
          ctx: svg
        });
        byte._draw();
        expect(byte.bit.props.x).toBe(parseFloat(byte._props.x));
        return expect(byte.bit.props.y).toBe(parseFloat(byte._props.y));
      });
      it('should call bit._draw method', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        spyOn(byte.bit, 'draw');
        byte._draw();
        return expect(byte.bit.draw).toHaveBeenCalled();
      });
      it('should call _drawEl method', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        spyOn(byte, '_drawEl');
        byte._draw();
        return expect(byte._drawEl).toHaveBeenCalled();
      });
      it('should call _calcShapeTransform method', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        spyOn(byte, '_calcShapeTransform');
        byte._draw();
        return expect(byte._calcShapeTransform).toHaveBeenCalled();
      });
      it('should receive the current progress', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        spyOn(byte, '_draw');
        byte._setProgress(.5);
        return expect(byte._draw).toHaveBeenCalledWith(.5);
      });
      return it('should calculate transform object', function() {
        var byte;
        byte = new Byte({
          angle: 90,
          radius: 25,
          strokeWidth: 4
        });
        expect(byte.bit.props.transform).toBe('rotate(90, 29, 29)');
        return expect(byte._calcShapeTransform).toBeDefined();
      });
    });
    describe('_drawEl method ->', function() {
      it('should set el positions and transforms', function() {
        var byte, s, tr;
        byte = new Byte({
          radius: 25,
          top: 10
        });
        expect(byte.el.style.left).toBe('0px');
        expect(byte.el.style.top).toBe('10px');
        expect(byte.el.style.opacity).toBe('1');
        s = byte.el.style;
        tr = s.transform || s["" + mojs.h.prefix.css + "transform"];
        return expect(tr).toBe('translate(0px, 0px) scale(1)');
      });
      it('should set only opacity if foreign context', function() {
        var byte, s, tr;
        byte = new Byte({
          radius: 25,
          top: 10,
          ctx: svg
        });
        byte._draw();
        expect(byte.el.style.opacity).toBe('1');
        expect(byte.el.style.left).not.toBe('0px');
        expect(byte.el.style.top).not.toBe('10px');
        s = byte.el.style;
        tr = s.transform != null ? s.transform : s["" + mojs.h.prefix.css + "transform"];
        return expect(tr).toBeFalsy();
      });
      it('should set new values', function() {
        var byte;
        byte = new Byte({
          radius: 25,
          top: 10
        });
        byte._draw();
        byte._props.left = '1px';
        byte._draw();
        expect(byte.el.style.left).toBe('1px');
        return expect(byte.lastSet.left.value).toBe('1px');
      });
      it('should not set old values', function() {
        var byte;
        byte = new Byte({
          radius: 25,
          y: 10
        });
        byte._draw();
        byte._draw();
        expect(byte.el.style.left).toBe('0px');
        return expect(byte.lastSet.x.value).toBe('0px');
      });
      it('should return true if there is no el', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        byte.el = null;
        return expect(byte._drawEl()).toBe(true);
      });
      it('should set transform if on of the x, y or scale changed', function() {
        var byte;
        byte = new Byte({
          radius: 25,
          top: 10,
          ctx: svg
        });
        byte._draw();
        spyOn(h, 'setPrefixedStyle');
        byte._draw();
        return expect(h.setPrefixedStyle).not.toHaveBeenCalled();
      });
      it('should set transform if x changed', function() {
        var byte;
        byte = new Byte({
          radius: 25,
          top: 10,
          x: {
            0: 10
          }
        });
        byte._props.x = '4px';
        spyOn(h, 'setPrefixedStyle');
        byte._draw();
        return expect(h.setPrefixedStyle).toHaveBeenCalledWith(byte.el, 'transform', 'translate(4px, 0px) scale(1)');
      });
      it('should set transform if x changed', function() {
        var byte;
        byte = new Byte({
          radius: 25,
          top: 10,
          y: {
            0: 10
          }
        });
        byte._props.y = '4px';
        spyOn(h, 'setPrefixedStyle');
        byte._draw();
        return expect(h.setPrefixedStyle).toHaveBeenCalledWith(byte.el, 'transform', 'translate(0px, 4px) scale(1)');
      });
      return it('should set transform if x changed', function() {
        var byte;
        byte = new Byte({
          radius: 25,
          top: 10,
          scale: {
            0: 10
          }
        });
        byte._props.scale = 3;
        spyOn(h, 'setPrefixedStyle');
        byte._draw();
        return expect(h.setPrefixedStyle).toHaveBeenCalledWith(byte.el, 'transform', 'translate(0px, 0px) scale(3)');
      });
    });
    describe('_isPropChanged method ->', function() {
      it('should return bool showing if prop was changed after the last set', function() {
        var byte;
        byte = new Byte({
          radius: 25,
          y: 10
        });
        byte._props.left = '20px';
        expect(byte._isPropChanged('left')).toBe(true);
        byte._props.left = '20px';
        return expect(byte._isPropChanged('left')).toBe(false);
      });
      return it('should add prop object to lastSet if undefined', function() {
        var byte;
        byte = new Byte({
          radius: 25,
          y: 10
        });
        byte._isPropChanged('x');
        return expect(byte.lastSet.x).toBeDefined();
      });
    });
    describe('delta calculations ->', function() {
      it('should skip delta for excludePropsDelta object', function() {
        var byte;
        byte = new Byte({
          radius: {
            45: 55
          }
        });
        byte.skipPropsDelta = {
          radius: 1
        };
        byte._extendDefaults();
        return expect(byte.deltas.radius).not.toBeDefined();
      });
      describe('numeric values ->', function() {
        it('should calculate delta', function() {
          var byte, radiusDelta;
          byte = new Byte({
            radius: {
              25: 75
            }
          });
          radiusDelta = byte.deltas.radius;
          expect(radiusDelta.start).toBe(25);
          expect(radiusDelta.delta).toBe(50);
          return expect(radiusDelta.type).toBe('number');
        });
        it('should calculate delta with string arguments', function() {
          var byte, radiusDelta;
          byte = new Byte({
            radius: {
              '25': '75'
            }
          });
          radiusDelta = byte.deltas.radius;
          expect(radiusDelta.start).toBe(25);
          return expect(radiusDelta.delta).toBe(50);
        });
        it('should calculate delta with float arguments', function() {
          var byte, radiusDelta;
          byte = new Byte({
            radius: {
              '25.50': 75.50
            }
          });
          radiusDelta = byte.deltas.radius;
          expect(radiusDelta.start).toBe(25.5);
          return expect(radiusDelta.delta).toBe(50);
        });
        it('should calculate delta with negative start arguments', function() {
          var byte, radiusDelta;
          byte = new Byte({
            radius: {
              '-25.50': 75.50
            }
          });
          radiusDelta = byte.deltas.radius;
          expect(radiusDelta.start).toBe(-25.5);
          return expect(radiusDelta.delta).toBe(101);
        });
        return it('should calculate delta with negative end arguments', function() {
          var byte, radiusDelta;
          byte = new Byte({
            radius: {
              '25.50': -75.50
            }
          });
          radiusDelta = byte.deltas.radius;
          expect(radiusDelta.start).toBe(25.5);
          expect(radiusDelta.end).toBe(-75.5);
          return expect(radiusDelta.delta).toBe(-101);
        });
      });
      describe('color values ->', function() {
        it('should calculate color delta', function() {
          var byte, colorDelta;
          byte = new Byte({
            stroke: {
              '#000': 'rgb(255,255,255)'
            }
          });
          colorDelta = byte.deltas.stroke;
          expect(colorDelta.start.r).toBe(0);
          expect(colorDelta.end.r).toBe(255);
          expect(colorDelta.delta.r).toBe(255);
          return expect(colorDelta.type).toBe('color');
        });
        return it('should ignore stroke-linecap prop, use start prop and warn', function() {
          var byte, fun;
          byte = null;
          spyOn(console, 'warn');
          fun = function() {
            return byte = new Byte({
              strokeLinecap: {
                'round': 'butt'
              }
            });
          };
          expect(function() {
            return fun();
          }).not.toThrow();
          expect(console.warn).toHaveBeenCalled();
          return expect(byte.deltas.strokeLinecap).not.toBeDefined();
        });
      });
      describe('unit values ->', function() {
        return it('should calculate unit delta', function() {
          var byte, xDelta;
          byte = new Byte({
            x: {
              '0%': '100%'
            }
          });
          xDelta = byte.deltas.x;
          expect(xDelta.start.string).toBe('0%');
          expect(xDelta.end.string).toBe('100%');
          expect(xDelta.delta).toBe(100);
          return expect(xDelta.type).toBe('unit');
        });
      });
      return describe('tween-related values ->', function() {
        return it('should not calc delta for tween related props', function() {
          var byte;
          byte = new Byte({
            duration: {
              2000: 1000
            }
          });
          return expect(byte.deltas.duration).not.toBeDefined();
        });
      });
    });
    describe('_calcOrigin method ->', function() {
      it("should set x and y to center by default (if no drawing context passed)", function() {
        var byte;
        byte = new Byte({
          radius: {
            '25.50': -75.50
          }
        });
        byte._calcOrigin(.5);
        expect(byte.origin.x).toBe(byte._props.center);
        return expect(byte.origin.y).toBe(byte._props.center);
      });
      return it("should set x and y to x and y if drawing context passed", function() {
        var byte;
        byte = new Byte({
          radius: {
            '25.50': -75.50
          },
          ctx: svg
        });
        byte._calcOrigin(.5);
        expect(byte.origin.x).toBe(parseFloat(byte._props.x));
        return expect(byte.origin.y).toBe(parseFloat(byte._props.y));
      });
    });
    describe('_setProgress method ->', function() {
      it('should set transition progress', function() {
        var byte;
        byte = new Byte({
          radius: {
            '25.50': -75.50
          }
        });
        byte._setProgress(.5);
        return expect(byte.progress).toBe(.5);
      });
      it('should set value progress', function() {
        var byte;
        byte = new Byte({
          radius: {
            '25': 75
          }
        });
        byte._setProgress(.5);
        return expect(byte._props.radius).toBe(50);
      });
      it('should call _calcOrigin method', function() {
        var byte;
        byte = new Byte({
          radius: {
            '25': 75
          }
        });
        spyOn(byte, '_calcOrigin');
        byte._setProgress(.5);
        return expect(byte._calcOrigin).toHaveBeenCalled();
      });
      it('should have origin object', function() {
        var byte;
        byte = new Byte({
          radius: {
            '25': 75
          }
        });
        byte._setProgress(.5);
        expect(byte.origin.x).toBeDefined();
        return expect(byte.origin.y).toBeDefined();
      });
      it('should have origin should be the center of the transit', function() {
        var byte;
        byte = new Byte({
          radius: {
            '25': 75
          }
        });
        byte._setProgress(.5);
        expect(byte.origin.x).toBe(byte._props.center);
        return expect(byte.origin.y).toBe(byte._props.center);
      });
      it('should have origin should be x/y if foreign context', function() {
        var byte;
        byte = new Byte({
          radius: {
            '25': 75
          },
          ctx: svg
        });
        byte._setProgress(.5);
        expect(byte.origin.x).toBe(parseFloat(byte._props.x));
        return expect(byte.origin.y).toBe(parseFloat(byte._props.x));
      });
      it('should have origin should be number if foreign context', function() {
        var byte;
        byte = new Byte({
          radius: {
            '25': 75
          },
          ctx: svg
        });
        byte._setProgress(.5);
        expect(typeof byte.origin.x).toBe('number');
        return expect(typeof byte.origin.y).toBe('number');
      });
      it('should call _calcCurrentProps', function() {
        var byte;
        byte = new Byte({
          radius: {
            '25': 75
          }
        });
        spyOn(byte, '_calcCurrentProps');
        byte._setProgress(.5);
        return expect(byte._calcCurrentProps).toHaveBeenCalledWith(.5);
      });
      it('not to thow', function() {
        var byte;
        byte = new Byte({
          radius: {
            '25': 75
          },
          ctx: svg
        });
        return expect(function() {
          return byte._show();
        }).not.toThrow();
      });
      it('should set color value progress and only int', function() {
        var byte, colorDelta;
        byte = new Byte({
          stroke: {
            '#000': 'rgb(255,255,255)'
          }
        });
        colorDelta = byte.deltas.stroke;
        byte._setProgress(.5);
        return expect(byte._props.stroke).toBe('rgba(127,127,127,1)');
      });
      return it('should set color value progress for delta starting with 0', function() {
        var byte, colorDelta;
        byte = new Byte({
          stroke: {
            '#000': 'rgb(0,255,255)'
          }
        });
        colorDelta = byte.deltas.stroke;
        byte._setProgress(.5);
        return expect(byte._props.stroke).toBe('rgba(0,127,127,1)');
      });
    });
    describe('strokeDash.. values', function() {
      it('should set strokeDasharray/strokeDashoffset value progress', function() {
        var byte;
        byte = new Byte({
          strokeDasharray: {
            '200 100': '400'
          }
        });
        byte._setProgress(.5);
        expect(byte._props.strokeDasharray[0].value).toBe(300);
        expect(byte._props.strokeDasharray[0].unit).toBe('px');
        expect(byte._props.strokeDasharray[1].value).toBe(50);
        return expect(byte._props.strokeDasharray[1].unit).toBe('px');
      });
      it('should set strokeDasharray/strokeDashoffset with percents', function() {
        var byte;
        byte = new Byte({
          type: 'circle',
          strokeDasharray: {
            '0% 200': '100%'
          },
          radius: 100
        });
        byte._setProgress(.5);
        expect(byte._props.strokeDasharray[0].value).toBe(50);
        expect(byte._props.strokeDasharray[0].unit).toBe('%');
        expect(byte._props.strokeDasharray[1].value).toBe(100);
        return expect(byte._props.strokeDasharray[1].unit).toBe('px');
      });
      it('should parse non-deltas strokeDasharray/strokeDashoffset values', function() {
        var byte;
        byte = new Byte({
          type: 'circle',
          strokeDasharray: '100%',
          radius: 100
        });
        expect(byte._props.strokeDasharray[0].value).toBe(100);
        return expect(byte._props.strokeDasharray[0].unit).toBe('%');
      });
      it('should parse multiple strokeDash.. values', function() {
        var byte;
        byte = new Byte({
          strokeDasharray: '7 100 7'
        });
        expect(h.isArray(byte._props.strokeDasharray)).toBe(true);
        expect(byte._props.strokeDasharray.length).toBe(3);
        expect(byte._props.strokeDasharray[0].value).toBe(7);
        expect(byte._props.strokeDasharray[1].value).toBe(100);
        return expect(byte._props.strokeDasharray[2].value).toBe(7);
      });
      return it('should parse num values', function() {
        var byte;
        byte = new Byte({
          strokeDasharray: 7
        });
        expect(h.isArray(byte._props.strokeDasharray)).toBe(true);
        return expect(byte._props.strokeDasharray.length).toBe(1);
      });
    });
    describe('callbacks ->', function() {
      describe('onStart callback ->', function() {
        it('should call onStart callback', function(dfr) {
          var byte, isOnStart;
          isOnStart = null;
          byte = new Byte({
            radius: {
              '25': 75
            },
            onStart: function() {
              return isOnStart = true;
            }
          });
          byte.play();
          return setTimeout(function() {
            expect(isOnStart).toBe(true);
            return dfr();
          }, 500);
        });
        return it('should show el', function() {
          var byte;
          byte = new Byte({
            radius: {
              '25': 75
            }
          });
          spyOn(byte, '_show');
          byte.timeline.setProgress(.48);
          byte.timeline.setProgress(.49);
          byte.timeline.setProgress(.5);
          return expect(byte._show).toHaveBeenCalled();
        });
      });
      describe('onUpdate callback', function() {
        it('should call onUpdate callback', function(dfr) {
          var byte, isOnUpdate;
          isOnUpdate = null;
          byte = new Byte({
            radius: {
              '25': 75
            },
            onUpdate: function() {
              return isOnUpdate = true;
            }
          });
          return setTimeout(function() {
            expect('onUpdate called').toBe('onUpdate called');
            return dfr();
          }, 500);
        });
        it('should have scope of Transit', function(dfr) {
          var byte, isRightScope;
          isRightScope = null;
          byte = new Byte({
            radius: {
              '25': 75
            },
            onUpdate: function() {
              return isRightScope = this instanceof Byte;
            }
          });
          byte.play();
          return setTimeout((function() {
            expect(isRightScope).toBe(true);
            return dfr();
          }), 500);
        });
        return it('should set current progress', function(dfr) {
          var byte, progress;
          progress = null;
          byte = new Byte({
            radius: {
              '25': 75
            },
            onUpdate: function(p) {
              return progress = p;
            },
            duration: 100
          });
          byte.play();
          return setTimeout(function() {
            expect(progress).toBeGreaterThan(0);
            expect(progress).not.toBeGreaterThan(1);
            return dfr();
          }, 500);
        });
      });
      describe('onComplete callback ->', function() {
        it('should call onComplete callback', function(dfr) {
          var byte, isOnComplete;
          isOnComplete = null;
          byte = new Byte({
            radius: {
              '25': 75
            },
            onComplete: function() {
              return isOnComplete = true;
            },
            duration: 200
          });
          byte.play();
          return setTimeout(function() {
            expect(isOnComplete).toBe(true);
            return dfr();
          }, 500);
        });
        return it('should have scope of Transit', function(dfr) {
          var byte, isRightScope;
          isRightScope = null;
          byte = new Byte({
            radius: {
              '25': 75
            },
            duration: 100,
            onComplete: function() {
              return isRightScope = this instanceof Byte;
            }
          });
          byte.play();
          return setTimeout(function() {
            expect(isRightScope).toBe(true);
            return dfr();
          }, 500);
        });
      });
      return describe('onFirstUpdate callback ->', function() {
        it('should call _tuneOptions method when the tween goes backward', function() {
          var byte;
          byte = new Byte({
            radius: {
              '25': 75
            }
          }).then({
            radius: 20
          });
          spyOn(byte, '_tuneOptions');
          byte.timeline.setProgress(.99);
          byte.timeline.setProgress(.98);
          byte.timeline.setProgress(0);
          return expect(byte._tuneOptions).toHaveBeenCalled();
        });
        return it('should call not _tuneOptions if history length is one record', function() {
          var byte;
          byte = new Byte({
            radius: {
              '25': 75
            }
          });
          spyOn(byte, '_tuneOptions');
          byte.timeline.setProgress(.99);
          byte.timeline.setProgress(0);
          return expect(byte._tuneOptions).not.toHaveBeenCalled();
        });
      });
    });
    describe('createTween method ->', function() {
      it('should create tween object', function() {
        var byte;
        byte = new Byte({
          radius: {
            '25': 75
          }
        });
        return expect(byte.timeline).toBeDefined();
      });
      return it('should bind the onFirstUpdate method', function() {
        var byte;
        byte = new Byte({
          radius: {
            '25': 75
          }
        });
        return expect(typeof byte.tween.o.onFirstUpdate).toBe('function');
      });
    });
    describe('run method ->', function() {
      it('should extend defaults with passed object', function() {
        var byte, o;
        byte = new Byte({
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
        byte = new Byte({
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
        byte = new Byte({
          strokeWidth: {
            10: 5
          }
        });
        byte.run({
          stroke: 'green'
        });
        return expect(byte.deltas.strokeWidth).toBeDefined();
      });
      it('should calculate el size', function() {
        var byte;
        byte = new Byte({
          radius: {
            10: 5
          }
        });
        spyOn(byte, '_calcSize');
        byte.run({
          radius: 50
        });
        return expect(byte._calcSize).toHaveBeenCalled();
      });
      it('should set new el size', function() {
        var byte;
        byte = new Byte({
          radius: {
            10: 5
          }
        });
        spyOn(byte, '_setElStyles');
        byte.run({
          radius: 50
        });
        return expect(byte._setElStyles).toHaveBeenCalled();
      });
      it('should set new el size #2', function() {
        var byte;
        byte = new Byte({
          radius: {
            10: 5
          }
        });
        byte.run({
          radius: 50
        });
        return expect(byte.el.style.width).toBe('104px');
      });
      it('should set new el size with respect to radiusX/radiusY', function() {
        var byte;
        byte = new Byte({
          radius: {
            10: 5
          }
        });
        byte.run({
          radius: 50,
          radiusX: {
            100: 0
          }
        });
        return expect(byte.el.style.width).toBe('204px');
      });
      it('should set new el size with respect to radiusX/radiusY', function() {
        var byte;
        byte = new Byte({
          radius: {
            10: 5
          }
        });
        byte.run({
          radius: 50,
          radiusY: 110
        });
        return expect(byte.el.style.width).toBe('224px');
      });
      it('should set new el size with respect to radiusX/radiusY', function() {
        var byte;
        byte = new Byte({
          radius: {
            10: 5
          }
        });
        byte.run({
          radius: 450,
          radiusY: 110,
          radiusX: {
            200: 0
          }
        });
        return expect(byte.el.style.width).toBe('404px');
      });
      it('should start tween', function() {
        var byte;
        byte = new Byte({
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
        byte = new Byte({
          strokeWidth: {
            10: 5
          }
        });
        byte.run({
          strokeWidth: 25
        });
        expect(byte._props.strokeWidth).toBe(25);
        return expect(byte.deltas.strokeWidth).not.toBeDefined();
      });
      it('should not modify old options', function() {
        var byte;
        byte = new Byte({
          strokeWidth: {
            10: 5
          },
          radius: 33
        });
        byte.run({
          strokeWidth: 25
        });
        return expect(byte._props.radius).toBe(33);
      });
      it('should warn if shape was passed', function() {
        var byte;
        byte = new Byte({
          shape: 'polygon'
        });
        spyOn(h, 'warn');
        byte.run({
          shape: 'circle'
        });
        expect(h.warn).toHaveBeenCalled();
        return expect(byte._o.shape).toBe('polygon');
      });
      it('should call _recalcTotalDuration on timeline', function() {
        var byte;
        byte = new Byte;
        spyOn(byte.timeline, '_recalcTotalDuration');
        byte.run({
          duration: 2000
        });
        return expect(byte.timeline._recalcTotalDuration).toHaveBeenCalled();
      });
      it('should call _transformHistory', function() {
        var byte, o;
        byte = new Byte;
        spyOn(byte, '_transformHistory');
        o = {
          duration: 2000
        };
        byte.run(o);
        return expect(byte._transformHistory).toHaveBeenCalledWith(o);
      });
      it('should not call _transformHistory if optionless', function() {
        var byte;
        byte = new Byte;
        spyOn(byte, '_transformHistory');
        byte.run();
        return expect(byte._transformHistory).not.toHaveBeenCalled();
      });
      it('shoud not warn if history is 1 record long', function() {
        var byte;
        byte = new Byte({
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
        expect(byte.history[0].duration).toBe(100);
        return expect(byte._props.duration).toBe(100);
      });
      return it('shoud work with no arguments passed', function() {
        var byte;
        byte = new Byte({
          duration: 2000
        }).then({
          radius: 500
        });
        return expect(function() {
          return byte.run();
        }).not.toThrow();
      });
    });
    describe('isForeign flag ->', function() {
      it('should not be set by default', function() {
        var byte;
        byte = new Byte;
        return expect(byte.isForeign).toBe(false);
      });
      it('should be set if context was passed', function() {
        var byte;
        byte = new Byte({
          ctx: svg
        });
        return expect(byte.isForeign).toBe(true);
      });
      return it('if context passed el should be bit\'s el', function() {
        var byte;
        byte = new Byte({
          ctx: svg
        });
        return expect(byte.el).toBe(byte.bit.el);
      });
    });
    describe('show/hide on start/end ->', function() {
      it('should show the el on start', function() {
        var byte;
        byte = new Byte({
          ctx: svg
        });
        byte.timeline.setProgress(.45);
        byte.timeline.setProgress(.5);
        return expect(byte.el.style.display).toBe('block');
      });
      it('should hide the el on end', function() {
        var byte;
        byte = new Byte({
          ctx: svg
        });
        byte.timeline.setProgress(.99);
        byte.timeline.setProgress(1);
        return expect(byte.el.style.display).toBe('none');
      });
      it('should not hide the el on end if isShowEnd was passed', function() {
        var byte;
        byte = new Byte({
          ctx: svg,
          isShowEnd: true
        });
        byte.timeline.setProgress(.98);
        byte.timeline.setProgress(.99);
        byte.timeline.setProgress(1);
        return expect(byte.el.style.display).toBe('block');
      });
      it('should not hide the el on end if isShowEnd was passed #2 - chain', function() {
        var byte;
        byte = new Byte({
          ctx: svg,
          isShowEnd: true
        }).then({
          radius: 10
        }).then({
          radius: 20
        });
        byte.timeline.setProgress(0);
        byte.timeline.setProgress(.2);
        byte.timeline.setProgress(1);
        return expect(byte.el.style.display).toBe('block');
      });
      it('should hide the el on reverse end', function() {
        var byte;
        byte = new Byte({
          ctx: svg
        });
        byte.timeline.setProgress(1);
        byte.timeline.setProgress(.25);
        byte.timeline.setProgress(0);
        return expect(byte.el.style.display).toBe('none');
      });
      return it('should not hide the el on reverse end if isShowStart passed', function() {
        var byte;
        byte = new Byte({
          ctx: svg,
          isShowStart: true
        });
        byte.timeline.setProgress(.5);
        byte.timeline.setProgress(0);
        return expect(byte.el.style.display).toBe('block');
      });
    });
    describe('_getRadiusSize method ->', function() {
      it('should return max from delatas if key is defined', function() {
        var byte, size;
        byte = new Byte({
          radiusX: {
            20: 30
          }
        });
        size = byte._getRadiusSize({
          key: 'radiusX',
          fallback: 0
        });
        return expect(size).toBe(30);
      });
      it('should return props\' value if delats\' one is not defined ', function() {
        var byte, size;
        byte = new Byte({
          radiusX: 20
        });
        size = byte._getRadiusSize({
          key: 'radiusX',
          fallback: 0
        });
        return expect(size).toBe(20);
      });
      it('should fallback to passed fallback option', function() {
        var byte, size;
        byte = new Byte;
        size = byte._getRadiusSize({
          key: 'radiusX',
          fallback: 0
        });
        return expect(size).toBe(0);
      });
      return it('should fallback to 0 by default', function() {
        var byte, size;
        byte = new Byte;
        size = byte._getRadiusSize({
          key: 'radiusX'
        });
        return expect(size).toBe(0);
      });
    });
    describe('foreign bit option ->', function() {
      it('should receive a foreign bit to work with', function() {
        var bit, byte;
        svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, 'svg') : void 0;
        bit = typeof document.createElementNS === "function" ? document.createElementNS(ns, 'rect') : void 0;
        svg.appendChild(bit);
        byte = new Byte({
          bit: bit
        });
        return expect(byte.bit.el).toBe(bit);
      });
      return it('should set isForeignBit flag', function() {
        var bit, byte;
        svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, 'svg') : void 0;
        bit = typeof document.createElementNS === "function" ? document.createElementNS(ns, 'rect') : void 0;
        svg.appendChild(bit);
        byte = new Byte({
          bit: bit
        });
        return expect(byte.isForeignBit).toBe(true);
      });
    });
    describe('_overrideUpdateCallbacks method ->', function() {
      describe('onUpdate binding ->', function() {
        it('should override this._o.onUpdate', function() {
          var o, tr;
          tr = new Transit;
          o = {};
          tr._overrideUpdateCallbacks(o);
          return expect(typeof o.onUpdate).toBe('function');
        });
        it('should not override onUpdate function if exists', function() {
          var args, isRightScope, options, tr;
          isRightScope = null;
          args = null;
          options = {
            onUpdate: function() {
              isRightScope = this === tr;
              return args = arguments;
            }
          };
          tr = new Transit;
          tr._overrideUpdateCallbacks(options);
          expect(typeof options.onUpdate).toBe('function');
          options.onUpdate.call(tr, .1, .1, true, false);
          expect(isRightScope).toBe(true);
          expect(args[0]).toBe(.1);
          expect(args[1]).toBe(.1);
          expect(args[2]).toBe(true);
          return expect(args[3]).toBe(false);
        });
        return it('should call _setProgress method', function() {
          var options, progress, tr;
          options = {
            onUpdate: function() {}
          };
          tr = new Transit;
          tr._overrideUpdateCallbacks(options);
          spyOn(tr, '_setProgress');
          progress = .1;
          options.onUpdate(progress, progress, true, false);
          return expect(tr._setProgress).toHaveBeenCalledWith(progress);
        });
      });
      return describe('onFirstUpdate binding ->', function() {
        it('should override onFirstUpdate', function() {
          var options, tr;
          tr = new Transit().then({
            fill: 'red'
          });
          options = {};
          tr._overrideUpdateCallbacks(options);
          return expect(typeof options.onFirstUpdate).toBe('function');
        });
        it('should not override onFirstUpdate function if exists', function() {
          var args, isRightScope, options, tr;
          isRightScope = null;
          args = null;
          options = {
            onFirstUpdate: function() {
              isRightScope = this === options;
              return args = arguments;
            }
          };
          tr = new Transit();
          tr._overrideUpdateCallbacks(options);
          expect(typeof options.onFirstUpdate).toBe('function');
          options.onFirstUpdate(true, false);
          expect(isRightScope).toBe(true);
          expect(args[0]).toBe(true);
          return expect(args[1]).toBe(false);
        });
        it('should call _tuneOptions method', function() {
          var options, tr;
          options = {
            index: 1,
            onUpdate: function() {}
          };
          tr = new Transit().then({
            fill: 'red'
          });
          tr._overrideUpdateCallbacks(options);
          spyOn(tr, '_tuneOptions');
          tr.timeline._timelines[1]._firstUpdate(-1, false);
          return expect(tr._tuneOptions).toHaveBeenCalledWith(tr.history[options.index]);
        });
        it('should call _tuneOptions method with history[0] if no index', function() {
          var options, tr;
          options = {
            onUpdate: function() {}
          };
          tr = new Transit().then({
            fill: 'red'
          });
          tr._overrideUpdateCallbacks(options);
          spyOn(tr, '_tuneOptions');
          tr.timeline._timelines[0]._firstUpdate(-1, false);
          return expect(tr._tuneOptions).toHaveBeenCalledWith(tr.history[0]);
        });
        it('should only call _tuneOptions if history > 1', function() {
          var options, tr;
          options = {
            onUpdate: function() {}
          };
          tr = new Transit();
          tr._overrideUpdateCallbacks(options);
          spyOn(tr, '_tuneOptions');
          tr.timeline._timelines[0]._firstUpdate(-1, false);
          return expect(tr._tuneOptions).not.toHaveBeenCalledWith(tr.history[0]);
        });
        return it('should not call tune options if no index and forward direction', function() {
          var options, tr;
          options = {
            onUpdate: function() {}
          };
          tr = new Transit().then({
            fill: 'cyan'
          });
          tr._overrideUpdateCallbacks(options);
          spyOn(tr, '_tuneOptions');
          tr.timeline._timelines[0]._firstUpdate(1, false);
          return expect(tr._tuneOptions).not.toHaveBeenCalledWith(tr.history[0]);
        });
      });
    });
    describe('_makeTweenControls method ->', function() {
      it('should override this._o.onUpdate', function() {
        var tr;
        tr = new Transit;
        return expect(typeof tr._o.onUpdate).toBe('function');
      });
      it('should not override onUpdate function if exists', function() {
        var args, isRightScope, options, tr;
        isRightScope = null;
        args = null;
        options = {
          onUpdate: function() {
            isRightScope = this === tr;
            return args = arguments;
          }
        };
        tr = new Transit(options);
        expect(typeof tr._o.onUpdate).toBe('function');
        tr.timeline.setProgress(0);
        tr.timeline.setProgress(.1);
        expect(isRightScope).toBe(true);
        expect(args[0]).toBe(.1);
        expect(args[1]).toBe(.1);
        expect(args[2]).toBe(true);
        return expect(args[3]).toBe(false);
      });
      it('should call _setProgress method', function() {
        var options, progress, tr;
        options = {
          onUpdate: function() {}
        };
        tr = new Transit(options);
        tr.timeline.setProgress(0);
        spyOn(tr, '_setProgress');
        progress = .1;
        tr.timeline.setProgress(progress);
        return expect(tr._setProgress).toHaveBeenCalledWith(progress);
      });
      it('should override this._o.onStart', function() {
        var tr;
        tr = new Transit;
        return expect(typeof tr._o.onStart).toBe('function');
      });
      it('should not override onStart function if exists', function() {
        var args, isRightScope, options, tr;
        isRightScope = null;
        args = null;
        options = {
          onStart: function() {
            isRightScope = this === tr;
            return args = arguments;
          }
        };
        tr = new Transit(options);
        expect(typeof tr._o.onStart).toBe('function');
        tr.timeline.setProgress(0);
        tr.timeline.setProgress(.1);
        expect(isRightScope).toBe(true);
        expect(args[0]).toBe(true);
        return expect(args[1]).toBe(false);
      });
      it('should show module ', function() {
        var tr;
        tr = new Transit;
        tr.timeline.setProgress(0);
        spyOn(tr, '_show').and.callThrough();
        tr.timeline.setProgress(.1);
        return expect(tr._show).toHaveBeenCalled();
      });
      it('should hide module ', function() {
        var tr;
        tr = new Transit;
        tr.timeline.setProgress(.1);
        spyOn(tr, '_hide').and.callThrough();
        tr.timeline.setProgress(0);
        return expect(tr._hide).toHaveBeenCalled();
      });
      it('should not hide module is isShowStart was set', function() {
        var tr;
        tr = new Transit({
          isShowStart: true
        });
        tr.timeline.setProgress(.2);
        tr.timeline.setProgress(.1);
        spyOn(tr, '_hide').and.callThrough();
        tr.timeline.setProgress(0);
        return expect(tr._hide).not.toHaveBeenCalled();
      });
      return it('should call _overrideUpdateCallbacks method with merged object', function() {
        var byte;
        byte = new Byte({
          radius: 20,
          duration: 1000,
          delay: 10
        });
        spyOn(byte, '_overrideUpdateCallbacks');
        byte._makeTweenControls();
        return expect(byte._overrideUpdateCallbacks).toHaveBeenCalledWith(byte._o);
      });
    });
    describe('_makeTimelineControls method ->', function() {
      it('should override this._o.onComplete', function() {
        var tr;
        tr = new Transit;
        return expect(typeof tr._o.timeline.onComplete).toBe('function');
      });
      it('should not override onUpdate function if exists', function() {
        var args, isRightScope, options, tr;
        isRightScope = null;
        args = null;
        options = {
          timeline: {
            onComplete: function() {
              isRightScope = this === tr.timeline;
              return args = arguments;
            }
          }
        };
        tr = new Transit(options);
        expect(typeof tr._o.timeline.onComplete).toBe('function');
        tr.timeline.setProgress(0);
        tr.timeline.setProgress(.1);
        tr.timeline.setProgress(.8);
        tr.timeline.setProgress(1);
        expect(isRightScope).toBe(true);
        expect(args[0]).toBe(true);
        return expect(args[1]).toBe(false);
      });
      it('should call _show method', function() {
        var tr;
        tr = new Transit;
        tr.timeline.setProgress(1);
        spyOn(tr, '_show').and.callThrough();
        tr.timeline.setProgress(.9);
        return expect(tr._show).toHaveBeenCalled();
      });
      it('should call _hide method', function() {
        var tr;
        tr = new Transit;
        tr.timeline.setProgress(0);
        spyOn(tr, '_hide').and.callThrough();
        tr.timeline.setProgress(.1);
        tr.timeline.setProgress(1);
        return expect(tr._hide).toHaveBeenCalled();
      });
      return it('should not call _hide method if isShowEnd is set', function() {
        var tr;
        tr = new Transit({
          isShowEnd: true
        });
        tr.timeline.setProgress(0);
        spyOn(tr, '_hide').and.callThrough();
        tr.timeline.setProgress(.1);
        tr.timeline.setProgress(1);
        return expect(tr._hide).not.toHaveBeenCalled();
      });
    });
    describe('_increaseSizeWithEasing method ->', function() {
      it('should increase size based on easing - elastic.out', function() {
        var tr;
        tr = new Transit({
          easing: 'elastic.out'
        });
        tr._props.size = 1;
        tr._increaseSizeWithEasing();
        return expect(tr._props.size).toBe(1.25);
      });
      it('should increase size based on easing - elastic.inout', function() {
        var tr;
        tr = new Transit({
          easing: 'elastic.inout'
        });
        tr._props.size = 1;
        tr._increaseSizeWithEasing();
        return expect(tr._props.size).toBe(1.25);
      });
      it('should increase size based on easing - back.out', function() {
        var tr;
        tr = new Transit({
          easing: 'back.out'
        });
        tr._props.size = 1;
        tr._increaseSizeWithEasing();
        return expect(tr._props.size).toBe(1.1);
      });
      return it('should increase size based on easing - back.inout', function() {
        var tr;
        tr = new Transit({
          easing: 'back.inout'
        });
        tr._props.size = 1;
        tr._increaseSizeWithEasing();
        return expect(tr._props.size).toBe(1.1);
      });
    });
    describe('_increaseSizeWithBitRatio method ->', function() {
      it('should increase size based on bit ratio', function() {
        var tr;
        tr = new Transit({
          shape: 'equal'
        });
        tr._props.size = 1;
        tr._increaseSizeWithBitRatio();
        return expect(tr._props.size).toBe(tr.bit.ratio);
      });
      return it('should increase size based 2 gap sizes', function() {
        var gap, tr;
        gap = 20;
        tr = new Transit({
          shape: 'equal',
          sizeGap: gap
        });
        tr._props.size = 1;
        tr._increaseSizeWithBitRatio();
        return expect(tr._props.size).toBe(tr.bit.ratio + 2 * gap);
      });
    });
    describe('_parseOptionString method ->', function() {
      var tr;
      tr = new Transit;
      it('should parse stagger values', function() {
        var result, string;
        string = 'stagger(200)';
        spyOn(h, 'parseStagger').and.callThrough();
        result = tr._parseOptionString(string);
        expect(h.parseStagger).toHaveBeenCalledWith(string, 0);
        return expect(result).toBe(h.parseStagger(string, 0));
      });
      return it('should parse rand values', function() {
        var result, string;
        string = 'rand(0,1)';
        spyOn(h, 'parseRand').and.callThrough();
        result = tr._parseOptionString(string);
        return expect(h.parseRand).toHaveBeenCalledWith(string);
      });
    });
    describe('_parsePositionOption method ->', function() {
      var tr;
      tr = new Transit;
      it('should parse position option', function() {
        var key, result;
        tr._props.x = '100%';
        key = 'x';
        spyOn(h, 'parseUnit').and.callThrough();
        result = tr._parsePositionOption(key);
        expect(h.parseUnit).toHaveBeenCalledWith(tr._props[key]);
        return expect(result).toBe(h.parseUnit(tr._props[key]).string);
      });
      return it('should leave the value unattended if not pos property', function() {
        var key, result;
        tr._props.x = '100%';
        key = 'fill';
        spyOn(h, 'parseUnit').and.callThrough();
        result = tr._parsePositionOption(key);
        expect(h.parseUnit).not.toHaveBeenCalledWith();
        return expect(result).toBe(tr._props[key]);
      });
    });
    describe('_parseStrokeDashOption method ->', function() {
      var tr;
      tr = new Transit;
      it('should parse strokeDash option', function() {
        var key, result;
        tr._props.strokeDasharray = 200;
        key = 'strokeDasharray';
        spyOn(h, 'parseUnit').and.callThrough();
        result = tr._parseStrokeDashOption(key);
        expect(h.parseUnit).toHaveBeenCalledWith(tr._props[key]);
        expect(result[0].unit).toBe(h.parseUnit(tr._props[key]).unit);
        expect(result[0].isStrict).toBe(h.parseUnit(tr._props[key]).isStrict);
        expect(result[0].value).toBe(h.parseUnit(tr._props[key]).value);
        expect(result[0].string).toBe(h.parseUnit(tr._props[key]).string);
        return expect(result[1]).not.toBeDefined();
      });
      it('should parse strokeDash option string', function() {
        var key, result;
        tr._props.strokeDasharray = '200 100';
        key = 'strokeDasharray';
        spyOn(h, 'parseUnit').and.callThrough();
        result = tr._parseStrokeDashOption(key);
        expect(h.parseUnit).toHaveBeenCalledWith('200');
        expect(h.parseUnit).toHaveBeenCalledWith('100');
        expect(result[0].unit).toBe(h.parseUnit(200).unit);
        expect(result[0].isStrict).toBe(h.parseUnit(200).isStrict);
        expect(result[0].value).toBe(h.parseUnit(200).value);
        expect(result[0].string).toBe(h.parseUnit(200).string);
        expect(result[1].unit).toBe(h.parseUnit(100).unit);
        expect(result[1].isStrict).toBe(h.parseUnit(100).isStrict);
        expect(result[1].value).toBe(h.parseUnit(100).value);
        expect(result[1].string).toBe(h.parseUnit(100).string);
        return expect(result[2]).not.toBeDefined();
      });
      return it('should leave the value unattended if not strokeDash.. property', function() {
        var key, result;
        tr._props.x = '100%';
        key = 'fill';
        spyOn(h, 'parseUnit').and.callThrough();
        result = tr._parseStrokeDashOption(key);
        expect(h.parseUnit).not.toHaveBeenCalledWith();
        return expect(result).toBe(tr._props[key]);
      });
    });
    describe('_resetTween method ->', function() {
      it('should set props to the tween', function() {
        var props, tr;
        tr = new Transit;
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
        tr = new Transit;
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
    return describe('_resetTweens method ->', function() {
      it('should reset options on all tweens', function() {
        var tr;
        tr = new Transit().then({
          fill: 'cyan'
        }).then({
          fill: 'yellow'
        });
        spyOn(tr.timeline._timelines[0], '_setProps');
        spyOn(tr.timeline._timelines[1], '_setProps');
        spyOn(tr.timeline._timelines[2], '_setProps');
        tr._resetTweens();
        expect(tr.timeline._timelines[0]._setProps).toHaveBeenCalledWith(tr.history[0]);
        expect(tr.timeline._timelines[1]._setProps).toHaveBeenCalledWith(tr.history[1]);
        return expect(tr.timeline._timelines[2]._setProps).toHaveBeenCalledWith(tr.history[2]);
      });
      it('should loop thru all tweens', function() {
        var shift, tr, tweens;
        tr = new Transit().then({
          fill: 'cyan'
        }).then({
          fill: 'yellow'
        });
        spyOn(tr, '_resetTween');
        tr._resetTweens();
        tweens = tr.timeline._timelines;
        shift = 0;
        expect(tr._resetTween).toHaveBeenCalledWith(tweens[0], tr.history[0], shift);
        shift += tweens[0]._props.repeatTime;
        expect(tr._resetTween).toHaveBeenCalledWith(tweens[1], tr.history[1], shift);
        shift += tweens[1]._props.repeatTime;
        return expect(tr._resetTween).toHaveBeenCalledWith(tweens[2], tr.history[2], shift);
      });
      return it('should call _recalcTotalDuration on the timeline', function() {
        var tr;
        tr = new Transit().then({
          fill: 'cyan'
        }).then({
          fill: 'yellow'
        });
        spyOn(tr.timeline, '_recalcTotalDuration');
        tr._resetTweens();
        return expect(tr.timeline._recalcTotalDuration).toHaveBeenCalled();
      });
    });
  });

}).call(this);
