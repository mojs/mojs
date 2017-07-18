var MotionPath = mojs.MotionPath;
var helpers = mojs.__helpers__;
var ClassProto = helpers.ClassProto;

var path = 'M0, 0 L200, 400';
var n = 2;
describe('`motion-path` ->', function () {
  describe('extension ->', function() {
    it('should extend `ClassProto`', function () {
      var motionPath = MotionPath({ path: path, el: {} });
      expect(ClassProto.isPrototypeOf(motionPath)).toBe(true);
    });

    it('should have `_defaults`', function () {
      var motionPath = MotionPath({ path: path, el: {} });
      expect(motionPath._defaults.path).toBe('M0,0 L100,100');
      expect(motionPath._defaults.precision).toBe(140);
      expect(motionPath._defaults.el).toBe(null);
      expect(motionPath._defaults.supportProps).toBe(null);
      expect(motionPath._defaults.coordinate).toBe('x');
      expect(motionPath._defaults.customProperties).toEqual({});
      expect(motionPath._defaults.property).toBe('x');
    });

    it('should decide `target` #el', function () {
      var el = {};
      var motionPath = MotionPath({ path: path, el: el });
      expect(motionPath._target).toBe(el);
    });

    it('should decide `target` #supportProps', function () {
      var key = 'x';
      var el = {};
      var customProperties = {};
      var supportProps = {};
      customProperties[key] = {
        type: 'unit',
        isSkipRender: true
      };
      var motionPath = MotionPath({
        path: path,
        el: el,
        property: key,
        customProperties: customProperties,
        supportProps: supportProps
      });
      expect(motionPath._target).toBe(supportProps);
    });

    it('should decide `unit` #unit', function () {
      var key = 'x';
      var el = {};
      var customProperties = {};
      var supportProps = {};
      customProperties[key] = {
        type: 'unit',
        isSkipRender: true
      };
      var motionPath = MotionPath({
        path: path,
        el: el,
        property: key,
        customProperties: customProperties,
        supportProps: supportProps
      });

      expect(motionPath._unit).toBe('px');
    });

    it('should decide `unit` #unit #percent', function () {
      var key = 'x';
      var el = {};
      var customProperties = {};
      var supportProps = {};
      customProperties[key] = {
        type: 'unit',
        isSkipRender: true
      };
      var motionPath = MotionPath({
        path: path,
        unit: '%',
        el: el,
        property: key,
        customProperties: customProperties,
        supportProps: supportProps
      });

      expect(motionPath._unit).toBe('%');
    });

    it('should decide `unit` #number', function () {
      var key = 'x';
      var el = {};
      var customProperties = {};
      var supportProps = {};
      customProperties[key] = {
        type: 'number',
        isSkipRender: true
      };
      var motionPath = MotionPath({
        path: path,
        el: el,
        property: key,
        customProperties: customProperties,
        supportProps: supportProps
      });

      expect(motionPath._unit).not.toBeDefined();
    });

    it('should decide `unit` #number #2', function () {
      var key = 'x';
      var el = {};
      var supportProps = {};
      var motionPath = MotionPath({
        path: path,
        el: el,
        property: key,
        customProperties: {},
        supportProps: supportProps
      });

      expect(motionPath._unit).not.toBeDefined();
    });
  });

  describe('`path` option parsing ->', function() {
    it('should extend `ClassProto`', function () {
      var motionPath = MotionPath({ path: path, el: {} });
      expect(motionPath._path).toBeDefined();
      expect(typeof motionPath._path.style).toBe('object');
      expect(motionPath._path.style).not.toBe(null);
      expect(typeof motionPath._path.getTotalLength).toBe('function');
      expect(typeof motionPath._path.getPointAtLength).toBe('function');
    });
  });

  describe('`path` sampling ->', function() {
    it('should sample path', function () {
      var motionPath = MotionPath({ path: path, el: {} });
      expect(motionPath._samples instanceof Map).toBe(true);
      expect(motionPath._samples.size).toBe(motionPath._defaults.precision + 1);
    });

    it('should sample path #2', function () {
      var precision = 200;
      var motionPath = MotionPath({ precision: precision, path: path, el: {} });

      var number = 0;
      expect(motionPath._samples.get(number).x).toBeCloseTo(0, 3);
      expect(motionPath._samples.get(number).y).toBeCloseTo(0, 3);
      expect(motionPath._samples.get(number).angle).toBeCloseTo(0, 3);

      var number = .25;
      expect(motionPath._samples.get(number).x).toBeCloseTo(50, 3);
      expect(motionPath._samples.get(number).y).toBeCloseTo(100, 3);
      expect(motionPath._samples.get(number).angle).toBeCloseTo(63.4, 1);

      var number = .5;
      expect(motionPath._samples.get(number).x).toBeCloseTo(100, 3);
      expect(motionPath._samples.get(number).y).toBeCloseTo(200, 3);
      expect(motionPath._samples.get(number).angle).toBeCloseTo(63.4, 1);

      var number = .75;
      expect(motionPath._samples.get(number).x).toBeCloseTo(150, 3);
      expect(motionPath._samples.get(number).y).toBeCloseTo(300, 3);
      expect(motionPath._samples.get(number).angle).toBeCloseTo(63.4, 1);

      var number = 1;
      expect(motionPath._samples.get(number).x).toBeCloseTo(200, 3);
      expect(motionPath._samples.get(number).y).toBeCloseTo(400, 3);
      expect(motionPath._samples.get(number).angle).toBeCloseTo(63.4, 1);
    });

    it('should sample path #3', function () {
      var precision = 200;
      var step = 1/precision;
      var path = 'M0,208.853153 C0,208.853153 514.306345,113.17046 550.332461,338.253735 C586.358576,563.337009 77.4077083,845.512996 171.50164,428.228405 C265.595571,10.9438136 1000,1 1000,1';
      var motionPath = MotionPath({ precision: precision, path: path, el: {} });

      var number = 0;
      expect(motionPath._samples.get(number).x).toBeCloseTo(0, 3);
      expect(Math.round(motionPath._samples.get(number).y)).toBe(209);
      expect(Math.round(motionPath._samples.get(number).angle)).toBe(-90);

      var number = .25;
      expect(Math.round(motionPath._samples.get(number).x)).toBe(543);
      expect(Math.round(motionPath._samples.get(number).y)).toBe(310);
      expect(Math.round(motionPath._samples.get(number).angle)).toBe(69);

      var number = .5;
      expect(Math.round(motionPath._samples.get(number).x)).toBe(178);
      expect(Math.round(motionPath._samples.get(number).y)).toBe(600);
      expect(Math.round(motionPath._samples.get(number).angle)).toBe(59);

      var number = .75;
      expect(Math.round(motionPath._samples.get(number).x)).toBe(433);
      expect(Math.round(motionPath._samples.get(number).y)).toBe(130);
      expect(Math.round(motionPath._samples.get(number).angle)).toBe(-27);

      var number = 1;
      expect(Math.round(motionPath._samples.get(number).x)).toBe(1000);
      expect(Math.round(motionPath._samples.get(number).y)).toBe(1);
      expect(Math.round(motionPath._samples.get(number).angle)).toBe(-1);
    });
  });

  describe('`update` function ->', function() {
    it('should set the progress on the target according to coordinate #x', function () {
      var el = {};
      var coordinate = 'x';
      var property = 'x';
      var motionPath = MotionPath({
        path: path,
        el: el,
        coordinate: coordinate,
        property: property
      });

      motionPath.update(.5, .5, true);

      expect(el[coordinate]).toBeCloseTo(100, 3);
    });

    it('should set the progress on the target according to coordinate #y', function () {
      var el = {};
      var coordinate = 'y';
      var property = 'y';
      var motionPath = MotionPath({
        path: path,
        el: el,
        coordinate: coordinate,
        property: property
      });

      motionPath.update(.5, .5, true);

      expect(el[property]).toBeCloseTo(200, 3);
    });

    it('should set the progress on the target according to coordinate #y #supportProps', function () {
      var el = {};
      var coordinate = 'y';
      var property = 'y';
      var supportProps = {};
      var customProperties = {};
      customProperties[property] = {
        type: 'number',
        isSkipRender: true
      };
      var motionPath = MotionPath({
        path: path,
        el: el,
        coordinate: coordinate,
        property: property,
        customProperties: customProperties,
        supportProps: supportProps
      });

      motionPath.update(.5, .5, true);

      expect(supportProps[property]).toBeCloseTo(200, 3);
    });

    it('should set the progress on the target according to coordinate #x #y', function () {
      var el = {};
      var coordinate = 'x';
      var property = 'y';
      var motionPath = MotionPath({
        path: path,
        el: el,
        coordinate: coordinate,
        property: property
      });

      motionPath.update(.5, .5, true);

      expect(el[property]).toBeCloseTo(100, 3);
    });

    it('should set the progress on the target according to coordinate #y #x', function () {
      var el = {};
      var coordinate = 'y';
      var property = 'x';
      var motionPath = MotionPath({
        path: path,
        el: el,
        coordinate: coordinate,
        property: property
      });

      motionPath.update(.5, .5, true);

      expect(el[property]).toBeCloseTo(200, 3);
    });

    it('should set the progress on the target according to `unit` #px', function () {
      var el = {};
      var coordinate = 'x';
      var property = 'x';
      var motionPath = MotionPath({
        path: path,
        el: el,
        coordinate: coordinate,
        property: property,
        customProperties: {
          x: {
            type: 'unit'
          }
        }
      });

      motionPath.update(.5, .5, true);

      expect(parseInt(el[coordinate], 10)).toBeCloseTo(100, 3);
      expect((/px$/).test(el[coordinate])).toBe(true);
    });

    it('should set the progress on the target according to `unit` #percent', function () {
      var el = {};
      var coordinate = 'x';
      var property = 'x';
      var motionPath = MotionPath({
        path: path,
        el: el,
        coordinate: coordinate,
        property: property,
        unit: '%',
        customProperties: {
          x: {
            type: 'unit'
          }
        }
      });

      motionPath.update(.5, .5, true);

      expect(parseInt(el[coordinate], 10)).toBeCloseTo(100, 3);
      expect((/\%$/).test(el[coordinate])).toBe(true);
    });

    it('should set the progress on the target according to `unit` #percent #2', function () {
      var el = {};
      var coordinate = 'x';
      var property = 'x';
      var motionPath = MotionPath({
        path: path,
        el: el,
        coordinate: coordinate,
        property: property,
        unit: '%'
      });

      motionPath.update(.5, .5, true);

      expect(parseInt(el[coordinate], 10)).toBeCloseTo(100, 3);
      expect((/\%$/).test(el[coordinate])).toBe(true);
    });

    it('should set the progress on the target according to `unit` #percent #2', function () {
      var el = {};
      var coordinate = 'x';
      var property = 'x';
      var motionPath = MotionPath({
        path: path,
        el: el,
        coordinate: coordinate,
        property: property,
      });

      motionPath.update(.5, .5, true);

      expect(el[coordinate]).toBeCloseTo(100, 3);
      expect(typeof el[coordinate]).toBe('number');
    });

    it('should return `this`', function () {
      var el = {};
      var motionPath = MotionPath({ path: path, el: el });

      var result = motionPath.update(.5, .5, true);
      expect(result).toBe(motionPath);
    });
  });

  describe('tween creation ->', function() {
    it('should create tween if any tween property is used', function () {
      var el = {};
      var options = {
        path: path,
        el: el,
        duration: 2000
      };
      var motionPath = MotionPath(options);

      expect(motionPath.tween).toBeDefined();
      expect(motionPath.tween._props.duration).toBe(options.duration);
    });

    it('should pass `update` as `onUpdate` callback', function () {
      var el = {};
      var options = {
        path: path,
        el: el,
        duration: 2000
      };
      var motionPath = MotionPath(options);

      spyOn(motionPath, 'update');

      var progress = Math.random();
      var isForward = true;
      motionPath.tween._props.onUpdate(progress, progress, isForward);

      expect(motionPath.update).toHaveBeenCalledWith(progress, progress, isForward);
    });

    it('should call previous `onUpdate`', function () {
      var args = null;

      var el = {};
      var options = {
        path: path,
        el: el,
        duration: 2000,
        onUpdate: function() {
          args = arguments;
        }
      };
      var motionPath = MotionPath(options);

      var progress = Math.random();
      var isForward = true;

      motionPath.tween._props.onUpdate(progress/2, progress, isForward);
      expect(args[0]).toBe(progress/2);
      expect(args[1]).toBe(progress);
      expect(args[2]).toBe(isForward);
    });

    it('should not create tween if no tween property is used', function () {
      var el = {};
      var options = {
        path: path,
        el: el
      };
      var motionPath = MotionPath(options);

      expect(motionPath.tween).not.toBeDefined();
    });
  });

  describe('stagger parsing ->', function() {
    it('should parse `stagger` properties in props #path', function () {
      var paths = mojs.stagger.map('M1, 1', 'M2, 2', 'M3, 3');
      var index = 5;

      var motionPath = MotionPath({ path: paths, index: index });

      expect(motionPath._props.path).toBe(paths[index % paths.length]);
    });

    it('should parse `stagger` properties in props #el', function () {
      var els = mojs.stagger.map( {}, {}, {} );
      var index = 3;

      var motionPath = MotionPath({ el: els, index: index });

      expect(motionPath._props.el).toBe(els[index % els.length]);
    });

    it('should parse `stagger` properties in props #precision', function () {
      var index = 2;

      var motionPath = MotionPath({ precision: mojs.stagger.step(10, 20), index: index });

      expect(motionPath._props.precision).toBe(10 + index*20);
    });

    it('should parse `stagger` properties in props #coordinate', function () {
      var coords = mojs.stagger.map( 'x', 'y', 'angle' );
      var index = 3;

      var motionPath = MotionPath({ coordinate: coords, index: index });

      expect(motionPath._props.coordinate).toBe(coords[index % coords.length]);
    });

    it('should parse `stagger` properties in props #coordinate', function () {
      var props = mojs.stagger.map( 'k', 'z', 'tale' );
      var index = 12;

      var motionPath = MotionPath({ property: props, index: index });

      expect(motionPath._props.property).toBe(props[index % props.length]);
    });

    it('should pass `_totalItemsInStagger`', function () {
      var props = {
        fun: mojs.stagger.function(function() {})
      };
      var index = 3;

      spyOn(props, 'fun');
      var motionPath = MotionPath({ property: props.fun, index: index });

      expect(props.fun).toHaveBeenCalledWith(index, 1);
    });

    it('should parse burstGenerator', function () {
      var coords = [ 'x', 'y', 'angle' ];
      var index = 3;
      var path = 'M0,0 L200,25';
      var fun = function () {
          return { path: path };
      };
      fun.__mojs__isStaggerFunction = true;

      var motionPath = MotionPath({ path: fun });

      expect(motionPath._props.path).toBe(path);
    });
  });

  describe('`coordinate` option ->', function() {
    it('should set to `y` if key is `y` and no other defined', function () {
      var motionPath = MotionPath({ property: 'y' });

      expect(motionPath._props.coordinate).toBe('y');
    });

    it('should not set to `y` if it was defined', function () {
      var motionPath = MotionPath({ property: 'y', coordinate: 'z' });

      expect(motionPath._props.coordinate).toBe('z');
    });

    it('should set to `angle` if key is `angle` and no other defined', function () {
      var motionPath = MotionPath({ property: 'angle' });

      expect(motionPath._props.coordinate).toBe('angle');
    });

    it('should not set to `angle` if it was defined', function () {
      var motionPath = MotionPath({ property: 'angle', coordinate: 'tale' });

      expect(motionPath._props.coordinate).toBe('tale');
    });
  });
});
