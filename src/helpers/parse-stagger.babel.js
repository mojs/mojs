import { getRegexpUnit } from '../delta/get-regexp-unit';

/**
 * `parseStagger` - function to parse `stagger()` strings.
 *
 * @param {_} Property value.
 * @param {Number} Stagger index.
 * @returns {String, Any} Parsed stagger value or unattended value.
 */
const parseStagger = (value, index) => {
  const type = typeof value;
  // if not string return the value itself as it can not be a stagger string
  if (type !== 'string') { return value; }
  // if string test it on `stagger` sequence, if not present
  // return the value as it is not a stagger string
  if (!value.match(/^stagger\(/)) { return value; }
  
  // split the value `stagger([body])`
  const body = value.split(/stagger\(|\)$/)[1].toLowerCase();
  // split the body
  const stagger = body.split(/([^\(,\s]+)(?=\s*,|\s*$)/gim);
  // assume two values in the `stagger(20, 20)`
  let base = stagger[1];
  let step = stagger[3];
  if (stagger.length <= 3) {
    base = 0;
    step = stagger[1];
  }
  // parse base
  const baseValue = parseFloat(base);
  const baseUnit = getRegexpUnit(base);
  // parse step
  const stepValue = parseFloat(step);
  const stepUnit = getRegexpUnit(step);
  // get result unit and result
  const unit = (baseUnit) ? baseUnit : stepUnit;
  const result = baseValue + index*stepValue;
  // if unit is present - return the result with unit, otherwise return number
  return (unit) ? `${result}${unit}` : result;
};

export { parseStagger };
