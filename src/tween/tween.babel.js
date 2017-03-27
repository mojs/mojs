import ClassProto from '../class-proto';
import defaults from './tween-defaults';

export default class Tween extends ClassProto {
  /**
   * _declareDefaults - function to declare module defaults.
   *                    In this case defaults are the `tween defaults`
   *                    since we will plan for tween.
   *
   * @private
   */
  _declareDefaults() { return this._defaults = {...defaults}; }
}
