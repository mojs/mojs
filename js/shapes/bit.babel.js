import Module from '../module';
import h  from '../h';

class Bit extends Module {
  _declareDefaults () {
    this._defaults = {
      ns:                   'http://www.w3.org/2000/svg',
      ctx:                  null,

      shape:                'line',
      ratio:                1,
      radius:               50,
      radiusX:              undefined,
      radiusY:              undefined,
      points:               3,
      x:                    0,
      y:                    0,
      rx:                   0,
      ry:                   0,
      angle:                0,
      stroke:               'hotpink',
      'stroke-width':       2,
      'stroke-opacity':     1,
      fill:                 'transparent',
      'fill-opacity':       1,
      'stroke-dasharray':   '',
      'stroke-dashoffset':  '',
      'stroke-linecap':     ''
    }
    this._drawMap = [
      'stroke', 'stroke-width', 'stroke-opacity', 'stroke-dasharray', 'fill',
      'stroke-dashoffset', 'stroke-linecap', 'fill-opacity', 'transform',
    ]
  }
// 
  _vars () {
    if (this._o.ctx && this._o.ctx.tagName === 'svg') {
      this.ctx = this._o.ctx;
    } else if (!this._o.el) {
      h.error('You should pass a real context(ctx) to the bit');
      // # --> COVER return if not ctx and not el
      return true;
    }
    this._state = {}; this._drawMapLength = this._drawMap.length;
    // this.calcTransform();
  }

  // calcTransform () {
  //   var p      = this._props,
  //       rotate = `rotate(${p.angle}, ${p.x}, ${p.y})`;
  //   p.transform = `${rotate}`;
  // }

  setAttr (attr, value) {
    if ( typeof attr === 'object' ) {
      var keys = Object.keys(attr),
          len  = keys.length,
          el   = value || this.el;

      while(len--) {
        var key = keys[len],
            val = attr[key];
        el.setAttribute(key, val);
      }
    } else { this.el.setAttribute(attr, value); }
  }

  setProp (attr, value) {
    if ( typeof attr === 'object' ) {
      for ( var key in attr) {
        var val = attr[key];
        this._props[key] = val;
      }
    } else { this._props[attr] = value; }
  }

  _render () {
    this.isRendered = true;
    if (this._o.el != null) {
      this.el = this._o.el;
      this.isForeign = true;
    } else {
      this.el = document.createElementNS(this._props.ns, this._props.shape);
      !this._o.isDrawLess && this.draw(); this.ctx.appendChild(this.el);
    }
  }

  draw () {
    // if ( this._state[ 'radius' ] !== this._props[ 'radius' ] ) {
    //   this._props.length = this.getLength();
    // }
    this._props.length = this.getLength();

    var state = this._state,
        props = this._props;

    var len = this._drawMapLength;
    while(len--) {
      var name = this._drawMap[len];
      switch ( name ) {
        case 'stroke-dasharray':
        case 'stroke-dashoffset':
          this.castStrokeDash(name);
      }
      this.setAttrIfChanged( name, this._props[name] );
    }
    this._state.radius = this._props.radius;
  }
  castStrokeDash (name) {
    // # if array of values
    var p = this._props;
    if ( h.isArray(p[name]) ) {
      var stroke = '';
      for ( var i = 0; i < p[name].length; i++ ) {
        var dash = p[name][i],
            cast = (dash.unit === '%')
              ? this.castPercent(dash.value)
              : dash.value;
        stroke += `${cast} `;
      }
      p[name] = ( stroke === '0 ' ) ? stroke = '' : stroke;
      // console.log(`set: ${stroke}`)
      return p[name] = stroke;
    }
    // # if single value
    if ( typeof p[name] === 'object' ) {
      stroke = ( p[name].unit === '%' )
        ? this.castPercent(p[name].value)
        : p[name].value;
      p[name] = ( stroke === 0 ) ? stroke = '' : stroke
    }
  }
  castPercent (percent) { return percent * (this._props.length/100); }
  
  setAttrsIfChanged (name, value) {
    var keys = Object.keys(name),
        len  = keys.length;
    while(len--) {
      var key   = keys[len],
          value = name[key];
      this.setAttrIfChanged(key, value);
    }
  }

  setAttrIfChanged (name, value) {
    if ( this._state[name] !== value ) {
      // this.el.style[name] = value;
      this.el.setAttribute(name, value);
      this._state[name] = value;
    }
  }

  getLength () {
    var p   = this._props,
        len = 0,
        isGetLength = !!( this.el && this.el.getTotalLength );

    if (isGetLength && this.el.getAttribute('d')) {
      len = this.el.getTotalLength();
    } else {
      len = 2*( (p.radiusX != null ) ? p.radiusX : p.radius );
    }
    return len;
  }
  /*
    Method to calculate total sum between points.
    @private
    @param {Array} Array of points.
    @returns {Number} Distance bewtween all points.
  */
  _getPointsPerimiter ( points ) {
    let sum    = 0;

    for (var i = 1; i < points.length; i++ ) {
      sum += this._pointsDelta( points[i-1], points[i] );
    }

    sum += this._pointsDelta( points[0], h.getLastItem( points ) );
    return sum;
  }
  /*
    Method to get delta from two points.
    @private
    @param {Object} Point 1.
    @param {Object} Point 2.
    @returns {Number} Distance between the pooints.
  */
  _pointsDelta ( point1, point2 ) {
    let dx = Math.abs( point1.x - point2.x ),
        dy = Math.abs( point1.y - point2.y );
    return Math.sqrt( dx*dx + dy*dy );
  }

}

export default Bit;
