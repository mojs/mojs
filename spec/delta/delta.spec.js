var helpers = mojs.__helpers__;
var Delta = helpers.Delta;
var ClassProto = helpers.ClassProto;
var parseNumber = helpers.parseNumber;
var parseUnit = helpers.parseUnit;
var splitDelta = helpers.splitDelta;

var key = 'x';
var options = {
  '5': 10, duration: 200
};

describe('`delta` ->', function () {
  describe('extension ->', function() {
    it('should extend `ClassProto`', function () {
      var delta = Delta({ key: key, object: options });
      expect(ClassProto.isPrototypeOf(delta)).toBe(true);
    });

    it('should have defaults', function () {
      var delta = Delta({ key: key, object: options });
      expect(delta._defaults.key).toBe(null);
      expect(delta._defaults.object).toBe(null);
      expect(delta._defaults.customProperties).toBe(null);
    });
  });

  describe('delta parsing ->', function() {
    it('should parse delta accourding to custom properties', function () {
      const customProperties = {
        x: {
          type: 'unit',
          default: 0
        }
      }
      var key = 'x';
      var options = {
        '20': 30, duration: 2000
      };

      var delta = Delta({
        key: key,
        object: options,
        customProperties: customProperties
      });

      expect(delta._delta).toEqual(parseUnit(key, splitDelta(options)));
    });

    it('should parse delta accourding to custom properties #number', function () {
      const customProperties = {
        x: {
          type: 'number',
          default: 0
        }
      }
      var key = 'x';
      var options = {
        '20': 30, duration: 2000
      };

      var delta = Delta({
        key: key,
        object: options,
        customProperties: customProperties
      });

      expect(delta._delta).toEqual(parseNumber(key, splitDelta(options)));
    });

    it('should parse delta #number', function () {
      var key = 'x';
      var options = {
        '20': 30, duration: 2000
      };

      var delta = Delta({ key: key, object: options });
      expect(delta._delta).toEqual(parseNumber(key, splitDelta(options)));
    });

    it('should parse delta #unit', function () {
      var key = 'y';
      var options = {
        '20': '30rem', delay: 200
      };

      var delta = Delta({ key: key, object: options });
      expect(delta._delta).toEqual(parseUnit(key, splitDelta(options)));
    });
  });

  describe('update ->', function() {
    it('should be set accirding to delta type', function () {
      var key = 'z';
      var target = {};
      var options = {
        '20': 30, duration: 2000
      };
      var delta = Delta({ key: key, object: options, target: target, isIt: 1 });
      expect(delta.update).toBe(delta._upd_number);
    });

    it('should be set accirding to delta type #unit', function () {
      var key = 'z';
      var target = {};
      var options = {
        '20': '30%', duration: 2000
      };
      var delta = Delta({ key: key, object: options, target: target });
      expect(delta.update).toBe(delta._upd_unit);
    });
  });

  describe('`_upd_number` function ->', function() {
    it('should set current delta state', function () {
      var key = 'z';
      var target = {};
      var options = {
        '20': 30, duration: 2000
      };
      var delta = Delta({ key: key, object: options, target: target });

      var progress = .5;
      delta._upd_number(progress, progress, true, false);

      expect(target[key]).toBe(25);
    });
    it('should set current delta state regarding curve', function () {
      var key = 'z';
      var target = {};
      var options = {
        '20': 30, duration: 2000, curve: mojs.easing.bounce.out
      };
      var delta = Delta({ key: key, object: options, target: target });

      var progress = .5;
      delta._upd_number(progress, progress, true, false);

      expect(target[key]).toBe(mojs.easing.bounce.out(progress)*20 + progress*10);
    });

    it('should return `this`', function () {
      var key = 'z';
      var target = {};
      var options = {
        '20': '30rem', curve: mojs.easing.cubic.in
      };
      var delta = Delta({ key: key, object: options, target: target });

      var progress = .75;
      const result = delta._upd_number(progress, progress, true, false);

      expect(result).toBe(delta);
    });
  });

  describe('`_upd_unit` function ->', function() {
    it('should set current delta state', function () {
      var key = 'z';
      var target = {};
      var options = {
        '20': '30%', duration: 2000
      };
      var delta = Delta({ key: key, object: options, target: target });

      var progress = .25;
      delta._upd_unit(progress, progress, true, false);

      expect(target[key]).toBe((20 + progress*10) + '%');
    });
    it('should set current delta state regarding curve', function () {
      var key = 'z';
      var target = {};
      var options = {
        '20': '30rem', curve: mojs.easing.cubic.in
      };
      var delta = Delta({ key: key, object: options, target: target });

      var progress = .75;
      delta._upd_unit(progress, progress, true, false);

      expect(target[key]).toBe((mojs.easing.cubic.in(progress)*20 + progress*10) + 'rem');
    });

    it('should return `this`', function () {
      var key = 'z';
      var target = {};
      var options = {
        '20': '30rem', curve: mojs.easing.cubic.in
      };
      var delta = Delta({ key: key, object: options, target: target });

      var progress = .75;
      const result = delta._upd_unit(progress, progress, true, false);

      expect(result).toBe(delta);
    });
  });

  describe('tween creation ->', function() {
    it('should create tween if any tween property is used', function () {
      var key = 'z';
      var target = {};
      var options = {
        '20': '30rem', duration: 2000
      };

      var delta = Delta({ key: key, object: options });

      expect(delta._tween).toBeDefined();
      expect(delta._tween._props.duration).toBe(options.duration);
    });

    it('should pass `update` as `onUpdate` callback', function () {
      var key = 'z';
      var target = {};
      var options = {
        '20': '30rem', duration: 2000
      };

      var delta = Delta({ key: key, object: options });

      spyOn(delta, 'update');

      var progress = Math.random();
      var isForward = true;
      delta._tween._props.onUpdate(progress, progress, isForward);

      expect(delta.update).toHaveBeenCalledWith(progress, progress, isForward);
    });

    it('should call previous `onUpdate`', function () {
      var key = 'z';
      var target = {};
      var options = {
        '20': '30rem',
        duration: 2000,
        onUpdate: function() {}
      };

      var delta = Delta({ key: key, object: options, target: target });

      spyOn(delta._delta.tweenieOptions, 'onUpdate');

      var progress = Math.random();
      var isForward = true;

      delta._tween._props.onUpdate(progress, progress, isForward);
      expect(delta._delta.tweenieOptions.onUpdate).toHaveBeenCalledWith(progress, progress, isForward);
    });

    it('should not create tween if no tween property is used', function () {
      var key = 'z';
      var target = {};
      var options = {
        '20': '30rem'
      };

      var delta = Delta({ key: key, object: options });
      expect(delta._tween).not.toBeDefined();
    });
  });
});
