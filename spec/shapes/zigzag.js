(function() {
  var Bit, Zigzag, ns, svg;

  Zigzag = mojs.shapesMap.getShape('zigzag');

  Bit = mojs.shapesMap.getShape('bit');

  ns = 'http://www.w3.org/2000/svg';

  svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, 'svg') : void 0;

  document.body.appendChild(svg);

  describe('Zigzag ->', function() {
    it('should extend Bit', function() {
      var line;
      line = new Zigzag({
        ctx: svg
      });
      return expect(line instanceof Bit).toBe(true);
    });
    it('should add itself to context', function() {
      var line;
      line = new Zigzag({
        ctx: svg
      });
      return expect(svg.firstChild).toBeDefined();
    });
    describe('_declareDefaults method ->', function() {
      it('should call super', function() {
        var zigzag;
        zigzag = new Zigzag;
        spyOn(Bit.prototype, '_declareDefaults');
        zigzag._declareDefaults();
        return expect(Bit.prototype._declareDefaults).toHaveBeenCalled();
      });
      it('should set `shape` to `path`', function() {
        var zigzag;
        zigzag = new Zigzag;
        return expect(zigzag._defaults.tag).toBe('path');
      });
      return it('should set `points` to `3`', function() {
        var zigzag;
        zigzag = new Zigzag;
        return expect(zigzag._defaults.points).toBe(3);
      });
    });
    describe('methods ->', function() {
      return describe('_draw method ->', function() {
        it('should add properties to el', function() {
          var zigzag;
          return zigzag = new Zigzag({
            radius: 20
          });
        });
        it('should define points', function() {
          var zigzag;
          zigzag = new Zigzag({
            radius: 20
          });
          zigzag._draw();
          return expect(zigzag.el.getAttribute('d')).toBeTruthy();
        });
        it('should not work with 0 points', function() {
          var zigzag;
          zigzag = new Zigzag({
            radius: 20,
            points: 0
          });
          return expect(zigzag.el.getAttribute('d')).toBeFalsy();
        });
        it('should calculate path length', function() {
          var zigzag;
          zigzag = new Zigzag({
            radius: 20,
            points: 10
          });
          zigzag._draw();
          return expect(zigzag._length).toBeCloseTo(184.390, 2);
        });
        it('should set `d` attribute', function() {
          var currentX, currentY, delta, i, isP1, isP2, length, p, points, radiusX, radiusY, stepX, x, y, yFlip, zigzag, _i, _ref;
          zigzag = new Zigzag({
            radius: 20,
            points: 10
          });
          zigzag._draw();
          p = zigzag._props;
          radiusX = p.radiusX != null ? p.radiusX : p.radius;
          radiusY = p.radiusY != null ? p.radiusY : p.radius;
          x = p.width / 2;
          y = p.height / 2;
          currentX = x - radiusX;
          currentY = y;
          stepX = (2 * radiusX) / (p.points - 1);
          yFlip = -1;
          delta = Math.sqrt(stepX * stepX + radiusY * radiusY);
          length = -delta;
          points = "M" + currentX + ", " + y + " ";
          for (i = _i = 0, _ref = p.points; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
            points += "L" + currentX + ", " + currentY + " ";
            currentX += stepX;
            length += delta;
            currentY = yFlip === -1 ? y - radiusY : y;
            yFlip = -yFlip;
          }
          isP1 = zigzag.el.getAttribute('d') === points;
          isP2 = zigzag.el.getAttribute('d') === 'M -20 0 L -20 0 L -15.5556 -20 L -11.1111 0 L -6.66667 -20 L -2.22222 0 L 2.22222 -20 L 6.66667 0 L 11.1111 -20 L 15.5556 0 L 20 -20';
          expect(isP1 || isP2).toBe(true);
          expect(zigzag._prevRadiusX).toBe(radiusX);
          expect(zigzag._prevRadiusY).toBe(radiusY);
          return expect(zigzag._prevPoints).toBe(p.points);
        });
        it('should not set `d` attribute if nothing changed', function() {
          var zigzag;
          zigzag = new Zigzag({
            ctx: typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0,
            radius: 20,
            points: 10
          });
          zigzag._draw();
          spyOn(zigzag.el, 'setAttribute');
          zigzag._draw();
          return expect(zigzag.el.setAttribute).not.toHaveBeenCalled();
        });
        it('should set `d` attribute if `radiusX` changed', function() {
          var zigzag;
          zigzag = new Zigzag({
            ctx: typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0,
            radius: 20,
            points: 10
          });
          zigzag._draw();
          spyOn(zigzag.el, 'setAttribute');
          zigzag._props.radiusX = 30;
          zigzag._draw();
          return expect(zigzag.el.setAttribute).toHaveBeenCalled();
        });
        it('should set `d` attribute if `radiusY` changed', function() {
          var zigzag;
          zigzag = new Zigzag({
            ctx: typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0,
            radius: 20,
            points: 10
          });
          zigzag._draw();
          spyOn(zigzag.el, 'setAttribute');
          zigzag._props.radiusY = 30;
          zigzag._draw();
          return expect(zigzag.el.setAttribute).toHaveBeenCalled();
        });
        return it('should set `d` attribute if `points` changed', function() {
          var zigzag;
          zigzag = new Zigzag({
            ctx: typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0,
            radius: 20,
            points: 10
          });
          zigzag._draw();
          spyOn(zigzag.el, 'setAttribute');
          zigzag._props.points = 30;
          zigzag._draw();
          return expect(zigzag.el.setAttribute).toHaveBeenCalled();
        });
      });
    });
    return describe('getLength method ->', function() {
      return it('should calculate total length of the path', function() {
        var bit;
        bit = new Zigzag({
          ctx: document.createElementNS(ns, 'svg'),
          radiusX: 100,
          radiusY: 550
        });
        bit._draw();
        return expect(bit._getLength()).toBe(bit._length);
      });
    });
  });

}).call(this);
