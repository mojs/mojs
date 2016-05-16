(function() {
  var Bit, Curve, curve, ns, svg;

  Curve = mojs.shapesMap.getShape('curve');

  Bit = mojs.shapesMap.getShape('bit');

  ns = 'http://www.w3.org/2000/svg';

  svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0;

  curve = new Curve({
    ctx: svg
  });

  describe('Curve ->', function() {
    it('should extend Bit', function() {
      return expect(curve instanceof Bit).toBe(true);
    });
    describe('_declareDefaults method ->', function() {
      it('should call super', function() {
        spyOn(Bit.prototype, '_declareDefaults');
        curve._declareDefaults();
        return expect(Bit.prototype._declareDefaults).toHaveBeenCalled();
      });
      return it('should set `shape` to `path`', function() {
        return expect(curve._defaults.shape).toBe('path');
      });
    });
    describe('_extendDefaults method', function() {
      it('should call super', function() {
        spyOn(Bit.prototype, '_extendDefaults');
        curve._extendDefaults();
        return expect(Bit.prototype._extendDefaults).toHaveBeenCalled();
      });
      it('`radiusX` should fallback to `radius`', function() {
        curve = new Curve({
          ctx: svg,
          radius: 20
        });
        curve._extendDefaults();
        return expect(curve._props.radiusX).toBe(20);
      });
      it('`radiusX` should not fallback to `radius` if falsy', function() {
        curve = new Curve({
          ctx: svg,
          radius: 20,
          radiusX: 0
        });
        curve._extendDefaults();
        return expect(curve._props.radiusX).toBe(0);
      });
      it('`radiusY` should fallback to `radius`', function() {
        curve = new Curve({
          ctx: svg,
          radius: 20
        });
        curve._extendDefaults();
        return expect(curve._props.radiusY).toBe(20);
      });
      return it('`radiusY` should not fallback to `radius` if falsy', function() {
        curve = new Curve({
          ctx: svg,
          radius: 20,
          radiusY: 0
        });
        curve._extendDefaults();
        return expect(curve._props.radiusY).toBe(0);
      });
    });
    describe('draw method ->', function() {
      it('should call super', function() {
        spyOn(Bit.prototype, 'draw');
        curve.draw();
        return expect(Bit.prototype.draw).toHaveBeenCalled();
      });
      it('should call `el.setAttribute` for `d` attribute ', function() {
        var p, radiusX, radiusY, x, x1, x2, x3, y, y1, y2, y3;
        radiusX = 20;
        radiusY = 30;
        curve = new Curve({
          ctx: svg
        }, radiusX, radiusY);
        curve.draw();
        p = curve._props;
        x = 1 * p.x;
        y = 1 * p.y;
        x1 = x - p.radiusX;
        x2 = x;
        x3 = x + p.radiusX;
        y1 = y - p.radiusY;
        y2 = y;
        y3 = y + p.radiusY;
        return expect(curve.el.getAttribute('d')).toBe("M" + x1 + " " + p.y + " Q " + x2 + " " + (p.y - 2 * p.radiusY) + " " + x3 + " " + p.y);
      });
      it('should save `d` to `_d` property', function() {
        var p, radiusX, radiusY, x, x1, x2, x3, y, y1, y2, y3;
        radiusX = 20;
        radiusY = 30;
        curve = new Curve({
          ctx: svg
        }, radiusX, radiusY);
        curve.draw();
        p = curve._props;
        x = 1 * p.x;
        y = 1 * p.y;
        x1 = x - p.radiusX;
        x2 = x;
        x3 = x + p.radiusX;
        y1 = y - p.radiusY;
        y2 = y;
        y3 = y + p.radiusY;
        return expect(curve._prevD).toBe("M" + x1 + " " + p.y + " Q " + x2 + " " + (p.y - 2 * p.radiusY) + " " + x3 + " " + p.y);
      });
      return it('should not set the `d` attribute if nothing changed', function() {
        var radiusX, radiusY;
        radiusX = 20;
        radiusY = 30;
        curve = new Curve({
          ctx: svg
        }, radiusX, radiusY);
        curve.draw();
        spyOn(curve.el, 'setAttribute');
        curve.draw();
        return expect(curve.el.setAttribute).not.toHaveBeenCalled();
      });
    });
    return describe('getLength method', function() {
      return it('should calculate total length of the path', function() {
        var dRadius, len, p, radiusX, radiusY, sqrt;
        radiusX = 20;
        radiusY = 30;
        curve = new Curve({
          ctx: svg
        }, radiusX, radiusY);
        p = curve._props;
        dRadius = p.radiusX + p.radiusY;
        sqrt = Math.sqrt((3 * p.radiusX + p.radiusY) * (p.radiusX + 3 * p.radiusY));
        len = .5 * Math.PI * (3 * dRadius - sqrt);
        return expect(curve.getLength()).toBe(len);
      });
    });
  });

}).call(this);
