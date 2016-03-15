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
      return it('should call _render method', function() {
        var md;
        spyOn(Module.prototype, '_render').and.callThrough();
        md = new Module;
        return expect(Module.prototype._render).toHaveBeenCalled();
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
      it('should create _index property', function() {
        var index, md;
        index = 5;
        md = new Module({
          index: index
        });
        return expect(md._index).toBe(index);
      });
      it('should fallback to 0 for _index property', function() {
        var md;
        md = new Module;
        return expect(md._index).toBe(0);
      });
      return it('should set _progress proprty to 0', function() {
        var md;
        md = new Module;
        return expect(md._progress).toBe(0);
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
    describe('_show method ->', function() {
      it('should set display: block to el', function() {
        var md;
        md = new Module;
        md.el = document.createElement('div');
        md._show();
        expect(md.el.style.display).toBe('block');
        return expect(md._isShown).toBe(true);
      });
      it('should return if isShow is already true', function() {
        var md;
        md = new Module;
        md.el = document.createElement('div');
        md._show();
        md.el.style.display = 'inline';
        md._show();
        return expect(md.el.style.display).toBe('inline');
      });
      return it('not to throw', function() {
        var byte;
        byte = new Module({
          radius: {
            '25': 75
          }
        });
        return expect(function() {
          return byte._show();
        }).not.toThrow();
      });
    });
    describe('_hide method ->', function() {
      it('should set display: block to el', function() {
        var md;
        md = new Module;
        md.el = document.createElement('div');
        md._hide();
        expect(md.el.style.display).toBe('none');
        return expect(md._isShown).toBe(false);
      });
      return it('not to throw', function() {
        var byte;
        byte = new Module({
          radius: {
            '25': 75
          }
        });
        return expect(function() {
          return byte._hide();
        }).not.toThrow();
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
        var key, result;
        tr._props.x = '100%';
        key = 'x';
        spyOn(h, 'parseUnit').and.callThrough();
        result = tr._parsePositionOption(key);
        expect(h.parseUnit).toHaveBeenCalledWith(tr._props[key]);
        return expect(result).toBe(h.parseUnit(tr._props[key]).string);
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
        var key, result;
        tr._props.strokeDasharray = 200;
        key = 'strokeDasharray';
        spyOn(h, 'parseUnit').and.callThrough();
        result = tr._parseStrokeDashOption(key);
        expect(h.parseUnit).toHaveBeenCalledWith(tr._props[key]);
        expect(result[0].unit).toBe(h.parseUnit(tr._props[key]).unit);
        expect(result[0].isStrict).toBe(h.parseUnit(tr._props[key]).isStrict);
        expect(result[0].value).toBe(h.parseUnit(tr._props[key]).value);
        expect(result[0].string).toBe(h.parseUnit(tr._props[key]).string);
        return expect(result[1]).not.toBeDefined();
      });
      it('should parse strokeDash option string', function() {
        var key, result;
        tr._props.strokeDasharray = '200 100';
        key = 'strokeDasharray';
        spyOn(h, 'parseUnit').and.callThrough();
        result = tr._parseStrokeDashOption(key);
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
    describe('_extendDefaults method ->', function() {
      it('should create _props object', function() {
        var md;
        spyOn(Module.prototype, '_extendDefaults').and.callThrough();
        md = new Module;
        expect(Module.prototype._extendDefaults).toHaveBeenCalled();
        expect(typeof md._props).toBe('object');
        return expect(md._props).toBe(md._props);
      });
      it('should not create _props object if already defined', function() {
        var md, obj;
        obj = {};
        md = new Module;
        md._props = obj;
        md._extendDefaults();
        return expect(md._props).toBe(obj);
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
          },
          isIt: 1
        });
        return expect(md._props.radius).toBe(45);
      });
      it('should ignore properties defined in skipProps object', function() {
        var md;
        md = new Module({
          radius: 45
        });
        md._skipProps = {
          radius: 1
        };
        md._o.radius = 50;
        md._extendDefaults();
        return expect(md._props.radius).toBe(45);
      });
      it('should extend defaults object to properties if array was passed', function() {
        var md;
        md = new Module({
          radius: [50, 100]
        });
        return expect(md._props.radius.join(', ')).toBe('50, 100');
      });
      it('should extend defaults object to properties if rand was passed', function() {
        var md;
        md = new Module({
          radius: 'rand(0, 10)'
        });
        expect(md._props.radius).toBeDefined();
        expect(md._props.radius).toBeGreaterThan(-1);
        return expect(md._props.radius).not.toBeGreaterThan(10);
      });
      it('should receive object to iterate from', function() {
        var fillBefore, md;
        md = new Module({
          radius: 'rand(0, 10)',
          fill: 'deeppink'
        });
        fillBefore = md._props.fill;
        md._extendDefaults({
          radius: 10
        });
        expect(md._props.radius).toBe(10);
        return expect(md._props.fill).toBe(fillBefore);
      });
      return describe('stagger values', function() {
        return it('should extend defaults object to properties if stagger was passed', function() {
          var md;
          md = new Module({
            radius: 'stagger(200)'
          });
          md._index = 2;
          md._extendDefaults();
          return expect(md._props.radius).toBe(400);
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
        byte._setProgress(.5);
        return expect(byte._calcCurrentProps).toHaveBeenCalledWith(.5);
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
    return it('clean the _defaults  up', function() {
      return Module.prototype._declareDefaults = oldFun;
    });
  });

}).call(this);
