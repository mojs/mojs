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
      return it('should have its own defaults', function() {
        var s;
        s = new Stagger({
          els: els
        });
        expect(s.ownDefaults.delay).toBe('stagger(200)');
        return expect(s.ownDefaults.els).toBeDefined();
      });
    });
    describe('defaults extend ->', function() {
      return it('defaults should extend ownDefaults', function() {
        var s;
        s = new Stagger({
          els: els
        });
        expect(s.defaults.strokeWidth).toBe(2);
        expect(s.defaults.delay).toBe('stagger(200)');
        return expect(s.ownDefaults.els).toBeDefined();
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
      return it('should create transit for every el', function() {
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
        console.log(s.transits + '');
        expect(s.transits.length).toBe(2);
        expect(s.transits[0].o.bit).toBe(path1);
        expect(s.transits[1].o.bit).toBe(path2);
        expect(s.transits[0].stroke).toBe('deeppink');
        return expect(s.transits[1].stroke).toBe('cyan');
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
    return describe('getPropByMod method ->', function() {
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
  });

}).call(this);
