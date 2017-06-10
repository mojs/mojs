

describe('tweenie ->', function () {
  it('create easing cureve easing #1`', function () {
    var path = mojs.easing.path('M0,100 L100,0');

    expect(path(0)).toBeCloseTo(0, 3);
    expect(path(.5)).toBeCloseTo(.5, 3);
    expect(path(1)).toBeCloseTo(1, 3);
  });

  it('create easing cureve easing #2', function () {
    var path = mojs.easing.path('M0,100 L25,0 L75,0 L100,100');

    expect(path(0)).toBeCloseTo(0, 2);
    expect(path(.255)).toBeCloseTo(1, 2);
    expect(path(.5)).toBeCloseTo(1, 2);
    expect(path(.745)).toBeCloseTo(1, 2);
    expect(path(1)).toBeCloseTo(0, 2);
  });

  it('create easing cureve easing #3', function () {
    var path = mojs.easing.path('M0,100 L25,-100 L75,-100 L100,100');

    expect(path(0)).toBeCloseTo(0, 1);
    expect(path(.255)).toBeCloseTo(2, 2);
    expect(path(.5)).toBeCloseTo(2, 2);
    expect(path(.745)).toBeCloseTo(2, 2);
    expect(path(1)).toBeCloseTo(0, 1);
  });
});
