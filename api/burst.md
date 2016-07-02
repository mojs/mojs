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

  // Parent of the module. {String, Object} [selector, HTMLElement]
  parent:           document.body,

  // Class name. {String}
  className:        '',

  // ∆ , Units :: Left position of the module. {Number, String}
  left:             '50%',

  // ∆ , Units :: Top position of the module. {Number, String}
  top:              '50%',

  // ∆ , Units :: X shift. {Number, String}
  x:                0,

  // ∆ , Units :: Y shift. {Number, String}
  y:                0,

  // ∆ :: Angle. {Number, String}
  angle:            0,

  // ∆ :: Scale of the module. {Number}
  scale:            1,

  // ∆ :: Explicit scaleX value (fallbacks to `scale`). {Number}
  scaleX:           null,

  // ∆ :: Explicit scaleX value (fallbacks to `scale`). {Number}
  scaleY:           null,

  // ∆ , Unit :: Origin for `x`, `y`, `scale`, `rotate` properties. {String}
  origin:           '50% 50%',

  // ∆ :: Opacity. {Number} [ 0..1 ]
  opacity:          1,

  /*
    Radius of the radial shape that child particles form. Note that it has different meaning compared to shape-swirl. Burst `radius` defines radius of the children module
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

  // If should hide module with `transforms` instead of `display`. {Boolean}
  isSoftHide:       true,

  // If should trigger composite layer for the module. {Boolean}
  isForce3d:        false,

  // If should be shown before animation starts. {Boolean}
  isShowStart:      false,

  // If should stay shown after animation ends. {Boolean}
  isShowEnd:        true,

  /*
    Options for each children ShapeSwirl element. {Object}
    Supports `Stagger` strings for numeric values and `Property Maps` overall.
    see `Stagger Strings` and `Property Maps` section for more info.
  */
  children: {
    /* (+) SHAPE SWIRL PROPERTIES AND CALLBACKS (excluding `x` and `y`) - see ShapeSwirl API */
  }
  
  // Options for timeline that controls all child and main Shape Swirls. {Object}
  timeline: {
   /* (+) TIMELINE PROPERTIES AND CALLBACKS - see Tween API */ 
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
