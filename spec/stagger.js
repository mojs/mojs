(function() {
  var Stagger;

  Stagger = mojs.Stagger(mojs.MotionPath);

  describe('Stagger ->', function() {
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
    describe('init ->', function() {
      it('should make stagger', function() {
        var div, options, s;
        div = document.createElement('div');
        options = {
          el: [div, div],
          path: 'M0,0 L100,100',
          delay: '200'
        };
        s = new Stagger(options);
        s.init(options, mojs.MotionPath);
        return expect(s.timeline.timelines.length).toBe(2);
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
        s.init(options, mojs.MotionPath);
        return expect(s.childModules[0].o.isRunLess).toBe(true);
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
        return expect(s.init(options, mojs.MotionPath)).toBe(s);
      });
    });
    describe('run method ->', function() {
      return it('should run timeline', function() {
        var div, options, s;
        div = document.createElement('div');
        options = {
          el: [div, div],
          path: 'M0,0 L100,100',
          delay: '200'
        };
        s = new Stagger(options);
        s.init(options, mojs.MotionPath);
        spyOn(s.timeline, 'start');
        s.run();
        return expect(s.timeline.start).toHaveBeenCalled();
      });
    });
    describe('stagger callbacks ->', function() {
      it('should pass the onStaggerStart callback to timeline', function() {
        var fun, s;
        fun = function() {};
        s = new Stagger({
          onStaggerStart: fun
        });
        return expect(s.timeline.o.onStart).toBe(fun);
      });
      it('should pass the onStaggerUpdate callback to timeline', function() {
        var fun, s;
        fun = function() {};
        s = new Stagger({
          onStaggerUpdate: fun
        });
        return expect(s.timeline.o.onUpdate).toBe(fun);
      });
      it('should pass the onStaggerComplete callback to timeline', function() {
        var fun, s;
        fun = function() {};
        s = new Stagger({
          onStaggerComplete: fun
        });
        return expect(s.timeline.o.onComplete).toBe(fun);
      });
      return it('should pass the onStaggerReverseComplete callback to timeline', function() {
        var fun, s;
        fun = function() {};
        s = new Stagger({
          onStaggerReverseComplete: fun
        });
        return expect(s.timeline.o.onReverseComplete).toBe(fun);
      });
    });
    describe('moduleDelay option ->', function() {
      return it('should pass the moduleDelay option to timeline', function() {
        var s;
        s = new Stagger({
          moduleDelay: 200
        });
        return expect(s.timeline.o.delay).toBe(200);
      });
    });
    return describe('quantifier option ->', function() {
      return it('should be passed to the _getChildQuantity method', function() {
        var s;
        s = new Stagger({
          delay: [100, 200, 300],
          quantifier: 2
        });
        expect(s.childModules[0].o.delay).toBe(100);
        expect(s.childModules[1].o.delay).toBe(200);
        return expect(s.childModules[2]).not.toBeDefined();
      });
    });
  });

}).call(this);
