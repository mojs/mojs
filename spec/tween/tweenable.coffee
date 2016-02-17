Tween     = mojs.Tween
Timeline  = mojs.Timeline
Tweenable = mojs.Tweenable

describe 'tweenable ->', ->
  describe 'options ->', ->
    it 'should save options to this._o ->', ->
      option = 'some string'
      tw = new Tweenable option1: option
      expect(tw._o.option1).toBe option
    it 'should fallback to empty object ->', ->
      tw = new Tweenable
      expect(typeof tw._o).toBe 'object'
  describe 'constructor ->', ->
    it 'should call _transformTweenOptions method ->',->
      spyOn Tweenable.prototype, '_transformTweenOptions'
      tw = new Tweenable
      expect(Tweenable.prototype._transformTweenOptions).toHaveBeenCalled()
  describe '_makeTween ->', ->
    it 'should call _makeTween on the construction stage ->', ->
      spyOn(Tweenable.prototype, '_makeTween').and.callThrough()
      tw = new Tweenable
      expect(Tweenable.prototype._makeTween).toHaveBeenCalled()
    it 'should create tween ->',->
      tw = new Tweenable
      expect(tw._tween instanceof Tween).toBe true
    it 'should construct tween with this._o ->',->
      tw = new Tweenable
      expect(tw._tween.o).toBe tw._o
  describe '_makeTimeline ->', ->
    it 'should call _makeTimeline on the construction stage ->', ->
      spyOn Tweenable.prototype, '_makeTimeline'
      tw = new Tweenable
      expect(Tweenable.prototype._makeTimeline).toHaveBeenCalled()
    it 'should create timeline ->',->
      tw = new Tweenable
      expect(tw._timeline instanceof Timeline).toBe true
    it 'should timeline with this._o.timeline ->',->
      timelineOptions = { delay: 200, repeat: 2 }
      tw = new Tweenable timeline: timelineOptions
      expect(tw._timeline.o).toBe tw._o.timeline
    it 'should add add tween to the timeline ->',->
      tw = new Tweenable
      expect(tw._timeline._timelines[0]).toBe tw._tween
    it 'should not add tween if there is no one ->',->
      class TweenableExtention extends Tweenable
        _makeTween:->
      tw = new TweenableExtention
      expect(tw._timeline._timelines[0]).not.toBeDefined()
  describe 'play method ->', ->
    it 'should call timeline\'s play method', ->
      tw = new Tweenable
      spyOn tw._timeline, 'play'
      progress = .5
      tw.play( progress )
      expect(tw._timeline.play).toHaveBeenCalledWith progress
  describe 'playBackward ->', ->
    it 'should call timeline\'s playBackward method', ->
      tw = new Tweenable
      spyOn tw._timeline, 'playBackward'
      progress = .5
      tw.playBackward( progress )
      expect(tw._timeline.playBackward).toHaveBeenCalledWith progress
  describe 'pause ->', ->
    it 'should call timeline\'s pause method', ->
      tw = new Tweenable
      spyOn tw._timeline, 'pause'
      progress = .5
      tw.pause( progress )
      expect(tw._timeline.pause).toHaveBeenCalledWith progress
  describe 'stop ->', ->
    it 'should call timeline\'s stop method', ->
      tw = new Tweenable
      spyOn tw._timeline, 'stop'
      progress = .5
      tw.stop( progress )
      expect(tw._timeline.stop).toHaveBeenCalledWith progress
  describe 'setProgress ->', ->
    it 'should call timeline\'s setProgress method', ->
      tw = new Tweenable
      spyOn tw._timeline, 'setProgress'
      progress = .5
      tw.setProgress( progress )
      expect(tw._timeline.setProgress).toHaveBeenCalledWith progress



