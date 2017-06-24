import { Surface } from '../surface';

/* ------------------ */
/* The `Shape` class  */
/* ------------------ */

const Super = Surface.__mojsClass;
const Shape = Object.create(Super);

/**
 * Imitate `class` with wrapper.
 *
 * @param {Object} Options object.
 * @returns {Object} `Html` instance.
 */
const wrap = (o) => {
  const instance = Object.create(Shape);

  return instance.init(o) || instance;
};

wrap.__mojsClass = Shape;

export { wrap as Shape };
