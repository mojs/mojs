
const h         = require('./h');
const Bit       = require('./shapes/bit');
const shapesMap = require('./shapes/shapesMap');
import Tweenable  from './tween/tweenable';
import Tween      from './tween/tween';
import Timeline   from './tween/timeline';

// TODO
//  - tweenable public methods should return this
//  - check the run tuneOption
//  - tween properties
//  - properties signatures
//  --
//  - tween for every prop 

class Transit extends Tweenable {
  /*
    Method to declare module's defaults.
    @private
  */
  _declareDefaults () {
    // DEFAULTS / APIs
    this.defaults = {
      stroke: 'transparent',
      strokeOpacity: 1,
      strokeLinecap: '',
      strokeWidth: 2,
      strokeDasharray: 0,
      strokeDashoffset: 0,
      fill: 'deeppink',
      fillOpacity: 'transparent',
      left: 0,
      top: 0,
      x: 0,
      y: 0,
      angle: 0,
      scale: 1,
      opacity: 1,
      points: 3,
      radius: {
        0: 50
      },
      radiusX: void 0,
      radiusY: void 0,
      onStart: null,
      onComplete: null,
      onUpdate: null,
      duration: 500,
      delay: 0,
      repeat: 0,
      yoyo: false,
      easing: 'Linear.None',
      isShowEnd: false,
      isShowInit: false,
      size: null,
      sizeGap: 0
    }
  }
  /*
    Method to create a then record for the module.
    @public
    @param    {Object} Options for the next animation.
    @returns  {Object} this.
  */
  then ( o ) {
    var i, it, keys, len, merged, opts;
    if ((o == null) || !Object.keys(o)) { return; }
    merged = this._mergeThenOptions(this.history[this.history.length - 1], o);
    this.history.push(merged);
    keys = Object.keys(this.h.tweenOptionMap);
    i = keys.length;
    opts = {};
    while (i--) { opts[keys[i]] = merged[keys[i]]; }
    it = this;
    len = it.history.length;
    (function(_this) {
      return (function(len) {
        opts.onUpdate = function(p) {
          return _this._setProgress(p);
        };
        opts.onStart = function() {
          var ref;
          return (ref = _this.props.onStart) != null ? ref.apply(_this) : void 0;
        };
        opts.onComplete = function() {
          var ref;
          return (ref = _this.props.onComplete) != null ? ref.apply(_this) : void 0;
        };
        opts.onFirstUpdate = function() {
          return it._tuneOptions(it.history[this.index]);
        };
        opts.isChained = !o.delay;
        return _this.timeline.append(new Tween(opts));
      });
    })(this)(len);
    return this;
  }

  /*
    Method to start the animation with optional new options.
    @public
    @param {Object} New options to set on the run.
    @returns {Object} this.
  */
  run (o) {
    var key, keys, len;
    if (o && Object.keys(o).length) {
      if (this.history.length > 1) {
        keys = Object.keys(o);
        len = keys.length;
        while (len--) {
          key = keys[len];
          if (h.callbacksMap[key] || h.tweenOptionMap[key]) {
            h.warn("the property \"" + key + "\" property can not be overridden on run with \"then\" chain yet");
            delete o[key];
          }
        }
      }
      this._transformHistory(o);
      this._tuneNewOption(o);
      o = this.h.cloneObj(this.o);
      this.h.extend(o, this.defaults);
      this.history[0] = o;
      !this.o.isDrawLess && this._setProgress(0, true);
    } else if (o) { this._tuneNewOption(this.history[0]); }
    this.play();
    return this;
  }

  play () { setTimeout(()=> { super.play() }, 1) }

