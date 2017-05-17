const pow = (p = 2) => {
  const easeIn = (p => t => Math.pow(t, p))(p);
  const easeOut = (p => t => 1 - Math.abs(Math.pow(t-1, p)))(p);

  return {
    in: easeIn,
    out: easeOut,
    inout: t => t < .5 ? easeIn(t*2)/2 : easeOut(t*2 - 1)/2 + .5
 }
}

export { pow as pow };
