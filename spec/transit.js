(function() {
  var Bit, Byte, Rect, h, ns, svg;

  Byte = mojs.Transit;

  Bit = mojs.Bit;

  Rect = mojs.Rect;

  h = mojs.helpers;

  ns = 'http://www.w3.org/2000/svg';

  svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, 'svg') : void 0;

  console.warn = function() {};

  console.error = function() {};

  describe('Transit ->', function() {
    it('should have ownvars function', function() {
      var byte;
      byte = new Byte;
      expect(byte.vars).toBeDefined();
      return expect(function() {
        return byte.vars();
      }).not.toThrow();
    });
    describe('extension ->', function() {
      return it('should extend Bit class', function() {
        var byte;
        byte = new Byte;
        return expect(byte instanceof Bit).toBe(true);
      });
    });
    describe('defaults object ->', function() {
      return it('should have defaults object', function() {
        var byte;
        byte = new Byte;
        return expect(byte.defaults).toBeDefined();
      });
    });
    describe('options object ->', function() {
      it('should recieve empty options object by default', function() {
        var byte;
        byte = new Byte;
        return expect(byte.o).toBeDefined();
      });
      return it('should recieve options object', function() {
        var byte;
        byte = new Byte({
          option: 1
        });
        return expect(byte.o.option).toBe(1);
      });
    });
    describe('extendDefaults method ->', function() {
      it('should extend defaults object to properties', function() {
        var byte;
        byte = new Byte({
          radius: 45
        });
        return expect(byte.props.radius).toBe(45);
      });
      it('should extend defaults object to properties if 0', function() {
        var byte;
        byte = new Byte({
          radius: 0
        });
        return expect(byte.props.radius).toBe(0);
      });
      it('should extend defaults object to properties if object was passed', function() {
        var byte;
        byte = new Byte({
          radius: {
            45: 55
          }
        });
        return expect(byte.props.radius).toBe(45);
      });
      it('should ignore properties defined in skipProps object', function() {
        var byte;
        byte = new Byte({
          radius: 45
        });
        byte.skipProps = {
          radius: 1
        };
        byte.o.radius = 50;
        byte.extendDefaults();
        return expect(byte.props.radius).toBe(45);
      });
      it('should extend defaults object to properties if array was passed', function() {
        var byte;
        byte = new Byte({
          radius: [50, 100]
        });
        return expect(byte.props.radius.join(', ')).toBe('50, 100');
      });
      it('should extend defaults object to properties if rand was passed', function() {
        var byte;
        byte = new Byte({
          radius: 'rand(0, 10)'
        });
        expect(byte.props.radius).toBeDefined();
        expect(byte.props.radius).toBeGreaterThan(-1);
        return expect(byte.props.radius).not.toBeGreaterThan(10);
      });
      return it('should recieve object to iterate from', function() {
        var byte, fillBefore;
        byte = new Byte({
          radius: 'rand(0, 10)',
          isRunLess: true,
          fill: 'deeppink'
        });
        fillBefore = byte.props.fill;
        byte.extendDefaults({
          radius: 10
        });
        expect(byte.props.radius).toBe(10);
        return expect(byte.props.fill).toBe(fillBefore);
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
      it('should rewrite the first history item on run', function() {
        var byte;
        byte = new Byte({
          radius: 20
        });
        byte.run({
          radius: 10
        });
        return expect(byte.history[0].radius).toBe(10);
      });
      it('should extend options by defaults on the first add', function() {
        var byte;
        byte = new Byte({
          opacity: .5
        });
        return expect(byte.history[0].radius[0]).toBe(50);
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
    describe('transformHistory method->', function() {
      it('should add new options to the history', function() {
        var byte;
        byte = new Byte({
          isRunLess: true
        });
        byte.then({
          radius: 0
        });
        byte.transformHistory({
          x: 20
        });
        return expect(byte.history[1].x).toBe(20);
      });
      it('should rewrite options in the history', function() {
        var byte;
        byte = new Byte({
          isRunLess: true,
          x: 200
        });
        byte.then({
          radius: 0
        });
        byte.transformHistory({
          x: 100
        });
        return expect(byte.history[1].x).toBe(100);
      });
      it('should stop rewriting if further option is defined', function() {
        var byte;
        byte = new Byte({
          isRunLess: true,
          x: 200
        }).then({
          radius: 0
        }).then({
          radius: 0,
          x: 20
        });
        byte.transformHistory({
          x: 100
        });
        expect(byte.history[1].x).toBe(100);
        expect(byte.history[2].x[100]).toBe(20);
        return expect(byte.history[2].x[200]).not.toBeDefined();
      });
      it('should stop rewriting if further option is defined', function() {
        var byte;
        byte = new Byte({
          isRunLess: true,
          x: 200
        }).then({
          radius: 0
        }).then({
          radius: 0,
          x: 20
        }).then({
          radius: 0,
          x: 10
        });
        byte.transformHistory({
          x: 100
        });
        return expect(byte.history[3].x[20]).toBe(10);
      });
      return it('should rewrite until defined if object was passed', function() {
        var byte;
        byte = new Byte({
          isRunLess: true,
          x: 200
        }).then({
          radius: 0
        }).then({
          radius: 0,
          x: 20
        });
        byte.transformHistory({
          x: {
            100: 50
          }
        });
        expect(byte.history[1].x[100]).toBe(50);
        return expect(byte.history[2].x[50]).toBe(20);
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
        return expect(byte.tween.timelines.length).toBe(2);
      });
      it('should add new timeline with options', function() {
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
        expect(byte.tween.timelines[1].o.duration).toBe(1000);
        expect(byte.tween.timelines[1].o.yoyo).toBe(true);
        return expect(byte.tween.timelines[1].o.delay).toBe(1110);
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
        expect(byte.history[2].yoyo).toBe(true);
        return expect(byte.history[2].stroke['transparent']).toBe('green');
      });
      it('should bind onUpdate function', function() {
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
          delay: 200,
          stroke: 'green'
        });
        expect(typeof byte.tween.timelines[1].o.onUpdate).toBe('function');
        return expect(typeof byte.tween.timelines[2].o.onUpdate).toBe('function');
      });
      it('should bind onStart function', function() {
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
          delay: 200,
          stroke: 'green'
        });
        expect(typeof byte.tween.timelines[1].o.onStart).toBe('function');
        return expect(typeof byte.tween.timelines[2].o.onStart).toBe('function');
      });
      return it('should bind onFirstUpdate function', function() {
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
          delay: 200,
          stroke: 'green'
        });
        expect(typeof byte.tween.timelines[1].o.onFirstUpdate).toBe('function');
        return expect(typeof byte.tween.timelines[2].o.onFirstUpdate).toBe('function');
      });
    });
    describe('tuneOptions method ->', function() {
      it('should call extendDefaults with options', function() {
        var byte, o;
        byte = new Byte;
        o = {
          radius: 50
        };
        spyOn(byte, 'tuneOptions');
        byte.tuneOptions(o);
        return expect(byte.tuneOptions).toHaveBeenCalled();
      });
      return it('should call calcSize and setElStyles methods', function() {
        var byte;
        byte = new Byte;
        spyOn(byte, 'calcSize');
        spyOn(byte, 'setElStyles');
        byte.tuneOptions({
          radius: 50
        });
        expect(byte.calcSize).toHaveBeenCalled();
        return expect(byte.setElStyles).toHaveBeenCalled();
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
        return expect(byte.props.size).toBe(212);
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
        return expect(byte.props.size).toBe(412);
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
        return expect(byte.props.size).toBe(612);
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
        return expect(byte.props.size).toBe(212);
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
        return expect(byte.props.size).toBe(112);
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
        return expect(byte.props.size).toBe(292);
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
          type: 'rect'
        });
        svg = document.createElementNS(ns, 'svg');
        rect = new Rect({
          ctx: svg
        });
        return expect(byte.props.size).toBe(212 * rect.ratio);
      });
      it('should not calculate size el size if size was passed', function() {
        var byte;
        byte = new Byte({
          radius: 100,
          strokeWidth: 5,
          size: 400
        });
        return expect(byte.props.size).toBe(400);
      });
      it('should not calculate size el size if external context was passed', function() {
        var byte;
        byte = new Byte({
          radius: 100,
          strokeWidth: 5,
          size: 400,
          ctx: svg
        });
        return expect(byte.props.size).toBe(400);
      });
      return it('should calculate center based on el size', function() {
        var byte;
        byte = new Byte({
          radius: {
            25: -100
          },
          strokeWidth: {
            4: 6
          }
        });
        expect(byte.props.size).toBe(212);
        return expect(byte.props.center).toBe(106);
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
          y: 20,
          isRunLess: true
        });
        expect(byte.el.style.position).toBe('absolute');
        expect(byte.el.style.width).toBe('54px');
        expect(byte.el.style.height).toBe('54px');
        expect(byte.el.style.display).toBe('none');
        expect(byte.el.style['margin-left']).toBe('-27px');
        expect(byte.el.style['margin-top']).toBe('-27px');
        expect(byte.el.style['backface-visibility']).toBe('hidden');
        expect(byte.el.style["" + h.prefix.css + "backface-visibility"]).toBe('hidden');
        return expect(byte.isShown).toBe(false);
      });
      it('should skip props if foreign context', function() {
        var byte, prefixedProp;
        byte = new Byte({
          radius: 25,
          strokeWidth: 2,
          x: 10,
          y: 20,
          isRunLess: true,
          ctx: svg
        });
        expect(byte.el.style.display).toBe('none');
        expect(byte.el.style.opacity).toBe('1');
        expect(byte.el.style.position).not.toBe('absolute');
        expect(byte.el.style.width).not.toBe('54px');
        expect(byte.el.style.height).not.toBe('54px');
        expect(byte.el.style['margin-left']).not.toBe('-27px');
        expect(byte.el.style['margin-top']).not.toBe('-27px');
        expect(byte.el.style['backface-visibility']).not.toBe('hidden');
        prefixedProp = "" + h.prefix.css + "backface-visibility";
        expect(byte.el.style[prefixedProp]).not.toBe('hidden');
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
      it('should set el size based', function() {
        var byte;
        byte = new Byte({
          radius: 25,
          strokeWidth: 2,
          x: 10,
          y: 20
        });
        byte.isRendered = false;
        byte.h.remBase = 8;
        byte.render();
        byte.h.remBase = 16;
        expect(byte.el.style.position).toBe('absolute');
        expect(byte.el.style.width).toBe('54px');
        expect(byte.el.style.height).toBe('54px');
        expect(byte.el.style['margin-left']).toBe('-27px');
        expect(byte.el.style['margin-top']).toBe('-27px');
        expect(byte.el.style['backface-visibility']).toBe('hidden');
        return expect(byte.el.style["" + h.prefix.css + "backface-visibility"]).toBe('hidden');
      });
      it('should create bit', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        expect(byte.bit).toBeDefined();
        return expect(byte.bit.o.isDrawLess).toBe(true);
      });
      it('should create bit based on type option or fallback to line', function() {
        var byte, byte2;
        byte = new Byte({
          radius: 25,
          type: 'rect'
        });
        byte2 = new Byte({
          radius: 25
        });
        expect(byte.bit.type).toBe('rect');
        return expect(byte2.bit.type).toBe('line');
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
      it('should animate opacity', function(dfr) {
        var byte;
        byte = new Byte({
          opacity: {
            1: 0
          },
          duration: 50
        });
        return setTimeout(function() {
          expect(byte.el.style.opacity).toBe('0');
          return dfr();
        }, 100);
      });
      return describe('position set ->', function() {
        describe('x/y coordinates ->', function() {
          it('should set a position with respect to units', function() {
            var byte;
            byte = new Byte({
              x: 100,
              y: 50
            });
            expect(byte.el.style.left).toBe('100px');
            return expect(byte.el.style.top).toBe('50px');
          });
          it('should animate position', function(dfr) {
            var byte;
            byte = new Byte({
              x: {
                100: '200px'
              },
              duration: 20
            });
            return setTimeout(function() {
              expect(byte.el.style.left).toBe('200px');
              return dfr();
            }, 100);
          });
          it('should warn when x/y animated position and not foreign context', function() {
            var byte;
            spyOn(console, 'warn');
            byte = new Byte({
              x: {
                100: '200px'
              }
            });
            return expect(console.warn).toHaveBeenCalled();
          });
          it('should notwarn when x/y animated position and foreign context', function() {
            var byte;
            spyOn(console, 'warn');
            byte = new Byte({
              x: {
                100: '200px'
              },
              ctx: svg
            });
            return expect(console.warn).not.toHaveBeenCalled();
          });
          it('should animate position with respect to units', function(dfr) {
            var byte;
            byte = new Byte({
              x: {
                '20%': '50%'
              },
              duration: 20
            });
            return setTimeout(function() {
              expect(byte.el.style.left).toBe('50%');
              return dfr();
            }, 100);
          });
          return it('should fallback to end units if units are differnt', function(dfr) {
            var byte;
            byte = new Byte({
              x: {
                '20%': '50px'
              },
              duration: 20
            });
            return setTimeout(function() {
              expect(byte.el.style.left).toBe('50px');
              return dfr();
            }, 100);
          });
        });
        return describe('shiftX/shiftY coordinates', function() {
          it('should set a position with respect to units', function() {
            var byte;
            byte = new Byte({
              shiftX: 100,
              shiftY: 50
            });
            return expect(byte.el.style.transform).toBe('translate(100px, 50px)');
          });
          it('should animate position', function(dfr) {
            var byte;
            byte = new Byte({
              shiftX: {
                100: '200px'
              },
              duration: 20
            });
            return setTimeout(function() {
              expect(byte.el.style.transform).toBe('translate(200px, 0px)');
              return dfr();
            }, 100);
          });
          it('should animate position with respect to units', function(dfr) {
            var byte;
            byte = new Byte({
              shiftX: {
                '20%': '50%'
              },
              duration: 20
            });
            return setTimeout(function() {
              expect(byte.el.style.transform).toBe('translate(50%, 0px)');
              return dfr();
            }, 100);
          });
          return it('should fallback to end units if units are differnt', function(dfr) {
            var byte;
            byte = new Byte({
              shiftX: {
                '20%': '50px'
              },
              shiftY: {
                0: '50%'
              },
              duration: 20
            });
            return setTimeout(function() {
              expect(byte.el.style.transform).toBe('translate(50px, 50%)');
              return dfr();
            }, 100);
          });
        });
      });
    });
    describe('fillTransform method ->', function() {
      return it('return tranform string of the el', function() {
        var byte;
        byte = new Byte({
          shiftX: 100,
          shiftY: 100
        });
        return expect(byte.fillTransform()).toBe('translate(100px, 100px)');
      });
    });
    describe('isNeedsTransform method ->', function() {
      return it('return boolean if fillTransform needed', function() {
        var byte;
        byte = new Byte({
          shiftX: 100,
          shiftY: 100
        });
        return expect(byte.isNeedsTransform()).toBe(true);
      });
    });
    describe('show method ->', function() {
      it('should set display: block to el', function() {
        var byte;
        byte = new Byte;
        byte.show();
        return expect(byte.el.style.display).toBe('block');
      });
      return it('should return if isShow is already true', function() {
        var byte;
        byte = new Byte;
        byte.show();
        byte.el.style.display = 'inline';
        byte.show();
        return expect(byte.el.style.display).toBe('inline');
      });
    });
    describe('hide method ->', function() {
      return it('should set display: block to el', function() {
        var byte;
        byte = new Byte;
        byte.hide();
        return expect(byte.el.style.display).toBe('none');
      });
    });
    describe('mergeThenOptions method ->', function() {
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
        mergedOpton = byte.mergeThenOptions(start, end);
        expect(mergedOpton.radius[10]).toBe(20);
        expect(mergedOpton.duration).toBe(500);
        return expect(mergedOpton.stroke).toBe('#ff00ff');
      });
      it('should merge 2 objects if the first was an object', function() {
        var byte, end, mergedOpton, start;
        byte = new Byte({
          isRunLess: true
        });
        start = {
          radius: {
            10: 0
          }
        };
        end = {
          radius: 20
        };
        mergedOpton = byte.mergeThenOptions(start, end);
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
        mergedOpton = byte.mergeThenOptions(start, end);
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
        mergedOpton = byte.mergeThenOptions(start, end);
        return expect(mergedOpton.duration).toBe(10);
      });
      return it('should fallback to default value is start is undefined', function() {
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
        mergedOpton = byte.mergeThenOptions(start, end);
        return expect(mergedOpton.stroke['transparent']).toBe('#ff00ff');
      });
    });
    describe('render method ->', function() {
      it('should call draw method', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        spyOn(byte, 'draw');
        byte.render();
        return expect(byte.draw).toHaveBeenCalled();
      });
      it('should call setElStyles method', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        spyOn(byte, 'setElStyles');
        byte.render();
        return expect(byte.setElStyles).toHaveBeenCalled();
      });
      it('should call createBit method', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        spyOn(byte, 'createBit');
        byte.isRendered = false;
        byte.render();
        return expect(byte.createBit).toHaveBeenCalled();
      });
      it('should set isRendered to true method', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        expect(byte.isRendered).toBe(true);
        byte.isRendered = false;
        byte.render();
        return expect(byte.isRendered).toBe(true);
      });
      it('should call calcSize method', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        spyOn(byte, 'calcSize');
        byte.isRendered = false;
        byte.render();
        return expect(byte.calcSize).toHaveBeenCalled();
      });
      return it('should not create new el', function() {
        var byte, cnt;
        byte = new Byte({
          radius: 25
        });
        cnt = document.body.children.length;
        byte.render(true);
        return expect(cnt).toBe(document.body.children.length);
      });
    });
    describe('draw method ->', function() {
      it('should call setProp method', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        spyOn(byte.bit, 'setProp');
        byte.draw();
        return expect(byte.bit.setProp).toHaveBeenCalled();
      });
      it('should set x/y to center', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        byte.draw();
        expect(byte.bit.props.x).toBe(byte.props.center);
        return expect(byte.bit.props.y).toBe(byte.props.center);
      });
      it('should set x/y to props.x/props.y if context was passed', function() {
        var byte;
        byte = new Byte({
          radius: 25,
          ctx: svg
        });
        byte.draw();
        expect(byte.bit.props.x).toBe(parseFloat(byte.props.x));
        return expect(byte.bit.props.y).toBe(parseFloat(byte.props.y));
      });
      it('should call bit.draw method', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        spyOn(byte.bit, 'draw');
        byte.draw();
        return expect(byte.bit.draw).toHaveBeenCalled();
      });
      it('should call drawEl method', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        spyOn(byte, 'drawEl');
        byte.draw();
        return expect(byte.drawEl).toHaveBeenCalled();
      });
      it('should call calcTransform method', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        spyOn(byte, 'calcTransform');
        byte.draw();
        return expect(byte.calcTransform).toHaveBeenCalled();
      });
      it('should recieve the current progress', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        spyOn(byte, 'draw');
        byte.setProgress(.5);
        return expect(byte.draw).toHaveBeenCalledWith(.5);
      });
      return it('should calculate transform object', function() {
        var byte;
        byte = new Byte({
          angle: 90,
          radius: 25,
          strokeWidth: 4
        });
        expect(byte.props.transform).toBe('rotate(90,29,29)');
        return expect(byte.calcTransform).toBeDefined();
      });
    });
    describe('drawEl method ->', function() {
      it('should set el positions and transforms', function() {
        var byte;
        byte = new Byte({
          radius: 25,
          y: 10
        });
        byte.draw();
        expect(byte.el.style.left).toBe('0px');
        expect(byte.el.style.top).toBe('10px');
        expect(byte.el.style.opacity).toBe('1');
        return expect(byte.el.style.transform).toBe('translate(0px, 0px)');
      });
      it('should set only opacity if foreign context', function() {
        var byte;
        byte = new Byte({
          radius: 25,
          y: 10,
          ctx: svg
        });
        byte.draw();
        expect(byte.el.style.opacity).toBe('1');
        expect(byte.el.style.left).not.toBe('0px');
        expect(byte.el.style.top).not.toBe('10px');
        return expect(byte.el.style.transform).not.toBe('translate(0px, 0px)');
      });
      it('should set new values', function() {
        var byte;
        byte = new Byte({
          radius: 25,
          y: 10
        });
        byte.draw();
        byte.props.x = '1px';
        byte.draw();
        expect(byte.el.style.left).toBe('1px');
        expect(byte.lastSet.x.value).toBe('1px');
        return expect(byte.lastSet.x.isChanged).toBe(true);
      });
      it('should not set old values', function() {
        var byte;
        byte = new Byte({
          radius: 25,
          y: 10
        });
        byte.draw();
        byte.draw();
        expect(byte.el.style.left).toBe('0px');
        expect(byte.lastSet.x.value).toBe('0px');
        return expect(byte.lastSet.x.isChanged).toBe(false);
      });
      return it('should call fillTransform method', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        spyOn(byte, 'fillTransform');
        byte.draw();
        return expect(byte.fillTransform).toHaveBeenCalled();
      });
    });
    describe('isPropChanged method ->', function() {
      it('should return bool showing if prop was changed after the last set', function() {
        var byte;
        byte = new Byte({
          radius: 25,
          y: 10
        });
        byte.props.x = '20px';
        expect(byte.isPropChanged('x')).toBe(true);
        byte.props.x = '20px';
        return expect(byte.isPropChanged('x')).toBe(false);
      });
      return it('should add prop object to lastSet if undefined', function() {
        var byte;
        byte = new Byte({
          radius: 25,
          y: 10
        });
        byte.isPropChanged('x');
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
        byte.extendDefaults();
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
      describe('array values ->', function() {
        return it('should calculate array delta', function() {
          var arrayDelta, byte;
          byte = new Byte({
            strokeDasharray: {
              '200 100': '300'
            }
          });
          arrayDelta = byte.deltas.strokeDasharray;
          expect(arrayDelta.start.join(' ')).toBe('200 100');
          expect(arrayDelta.end.join(' ')).toBe('300 0');
          expect(arrayDelta.delta.join(' ')).toBe('100 -100');
          return expect(arrayDelta.type).toBe('array');
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
            },
            isRunLess: true
          });
          return expect(byte.deltas.duration).not.toBeDefined();
        });
      });
    });
    describe('setProgress method ->', function() {
      it('should set transition progress', function() {
        var byte;
        byte = new Byte({
          radius: {
            '25.50': -75.50
          }
        });
        byte.setProgress(.5);
        return expect(byte.progress).toBe(.5);
      });
      it('should set value progress', function() {
        var byte;
        byte = new Byte({
          radius: {
            '25': 75
          }
        });
        byte.setProgress(.5);
        return expect(byte.props.radius).toBe(50);
      });
      it('should call calcOrigin method', function() {
        var byte;
        byte = new Byte({
          radius: {
            '25': 75
          }
        });
        spyOn(byte, 'calcOrigin');
        byte.setProgress(.5);
        return expect(byte.calcOrigin).toHaveBeenCalled();
      });
      it('should have origin object', function() {
        var byte;
        byte = new Byte({
          radius: {
            '25': 75
          }
        });
        byte.setProgress(.5);
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
        byte.setProgress(.5);
        expect(byte.origin.x).toBe(byte.props.center);
        return expect(byte.origin.y).toBe(byte.props.center);
      });
      it('should have origin should be x/y if foreign context', function() {
        var byte;
        byte = new Byte({
          radius: {
            '25': 75
          },
          ctx: svg
        });
        byte.setProgress(.5);
        expect(byte.origin.x).toBe(parseFloat(byte.props.x));
        return expect(byte.origin.y).toBe(parseFloat(byte.props.x));
      });
      it('should have origin should be number if foreign context', function() {
        var byte;
        byte = new Byte({
          radius: {
            '25': 75
          },
          ctx: svg
        });
        byte.setProgress(.5);
        expect(typeof byte.origin.x).toBe('number');
        return expect(typeof byte.origin.y).toBe('number');
      });
      it('should call calcCurrentProps', function() {
        var byte;
        byte = new Byte({
          radius: {
            '25': 75
          }
        });
        spyOn(byte, 'calcCurrentProps');
        byte.setProgress(.5);
        return expect(byte.calcCurrentProps).toHaveBeenCalledWith(.5);
      });
      it('should not call onUpdate if isShow was passed', function() {
        var byte;
        byte = new Byte({
          radius: {
            '25': 75
          }
        });
        spyOn(byte, 'onUpdate');
        byte.setProgress(.5, true);
        return expect(byte.onUpdate).not.toHaveBeenCalled();
      });
      it('not thow', function() {
        var byte;
        byte = new Byte({
          radius: {
            '25': 75
          },
          ctx: svg
        });
        return expect(function() {
          return byte.show();
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
        byte.setProgress(.5);
        return expect(byte.props.stroke).toBe('rgba(127,127,127,1)');
      });
      it('should set color value progress for delta starting with 0', function() {
        var byte, colorDelta;
        byte = new Byte({
          stroke: {
            '#000': 'rgb(0,255,255)'
          }
        });
        colorDelta = byte.deltas.stroke;
        byte.setProgress(.5);
        return expect(byte.props.stroke).toBe('rgba(0,127,127,1)');
      });
      it('should set strokeDasharray/strokeDashoffset value progress', function() {
        var byte;
        byte = new Byte({
          strokeDasharray: {
            '200 100': '400'
          }
        });
        byte.setProgress(.5);
        return expect(byte.props.strokeDasharray).toBe('300 50 ');
      });
      it('should set 0 if progress is less then 0', function() {
        var byte;
        byte = new Byte({
          radius: {
            '25': 75
          }
        });
        byte.setProgress(-1);
        return expect(byte.progress).toBe(0);
      });
      return it('should set 1 if progress is greater then 1', function() {
        var byte;
        byte = new Byte({
          radius: {
            '25': 75
          }
        });
        byte.setProgress(2);
        return expect(byte.progress).toBe(1);
      });
    });
    describe('Callbacks ->', function() {
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
          return setTimeout(function() {
            expect(isOnStart).toBe(true);
            return dfr();
          }, 100);
        });
        it('should have scope of byte', function(dfr) {
          var byte, isRightScope;
          isRightScope = null;
          byte = new Byte({
            radius: {
              '25': 75
            },
            onStart: function() {
              return isRightScope = this instanceof Byte;
            }
          });
          return setTimeout(function() {
            expect(isRightScope).toBe(true);
            return dfr();
          }, 100);
        });
        return it('should show el', function() {
          var byte;
          byte = new Byte({
            radius: {
              '25': 75
            }
          });
          spyOn(byte, 'show');
          byte.tween.setProgress(.5);
          return expect(byte.show).toHaveBeenCalled();
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
            expect(isOnUpdate).toBe(true);
            return dfr();
          }, 100);
        });
        it('should have scope of byte', function(dfr) {
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
          return setTimeout(function() {
            expect(isRightScope).toBe(true);
            return dfr();
          }, 100);
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
            duration: 64
          });
          return setTimeout(function() {
            expect(progress).toBeGreaterThan(0);
            expect(progress).not.toBeGreaterThan(1);
            return dfr();
          }, 100);
        });
      });
      return describe('onComplete callback ->', function() {
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
            duration: 20
          });
          return setTimeout(function() {
            expect(isOnComplete).toBe(true);
            return dfr();
          }, 100);
        });
        return it('should have scope of byte', function(dfr) {
          var byte, isRightScope;
          isRightScope = null;
          byte = new Byte({
            radius: {
              '25': 75
            },
            onComplete: function() {
              return isRightScope = this instanceof Byte;
            },
            duration: 20
          });
          return setTimeout(function() {
            expect(isRightScope).toBe(true);
            return dfr();
          }, 100);
        });
      });
    });
    describe('onFirstUpdateBackward callback ->', function() {
      it('should call tuneOptions method when the tween goes backward', function() {
        var byte;
        byte = new Byte({
          radius: {
            '25': 75
          }
        }).then({
          radius: 20
        });
        spyOn(byte, 'tuneOptions');
        byte.tween.setProgress(.99);
        byte.tween.setProgress(0);
        return expect(byte.tuneOptions).toHaveBeenCalled();
      });
      return it('should call not tuneOptions if history length is one record', function() {
        var byte;
        byte = new Byte({
          radius: {
            '25': 75
          }
        });
        spyOn(byte, 'tuneOptions');
        byte.tween.setProgress(.99);
        byte.tween.setProgress(0);
        return expect(byte.tuneOptions).not.toHaveBeenCalled();
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
        return expect(byte.tween).toBeDefined();
      });
      it('should bind the onFirstUpdateBackward metod', function() {
        var byte;
        byte = new Byte({
          radius: {
            '25': 75
          }
        });
        return expect(typeof byte.timeline.o.onFirstUpdateBackward).toBe('function');
      });
      it('should start tween after init', function(dfr) {
        var byte, isStarted;
        isStarted = false;
        byte = new Byte({
          radius: {
            '25': 75
          },
          onStart: function() {
            return isStarted = true;
          }
        });
        return setTimeout(function() {
          expect(isStarted).toBe(true);
          return dfr();
        }, 100);
      });
      it('should not start tween after init is isRunLess was passed', function(dfr) {
        var byte, isStarted;
        isStarted = null;
        byte = new Byte({
          radius: {
            '25': 75
          },
          isRunLess: true,
          onStart: function() {
            return isStarted = true;
          }
        });
        return setTimeout(function() {
          expect(isStarted).toBeFalsy();
          return dfr();
        }, 100);
      });
      return describe('startTween method ->', function() {
        return it('should start tween', function(dfr) {
          var byte;
          byte = new Byte({
            radius: {
              '25': 75
            }
          });
          spyOn(byte.tween, 'start');
          byte.startTween();
          return setTimeout(function() {
            expect(byte.tween.start).toHaveBeenCalled();
            return dfr();
          }, 10);
        });
      });
    });
    describe('easing ->', function() {
      return it('should set easing option to props', function() {
        var byte;
        byte = new Byte({
          easing: 'Linear.None'
        });
        return expect(byte.props.easing).toBe('Linear.None');
      });
    });
    describe('run method->', function() {
      it('should extend defaults with passed object', function() {
        var byte, o;
        byte = new Byte({
          strokeWidth: {
            10: 5
          },
          isRunLess: true
        });
        spyOn(byte, 'extendDefaults');
        o = {
          strokeWidth: 20
        };
        byte.run(o);
        return expect(byte.extendDefaults).toHaveBeenCalledWith(o);
      });
      it('should not extend defaults if object was not passed', function() {
        var byte;
        byte = new Byte({
          strokeWidth: {
            10: 5
          },
          isRunLess: true
        });
        spyOn(byte, 'extendDefaults');
        byte.run();
        return expect(byte.extendDefaults).not.toHaveBeenCalled();
      });
      it('should not override deltas', function() {
        var byte;
        byte = new Byte({
          strokeWidth: {
            10: 5
          },
          isRunLess: true
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
          },
          isRunLess: true
        });
        spyOn(byte, 'calcSize');
        byte.run({
          radius: 50
        });
        return expect(byte.calcSize).toHaveBeenCalled();
      });
      it('should set new el size', function() {
        var byte;
        byte = new Byte({
          radius: {
            10: 5
          },
          isRunLess: true
        });
        spyOn(byte, 'setElStyles');
        byte.run({
          radius: 50
        });
        return expect(byte.setElStyles).toHaveBeenCalled();
      });
      it('should set new el size #2', function() {
        var byte;
        byte = new Byte({
          radius: {
            10: 5
          },
          isRunLess: true
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
          },
          isRunLess: true
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
          },
          isRunLess: true
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
          },
          isRunLess: true
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
          },
          isRunLess: true
        });
        spyOn(byte, 'startTween');
        byte.run();
        return expect(byte.startTween).toHaveBeenCalled();
      });
      it('should accept new options', function() {
        var byte;
        byte = new Byte({
          strokeWidth: {
            10: 5
          },
          isRunLess: true
        });
        byte.run({
          strokeWidth: 25
        });
        expect(byte.props.strokeWidth).toBe(25);
        return expect(byte.deltas.strokeWidth).not.toBeDefined();
      });
      it('should not modify old options', function() {
        var byte;
        byte = new Byte({
          strokeWidth: {
            10: 5
          },
          radius: 33,
          isRunLess: true
        });
        byte.run({
          strokeWidth: 25
        });
        return expect(byte.props.radius).toBe(33);
      });
      it('should call setProgress(0, true)', function() {
        var byte;
        byte = new Byte({
          radius: {
            10: 5
          },
          isRunLess: true
        });
        spyOn(byte, 'setProgress');
        byte.run({
          radius: 50
        });
        return expect(byte.setProgress).toHaveBeenCalledWith(0, true);
      });
      it('should warn if type was passed', function() {
        var byte;
        byte = new Byte({
          type: 'polygon',
          isRunLess: true
        });
        spyOn(byte.h, 'warn');
        byte.run({
          type: 'circle'
        });
        expect(byte.h.warn).toHaveBeenCalled();
        return expect(byte.o.type).toBe('polygon');
      });
      it('should set new options on timeline', function() {
        var byte, onComplete, onStart;
        byte = new Byte({
          isRunLess: true,
          duration: 500,
          delay: 200,
          repeat: 1,
          easing: 'cubic.in',
          yoyo: true,
          onStart: function() {},
          onComplete: function() {}
        });
        onStart = (function() {});
        onComplete = (function() {});
        byte.run({
          duration: 2000,
          delay: 0,
          repeat: 2,
          easing: 'linear.none',
          onStart: onStart,
          onComplete: onComplete,
          yoyo: false
        });
        expect(byte.timeline.o.duration).toBe(2000);
        expect(byte.timeline.o.delay).toBe(0);
        expect(byte.timeline.o.repeat).toBe(2);
        expect(byte.timeline.o.easing).toBe('linear.none');
        expect(byte.timeline.o.onStart).toBe(onStart);
        expect(byte.timeline.o.onComplete).toBe(onComplete);
        return expect(byte.timeline.o.yoyo).toBe(false);
      });
      it('should call recalcDuration on tween', function() {
        var byte;
        byte = new Byte;
        spyOn(byte.tween, 'recalcDuration');
        byte.run({
          duration: 2000
        });
        return expect(byte.tween.recalcDuration).toHaveBeenCalled();
      });
      it('should call transformHistory', function() {
        var byte, o;
        byte = new Byte;
        spyOn(byte, 'transformHistory');
        o = {
          duration: 2000
        };
        byte.run(o);
        return expect(byte.transformHistory).toHaveBeenCalledWith(o);
      });
      it('should not call transformHistory if optionless', function() {
        var byte;
        byte = new Byte;
        spyOn(byte, 'transformHistory');
        byte.run();
        return expect(byte.transformHistory).not.toHaveBeenCalled();
      });
      it('shoud warn if tweenValues changed on run', function() {
        var byte;
        byte = new Byte({
          isRunLess: true,
          duration: 2000
        }).then({
          radius: 40
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
        expect(h.warn).toHaveBeenCalled();
        expect(byte.history[0].duration).toBe(2000);
        return expect(byte.props.duration).toBe(2000);
      });
      return it('shoud not warn if history is 1 record long', function() {
        var byte;
        byte = new Byte({
          isRunLess: true,
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
        return expect(byte.props.duration).toBe(100);
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
        byte.tween.setProgress(.5);
        return expect(byte.el.style.display).toBe('block');
      });
      it('should hide the el on end', function() {
        var byte;
        byte = new Byte({
          ctx: svg
        });
        byte.tween.setProgress(1);
        return expect(byte.el.style.display).toBe('none');
      });
      it('should not hide the el on end if isShowEnd was passed', function() {
        var byte;
        byte = new Byte({
          ctx: svg,
          isShowEnd: true
        });
        byte.tween.setProgress(1);
        return expect(byte.el.style.display).toBe('block');
      });
      it('should not hide the el on end if isShowEnd was passed #2 - chain', function() {
        var byte;
        byte = new Byte({
          ctx: svg,
          isShowEnd: true,
          isRunLess: true
        }).then({
          radius: 10
        }).then({
          radius: 20
        });
        byte.tween.setProgress(1);
        return expect(byte.el.style.display).toBe('block');
      });
      it('should hide the el on reverse end', function() {
        var byte;
        byte = new Byte({
          ctx: svg
        });
        byte.tween.setProgress(.5);
        byte.tween.setProgress(0);
        return expect(byte.el.style.display).toBe('none');
      });
      return it('should not hide the el on reverse end if isShowInit passed', function() {
        var byte;
        byte = new Byte({
          ctx: svg,
          isShowInit: true
        });
        byte.tween.setProgress(.5);
        byte.tween.setProgress(0);
        return expect(byte.el.style.display).toBe('block');
      });
    });
    return describe('getRadiusSize method ->', function() {
      it('should return max from delatas if key is defined', function() {
        var byte, size;
        byte = new Byte({
          radiusX: {
            20: 30
          }
        });
        size = byte.getRadiusSize({
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
        size = byte.getRadiusSize({
          key: 'radiusX',
          fallback: 0
        });
        return expect(size).toBe(20);
      });
      it('should fallback to passed fallback option', function() {
        var byte, size;
        byte = new Byte;
        size = byte.getRadiusSize({
          key: 'radiusX',
          fallback: 0
        });
        return expect(size).toBe(0);
      });
      return it('should fallback to 0 by default', function() {
        var byte, size;
        byte = new Byte;
        size = byte.getRadiusSize({
          key: 'radiusX'
        });
        return expect(size).toBe(0);
      });
    });
  });

}).call(this);
