var helpers = mojs.__helpers__;
var splitDelta = helpers.splitDelta;
var parseEasing = helpers.parseEasing;
var tweenDefaults = helpers.tweenDefaults;

describe('splitDelta ->', function () {
  it('split tween options from delta', function () {
    const delta = { '20': 30, easing: function() {}, duration: 2000 };
    const result = splitDelta(delta);

    expect(result.start).toBe('20');
    expect(result.end).toBe(30);
    expect(result.tweenOptions).toEqual({
      easing: delta.easing,
      duration: delta.duration
    });
  });

  it('split tween options from delta and curve', function () {
    const delta = { '11%': '20px', curve: 'sin.in', delay: 2000, onUpdate: function() {} };
    const result = splitDelta(delta);

    expect(result.start).toBe('11%');
    expect(result.end).toBe('20px');
    expect(result.curve).toBe(parseEasing(delta.curve));
    expect(result.tweenOptions).toEqual({
      delay: delta.delay,
      onUpdate: delta.onUpdate
    });
  });

  it('split tween options from tweenDefaults', function () {
    const delta = { '7': '25rem' };

    for (var option in tweenDefaults) {
      delta[option] = tweenDefaults[option];
    }

    const result = splitDelta(delta);

    expect(result.start).toBe('7');
    expect(result.end).toBe('25rem');
    expect(result.curve).not.toBeDefined();

    for (var option in tweenDefaults) {
      expect(result.tweenOptions[option]).toBe(tweenDefaults[option]);
    }
  });

  it('should work with `from` and `to` syntax', function () {
    const delta = { from: '11%', to: '20px', curve: 'sin.in', delay: 2000, onUpdate: function() {} };
    const result = splitDelta(delta);

    expect(result.start).toBe('11%');
    expect(result.end).toBe('20px');
    expect(result.curve).toBe(parseEasing(delta.curve));
    expect(result.tweenOptions).toEqual({
      delay: delta.delay,
      onUpdate: delta.onUpdate
    });
  });
});
