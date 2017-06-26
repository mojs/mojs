var Surface = mojs.Surface;
var Html = mojs.Html;
var helpers = mojs.__helpers__;
var Tweenable = helpers.Tweenable;

describe('`surface` ->', function () {
  describe('extension ->', function() {
    it('should extend `Tweenable`', function () {
      var surface = new Surface();

      expect(Tweenable.__mojsClass.isPrototypeOf(surface)).toBe(true);
    });
  });

  describe('element creation ->', function() {
    it('should create DOM element', function () {
      var surface = new Surface();

      expect(surface.el + '').toBe('[object HTMLDivElement]');
      expect(surface.el.parentNode).toBe(document.body);
    });

    it('should append el to parent', function () {
      var parent = document.createElement('div');
      var surface = new Surface({
        parent: parent
      });

      expect(surface.el.parentNode).toBe(parent);
    });
  });

  describe('`_defaults` creation ->', function() {
    it('should declared `_defaults`', function () {
      var surface = new Surface();

      expect(surface._defaults).toEqual({
        parent: document.body,
        width: 100,
        height: 100
      });
    });
  });

  describe('`html` ->', function() {
    it('should create `html`', function () {
      var surface = new Surface();

      expect(Html.__mojsClass.isPrototypeOf(surface._html)).toBe(true);
      expect(surface._html._o.el).toBe(surface.el);
      expect(surface.timeline).toBe(surface._html.timeline);
    });

    it('should pass `_o` to `_html`', function () {
      var spam = 2;
      var eggs = 1;
      var surface = new Surface({
        spam: spam,
        eggs: eggs
      });

      expect(surface._html._o.spam).toBe(spam);
      expect(surface._html._o.eggs).toBe(eggs);
    });

    it('should pass `customProperties` with `width` and `hight` types', function () {
      var spam = 2;
      var eggs = 1;
      var surface = new Surface({
        spam: spam,
        eggs: eggs
      });

      expect(surface._html._o.customProperties.height.type).toBe('unit');
      expect(surface._html._o.customProperties.width.type).toBe('unit');
    });

    it('should pipe passed `customProperties`', function () {
      var spam = 2;
      var eggs = 1;

      var render = function() {};

      var surface = new Surface({
        spam: spam,
        eggs: eggs,
        customProperties: {
          spam: {
            type: 'color'
          },
          render: render
        }
      });

      expect(surface._html._o.customProperties.spam.type).toBe('color');
      expect(surface._html._o.customProperties.render).toBe(render);
    });
  });

});
