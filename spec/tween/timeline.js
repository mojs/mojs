(function() {
  var Timeline, Transit, Tween, tweener;

  Timeline = window.mojs.Timeline;

  Tween = window.mojs.Tween;

  tweener = window.mojs.tweener;

  Transit = window.mojs.Transit;

  describe('Timeline ->', function() {
    beforeEach(function() {
      return tweener.removeAll();
    });
    it('should have timelines var', function() {
      var t;
      t = new Timeline;
      expect(t.timelines.length).toBe(0);
      expect(t.props.time).toBe(0);
      expect(t.props.repeatTime).toBe(0);
      return expect(t.props.shiftedRepeatTime).toBe(0);
    });
    return it('should have initial state flags', function() {
      var t;
      t = new Timeline;
      return expect(t.state).toBe('stop');
    });
  });

}).call(this);
