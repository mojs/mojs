var helpers = mojs.__helpers__;
var splitDelta = helpers.splitDelta;
var parseNumber = helpers.parseNumber;

describe('parseNumber ->', function () {
  it('should parse number delta', function () {
    var delta = { '20': 30, easing: function() {}, duration: 2000 };
    var split = splitDelta(delta);
    var name = 'name';
    var result = parseNumber(name, split);

    expect(result.type).toBe('number');
    expect(result.name).toBe(name);
    expect(result.start).toBe(20);
    expect(result.end).toBe(30);
    expect(result.delta).toBe(30 - 20);
    expect(result.tweenieOptions).toEqual(split.tweenieOptions);
    expect(result.curve).not.toBeDefined();
  });

  it('should parse curve', function () {
    var delta = { '20': 30, curve: 'sin.in'};
    var split = splitDelta(delta);
    var name = 'name';
    var result = parseNumber(name, split);

    expect(result.curve).toBe(split.curve);
  });
});
