import h from './h';
import shapesMap from 'shapes/shapesMap';
import stagger from './stagger';
import tweener from 'tween/tweener';
import easing from 'easing/easing';
import Shape from './shape';
import ShapeSwirl from './shape-swirl';
import Burst from './burst';
import Html from './html';
import Spriter from './spriter';
import MotionPath from './motion-path';
import Tween from 'tween/tween';
import Timeline from 'tween/timeline';
import Tweenable from 'tween/tweenable';
import Thenable from './thenable';
import Tunable from './tunable';
import Delta from 'delta/delta';
import Deltas from 'delta/deltas';
import Module from './module';

let mojs = {
  revision: build.revision,
  isDebug: build.mode !== 'production',
  helpers: h,
  Shape,
  ShapeSwirl,
  Burst,
  Html,
  stagger,
  Spriter,
  MotionPath,
  Tween,
  Timeline,
  Tweenable,
  Thenable,
  Tunable,
  Module,
  tweener,
  easing,
  shapesMap,
  _pool: {
    Delta,
    Deltas,
  },
  h,
  delta: h.delta,
  addShape: shapesMap.addShape,
  CustomShape: shapesMap.custom,
  Transit: Shape,
  Swirl: ShapeSwirl,
};

if (typeof window !== 'undefined') {
  window.mojs = mojs;
}

export default mojs;
