(function() {
  document.addEventListener('DOMContentLoaded', function(e) {
    var MotionPath;
    MotionPath = window.mojs.MotionPath;
    return describe('MotionPath ->', function() {
      var ns;
      ns = 'http://www.w3.org/2000/svg';
      return describe('enviroment ->', function() {
        it('SVG should be supported', function() {
          var isSVG;
          isSVG = !!(typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg").createSVGRect : void 0);
          return expect(isSVG).toBeTruthy();
        });
        return it('SVG path should have getTotalLength method', function() {
          var path;
          path = document.createElementNS(ns, "path");
          return expect(path.getTotalLength).toBeDefined();
        });
      });
    });
  });

}).call(this);
