import Tween    from './tween/tween-scope';
// import Timeline from './tween/timeline';
import tweener  from './tween/tweener';

var mojs = {
  revision:   '2.1.0'
}

/**
 * Definitions - ES2015, Global
 */
export default mojs;
(typeof window !== 'undefined') && (window.mojs = mojs);
