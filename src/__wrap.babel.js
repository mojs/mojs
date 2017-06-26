/*
 * Imitate `class` with wrapper
 *
 * @param {Object} Options object.
 * @returns {Object} Tween instance.
 */
const wrap = (module) => {
  const w = (o) => {
    const instance = Object.create(module);
    instance.init(o);

    return instance;
  };
  w.__mojsClass = module;
  return w;
};

export { wrap };
