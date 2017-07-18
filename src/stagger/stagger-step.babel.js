import { staggerFunction } from './stagger-function.babel.js';
import { parseUnitValue } from '../helpers/parse-unit-value.babel.js';
import { staggerProperty } from '../helpers/stagger-property.babel.js';

/**
 * `staggerStep` - function to value for stagger item.
 * @param {Number, String} base Base value.
 * @param {Number, String} step Step value.
 * @returns {Number, String} Stepped value.
 */
export const staggerStep = (base, step) => {
  const isBaseDefined = !(step === undefined);
  // if only one value passed, treat it as `base` of `0`
  if (!isBaseDefined) {
    step = base;
    base = 0;
  }
  // mark the function as `stagger` one
  return staggerFunction((i, total) => {
    // parse units
    const baseUnitValue = parseUnitValue(staggerProperty(base, i, total));
    const stepUnitValue = parseUnitValue(staggerProperty(step, i, total));
    // decide what is the result unit, the `base` one is top priority
    const resultUnit = (isBaseDefined === true)
          ? baseUnitValue.unit
          : stepUnitValue.unit;
    // calculate value for the current item
    const resultNumber = baseUnitValue.value + (i * stepUnitValue.value);
    // if unit defined, use it with result number
    return (resultUnit) ? `${resultNumber}${resultUnit}` : resultNumber;
  });
};
