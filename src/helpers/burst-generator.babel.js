import { generatePath } from './generate-path.babel.js';

const BURST_DEFAUTLS = {
  degree: 360,
};

export const burstGenerator = (o = {}) => {
  // extend by burst defaults
  const burstOptions = {
    ...BURST_DEFAUTLS,
    ...o,
  };

  const staggerFunction = (index, total) => {
    const staggerAngle = index * (burstOptions.degree / total);

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