  // ^ Public methods / APIs
  // v private methods.
  constructor ( o = {} ) {
    super(o);
    this.o = o;
    this._declareDefaults();
    this._vars();
    this._render();
  }
  /*
    Method to declare variables.
  */
  _vars () {
    var o;
    this.progress = 0;
    this.h        = h;
    this.props    = {};
    this.lastSet  = {};
    this.origin   = {};
    this.index    = this.o.index || 0;
    this._extendDefaults();
    o = this.h.cloneObj(this.o);
    this.h.extend(o, this.defaults);
    this.history = [o];
    // should draw on foreign svg canvas
    this.isForeign = !!this.o.ctx;
    // should take an svg element as self bit
    return this.isForeignBit = !!this.o.bit;
  }
  /*
    Nethod to extend module defaults with passed options.
  */
  _extendDefaults (o) {
    var array, defaultsValue, fromObject, i, k, key, keys, len, len1, optionsValue, property, ref, unit, value;
    
    fromObject = o || this.defaults;
    // reset deltas if no options was passed
    // PROPABLY NEED TO MOVE TO _vars
    (o == null) && (this.deltas = {});
    keys = Object.keys(fromObject);
    len = keys.length;
    while (len--) {
      key = keys[len];
      defaultsValue = fromObject[key];
      if ((ref = this.skipProps) != null ? ref[key] : void 0) {
        continue;
      }
      
      if (o) {
        this.o[key] = defaultsValue;
        optionsValue = defaultsValue;
        delete this.deltas[key];
      } else {
        optionsValue = this.o[key] != null ? this.o[key] : defaultsValue;
      }

      if (!this._isDelta(optionsValue)) {
        if (typeof optionsValue === 'string') {
          if (optionsValue.match(/stagger/)) {
            optionsValue = this.h.parseStagger(optionsValue, this.index);
          }
        }
        if (typeof optionsValue === 'string') {
          if (optionsValue.match(/rand/)) {
            optionsValue = this.h.parseRand(optionsValue);
          }
        }
        this.props[key] = optionsValue;
        if (key === 'radius') {
          if (this.o.radiusX == null) {
            this.props.radiusX = optionsValue;
          }
          if (this.o.radiusY == null) {
            this.props.radiusY = optionsValue;
          }
        }
        if (this.h.posPropsMap[key]) {
          this.props[key] = this.h.parseUnit(this.props[key]).string;
        }
        if (this.h.strokeDashPropsMap[key]) {
          property = this.props[key];
          value = [];
          switch (typeof property) {
            case 'number':
              value.push(this.h.parseUnit(property));
              break;
            case 'string':
              array = this.props[key].split(' ');
              for (i = k = 0, len1 = array.length; k < len1; i = ++k) {
                unit = array[i];
                value.push(this.h.parseUnit(unit));
              }
          }
          this.props[key] = value;
        }
        continue;
      }
      this.isSkipDelta || this._getDelta(key, optionsValue);
    }
    return this.onUpdate = this.props.onUpdate;
  }
  /*
    Method to initialize modules presentation.
    @private
  */
  _render () {
    if (!this.isRendered) {
      if (!this.isForeign && !this.isForeignBit) {
        this.ctx = document.createElementNS(h.NS, 'svg');
        this.ctx.style.position = 'absolute';
        this.ctx.style.width    = '100%';
        this.ctx.style.height   = '100%';
        this._createBit();
        this._calcSize();
        this.el = document.createElement('div');
        this.el.appendChild(this.ctx);
        (this.o.parent || document.body).appendChild(this.el);
      } else {
        this.ctx = this.o.ctx;
        this._createBit();
        this._calcSize();
      }
      this.isRendered = true;
    }
    this._setElStyles();
    this._setProgress(0, true);
    this.createTween();
    return this;
  }
  /*
    Method to set el styles on initialization.
    @private
  */
  _setElStyles () {
    var marginSize, ref, size;
    if (!this.isForeign) {
      size = this.props.size + "px";
      this.el.style.position = 'absolute';
      this.el.style.top      = this.props.top;
      this.el.style.left     = this.props.left;
      this.el.style.width    = size;
      this.el.style.height   = size;
      marginSize = (-this.props.size / 2) + "px";
      this.el.style['margin-left'] = marginSize;
      this.el.style['margin-top']  = marginSize;
      this.el.style['marginLeft']  = marginSize;
      this.el.style['marginTop']   = marginSize;
    }
    if ((ref = this.el) != null) {
      ref.style.opacity = this.props.opacity;
    }
    if (this.o.isShowInit) { this._show(); } else {
      this._hide();
    }
  }
  /*
    Method to show the main div el.
    @private
  */
  _show () {
    if (this.isShown || (this.el == null)) { return; }
    this.el.style.display = 'block';
    this.isShown = true;
  }
  /*
    Method to hide the main div el.
    @private
  */
  _hide () {
    if ((this.isShown === false) || (this.el == null)) { return; }
    this.el.style.display = 'none';
    return this.isShown = false;
  }
  
