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
});
