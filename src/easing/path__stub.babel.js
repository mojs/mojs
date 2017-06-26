import { consoleName, bundleLink } from '../constants.babel.js';

export const path = () => {
  // eslint-disable-next-line no-console
  console.warn(`${consoleName} Path easing was not included to your bundle, please go to ${bundleLink} to add one.`);
};
