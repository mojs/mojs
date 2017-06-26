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
      expect(svgCanvas.firstChild.tagName.toLowerCase()).toBe('g');
      expect(svgCanvas.firstChild + '').toBe('[object SVGGElement]');
      expect(svgCanvas.firstChild.getAttribute('vector-effect')).toBe('non-scaling-stroke');
    });
  });
});
