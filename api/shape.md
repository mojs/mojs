# Shape

- [CodePen Example](http://codepen.io/sol0mka/pen/bbd4fe6c1ac8519c76bc18828844e2c3)
- [Tween API](./tweens/tween.md)
- [back](./readme.md)

Full API reference:

```javascript
const shape = new mojs.Shape({
  
  /* SHAPE PROPERTIES */

  // Parent of the module. {String, Object} [selector, HTMLElement]
  parent:           document.body,

  // Class name. {String}
  className:        '',

  // Shape name. {String} [ 'circle' | 'rect' | 'polygon' | 'line' | 'cross' | 'equal' | 'curve' | 'zigzag' | '*custom defined name*' ]
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

  // If refresh state on subsequent plays. {Boolean}
  isRefreshState:   true,

  // Context callbacks will be called with. {Object}
  callbacksContext: this
  
  /* TWEEN PROPERTIES */
  // Duration {Number}
  duration:       350,
  // Delay {Number}
  delay:          0,
  // If should repeat after animation finished {Number} *(1)
  repeat:         0,
  // Speed of the tween {Number}[0..∞]
  speed:          1,
  // If the progress should be flipped on repeat animation end {Boolean}
  yoyo:           false,
  // Easing function {String, Function}[ easing name, path coordinates, bezier string, easing function ]
  easing:         'sin.out',
  // Easing function for backward direction of the tween animation (fallbacks to `easing`) {String, Function}[ easing name, path coordinates, bezier string, easing function ]
  backwardEasing: null,

  /* TWEEN CALLBACKS */
  /*
    Fires on every update of the tween in any period (including delay periods). You probably want to use `onUpdate` method instead.
    @param p {Number} Normal (not eased) progress.
    @param isForward {Boolean} Direction of the progress.
    @param isYoyo {Boolean} If in `yoyo` period.
  */
  onProgress (p, isForward, isYoyo) {},
  /*
    Fires when tween's the entire progress reaches `0` point(doesn't fire in repeat periods).
    @param isForward {Boolean} If progress moves in forward direction.
    @param isYoyo {Boolean} If progress inside `yoyo` flip period.
  */
  onStart (isForward, isYoyo) {},
  /*
    Fires when tween's the progress reaches `0` point in normal or repeat period.
    @param isForward {Boolean} If progress moves in forward direction.
    @param isYoyo {Boolean} If progress inside `yoyo` flip period.
  */
  onFirstUpdate (isForward, isYoyo) {},
  /*
    Fires on first update of the tween in sufficiently active period (excluding delay periods).
    @param ep {Number} Eased progress.
    @param p {Number} Normal (not eased) progress.
    @param isForward {Boolean} Direction of the progress.
    @param isYoyo {Boolean} If in `yoyo` period.
  */
  onUpdate (ep, p, isForward, isYoyo) {},
  /*
    Fires when tween's the progress reaches `1` point in normal or repeat period.
    @param isForward {Boolean} If progress moves in forward direction.
    @param isYoyo {Boolean} If progress inside `yoyo` flip period.
  */
  onRepeatComplete (isForward, isYoyo) {},
  /*
    Fires when tween's the entire progress reaches `1` point(doesn't fire in repeat periods).
    @param isForward {Boolean} If progress moves in forward direction.
    @param isYoyo {Boolean} If progress inside `yoyo` flip period.
  */
  onComplete (isForward, isYoyo) {},
  /* Fires when the `.play` method called and tween isn't in play state yet. */
  onPlaybackStart () {},
  /* Fires when the `.pause` method called and tween isn't in pause state yet. */
  onPlaybackPause () {},
  /* Fires when the `.stop` method called and tween isn't in stop state yet. */
  onPlaybackStop () {},
  /* Fires when the tween end's animation (regardless progress) */
  onPlaybackComplete () {},

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

- [CodePen Example](http://codepen.io/sol0mka/pen/bbd4fe6c1ac8519c76bc18828844e2c3)
- [Tween API](./tweens/tween.md)
- [back](./readme.md)