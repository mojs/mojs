import { parseStagger } from './parse-stagger';

const staggerProperty = (prop, index) => {
  let value = prop;
  // if property is an array map the index to some array item
  if (prop instanceof Array) {
    value = prop[index % prop.length];
  }
  // if prop is a function, call the it with index and return the result
  if (typeof prop === 'function' && prop.__mojs__isStaggerFunction) {
    value = prop(index);
  }

  // otherwise return the single property
  return parseStagger(value, index);
};

export { staggerProperty };
