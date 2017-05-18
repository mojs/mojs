var helpers = mojs.__helpers__;
var splitDelta = helpers.splitDelta;
var parseEasing = helpers.easing;
var tweenieDefaults = helpers.tweenieDefaults;

describe('splitDelta ->', function () {
  it('split tweenie options from delta', function () {
    const delta = { '20': 30, easing: function() {}, duration: 2000 };
    const result = splitDelta(delta);

    expect(result.start).toBe('20');
    expect(result.end).toBe(30);
    expect(result.tweenieOptions).toEqual({
      easing: delta.easing,
      duration: delta.duration
    });
  });

  it('split tweenie options from delta and curve', function () {
    const delta = { '11%': '20px', curve: 'sin.in', delay: 2000, onUpdate: function() {} };
    const result = splitDelta(delta);

    expect(result.start).toBe('11%');
    expect(result.end).toBe('20px');
    expect(result.curve).toBe(parseEasing(delta.curve));
    expect(result.tweenieOptions).toEqual({
      delay: delta.delay,
      onUpdate: delta.onUpdate
    });
  });

  it('split tweenie options from tweenieDefaults', function () {
    const delta = { '7': '25rem' };

    for (var option in tweenieDefaults) {
      delta[option] = tweenieDefaults[option];
    }

    const result = splitDelta(delta);

    expect(result.start).toBe('7');
    expect(result.end).toBe('25rem');
    expect(result.curve).not.toBeDefined();

    for (var option in tweenieDefaults) {
      expect(result.tweenieOptions[option]).toBe(tweenieDefaults[option]);
    }
  });
});
