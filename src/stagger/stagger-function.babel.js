
/**
 * `staggerFunction` - function to mark another function as `stagger` one.
 * 
 * @param {Function} fun Function to mark as `stagger` function.
 * @returns {Function} Newly created function that is marked as stagger
 *                     and will call the original one.
 */
export const staggerFunction = (fun) => {
  const newFunction = function() {
    return fun.apply(this, arguments);
  };
  newFunction.__mojs__isStaggerFunction = true;
  
  return newFunction;
};