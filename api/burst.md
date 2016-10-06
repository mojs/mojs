# Burst

- [CodePen Example](http://codepen.io/sol0mka/pen/JKWKVR?editors=0010)
- [ShapeSwirl API](./shape-swirl.md)
- [Stagger Strings API](./syntax/stagger.md)
- [Property Maps API](./syntax/property-maps.md)
- [Tween API](./tweens/tween.md)
- [Timeline API](./tweens/timeline.md)
- [back](./readme.md)

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

  // If refresh state on subsequent plays. {Boolean}
  isRefreshState:   true,

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
  reset ( speed )

```

- [CodePen Example](http://codepen.io/sol0mka/pen/JKWKVR?editors=0010)
- [ShapeSwirl API](./shape-swirl.md)
- [Stagger Strings API](./syntax/stagger.md)
- [Property Maps API](./syntax/property-maps.md)
- [Tween API](./tweens/tween.md)
- [Timeline API](./tweens/timeline.md)
- [back](./readme.md)
