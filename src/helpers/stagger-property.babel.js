export const isStaggerMap = (prop) => {
  return (prop instanceof Array) && (prop.__mojs__isStaggerMap);
};

export const isStaggerFunction = (prop) => {
  return typeof prop === 'function' && prop.__mojs__isStaggerFunction;
};

export const staggerProperty = (prop, index, totalItems) => {
  // if property is an array map the index to some array item
  if (isStaggerMap(prop)) {
    prop = prop[index % prop.length];
  }
  // if prop is a function, call the it with index and return the result
  if (isStaggerFunction(prop)) {
    prop = prop(index, totalItems);
  }
  // if nested, parse it
  return (isStaggerMap(prop) || isStaggerFunction(prop))
    ? staggerProperty(prop, index, totalItems)
    : prop;
};
