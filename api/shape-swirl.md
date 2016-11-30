# ShapeSwirl

- [CodePen Example](http://codepen.io/sol0mka/pen/pbebwQ?editors=0010)
- [Shape API](./shape.md)
- [Tween API](./tweens/tween.md)
- [back](./readme.md)

Full API reference:

```javascript
const shapeSwirl = new mojs.ShapeSwirl({

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

- [CodePen Example](http://codepen.io/sol0mka/pen/pbebwQ?editors=0010)
- [Shape API](./shape.md)
- [Tween API](./tweens/tween.md)
- [back](./readme.md)
