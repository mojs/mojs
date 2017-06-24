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

  describe('_initializeShape ->', function() {
    it('should create el to render', function () {
      var shape = new Circle({
        el: el
      });

      var circle = shape.root.firstChild;
      expect(circle.tagName.toLowerCase()).toBe('circle');
      expect(circle.getAttribute('cx')).toBe('50');
    });
  });
});
