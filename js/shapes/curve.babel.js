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
    Method to draw the module.
    @private
    @overrides @ Bit
  */
  _draw () {
    super._draw();
    var p  = this._props;

    var radiusX = (p.radiusX != null) ? p.radiusX : p.radius;
    var radiusY = (p.radiusY != null) ? p.radiusY : p.radius;

    var isRadiusX = radiusX === this._prevRadiusX;
    var isRadiusY = radiusY === this._prevRadiusY;
    var isPoints  = p.points === this._prevPoints;
    // skip if nothing changed
    if ( isRadiusX && isRadiusY && isPoints ) { return; }

    var x  = 1*p.x;
    var y  = 1*p.y;
    var x1 = x - radiusX;
    var x2 = x + radiusX;
    
    var d = `M${x1} ${y} Q ${x} ${ p.y - 2*radiusY } ${x2} ${y}`;

    // don't set the `d` attribute if nothing changed
    if ( this._prevD === d ) { return; }
    // set the `d` attribute and save it to `_prevD`
    this.el.setAttribute('d', d);
    // save the properties
    this._prevPoints  = p.points;
    this._prevRadiusX = radiusX;
    this._prevRadiusY = radiusY;
  }

  _getLength () {
    var p = this._props;

    var radiusX = (p.radiusX != null) ? p.radiusX : p.radius;
    var radiusY = (p.radiusY != null) ? p.radiusY : p.radius;

    var dRadius = radiusX + radiusY;
    var sqrt = Math.sqrt((3*radiusX + radiusY)*(radiusX + 3*radiusY));

    return .5 * Math.PI * ( 3*dRadius - sqrt );
  }
}
  
export default Curve;
