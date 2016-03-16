h         = mojs.h
Runable   = mojs.Runable
Thenable  = mojs.Thenable

describe 'Runable ->', ->
  describe 'extention ->', ->
    it 'should extend Thenable', ->
      rn = new Runable
      expect(rn instanceof Thenable).toBe true
  describe '_vars method ->', ->

  describe '_transformHistoryRecord method ->', ->
    it 'should add property to the record', ->
      tr = new Runable()
        .then radius: 0
        .then radius: 50

      result = tr._transformHistoryRecord 0, 'x', 20

      expect(tr._history[0].x).toBe 20
      expect(!!result).toBe false

    it 'should return true if old value is delta', ->
      tr = new Runable({ radius: { 0: 50 } })
        .then radius: 0
        .then radius: 50

      result = tr._transformHistoryRecord 0, 'radius', 20
      expect(tr._history[0].radius[20]).toBe 50
      expect(!!result).toBe true

    it 'should rewrite everything until first delta', ->
      tr = new Runable({ radius: 75 })
        .then radius: 0
        .then radius: 50

      result = tr._transformHistoryRecord 0, 'radius', 20
      expect(tr._history[0].radius).toBe 20
      expect(!!result).toBe false

      result = tr._transformHistoryRecord 1, 'radius', 20
      expect(tr._history[1].radius[20]).toBe 0
      expect(!!result).toBe true

    it 'should rewrite everything until first defined item', ->
      tr = new Runable({ duration: 2000 })
        .then radius: 0
        .then radius: 50, duration: 5000
        .then radius: 50

      result = tr._transformHistoryRecord 0, 'duration', 1000
      expect(tr._history[0].duration).toBe 1000
      expect(!!result).toBe false

      result = tr._transformHistoryRecord 1, 'duration', 1000
      expect(tr._history[1].duration).toBe 1000
      expect(!!result).toBe true

    it 'should save new delta value and modify the next', ->
      tr = new Runable({ radius: 75 })
        .then radius: 0
        .then radius: 50

      delta = { 20 : 100 }
      result = tr._transformHistoryRecord 0, 'radius', delta
      expect(tr._history[0].radius[20]).toBe 100
      expect(!!result).toBe false

      result = tr._transformHistoryRecord 1, 'radius', delta
      expect(tr._history[1].radius[100]).toBe 0
      expect(!!result).toBe true
  describe '_transformHistory method ->', ->
    it 'should call _transformHistoryFor for every new property ->', ->
      tr = new Runable({}).then({ radius: 0 }).then({ radius: 50 })
      spyOn tr, '_transformHistoryFor'
      tr._transformHistory x: 20
      expect(tr._transformHistoryFor)
        .toHaveBeenCalledWith 'x', 20
      expect(tr._transformHistoryFor.calls.count()).toBe 1

  describe '_transformHistoryFor method ->', ->
    it 'should call _transformHistoryRecord for every history record', ->
      tr = new Runable()
        .then radius: 0
        .then radius: 50

      spyOn tr, '_transformHistoryRecord'
      tr._transformHistoryFor( 'x', 20 )
      expect(tr._transformHistoryRecord)
        .toHaveBeenCalledWith 0, 'x', 20
      expect(tr._transformHistoryRecord)
        .toHaveBeenCalledWith 1, 'x', 20
      expect(tr._transformHistoryRecord)
        .toHaveBeenCalledWith 2, 'x', 20

    it 'should stop looping if _transformHistoryRecord returns true', ->
      tr = new Runable()
        .then radius: 0
        .then radius: 50

      r = 0
      tr._transformHistoryRecord =  -> r++ is 1
      spyOn(tr, '_transformHistoryRecord').and.callThrough()

      tr._transformHistoryFor( 'x', 20 )
      expect(tr._transformHistoryRecord)
        .toHaveBeenCalledWith 0, 'x', 20
      expect(tr._transformHistoryRecord)
        .toHaveBeenCalledWith 1, 'x', 20
      expect(tr._transformHistoryRecord)
        .not.toHaveBeenCalledWith 2, 'x', 20
    
  describe '_resetTween method ->', ->
    it 'should set props to the tween', ->
      tr = new Runable
      props = { fill: 'hotpink', duration: 2000 }
      tr._props = props
      spyOn(tr.tween, '_setProps').and.callThrough()
      tr._resetTween( tr.tween, props )
      expect(props.shiftTime).toBe 0
      expect(tr.tween._setProps).toHaveBeenCalledWith props

    it 'should pass shift time', ->
      tr = new Runable
      props = { fill: 'hotpink', duration: 2000 }
      tr._props = props
      spyOn(tr.tween, '_setProps').and.callThrough()
      shiftTime = 500
      tr._resetTween( tr.tween, props, shiftTime )
      expect(props.shiftTime).toBe shiftTime
      expect(tr.tween._setProps).toHaveBeenCalledWith props

  describe '_resetTweens method ->', ->
    it 'should reset options on all tweens', ->
      tr = new Runable()
        .then({ fill: 'cyan' })
        .then({ fill: 'yellow' })
      spyOn tr.timeline._timelines[0], '_setProps'
      spyOn tr.timeline._timelines[1], '_setProps'
      spyOn tr.timeline._timelines[2], '_setProps'
      tr._resetTweens()
      expect(tr.timeline._timelines[0]._setProps)
        .toHaveBeenCalledWith tr._history[0]
      expect(tr.timeline._timelines[1]._setProps)
        .toHaveBeenCalledWith tr._history[1]
      expect(tr.timeline._timelines[2]._setProps)
        .toHaveBeenCalledWith tr._history[2]
    it 'should loop thru all tweens', ->
      tr = new Runable()
        .then({ fill: 'cyan' })
        .then({ fill: 'yellow' })
      spyOn tr, '_resetTween'
      tr._resetTweens()
      tweens = tr.timeline._timelines
      shift = 0
      expect(tr._resetTween)
        .toHaveBeenCalledWith tweens[0], tr._history[0], shift
      shift += tweens[0]._props.repeatTime
      expect(tr._resetTween)
        .toHaveBeenCalledWith tweens[1], tr._history[1], shift
      shift += tweens[1]._props.repeatTime
      expect(tr._resetTween)
        .toHaveBeenCalledWith tweens[2], tr._history[2], shift
    it 'should call _recalcTotalDuration on the timeline', ->
      tr = new Runable()
        .then({ fill: 'cyan' })
        .then({ fill: 'yellow' })
      spyOn tr.timeline, '_recalcTotalDuration'
      tr._resetTweens()
      expect(tr.timeline._recalcTotalDuration)
        .toHaveBeenCalled()

  describe 'run method ->', ->
    it 'should extend defaults with passed object', ->
      byte = new Runable(strokeWidth: {10: 5})
      spyOn byte, '_extendDefaults'
      o = { strokeWidth: 20 }
      byte.run(o)
      expect(byte._extendDefaults).toHaveBeenCalledWith o
    it 'should not transform history if object was not passed', ->
      byte = new Runable(strokeWidth: {10: 5})
      spyOn byte, '_transformHistory'
      byte.run()
      expect(byte._transformHistory).not.toHaveBeenCalled()
    it 'should not override deltas', ->
      byte = new Runable()
      byte._deltas['strokeWidth'] = {10: 5}
      byte.run stroke: 'green'
      expect(byte._deltas.strokeWidth).toBeDefined()
    it 'should start tween', ->
      byte = new Runable(strokeWidth: {10: 5})
      spyOn byte, 'stop'
      spyOn byte, 'play'
      byte.run()
      expect(byte.stop).toHaveBeenCalled()
      expect(byte.play).toHaveBeenCalled()
    it 'should accept new options', ->
      byte = new Runable(strokeWidth: {10: 5})
      byte.run strokeWidth: 25
      expect(byte._props.strokeWidth).toBe 25
      expect(byte._deltas.strokeWidth).not.toBeDefined()
    it 'should not modify old options', ->
      byte = new Runable(strokeWidth: {10: 5}, radius: 33)
      byte._props.radius = 33
      byte.run strokeWidth: 25
      expect(byte._props.radius).toBe 33
    # TODO: check the tween props
    it 'should call _recalcTotalDuration on timeline', ->
      byte = new Runable
      spyOn byte.timeline, '_recalcTotalDuration'
      byte.run duration: 2000
      expect(byte.timeline._recalcTotalDuration).toHaveBeenCalled()
    it 'should call _transformHistory', ->
      byte = new Runable
      spyOn byte, '_transformHistory'
      o = duration: 2000
      byte.run o
      expect(byte._transformHistory).toHaveBeenCalledWith o
    it 'should not call _transformHistory if optionless', ->
      byte = new Runable
      spyOn byte, '_transformHistory'
      byte.run()
      expect(byte._transformHistory).not.toHaveBeenCalled()
    it 'shoud not warn if history is 1 record long', ->
      byte = new Runable(duration:  2000)
      spyOn h, 'warn'
      byte.run
        duration: 100
        delay:    100
        repeat:   1
        yoyo:     false
        easing:   'Linear.None'
        onStart:    ->
        onUpdate:   ->
        onComplete: ->
      expect(h.warn).not.toHaveBeenCalled()
      expect(byte._history[0].duration).toBe 100
      expect(byte._props.duration)     .toBe 100
    it 'shoud work with no arguments passed', ->
      byte = new Runable(duration:  2000)
        .then radius: 500
      expect(-> byte.run()).not.toThrow()