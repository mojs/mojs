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
        return expect(byte.defaults).toBeDefined();
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
        expect(byte._props.radiusX).toBe(50);
        return expect(byte._props.radiusY).toBe(45);
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
      return it('should allways inherit radiusX/Y from radius', function() {
        var byte;
        byte = new Byte({
          radius: 10
        });
        byte._extendDefaults({
          radius: 100
        });
        expect(byte._props.radius).toBe(100);
        expect(byte._props.radiusX).toBe(100);
        return expect(byte._props.radiusY).toBe(100);
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
        return expect(byte.h.isArray(byte.history)).toBe(true);
      });
      it('should save options to history array', function() {
        var byte;
        byte = new Byte({
          radius: 20
        });
        return expect(byte.history.length).toBe(1);
      });
      return it('should extend options by defaults on the first add', function() {
        var byte;
        byte = new Byte({
          opacity: .5
        });
        return expect(byte.history[0].radius[0]).toBe(50);
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
      it('should not pass isChained to timeline if delay', function() {
        var byte;
        byte = new Byte({
          radius: 20,
          duration: 1000
        });
        byte.then({
          radiusX: 5,
          delay: 100
        });
        return expect(byte.timeline._timelines[1]._props.isChained).toBe(false);
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
        expect(byte.history[2].radiusX[20]).toBe(5);
        return expect(byte.history[2].radiusY[20]).toBe(40);
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
              isRightScope = this === tr.timeline._timelines[1];
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
              isRightScope = this === tr.timeline._timelines[1];
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
          var options, tr;
          options = {
            onUpdate: function() {}
          };
          tr = new Transit().then(options);
          tr.timeline.setProgress(0);
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
      it('should set display: block if isShowInit was passed', function() {
        var byte;
        byte = new Byte({
          isShowInit: true
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
        byte.h.remBase = 8;
        byte._render();
        byte.h.remBase = 16;
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
      return it('should set a position with respect to units', function() {
        var byte;
        byte = new Byte({
          opacity: .5
        });
        return expect(byte.el.style.opacity).toBe('0.5');
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
        return it('should animate position', function(dfr) {
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
          duration: 1000,
          stroke: '#ff00ff'
        };
        end = {
          radius: 20,
          duration: 500
        };
        mergedOpton = byte._mergeThenOptions(start, end);
        expect(mergedOpton.radius[10]).toBe(20);
        expect(mergedOpton.duration).toBe(500);
        return expect(mergedOpton.stroke).toBe('#ff00ff');
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
              isRightScope = this === options;
              return args = arguments;
            }
          };
          tr = new Transit;
          tr._overrideUpdateCallbacks(options);
          expect(typeof options.onUpdate).toBe('function');
          options.onUpdate(.1, .1, true, false);
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
          options.onFirstUpdate(true, false);
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
          options.onFirstUpdate(false, false);
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
          options.onFirstUpdate(true, false);
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
          options.onFirstUpdate(true, false);
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
            isRightScope = this === tr.tween;
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
            isRightScope = this === tr.tween;
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
      it('should not hide module is isShowInit was set', function() {
        var tr;
        tr = new Transit({
          isShowInit: true
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
    return describe('_increaseSizeWithBitRatio method ->', function() {
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
  });

}).call(this);