  _makeTween () {}
  _makeTimeline () {}
  /*
    Method to draw shape.
    @private
  */
  _draw () {
    this.bit.setProp({
      x:                    this.origin.x,
      y:                    this.origin.y,
      stroke:               this.props.stroke,
      'stroke-width':       this.props.strokeWidth,
      'stroke-opacity':     this.props.strokeOpacity,
      'stroke-dasharray':   this.props.strokeDasharray,
      'stroke-dashoffset':  this.props.strokeDashoffset,
      'stroke-linecap':     this.props.strokeLinecap,
      fill:                 this.props.fill,
      'fill-opacity':       this.props.fillOpacity,
      radius:               this.props.radius,
      radiusX:              this.props.radiusX,
      radiusY:              this.props.radiusY,
      points:               this.props.points,
      transform:            this._calcShapeTransform()
    });
    this.bit.draw(); this._drawEl();
  }
  /*
    Method to set current modules props to main div el.
    @private
  */
  _drawEl () {
    if (this.el == null) { return true; }
    this.o.isIt && console.log('here', this.isForeign)
    var p = this.props;
    this._isPropChanged('opacity') && (this.el.style.opacity = p.opacity);
    if (!this.isForeign) {
      this._isPropChanged('left')  && (this.el.style.left = p.left);
      this._isPropChanged('top')   && (this.el.style.top = p.top);
      if ( this._isPropChanged('x') || this._isPropChanged('y') || this._isPropChanged('scale') ) {
        this.h.setPrefixedStyle(this.el, 'transform', this._fillTransform());
      }
    }
  }
  /*
    Method to check if property changed after the latest set.
    @private
    @param {String} Name of the property to check.
    @returns {Boolean}
  */
  _isPropChanged ( name ) {
    // if there is no recod for the property - create it
    if (this.lastSet[name] == null) { this.lastSet[name] = {}; }
    if (this.lastSet[name].value !== this.props[name]) {
      this.lastSet[name].value = this.props[name];
      return true;
    } else { return false; }
  }
  /*
    Method to create shape's transform string.
    @private
    @returns {String} Transform string for the shape.
  */
  _calcShapeTransform () {
    return `rotate(${this.props.angle}, ${this.origin.x}, ${this.origin.y})`;
    // this.props.transform = "rotate(" + this.props.angle + "," + this.origin.x + "," + this.origin.y + ")";
  }
  /*
    Method to calculate maximum shape's radius.
    @private
    @returns {Number} Maximum raduis.
  */
  _calcMaxShapeRadius () {
    var selfSize, selfSizeX, selfSizeY;
    selfSize  = this._getRadiusSize({ key: 'radius' });
    selfSizeX = this._getRadiusSize({ key: 'radiusX', fallback: selfSize });
    selfSizeY = this._getRadiusSize({ key: 'radiusY', fallback: selfSize });
    return Math.max(selfSizeX, selfSizeY);
  }
  /*
    Method to calculate maximum size of the svg canvas.
    @private
  */
  _calcSize () {
    var base, dStroke, radius, stroke;
    if (this.o.size) { return; }
    radius = this._calcMaxShapeRadius();
    dStroke = this.deltas['strokeWidth'];
    stroke = dStroke != null ? Math.max(Math.abs(dStroke.start), Math.abs(dStroke.end)) : this.props.strokeWidth;
    this.props.size = 2 * radius + 2 * stroke;
    switch (typeof (base = this.props.easing).toLowerCase === "function" ? base.toLowerCase() : void 0) {
      case 'elastic.out':
      case 'elastic.inout':
        this.props.size *= 1.25;
        break;
      case 'back.out':
      case 'back.inout':
        this.props.size *= 1.1;
    }
    this.props.size *= this.bit.ratio;
    this.props.size += 2 * this.props.sizeGap;
    return this.props.center = this.props.size / 2;
  }

