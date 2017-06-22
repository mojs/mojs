// var helpers = mojs.__helpers__;
// var splitDelta = helpers.splitDelta;
// var tweenDefaults = helpers.tweenDefaults;
// var separateTweenOptions = helpers.separateTweenOptions;
//
// describe('separateTweenOptions ->', function () {
//   it('split tween options from tweenDefaults', function () {
//     const delta = { '7': '25rem' };
//
//     for (var option in tweenDefaults) {
//       delta[option] = tweenDefaults[option];
//     }
//
//     const result = separateTweenOptions(delta);
//     for (var option in result) {
//       expect(result[option]).toBe(tweenDefaults[option]);
//       expect(delta[option]).not.toBeDefined();
//     }
//
//     expect(Object.keys(delta).length).toBe(1);
//     expect(delta['7']).toBe('25rem');
//   });
// });
