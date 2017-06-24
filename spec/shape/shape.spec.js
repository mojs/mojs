var Surface = mojs.Surface;
var Shape = mojs.Shape;

var el = document.createElement('div');

describe('`Shape` ->', function () {
  describe('extension ->', function() {
    it('should extend `ClassProto`', function () {
      var shape = new Shape({
        el: el
      });
      expect(Surface.__mojsClass.isPrototypeOf(shape)).toBe(true);
    });
  });
});
