# Burst

- [CodePen Example](http://codepen.io/sol0mka/pen/JKWKVR?editors=0010)
- [ShapeSwirl API](./shape-swirl.md)
- [Stagger Strings API](./stagger.md)
- [Property Maps API](./property-maps.md)
- [Tween API](./tweens/tween.md)
- [Timeline API](./tweens/timeline.md)
- [back](./index.md)

Full API reference:

```javascript
const burst = new mojs.Burst({
  
  /* BURST PROPERTIES */

  /*
    Radius of the circular shape that children form. Note that it has different meaning compared to shape-swirl. Burst `radius` defines radius of the children module
  */
  radius:       null,

  // Quantity of Burst particles. {Number} [ > 0 ]
  count:    5,

  // Degree of circlular shape that the particles form. {Number} [ > 0 ]
  degree:   360,

  // ∆ :: Radius of the Burst. {Number}
  radius:   { 0: 50 },

  // ∆ :: Radius X of the Burst (fallbacks to `radius`). {Number}
  radiusX:  null,

  // ∆ :: Radius Y of the Burst (fallbacks to `radius`). {Number}
  radiusY:  null,

  /* (+) SHAPE SWIRL PROPERTIES AND CALLBACKS - see ShapeSwirl API */
  /* excluding -`shape` property - main burst element has no shape. */

  /*
    Options for each children ShapeSwirl element. {Object}
    Supports `Stagger` strings for numeric values and `Property Maps` overall.
    see `Stagger Strings` and `Property Maps` section for more info.
  */
  children: {
    /* (+) SHAPE SWIRL PROPERTIES AND CALLBACKS - see ShapeSwirl API */
  }
  
  // Options for timeline that controls all child and main Shape Swirls. {Object}
  timeline: {
   /* (+) TIMELINE PROPERTIES AND CALLBACKS - see ShapeSwirl API */ 
  }

})
  
  /* (+) SHAPE SWIRL PUBLIC METHODS - see Tween API */

```

- [CodePen Example](http://codepen.io/sol0mka/pen/JKWKVR?editors=0010)
- [ShapeSwirl API](./shape-swirl.md)
- [Stagger Strings API](./stagger.md)
- [Property Maps API](./property-maps.md)
- [Tween API](./tweens/tween.md)
- [Timeline API](./tweens/timeline.md)
- [back](./index.md)
