var helpers = mojs.__helpers__;
var SvgShape = helpers.SvgShape;
var svg = helpers.svg;
var Circle = svg.Circle;

var el = document.createElement('div');

describe('`Circle #svg` ->', function () {
  describe('extension ->', function() {
    it('should extend `ClassProto`', function () {
      var shape = new Circle({
        el: el
      });
      expect(SvgShape.__mojsClass.isPrototypeOf(shape)).toBe(true);
    });
  });

  describe('`_initializeShape` ->', function() {
    it('should create el to render', function () {
      var shape = new Circle({
        el: el
      });

      var circle = shape.root.firstChild;
      expect(circle.tagName.toLowerCase()).toBe('ellipse');
      expect(circle.getAttribute('cx')).toBe('50');
      expect(circle.getAttribute('cy')).toBe('50');
    });
  });

  describe('`render` ->', function() {
    it('should apply styles to shapeEl', function () {
      var shape = new Circle({
        el: el
      });

      var shapeEl = {
        style: {},
        setAttribute: function() {}
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
        shapeEl: shapeEl,
        props: props,
        styleKeys: styleKeys
      };

      shape.render({}, support);

      delete shapeEl.setAttribute;
      expect(shapeEl).toEqual({
        style: {
          a: 20,
          b: '20%',
          c: 'cyan'
        }
      });
    });

    it('should apply shape styles to shapeEl', function () {
      var shape = new Circle({
        el: el
      });

      var shapeEl = {
        style: {},
        setAttribute: function() {}
      };
      var props = {
        a: 20,
        b: '20%',
        c: 'cyan',
        sizeX: 17,
        sizeY: '50%'
      };
      var shapeKeys = [ 'd', 'c' ];

      var support = {
        shapeEl: shapeEl,
        props: props,
        styleKeys: [],
        shapeKeys: shapeKeys
      };

      spyOn(shapeEl, 'setAttribute');

      shape.render({}, support);

      expect(shapeEl.setAttribute).toHaveBeenCalledWith('rx', 'calc(17/2)');
      expect(shapeEl.setAttribute).toHaveBeenCalledWith('ry', 'calc(50%/2)');
    });

    it('should fallback to `size` #sizeX', function () {
      var shape = new Circle({
        el: el
      });

      var shapeEl = {
        style: {},
        setAttribute: function() {}
      };
      var props = {
        a: 20,
        b: '20%',
        c: 'cyan',
        size: 20,
        sizeY: '50%'
      };
      var shapeKeys = [ 'd', 'c' ];

      var support = {
        shapeEl: shapeEl,
        props: props,
        styleKeys: [],
        shapeKeys: shapeKeys
      };

      spyOn(shapeEl, 'setAttribute');

      shape.render({}, support);

      expect(shapeEl.setAttribute).toHaveBeenCalledWith('rx', 'calc(20/2)');
      expect(shapeEl.setAttribute).toHaveBeenCalledWith('ry', 'calc(50%/2)');
    });

    it('should fallback to `size` #sizeY', function () {
      var shape = new Circle({
        el: el
      });

      var shapeEl = {
        style: {},
        setAttribute: function() {}
      };
      var props = {
        a: 20,
        b: '20%',
        c: 'cyan',
        sizeX: 20,
        size: '15px'
      };
      var shapeKeys = [ 'd', 'c' ];

      var support = {
        shapeEl: shapeEl,
        props: props,
        styleKeys: [],
        shapeKeys: shapeKeys
      };

      spyOn(shapeEl, 'setAttribute');

      shape.render({}, support);

      expect(shapeEl.setAttribute).toHaveBeenCalledWith('rx', 'calc(20/2)');
      expect(shapeEl.setAttribute).toHaveBeenCalledWith('ry', 'calc(15px/2)');
    });

    it('should cache #rx', function () {
      var shape = new Circle({
        el: el
      });

      var shapeEl = {
        style: {},
        setAttribute: function() {}
      };
      var props = {
        a: 20,
        b: '20%',
        c: 'cyan',
        sizeX: 20,
        sizeY: '15px'
      };
      var shapeKeys = [ 'd', 'c' ];

      var support = {
        shapeEl: shapeEl,
        props: props,
        styleKeys: [],
        shapeKeys: shapeKeys
      };

      spyOn(shapeEl, 'setAttribute');

      support._rx = 'calc(20/2)';
      shape.render({}, support);

      expect(shapeEl.setAttribute).not.toHaveBeenCalledWith('rx', 'calc(20/2)');
      expect(shapeEl.setAttribute).toHaveBeenCalledWith('ry', 'calc(15px/2)');
    });

    it('should cache #ry', function () {
      var shape = new Circle({
        el: el
      });

      var shapeEl = {
        style: {},
        setAttribute: function() {}
      };
      var props = {
        a: 20,
        b: '20%',
        c: 'cyan',
        sizeX: 20,
        sizeY: '15px'
      };
      var shapeKeys = [ 'd', 'c' ];

      var support = {
        shapeEl: shapeEl,
        props: props,
        styleKeys: [],
        shapeKeys: shapeKeys
      };

      spyOn(shapeEl, 'setAttribute');

      support._ry = 'calc(15px/2)';
      shape.render({}, support);

      expect(shapeEl.setAttribute).toHaveBeenCalledWith('rx', 'calc(20/2)');
      expect(shapeEl.setAttribute).not.toHaveBeenCalledWith('ry', 'calc(15px/2)');
    });

    it('should cache #rx #ry', function () {
      var shape = new Circle({
        el: el
      });

      var shapeEl = {
        style: {},
        setAttribute: function() {}
      };
      var props = {
        a: 20,
        b: '20%',
        c: 'cyan',
        sizeX: 20,
        sizeY: '15px'
      };
      var shapeKeys = [ 'd', 'c' ];

      var support = {
        shapeEl: shapeEl,
        props: props,
        styleKeys: [],
        shapeKeys: shapeKeys
      };

      spyOn(shapeEl, 'setAttribute');

      shape.render({}, support);

      expect(shapeEl.setAttribute).toHaveBeenCalledWith('rx', 'calc(20/2)');
      expect(shapeEl.setAttribute).toHaveBeenCalledWith('ry', 'calc(15px/2)');
      // the second call
      shape.render({}, support);
      expect(shapeEl.setAttribute.calls.count()).toBe(2);
    });

  });
});
