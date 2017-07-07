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
    it('should render rig #1', function () {
      var propsArg = {};
      var supportArg = {};

      var rig = new Rig({
        x1: 200,
        x2: 200,
        y1: 100,
        y2: 150,
        curvature: .5,
        size: 300,
        direction: -1,
        onRender: function(props, support) {
          propsArg = props;
          supportArg = support;
        }
      });

      rig.setProgress(0);

      expect(Math.round(supportArg.handle1.x)).toBe(52);
      expect(Math.round(supportArg.handle1.y)).toBe(85);

      expect(Math.round(supportArg.handle2.x)).toBe(51);
      expect(Math.round(supportArg.handle2.y)).toBe(160);

      expect(Math.round(supportArg.center.x)).toBe(200);
      expect(Math.round(supportArg.center.y)).toBe(125);

      expect(Math.round(supportArg.knee.x)).toBe(52);
      expect(Math.round(supportArg.knee.y)).toBe(122);

      expect(Math.round(supportArg.angle1)).toBe(94);
      expect(Math.round(supportArg.angle2)).toBe(88);

      expect(supportArg.stretchRatio.toFixed(2)).toBe('0.17');
    });

    it('should render rig #2', function () {
      var propsArg = {};
      var supportArg = {};

      var rig = new Rig({
        x1: 100,
        x2: 300,
        y1: 125,
        y2: 100,
        curvature: 1,
        size: 100,
        direction: 1,
        onRender: function(props, support) {
          propsArg = props;
          supportArg = support;
        }
      });

      rig.setProgress(0);

      expect(Math.round(supportArg.handle1.x)).toBe(175);
      expect(Math.round(supportArg.handle1.y)).toBe(116);

      expect(Math.round(supportArg.handle2.x)).toBe(225);
      expect(Math.round(supportArg.handle2.y)).toBe(109);

      expect(Math.round(supportArg.center.x)).toBe(200);
      expect(Math.round(supportArg.center.y)).toBe(113);

      expect(Math.round(supportArg.knee.x)).toBe(200);
      expect(Math.round(supportArg.knee.y)).toBe(113);

      expect(Math.round(supportArg.angle1)).toBe(-97);
      expect(Math.round(supportArg.angle2)).toBe(-277);

      expect(supportArg.stretchRatio.toFixed(2)).toBe('2.02');
    });

    it('should render rig #3', function () {
      var propsArg = {};
      var supportArg = {};

      var rig = new Rig({
        x1: 50,
        x2: 150,
        y1: 0,
        y2: 450,
        curvature: .25,
        size: 500,
        direction: -1,
        onRender: function(props, support) {
          propsArg = props;
          supportArg = support;
        }
      });

      rig.setProgress(0);

      expect(Math.round(supportArg.handle1.x)).toBe(-1);
      expect(Math.round(supportArg.handle1.y)).toBe(215);

      expect(Math.round(supportArg.handle2.x)).toBe(12);
      expect(Math.round(supportArg.handle2.y)).toBe(277);

      expect(Math.round(supportArg.center.x)).toBe(100);
      expect(Math.round(supportArg.center.y)).toBe(225);

      expect(Math.round(supportArg.knee.x)).toBe(5);
      expect(Math.round(supportArg.knee.y)).toBe(246);

      expect(Math.round(supportArg.angle1)).toBe(17);
      expect(Math.round(supportArg.angle2)).toBe(138);

      expect(supportArg.stretchRatio.toFixed(2)).toBe('0.92');
    });

    it('should render rig #3', function () {
      var propsArg = {};
      var supportArg = {};

      var rig = new Rig({
        x1: 0,
        x2: 15,
        y1: 100,
        y2: 50,
        curvature: .75,
        size: 50,
        direction: -.25,
        onRender: function(props, support) {
          propsArg = props;
          supportArg = support;
        }
      });

      rig.setProgress(0);

      expect(Math.round(supportArg.handle1.x)).toBe(6);
      expect(Math.round(supportArg.handle1.y)).toBe(78);

      expect(Math.round(supportArg.handle2.x)).toBe(9);
      expect(Math.round(supportArg.handle2.y)).toBe(72);

      expect(Math.round(supportArg.center.x)).toBe(7);
      expect(Math.round(supportArg.center.y)).toBe(75);

      expect(Math.round(supportArg.knee.x)).toBe(7);
      expect(Math.round(supportArg.knee.y)).toBe(75);

      expect(Math.round(supportArg.angle1)).toBe(-163);
      expect(Math.round(supportArg.angle2)).toBe(17);

      expect(supportArg.stretchRatio.toFixed(2)).toBe('1.04');
    });

    it('should render rig deltas #1', function () {
      var propsArg = {};
      var supportArg = {};

      var rig = new Rig({
        x1: 0,
        x2: { 15: 50 },
        y1: 100,
        y2: { 100: -150 },
        curvature: .75,
        size: 50,
        direction: -.25,
        onRender: function(props, support) {
          propsArg = props;
          supportArg = support;
        }
      });

      rig.setProgress(0);

      expect(Math.round(supportArg.handle1.x)).toBe(9);
      expect(Math.round(supportArg.handle1.y)).toBe(95);

      expect(Math.round(supportArg.handle2.x)).toBe(4);
      expect(Math.round(supportArg.handle2.y)).toBe(90);

      expect(Math.round(supportArg.center.x)).toBe(-1);
      expect(Math.round(supportArg.center.y)).toBe(100);

      expect(Math.round(supportArg.knee.x)).toBe(6);
      expect(Math.round(supportArg.knee.y)).toBe(93);

      expect(Math.round(supportArg.angle1)).toBe(240);
      expect(Math.round(supportArg.angle2)).toBe(210);

      expect(supportArg.stretchRatio.toFixed(2)).toBe('0.03');

      rig.setProgress(.5);

      expect(Math.round(supportArg.handle1.x)).toBe(19);
      expect(Math.round(supportArg.handle1.y)).toBe(15);

      expect(Math.round(supportArg.handle2.x)).toBe(21);
      expect(Math.round(supportArg.handle2.y)).toBe(8);

      expect(Math.round(supportArg.center.x)).toBe(20);
      expect(Math.round(supportArg.center.y)).toBe(12);

      expect(Math.round(supportArg.knee.x)).toBe(20);
      expect(Math.round(supportArg.knee.y)).toBe(12);

      expect(Math.round(supportArg.angle1)).toBe(-167);
      expect(Math.round(supportArg.angle2)).toBe(13);

      expect(supportArg.stretchRatio.toFixed(2)).toBe('3.62');

      rig.setProgress(1);

      expect(Math.round(supportArg.handle1.x)).toBe(24);
      expect(Math.round(supportArg.handle1.y)).toBe(-21);

      expect(Math.round(supportArg.handle2.x)).toBe(26);
      expect(Math.round(supportArg.handle2.y)).toBe(-29);

      expect(Math.round(supportArg.center.x)).toBe(25);
      expect(Math.round(supportArg.center.y)).toBe(-25);

      expect(Math.round(supportArg.knee.x)).toBe(25);
      expect(Math.round(supportArg.knee.y)).toBe(-25);

      expect(Math.round(supportArg.angle1)).toBe(-169);
      expect(Math.round(supportArg.angle2)).toBe(11);

      expect(supportArg.stretchRatio.toFixed(2)).toBe('5.10');
    });

    it('should render rig deltas #2', function () {
      var propsArg = {};
      var supportArg = {};

      var rig = new Rig({
        x1: { 10: 55 },
        x2: { 100: 25 },
        y1: { 15: 100 },
        y2: { 50: 250 },
        curvature: .5,
        size: 50,
        direction: -.75,
        onRender: function(props, support) {
          propsArg = props;
          supportArg = support;
        }
      });

      rig.setProgress(0);
      rig.setProgress(.5);

      expect(Math.round(supportArg.handle1.x)).toBe(44);
      expect(Math.round(supportArg.handle1.y)).toBe(127);

      expect(Math.round(supportArg.handle2.x)).toBe(45);
      expect(Math.round(supportArg.handle2.y)).toBe(139);

      expect(Math.round(supportArg.center.x)).toBe(44);
      expect(Math.round(supportArg.center.y)).toBe(133);

      expect(Math.round(supportArg.knee.x)).toBe(44);
      expect(Math.round(supportArg.knee.y)).toBe(133);

      expect(Math.round(supportArg.angle1)).toBe(-3);
      expect(Math.round(supportArg.angle2)).toBe(177);

      expect(supportArg.stretchRatio.toFixed(2)).toBe('2.33');

      rig.setProgress(.5);

      expect(Math.round(supportArg.handle1.x)).toBe(44);
      expect(Math.round(supportArg.handle1.y)).toBe(127);

      expect(Math.round(supportArg.handle2.x)).toBe(45);
      expect(Math.round(supportArg.handle2.y)).toBe(139);

      expect(Math.round(supportArg.center.x)).toBe(44);
      expect(Math.round(supportArg.center.y)).toBe(133);

      expect(Math.round(supportArg.knee.x)).toBe(44);
      expect(Math.round(supportArg.knee.y)).toBe(133);

      expect(Math.round(supportArg.angle1)).toBe(-3);
      expect(Math.round(supportArg.angle2)).toBe(177);

      expect(supportArg.stretchRatio.toFixed(2)).toBe('2.33');

      rig.setProgress(.75);

      expect(Math.round(supportArg.handle1.x)).toBe(42);
      expect(Math.round(supportArg.handle1.y)).toBe(158);

      expect(Math.round(supportArg.handle2.x)).toBe(40);
      expect(Math.round(supportArg.handle2.y)).toBe(170);

      expect(Math.round(supportArg.center.x)).toBe(41);
      expect(Math.round(supportArg.center.y)).toBe(164);

      expect(Math.round(supportArg.knee.x)).toBe(41);
      expect(Math.round(supportArg.knee.y)).toBe(164);

      expect(Math.round(supportArg.angle1)).toBe(8);
      expect(Math.round(supportArg.angle2)).toBe(188);

      expect(supportArg.stretchRatio.toFixed(2)).toBe('2.86');

      rig.setProgress(1);

      expect(Math.round(supportArg.handle1.x)).toBe(41);
      expect(Math.round(supportArg.handle1.y)).toBe(169);

      expect(Math.round(supportArg.handle2.x)).toBe(39);
      expect(Math.round(supportArg.handle2.y)).toBe(181);

      expect(Math.round(supportArg.center.x)).toBe(40);
      expect(Math.round(supportArg.center.y)).toBe(175);

      expect(Math.round(supportArg.knee.x)).toBe(40);
      expect(Math.round(supportArg.knee.y)).toBe(175);

      expect(Math.round(supportArg.angle1)).toBe(11);
      expect(Math.round(supportArg.angle2)).toBe(191);

      expect(supportArg.stretchRatio.toFixed(2)).toBe('3.06');
    });
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
