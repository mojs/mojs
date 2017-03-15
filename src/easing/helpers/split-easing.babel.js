import { defaultEasing } from '../constants';

/**
 * splitEasing - function to split `cubic.in` from.
 *
 * @param  {String} Easing name delimited by `.`
 * @return {Array} Splitted easing in [`easing name`, `easing direction`] form.
 */
export default (string) => {
  const type = typeof string;
  // if a `function` passed - just return it back assuming that's
  // an easing function already.
  if (type === 'function') { return string; }

  if (type === 'string' && string.length) {
    // plit the string
    const split = string.split('.');
    // lowercase the easing part, if something wrong -
    // fallback to default values
    const easingName = split[0].toLowerCase() || defaultEasing[0];
    const easingDirection = split[1].toLowerCase() || defaultEasing[1];
    return [easingName, easingDirection];
  } else { return [...defaultEasing]; }
};
