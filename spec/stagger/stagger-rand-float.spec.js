describe('`stagger-rand-float` ->', function () {
  it('should create a stagger funtion', function () {
    expect(mojs.stagger.randFloat(10, 20).__mojs__isStaggerFunction).toBe(true);
  });

  it('should generate random integer in range', function () {
    var rand = mojs.stagger.randFloat(5, 25);

    for (var i = 0; i < 50; i++) {
      var random = rand(5, 25);
      expect(random).toBeGreaterThan(4);
      expect(random).not.toBeGreaterThan(25);
    }
  });

  it('should work with negative numbers', function () {
    var rand = mojs.stagger.randFloat(-5, 5);

    for (var i = 0; i < 50; i++) {
      var random = rand(-5, 5);
      expect(random).toBeGreaterThan(-6);
      expect(random).not.toBeGreaterThan(5);
    }
  });

  it('should work with negative numbers #both', function () {
    var rand = mojs.stagger.randFloat(-5, -25);
    
    for (var i = 0; i < 50; i++) {
      var random = rand(-5, -25);
      expect(random).toBeGreaterThan(-26);
      expect(random).not.toBeGreaterThan(-5);
    }
  });
});
