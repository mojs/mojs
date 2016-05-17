(function() {
  var Bit, Byte, Rect, Shape, Thenable, Tweenable, h, ns, svg;

  Byte = mojs.Shape;

  Shape = mojs.Shape;

  Bit = mojs.shapesMap.getShape('bit');

  Thenable = mojs.Thenable;

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
      return it('should save passed _o.prevChainModule to _prevChainModule', function() {
        var byte, obj;
        obj = {};
        byte = new Byte({
          prevChainModule: obj
        });
        byte._prevChainModule = null;
        byte._vars();
        return expect(byte._prevChainModule).toBe(obj);
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
        expect(byte._defaults.angle).toBe(0);
        expect(byte._defaults.scale).toBe(1);
        expect(byte._defaults.scaleX).toBe(null);
        expect(byte._defaults.scaleY).toBe(null);
        expect(byte._defaults.origin).toBe('50% 50%');
        expect(byte._defaults.rx).toBe(0);
        expect(byte._defaults.ry).toBe(0);
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
          var obj, progress, tr;
          tr = new Shape;
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
        it('should call _show if isForward', function() {
          var obj, tr;
          tr = new Shape;
          obj = {};
          tr._applyCallbackOverrides(obj);
          spyOn(tr, '_show');
          obj.callbackOverrides.onStart(true);
          return expect(tr._show).toHaveBeenCalled();
        });
        it('should call _hidePrevChainModule if isForward', function() {
          var obj, tr;
          tr = new Shape;
          obj = {};
          tr._applyCallbackOverrides(obj);
          spyOn(tr, '_hidePrevChainModule');
          obj.callbackOverrides.onStart(true);
          return expect(tr._hidePrevChainModule).toHaveBeenCalled();
        });
        it('should call _hideModuleChain if isForward', function() {
          var obj, tr;
          tr = new Shape;
          obj = {};
          tr._applyCallbackOverrides(obj);
          spyOn(tr, '_hideModuleChain');
          obj.callbackOverrides.onStart(true);
          return expect(tr._hideModuleChain).toHaveBeenCalled();
        });
        it('should call _hide if not isForward', function() {
          var obj, tr;
          tr = new Shape;
          obj = {};
          tr._applyCallbackOverrides(obj);
          spyOn(tr, '_hide');
          obj.callbackOverrides.onStart(false);
          return expect(tr._hide).toHaveBeenCalled();
        });
        it('should not call _hide if not isForward and isShowStart', function() {
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
        it('should call _showPrevChainModule if not isForward', function() {
          var obj, tr;
          tr = new Shape;
          obj = {};
          tr._applyCallbackOverrides(obj);
          spyOn(tr, '_showPrevChainModule');
          obj.callbackOverrides.onStart(false);
          return expect(tr._showPrevChainModule).toHaveBeenCalled();
        });
        return it('should not call _hideModuleChain if !isForward', function() {
          var obj, tr;
          tr = new Shape;
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
        return it('should not call _hide if isForward but isShowEnd', function() {
          var obj, tr;
          tr = new Shape;
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
        tr = new Shape;
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
    describe('opacity set ->', function() {
      it('should set opacity with respect to units', function() {
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
          return expect(tr).toBe('translate(100px, 50px) rotate(0deg) scale(1, 1)');
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
              isTr = tr === 'translate(200px, 0) rotate(0deg) scale(1, 1)';
              isTr2 = tr === 'translate(200px, 0px) rotate(0deg) scale(1, 1)';
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
              isTr = tr === 'translate(50%, 0) rotate(0deg) scale(1, 1)';
              isTr2 = tr === 'translate(50%, 0px) rotate(0deg) scale(1, 1)';
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
              expect(tr).toBe('translate(50px, 50%) rotate(0deg) scale(1, 1)');
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
      it('should set _isRendered to true method', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        expect(byte._isRendered).toBe(true);
        byte._isRendered = false;
        byte._render();
        return expect(byte._isRendered).toBe(true);
      });
      it('should call `_setProgress(0)` if `_isFirstInChain()`', function() {
        var byte;
        byte = new Byte;
        spyOn(byte, '_setProgress');
        byte._isRendered = false;
        byte._render();
        return expect(byte._setProgress).toHaveBeenCalledWith(0);
      });
      it('should not call `_setProgress(0)` if not `_isFirstInChain()`', function() {
        var byte, el;
        byte = new Byte().then({
          radius: 0
        });
        el = byte._modules[1];
        spyOn(el, '_setProgress');
        el._isRendered = false;
        el._render();
        return expect(el._setProgress).not.toHaveBeenCalledWith(0);
      });
      return it('should call _setElStyles method', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        spyOn(byte, '_setElStyles');
        byte._render();
        return expect(byte._setElStyles).toHaveBeenCalled();
      });
    });
    describe('_setElStyles method ->', function() {
      return it('should set dimentions and position of the `el`', function() {
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
    });
    describe('_createShape method', function() {
      it('should create shape module based on `_props` shape', function() {
        var byte;
        byte = new Byte({
          shape: 'rect'
        });
        byte.shape = null;
        byte._createShape();
        return expect(byte.shape instanceof mojs.shapesMap.rect).toBe(true);
      });
      it('should send `width` and `height` to the `shape` module', function() {
        var byte;
        byte = new Byte({
          shape: 'rect',
          radius: 50,
          radiusY: 75,
          stroke: {
            0: 10
          }
        });
        byte.shape = null;
        byte._createShape();
        expect(byte.shape._props.width).toBe(2 * 50 + 10);
        expect(byte.shape._props.height).toBe(2 * 75 + 10);
        return expect(byte.shape._props.parent).toBe(byte.el);
      });
      return it('should save `width` and `height` to the `_props` module', function() {
        var byte;
        byte = new Byte({
          shape: 'rect',
          radius: 50,
          radiusY: 75,
          stroke: {
            0: 10
          }
        });
        byte.shape = null;
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
    return describe('_getMaxStroke method ->', function() {
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
  });

}).call(this);
