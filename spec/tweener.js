(function() {
  var Timeline, Tween, t;

  t = window.mojs.tweenner;

  Tween = window.mojs.Tween;

  Timeline = window.mojs.Timeline;

  describe('Twenner ->', function() {
    return describe('loop ->', function() {
      return it('should loop over', function(dfr) {
        t = new Tween;
        t.add(new Timeline({
          duration: 500,
          delay: 200
        }));
        t.startLoop();
        spyOn(t, 'loop');
        return setTimeout(function() {
          expect(t.loop).toHaveBeenCalled();
          return dfr();
        }, 200);
      });
    });
  });

}).call(this);
