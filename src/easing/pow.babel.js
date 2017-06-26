const pow = (p = 2) => {
  const easeIn = (k => t => t ** k)(p);
  const easeOut = (k => t => 1 - Math.abs((t - 1) ** k))(p);

  return {
    in: easeIn,
    out: easeOut,
    inout: (t) => {
      return (t < .5) ? easeIn(t * 2) / 2 : (easeOut((t * 2) - 1) / 2) + .5;
    },
  };
};

export { pow };
