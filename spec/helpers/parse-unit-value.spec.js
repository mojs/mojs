var parseUnitValue = mojs.__helpers__.parseUnitValue;

describe('`parse-unit-value` ->', function () {
  it('should parse any unit value', function () {
    var units = ['px', '%', 'rem', 'em', 'ex', 'cm', 'ch', 'mm', 'in', 'pt', 'pc', 'vh', 'vw', 'vmin', 'deg', 'fr'];

    for (var i = 0; i < units.length; i++) {
      var unit = units[i];
      expect(parseUnitValue('50' + unit)).toEqual({
        unit: unit,
        value: 50,
      });
    }
  });

  it('should fallback to default', function () {
    expect(parseUnitValue(25, 'fr')).toEqual({
        unit: 'fr',
        value: 25,
      });
  });

  it('should fallback to default #2', function () {
    expect(parseUnitValue('25xxx', 'rem')).toEqual({
        unit: 'rem',
        value: 25,
      });
  });
});
