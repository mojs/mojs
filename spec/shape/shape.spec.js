// var Surface = mojs.Surface;
// var Shape = mojs.Shape2;
//
// var el = document.createElement('div');
//
// describe('`Shape` ->', function () {
//   describe('extension ->', function() {
//     it('should extend `ClassProto`', function () {
//       var shape = new Shape({
//         el: el
//       });
//       expect(Surface.__mojsClass.isPrototypeOf(shape)).toBe(true);
//     });
//
//     it('should have `_defaults`', function () {
//       var shape = new Shape({
//         el: el
//       });
//
//       expect(shape._defaults.size).toBe(100);
//       expect(shape._defaults.sizeX).toBe(undefined);
//       expect(shape._defaults.sizeY).toBe(undefined);
//     });
//
//     it('should keep `Surface` defaults', function () {
//       var shape = new Shape({
//         el: el
//       });
//
//       expect(shape._defaults.parent).toBe(document.body);
//       expect(shape._defaults.width).toBe(100);
//       expect(shape._defaults.height).toBe(100);
//     });
//
//     it('should save `Surface` defaults', function () {
//       var shape = new Shape({
//         el: el
//       });
//
//       expect(shape._surfaceDefaults.parent).toBe(document.body);
//       expect(shape._surfaceDefaults.width).toBe(100);
//       expect(shape._surfaceDefaults.height).toBe(100);
//     });
//   });
//
//   describe('`customProperties` ->', function() {
//     it('should pass new customProperties to shape', function () {
//       var shape = new Shape({
//         el: el
//       });
//
//       expect(shape._o.customProperties.pipeObj).toEqual({
//         shapeEl: shape.shape.shapeEl
//       });
//     });
//
//     it('should add `isSkipRender: true` to `size`, `sizeX` and `sizeY`', function () {
//       var shape = new Shape({
//         el: el
//       });
//
//       expect(shape._o.customProperties.size).toEqual({
//         isSkipRender: true
//       });
//
//       expect(shape._o.customProperties.sizeX).toEqual({
//         isSkipRender: true
//       });
//
//       expect(shape._o.customProperties.sizeY).toEqual({
//         isSkipRender: true
//       });
//     });
//
//     it('should add `isSkipRender: true` every non-surface property`', function () {
//       var shape = new Shape({
//         el: el,
//         width: 200,
//         height: 100,
//         k: { 20 : 100 },
//         t: { 20 : 100 },
//       });
//
//       expect(shape._o.customProperties.k).toEqual({
//         isSkipRender: true
//       });
//
//       expect(shape._o.customProperties.t).toEqual({
//         isSkipRender: true
//       });
//
//       expect(shape._o.customProperties.el).not.toBeDefined();
//       expect(shape._o.customProperties.width).not.toBeDefined();
//       expect(shape._o.customProperties.height).not.toBeDefined();
//     });
//   });
// });
