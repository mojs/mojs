// var helpers = mojs.__helpers__;
// var SvgShape = helpers.SvgShape;
// var svg = helpers.svg;
// var Custom = svg.Custom;

// var el = document.createElement('div');

// describe('`Custom #svg` ->', function () {
//   describe('extension ->', function() {
//     it('should extend `ClassProto`', function () {
//       var shape = new Custom({
//         el: el
//       });
//       expect(SvgShape.__mojsClass.isPrototypeOf(shape)).toBe(true);
//     });
//   });

//   describe('`_initializeShape` ->', function() {
//     it('should add `getShape` result to the root', function () {
//       const Super = Custom.__mojsClass;
//       const SomeShapeClass = Object.create(Super);

//       SomeShapeClass.getShape = function () {
//         return '<line x1="2" x2="4" y1="0" y2="0" />';
//       };

//       const SomeShape = function (o) {
//         const instance = Object.create(SomeShapeClass);
//         instance.init(o);

//         return instance;
//       };

//       var shape = new SomeShape({
//         el: el,
//       });

//       expect(shape.root.innerHTML).toEqual('<line x1="2" x2="4" y1="0" y2="0"></line>');
//     });

//     it('should add `getShape` result to the root #default', function () {
//       var shape = new Custom({
//         el: el
//       });

//       expect(shape.root.innerHTML).toEqual('<ellipse cx="50" cy="50" rx="40" ry="40"></ellipse>');
//     });
//   });

//   describe('`render` ->', function() {
//     it('should apply styles to root', function () {
//       var shape = new Custom({
//         el: el
//       });

//       var root = {
//         style: {},
//         setAttribute: function () {}
//       };
//       var props = {
//         a: 20,
//         b: '20%',
//         c: 'cyan',
//         d: 17,
//         e: 'yellow'
//       };
//       var styleKeys = [ 'a', 'b', 'c' ];

//       var support = {
//         props: props,
//         pipeObj: {
//           root: root,
//           styleKeys: styleKeys,
//         }
//       };

//       shape.render({}, support);

//       delete root.setAttribute;
//       expect(root).toEqual({
//         style: {
//           a: 20,
//           b: '20%',
//           c: 'cyan'
//         }
//       });
//     });

//     it('should cache styles', function () {
//       var shape = new Custom({
//         el: el
//       });

//       var root = {
//         style: {},
//         setAttribute: function () {}
//       };
//       var props = {
//         a: 20,
//         b: '20%',
//         c: 'cyan',
//         d: 17,
//         e: 'yellow',
//         size: 200,
//       };
//       var styleKeys = [ 'a', 'b', 'c' ];

//       var support = {
//         props: props,
//         pipeObj: {
//           root: root,
//           styleKeys: styleKeys,
//         },
//         _a: 20,
//         _b: '20%',
//       };

//       shape.render(props, support);

//       expect(root).toEqual({
//         style: {
//           c: 'cyan',
//         },
//         setAttribute: root.setAttribute
//       });
//     });

//     it('should set transform on the root', function () {
//       var shape = new Custom({
//         el: el
//       });

//       var root = {
//         style: {},
//         setAttribute: function () {}
//       };
//       var props = {
//         size: 200,
//         sizeX: 400
//       };
//       var styleKeys = [];

//       var support = {
//         props: props,
//         pipeObj: {
//           root: root,
//           styleKeys: styleKeys,
//         }
//       };

//       spyOn(root, 'setAttribute');

//       shape.render({}, support);

//       expect(root.setAttribute).toHaveBeenCalledWith('transform', 'translate(0, 0) scale(4, 2)');
//     });

//     it('should cache the transform', function () {
//       var shape = new Custom({
//         el: el
//       });

//       var root = {
//         style: {},
//         setAttribute: function () {}
//       };
//       var props = {
//         size: 100,
//         sizeX: 200
//       };
//       var styleKeys = [];

//       var support = {
//         props: props,
//         pipeObj: {
//           root: root,
//           styleKeys: styleKeys,
//         }
//       };

//       spyOn(root, 'setAttribute');

//       shape.render({}, support);

//       var transform = 'translate(0, 0) scale(2, 1)';
//       expect(root.setAttribute).toHaveBeenCalledWith('transform', transform);
//       expect(support._transform).toBe(transform);

//       shape.render({}, support);

//       expect(root.setAttribute.calls.count()).toBe(1);
//     });
//   });
// });