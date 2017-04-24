const tweenieDefaults = {
  /* duration of the tween [0..∞] */
  duration:               350,
  /* delay of the tween [-∞..∞] */
  delay:                  0,
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
  /*
    onStart callback runs on very start of the tween just after onProgress
    one. Runs on very end of the tween if tween is reversed.
    @param {Boolean}  Direction of the tween.
                      `true` for forward direction.
                      `false` for backward direction(tween runs in reverse).
  */
  onStart:                function() {},
  onComplete:             function() {},
  onUpdate:               function() {},
  // `onChimeIn` is invoked when the `Tweenie` becomes active
  // kind of like `onStart` but regardless `isReverse` option
  onChimeIn:              function() {},
  // `onChimeOut` is invoked when the `Tweenie` becomes active
  // kind of like `onComplete` but regardless `isReverse` option
  onChimeOut:             function() {},
  // playback callbacks, these fire only when
  /* shift time on a timeline */
  shiftTime:              0
};

export { tweenieDefaults as tweenieDefaults };
