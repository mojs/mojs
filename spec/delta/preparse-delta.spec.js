var Tweenie = mojs.Tweenie;

var helpers = mojs.__helpers__;
var preparseDelta = helpers.preparseDelta;
var tweenieDefaults = helpers.tweenieDefaults;

describe('preparseDelta ->', function () {
  it('split tweenie options from delta', function () {
    const delta = { '20': 30, easing: function() {}, duration: 2000 };
    const result = preparseDelta(delta);

    expect(result.start).toBe('20');
    expect(result.end).toBe(30);
    expect(result.tweenieOptions).toEqual({
      easing: delta.easing,
      duration: delta.duration
    });
  });

  it('split tweenie options from delta and curve', function () {
    const delta = { '11%': '20px', curve: function() {}, delay: 2000, onUpdate: function() {} };
    const result = preparseDelta(delta);

    expect(result.start).toBe('11%');
    expect(result.end).toBe('20px');
    expect(result.tweenieOptions).toEqual({
      curve: delta.curve,
      delay: delta.delay,
      onUpdate: delta.onUpdate
    });
  });

  it('split tweenie options from tweenieDefaults', function () {
    const delta = { '7': '25rem' };

    for (var option in tweenieDefaults) {
      delta[option] = tweenieDefaults[option];
    }

    const result = preparseDelta(delta);

    expect(result.start).toBe('7');
    expect(result.end).toBe('25rem');

    for (var option in tweenieDefaults) {
      expect(result.tweenieOptions[option]).toBe(tweenieDefaults[option]);
    }
  });
});
