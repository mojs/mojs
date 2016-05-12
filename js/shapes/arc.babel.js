// istanbul ignore next

import Bit from './bit';

class Arc extends Bit {
  _declareDefaults () {
    super._declareDefaults();
    this._defaults.shape = 'path';
  }

  draw () {
    super.draw();
    
    var p = this._props;

    var radiusX = (p.radiusX != null)
      ? p.radiusX : p.radius;
    var radiusY = (p.radiusY != null)
      ? p.radiusY : p.radius;

    var x1 = p.x - radiusX;
    var x2 = p.x
    var x3 = p.x + radiusX;

    var y1 = p.y - radiusY;
    var y2 = p.y
    var y3 = p.y + radiusY;


    this.setAttr({ d : `M${x1} ${p.y} Q ${x2} ${ p.y - 2*p.radiusY } ${x3} ${p.y}` });
  }

  getLength () {
    var p = this._props;

    var radiusX = (p.radiusX != null)
      ? p.radiusX : p.radius;
    var radiusY = (p.radiusY != null)
      ? p.radiusY : p.radius;

    var len = .5 * Math.PI * ( 3*( radiusX + radiusY ) - Math.sqrt( ( 3*radiusX + radiusY ) * ( radiusX + 3*radiusY  ) ) );

    return len;
  }
}
  
export default Arc;
