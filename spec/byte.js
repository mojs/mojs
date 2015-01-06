(function() {
  var Bit, Byte, ns, svg;

  Byte = mojs.Byte;

  Bit = mojs.Bit;

  ns = 'http://www.w3.org/2000/svg';

  svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg") : void 0;

  describe('Byte ->', function() {
    return describe('extension ->', function() {
      return it('should extend Bit class', function() {
        var byte;
        byte = new Byte({
          ctx: svg
        });
        return expect(byte instanceof Bit).toBe(true);
      });
    });
  });

}).call(this);
