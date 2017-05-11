const tweenieDefaults = {
  /* duration of the tween [0..∞] */
  duration:               350,
  /* delay of the tween [-∞..∞] */
  delay:                  0,
  /* speed of playback [0..∞], speed that is less then 1
     will slowdown playback, for instance .5 will make tween
     run 2x slower. Speed of 2 will speedup the tween to 2x. */
  speed:                  1,
  /* repeat of the tween [0..∞], means how much to
     repeat the tween regardless first run,
     for instance repeat: 2 will make the tween run 3 times */
  /* easing for the tween, could be any easing type [link to easing-types.md] */
  easing:                 'Sin.Out',
  /*
    Easing for backward direction of the tweenthe tween,
    if `null` - fallbacks to `easing` property.
    forward direction in `yoyo` period is treated as backward for the easing.
  */
  backwardEasing:         null,
  /* if should reverse the tween */
  isReverse:              false,

  onUpdate:               function() {},

  /*
    onStart callback runs on very start of the tween just after onProgress
    one. Runs on very end of the tween if tween is reversed.
    @param {Boolean}  Direction of the tween.
                      `true` for forward direction.
                      `false` for backward direction(tween runs in reverse).
  */
  onStart:                function() {},
  onComplete:             function() {},
  // `onChimeIn` is invoked when the `Tweenie` becomes active
  // kind of like `onStart` but regardless `isReverse` option
  onChimeIn:              function() {},
  // `onChimeOut` is invoked when the `Tweenie` becomes active
  // kind of like `onComplete` but regardless `isReverse` option
  onChimeOut:             function() {},
  /**
   * onSkip - callback is called when progress runs over the `_end` time
   * and then suddenly goes before the `_start` time. Indecates that
   * progress (1) should be refreshed to (0), or vice versa.
   *
   * @param {Boolean} isForward
   *                    - `true` if skipped in forward direction
   *                    - `false` if skipped in backward direction
   */
  onSkip:                 function() {},
  // playback callbacks, these fire only when
  // `play`, `replay`, `playBackward`, `replayBackward` were called
  onPlaybackStart:        function() {},
  onPlaybackPause:        function() {},
  onPlaybackStop:         function() {},
  onPlaybackComplete:     function() {},
  // tweenie index
  index:                  0
};

export { tweenieDefaults as tweenieDefaults };
