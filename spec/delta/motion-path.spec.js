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
      expect(motionPath._defaults.coordinate).toBe('x');
      expect(motionPath._defaults.property).toBe('x');
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

    // TODO: add test for `precision` option

    it('should sample path #2', function () {
      var precision = 200;
      var step = 1/precision;
      var motionPath = MotionPath({ precision: precision, path: path, el: {} });

      var number = 0;
      expect(motionPath._samples.get(number).x).toBeCloseTo(0, 3);
      expect(motionPath._samples.get(number).y).toBeCloseTo(0, 3);

      var number = .25;
      expect(motionPath._samples.get(number).x).toBeCloseTo(50, 3);
      expect(motionPath._samples.get(number).y).toBeCloseTo(100, 3);

      var number = .5;
      expect(motionPath._samples.get(number).x).toBeCloseTo(100, 3);
      expect(motionPath._samples.get(number).y).toBeCloseTo(200, 3);

      var number = .75;
      expect(motionPath._samples.get(number).x).toBeCloseTo(150, 3);
      expect(motionPath._samples.get(number).y).toBeCloseTo(300, 3);

      var number = 1;
      expect(motionPath._samples.get(number).x).toBeCloseTo(200, 3);
      expect(motionPath._samples.get(number).y).toBeCloseTo(400, 3);
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
});
