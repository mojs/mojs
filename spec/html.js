(function() {
  var Html, el, h;

  Html = mojs.Html;

  h = mojs.h;

  el = document.createElement('div');

  describe('Html ->', function() {
    it('should extend Tunable', function() {
      var html;
      html = new Html({
        el: el
      });
      return expect(html instanceof mojs.Tunable).toBe(true);
    });
    describe('_extendDefaults method ->', function() {
      it('should copy all non-delta properties to _props', function() {
        var equal, html, p;
        html = new Html({
          el: el,
          borderWidth: '20px',
          borderRadius: '40px',
          y: 40,
          x: {
            20: 40
          },
          skewX: {
            20: 40
          },
          color: {
            'cyan': 'orange'
          }
        });
        p = html._props;
        expect(p['borderWidth']).toBe('20px');
        expect(p['borderRadius']).toBe('40px');
        expect(p['y']).toBe('40px');
        equal = {
          el: el,
          'borderWidth': '20px',
          'borderRadius': '40px',
          y: 40,
          x: {
            20: 40
          },
          skewX: {
            20: 40
          },
          color: {
            'cyan': 'orange'
          }
        };
        expect(html._addDefaults(html._o)).toEqual(html._addDefaults(equal));
        expect(html._renderProps).toEqual(['borderWidth', 'borderRadius']);
        return expect(html._drawProps).toEqual(['color']);
      });
      return it('should call _createDeltas method ->', function() {
        var html;
        html = new Html({
          el: el,
          borderWidth: '20px',
          borderRadius: '40px',
          x: {
            20: 40
          },
          color: {
            'cyan': 'orange'
          }
        });
        spyOn(html, '_createDeltas');
        html._extendDefaults();
        return expect(html._createDeltas).toHaveBeenCalledWith(html._addDefaults(html._o));
      });
    });
    describe('_createDeltas method ->', function() {
      it('should create deltas with passed object', function() {
        var html;
        html = new Html({
          el: el,
          borderWidth: '20px',
          borderRadius: '40px',
          x: {
            20: 40
          },
          color: {
            'cyan': 'orange'
          }
        });
        html.deltas = null;
        html.timeline = null;
        html._createDeltas(html._o);
        expect(html.deltas instanceof mojs._pool.Deltas).toBe(true);
        expect(html.deltas._o.options).toBe(html._o);
        expect(typeof html.deltas._o.onUpdate).toBe('function');
        spyOn(html, '_draw');
        html.deltas._o.onUpdate();
        expect(html._draw).toHaveBeenCalled();
        expect(html.deltas._o.props).toBe(html._props);
        return expect(html.timeline).toBe(html.deltas.timeline);
      });
      return it('should pass property maps to Deltas', function() {
        var html;
        html = new Html({
          el: el,
          borderWidth: '20px',
          borderRadius: '40px',
          x: {
            20: 40
          },
          color: {
            'cyan': 'orange'
          }
        });
        html.deltas._o._arrayPropertyMap = null;
        html.deltas._o._numberPropertyMap = null;
        html._createDeltas(html._o);
        expect(html.deltas._o.arrayPropertyMap).toBe(html._arrayPropertyMap);
        return expect(html.deltas._o.numberPropertyMap).toBe(html._numberPropertyMap);
      });
    });
    describe('_makeTween and _makeTimeline methods ->', function() {
      return it('should override them to empty methods', function() {
        var html;
        spyOn(mojs.Tweenable.prototype, '_makeTween');
        spyOn(mojs.Tweenable.prototype, '_makeTimeline');
        html = new Html({
          el: el
        });
        expect(mojs.Tweenable.prototype._makeTween).not.toHaveBeenCalled();
        return expect(mojs.Tweenable.prototype._makeTimeline).not.toHaveBeenCalled();
      });
    });
    describe('_vars method ->', function() {
      it('should call super', function() {
        var html;
        spyOn(mojs.Module.prototype, '_vars');
        html = new Html({
          el: el
        });
        return expect(mojs.Module.prototype._vars).toHaveBeenCalled();
      });
      return it('should create _state object', function() {
        var html;
        html = new Html({
          el: el
        });
        html._state = null;
        html._vars();
        expect(typeof html._state).toBe('object');
        return expect(html._state).toBe(html._state);
      });
    });
    describe('_declareDefaults method ->', function() {
      it('should _declareDefaults', function() {
        var html;
        html = new Html({
          el: el
        });
        html._defaults = null;
        html._declareDefaults();
        expect(html._defaults.x).toBe(0);
        expect(html._defaults.y).toBe(0);
        expect(html._defaults.z).toBe(0);
        expect(html._defaults.skewX).toBe(0);
        expect(html._defaults.skewY).toBe(0);
        expect(html._defaults.rotate).toBe(0);
        expect(html._defaults.rotateX).toBe(0);
        expect(html._defaults.rotateY).toBe(0);
        expect(html._defaults.rotateZ).toBe(0);
        expect(html._defaults.scale).toBe(1);
        expect(html._defaults.scaleX).toBe(1);
        return expect(html._defaults.scaleY).toBe(1);
      });
      it('should create _drawExclude object', function() {
        var html;
        html = new Html({
          el: el
        });
        html._drawExclude = null;
        html._declareDefaults();
        return expect(html._drawExclude.el).toBe(1);
      });
      it('should create _3dProperties object', function() {
        var html;
        html = new Html({
          el: el
        });
        html._3dProperties = null;
        html._declareDefaults();
        return expect(html._3dProperties).toEqual(['rotateX', 'rotateY', 'z']);
      });
      it('should create _arrayPropertyMap object', function() {
        var html;
        html = new Html({
          el: el
        });
        html._arrayPropertyMap = null;
        html._declareDefaults();
        expect(html._arrayPropertyMap.transformOrigin).toBe(1);
        return expect(html._arrayPropertyMap.backgroundPosition).toBe(1);
      });
      it('should create _numberPropertyMap object', function() {
        var html;
        html = new Html({
          el: el
        });
        html._numberPropertyMap = null;
        html._declareDefaults();
        expect(html._numberPropertyMap.opacity).toBe(1);
        expect(html._numberPropertyMap.scale).toBe(1);
        expect(html._numberPropertyMap.scaleX).toBe(1);
        expect(html._numberPropertyMap.scaleY).toBe(1);
        expect(html._numberPropertyMap.rotate).toBe(1);
        expect(html._numberPropertyMap.rotateX).toBe(1);
        expect(html._numberPropertyMap.rotateY).toBe(1);
        expect(html._numberPropertyMap.skewX).toBe(1);
        return expect(html._numberPropertyMap.skewY).toBe(1);
      });
      it('should create _prefixPropertyMap object', function() {
        var html;
        html = new Html({
          el: el
        });
        html._prefixPropertyMap = null;
        html._declareDefaults();
        expect(html._prefixPropertyMap.transform).toBe(1);
        return expect(html._prefixPropertyMap.transformOrigin).toBe(1);
      });
      return it('should create _prefix property', function() {
        var html;
        html = new Html({
          el: el
        });
        html._prefix = null;
        html._declareDefaults();
        return expect(html._prefix).toBe(h.prefix.css);
      });
    });
    describe('_addDefaults method', function() {
      it('should add defaults to passed object', function() {
        var html, isOk, key, obj, result, value, _ref;
        html = new Html({
          el: el
        });
        obj = {
          skewX: 20
        };
        result = html._addDefaults(obj);
        isOk = true;
        _ref = html._defaults;
        for (key in _ref) {
          value = _ref[key];
          if (value !== result[key] && key !== 'skewX') {
            isOk = false;
          }
        }
        return expect(isOk).toBe(true);
      });
      it('should fallback for scaleX/scaleY to scale', function() {
        var html, obj, result;
        html = new Html({
          el: el
        });
        obj = {
          skewX: 20,
          scale: 2,
          scaleY: 3
        };
        result = html._addDefaults(obj);
        expect(result.scale).toBe(2);
        expect(result.scaleX).toBe(2);
        return expect(result.scaleY).toBe(3);
      });
      return it('should get if any 3d present', function() {
        var html, obj, result;
        html = new Html({
          el: el
        });
        html._is3d = null;
        obj = {
          skewX: 20,
          scale: 2,
          scaleY: 3
        };
        result = html._addDefaults(obj);
        return expect(html._is3d).toBe(false);
      });
    });
    describe('_setStyle method', function() {
      it('should set style on el', function() {
        var html;
        el = document.createElement('div');
        html = new Html({
          el: el
        });
        html._props.el.style['borderWidth'] = null;
        html._setStyle('borderWidth', '50px');
        return expect(html._props.el.style['borderWidth']).toBe('50px');
      });
      it('should prefix properties that are in _prefixPropertyMap', function() {
        var html;
        el = document.createElement('div');
        html = new Html({
          el: el
        });
        html._props.el.style["" + h.prefix.css + "transform"] = null;
        html._setStyle('transform', 'scale(1)');
        return expect(html._props.el.style["" + h.prefix.css + "transform"]).toBe('scale(1)');
      });
      it('should add the style to _state', function() {
        var html;
        el = document.createElement('div');
        html = new Html({
          el: el
        });
        html._props.el.style['borderWidth'] = null;
        html._setStyle('borderWidth', '50px');
        return expect(html._state['borderWidth']).toBe('50px');
      });
      return it('should not set style if it is in _state', function() {
        var html;
        el = document.createElement('div');
        html = new Html({
          el: el
        });
        html._state['borderWidth'] = '50px';
        html._props.el.style['borderWidth'] = '20px';
        html._setStyle('borderWidth', '50px');
        return expect(html._props.el.style['borderWidth']).toBe('20px');
      });
    });
    describe('_drawTransform method', function() {
      it('should set transform on el', function() {
        var args, html, string;
        el = document.createElement('div');
        document.body.appendChild(el);
        html = new Html({
          el: el
        });
        spyOn(html, '_setStyle');
        html._drawTransform();
        args = html._setStyle.calls.first().args;
        expect(args[0]).toBe('transform');
        string = args[1];
        string = string.replace(/\n/gim, ' ');
        string = string.replace(/\s{2,}/gim, ' ');
        return expect(string).toBe('translate(0, 0) rotate(0deg) skew(0deg, 0deg) scale(1, 1)');
      });
      return it('should set 3d transform on el', function() {
        var args, html, string;
        el = document.createElement('div');
        document.body.appendChild(el);
        html = new Html({
          el: el,
          z: '10px'
        });
        spyOn(html, '_setStyle');
        html._drawTransform();
        args = html._setStyle.calls.first().args;
        expect(args[0]).toBe('transform');
        string = args[1];
        string = string.replace(/\n/gim, ' ');
        string = string.replace(/\s{2,}/gim, ' ');
        return expect(string).toBe('translate3d(0, 0, 10px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg) scale(1, 1)');
      });
    });
    return describe('_draw method', function() {
      it('should style _props to el', function() {
        var html;
        el = document.createElement('div');
        html = new Html({
          el: el,
          left: {
            '20px': '40px'
          }
        });
        spyOn(html, '_setStyle').and.callThrough();
        html._props.left = '30px';
        html._state.left = '0px';
        el.style['left'] = '';
        html._draw();
        expect(el.style['left']).toBe(html._props.left);
        return expect(html._setStyle).toHaveBeenCalledWith;
      });
      return it('should call _drawTransform method', function() {
        var html;
        el = document.createElement('div');
        html = new Html({
          el: el,
          left: {
            '20px': '40px'
          }
        });
        spyOn(html, '_drawTransform');
        html._draw();
        return expect(html._drawTransform).toHaveBeenCalled();
      });
    });
  });

}).call(this);
