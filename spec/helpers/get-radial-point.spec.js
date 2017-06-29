var helpers = mojs.__helpers__;
var getRadialPoint = helpers.getRadialPoint;

describe('`getRadialPoint` ->', function () {
  it('should get radial point #0', function () {

    const target = {};
    getRadialPoint(0, 0, 50, 0, target);
    expect(target.x).toBeCloseTo(0, 3);
    expect(target.y).toBeCloseTo(-50, 3);
  });

  it('should get radial point #45', function () {

    const target = {};
    getRadialPoint(0, 0, 50, 45, target);
    expect(parseInt(target.x, 10)).toBe(35);
    expect(parseInt(target.y, 10)).toBe(-35);
  });

  it('should get radial point #negative45', function () {

    const target = {};
    getRadialPoint(0, 0, 50, -45, target);
    expect(parseInt(target.x, 10)).toBe(-35);
    expect(parseInt(target.y, 10)).toBe(-35);
  });

  it('should get radial point #90', function () {

    const target = {};
    getRadialPoint(0, 0, 50, 90, target);
    expect(target.x).toBeCloseTo(50, 3);
    expect(target.y).toBeCloseTo(0, 3);
  });

  it('should get radial point #180', function () {

    const target = {};
    getRadialPoint(0, 0, 50, 180, target);
    expect(target.x).toBeCloseTo(0, 3);
    expect(target.y).toBeCloseTo(50, 3);
  });

  it('should get radial point #270', function () {

    const target = {};
    getRadialPoint(0, 0, 50, 270, target);
    expect(target.x).toBeCloseTo(-50, 3);
    expect(target.y).toBeCloseTo(0, 3);
  });

  it('should get radial point #360', function () {

    const target = {};
    getRadialPoint(0, 0, 50, 360, target);
    expect(target.x).toBeCloseTo(0, 3);
    expect(target.y).toBeCloseTo(-50, 3);
  });

  it('should get radial point #450', function () {

    const target = {};
    getRadialPoint(0, 0, 50, 450, target);
    expect(target.x).toBeCloseTo(50, 3);
    expect(target.y).toBeCloseTo(0, 3);
  });
});
