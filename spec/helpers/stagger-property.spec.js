// var helpers = mojs.__helpers__;
// var staggerProperty = helpers.staggerProperty;
//
// var eps = 0.0000001;
//
// describe('`staggerProperty` ->', function () {
//   describe('`map` ->', function () {
//     it('should parse `array` values', function () {
//       var array = [11, 20, 13, 45, 25];
//
//       for (var i = 0; i < 3*array.length; i++) {
//         expect(staggerProperty(array, i)).toBeDefined();
//         expect(staggerProperty(array, i)).toBe(array[i % array.length]);
//       }
//     });
//
//     it('should parse `function` values', function () {
//       var coef = Math.random();
//       var fun = function(index) {
//         return index*coef;
//       };
//
//       for (var i = 0; i < 22; i++) {
//         expect(staggerProperty(fun, i)).toBeDefined();
//         expect(staggerProperty(fun, i)).toBe(i*coef);
//       }
//     });
//
//     it('should parse `single` values', function () {
//       for (var i = 0; i < 20; i++) {
//         var prop = Math.random();
//         expect(staggerProperty(prop, i)).toBeDefined();
//         expect(staggerProperty(prop, i)).toBe(prop);
//       }
//     });
//
//   });
// });
