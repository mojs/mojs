// var helpers = mojs.__helpers__;
// var splitDelta = helpers.splitDelta;
// var parseUnit = helpers.parseUnit;
//
// describe('parseUnit ->', function () {
//   it('should parse number delta #end', function () {
//     var delta = { '20': '30rem', easing: function() {}, duration: 2000 };
//     var split = splitDelta(delta);
//     var name = 'name';
//     var result = parseUnit(name, split);
//
//     expect(result.type).toBe('unit');
//     expect(result.name).toBe(name);
//     expect(result.start).toBe(20);
//     expect(result.end).toBe(30);
//     expect(result.delta).toBe(30 - 20);
//     expect(result.unit).toBe('rem');
//     expect(result.tweenOptions).toEqual(split.tweenOptions);
//     expect(result.curve).not.toBeDefined();
//   });
//
//   it('should parse number delta #start', function () {
//     var delta = { '20%': '30', easing: function() {}, duration: 2000 };
//     var split = splitDelta(delta);
//     var name = 'name';
//     var result = parseUnit(name, split);
//
//     expect(result.type).toBe('unit');
//     expect(result.name).toBe(name);
//     expect(result.start).toBe(20);
//     expect(result.end).toBe(30);
//     expect(result.delta).toBe(30 - 20);
//     expect(result.unit).toBe('%');
//     expect(result.tweenOptions).toEqual(split.tweenOptions);
//     expect(result.curve).not.toBeDefined();
//   });
//
//   it('should have priority for end', function () {
//     var delta = { '20%': '30fr', easing: function() {}, duration: 2000 };
//     var split = splitDelta(delta);
//     var name = 'name';
//     var result = parseUnit(name, split);
//
//     expect(result.type).toBe('unit');
//     expect(result.name).toBe(name);
//     expect(result.start).toBe(20);
//     expect(result.end).toBe(30);
//     expect(result.delta).toBe(30 - 20);
//     expect(result.unit).toBe('fr');
//     expect(result.tweenOptions).toEqual(split.tweenOptions);
//     expect(result.curve).not.toBeDefined();
//   });
//
//   it('should fallback to `px`', function () {
//     var delta = { '20': '30', easing: function() {}, duration: 2000 };
//     var split = splitDelta(delta);
//     var name = 'name';
//     var result = parseUnit(name, split);
//
//     expect(result.type).toBe('unit');
//     expect(result.name).toBe(name);
//     expect(result.start).toBe(20);
//     expect(result.end).toBe(30);
//     expect(result.delta).toBe(30 - 20);
//     expect(result.unit).toBe('px');
//     expect(result.tweenOptions).toEqual(split.tweenOptions);
//     expect(result.curve).not.toBeDefined();
//   });
//
// });
