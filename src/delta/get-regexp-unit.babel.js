import { unitRegexp } from './unit-regexp';

const getRegexpUnit = (value) => {
  if (typeof value !== 'string') { return undefined; }
  const valueMatch = value.match(unitRegexp);

  return (valueMatch !== null) ? valueMatch[0] : undefined;
};

export { getRegexpUnit };
