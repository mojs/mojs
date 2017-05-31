const staggerProperty = (prop, index) => {
  // if property is an array map the index to some array item
  if (prop instanceof Array) {
    return prop[index % prop.length];
  }
  // if prop is a function, call the it with index and return the result
  if (typeof prop === 'function') {
    return prop(index);
  }

  // otherwise return the single property
  return prop;
};

export { staggerProperty };
