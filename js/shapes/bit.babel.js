import h  from '../h';

class Bit {
  constructor (o) {
    this.o = o;
    this.vars();
    this.render();
    return this;
  }

  vars () {
    this.ns    = 'http://www.w3.org/2000/svg';
    this.shape = 'line';
    this.ratio = 1;
    this.defaults = {
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

    this.drawMap = [
      'stroke', 'stroke-width', 'stroke-opacity', 'stroke-dasharray', 'fill',
      'stroke-dashoffset', 'stroke-linecap', 'fill-opacity', 'transform',
    ]

    if (this.o.ctx && this.o.ctx.tagName === 'svg') {
      this.ctx = this.o.ctx
    } else if (!this.o.el) {
      h.error('You should pass a real context(ctx) to the bit');
      // # --> COVER return if not ctx and not el
      // # return true
    }
    this.state = {}; this.drawMapLength = this.drawMap.length;
    this.extendDefaults();
    this.calcTransform();
  }
  calcTransform () {
    var p      = this.props,
        rotate = `rotate(${p.angle}, ${p.x}, ${p.y})`;
    p.transform = `${rotate}`;
  }

  extendDefaults () {
    this.props = (this.props == null) ? {} : this.props;
    for ( var key in this.defaults ) {
      var value = this.defaults[key];
      this.props[key] = (this.o[key] != null) ? this.o[key] : value;
    }
  }
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
        this.props[key] = val;
      }
    } else { this.props[attr] = value; }
  }

  render () {
    this.isRendered = true;
    if (this.o.el != null) {
      this.el = this.o.el;
      this.isForeign = true;
    } else {
      this.el = document.createElementNS(this.ns, this.shape || 'line');
      !this.o.isDrawLess && this.draw(); this.ctx.appendChild(this.el);
    }
  }

  draw () {
    this.props.length = this.getLength();

    var len = this.drawMapLength;
    while(len--) {
      var name = this.drawMap[len];
      switch ( name ) {
        case 'stroke-dasharray':
        case 'stroke-dashoffset':
          this.castStrokeDash(name);
          // # name is 'stroke-dashoffset' and console.log this.props[name]
      }
      this.setAttrIfChanged( name, this.props[name] );
    }
    this.state.radius = this.props.radius;
  }
  castStrokeDash (name) {
    // # if array of values
    var p = this.props;
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
  castPercent (percent) {
    return percent * (this.props.length/100);
  }
  setAttrsIfChanged (name, value) {
    // if ( typeof name === 'object' ) {
    var keys = Object.keys(name),
        len  = keys.length;
    while(len--) {
      var key   = keys[len],
          value = name[key];
      this.setAttrIfChanged(key, value);
    }
    // } else {
    //   value = ( value == null) ? this.props[name] : value;
    //   this.setAttrIfChanged( name, value );
    // }
  }

  setAttrIfChanged (name, value) {
    if ( this.state[name] !== value ) {
      this.el.setAttribute(name, value);
      this.state[name] = value;
    }
  }

  // isChanged (name, value){
  //   value = ( value == null) ? this.props[name] : value;
  //   return ( this.state[name] !== value );
  // }

  getLength () {
    var p   = this.props,
        len = 0,
        isGetLength = !!( this.el && this.el.getTotalLength );

    if (isGetLength && this.el.getAttribute('d')) {
      len = this.el.getTotalLength();
    } else {
      len = 2*( (p.radiusX != null ) ? p.radiusX : p.radius );
    }
    return len;
  }
}

export default Bit;
