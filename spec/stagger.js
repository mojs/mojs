(function() {
  var Stagger, h, ns;

  Stagger = mojs.Stagger;

  h = mojs.helpers;

  ns = 'http://www.w3.org/2000/svg';

  describe('Stagger ->', function() {
    describe('defaults ->', function() {
      return it('should have its own defaults', function() {
        var s;
        s = new Stagger;
        expect(s.ownDefaults.delay).toBe('stagger(200)');
        return expect(s.ownDefaults.els).toBeDefined();
      });
    });
    describe('defaults extend ->', function() {
      return it('defaults should extend ownDefaults', function() {
        var s;
        s = new Stagger;
        expect(s.defaults.strokeWidth).toBe(2);
        expect(s.defaults.delay).toBe('stagger(200)');
        return expect(s.ownDefaults.els).toBeDefined();
      });
    });
    describe('createBit method ->', function() {
      return it('should override createBit method', function() {
        var s;
        s = new Stagger;
        return expect(s.createBit).not.toBe(Stagger.__super__.createBit);
      });
    });
    return describe('els recieve and transform extend ->', function() {
      return it('should recieve els as DOM node', function() {
        var els, path1, path2, s;
        els = document.createElementNS(ns, 'g');
        path1 = document.createElementNS(ns, 'path');
        path2 = document.createElementNS(ns, 'path');
        els.appendChild(path1);
        els.appendChild(path2);
        s = new Stagger({
          els: els,
          isIt: true
        });
        console.log(s.props.els);
        return expect(h.isArray(s.props.els)).toBe(true);
      });
    });
  });

}).call(this);
