(function() {
  var Html, el, h;

  Html = mojs.Html;

  h = mojs.h;

  el = document.createElement('div');

  describe('Html ->', function() {
    it('should extend Thenable', function() {
      var html;
      html = new Html({
        el: el
      });
      return expect(html instanceof mojs.Thenable).toBe(true);
    });
    describe('_extendDefaults method ->', function() {
      it('should copy all non-delta properties to _props', function() {
        var html, p;
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
        expect(p['z']).toBe(0);
        expect(p['skewY']).toBe(0);
        expect(p['angleX']).toBe(0);
        expect(p['angleY']).toBe(0);
        expect(p['angleZ']).toBe(0);
        expect(p['scale']).toBe(1);
        expect(p['scaleX']).toBe(1);
        expect(p['scaleY']).toBe(1);
        expect(p['isRefreshState']).toBe(true);
        expect(p['isShowStart']).toBe(true);
        expect(p['isShowEnd']).toBe(true);
        expect(p['isSoftHide']).toBe(true);
        expect(p['isForce3d']).toBe(false);
        expect(html._renderProps).toEqual(['borderWidth', 'borderRadius']);
        return expect(html._drawProps).toEqual(['color']);
      });
      it('should not copy tween properties _drawProps', function() {
        var html, p;
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
          },
          duration: 300,
          timeline: {
            delay: 300
          }
        });
        p = html._props;
        return expect(html._drawProps).toEqual(['color']);
      });
      it('should not copy customProperties _drawProps', function() {
        var customProperties, html, p;
        customProperties = {
          originX: {
            type: 'number',
            "default": 0
          },
          draw: function() {
            return {};
          }
        };
        html = new Html({
          el: el,
          color: {
            'cyan': 'red'
          },
          originX: {
            20: 40
          },
          customProperties: customProperties
        });
        p = html._props;
        return expect(html._drawProps).toEqual(['color']);
      });
      it('should not copy tween properties _renderProps', function() {
        var html, p;
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
          },
          duration: 300
        });
        p = html._props;
        return expect(html._renderProps).toEqual(['borderWidth', 'borderRadius']);
      });
      it('should not copy customProperties to _renderProps', function() {
        var customProperties, html;
        customProperties = {
          originX: {
            type: 'number',
            "default": 0
          },
          draw: function() {
            return {};
          }
        };
        html = new Html({
          el: el,
          borderWidth: '20px',
          borderRadius: '40px',
          originX: 20,
          customProperties: customProperties
        });
        return expect(html._renderProps).toEqual(['borderWidth', 'borderRadius']);
      });
      it('should call _createDeltas method ->', function() {
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
      it('should parse el ->', function() {
        var div, html;
        div = document.createElement('div');
        div.setAttribute('id', 'js-el');
        document.body.appendChild(div);
        html = new Html({
          el: '#js-el',
          borderWidth: '20px',
          borderRadius: '40px',
          x: {
            20: 40
          },
          color: {
            'cyan': 'orange'
          }
        });
        html._props.el = null;
        html._extendDefaults();
        expect(html._props.el instanceof HTMLElement).toBe(true);
        return expect(html._props.el).toBe(div);
      });
      it('should save _props.el to el ->', function() {
        var div, html;
        div = document.createElement('div');
        html = new Html({
          el: div,
          borderWidth: '20px',
          borderRadius: '40px',
          x: {
            20: 40
          },
          color: {
            'cyan': 'orange'
          }
        });
        return expect(html.el).toBe(div);
      });
      return it('should use props if passed ->', function() {
        var html, props;
        props = {};
        html = new Html({
          el: document.createElement('div'),
          props: props
        });
        return expect(html._props).toBe(props);
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
        html._createDeltas(html._o);
        expect(html.deltas instanceof mojs._pool.Deltas).toBe(true);
        expect(html.deltas._o.options).toBe(html._o);
        return expect(html.deltas._o.props).toBe(html._props);
      });
      it('should pass property maps to Deltas', function() {
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
        html.deltas._o.arrayPropertyMap = null;
        html.deltas._o.numberPropertyMap = null;
        html._createDeltas(html._o);
        expect(html.deltas._o.arrayPropertyMap).toBe(html._arrayPropertyMap);
        return expect(html.deltas._o.numberPropertyMap).toBe(html._numberPropertyMap);
      });
      it('should pass options callbacksContext to deltas', function() {
        var callbacksContext, html, o;
        html = new Html({
          el: el
        });
        callbacksContext = {};
        o = {
          callbacksContext: callbacksContext,
          x: {
            20: 40
          }
        };
        html._createDeltas(o);
        return expect(html.deltas._o.callbacksContext).toBe(callbacksContext);
      });
      it('should pass `this` as callbacksContext to deltas', function() {
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
        html.deltas._o.callbacksContext = null;
        html._createDeltas(html._o);
        return expect(html.deltas._o.callbacksContext).toBe(html);
      });
      it('should pass prevChainModule to deltas', function() {
        var html, prevChainModule;
        prevChainModule = {};
        html = new Html({
          el: el,
          borderWidth: '20px',
          borderRadius: '40px',
          x: {
            20: 40
          },
          color: {
            'cyan': 'orange'
          },
          prevChainModule: prevChainModule
        });
        html.deltas._o.isChained = null;
        html._createDeltas(html._o);
        return expect(html.deltas._o.isChained).toBe(true);
      });
      return it('should _customProps to deltas', function() {
        var customProps, fun, html;
        fun = function() {};
        customProps = {
          origin: 50,
          draw: fun
        };
        html = new Html({
          el: el,
          borderWidth: '20px',
          borderRadius: '40px',
          x: {
            20: 40
          },
          color: {
            'cyan': 'orange'
          },
          customProperties: customProps
        });
        html._createDeltas(html._o);
        return expect(html.deltas._o.customProps).toEqual(jasmine.objectContaining({
          origin: 50
        }));
      });
    });
    describe('_makeTween and _makeTimeline methods ->', function() {
      return it('should override them to empty methods', function() {
        var html;
        spyOn(mojs.Tweenable.prototype, '_makeTween');
        html = new Html({
          el: el
        });
        return expect(mojs.Tweenable.prototype._makeTween).not.toHaveBeenCalled();
      });
    });
    describe('_vars method ->', function() {
      it('should call refresh on deltas', function() {
        var html;
        html = new Html({
          el: el
        });
        spyOn(html.deltas, 'refresh');
        html._vars();
        return expect(html.deltas.refresh).toHaveBeenCalledWith(false);
      });
      it('should call super', function() {
        var html;
        spyOn(mojs.Module.prototype, '_vars');
        html = new Html({
          el: el
        });
        return expect(mojs.Module.prototype._vars).toHaveBeenCalled();
      });
      it('should create _state object', function() {
        var html;
        html = new Html({
          el: el
        });
        html._state = null;
        html._vars();
        expect(typeof html._state).toBe('object');
        return expect(html._state).toBe(html._state);
      });
      return it('should call restore on deltas', function() {
        var html;
        html = new Html({
          el: el
        });
        spyOn(html.deltas, 'restore');
        html._vars();
        return expect(html.deltas.restore).toHaveBeenCalled();
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
        expect(html._defaults.angleX).toBe(0);
        expect(html._defaults.angleY).toBe(0);
        expect(html._defaults.angleZ).toBe(0);
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
        return expect(html._3dProperties).toEqual(['angleX', 'angleY', 'z']);
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
        expect(html._numberPropertyMap.angleX).toBe(1);
        expect(html._numberPropertyMap.angleY).toBe(1);
        expect(html._numberPropertyMap.angleZ).toBe(1);
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
      it('should get if any 3d present', function() {
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
      it('should get if any 3d present // positive', function() {
        var html, obj, result;
        html = new Html({
          el: el
        });
        html._is3d = null;
        obj = {
          skewX: 20,
          scale: 2,
          scaleY: 3,
          z: 20
        };
        result = html._addDefaults(obj);
        return expect(html._is3d).toBe(true);
      });
      return it('should _is3d be true is isForce3d set', function() {
        var html, obj, result;
        html = new Html({
          el: el,
          isForce3d: true
        });
        html._is3d = null;
        obj = {
          skewX: 20,
          scale: 2,
          scaleY: 3
        };
        result = html._addDefaults(obj);
        return expect(html._is3d).toBe(true);
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
    describe('_draw method', function() {
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
      it('should call _drawTransform method', function() {
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
      return it('should call _customDraw method', function() {
        var customDraw, html;
        el = document.createElement('div');
        customDraw = function() {};
        html = new Html({
          el: el,
          left: {
            '20px': '40px'
          },
          customProperties: {
            x: {
              type: 'number',
              "default": 0
            },
            draw: customDraw
          }
        });
        spyOn(html, '_customDraw');
        html._draw();
        return expect(html._customDraw).toHaveBeenCalledWith(html._props.el, html._props);
      });
    });
    describe('_render method ->', function() {
      it('should set initial properties', function() {
        var html;
        el = document.createElement('div');
        html = new Html({
          el: el,
          borderRadius: 25
        });
        spyOn(html, '_setStyle');
        html._render();
        expect(html._setStyle).toHaveBeenCalledWith('borderRadius', '25px');
        return expect(html._setStyle.calls.count()).toBe(2);
      });
      it('should not add pixels if a string', function() {
        var html;
        el = document.createElement('div');
        html = new Html({
          el: el,
          borderRadius: '25rem'
        });
        spyOn(html, '_setStyle');
        html._render();
        expect(html._setStyle).toHaveBeenCalledWith('borderRadius', '25rem');
        return expect(html._setStyle.calls.count()).toBe(2);
      });
      it('should call _draw method', function() {
        var html;
        el = document.createElement('div');
        html = new Html({
          el: el
        });
        spyOn(html, '_draw');
        html._render();
        expect(html._draw).toHaveBeenCalled();
        return expect(html._draw.calls.count()).toBe(1);
      });
      it('should return immediately if `prevChainModule`', function() {
        var html;
        el = document.createElement('div');
        html = new Html({
          el: el,
          prevChainModule: {}
        });
        spyOn(html, '_draw');
        spyOn(html, '_setStyle');
        html._render();
        expect(html._draw).not.toHaveBeenCalled();
        return expect(html._setStyle).not.toHaveBeenCalled();
      });
      it('should not call _hide if isShowStart is true', function() {
        var html;
        html = new Html({
          el: document.createElement('div')
        });
        spyOn(html, '_hide');
        html._render();
        return expect(html._hide).not.toHaveBeenCalled();
      });
      it('should call _hide if isShowStart is false', function() {
        var html;
        html = new Html({
          el: document.createElement('div'),
          isShowStart: false
        });
        spyOn(html, '_hide');
        html._render();
        return expect(html._hide).toHaveBeenCalled();
      });
      return it('should not call _hide if module is chained', function() {
        var html;
        html = new Html({
          el: document.createElement('div'),
          prevChainModule: {},
          isShowStart: false
        });
        spyOn(html, '_hide');
        html._render();
        return expect(html._hide).not.toHaveBeenCalled();
      });
    });
    describe('_arrToString method ->', function() {
      return it('should cast array to string', function() {
        var arr, html;
        el = document.createElement('div');
        html = new Html({
          el: el
        });
        arr = h.strToArr('200px 300px');
        return expect(html._arrToString(arr)).toBe('200px 300px ');
      });
    });
    describe('_parseOption method ->', function() {
      it('should call super', function() {
        var html, name, value;
        name = 'x';
        value = 20;
        html = new Html({
          el: document.createElement('div')
        });
        spyOn(mojs.Module.prototype, '_parseOption');
        html._parseOption(name, value);
        return expect(mojs.Module.prototype._parseOption).toHaveBeenCalledWith(name, value);
      });
      return it('should cast array values', function() {
        var html, name, value;
        name = 'transformOrigin';
        value = '200px 300px';
        html = new Html({
          el: document.createElement('div')
        });
        html._parseOption(name, value);
        return expect(html._props[name]).toBe('200px 300px ');
      });
    });
    describe('then method ->', function() {
      it('should call `refresh` on the last `_module`', function() {
        var html;
        html = new Html({
          el: document.createElement('div'),
          borderRadius: 10
        });
        spyOn(html._modules[0].deltas, 'refresh');
        html.then({
          borderRadius: 0
        });
        return expect(html._modules[0].deltas.refresh).toHaveBeenCalledWith(false);
      });
      it('should call `refresh` on the last `_module` #2', function() {
        var html;
        html = new Html({
          el: document.createElement('div'),
          borderRadius: 10
        }).then({
          borderRadius: 0
        });
        spyOn(html._modules[1].deltas, 'refresh').and.callThrough();
        html.then({
          borderRadius: 20
        });
        return expect(html._modules[1].deltas.refresh).toHaveBeenCalledWith(false);
      });
      it('should set the last `_history` record to last `_modules` `_props`', function() {
        var html;
        html = new Html({
          el: document.createElement('div'),
          borderRadius: 10
        });
        html._history[0] = void 0;
        html.then({
          borderRadius: 0
        });
        return expect(html._history[0]).toBeDefined();
      });
      it('should set the last `_history` record to last `_modules` `_props` #2', function() {
        var html;
        html = new Html({
          el: document.createElement('div'),
          borderRadius: 10
        }).then({
          borderRadius: 0
        });
        html._history[1] = void 0;
        html.then({
          borderRadius: 0
        });
        return expect(html._history[1]).toBeDefined();
      });
      it('should call `super`', function() {
        var html, opts;
        html = new Html({
          el: document.createElement('div'),
          borderRadius: 10
        });
        spyOn(mojs.Thenable.prototype, 'then');
        opts = {
          borderRadius: 0
        };
        html.then(opts);
        return expect(mojs.Thenable.prototype.then).toHaveBeenCalledWith(opts);
      });
      it('should restore `deltas`', function() {
        var html;
        html = new Html({
          el: document.createElement('div'),
          borderRadius: 10
        });
        spyOn(html._modules[0].deltas, 'restore');
        html.then({
          borderRadius: 0
        });
        return expect(html._modules[0].deltas.restore).toHaveBeenCalled();
      });
      it('should restore `deltas` #2', function() {
        var html;
        html = new Html({
          el: document.createElement('div'),
          borderRadius: 10
        }).then({
          borderRadius: 0
        });
        spyOn(html._modules[1].deltas, 'restore');
        html.then({
          borderRadius: 0
        });
        return expect(html._modules[1].deltas.restore).toHaveBeenCalled();
      });
      it('should return `this`', function() {
        var html, result;
        html = new Html({
          el: document.createElement('div'),
          borderRadius: 10
        });
        result = html.then({
          borderRadius: 0
        });
        return expect(result).toBe(html);
      });
      it('should return if no options passed', function() {
        var html;
        html = new Html({
          el: document.createElement('div'),
          borderRadius: 10
        });
        spyOn(html._modules[0].deltas, 'refresh');
        html.then();
        return expect(html._modules[0].deltas.refresh).not.toHaveBeenCalled();
      });
      return it('should return if empty object passed', function() {
        var html;
        html = new Html({
          el: document.createElement('div'),
          borderRadius: 10
        });
        spyOn(html._modules[0].deltas, 'refresh');
        html.then({});
        return expect(html._modules[0].deltas.refresh).not.toHaveBeenCalled();
      });
    });
    describe('_checkStartValue method ->', function() {
      it('should pipe the start value', function() {
        var html;
        html = new Html({
          el: document.createElement('div'),
          borderRadius: 10
        });
        return expect(html._checkStartValue('x', 20)).toBe(20);
      });
      it('should fallback to 1 for opacity', function() {
        var html;
        html = new Html({
          el: document.createElement('div'),
          borderRadius: 10
        });
        expect(html._checkStartValue('opacity')).toBe('1');
        return expect(html._checkStartValue('opacity', .5)).toBe(.5);
      });
      it('should fallback to _defaults if property is there', function() {
        var html, key, value, _ref, _results;
        html = new Html({
          el: document.createElement('div'),
          borderRadius: 10
        });
        _ref = html._defaults;
        _results = [];
        for (key in _ref) {
          value = _ref[key];
          expect(html._checkStartValue(key)).toBe(value);
          _results.push(expect(html._checkStartValue(key, .5)).toBe(.5));
        }
        return _results;
      });
      it('should fallback to _customProps if property is there', function() {
        var customProperties, html;
        customProperties = {
          originY: 50
        };
        html = new Html({
          el: document.createElement('div'),
          borderRadius: 10,
          customProperties: customProperties
        });
        return expect(html._checkStartValue('originY')).toBe(customProperties.originY);
      });
      it('should fallback DOM defaults otherwise', function() {
        var div, html;
        html = new Html({
          el: document.createElement('div'),
          borderRadius: 10
        });
        div = document.createElement('div');
        expect(html._checkStartValue('borderRadius')).toBe(h.defaultStyles['borderRadius']);
        return expect(html._checkStartValue('borderRadius', .5)).toBe(.5);
      });
      return it('should fallback to 0 at the end', function() {
        var html;
        html = new Html({
          el: document.createElement('div'),
          borderRadius: 10
        });
        expect(html._checkStartValue('someUnknownProperty')).toBe(0);
        return expect(html._checkStartValue('someUnknownProperty', .5)).toBe(.5);
      });
    });
    describe('custom properties ->', function() {
      return describe('_saveCustomProperties method ->', function() {
        var customProps, draw;
        draw = function(el, props) {
          return {
            el: el
          };
        };
        customProps = {
          originX: {
            type: 'unit',
            "default": '50%'
          },
          draw: draw
        };
        it('should save customProperties object', function() {
          var fun, html;
          spyOn(Html.prototype, '_saveCustomProperties').and.callThrough();
          fun = function() {};
          customProps = {
            origin: 50,
            draw: fun
          };
          html = new Html({
            el: document.createElement('div'),
            borderRadius: 10,
            customProperties: customProps
          });
          expect(Html.prototype._saveCustomProperties).toHaveBeenCalled();
          expect(html._customProps).toEqual({
            origin: 50
          });
          expect(html._customDraw).toBe(fun);
          expect(html._customProps.draw).not.toBeDefined();
          return expect(html._o.customProperties).not.toBeDefined();
        });
        return it('should call _copyDefaultCustomProps method', function() {
          var html;
          html = new Html({
            el: document.createElement('div'),
            borderRadius: 10,
            customProperties: customProps
          });
          spyOn(html, '_copyDefaultCustomProps');
          html._saveCustomProperties();
          return expect(html._copyDefaultCustomProps).toHaveBeenCalled();
        });
      });
    });
    describe('_makeTimeline method ->', function() {
      it('should call super', function() {
        var html;
        html = new Html({
          el: document.createElement('div'),
          borderRadius: 10
        });
        html.timeline = null;
        spyOn(mojs.Tweenable.prototype, '_makeTimeline').and.callThrough();
        html._makeTimeline();
        return expect(mojs.Tweenable.prototype._makeTimeline).toHaveBeenCalled();
      });
      it('should add deltas to the timeline', function() {
        var html;
        html = new Html({
          el: document.createElement('div'),
          borderRadius: 10
        });
        html.timeline = null;
        spyOn(mojs.Timeline.prototype, 'add').and.callThrough();
        html._makeTimeline();
        expect(mojs.Timeline.prototype.add).toHaveBeenCalledWith(html.deltas);
        return expect(html.timeline._timelines[0]).toBe(html.deltas.timeline);
      });
      it('should not call super if prevChainModule set', function() {
        var html, html0;
        html0 = new Html({
          el: document.createElement('div')
        });
        html = new Html({
          el: document.createElement('div'),
          borderRadius: 10,
          prevChainModule: html0
        });
        html.timeline = null;
        spyOn(mojs.Tweenable.prototype, '_makeTimeline').and.callThrough();
        html._makeTimeline();
        return expect(mojs.Tweenable.prototype._makeTimeline).not.toHaveBeenCalled();
      });
      return it('should not add deltas to the timeline if chained', function() {
        var html, html0;
        html0 = new Html({
          el: document.createElement('div')
        });
        html = new Html({
          el: document.createElement('div'),
          borderRadius: 10,
          prevChainModule: html0
        });
        spyOn(mojs.Timeline.prototype, 'add').and.callThrough();
        html._makeTimeline();
        expect(mojs.Timeline.prototype.add).not.toHaveBeenCalledWith(html.deltas);
        return expect(html.timeline).toBe(html.deltas.timeline);
      });
    });
    describe('_addCallbackOverrides method ->', function() {
      it('should add callbackOverrides passed object', function() {
        var html, obj;
        html = new Html({
          el: document.createElement('div'),
          borderRadius: 10
        });
        obj = {};
        html._addCallbackOverrides(obj);
        expect(obj.callbackOverrides.onUpdate).toBe(html._draw);
        return expect(obj.callbackOverrides.onRefresh).toBe(html._draw);
      });
      it('should not add onRefresh if isRefreshState set to false', function() {
        var html, obj;
        html = new Html({
          el: document.createElement('div'),
          borderRadius: 10,
          isRefreshState: false
        });
        obj = {};
        html._addCallbackOverrides(obj);
        expect(obj.callbackOverrides.onUpdate).toBe(html._draw);
        return expect(obj.callbackOverrides.onRefresh).not.toBeDefined();
      });
      describe('onStart callback override ->', function() {
        it('should override this._o.onStart', function() {
          var html, obj;
          html = new Html({
            el: document.createElement('div')
          });
          obj = {};
          html._addCallbackOverrides(obj);
          return expect(typeof obj.callbackOverrides.onStart).toBe('function');
        });
        it('should call _show if isForward and !_isChained and isShowStart is false', function() {
          var html, obj;
          html = new Html({
            el: document.createElement('div'),
            isShowStart: false
          });
          obj = {};
          html._addCallbackOverrides(obj);
          spyOn(html, '_show');
          obj.callbackOverrides.onStart(true);
          return expect(html._show).toHaveBeenCalled();
        });
        it('should not call _show if isShowStart is true', function() {
          var html, obj;
          html = new Html({
            el: document.createElement('div')
          });
          obj = {};
          html._addCallbackOverrides(obj);
          spyOn(html, '_show');
          obj.callbackOverrides.onStart(true);
          return expect(html._show).not.toHaveBeenCalled();
        });
        it('should not call _show if _isChained', function() {
          var html, obj;
          html = new Html({
            el: document.createElement('div'),
            masterModule: new Html({
              el: document.createElement('div')
            })
          });
          obj = {};
          html._addCallbackOverrides(obj);
          spyOn(html, '_show');
          obj.callbackOverrides.onStart(true);
          return expect(html._show).not.toHaveBeenCalled();
        });
        it('should call _hide if not isForward and !_isChained and isShowStart is false', function() {
          var html, obj;
          html = new Html({
            el: document.createElement('div'),
            isShowStart: false
          });
          obj = {};
          html._addCallbackOverrides(obj);
          spyOn(html, '_hide');
          obj.callbackOverrides.onStart(false);
          return expect(html._hide).toHaveBeenCalled();
        });
        it('should not call _hide if not isForward and !_isChained and isShowStart is true', function() {
          var html, obj;
          html = new Html({
            el: document.createElement('div')
          });
          obj = {};
          html._addCallbackOverrides(obj);
          spyOn(html, '_hide');
          obj.callbackOverrides.onStart(false);
          return expect(html._hide).not.toHaveBeenCalled();
        });
        it('should not call _hide if _isChained', function() {
          var html, obj;
          html = new Html({
            el: document.createElement('div'),
            isShowStart: false,
            masterModule: new Html({
              el: document.createElement('div')
            })
          });
          obj = {};
          html._addCallbackOverrides(obj);
          spyOn(html, '_hide');
          obj.callbackOverrides.onStart(false);
          return expect(html._hide).not.toHaveBeenCalled();
        });
        return it('should not call _hide if not isForward and isShowStart', function() {
          var html, obj;
          html = new Html({
            el: document.createElement('div')
          });
          obj = {};
          html._addCallbackOverrides(obj);
          spyOn(html, '_hide');
          obj.callbackOverrides.onStart(false);
          return expect(html._hide).not.toHaveBeenCalled();
        });
      });
      return describe('onComplete callback override ->', function() {
        it('should override this._o.onComplete', function() {
          var html, obj;
          html = new Html({
            el: document.createElement('div')
          });
          obj = {};
          html._addCallbackOverrides(obj);
          return expect(typeof obj.callbackOverrides.onComplete).toBe('function');
        });
        it('should call _show if !isForward and isShowEnd is false', function() {
          var html, obj;
          html = new Html({
            el: document.createElement('div'),
            isShowEnd: false
          });
          obj = {};
          html._addCallbackOverrides(obj);
          spyOn(html, '_show');
          obj.callbackOverrides.onComplete(false);
          return expect(html._show).toHaveBeenCalled();
        });
        it('should not call _show if !isForward and isShowEnd is true', function() {
          var html, obj;
          html = new Html({
            el: document.createElement('div')
          });
          obj = {};
          html._addCallbackOverrides(obj);
          spyOn(html, '_show');
          obj.callbackOverrides.onComplete(false);
          return expect(html._show).not.toHaveBeenCalled();
        });
        it('should call _show if !isForward and _isChained and isShowEnd is false', function() {
          var html, obj;
          html = new Html({
            el: document.createElement('div'),
            isShowEnd: false
          });
          obj = {};
          html._addCallbackOverrides(obj);
          spyOn(html, '_show');
          obj.callbackOverrides.onComplete(false);
          return expect(html._show).toHaveBeenCalled();
        });
        it('should call _show if !isForward and !_isChained', function() {
          var html, obj, obj2;
          html = new Html({
            el: document.createElement('div'),
            isShowEnd: false
          }).then({
            radius: 0
          });
          el = html._modules[1];
          obj = {};
          obj2 = {};
          html._addCallbackOverrides(obj);
          el._addCallbackOverrides(obj2);
          spyOn(html, '_show');
          spyOn(el, '_show');
          obj.callbackOverrides.onComplete(false);
          obj2.callbackOverrides.onComplete(false);
          expect(el._show).not.toHaveBeenCalled();
          return expect(html._show).toHaveBeenCalled();
        });
        it('should call _hide if isForward and !isShowEnd', function() {
          var html, obj;
          html = new Html({
            el: document.createElement('div'),
            isShowEnd: false
          });
          obj = {};
          html._addCallbackOverrides(obj);
          spyOn(html, '_hide');
          obj.callbackOverrides.onComplete(true);
          return expect(html._hide).toHaveBeenCalled();
        });
        it('should not call _hide if isForward but isShowEnd', function() {
          var html, obj;
          html = new Html({
            el: document.createElement('div')
          });
          obj = {};
          html._addCallbackOverrides(obj);
          spyOn(html, '_hide');
          obj.callbackOverrides.onComplete(true);
          return expect(html._hide).not.toHaveBeenCalled();
        });
        it('should call _hide if isForward and !_isChained', function() {
          var html, obj;
          html = new Html({
            el: document.createElement('div'),
            isShowEnd: false
          });
          obj = {};
          html._addCallbackOverrides(obj);
          spyOn(html, '_hide');
          obj.callbackOverrides.onComplete(true);
          return expect(html._hide).toHaveBeenCalled();
        });
        it('should call not _hide if isForward and _isChained', function() {
          var html, obj;
          html = new Html({
            isShowEnd: false,
            el: document.createElement('div')
          }).then({
            radius: 0
          });
          obj = {};
          el._addCallbackOverrides(obj);
          spyOn(html, '_hide');
          obj.callbackOverrides.onComplete(true);
          return expect(html._hide).not.toHaveBeenCalled();
        });
        it('should not call _hide if isForward and _isLastInChain but isShowEnd', function() {
          var html, obj;
          html = new Html({
            el: document.createElement('div')
          });
          obj = {};
          html._addCallbackOverrides(obj);
          spyOn(html, '_hide');
          obj.callbackOverrides.onComplete(true);
          return expect(html._hide).not.toHaveBeenCalled();
        });
        return it('should not call _hide if isForward but !_isLastInChain and isShowEnd', function() {
          var html, obj;
          html = new Html({
            el: document.createElement('div')
          }).then({
            radius: 0
          });
          obj = {};
          html._addCallbackOverrides(obj);
          spyOn(html, '_hide');
          obj.callbackOverrides.onComplete(true);
          return expect(html._hide).not.toHaveBeenCalled();
        });
      });
    });
    describe('_resetMergedFlags method ->', function() {
      return it('should call super and add props', function() {
        var html, opts, result;
        html = new Html({
          el: document.createElement('div'),
          borderRadius: 10
        });
        spyOn(mojs.Thenable.prototype, '_resetMergedFlags');
        opts = {};
        result = html._resetMergedFlags(opts);
        expect(result).toBe(opts);
        expect(result.props).toBe(html._props);
        expect(result.customProperties).toBe(html._customProps);
        return expect(mojs.Thenable.prototype._resetMergedFlags).toHaveBeenCalledWith(opts);
      });
    });
    describe('_copyDefaultCustomProps method ->', function() {
      it('should copy _customProps defaults to _o', function() {
        var customProperties, html;
        customProperties = {
          originY: 1000,
          originX: 500
        };
        html = new Html({
          el: document.createElement('div'),
          borderRadius: 10,
          customProperties: customProperties
        });
        html._o.originY = null;
        html._o.originX = null;
        html._copyDefaultCustomProps();
        expect(html._o.originY).toBe(customProperties.originY);
        return expect(html._o.originX).toBe(customProperties.originX);
      });
      return it('should not copy _customProps defaults to _o if set', function() {
        var customProperties, html;
        customProperties = {
          originY: 1000,
          originX: 500
        };
        html = new Html({
          el: document.createElement('div'),
          borderRadius: 10,
          originX: 200,
          customProperties: customProperties
        });
        html._copyDefaultCustomProps();
        expect(html._o.originY).toBe(customProperties.originY);
        return expect(html._o.originX).toBe(200);
      });
    });
    return describe('_showByTransform method', function() {
      return it('should call _drawTransform method', function() {
        var shape;
        shape = new Html({
          el: document.createElement('div'),
          easing: function(k) {
            return 1;
          }
        });
        spyOn(shape, '_drawTransform');
        shape._showByTransform();
        return expect(shape._drawTransform).toHaveBeenCalled();
      });
    });
  });

}).call(this);
