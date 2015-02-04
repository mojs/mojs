(function() {
  var Burst, Swirl, Transit;

  Transit = mojs.Transit;

  Swirl = mojs.Swirl;

  Burst = mojs.Burst;

  describe('Burst ->', function() {
    describe('extension ->', function() {
      it('should extend Transit class', function() {
        var burst;
        burst = new Burst;
        return expect(burst instanceof Transit).toBe(true);
      });
      it('should have its own defaults', function() {
        var burst;
        burst = new Burst;
        expect(burst.defaults.degree).toBe(360);
        expect(burst.defaults.points).toBe(5);
        expect(burst.defaults.opacity).toBe(1);
        expect(burst.defaults.randomAngle).toBe(0);
        expect(burst.defaults.randomRadius).toBe(0);
        expect(burst.defaults.x).toBe(100);
        expect(burst.defaults.y).toBe(100);
        expect(burst.defaults.shiftX).toBe(0);
        expect(burst.defaults.shiftY).toBe(0);
        expect(burst.defaults.radius[25]).toBe(75);
        expect(burst.defaults.angle).toBe(0);
        expect(burst.defaults.size).toBe(null);
        expect(burst.defaults.sizeGap).toBe(0);
        expect(burst.defaults.onStart).toBe(null);
        expect(burst.defaults.onComplete).toBe(null);
        expect(burst.defaults.onCompleteChain).toBe(null);
        expect(burst.defaults.onUpdate).toBe(null);
        expect(burst.defaults.duration).toBe(500);
        expect(burst.defaults.delay).toBe(0);
        expect(burst.defaults.repeat).toBe(1);
        expect(burst.defaults.yoyo).toBe(false);
        expect(burst.defaults.easing).toBe('Linear.None');
        expect(burst.defaults.type).toBe('circle');
        expect(burst.defaults.fill).toBe('deeppink');
        expect(burst.defaults.fillOpacity).toBe(1);
        expect(burst.defaults.stroke).toBe('transparent');
        expect(burst.defaults.strokeWidth).toBe(0);
        expect(burst.defaults.strokeDasharray).toBe('');
        expect(burst.defaults.strokeDashoffset).toBe('');
        expect(burst.defaults.strokeLinecap).toBe(null);
        expect(burst.defaults.isSwirl).toBe(false);
        expect(burst.defaults.swirlSize).toBe(10);
        return expect(burst.defaults.swirlFrequency).toBe(3);
      });
      return it('should have childDefaults', function() {
        var burst;
        burst = new Burst;
        expect(burst.childDefaults.radius[7]).toBe(0);
        expect(burst.childDefaults.points).toBe(3);
        expect(burst.childDefaults.angle).toBe(0);
        expect(burst.childDefaults.onStart).toBe(null);
        expect(burst.childDefaults.onComplete).toBe(null);
        return expect(burst.childDefaults.onUpdate).toBe(null);
      });
    });
    describe('initialization ->', function() {
      return it('should create transits', function() {
        var burst;
        burst = new Burst;
        expect(burst.transits.length).toBe(5);
        return expect(burst.transits[0] instanceof Swirl).toBe(true);
      });
    });
    describe('fillTransform method ->', function() {
      return it('return tranform string of the el', function() {
        var burst;
        burst = new Burst({
          shiftX: 100,
          shiftY: 100,
          angle: 50
        });
        return expect(burst.fillTransform()).toBe('rotate(50deg) translate(100px, 100px)');
      });
    });
    describe('isNeedsTransform method ->', function() {
      return it('return boolean if fillTransform needed', function() {
        var burst;
        burst = new Burst({
          shiftX: 100,
          shiftY: 100,
          angle: 50
        });
        return expect(burst.isNeedsTransform()).toBe(true);
      });
    });
    describe('randomness ->', function() {
      describe('random angle ->', function() {
        it('should have randomAngle option ->', function() {
          var burst;
          burst = new Burst;
          expect(burst.props.randomAngle).toBeDefined();
          return expect(burst.props.randomAngle).toBe(0);
        });
        return it('should calculate angleRand for every transit ->', function() {
          var burst;
          burst = new Burst({
            randomAngle: true
          });
          expect(burst.transits[0].o.angleShift).toBeDefined();
          return expect(burst.transits[1].o.angleShift).toBeDefined();
        });
      });
      return describe('random radius ->', function() {
        it('should have randomRadius option ->', function() {
          var burst;
          burst = new Burst;
          expect(burst.props.randomRadius).toBeDefined();
          return expect(burst.props.randomRadius).toBe(0);
        });
        return it('should calculate radiusRand for every transit ->', function() {
          var burst;
          burst = new Burst({
            randomRadius: true
          });
          expect(burst.transits[0].o.radiusScale).toBeDefined();
          return expect(burst.transits[1].o.radiusScale).toBeDefined();
        });
      });
    });
    describe('generateRandomRadius method ->', function() {
      return it('should generate random radius based on randomness', function() {
        var burst, radius;
        burst = new Burst({
          randomRadius: .75
        });
        radius = burst.generateRandomRadius();
        expect(radius).toBeGreaterThan(.24);
        return expect(radius).not.toBeGreaterThan(1);
      });
    });
    return describe('draw method ->', function() {
      it('should not call drawEl method', function() {
        var burst;
        burst = new Burst;
        spyOn(burst, 'drawEl');
        burst.draw();
        return expect(burst.drawEl).toHaveBeenCalled();
      });
      return it('should call fillTransform method', function() {
        var burst;
        burst = new Burst({
          radius: 25
        });
        spyOn(burst, 'fillTransform');
        burst.draw();
        return expect(burst.fillTransform).toHaveBeenCalled();
      });
    });
  });

}).call(this);
