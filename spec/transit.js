(function() {
  var Bit, Byte, Rect, Thenable, Transit, h, ns, svg;

  Byte = mojs.Transit;

  Transit = mojs.Transit;

  Bit = mojs.shapesMap.getShape('bit');

  Thenable = mojs.Thenable;

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
        expect(byte._defaults.radius[0]).toBe(50);
        expect(byte._defaults.radiusX).toBe(null);
        expect(byte._defaults.radiusY).toBe(null);
        expect(byte._defaults.isShowEnd).toBe(false);
        expect(byte._defaults.isShowStart).toBe(false);
        expect(byte._defaults.size).toBe(null);
        expect(byte._defaults.callbacksContext).toBe(null);
        return expect(byte._defaults.sizeGap).toBe(0);
      });
    });
    return describe('_makeTweenControls method ->', function() {
      describe('onUpdate callback override ->', function() {
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
        return it('should call _setProgress method', function() {
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
      });
      describe('onStart callback override ->', function() {
        return it('should override this._o.onStart', function() {
          var tr;
          tr = new Transit;
          expect(typeof tr._o.onStart).toBe('function');
          it('should not override onStart function if exists', function() {
            var args, isRightScope, options;
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
            tr = new Transit;
            tr.timeline.setProgress(0);
            spyOn(tr, '_show').and.callThrough();
            tr.timeline.setProgress(.1);
            return expect(tr._show).toHaveBeenCalled();
          });
          it('should hide module ', function() {
            tr = new Transit;
            tr.timeline.setProgress(.1);
            spyOn(tr, '_hide').and.callThrough();
            tr.timeline.setProgress(0);
            return expect(tr._hide).toHaveBeenCalled();
          });
          return it('should not hide module is isShowStart was set', function() {
            tr = new Transit({
              isShowStart: true
            });
            tr.timeline.setProgress(.2);
            tr.timeline.setProgress(.1);
            spyOn(tr, '_hide').and.callThrough();
            tr.timeline.setProgress(0);
            return expect(tr._hide).not.toHaveBeenCalled();
          });
        });
      });
      return describe('onComplete callback override ->', function() {
        it('should override this._o.onComplete', function() {
          var tr;
          tr = new Transit;
          return expect(typeof tr._o.onComplete).toBe('function');
        });
        it('should not override onComplete function if exists', function() {
          var args, isRightScope, options, tr;
          isRightScope = null;
          args = null;
          options = {
            onComplete: function() {
              isRightScope = this === tr;
              return args = arguments;
            }
          };
          tr = new Transit(options);
          expect(typeof tr._o.onComplete).toBe('function');
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
    });
  });

}).call(this);