  /*
    Method to get maximum radius size with optional fallback.
    @private
    @param {Object}
      @param key {String} Name of the radius - [radius|radiusX|radiusY].
      @param @optional fallback {Number}  Optional number to set if there
                                          is no value for the key.
  */
  _getRadiusSize (o) {
    var delta = this.deltas[o.key];
    // if value is delta value
    if (delta != null) {
      // get maximum number between start and end values of the delta
      return Math.max(Math.abs(delta.end), Math.abs(delta.start));
    } else if (this.props[o.key] != null) {
      // else get the value from props object
      return parseFloat(this.props[o.key]);
    } else { return o.fallback || 0; }
  }
  /*
    Method to find the shape and initialize it.
    @private
  */
  _createBit () {
    var bitClass = shapesMap.getShape(this.o.shape || 'circle');
    this.bit = new bitClass({ ctx: this.ctx, el: this.o.bit, isDrawLess: true });
    // if draw on foreign context
    // or we are animating an svg element outside the module
    if (this.isForeign || this.isForeignBit) { return this.el = this.bit.el; }
  }
  /*
    Method to draw current progress of the deltas.
    @private
    @param {Number}  Progress to set - [0..1].
    @param {Boolean} If should show module's main div el.
    @returns {Object} this.
  */
  _setProgress ( progress, isShow ) {
    if (!isShow) {
      this._show();
      if (typeof this.onUpdate === "function") { this.onUpdate(progress); }
    }
    this.progress = progress;
    // this.progress = ( progress < 0 || !progress )
    //   ? 0
    //   : ( progress > 1 ) ? 1 : progress;
    this._calcCurrentProps(progress);
    this._calcOrigin();
    this._draw(progress);
    return this;
  }
  /*
    Method to calculate current progress of the deltas.
    @private
    @param {Number} Progress to calculate - [0..1].
  */
  _calcCurrentProps ( progress ) {
    var a, b, dash, g, i, item, key, keys, len, r, stroke, units, value;
    keys = Object.keys(this.deltas);
    len = keys.length;
    while (len--) {
      key = keys[len];
      value = this.deltas[key];
      this.props[key] = (function() {
        var k, len1, ref;
        switch (value.type) {
          case 'array':
            stroke = [];
            ref = value.delta;
            for (i = k = 0, len1 = ref.length; k < len1; i = ++k) {
              item = ref[i];
              dash = value.start[i].value + item.value * this.progress;
              stroke.push({
                value: dash,
                unit: item.unit
              });
            }
            return stroke;
          case 'number':
            return value.start + value.delta * progress;
          case 'unit':
            units = value.end.unit;
            return "" + (value.start.value + value.delta * progress) + units;
          case 'color':
            r = parseInt(value.start.r + value.delta.r * progress, 10);
            g = parseInt(value.start.g + value.delta.g * progress, 10);
            b = parseInt(value.start.b + value.delta.b * progress, 10);
            a = parseInt(value.start.a + value.delta.a * progress, 10);
            return "rgba(" + r + "," + g + "," + b + "," + a + ")";
        }
      }).call(this);
    }
  }
  /*
    Method to calculate transform origin for the element.
    @private

  */
  _calcOrigin () {
    var p = this.props;
    // if drawing context was passed
    // set origin to x and y of the module
    // otherwise set the origin to the center
    this.origin.x = this.o.ctx ? parseFloat(p.x) : p.center;
    this.origin.y = this.o.ctx ? parseFloat(p.y) : p.center;
  }
  /*
    Method to check if the property is delta property.
    @private
    @param {Any} Parameter value to check.
    @returns {Boolean}
  */
  _isDelta ( optionsValue ) {
    var isObject = (optionsValue != null) && (typeof optionsValue === 'object');
    isObject = isObject && !optionsValue.unit;
    return !(!isObject || this.h.isArray(optionsValue) || h.isDOM(optionsValue));
  }

