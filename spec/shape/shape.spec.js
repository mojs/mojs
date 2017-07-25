var Surface = mojs.Surface;
var Shape = mojs.Shape2;

var el = document.createElement('div');

describe('`Shape` ->', function () {
  describe('extension ->', function() {
    it('should extend `Surface`', function () {
      var shape = new Shape();
      expect(Surface.__mojsClass.isPrototypeOf(shape)).toBe(true);
    });

    it('should have `_defaults`', function () {
      var shape = new Shape();

      expect(shape._defaults.size).toBe(100);
      expect(shape._defaults.sizeX).toBe(undefined);
      expect(shape._defaults.sizeY).toBe(undefined);
    });

    it('should keep `Surface` defaults', function () {
      var shape = new Shape();

      expect(shape._defaults.parent).toBe(document.body);
      expect(shape._defaults.width).toBe(100);
      expect(shape._defaults.height).toBe(100);
    });

    it('should save `Surface` defaults #2', function () {
      var shape = new Shape();

      expect(shape._surfaceDefaults.parent).toBe(document.body);
      expect(shape._surfaceDefaults.width).toBe(100);
      expect(shape._surfaceDefaults.height).toBe(100);
    });
  });

  describe('`_surfaceOptions` ->', function() {
    it('should delete `surfaceOptions` from options', function () {
      var shape = new Shape();

      expect(shape.shape._o.surfaceOptions).not.toBeDefined();
    });
  });

  describe('`customProperties` ->', function() {
    it('should shape to Shape', function () {
      var shapeName = 'some-shape';
      var shape = new Shape({
        shape: shapeName
      });

      expect(shape._o.shape).toBe(shapeName);
    });
  });


  describe('`customProperties` ->', function() {
    it('should pass new customProperties to shape', function () {
      var shape = new Shape();

      expect(shape._o.customProperties.pipeObj).toEqual({
        root: shape.shape.root,
        styleKeys: []
      });
    });

    it('should add `isSkipRender: true` to `size`, `sizeX` and `sizeY`', function () {
      var shape = new Shape();

      expect(shape._o.customProperties.size).toEqual({
        type: 'number',
        isSkipRender: true
      });

      expect(shape._o.customProperties.sizeX).toEqual({
        type: 'number',
        isSkipRender: true
      });

      expect(shape._o.customProperties.sizeY).toEqual({
        type: 'number',
        isSkipRender: true
      });

      expect(shape._o.customProperties.shape).not.toBeDefined();
    });

    it('should add `isSkipRender: true` every non-surface property`', function () {
      var shape = new Shape({
        width: 200,
        height: 100,
        k: { 20 : 100 },
        t: { 20 : 100 },
        x: 20,
        y: 100,
        scaleX: 100,
        scaleZ: { 100: 200 },
        customProperties: {
          k: {
            type: 'unit',
            isSkipRender: false,
          }
        }
      });

      expect(shape._o.customProperties.k).toEqual({
        type: 'unit',
        isSkipRender: false
      });

      expect(shape._o.customProperties.t).toEqual({
        isSkipRender: true
      });

      expect(shape._o.customProperties.el).not.toBeDefined();
      expect(shape._o.customProperties.x).not.toBeDefined();
      expect(shape._o.customProperties.y).not.toBeDefined();
      expect(shape._o.customProperties.scaleX).not.toBeDefined();
      expect(shape._o.customProperties.angleZ).not.toBeDefined();
      // surface props
      expect(shape._o.customProperties.width).toEqual({ type: 'unit' });
      expect(shape._o.customProperties.height).toEqual({ type: 'unit' });
    });

    it('should not add `isSkipRender: true` to `surfaceOptions` props', function () {
      var shape = new Shape({
        width: 200,
        height: 100,
        k: { 20 : 100 },
        t: { 20 : 100 },
        x: 20,
        y: 100,
        scaleX: 100,
        scaleZ: { 100: 200 },
        surfaceOptions: [ 'k' ],
        customProperties: {
          t: {
            type: 'unit',
            isSkipRender: false,
          }
        }
      });

      expect(shape._o.customProperties.k).not.toBeDefined();
      expect(shape._o.customProperties.t).toEqual({
        type: 'unit',
        isSkipRender: false,
      });
    });

    it('should add `isSkipRender: true` if passed with `customProperties`', function () {
      var shape = new Shape({
        width: 200,
        height: 100,
        k: { 20 : 100 },
        t: { 20 : 100 },
        x: 20,
        y: 100,
        scaleX: 100,
        scaleZ: { 100: 200 },
        surfaceOptions: [ 't' ],
        customProperties: {
          t: {
            type: 'unit',
            isSkipRender: false,
          }
        }
      });

      expect(shape._o.customProperties.k).toEqual({
        isSkipRender: true
      });

      expect(shape._o.customProperties.t).toEqual({
        type: 'unit',
        isSkipRender: false,
      });
    });

    it('should pipe thru the original `customProperties`', function () {
      var customProperties = {
        k: {
          type: 'unit',
          isSkipRender: true
        },
        t: {
          type: 'number',
          isSkipRender: true
        }
      };

      var shape = new Shape({
        width: 200,
        height: 100,
        k: { 20 : 100 },
        customProperties: customProperties
      });

      expect(shape._o.customProperties.k).toEqual(customProperties.k);
      expect(shape._o.customProperties.t).toEqual(customProperties.t);
    });
  });

  describe('`styleKeys` ->', function() {
    it('should pass styleKeys', function () {
      var shape = new Shape({
        stroke: { 'cyan': 'purple' },
        strokeWidth: 2,
        sizeX: 20,
        scaleZ: 10,
      });

      expect(shape._o.customProperties.pipeObj.styleKeys).toEqual(['stroke', 'strokeWidth']);
    });

    it('should take the original customProperties into accout', function () {
      var shape = new Shape({
        stroke: { 'cyan': 'purple' },
        strokeWidth: 2,
        sizeX: 20,
        scaleZ: 10,
        customProperties: {
          stroke: {
            isSkipRender: true
          }
        }
      });

      expect(shape._o.customProperties.pipeObj.styleKeys).toEqual(['strokeWidth']);
    });

    it('should not pass the `key` which is defined in `surfaceOptions` in `array`', function () {
      var shape = new Shape({
        stroke: { 'cyan': 'purple' },
        strokeWidth: 2,
        strokeDasharray: 40,
        strokeDashoffset: 25,
        sizeX: 20,
        scaleZ: 10,
        surfaceOptions: [ 'stroke', 'strokeDasharray' ]
      });

      expect(shape._o.customProperties.pipeObj.styleKeys).toEqual([ 'strokeWidth', 'strokeDashoffset' ]);
    });

    it('should filter out tween properties', function () {
      var shape = new Shape({
        strokeWidth: 2,
        duration: 2000
      });

      expect(shape._o.customProperties.pipeObj.styleKeys).toEqual([ 'strokeWidth' ]);
    });

    it('should filter out `shape` property', function () {
      var shape = new Shape({
        strokeWidth: 2,
        shape: 'line',
        duration: 2000
      });

      expect(shape._o.customProperties.pipeObj.styleKeys).toEqual([ 'strokeWidth' ]);
    });
  });

  describe('`render` ->', function() {
    it('should call the `shape` render', function () {
      var shape = new Shape({
        stroke: { 'cyan': 'purple' },
        strokeWidth: 2,
        sizeX: 20,
        scaleZ: 10,
      });

      spyOn(shape.shape, 'render');

      var obj1 = {};
      var obj2 = {};
      shape._o.customProperties.render(obj1, obj2, .75, 25, false);

      expect(shape.shape.render).toHaveBeenCalledWith(obj1, obj2, .75, 25, false);
    });

    it('should call the `original` render', function () {
      var arg1 = null;
      var arg2 = null;
      var arg3 = null;
      var arg4 = null;
      var arg5 = null;
      var customProperties = {
        render: function (obj1, obj2, obj3, obj4, obj5) {
          arg1 = obj1;
          arg2 = obj2;
          arg3 = obj3;
          arg4 = obj4;
          arg5 = obj5;
        }
      };

      var shape = new Shape({
        stroke: { 'cyan': 'purple' },
        strokeWidth: 2,
        sizeX: 20,
        scaleZ: 10,
        customProperties: customProperties
      });

      spyOn(customProperties, 'render');
      // spy on this just to prevent the original call since we have only
      // generic objects as arguments
      spyOn(shape.shape, 'render');


      var obj1 = {};
      var obj2 = {};
      shape._o.customProperties.render(obj1, obj2, .5, .75, true);

      expect(arg1).toBe(obj1);
      expect(arg2).toBe(obj2);
      expect(arg3).toBe(.5);
      expect(arg4).toBe(.75);
      expect(arg5).toBe(true);
    });
  });
});
