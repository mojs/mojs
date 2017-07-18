import { generatePath } from './generate-path.babel.js';
import { staggerProperty } from './stagger-property.babel.js';

const BURST_DEFAUTLS = {
  degree: 360,
  degreeOffset: 0,
};

export const burstGenerator = (o = {}) => {
  // extend by burst defaults
  const burstOptions = {
    ...BURST_DEFAUTLS,
    ...o,
  };

  const staggerFunction = (index, total) => {
    let { degree, degreeOffset } = burstOptions;
    // if stagger properties - parse them
    degree = staggerProperty(degree, index, total);
    degreeOffset = staggerProperty(degreeOffset, index, total);
    // calculate the particle angle regarding burst generator
    const staggerAngle = degreeOffset + (index * (degree / total));
    // generate the particle path
    const path = generatePath({
      ...o,
      angle: (o.angle != null) ? o.angle : staggerAngle,
      // pass stagger `index` and `total` values
      index,
      total,
    });

    return { path };
  };

  // TODO: refactor to staggerFunction
  staggerFunction.__mojs__isStaggerFunction = true;

  return staggerFunction;
};