  /*
    Method to get delta from property and set
    the property's start value to the props object.
    @private
    @param {String} Key name to get delta for.
    @param {Object} Option value to get the delta for.
  */
  _getDelta ( key, optionsValue ) {
    var delta;
    if ((key === 'left' || key === 'top') && !this.o.ctx) {
      this.h.warn(`Consider to animate x/y properties instead of left/top,
        as it would be much more performant`, optionsValue);
    }
    // skip delta calculation for a property if it is listed
    // in skipPropsDelta object
    if ( this.skipPropsDelta && this.skipPropsDelta[key] ) { return; }
    // get delta
    delta = this.h.parseDelta(key, optionsValue, this.defaults[key]);
    // if successfully parsed - save it
    if (delta.type != null) { this.deltas[key] = delta; }
    // set props to start value of the delta
    // this.props[key] = delta.start;
  }
  /*
    Method to merge two options into one. Used in .then chains.
    @private
    @param {Object} Start options for the merge.
    @param {Object} End options for the merge.
    @returns {Object} Merged options.
  */
  _mergeThenOptions ( start, end ) {
    var endValue, i, isFunction, key, keys, o, startKey, startKeys, value;
    o = {};
    for (key in start) {
      value = start[key];
      if (!this.h.tweenOptionMap[key] && !this.h.callbacksMap[key] || key === 'duration') {
        o[key] = value;
      } else { o[key] = key === 'easing' ? '' : void 0; }
    }
    keys = Object.keys(end);
    i = keys.length;
    while (i--) {
      key = keys[i];
      endValue = end[key];
      isFunction = typeof endValue === 'function';
      if (this.h.tweenOptionMap[key] || typeof endValue === 'object' || isFunction) {
        o[key] = endValue != null ? endValue : start[key];
        continue;
      }
      startKey = start[key];
      if (startKey == null) {
        startKey = this.defaults[key];
      }
      if ((key === 'radiusX' || key === 'radiusY') && (startKey == null)) {
        startKey = start.radius;
      }
      if (typeof startKey === 'object' && (startKey != null)) {
        startKeys = Object.keys(startKey);
        startKey = startKey[startKeys[0]];
      }
      if (endValue != null) {
        o[key] = {};
        o[key][startKey] = endValue;
      }
    }
    return o;
  }
  /*
    Method to tune new options on then reinitialization.
    @private
  */
  _tuneOptions ( o ) {
    this._extendDefaults(o); this._calcSize(); this._setElStyles();
  }

  createTimeline () {
    return this.tween = new Tween({
      duration: this.props.duration,
      delay: this.props.delay,
      repeat: this.props.repeat,
      yoyo: this.props.yoyo,
      easing: this.props.easing,
      onUpdate: (function(_this) {
        return function(p) {
          return _this._setProgress(p);
        };
      })(this),
      onStart: (function(_this) {
        return function(isForward, isYoyo) {
          var ref;
          if (isForward) {
            _this._show();
          } else {
            !_this.o.isShowInit && _this._hide();
          }
          return (ref = _this.props.onStart) != null ? ref.apply(_this, arguments) : void 0;
        };
      })(this),
      onFirstUpdate: (function(_this) {
        return function(isForward, isYoyo) {
          if (!isForward) {
            return _this.history.length > 1 && _this._tuneOptions(_this.history[0]);
          }
        };
      })(this)
    });
  }

