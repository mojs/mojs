import h from 'src/h';
import shapesMap from 'shapes/shapesMap';
import stagger from 'src/stagger';
import tweener from 'tween/tweener';
import easing from 'easing/easing';
import Shape from 'src/shape';
import ShapeSwirl from 'src/shape-swirl';
import Burst from 'src/burst';
import Html from 'src/html';
import Spriter from 'src/spriter';
import MotionPath from 'src/motion-path';
import Tween from 'tween/tween';
import Timeline from 'tween/timeline';
import Tweenable from 'tween/tweenable';
import Thenable from 'src/thenable';
import Tunable from 'src/tunable';
import Delta from 'delta/delta';
import Deltas from 'delta/deltas';
import Module from 'src/module';

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
