import { consoleName, bundleLink } from '../constants';

export const path = () => {
  console.warn(`${consoleName} Path easing was not included to your bundle, please go to ${bundleLink} to add one.`);
};
