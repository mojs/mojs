(function() {
  var Staggler;

  Staggler = mojs.Staggler;

  describe('Staggler ->', function() {
    describe('_getOptionByMod method ->', function() {
      it('should get an option by modulo of i', function() {
        var options, s;
        options = {
          bit: ['foo', 'bar', 'baz']
        };
        s = new Staggler;
        expect(s._getOptionByMod('bit', 0, options)).toBe('foo');
        expect(s._getOptionByMod('bit', 1, options)).toBe('bar');
        expect(s._getOptionByMod('bit', 2, options)).toBe('baz');
        expect(s._getOptionByMod('bit', 3, options)).toBe('foo');
        return expect(s._getOptionByMod('bit', 7, options)).toBe('bar');
      });
      it('should return option if it isnt defined by array', function() {
        var options, s;
        options = {
          bit: 'foo'
        };
        s = new Staggler;
        expect(s._getOptionByMod('bit', 0, options)).toBe('foo');
        return expect(s._getOptionByMod('bit', 1, options)).toBe('foo');
      });
      return it('should get option if it is array like', function() {
        var div1, div2, divWrapper, options, s;
        div1 = document.createElement('div');
        div2 = document.createElement('div');
        divWrapper = document.createElement('div');
        divWrapper.appendChild(div1);
        divWrapper.appendChild(div2);
        options = {
          bit: divWrapper.childNodes
        };
        s = new Staggler;
        expect(s._getOptionByMod('bit', 0, options)).toBe(div1);
        return expect(s._getOptionByMod('bit', 1, options)).toBe(div2);
      });
    });
    describe('_getOptionByIndex method ->', function() {
      return it('should get option by modulo of index', function() {
        var option1, options, s;
        options = {
          bax: ['foo', 'bar', 'baz'],
          qux: 200,
          norf: ['norf', 300]
        };
        s = new Staggler;
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
          el: ['el', 'b', 'c']
        };
        s = new Staggler;
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
          el: divWrapper.childNodes
        };
        s = new Staggler;
        return expect(s._getChildQuantity('el', options)).toBe(2);
      });
      it('should get quantity of child modules #single value', function() {
        var options, s;
        options = {
          el: document.createElement('div')
        };
        s = new Staggler;
        return expect(s._getChildQuantity('el', options)).toBe(1);
      });
      return it('should get quantity of child modules #string', function() {
        var options, s;
        options = {
          el: '#selector'
        };
        s = new Staggler;
        return expect(s._getChildQuantity('el', options)).toBe(1);
      });
    });
    describe('_createTimeline method ->', function() {
      return it('should create timeline', function() {
        var s;
        s = new Staggler;
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
        s = new Staggler;
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
        s = new Staggler;
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
        s = new Staggler;
        return expect(s.init(options, mojs.MotionPath)).toBe(s);
      });
    });
    return describe('run method ->', function() {
      return it('should run timeline', function() {
        var div, options, s;
        div = document.createElement('div');
        options = {
          el: [div, div],
          path: 'M0,0 L100,100',
          delay: '200'
        };
        s = new Staggler;
        s.init(options, mojs.MotionPath);
        spyOn(s.timeline, 'start');
        s.run();
        return expect(s.timeline.start).toHaveBeenCalled();
      });
    });
  });

}).call(this);
