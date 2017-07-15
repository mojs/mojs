describe('`rand` ->', function () {
  it('should generate random integer in range', function () {
    for (var i = 0; i < 50; i++) {
      var random = mojs.randFloat(5, 25);
      expect(random).toBeGreaterThan(4);
      expect(random).not.toBeGreaterThan(25);
    }
  });

  it('should work with negative numbers', function () {
    for (var i = 0; i < 50; i++) {
      var random = mojs.randFloat(-5, 5);
      expect(random).toBeGreaterThan(-6);
      expect(random).not.toBeGreaterThan(5);
    }
  });

  it('should work with negative numbers #both', function () {
    for (var i = 0; i < 50; i++) {
      var random = mojs.randFloat(-5, -25);
      expect(random).toBeGreaterThan(-26);
      expect(random).not.toBeGreaterThan(-5);
    }
  });

  it('should work with negative numbers #flip', function () {
    for (var i = 0; i < 50; i++) {
      var random = mojs.randFloat(-25, -5);
      expect(random).toBeGreaterThan(-26);
      expect(random).not.toBeGreaterThan(-5);
    }
  });

  it('should have defaults', function () {
    for (var i = 0; i < 50; i++) {
      var random = mojs.randFloat();
      expect(random).toBeGreaterThan(-1);
      expect(random).not.toBeGreaterThan(10);
    }
  });
});
