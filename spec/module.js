(function() {
  var Module, h, oldFun;

  Module = mojs.Module;

  h = mojs.h;

  oldFun = Module.prototype._declareDefaults;

  describe('module class ->', function() {
    it('set the _defaults up', function() {
      var defaults;
      defaults = {
        stroke: 'transparent',
        strokeOpacity: 1,
        strokeLinecap: '',
        strokeWidth: 2,
        strokeDasharray: 0,
        strokeDashoffset: 0,
        fill: 'deeppink',
        fillOpacity: 1,
        left: 0,
        top: 0,
        x: 0,
        y: 0,
        rx: 0,
        ry: 0,
        angle: 0,
        scale: 1,
        opacity: 1,
        points: 3,
        radius: {
          0: 50
        },
        radiusX: null,
        radiusY: null,
        isShowStart: false,
        isSoftHide: true,
        isShowEnd: false,
        size: null,
        sizeGap: 0,
        callbacksContext: null
      };
      return Module.prototype._declareDefaults = function() {
        return this._defaults = defaults;
      };
    });
    describe('init ->', function() {
      it('should save options to _o', function() {
        var md, options;
        options = {};
        md = new Module(options);
        return expect(md._o).toBe(options);
      });
      it('should create _arrayPropertyMap', function() {
        var md;
        md = new Module;
        expect(md._arrayPropertyMap['strokeDasharray']).toBe(1);
        expect(md._arrayPropertyMap['strokeDashoffset']).toBe(1);
        return expect(md._arrayPropertyMap['origin']).toBe(1);
      });
      it('should create _arrayPropertyMap', function() {
        var md;
        md = new Module;
        expect(md._skipPropsDelta.callbacksContext).toBe(1);
        expect(md._skipPropsDelta.timeline).toBe(1);
        return expect(md._skipPropsDelta.prevChainModule).toBe(1);
      });
      it('should fallback to empty object for _o', function() {
        var md;
        md = new Module;
        expect(Object.keys(md._o).length).toBe(0);
        expect(typeof md._o).toBe('object');
        return expect(md._o).toBe(md._o);
      });
      it('should call _declareDefaults method', function() {
        var md;
        spyOn(Module.prototype, '_declareDefaults').and.callThrough();
        md = new Module;
        return expect(Module.prototype._declareDefaults).toHaveBeenCalled();
      });
      it('should call _extendDefaults method', function() {
        var md;
        spyOn(Module.prototype, '_extendDefaults').and.callThrough();
        md = new Module;
        return expect(Module.prototype._extendDefaults).toHaveBeenCalled();
      });
      it('should call _vars method', function() {
        var md;
        spyOn(Module.prototype, '_vars').and.callThrough();
        md = new Module;
        return expect(Module.prototype._vars).toHaveBeenCalled();
      });
      it('should call _render method', function() {
        var md;
        spyOn(Module.prototype, '_render').and.callThrough();
        md = new Module;
        return expect(Module.prototype._render).toHaveBeenCalled();
      });
      it('should create _index property', function() {
        var index, md;
        index = 5;
        md = new Module({
          index: index
        });
        return expect(md._index).toBe(index);
      });
      return it('should fallback to 0 for _index property', function() {
        var md;
        md = new Module;
        return expect(md._index).toBe(0);
      });
    });
    describe('_declareDefaults method ->', function() {
      return it('should create _defaults object', function() {
        var md;
        spyOn(Module.prototype, '_declareDefaults').and.callThrough();
        md = new Module;
        expect(Module.prototype._declareDefaults).toHaveBeenCalled();
        expect(typeof md._defaults).toBe('object');
        return expect(md._defaults).toBe(md._defaults);
      });
    });
    describe('_vars method ->', function() {
      it('should set _progress property to 0', function() {
        var md;
        md = new Module;
        return expect(md._progress).toBe(0);
      });
      return it('should create _strokeDasharrayBuffer array', function() {
        var md;
        md = new Module;
        expect(md._strokeDasharrayBuffer.length).toBe(0);
        return expect(h.isArray(md._strokeDasharrayBuffer)).toBe(true);
      });
    });
    describe('_assignProp method ->', function() {
      return it('should set property on _props object', function() {
        var md, value;
        value = 2;
        md = new Module;
        md._assignProp('a', value);
        return expect(md._props.a).toBe(value);
      });
    });
    describe('_setProp method ->', function() {
      it('should set new tween options', function() {
        var t;
        t = new Module({
          duration: 100,
          delay: 0
        });
        t._setProp({
          duration: 1000,
          delay: 200
        });
        expect(t._props.duration).toBe(1000);
        return expect(t._props.delay).toBe(200);
      });
      return it('should work with arguments', function() {
        var t;
        t = new Module({
          duration: 100
        });
        t._setProp('duration', 1000);
        return expect(t._props.duration).toBe(1000);
      });
    });
    describe('_hide method ->', function() {
      it('should set `display` of `el` to `none`', function() {
        var byte;
        byte = new Module({
          isSoftHide: false
        });
        byte.el = document.createElement('div');
        byte.el.style['display'] = 'block';
        byte._hide();
        return expect(byte.el.style['display']).toBe('none');
      });
      it('should set `_isShown` to false', function() {
        var byte;
        byte = new Module({
          isSoftHide: false
        });
        byte.el = document.createElement('div');
        byte._isShown = true;
        byte._hide();
        return expect(byte._isShown).toBe(false);
      });
      return describe('isSoftHide option ->', function() {
        return it('should set scale to 0', function() {
          var byte, style, tr;
          byte = new Module({
            radius: 25,
            isSoftHide: true
          });
          byte.el = document.createElement('div');
          byte._hide();
          style = byte.el.style;
          tr = style['transform'] || style["" + h.prefix.css + "transform"];
          return expect(tr).toBe('scale(0)');
        });
      });
    });
    describe('_show method ->', function() {
      it('should set `display` of `el` to `block`', function() {
        var byte;
        byte = new Module({
          radius: 25,
          isSoftHide: false
        });
        byte.el = document.createElement('div');
        byte.el.style['display'] = 'none';
        byte._show();
        return expect(byte.el.style['display']).toBe('block');
      });
      it('should set `_isShown` to true', function() {
        var byte;
        byte = new Module({
          radius: 25,
          isSoftHide: false
        });
        byte._isShown = true;
        byte._show();
        return expect(byte._isShown).toBe(true);
      });
      return describe('isSoftHide option ->', function() {
        return it('should set `transform` to normal', function() {
          var byte;
          byte = new Module({
            radius: 25,
            isSoftHide: true,
            opacity: .2
          });
          byte.el = document.createElement('div');
          byte.el.style['opacity'] = '0';
          byte.el.style['transform'] = 'none';
          spyOn(byte, '_showByTransform');
          byte._show();
          return expect(byte._showByTransform).toHaveBeenCalled();
        });
      });
    });
    describe('_parseOptionString method ->', function() {
      var tr;
      tr = new Module;
      it('should parse stagger values', function() {
        var result, string;
        string = 'stagger(200)';
        spyOn(h, 'parseStagger').and.callThrough();
        result = tr._parseOptionString(string);
        expect(h.parseStagger).toHaveBeenCalledWith(string, 0);
        return expect(result).toBe(h.parseStagger(string, 0));
      });
      return it('should parse rand values', function() {
        var result, string;
        string = 'rand(0,1)';
        spyOn(h, 'parseRand').and.callThrough();
        result = tr._parseOptionString(string);
        return expect(h.parseRand).toHaveBeenCalledWith(string);
      });
    });
    describe('_parsePositionOption method ->', function() {
      var tr;
      tr = new Module;
      it('should parse position option', function() {
        var key, result, value;
        key = 'x';
        value = '100%';
        spyOn(h, 'parseUnit').and.callThrough();
        result = tr._parsePositionOption(key, value);
        expect(h.parseUnit).toHaveBeenCalledWith(value);
        return expect(result).toBe(h.parseUnit(value).string);
      });
      return it('should leave the value unattended if not pos property', function() {
        var key, result;
        tr._props.x = '100%';
        key = 'fill';
        spyOn(h, 'parseUnit').and.callThrough();
        result = tr._parsePositionOption(key);
        expect(h.parseUnit).not.toHaveBeenCalledWith();
        return expect(result).toBe(tr._props[key]);
      });
    });
    describe('_parseStrokeDashOption method ->', function() {
      var tr;
      tr = new Module;
      it('should parse strokeDash option', function() {
        var key, result, value;
        key = 'strokeDasharray';
        value = 200;
        spyOn(h, 'parseUnit').and.callThrough();
        result = tr._parseStrokeDashOption(key, value);
        expect(h.parseUnit).toHaveBeenCalledWith(value);
        expect(result[0].unit).toBe(h.parseUnit(value).unit);
        expect(result[0].isStrict).toBe(h.parseUnit(value).isStrict);
        expect(result[0].value).toBe(h.parseUnit(value).value);
        expect(result[0].string).toBe(h.parseUnit(value).string);
        return expect(result[1]).not.toBeDefined();
      });
      it('should parse strokeDash option string', function() {
        var key, result, value;
        key = 'strokeDasharray';
        value = '200 100';
        spyOn(h, 'parseUnit').and.callThrough();
        result = tr._parseStrokeDashOption(key, value);
        expect(h.parseUnit).toHaveBeenCalledWith('200');
        expect(h.parseUnit).toHaveBeenCalledWith('100');
        expect(result[0].unit).toBe(h.parseUnit(200).unit);
        expect(result[0].isStrict).toBe(h.parseUnit(200).isStrict);
        expect(result[0].value).toBe(h.parseUnit(200).value);
        expect(result[0].string).toBe(h.parseUnit(200).string);
        expect(result[1].unit).toBe(h.parseUnit(100).unit);
        expect(result[1].isStrict).toBe(h.parseUnit(100).isStrict);
        expect(result[1].value).toBe(h.parseUnit(100).value);
        expect(result[1].string).toBe(h.parseUnit(100).string);
        return expect(result[2]).not.toBeDefined();
      });
      it('should parse strokeDashoffset option', function() {
        var key, result, value;
        key = 'strokeDashoffset';
        value = '100%';
        spyOn(h, 'parseUnit').and.callThrough();
        result = tr._parseStrokeDashOption(key, value);
        expect(h.parseUnit).toHaveBeenCalledWith(value);
        expect(result[0].unit).toBe(h.parseUnit(value).unit);
        expect(result[0].isStrict).toBe(h.parseUnit(value).isStrict);
        expect(result[0].value).toBe(h.parseUnit(value).value);
        expect(result[0].string).toBe(h.parseUnit(value).string);
        return expect(result[1]).not.toBeDefined();
      });
      return it('should leave the value unattended if not strokeDash.. property', function() {
        var key, result;
        tr._props.x = '100%';
        key = 'fill';
        spyOn(h, 'parseUnit').and.callThrough();
        result = tr._parseStrokeDashOption(key);
        expect(h.parseUnit).not.toHaveBeenCalledWith();
        return expect(result).toBe(tr._props[key]);
      });
    });
    describe('_isDelta method ->', function() {
      return it('should detect if value is not a delta value', function() {
        var byte;
        byte = new Module({
          radius: 45,
          stroke: {
            'deeppink': 'pink'
          }
        });
        expect(byte._isDelta(45)).toBe(false);
        expect(byte._isDelta('45')).toBe(false);
        expect(byte._isDelta(['45'])).toBe(false);
        expect(byte._isDelta({
          unit: 'px',
          value: 20
        })).toBe(false);
        return expect(byte._isDelta({
          20: 30
        })).toBe(true);
      });
    });
    describe('_parseOption method ->', function() {
      it('should parse delta value', function() {
        var delta, md, name;
        md = new Module;
        spyOn(md, '_getDelta');
        name = 'x';
        delta = {
          20: 30
        };
        md._parseOption(name, delta);
        expect(md._getDelta).toHaveBeenCalledWith(name, delta);
        return expect(md._props[name]).toBe(md._parseProperty(name, h.getDeltaEnd(delta)));
      });
      it('should parse option string', function() {
        var md, name, value;
        md = new Module;
        spyOn(md, '_getDelta');
        spyOn(md, '_parseOptionString').and.callThrough();
        name = 'delay';
        value = 'stagger(400, 200)';
        md._parseOption(name, value);
        expect(md._getDelta).not.toHaveBeenCalledWith(name, value);
        expect(md._parseOptionString).toHaveBeenCalledWith(value);
        return expect(md._props[name]).toBe(400);
      });
      it('should parse position option', function() {
        var md, name, value;
        md = new Module;
        spyOn(md, '_parsePositionOption').and.callThrough();
        name = 'x';
        value = '20%';
        md._parseOption(name, value);
        expect(md._parsePositionOption).toHaveBeenCalledWith(name, value);
        return expect(md._props[name]).toBe(value);
      });
      return it('should parse strokeDasharray option', function() {
        var md, name, parsed, value;
        md = new Module;
        spyOn(md, '_parseStrokeDashOption').and.callThrough();
        name = 'strokeDasharray';
        value = '200 100% 200';
        parsed = md._parseStrokeDashOption(name, value);
        md._parseOption(name, value);
        expect(md._parseStrokeDashOption).toHaveBeenCalledWith(name, value);
        return expect(md._props[name]).toEqual(parsed);
      });
    });
    describe('_extendDefaults method ->', function() {
      it('should create _props object', function() {
        var md;
        spyOn(Module.prototype, '_extendDefaults').and.callThrough();
        md = new Module;
        expect(Module.prototype._extendDefaults).toHaveBeenCalled();
        expect(typeof md._props).toBe('object');
        return expect(md._props).toBe(md._props);
      });
      it('should extend defaults object to properties', function() {
        var md;
        md = new Module({
          radius: 45,
          radiusX: 50
        });
        expect(md._props.radius).toBe(45);
        return expect(md._props.radiusX).toBe(50);
      });
      it('should extend defaults object to properties if 0', function() {
        var md;
        md = new Module({
          radius: 0
        });
        return expect(md._props.radius).toBe(0);
      });
      it('should extend defaults object to properties if object was passed', function() {
        var md;
        md = new Module({
          radius: {
            45: 55
          }
        });
        return expect(md._props.radius).toBe(55);
      });
      it('should extend defaults object to properties if array was passed', function() {
        var array, md;
        array = [50, 100];
        md = new Module({
          radius: array
        });
        spyOn(md, '_assignProp').and.callThrough();
        md._extendDefaults();
        expect(md._props.radius.join(', ')).toBe('50, 100');
        return expect(md._assignProp).toHaveBeenCalledWith('radius', array);
      });
      it('should extend defaults object to properties if rand was passed', function() {
        var md;
        md = new Module({
          radius: 'rand(0, 10)'
        });
        spyOn(md, '_assignProp').and.callThrough();
        md._extendDefaults();
        expect(md._props.radius).toBeDefined();
        expect(md._props.radius).toBeGreaterThan(-1);
        expect(md._props.radius).not.toBeGreaterThan(10);
        return expect(md._assignProp).toHaveBeenCalled();
      });
      return describe('stagger values', function() {
        return it('should extend defaults object to properties if stagger was passed', function() {
          var md;
          md = new Module({
            radius: 'stagger(200)'
          });
          spyOn(md, '_assignProp').and.callThrough();
          md._index = 2;
          md._extendDefaults();
          expect(md._props.radius).toBe(400);
          return expect(md._assignProp).toHaveBeenCalledWith('radius', 400);
        });
      });
    });
    describe('_setProgress method ->', function() {
      it('should set transition progress', function() {
        var byte;
        byte = new Module({
          radius: {
            '25.50': -75.50
          }
        });
        byte._setProgress(.5);
        return expect(byte._progress).toBe(.5);
      });
      it('should set value progress', function() {
        var byte;
        byte = new Module({
          radius: {
            '25': 75
          }
        });
        byte._setProgress(.5);
        return expect(byte._props.radius).toBe(50);
      });
      it('should call _calcCurrentProps', function() {
        var byte;
        byte = new Module({
          radius: {
            '25': 75
          }
        });
        spyOn(byte, '_calcCurrentProps');
        byte._setProgress(.5, .35);
        return expect(byte._calcCurrentProps).toHaveBeenCalledWith(.5, .35);
      });
      it('should set color value progress and only int', function() {
        var byte, colorDelta;
        byte = new Module({
          stroke: {
            '#000': 'rgb(255,255,255)'
          }
        });
        colorDelta = byte._deltas.stroke;
        byte._setProgress(.5);
        return expect(byte._props.stroke).toBe('rgba(127,127,127,1)');
      });
      return it('should set color value progress for delta starting with 0', function() {
        var byte, colorDelta;
        byte = new Module({
          stroke: {
            '#000': 'rgb(0,255,255)'
          }
        });
        colorDelta = byte._deltas.stroke;
        byte._setProgress(.5);
        return expect(byte._props.stroke).toBe('rgba(0,127,127,1)');
      });
    });
    describe('_tuneNewOptions method', function() {
      it('should rewrite options from passed object to _o and _props', function() {
        var md;
        md = new Module({
          radius: 45,
          radiusX: 50
        });
        md._tuneNewOptions({
          radius: 20
        });
        expect(md._o.radius).toBe(20);
        return expect(md._props.radius).toBe(20);
      });
      it('should extend defaults object to properties if 0', function() {
        var md;
        md = new Module({
          radius: 40
        });
        md._tuneNewOptions({
          radius: 0
        });
        return expect(md._props.radius).toBe(0);
      });
      it('should call _hide method', function() {
        var md;
        md = new Module({
          radius: 45
        });
        spyOn(md, '_hide').and.callThrough();
        md._tuneNewOptions({
          radius: 20
        });
        return expect(md._hide).toHaveBeenCalled();
      });
      it('should extend defaults object to properties if array was passed', function() {
        var md;
        md = new Module({
          radius: 50
        });
        md._tuneNewOptions({
          'radius': [50, 100]
        });
        return expect(md._props.radius.join(', ')).toBe('50, 100');
      });
      it('should extend defaults object to properties if rand was passed', function() {
        var md;
        md = new Module({
          radius: 20
        });
        md._tuneNewOptions({
          'radius': 'rand(0, 10)'
        });
        expect(md._props.radius).toBeDefined();
        expect(md._props.radius).toBeGreaterThan(-1);
        return expect(md._props.radius).not.toBeGreaterThan(10);
      });
      return it('should extend defaults object to properties if stagger was passed', function() {
        var md;
        md = new Module({
          radius: 20
        });
        md._index = 2;
        md._tuneNewOptions({
          radius: 'stagger(200)'
        });
        return expect(md._props.radius).toBe(400);
      });
    });
    describe('_getDelta method ->', function() {
      it('should warn if delta is top or left', function() {
        var md;
        md = new Module;
        spyOn(h, 'warn');
        md._getDelta('left', {
          '50%': 0
        });
        return expect(h.warn).toHaveBeenCalled();
      });
      it('should call h.parseDelta', function() {
        var delta, key, md;
        md = new Module;
        md._index = 3;
        spyOn(h, 'parseDelta').and.callThrough();
        key = 'left';
        delta = {
          '50%': 0
        };
        md._getDelta(key, delta);
        return expect(h.parseDelta).toHaveBeenCalledWith(key, delta, md._index);
      });
      return it('should set end value to props', function() {
        var delta, key, md;
        md = new Module;
        key = 'left';
        delta = {
          '50%': 0
        };
        md._getDelta(key, delta);
        return expect(md._props.left).toBe(0);
      });
    });
    describe('_parsePreArrayProperty method ->', function() {
      it('should call _parseOptionString method', function() {
        var key, md, value;
        md = new Module;
        key = 'left';
        value = '50%';
        spyOn(md, '_parseOptionString').and.callThrough();
        md._parsePreArrayProperty(key, value);
        return expect(md._parseOptionString).toHaveBeenCalledWith(value);
      });
      return it('should pass results of the prev call to _parsePositionOption method', function() {
        var key, md, result, value;
        md = new Module;
        key = 'left';
        value = 'stagger(200, 100)';
        spyOn(md, '_parsePositionOption').and.callThrough();
        result = md._parsePreArrayProperty(key, value);
        expect(md._parsePositionOption).toHaveBeenCalledWith(key, md._parseOptionString(value));
        value = md._parseOptionString(value);
        value = md._parsePositionOption(key, value);
        return expect(result).toBe(value);
      });
    });
    describe('_parseProperty method ->', function() {
      it('should call h.parseEl method is name is `parent`', function() {
        var key, md, result, value;
        md = new Module;
        key = 'parent';
        value = 'body';
        spyOn(h, 'parseEl').and.callThrough();
        result = md._parseProperty(key, value);
        expect(h.parseEl).toHaveBeenCalledWith(value);
        return expect(result).toBe(document.body);
      });
      it('should call _parsePreArrayProperty method', function() {
        var key, md, value;
        md = new Module;
        key = 'left';
        value = '50%';
        spyOn(md, '_parsePreArrayProperty').and.callThrough();
        md._parseProperty(key, value);
        return expect(md._parsePreArrayProperty).toHaveBeenCalledWith(key, value);
      });
      it('should pass results of prev call to _parseStrokeDashOption method', function() {
        var key, md, value;
        md = new Module;
        key = 'left';
        value = 'stagger(200, 100)';
        spyOn(md, '_parseStrokeDashOption').and.callThrough();
        md._parseProperty(key, value);
        value = md._parsePreArrayProperty(key, value);
        return expect(md._parseStrokeDashOption).toHaveBeenCalledWith(key, value);
      });
      return it('should return result', function() {
        var key, md, result, value;
        md = new Module;
        key = 'left';
        value = 'stagger(200, 100)';
        spyOn(md, '_parseStrokeDashOption').and.callThrough();
        result = md._parseProperty(key, value);
        value = md._parsePreArrayProperty(key, value);
        value = md._parseStrokeDashOption(key, value);
        return expect(result).toBe(value);
      });
    });
    describe('_parseDeltaValues method ->', function() {
      it('should parse delta values', function() {
        var delta, deltaResult, md;
        md = new Module;
        delta = {
          'stagger(100, 0)': 200
        };
        deltaResult = md._parseDeltaValues('left', delta);
        return expect(deltaResult).toEqual({
          '100px': '200px'
        });
      });
      it('should not arr values parse delta values', function() {
        var delta, deltaResult, md;
        md = new Module;
        delta = {
          'stagger(100, 0)': 200
        };
        deltaResult = md._parseDeltaValues('strokeDasharray', delta);
        return expect(deltaResult).toEqual({
          '100': 200
        });
      });
      return it('should create new delta object', function() {
        var delta, deltaResult, md;
        md = new Module;
        delta = {
          2: 1
        };
        deltaResult = md._parseDeltaValues('opacity', delta);
        expect(deltaResult).toEqual({
          2: 1
        });
        return expect(deltaResult).not.toBe(delta);
      });
    });
    describe('_preparsePropValue ->', function() {
      it('should parse non ∆ values', function() {
        var md, result;
        md = new Module;
        spyOn(md, '_parsePreArrayProperty').and.callThrough();
        spyOn(md, '_parseDeltaValues').and.callThrough();
        result = md._preparsePropValue('left', 20);
        expect(md._parsePreArrayProperty).toHaveBeenCalledWith('left', 20);
        expect(md._parseDeltaValues).not.toHaveBeenCalled();
        return expect(result).toBe('20px');
      });
      return it('should parse ∆ values', function() {
        var delta, key, md, result;
        md = new Module;
        spyOn(md, '_parseDeltaValues').and.callThrough();
        key = 'left';
        delta = {
          20: 100
        };
        result = md._preparsePropValue(key, delta);
        expect(md._parseDeltaValues).toHaveBeenCalledWith(key, delta);
        return expect(result['20px']).toBe('100px');
      });
    });
    describe('_calcCurrentProps method', function() {
      return it('should calc color with alpha', function() {
        var md;
        md = new Module;
        md._deltas = {
          fill: h.parseDelta('fill', {
            'rgba(0,0,0,0)': 'rgba(0,0,0,1)'
          }, 0)
        };
        md._calcCurrentProps(.5, .5);
        return expect(md._props.fill).toBe('rgba(0,0,0,0.5)');
      });
    });
    return it('clean the _defaults  up', function() {
      return Module.prototype._declareDefaults = oldFun;
    });
  });

}).call(this);
