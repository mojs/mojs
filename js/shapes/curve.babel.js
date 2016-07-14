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
    this._defaults.tag = 'path';
  }
  /*
    Method to draw the module.
    @private
    @overrides @ Bit
  */
  _draw () {
    super._draw();
    var p = this._props;

    var radiusX = (p.radiusX != null) ? p.radiusX : p.radius;
    var radiusY = (p.radiusY != null) ? p.radiusY : p.radius;

    var isRadiusX = radiusX === this._prevRadiusX;
    var isRadiusY = radiusY === this._prevRadiusY;
    var isPoints  = p.points === this._prevPoints;
    // skip if nothing changed
    if ( isRadiusX && isRadiusY && isPoints ) { return; }

    var x  = p.width/2;
    var y  = p.height/2;
    var x1 = x - radiusX;
    var x2 = x + radiusX;
    
    var d = `M${x1} ${y} Q ${x} ${ y - 2*radiusY } ${x2} ${y}`;

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
