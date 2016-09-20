(function() {
  var Stagger;

  Stagger = mojs.stagger(mojs.MotionPath);

  describe('stagger ->', function() {
    it('should extend Tunable', function() {
      var stagger;
      stagger = new Stagger({
        bit: ['foo', 'bar', 'baz']
      });
      return expect(stagger instanceof mojs.Tunable).toBe(true);
    });
    describe('_getOptionByMod method ->', function() {
      it('should get an option by modulo of i', function() {
        var options, s;
        options = {
          bit: ['foo', 'bar', 'baz'],
          path: 'M0,0 L100,100'
        };
        s = new Stagger(options);
        expect(s._getOptionByMod('bit', 0, options)).toBe('foo');
        expect(s._getOptionByMod('bit', 1, options)).toBe('bar');
        expect(s._getOptionByMod('bit', 2, options)).toBe('baz');
        expect(s._getOptionByMod('bit', 3, options)).toBe('foo');
        return expect(s._getOptionByMod('bit', 7, options)).toBe('bar');
      });
      it('should return option if it isnt defined by array', function() {
        var options, s;
        options = {
          bit: 'foo',
          path: 'M0,0 L100,100'
        };
        s = new Stagger(options);
        expect(s._getOptionByMod('bit', 0, options)).toBe('foo');
        return expect(s._getOptionByMod('bit', 1, options)).toBe('foo');
      });
      it('should get option if it is array like', function() {
        var div1, div2, divWrapper, options, s;
        div1 = document.createElement('div');
        div2 = document.createElement('div');
        divWrapper = document.createElement('div');
        divWrapper.appendChild(div1);
        divWrapper.appendChild(div2);
        options = {
          bit: divWrapper.childNodes,
          path: 'M0,0 L100,100'
        };
        s = new Stagger(options);
        expect(s._getOptionByMod('bit', 0, options)).toBe(div1);
        return expect(s._getOptionByMod('bit', 1, options)).toBe(div2);
      });
      it('should get option if it is array like #HTMLCollection', function() {
        var div1, div2, divWrapper, options, s;
        div1 = document.createElement('div');
        div2 = document.createElement('div');
        divWrapper = document.createElement('div');
        divWrapper.appendChild(div1);
        divWrapper.appendChild(div2);
        options = {
          bit: divWrapper.children,
          path: 'M0,0 L100,100'
        };
        s = new Stagger(options);
        expect(s._getOptionByMod('bit', 0, options)).toBe(div1);
        return expect(s._getOptionByMod('bit', 1, options)).toBe(div2);
      });
      return it('should parse stagger options', function() {
        var options, s;
        options = {
          bit: 'stagger(200)',
          path: 'M0,0 L100,100'
        };
        s = new Stagger(options);
        expect(s._getOptionByMod('bit', 0, options)).toBe(0);
        expect(s._getOptionByMod('bit', 1, options)).toBe(200);
        return expect(s._getOptionByMod('bit', 2, options)).toBe(400);
      });
    });
    describe('_getOptionByIndex method ->', function() {
      return it('should get option by modulo of index', function() {
        var option1, options, s;
        options = {
          bax: ['foo', 'bar', 'baz'],
          qux: 200,
          norf: ['norf', 300],
          path: 'M0,0 L100,100'
        };
        s = new Stagger(options);
        option1 = s._getOptionByIndex(0, options);
        expect(option1.bax).toBe('foo');
        expect(option1.qux).toBe(200);
        return expect(option1.norf).toBe('norf');
      });
    });
    describe('_getChildQuantity method', function() {
      it('should get quantity of child modules #array', function() {
        var options, s;
        options = {
          el: ['body', 'body', 'body'],
          path: 'M0,0 L100,100'
        };
        s = new Stagger(options);
        return expect(s._getChildQuantity('el', options)).toBe(3);
      });
      it('should get quantity of child modules #dom list', function() {
        var div1, div2, divWrapper, options, s;
        div1 = document.createElement('div');
        div2 = document.createElement('div');
        divWrapper = document.createElement('div');
        divWrapper.appendChild(div1);
        divWrapper.appendChild(div2);
        options = {
          el: divWrapper.childNodes,
          path: 'M0,0 L100,100'
        };
        s = new Stagger(options);
        return expect(s._getChildQuantity('el', options)).toBe(2);
      });
      it('should get quantity of child modules #dom HTMLCollection', function() {
        var div1, div2, divWrapper, options, s;
        div1 = document.createElement('div');
        div2 = document.createElement('div');
        divWrapper = document.createElement('div');
        divWrapper.appendChild(div1);
        divWrapper.appendChild(div2);
        options = {
          el: divWrapper.children,
          path: 'M0,0 L100,100'
        };
        s = new Stagger(options);
        return expect(s._getChildQuantity('el', options)).toBe(2);
      });
      it('should get quantity of child modules #single value', function() {
        var options, s;
        options = {
          el: document.createElement('div'),
          path: 'M0,0 L100,100'
        };
        s = new Stagger(options);
        return expect(s._getChildQuantity('el', options)).toBe(1);
      });
      it('should get quantity of child modules #string', function() {
        var options, s;
        options = {
          el: 'body',
          path: 'M0,0 L100,100'
        };
        s = new Stagger(options);
        return expect(s._getChildQuantity('el', options)).toBe(1);
      });
      return it('should get quantity of is number was passed', function() {
        var options, s;
        options = {
          el: ['body', 'body', 'body'],
          path: 'M0,0 L100,100'
        };
        s = new Stagger(options);
        return expect(s._getChildQuantity(2, options)).toBe(2);
      });
    });
    describe('_createTimeline method ->', function() {
      return it('should create timeline', function() {
        var options, s;
        options = {
          el: 'body',
          path: 'M0,0 L100,100'
        };
        s = new Stagger(options);
        s._createTimeline();
        return expect(s.timeline instanceof mojs.Timeline).toBe(true);
      });
    });
    describe('_init method ->', function() {
      it('should make stagger', function() {
        var div, options, s;
        div = document.createElement('div');
        options = {
          el: [div, div],
          path: 'M0,0 L100,100',
          delay: '200'
        };
        s = new Stagger(options);
        s._init(options, mojs.MotionPath);
        return expect(s.timeline._timelines.length).toBe(2);
      });
      it('should pass isRunLess = true', function() {
        var div, options, s;
        div = document.createElement('div');
        options = {
          el: [div, div],
          path: 'M0,0 L100,100',
          delay: '200'
        };
        s = new Stagger(options);
        return expect(s._modules[0].o.isRunLess).toBe(true);
      });
      return it('should return self', function() {
        var div, options, s;
        div = document.createElement('div');
        options = {
          el: [div, div],
          path: 'M0,0 L100,100',
          delay: '200'
        };
        s = new Stagger(options);
        return expect(s._init(options, mojs.MotionPath)).toBe(s);
      });
    });
    describe('timeline options', function() {
      return it('should pass timeline options to main timeline', function() {
        var s, timeline;
        timeline = {};
        s = new Stagger({
          timeline: timeline
        });
        return expect(s.timeline._o).toBe(timeline);
      });
    });
    describe('quantifier option ->', function() {
      return it('should be passed to the _getChildQuantity method', function() {
        var s;
        s = new Stagger({
          delay: [100, 200, 300],
          quantifier: 2,
          el: document.createElement('div'),
          path: 'M0,0 L100,100'
        });
        expect(s._modules[0].o.delay).toBe(100);
        expect(s._modules[1].o.delay).toBe(200);
        return expect(s._modules[2]).not.toBeDefined();
      });
    });
    return describe('_makeTween and _makeTimeline methods ->', function() {
      return it('should override them to empty methods', function() {
        var stagger;
        spyOn(mojs.Tweenable.prototype, '_makeTween');
        spyOn(mojs.Tweenable.prototype, '_makeTimeline');
        stagger = new Stagger({});
        expect(mojs.Tweenable.prototype._makeTween).not.toHaveBeenCalled();
        return expect(mojs.Tweenable.prototype._makeTimeline).not.toHaveBeenCalled();
      });
    });
  });

}).call(this);
