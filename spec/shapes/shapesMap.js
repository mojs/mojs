(function() {
  var h, shapesMap,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  shapesMap = window.mojs.shapesMap;

  h = mojs.h;

  describe('shapesMap ->', function() {
    it('should have all available shapes', function() {
      expect(shapesMap.bit).toBeDefined();
      expect(shapesMap.custom).toBeDefined();
      expect(shapesMap.circle).toBeDefined();
      expect(shapesMap.line).toBeDefined();
      expect(shapesMap.zigzag).toBeDefined();
      expect(shapesMap.rect).toBeDefined();
      expect(shapesMap.polygon).toBeDefined();
      expect(shapesMap.cross).toBeDefined();
      expect(shapesMap.equal).toBeDefined();
      return expect(shapesMap.curve).toBeDefined();
    });
    describe('getShape', function() {
      it('should get bit by string', function() {
        return expect(shapesMap.getShape('bit')).toBeDefined();
      });
      return it('should console.error if bit was not found', function() {
        spyOn(h, 'error');
        shapesMap.getShape('');
        return expect(h.error).toHaveBeenCalled();
      });
    });
    return describe('addShape method ->', function() {
      it('should add shape to the shape map', function() {
        var Custom, Shape;
        Custom = shapesMap.getShape('custom');
        Shape = (function(_super) {
          __extends(Shape, _super);

          function Shape() {
            return Shape.__super__.constructor.apply(this, arguments);
          }

          return Shape;

        })(Custom);
        shapesMap.addShape('shape', Shape);
        return expect(shapesMap.getShape('shape')).toBe(Shape);
      });
      return it('should be hard bound to shapesMap', function() {
        var Module;
        Module = {};
        mojs.addShape('shape', Module);
        return expect(shapesMap.getShape('shape')).toBe(Module);
      });
    });
  });

}).call(this);
