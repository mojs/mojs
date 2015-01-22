(function() {
  var Swirl, Transit;

  Transit = mojs.Transit;

  Swirl = mojs.Swirl;

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
    describe('position calc ->', function() {
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
        return expect(swirl.positionDelta.radius).toBe(20);
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
      it('should save startX and StartY values', function() {
        var swirl;
        swirl = new Swirl({
          x: {
            0: 10
          },
          y: {
            10: 10
          }
        });
        expect(swirl.positionDelta.x.start).toBe(0);
        return expect(swirl.positionDelta.y.start).toBe(10);
      });
      it('should set start position anyways', function() {
        var swirl;
        swirl = new Swirl({
          x: {
            0: 10
          },
          y: 0,
          isRunLess: true
        });
        expect(parseInt(swirl.props.x, 10)).toBe(0);
        return expect(parseInt(swirl.props.y, 10)).toBe(0);
      });
      return it('should call super extendDefaults method', function() {
        var swirl;
        swirl = new Swirl({
          radius: [
            {
              20: 50
            }, 20
          ]
        });
        spyOn(Swirl.__super__, 'extendDefaults');
        swirl.extendDefaults();
        return expect(Swirl.__super__.extendDefaults).toHaveBeenCalled();
      });
    });
    return describe('setProgress ->', function() {
      it('should call super setProgress method', function() {
        var swirl;
        swirl = new Swirl({
          radius: [
            {
              20: 50
            }, 20
          ]
        });
        spyOn(Swirl.__super__, 'setProgress');
        swirl.setProgress(.5);
        return expect(Swirl.__super__.setProgress).toHaveBeenCalledWith(.5);
      });
      return it('should set x/y progress', function() {
        var swirl;
        swirl = new Swirl({
          x: {
            0: 10
          },
          y: {
            0: 10
          },
          isRunLess: true,
          isIt: true
        });
        swirl.setProgress(.5);
        expect(swirl.props.x).toBe('3.5355px');
        return expect(swirl.props.y).toBe('3.5355px');
      });
    });
  });

}).call(this);
