// var Deltas = mojs.Deltas;
// var MotionPath = mojs.MotionPath;
// var helpers = mojs.__helpers__;
// var ClassProto = helpers.ClassProto;
// var Tweenable = helpers.Tweenable;
//
// var options = {
//   x: { '200': 300, delay: 200 },
//   y: { '200': 300 },
//   delay: 200,
//   duration: 2000,
//   onUpdate: function () {}
// };
//
// describe('`deltas` ->', function () {
//   describe('extension ->', function() {
//     it('should extend `ClassProto`', function () {
//       var deltas = Deltas();
//       expect(Tweenable.__mojsClass.isPrototypeOf(deltas)).toBe(true);
//     });
//   });
//
//   describe('main tweenie ->', function() {
//     it('should create the main tweenie', function () {
//       var options = {
//         x: { '200': 300, delay: 200 },
//         y: { '200': 300 },
//         delay: 200,
//         duration: 2000,
//         onUpdate: function () {}
//       };
//
//       var deltas = Deltas(options);
//
//       expect(deltas.tween._props.delay).toBe(options.delay);
//       expect(deltas.tween._props.duration).toBe(options.duration);
//     });
//   });
//
//   describe('timeline ->', function() {
//     it('should create the timeline', function () {
//       var options = {
//         x: { '200': 300, delay: 200 },
//         y: { '200': 300 },
//         delay: 200,
//         duration: 2000,
//         onUpdate: function () {},
//         timeline: {}
//       };
//
//       var deltas = Deltas(options);
//
//       expect(deltas.timeline).toBeDefined();
//       expect(deltas.timeline._o).toBe(options.timeline);
//       expect(deltas.timeline._items[0]).toBe(deltas.tween);
//     });
//   });
//
//   describe('`_parseProperties` / deltas parsing ->', function() {
//     it('should hold deltas with tweenies', function () {
//       var options = {
//         el: {},
//         x: { '200': 300, delay: 200 },
//         y: { '200': 300 },
//         f: 5,
//         z: { '200': 300, delay: 200 }
//       };
//
//       var deltas = Deltas(options);
//
//       expect(deltas._tweenDeltas.length).toBe(2);
//       expect(deltas._plainDeltas.length).toBe(1);
//       expect(deltas.timeline._items.length).toBe(1 + deltas._tweenDeltas.length);
//       expect(deltas._staticProps.f).toBe(5);
//       expect(deltas.timeline._items[0]).toBe(deltas.tween);
//       expect(deltas.timeline._items[1]).toBe(deltas._tweenDeltas[0].tween);
//       expect(deltas.timeline._items[2]).toBe(deltas._tweenDeltas[1].tween);
//     });
//
//     it('should set static properties on target', function () {
//       var el = {};
//       var options = {
//         el: el,
//         f: 5,
//         z: 'a'
//       };
//
//       var deltas = Deltas(options);
//
//       expect(el.f).toBe(options.f);
//       expect(el.z).toBe(options.z);
//     });
//
//     it('should pass `_el` as target to deltas', function () {
//       var options = {
//         x: { '200': 300, delay: 200 },
//         y: { '200': 300 },
//         f: 5,
//         z: { '200': 300, delay: 200 },
//         el: {}
//       };
//
//       var deltas = Deltas(options);
//
//       expect(deltas._tweenDeltas[0]._props.target).toBe(deltas._el);
//       expect(deltas._tweenDeltas[1]._props.target).toBe(deltas._el);
//       expect(deltas._plainDeltas[0]._props.target).toBe(deltas._el);
//     });
//
//     it('should create motion paths if `path` set', function () {
//       var options = {
//         el: {},
//         x: { '200': 300, delay: 200, path: 'M0,0 L100,100' },
//         y: { '200': 300 },
//         f: 5,
//         z: { '200': 300, delay: 200, path: 'M0,0 L200,200' }
//       };
//
//       var deltas = Deltas(options);
//
//       expect(MotionPath.__mojsClass.isPrototypeOf(deltas._tweenDeltas[0])).toBe(true);
//       expect(MotionPath.__mojsClass.isPrototypeOf(deltas._tweenDeltas[1])).toBe(true);
//
//       expect(deltas._tweenDeltas.length).toBe(2);
//       expect(deltas._plainDeltas.length).toBe(1);
//       expect(deltas.timeline._items.length).toBe(1 + deltas._tweenDeltas.length);
//       expect(deltas._staticProps.f).toBe(5);
//       expect(deltas.timeline._items[0]).toBe(deltas.tween);
//       expect(deltas.timeline._items[1]).toBe(deltas._tweenDeltas[0].tween);
//       expect(deltas.timeline._items[2]).toBe(deltas._tweenDeltas[1].tween);
//     });
//
//     it('should add MotionPath instances', function () {
//       var motionPath1 = new MotionPath({
//         path: 'M100,200, L300,250',
//         delay: 200
//       });
//
//       var motionPath2 = new MotionPath({
//         path: 'M100,200, L300,250'
//       });
//
//       var options = {
//         el: {},
//         x: motionPath1,
//         z: motionPath2,
//         f: 5,
//         y: { '200': 300, delay: 200, path: 'M0,0 L200,200' }
//       };
//
//       var deltas = Deltas(options);
//
//       expect(MotionPath.__mojsClass.isPrototypeOf(deltas._tweenDeltas[0])).toBe(true);
//       expect(MotionPath.__mojsClass.isPrototypeOf(deltas._plainDeltas[0])).toBe(true);
//       expect(deltas._tweenDeltas.length).toBe(2);
//
//       expect(deltas._plainDeltas.length).toBe(1);
//       expect(deltas.timeline._items.length).toBe(1 + deltas._tweenDeltas.length);
//       expect(deltas._staticProps.f).toBe(5);
//       expect(deltas.timeline._items[0]).toBe(deltas.tween);
//       expect(deltas.timeline._items[1]).toBe(deltas._tweenDeltas[0].tween);
//       expect(deltas.timeline._items[2]).toBe(deltas._tweenDeltas[1].tween);
//
//       expect(motionPath1._props.el).toBe(options.el);
//       expect(motionPath2._props.el).toBe(options.el);
//
//       expect(motionPath1._props.property).toBe('x');
//       expect(motionPath2._props.property).toBe('z');
//     });
//
//     it('should update the coordinate if not set #y', function () {
//       var motionPath1 = new MotionPath({
//         path: 'M100,200, L300,250',
//         delay: 200,
//         coordinate: 'angle'
//       });
//
//       var motionPath2 = new MotionPath({
//         path: 'M100,200, L300,250'
//       });
//
//       var options = {
//         el: {},
//         z: motionPath1,
//         y: motionPath2,
//         f: 5,
//         t: { '200': 300, delay: 200, path: 'M0,0 L200,200' }
//       };
//
//       var deltas = Deltas(options);
//
//       expect(motionPath1._props.coordinate).toBe('angle');
//       expect(motionPath2._props.coordinate).toBe('y');
//     });
//
//     it('should update the coordinate if not set #x, #angle', function () {
//       var motionPath1 = new MotionPath({
//         path: 'M100,200, L300,250',
//         delay: 200
//       });
//
//       var motionPath2 = new MotionPath({
//         path: 'M100,200, L300,250'
//       });
//
//       var motionPath3 = new MotionPath({
//         path: 'M100,200, L300,250'
//       });
//
//       var options = {
//         el: {},
//         angle: motionPath1,
//         y: motionPath2,
//         f: 5,
//         t: motionPath3
//       };
//
//       var deltas = Deltas(options);
//
//       expect(motionPath1._props.coordinate).toBe('angle');
//       expect(motionPath2._props.coordinate).toBe('y');
//       expect(motionPath3._props.coordinate).toBe('x');
//     });
//   });
//
//   describe('`_upd_deltas` function ->', function() {
//     it('should update the plain deltas', function () {
//       var options = {
//         el: {},
//         x: { '200': 300, delay: 200 },
//         y: { '200': 300 },
//         f: 5,
//         z: { '50': 125 }
//       };
//
//       var deltas = Deltas(options);
//
//       spyOn(deltas._plainDeltas[0], 'update');
//       spyOn(deltas._plainDeltas[1], 'update');
//
//       var progress = Math.random();
//       var isForward = true;
//       deltas._upd_deltas(progress, progress, isForward);
//
//       expect(deltas._plainDeltas[0].update).toHaveBeenCalledWith(progress, progress, isForward);
//       expect(deltas._plainDeltas[1].update).toHaveBeenCalledWith(progress, progress, isForward);
//     });
//
//     it('should be called by main tween onUpdate', function () {
//       var options = {
//         el: {},
//         x: { '200': 300, delay: 200 },
//         y: { '200': 300 },
//         f: 5,
//         z: { '50': 125 },
//         onUpdate: function() {}
//       };
//
//       var deltas = Deltas(options);
//       spyOn(deltas, '_upd_deltas');
//
//       var progress = Math.random();
//       var isForward = true;
//       deltas.tween._props.onUpdate(progress, progress, isForward);
//
//       expect(deltas._upd_deltas).toHaveBeenCalledWith(progress, progress, isForward);
//     });
//
//     it('should be call the render function', function () {
//       var customProperties = {
//         render: function() {}
//       };
//       var options = {
//         el: {},
//         x: { '200': 300, delay: 200 },
//         y: { '200': 300 },
//         f: 5,
//         z: { '50': 125 },
//         onUpdate: function() {}
//       };
//
//       var deltas = Deltas(options);
//       spyOn(deltas, '_render');
//
//       var progress = Math.random();
//       var isForward = true;
//       deltas.tween._props.onUpdate(progress, progress, isForward);
//
//       expect(deltas._render).toHaveBeenCalledWith(deltas._el, progress, progress, isForward);
//     });
//
//     it('should call the onUpdate', function () {
//       var options = {
//         el: {},
//         x: { '200': 300, delay: 200 },
//         y: { '200': 300 },
//         f: 5,
//         z: { '50': 125 },
//         onUpdate: function() {}
//       };
//
//       spyOn(options, 'onUpdate');
//
//       var deltas = Deltas(options);
//
//       var progress = Math.random();
//       var isForward = true;
//       deltas.tween._props.onUpdate(progress, progress, isForward);
//
//       expect(options.onUpdate).toHaveBeenCalledWith(progress, progress, isForward);
//       expect(options.onUpdate.calls.count()).toBe(1);
//     });
//   });
//
//
//   describe('`customProperties` ->', function() {
//     it('should save custom properties', function () {
//       var customProperties = {};
//       var deltas = Deltas({
//         customProperties: customProperties
//       });
//       expect(deltas._customProperties).toBe(customProperties);
//     });
//
//     it('should pass the custom Properties to deltas', function () {
//       var customProperties = {};
//       var deltas = Deltas({
//         el: {},
//         x: { '200': 300 },
//         y: { '200': 300 },
//         customProperties: customProperties
//       });
//       expect(deltas._plainDeltas[0]._o.customProperties).toBe(customProperties);
//       expect(deltas._plainDeltas[1]._o.customProperties).toBe(customProperties);
//     });
//
//     it('should save `render` function', function () {
//       var customProperties = {
//         render: function() {}
//       };
//       var deltas = Deltas({
//         el: {},
//         x: { '200': 300 },
//         y: { '200': 300 },
//         customProperties: customProperties
//       });
//       expect(deltas._render).toBe(customProperties.render);
//     });
//
//     it('should fallback to generic function for `render`', function () {
//       var customProperties = {};
//       var deltas = Deltas({
//         el: {},
//         x: { '200': 300 },
//         y: { '200': 300 },
//         customProperties: customProperties
//       });
//       expect(typeof deltas._render).toBe('function');
//     });
//   });
// });
