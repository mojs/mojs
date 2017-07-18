// TODO: think about test coverage
import { parseEasing } from '../easing/parse-easing.babel.js';
import { getRadialPoint } from './get-radial-point.babel.js';

const defaults = {
  xEasing: 'cubic.in',
  yEasing: 'linear.none',
  count: 2,
  length: 100,
  depth: .25,
  x: 0,
  y: 0,
  angle: 90,
  startOffset: 0,
  direction: true,
  isGrow: 1,
  // stagger properties:
  index: 0,
  total: 1,
};

const getValue = (value, index, total) => {
  return (typeof value === 'function') ? value(index, total) : value;
};

export const generatePath = (options = {}) => {
  const o = {
    ...defaults,
    ...options,
  };

  const keys = Object.keys(o);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    o[key] = getValue(o[key], o.index, o.total);
  }

  // parse easing properties
  o.xEasing = parseEasing(o.xEasing);
  o.yEasing = parseEasing(o.yEasing);
  // calculate depth
  const depth = o.depth * o.length;
  // util points
  const point = {};
  const point1 = {};
  const point2 = {};
  const point3 = {};
  // get the start point
  getRadialPoint(o.x, o.y, o.startOffset, o.angle, point);
  // loop util variables
  const step = 1 / o.count;

  let flip = o.direction;

  let proc = step / 2;
  let d = `M ${point.x}, ${point.y}`;
  while (proc <= 1) {
    const yProc = (o.isGrow) ? proc : 1 - proc;
    flip = !flip;
    const yCoef = (flip) ? -1 : 1;
    // get the next center point
    getRadialPoint(point.x, point.y, o.xEasing(proc) * o.length, o.angle, point1);
    // get the curve control point, flip the direction on every segment
    const curvePointAngle = o.angle + (yCoef * 90);
    getRadialPoint(point1.x, point1.y, o.yEasing(yProc) * depth, curvePointAngle, point2);
    // get the next center point
    getRadialPoint(point.x, point.y, o.xEasing(proc + (step / 2)) * o.length, o.angle, point3);
    // add the curve - curve point + the next center segment
    d += ` Q ${point2.x}, ${point2.y} ${point3.x}, ${point3.y} `;
    // add curve to the path
    proc += step;
  }

  return d;
};
