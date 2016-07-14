h         = mojs.h
Tunable   = mojs.Tunable
Thenable  = mojs.Thenable

oldFun = Tunable::_declareDefaults
describe 'Tunable ->', ->
  it 'set the _defaults up', ->
    defaults = {
        stroke:           'transparent',
        strokeOpacity:    1,
        strokeLinecap:    '',
        strokeWidth:      2,
        strokeDasharray:  0,
        strokeDashoffset: 0,
        fill:             'deeppink',
        fillOpacity:      1,
        left:             0,
        top:              0,
        x:                0,
        y:                0,
        rx:               0,
        ry:               0,
        angle:            0,
        scale:            1,
        opacity:          1,
        points:           3,
        radius:           { 0: 50 },
        radiusX:          null,
        radiusY:          null,
        isShowStart:      false,
        isShowEnd:        false,
        size:             null,
        sizeGap:          0,
        callbacksContext: null
      }

    Tunable::_declareDefaults = -> this._defaults = defaults

  describe 'extention ->', ->
    it 'should extend Thenable', ->
      rn = new Tunable
      expect(rn instanceof Thenable).toBe true
  describe '_vars method ->', ->

  describe '_transformHistoryRecord method ->', ->
    # x : { 0 : 50 }  -> { 50: 0 }  -> { 0 : 50 }
    # x : { 20 } -> { 20: 0 } -> { 0 : 50 }
    it 'should add property to the record', ->
      tr = new Tunable()
        .then radius: 0
        .then radius: 50

      result = tr._transformHistoryRecord 0, 'x', 20

      expect(tr._history[0].x).toBe 20
      expect(result).toBe 20

    it 'should return null if next is different delta and index is 0', ->
      # radius: { 0: 50 } -> { 50: 0 } -> { 0: 50 }
      # radius: ^{ 20 } -> { 20 : 0 } x-> { 0: 50 }
      tr = new Tunable({ radius: { 0: 50 } })
        .then radius: { 100: 0 }
        .then radius: 50

      result = tr._transformHistoryRecord 0, 'radius', 20
      expect(tr._history[0].radius).toBe 20
      expect(result).toBe null

    it 'should return null if old value is delta but index isnt 0', ->
      # radius: { 0: 50 } -> { 50: 0 } -> { 0: 50 }
      # radius: { 20 } -> ^{ 20 : 0 } x-> { 0: 50 }
      tr = new Tunable({ radius: { 0: 50 } })
        .then radius: 0
        .then radius: 50

      result = tr._transformHistoryRecord 1, 'radius', 20
      expect(tr._history[1].radius[20]).toBe 0
      expect(result).toBe null

    it 'should rewrite everything until first delta # 0 index', ->
      # radius: { 75 } -> { 75: 0 } -> { 0: 50 }
      # radius: { 20 } -> { 20 : 0 } x-> { 0: 50 }
      tr = new Tunable({ radius: 75 })
        .then radius: 0
        .then radius: 50

      result = tr._transformHistoryRecord 0, 'radius', 20
      expect(tr._history[0].radius).toBe 20
      expect(result).toBe 20

      result = tr._transformHistoryRecord 1, 'radius', 20
      expect(tr._history[1].radius[20]).toBe 0
      expect(result).toBe null

    it 'should rewrite everything until first delta # non 0 index', ->
      # y: { 0 } -> { 0 } -> { 0: -200 }
      # radius: { 0 } -> ^{ 20 } x-> { 20: -200 }
      tr = new Tunable({ radius: 75 })
        .then radius: 0
        .then y: -200

      result = tr._transformHistoryRecord 1, 'y', 20
      expect(tr._history[1].y).toBe 20
      expect(result).toBe 20

    it 'should rewrite everything until first defined item', ->
      # duration: { 2000 } -> { 2000 } -> { 5000 } -> { 5000 }
      # duration: { 1000 } -> { 1000 } -> { 5000 } -> { 5000 }
      tr = new Tunable({ duration: 2000, isIt: 1 })
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
      # radius: { 75 } -> { 75: 0 } -> { 0: 50 }
      # radius: { 20 : 100 } -> { 100 : 0 } -> { 0: 50 }
      tr = new Tunable({ radius: 75 })
        .then radius: 0
        .then radius: 50

      delta = { 20 : 100 }
      result = tr._transformHistoryRecord 0, 'radius', delta
      expect(tr._history[0].radius[20]).toBe 100
      expect(result).toBe 100

      result = tr._transformHistoryRecord 1, 'radius', 100
      expect(tr._history[1].radius[100]).toBe 0
      expect(result).toBe null

    it 'should save new delta value and not modify the next', ->
      # radius: { 75 } -> { 100: 0 } -> { 0: 50 }
      # radius: { 20 : 100 } -> { 100 : 0 } -> { 0: 50 }
      tr = new Tunable({ radius: 75 })
        .then radius: 100: 0
        .then radius: 50

      delta = { 20 : 100 }
      result = tr._transformHistoryRecord 0, 'radius', delta
      expect(tr._history[0].radius[20]).toBe 100
      expect(result).toBe null

    it 'should return newValue if old value is delta and index is 0', ->
      # duration: { 2000 } -> { 300 } -> { 500 }
      # duration: { 500 } -> { 300 } x-> { 500 }
      tr = new Tunable({ duration: 2000 })
        .then duration: 300
        .then duration: 500

      result = tr._transformHistoryRecord 0, 'duration', 500
      expect(tr._history[0].duration).toBe 500
      expect(result).toBe null

    it 'should always stop at 0 index if tween prop', ->
      tr = new Tunable({ duration: 2000 })
        .then radius: 20
        .then radius: 30

      result = tr._transformHistoryRecord 0, 'delay', 500
      expect(tr._history[0].delay).toBe 500
      expect(result).toBe null

    it 'should immediately return null if new value is null ', ->
      tr = new Tunable({ duration: 2000 })
        .then radius: 20
        .then radius: 30

      result = tr._transformHistoryRecord 0, 'delay', null
      expect(tr._history[0].delay).toBe undefined
      expect(result).toBe null

    it 'should receive current and next history records', ->
      tr = new Tunable({ duration: 2000 })
        .then radius: 20
        .then radius: 30

      curr = { fill: 'red' }
      next = { fill: 'green' }
      
      result = tr._transformHistoryRecord 1, 'fill', 'green', curr, next
      expect(curr).toEqual { fill: 'green' }
      expect(result).toBe null

  describe '_transformHistory method ->', ->
    it 'should call _transformHistoryFor for every new property ->', ->
      tr = new Tunable({}).then({ radius: 0 }).then({ radius: 50 })
      spyOn tr, '_transformHistoryFor'

      tr._transformHistory x: 20, y: 'stagger(225, 10)'
      expect(tr._transformHistoryFor)
        .toHaveBeenCalledWith 'x', '20px'
      expect(tr._transformHistoryFor)
        .toHaveBeenCalledWith 'y', '225px'
      expect(tr._transformHistoryFor.calls.count()).toBe 2

    # nope
    # it 'should not call _transformHistoryFor for childOptions ->', ->
    #   tr = new Tunable({}).then({ radius: 0 }).then({ radius: 50 })
    #   spyOn tr, '_transformHistoryFor'

    #   tr._transformHistory childOptions: {}
    #   expect(tr._transformHistoryFor)
    #     .not.toHaveBeenCalled()

    # nope
    # it 'should call skip childOptions ->', ->
    #   tr = new Tunable({}).then({ radius: 0 }).then({ radius: 50 })
    #   spyOn tr, '_transformHistoryFor'
    #   tr._transformHistory childOptions: {}
    #   expect(tr._transformHistoryFor)
    #     .not.toHaveBeenCalledWith 'childOptions', {}
    #   expect(tr._transformHistoryFor.calls.count()).toBe 0

  describe '_transformHistoryFor method ->', ->
    it 'should call _transformHistoryRecord for every history record', ->
      tr = new Tunable()
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
      tr = new Tunable()
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
      tr = new Tunable
      props = { fill: 'hotpink', duration: 2000 }
      tr._props = props
      spyOn(tr.tween, '_setProp').and.callThrough()
      tr._resetTween( tr.tween, props )
      expect(props.shiftTime).toBe 0
      expect(tr.tween._setProp).toHaveBeenCalledWith props

    it 'should pass shift time', ->
      tr = new Tunable
      props = { fill: 'hotpink', duration: 2000 }
      tr._props = props
      spyOn(tr.tween, '_setProp').and.callThrough()
      shiftTime = 500
      tr._resetTween( tr.tween, props, shiftTime )
      expect(props.shiftTime).toBe shiftTime
      expect(tr.tween._setProp).toHaveBeenCalledWith props

  describe '_resetTweens method ->', ->
    it 'should reset options on all tweens', ->
      tr = new Tunable()
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
      tr = new Tunable()
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

    it 'should set new props on timeline', ->
      tr = new Tunable()
        .then({ fill: 'cyan' })
        .then({ fill: 'yellow' })
      timeline = {}
      tr._props.timeline = timeline
      spyOn tr.timeline, '_setProp'
      tr._resetTweens()
      expect(tr.timeline._setProp)
        .toHaveBeenCalledWith timeline

    it 'should call _recalcTotalDuration on the timeline', ->
      tr = new Tunable()
        .then({ fill: 'cyan' })
        .then({ fill: 'yellow' })
      spyOn tr.timeline, '_recalcTotalDuration'
      tr._resetTweens()
      expect(tr.timeline._recalcTotalDuration)
        .toHaveBeenCalled()

    it 'should not throw if `isTimelineLess`', ->
      tr = new Tunable()
        .then({ fill: 'cyan' })
        .then({ fill: 'yellow' })

      tr.timeline = tr.tween
      fun = -> tr._resetTweens()
      expect(fun)
        .not.toThrow()

  describe 'tune method ->', ->
    it 'should extend defaults with passed object', ->
      byte = new Tunable(strokeWidth: {10: 5})
      spyOn byte, '_tuneNewOptions'
      o = { strokeWidth: 20 }
      byte.tune(o)
      expect(byte._tuneNewOptions).toHaveBeenCalledWith o
    it 'should not transform history if object was not passed', ->
      byte = new Tunable(strokeWidth: {10: 5})
      spyOn byte, '_transformHistory'
      byte.tune()
      expect(byte._transformHistory).not.toHaveBeenCalled()
    it 'should not override deltas', ->
      byte = new Tunable()
      byte._deltas['strokeWidth'] = {10: 5}
      byte.tune stroke: 'green'
      expect(byte._deltas.strokeWidth).toBeDefined()
    it 'should rewrite history', ->
      byte = new Tunable()
      byte._props = { fill: 'cyan', strokeWidth: 5, opacity: 1 }
      byte.tune fill: 'yellow'
      expect(byte._history[0].fill).toBe 'yellow'
      expect(byte._history[0].strokeWidth).toBe 5
      expect(byte._history[0].opacity).toBe 1
    it 'should accept new options', ->
      byte = new Tunable(strokeWidth: {10: 5})
      byte.tune strokeWidth: 25
      expect(byte._props.strokeWidth).toBe 25
      expect(byte._deltas.strokeWidth).not.toBeDefined()
    it 'should not modify old options', ->
      byte = new Tunable(strokeWidth: {10: 5}, radius: 33)
      byte._props.radius = 33
      byte.tune strokeWidth: 25
      expect(byte._props.radius).toBe 33

    it 'should restore array props', ->
      byte = new Tunable(strokeWidth: {10: 5}, radius: 33)
      byte._props.strokeDasharray = 'stagger(100, 20)'
      byte.tune strokeDasharray: 'stagger(150, 100)'
      expect(byte._history[0].strokeDasharray).toBe 150

    it 'should call _recalcTotalDuration on timeline', ->
      byte = new Tunable
      spyOn byte.timeline, '_recalcTotalDuration'
      byte.tune duration: 2000
      expect(byte.timeline._recalcTotalDuration).toHaveBeenCalled()
    it 'should call _transformHistory', ->
      byte = new Tunable
      spyOn byte, '_transformHistory'
      o = duration: 2000
      byte.tune o
      expect(byte._transformHistory).toHaveBeenCalledWith o
    it 'should not call _transformHistory if optionless', ->
      byte = new Tunable
      spyOn byte, '_transformHistory'
      byte.tune()
      expect(byte._transformHistory).not.toHaveBeenCalled()
    it 'shoud not warn if history is 1 record long', ->
      byte = new Tunable(duration:  2000)
      spyOn h, 'warn'
      byte.tune
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
      byte = new Tunable(duration:  2000)
        .then radius: 500
      expect(-> byte.tune()).not.toThrow()

  describe '_tuneSubModules method ->', ->
    it 'should call _tuneNewOptions on every sub module', ->
      rn = new Tunable({ radius: 20 })
        .then({ radius: 40 })
        .then({ radius: 70 })
      spyOn rn._modules[0], '_tuneNewOptions'
      spyOn rn._modules[1], '_tuneNewOptions'
      spyOn rn._modules[2], '_tuneNewOptions'

      rn._tuneSubModules()

      expect(rn._modules[0]._tuneNewOptions).not.toHaveBeenCalled()
      expect(rn._modules[1]._tuneNewOptions).toHaveBeenCalled()
      expect(rn._modules[2]._tuneNewOptions).toHaveBeenCalled()

  describe 'generate method ->', ->
    it 'should call tune with _o', ->
      rn = new Tunable({ radius: 20 })
      spyOn(rn, 'tune').and.callThrough()
      rn.generate()
      expect(rn.tune).toHaveBeenCalledWith rn._o
    it 'should return this', ->
      rn = new Tunable({ radius: 20 })
      expect(rn.generate()).toBe rn

  describe '_isRewriteNext ->', ->
    it 'should return true is the next record === the current one', ->
      tn = new Tunable({ radius: 20 })
      currentValue = 20
      nextValue    = 20
      expect(tn._isRewriteNext( currentValue, nextValue ))
        .toBe true

    it 'should return false is the next record !== the current one', ->
      tn = new Tunable({ radius: 20 })
      currentValue = 20
      nextValue    = 21
      expect(tn._isRewriteNext( currentValue, nextValue ))
        .toBe false

    it 'should return false if there is no newxt item', ->
      tn = new Tunable({ radius: 20 })
      currentValue = 20
      nextValue    = null
      expect(tn._isRewriteNext( currentValue, nextValue ))
        .toBe false

    it 'should true if next is ∆ and start value === current one', ->
      tn = new Tunable({ radius: 20 })
      currentValue = 20
      nextValue    = { 20: 100 }
      expect(tn._isRewriteNext( currentValue, nextValue ))
        .toBe true

    it 'should true if deltas', ->
      tn = new Tunable({ radius: 20 })
      currentValue = { 50: 20 }
      nextValue    = { 20: 100 }
      expect(tn._isRewriteNext( currentValue, nextValue ))
        .toBe true

    it 'should current and next are null', ->
      tn = new Tunable({ radius: 20 })
      currentValue = null
      nextValue    = null
      expect(tn._isRewriteNext( currentValue, nextValue ))
        .toBe true

  # describe '_preParseOptions ->', ->
  #   it 'should pre parse options in the object', ->
  #     tn = new Tunable({ radius: 20 })

  #     result = tn._preParseOptions({
  #       x: 20,
  #       left: '50%',
  #       radius: 50,
  #       strokeDasharray: '200 300'
  #     })
  #     expect(result.x).toBe '20px'
  #     expect(result.left).toBe '50%'
  #     expect(result.radius).toBe 50
  #     expect(result.strokeDasharray).toBe '200 300'

  #   it 'should pre parse delta values', ->
  #     tn = new Tunable({ radius: 20 })

  #     result = tn._preParseOptions({
  #       x: {20 : 0},
  #       left: '50%',
  #       radius: 50,
  #       strokeDasharray: {'stagger(100, 20)': 'stagger(200, 20)'}
  #     })
  #     expect(result.x['20px']).toBe '0'
  #     expect(result.left).toBe '50%'
  #     expect(result.radius).toBe 50
  #     expect(result.strokeDasharray[100]).toBe 200

  it 'clean the _defaults  up', ->
    Tunable::_declareDefaults = oldFun


