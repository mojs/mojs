describe('`stagger.map` ->', function () {
  it('should mark an aaray as stagger one', function () {
    const arr = [1, '2', true];
    var newMap = mojs.stagger.map(arr[0], arr[1], arr[2]);

    expect(newMap.__mojs__isStaggerMap).toBe(true)

    expect(newMap).not.toBe(arr);
    expect(newMap[0]).toEqual(arr[0]);
    expect(newMap[1]).toEqual(arr[1]);
    expect(newMap[2]).toEqual(arr[2]);
    expect(newMap[3]).toEqual(arr[3]);
    expect(newMap[3]).not.toBeDefined();
  });
});
