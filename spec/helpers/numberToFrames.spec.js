var helpers = mojs.__helpers__;
var numberToFrame = helpers.numberToFrame;

describe('numberToFrame function ->', function () {
  it('should transform input number', function () {
    expect(numberToFrame(516)).toBe(512);
    expect(numberToFrame(313)).toBe(320);
    expect(numberToFrame(240)).toBe(240);
    expect(numberToFrame(220)).toBe(224);
    expect(numberToFrame(213)).toBe(208);
    expect(numberToFrame(200)).toBe(208);
    expect(numberToFrame(31)).toBe(32);
    expect(numberToFrame(30)).toBe(32);
    expect(numberToFrame(24)).toBe(32);
    expect(numberToFrame(22)).toBe(16);
    expect(numberToFrame(18)).toBe(16);
    expect(numberToFrame(12)).toBe(16);
    expect(numberToFrame(11)).toBe(16);
    expect(numberToFrame(7)).toBe(0);
  });
});
