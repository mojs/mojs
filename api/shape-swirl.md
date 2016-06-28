# ShapeSwirl

- [CodePen Example](http://codepen.io/sol0mka/pen/pbebwQ?editors=0010)
- [Shape API](./shape.md)
- [Tween API](./tweens/tween.md)
- [back](./index.md)

Full API reference:

```javascript
const shape = new mojs.Shape({

  // ∆ :: Diviation size of sine. {Number}
  swirlSize:          10,

  // ∆ :: Frequency of sine. {Number}
  swirlFrequency:     3,

  // ∆ :: Sine length scale. {Number} [ 0..1 ]
  pathScale:          1,

  // ∆ :: Degree shift for sine path. {Number}
  degreeShift:        0,

  // [number: -1, 1] :: Directon of sine. {Number} [ -1, 1 ]
  direction:          1

  // If shape should follow sinusoidal path. {Boolean}
  isSwirl:            true
  
  /* (+) SHAPE PROPERTIES AND CALLBACKS - see Shape API */

})

  /* (+) SHAPE PUBLIC METHODS - see Shape API */

```

- [CodePen Example](http://codepen.io/sol0mka/pen/pbebwQ?editors=0010)
- [Shape API](./shape.md)
- [Tween API](./tweens/tween.md)
- [back](./index.md)