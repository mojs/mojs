var helpers = mojs.__helpers__;
var splitDelta = helpers.splitDelta;
var tweenieDefaults = helpers.tweenieDefaults;
var separateTweenieOptions = helpers.separateTweenieOptions;

describe('separateTweenieOptions ->', function () {
  it('split tweenie options from tweenieDefaults', function () {
    const delta = { '7': '25rem' };

    for (var option in tweenieDefaults) {
      delta[option] = tweenieDefaults[option];
    }

    const result = separateTweenieOptions(delta);
    for (var option in result) {
      expect(result[option]).toBe(tweenieDefaults[option]);
      expect(delta[option]).not.toBeDefined();
    }

    expect(Object.keys(delta).length).toBe(1);
    expect(delta['7']).toBe('25rem');
  });
});
