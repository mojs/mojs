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
    describe('then method ->', function() {
      it('should add new timeline with options', function() {
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
          tr.timeline.setProgress(.4);
          tr.timeline.setProgress(.5);
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
          tr = new Transit({
            isIt: 1
          }).then({
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
        spyOn(byte.h, 'setPrefixedStyle');
        byte._draw();
        return expect(byte.h.setPrefixedStyle).toHaveBeenCalledWith(byte.el, 'transform', 'translate(4px, 0px) scale(1)');
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
        spyOn(byte.h, 'setPrefixedStyle');
        byte._draw();
        return expect(byte.h.setPrefixedStyle).toHaveBeenCalledWith(byte.el, 'transform', 'translate(0px, 4px) scale(1)');
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
        spyOn(byte.h, 'setPrefixedStyle');
        byte._draw();
        return expect(byte.h.setPrefixedStyle).toHaveBeenCalledWith(byte.el, 'transform', 'translate(0px, 0px) scale(3)');
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
    return describe('_parseStrokeDashOption method ->', function() {
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
  });

}).call(this);
