(function() {
  var Bit, Byte, Rect, Thenable, Transit, Tweenable, h, ns, svg;

  Byte = mojs.Transit;

  Transit = mojs.Transit;

  Bit = mojs.shapesMap.getShape('bit');

  Thenable = mojs.Thenable;

  Tweenable = mojs.Tweenable;

  Rect = mojs.shapesMap.getShape('rect');

  h = mojs.helpers;

  ns = 'http://www.w3.org/2000/svg';

  svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, 'svg') : void 0;

  console.warn = function() {};

  console.error = function() {};

  describe('Transit ->', function() {
    describe('_vars method', function() {
      it('should have own _vars function ->', function() {
        var byte;
        byte = new Byte;
        expect(byte._vars).toBeDefined();
        return expect(function() {
          return byte._vars();
        }).not.toThrow();
      });
      return it('should call _vars super method', function() {
        var byte;
        byte = new Byte;
        return expect(byte._history.length).toBe(1);
      });
    });
    describe('extension ->', function() {
      it('should extend Tweenable class', function() {
        var byte;
        byte = new Byte;
        return expect(byte instanceof Tweenable).toBe(true);
      });
      return it('should extend Thenable class', function() {
        var byte;
        byte = new Byte;
        return expect(byte instanceof Thenable).toBe(true);
      });
    });
    describe('defaults object ->', function() {
      return it('should have defaults object', function() {
        var byte;
        byte = new Byte;
        expect(byte._defaults).toBeDefined();
        expect(byte._defaults.shape).toBe('circle');
        expect(byte._defaults.stroke).toBe('transparent');
        expect(byte._defaults.strokeOpacity).toBe(1);
        expect(byte._defaults.strokeLinecap).toBe('');
        expect(byte._defaults.strokeWidth).toBe(2);
        expect(byte._defaults.strokeDasharray).toBe(0);
        expect(byte._defaults.strokeDashoffset).toBe(0);
        expect(byte._defaults.fill).toBe('deeppink');
        expect(byte._defaults.fillOpacity).toBe(1);
        expect(byte._defaults.left).toBe(0);
        expect(byte._defaults.top).toBe(0);
        expect(byte._defaults.x).toBe(0);
        expect(byte._defaults.y).toBe(0);
        expect(byte._defaults.rx).toBe(0);
        expect(byte._defaults.ry).toBe(0);
        expect(byte._defaults.angle).toBe(0);
        expect(byte._defaults.scale).toBe(1);
        expect(byte._defaults.opacity).toBe(1);
        expect(byte._defaults.points).toBe(3);
        expect(byte._defaults.duration).toBe(400);
        expect(byte._defaults.radius[0]).toBe(50);
        expect(byte._defaults.radiusX).toBe(null);
        expect(byte._defaults.radiusY).toBe(null);
        expect(byte._defaults.isShowEnd).toBe(true);
        expect(byte._defaults.isShowStart).toBe(false);
        expect(byte._defaults.size).toBe(null);
        expect(byte._defaults.sizeGap).toBe(0);
        expect(byte._defaults.callbacksContext).toBe(byte);
        return expect(byte._defaults.prevChainModule).toBe(null);
      });
    });
    describe('_applyCallbackOverrides ->', function() {
      it('should create callbackOverrides object on passed object', function() {
        var obj, tr;
        tr = new Transit;
        obj = {};
        tr._applyCallbackOverrides(obj);
        expect(typeof obj.callbackOverrides).toBe('object');
        return expect(obj.callbackOverrides).toBe(obj.callbackOverrides);
      });
      describe('onUpdate callback override ->', function() {
        it('should override this._o.onUpdate', function() {
          var obj, tr;
          tr = new Transit;
          obj = {};
          tr._applyCallbackOverrides(obj);
          return expect(typeof obj.callbackOverrides.onUpdate).toBe('function');
        });
        it('should call _setProgress ', function() {
          var obj, progress, tr;
          tr = new Transit;
          obj = {};
          tr._applyCallbackOverrides(obj);
          spyOn(tr, '_setProgress');
          progress = .25;
          obj.callbackOverrides.onUpdate(progress);
          return expect(tr._setProgress).toHaveBeenCalledWith(progress);
        });
        it('should not override onUpdate function if exists', function() {
          var args, isRightScope, options, tr;
          isRightScope = null;
          args = null;
          options = {
            easing: 'Linear.None',
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
        return it('should call _setProgress method', function() {
          var obj, options, progress, tr;
          options = {
            easing: 'Linear.None',
            onUpdate: function() {}
          };
          obj = {};
          tr = new Transit(options);
          tr.timeline.setProgress(0);
          spyOn(tr, '_setProgress');
          progress = .1;
          tr.timeline.setProgress(progress);
          return expect(tr._setProgress.calls.first().args[0]).toBeCloseTo(progress, 5);
        });
      });
      describe('onStart callback override ->', function() {
        it('should override this._o.onStart', function() {
          var obj, tr;
          tr = new Transit;
          obj = {};
          tr._applyCallbackOverrides(obj);
          return expect(typeof obj.callbackOverrides.onStart).toBe('function');
        });
        it('should call _show if isForward', function() {
          var obj, tr;
          tr = new Transit;
          obj = {};
          tr._applyCallbackOverrides(obj);
          spyOn(tr, '_show');
          obj.callbackOverrides.onStart(true);
          return expect(tr._show).toHaveBeenCalled();
        });
        it('should call _hidePrevChainModule if isForward', function() {
          var obj, tr;
          tr = new Transit;
          obj = {};
          tr._applyCallbackOverrides(obj);
          spyOn(tr, '_hidePrevChainModule');
          obj.callbackOverrides.onStart(true);
          return expect(tr._hidePrevChainModule).toHaveBeenCalled();
        });
        it('should call _hideModuleChain if isForward', function() {
          var obj, tr;
          tr = new Transit;
          obj = {};
          tr._applyCallbackOverrides(obj);
          spyOn(tr, '_hideModuleChain');
          obj.callbackOverrides.onStart(true);
          return expect(tr._hideModuleChain).toHaveBeenCalled();
        });
        it('should call _hide if not isForward', function() {
          var obj, tr;
          tr = new Transit;
          obj = {};
          tr._applyCallbackOverrides(obj);
          spyOn(tr, '_hide');
          obj.callbackOverrides.onStart(false);
          return expect(tr._hide).toHaveBeenCalled();
        });
        it('should call _showPrevChainModule if not isForward', function() {
          var obj, tr;
          tr = new Transit;
          obj = {};
          tr._applyCallbackOverrides(obj);
          spyOn(tr, '_showPrevChainModule');
          obj.callbackOverrides.onStart(false);
          return expect(tr._showPrevChainModule).toHaveBeenCalled();
        });
        it('should not call _hide if not isForward and !isShowStart', function() {
          var obj, tr;
          tr = new Transit({
            isShowStart: true
          });
          obj = {};
          tr._applyCallbackOverrides(obj);
          spyOn(tr, '_hide');
          obj.callbackOverrides.onStart(false);
          return expect(tr._hide).not.toHaveBeenCalled();
        });
        return it('should not call _hideModuleChain if !isForward', function() {
          var obj, tr;
          tr = new Transit;
          obj = {};
          tr._applyCallbackOverrides(obj);
          spyOn(tr, '_hideModuleChain');
          obj.callbackOverrides.onStart(false);
          return expect(tr._hideModuleChain).not.toHaveBeenCalled();
        });
      });
      return describe('onComplete callback override ->', function() {
        it('should override this._o.onComplete', function() {
          var obj, tr;
          tr = new Transit;
          obj = {};
          tr._applyCallbackOverrides(obj);
          return expect(typeof obj.callbackOverrides.onComplete).toBe('function');
        });
        it('should call _show if !isForward', function() {
          var obj, tr;
          tr = new Transit;
          obj = {};
          tr._applyCallbackOverrides(obj);
          spyOn(tr, '_show');
          obj.callbackOverrides.onComplete(false);
          return expect(tr._show).toHaveBeenCalled();
        });
        it('should call _hide if isForward', function() {
          var obj, tr;
          tr = new Transit({
            isShowEnd: false
          });
          obj = {};
          tr._applyCallbackOverrides(obj);
          spyOn(tr, '_hide');
          obj.callbackOverrides.onComplete(true);
          return expect(tr._hide).toHaveBeenCalled();
        });
        return it('should not call _hide if isForward but isShowEnd', function() {
          var obj, tr;
          tr = new Transit({
            isShowEnd: true
          });
          obj = {};
          tr._applyCallbackOverrides(obj);
          spyOn(tr, '_hide');
          obj.callbackOverrides.onComplete(true);
          return expect(tr._hide).not.toHaveBeenCalled();
        });
      });
    });
    describe('_transformTweenOptions method', function() {
      return it('should call _applyCallbackOverrides with _o', function() {
        var tr;
        tr = new Transit;
        spyOn(tr, '_applyCallbackOverrides');
        tr._transformTweenOptions();
        return expect(tr._applyCallbackOverrides).toHaveBeenCalledWith(tr._o);
      });
    });
    describe('origin object ->', function() {
      return it('should have origin object', function() {
        var byte;
        byte = new Byte;
        expect(byte._origin).toBeDefined();
        return expect(typeof byte._origin).toBe('object');
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
        byte = new Transit({
          index: 5
        });
        return expect(byte._index).toBe(5);
      });
      return it('should fallback to 0', function() {
        var byte;
        byte = new Transit;
        return expect(byte._index).toBe(0);
      });
    });
    describe('options history ->', function() {
      it('should have history array', function() {
        var byte;
        byte = new Byte;
        return expect(h.isArray(byte._history)).toBe(true);
      });
      return it('should save options to history array', function() {
        var byte;
        byte = new Byte({
          radius: 20
        });
        return expect(byte._history.length).toBe(1);
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
        return expect(byte._props.size).toBe(212 * rect._props.ratio);
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
        expect(svg.style.height).toBe('100%');
        expect(parseInt(svg.style.left, 10)).toBe(0);
        return expect(parseInt(svg.style.top, 10)).toBe(0);
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
        return expect(byte._isShown).toBe(false);
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
        return expect(byte._isShown).toBe(false);
      });
      it('should set display: block if isShowStart was passed', function() {
        var byte;
        byte = new Byte({
          isShowStart: true
        });
        expect(byte.el.style.display).toBe('block');
        return expect(byte._isShown).toBe(true);
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
        return expect(byte.bit._o.isDrawLess).toBe(true);
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
        expect(byte.bit._props.shape).toBe('rect');
        return expect(byte2.bit._props.shape).toBe('ellipse');
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
        return byte.play();
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
          byte.play();
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
          byte.play();
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
          expect(byte._deltas.left.start.unit).toBe('%');
          return expect(byte._deltas.left.end.unit).toBe('%');
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
        it('should set a position with respect to units', function() {
          var byte, s, tr;
          byte = new Byte({
            x: 100,
            y: 50
          });
          s = byte.el.style;
          tr = s.transform || s["" + mojs.h.prefix.css + "transform"];
          return expect(tr).toBe('scale(1) translate(100px, 50px) rotate(0deg)');
        });
        it('should animate shift position', function(dfr) {
          var byte;
          byte = new Byte({
            x: {
              100: '200px'
            },
            duration: 200,
            onComplete: function() {
              var isTr, isTr2, s, tr;
              s = byte.el.style;
              tr = s.transform || s["" + mojs.h.prefix.css + "transform"];
              isTr = tr === 'scale(1) translate(200px, 0) rotate(0deg)';
              isTr2 = tr === 'scale(1) translate(200px, 0px) rotate(0deg)';
              expect(isTr || isTr2).toBe(true);
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
              var isTr, isTr2, s, tr;
              s = byte.el.style;
              tr = s.transform || s["" + mojs.h.prefix.css + "transform"];
              isTr = tr === 'scale(1) translate(50%, 0) rotate(0deg)';
              isTr2 = tr === 'scale(1) translate(50%, 0px) rotate(0deg)';
              expect(isTr || isTr2).toBe(true);
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
              expect(tr).toBe('scale(1) translate(50px, 50%) rotate(0deg)');
              return dfr();
            }
          });
          return byte.play();
        });
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
        expect(byte.bit._props.x).toBe(byte._origin.x);
        expect(byte.bit._props.y).toBe(byte._origin.y);
        expect(byte.bit._props.rx).toBe(byte._props.rx);
        expect(byte.bit._props.ry).toBe(byte._props.ry);
        expect(byte.bit._props.stroke).toBe(byte._props.stroke);
        expect(byte.bit._props['stroke-width']).toBe(byte._props.strokeWidth);
        expect(byte.bit._props['stroke-opacity']).toBe(byte._props.strokeOpacity);
        expect(byte.bit._props['stroke-linecap']).toBe(byte._props.strokeLinecap);
        expect(byte.bit._props['stroke-dasharray']).toBe(byte._props.strokeDasharray[0].value + ' ');
        expect(byte.bit._props['stroke-dashoffset']).toBe(byte._props.strokeDashoffset[0].value + ' ');
        expect(byte.bit._props['fill']).toBe(byte._props.fill);
        expect(byte.bit._props['fill-opacity']).toBe(byte._props.fillOpacity);
        expect(byte.bit._props['radius']).toBe(byte._props.radius);
        expect(byte.bit._props['radiusX']).toBe(byte._props.radiusX);
        expect(byte.bit._props['radiusY']).toBe(byte._props.radiusY);
        return expect(byte.bit._props['points']).toBe(byte._props.points);
      });
      it('should set x/y to center', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        byte._draw();
        expect(byte.bit._props.x).toBe(byte._props.center);
        return expect(byte.bit._props.y).toBe(byte._props.center);
      });
      it('should set x/y to props.x/props.y if context was passed', function() {
        var byte;
        byte = new Byte({
          radius: 25,
          ctx: svg
        });
        byte._draw();
        expect(byte.bit._props.x).toBe(parseFloat(byte._props.x));
        return expect(byte.bit._props.y).toBe(parseFloat(byte._props.y));
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
      return it('should receive the current progress', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        spyOn(byte, '_draw');
        byte._setProgress(.5);
        return expect(byte._draw).toHaveBeenCalledWith(.5);
      });
    });
    describe('_drawEl method ->', function() {
      it('should set el positions and transforms', function() {
        var byte, isTr, isTr2, s, tr;
        byte = new Byte({
          radius: 25,
          top: 10
        });
        expect(byte.el.style.top).toBe('10px');
        expect(byte.el.style.opacity).toBe('1');
        expect(parseInt(byte.el.style.left, 10)).toBe(0);
        s = byte.el.style;
        tr = s.transform || s["" + mojs.h.prefix.css + "transform"];
        isTr = tr === 'scale(1) translate(0, 0) rotate(0deg)';
        isTr2 = tr === 'scale(1) translate(0px, 0px) rotate(0deg)';
        return expect(isTr || isTr2).toBe(true);
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
        return expect(byte._lastSet.left.value).toBe('1px');
      });
      it('should not set old values', function() {
        var byte;
        byte = new Byte({
          radius: 25,
          y: 10
        });
        byte._draw();
        byte._draw();
        expect(byte._lastSet.x.value).toBe('0');
        return expect(parseInt(byte.el.style.left, 10)).toBe(0);
      });
      it('should return true if there is no el', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        byte.el = null;
        return expect(byte._drawEl()).toBe(true);
      });
      it('should set transform if angle changed', function() {
        var byte, isTr, isTr2, style, tr;
        byte = new Byte({
          angle: 25
        });
        byte._draw();
        byte._props.angle = 26;
        byte._draw();
        style = byte.el.style;
        tr = style['transform'] || style["" + mojs.h.prefix.css + "transform"];
        isTr = tr === 'scale(1) translate(0, 0) rotate(26deg)';
        isTr2 = tr === 'scale(1) translate(0px, 0px) rotate(26deg)';
        return expect(isTr || isTr2).toBe(true);
      });
      it('should not set transform if angle changed', function() {
        var byte;
        byte = new Byte({
          angle: 25
        });
        byte._draw();
        spyOn(byte, '_fillTransform');
        byte._draw();
        return expect(byte._fillTransform).not.toHaveBeenCalled();
      });
      it('should set transform if one of the x, y or scale changed', function() {
        var byte;
        byte = new Byte({
          radius: 25,
          top: 10,
          ctx: svg
        });
        byte._draw();
        spyOn(byte, '_fillTransform');
        byte._draw();
        return expect(byte._fillTransform).not.toHaveBeenCalled();
      });
      it('should set transform if x changed #1', function() {
        var byte, isTr, isTr2, style, tr;
        byte = new Byte({
          radius: 25,
          top: 10,
          x: {
            0: 10
          }
        });
        byte._props.x = '4px';
        spyOn(byte, '_fillTransform').and.callThrough();
        byte._draw();
        expect(byte._fillTransform).toHaveBeenCalled();
        style = byte.el.style;
        tr = style['transform'] || style["" + mojs.h.prefix.css + "transform"];
        isTr = tr === 'scale(1) translate(4px, 0) rotate(0deg)';
        isTr2 = tr === 'scale(1) translate(4px, 0px) rotate(0deg)';
        return expect(isTr || isTr2).toBe(true);
      });
      it('should set transform if x changed #2', function() {
        var byte, isTr, isTr2, style, tr;
        byte = new Byte({
          radius: 25,
          top: 10,
          y: {
            0: 10
          }
        });
        byte._props.y = '4px';
        spyOn(byte, '_fillTransform').and.callThrough();
        byte._draw();
        expect(byte._fillTransform).toHaveBeenCalled();
        style = byte.el.style;
        tr = style['transform'] || style["" + mojs.h.prefix.css + "transform"];
        isTr = tr === 'scale(1) translate(0, 4px) rotate(0deg)';
        isTr2 = tr === 'scale(1) translate(0px, 4px) rotate(0deg)';
        return expect(isTr || isTr2).toBe(true);
      });
      return it('should set transform if x changed #3', function() {
        var byte, isTr, isTr2, style, tr;
        byte = new Byte({
          radius: 25,
          top: 10,
          scale: {
            0: 10
          }
        });
        byte._props.scale = 3;
        spyOn(byte, '_fillTransform').and.callThrough();
        byte._draw();
        expect(byte._fillTransform).toHaveBeenCalled();
        style = byte.el.style;
        tr = style['transform'] || style["" + mojs.h.prefix.css + "transform"];
        isTr = tr === 'scale(3) translate(0, 0) rotate(0deg)';
        isTr2 = tr === 'scale(3) translate(0px, 0px) rotate(0deg)';
        return expect(isTr || isTr2).toBe(true);
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
        return expect(byte._lastSet.x).toBeDefined();
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
        byte._skipPropsDelta = {
          radius: 1
        };
        byte._extendDefaults();
        return expect(byte._deltas.radius).not.toBeDefined();
      });
      describe('numeric values ->', function() {
        it('should calculate delta', function() {
          var byte, radiusDelta;
          byte = new Byte({
            radius: {
              25: 75
            }
          });
          radiusDelta = byte._deltas.radius;
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
          radiusDelta = byte._deltas.radius;
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
          radiusDelta = byte._deltas.radius;
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
          radiusDelta = byte._deltas.radius;
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
          radiusDelta = byte._deltas.radius;
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
          colorDelta = byte._deltas.stroke;
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
          return expect(byte._deltas.strokeLinecap).not.toBeDefined();
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
          xDelta = byte._deltas.x;
          expect(xDelta.start.string).toBe('0');
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
          return expect(byte._deltas.duration).not.toBeDefined();
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
        expect(byte._origin.x).toBe(byte._props.center);
        return expect(byte._origin.y).toBe(byte._props.center);
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
        expect(byte._origin.x).toBe(parseFloat(byte._props.x));
        return expect(byte._origin.y).toBe(parseFloat(byte._props.y));
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
        return expect(byte._progress).toBe(.5);
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
        expect(byte._origin.x).toBeDefined();
        return expect(byte._origin.y).toBeDefined();
      });
      it('should have origin should be the center of the transit', function() {
        var byte;
        byte = new Byte({
          radius: {
            '25': 75
          }
        });
        byte._setProgress(.5);
        expect(byte._origin.x).toBe(byte._props.center);
        return expect(byte._origin.y).toBe(byte._props.center);
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
        expect(byte._origin.x).toBe(parseFloat(byte._props.x));
        return expect(byte._origin.y).toBe(parseFloat(byte._props.x));
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
        expect(typeof byte._origin.x).toBe('number');
        return expect(typeof byte._origin.y).toBe('number');
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
        colorDelta = byte._deltas.stroke;
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
        colorDelta = byte._deltas.stroke;
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
    describe('foreign bit option ->', function() {
      it('should receive a foreign bit to work with', function() {
        var bit, byte;
        svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, 'svg') : void 0;
        bit = typeof document.createElementNS === "function" ? document.createElementNS(ns, 'rect') : void 0;
        svg.appendChild(bit);
        byte = new Transit({
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
        return expect(tr._props.size).toBe(tr.bit._props.ratio);
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
        return expect(tr._props.size).toBe(tr.bit._props.ratio + 2 * gap);
      });
    });
    describe('callbacksContext option ->', function() {
      it('should pass the options to the tween', function() {
        var isRightContext, obj, tr;
        obj = {};
        isRightContext = null;
        tr = new Transit({
          callbacksContext: obj,
          onUpdate: function() {
            return isRightContext = this === obj;
          }
        });
        tr.setProgress(0);
        tr.setProgress(.1);
        return expect(isRightContext).toBe(true);
      });
      return it('should pass the options to the timeline', function() {
        var isRightContext, obj, tr;
        obj = {};
        isRightContext = null;
        tr = new Transit({
          callbacksContext: obj,
          timeline: {
            onUpdate: function() {
              return isRightContext = this === obj;
            }
          }
        });
        tr.setProgress(0);
        tr.setProgress(.1);
        return expect(isRightContext).toBe(true);
      });
    });
    describe('_fillTransform method ->', function() {
      return it('return tranform string of the el', function() {
        var tr;
        tr = new Transit({
          x: 100,
          y: 100,
          angle: 50,
          scale: 2
        });
        return expect(tr._fillTransform()).toBe('scale(2) translate(100px, 100px) rotate(50deg)');
      });
    });
    describe('_hidePrevChainModule method ->', function() {
      it('should hide prevChainModule', function() {
        var module, tr;
        module = {
          _hide: function() {}
        };
        tr = new Transit({
          prevChainModule: module
        });
        spyOn(tr._props.prevChainModule, '_hide');
        tr._hidePrevChainModule();
        return expect(tr._props.prevChainModule._hide).toHaveBeenCalled();
      });
      return it('should not throw', function() {
        var fun, tr;
        tr = new Transit;
        fun = function() {
          return tr._hidePrevChainModule();
        };
        return expect(fun).not.toThrow();
      });
    });
    describe('_showPrevChainModule method ->', function() {
      it('should hide prevChainModule', function() {
        var module, tr;
        module = {
          _show: function() {}
        };
        tr = new Transit({
          prevChainModule: module
        });
        spyOn(tr._props.prevChainModule, '_show');
        tr._showPrevChainModule();
        return expect(tr._props.prevChainModule._show).toHaveBeenCalled();
      });
      return it('should not throw', function() {
        var fun, tr;
        tr = new Transit;
        fun = function() {
          return tr._showPrevChainModule();
        };
        return expect(fun).not.toThrow();
      });
    });
    return describe('_hideModuleChain method ->', function() {
      return it('should hide all modules in chain', function() {
        var tr;
        tr = new Transit().then({
          fill: 'orange'
        }).then({
          fill: 'cyan'
        }).then({
          fill: 'yellow'
        });
        spyOn(tr._modules[0], '_hide');
        spyOn(tr._modules[1], '_hide');
        spyOn(tr._modules[2], '_hide');
        spyOn(tr._modules[3], '_hide');
        tr._hideModuleChain();
        expect(tr._modules[0]._hide).not.toHaveBeenCalled();
        expect(tr._modules[1]._hide).toHaveBeenCalled();
        expect(tr._modules[2]._hide).toHaveBeenCalled();
        return expect(tr._modules[3]._hide).toHaveBeenCalled();
      });
    });
  });

}).call(this);
