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
    # x : { 0 }  -> { 0 }  -> { 0 }
    # x : { 20 } -> { 20 } -> { 20 }
    it 'should add property to the record', ->
      tr = new Runable()
        .then radius: 0
        .then radius: 50

      result = tr._transformHistoryRecord 0, 'x', 20

      expect(tr._history[0].x).toBe 20
      expect(result).toBe 20

    it 'should return newValue if old value is delta and index is 0', ->
      # radius: { 0: 50 } -> { 50: 0 } -> { 0: 50 }
      # radius: ^{ 20 } -> { 20 : 0 } x-> { 0: 50 }
      tr = new Runable({ radius: { 0: 50 } })
        .then radius: 0
        .then radius: 50

      result = tr._transformHistoryRecord 0, 'radius', 20
      expect(tr._history[0].radius).toBe 20
      expect(result).toBe 20
    it 'should return null if old value is delta but index isnt 0', ->
      # radius: { 0: 50 } -> { 50: 0 } -> { 0: 50 }
      # radius: { 20 } -> ^{ 20 : 0 } x-> { 0: 50 }
      tr = new Runable({ radius: { 0: 50 } })
        .then radius: 0
        .then radius: 50

      result = tr._transformHistoryRecord 1, 'radius', 20
      expect(tr._history[1].radius[20]).toBe 0
      expect(result).toBe null

    it 'should rewrite everything until first delta', ->
      tr = new Runable({ radius: 75 })
        .then radius: 0
        .then radius: 50

      result = tr._transformHistoryRecord 0, 'radius', 20
      expect(tr._history[0].radius).toBe 20
      expect(result).toBe 20

      result = tr._transformHistoryRecord 1, 'radius', 20
      expect(tr._history[1].radius[20]).toBe 0
      expect(result).toBe null

    it 'should rewrite everything until first defined item', ->
      tr = new Runable({ duration: 2000 })
        .then radius: 0
        .then radius: 50, duration: 5000
        .then radius: 50

      result = tr._transformHistoryRecord 0, 'duration', 1000
      expect(tr._history[0].duration).toBe 1000
      expect(result).toBe 1000

      result = tr._transformHistoryRecord 1, 'duration', 1000
      expect(tr._history[1].duration).toBe 1000
      expect(result).toBe null

    it 'should save new delta value and modify the next', ->
      tr = new Runable({ radius: 75 })
        .then radius: 0
        .then radius: 50

      delta = { 20 : 100 }
      result = tr._transformHistoryRecord 0, 'radius', delta
      expect(tr._history[0].radius[20]).toBe 100
      expect(result).toBe 100

      result = tr._transformHistoryRecord 1, 'radius', 100
      expect(tr._history[1].radius[100]).toBe 0
      expect(result).toBe null

    it 'should return newValue if old value is delta and index is 0', ->
      # radius: { 0: 50 } -> { 50: 0 } -> { 0: 50 }
      # radius: ^{ 20 } -> { 20 : 0 } x-> { 0: 50 }
      tr = new Runable({ duration: 2000 })
        .then duration: 300
        .then duration: 500

      result = tr._transformHistoryRecord 0, 'duration', 500
      expect(tr._history[0].duration).toBe 500
      expect(result).toBe null

    it 'should always stop at 0 index if tween prop', ->
      tr = new Runable({ duration: 2000 })
        .then radius: 20
        .then radius: 30

      result = tr._transformHistoryRecord 0, 'delay', 500
      expect(tr._history[0].delay).toBe 500
      expect(result).toBe null

    it 'should immediately return null if new value is null ', ->
      tr = new Runable({ duration: 2000, isIt: 1 })
        .then radius: 20
        .then radius: 30

      result = tr._transformHistoryRecord 0, 'delay', null
      expect(tr._history[0].delay).toBe undefined
      expect(result).toBe null

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

      spyOn(tr, '_transformHistoryRecord').and.callThrough()
      tr._transformHistoryFor( 'x', 20 )
      expect(tr._transformHistoryRecord)
        .toHaveBeenCalledWith 0, 'x', 20
      expect(tr._transformHistoryRecord)
        .toHaveBeenCalledWith 1, 'x', 20
      expect(tr._transformHistoryRecord)
        .toHaveBeenCalledWith 2, 'x', 20

    it 'should stop looping if _transformHistoryRecord returns null', ->
      tr = new Runable()
        .then radius: 0
        .then radius: 50

      r = 0
      tr._transformHistoryRecord =  -> if r++ is 1 then null else 20
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
      spyOn(tr.tween, '_setProp').and.callThrough()
      tr._resetTween( tr.tween, props )
      expect(props.shiftTime).toBe 0
      expect(tr.tween._setProp).toHaveBeenCalledWith props

    it 'should pass shift time', ->
      tr = new Runable
      props = { fill: 'hotpink', duration: 2000 }
      tr._props = props
      spyOn(tr.tween, '_setProp').and.callThrough()
      shiftTime = 500
      tr._resetTween( tr.tween, props, shiftTime )
      expect(props.shiftTime).toBe shiftTime
      expect(tr.tween._setProp).toHaveBeenCalledWith props

  describe '_resetTweens method ->', ->
    it 'should reset options on all tweens', ->
      tr = new Runable()
        .then({ fill: 'cyan' })
        .then({ fill: 'yellow' })
      spyOn tr.timeline._timelines[0], '_setProp'
      spyOn tr.timeline._timelines[1], '_setProp'
      spyOn tr.timeline._timelines[2], '_setProp'
      tr._resetTweens()
      expect(tr.timeline._timelines[0]._setProp)
        .toHaveBeenCalledWith tr._history[0]
      expect(tr.timeline._timelines[1]._setProp)
        .toHaveBeenCalledWith tr._history[1]
      expect(tr.timeline._timelines[2]._setProp)
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

  describe 'change method ->', ->
    it 'should extend defaults with passed object', ->
      byte = new Runable(strokeWidth: {10: 5})
      spyOn byte, '_tuneNewOptions'
      o = { strokeWidth: 20 }
      byte.change(o)
      expect(byte._tuneNewOptions).toHaveBeenCalledWith o
    it 'should not transform history if object was not passed', ->
      byte = new Runable(strokeWidth: {10: 5})
      spyOn byte, '_transformHistory'
      byte.change()
      expect(byte._transformHistory).not.toHaveBeenCalled()
    it 'should not override deltas', ->
      byte = new Runable()
      byte._deltas['strokeWidth'] = {10: 5}
      byte.change stroke: 'green'
      expect(byte._deltas.strokeWidth).toBeDefined()
    it 'should rewrite history', ->
      byte = new Runable()
      byte._o = { fill: 'cyan', strokeWidth: 5 }
      byte._defaults = { opacity: 1 }
      byte.change fill: 'yellow'
      expect(byte._history[0].fill).toBe 'yellow'
      expect(byte._history[0].strokeWidth).toBe 5
      expect(byte._history[0].opacity).toBe 1
    it 'should accept new options', ->
      byte = new Runable(strokeWidth: {10: 5})
      byte.change strokeWidth: 25
      expect(byte._props.strokeWidth).toBe 25
      expect(byte._deltas.strokeWidth).not.toBeDefined()
    it 'should not modify old options', ->
      byte = new Runable(strokeWidth: {10: 5}, radius: 33)
      byte._props.radius = 33
      byte.change strokeWidth: 25
      expect(byte._props.radius).toBe 33
    # TODO: check the tween props
    it 'should call _recalcTotalDuration on timeline', ->
      byte = new Runable
      spyOn byte.timeline, '_recalcTotalDuration'
      byte.change duration: 2000
      expect(byte.timeline._recalcTotalDuration).toHaveBeenCalled()
    it 'should call _transformHistory', ->
      byte = new Runable
      spyOn byte, '_transformHistory'
      o = duration: 2000
      byte.change o
      expect(byte._transformHistory).toHaveBeenCalledWith o
    it 'should not call _transformHistory if optionless', ->
      byte = new Runable
      spyOn byte, '_transformHistory'
      byte.change()
      expect(byte._transformHistory).not.toHaveBeenCalled()
    it 'shoud not warn if history is 1 record long', ->
      byte = new Runable(duration:  2000)
      spyOn h, 'warn'
      byte.change
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
      expect(-> byte.change()).not.toThrow()

  describe '_tuneSubModules method ->', ->
    it 'should call _tuneNewOptions on every sub module', ->
      rn = new Runable({ radius: 20 })
        .then({ radius: 40 })
        .then({ radius: 70 })
      spyOn rn._modules[0], '_tuneNewOptions'
      spyOn rn._modules[1], '_tuneNewOptions'
      spyOn rn._modules[2], '_tuneNewOptions'

      rn._tuneSubModules()

      expect(rn._modules[0]._tuneNewOptions).not.toHaveBeenCalled()
      expect(rn._modules[1]._tuneNewOptions).toHaveBeenCalled()
      expect(rn._modules[2]._tuneNewOptions).toHaveBeenCalled()

