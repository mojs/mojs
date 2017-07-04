var Deltas = mojs.Deltas;
var Rig = mojs.Rig;
var Tweenable = helpers.Tweenable;

describe('`rig` ->', function () {
  describe('extension ->', function() {
    it('should extend `ClassProto`', function () {
      var rig = new Rig();
      expect(Tweenable.__mojsClass.isPrototypeOf(rig)).toBe(true);
    });

    it('should have `_defaults`', function () {
      var rig = new Rig();

      expect(rig._defaults.curvature).toBe(0);
      expect(rig._defaults.direction).toBe(1);
      expect(rig._defaults.size).toBe(200);
      expect(rig._defaults.x1).toBe(0);
      expect(rig._defaults.y1).toBe(0);
      expect(rig._defaults.x2).toBe(0);
      expect(rig._defaults.y2).toBe(100);
    });
  });

  describe('`_render` ->', function() {
    it('should', function () {});
  });

  describe('`deltas` ->', function() {
    it('should create deltas', function () {
      var rig = new Rig();

      expect(Deltas.__mojsClass.isPrototypeOf(rig._deltas)).toBe(true)
    });

    it('should pass the `_props` to the `Deltas`', function () {
      var rig = new Rig({
        x: { 200: 0 }
      });

      expect(rig._deltas._o.el).toEqual(rig._props);
      expect(rig._deltas._o.size).toEqual(rig._props.size);
      expect(rig._deltas._o.curvature).toEqual(rig._props.curvature);
      expect(rig._deltas._o.direction).toEqual(rig._props.direction);
      expect(rig._deltas._o.x1).toEqual(rig._props.x1);
      expect(rig._deltas._o.x2).toEqual(rig._props.x2);
      expect(rig._deltas._o.y1).toEqual(rig._props.y1);
      expect(rig._deltas._o.y2).toEqual(rig._props.y2);
      expect(rig._deltas._o.x).toEqual(rig._props.x);
      expect(rig._deltas._o.x).toEqual({ 200: 0 });
    });

    it('should pass render function', function () {
      var rig = new Rig();

      expect(typeof rig._deltas._o.customProperties.render).toBe('function');

      spyOn(rig, 'render');

      var obj = {};
      var support = {};
      var ep = Math.random();
      var p = Math.random();
      var isForward = true;
      rig._deltas._o.customProperties.render(obj, support, ep, p, isForward);

      expect(rig.render).toHaveBeenCalledWith(obj, support, ep, p, isForward);
    });

    it('should call the original render', function () {
      var customProperties = {
        render: function () {}
      };

      spyOn(customProperties, 'render');

      var rig = new Rig({
        customProperties: customProperties
      });

      var obj = {};
      var support = {};
      var ep = Math.random();
      var p = Math.random();
      var isForward = true;
      rig._deltas._o.customProperties.render(obj, support, ep, p, isForward);

      expect(customProperties.render).toHaveBeenCalledWith(obj, support, ep, p, isForward);
    });

    it('should pipe all the custom properties', function () {
      var customProperties = {
        a: Math.random(),
        b: {
          type: 'unit'
        },
        render: function () {}
      };

      var rig = new Rig({
        customProperties: customProperties
      });

      expect(rig._deltas._o.customProperties.a).toBe(customProperties.a);
      expect(rig._deltas._o.customProperties.b).toEqual(customProperties.b);
    });

    it('should remove all the default properties from the `customProperties`', function () {
      var customProperties = {
        size: 200,
        curvature: 0,
        direction: 1,
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 100,
        onRender: () => {},
        a: Math.random(),
        b: {
          type: 'unit'
        },
        render: function () {}
      };

      var rig = new Rig({
        customProperties: customProperties
      });

      expect(rig._deltas._o.customProperties.a).toBe(customProperties.a);
      expect(rig._deltas._o.customProperties.b).toEqual(customProperties.b);
      expect(typeof rig._deltas._o.customProperties.render).toBe('function');
      expect(Object.keys(rig._deltas._o.customProperties).length).toBe(3);
    });

    it('should set `timeline` to `deltas.timeline`', function () {
      var rig = new Rig();

      expect(rig.timeline).toBe(rig._deltas.timeline);
    });
  });
});
