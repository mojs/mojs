(function() {
  var Bit, Byte, Rect, Shape, Thenable, Tunable, Tweenable, h, ns, svg;

  Byte = mojs.Shape;

  Shape = mojs.Shape;

  Bit = mojs.shapesMap.getShape('bit');

  Thenable = mojs.Thenable;

  Tunable = mojs.Tunable;

  Tweenable = mojs.Tweenable;

  Rect = mojs.shapesMap.getShape('rect');

  h = mojs.helpers;

  ns = 'http://www.w3.org/2000/svg';

  svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, 'svg') : void 0;

  console.warn = function() {};

  console.error = function() {};

  describe('Shape ->', function() {
    describe('_vars method', function() {
      it('should have own _vars function ->', function() {
        var byte;
        byte = new Byte;
        expect(byte._vars).toBeDefined();
        return expect(function() {
          return byte._vars();
        }).not.toThrow();
      });
      it('should call _vars super method', function() {
        var byte;
        byte = new Byte;
        return expect(byte._history.length).toBe(1);
      });
      it('should save passed _o.masterModule to _masterModule', function() {
        var byte, obj;
        obj = {};
        byte = new Byte({
          masterModule: obj
        });
        byte._masterModule = null;
        byte._vars();
        return expect(byte._masterModule).toBe(obj);
      });
      it('should set `_isChained` based on `prevChainModule` option', function() {
        var byte, byte0;
        byte0 = new Byte;
        byte = new Byte({
          prevChainModule: byte0,
          masterModule: byte0
        });
        byte._isChained = null;
        byte._vars();
        return expect(byte._isChained).toBe(true);
      });
      return it('should save passed _o.prevChainModule to _prevChainModule', function() {
        var byte, byte0;
        byte0 = new Byte;
        byte = new Byte({
          prevChainModule: byte0,
          masterModule: byte0
        });
        byte._prevChainModule = null;
        byte._vars();
        return expect(byte._prevChainModule).toBe(byte0);
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
        expect(byte._defaults.parent).toBe(document.body);
        expect(byte._defaults.className).toBe('');
        expect(byte._defaults.shape).toBe('circle');
        expect(byte._defaults.stroke).toBe('transparent');
        expect(byte._defaults.strokeOpacity).toBe(1);
        expect(byte._defaults.strokeLinecap).toBe('');
        expect(byte._defaults.strokeWidth).toBe(2);
        expect(byte._defaults.strokeDasharray).toBe(0);
        expect(byte._defaults.strokeDashoffset).toBe(0);
        expect(byte._defaults.fill).toBe('deeppink');
        expect(byte._defaults.fillOpacity).toBe(1);
        expect(byte._defaults.isSoftHide).toBe(true);
        expect(byte._defaults.isForce3d).toBe(false);
        expect(byte._defaults.left).toBe('50%');
        expect(byte._defaults.top).toBe('50%');
        expect(byte._defaults.x).toBe(0);
        expect(byte._defaults.y).toBe(0);
        expect(byte._defaults.angle).toBe(0);
        expect(byte._defaults.scale).toEqual(1);
        expect(byte._defaults.scaleX).toBe(null);
        expect(byte._defaults.scaleY).toBe(null);
        expect(byte._defaults.origin).toBe('50% 50%');
        expect(byte._defaults.rx).toBe(0);
        expect(byte._defaults.ry).toBe(0);
        expect(byte._defaults.opacity).toBe(1);
        expect(byte._defaults.points).toBe(3);
        expect(byte._defaults.duration).toBe(400);
        expect(byte._defaults.radius).toBe(50);
        expect(byte._defaults.radiusX).toBe(null);
        expect(byte._defaults.radiusY).toBe(null);
        expect(byte._defaults.isShowEnd).toBe(true);
        expect(byte._defaults.isShowStart).toBe(false);
        expect(byte._defaults.isRefreshState).toBe(true);
        expect(byte._defaults.width).toBe(null);
        expect(byte._defaults.height).toBe(null);
        expect(byte._defaults.isWithShape).toBe(true);
        return expect(byte._defaults.callbacksContext).toBe(byte);
      });
    });
    describe('_applyCallbackOverrides ->', function() {
      it('should create callbackOverrides object on passed object', function() {
        var obj, tr;
        tr = new Shape;
        obj = {};
        tr._applyCallbackOverrides(obj);
        expect(typeof obj.callbackOverrides).toBe('object');
        return expect(obj.callbackOverrides).toBe(obj.callbackOverrides);
      });
      describe('onUpdate callback override ->', function() {
        it('should override this._o.onUpdate', function() {
          var obj, tr;
          tr = new Shape;
          obj = {};
          tr._applyCallbackOverrides(obj);
          return expect(typeof obj.callbackOverrides.onUpdate).toBe('function');
        });
        it('should call _setProgress ', function() {
          var easedProgress, obj, progress, tr;
          tr = new Shape;
          obj = {};
          tr._applyCallbackOverrides(obj);
          spyOn(tr, '_setProgress');
          easedProgress = .25;
          progress = .2;
          obj.callbackOverrides.onUpdate(easedProgress, progress);
          return expect(tr._setProgress).toHaveBeenCalledWith(easedProgress, progress);
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
          tr = new Shape(options);
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
          tr = new Shape(options);
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
          tr = new Shape;
          obj = {};
          tr._applyCallbackOverrides(obj);
          return expect(typeof obj.callbackOverrides.onStart).toBe('function');
        });
        it('should call _show if isForward and !_isChained', function() {
          var obj, tr;
          tr = new Shape;
          obj = {};
          tr._applyCallbackOverrides(obj);
          spyOn(tr, '_show');
          obj.callbackOverrides.onStart(true);
          return expect(tr._show).toHaveBeenCalled();
        });
        it('should not call _show if _isChained', function() {
          var obj, tr;
          tr = new Shape({
            masterModule: new Shape
          });
          obj = {};
          tr._applyCallbackOverrides(obj);
          spyOn(tr, '_show');
          obj.callbackOverrides.onStart(true);
          return expect(tr._show).not.toHaveBeenCalled();
        });
        it('should call _hide if not isForward and !_isChained', function() {
          var obj, tr;
          tr = new Shape;
          obj = {};
          tr._applyCallbackOverrides(obj);
          spyOn(tr, '_hide');
          obj.callbackOverrides.onStart(false);
          return expect(tr._hide).toHaveBeenCalled();
        });
        it('should not call _hide if not isForward and _isChained', function() {
          var obj, tr;
          tr = new Shape({
            masterModule: new Shape
          });
          obj = {};
          tr._applyCallbackOverrides(obj);
          spyOn(tr, '_hide');
          obj.callbackOverrides.onStart(false);
          return expect(tr._hide).not.toHaveBeenCalled();
        });
        return it('should not call _hide if not isForward and isShowStart', function() {
          var obj, tr;
          tr = new Shape({
            isShowStart: true
          });
          obj = {};
          tr._applyCallbackOverrides(obj);
          spyOn(tr, '_hide');
          obj.callbackOverrides.onStart(false);
          return expect(tr._hide).not.toHaveBeenCalled();
        });
      });
      describe('onComplete callback override ->', function() {
        it('should override this._o.onComplete', function() {
          var obj, tr;
          tr = new Shape;
          obj = {};
          tr._applyCallbackOverrides(obj);
          return expect(typeof obj.callbackOverrides.onComplete).toBe('function');
        });
        it('should call _show if !isForward', function() {
          var obj, tr;
          tr = new Shape;
          obj = {};
          tr._applyCallbackOverrides(obj);
          spyOn(tr, '_show');
          obj.callbackOverrides.onComplete(false);
          return expect(tr._show).toHaveBeenCalled();
        });
        it('should call _show if !isForward and _isLastInChain()', function() {
          var obj, tr;
          tr = new Shape;
          obj = {};
          tr._applyCallbackOverrides(obj);
          spyOn(tr, '_show');
          obj.callbackOverrides.onComplete(false);
          return expect(tr._show).toHaveBeenCalled();
        });
        it('should call _show if !isForward and _isLastInChain() #2', function() {
          var el, obj, tr;
          tr = new Shape().then({
            radius: 0
          });
          el = tr._modules[1];
          obj = {};
          el._applyCallbackOverrides(obj);
          spyOn(el, '_show');
          obj.callbackOverrides.onComplete(false);
          return expect(el._show).toHaveBeenCalled();
        });
        it('should not call _show if !isForward and not _isLastInChain', function() {
          var obj, tr;
          tr = new Shape().then({
            radius: 0
          });
          obj = {};
          tr._applyCallbackOverrides(obj);
          spyOn(tr, '_show');
          obj.callbackOverrides.onComplete(false);
          return expect(tr._show).not.toHaveBeenCalled();
        });
        it('should call _hide if isForward and !isShowEnd', function() {
          var obj, tr;
          tr = new Shape({
            isShowEnd: false
          });
          obj = {};
          tr._applyCallbackOverrides(obj);
          spyOn(tr, '_hide');
          obj.callbackOverrides.onComplete(true);
          return expect(tr._hide).toHaveBeenCalled();
        });
        it('should not call _hide if isForward but isShowEnd', function() {
          var obj, tr;
          tr = new Shape;
          obj = {};
          tr._applyCallbackOverrides(obj);
          spyOn(tr, '_hide');
          obj.callbackOverrides.onComplete(true);
          return expect(tr._hide).not.toHaveBeenCalled();
        });
        it('should call _hide if isForward and _isLastInChain', function() {
          var obj, tr;
          tr = new Shape({
            isShowEnd: false
          });
          obj = {};
          tr._applyCallbackOverrides(obj);
          spyOn(tr, '_hide');
          obj.callbackOverrides.onComplete(true);
          return expect(tr._hide).toHaveBeenCalled();
        });
        it('should call not _hide if isForward and !_isLastInChain', function() {
          var obj, tr;
          tr = new Shape({
            isShowEnd: false
          }).then({
            radius: 0
          });
          obj = {};
          tr._applyCallbackOverrides(obj);
          spyOn(tr, '_hide');
          obj.callbackOverrides.onComplete(true);
          return expect(tr._hide).not.toHaveBeenCalled();
        });
        it('should not call _hide if isForward and _isLastInChain but isShowEnd', function() {
          var obj, tr;
          tr = new Shape;
          obj = {};
          tr._applyCallbackOverrides(obj);
          spyOn(tr, '_hide');
          obj.callbackOverrides.onComplete(true);
          return expect(tr._hide).not.toHaveBeenCalled();
        });
        return it('should not call _hide if isForward but !_isLastInChain and isShowEnd', function() {
          var obj, tr;
          tr = new Shape().then({
            radius: 0
          });
          obj = {};
          tr._applyCallbackOverrides(obj);
          spyOn(tr, '_hide');
          obj.callbackOverrides.onComplete(true);
          return expect(tr._hide).not.toHaveBeenCalled();
        });
      });
      return describe('onRefresh callback override ->', function() {
        it('should override this._o.onRefresh', function() {
          var obj, tr;
          tr = new Shape;
          obj = {};
          tr._applyCallbackOverrides(obj);
          return expect(typeof obj.callbackOverrides.onRefresh).toBe('function');
        });
        it('should call _refreshBefore if isBefore', function() {
          var obj, tr;
          tr = new Shape;
          obj = {};
          tr._applyCallbackOverrides(obj);
          spyOn(tr, '_refreshBefore');
          obj.callbackOverrides.onRefresh(true);
          return expect(tr._refreshBefore).toHaveBeenCalled();
        });
        it('should not call _refreshBefore if !isBefore', function() {
          var obj, tr;
          tr = new Shape;
          obj = {};
          tr._applyCallbackOverrides(obj);
          spyOn(tr, '_refreshBefore');
          obj.callbackOverrides.onRefresh(false);
          return expect(tr._refreshBefore).not.toHaveBeenCalled();
        });
        return it('should not call _refreshBefore if !isRefreshState', function() {
          var obj, tr;
          tr = new Shape({
            isRefreshState: false
          });
          obj = {};
          tr._applyCallbackOverrides(obj);
          spyOn(tr, '_refreshBefore');
          obj.callbackOverrides.onRefresh(true);
          return expect(tr._refreshBefore).not.toHaveBeenCalled();
        });
      });
    });
    describe('_transformTweenOptions method', function() {
      return it('should call _applyCallbackOverrides with _o', function() {
        var tr;
        tr = new Shape;
        spyOn(tr, '_applyCallbackOverrides');
        tr._transformTweenOptions();
        return expect(tr._applyCallbackOverrides).toHaveBeenCalledWith(tr._o);
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
        byte = new Shape({
          index: 5
        });
        return expect(byte._index).toBe(5);
      });
      return it('should fallback to 0', function() {
        var byte;
        byte = new Shape;
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
      return it('should not calculate size el size if size was passed', function() {
        var byte;
        byte = new Byte({
          radius: 10,
          strokeWidth: 5,
          width: 400,
          height: 200
        });
        expect(byte._props.shapeWidth).toBe(400);
        return expect(byte._props.shapeHeight).toBe(200);
      });
    });
    describe('opacity set ->', function() {
      it('should set opacity regarding units', function() {
        var byte;
        byte = new Byte({
          opacity: .5,
          isShowStart: true
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
        it('should set position regarding units', function() {
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
        it('should animate position regarding units', function(dfr) {
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
        it('should set position regarding units #2', function() {
          var byte, isIE, isNormal, s, tr;
          byte = new Byte({
            x: 100,
            y: 50,
            isShowStart: true
          });
          s = byte.el.style;
          tr = s.transform || s["" + mojs.h.prefix.css + "transform"];
          isNormal = tr === 'translate(100px, 50px) rotate(0deg) scale(1, 1)';
          isIE = tr === 'translate(100px, 50px) rotate(0deg) scale(1)';
          return expect(isNormal || isIE).toBe(true);
        });
        it('should animate shift position', function(dfr) {
          var byte;
          byte = new Byte({
            x: {
              100: '200px'
            },
            duration: 200,
            onComplete: function() {
              var isTr, isTr2, isTr3, s, tr;
              s = byte.el.style;
              tr = s.transform || s["" + mojs.h.prefix.css + "transform"];
              isTr = tr === 'translate(200px, 0) rotate(0deg) scale(1, 1)';
              isTr2 = tr === 'translate(200px, 0px) rotate(0deg) scale(1, 1)';
              isTr3 = tr === 'translate(200px, 0px) rotate(0deg) scale(1)';
              expect(isTr || isTr2 || isTr3).toBe(true);
              return dfr();
            }
          });
          return byte.play();
        });
        it('should animate position regarding units #3', function(dfr) {
          var byte;
          byte = new Byte({
            x: {
              '20%': '50%'
            },
            duration: 200,
            onComplete: function() {
              var isTr, isTr2, isTr3, s, tr;
              s = byte.el.style;
              tr = s.transform || s["" + mojs.h.prefix.css + "transform"];
              isTr = tr === 'translate(50%, 0) rotate(0deg) scale(1, 1)';
              isTr2 = tr === 'translate(50%, 0px) rotate(0deg) scale(1, 1)';
              isTr3 = tr === 'translate(50%, 0px) rotate(0deg) scale(1)';
              expect(isTr || isTr2 || isTr3).toBe(true);
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
              var isTr1, isTr2, s, tr;
              s = byte.el.style;
              tr = s.transform || s["" + mojs.h.prefix.css + "transform"];
              isTr1 = tr === 'translate(50px, 50%) rotate(0deg) scale(1, 1)';
              isTr2 = tr === 'translate(50px, 50%) rotate(0deg) scale(1)';
              expect(isTr1 || isTr2).toBe(true);
              return dfr();
            }
          });
          return byte.play();
        });
      });
    });
    describe('_render method ->', function() {
      it('should call _createShape method', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        spyOn(byte, '_createShape');
        byte._isRendered = false;
        byte._render();
        return expect(byte._createShape).toHaveBeenCalled();
      });
      it('should set _isRendered to true', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        expect(byte._isRendered).toBe(true);
        byte._isRendered = false;
        byte._render();
        return expect(byte._isRendered).toBe(true);
      });
      it('should not call _createShape method if already rendered', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        spyOn(byte, '_createShape');
        byte._isRendered = true;
        byte._render();
        return expect(byte._createShape).not.toHaveBeenCalled();
      });
      it('should set `el` and `shape` if `_isChained`', function() {
        var byte, byte0;
        byte0 = new Byte({
          radius: 25
        });
        byte = new Byte({
          prevChainModule: byte0,
          masterModule: byte0
        });
        expect(byte.el).toBe(byte0.el);
        return expect(byte.shapeModule).toBe(byte0.shapeModule);
      });
      it('should not call _createShape method if _isChained', function() {
        var byte, byte0;
        byte0 = new Byte;
        byte = new Byte({
          radius: 25,
          prevChainModule: byte0,
          masterModule: byte0
        });
        spyOn(byte, '_createShape');
        byte._o.el = byte0.el;
        byte._o.shapeModule = byte0.shapeModule;
        byte._render();
        return expect(byte._createShape).not.toHaveBeenCalled();
      });
      it('should call `_setProgress(0)` if not `_isChained`', function() {
        var byte;
        byte = new Byte;
        spyOn(byte, '_setProgress');
        byte._isRendered = false;
        byte._render();
        return expect(byte._setProgress).toHaveBeenCalledWith(0, 0);
      });
      it('should not call `_setProgress(0)` if not `_isFirstInChain()`', function() {
        var byte, byte0;
        byte0 = new Byte;
        byte = new Byte({
          prevChainModule: byte0,
          masterModule: byte0
        });
        spyOn(byte, '_setProgress');
        byte._isRendered = false;
        byte._render();
        return expect(byte._setProgress).not.toHaveBeenCalledWith(0);
      });
      it('should call _setElStyles method', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        spyOn(byte, '_setElStyles');
        byte._isRendered = false;
        byte._render();
        return expect(byte._setElStyles).toHaveBeenCalled();
      });
      it('should not call _setElStyles method if _isChained', function() {
        var byte;
        byte = new Byte({
          prevChainModule: new Byte,
          masterModule: new Byte
        });
        spyOn(byte, '_setElStyles');
        byte._isRendered = true;
        byte._render();
        return expect(byte._setElStyles).not.toHaveBeenCalled();
      });
      it('should call _show method if `isShowStart`', function() {
        var byte;
        byte = new Byte({
          isShowStart: true
        });
        spyOn(byte, '_show');
        byte._isRendered = false;
        byte._render();
        return expect(byte._show).toHaveBeenCalled();
      });
      it('should call not _show method if not `isShowStart`', function() {
        var byte;
        byte = new Byte({
          isShowStart: false
        });
        spyOn(byte, '_show');
        byte._isRendered = false;
        byte._render();
        return expect(byte._show).not.toHaveBeenCalled();
      });
      it('should not _show method if `_isChained`', function() {
        var byte;
        byte = new Byte({
          isShowStart: true,
          prevChainModule: new Byte,
          masterModule: new Byte
        });
        spyOn(byte, '_show');
        byte._isRendered = false;
        byte._render();
        return expect(byte._show).not.toHaveBeenCalled();
      });
      it('should call _hide method if not `isShowStart`', function() {
        var byte;
        byte = new Byte({
          isShowStart: false
        });
        spyOn(byte, '_hide');
        byte._isRendered = false;
        byte._render();
        return expect(byte._hide).toHaveBeenCalled();
      });
      it('should call not _hide method if `isShowStart`', function() {
        var byte;
        byte = new Byte({
          isShowStart: true
        });
        spyOn(byte, '_hide');
        byte._isRendered = false;
        byte._render();
        return expect(byte._hide).not.toHaveBeenCalled();
      });
      return it('should not _hide method if `_isChained`', function() {
        var byte;
        byte = new Byte({
          isShowStart: false,
          prevChainModule: new Byte,
          masterModule: new Byte
        });
        spyOn(byte, '_hide');
        byte._isRendered = false;
        byte._render();
        return expect(byte._hide).not.toHaveBeenCalled();
      });
    });
    describe('_setElStyles method ->', function() {
      it('should set dimentions and position of the `el`', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        byte.el.style.position = 'static';
        byte.el.style.width = '0px';
        byte.el.style.height = '0px';
        byte.el.style['margin-left'] = '0px';
        byte.el.style['margin-top'] = '0px';
        byte._setElStyles();
        expect(byte.el.style.position).toBe('absolute');
        expect(byte.el.style.width).toBe("" + byte._props.shapeWidth + "px");
        expect(byte.el.style.height).toBe("" + byte._props.shapeHeight + "px");
        expect(byte.el.style['margin-left']).toBe("-" + (byte._props.shapeWidth / 2) + "px");
        return expect(byte.el.style['margin-top']).toBe("-" + (byte._props.shapeHeight / 2) + "px");
      });
      it('should set `backface-visibility` if `isForce3d`', function() {
        var bv, byte, prefixedBv, style;
        byte = new Byte({
          radius: 25,
          isForce3d: true
        });
        style = byte.el.style;
        bv = style['backface-visibility'];
        prefixedBv = style["" + mojs.h.prefix.css + "backface-visibility"];
        return expect(bv || prefixedBv).toBe('hidden');
      });
      return it('should not set `backface-visibility` if `isForce3d`', function() {
        var bv, byte, prefixedBv, style;
        byte = new Byte({
          radius: 25
        });
        style = byte.el.style;
        bv = style['backface-visibility'];
        prefixedBv = style["" + mojs.h.prefix.css + "backface-visibility"];
        return expect(bv || prefixedBv).not.toBe('hidden');
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
        expect(byte.shapeModule._props.rx).toBe(byte._props.rx);
        expect(byte.shapeModule._props.ry).toBe(byte._props.ry);
        expect(byte.shapeModule._props.stroke).toBe(byte._props.stroke);
        expect(byte.shapeModule._props['stroke-width']).toBe(byte._props.strokeWidth);
        expect(byte.shapeModule._props['stroke-opacity']).toBe(byte._props.strokeOpacity);
        expect(byte.shapeModule._props['stroke-linecap']).toBe(byte._props.strokeLinecap);
        expect(byte.shapeModule._props['stroke-dasharray']).toBe(byte._props.strokeDasharray[0].value + ' ');
        expect(byte.shapeModule._props['stroke-dashoffset']).toBe(byte._props.strokeDashoffset[0].value + ' ');
        expect(byte.shapeModule._props['fill']).toBe(byte._props.fill);
        expect(byte.shapeModule._props['fill-opacity']).toBe(byte._props.fillOpacity);
        expect(byte.shapeModule._props['radius']).toBe(byte._props.radius);
        expect(byte.shapeModule._props['radiusX']).toBe(byte._props.radiusX);
        expect(byte.shapeModule._props['radiusY']).toBe(byte._props.radiusY);
        return expect(byte.shapeModule._props['points']).toBe(byte._props.points);
      });
      it('should call bit._draw method', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        spyOn(byte.shapeModule, '_draw');
        byte._draw();
        return expect(byte.shapeModule._draw).toHaveBeenCalled();
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
        var byte, isTr, isTr2, isTr3, s, tr;
        byte = new Byte({
          radius: 25,
          top: 10,
          isShowStart: true
        });
        expect(byte.el.style.top).toBe('10px');
        expect(byte.el.style.opacity).toBe('1');
        expect(byte.el.style.left).toBe('50%');
        s = byte.el.style;
        tr = s.transform || s["" + mojs.h.prefix.css + "transform"];
        isTr = tr === 'translate(0, 0) rotate(0deg) scale(1, 1)';
        isTr2 = tr === 'translate(0px, 0px) rotate(0deg) scale(1, 1)';
        isTr3 = tr === 'translate(0px, 0px) rotate(0deg) scale(1)';
        return expect(isTr || isTr2 || isTr3).toBe(true);
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
        return expect(byte._lastSet.x.value).toBe('0');
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
        var byte, isTr, isTr2, isTr3, style, tr;
        byte = new Byte({
          angle: 25
        });
        byte._draw();
        byte._props.angle = 26;
        byte._draw();
        style = byte.el.style;
        tr = style['transform'] || style["" + mojs.h.prefix.css + "transform"];
        isTr = tr === 'translate(0, 0) rotate(26deg) scale(1, 1)';
        isTr2 = tr === 'translate(0px, 0px) rotate(26deg) scale(1, 1)';
        isTr3 = tr === 'translate(0px, 0px) rotate(26deg) scale(1)';
        return expect(isTr || isTr2 || isTr3).toBe(true);
      });
      it('should not set transform if angle changed #2', function() {
        var byte;
        byte = new Byte({
          angle: 25
        });
        byte._draw();
        spyOn(byte, '_fillTransform');
        byte._draw();
        return expect(byte._fillTransform).not.toHaveBeenCalled();
      });
      it('should set transform if scaleX changed', function() {
        var byte;
        byte = new Byte({
          scaleX: 25
        });
        byte._draw();
        spyOn(byte, '_fillTransform');
        byte._props.scaleX = 24;
        byte._draw();
        return expect(byte._fillTransform).toHaveBeenCalled();
      });
      it('should not set transform if scaleX not changed', function() {
        var byte;
        byte = new Byte({
          scaleX: 25
        });
        byte._draw();
        spyOn(byte, '_fillTransform');
        byte._draw();
        return expect(byte._fillTransform).not.toHaveBeenCalled();
      });
      it('should set transform if scaleY changed', function() {
        var byte;
        byte = new Byte({
          scaleY: 25
        });
        byte._draw();
        spyOn(byte, '_fillTransform');
        byte._props.scaleY = 24;
        byte._draw();
        return expect(byte._fillTransform).toHaveBeenCalled();
      });
      it('should not set transform if scaleY not changed', function() {
        var byte;
        byte = new Byte({
          scaleY: 25
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
        var byte, isTr, isTr2, isTr3, style, tr;
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
        isTr = tr === 'translate(4px, 0) rotate(0deg) scale(1, 1)';
        isTr2 = tr === 'translate(4px, 0px) rotate(0deg) scale(1, 1)';
        isTr3 = tr === 'translate(4px, 0px) rotate(0deg) scale(1)';
        return expect(isTr || isTr2 || isTr3).toBe(true);
      });
      it('should set transform if x changed #2', function() {
        var byte, isTr, isTr2, isTr3, style, tr;
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
        isTr = tr === 'translate(0, 4px) rotate(0deg) scale(1, 1)';
        isTr2 = tr === 'translate(0px, 4px) rotate(0deg) scale(1, 1)';
        isTr3 = tr === 'translate(0px, 4px) rotate(0deg) scale(1)';
        return expect(isTr || isTr2 || isTr3).toBe(true);
      });
      it('should set transform if x changed #3', function() {
        var byte, isTr, isTr2, isTr3, style, tr;
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
        isTr = tr === 'translate(0, 0) rotate(0deg) scale(3, 3)';
        isTr2 = tr === 'translate(0px, 0px) rotate(0deg) scale(3, 3)';
        isTr3 = tr === 'translate(0px, 0px) rotate(0deg) scale(3)';
        return expect(isTr || isTr2 || isTr3).toBe(true);
      });
      it('should set `transform-origin` if `origin`', function() {
        var byte, isOr1, isOr2, isOr3, prop, style, tr;
        byte = new Byte({
          origin: '50% 30%'
        });
        byte._drawEl();
        prop = 'transform-origin';
        style = byte.el.style;
        tr = style[prop] || style["" + mojs.h.prefix.css + prop];
        isOr1 = tr === '50% 30% ';
        isOr2 = tr === '50% 30%';
        isOr3 = tr === '50% 30% 0px';
        return expect(isOr1 || isOr2 || isOr3).toBe(true);
      });
      it('should set `transform-origin` if `origin` changed', function() {
        var byte, isOr1, isOr2, isOr3, prop, style, tr;
        byte = new Byte({
          origin: '50% 30%'
        });
        spyOn(byte, '_fillOrigin').and.callThrough();
        byte._props.origin = byte._parseStrokeDashOption('origin', '50% 40%');
        byte._drawEl();
        prop = 'transform-origin';
        style = byte.el.style;
        tr = style[prop] || style["" + mojs.h.prefix.css + prop];
        isOr1 = tr === '50% 40% ';
        isOr2 = tr === '50% 40%';
        isOr3 = tr === '50% 40% 0px';
        expect(isOr1 || isOr2 || isOr3).toBe(true);
        return expect(byte._fillOrigin).toHaveBeenCalled();
      });
      it('should not set `transform-origin` if `origin`', function() {
        var byte;
        byte = new Byte({
          origin: '50% 30%'
        });
        byte._draw();
        spyOn(byte, '_fillOrigin').and.callThrough();
        byte._draw();
        return expect(byte._fillOrigin).not.toHaveBeenCalled();
      });
      return it('should set `transform-origin` if `origin` in `_deltas`', function() {
        var byte;
        byte = new Byte({
          origin: {
            '50% 30%': '50% 0'
          }
        });
        spyOn(byte, '_fillOrigin').and.callThrough();
        byte._drawEl();
        byte._drawEl();
        return expect(byte._fillOrigin.calls.count()).toBe(2);
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
    describe('_setProgress method ->', function() {
      it('should set Shapeion progress', function() {
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
      it('should call _calcCurrentProps', function() {
        var byte;
        byte = new Byte({
          radius: {
            '25': 75
          }
        });
        spyOn(byte, '_calcCurrentProps');
        byte._setProgress(.5, .35);
        return expect(byte._calcCurrentProps).toHaveBeenCalledWith(.5, .35);
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
      return it('should return max from delatas if key is defined', function() {
        var byte, size;
        byte = new Byte({
          radiusX: {
            20: 30
          }
        });
        size = byte._getRadiusSize('radiusX');
        return expect(size).toBe(30);
      });
    });
    describe('_increaseSizeWithEasing method ->', function() {
      it('should increase size based on easing - elastic.out', function() {
        var tr;
        tr = new Shape({
          easing: 'elastic.out'
        });
        tr._props.size = 1;
        tr._increaseSizeWithEasing();
        return expect(tr._props.size).toBe(1.25);
      });
      it('should increase size based on easing - elastic.inout', function() {
        var tr;
        tr = new Shape({
          easing: 'elastic.inout'
        });
        tr._props.size = 1;
        tr._increaseSizeWithEasing();
        return expect(tr._props.size).toBe(1.25);
      });
      it('should increase size based on easing - back.out', function() {
        var tr;
        tr = new Shape({
          easing: 'back.out'
        });
        tr._props.size = 1;
        tr._increaseSizeWithEasing();
        return expect(tr._props.size).toBe(1.1);
      });
      return it('should increase size based on easing - back.inout', function() {
        var tr;
        tr = new Shape({
          easing: 'back.inout'
        });
        tr._props.size = 1;
        tr._increaseSizeWithEasing();
        return expect(tr._props.size).toBe(1.1);
      });
    });
    describe('callbacksContext option ->', function() {
      it('should pass the options to the tween', function() {
        var isRightContext, obj, tr;
        obj = {};
        isRightContext = null;
        tr = new Shape({
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
        tr = new Shape({
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
        tr = new Shape({
          x: 100,
          y: 100,
          angle: 50,
          scaleX: 2,
          scaleY: 3
        });
        return expect(tr._fillTransform()).toBe('translate(100px, 100px) rotate(50deg) scale(2, 3)');
      });
    });
    describe('_fillOrigin method ->', function() {
      it('return tranform-origin string of the el', function() {
        var tr;
        tr = new Shape({
          x: 100,
          y: 100,
          origin: '50% 30%'
        });
        return expect(tr._fillOrigin()).toBe('50% 30% ');
      });
      return it('return tranform-origin string of the el with delta', function() {
        var tr;
        tr = new Shape({
          x: 100,
          y: 100,
          easing: 'liner.none',
          origin: {
            '0% 0%': '50% 200%'
          }
        });
        tr.setProgress(0);
        tr.setProgress(.5);
        return expect(tr._fillOrigin()).toBe('25% 100% ');
      });
    });
    describe('el creation ->', function() {
      describe('el ->', function() {
        it('should create el', function() {
          var byte, style;
          byte = new Byte({
            radius: 25
          });
          expect(byte.el.tagName.toLowerCase()).toBe('div');
          style = byte.el.style;
          expect(style['position']).toBe('absolute');
          expect(style['width']).toBe('52px');
          expect(style['height']).toBe('52px');
          return expect(byte.el.getAttribute('data-name')).toBe('mojs-shape');
        });
        return it('should add `class` to `el`', function() {
          var byte, className;
          className = 'some-class';
          byte = new Byte({
            radius: 25,
            className: className
          });
          return expect(byte.el.getAttribute('class')).toBe(className);
        });
      });
      return it('should create bit based on shape option or fallback to circle', function() {
        var byte, byte2;
        byte = new Byte({
          radius: 25,
          shape: 'rect'
        });
        byte2 = new Byte({
          radius: 25
        });
        expect(byte.shapeModule._props.tag).toBe('rect');
        return expect(byte2.shapeModule._props.tag).toBe('ellipse');
      });
    });
    describe('_createShape method', function() {
      it('should create shape module based on `_props` shape', function() {
        var byte;
        byte = new Byte({
          shape: 'rect'
        });
        byte.shapeModule = null;
        byte._createShape();
        return expect(byte.shapeModule instanceof mojs.shapesMap.rect).toBe(true);
      });
      it('should not create if !isWithShape', function() {
        var byte;
        byte = new Byte({
          shape: 'rect',
          isWithShape: false
        });
        spyOn(byte, '_getShapeSize');
        byte.shapeModule = null;
        byte._createShape();
        expect(byte.shapeModule).toBeFalsy();
        return expect(byte._getShapeSize).toHaveBeenCalled();
      });
      it('should send `width` and `height` to the `shape` module', function() {
        var byte;
        byte = new Byte({
          shape: 'rect',
          radius: 50,
          radiusY: 75,
          strokeWidth: {
            0: 10
          }
        });
        byte.shapeModule = null;
        byte._createShape();
        expect(byte.shapeModule._props.width).toBe(2 * 50 + 10);
        expect(byte.shapeModule._props.height).toBe(2 * 75 + 10);
        return expect(byte.shapeModule._props.parent).toBe(byte.el);
      });
      return it('should save `width` and `height` to the `_props` module', function() {
        var byte;
        byte = new Byte({
          shape: 'rect',
          radius: 50,
          radiusY: 75,
          strokeWidth: {
            0: 10
          }
        });
        byte.shapeModule = null;
        byte._createShape();
        expect(byte._props.shapeWidth).toBe(2 * 50 + 10);
        return expect(byte._props.shapeHeight).toBe(2 * 75 + 10);
      });
    });
    describe('_getMaxRadius method ->', function() {
      return it('should return maximum radius ', function() {
        var byte;
        byte = new Byte({
          shape: 'rect',
          radius: {
            50: 0
          },
          radiusY: 75
        });
        spyOn(byte, '_getRadiusSize').and.callThrough();
        expect(byte._getMaxRadius('radiusX')).toBe(50);
        expect(byte._getMaxRadius('radiusY')).toBe(75);
        return expect(byte._getRadiusSize).toHaveBeenCalledWith('radiusX', 50);
      });
    });
    describe('_getMaxStroke method ->', function() {
      it('should get maximum value of the strokeWidth if delta', function() {
        var byte;
        byte = new Byte({
          shape: 'rect',
          radius: {
            50: 0
          },
          radiusY: 75,
          strokeWidth: {
            20: 0
          }
        });
        return expect(byte._getMaxStroke()).toBe(20);
      });
      it('should get maximum value of the strokeWidth if delta', function() {
        var byte;
        byte = new Byte({
          shape: 'rect',
          radius: {
            50: 0
          },
          radiusY: 75,
          strokeWidth: {
            0: 20
          }
        });
        return expect(byte._getMaxStroke()).toBe(20);
      });
      return it('should get maximum value of the strokeWidth if static value', function() {
        var byte;
        byte = new Byte({
          shape: 'rect',
          radius: {
            50: 0
          },
          radiusY: 75,
          strokeWidth: 10
        });
        return expect(byte._getMaxStroke()).toBe(10);
      });
    });
    describe('_getShapeSize method', function() {
      it('should call _getMaxStroke method', function() {
        var byte;
        byte = new Byte;
        spyOn(byte, '_getMaxStroke');
        byte._getShapeSize();
        return expect(byte._getMaxStroke).toHaveBeenCalled();
      });
      it('should call _getMaxRadius method', function() {
        var byte;
        byte = new Byte;
        spyOn(byte, '_getMaxRadius');
        byte._getShapeSize();
        return expect(byte._getMaxRadius).toHaveBeenCalledWith('radiusX');
      });
      it('should call _getMaxRadius method', function() {
        var byte;
        byte = new Byte;
        spyOn(byte, '_getMaxRadius');
        byte._getShapeSize();
        return expect(byte._getMaxRadius).toHaveBeenCalledWith('radiusY');
      });
      return it('should save size to the _props', function() {
        var byte, p, stroke;
        byte = new Byte;
        byte._props.shapeWidth = 0;
        byte._props.shapeHeight = 0;
        byte._getShapeSize();
        p = byte._props;
        stroke = byte._getMaxStroke();
        expect(p.shapeWidth).toBe(2 * byte._getMaxRadius('radiusX') + stroke);
        return expect(p.shapeHeight).toBe(2 * byte._getMaxRadius('radiusY') + stroke);
      });
    });
    describe('_getMaxSizeInChain method ->', function() {
      it('should call _getShapeSize on every module', function() {
        var ms, shape;
        shape = new Shape().then({
          radius: 0
        }).then({
          radius: 100
        });
        ms = shape._modules;
        spyOn(ms[0], '_getShapeSize');
        spyOn(ms[1], '_getShapeSize');
        spyOn(ms[2], '_getShapeSize');
        shape._getMaxSizeInChain();
        expect(ms[0]._getShapeSize).toHaveBeenCalled();
        expect(ms[1]._getShapeSize).toHaveBeenCalled();
        return expect(ms[2]._getShapeSize).toHaveBeenCalled();
      });
      it('should set the largest size to shapeModule', function() {
        var largest, shape, shapeModule;
        shape = new Shape().then({
          radius: 0
        }).then({
          radius: 100
        });
        largest = shape._modules[2];
        shapeModule = shape.shapeModule;
        spyOn(shapeModule, '_setSize');
        shape._getMaxSizeInChain();
        return expect(shapeModule._setSize).toHaveBeenCalledWith(largest._props.shapeWidth, largest._props.shapeHeight);
      });
      return it('should call _setElSizeStyles method', function() {
        var largest, shape;
        shape = new Shape().then({
          radius: 0
        }).then({
          radius: 100
        });
        largest = shape._modules[2];
        spyOn(shape, '_setElSizeStyles');
        shape._getMaxSizeInChain();
        return expect(shape._setElSizeStyles).toHaveBeenCalledWith(largest._props.shapeWidth, largest._props.shapeHeight);
      });
    });
    describe('_setElSizeStyles method ->', function() {
      return it('should set `width`, `height` and `margins` to the `el` styles', function() {
        var shape, style;
        shape = new Shape();
        style = shape.el.style;
        style['width'] = '0px';
        style['height'] = '0px';
        style['margin-left'] = '0px';
        style['margin-right'] = '0px';
        shape._setElSizeStyles(100, 200);
        expect(style['width']).toBe('100px');
        expect(style['height']).toBe('200px');
        expect(style['margin-left']).toBe('-50px');
        return expect(style['margin-top']).toBe('-100px');
      });
    });
    describe('then method ->', function() {
      it('should call super', function() {
        var obj, shape;
        obj = {};
        shape = new Shape();
        spyOn(Thenable.prototype, 'then');
        shape.then(obj);
        return expect(Thenable.prototype.then).toHaveBeenCalledWith(obj);
      });
      it('should return this', function() {
        var result, shape;
        shape = new Shape();
        result = shape.then({});
        return expect(result).toBe(shape);
      });
      return it('should call _getMaxSizeInChain method', function() {
        var shape;
        shape = new Shape();
        spyOn(shape, '_getMaxSizeInChain');
        shape.then({});
        return expect(shape._getMaxSizeInChain).toHaveBeenCalled();
      });
    });
    describe('tune method ->', function() {
      it('should call super', function() {
        var obj, shape;
        obj = {};
        shape = new Shape();
        spyOn(Tunable.prototype, 'tune');
        shape.tune(obj);
        return expect(Tunable.prototype.tune).toHaveBeenCalledWith(obj);
      });
      it('should return this', function() {
        var result, shape;
        shape = new Shape();
        result = shape.tune({});
        return expect(result).toBe(shape);
      });
      return it('should call _getMaxSizeInChain method', function() {
        var shape;
        shape = new Shape();
        spyOn(shape, '_getMaxSizeInChain');
        shape.tune({});
        return expect(shape._getMaxSizeInChain).toHaveBeenCalled();
      });
    });
    describe('_refreshBefore method ->', function() {
      it('should call `_show` method is `isShowStart`', function() {
        var shape;
        shape = new Shape({
          isShowStart: true
        });
        spyOn(shape, '_show');
        shape._refreshBefore();
        return expect(shape._show).toHaveBeenCalled();
      });
      it('should call `_hide` method is not `isShowStart`', function() {
        var shape;
        shape = new Shape;
        spyOn(shape, '_hide');
        shape._refreshBefore();
        return expect(shape._hide).toHaveBeenCalled();
      });
      it('should call `_setProgress` with `0, 0`', function() {
        var shape;
        shape = new Shape;
        spyOn(shape, '_setProgress');
        shape._refreshBefore();
        return expect(shape._setProgress).toHaveBeenCalledWith(0, 0);
      });
      return it('should call `_setProgress` with tweens eased progress', function() {
        var shape;
        shape = new Shape({
          easing: function(k) {
            return 1;
          }
        });
        spyOn(shape, '_setProgress');
        shape._refreshBefore();
        return expect(shape._setProgress).toHaveBeenCalledWith(1, 0);
      });
    });
    return describe('_showByTransform method ->', function() {
      it('should call _drawEl method', function() {
        var shape;
        shape = new Shape({
          easing: function(k) {
            return 1;
          }
        });
        spyOn(shape, '_drawEl');
        shape._showByTransform();
        return expect(shape._drawEl).toHaveBeenCalled();
      });
      return it('should update scale', function() {
        var isIE, isIE9, isNormal, isNormal2, s, shape, tr;
        shape = new Shape({
          easing: function(k) {
            return 1;
          }
        });
        shape.el.style.transform = 'scale(0)';
        shape.el.style["" + mojs.h.prefix.css + "transform"] = 'scale(0)';
        shape._showByTransform();
        s = shape.el.style;
        tr = s.transform || s["" + mojs.h.prefix.css + "transform"];
        isNormal = tr === 'translate(0, 0) rotate(0deg) scale(1, 1)';
        isNormal2 = tr === 'translate(0px, 0px) rotate(0deg) scale(1, 1)';
        isIE9 = tr === 'translate(0, 0) rotate(0deg) scale(1)';
        isIE = tr === 'translate(0px, 0px) rotate(0deg) scale(1)';
        return expect(isNormal || isNormal2 || isIE9 || isIE).toBe(true);
      });
    });
  });

}).call(this);
