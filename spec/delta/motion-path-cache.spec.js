var MotionPath = mojs.MotionPath;
var helpers = mojs.__helpers__;
var motionPathCache = helpers.motionPathCache;

describe('`motion path cache` ->', function () {
    it('should save item by `path` and `n`', function () {
        var path = 'M0,0 L 100,100';
        var n = 1000;
        var obj = {};

        motionPathCache.save(path, n, obj);

        expect(motionPathCache.get(path, n)).toBe(obj);
    });
});
