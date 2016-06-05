(function() {
  var Bit, Rect, ns, rect, svg;

  Rect = mojs.shapesMap.getShape('rect');

  Bit = mojs.shapesMap.getShape('bit');

  ns = 'http://www.w3.org/2000/svg';

  svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0;

  rect = new Rect({
    ctx: svg
  });

  describe('Rect ->', function() {
    it('should extend Bit', function() {
      return expect(rect instanceof Bit).toBe(true);
    });
    describe('_declareDefaults method ->', function() {
      it('should call super', function() {
        rect = new Rect;
        spyOn(Bit.prototype, '_declareDefaults');
        rect._declareDefaults();
        return expect(Bit.prototype._declareDefaults).toHaveBeenCalled();
      });
      it('should set `shape` to `path`', function() {
        rect = new Rect;
        return expect(rect._defaults.tag).toBe('rect');
      });
      it('should set `rx` to `0`', function() {
        rect = new Rect;
        return expect(rect._defaults.rx).toBe(0);
      });
      return it('should set `ry` to `0`', function() {
        rect = new Rect;
        return expect(rect._defaults.ry).toBe(0);
      });
    });
    describe('_draw method ->', function() {
      it('should add properties to el', function() {
        var height, rx, ry, width, x, y;
        rect = new Rect({
          radius: 20,
          x: 50,
          y: 100,
          rx: 10,
          ry: 20,
          width: 50,
          height: 50
        });
        rect._draw();
        width = rect.el.getAttribute('width');
        height = rect.el.getAttribute('height');
        x = rect.el.getAttribute('x');
        y = rect.el.getAttribute('y');
        rx = rect.el.getAttribute('rx');
        ry = rect.el.getAttribute('ry');
        expect(width).toBe('40');
        expect(height).toBe('40');
        expect(x).toBe('5');
        expect(y).toBe('5');
        expect(rx).toBe('10px');
        return expect(ry).toBe('20px');
      });
      it('should work with radiusX/radiusY props', function() {
        var height, width, x, y;
        rect = new Rect({
          radiusY: 50,
          radiusX: 40,
          width: 100,
          height: 200
        });
        rect._draw();
        width = rect.el.getAttribute('width');
        height = rect.el.getAttribute('height');
        expect(width).toBe('80');
        expect(height).toBe('100');
        x = rect.el.getAttribute('x');
        y = rect.el.getAttribute('y');
        expect(x).toBe('10');
        return expect(y).toBe('50');
      });
      return it('should call super method', function() {
        svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0;
        rect = new Rect;
        spyOn(Bit.prototype, '_draw');
        rect._draw();
        return expect(Bit.prototype._draw).toHaveBeenCalled();
      });
    });
    return describe('getLength method', function() {
      it('should calculate total length of the path', function() {
        var bit, radius;
        radius = 100;
        bit = new Rect({
          ctx: document.createElementNS(ns, 'svg'),
          radius: radius
        });
        return expect(bit._getLength()).toBe(800);
      });
      return it('should calculate total length of the with different radiusX/Y', function() {
        var bit, radiusX, radiusY;
        radiusX = 100;
        radiusY = 50;
        bit = new Rect({
          ctx: document.createElementNS(ns, 'svg'),
          radiusX: radiusX,
          radiusY: radiusY
        });
        return expect(bit._getLength()).toBe(2 * (2 * radiusX + 2 * radiusY));
      });
    });
  });

}).call(this);
