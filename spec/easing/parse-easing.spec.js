// var helpers = mojs.__helpers__;
// var parseEasing = helpers.parseEasing;
//
// describe('parse-easing ->', function() {
//   it('should parse function easing', function() {
//     var fun;
//     fun = function() {};
//     expect(parseEasing(fun)).toBe(fun);
//     expect(typeof parseEasing(fun)).toBe('function');
//   });
//   it('should parse null/undefined to liner.none', function() {
//     var fun;
//     fun = parseEasing();
//     expect(fun).toBe(mojs.easing.sin.out);
//   });
//   describe('easing name option ->', function() {
//     it('should parse string easing', function() {
//       expect(parseEasing('cubic.in')).toBe(mojs.easing.cubic.in);
//     });
//     it('should error if easing was not found and fallback to linear one', function() {
//       var fun;
//       spyOn(console, 'error');
//       fun = parseEasing('sinusoidal.in');
//       expect(console.error).toHaveBeenCalled();
//       expect(typeof console.error.calls.mostRecent().args[0]).toBe('string');
//       expect(console.error.calls.mostRecent().args[1]).toBe(mojs.easing);
//       expect(fun).toBe(mojs.easing.sin.out);
//     });
//     // not yet
//     // describe('SVG path option ->', function() {
//     //   it('should parse SVG path easing', function() {
//     //     expect(typeof parseEasing('M0,100 L100,0')).toBe('function');
//     //   });
//     //   it('should call easing.path method', function() {
//     //     spyOn(window.mojs.easing, 'path');
//     //     parseEasing('M0,100 L100,0');
//     //     expect(window.mojs.easing.path).toHaveBeenCalled();
//     //   });
//     // });
//     // not yet
//     // describe('bezier option ->', function() {
//     //   it('should parse bezier easing', function() {
//     //     expect(typeof parseEasing([0.42, 0, 1, 1])).toBe('function');
//     //   });
//     //   it('should call bezier method', function() {
//     //     spyOn(window.mojs.easing, 'bezier');
//     //     parseEasing([0.42, 0, 1, 1]);
//     //     expect(window.mojs.easing.bezier).toHaveBeenCalled();
//     //   });
//     // });
//   });
// });
