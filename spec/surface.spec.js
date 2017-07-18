var Surface = mojs.Surface;
var Html = mojs.Html;
var helpers = mojs.__helpers__;

describe('`surface` ->', function () {
  describe('extension ->', function() {
    it('should extend `Html`', function () {
      var surface = new Surface();

      expect(Html.__mojsClass.isPrototypeOf(surface)).toBe(true);
    });
  });

  describe('element creation ->', function() {
    it('should create DOM element', function () {
      var surface = new Surface();

      expect(surface.el + '').toBe('[object HTMLDivElement]');
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
        height: 100,
        is3d: false,
        el: null,
        customProperties: {},

        x: 0,
        y: 0,
        z: 0,

        skewX: 0,
        skewY: 0,

        angle: 0,
        angleX: 0,
        angleY: 0,
        angleZ: undefined,

        scale: 1,
        scaleX: undefined,
        scaleY: undefined,
        scaleZ: undefined,
      });
    });

    it('should save `Html` defaults', function () {
      var surface = new Surface();

      expect(surface._htmlDefaults).toEqual({
        is3d: false,
        el: null,
        customProperties: {},

        x: 0,
        y: 0,
        z: 0,

        skewX: 0,
        skewY: 0,

        angle: 0,
        angleX: 0,
        angleY: 0,
        angleZ: undefined,

        scale: 1,
        scaleX: undefined,
        scaleY: undefined,
        scaleZ: undefined,
      });
    });
  });

  describe('`customProperties` ->', function() {

    it('should pass `customProperties` with `width` and `hight` types', function () {
      var spam = 2;
      var eggs = 1;
      var surface = new Surface({
        spam: spam,
        eggs: eggs
      });

      expect(surface._o.customProperties.height.type).toBe('unit');
      expect(surface._o.customProperties.width.type).toBe('unit');
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

      expect(surface._o.customProperties.spam.type).toBe('color');
      expect(surface._o.customProperties.render).toBe(render);
    });
  });
});
