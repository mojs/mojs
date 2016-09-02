# Approximate

- [CodePen Example](http://codepen.io/sol0mka/pen/LZWRMm?editors=0010)
- [back](/api/readme.md)

The `approximate` function samples any given function with slow running time and returns new easing function with very fast one. The result still slower than `base easing functions` and may contain a tiny approximation error (by default less than `0.0001`).

The syntax:

```javascript
  var fastEasing = mojs.easing.approximate( slowEasing, n = 4 );
  // where `n` is optional quantity of samples as `10^n` (larger `n` - smaller error).
```

Another strategy for the `approximate` function is to feed it with precomputed `JSON` data to same `CPU` pressure from presampling the slow function:

```javascript
  var samples = require('./samples.json');
  var fastEasing = mojs.easing.approximate( slowEasing, samples );
  // where `samples` is `JSON` object that contains presampled data.
```

You can have the presampled data by calling `getSamples` function:

```javascript
  var fastEasing = mojs.easing.approximate( slowEasing );
  var samples = fastEasing.getSamples();
```

- [CodePen Example](http://codepen.io/sol0mka/pen/LZWRMm?editors=0010)
- [back](/api/readme.md)