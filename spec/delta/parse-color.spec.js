var helpers = mojs.__helpers__;
var parseColor = helpers.parseColor;
var makeColorObject = helpers.makeColorObject;

describe('`parseColor` ->', function () {
  it('should parse color delta', function () {
    var delta = { 'cyan': 'rgba(20, 10, 5, .25)', duration: 2000 };
    var split = splitDelta(delta);
    var name = 'name';
    var result = parseColor(name, split);
    expect(result.type).toBe('color');
    expect(result.name).toBe(name);
    expect(result.curve).toBe(split.curve);
    expect(result.tweenieOptions).toBeDefined();
    expect(result.tweenieOptions).toBe(split.tweenieOptions);

    expect(result.start).toEqual(makeColorObject('cyan'));
    expect(result.end).toEqual(makeColorObject('rgba(20, 10, 5, .25)'));
    expect(result.delta.r).toBe(20);
    expect(result.delta.g).toBe(-245);
    expect(result.delta.b).toBe(-250);
    expect(result.delta.a).toBe(-.75);
  });
});
