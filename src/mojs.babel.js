import Tween from './tween/tween-scope';
import Timeline from './tween/timeline-scope';
import tweener from './tween/tweener';

var mojs = {
  revision:   '2.2.0',
  Tween, Timeline
}

/**
 * Definitions - ES2015, Global
 */
export default mojs;
(typeof window !== 'undefined') && (window.mojs = mojs);
