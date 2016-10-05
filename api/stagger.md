# stagger

References:

- [CodePen Example](http://codepen.io/sol0mka/pen/68c596ca7444cb3df7b66b84fb1fd5c6?editors=0010)
- [back](./readme.md)

Contents:

  - [Basic Usage](#basic-usage)
  - [Full API Reference](#full-api-reference)

### Basic Usage:

`stagger` is a function `not cunstructor!` that wraps `ANY` module to create staggered animations. You can treat `stagger` function as a `prism` is mounted on top of modules and splits input properties evenly between them:

```javascript
// wrap shape in stagger
const StaggeredShape = mojs.stagger( mojs.Shape );
// now you can have staggered syntax on the shape and create multiple shapes at once. the next code will produce 5 shapes
const shapes = new StaggeredShape({
  // quantifier defines number of modules to create
  quantifier:   5,
  // each module will have the same scale transition
  scale:        { 1: 0 }
});

```

[CodePen Example](http://codepen.io/sol0mka/pen/81885a6b6125bc73b0665b5816b12012?editors=0010)

You can use `array` to specify property value for each shape:

```javascript
// wrap shape in stagger
const StaggeredShape = mojs.stagger( mojs.Shape );
// now you can have staggered syntax on the shape and create multiple shapes at once. the next code will produce 5 shapes
const shapes = new StaggeredShape({
  // quantifier defines number of modules to create
  quantifier:   5,
  // each module will receive value from this array. if array is smaller than amount of modules (4 vs 5), the stagger prism will loop on the array, thus `5th` item will receive value by `index = 0`, `6th` item will receive value by `index = 1` and so on. This is called `property map` because it maps properties array to modules inside stagger.
  scale: [ 1, 2, 2.5, 3 ]
});

```

[CodePen Example](http://codepen.io/sol0mka/pen/78c17f405451e644cb424db364266015?editors=0010)

Since `stagger` is just a prism that splits input options evenly, you can use the `property maps` with `delta` values too - it will just split that values among modules:

```javascript
// wrap shape in stagger
const StaggeredShape = mojs.stagger( mojs.Shape );
// now you can have staggered syntax on the shape and create multiple shapes at once. the next code will produce 5 shapes
const shapes = new StaggeredShape({
  // quantifier defines number of modules to create
  quantifier:   5,
  // each odd module will receive `{ 1 : 0 }` delta, each even one will receive `{ 0 : 1 }` delta
  scale: [ { 1 : 0 }, { 0 : 1 } ],
  // static values for x
  x: [ 50, 100, 150, 200, 250 ]
});

```

[CodePen Example](http://codepen.io/sol0mka/pen/f5362ba5fb0cf9091a6997a82f1cba73?editors=0010)

You can use `stagger` string incremental properties:

```javascript
// wrap shape in stagger
const StaggeredShape = mojs.stagger( mojs.Shape );
// now you can have staggered syntax on the shape and create multiple shapes at once. the next code will produce 5 shapes
const shapes = new StaggeredShape({
  // quantifier defines number of modules to create
  quantifier:   5,
  // the value of the property will be increased for each module with specified `step`(.25), starting from the `initial value`(1). Step could be `positive` or `negative`.
  scale: 'stagger(1, .25)'
});

```

[CodePen Example](http://codepen.io/sol0mka/pen/dd71c464c891b79b561b663f31c17804?editors=0010)

The `initial value` could be omitted - it will fallback to `0`:

```javascript
// wrap shape in stagger
const StaggeredShape = mojs.stagger( mojs.Shape );
// now you can have staggered syntax on the shape and create multiple shapes at once. the next code will produce 5 shapes
const shapes = new StaggeredShape({
  // quantifier defines number of modules to create
  quantifier:   5,
  // this means stagger with step of `.5` starting from 0
  scale: 'stagger(.5)'
});

```

[CodePen Example](http://codepen.io/sol0mka/pen/39a051dfdaed0d565c1acef5117effc7?editors=0010)

`stagger` strings can be used inside `deltas` and `rand` expressions:

```javascript
// wrap shape in stagger
const StaggeredShape = mojs.stagger( mojs.Shape );
// now you can have staggered syntax on the shape and create multiple shapes at once. the next code will produce 5 shapes
const shapes = new StaggeredShape({
  // quantifier defines number of modules to create
  quantifier:   5,
  // animate scale from `0` to staggered value (`1` for 1st module, `1.25` for 2nd, `1.5` for 3rd etc.)
  scale: { 0: 'stagger(1, .25)' },
  // random value in range from `0` to staggered value (`200` for 1st module, `400` for 2nd, `600` for 3rd etc.)
  x: 'rand(0, stagger(200))'
});

```

[CodePen Example](http://codepen.io/sol0mka/pen/097474f0a97e492adf87fc24b68cf05c?editors=0010)

### Full API Reference

```javascript
const shape = new mojs.Shape({
  // how many modules to create. {Number, String} [amount of modules, property name]
  // if `string` is set instead of `number` it is treated as `property name` pointer - the number of modules will be inferred on value of that property, for instance if `quantifier` is set to `el` and `el` property has `array like` as it's value - quantifier will be set to length of that array.
  quantifier: 'el',
  // options for timeline that controls all modules
  timeline: {},
  /*
    Module's properties and callbacks, depends on what module has been wrapped into stagger, please see wrapped module API reference.
  */
})
/*
  Creates next state transition chain.
  @param options {Object} Next shape state.
*/
.then({ /* next state options */ })

/*
  Tunes start state with new options.
  @param options {Object} New start properties.
*/
.tune({ /* new start properties */ })

/*
  Regenerates all randoms in initial properties.
*/
.generate()
/*
  Starts playback.
  @param shift {Number} Start progress shift in milliseconds.
*/
.play( shift = 0 )
/*
  Starts playback in backward direction.
  @param shift {Number} Start progress shift in milliseconds.
*/
.playBackward( shift = 0 )
/*
  Pauses playback.
*/
.pause()
/*
  Restarts playback.
  @param shift {Number} Start progress shift in milliseconds.
*/
.replay( shift = 0 )
/*
  Restarts playback in backward direction.
  @param shift {Number} Start progress shift in milliseconds.
*/
.replayBackward( shift = 0 )
/*
  Resumes playback in direction it was prior to `pause`.
  @param shift {Number} Start progress shift in milliseconds.
*/
.resume( shift = 0 )
/*
  Sets progress of the tween.
  @param progress {Number} Progress to set [ 0..1 ].
*/
.setProgress( progress )
/*
  Sets speed of the tween.
  @param speed {Number} Progress to set [ 0..∞ ].
*/
setSpeed ( speed )
/* Stops and resets the tween. */
reset ( speed );
```

- [back](./readme.md)