var helpers = mojs.__helpers__;
var SvgShape = helpers.SvgShape;
var ClassProto = helpers.ClassProto;

var el = document.createElement('div');

describe('`SvgShape` ->', function () {
  describe('extension ->', function() {
    it('should extend `ClassProto`', function () {
      var shape = new SvgShape({
        el: el
      });
      expect(ClassProto.isPrototypeOf(shape)).toBe(true);
    });

    it('should have `_defaults`', function () {
      var shape = new SvgShape({
        el: el
      });
      expect(shape._defaults).toEqual({
        shape: 'circle',
        size: 100
      });
    });
  });

  describe('svg el creation ->', function() {
    it('should create svg element', function () {
      var el = document.createElement('div');

      var shape = new SvgShape({
        el: el
      });

      var svgCanvas = el.firstChild;
      expect(svgCanvas.tagName.toLowerCase()).toBe('svg');
      expect(svgCanvas.style.width).toBe('100%');
      expect(svgCanvas.style.height).toBe('100%');
      expect(svgCanvas + '').toBe('[object SVGSVGElement]');
      expect(svgCanvas.firstChild.tagName.toLowerCase()).toBe('use');
      expect(svgCanvas.firstChild + '').toBe('[object SVGUseElement]');
      expect(svgCanvas.firstChild.getAttribute('vector-effect')).toBe('non-scaling-stroke');
      expect(svgCanvas.firstChild.getAttribute('xlink:href')).toBe('#circle-mojs-svg-shape');
    });
  });

  describe('`render` ->', function() {
    it('should apply styles to root', function () {
      var shape = new SvgShape({
        el: el
      });

      var root = {
        style: {},
        setAttribute: function () {}
      };
      var props = {
        a: 20,
        b: '20%',
        c: 'cyan',
        d: 17,
        e: 'yellow'
      };
      var styleKeys = [ 'a', 'b', 'c' ];

      var support = {
        props: props,
        pipeObj: {
          root: root,
          styleKeys: styleKeys,
        }
      };

      shape.render({}, support);

      delete root.setAttribute;
      expect(root).toEqual({
        style: {
          a: 20,
          b: '20%',
          c: 'cyan'
        }
      });
    });

    it('should cache styles', function () {
      var shape = new SvgShape({
        el: el
      });

      var root = {
        style: {},
        setAttribute: function () {}
      };
      var props = {
        a: 20,
        b: '20%',
        c: 'cyan',
        d: 17,
        e: 'yellow',
        size: 200,
      };
      var styleKeys = [ 'a', 'b', 'c' ];

      var support = {
        props: props,
        pipeObj: {
          root: root,
          styleKeys: styleKeys,
        },
        _a: 20,
        _b: '20%',
      };

      shape.render(props, support);

      expect(root).toEqual({
        style: {
          c: 'cyan',
        },
        setAttribute: root.setAttribute
      });
    });

    it('should set transform on the root', function () {
      var shape = new SvgShape({
        el: el
      });

      var root = {
        style: {},
        setAttribute: function () {}
      };
      var props = {
        size: 200,
        sizeX: 400
      };
      var styleKeys = [];

      var support = {
        props: props,
        pipeObj: {
          root: root,
          styleKeys: styleKeys,
        }
      };

      spyOn(root, 'setAttribute');

      shape.render({}, support);

      expect(root.setAttribute).toHaveBeenCalledWith('transform', 'scale(4, 2)');
    });

    it('should cache the transform', function () {
      var shape = new SvgShape({
        el: el
      });

      var root = {
        style: {},
        setAttribute: function () {}
      };
      var props = {
        size: 100,
        sizeX: 200
      };
      var styleKeys = [];

      var support = {
        props: props,
        pipeObj: {
          root: root,
          styleKeys: styleKeys,
        }
      };

      spyOn(root, 'setAttribute');

      shape.render({}, support);

      var transform = 'scale(2, 1)';
      expect(root.setAttribute).toHaveBeenCalledWith('transform', transform);
      expect(support._transform).toBe(transform);

      shape.render({}, support);

      expect(root.setAttribute.calls.count()).toBe(3);
    });

    it('should cache the x attribute', function () {
      var shape = new SvgShape({
        el: el
      });

      var root = {
        style: {},
        setAttribute: function () {}
      };
      var props = {
        size: 25,
        sizeX: 200
      };
      var styleKeys = [];

      var support = {
        props: props,
        pipeObj: {
          root: root,
          styleKeys: styleKeys,
        }
      };

      spyOn(root, 'setAttribute');

      shape.render({}, support);

      var x = '25%';
      var y = '200%';
      expect(root.setAttribute).toHaveBeenCalledWith('x', x);
      expect(root.setAttribute).toHaveBeenCalledWith('y', y);

      shape.render({}, support);

      expect(root.setAttribute.calls.count()).toBe(3);
    });
  });
});
