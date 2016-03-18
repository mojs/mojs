Tween     = mojs.Tween
Timeline  = mojs.Timeline
Tweenable = mojs.Tweenable
Module    = mojs.Module

describe 'tweenable ->', ->
  describe 'extention ->', ->
    it 'should extend Module', ->
      tw = new Tweenable
      expect(tw instanceof Module).toBe true
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
  describe 'initialization ->', ->
    it 'should pass this as callbacksContext object to timeline', ->
      tw = new Tweenable
      expect(tw.timeline._props.callbacksContext).toBe tw
    it 'should pass this as callbacksContext object to tween', ->
      tw = new Tweenable
      expect(tw.timeline._timelines[0]._props.callbacksContext).toBe tw
  describe '_makeTween ->', ->
    it 'should call _makeTween on the construction stage ->', ->
      spyOn(Tweenable.prototype, '_makeTween').and.callThrough()
      tw = new Tweenable
      expect(Tweenable.prototype._makeTween).toHaveBeenCalled()
    it 'should create tween ->',->
      tw = new Tweenable
      expect(tw.tween instanceof Tween).toBe true
    it 'should construct tween with this._o ->',->
      tw = new Tweenable
      expect(tw.tween._o).toBe tw._o
  describe '_makeTimeline ->', ->
    it 'should call _makeTimeline on the construction stage ->', ->
      spyOn Tweenable.prototype, '_makeTimeline'
      tw = new Tweenable
      expect(Tweenable.prototype._makeTimeline).toHaveBeenCalled()
    it 'should create timeline ->',->
      tw = new Tweenable
      expect(tw.timeline instanceof Timeline).toBe true
    it 'should timeline with this._o.timeline ->',->
      timelineOptions = { delay: 200, repeat: 2 }
      tw = new Tweenable timeline: timelineOptions
      expect(tw.timeline._o).toBe tw._o.timeline
    it 'should add add tween to the timeline ->',->
      tw = new Tweenable
      expect(tw.timeline._timelines[0]).toBe tw.tween
    it 'should not add tween if there is no one ->',->
      class TweenableExtention extends Tweenable
        _makeTween:->
      tw = new TweenableExtention
      expect(tw.timeline._timelines[0]).not.toBeDefined()
  describe 'play method ->', ->
    it 'should call timeline\'s play method', ->
      tw = new Tweenable
      spyOn tw.timeline, 'play'
      progress = .5
      tw.play( progress )
      expect(tw.timeline.play).toHaveBeenCalledWith progress
    it 'should return this', ->
      tw = new Tweenable
      result = tw.play()
      expect(result).toBe tw
  describe 'playBackward ->', ->
    it 'should call timeline\'s playBackward method', ->
      tw = new Tweenable
      spyOn tw.timeline, 'playBackward'
      progress = .5
      tw.playBackward( progress )
      expect(tw.timeline.playBackward).toHaveBeenCalledWith progress
    it 'should return this', ->
      tw = new Tweenable
      result = tw.playBackward()
      expect(result).toBe tw
  describe 'pause ->', ->
    it 'should call timeline\'s pause method', ->
      tw = new Tweenable
      spyOn tw.timeline, 'pause'
      progress = .5
      tw.pause( progress )
      expect(tw.timeline.pause).toHaveBeenCalledWith progress
    it 'should return this', ->
      tw = new Tweenable
      result = tw.pause()
      expect(result).toBe tw
  describe 'stop ->', ->
    it 'should call timeline\'s stop method', ->
      tw = new Tweenable
      spyOn tw.timeline, 'stop'
      progress = .5
      tw.stop( progress )
      expect(tw.timeline.stop).toHaveBeenCalledWith progress
    it 'should return this', ->
      tw = new Tweenable
      result = tw.stop()
      expect(result).toBe tw
  describe 'setProgress ->', ->
    it 'should call timeline\'s setProgress method', ->
      tw = new Tweenable
      spyOn tw.timeline, 'setProgress'
      progress = .5
      tw.setProgress( progress )
      expect(tw.timeline.setProgress).toHaveBeenCalledWith progress
    it 'should return this', ->
      tw = new Tweenable
      result = tw.setProgress( .5 )
      expect(result).toBe tw

  describe 'isTimelineLess options', ->
    it 'should not create timeline', ->
      tw = new Tweenable isTimelineLess: true
      expect(tw._o.timeline).not.toBeDefined()
    it 'should save tween as timeline property', ->
      tw = new Tweenable isTimelineLess: true
      expect(tw.timeline instanceof Timeline).toBe false
      expect(tw.timeline instanceof Tween).toBe true

  describe 'callbacksContext option ->', ->
    it 'should pass the options to the tween', ->
      obj = {}; isRightContext = null
      tr = new Tweenable callbacksContext: obj

      expect(tr.tween._props.callbacksContext).toBe obj
      expect(tr.timeline._props.callbacksContext).toBe obj

