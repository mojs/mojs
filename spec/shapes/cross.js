(function() {
  var Bit, Cross, cross, ns, svg;

  Cross = mojs.shapesMap.getShape('cross');

  Bit = mojs.shapesMap.getShape('bit');

  ns = 'http://www.w3.org/2000/svg';

  svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0;

  cross = new Cross({
    ctx: svg
  });

  describe('Cross ->', function() {
    it('should extend Bit', function() {
      return expect(cross instanceof Bit).toBe(true);
    });
    describe('_declareDefaults method ->', function() {
      it('should call super', function() {
        spyOn(Bit.prototype, '_declareDefaults');
        cross._declareDefaults();
        return expect(Bit.prototype._declareDefaults).toHaveBeenCalled();
      });
      return it('should set `shape` to `path`', function() {
        return expect(cross._defaults.tag).toBe('path');
      });
    });
    describe('_draw method ->', function() {
      it('should add properties to el', function() {
        var d, isD, isIE9D;
        cross = new Cross({
          radius: 20,
          width: 40,
          height: 40
        });
        cross._draw();
        d = cross.el.getAttribute('d');
        isD = d === 'M0,20 L40,20 M20,0 L20,40';
        isIE9D = d === 'M 0 20 L 40 20 M 20 0 L 20 40';
        return expect(isD || isIE9D).toBe(true);
      });
      it('should work with radiusX and fallback to radius', function() {
        var d, isD, isIE9D;
        cross = new Cross({
          radius: 20,
          radiusX: 40
        });
        cross._draw();
        d = cross.el.getAttribute('d');
        isD = d === 'M-40,0 L40,0 M0,-20 L0,20';
        isIE9D = d === 'M -40 0 L 40 0 M 0 -20 L 0 20';
        return expect(isD || isIE9D).toBe(true);
      });
      it('should work with radiusY and fallback to radius', function() {
        var d, isD, isIE9D;
        cross = new Cross({
          radius: 20,
          radiusY: 40
        });
        cross._draw();
        d = cross.el.getAttribute('d');
        isD = d === 'M-20,0 L20,0 M0,-40 L0,40';
        isIE9D = d === 'M -20 0 L 20 0 M 0 -40 L 0 40';
        return expect(isD || isIE9D).toBe(true);
      });
      it('should call super method', function() {
        cross = new Cross;
        spyOn(Cross.__super__, '_draw');
        cross._draw();
        return expect(Cross.__super__._draw).toHaveBeenCalled();
      });
      it('should not set `d` attribute if nothing changed', function() {
        cross = new Cross({
          radius: 20,
          points: 10
        });
        cross._draw();
        spyOn(cross.el, 'setAttribute');
        cross._draw();
        return expect(cross.el.setAttribute).not.toHaveBeenCalled();
      });
      it('should set `d` attribute if `radiusX` changed', function() {
        cross = new Cross({
          radius: 20,
          points: 10
        });
        cross._draw();
        spyOn(cross.el, 'setAttribute');
        cross._props.radiusX = 30;
        cross._draw();
        return expect(cross.el.setAttribute).toHaveBeenCalled();
      });
      return it('should set `d` attribute if `radiusY` changed', function() {
        cross = new Cross({
          radius: 20,
          points: 10
        });
        cross._draw();
        spyOn(cross.el, 'setAttribute');
        cross._props.radiusY = 30;
        cross._draw();
        return expect(cross.el.setAttribute).toHaveBeenCalled();
      });
    });
    return describe('_getLength method', function() {
      it('should calculate total length of the path', function() {
        var bit;
        bit = new Cross({
          ctx: document.createElementNS(ns, 'svg'),
          radius: 100
        });
        return expect(bit._getLength()).toBe(400);
      });
      return it('should calculate total length of the with different radiusX/Y', function() {
        var bit;
        bit = new Cross({
          ctx: document.createElementNS(ns, 'svg'),
          radiusX: 100,
          radiusY: 50
        });
        return expect(bit._getLength()).toBe(300);
      });
    });
  });

}).call(this);
