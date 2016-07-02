# Shape

- [CodePen Example](http://codepen.io/sol0mka/pen/XKMKjQ?editors=0010)
- [Tween API](./tweens/tween.md)
- [back](./index.md)

Full API reference:

```javascript
const shape = new mojs.Shape({
  
  /* SHAPE PROPERTIES */

  // Parent of the module. {String, Object} [selector, HTMLElement]
  parent:           document.body,

  // Class name. {String}
  className:        '',

  // Shape name. {String}
  shape:            'circle',

  // ∆ :: Stroke color. {String} [color name, rgb, rgba, hex]
  stroke:           'transparent',

  // ∆ :: Stroke Opacity. {Number} [ 0..1 ]
  strokeOpacity:    1,

  // Stroke Line Cap. {String} ['butt' | 'round' | 'square']
  strokeLinecap:    '',

  // ∆ :: Stroke Width. {Number} [ number ]
  strokeWidth:      2,

  // ∆ , Units :: Stroke Dash Array. {String, Number}
  strokeDasharray:  0,

  // ∆ , Units :: Stroke Dash Offset. {String, Number}
  strokeDashoffset: 0,

  // ∆ :: Fill Color. {String} [color name, rgb, rgba, hex]
  fill:             'deeppink',

  // ∆ :: Fill Opacity. {Number} [ 0..1 ]
  fillOpacity:      1,

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

  // ∆ :: X border radius. {Number, String}
  rx:               0,

  // ∆ :: Y border radius. {Number, String}
  ry:               0,

  // ∆ :: Points count ( for polygon, zigzag, equal ). {Number, String}
  points:           3,

  // ∆ :: Radius of the shape. {Number, String}
  radius:           50,

  // ∆ :: Radius X of the shape (fallbacks to `radius`). {Number, String}
  radiusX:          null,

  // ∆ :: Radius Y of the shape (fallbacks to `radius`). {Number, String}
  radiusY:          null,

  // If should hide module with `transforms` instead of `display`. {Boolean}
  isSoftHide:       true,

  // If should trigger composite layer for the module. {Boolean}
  isForce3d:        false,

  // If should be shown before animation starts. {Boolean}
  isShowStart:      false,

  // If should stay shown after animation ends. {Boolean}
  isShowEnd:        true,

  // Context callbacks will be called with. {Object}
  callbacksContext: this
  
  /* (+) TWEEN PROPERTIES - see Tween API */

  /* (+) TWEEN CALLBACKS - see Tween API */

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

  /* (+) TWEEN PUBLIC METHODS - see Tween API */

```

- [CodePen Example](http://codepen.io/sol0mka/pen/XKMKjQ?editors=0010)
- [Tween API](./tweens/tween.md)
- [back](./index.md)