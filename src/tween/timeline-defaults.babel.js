import tweenDefaults from './tween-defaults';

/**
 * `Timeline` defaults are the same as `Tween` defaults with few changes.
 */
export default {
  ...tweenDefaults,
  // duration is aways `0` - it gets calculated based on children durations
  duration: 0,
  // easing is `linear` by default
  easing:   'Linear.None',
  // backward easing is `linear` by default
  easing:  'Linear.None',
};
