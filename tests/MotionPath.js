(function() {
  var MotionPath;

  MotionPath = window.mojs.MotionPath;

  describe('MotionPath', function() {
    return describe('enviroment', function() {
      return it('SVG should be supported', function() {
        var isSVG;
        isSVG = document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Shape', '1.1');
        return expect(isSVG).toBeTruthy();
      });
    });
  });

}).call(this);
