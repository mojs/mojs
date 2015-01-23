(function() {
  var Swirl, Transit, tr;

  Transit = mojs.Transit;

  Swirl = mojs.Swirl;

  tr = new Transit;

  describe('Swirl ->', function() {
    describe('extension ->', function() {
      it('should extend Transit class', function() {
        var swirl;
        swirl = new Swirl;
        return expect(swirl instanceof Transit).toBe(true);
      });
      return it('should have skipPropsDelta', function() {
        var swirl;
        swirl = new Swirl;
        expect(swirl.skipPropsDelta.x).toBe(1);
        return expect(swirl.skipPropsDelta.y).toBe(1);
      });
    });
    return describe('position calc ->', function() {
      it('should calc position radius', function() {
        var swirl;
        swirl = new Swirl({
          x: {
            0: 10
          },
          y: {
            0: 20
          }
        });
        return expect(swirl.positionDelta.radius).toBe(Math.sqrt(10 * 10 + 20 * 20));
      });
      it('should calc position angle', function() {
        var swirl;
        swirl = new Swirl({
          x: {
            0: 10
          },
          y: {
            0: 10
          }
        });
        return expect(swirl.positionDelta.angle).toBe(135);
      });
      it('should calc position angle', function() {
        var swirl;
        swirl = new Swirl({
          x: {
            0: -10
          },
          y: {
            0: -10
          }
        });
        return expect(swirl.positionDelta.angle).toBe - 45;
      });
      it('should calc position angle', function() {
        var swirl;
        swirl = new Swirl({
          x: {
            0: 0
          },
          y: {
            0: -10
          }
        });
        return expect(swirl.positionDelta.angle).toBe(0);
      });
      return it('should calc position angle', function() {
        var swirl;
        swirl = new Swirl({
          x: {
            0: -10
          },
          y: {
            0: 0
          }
        });
        return expect(swirl.positionDelta.angle).toBe(270);
      });
    });
  });

}).call(this);
