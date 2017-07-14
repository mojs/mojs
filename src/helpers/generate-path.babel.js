// TODO: think about test coverage
import { parseEasing } from '../easing/parse-easing';
import { getRadialPoint } from './get-radial-point';

const defaults = {
    xDumpEasing: 'cubic.in',
    yDumpEasing: 'linear.none',
    count: 4,
    length: 200,
    depth: 1,
    x: 250,
    y: 250,
    angle: 90,
    initialShift: 0,
    isGrow: 1
};

export const generatePath = (options = {}) => {
    const o = {
        ...defaults,
        ...options,
    };
    // parse easing properties
    o.xDumpEasing = parseEasing(o.xDumpEasing);
    o.yDumpEasing = parseEasing(o.yDumpEasing);
    // calculate depth
    const depth = o.depth * o.length;
    // util points
    let point = {};
    let point1 = {};
    let point2 = {};
    let point3 = {};
    // get the start point
    getRadialPoint(o.x, o.y, o.initialShift, o.angle, point);
    // loop util variables
    const step = 1 / o.count;
    let flip = false;
    let proc = step / 2;
    let d = `M ${point.x}, ${point.y}`;
    while (proc <= 1) {
        const yProc = (o.isGrow) ? proc : 1 - proc;
        const yCoef = (flip = !flip) ? -1 : 1;
        // get the next center point
        getRadialPoint(point.x, point.y, o.xDumpEasing(proc) * o.length, o.angle, point1);
        // get the curve control point, flip the direction on every segment
        getRadialPoint(point1.x, point1.y, o.yDumpEasing(yProc) * depth, o.angle + (yCoef * 90), point2);
        // get the next center point 
        getRadialPoint(point.x, point.y, o.xDumpEasing(proc + (step / 2)) * o.length, o.angle, point3);
        // add the curve - curve point + the next center segment
        d += ` Q ${point2.x}, ${point2.y} ${point3.x}, ${point3.y} `;
        // add curve to the path
        proc += step;
    }

    return d;
};