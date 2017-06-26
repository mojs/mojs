const tweenDefaults = {
  // delay of the tween [-∞..∞]
  delay: 0,
  // duration of the tween [0..∞]
  duration: 350,
  // speed of playback [0..∞], speed that is less then 1
  // will slowdown playback, for instance .5 will make tween
  // run 2x slower. Speed of 2 will speedup the tween to 2x.
  speed: 1,
  // easing for the tween, could be any easing type
  easing: 'Sin.Out',
  // Easing for backward direction of the tweenthe tween,
  // if `null` - fallbacks to `easing` property.
  // forward direction in `yoyo` period is treated as backward for the easing.
  backwardEasing: null,
  // if should reverse the tween
  isReverse: false,
  // how many times repeat the tween (excluding the first run)
  repeat: 0,
  // if should `reverse` before repeating
  isReverseOnRepeat: false,
  // `onUpdate` callback is called on every animation frame
  onUpdate(ep, p, isForward) {}, // eslint-disable-line no-unused-vars
  /*
    onStart callback runs on very start of the tween just after onProgress
    one. Runs on very end of the tween if tween is reversed.
    @param {Boolean}  Direction of the tween.
                      `true` for forward direction.
                      `false` for backward direction(tween runs in reverse).
  */
  onStart() {},
  onComplete() {},
  // `onChimeIn` is invoked when the `Tween` becomes active
  // kind of like `onStart` but regardless `isReverse` option
  onChimeIn() {},
  // `onChimeOut` is invoked when the `Tween` becomes active
  // kind of like `onComplete` but regardless `isReverse` option
  onChimeOut() {},
  // onRefresh - callback is called when progress runs over the `_end` time
  // and then suddenly goes before the `_start` time. Indecates that
  // progress (1) should be refreshed to (0), or vice versa.
  // @param {Boolean} isForward
  //                    - `true` if skipped in forward direction
  //                    - `false` if skipped in backward direction
  onRefresh() {},
  // playback callbacks, these fire only when
  // `play`, `replay`, `playBackward`, `replayBackward` called
  onPlaybackStart() {},
  onPlaybackPause() {},
  onPlaybackStop() {},
  onPlaybackComplete() {},
  // tween index
  index: 0,
  // shift time - mostly needed for timeline
  shiftTime: 0,
};

export { tweenDefaults };
