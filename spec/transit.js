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
    return describe('_transformTweenOptions method ->', function() {
      it('should create callbackOverrides object on _o', function() {
        var tr;
        tr = new Transit;
        tr._transformTweenOptions();
        expect(typeof tr._o.callbackOverrides).toBe('object');
        return expect(tr._o.callbackOverrides).toBe(tr._o.callbackOverrides);
      });
      describe('onUpdate callback override ->', function() {
        it('should override this._o.onUpdate', function() {
          var tr;
          tr = new Transit;
          tr._transformTweenOptions();
          return expect(typeof tr._o.callbackOverrides.onUpdate).toBe('function');
        });
        return it('should call _setProgress ', function() {
          var progress, tr;
          tr = new Transit;
          tr._transformTweenOptions();
          spyOn(tr, '_setProgress');
          progress = .25;
          tr._o.callbackOverrides.onUpdate(progress);
          return expect(tr._setProgress).toHaveBeenCalledWith(progress);
        });
      });
      describe('onStart callback override ->', function() {
        it('should override this._o.onStart', function() {
          var tr;
          tr = new Transit;
          tr._transformTweenOptions();
          return expect(typeof tr._o.callbackOverrides.onStart).toBe('function');
        });
        it('should call _show if isForward', function() {
          var tr;
          tr = new Transit;
          tr._transformTweenOptions();
          spyOn(tr, '_show');
          tr._o.callbackOverrides.onStart(true);
          return expect(tr._show).toHaveBeenCalled();
        });
        it('should call _hide if not isForward', function() {
          var tr;
          tr = new Transit;
          tr._transformTweenOptions();
          spyOn(tr, '_hide');
          tr._o.callbackOverrides.onStart(false);
          return expect(tr._hide).toHaveBeenCalled();
        });
        return it('should not call _hide if not isForward and !isShowStart', function() {
          var tr;
          tr = new Transit({
            isShowStart: true
          });
          tr._transformTweenOptions();
          spyOn(tr, '_hide');
          tr._o.callbackOverrides.onStart(false);
          return expect(tr._hide).not.toHaveBeenCalled();
        });
      });
      return describe('onComplete callback override ->', function() {
        it('should override this._o.onComplete', function() {
          var tr;
          tr = new Transit;
          tr._transformTweenOptions();
          return expect(typeof tr._o.callbackOverrides.onComplete).toBe('function');
        });
        it('should call _show if !isForward', function() {
          var tr;
          tr = new Transit;
          tr._transformTweenOptions();
          spyOn(tr, '_show');
          tr._o.callbackOverrides.onComplete(false);
          return expect(tr._show).toHaveBeenCalled();
        });
        it('should call _hide if isForward', function() {
          var tr;
          tr = new Transit;
          tr._transformTweenOptions();
          spyOn(tr, '_hide');
          tr._o.callbackOverrides.onComplete(true);
          return expect(tr._hide).toHaveBeenCalled();
        });
        return it('should not call _hide if isForward but isShowEnd', function() {
          var tr;
          tr = new Transit({
            isShowEnd: true
          });
          tr._transformTweenOptions();
          spyOn(tr, '_hide');
          tr._o.callbackOverrides.onComplete(true);
          return expect(tr._hide).not.toHaveBeenCalled();
        });
      });
    });
  });

}).call(this);