  createTween () {
    var it;
    it = this;
    this.createTimeline();
    this.timeline = new Timeline({
      onComplete: (function(_this) {
        return function() {
          var ref;
          !_this.o.isShowEnd && _this._hide();
          return (ref = _this.props.onComplete) != null ? ref.apply(_this) : void 0;
        };
      })(this)
    });
    this.timeline.add(this.tween);
  }
  /*
    Method to transform history rewrite new options object chain on run.
    @param {Object} New options to tune for.
  */
  _transformHistory ( o ) {
    var keys = Object.keys(o),
        i = -1, len = keys.length,
        historyLen = this.history.length;
    // go thru history records - one record if transit's option object
    while (++i < len) {
      // get all keys of the options record
      var key = keys[i], j = 0;
      (function() {
        // take one key and loop thru all of the records again
        while (++j < historyLen) {
          // get option's record property by key
          var optionRecord = this.history[j][key];
          // if delta property
          if (typeof optionRecord === 'object') {
            // get start and end of the delta
            var start = Object.keys(optionRecord)[0],
                // save the end of the delta
                end   = optionRecord[start];
            // delete the property
            delete optionRecord[start];
            // if new property is delta
            if (typeof o[key] === 'object') {
              var property = o[key];
              // merge the start and end
              // get the start and end of the new option
              var startNew = Object.keys(property)[0],
                  endNew   = property[startNew];
              // set the o's end value as start
              // and o's end to delta's end
              optionRecord[endNew] = end;
            } else {
              // if new property is not delta
              // rewrite the start value to the new value
              optionRecord[o[key]] = end;
            }
            break;
          } else {
            // if is not delta property
            // set it to the new options value
            this.history[j][key] = o[key];
          }
        }
      }).call(this);
    }
  }
  /*
    Method to tune new option on then edge.
    @private
    @param {Object}  Option to tune on run.
    @param {Boolean} If foreign svg canvas.
  */
  _tuneNewOption (o, isForeign) {
    if ((o != null) && (o.shape != null) && o.shape !== (this.o.shape || 'circle')) {
      this.h.warn('Sorry, shape can not be changed on run');
      delete o.shape;
    }
    if ((o != null) && Object.keys(o).length) {
      this._extendDefaults(o);
      this._resetTween();
      !isForeign && this.timeline._recalcTotalDuration();
      this._calcSize();
      return !isForeign && this._setElStyles();
    }
  }
  /*
    Method to set new options on run.
    @private
  */
  _resetTween () {
    var i, k, key, len1, ref, timelineOptions;
    timelineOptions = {};
    ref = Object.keys(this.h.tweenOptionMap);
    for (i = k = 0, len1 = ref.length; k < len1; i = ++k) {
      key = ref[i];
      timelineOptions[key] = this.props[key];
    }
    timelineOptions.onStart = this.props.onStart;
    timelineOptions.onComplete = this.props.onComplete;
    // TODO: if should set timeline's props instead of tweens one
    this.tween._setProp(timelineOptions);
  }

  /*
    Method to set property on the module.
    @private
    @param {String, Object} Name of the property to set
                            or object with properties to set.
    @param {Any} Value for the property to set. Could be
                  undefined if the first param is object.
  */
  _setProp ( attr, value ) {
    if ( typeof attr === 'object' ) {
      var keys = Object.keys(attr);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i], val = keys[key];
        this.props[key] = val;
      }
    } else { this.props[attr] = value; }
  }
  /*
    Method to get if the x/y values changed.
  */
  _isNeedsTransform () {
    return this._isPropChanged('x') || this._isPropChanged('y');
  }
  /*
    Method to create transform string;
    @private
    @returns {String} Transform string.
  */
  _fillTransform () {
    var p = this.props;
    return `translate(${p.x}, ${p.y}) scale(${p.scale})`;
  }
}

export default Transit;
