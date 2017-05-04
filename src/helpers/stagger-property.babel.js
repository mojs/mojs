const staggerProperty = (prop, index) => {
  if (prop instanceof Array) {
    return prop[index % prop.length];
  }

  if (typeof prop === 'function') {
    return prop(index);
  }

  return prop;
};

export { staggerProperty as staggerProperty };
