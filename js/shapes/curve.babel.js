// istanbul ignore next
import Bit from './bit';

class Curve extends Bit {
  /*
    Method to declare module's defaults.
    @private
    @overrides @ Bit
  */
  _declareDefaults () {
    super._declareDefaults();
    this._defaults.shape = 'path';
  }
  /*
    Method to copy `_o` options to `_props` object
    with fallback to `_defaults`.
    @private
    @overrides @ Module
  */
  _extendDefaults () {
    super._extendDefaults();
    var p = this._props;

    if ( p.radiusX == null ) { p.radiusX = p.radius };
    if ( p.radiusY == null ) { p.radiusY = p.radius };
  }

  /*
    Method to draw the module.
    @private
    @overrides @ Bit
  */
  draw () {
    super.draw();
    var p  = this._props;
    var x  = 1*p.x;
    var y  = 1*p.y;
    var x1 = x - p.radiusX;
    var x2 = x + p.radiusX;
    var y1 = y - p.radiusY;
    
    var d = `M${x1} ${y} Q ${x} ${ p.y - 2*p.radiusY } ${x2} ${y}`;

    // don't set the `d` attribute if nothing changed
    if ( this._prevD === d ) { return; }
    // set the `d` attribute and save it to `_prevD`
    this.el.setAttribute('d', d);
    this._prevD = d;
  }

  getLength () {
    var p = this._props;

    var dRadius = p.radiusX + p.radiusY;
    var sqrt = Math.sqrt((3*p.radiusX + p.radiusY)*(p.radiusX + 3*p.radiusY));

    return .5 * Math.PI * ( 3*dRadius - sqrt );
  }
}
  
export default Curve;
