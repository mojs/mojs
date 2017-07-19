describe('`rand` ->', function () {
  it('should generate random integer in range', function () {
    for (var i = 0; i < 50; i++) {
      var random = mojs.rand(5, 25);
      expect(random).toBeGreaterThan(4);
      expect(random).not.toBeGreaterThan(25);
      expect(random % 1).toBe(0);
    }
  });

  it('should work with negative numbers', function () {
    for (var i = 0; i < 50; i++) {
      var random = mojs.rand(-5, 5);
      expect(random).toBeGreaterThan(-6);
      expect(random).not.toBeGreaterThan(5);
      expect(random % 1).toBe(0);
    }
  });

  it('should work with negative numbers #both', function () {
    for (var i = 0; i < 50; i++) {
      var random = mojs.rand(-5, -25);
      expect(random).toBeGreaterThan(-26);
      expect(random).not.toBeGreaterThan(-5);
      expect(random % 1).toBe(0);
    }
  });

  it('should have defaults', function () {
    for (var i = 0; i < 50; i++) {
      var random = mojs.rand();
      expect(random).toBeGreaterThan(-1);
      expect(random).not.toBeGreaterThan(10);
      expect(random % 1).toBe(0);
    }
  });

  it('should work with units', function () {
    for (var i = 0; i < 10; i++) {
      var random = mojs.rand('10%', '20%');
      expect(random[random.length - 1]).toBe('%');
      expect(parseInt(random, 10)).toBeGreaterThan(9);
      expect(parseInt(random, 10)).not.toBeGreaterThan(20);
      expect(parseInt(random, 10) % 1).toBe(0);
    }

    for (var i = 0; i < 10; i++) {
      var random = mojs.rand('10rem', '20rem');
      expect(random.substr(random.length - 3)).toBe('rem');
      expect(parseInt(random, 10)).toBeGreaterThan(9);
      expect(parseInt(random, 10)).not.toBeGreaterThan(20);
      expect(parseInt(random, 10) % 1).toBe(0);
    }

    for (var i = 0; i < 10; i++) {
      var random = mojs.rand('10px', '20px');
      expect(random.substr(random.length - 2)).toBe('px');
      expect(parseInt(random, 10)).toBeGreaterThan(9);
      expect(parseInt(random, 10)).not.toBeGreaterThan(20);
      expect(parseInt(random, 10) % 1).toBe(0);
    }

    for (var i = 0; i < 10; i++) {
      var random = mojs.rand('10', '20');

      expect(random).toBeGreaterThan(9);
      expect(random).not.toBeGreaterThan(20);
      expect(random % 1).toBe(0);
    }
  });
});
