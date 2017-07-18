describe('`stagger.function` ->', function () {
  it('should mark a function as stagger one', function () {
    var obj = {
      fun: function () {}
    };

    spyOn(obj, 'fun');
    var newFunction = mojs.stagger.function(obj.fun);

    expect(newFunction.__mojs__isStaggerFunction).toBe(true)

    newFunction(1, 'a', true);

    expect(newFunction).not.toBe(obj.fun);
    expect(obj.fun).toHaveBeenCalledWith(1, 'a', true);
  });
});

