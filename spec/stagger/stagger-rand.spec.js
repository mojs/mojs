describe('`stagger-rand` ->', function () {
  it('should create a stagger funtion', function () {
    expect(mojs.stagger.rand(10, 20).__mojs__isStaggerFunction).toBe(true);
  });

  it('should generate random integer in range', function () {
    var rand = mojs.stagger.rand(5, 25);

    for (var i = 0; i < 50; i++) {
      var random = rand(5, 25);
      expect(random).toBeGreaterThan(4);
      expect(random).not.toBeGreaterThan(25);
      expect(random % 1).toBe(0);
    }
  });

  it('should work with negative numbers', function () {
    var rand = mojs.stagger.rand(-5, 5);

    for (var i = 0; i < 50; i++) {
      var random = rand(-5, 5);
      expect(random).toBeGreaterThan(-6);
      expect(random).not.toBeGreaterThan(5);
      expect(random % 1).toBe(0);
    }
  });

  it('should work with negative numbers #both', function () {
    var rand = mojs.stagger.rand(-5, -25);
    
    for (var i = 0; i < 50; i++) {
      var random = rand(i, 5);
      expect(random).toBeGreaterThan(-26);
      expect(random).not.toBeGreaterThan(-5);
      expect(random % 1).toBe(0);
    }
  });

  it('should work with units', function () {
    var rand = mojs.stagger.rand('-5%', '-25%');
    
    for (var i = 0; i < 50; i++) {
      var random = rand(i, 5);

      expect(random[random.length - 1]).toBe('%');
      expect(parseInt(random, 10)).toBeGreaterThan(-26);
      expect(parseInt(random, 10)).not.toBeGreaterThan(-5);
      expect(parseInt(random, 10) % 1).toBe(0);
    }
  });

  it('should work stagger functions #rand', function () {
    var rand = mojs.stagger.rand(mojs.stagger.rand(-10, 20), mojs.stagger.rand(30, 60));
    
    for (var i = 0; i < 50; i++) {
      var random = rand(i, i+1);
      expect(random).toBeGreaterThan(-11);
      expect(random).not.toBeGreaterThan(60);
      expect(random % 1).toBe(0);
    }
  });

  it('should work stagger functions #step', function () {
    var rand = mojs.stagger.rand(mojs.stagger.rand(-10, 20), mojs.stagger.step(30, 1));
    
    for (var i = 0; i < 50; i++) {
      var random = rand(i, i+1);
      expect(random).toBeGreaterThan(-10);
      expect(random).not.toBeGreaterThan(30 + i);
      expect(random % 1).toBe(0);
    }
  });
});
