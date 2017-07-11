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
        style: {}
      };
      var props = {
        a: 20,
        b: '20%',
        c: 'cyan',
        d: 17,
        e: 'yellow',
        size: '200px'
      };
      var styleKeys = [ 'a', 'b', 'c' ];

      var support = {
        props: props,
        pipeObj: {
          shapeEl: shapeEl,
          styleKeys: styleKeys,
        }
      };

      shape.render({}, support);

      delete shapeEl.setAttribute;
      expect(shapeEl).toEqual({
        style: {
          a: 20,
          b: '20%',
          c: 'cyan',
          rx: 'calc(200px/2)',
          ry: 'calc(200px/2)'
        }
      });
    });

    it('should apply styles to shapeEl #sizeX', function () {
      var shape = new Circle({
        el: el
      });

      var shapeEl = {
        style: {}
      };
      var props = {
        size: '200px',
        sizeX: '400px'
      };
      var styleKeys = [];

      var support = {
        props: props,
        pipeObj: {
          shapeEl: shapeEl,
          styleKeys: styleKeys,
        }
      };

      shape.render({}, support);

      delete shapeEl.setAttribute;
      expect(shapeEl).toEqual({
        style: {
          rx: 'calc(400px/2)',
          ry: 'calc(200px/2)'
        }
      });
    });

    it('should apply styles to shapeEl #sizeY', function () {
      var shape = new Circle({
        el: el
      });

      var shapeEl = {
        style: {}
      };
      var props = {
        size: '200px',
        sizeY: '300px'
      };
      var styleKeys = [];

      var support = {
        props: props,
        pipeObj: {
          shapeEl: shapeEl,
          styleKeys: styleKeys,
        }
      };

      shape.render({}, support);

      delete shapeEl.setAttribute;
      expect(shapeEl).toEqual({
        style: {
          ry: 'calc(300px/2)',
          rx: 'calc(200px/2)'
        }
      });
    });

    it('should cache styles', function () {
      var shape = new Circle({
        el: el
      });

      var shapeEl = {
        style: {}
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
          shapeEl: shapeEl,
          styleKeys: styleKeys,
        },
        _a: 20,
        _b: '20%',
      };

      shape.render(props, support);

      expect(shapeEl).toEqual({
        style: {
          c: 'cyan',
          rx: 'calc(200/2)',
          ry: 'calc(200/2)'
        }
      });
    });

    it('should cache #rx', function () {
      var shape = new Circle({
        el: el
      });

      var shapeEl = {
        style: {}
      };
      var props = {
        sizeX: 20,
        sizeY: '15px'
      };
      var shapeKeys = [ 'd', 'c' ];

      var support = {
        props: props,
        pipeObj: {
          shapeEl: shapeEl,
          styleKeys: [],
        }
      };

      support._rx = 'calc(20/2)';
      shape.render({}, support);

      expect(shapeEl.style.rx).not.toBeDefined();
    });

    it('should cache #ry', function () {
      var shape = new Circle({
        el: el
      });

      var shapeEl = {
        style: {}
      };
      var props = {
        sizeY: 20,
        sizeX: '15px'
      };
      var shapeKeys = [ 'd', 'c' ];

      var support = {
        props: props,
        pipeObj: {
          shapeEl: shapeEl,
          styleKeys: [],
        }
      };

      support._ry = 'calc(20/2)';
      shape.render({}, support);

      expect(shapeEl.style.ry).not.toBeDefined();
    });

    it('should cache #rx #ry', function () {
      var shape = new Circle({
        el: el
      });

      var shapeEl = {
        style: {}
      };
      var props = {
        sizeX: 20,
        sizeY: '15px'
      };
      var shapeKeys = [ 'd', 'c' ];

      var support = {
        props: props,
        pipeObj: {
          shapeEl: shapeEl,
          styleKeys: [],
        }
      };

      support._rx = 'calc(20/2)';
      support._ry = 'calc(15px/2)';
      shape.render({}, support);

      expect(shapeEl.style.rx).not.toBeDefined();
      expect(shapeEl.style.ry).not.toBeDefined();
    });

  });
});
