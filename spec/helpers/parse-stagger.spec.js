// var helpers = mojs.__helpers__;
// var parseStagger = helpers.parseStagger;
//
// describe('`staggerProperty` ->', function () {
//   it('should return the value if not `stagger`', function () {
//
//     var values = [ 20, '30', '15px', '6%', '2rem', function() {} ];
//
//     for (var i = 0; i< values.length; i++) {
//       expect(parseStagger(values[i], 1)).toBe(values[i]);
//     }
//   });
//
//   it('should parse `stagger` values', function () {
//     var value = 'stagger(20, 20)';
//
//     expect(parseStagger(value, 0)).toBe(20);
//     expect(parseStagger(value, 1)).toBe(40);
//     expect(parseStagger(value, 2)).toBe(60);
//     expect(parseStagger(value, 3)).toBe(80);
//     expect(parseStagger(value, 4)).toBe(100);
//   });
//
//   it('should parse `stagger` values with units', function () {
//     var value = 'stagger(15%, 20)';
//
//     expect(parseStagger(value, 0)).toBe('15%');
//     expect(parseStagger(value, 1)).toBe('35%');
//     expect(parseStagger(value, 2)).toBe('55%');
//     expect(parseStagger(value, 3)).toBe('75%');
//     expect(parseStagger(value, 4)).toBe('95%');
//   });
//
//   it('should parse `stagger` values with units #negative base', function () {
//     var value = 'stagger(-15rem, 20)';
//
//     expect(parseStagger(value, 0)).toBe('-15rem');
//     expect(parseStagger(value, 1)).toBe('5rem');
//     expect(parseStagger(value, 2)).toBe('25rem');
//     expect(parseStagger(value, 3)).toBe('45rem');
//     expect(parseStagger(value, 4)).toBe('65rem');
//   });
//
//   it('should parse `stagger` values with units #negative step', function () {
//     var value = 'stagger(100fr, -7)';
//
//     expect(parseStagger(value, 0)).toBe('100fr');
//     expect(parseStagger(value, 1)).toBe('93fr');
//     expect(parseStagger(value, 2)).toBe('86fr');
//     expect(parseStagger(value, 3)).toBe('79fr');
//     expect(parseStagger(value, 4)).toBe('72fr');
//   });
//
//   it('should assume `0` if only one value provided', function () {
//     var value = 'stagger(10)';
//
//     expect(parseStagger(value, 0)).toBe(0);
//     expect(parseStagger(value, 1)).toBe(10);
//     expect(parseStagger(value, 2)).toBe(20);
//     expect(parseStagger(value, 3)).toBe(30);
//     expect(parseStagger(value, 4)).toBe(40);
//   });
// });
