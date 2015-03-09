(function() {
  var Stagger, els, h, ns, path1, path2;

  Stagger = mojs.Stagger;

  h = mojs.helpers;

  ns = 'http://www.w3.org/2000/svg';

  els = document.createElementNS(ns, 'g');

  path1 = document.createElementNS(ns, 'path');

  path2 = document.createElementNS(ns, 'path');

  els.appendChild(path1);

  els.appendChild(path2);

  describe('Stagger ->', function() {
    describe('defaults ->', function() {
      it('should have its own defaults', function() {
        var s;
        s = new Stagger({
          els: els
        });
        expect(s.ownDefaults.delay).toBe('stagger(100)');
        expect(s.ownDefaults.els).toBeDefined();
        expect(s.ownDefaults.strokeDasharray).toBe('100%');
        expect(s.ownDefaults.strokeDashoffset['100%']).toBe('0%');
        expect(s.ownDefaults.stroke[0]).toBe('yellow');
        expect(s.ownDefaults.stroke[1]).toBe('cyan');
        expect(s.ownDefaults.stroke[2]).toBe('deeppink');
        expect(s.ownDefaults.fill).toBe('transparent');
        expect(s.ownDefaults.isShowInit).toBe(false);
        return expect(s.ownDefaults.isShowEnd).toBe(false);
      });
      return it('should have isSkipDelta flag', function() {
        var s;
        s = new Stagger({
          els: els
        });
        return expect(s.isSkipDelta).toBe(true);
      });
    });
    describe('defaults extend ->', function() {
      return it('defaults should extend ownDefaults', function() {
        var s;
        s = new Stagger({
          els: els
        });
        expect(s.defaults.strokeWidth).toBe(2);
        expect(s.defaults.delay).toBe('stagger(100)');
        return expect(s.ownDefaults.els).toBeDefined();
      });
    });
    describe('extendDefaults method ->', function() {
      it('should override extendDefaults method', function() {
        var s;
        s = new Stagger({
          els: els
        });
        return expect(s.extendDefaults).not.toBe(Stagger.__super__.extendDefaults);
      });
      it('should define props object', function() {
        var s;
        s = new Stagger({
          els: els
        });
        s.props = void 0;
        s.extendDefaults();
        return expect(s.props).toBeDefined();
      });
      it('should define deltas object', function() {
        var s;
        s = new Stagger({
          els: els
        });
        s.deltas = void 0;
        s.extendDefaults();
        return expect(s.deltas).toBeDefined();
      });
      return it('should just copy options to props and fallback to defaults', function() {
        var s;
        s = new Stagger({
          els: els,
          stroke: 'deeppink'
        });
        expect(s.props.stroke).toBe('deeppink');
        return expect(s.props.delay).toBe(s.defaults.delay);
      });
    });
    describe('isDelta method ->', function() {
      it('should override isDelta method', function() {
        var s;
        s = new Stagger({
          els: els
        });
        return expect(s.isDelta).not.toBe(Stagger.__super__.isDelta);
      });
      return it('should always return false', function() {
        var s;
        s = new Stagger({
          els: els
        });
        return expect(s.isDelta()).toBe(false);
      });
    });
    describe('createBit method ->', function() {
      it('should override createBit method', function() {
        var s;
        s = new Stagger({
          els: els
        });
        return expect(s.createBit).not.toBe(Stagger.__super__.createBit);
      });
      it('should create transit for every el', function() {
        var s;
        els = document.createElementNS(ns, 'g');
        path1 = document.createElementNS(ns, 'path');
        path2 = document.createElementNS(ns, 'path');
        els.appendChild(path1);
        els.appendChild(path2);
        s = new Stagger({
          els: els,
          stroke: ['deeppink', 'cyan', 'yellow']
        });
        expect(s.transits.length).toBe(2);
        expect(s.transits[0].o.bit).toBe(path1);
        expect(s.transits[1].o.bit).toBe(path2);
        expect(s.transits[0].o.stroke).toBe('deeppink');
        return expect(s.transits[1].o.stroke).toBe('cyan');
      });
      return it('should pass index to every transit', function() {
        var s;
        els = document.createElementNS(ns, 'g');
        path1 = document.createElementNS(ns, 'path');
        path2 = document.createElementNS(ns, 'path');
        els.appendChild(path1);
        els.appendChild(path2);
        s = new Stagger({
          els: els,
          stroke: ['deeppink', 'cyan', 'yellow']
        });
        expect(s.transits.length).toBe(2);
        expect(s.transits[0].o.index).toBe(0);
        return expect(s.transits[1].o.index).toBe(1);
      });
    });
    describe('render method ->', function() {
      it('should override render method', function() {
        var s;
        s = new Stagger({
          els: els
        });
        return expect(s.render).not.toBe(Stagger.__super__.render);
      });
      it('should call createBit method', function() {
        var s;
        s = new Stagger({
          els: els
        });
        spyOn(s, 'createBit');
        s.render();
        return expect(s.createBit).toHaveBeenCalled();
      });
      it('should call setProgress method', function() {
        var s;
        s = new Stagger({
          els: els,
          isRunLess: true
        });
        spyOn(s, 'setProgress');
        s.render();
        return expect(s.setProgress).toHaveBeenCalledWith(0, true);
      });
      return it('should call createTween method', function() {
        var s;
        s = new Stagger({
          els: els
        });
        spyOn(s, 'createTween');
        s.render();
        return expect(s.createTween).toHaveBeenCalled();
      });
    });
    describe('createTween method ->', function() {
      it('should override createTween method', function() {
        var s;
        s = new Stagger({
          els: els
        });
        return expect(s.createTween).not.toBe(Stagger.__super__.createTween);
      });
      it('should call super createTween method', function() {
        var s;
        s = new Stagger({
          els: els
        });
        spyOn(Stagger.__super__, 'createTween');
        s.createTween();
        return expect(Stagger.__super__.createTween).toHaveBeenCalled();
      });
      return it('should add timelines to the tween', function() {
        var s;
        s = new Stagger({
          els: els
        });
        return expect(s.tween.timelines.length).toBe(3);
      });
    });
    describe('draw method ->', function() {
      it('should override draw method', function() {
        var s;
        s = new Stagger({
          els: els
        });
        return expect(s.draw).not.toBe(Stagger.__super__.draw);
      });
      return it('should call drawEl method', function() {
        var s;
        s = new Stagger({
          els: els
        });
        spyOn(s, 'drawEl');
        s.draw();
        return expect(s.drawEl).toHaveBeenCalled();
      });
    });
    describe('parseEls method ->', function() {
      it('should recieve els as a DOM node', function() {
        var s;
        els = document.createElementNS(ns, 'g');
        path1 = document.createElementNS(ns, 'path');
        path2 = document.createElementNS(ns, 'path');
        els.appendChild(path1);
        els.appendChild(path2);
        s = new Stagger({
          els: els
        });
        return expect(h.isArray(s.props.els)).toBe(true);
      });
      it('should recieve els as an Array of nodes', function() {
        var s;
        path1 = document.createElementNS(ns, 'path');
        path2 = document.createElementNS(ns, 'path');
        s = new Stagger({
          els: [path1, path2]
        });
        return expect(h.isArray(s.props.els)).toBe(true);
      });
      it('should recieve els as children', function() {
        var s;
        els = document.createElementNS(ns, 'g');
        path1 = document.createElementNS(ns, 'path');
        path2 = document.createElementNS(ns, 'path');
        els.appendChild(path1);
        els.appendChild(path2);
        s = new Stagger({
          els: els.childNodes
        });
        return expect(h.isArray(s.props.els)).toBe(true);
      });
      return it('should recieve as a selector of parent', function() {
        var s;
        els = document.createElementNS(ns, 'g');
        path1 = document.createElementNS(ns, 'path');
        path2 = document.createElementNS(ns, 'path');
        els.appendChild(path1);
        els.appendChild(path2);
        document.body.appendChild(els);
        s = new Stagger({
          els: 'g'
        });
        return expect(h.isArray(s.props.els)).toBe(true);
      });
    });
    describe('getPropByMod method ->', function() {
      it('should return property by mod', function() {
        var s;
        s = new Stagger({
          els: els,
          stroke: ['deeppink', 'cyan', 'white', 'orange']
        });
        expect(s.getPropByMod('stroke', 2)).toBe('white');
        return expect(s.getPropByMod('stroke', 5)).toBe('cyan');
      });
      return it('should return property if single property was passed', function() {
        var s;
        s = new Stagger({
          els: els,
          stroke: 'deeppink'
        });
        return expect(s.getPropByMod('stroke', 2)).toBe('deeppink');
      });
    });
    return describe('getOption method ->', function() {
      return it('should get options for a transit by its index', function() {
        var s;
        s = new Stagger({
          els: els,
          stroke: ['deeppink', 'cyan', 'yellow']
        });
        expect(s.getOption(0).stroke).toBe('deeppink');
        expect(s.getOption(0).bit).toBe(path1);
        expect(s.getOption(0).duration).toBe(500);
        expect(s.getOption(1).stroke).toBe('cyan');
        expect(s.getOption(1).bit).toBe(path2);
        return expect(s.getOption(1).duration).toBe(500);
      });
    });
  });

}).call(this);
