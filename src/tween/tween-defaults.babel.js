const tweenDefaults = {
  /* delay of the tween [-∞..∞] */
  delay:                  0,
  /* duration of the tween [0..∞] */
  duration:               350,
  /* repeat of the tween [0..∞], means how much to
     repeat the tween regardless first run,
     for instance repeat: 2 will make the tween run 3 times */
  repeat:                 0,
  /* speed of playback [0..∞], speed that is less then 1
     will slowdown playback, for instance .5 will make tween
     run 2x slower. Speed of 2 will speedup the tween to 2x. */
  speed:                  1,
  /* easing for the tween, could be any easing type [link to easing-types.md] */
  easing:                 'Sin.Out',
  /*
    Easing for backward direction of the tweenthe tween,
    if `null` - fallbacks to `easing` property.
    forward direction in `yoyo` period is treated as backward for the easing.
  */
  backwardEasing:         null,
  // if should reverse the tween
  isReverse:              false,
  /*  flip onUpdate's progress on each even period.
      note that callbacks order won't flip at least
      for now (under consideration). */
  isPeriodReverse:        false,
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

  onChimeIn:              function() {},
  onChimeOut:             function() {},

  onRepeatStart:          function() {},
  onRepeatComplete:       function() {},

  // onRepeatChimeIn:        function() {},
  // onRepeatChimeOut:       function() {},
  // playback callbacks, these fire only when
  // `play`, `replay`, `playBackward`, `replayBackward` were called
  onPlaybackStart:        function() {},
  onPlaybackPause:        function() {},
  onPlaybackStop:         function() {},
  onPlaybackComplete:     function() {},
  index:                  0,
  /* custom tween's name */
  name:                   null,
  /* shift time on a timeline */
  // shiftTime:              0,
  /* custom tween's base name */
  nameBase:               'Tween'
  // isChained:              false
};


export { tweenDefaults as tweenDefaults };
