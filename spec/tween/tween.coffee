Tween    = window.mojs.Tween
Timeline = window.mojs.Timeline
Module   = window.mojs.Module
easing   = window.mojs.easing
h        = window.mojs.h
tweener  = window.mojs.tweener

describe 'Tween ->', ->
  describe 'extention ->', ->
    it 'should extend Module class', ->
      tw = new Tween
      expect( tw instanceof Module ).toBe true

  describe 'name ->', ->
    it 'should set self custom name', ->
      tweener['_Tweens'] = undefined;
      name = 'Light tween 1'
      t = new Tween name: name
      expect(t._props.name).toBe name
    it 'should make generic name if no one was specified', ->
      tweener['_Tweens'] = undefined;
      t = new Tween
      expect(t._props.name).toBe 'Tween 1'
      t = new Tween
      expect(t._props.name).toBe 'Tween 2'

  describe 'constructor ->', ->
    it 'should increment _name+s on tweener', ->
      tweener['_Tweens'] = undefined;
      t = new Tween
      expect(tweener['_Tweens']).toBe 1
      t = new Tween
      expect(tweener['_Tweens']).toBe 2
      t = new Tween
      expect(tweener['_Tweens']).toBe 3
  describe 'defaults ->', ->
    it 'should have vars', ->
      t = new Tween
      expect(t._props)        .toBeDefined()
      expect(t._negativeShift).toBe 0
      expect(t._progressTime) .toBe 0
      expect(t.progress)      .toBe 0
      expect(t._state)        .toBe 'stop'
    it 'should have defaults', ->
      t = new Tween
      expect(t._defaults.duration).toBe  350
      expect(t._defaults.delay).toBe     0
      expect(t._defaults.isYoyo).toBe      false
      expect(t._defaults.speed).toBe     1
      expect(t._defaults.easing).toBe    'Sin.Out'
      expect(t._defaults.backwardEasing).toBe null
      expect(t._defaults.name).toBe      null
      expect(t._defaults.nameBase).toBe  'Tween'
      expect(t._defaults.onRefresh).toBe null
      expect(t._defaults.onStart).toBeDefined()
      expect(t._defaults.onRepeatStart).toBeDefined()
      expect(t._defaults.onFirstUpdate).toBeDefined()
      expect(t._defaults.onRepeatComplete).toBeDefined()
      expect(t._defaults.onComplete).toBeDefined()
      expect(t._defaults.onUpdate).toBeDefined()
      expect(t._defaults.onProgress).toBeDefined()
      expect(t._defaults.onPlaybackStart).toBe null
      expect(t._defaults.onPlaybackPause).toBe null
      expect(t._defaults.onPlaybackStop) .toBe null
      expect(t._defaults.onPlaybackComplete).toBe null
      expect(t._defaults.isChained).toBe false
    it 'should extend defaults to props', ->
      t = new Tween duration: 1000
      expect(t._props.duration).toBe   1000
      expect(t._props.delay).toBe      0
  describe 'init ->', ->
    it 'should calc time, repeatTime', ->
      t = new Tween duration: 1000, delay: 100
      expect(t._props.time).toBe        1100
      expect(t._props.repeatTime).toBe  1100
    it 'should calc time, repeatTime #2', ->
      t = new Tween duration: 1000, delay: 100, repeat: 2
      expect(t._props.time).toBe        1100
      expect(t._props.repeatTime).toBe  3300

  describe 'isChained option ->', ->
    it 'should receive isChained option', ->
      t = new Tween
        duration: 1000, isChained: true
      expect(t._props.isChained).toBe  true
    it 'should fallback to default isChained option', ->
      t = new Tween duration: 1000
      expect(t._props.isChained).toBe false

  describe '_setStartTime method ->', ->
    it 'should calculate start time', ->
      t = new Tween(duration: 1000, delay: 500)._setStartTime()
      expectedTime = performance.now() + 500
      expect(t._props.startTime).toBeGreaterThan expectedTime - 50
      expect(t._props.startTime).not.toBeGreaterThan expectedTime
    it 'should receive the start time', ->
      t = new Tween(duration: 1000)._setStartTime 1
      expect(t._props.startTime).toBe 1
    it 'should calculate end time', ->
      duration = 1000; delay = 500
      t = new Tween(duration: duration, delay: delay)._setStartTime()
      endTime = t._props.startTime + t._props.repeatTime - t._props.delay
      expect(t._props.endTime).toBe endTime
    it 'should calculate end time with repeat', ->
      duration = 1000; delay = 500
      t = new Tween(duration: duration, delay: delay, repeat: 2)._setStartTime()
      endTime = t._props.startTime + t._props.repeatTime - t._props.delay
      expect(t._props.endTime).toBe endTime
    it 'should calculate end time if repeat', ->
      duration = 1000; delay = 500
      t = new Tween(duration: duration, delay: delay, repeat: 2)._setStartTime()
      time = t._props.startTime + (3*(duration+delay)) - delay
      expect(t._props.endTime).toBe time
    it 'should calculate startTime and endTime if shifted', ->
      duration = 1000; delay = 500
      t = new Tween(duration: duration, delay: delay, repeat: 2)
      t._setProp 'shiftTime', 500
      t._setStartTime()

      expectedTime = performance.now() + 500 + delay
      expect(t._props.startTime).toBeGreaterThan expectedTime - 50
      expect(t._props.startTime).not.toBeGreaterThan expectedTime

      endTime = t._props.startTime + (3*(duration+delay)) - delay
      expect(t._props.endTime).toBe endTime
    it 'should restart flags', ->
      t = new Tween(duration: 20, repeat: 2)._setStartTime()
      t._update t._props.startTime + 10
      t._update t._props.startTime + 60
      expect(t._isCompleted).toBe true
      expect(t._isStarted)  .toBe false
      expect(t._isRepeatCompleted).toBe true
      t._setStartTime()
      expect(t._isCompleted).toBe false
      expect(t._isRepeatCompleted).toBe false
      expect(t._isStarted)  .toBe false
    it 'should not restart _repeatComplete flag is second param is false', ->
      t = new Tween(duration: 20, repeat: 2)._setStartTime()
      t._update t._props.startTime + 10
      t._update t._props.startTime + 60
      expect(t._isRepeatCompleted).toBe true
      t._setStartTime(1, false)
      expect(t._isRepeatCompleted).toBe true
    it 'should set _playTime',->
      t = new Tween
      t._setStartTime()
      now = performance.now()
      expect( t._playTime ).toBeDefined()
      expect( Math.abs( t._playTime - now ) ).not.toBeGreaterThan 5
    it 'should the start time should be shifted',->
      t = new Tween
      shift = 2000
      t._props.shiftTime = shift
      t._setStartTime()
      now = performance.now()
      expect( t._playTime ).toBeDefined()
      expect( Math.abs( t._playTime - (now + shift) ) ).not.toBeGreaterThan 5
    it 'should set _playTime to passed time',->
      t = new Tween
      now = performance.now() + 50
      t._setStartTime(now)
      expect( t._playTime ).toBe now
    it 'should set _playTime to _resumeTime if present',->
      t = new Tween
      resumeTime = 3200
      t._resumeTime = resumeTime
      t._setStartTime()
      expect( t._playTime ).toBe resumeTime
    it 'should reset _resumeTime',->
      t = new Tween
      t._resumeTime = 3200
      t._setStartTime()
      expect( t._resumeTime ).toBe null
  
  describe '_update method ->', ->
    it 'should update progress', ->
      t = new Tween(duration: 1000, delay: 500)
      t._setStartTime()
      time = t._props.startTime + 199
      t._update time
      expect(t.progress).toBe 0
      time = t._props.startTime + 200
      t._update time
      expect(t.progress).toBeCloseTo .2, 5
    it 'should update progress with repeat', ->
      t = new Tween(duration: 1000, delay: 200, repeat: 2)
      t._setStartTime()
      t._update t._props.startTime + 1399
      expect(t.progress).toBeCloseTo 0
      t._update t._props.startTime + 1400
      expect(t.progress).toBeCloseTo .2
      t._update t._props.startTime + 2700
      expect(t.progress).toBeCloseTo .3
      t._update t._props.startTime + 3400
      expect(t.progress).toBe 1
    it 'should update progress to 1 if in delay gap and previous time value
        was smaller then the current one', ->
      t = new Tween(duration: 1000, delay: 200, repeat: 2)
      t._setStartTime()
      t._update t._props.startTime + 300
      t._update t._props.startTime + 500
      t._update t._props.startTime + 1100
      expect(t.progress).toBe 1
    it 'should update progress to 1 if in delay gap and previous time value
        was bigger then the current one', ->
      t = new Tween(duration: 1000, delay: 200, repeat: 2)
      t._setStartTime()
      t._update t._props.startTime + 1300
      t._update t._props.startTime + 1100
      expect(t.progress).toBe 0
    it 'should update progress to 1 on the end', ->
      t = new Tween(duration: 1000, delay: 200, repeat: 2)
      t._setStartTime()
      t._update t._props.startTime + 200
      expect(t.progress).toBeCloseTo 0
      t._update t._props.startTime + 500
      expect(t.progress).toBeCloseTo .5
      t._update t._props.startTime + 1000
      expect(t.progress).toBeCloseTo 1, 5
    it 'should return true on the end', ->
      t = new Tween(duration: 1000, delay: 200)
      t._setStartTime()
      t._update t._props.startTime + t._props.duration/2
      returnValue = t._update t._props.startTime + 1000
      expect(t.progress).toBeCloseTo 1, 5
      expect(t._isCompleted).toBe true
      expect(t._isRepeatCompleted).toBe true
      expect(returnValue).toBe true
    it 'should treat very close to `endTime`, `time` as `endTime`', ->
      t = new Tween(duration: 1000, delay: 200)
      t._setStartTime()
      t._update t._props.startTime
      spyOn(t, '_complete').and.callThrough()
      returnValue = t._update t._props.endTime - 0.000000001
      expect(t.progress).toBeCloseTo 1, 5
      expect(t._isCompleted).toBe true
      expect(t._isRepeatCompleted).toBe true
      expect(returnValue).toBe true
      # expect(t._complete).toHaveBeenCalledWidth( t._props.endTime );
    it 'should return true on the start', ->
      t = new Tween(duration: 1000, delay: 200, onUpdate:(p)-> )
      t._setStartTime()
      t._update t._props.startTime + t._props.duration/2
      returnValue = t._update t._props.startTime - 1000
      expect(t.progress).toBeCloseTo 0, 5
      expect(returnValue).toBe true
    it 'should not call update method if timeline isnt active "-"', ->
      t = new Tween(duration: 1000, onUpdate:->)
      t._setStartTime()
      spyOn t._props, 'onUpdate'
      t._update(t._props.startTime - 500)
      expect(t._props.onUpdate).not.toHaveBeenCalled()
    it 'should not call update method if timeline isnt active but was "-"', ->
      t = new Tween(duration: 1000, onUpdate:->)
      t._setStartTime()
      spyOn t._props, 'onUpdate'
      t._update(t._props.startTime + 500)
      t._update(t._props.startTime + 200)
      expect(t._isInActiveArea).toBe(true)

      t._update(t._props.startTime - 500)
      expect(t._isInActiveArea).toBe(false)
      expect(t._props.onUpdate).toHaveBeenCalledWith(0, 0, false, false)
      
      t._update(t._props.startTime - 500)
      expect(t._isInActiveArea).toBe(false)
      expect(t._props.onUpdate.calls.count()).toBe 2
    it 'should not call update method if timeline isnt active "+"', ->
      t = new Tween(duration: 1000, onUpdate:-> )
      spyOn t._props, 'onUpdate'
      t._setStartTime(); t._update(performance.now() + 1500)
      expect(t._props.onUpdate).not.toHaveBeenCalled()
    it 'should not call update method if timeline isnt active but was "+"', ->
      t = new Tween(duration: 1000, onUpdate:-> )
      spyOn t._props, 'onUpdate'
      t._setStartTime();
      t._update(t._props.startTime + 200)
      t._update(t._props.startTime + 500)
      expect(t._isInActiveArea).toBe(true)
      t._update(t._props.startTime + 1500)
      expect(t._isInActiveArea).toBe(false)
      expect(t._props.onUpdate).toHaveBeenCalledWith(1, 1, true, false)
    it 'should set Tween to the end if Tween ended', ->
      
      t = new Tween(duration: 1000, delay: 500)
      t._setStartTime()

      t._update t._props.startTime + 200
      t._update t._props.startTime + 1200
        
      expect(t.progress).not.toBe 1

    it 'should save progress time to _progressTime', ->
      delay = 500; duration = 1000
      t = new Tween(duration: duration, delay: delay)
      t._setStartTime()
      updateTime = 199
      time = t._props.startTime + updateTime
      t._update time - 1
      t._update time
      expect(t._progressTime).toBeCloseTo delay + updateTime, 5
    it 'should save progress start point time to _progressTime', ->
      delay = 500; duration = 1000
      t = new Tween(duration: duration, delay: delay)
      t._setStartTime()
      updateTime = 199
      time = t._props.startTime - 2*delay
      t._update time - 1
      t._update time
      expect(t._progressTime).toBe 0
    it 'should save progress 0 at the end time to _progressTime', ->
      delay = 500; duration = 1000
      t = new Tween(duration: duration, delay: delay, repeat: 2)
      t._setStartTime()
      updateTime = 199
      time = t._props.startTime + 4*(duration + delay)
      t._update time - 1
      t._update time
      expect(t._progressTime).toBeCloseTo t._props.repeatTime, 3
    it 'should update with reversed time if _props.isReversed', ->
      delay = 500; duration = 1000
      t = new Tween(duration: duration, delay: delay, repeat: 2)
      t._setStartTime()
      t._setProp 'isReversed', true
      shift = 200
      time = t._props.startTime + shift
      t._update time - 1
      t._update time
      expect(t._prevTime).toBeCloseTo (t._props.endTime - delay - shift), 3
    it 'should update save reversed time to _prevTime on when skipping frame', ->
      duration = 1000
      t = new Tween(duration: duration)
      t._setStartTime()
      t._setProp 'isReversed', true
      shift = 200
      time = t._props.startTime + shift
      t._update time
      expect(t._prevTime).toBeCloseTo (t._props.endTime - t._progressTime), 3
    it 'should skip frame with `undefined` too', ->
      duration = 1000
      t = new Tween(duration: duration)
      t._setStartTime()
      t._wasUknownUpdate = false
      t._prevTime = undefined
      
      shift = 200
      time = t._props.startTime + shift
      t._update time
      expect(t._wasUknownUpdate).toBe true
      # expect(t._prevTime).toBeCloseTo (t._props.endTime - t._progressTime), 3
    it 'should recalculate time for speed if defined', ->
      delay = 50; duration = 1000
      speed = 2
      t = new Tween(speed: speed, duration: duration, delay: delay, repeat: 2)
      t.play().pause()
      time = t._props.startTime + duration/4
      startPoint = (t._props.startTime - delay)
      t._update time - 1
      t._update time
      expect(t._prevTime).toBe startPoint + speed * ( time - startPoint )
    it 'should ignore speed if _playTime is not set', ->
      delay = 200; duration = 1000
      speed = 2
      t = new Tween(speed: speed, duration: duration, delay: delay, repeat: 2)
      t._setStartTime()
      time = t._props.startTime + duration/2
      t._playTime = null
      t._update time
      expect(t._prevTime).toBe time
    it 'should save _onEdge property', ->
      duration = 1000
      t = new Tween(duration: duration, repeat: 1 )
      t._setStartTime()
      t._update t._props.startTime
      t._update t._props.startTime + duration/2
      expect(t._onEdge).toBe 0
      t._update t._props.startTime + duration + 1
      expect(t._onEdge).toBe 1
      t._update t._props.startTime + duration + 2
      expect(t._onEdge).toBe 0
    it 'should save _onEdge property || reverse', ->
      duration = 1000
      t = new Tween(duration: duration, repeat: 1 )
      t._setStartTime()
      t._update t._props.endTime - 1
      t._update t._props.endTime - duration/2
      expect(t._onEdge).toBe 0
      t._update t._props.endTime - duration - 1
      expect(t._onEdge).toBe -1
      t._update t._props.endTime - duration - 2
      expect(t._onEdge).toBe 0
    it 'should receive _prevTime', ->
      t = new Tween(duration: 1000, delay: 200, repeat: 2, onStart:-> )
      t._setStartTime()
      prevTime = 1; time = 2
      spyOn( t, '_updateInActiveArea').and.callThrough()
      spyOn t._props, 'onStart'
      t._update (t._props.startTime + 1300), time, prevTime
      expect(t._updateInActiveArea).toHaveBeenCalled()
      expect(t._props.onStart).toHaveBeenCalledWith(true, false)
    it 'should receive _prevTime #2', ->
      t = new Tween(duration: 1000, delay: 200, repeat: 2, onStart:-> )
      t._setStartTime()
      t._prevTime = 2
      prevTime = 1; time = 2
      spyOn( t, '_updateInActiveArea').and.callThrough()
      spyOn t._props, 'onStart'
      t._update (t._props.startTime + 1300), time, prevTime
      expect(t._updateInActiveArea).toHaveBeenCalled()
      expect(t._props.onStart).toHaveBeenCalledWith(true, false)

    it 'should recalc received _prevTime if speed is present', ->
      tm = new Timeline
      t = new Tween(
        duration: 1000,
        speed:    .5,
        onStart:->
        onComplete:->
      )
      tm.add t

      # spyOn( t, '_updateInActiveArea').and.callThrough()
      spyOn t._props, 'onStart'
      spyOn t._props, 'onComplete'

      tm._setStartTime()
      tm._update tm._props.startTime
      tm._update tm._props.startTime + 10

      # expect(t._updateInActiveArea).toHaveBeenCalled()
      expect(t._props.onStart).toHaveBeenCalledWith(true, false)
      expect(t._props.onComplete).not.toHaveBeenCalled()

    it 'should update all children timelines if onEdge', ->
      t = new Timeline
      t.add new Tween, new Tween
      spyOn t._timelines[0], '_update'
      spyOn t._timelines[1], '_update'
      t._update 20, 10, false, 1
      expect( t._timelines[0]._update ).toHaveBeenCalledWith 20, 10, false, 1
      expect( t._timelines[1]._update ).toHaveBeenCalledWith 20, 10, false, 1

    it 'should call callbacks if on edge "+1" + was yoyo', ->
      tm = new mojs.Timeline repeat: 2, isYoyo: true
      duration = 1000
      t = new Tween
        duration: duration
        onStart:->
        onRepeatStart:->
        onUpdate:->
        onProgress:->
        onRepeatComplete:->
        onComplete:->
        onFirstUpdate:->

      tm.add t

      tm.setProgress 0
      tm.setProgress .25
      
      tm.setProgress .35
      tm.setProgress .55
      
      spyOn t._props, 'onStart'
      spyOn t._props, 'onRepeatStart'

      tm.setProgress .85

      expect(t._props.onStart).toHaveBeenCalledWith false, false
      expect(t._props.onRepeatStart).toHaveBeenCalledWith false, false

    it 'should call callbacks if on edge "+1" + wasnt yoyo', ->
      tm = new mojs.Timeline repeat: 2#, isYoyo: true
      duration = 1000
      t = new Tween
        duration: duration
        onStart:->
        onRepeatStart:->
        onUpdate:->
        onProgress:->
        onRepeatComplete:->
        onComplete:->
        onFirstUpdate:->

      tm.add t

      tm.setProgress 0
      tm.setProgress .25
      
      tm.setProgress .35
      tm.setProgress .55

      spyOn t._props, 'onRepeatComplete'
      spyOn t._props, 'onComplete'

      tm.setProgress .85

      expect(t._props.onRepeatComplete).toHaveBeenCalledWith true, false
      expect(t._props.onComplete).toHaveBeenCalledWith true, false
    
    it 'should call callbacks if on edge "-1" + was yoyo', ->
      tm = new mojs.Timeline repeat: 1, isYoyo: true
      duration = 1000
      t = new Tween
        duration: duration
        onStart:->
        onRepeatStart:->
        onUpdate:->
        onProgress:->
        onRepeatComplete:->
        onComplete:->
        onFirstUpdate:->

      tm.add t

      tm.setProgress 0
      tm.setProgress .25
      
      tm.setProgress .35
      tm.setProgress .55
      tm.setProgress .56
      tm.setProgress .54
      
      spyOn t._props, 'onRepeatComplete'
      spyOn t._props, 'onComplete'

      tm.setProgress .25

      expect(t._props.onRepeatComplete).toHaveBeenCalledWith true, false
      expect(t._props.onComplete).toHaveBeenCalledWith true, false

    it 'should call callbacks if on edge "-1" + wasnt yoyo', ->
      tm = new mojs.Timeline repeat: 1#, isYoyo: true
      duration = 1000
      t = new Tween
        duration: duration
        onStart:->
        onRepeatStart:->
        onUpdate:->
        onProgress:->
        onRepeatComplete:->
        onComplete:->
        onFirstUpdate:->

      tm.add t

      tm.setProgress 1
      tm.setProgress .85
      
      spyOn t._props, 'onRepeatStart'
      spyOn t._props, 'onStart'
      
      tm.setProgress .45

      expect(t._props.onRepeatStart).toHaveBeenCalledWith false, false
      expect(t._props.onStart).toHaveBeenCalledWith false, false

    it "should call callbacks if on edge '-1' + wasnt yoyo
        but only if prevTime was active", ->
      tm = new mojs.Timeline repeat: 1#, isYoyo: true
      t1 = new Tween
        onStart:->
        onRepeatStart:->
        onUpdate:->
        onProgress:->
        onRepeatComplete:->
        onComplete:->
        onFirstUpdate:->
      t2 = new Tween
        onStart:->
        onRepeatStart:->
        onUpdate:->
        onProgress:->
        onRepeatComplete:->
        onComplete:->
        onFirstUpdate:->

      tm.append t1, t2

      tm.setProgress 0
      tm.setProgress .1
      tm.setProgress .2
      tm.setProgress .3
      tm.setProgress .4
      tm.setProgress .6
      tm.setProgress .65
      tm.setProgress .55
      
      spyOn(t1._props, 'onComplete').and.callThrough()
      spyOn(t1._props, 'onRepeatStart').and.callThrough()
      spyOn(t1._props, 'onStart').and.callThrough()
      spyOn(t2._props, 'onRepeatStart').and.callThrough()
      spyOn(t2._props, 'onStart').and.callThrough()

      tm.setProgress .45
      tm.setProgress .3
      
      expect(t1._props.onStart).toHaveBeenCalledWith false, false
      expect(t1._props.onRepeatStart).toHaveBeenCalledWith false, false
      
      expect(t2._props.onStart).not.toHaveBeenCalledWith false, false
      expect(t2._props.onRepeatStart).not.toHaveBeenCalledWith false, false

      expect(t1._props.onComplete).not.toHaveBeenCalledWith false, false
      expect(t1._isCompleted).toBe true

  
  it 'should call callbacks if on edge "-1" + was yoyo', ->
      tm = new mojs.Timeline repeat: 1, isYoyo: true
      duration = 1000
      t = new Tween
        isYoyo: true
        duration: duration
        onStart:->
        onRepeatStart:->
        onUpdate:->
        onProgress:->
        onRepeatComplete:->
        onComplete:->
        onFirstUpdate:->

      tm.add t

      tm.setProgress 1
      tm.setProgress .85
      
      spyOn t._props, 'onRepeatComplete'
      spyOn t._props, 'onComplete'
      
      tm.setProgress .45

      expect(t._props.onRepeatComplete).toHaveBeenCalledWith true, false
      expect(t._props.onComplete).toHaveBeenCalledWith true, false

  it 'should call callbacks if on edge "+1" + wasn\'t yoyo', ->
      tm = new mojs.Timeline repeat: 2, isYoyo: true
      duration = 1000
      t = new Tween
        repeat: 2
        isYoyo: true
        speed: .5
        duration: duration
        delay: duration/2
        onStart:->
        onRepeatStart:->
        onUpdate:->
        onProgress:->
        onRepeatComplete:->
        onComplete:->
        onFirstUpdate:->

      tm.add t

      tm.setProgress .05
      tm.setProgress .1
      
      tm.setProgress .15
      tm.setProgress .2
      tm.setProgress .25
      tm.setProgress .3
      spyOn t._props, 'onRepeatComplete'
      spyOn t._props, 'onComplete'
      tm.setProgress .35

      expect(t._props.onRepeatComplete).toHaveBeenCalledWith true, false
      expect(t._props.onComplete).toHaveBeenCalledWith true, false

  it 'should call callbacks if on edge "+1" + wasn\'t yoyo', ->
      tm = new mojs.Timeline repeat: 2, isYoyo: true
      duration = 1000
      t = new Tween
        repeat: 2
        isYoyo: true
        speed: 2
        duration: duration
        delay: duration/2
        onStart:->
        onRepeatStart:->
        onUpdate:->
        onProgress:->
        onRepeatComplete:->
        onComplete:->
        onFirstUpdate:->

      tm.add t

      tm.setProgress .05
      tm.setProgress .1
      
      tm.setProgress .15
      tm.setProgress .2
      tm.setProgress .25
      tm.setProgress .3
      spyOn t._props, 'onRepeatComplete'
      spyOn t._props, 'onComplete'
      tm.setProgress .35

      expect(t._props.onRepeatComplete).toHaveBeenCalledWith true, false
      expect(t._props.onComplete).toHaveBeenCalledWith true, false

  describe 'onUpdate callback ->', ->
    it 'should be defined', ->
      t = new Tween onUpdate: ->
      expect(t._props.onUpdate).toBeDefined()
    it 'should call onUpdate callback with the current progress', ->
      t = new Tween duration: 1000, easing: 'bounce.out', onUpdate: ->
      spyOn t._props, 'onUpdate'
      t._setStartTime()
      t._update t._props.startTime + 499
      t._update t._props.startTime + 500
      expect(t._props.onUpdate).toHaveBeenCalledWith t.easedProgress, t.progress, true, false
    it 'should have the right scope', ->
      isRightScope = false
      t = new Tween onUpdate:-> isRightScope = @ instanceof Tween
      t._setStartTime()
      t._update t._props.startTime + 199
      t._update t._props.startTime + 200
      expect(isRightScope).toBe true
    it 'should not be called on delay', ->
      t = new Tween delay: 200, repeat: 2, onUpdate:->
      spyOn(t._props, 'onUpdate').and.callThrough()
      t._setStartTime()
      t._update t._props.startTime + t._props.duration + 50
      t._update t._props.startTime + t._props.duration + 100
      t._update t._props.startTime + t._props.duration + 150
      expect(t._props.onUpdate.calls.count()).toBe 0
    it 'should be called just once on delay', ->
      t = new Tween delay: 200, repeat: 2, onUpdate:->
      t._setStartTime()
      t._update t._props.startTime + 50
      t._update t._props.startTime + t._props.duration/2
      spyOn(t._props, 'onUpdate').and.callThrough()
      t._update t._props.startTime + t._props.duration + 50
      t._update t._props.startTime + t._props.duration + 100
      t._update t._props.startTime + t._props.duration + 150
      expect(t._props.onUpdate.calls.count()).toBe 1
    it 'should pass eased progress and raw progress', ->
      easedProgress = null
      progress      = null
      t = new Tween
        easing: 'cubic.out'
        onUpdate:(ep, p)->
          easedProgress = ep
          progress = p

      t.setProgress 0
      t.setProgress .5
      expect(easedProgress).toBe mojs.easing.cubic.out progress

    it 'should run with right context', ->
      isRightContext = null
      t = new Tween onUpdate: -> isRightContext = @ is t

      t.setProgress 0
      t.setProgress .1
      expect(isRightContext).toBe true

    it 'should run with custom context', ->
      isRightContext = null; contextObj = {}
      t = new Tween
        callbacksContext: contextObj,
        onUpdate: -> isRightContext = @ is contextObj

      t.setProgress 0
      t.setProgress .1
      expect(isRightContext).toBe true

    it 'should not fire when completed and return to "-" inactive area', ->
      isRightContext = null; contextObj = {}
      t = new Tween onUpdate: ->

      t._setStartTime()


      t._update t._props.startTime
      t._update t._props.startTime + t._props.duration/2
      t._update t._props.startTime + t._props.duration
      spyOn t, '_setProgress'

      t._update t._props.startTime - 10

      expect( t._setProgress ).not.toHaveBeenCalled()

    ###
      TWEEN IN NORMAL DIRECTION
    ###

    it 'should be called with 1 and 0 on each repeat period', ()->
      zeroCnt = 0;    oneCnt = 0
      startCnt = 0;   completeCnt = 0
      repeatCnt = 0;  repeatStartCnt = 0
      firstUpdateCnt = 0; firstUpdateDirection = null
      startDirection = null; completeDirection = null
      repeatStartDirection = null; repeatCompleteDirection = null
      duration = 50; updateValue = null; updateDirection = null
      t = new Tween
        repeat:     1
        duration:   duration
        easing:     'Linear.None'
        onUpdate:(p, ep, isForward)->
          updateDirection = isForward
          updateValue = p
          (p is 0) and zeroCnt++
          (p is 1) and oneCnt++
        onRepeatComplete:(isForward)->
          repeatCompleteDirection = isForward
          repeatCnt++
        onRepeatStart:(isForward)->
          repeatStartDirection = isForward
          repeatStartCnt++
        onStart:(isForward)->
          startDirection = isForward
          startCnt++
        onComplete:(isForward)->
          completeDirection = isForward
          completeCnt++
        onFirstUpdate:(isForward)->
          firstUpdateDirection = isForward
          firstUpdateCnt++
      
      t._setStartTime()
      
      timeShift = 0
      t._update t._props.startTime + timeShift
      expect(updateValue).toBe(null)
      expect(updateDirection).toBe(null)

      expect(t._wasUknownUpdate).toBe(true)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(0)
      
      expect(repeatStartCnt).toBe(0)
      expect(repeatStartDirection).toBe(null)

      expect(repeatCnt).toBe(0)
      expect(repeatCompleteDirection).toBe(null)
      
      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)
      
      expect(firstUpdateCnt).toBe(0)
      expect(firstUpdateDirection).toBe(null)


      t._update t._props.startTime + timeShift + (duration/2)
      expect(updateValue).toBeCloseTo(.5, 5)
      expect(updateDirection).toBe(true)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(0)
      
      expect(repeatStartCnt).toBe(1)
      expect(repeatStartDirection).toBe(true)

      expect(repeatCnt).toBe(0)
      expect(repeatCompleteDirection).toBe(null)
      
      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)


      t._update t._props.startTime + timeShift + (duration)
      expect(updateValue).toBeCloseTo(0, 5)
      expect(updateDirection).toBe(true)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(1)
      
      expect(repeatStartCnt).toBe(2)
      expect(repeatStartDirection).toBe(true)

      expect(repeatCnt).toBe(1)
      expect(repeatCompleteDirection).toBe(true)
      
      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)


      timeShift = duration
      t._update t._props.startTime + timeShift + (duration/2)
      expect(updateValue).toBeCloseTo(.5, 5)
      expect(updateDirection).toBe(true)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(1)
      
      expect(repeatStartCnt).toBe(2)
      expect(repeatStartDirection).toBe(true)

      expect(repeatCnt).toBe(1)
      expect(repeatCompleteDirection).toBe(true)
      
      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)

      # end
      t._update t._props.startTime + timeShift + (duration)
      expect(updateValue).toBeCloseTo(1, 5)
      expect(updateDirection).toBe(true)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(1)
      expect(zeroCnt).toBe(1)
      
      expect(repeatStartCnt).toBe(2)
      expect(repeatStartDirection).toBe(true)

      expect(repeatCnt).toBe(2)
      expect(repeatCompleteDirection).toBe(true)
      
      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(true)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)

    it 'should be called with 1 and 0 on each repeat period if missed time', ()->
      zeroCnt = 0; oneCnt = 0
      startCnt = 0; completeCnt = 0
      repeatCnt = 0; repeatStartCnt = 0
      firstUpdateCnt = 0; firstUpdateDirection = null
      startDirection = null; completeDirection = null
      repeatStartDirection = null; repeatCompleteDirection = null
      duration = 50; updateValue = null; updateDirection = null
      t = new Tween
        repeat:     1
        duration:   duration
        easing:     'Linear.None'
        onUpdate:(p, ep, isForward)->
          updateDirection = isForward
          updateValue = p
          (p is 0) and zeroCnt++
          (p is 1) and oneCnt++
        onRepeatComplete:(isForward)->
          repeatCompleteDirection = isForward
          repeatCnt++
        onRepeatStart:(isForward)->
          repeatStartDirection = isForward
          repeatStartCnt++
        onStart:(isForward)->
          startDirection = isForward
          startCnt++
        onComplete:(isForward)->
          completeDirection = isForward
          completeCnt++
        onFirstUpdate:(isForward)->
          firstUpdateDirection = isForward
          firstUpdateCnt++

      t._setStartTime()

      gap = 5
      timeShift = 0
      t._update t._props.startTime + timeShift + gap
      
      expect(updateValue).toBe(null)
      expect(updateDirection).toBe(null)

      expect(t._wasUknownUpdate).toBe(true)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(0)
      
      expect(repeatStartCnt).toBe(0)
      expect(repeatStartDirection).toBe(null)

      expect(repeatCnt).toBe(0)
      expect(repeatCompleteDirection).toBe(null)
      
      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)

      expect(firstUpdateCnt).toBe(0)
      expect(firstUpdateDirection).toBe(null)


      t._update t._props.startTime + timeShift + (duration/2)
      expect(updateValue).toBeCloseTo(.5, 5)
      expect(updateDirection).toBe(true)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(0)

      expect(repeatStartCnt).toBe(1)
      expect(repeatStartDirection).toBe(true)

      expect(repeatCnt).toBe(0)
      expect(repeatCompleteDirection).toBe(null)
      
      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)


      t._update t._props.startTime + timeShift + (duration) - gap
      expect(updateValue).toBeCloseTo(.9, 5)
      expect(updateDirection).toBe(true)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(0)
      
      expect(repeatStartCnt).toBe(1)
      expect(repeatStartDirection).toBe(true)

      expect(repeatCnt).toBe(0)
      expect(repeatCompleteDirection).toBe(null)
      
      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)


      timeShift = duration
      t._update t._props.startTime + timeShift + gap
      expect(updateValue).toBeCloseTo(.1, 5)
      expect(updateDirection).toBe(true)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(0)
      
      expect(repeatStartCnt).toBe(2)
      expect(repeatStartDirection).toBe(true)

      expect(repeatCnt).toBe(1)
      expect(repeatCompleteDirection).toBe(true)
      
      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)


      t._update t._props.startTime + timeShift + (duration/2)
      expect(updateValue).toBeCloseTo(.5, 5)
      expect(updateDirection).toBe(true)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(0)
      
      expect(repeatStartCnt).toBe(2)
      expect(repeatStartDirection).toBe(true)

      expect(repeatCnt).toBe(1)
      expect(repeatCompleteDirection).toBe(true)
      
      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)
      
      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)


      timeShift = 2*duration
      t._update t._props.startTime + timeShift + gap
      expect(updateValue).toBeCloseTo(1)
      expect(updateDirection).toBe(true)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(1)
      expect(zeroCnt).toBe(0)

      expect(repeatStartCnt).toBe(2)
      expect(repeatStartDirection).toBe(true)

      expect(repeatCnt).toBe(2)
      expect(repeatCompleteDirection).toBe(true)
      
      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(true)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)

    it 'should be called with 1 and 0 on each repeat period if delay', ()->
      zeroCnt = 0; oneCnt = 0
      startCnt = 0; completeCnt = 0
      repeatCnt = 0; repeatStartCnt = 0
      firstUpdateCnt = 0; firstUpdateDirection = null
      startDirection = null; completeDirection = null
      repeatStartDirection = null; repeatCompleteDirection = null
      duration = 50; delay = 20; updateValue = null; updateDirection = null
      t = new Tween
        repeat:     2
        duration:   duration
        delay:      delay
        easing:     'Linear.None'
        onUpdate:(p, ep, isForward)->
          updateDirection = isForward
          updateValue = p
          (p is 0) and zeroCnt++
          (p is 1) and oneCnt++
        onRepeatComplete:(isForward)->
          repeatCompleteDirection = isForward
          repeatCnt++
        onRepeatStart:(isForward)->
          repeatStartDirection = isForward
          repeatStartCnt++
        onStart:(isForward)->
          startDirection = isForward
          startCnt++
        onComplete:(isForward)->
          completeDirection = isForward
          completeCnt++
        onFirstUpdate:(isForward)->
          firstUpdateDirection = isForward
          firstUpdateCnt++

      t._setStartTime()

      timeShift = 0
      t._update t._props.startTime + timeShift
      expect(updateValue).toBe(null)
      expect(updateDirection).toBe(null)

      expect(t._wasUknownUpdate).toBe(true)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(0)
      
      expect(repeatStartCnt).toBe(0)
      expect(repeatStartDirection).toBe(null)

      expect(repeatCnt).toBe(0)
      expect(repeatCompleteDirection).toBe(null)
      
      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)

      expect(firstUpdateCnt).toBe(0)
      expect(firstUpdateDirection).toBe(null)


      t._update t._props.startTime + timeShift + (duration/2)
      expect(updateValue).toBeCloseTo(.5, 5)
      expect(updateDirection).toBe(true)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(0)
      
      expect(repeatStartCnt).toBe(1)
      expect(repeatStartDirection).toBe(true)

      expect(repeatCnt).toBe(0)
      expect(repeatCompleteDirection).toBe(null)

      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)


      t._update t._props.startTime + timeShift + (duration)
      expect(updateValue).toBeCloseTo(1, 5)
      expect(updateDirection).toBe(true)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(1)
      expect(zeroCnt).toBe(0)
      
      expect(repeatStartCnt).toBe(1)
      expect(repeatStartDirection).toBe(true)

      expect(repeatCnt).toBe(1)
      expect(repeatCompleteDirection).toBe(true)
      
      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)


      timeShift = duration + delay
      t._update t._props.startTime + timeShift
      expect(updateValue).toBeCloseTo(0, 5)
      expect(updateDirection).toBe(true)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(1)
      expect(zeroCnt).toBe(1)

      expect(repeatStartCnt).toBe(2)
      expect(repeatStartDirection).toBe(true)

      expect(repeatCnt).toBe(1)
      expect(repeatCompleteDirection).toBe(true)
      
      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)


      t._update t._props.startTime + timeShift + (duration/2)
      expect(updateValue).toBeCloseTo(.5, 5)
      expect(updateDirection).toBe(true)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(1)
      expect(zeroCnt).toBe(1)

      expect(repeatStartCnt).toBe(2)
      expect(repeatStartDirection).toBe(true)

      expect(repeatCnt).toBe(1)
      expect(repeatCompleteDirection).toBe(true)
      
      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)
      
      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)


      t._update t._props.startTime + timeShift + (duration)
      expect(updateValue).toBeCloseTo(1, 5)
      expect(updateDirection).toBe(true)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(2)
      expect(zeroCnt).toBe(1)
      
      expect(repeatStartCnt).toBe(2)
      expect(repeatStartDirection).toBe(true)

      expect(repeatCnt).toBe(2)
      expect(repeatCompleteDirection).toBe(true)
      
      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)


      timeShift = 2*(duration + delay)
      t._update t._props.startTime + timeShift
      expect(updateValue).toBeCloseTo(0, 5)
      expect(updateDirection).toBe(true)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(2)
      expect(zeroCnt).toBe(2)

      expect(repeatStartCnt).toBe(3)
      expect(repeatStartDirection).toBe(true)

      expect(repeatCnt).toBe(2)
      expect(repeatCompleteDirection).toBe(true)
      
      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)
      
      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)


      t._update t._props.startTime + timeShift + (duration/2)
      expect(updateValue).toBeCloseTo(.5, 5)
      expect(updateDirection).toBe(true)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(2)
      expect(zeroCnt).toBe(2)

      expect(repeatStartCnt).toBe(3)
      expect(repeatStartDirection).toBe(true)

      expect(repeatCnt).toBe(2)
      expect(repeatCompleteDirection).toBe(true)

      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)

      # end
      t._update t._props.startTime + timeShift + (duration)
      expect(updateValue).toBeCloseTo(1, 5)
      expect(updateDirection).toBe(true)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(3)
      expect(zeroCnt).toBe(2)

      expect(repeatStartCnt).toBe(3)
      expect(repeatStartDirection).toBe(true)

      expect(repeatCnt).toBe(3)
      expect(repeatCompleteDirection).toBe(true)
      
      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(true)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)


      # repeat the end
      t._update t._props.startTime + timeShift + (duration) + delay/2
      expect(updateValue).toBeCloseTo(1, 5)
      expect(updateDirection).toBe(true)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(3)
      expect(zeroCnt).toBe(2)

      expect(repeatStartCnt).toBe(3)
      expect(repeatStartDirection).toBe(true)

      expect(repeatCnt).toBe(3)
      expect(repeatCompleteDirection).toBe(true)
      
      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)
      
      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(true)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)

    it 'should be called with 1 and 0 on each repeat period if in delay', ()->
      zeroCnt = 0; oneCnt = 0
      startCnt = 0; completeCnt = 0
      repeatCnt = 0; repeatStartCnt = 0
      firstUpdateCnt = 0; firstUpdateDirection = null
      startDirection = null; completeDirection = null
      repeatStartDirection = null; repeatCompleteDirection = null
      duration = 50; delay = 20; updateValue = null; updateDirection = null
      t = new Tween
        repeat:     2
        duration:   duration
        delay:      delay
        easing:     'Linear.None'
        onUpdate:(p, ep, isForward)->
          updateDirection = isForward
          updateValue = p
          (p is 0) and zeroCnt++
          (p is 1) and oneCnt++
        onRepeatComplete:(isForward)->
          repeatCompleteDirection = isForward
          repeatCnt++
        onRepeatStart:(isForward)->
          repeatStartDirection = isForward
          repeatStartCnt++
        onStart:(isForward)->
          startDirection = isForward
          startCnt++
        onComplete:(isForward)->
          completeDirection = isForward
          completeCnt++
        onFirstUpdate:(isForward)->
          firstUpdateDirection = isForward
          firstUpdateCnt++

      t._setStartTime()

      timeShift = 0
      t._update t._props.startTime + timeShift
      expect(updateValue).toBe(null)
      expect(updateDirection).toBe(null)

      expect(t._wasUknownUpdate).toBe(true)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(0)
      
      expect(repeatStartCnt).toBe(0)
      expect(repeatStartDirection).toBe(null)

      expect(repeatCnt).toBe(0)
      expect(repeatCompleteDirection).toBe(null)

      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)

      expect(firstUpdateCnt).toBe(0)
      expect(firstUpdateDirection).toBe(null)


      t._update t._props.startTime + timeShift + (duration/2)
      expect(updateValue).toBe(.5)
      expect(updateDirection).toBe(true)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(0)

      expect(repeatStartCnt).toBe(1)
      expect(repeatStartDirection).toBe(true)

      expect(repeatCnt).toBe(0)
      expect(repeatCompleteDirection).toBe(null)
      
      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)


      t._update t._props.startTime + timeShift + (duration) + delay/2
      expect(updateValue).toBeCloseTo(1, 5)
      expect(updateDirection).toBe(true)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(1)
      expect(zeroCnt).toBe(0)

      expect(repeatStartCnt).toBe(1)
      expect(repeatStartDirection).toBe(true)

      expect(repeatCnt).toBe(1)
      expect(repeatCompleteDirection).toBe(true)

      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)


      timeShift = duration + delay
      t._update t._props.startTime + timeShift + 10
      expect(updateValue).toBeCloseTo(.2, 5)
      expect(updateDirection).toBe(true)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(1)
      expect(zeroCnt).toBe(0)

      expect(repeatStartCnt).toBe(2)
      expect(repeatStartDirection).toBe(true)

      expect(repeatCnt).toBe(1)
      expect(repeatCompleteDirection).toBe(true)
      
      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)


      t._update t._props.startTime + timeShift + (duration/2)
      expect(updateValue).toBeCloseTo(.5, 5)
      expect(updateDirection).toBe(true)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(1)
      expect(zeroCnt).toBe(0)

      expect(repeatStartCnt).toBe(2)
      expect(repeatStartDirection).toBe(true)

      expect(repeatCnt).toBe(1)
      expect(repeatCompleteDirection).toBe(true)
      
      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)


      t._update t._props.startTime + timeShift + (duration) + delay/2
      expect(updateValue).toBeCloseTo(1, 5)
      expect(updateDirection).toBe(true)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(2)
      expect(zeroCnt).toBe(0)

      expect(repeatStartCnt).toBe(2)
      expect(repeatStartDirection).toBe(true)

      expect(repeatCnt).toBe(2)
      expect(repeatCompleteDirection).toBe(true)

      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)


      timeShift = 2*(duration + delay)
      t._update t._props.startTime + timeShift + 10
      expect(updateValue).toBeCloseTo(.2, 5)
      expect(updateDirection).toBe(true)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(2)
      expect(zeroCnt).toBe(0)

      expect(repeatStartCnt).toBe(3)
      expect(repeatStartDirection).toBe(true)

      expect(repeatCnt).toBe(2)
      expect(repeatCompleteDirection).toBe(true)

      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)


      t._update t._props.startTime + timeShift + (duration/2)
      expect(updateValue).toBeCloseTo(.5, 5)
      expect(updateDirection).toBe(true)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(2)
      expect(zeroCnt).toBe(0)

      expect(repeatStartCnt).toBe(3)
      expect(repeatStartDirection).toBe(true)

      expect(repeatCnt).toBe(2)
      expect(repeatCompleteDirection).toBe(true)
      
      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)

      # end
      t._update t._props.startTime + timeShift + (duration) + delay/2
      expect(updateValue).toBeCloseTo(1, 5)
      expect(updateDirection).toBe(true)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(3)
      expect(zeroCnt).toBe(0)

      expect(repeatStartCnt).toBe(3)
      expect(repeatStartDirection).toBe(true)

      expect(repeatCnt).toBe(3)
      expect(repeatCompleteDirection).toBe(true)
      
      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(true)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)


      t._update t._props.startTime + timeShift + (duration) + delay/2 + 10
      expect(updateValue).toBeCloseTo(1, 5)
      expect(updateDirection).toBe(true)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(3)
      expect(zeroCnt).toBe(0)

      expect(repeatStartCnt).toBe(3)
      expect(repeatStartDirection).toBe(true)

      expect(repeatCnt).toBe(3)
      expect(repeatCompleteDirection).toBe(true)
      
      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(true)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)

    # ###
    #   TWEEN IN REVERSE DIRECTION
    # ###

    it 'should be called with 0 and 1 on each repeat period || reverse', ()->
      zeroCnt = 0; oneCnt = 0
      startCnt = 0; completeCnt = 0
      repeatCnt = 0; repeatStartCnt = 0
      firstUpdateCnt = 0; firstUpdateDirection = null
      startDirection = null; completeDirection = null
      repeatStartDirection = null; repeatCompleteDirection = null
      duration = 50; updateValue = null; updateDirection = null
      t = new Tween
        repeat:         2
        duration:       duration
        easing:         'Linear.None'
        backwardEasing: 'Linear.None'
        onUpdate:(p, ep, isForward)->
          updateDirection = isForward
          updateValue = p
          (p is 0) and zeroCnt++
          (p is 1) and oneCnt++
        onRepeatComplete:(isForward)->
          repeatCompleteDirection = isForward
          repeatCnt++
        onRepeatStart:(isForward)->
          repeatStartDirection = isForward
          repeatStartCnt++
        onStart:(isForward)->
          startDirection = isForward
          startCnt++
        onComplete:(isForward)->
          completeDirection = isForward
          completeCnt++
        onFirstUpdate:(isForward)->
          firstUpdateDirection = isForward
          firstUpdateCnt++
      
      t._setStartTime()
      
      timeShift = 3*duration
      t._update t._props.startTime + timeShift
      expect(updateValue).toBe(null)
      expect(updateDirection).toBe(null)

      expect(t._wasUknownUpdate).toBe(true)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(0)

      expect(repeatStartCnt).toBe(0)
      expect(repeatStartDirection).toBe(null)

      expect(repeatCnt).toBe(0)
      expect(repeatCompleteDirection).toBe(null)
      
      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)

      expect(firstUpdateCnt).toBe(0)
      expect(firstUpdateDirection).toBe(null)


      t._update t._props.startTime + timeShift - duration/2
      expect(updateValue).toBeCloseTo(.5, 5)
      expect(updateDirection).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(t._isCompleted).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(0)

      expect(repeatStartCnt).toBe(0)
      expect(repeatStartDirection).toBe(null)

      expect(repeatCnt).toBe(1)
      expect(repeatCompleteDirection).toBe(false)
      
      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)


      timeShift = 2*duration
      t._update t._props.startTime + timeShift
      expect(updateValue).toBeCloseTo(0, 5)
      expect(updateDirection).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(1)

      expect(repeatStartCnt).toBe(1)
      expect(repeatStartDirection).toBe(false)

      expect(repeatCnt).toBe(1)
      expect(repeatCompleteDirection).toBe(false)
      
      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)


      t._update t._props.startTime + timeShift - duration/2
      expect(updateValue).toBeCloseTo(.5, 5)
      expect(updateDirection).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(1)

      expect(repeatStartCnt).toBe(1)
      expect(repeatStartDirection).toBe(false)

      expect(repeatCnt).toBe(2)
      expect(repeatCompleteDirection).toBe(false)
      
      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)


      timeShift = duration
      t._update t._props.startTime + timeShift
      expect(updateValue).toBeCloseTo(0, 5)
      expect(updateDirection).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(2)
      
      expect(repeatStartCnt).toBe(2)
      expect(repeatStartDirection).toBe(false)

      expect(repeatCnt).toBe(2)
      expect(repeatCompleteDirection).toBe(false)
      
      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)


      t._update t._props.startTime + timeShift - duration/2
      expect(updateValue).toBeCloseTo(.5, 5)
      expect(updateDirection).toBe(false)

      expect(updateDirection).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(2)

      expect(repeatStartCnt).toBe(2)
      expect(repeatStartDirection).toBe(false)

      expect(repeatCnt).toBe(3)
      expect(repeatCompleteDirection).toBe(false)
      
      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)

      timeShift = 0
      t._update t._props.startTime + timeShift
      expect(updateValue).toBeCloseTo(0, 5)
      expect(updateDirection).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(3)
      
      expect(repeatStartCnt).toBe(3)
      expect(repeatStartDirection).toBe(false)

      expect(repeatCnt).toBe(3)
      expect(repeatCompleteDirection).toBe(false)
      
      expect(startCnt).toBe(1)
      expect(startDirection).toBe(false)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)


      t._update t._props.startTime + timeShift - duration/2
      expect(updateValue).toBeCloseTo(0, 5)
      expect(updateDirection).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(3)
      
      expect(repeatStartCnt).toBe(3)
      expect(repeatStartDirection).toBe(false)

      expect(repeatCnt).toBe(3)
      expect(repeatCompleteDirection).toBe(false)

      expect(startCnt).toBe(1)
      expect(startDirection).toBe(false)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)

    it 'should be called with 0 and 1 on each repeat period if missed time || reverse', ()->
      zeroCnt = 0; oneCnt = 0
      startCnt = 0; completeCnt = 0
      repeatCnt = 0; repeatStartCnt = 0
      firstUpdateCnt = 0; firstUpdateDirection = null
      startDirection = null; completeDirection = null
      repeatStartDirection = null; repeatCompleteDirection = null
      duration = 50; updateValue = null; updateDirection = null
      t = new Tween
        repeat:     2
        duration:   duration
        easing:     'Linear.None'
        backwardEasing: 'Linear.None'
        onUpdate:(p, pe, isForward)->
          updateDirection = isForward
          updateValue = p
          (p is 0) and zeroCnt++
          (p is 1) and oneCnt++
        onRepeatComplete:(isForward)->
          repeatCompleteDirection = isForward
          repeatCnt++
        onRepeatStart:(isForward)->
          repeatStartDirection = isForward
          repeatStartCnt++
        onStart:(isForward)->
          startDirection = isForward
          startCnt++
        onComplete:(isForward)->
          completeDirection = isForward
          completeCnt++
        onFirstUpdate:(isForward)->
          firstUpdateDirection = isForward
          firstUpdateCnt++

      t._setStartTime()

      gap = 5
      timeShift = 3*duration
      t._update t._props.startTime + timeShift + gap
      expect(updateValue).toBe(null)
      expect(updateDirection).toBe(null)

      expect(t._wasUknownUpdate).toBe(true)
      expect(zeroCnt).toBe(0)
      expect(oneCnt).toBe(0)
      
      expect(repeatStartCnt).toBe(0)
      expect(repeatStartDirection).toBe(null)

      expect(repeatCnt).toBe(0)
      expect(repeatCompleteDirection).toBe(null)
      
      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)

      expect(firstUpdateCnt).toBe(0)
      expect(firstUpdateDirection).toBe(null)


      t._update t._props.startTime + timeShift - (duration/2)
      expect(updateValue).toBeCloseTo(.5, 5)
      expect(updateDirection).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(0)
      
      expect(repeatStartCnt).toBe(0)
      expect(repeatStartDirection).toBe(null)

      expect(repeatCnt).toBe(1)
      expect(repeatCompleteDirection).toBe(false)
      
      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)


      t._update t._props.startTime + timeShift - (duration) + gap
      expect(updateValue).toBeCloseTo(.1, 5)
      expect(updateDirection).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(0)

      expect(repeatStartCnt).toBe(0)
      expect(repeatStartDirection).toBe(null)

      expect(repeatCnt).toBe(1)
      expect(repeatCompleteDirection).toBe(false)
      
      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)


      timeShift = 2*duration
      t._update t._props.startTime + timeShift - gap
      expect(updateValue).toBeCloseTo(.9, 5)
      expect(updateDirection).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(0)

      expect(repeatStartCnt).toBe(1)
      expect(repeatStartDirection).toBe(false)

      expect(repeatCnt).toBe(2)
      expect(repeatCompleteDirection).toBe(false)
      
      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)


      t._update t._props.startTime + timeShift - (duration/2)
      expect(updateValue).toBeCloseTo(.5, 5)
      expect(updateDirection).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(0)
      
      expect(repeatStartCnt).toBe(1)
      expect(repeatStartDirection).toBe(false)

      expect(repeatCnt).toBe(2)
      expect(repeatCompleteDirection).toBe(false)
      
      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)


      t._update t._props.startTime + timeShift - (duration) + gap
      expect(updateValue).toBeCloseTo(.1, 5)
      expect(updateDirection).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(0)

      expect(repeatStartCnt).toBe(1)
      expect(repeatStartDirection).toBe(false)

      expect(repeatCnt).toBe(2)
      expect(repeatCompleteDirection).toBe(false)
      
      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)

      # END
      timeShift = duration
      t._update t._props.startTime + timeShift - (duration) - gap
      expect(updateValue).toBeCloseTo(0, 5)
      expect(updateDirection).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(1)

      expect(repeatStartCnt).toBe(2)
      expect(repeatStartDirection).toBe(false)

      expect(repeatCnt).toBe(2)
      expect(repeatCompleteDirection).toBe(false)
      
      expect(startCnt).toBe(1)
      expect(startDirection).toBe(false)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)

      # start again
      t._update t._props.startTime + timeShift - (duration/2)
      expect(updateValue).toBeCloseTo(.5, 5)
      expect(updateDirection).toBe(true)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(1)

      expect(repeatStartCnt).toBe(3)
      expect(repeatStartDirection).toBe(true)

      expect(repeatCnt).toBe(2)
      expect(repeatCompleteDirection).toBe(false)

      expect(startCnt).toBe(2)
      expect(startDirection).toBe(true)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)

      expect(firstUpdateCnt).toBe(2)
      expect(firstUpdateDirection).toBe(true)

      # return to "-" inactive area
      t._update t._props.startTime - gap
      expect(updateValue).toBeCloseTo(0, 5)
      expect(updateDirection).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(2)

      expect(repeatStartCnt).toBe(4)
      expect(repeatStartDirection).toBe(false)

      expect(repeatCnt).toBe(2)
      expect(repeatCompleteDirection).toBe(false)
      
      expect(startCnt).toBe(3)
      expect(startDirection).toBe(false)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)

      expect(firstUpdateCnt).toBe(2)
      expect(firstUpdateDirection).toBe(true)

      # repeat the previous step
      t._update t._props.startTime - gap - 15
      expect(updateValue).toBeCloseTo(0, 5)
      expect(updateDirection).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(2)

      expect(repeatStartCnt).toBe(4)
      expect(repeatStartDirection).toBe(false)

      expect(repeatCnt).toBe(2)
      expect(repeatCompleteDirection).toBe(false)
      
      expect(startCnt).toBe(3)
      expect(startDirection).toBe(false)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)

      expect(firstUpdateCnt).toBe(2)
      expect(firstUpdateDirection).toBe(true)

    it 'should be called with 0 and 1 on each repeat period if in delay || reverse', ()->
      zeroCnt = 0; oneCnt = 0
      startCnt = 0; completeCnt = 0
      repeatCnt = 0; repeatStartCnt = 0
      firstUpdateCnt = 0; firstUpdateDirection = null
      startDirection = null; completeDirection = null
      repeatStartDirection = null; repeatCompleteDirection = null
      duration = 50; delay = 20; updateValue = null; updateDirection = null
      t = new Tween
        repeat:     2
        duration:   duration
        delay:      delay
        easing:     'Linear.None'
        backwardEasing: 'Linear.None'
        onUpdate:(p, pe, isForward)->
          updateDirection = isForward
          updateValue = p
          (p is 0) and zeroCnt++
          (p is 1) and oneCnt++
        onRepeatComplete:(isForward)->
          repeatCompleteDirection = isForward
          repeatCnt++
        onRepeatStart:(isForward)->
          repeatStartDirection = isForward
          repeatStartCnt++
        onStart:(isForward)->
          startDirection = isForward
          startCnt++
        onComplete:(isForward)->
          completeDirection = isForward
          completeCnt++
        onFirstUpdate:(isForward)->
          firstUpdateDirection = isForward
          firstUpdateCnt++

      t._setStartTime()

      timeShift = 3*(duration + delay) - delay
      t._update t._props.startTime + timeShift + 5
      expect(updateValue).toBe(null)
      expect(updateDirection).toBe(null)

      expect(t._wasUknownUpdate).toBe(true)
      expect(zeroCnt).toBe(0)
      expect(oneCnt).toBe(0)
      
      expect(repeatStartCnt).toBe(0)
      expect(repeatStartDirection).toBe(null)

      expect(repeatCnt).toBe(0)
      expect(repeatCompleteDirection).toBe(null)
      
      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)

      expect(firstUpdateCnt).toBe(0)
      expect(firstUpdateDirection).toBe(null)


      t._update t._props.startTime + timeShift - (duration/2)
      expect(updateValue).toBeCloseTo(.5, 5)
      expect(updateDirection).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(0)

      expect(repeatStartCnt).toBe(0)
      expect(repeatStartDirection).toBe(null)

      expect(repeatCnt).toBe(1)
      expect(repeatCompleteDirection).toBe(false)
      
      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)


      t._update t._props.startTime + timeShift - (duration) - 5
      expect(updateValue).toBeCloseTo(0, 5)
      expect(updateDirection).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(1)

      expect(repeatStartCnt).toBe(1)
      expect(repeatStartDirection).toBe(false)

      expect(repeatCnt).toBe(1)
      expect(repeatCompleteDirection).toBe(false)
      
      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)


      timeShift = 2*(duration + delay) - delay
      t._update t._props.startTime + timeShift - duration/2
      expect(updateValue).toBeCloseTo(.5, 5)
      expect(updateDirection).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(1)

      expect(repeatStartCnt).toBe(1)
      expect(repeatStartDirection).toBe(false)

      expect(repeatCnt).toBe(2)
      expect(repeatCompleteDirection).toBe(false)
      
      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)


      t._update t._props.startTime + timeShift - duration - 5
      expect(updateValue).toBeCloseTo(0, 5)
      expect(updateDirection).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(2)

      expect(repeatStartCnt).toBe(2)
      expect(repeatStartDirection).toBe(false)

      expect(repeatCnt).toBe(2)
      expect(repeatCompleteDirection).toBe(false)

      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)


      timeShift = duration
      t._update t._props.startTime + timeShift - duration/2
      expect(updateValue).toBeCloseTo(.5, 5)
      expect(updateDirection).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(2)

      expect(repeatStartCnt).toBe(2)
      expect(repeatStartDirection).toBe(false)

      expect(repeatCnt).toBe(3)
      expect(repeatCompleteDirection).toBe(false)
      
      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)


      t._update t._props.startTime + timeShift - duration - 5
      expect(updateValue).toBeCloseTo(0, 5)
      expect(updateDirection).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(3)

      expect(repeatStartCnt).toBe(3)
      expect(repeatStartDirection).toBe(false)

      expect(repeatCnt).toBe(3)
      expect(repeatCompleteDirection).toBe(false)
      
      expect(startCnt).toBe(1)
      expect(startDirection).toBe(false)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)

      # repeat the last period
      t._update t._props.startTime + timeShift - duration - 15
      expect(updateValue).toBeCloseTo(0, 5)
      expect(updateDirection).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(3)

      expect(repeatStartCnt).toBe(3)
      expect(repeatStartDirection).toBe(false)

      expect(repeatCnt).toBe(3)
      expect(repeatCompleteDirection).toBe(false)

      expect(startCnt).toBe(1)
      expect(startDirection).toBe(false)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)

    it 'should be called with 0 and 1 on each repeat period if delay || reverse', ()->
      zeroCnt = 0; oneCnt = 0
      startCnt = 0; completeCnt = 0
      repeatCnt = 0; repeatStartCnt = 0
      firstUpdateCnt = 0; firstUpdateDirection = null
      startDirection = null; completeDirection = null
      repeatStartDirection = null; repeatCompleteDirection = null
      duration = 500; delay = 200; updateValue = null; updateDirection = null
      t = new Tween
        repeat:     2
        duration:   duration
        delay:      delay
        easing:     'Linear.None'
        backwardEasing: 'Linear.None'
        onUpdate:(p, pe, isForward)->
          updateDirection = isForward
          updateValue = p
          (p is 0) and zeroCnt++
          (p is 1) and oneCnt++
        onRepeatComplete:(isForward)->
          repeatCompleteDirection = isForward
          repeatCnt++
        onRepeatStart:(isForward)->
          repeatStartDirection = isForward
          repeatStartCnt++
        onStart:(isForward)->
          startDirection = isForward
          startCnt++
        onComplete:(isForward)->
          completeDirection = isForward
          completeCnt++
        onFirstUpdate:(isForward)->
          firstUpdateDirection = isForward
          firstUpdateCnt++

      t._setStartTime()

      timeShift = 3*(duration + delay) - delay
      t._update t._props.startTime + timeShift
      expect(updateValue).toBe(null)
      expect(updateDirection).toBe(null)

      expect(t._wasUknownUpdate).toBe(true)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(0)
      
      expect(repeatStartCnt).toBe(0)
      expect(repeatStartDirection).toBe(null)

      expect(repeatCnt).toBe(0)
      expect(repeatCompleteDirection).toBe(null)
      
      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)

      expect(firstUpdateCnt).toBe(0)
      expect(firstUpdateDirection).toBe(null)


      t._update t._props.startTime + timeShift - (duration/2)
      expect(updateValue).toBeCloseTo(.5, 5)
      expect(updateDirection).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(0)

      expect(repeatStartCnt).toBe(0)
      expect(repeatStartDirection).toBe(null)

      expect(repeatCnt).toBe(1)
      expect(repeatCompleteDirection).toBe(false)
      
      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)


      t._update t._props.startTime + timeShift - duration
      expect(updateValue).toBeCloseTo(0, 5)
      expect(updateDirection).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(1)

      expect(repeatStartCnt).toBe(1)
      expect(repeatStartDirection).toBe(false)

      expect(repeatCnt).toBe(1)
      expect(repeatCompleteDirection).toBe(false)
      
      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)


      timeShift = 2*(duration + delay) - delay
      t._update t._props.startTime + timeShift - duration/2
      expect(updateValue).toBeCloseTo(.5, 5)
      expect(updateDirection).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(1)

      expect(repeatStartCnt).toBe(1)
      expect(repeatStartDirection).toBe(false)

      expect(repeatCnt).toBe(2)
      expect(repeatCompleteDirection).toBe(false)
      
      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)


      timeShift = 2*(duration + delay) - delay
      t._update t._props.startTime + timeShift - duration
      expect(updateValue).toBeCloseTo(0, 5)
      expect(updateDirection).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(2)

      expect(repeatStartCnt).toBe(2)
      expect(repeatStartDirection).toBe(false)

      expect(repeatCnt).toBe(2)
      expect(repeatCompleteDirection).toBe(false)

      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)


      timeShift = duration
      t._update t._props.startTime + timeShift - duration/2
      expect(updateValue).toBeCloseTo(.5, 5)
      expect(updateDirection).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(2)

      expect(repeatStartCnt).toBe(2)
      expect(repeatStartDirection).toBe(false)

      expect(repeatCnt).toBe(3)
      expect(repeatCompleteDirection).toBe(false)
      
      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)

      # timeShift = duration
      t._update t._props.startTime + timeShift - duration
      expect(updateValue).toBeCloseTo(0, 5)
      expect(updateDirection).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(3)

      expect(repeatStartCnt).toBe(3)
      expect(repeatStartDirection).toBe(false)

      expect(repeatCnt).toBe(3)
      expect(repeatCompleteDirection).toBe(false)
      
      expect(startCnt).toBe(1)
      expect(startDirection).toBe(false)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)

      # repeat the last period
      t._update t._props.startTime + timeShift - duration - 10
      expect(updateValue).toBeCloseTo(0, 5)
      expect(updateDirection).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(3)

      expect(repeatStartCnt).toBe(3)
      expect(repeatStartDirection).toBe(false)

      expect(repeatCnt).toBe(3)
      expect(repeatCompleteDirection).toBe(false)

      expect(startCnt).toBe(1)
      expect(startDirection).toBe(false)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)

      # start again
      t._update t._props.startTime + timeShift - duration/2
      expect(updateValue).toBeCloseTo(.5, 5)
      expect(updateDirection).toBe(true)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(3)

      expect(repeatStartCnt).toBe(4)
      expect(repeatStartDirection).toBe(true)

      expect(repeatCnt).toBe(3)
      expect(repeatCompleteDirection).toBe(false)

      expect(startCnt).toBe(2)
      expect(startDirection).toBe(true)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)

      expect(firstUpdateCnt).toBe(2)
      expect(firstUpdateDirection).toBe(true)

    ###
      TWEEN IN NORMAL DIRECTION || YOYO
    ###

    it 'should be called with 1 and 0 on each repeat period || yoyo', ()->
      zeroCnt = 0;    oneCnt = 0
      startCnt = 0; startDirection = null; startYoyo = null
      firstUpdateCnt = 0; firstUpdateDirection = null; firstUpdateYoyo = null
      updateValue = null; updateDirection = null; updateYoyo = null
      repeatStartDirection = null; repeatCompleteDirection = null; repeatCompleteYoyo = null
      repeatCnt = 0;  repeatStartCnt = 0; repeatStartYoyo = null
      completeCnt = 0; completeDirection = null; completeYoyo = null
      duration = 500
      t = new Tween
        repeat:     1
        isYoyo:       true
        duration:   duration
        easing:     'Linear.None'
        backwardEasing: 'Linear.None'
        onUpdate:(p, ep, isForward, isYoyo)->
          updateYoyo = isYoyo
          updateDirection = isForward
          updateValue = p
          (p is 0) and zeroCnt++
          (p is 1) and oneCnt++
        onRepeatComplete:(isForward, isYoyo)->
          repeatCompleteYoyo = isYoyo
          repeatCompleteDirection = isForward
          repeatCnt++
        onRepeatStart:(isForward, isYoyo)->
          repeatStartYoyo = isYoyo
          repeatStartDirection = isForward
          repeatStartCnt++
        onStart:(isForward, isYoyo)->
          startYoyo = isYoyo
          startDirection = isForward
          startCnt++
        onComplete:(isForward, isYoyo)->
          completeYoyo = isYoyo
          completeDirection = isForward
          completeCnt++
        onFirstUpdate:(isForward, isYoyo)->
          firstUpdateYoyo = isYoyo
          firstUpdateDirection = isForward
          firstUpdateCnt++
      
      t._setStartTime()
      
      timeShift = 0
      t._update t._props.startTime + timeShift
      expect(updateValue).toBe(null)
      expect(updateDirection).toBe(null)
      expect(updateYoyo).toBe(null)

      expect(t._wasUknownUpdate).toBe(true)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(0)
      
      expect(repeatStartCnt).toBe(0)
      expect(repeatStartDirection).toBe(null)
      expect(repeatStartYoyo).toBe(null)

      expect(repeatCnt).toBe(0)
      expect(repeatCompleteDirection).toBe(null)
      expect(repeatCompleteYoyo).toBe(null)

      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)
      expect(completeYoyo).toBe(null)

      expect(firstUpdateCnt).toBe(0)
      expect(firstUpdateDirection).toBe(null)
      expect(firstUpdateYoyo).toBe(null)

      
      t._update t._props.startTime + timeShift + (duration/2)
      expect(updateValue).toBeCloseTo(.5, 5)
      expect(updateDirection).toBe(true)
      expect(updateYoyo).toBe false

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(0)
      
      expect(repeatStartCnt).toBe(1)
      expect(repeatStartDirection).toBe(true)
      expect(repeatStartYoyo).toBe(false)

      expect(repeatCnt).toBe(0)
      expect(repeatCompleteDirection).toBe(null)
      expect(repeatCompleteYoyo).toBe(null)

      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)
      expect(startYoyo).toBe(false)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)
      expect(completeYoyo).toBe(null)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)
      expect(firstUpdateYoyo).toBe(false)


      t._update t._props.startTime + timeShift + (duration)
      expect(updateValue).toBeCloseTo(1, 5)
      expect(updateDirection).toBe(true)
      expect(updateYoyo).toBe true

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(1)
      expect(zeroCnt).toBe(0)
      
      expect(repeatStartCnt).toBe(2)
      expect(repeatStartDirection).toBe(true)
      expect(repeatStartYoyo).toBe true

      expect(repeatCnt).toBe(1)
      expect(repeatCompleteDirection).toBe(true)
      expect(repeatCompleteYoyo).toBe false

      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)

      timeShift = duration
      t._update t._props.startTime + timeShift + (duration/4)
      expect(updateValue).toBeCloseTo(.75, 5)
      expect(updateDirection).toBe(true)
      expect(updateYoyo).toBe(true)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(1)
      expect(zeroCnt).toBe(0)
      
      expect(repeatStartCnt).toBe(2)
      expect(repeatStartDirection).toBe(true)
      expect(repeatStartYoyo).toBe(true)

      expect(repeatCnt).toBe(1)
      expect(repeatCompleteDirection).toBe(true)
      expect(repeatCompleteYoyo).toBe(false)

      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)
      expect(startYoyo).toBe(false)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)
      expect(completeYoyo).toBe(null)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)
      expect(firstUpdateYoyo).toBe(false)

      t._update t._props.startTime + timeShift + (duration)
      expect(updateValue).toBeCloseTo(0, 5)
      expect(updateDirection).toBe(true)
      expect(updateYoyo).toBe true

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(1)
      expect(zeroCnt).toBe(1)
      
      expect(repeatStartCnt).toBe(2)
      expect(repeatStartDirection).toBe(true)
      expect(repeatStartYoyo).toBe(true)

      expect(repeatCnt).toBe(2)
      expect(repeatCompleteDirection).toBe(true)
      expect(repeatCompleteYoyo).toBe(true)
      
      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)
      expect(startYoyo).toBe(false)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(true)
      expect(completeYoyo).toBe(true)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)
      expect(firstUpdateYoyo).toBe(false)

    it 'should be called with 1 and 0 on each repeat period if missed time || yoyo', ()->
      zeroCnt = 0;  oneCnt = 0
      startCnt = 0; startDirection = null; startYoyo = null
      firstUpdateCnt = 0; firstUpdateDirection = null; firstUpdateYoyo = null
      updateValue = null; updateDirection = null; updateYoyo = null
      repeatStartDirection = null; repeatCompleteDirection = null; repeatCompleteYoyo = null
      repeatCnt = 0;  repeatStartCnt = 0; repeatStartYoyo = null
      completeCnt = 0; completeDirection = null; completeYoyo = null
      duration = 50
      t = new Tween
        repeat:     1
        isYoyo:       true
        duration:   duration
        easing:     'Linear.None'
        backwardEasing: 'Linear.None'
        onUpdate:(p, ep, isForward, isYoyo)->
          updateYoyo = isYoyo
          updateDirection = isForward
          updateValue = p
          (p is 0) and zeroCnt++
          (p is 1) and oneCnt++
        onRepeatComplete:(isForward, isYoyo)->
          repeatCompleteYoyo = isYoyo
          repeatCompleteDirection = isForward
          repeatCnt++
        onRepeatStart:(isForward, isYoyo)->
          repeatStartYoyo = isYoyo
          repeatStartDirection = isForward
          repeatStartCnt++
        onStart:(isForward, isYoyo)->
          startYoyo = isYoyo
          startDirection = isForward
          startCnt++
        onComplete:(isForward, isYoyo)->
          completeYoyo = isYoyo
          completeDirection = isForward
          completeCnt++
        onFirstUpdate:(isForward, isYoyo)->
          firstUpdateYoyo = isYoyo
          firstUpdateDirection = isForward
          firstUpdateCnt++

      t._setStartTime()

      gap = 5
      timeShift = 0
      t._update t._props.startTime + timeShift + gap
      
      expect(updateValue).toBe(null)
      expect(updateDirection).toBe(null)

      expect(t._wasUknownUpdate).toBe(true)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(0)
      
      expect(repeatStartCnt).toBe(0)
      expect(repeatStartDirection).toBe(null)

      expect(repeatCnt).toBe(0)
      expect(repeatCompleteDirection).toBe(null)
      
      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)

      expect(firstUpdateCnt).toBe(0)
      expect(firstUpdateDirection).toBe(null)

      t._update t._props.startTime + timeShift + (duration/2)
      expect(updateValue).toBeCloseTo(.5, 5)
      expect(updateDirection).toBe(true)
      expect(updateYoyo).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(0)

      expect(repeatStartCnt).toBe(1)
      expect(repeatStartDirection).toBe(true)
      expect(repeatStartYoyo).toBe(false)

      expect(repeatCnt).toBe(0)
      expect(repeatCompleteDirection).toBe(null)
      expect(repeatCompleteYoyo).toBe(null)

      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)
      expect(startYoyo).toBe(false)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)
      expect(completeYoyo).toBe(null)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)
      expect(firstUpdateYoyo).toBe(false)


      t._update t._props.startTime + timeShift + (duration) - gap
      expect(updateValue).toBeCloseTo(.9, 5)
      expect(updateDirection).toBe(true)
      expect(updateYoyo).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(0)

      expect(repeatStartCnt).toBe(1)
      expect(repeatStartDirection).toBe(true)
      expect(repeatStartYoyo).toBe(false)

      expect(repeatCnt).toBe(0)
      expect(repeatCompleteDirection).toBe(null)
      expect(repeatCompleteYoyo).toBe(null)

      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)
      expect(startYoyo).toBe(false)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)
      expect(completeYoyo).toBe(null)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)
      expect(firstUpdateYoyo).toBe(false)

    
      timeShift = duration
      t._update t._props.startTime + timeShift + gap
      expect(updateValue).toBeCloseTo(.9, 5)
      expect(updateDirection).toBe(true)
      expect(updateYoyo).toBe(true)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(0)
      
      expect(repeatStartCnt).toBe(2)
      expect(repeatStartDirection).toBe(true)
      expect(repeatStartYoyo).toBe(true)

      expect(repeatCnt).toBe(1)
      expect(repeatCompleteDirection).toBe(true)
      expect(repeatCompleteYoyo).toBe(false)

      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)
      expect(startYoyo).toBe(false)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)
      expect(completeYoyo).toBe(null)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)
      expect(firstUpdateYoyo).toBe(false)


      t._update t._props.startTime + timeShift + (duration/4)
      expect(updateValue).toBeCloseTo(.75, 5)
      expect(updateDirection).toBe(true)
      expect(updateYoyo).toBe(true)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(0)
      
      expect(repeatStartCnt).toBe(2)
      expect(repeatStartDirection).toBe(true)
      expect(repeatStartYoyo).toBe(true)

      expect(repeatCnt).toBe(1)
      expect(repeatCompleteDirection).toBe(true)
      expect(repeatCompleteYoyo).toBe(false)

      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)
      expect(startYoyo).toBe(false)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)
      expect(completeYoyo).toBe(null)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)
      expect(firstUpdateYoyo).toBe(false)

      # end
      timeShift = 2*duration
      t._update t._props.startTime + timeShift + gap
      expect(updateValue).toBeCloseTo(0)
      expect(updateDirection).toBe(true)
      expect(updateYoyo).toBe(true)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(1)

      expect(repeatStartCnt).toBe(2)
      expect(repeatStartDirection).toBe(true)
      expect(repeatStartYoyo).toBe(true)

      expect(repeatCnt).toBe(2)
      expect(repeatCompleteDirection).toBe(true)
      expect(repeatCompleteYoyo).toBe(true)
      
      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)
      expect(startYoyo).toBe(false)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(true)
      expect(completeYoyo).toBe(true)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)
      expect(firstUpdateYoyo).toBe(false)

    it 'should be called with 1 and 0 on each repeat period if delay || yoyo', ()->
      zeroCnt = 0;  oneCnt = 0
      startCnt = 0; startDirection = null; startYoyo = null
      firstUpdateCnt = 0; firstUpdateDirection = null; firstUpdateYoyo = null
      updateValue = null; updateDirection = null; updateYoyo = null
      repeatStartDirection = null; repeatCompleteDirection = null; repeatCompleteYoyo = null
      repeatCnt = 0;  repeatStartCnt = 0; repeatStartYoyo = null
      completeCnt = 0; completeDirection = null; completeYoyo = null
      duration = 50; delay = 20
      t = new Tween
        repeat:     2
        isYoyo:       true
        duration:   duration
        delay:      delay
        easing:     'Linear.None'
        backwardEasing: 'Linear.None'
        onUpdate:(p, ep, isForward, isYoyo)->
          updateYoyo = isYoyo
          updateDirection = isForward
          updateValue = p
          (p is 0) and zeroCnt++
          (p is 1) and oneCnt++
        onRepeatComplete:(isForward, isYoyo)->
          repeatCompleteYoyo = isYoyo
          repeatCompleteDirection = isForward
          repeatCnt++
        onRepeatStart:(isForward, isYoyo)->
          repeatStartYoyo = isYoyo
          repeatStartDirection = isForward
          repeatStartCnt++
        onStart:(isForward, isYoyo)->
          startYoyo = isYoyo
          startDirection = isForward
          startCnt++
        onComplete:(isForward, isYoyo)->
          completeYoyo = isYoyo
          completeDirection = isForward
          completeCnt++
        onFirstUpdate:(isForward, isYoyo)->
          firstUpdateYoyo = isYoyo
          firstUpdateDirection = isForward
          firstUpdateCnt++

      t._setStartTime()

      timeShift = 0
      t._update t._props.startTime + timeShift
      expect(updateValue).toBe(null)
      expect(updateDirection).toBe(null)

      expect(t._wasUknownUpdate).toBe(true)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(0)
      
      expect(repeatStartCnt).toBe(0)
      expect(repeatStartDirection).toBe(null)

      expect(repeatCnt).toBe(0)
      expect(repeatCompleteDirection).toBe(null)
      
      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)

      expect(firstUpdateCnt).toBe(0)
      expect(firstUpdateDirection).toBe(null)


      t._update t._props.startTime + timeShift + (duration/2)
      expect(updateValue).toBeCloseTo(.5, 5)
      expect(updateDirection).toBe(true)
      expect(updateYoyo).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(0)
      
      expect(repeatStartCnt).toBe(1)
      expect(repeatStartDirection).toBe(true)
      expect(repeatStartYoyo).toBe(false)

      expect(repeatCnt).toBe(0)
      expect(repeatCompleteDirection).toBe(null)
      expect(repeatCompleteYoyo).toBe(null)

      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)
      expect(startYoyo).toBe(false)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)
      expect(completeYoyo).toBe(null)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)
      expect(firstUpdateYoyo).toBe(false)


      t._update t._props.startTime + timeShift + (duration)
      expect(updateValue).toBe(1, 5)
      expect(updateDirection).toBe(true)
      expect(updateYoyo).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(1)
      expect(zeroCnt).toBe(0)
      
      expect(repeatStartCnt).toBe(1)
      expect(repeatStartDirection).toBe(true)
      expect(repeatStartYoyo).toBe(false)

      expect(repeatCnt).toBe(1)
      expect(repeatCompleteDirection).toBe(true)
      expect(repeatCompleteYoyo).toBe(false)

      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)
      expect(startYoyo).toBe(false)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)
      expect(completeYoyo).toBe(null)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)
      expect(firstUpdateYoyo).toBe(false)

      timeShift = duration + delay
      t._update t._props.startTime + timeShift
      expect(updateValue).toBe(1, 5)
      expect(updateDirection).toBe(true)
      expect(updateYoyo).toBe(true)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(2)
      expect(zeroCnt).toBe(0)

      expect(repeatStartCnt).toBe(2)
      expect(repeatStartDirection).toBe(true)
      expect(repeatStartYoyo).toBe(true)

      expect(repeatCnt).toBe(1)
      expect(repeatCompleteDirection).toBe(true)
      expect(repeatCompleteYoyo).toBe(false)

      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)
      expect(startYoyo).toBe(false)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)
      expect(completeYoyo).toBe(null)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)
      expect(firstUpdateYoyo).toBe(false)


      t._update t._props.startTime + timeShift + (duration/4)
      expect(updateValue).toBeCloseTo(.75, 5)
      expect(updateDirection).toBe(true)
      expect(updateYoyo).toBe(true)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(2)
      expect(zeroCnt).toBe(0)

      expect(repeatStartCnt).toBe(2)
      expect(repeatStartDirection).toBe(true)
      expect(repeatStartYoyo).toBe(true)

      expect(repeatCnt).toBe(1)
      expect(repeatCompleteDirection).toBe(true)
      expect(repeatCompleteYoyo).toBe(false)

      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)
      expect(startYoyo).toBe(false)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)
      expect(completeYoyo).toBe(null)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)
      expect(firstUpdateYoyo).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(2)
      expect(zeroCnt).toBe(0)
      
      expect(repeatStartCnt).toBe(2)
      expect(repeatStartDirection).toBe(true)
      expect(repeatStartYoyo).toBe(true)

      expect(repeatCnt).toBe(1)
      expect(repeatCompleteDirection).toBe(true)
      expect(repeatCompleteYoyo).toBe(false)
      
      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)
      expect(startYoyo).toBe(false)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)
      expect(completeYoyo).toBe(null)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)
      expect(firstUpdateYoyo).toBe(false)


      timeShift = 2*(duration + delay)
      t._update t._props.startTime + timeShift
      expect(updateValue).toBeCloseTo(0, 5)
      expect(updateDirection).toBe(true)
      expect(updateYoyo).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(zeroCnt).toBe(1)
      expect(oneCnt).toBe(2)

      expect(repeatStartCnt).toBe(3)
      expect(repeatStartDirection).toBe(true)
      expect(repeatStartYoyo).toBe(false)

      expect(repeatCnt).toBe(2)
      expect(repeatCompleteDirection).toBe(true)
      expect(repeatCompleteYoyo).toBe(true)
      
      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)
      expect(startYoyo).toBe(false)
      
      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)
      expect(completeYoyo).toBe(null)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)
      expect(firstUpdateYoyo).toBe(false)


      t._update t._props.startTime + timeShift + (duration/4)
      expect(updateValue).toBeCloseTo(.25, 5)
      expect(updateDirection).toBe(true)
      expect(updateYoyo).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(2)
      expect(zeroCnt).toBe(1)

      expect(repeatStartCnt).toBe(3)
      expect(repeatStartDirection).toBe(true)
      expect(repeatStartYoyo).toBe(false)

      expect(repeatCnt).toBe(2)
      expect(repeatCompleteDirection).toBe(true)
      expect(repeatCompleteYoyo).toBe(true)

      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)
      expect(startYoyo).toBe(false)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)
      expect(completeYoyo).toBe(null)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)
      expect(firstUpdateYoyo).toBe(false)

      
      t._update t._props.startTime + timeShift + (duration)
      expect(updateValue).toBeCloseTo(1, 5)
      expect(updateDirection).toBe(true)
      expect(updateYoyo).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(3)
      expect(zeroCnt).toBe(1)

      expect(repeatStartCnt).toBe(3)
      expect(repeatStartDirection).toBe(true)
      expect(repeatStartYoyo).toBe(false)

      expect(repeatCnt).toBe(3)
      expect(repeatCompleteDirection).toBe(true)
      expect(repeatCompleteYoyo).toBe(false)

      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)
      expect(startYoyo).toBe(false)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(true)
      expect(completeYoyo).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)
      expect(firstUpdateYoyo).toBe(false)

      # repeat the last period
      t._update t._props.startTime + timeShift + (duration) + delay/2
      expect(updateValue).toBeCloseTo(1, 5)
      expect(updateDirection).toBe(true)
      expect(updateYoyo).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(3)
      expect(zeroCnt).toBe(1)

      expect(repeatStartCnt).toBe(3)
      expect(repeatStartDirection).toBe(true)
      expect(repeatStartYoyo).toBe(false)

      expect(repeatCnt).toBe(3)
      expect(repeatCompleteDirection).toBe(true)
      expect(repeatCompleteYoyo).toBe(false)
      
      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)
      expect(startYoyo).toBe(false)
      
      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(true)
      expect(completeYoyo).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)
      expect(firstUpdateYoyo).toBe(false)

    it 'should be called with 1 and 0 on each repeat period if in delay || yoyo', ()->
      zeroCnt = 0;  oneCnt = 0
      startCnt = 0; startDirection = null; startYoyo = null
      firstUpdateCnt = 0; firstUpdateDirection = null; firstUpdateYoyo = null
      updateValue = null; updateDirection = null; updateYoyo = null
      repeatStartDirection = null; repeatCompleteDirection = null; repeatCompleteYoyo = null
      repeatCnt = 0;  repeatStartCnt = 0; repeatStartYoyo = null
      completeCnt = 0; completeDirection = null; completeYoyo = null
      duration = 50; delay = 20
      t = new Tween
        repeat:     1
        isYoyo:       true
        duration:   duration
        delay:      delay
        easing:     'Linear.None'
        backwardEasing: 'Linear.None'
        onUpdate:(p, ep, isForward, isYoyo)->
          updateYoyo = isYoyo
          updateDirection = isForward
          updateValue = p
          (p is 0) and zeroCnt++
          (p is 1) and oneCnt++
        onRepeatComplete:(isForward, isYoyo)->
          repeatCompleteYoyo = isYoyo
          repeatCompleteDirection = isForward
          repeatCnt++
        onRepeatStart:(isForward, isYoyo)->
          repeatStartYoyo = isYoyo
          repeatStartDirection = isForward
          repeatStartCnt++
        onStart:(isForward, isYoyo)->
          startYoyo = isYoyo
          startDirection = isForward
          startCnt++
        onComplete:(isForward, isYoyo)->
          completeYoyo = isYoyo
          completeDirection = isForward
          completeCnt++
        onFirstUpdate:(isForward, isYoyo)->
          firstUpdateYoyo = isYoyo
          firstUpdateDirection = isForward
          firstUpdateCnt++

      t._setStartTime()

      timeShift = 0
      t._update t._props.startTime + timeShift
      expect(updateValue).toBe(null)
      expect(updateDirection).toBe(null)

      expect(t._wasUknownUpdate).toBe(true)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(0)
      
      expect(repeatStartCnt).toBe(0)
      expect(repeatStartDirection).toBe(null)

      expect(repeatCnt).toBe(0)
      expect(repeatCompleteDirection).toBe(null)

      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)

      expect(firstUpdateCnt).toBe(0)
      expect(firstUpdateDirection).toBe(null)


      t._update t._props.startTime + timeShift + (duration/2)
      expect(updateValue).toBe(.5)
      expect(updateDirection).toBe(true)
      expect(updateYoyo).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(0)

      expect(repeatStartCnt).toBe(1)
      expect(repeatStartDirection).toBe(true)
      expect(repeatStartYoyo).toBe(false)

      expect(repeatCnt).toBe(0)
      expect(repeatCompleteDirection).toBe(null)
      expect(repeatCompleteYoyo).toBe(null)
      
      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)
      expect(startYoyo).toBe(false)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)
      expect(completeYoyo).toBe(null)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)
      expect(firstUpdateYoyo).toBe(false)


      t._update t._props.startTime + timeShift + (duration) + delay/2
      expect(updateValue).toBeCloseTo(1, 5)
      expect(updateDirection).toBe(true)
      expect(updateYoyo).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(1)
      expect(zeroCnt).toBe(0)

      expect(repeatStartCnt).toBe(1)
      expect(repeatStartDirection).toBe(true)
      expect(repeatStartYoyo).toBe(false)

      expect(repeatCnt).toBe(1)
      expect(repeatCompleteDirection).toBe(true)
      expect(repeatCompleteYoyo).toBe(false)

      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)
      expect(startYoyo).toBe(false)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)
      expect(completeYoyo).toBe(null)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)
      expect(firstUpdateYoyo).toBe(false)

      timeShift = duration + delay
      t._update t._props.startTime + timeShift + 10
      expect(updateValue).toBeCloseTo(.8, 5)
      expect(updateDirection).toBe(true)
      expect(updateYoyo).toBe(true)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(1)
      expect(zeroCnt).toBe(0)

      expect(repeatStartCnt).toBe(2)
      expect(repeatStartDirection).toBe(true)
      expect(repeatStartYoyo).toBe(true)

      expect(repeatCnt).toBe(1)
      expect(repeatCompleteDirection).toBe(true)
      expect(repeatCompleteYoyo).toBe(false)
      
      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)
      expect(startYoyo).toBe(false)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)
      expect(completeYoyo).toBe(null)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)
      expect(firstUpdateYoyo).toBe(false)


      t._update t._props.startTime + timeShift + (duration/4)
      expect(updateValue).toBeCloseTo(.75, 5)
      expect(updateDirection).toBe(true)
      expect(updateYoyo).toBe(true)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(1)
      expect(zeroCnt).toBe(0)

      expect(repeatStartCnt).toBe(2)
      expect(repeatStartDirection).toBe(true)
      expect(repeatStartYoyo).toBe(true)

      expect(repeatCnt).toBe(1)
      expect(repeatCompleteDirection).toBe(true)
      expect(repeatCompleteYoyo).toBe(false)
      
      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)
      expect(startYoyo).toBe(false)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)
      expect(completeYoyo).toBe(null)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)
      expect(firstUpdateYoyo).toBe(false)

      # end
      t._update t._props.startTime + timeShift + (duration) + delay/2
      expect(updateValue).toBeCloseTo(0, 5)
      expect(updateDirection).toBe(true)
      expect(updateYoyo).toBe(true)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(1)
      expect(zeroCnt).toBe(1)

      expect(repeatStartCnt).toBe(2)
      expect(repeatStartDirection).toBe(true)
      expect(repeatStartYoyo).toBe(true)

      expect(repeatCnt).toBe(2)
      expect(repeatCompleteDirection).toBe(true)
      expect(repeatCompleteYoyo).toBe(true)

      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)
      expect(startYoyo).toBe(false)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(true)
      expect(completeYoyo).toBe(true)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)
      expect(firstUpdateYoyo).toBe(false)

      # repeat the last period
      timeShift = 2*(duration + delay)
      t._update t._props.startTime + timeShift + 10
      expect(updateValue).toBeCloseTo(0, 5)
      expect(updateDirection).toBe(true)
      expect(updateYoyo).toBe(true)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(1)
      expect(zeroCnt).toBe(1)

      expect(repeatStartCnt).toBe(2)
      expect(repeatStartDirection).toBe(true)
      expect(repeatStartYoyo).toBe(true)

      expect(repeatCnt).toBe(2)
      expect(repeatCompleteDirection).toBe(true)
      expect(repeatCompleteYoyo).toBe(true)

      expect(startCnt).toBe(1)
      expect(startDirection).toBe(true)
      expect(startYoyo).toBe(false)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(true)
      expect(completeYoyo).toBe(true)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(true)
      expect(firstUpdateYoyo).toBe(false)


  #     t._update t._props.startTime + timeShift + (duration/4)
  #     expect(updateValue).toBeCloseTo(.25, 5)
  #     expect(updateDirection).toBe(true)

  #     expect(t._wasUknownUpdate).toBe(false)
  #     expect(oneCnt).toBe(1)
  #     expect(zeroCnt).toBe(1)

  #     expect(repeatStartCnt).toBe(3)
  #     expect(repeatStartDirection).toBe(true)

  #     expect(repeatCnt).toBe(2)
  #     expect(repeatCompleteDirection).toBe(true)
      
  #     expect(startCnt).toBe(1)
  #     expect(startDirection).toBe(true)

  #     expect(completeCnt).toBe(0)
  #     expect(completeDirection).toBe(null)

  #     expect(firstUpdateCnt).toBe(1)
  #     expect(firstUpdateDirection).toBe(true)

  #     # end
  #     t._update t._props.startTime + timeShift + (duration) + delay/2
  #     expect(updateValue).toBeCloseTo(1, 5)
  #     expect(updateDirection).toBe(true)

  #     expect(t._wasUknownUpdate).toBe(false)
  #     expect(oneCnt).toBe(2)
  #     expect(zeroCnt).toBe(1)

  #     expect(repeatStartCnt).toBe(3)
  #     expect(repeatStartDirection).toBe(true)

  #     expect(repeatCnt).toBe(3)
  #     expect(repeatCompleteDirection).toBe(true)
      
  #     expect(startCnt).toBe(1)
  #     expect(startDirection).toBe(true)

  #     expect(completeCnt).toBe(1)
  #     expect(completeDirection).toBe(true)

  #     expect(firstUpdateCnt).toBe(1)
  #     expect(firstUpdateDirection).toBe(true)

  #     # repeat the last period
  #     t._update t._props.startTime + timeShift + (duration) + delay/2 + 10
  #     expect(updateValue).toBeCloseTo(1, 5)
  #     expect(updateDirection).toBe(true)

  #     expect(t._wasUknownUpdate).toBe(false)
  #     expect(oneCnt).toBe(2)
  #     expect(zeroCnt).toBe(1)

  #     expect(repeatStartCnt).toBe(3)
  #     expect(repeatStartDirection).toBe(true)

  #     expect(repeatCnt).toBe(3)
  #     expect(repeatCompleteDirection).toBe(true)
      
  #     expect(startCnt).toBe(1)
  #     expect(startDirection).toBe(true)

  #     expect(completeCnt).toBe(1)
  #     expect(completeDirection).toBe(true)

  #     expect(firstUpdateCnt).toBe(1)
  #     expect(firstUpdateDirection).toBe(true)

    # ###
    #   TWEEN IN REVERSE DIRECTION || YOYO
    # ###

    it 'should be called with 0 and 1 on each repeat period || reverse yoyo', ()->
      zeroCnt = 0;  oneCnt = 0
      startCnt = 0; startDirection = null; startYoyo = null
      firstUpdateCnt = 0; firstUpdateDirection = null; firstUpdateYoyo = null
      updateValue = null; updateDirection = null; updateYoyo = null
      repeatStartDirection = null; repeatCompleteDirection = null; repeatCompleteYoyo = null
      repeatCnt = 0;  repeatStartCnt = 0; repeatStartYoyo = null
      completeCnt = 0; completeDirection = null; completeYoyo = null
      duration = 50#; delay = 20
      t = new Tween
        repeat:     2
        isYoyo:       true
        duration:   duration
        easing:     'Linear.None'
        backwardEasing: 'Linear.None'
        onUpdate:(p, ep, isForward, isYoyo)->
          updateYoyo = isYoyo
          updateDirection = isForward
          updateValue = p
          (p is 0) and zeroCnt++
          (p is 1) and oneCnt++
        onRepeatComplete:(isForward, isYoyo)->
          repeatCompleteYoyo = isYoyo
          repeatCompleteDirection = isForward
          repeatCnt++
        onRepeatStart:(isForward, isYoyo)->
          repeatStartYoyo = isYoyo
          repeatStartDirection = isForward
          repeatStartCnt++
        onStart:(isForward, isYoyo)->
          startYoyo = isYoyo
          startDirection = isForward
          startCnt++
        onComplete:(isForward, isYoyo)->
          completeYoyo = isYoyo
          completeDirection = isForward
          completeCnt++
        onFirstUpdate:(isForward, isYoyo)->
          firstUpdateYoyo = isYoyo
          firstUpdateDirection = isForward
          firstUpdateCnt++

      t._setStartTime()
      
      timeShift = 3*duration
      t._update t._props.startTime + timeShift
      expect(updateValue).toBe(null)
      expect(updateDirection).toBe(null)

      expect(t._wasUknownUpdate).toBe(true)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(0)

      expect(repeatStartCnt).toBe(0)
      expect(repeatStartDirection).toBe(null)

      expect(repeatCnt).toBe(0)
      expect(repeatCompleteDirection).toBe(null)
      
      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)

      expect(firstUpdateCnt).toBe(0)
      expect(firstUpdateDirection).toBe(null)


      t._update t._props.startTime + timeShift - duration/4
      expect(updateValue).toBeCloseTo(.75, 5)
      expect(updateDirection).toBe(false)
      expect(updateYoyo).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(0)

      expect(repeatStartCnt).toBe(0)
      expect(repeatStartDirection).toBe(null)
      expect(repeatStartYoyo).toBe(null)

      expect(repeatCnt).toBe(1)
      expect(repeatCompleteDirection).toBe(false)
      expect(repeatCompleteYoyo).toBe(false)
      
      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)
      expect(startYoyo).toBe(null)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)
      expect(completeYoyo).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)
      expect(firstUpdateYoyo).toBe(false)


      timeShift = 2*duration
      t._update t._props.startTime + timeShift
      expect(updateValue).toBeCloseTo(0, 5)
      expect(updateDirection).toBe(false)
      expect(updateYoyo).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(1)

      expect(repeatStartCnt).toBe(1)
      expect(repeatStartDirection).toBe(false)
      expect(repeatStartYoyo).toBe(false)

      expect(repeatCnt).toBe(1)
      expect(repeatCompleteDirection).toBe(false)
      expect(repeatCompleteYoyo).toBe(false)
      
      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)
      expect(startYoyo).toBe(null)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)
      expect(completeYoyo).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)
      expect(firstUpdateYoyo).toBe(false)

      t._update t._props.startTime + timeShift - duration/4
      expect(updateValue).toBeCloseTo(.25, 5)
      expect(updateDirection).toBe(false)
      expect(updateYoyo).toBe(true)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(1)

      expect(repeatStartCnt).toBe(1)
      expect(repeatStartDirection).toBe(false)
      expect(repeatStartYoyo).toBe(false)

      expect(repeatCnt).toBe(2)
      expect(repeatCompleteDirection).toBe(false)
      expect(repeatCompleteYoyo).toBe(true)
      
      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)
      expect(startYoyo).toBe(null)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)
      expect(completeYoyo).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)
      expect(firstUpdateYoyo).toBe(false)


      timeShift = duration
      t._update t._props.startTime + timeShift
      expect(updateValue).toBeCloseTo(1, 5)
      expect(updateDirection).toBe(false)
      expect(updateYoyo).toBe(true)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(1)
      expect(zeroCnt).toBe(1)
      
      expect(repeatStartCnt).toBe(2)
      expect(repeatStartDirection).toBe(false)
      expect(repeatStartYoyo).toBe(true)

      expect(repeatCnt).toBe(2)
      expect(repeatCompleteDirection).toBe(false)
      expect(repeatCompleteYoyo).toBe(true)
      
      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)
      expect(startYoyo).toBe(null)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)
      expect(completeYoyo).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)
      expect(firstUpdateYoyo).toBe(false)


      t._update t._props.startTime + timeShift - duration/4
      expect(updateValue).toBeCloseTo(.75, 5)
      expect(updateDirection).toBe(false)
      expect(updateYoyo).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(1)
      expect(zeroCnt).toBe(1)

      expect(repeatStartCnt).toBe(2)
      expect(repeatStartDirection).toBe(false)
      expect(repeatStartYoyo).toBe(true)

      expect(repeatCnt).toBe(3)
      expect(repeatCompleteDirection).toBe(false)
      expect(repeatCompleteYoyo).toBe(false)
      
      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)
      expect(startYoyo).toBe(null)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)
      expect(completeYoyo).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)
      expect(firstUpdateYoyo).toBe(false)


      # end
      timeShift = 0
      t._update t._props.startTime + timeShift
      expect(updateValue).toBeCloseTo(0, 5)
      expect(updateDirection).toBe(false)
      expect(updateYoyo).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(1)
      expect(zeroCnt).toBe(2)
      
      expect(repeatStartCnt).toBe(3)
      expect(repeatStartDirection).toBe(false)
      expect(repeatStartYoyo).toBe(false)

      expect(repeatCnt).toBe(3)
      expect(repeatCompleteDirection).toBe(false)
      expect(repeatCompleteYoyo).toBe(false)

      expect(startCnt).toBe(1)
      expect(startDirection).toBe(false)
      expect(startYoyo).toBe(false)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)
      expect(completeYoyo).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)
      expect(firstUpdateYoyo).toBe(false)

      # repeat the last period
      t._update t._props.startTime + timeShift - duration/2
      expect(updateValue).toBeCloseTo(0, 5)
      expect(updateDirection).toBe(false)
      expect(updateYoyo).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(1)
      expect(zeroCnt).toBe(2)
      
      expect(repeatStartCnt).toBe(3)
      expect(repeatStartDirection).toBe(false)
      expect(repeatStartYoyo).toBe(false)

      expect(repeatCnt).toBe(3)
      expect(repeatCompleteDirection).toBe(false)
      expect(repeatCompleteYoyo).toBe(false)

      expect(startCnt).toBe(1)
      expect(startDirection).toBe(false)
      expect(startYoyo).toBe(false)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)
      expect(completeYoyo).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)
      expect(firstUpdateYoyo).toBe(false)

    it 'should be called with 0 and 1 on each repeat period if missed time || yoyo reverse', ()->
      zeroCnt = 0;  oneCnt = 0
      startCnt = 0; startDirection = null; startYoyo = null
      firstUpdateCnt = 0; firstUpdateDirection = null; firstUpdateYoyo = null
      updateValue = null; updateDirection = null; updateYoyo = null
      repeatStartDirection = null; repeatCompleteDirection = null; repeatCompleteYoyo = null
      repeatCnt = 0;  repeatStartCnt = 0; repeatStartYoyo = null
      completeCnt = 0; completeDirection = null; completeYoyo = null
      duration = 50#; delay = 20
      t = new Tween
        repeat:     2
        isYoyo:       true
        duration:   duration
        easing:     'Linear.None'
        backwardEasing: 'Linear.None'
        #delay:      delay
        onUpdate:(p, ep, isForward, isYoyo)->
          updateYoyo = isYoyo
          updateDirection = isForward
          updateValue = p
          (p is 0) and zeroCnt++
          (p is 1) and oneCnt++
        onRepeatComplete:(isForward, isYoyo)->
          repeatCompleteYoyo = isYoyo
          repeatCompleteDirection = isForward
          repeatCnt++
        onRepeatStart:(isForward, isYoyo)->
          repeatStartYoyo = isYoyo
          repeatStartDirection = isForward
          repeatStartCnt++
        onStart:(isForward, isYoyo)->
          startYoyo = isYoyo
          startDirection = isForward
          startCnt++
        onComplete:(isForward, isYoyo)->
          completeYoyo = isYoyo
          completeDirection = isForward
          completeCnt++
        onFirstUpdate:(isForward, isYoyo)->
          firstUpdateYoyo = isYoyo
          firstUpdateDirection = isForward
          firstUpdateCnt++

      t._setStartTime()

      gap = 5
      timeShift = 3*duration
      t._update t._props.startTime + timeShift + gap
      expect(updateValue).toBe(null)
      expect(updateDirection).toBe(null)

      expect(t._wasUknownUpdate).toBe(true)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(0)

      expect(repeatStartCnt).toBe(0)
      expect(repeatStartDirection).toBe(null)

      expect(repeatCnt).toBe(0)
      expect(repeatCompleteDirection).toBe(null)
      
      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)

      expect(firstUpdateCnt).toBe(0)
      expect(firstUpdateDirection).toBe(null)


      t._update t._props.startTime + timeShift - (duration/2)
      expect(updateValue).toBeCloseTo(.5, 5)
      expect(updateDirection).toBe(false)
      expect(updateYoyo).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(0)

      expect(repeatStartCnt).toBe(0)
      expect(repeatStartDirection).toBe(null)
      expect(repeatStartYoyo).toBe(null)

      expect(repeatCnt).toBe(1)
      expect(repeatCompleteDirection).toBe(false)
      expect(repeatCompleteYoyo).toBe(false)
      
      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)
      expect(startYoyo).toBe(null)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)
      expect(completeYoyo).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)
      expect(firstUpdateYoyo).toBe(false)


      t._update t._props.startTime + timeShift - (duration) + gap
      expect(updateValue).toBeCloseTo(.1, 5)
      expect(updateDirection).toBe(false)
      expect(updateYoyo).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(0)

      expect(repeatStartCnt).toBe(0)
      expect(repeatStartDirection).toBe(null)
      expect(repeatStartYoyo).toBe(null)

      expect(repeatCnt).toBe(1)
      expect(repeatCompleteDirection).toBe(false)
      expect(repeatCompleteYoyo).toBe(false)
      
      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)
      expect(startYoyo).toBe(null)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)
      expect(completeYoyo).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)
      expect(firstUpdateYoyo).toBe(false)


      timeShift = 2*duration
      t._update t._props.startTime + timeShift - gap
      expect(updateValue).toBeCloseTo(.1, 5)
      expect(updateDirection).toBe(false)
      expect(updateYoyo).toBe(true)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(0)

      expect(repeatStartCnt).toBe(1)
      expect(repeatStartDirection).toBe(false)
      expect(repeatStartYoyo).toBe(false)

      expect(repeatCnt).toBe(2)
      expect(repeatCompleteDirection).toBe(false)
      expect(repeatCompleteYoyo).toBe(true)

      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)
      expect(startYoyo).toBe(null)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)
      expect(completeYoyo).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)
      expect(firstUpdateYoyo).toBe(false)


      t._update t._props.startTime + timeShift - (duration/4)
      expect(updateValue).toBeCloseTo(.25, 5)
      expect(updateDirection).toBe(false)
      expect(updateYoyo).toBe(true)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(0)

      expect(repeatStartCnt).toBe(1)
      expect(repeatStartDirection).toBe(false)
      expect(repeatStartYoyo).toBe(false)

      expect(repeatCnt).toBe(2)
      expect(repeatCompleteDirection).toBe(false)
      expect(repeatCompleteYoyo).toBe(true)

      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)
      expect(startYoyo).toBe(null)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)
      expect(completeYoyo).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)
      expect(firstUpdateYoyo).toBe(false)


      timeShift = duration
      t._update t._props.startTime + timeShift - gap
      expect(updateValue).toBeCloseTo(.9, 5)
      expect(updateDirection).toBe(false)
      expect(updateYoyo).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(0)

      expect(repeatStartCnt).toBe(2)
      expect(repeatStartDirection).toBe(false)
      expect(repeatStartYoyo).toBe(true)

      expect(repeatCnt).toBe(3)
      expect(repeatCompleteDirection).toBe(false)
      expect(repeatCompleteYoyo).toBe(false)

      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)
      expect(startYoyo).toBe(null)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)
      expect(completeYoyo).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)
      expect(firstUpdateYoyo).toBe(false)

      # end
      timeShift = duration
      t._update t._props.startTime - gap
      expect(updateValue).toBeCloseTo(0, 5)
      expect(updateDirection).toBe(false)
      expect(updateYoyo).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(1)

      expect(repeatStartCnt).toBe(3)
      expect(repeatStartDirection).toBe(false)
      expect(repeatStartYoyo).toBe(false)

      expect(repeatCnt).toBe(3)
      expect(repeatCompleteDirection).toBe(false)
      expect(repeatCompleteYoyo).toBe(false)

      expect(startCnt).toBe(1)
      expect(startDirection).toBe(false)
      expect(startYoyo).toBe(false)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)
      expect(completeYoyo).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)
      expect(firstUpdateYoyo).toBe(false)

      # start again
      t._update t._props.startTime + timeShift - (duration/4)
      expect(updateValue).toBeCloseTo(.75, 5)
      expect(updateDirection).toBe(true)
      expect(updateYoyo).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(1)

      expect(repeatStartCnt).toBe(4)
      expect(repeatStartDirection).toBe(true)
      expect(repeatStartYoyo).toBe(false)

      expect(repeatCnt).toBe(3)
      expect(repeatCompleteDirection).toBe(false)
      expect(repeatCompleteYoyo).toBe(false)

      expect(startCnt).toBe(2)
      expect(startDirection).toBe(true)
      expect(startYoyo).toBe(false)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)
      expect(completeYoyo).toBe(false)

      expect(firstUpdateCnt).toBe(2)
      expect(firstUpdateDirection).toBe(true)
      expect(firstUpdateYoyo).toBe(false)

      # return to "-" inactive area
      t._update t._props.startTime - gap
      expect(updateValue).toBeCloseTo(0, 5)
      expect(updateDirection).toBe(false)
      expect(updateYoyo).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(2)

      expect(repeatStartCnt).toBe(5)
      expect(repeatStartDirection).toBe(false)
      expect(repeatStartYoyo).toBe(false)

      expect(repeatCnt).toBe(3)
      expect(repeatCompleteDirection).toBe(false)
      expect(repeatCompleteYoyo).toBe(false)
      
      expect(startCnt).toBe(3)
      expect(startDirection).toBe(false)
      expect(startYoyo).toBe(false)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)
      expect(completeYoyo).toBe(false)

      expect(firstUpdateCnt).toBe(2)
      expect(firstUpdateDirection).toBe(true)
      expect(firstUpdateYoyo).toBe(false)

      # repeat the previous step
      t._update t._props.startTime - gap - 15
      expect(updateValue).toBeCloseTo(0, 5)
      expect(updateDirection).toBe(false)
      expect(updateYoyo).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(2)

      expect(repeatStartCnt).toBe(5)
      expect(repeatStartDirection).toBe(false)
      expect(repeatStartYoyo).toBe(false)

      expect(repeatCnt).toBe(3)
      expect(repeatCompleteDirection).toBe(false)
      expect(repeatCompleteYoyo).toBe(false)
      
      expect(startCnt).toBe(3)
      expect(startDirection).toBe(false)
      expect(startYoyo).toBe(false)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)
      expect(completeYoyo).toBe(false)

      expect(firstUpdateCnt).toBe(2)
      expect(firstUpdateDirection).toBe(true)
      expect(firstUpdateYoyo).toBe(false)

    it 'should be called with 0 and 1 on each repeat period if in delay || yoyo reverse', ()->
      zeroCnt = 0;  oneCnt = 0
      startCnt = 0; startDirection = null; startYoyo = null
      firstUpdateCnt = 0; firstUpdateDirection = null; firstUpdateYoyo = null
      updateValue = null; updateDirection = null; updateYoyo = null
      repeatStartDirection = null; repeatCompleteDirection = null; repeatCompleteYoyo = null
      repeatCnt = 0;  repeatStartCnt = 0; repeatStartYoyo = null
      completeCnt = 0; completeDirection = null; completeYoyo = null
      duration = 500; delay = 200
      t = new Tween
        repeat:     2
        isYoyo:       true
        duration:   duration
        delay:      delay
        easing:     'Linear.None'
        backwardEasing: 'Linear.None'
        onUpdate:(p, ep, isForward, isYoyo)->
          updateYoyo = isYoyo
          updateDirection = isForward
          updateValue = p
          (p is 0) and zeroCnt++
          (p is 1) and oneCnt++
        onRepeatComplete:(isForward, isYoyo)->
          repeatCompleteYoyo = isYoyo
          repeatCompleteDirection = isForward
          repeatCnt++
        onRepeatStart:(isForward, isYoyo)->
          repeatStartYoyo = isYoyo
          repeatStartDirection = isForward
          repeatStartCnt++
        onStart:(isForward, isYoyo)->
          startYoyo = isYoyo
          startDirection = isForward
          startCnt++
        onComplete:(isForward, isYoyo)->
          completeYoyo = isYoyo
          completeDirection = isForward
          completeCnt++
        onFirstUpdate:(isForward, isYoyo)->
          firstUpdateYoyo = isYoyo
          firstUpdateDirection = isForward
          firstUpdateCnt++

      t._setStartTime()

      timeShift = 3*(duration + delay) - delay
      t._update t._props.startTime + timeShift + 5
      expect(updateValue).toBe(null)
      expect(updateDirection).toBe(null)

      expect(t._wasUknownUpdate).toBe(true)
      expect(zeroCnt).toBe(0)
      expect(oneCnt).toBe(0)
      
      expect(repeatStartCnt).toBe(0)
      expect(repeatStartDirection).toBe(null)

      expect(repeatCnt).toBe(0)
      expect(repeatCompleteDirection).toBe(null)
      
      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)

      expect(firstUpdateCnt).toBe(0)
      expect(firstUpdateDirection).toBe(null)


      t._update t._props.startTime + timeShift - (duration/4)
      expect(updateValue).toBeCloseTo(.75, 5)
      expect(updateDirection).toBe(false)
      expect(updateYoyo).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(0)

      expect(repeatStartCnt).toBe(0)
      expect(repeatStartDirection).toBe(null)
      expect(repeatStartYoyo).toBe(null)

      expect(repeatCnt).toBe(1)
      expect(repeatCompleteDirection).toBe(false)
      expect(repeatCompleteYoyo).toBe(false)
      
      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)
      expect(startYoyo).toBe(null)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)
      expect(completeYoyo).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)
      expect(firstUpdateYoyo).toBe(false)


      t._update t._props.startTime + timeShift - (duration) - 5
      expect(updateValue).toBeCloseTo(0, 5)
      expect(updateDirection).toBe(false)
      expect(updateYoyo).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(1)

      expect(repeatStartCnt).toBe(1)
      expect(repeatStartDirection).toBe(false)
      expect(repeatStartYoyo).toBe(false)

      expect(repeatCnt).toBe(1)
      expect(repeatCompleteDirection).toBe(false)
      expect(repeatCompleteYoyo).toBe(false)
      
      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)
      expect(startYoyo).toBe(null)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)
      expect(completeYoyo).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)
      expect(firstUpdateYoyo).toBe(false)


      timeShift = 2*(duration + delay) - delay
      t._update t._props.startTime + timeShift - duration/4
      expect(updateValue).toBeCloseTo(.25, 5)
      expect(updateDirection).toBe(false)
      expect(updateYoyo).toBe(true)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(1)

      expect(repeatStartCnt).toBe(1)
      expect(repeatStartDirection).toBe(false)
      expect(repeatStartYoyo).toBe(false)

      expect(repeatCnt).toBe(2)
      expect(repeatCompleteDirection).toBe(false)
      expect(repeatCompleteYoyo).toBe(true)
      
      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)
      expect(startYoyo).toBe(null)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)
      expect(completeYoyo).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)
      expect(firstUpdateYoyo).toBe(false)


      t._update t._props.startTime + timeShift - duration - 5
      expect(updateValue).toBeCloseTo(1, 5)
      expect(updateDirection).toBe(false)
      expect(updateYoyo).toBe(true)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(1)
      expect(zeroCnt).toBe(1)

      expect(repeatStartCnt).toBe(2)
      expect(repeatStartDirection).toBe(false)
      expect(repeatStartYoyo).toBe(true)

      expect(repeatCnt).toBe(2)
      expect(repeatCompleteDirection).toBe(false)
      expect(repeatCompleteYoyo).toBe(true)

      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)
      expect(startYoyo).toBe(null)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)
      expect(completeYoyo).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)
      expect(firstUpdateYoyo).toBe(false)


      timeShift = duration
      t._update t._props.startTime + timeShift - duration/4
      expect(updateValue).toBeCloseTo(.75, 5)
      expect(updateDirection).toBe(false)
      expect(updateYoyo).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(1)
      expect(zeroCnt).toBe(1)

      expect(repeatStartCnt).toBe(2)
      expect(repeatStartDirection).toBe(false)
      expect(repeatStartYoyo).toBe(true)

      expect(repeatCnt).toBe(3)
      expect(repeatCompleteDirection).toBe(false)
      expect(repeatCompleteYoyo).toBe(false)
      
      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)
      expect(startYoyo).toBe(null)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)
      expect(completeYoyo).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)
      expect(firstUpdateYoyo).toBe(false)


      t._update t._props.startTime + timeShift - duration - 5
      expect(updateValue).toBeCloseTo(0, 5)
      expect(updateDirection).toBe(false)
      expect(updateYoyo).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(1)
      expect(zeroCnt).toBe(2)

      expect(repeatStartCnt).toBe(3)
      expect(repeatStartDirection).toBe(false)
      expect(repeatStartYoyo).toBe(false)

      expect(repeatCnt).toBe(3)
      expect(repeatCompleteDirection).toBe(false)
      expect(repeatCompleteYoyo).toBe(false)
      
      expect(startCnt).toBe(1)
      expect(startDirection).toBe(false)
      expect(startYoyo).toBe(false)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)
      expect(completeYoyo).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)
      expect(firstUpdateDirection).toBe(false)

      # repeat the last period
      t._update t._props.startTime + timeShift - duration - 15
      expect(updateValue).toBeCloseTo(0, 5)
      expect(updateDirection).toBe(false)
      expect(updateYoyo).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(1)
      expect(zeroCnt).toBe(2)

      expect(repeatStartCnt).toBe(3)
      expect(repeatStartDirection).toBe(false)
      expect(repeatStartYoyo).toBe(false)

      expect(repeatCnt).toBe(3)
      expect(repeatCompleteDirection).toBe(false)
      expect(repeatCompleteYoyo).toBe(false)
      
      expect(startCnt).toBe(1)
      expect(startDirection).toBe(false)
      expect(startYoyo).toBe(false)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)
      expect(completeYoyo).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)
      expect(firstUpdateDirection).toBe(false)

    it 'should be called with 0 and 1 on each repeat period if delay || yoyo reverse', ()->
      zeroCnt = 0;  oneCnt = 0
      startCnt = 0; startDirection = null; startYoyo = null
      firstUpdateCnt = 0; firstUpdateDirection = null; firstUpdateYoyo = null
      updateValue = null; updateDirection = null; updateYoyo = null
      repeatStartDirection = null; repeatCompleteDirection = null; repeatCompleteYoyo = null
      repeatCnt = 0;  repeatStartCnt = 0; repeatStartYoyo = null
      completeCnt = 0; completeDirection = null; completeYoyo = null
      duration = 500; delay = 200
      t = new Tween
        repeat:     2
        isYoyo:       true
        duration:   duration
        delay:      delay
        easing:     'Linear.None'
        backwardEasing: 'Linear.None'
        onUpdate:(p, ep, isForward, isYoyo)->
          updateYoyo = isYoyo
          updateDirection = isForward
          updateValue = p
          (p is 0) and zeroCnt++
          (p is 1) and oneCnt++
        onRepeatComplete:(isForward, isYoyo)->
          repeatCompleteYoyo = isYoyo
          repeatCompleteDirection = isForward
          repeatCnt++
        onRepeatStart:(isForward, isYoyo)->
          repeatStartYoyo = isYoyo
          repeatStartDirection = isForward
          repeatStartCnt++
        onStart:(isForward, isYoyo)->
          startYoyo = isYoyo
          startDirection = isForward
          startCnt++
        onComplete:(isForward, isYoyo)->
          completeYoyo = isYoyo
          completeDirection = isForward
          completeCnt++
        onFirstUpdate:(isForward, isYoyo)->
          firstUpdateYoyo = isYoyo
          firstUpdateDirection = isForward
          firstUpdateCnt++

      t._setStartTime()

      timeShift = 3*(duration + delay) - delay
      t._update t._props.startTime + timeShift
      expect(updateValue).toBe(null)
      expect(updateDirection).toBe(null)

      expect(t._wasUknownUpdate).toBe(true)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(0)
      
      expect(repeatStartCnt).toBe(0)
      expect(repeatStartDirection).toBe(null)

      expect(repeatCnt).toBe(0)
      expect(repeatCompleteDirection).toBe(null)
      
      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)

      expect(completeCnt).toBe(0)
      expect(completeDirection).toBe(null)

      expect(firstUpdateCnt).toBe(0)
      expect(firstUpdateDirection).toBe(null)


      t._update t._props.startTime + timeShift - (duration/2)
      expect(updateValue).toBeCloseTo(.5, 5)
      expect(updateDirection).toBe(false)
      expect(updateYoyo).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(0)

      expect(repeatStartCnt).toBe(0)
      expect(repeatStartDirection).toBe(null)
      expect(repeatStartYoyo).toBe(null)

      expect(repeatCnt).toBe(1)
      expect(repeatCompleteDirection).toBe(false)
      expect(repeatCompleteYoyo).toBe(false)
      
      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)
      expect(startYoyo).toBe(null)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)
      expect(completeYoyo).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)
      expect(firstUpdateYoyo).toBe(false)


      t._update t._props.startTime + timeShift - duration
      expect(updateValue).toBeCloseTo(0, 5)
      expect(updateDirection).toBe(false)
      expect(updateYoyo).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(1)

      expect(repeatStartCnt).toBe(1)
      expect(repeatStartDirection).toBe(false)
      expect(repeatStartYoyo).toBe(false)

      expect(repeatCnt).toBe(1)
      expect(repeatCompleteDirection).toBe(false)
      expect(repeatCompleteYoyo).toBe(false)

      
      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)
      expect(startYoyo).toBe(null)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)
      expect(completeYoyo).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)
      expect(firstUpdateYoyo).toBe(false)


      timeShift = 2*(duration + delay) - delay
      t._update t._props.startTime + timeShift - duration/4
      expect(updateValue).toBeCloseTo(.25, 5)
      expect(updateDirection).toBe(false)
      expect(updateYoyo).toBe(true)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(1)

      expect(repeatStartCnt).toBe(1)
      expect(repeatStartDirection).toBe(false)
      expect(repeatStartYoyo).toBe(false)

      expect(repeatCnt).toBe(2)
      expect(repeatCompleteDirection).toBe(false)
      expect(repeatCompleteYoyo).toBe(true)
      
      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)
      expect(startYoyo).toBe(null)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)
      expect(completeYoyo).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)
      expect(firstUpdateYoyo).toBe(false)


      timeShift = 2*(duration + delay) - delay
      t._update t._props.startTime + timeShift - duration
      expect(updateValue).toBeCloseTo(1, 5)
      expect(updateDirection).toBe(false)
      expect(updateYoyo).toBe(true)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(1)
      expect(zeroCnt).toBe(1)

      expect(repeatStartCnt).toBe(2)
      expect(repeatStartDirection).toBe(false)
      expect(repeatStartYoyo).toBe(true)

      expect(repeatCnt).toBe(2)
      expect(repeatCompleteDirection).toBe(false)
      expect(repeatCompleteYoyo).toBe(true)
      
      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)
      expect(startYoyo).toBe(null)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)
      expect(completeYoyo).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)
      expect(firstUpdateYoyo).toBe(false)


      timeShift = duration
      t._update t._props.startTime + timeShift - duration/4
      expect(updateValue).toBeCloseTo(.75, 5)
      expect(updateDirection).toBe(false)
      expect(updateYoyo).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(1)
      expect(zeroCnt).toBe(1)

      expect(repeatStartCnt).toBe(2)
      expect(repeatStartDirection).toBe(false)
      expect(repeatStartYoyo).toBe(true)

      expect(repeatCnt).toBe(3)
      expect(repeatCompleteDirection).toBe(false)
      
      expect(startCnt).toBe(0)
      expect(startDirection).toBe(null)
      expect(startYoyo).toBe(null)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)
      expect(completeYoyo).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)
      expect(firstUpdateYoyo).toBe(false)


      t._update t._props.startTime + timeShift - duration
      expect(updateValue).toBeCloseTo(0, 5)
      expect(updateDirection).toBe(false)
      expect(updateYoyo).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(1)
      expect(zeroCnt).toBe(2)

      expect(repeatStartCnt).toBe(3)
      expect(repeatStartDirection).toBe(false)
      expect(repeatStartYoyo).toBe(false)

      expect(repeatCnt).toBe(3)
      expect(repeatCompleteDirection).toBe(false)
      expect(repeatCompleteYoyo).toBe(false)

      expect(startCnt).toBe(1)
      expect(startDirection).toBe(false)
      expect(startYoyo).toBe(false)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)
      expect(completeYoyo).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)
      expect(firstUpdateYoyo).toBe(false)

      # repeat the last period
      t._update t._props.startTime + timeShift - duration - 10
      expect(updateValue).toBeCloseTo(0, 5)
      expect(updateDirection).toBe(false)
      expect(updateYoyo).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(1)
      expect(zeroCnt).toBe(2)

      expect(repeatStartCnt).toBe(3)
      expect(repeatStartDirection).toBe(false)
      expect(repeatStartYoyo).toBe(false)

      expect(repeatCnt).toBe(3)
      expect(repeatCompleteDirection).toBe(false)
      expect(repeatCompleteYoyo).toBe(false)

      expect(startCnt).toBe(1)
      expect(startDirection).toBe(false)
      expect(startYoyo).toBe(false)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)
      expect(completeYoyo).toBe(false)

      expect(firstUpdateCnt).toBe(1)
      expect(firstUpdateDirection).toBe(false)
      expect(firstUpdateYoyo).toBe(false)

      # start again
      t._update t._props.startTime + timeShift - duration/4
      expect(updateValue).toBeCloseTo(.75, 5)
      expect(updateDirection).toBe(true)
      expect(updateYoyo).toBe(false)

      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(1)
      expect(zeroCnt).toBe(2)

      expect(repeatStartCnt).toBe(4)
      expect(repeatStartDirection).toBe(true)
      expect(repeatStartYoyo).toBe(false)

      expect(repeatCnt).toBe(3)
      expect(repeatCompleteDirection).toBe(false)
      expect(repeatCompleteYoyo).toBe(false)

      expect(startCnt).toBe(2)
      expect(startDirection).toBe(true)
      expect(startYoyo).toBe(false)

      expect(completeCnt).toBe(1)
      expect(completeDirection).toBe(false)
      expect(completeYoyo).toBe(false)

      expect(firstUpdateCnt).toBe(2)
      expect(firstUpdateDirection).toBe(true)
      expect(firstUpdateYoyo).toBe(false)

  # ###
  #   specific
  # ###

  describe 'specific _update behaviour', ->
    it 'should call repeatComplete if immediately returned inside Timeline', ()->
      tm = new Timeline repeat: 1, isYoyo: true
      t = new Tween
        onStart:(isForward, isYoyo)->
        onRepeatStart:(isForward, isYoyo)->
        onComplete:(isForward, isYoyo)->
        onRepeatComplete:(isForward, isYoyo)->
        onFirstUpdate:(isForward, isYoyo)->
        onProgress:(p, isForward, isYoyo)->
        onUpdate:(ep, p, isForward, isYoyo)->
      tm.add t
      tm.setProgress 0
      tm.setProgress .1
      tm.setProgress .35
      tm.setProgress .5
      tm.setProgress .6
      spyOn t._props, 'onRepeatComplete'
      tm.setProgress .5

      expect(t._props.onRepeatComplete).toHaveBeenCalledWith true, false

    it 'should call repeatComplete only once when in delay', ()->
      duration = 2000; delay = 1000
      t = new Tween repeat: 1, isYoyo: true, duration: duration, delay: delay
      spyOn t._props, 'onRepeatComplete'
      t.setProgress 1
      t.setProgress .85
      t.setProgress .75
      t.setProgress .6
      t.setProgress .45 # <-- error
      t.setProgress .25
      expect(t._props.onRepeatComplete.calls.count()).toBe 2

    it 'should not call onComplete and onRepeatComplete on start', ->
      tm = new mojs.Timeline repeat: 1, isYoyo: true

      tw = new mojs.Tween
        duration: 2000
        onStart:(isForward, isYoyo)->
        onRepeatStart:(isForward, isYoyo)->
        onComplete:(isForward, isYoyo)->
        onRepeatComplete:(isForward, isYoyo)->
        onFirstUpdate:(isForward, isYoyo)->
        onProgress:(p, isForward, isYoyo)->
        onUpdate:(ep, p, isForward, isYoyo)->

      tm.add tw

      tm._setStartTime()
      st = tm._props.startTime
      et = tm._props.endTime
      tm._update st
      tm._update st + 1000
      tm._update st + 2000
      tm._update st + 3000
      tm._update st + 3100
      tm._update st + 3300
      spyOn tw._props, 'onRepeatComplete'
      spyOn tw._props, 'onComplete'
      tm._update tm._props.endTime - .0000000000001
      expect(tw._props.onRepeatComplete).not.toHaveBeenCalled()
      expect(tw._props.onComplete).not.toHaveBeenCalled()
  
  describe 'specific _complete behaviour', ->
    it 'should not fire on immediate stop', (dfr)->
      tw = new mojs.Tween

      spyOn tw, '_complete'
      spyOn tw, '_repeatComplete'

      tw.play()
      setTimeout ->
        tw.stop()
        expect( tw._repeatComplete ).not.toHaveBeenCalled()
        expect( tw._complete ).not.toHaveBeenCalled()
        dfr()
      , 1

      
  describe '_getPeriod method ->', ->
    it 'should get current period', ->
      duration = 50; delay = 20
      t = new Tween repeat: 3, duration: duration, delay: delay

      t._setStartTime()

      expect(t._getPeriod(t._props.startTime)).toBe 0
      expect(t._getPeriod(t._props.startTime + duration/2)).toBe 0
      expect(t._getPeriod(t._props.startTime + duration)).toBe 1

      timeShift = duration + delay
      expect(t._getPeriod(t._props.startTime + timeShift - delay/2)).toBe 'delay'
      expect(t._delayT).toBe 1
      expect(t._getPeriod(t._props.startTime + timeShift)).toBe 1
      expect(t._getPeriod(t._props.startTime + timeShift + duration/2)).toBe 1
      expect(t._getPeriod(t._props.startTime + timeShift + duration)).toBe 2

      timeShift = 2*(duration + delay)
      expect(t._getPeriod(t._props.startTime + timeShift - delay/2)).toBe 'delay'
      expect(t._delayT).toBe 2
      expect(t._getPeriod(t._props.startTime + timeShift)).toBe 2
      expect(t._getPeriod(t._props.startTime + timeShift + duration/2)).toBe 2
      expect(t._getPeriod(t._props.startTime + timeShift + duration)).toBe 3

      timeShift = 3*(duration + delay)
      expect(t._getPeriod(t._props.startTime + timeShift - delay/2)).toBe 'delay'
      expect(t._delayT).toBe 3
      expect(t._getPeriod(t._props.startTime + timeShift)).toBe 3
      expect(t._getPeriod(t._props.startTime + timeShift + duration/2)).toBe 3
      expect(t._getPeriod(t._props.startTime + timeShift + duration)).toBe 4

    it 'should get the current period with no delay', ->
      duration = 50
      t = new Tween repeat: 3, duration: duration

      t._setStartTime()

      expect(t._getPeriod(t._props.startTime)).toBe 0
      expect(t._getPeriod(t._props.startTime + duration/2)).toBe 0
      expect(t._getPeriod(t._props.startTime + duration)).toBe 1
      expect(t._getPeriod(t._props.startTime + duration + 1)).toBe 1

      timeShift = duration
      expect(t._getPeriod(t._props.startTime + timeShift + duration/2)).toBe 1
      expect(t._getPeriod(t._props.startTime + timeShift + duration)).toBe 2
      expect(t._getPeriod(t._props.startTime + timeShift + duration + 1)).toBe 2

      timeShift = 2*duration
      expect(t._getPeriod(t._props.startTime + timeShift + duration/2)).toBe 2
      expect(t._getPeriod(t._props.startTime + timeShift + duration)).toBe 3
      expect(t._getPeriod(t._props.startTime + timeShift + duration + 1)).toBe 3

      timeShift = 3*duration
      expect(t._getPeriod(t._props.startTime + timeShift + duration/2)).toBe 3
      expect(t._getPeriod(t._props.startTime + timeShift + duration)).toBe 4
      expect(t._getPeriod(t._props.startTime + timeShift + duration + 1)).toBe 4

    it 'should return period number if time > endTime', ->
      duration = 50; delay = 20
      t = new Tween repeat: 2, duration: duration, delay: delay

      t._setStartTime()

      timeShift = 3*(duration + delay) - delay
      expect(t._getPeriod(t._props.startTime + timeShift + delay/2)).toBe 3

    it 'should round instead of floor if time >= endTime', ->
      # fifty plus something that will cause precision issue
      duration = 50 + 3/2.123
      t = new Tween repeat: 2, duration: duration
      t._setStartTime()
      expect(t._getPeriod(t._props.startTime + 3*duration)).toBe 3

    it 'should not fail because of precision error', ->
      duration = (500 + 4/10000.123)
      delay    = (200 + 4/10000.123)
      t = new Tween repeat: 2, duration: duration, delay: delay
      t._setStartTime()
      expect(t._getPeriod(t._props.endTime)).toBe 3

  describe 'onComplete callback ->', ->
    it 'should be defined', ->
      t = new Tween onComplete: ->
      expect(t._props.onComplete).toBeDefined()
    it 'should call onComplete callback', ->
      t = new Tween(duration: 100, onComplete:->)._setStartTime()
      spyOn(t._props, 'onComplete')
      t._update t._props.startTime + 50
      t._update t._props.startTime + 51
      t._update t._props.startTime + 101
      expect(t._props.onComplete).toHaveBeenCalled()
    it 'should be called just once', ->
      cnt = 0
      t = new Tween(duration: 32, onComplete:-> cnt++)._setStartTime()
      spyOn t._props, 'onComplete'
      t._update(t._props.startTime + 0)
      t._update(t._props.startTime + 10)
      t._update(t._props.startTime + 20)
      t._update(t._props.startTime + 30)
      t._update(t._props.startTime + 34)
      expect(t._props.onComplete).toHaveBeenCalledWith true, false
      expect(t._props.onComplete.calls.count()).toBe 1

    it 'should be called just once when inside timeline', ->
      tm = new mojs.Timeline
      duration = 32
      t = new Tween(duration: duration, onComplete:-> )._setStartTime()
      tm.add t
      tm._setStartTime()
      spyOn t._props, 'onComplete'
      tm._update(t._props.startTime + 0)
      tm._update(t._props.startTime + duration/2)
      tm._update(t._props.startTime + duration)
      expect(t._props.onComplete).toHaveBeenCalledWith true, false
      expect(t._props.onComplete.calls.count()).toBe 1

    it 'should fire only once when inside timeline #2', ()->
      cnt = 0; duration = 50; delay = 10
      tm = new mojs.Timeline # repeat: 1
      t1 = new Tween
        delay:      delay
        duration:   duration
        onComplete:-> cnt++
      t2 = new Tween
        delay:      2*delay
        duration:   2*duration

      tm.add t1, t2
      tm._setStartTime()

      tm._update t1._props.startTime
      tm._update t1._props.startTime + duration/2
      tm._update t1._props.startTime + duration + delay/2
      tm._update t1._props.startTime + duration + delay + 1

      tm._update t1._props.startTime + 2*duration + delay/2
      # end
      tm._update t1._props.startTime + 2*( duration + delay ) # <-- error
      tm._update t1._props.startTime + 2*( duration + delay ) + delay
      tm._update t1._props.startTime + 2*( duration + delay ) + 2*delay
      tm._update t1._props.startTime + 2*( duration + delay ) + 3*delay
      tm._update t1._props.startTime + 2*( duration + delay ) + 4*delay

      expect(cnt).toBe(1)

    # it 'should reset isCompleted and isFirstUpdate flag', ->
    it 'should reset isCompleted flag', ->
      t = new Tween( duration: 32 )._setStartTime()
      t._update(t._props.startTime + 10)
      t._update(t._props.startTime + 11)
      t._update(t._props.endTime)
      expect(t._isCompleted).toBe true
      # expect(t._isFirstUpdate).toBe false
      t._update(t._props.startTime + 10)
      expect(t._isCompleted).toBe false

    it 'should have the right scope', ->
      isRightScope = null
      t = new Tween
        duration: 10, onComplete:-> isRightScope = @ instanceof Tween
      t._setStartTime()._update t._props.startTime + 2
      t._setStartTime()._update t._props.startTime + 3
      t._setStartTime()._update t._props.startTime + 11
      expect(isRightScope).toBe true
    it 'should fire after the last onUpdate', (dfr)->
      proc = 0
      t = new Tween
        duration: 32,
        onUpdate:(p)-> proc = p
        onComplete:-> expect(proc).toBe(1); dfr()
      t._setStartTime()
      t._update t._props.startTime + 1
      t._update t._props.startTime + 2
      t._update t._props.startTime + 32

  describe 'onStart callback ->', ->
    it 'should be defined', ->
      t = new Tween onStart: ->
      expect(t._props.onStart).toBeDefined()

    it 'should restart if tween was completed', ->
      startCnt = 0
      t = new Tween
        isIt: 1
        onStart: -> startCnt++

      t._setStartTime()
      t._update t._props.startTime + t._props.duration/2
      expect(startCnt).toBe 0 # because we ignore single updates
      t._update t._props.startTime + t._props.duration/2 + 10
      expect(startCnt).toBe 1
      t._update t._props.startTime + t._props.duration
      expect(startCnt).toBe 1
      t._update t._props.startTime - 10
      expect(startCnt).toBe 1
      t._update t._props.startTime + t._props.duration/2
      expect(startCnt).toBe 2

    it 'should run before onComplete if tween ended', ->
      startCnt = 0; callback = null
      t = new Tween
        onStart: ->   callback ?= 'start'; startCnt++
        onComplete:-> callback ?= 'complete'

      t._setStartTime()
      t._update t._props.startTime + t._props.duration/2
      expect(startCnt).toBe 0

      t._update t._props.startTime + t._props.duration/2 + 10
      expect(startCnt).toBe 1

      t._update t._props.startTime + t._props.duration
      expect(startCnt).toBe 1

      expect(callback).toBe 'start'

    it 'should run with right context', ->
      isRightContext = null
      t = new Tween onStart: -> isRightContext = @ is t

      t.setProgress 0
      t.setProgress .1
      expect(isRightContext).toBe true

    it 'should run with custom context', ->
      isRightContext = null; contextObj = {}
      t = new Tween
        callbacksContext: contextObj,
        onStart: -> isRightContext = @ is contextObj

      t.setProgress 0
      t.setProgress .1
      expect(isRightContext).toBe true

  describe 'onFirstUpdate callback ->', ->
    it 'should be defined', ->
      t = new Tween onFirstUpdate: ->
      expect(t._props.onFirstUpdate).toBeDefined()

    it 'should run with right context', ->
      isRightContext = null
      t = new Tween onFirstUpdate: -> isRightContext = @ is t

      t.setProgress 0
      t.setProgress .1
      expect(isRightContext).toBe true

    it 'should run with custom context', ->
      isRightContext = null; contextObj = {}
      t = new Tween
        callbacksContext: contextObj,
        onFirstUpdate: -> isRightContext = @ is contextObj

      t.setProgress 0
      t.setProgress .1
      expect(isRightContext).toBe true

    it 'should have tween object on the onFirstUpdate function', ->
      tweenObject = null
      onFirstUpdate = -> tweenObject = onFirstUpdate.tween
      t = new Tween onFirstUpdate: onFirstUpdate

      t.setProgress 0
      t.setProgress .1
      expect(tweenObject).toBe t

  describe 'onRepeatStart callback ->', ->
    it 'should be defined', ->
      t = new Tween onRepeatStart: ->
      expect(t._props.onRepeatStart).toBeDefined()

    it 'should run with right context', ->
      isRightContext = null
      t = new Tween onRepeatStart: -> isRightContext = @ is t

      t.setProgress 0
      t.setProgress .1
      expect(isRightContext).toBe true

    it 'should run with custom context', ->
      isRightContext = null; contextObj = {}
      t = new Tween
        callbacksContext: contextObj,
        onRepeatStart: -> isRightContext = @ is contextObj

      t.setProgress 0
      t.setProgress .1
      expect(isRightContext).toBe true

  describe 'onRepeatComplete callback ->', ->
    it 'should be defined', ->
      t = new Tween onRepeatComplete: ->
      expect(t._props.onRepeatComplete).toBeDefined()

    it 'should run with right context', ->
      isRightContext = null
      t = new Tween onRepeatComplete: -> isRightContext = @ is t

      t.setProgress 0
      t.setProgress .1
      t.setProgress 1
      expect(isRightContext).toBe true

    it 'should run with custom context', ->
      isRightContext = null; contextObj = {}
      t = new Tween
        callbacksContext: contextObj,
        onRepeatComplete: -> isRightContext = @ is contextObj

      t.setProgress 0
      t.setProgress .1
      t.setProgress 1
      expect(isRightContext).toBe true

  describe 'yoyo option ->', ->
    it 'should receive yoyo option', ->
      t = new Tween isYoyo: true
      expect(t._props.isYoyo).toBe true

  describe 'easing ->', ->
    it 'should parse easing string', ->
      t = new Tween(easing: 'Linear.None')
      expect(typeof t._props.easing).toBe 'function'
    it 'should parse standart easing', ->
      t = new Tween(easing: 'Sin.Out', duration: 100)
      t._setStartTime();
      t._update(t._props.startTime + 49)
      expect(t.progress).toBe 0
      expect(t.easedProgress).toBe undefined
      t._update(t._props.startTime + 50)
      expect(t.easedProgress).toBe easing.sin.out t.progress
    it 'should work with easing function', ->
      easings = one: -> a = 1
      t = new Tween(easing: easings.one)
      expect(t._props.easing.toString()).toBe easings.one.toString()
    it 'should work with easing function', (dfr)->
      easings = one:(k)-> k
      spyOn easings, 'one'
      t = new Tween(easing: easings.one)
      t._setStartTime();
      t._update t._props.startTime + 39
      t._update t._props.startTime + 40
      setTimeout (-> expect(easings.one).toHaveBeenCalled(); dfr()), 50

    describe 'backward easing ->', ->
      it 'should parse backward easing', ->
        spyOn(easing, 'parseEasing').and.callThrough()
        easingStr = 'cubic.out'
        t = new Tween backwardEasing: easingStr

        expect( easing.parseEasing ).toHaveBeenCalledWith easingStr
        expect( t._props.backwardEasing ).toBe mojs.easing.cubic.out

  describe '_setProgress method ->', ->
    it 'should set the current progress', ->
      t = new Tween( easing: 'Bounce.Out' )

      t._setStartTime()
      t._prevTime = t._props.startTime
      t._setProgress .75, t._prevTime + 1

      expect(t.progress).toBe .75
      eased = mojs.easing.bounce.out(.75)
      expect(t.easedProgress.toFixed(2)).toBe eased.toFixed(2)

    it 'should set the backward eased progress if yoyo', ->
      t = new Tween( easing: 'Bounce.Out', backwardEasing: 'cubic.in' )
      t._setStartTime()
      t._prevTime = t._props.startTime + t._props.repeatTime
      t._setProgress .75, t._prevTime + 1, true
      expect(t.progress).toBe .75
      eased = mojs.easing.cubic.in(.75)
      expect(t.easedProgress.toFixed(2)).toBe eased.toFixed(2)

    it 'should set the backward eased progress if backward', ->
      t = new Tween(easing: 'Bounce.Out', backwardEasing: 'cubic.in')
      t._setStartTime()
      t._prevTime = t._props.startTime + t._props.repeatTime
      t._setProgress .75, t._prevTime - 1
      expect(t.progress).toBe .75
      eased = mojs.easing.cubic.in(.75)
      expect(t.easedProgress.toFixed(2)).toBe eased.toFixed(2)

    it 'should set the current progress if backward and yoyo', ->
      t = new Tween( easing: 'Bounce.Out' )

      t._setStartTime()
      t._prevTime = t._props.startTime
      t._setProgress .75, t._prevTime - 1, true

      expect(t.progress).toBe .75
      eased = mojs.easing.bounce.out(.75)
      expect(t.easedProgress.toFixed(2)).toBe eased.toFixed(2)

    it 'should set fallback to easing if backwardEasing wasnt defined', ->
      t = new Tween( easing: 'Bounce.Out', isIt: 1 )

      t._setStartTime()
      t._prevTime = t._props.startTime
      t._setProgress .75, t._prevTime - 1

      expect(t.progress).toBe .75
      eased = mojs.easing.bounce.out(.75)
      expect(t.easedProgress.toFixed(2)).toBe eased.toFixed(2)

    it 'should set return self', ->
      t = new Tween(easing: 'Bounce.Out')
      obj = t._setProgress .75
      expect(obj).toBe t
    it 'should save prevYoyo to props', ->
      t = new Tween(easing: 'Bounce.Out')
      obj = t._setProgress .75, 1, true
      expect(t._props.wasYoyo).toBe true

  describe '_setProps method ->', ->
    it 'should set new tween options', ->
      t = new Tween duration: 100, delay: 0
      t._setProp duration: 1000, delay: 200
      expect(t._props.duration).toBe 1000
      expect(t._props.delay).toBe    200
    # it 'should set only tween releated options', ->
    #   t = new Tween duration: 100, delay: 0
    #   t._setProp duration: 1000, delay: 200, fill: 'red'
    #   expect(t._props.duration).toBe 1000
    #   expect(t._props.delay).toBe    200
    #   expect(t._props.fill).not.toBeDefined()
    it 'should work with arguments', ->
      t = new Tween duration: 100
      t._setProp 'duration', 1000
      expect(t._props.duration).toBe 1000
    # it 'should work with only tween option arguments', ->
    #   t = new Tween duration: 100
    #   t._setProp 'fill', 1000
    #   expect(t._props.fill).not.toBeDefined()
    it 'should call _calcDimentions method', ->
      t = new Tween duration: 100
      spyOn t, '_calcDimentions'
      t._setProp 'duration', 1000
      expect(t._calcDimentions).toHaveBeenCalled()
    it 'should update the time', ->
      t = new Tween duration: 100, delay: 100
      t._setProp 'duration', 1000
      expect(t._props.time).toBe 1100
    it 'should parse easing', ->
      t = new Tween duration: 100
      t._setProp 'easing', 'elastic.in'
      expect(t._props.easing).toBe mojs.easing.elastic.in

    # describe '_setProp method ->', ->
    #   it 'should work with arguments', ->
    #     t = new Tween duration: 100
    #     t._setProp 'duration', 1000
    #     expect(t._props.duration).toBe 1000
    #   it 'should work with only tween option arguments', ->
    #     t = new Tween duration: 100
    #     t._setProp 'fill', 1000
    #     expect(t._props.fill).not.toBeDefined()
    #   it 'should parse easing', ->
    #     t = new Tween duration: 100
    #     t._setProp 'easing', 'ease.out'
    #     expect(t._props.easing).toBe easing.ease.out

  describe '_subPlay method ->', ->
    describe '_prevTime recalculation ->', ->
      it 'should set _resumeTime', ->
        t = new Tween
        now = performance.now()
        t.play()
        expect( now - t._playTime ).not.toBeGreaterThan 5
      it 'should recalc _prevTime play + play', (dfr)->
        t = new Tween
        t.play()
        setTimeout ->
          t.pause()
          now = performance.now()
          t.play().pause()
          prevTime = t._props.startTime + t._progressTime
          expect( t._prevTime ).toBe prevTime
          dfr()
        , 200
      it 'should recalc _prevTime play + play regarding delay', (dfr)->
        delay = 200
        t = new Tween delay: delay
        t.play()
        setTimeout ->
          t.pause()
          now = performance.now()
          t.play().pause()
          prevTime = t._props.startTime + t._progressTime - delay
          expect( t._prevTime ).toBe prevTime
          dfr()
        , 200
      it 'should recalc _prevTime playBackward + playBackward', (dfr)->
        t = new Tween
        t.playBackward()
        setTimeout ->
          t.pause()
          now = performance.now()
          t.playBackward().pause()
          prevTime = t._props.endTime - t._progressTime
          expect( t._prevTime ).toBe prevTime
          dfr()
        , 200
      it 'should flip _progressTime if changing direction', (dfr)->
        t = new Tween
        t.play()
        setTimeout ->
          t.pause()
          now = performance.now()
          progressTime = t._progressTime
          t.playBackward().pause()
          expect( t._progressTime ).toBeCloseTo (t._props.repeatTime - progressTime), 5
          dfr()
        , 200
      it 'should flip _progressTime if changing direction #pauseless 1', (dfr)->
        t = new Tween
        t.play()
        setTimeout ->
          now = performance.now()
          progressTime = t._progressTime
          t.playBackward().pause()
          expect( t._progressTime ).toBeCloseTo (t._props.repeatTime - progressTime), 5
          dfr()
        , 200
      it 'should flip _progressTime if changing direction', (dfr)->
        t = new Tween
        t.playBackward()
        setTimeout ->
          t.pause()
          now = performance.now()
          progressTime = t._progressTime
          t.play().pause()
          expect( t._progressTime ).toBeCloseTo (t._props.repeatTime - progressTime), 5
          dfr()
        , 200
      it 'should flip _progressTime if changing direction #pauseless 2', (dfr)->
        t = new Tween
        t.playBackward()
        setTimeout ->
          now = performance.now()
          progressTime = t._progressTime
          t.play().pause()
          expect( t._progressTime ).toBeCloseTo (t._props.repeatTime - progressTime), 5
          dfr()
        , 200

    it 'should recalc startTime', (dfr)->
      duration = 1000; shift = 200
      t = new Tween duration: duration
      t.play()
      setTimeout ->
        t.pause()

        startTime = performance.now() - Math.abs(shift) - t._progressTime
        spyOn t, '_setStartTime'
        t.play(shift)
        expect(Math.abs(startTime - t._setStartTime.calls.argsFor(0)[0] ))
          .not.toBeGreaterThan 5
        dfr()
      , duration/2
    it 'should pass false as second param to _setStartTime', (dfr)->
      duration = 1000; shift = 200
      t = new Tween duration: duration
      t.play()
      setTimeout ->
        t.pause()

        startTime = performance.now() - Math.abs(shift) - t._progressTime
        spyOn t, '_setStartTime'
        t.play(shift)
        expect(t._setStartTime.calls.argsFor(0)[1]).toBe false
        dfr()
      , duration/2
    it 'should recalc startTime regarding speed', (dfr)->
      duration = 1000; shift = 200; speed = .5
      t = new Tween duration: duration, speed: speed
      t.play()
      setTimeout ->
        t.pause()
        startTime = performance.now() - Math.abs(shift) - t._progressTime
        spyOn t, '_setStartTime'
        t.play(shift)
        expect(Math.abs(startTime - t._setStartTime.calls.argsFor(0)[0] ))
          .not.toBeGreaterThan 5
        dfr()
      , duration/2

  describe 'play method ->', ->
    it 'should get the start time', ->
      t = new Tween
      t.play()
      p = t._props
      expect(p.startTime).toBeDefined()
      expect(p.endTime).toBe p.startTime + p.repeatTime
    it 'should set _state to "play"', ->
      t = new Tween
      t.play()
      expect(t._state).toBe 'play'
    it 'should reset _progressTime to 0 if tween ended', ->
      t = new Tween
      t._setStartTime()
      time = t._props.startTime
      t.setProgress(1).play()
      expect(Math.abs( time - t._props.startTime) ).not.toBeGreaterThan 5
    it 'should reset isReversed to false', ->
      t = new Tween
      t._props.isReversed = true
      t.play()
      expect(t._props.isReversed).toBe false
    it 'should call the setStartTime method',->
      t = new Tween
      spyOn t, '_setStartTime'
      t.play()
      expect(t._setStartTime).toHaveBeenCalled()
    it 'should add itself to tweener',->
      t = new Tween
      spyOn tweener, 'add'
      t.play()
      expect(tweener.add).toHaveBeenCalled()
    it 'should receive progress time',->
      t = new Tween
      t._setStartTime()
      time = t._props.startTime
      shift = 200
      t.play( shift )
      startTime = time - shift
      expect( startTime - t._props.startTime ).not.toBeGreaterThan 5
    it 'should treat negative progress time as positive',->
      t     = new Tween
      t._setStartTime()
      time  = t._props.startTime
      shift = -200
      t.play( shift )
      expect( Math.abs(t._props.startTime - (time - Math.abs(shift))) ).not.toBeGreaterThan 5
    it 'should encount time progress',->
      duration = 1000
      t = new Tween duration: duration
      progress = .5
      t.setProgress( progress - .1 )
      t.setProgress( progress )
      t.play()
      start = performance.now() - progress*t._props.repeatTime
      expect(Math.abs( t._props.startTime - start )).not.toBeGreaterThan 5
    it 'should return immediately if already playing',->
      t = new Tween duration: 1000
      t.play()
      spyOn t, '_subPlay'
      result = t.play()
      expect(t._subPlay).not.toHaveBeenCalled()
      expect(result).toBe t
    it 'should run if already playing but ended', (dfr)->
      duration = 50
      t = new Tween duration: duration
      t.play()
      setTimeout ->
        spyOn t, '_subPlay'
        t.play()
        expect(t._subPlay).toHaveBeenCalled()
        dfr()
      , 2*duration
    it 'should call _subPlay with "play" string', ()->
      duration = 50
      t = new Tween duration: duration
      spyOn t, '_subPlay'
      t.play()
      expect(t._subPlay).toHaveBeenCalledWith(0, 'play')


  describe 'resume method ->', ->
    it 'should call play if prev state is play', ->
      t = new Tween
      t.play()
      t.pause()

      spyOn t, 'play'

      shift = 200
      t.resume( shift )

      expect(t.play).toHaveBeenCalledWith( shift )

    it 'should call play if prev state is reverse', ->
      t = new Tween
      t.playBackward()
      t.pause()

      spyOn t, 'playBackward'

      shift = 200
      t.resume( shift )

      expect(t.playBackward).toHaveBeenCalledWith( shift )

    it 'should do nothing if state is not pause', ->
      t = new Tween
      t.playBackward()
      t.stop()

      spyOn t, 'play'
      spyOn t, 'playBackward'

      result = t.resume()
      expect(t.play).not.toHaveBeenCalled()
      expect(t.playBackward).not.toHaveBeenCalled()
      expect(result).toBe t

    it 'should always return this', ->
      t = new Tween
      t.playBackward()
      t.pause()

      expect(t.resume()).toBe t


  describe 'playBackward method ->', ->
    it 'should set _state to "reverse"',->
      t = new Tween
      t.playBackward()
      expect(t._state).toBe 'reverse'
    it 'should return self',->
      t = new Tween
      obj = t.playBackward(200)
      expect(obj).toBe t
    it 'should overwrite play state',->
      t = new Tween
      t.playBackward(200)
      expect(t._prevState).toBe 'stop'
      expect(t._state).toBe 'reverse'
    it 'should recalc _progressTime',->
      duration = 1000
      t = new Tween duration: duration
      t.setProgress(.75)
      progress = t._progressTime
      t.playBackward()
      expect(t._progressTime).toBe progress
    it 'should recalc _progressTime if previous state was "play"',->
      duration = 1000
      t = new Tween duration: duration
      t.setProgress(.75)
      progress = t._progressTime
      t .play()
        .playBackward()
      expect(t._progressTime).toBe t._props.repeatTime - progress
    it 'should return immediately if already reversing',->
      t = new Tween duration: 1000
      t.playBackward()
      spyOn t, '_subPlay'
      result = t.playBackward()
      expect(t._subPlay).not.toHaveBeenCalled()
      expect(result).toBe t
    it 'should run if already reversing but ended', (dfr)->
      duration = 50
      t = new Tween duration: duration
      t.playBackward()
      setTimeout ->
        spyOn t, '_subPlay'
        t.playBackward()
        expect(t._subPlay).toHaveBeenCalled()
        dfr()
      , 2*duration
    it 'should call _subPlay with "reverse" string', ()->
      duration = 50
      t = new Tween duration: duration
      spyOn t, '_subPlay'
      t.playBackward()
      expect(t._subPlay).toHaveBeenCalledWith(0, 'reverse')

  describe 'pause method ->', ->
    it 'should call t.remove method with self',->
      tweener.removeAll()
      timeline = new Tween duration: 2000
      timeline.play()
      spyOn timeline, '_removeFromTweener'
      timeline.pause()
      expect(timeline._removeFromTweener).toHaveBeenCalled()
    it 'should set _state to "pause"',->
      t = new Tween
      t.pause()
    it 'should remove immediately if paused',->
      t = new Tween
      t.play().pause()
      spyOn t, '_removeFromTweener'
      result = t.pause()
      expect(t._removeFromTweener).not.toHaveBeenCalled()
      expect(result).toBe t

  describe 'stop method ->', ->
    it 'should call reset method',->
      tweener.removeAll()
      timeline = new Tween duration: 2000
      timeline.play()
      spyOn timeline, 'reset'
      timeline.stop()
      expect(timeline.reset).toHaveBeenCalled()
    it 'should reset progress to 0 if played',->
      tweener.removeAll()
      tw = new Tween duration: 2000
      tw.play()
      spyOn tw, 'setProgress'
      tw.stop()
      expect(tw.setProgress).toHaveBeenCalledWith 0
    it 'should reset progress to 1 if playedBackward',->
      tweener.removeAll()
      tw = new Tween duration: 2000
      tw.playBackward()
      spyOn tw, 'setProgress'
      tw.stop()
      expect(tw.setProgress).toHaveBeenCalledWith 1
    it 'should receive progress to set',->
      tweener.removeAll()
      tw = new Tween duration: 2000
      tw.playBackward()
      spyOn tw, 'setProgress'
      tw.stop(.5)
      expect(tw.setProgress).toHaveBeenCalledWith .5
    it 'should return immediately if already stopped',->
      t = new Tween
      t.stop()
      t._props.isReversed = true
      result = t.stop()
      expect(t._props.isReversed).toBe true
      expect(result).toBe t

    it 'should set `_wasUknownUpdate` to undefined',->
      t = new Tween isIt: 1
      t.play()
      # spy on reset just to make it not working because
      # it resets _wasUknowUpdate also, but we need to test the
      # stop method itself
      spyOn t, 'reset'
      # same for the setProgress
      spyOn t, 'setProgress'
      
      t._wasUknownUpdate = true
      t.stop()
      expect(t._wasUknownUpdate).not.toBeDefined()

  describe 'reset method ->', ->
    it 'should call removeFromTweener method with self',->
      tweener.removeAll()
      timeline = new Tween duration: 2000
      timeline.play()
      spyOn timeline, '_removeFromTweener'
      timeline.reset()
      expect(timeline._removeFromTweener).toHaveBeenCalled()
    it 'should reset _prevTime to undefined',->
      tweener.removeAll()
      tw = new Tween duration: 2000
      tw.play()
      tw.reset()
      expect(tw._prevTime).toBe undefined
    it 'should set _state to "stop"',->
      t = new Tween
      t.reset()
      expect(t._state).toBe 'stop'
    it 'should set isReversed to false',->
      t = new Tween
      t._props.isReversed = true
      t.play().reset()
      expect(t._props.isReversed).toBe false
    it 'should set prevYoyo to false',->
      t = new Tween
      t._prevYoyo = true
      t.play().reset()
      expect(t._prevYoyo).toBe undefined
    it 'should set _isCompleted to false',->
      t = new Tween
      t._isCompleted = true
      t.play().reset()
      expect(t._isCompleted).toBe false
    it 'should set _isStarted to false',->
      t = new Tween
      t._isStarted = true
      t.play().reset()
      expect(t._isStarted).toBe false
    it 'should set _isFirstUpdate to false',->
      t = new Tween
      t._isFirstUpdate = true
      t.play().reset()
      expect(t._isFirstUpdate).toBe false
    it 'should set _progressTime to 0',->
      t = new Tween
      t.play();
      t._progressTime = 20;
      t.reset();
      expect(t._progressTime).toBe 0
    # nope
    # it 'should set _startTime to undefined',->
    #   t = new Tween
    #   t.play();
    #   t._props.startTime = 20;
    #   t.reset();
    #   expect(t._props.startTime).toBe undefined
    it 'should set _wasUknownUpdate to undefined',->
      t = new Tween
      t.play();
      t._wasUknownUpdate = 20;
      t.reset();
      expect(t._wasUknownUpdate).toBe undefined
    it 'should return this', ->
      tw = new mojs.Tween
      result = tw.reset()
      expect(result).toBe tw

  describe 'replay method ->', ->
    it 'should call reset and play methods', ->
      t = new Tween
      spyOn(t, 'reset').and.callThrough()
      spyOn(t, 'play').and.callThrough()
      t.replay( 200 )
      expect(t.reset).toHaveBeenCalled()
      expect(t.play).toHaveBeenCalledWith 200
    it 'should return this', ->
      t = new Tween
      result = t.replay( 200 )
      expect(result).toBe t
    it 'should fallback to 0 shift', ->
      t = new Tween
      spyOn(t, 'play').and.callThrough()
      t.replay()
      expect(t.play).toHaveBeenCalledWith 0

  describe 'replayBackward method ->', ->
    it 'should call reset and playBackward methods', ->
      t = new Tween
      spyOn(t, 'reset').and.callThrough()
      spyOn(t, 'playBackward').and.callThrough()
      t.replayBackward( 200 )
      expect(t.reset).toHaveBeenCalled()
      expect(t.playBackward).toHaveBeenCalledWith 200
    it 'should return this', ->
      t = new Tween
      result = t.replayBackward( 200 )
      expect(result).toBe t
    it 'should fallback to 0 shift', ->
      t = new Tween
      spyOn(t, 'playBackward').and.callThrough()
      t.replayBackward()
      expect(t.playBackward).toHaveBeenCalledWith 0

  describe 'setSpeed method ->', ->
    it 'should return this', ->
      tw = new Tween
      expect(tw.setSpeed(.5)).toBe tw
    it 'should set speed', ->
      tw = new Tween
      speed = 3.2
      tw.setSpeed speed
      expect(tw._props.speed).toBe speed
    it 'should call _setResume time if playing', ->
      tw = new Tween
      speed = 3.2
      tw._setPlaybackState 'play'
      spyOn tw, '_setResumeTime'
      tw.setSpeed speed
      expect(tw._setResumeTime).toHaveBeenCalledWith 'play'
    it 'should call _setResume time if playingBackward', ->
      tw = new Tween
      speed = 3.2
      tw._setPlaybackState 'reverse'
      spyOn tw, '_setResumeTime'
      tw.setSpeed speed
      expect(tw._setResumeTime).toHaveBeenCalledWith 'reverse'
    it 'should not call _setResume time if stopped', ->
      tw = new Tween
      speed = 3.2
      spyOn tw, '_setResumeTime'
      tw.setSpeed speed
      expect(tw._setResumeTime).not.toHaveBeenCalledWith 'stop'
    it 'should not call _setResume time if paused', ->
      tw = new Tween
      speed = 3.2
      spyOn tw, '_setResumeTime'
      tw.setSpeed speed
      expect(tw._setResumeTime).not.toHaveBeenCalledWith 'pause'
    
  describe '_setPlaybackState method ->', ->
    it 'should set playback state', ->
      t = new Tween
      t._setPlaybackState 'play'
      expect(t._state).toBe 'play'
    it 'should track previous playback state', ->
      t = new Tween
      t._setPlaybackState 'play'
      t._setPlaybackState 'pause'
      expect(t._prevState).toBe 'play'
      expect(t._state).toBe 'pause'
    describe 'onPlaybackStart / play callback ->', ->
      it 'should call _playbackStart method if play', ()->
        duration = 50
        t = new Tween duration: duration
        spyOn t, '_playbackStart'
        t._setPlaybackState 'play'
        expect(t._playbackStart).toHaveBeenCalled()
      it 'should call _playbackStart method if play', ()->
        duration = 50
        t = new Tween duration: duration
        t._setPlaybackState 'play'
        t._setPlaybackState 'pause'
        spyOn t, '_playbackStart'
        t._setPlaybackState 'play'
        expect(t._playbackStart).toHaveBeenCalled()
      it 'should not call _playbackStart method if already play', ()->
        duration = 50
        t = new Tween duration: duration
        t._setPlaybackState 'play'
        spyOn t, '_playbackStart'
        t._setPlaybackState 'play'
        expect(t._playbackStart).not.toHaveBeenCalled()
      it 'should not call _playbackStart method if already reverse', ()->
        duration = 50
        t = new Tween duration: duration
        t._setPlaybackState 'reverse'
        spyOn t, '_playbackStart'
        t._setPlaybackState 'play'
        expect(t._playbackStart).not.toHaveBeenCalled()

    describe 'onPlaybackStart / reverse callback ->', ->
      it 'should call _playbackStart method if reverse', ()->
        duration = 50
        t = new Tween duration: duration
        spyOn t, '_playbackStart'
        t._setPlaybackState 'reverse'
        expect(t._playbackStart).toHaveBeenCalled()
      it 'should call _playbackStart method if reverse', ()->
        duration = 50
        t = new Tween duration: duration
        t._setPlaybackState 'reverse'
        t._setPlaybackState 'pause'
        spyOn t, '_playbackStart'
        t._setPlaybackState 'reverse'
        expect(t._playbackStart).toHaveBeenCalled()
      it 'should not call _playbackStart method if already reverse', ()->
        duration = 50
        t = new Tween duration: duration
        t._setPlaybackState 'reverse'
        spyOn t, '_playbackStart'
        t._setPlaybackState 'reverse'
        expect(t._playbackStart).not.toHaveBeenCalled()
      it 'should not call _playbackStart method if already play', ()->
        duration = 50
        t = new Tween duration: duration
        t._setPlaybackState 'play'
        spyOn t, '_playbackStart'
        t._setPlaybackState 'reverse'
        expect(t._playbackStart).not.toHaveBeenCalled()

    describe 'onPlaybackPause / pause callback ->', ->
      it 'should call _playbackPause method if pause', ()->
        duration = 50
        t = new Tween duration: duration
        t._setPlaybackState 'play'
        spyOn t, '_playbackPause'
        t._setPlaybackState 'pause'
        expect(t._playbackPause).toHaveBeenCalled()
      it 'should call _playbackPause method if play', ()->
        duration = 50
        t = new Tween duration: duration
        t._setPlaybackState 'play'
        spyOn t, '_playbackPause'
        t._setPlaybackState 'pause'
        expect(t._playbackPause).toHaveBeenCalled()
      it 'should call _playbackPause method if already was reverse', ()->
        duration = 50
        t = new Tween duration: duration
        t._setPlaybackState 'reverse'
        spyOn t, '_playbackPause'
        t._setPlaybackState 'pause'
        expect(t._playbackPause).toHaveBeenCalled()
      it 'should not call _playbackPause method if already stopped', ()->
        duration = 50
        t = new Tween duration: duration
        spyOn t, '_playbackPause'
        t._setPlaybackState 'pause'
        expect(t._playbackPause).not.toHaveBeenCalled()
      it 'should not call _playbackPause method if already paused', ()->
        duration = 50
        t = new Tween duration: duration
        t._setPlaybackState 'play'
        t._setPlaybackState 'pause'
        spyOn t, '_playbackPause'
        t._setPlaybackState 'pause'
        expect(t._playbackPause).not.toHaveBeenCalled()
    describe 'onPlaybackStop / stop callback ->', ->
      it 'should call _playbackStop method if stop', ()->
        duration = 50
        t = new Tween duration: duration
        t._setPlaybackState 'play'
        spyOn t, '_playbackStop'
        t._setPlaybackState 'stop'
        expect(t._playbackStop).toHaveBeenCalled()
      it 'should call _playbackStop method if stop', ()->
        duration = 50
        t = new Tween duration: duration
        t._setPlaybackState 'play'
        spyOn t, '_playbackStop'
        t._setPlaybackState 'stop'
        expect(t._playbackStop).toHaveBeenCalled()
      it 'should call _playbackStop method if was play', ()->
        duration = 50
        t = new Tween duration: duration
        t._setPlaybackState 'play'
        spyOn t, '_playbackStop'
        t._setPlaybackState 'stop'
        expect(t._playbackStop).toHaveBeenCalled()
      it 'should call _playbackStop method if already paused', ()->
        duration = 50
        t = new Tween duration: duration
        t._setPlaybackState 'play'
        t._setPlaybackState 'pause'
        spyOn t, '_playbackStop'
        t._setPlaybackState 'stop'
        expect(t._playbackStop).toHaveBeenCalled()
      it 'should not call _playbackStop method if already stopped', ()->
        duration = 50
        t = new Tween duration: duration
        spyOn t, '_playbackStop'
        t._setPlaybackState 'stop'
        expect(t._playbackStop).not.toHaveBeenCalled()

  describe '_removeFromTweener method ->', ->
    it 'should call tweener.remove method with self',->
      tweener.removeAll()
      timeline = new Tween duration: 2000
      timeline.play()
      timeline._removeFromTweener()
      expect(tweener.tweens.length).toBe 0

  describe '_complete method ->', ->
    it 'should call onComplete callback', ->
      isCalled = null
      fun = -> isCalled = true
      tw = new Tween onComplete: fun
      tw._complete()
      expect(isCalled).toBe true
    
    it 'should set isCompleted to true', ->
      tw = new Tween
      tw._complete()
      expect(tw._isCompleted).toBe true
    it 'should set isStarted flag to false', ->
      tw = new Tween
      tw._complete()
      expect(tw._isStarted).toBe false
    it 'should set isFirstUpdate flag to false', ->
      tw = new Tween
      tw._complete()
      expect(tw._isFirstUpdate).toBe false
    it 'should set _prevYoyo to undefined', ->
      tw = new Tween
      tw._prevYoyo = true;
      tw._complete()
      expect(tw._prevYoyo).toBe undefined

  describe '_start method ->', ->
    it 'should call onStart callback', ->
      isCalled = null
      fun = -> isCalled = true
      tw = new Tween onStart: fun
      tw._start()
      expect(isCalled).toBe true
    it 'should set isStarted to true', ->
      tw = new Tween
      tw._start()
      expect(tw._isStarted).toBe true
    it 'should set isCompleted flag to false', ->
      tw = new Tween
      tw._start()
      expect(tw._isCompleted).toBe false
    it 'should be called just once', ->
      tw = new Tween
      tw._start()
      tw._isCompleted = true
      tw._start()
      expect(tw._isCompleted).toBe true

  describe '_playbackStart method ->', ->
    it 'should call onPlaybackStart callback', ->
      isCalled = null
      fun = -> isCalled = true
      tw = new Tween onPlaybackStart: fun
      tw._playbackStart()
      expect(isCalled).toBe true
    it 'should call onPlaybackStart callback with callbacksContext', ->
      isRightScrope = null
      context = {}
      fun = -> isRightScrope = ( this is context )
      tw = new Tween
        callbacksContext: context
        onPlaybackStart: fun
      tw._playbackStart()
      expect(isRightScrope).toBe true
    it 'should not throw if onPlaybackStart not set', ->
      tw = new Tween
      fun = -> tw._playbackStart()
      expect(fun).not.toThrow()

  describe '_playbackPause method ->', ->
    it 'should call onPlaybackPause callback', ->
      isCalled = null
      fun = -> isCalled = true
      tw = new Tween onPlaybackPause: fun
      tw._playbackPause()
      expect(isCalled).toBe true
    it 'should call onPlaybackPause callback with callbacksContext', ->
      isRightScrope = null
      context = {}
      fun = -> isRightScrope = ( this is context )
      tw = new Tween
        callbacksContext: context
        onPlaybackPause: fun
      tw._playbackPause()
      expect(isRightScrope).toBe true
    it 'should not throw if onPlaybackPause not set', ->
      tw = new Tween
      fun = -> tw._playbackPause()
      expect(fun).not.toThrow()

  describe '_playbackStop method ->', ->
    it 'should call onPlaybackStop callback', ->
      isCalled = null
      fun = -> isCalled = true
      tw = new Tween onPlaybackStop: fun
      tw._playbackStop()
      expect(isCalled).toBe true
    it 'should call onPlaybackStop callback with callbacksContext', ->
      isRightScrope = null
      context = {}
      fun = -> isRightScrope = ( this is context )
      tw = new Tween
        callbacksContext: context
        onPlaybackStop: fun
      tw._playbackStop()
      expect(isRightScrope).toBe true
    it 'should not throw if onPlaybackStop not set', ->
      tw = new Tween
      fun = -> tw._playbackStop()
      expect(fun).not.toThrow()

  describe '_playbackComplete method ->', ->
    it 'should call onPlaybackComplete callback', ->
      isCalled = null
      fun = -> isCalled = true
      tw = new Tween onPlaybackComplete: fun
      tw._playbackComplete()
      expect(isCalled).toBe true
    it 'should call onPlaybackComplete callback with callbacksContext', ->
      isRightScrope = null
      context = {}
      fun = -> isRightScrope = ( this is context )
      tw = new Tween
        callbacksContext: context
        onPlaybackComplete: fun
      tw._playbackComplete()
      expect(isRightScrope).toBe true
    it 'should not throw if onPlaybackComplete not set', ->
      tw = new Tween
      fun = -> tw._playbackComplete()
      expect(fun).not.toThrow()

  describe '_repeatComplete method ->', ->
    it 'should call onRepeatComplete callback', ->
      isCalled = null
      fun = -> isCalled = true
      tw = new Tween onRepeatComplete: fun
      tw._repeatComplete()
      expect(isCalled).toBe true

    it 'should call onRepeatComplete callback only once', ->
      cnt = 0
      fun = -> cnt++
      tw = new Tween onRepeatComplete: fun
      tw._repeatComplete()
      tw._repeatComplete()
      expect(cnt).toBe 1
    it 'should set isRepeatCompleted to true', ->
      tw = new Tween
      tw._repeatComplete()
      expect(tw._isRepeatCompleted).toBe true

  describe '_repeatStart method ->', ->
    it 'should call onRepeatStart callback', ->
      isCalled = null
      fun = -> isCalled = true
      tw = new Tween onRepeatStart: fun
      tw._repeatStart()
      expect(isCalled).toBe true

    it 'should call onRepeatStart callback only once', ->
      cnt = 0
      fun = -> cnt++
      tw = new Tween onRepeatStart: fun
      tw._repeatStart()
      tw._repeatStart()
      expect(cnt).toBe 1
    it 'should set isRepeatStart to true', ->
      tw = new Tween
      tw._repeatStart()
      expect(tw._isRepeatStart).toBe true

  describe '_firstUpdate method ->', ->
    it 'should call onFirstUpdate callback', ->
      isCalled = null
      fun = -> isCalled = true
      tw = new Tween onFirstUpdate: fun
      tw._firstUpdate()
      expect(isCalled).toBe true
    it 'should call onFirstUpdate callback only once', ->
      cnt = 0
      fun = -> cnt++
      tw = new Tween onFirstUpdate: fun
      tw._firstUpdate()
      tw._firstUpdate()
      expect(cnt).toBe 1

  describe 'callbacks order || forward ->', ->
    it 'should have the right order when normal direction || start', ->
      order = []
      tw = new Tween
        onStart:->          order.push( 'start' )
        onRepeatStart:->    order.push( 'repeat-start' )
        onFirstUpdate:->    order.push( 'first-update' )
        onUpdate:->         order.push( 'update' )
        onRepeatComplete:-> order.push( 'repeat-complete' )
        onComplete:->       order.push( 'complete' )

      tw._setStartTime()

      tw._update tw._props.startTime
      tw._update tw._props.startTime + 10

      expect(order[0]).toBe 'start'
      expect(order[1]).toBe 'repeat-start'
      expect(order[2]).toBe 'first-update'
      expect(order[3]).toBe 'update'
      expect(order[4]).toBe undefined

    it 'should have the right order when normal direction || start #2', ->
      order = []; isReact = false; duration = 500
      tw = new Tween
        duration:           duration
        onStart:->          isReact && order.push( 'start' )
        onRepeatStart:->    isReact && order.push( 'repeat-start' )
        onFirstUpdate:->    isReact && order.push( 'first-update' )
        onUpdate:->         isReact && order.push( 'update' )
        onRepeatComplete:-> isReact && order.push( 'repeat-complete' )
        onComplete:->       isReact && order.push( 'complete' )

      tw._setStartTime()

      tw._update tw._props.startTime
      tw._update tw._props.startTime + duration/2
      tw._update tw._props.startTime + duration/2 + 10
      tw._update tw._props.startTime + duration/2 - 10
      tw._update tw._props.startTime
      
      isReact = true
      tw._update tw._props.startTime + duration/2

      expect(order[0]).toBe 'start'
      expect(order[1]).toBe 'repeat-start'
      expect(order[2]).toBe 'first-update'
      expect(order[3]).toBe 'update'

    it 'should have the right order when normal direction || end', ->
      order = []; duration = 500
      tw = new Tween
        duration: duration
        onStart:-> order.push( 'start' )
        onRepeatStart:-> order.push( 'repeat-start' )
        onFirstUpdate:-> order.push( 'first-update' )
        onUpdate:-> order.push( 'update' )
        onRepeatComplete:-> order.push( 'repeat-complete' )
        onComplete:-> order.push( 'complete' )

      tw._setStartTime()

      tw._update tw._props.startTime + 10
      tw._update tw._props.startTime + duration/2
      tw._update tw._props.startTime + duration

      expect(order[0]).toBe 'start'
      expect(order[1]).toBe 'repeat-start'
      expect(order[2]).toBe 'first-update'
      expect(order[3]).toBe 'update'
      expect(order[4]).toBe 'update'
      expect(order[5]).toBe 'repeat-complete'
      expect(order[6]).toBe 'complete'
      expect(order[7]).toBe undefined

    it 'should have the right order when normal direction || repeat end', ->
      order = []; duration = 500
      tw = new Tween
        repeat: 1
        duration: duration
        onStart:->          order.push( 'start' )
        onRepeatStart:->    order.push( 'repeat-start' )
        onFirstUpdate:->    order.push( 'first-update' )
        onUpdate:->         order.push( 'update' )
        onRepeatComplete:-> order.push( 'repeat-complete' )
        onComplete:->       order.push( 'complete' )

      tw._setStartTime()

      tw._update tw._props.startTime + 10
      tw._update tw._props.startTime + duration/2
      tw._update tw._props.startTime + duration + 10
      tw._update tw._props.startTime + duration + duration/2
      tw._update tw._props.startTime + duration + duration

      expect(order[0]).toBe 'start'
      expect(order[1]).toBe 'repeat-start'
      expect(order[2]).toBe 'first-update'
      expect(order[3]).toBe 'update'
      expect(order[4]).toBe 'repeat-complete'
      expect(order[5]).toBe 'repeat-start'
      expect(order[6]).toBe 'update'
      expect(order[7]).toBe 'update'
      expect(order[8]).toBe 'update'
      expect(order[9]).toBe 'repeat-complete'
      expect(order[10]).toBe 'complete'
      expect(order[11]).toBe undefined

    it 'should have the right order when normal direction || end + delay', ->
      order = []; duration = 500; delay = 200
      tw = new Tween
        repeat:   1
        duration: duration
        delay:    delay
        onStart:->          order.push( 'start' )
        onRepeatStart:->    order.push( 'repeat-start' )
        onFirstUpdate:->    order.push( 'first-update' )
        onUpdate:->         order.push( 'update' )
        onRepeatComplete:-> order.push( 'repeat-complete' )
        onComplete:->       order.push( 'complete' )

      tw._setStartTime()

      tw._update tw._props.startTime + 10
      tw._update tw._props.startTime + duration/2
      tw._update tw._props.startTime + duration + delay/2
      tw._update tw._props.startTime + duration + delay + 10
      tw._update tw._props.startTime + duration + delay + duration/2
      tw._update tw._props.startTime + duration + delay + duration

      expect(order[0]).toBe 'start'
      expect(order[1]).toBe 'repeat-start'
      expect(order[2]).toBe 'first-update'
      expect(order[3]).toBe 'update'
      expect(order[4]).toBe 'update'
      expect(order[5]).toBe 'repeat-complete'
      expect(order[6]).toBe 'repeat-start'
      expect(order[7]).toBe 'update'
      expect(order[8]).toBe 'update'
      expect(order[9]).toBe 'update'
      expect(order[10]).toBe 'repeat-complete'
      expect(order[11]).toBe 'complete'
      expect(order[12]).toBe undefined

  describe 'callbacks order || backward ->', ->
    it 'should have the right order when reverse direction || start', ->
      order = []; duration = 500
      tw = new Tween
        duration: duration
        onStart:->          order.push( 'start' )
        onRepeatStart:->    order.push( 'repeat-start' )
        onFirstUpdate:->    order.push( 'first-update' )
        onUpdate:->         order.push( 'update' )
        onRepeatComplete:-> order.push( 'repeat-complete' )
        onComplete:->       order.push( 'complete' )

      tw._setStartTime()

      tw._update tw._props.startTime + duration - duration/4
      tw._update tw._props.startTime + duration/2

      expect(order[0]).toBe 'complete'
      expect(order[1]).toBe 'repeat-complete'
      expect(order[2]).toBe 'first-update'
      expect(order[3]).toBe 'update'
      expect(order[4]).toBe undefined
      

    it 'should have the right order when reverse direction || end', ->
      order = []; duration = 500
      tw = new Tween
        duration:           duration
        onStart:->          order.push( 'start' )
        onRepeatStart:->    order.push( 'repeat-start' )
        onFirstUpdate:->    order.push( 'first-update' )
        onUpdate:->         order.push( 'update' )
        onRepeatComplete:-> order.push( 'repeat-complete' )
        onComplete:->       order.push( 'complete' )

      tw._setStartTime()

      tw._update tw._props.startTime + duration
      tw._update tw._props.startTime + duration/2
      tw._update tw._props.startTime + 10
      tw._update tw._props.startTime

      expect(order[0]).toBe 'complete'
      expect(order[1]).toBe 'repeat-complete'
      expect(order[2]).toBe 'first-update'
      expect(order[3]).toBe 'update'
      expect(order[4]).toBe 'update'
      expect(order[5]).toBe 'update'
      expect(order[6]).toBe 'repeat-start'
      expect(order[7]).toBe 'start'
      expect(order[8]).toBe undefined

    it 'should have the right order when reverse direction || repeat end', ->
      order = []; duration = 500
      tw = new Tween
        repeat:             1
        duration:           duration
        onStart:->          order.push( 'start' )
        onRepeatStart:->    order.push( 'repeat-start' )
        onFirstUpdate:->    order.push( 'first-update' )
        onUpdate:->         order.push( 'update' )
        onRepeatComplete:-> order.push( 'repeat-complete' )
        onComplete:->       order.push( 'complete' )

      tw._setStartTime()

      tw._update tw._props.startTime + duration + duration
      tw._update tw._props.startTime + duration + duration/2
      tw._update tw._props.startTime + duration + 10
      tw._update tw._props.startTime + duration/2
      tw._update tw._props.startTime + 10
      tw._update tw._props.startTime

      expect(order[0]).toBe 'complete'
      expect(order[1]).toBe 'repeat-complete'
      expect(order[2]).toBe 'first-update'
      expect(order[3]).toBe 'update'
      expect(order[4]).toBe 'update'
      expect(order[5]).toBe 'repeat-start'
      expect(order[6]).toBe 'repeat-complete'
      expect(order[7]).toBe 'update'
      expect(order[8]).toBe 'update'
      expect(order[9]).toBe 'update'
      expect(order[10]).toBe 'repeat-start'
      expect(order[11]).toBe 'start'
      expect(order[12]).toBe undefined
      
    it 'should have the right order when reverse direction || end + delay', ->
      order = []; duration = 500; delay = 200
      tw = new Tween
        repeat:             1
        duration:           duration
        delay:              delay
        onStart:->          order.push( 'start' )
        onRepeatStart:->    order.push( 'repeat-start' )
        onFirstUpdate:->    order.push( 'first-update' )
        onUpdate:->         order.push( 'update' )
        onRepeatComplete:-> order.push( 'repeat-complete' )
        onComplete:->       order.push( 'complete' )

      tw._setStartTime()

      tw._update tw._props.startTime + duration + delay + duration
      tw._update tw._props.startTime + duration + delay + duration/2
      tw._update tw._props.startTime + duration + delay + 10
      tw._update tw._props.startTime + duration + delay/2
      tw._update tw._props.startTime + duration/2
      tw._update tw._props.startTime + 10
      tw._update tw._props.startTime

      expect(order[0]).toBe 'complete'
      expect(order[1]).toBe 'repeat-complete'
      expect(order[2]).toBe 'first-update'
      expect(order[3]).toBe 'update'
      expect(order[4]).toBe 'update'
      expect(order[5]).toBe 'update'
      expect(order[6]).toBe 'repeat-start'
      expect(order[7]).toBe 'repeat-complete'
      expect(order[8]).toBe 'update'
      expect(order[9]).toBe 'update'
      expect(order[10]).toBe 'update'
      expect(order[11]).toBe 'repeat-start'
      expect(order[12]).toBe 'start'
      expect(order[13]).toBe undefined

    it 'should have the right order when reverse direction || end + delay #2', ->
      order = []; duration = 500; delay = 200
      tw = new Tween
        repeat:             1
        duration:           duration
        delay:              delay
        onStart:->          order.push( 'start' )
        onRepeatStart:->    order.push( 'repeat-start' )
        onFirstUpdate:->    order.push( 'first-update' )
        onUpdate:->         order.push( 'update' )
        onRepeatComplete:-> order.push( 'repeat-complete' )
        onComplete:->       order.push( 'complete' )

      tw._setStartTime()

      tw._update tw._props.startTime + duration + delay + duration
      tw._update tw._props.startTime + duration + delay + duration/2
      tw._update tw._props.startTime + duration + delay + 10
      tw._update tw._props.startTime + duration + delay/2
      tw._update tw._props.startTime + duration/2
      tw._update tw._props.startTime + 10
      tw._update tw._props.startTime - 10

      expect(order[0]).toBe 'complete'
      expect(order[1]).toBe 'repeat-complete'
      expect(order[2]).toBe 'first-update'
      expect(order[3]).toBe 'update'
      expect(order[4]).toBe 'update'
      expect(order[5]).toBe 'update'
      expect(order[6]).toBe 'repeat-start'
      expect(order[7]).toBe 'repeat-complete'
      expect(order[8]).toBe 'update'
      expect(order[9]).toBe 'update'
      expect(order[10]).toBe 'update'
      expect(order[11]).toBe 'repeat-start'
      expect(order[12]).toBe 'start'
      expect(order[13]).toBe undefined

    it 'should have the right order when reverse direction || end + delay #3', ->
      order = []; duration = 500; delay = 200
      isReact = false
      tw = new Tween
        repeat:             1
        duration:           duration
        delay:              delay
        onStart:->          isReact && order.push( 'start' )
        onRepeatStart:->    isReact && order.push( 'repeat-start' )
        onFirstUpdate:->    isReact && order.push( 'first-update' )
        onUpdate:->         isReact && order.push( 'update' )
        onRepeatComplete:-> isReact && order.push( 'repeat-complete' )
        onComplete:->       isReact && order.push( 'complete' )

      tw._setStartTime()

      tw._update tw._props.startTime
      tw._update tw._props.startTime + duration/2
      tw._update tw._props.startTime + duration
      tw._update tw._props.startTime + duration + delay
      tw._update tw._props.startTime + duration + delay + duration/2
      tw._update tw._props.startTime + duration + delay + duration + 10

      isReact = true

      tw._update tw._props.startTime + duration + delay + duration/2
      tw._update tw._props.startTime + duration + delay + 10
      tw._update tw._props.startTime + duration + delay/2
      tw._update tw._props.startTime + duration/2
      tw._update tw._props.startTime + 10
      tw._update tw._props.startTime - 10

      expect(order[0]).toBe 'complete'
      expect(order[1]).toBe 'repeat-complete'
      expect(order[2]).toBe 'first-update'
      expect(order[3]).toBe 'update'
      expect(order[4]).toBe 'update'
      expect(order[5]).toBe 'update'
      expect(order[6]).toBe 'repeat-start'
      expect(order[7]).toBe 'repeat-complete'
      expect(order[8]).toBe 'update'
      expect(order[9]).toBe 'update'
      expect(order[10]).toBe 'update'
      expect(order[11]).toBe 'repeat-start'
      expect(order[12]).toBe 'start'
      expect(order[13]).toBe undefined

  it 'should have the right order when reverse direction || end + delay #3', ->
    order = []; duration = 500; delay = 200
    isReact = false
    tw = new Tween
      duration:           duration
      onStart:->          isReact && order.push( 'start' )
      onRepeatStart:->    isReact && order.push( 'repeat-start' )
      onFirstUpdate:->    isReact && order.push( 'first-update' )
      onUpdate:->         isReact && order.push( 'update' )
      onRepeatComplete:-> isReact && order.push( 'repeat-complete' )
      onComplete:->       isReact && order.push( 'complete' )

    tw._setStartTime()

    tw._update tw._props.startTime
    tw._update tw._props.startTime + duration/2
    tw._update tw._props.startTime + duration

    isReact = true
    tw._update tw._props.startTime + duration/2
    tw._update tw._props.startTime - 10

    expect(order[0]).toBe 'complete'
    expect(order[1]).toBe 'repeat-complete'
    expect(order[2]).toBe 'first-update'
    expect(order[3]).toBe 'update'
    expect(order[4]).toBe 'update'
    expect(order[5]).toBe 'repeat-start'
    expect(order[6]).toBe 'start'
    expect(order[7]).toBe undefined

  describe 'negative delay', ->
    it 'should save negative delay to _negativeShift property', ->
      tw = new Tween
        delay: -200

      expect(tw._negativeShift).toBe -200

    it 'should set negative delay to 0', ->
      tw = new Tween delay: -200

      expect(tw._negativeShift).toBe -200
      expect(tw._props.delay).toBe 0

    it 'should calculate startTime regarding negative delay', ->
      delay = -200
      tw = new Tween delay: delay

      time = performance.now()
      tw._setStartTime(time)

      expect(tw._props.startTime).toBe time-200

  describe 'setProgress method ->', ->
    it 'should call _setStartTime if there is no this._props.startTime', ->
      t = new Tween
      spyOn t, '_setStartTime'
      t.setProgress .5
      expect(t._setStartTime).toHaveBeenCalled()
    it 'should return self', ->
      t = new Tween
      result = t.setProgress .5
      expect(result).toBe t
    it 'should call self _update', ->
      duration = 500; progress = .75
      t   = new Tween duration: duration
      # t.add new Tween duration: duration
      spyOn t, '_update'
      t.setProgress progress
      expect(t._update).toHaveBeenCalledWith t._props.startTime + (progress*duration)
    it 'should not set the progress less then 0', ->
      delay = 5000
      t   = new Tween delay: delay
      spyOn t, '_update'
      t.setProgress -1.5
      expect(t._update).toHaveBeenCalledWith t._props.startTime - delay
    it 'should not set the progress more then 1', ->
      delay  = 200
      t   = new Tween delay: delay
      spyOn t, '_update'
      t.setProgress 1.5
      expect(t._update).toHaveBeenCalledWith (t._props.startTime - delay) + t._props.repeatTime
    it 'should set _playTime to null', ->
      delay  = 200
      t   = new Tween delay: delay
      t.play().pause()
      t.setProgress(.5)
      expect(t._playTime).toBe null

  describe 'onComplete callback ->', ->
    it 'should be called just once when finished and inside Timeline ->', ->
      zeroCnt = 0;    oneCnt = 0
      startCnt = 0;   completeCnt = 0
      repeatCnt = 0;  repeatStartCnt = 0
      firstUpdateCnt = 0; firstUpdateDirection = null
      startDirection = null; completeDirection = null
      repeatStartDirection = null; repeatCompleteDirection = null
      duration = 50; updateValue = null; updateDirection = null
      
      debug = false
      tm = new Timeline
      tw = new Tween
        duration:   duration
        onUpdate:(p, ep, isForward)->
          debug and console.log "ONUPDATE #{p}"
          updateDirection = isForward
          updateValue = p
          (p is 0) and zeroCnt++
          (p is 1) and oneCnt++
        onRepeatComplete:(isForward)->
          debug and console.log "REPEAT COMPLETE #{isForward}"
          repeatCompleteDirection = isForward
          repeatCnt++
        onRepeatStart:(isForward)->
          debug and console.log "REPEAT START #{isForward}"
          repeatStartDirection = isForward
          repeatStartCnt++
        onStart:(isForward)->
          debug and console.log "START #{isForward}"
          startDirection = isForward
          startCnt++
        onComplete:(isForward)->
          debug and console.log "COMPLETE #{isForward}"
          completeDirection = isForward
          completeCnt++
        onFirstUpdate:(isForward)->
          debug and console.log "FIRST UPDATE #{isForward}"
          firstUpdateDirection = isForward
          firstUpdateCnt++

      tm.add tw

      tm.setProgress(0)
      tm.setProgress(.5)
      tm.setProgress(.9)
      tm.setProgress(1)
      tm.setProgress(.9)
      tm.setProgress(.8)

      expect(completeCnt).toBe 2

    it 'should run with right context', ->
      isRightContext = null
      t = new Tween onComplete: -> isRightContext = @ is t

      t.setProgress 0
      t.setProgress .1
      t.setProgress 1
      expect(isRightContext).toBe true

    it 'should run with custom context', ->
      isRightContext = null; contextObj = {}
      t = new Tween
        callbacksContext: contextObj,
        onComplete: -> isRightContext = @ is contextObj

      t.setProgress 0
      t.setProgress .1
      t.setProgress 1
      expect(isRightContext).toBe true

  describe '_progress method ->', ->
    it 'should call onProgress callback', ->
      duration = 1000
      tw = new Tween duration: duration, onProgress:->
      spyOn tw._props, 'onProgress'
      tw._setStartTime()
      time = tw._props.startTime + duration/2
      tw._prevTime = time - 1
      tw._progress( .5, time )
      args = tw._props.onProgress.calls.first().args
      expect(args[0]).toBeCloseTo .5, 5
      expect(args[1]).toBe true

  describe 'onProgress callback ->', ->
    it 'should be called with current progress and direction', ->
      duration = 1000
      tw = new Tween duration: duration, onProgress:->
      spyOn(tw, '_progress').and.callThrough()
      spyOn tw._props, 'onProgress'
      tw._setStartTime()
      time = tw._props.startTime + duration/2
      tw._update time - 1
      tw._update time
      expect(tw._progress).toHaveBeenCalledWith .5, time
      expect(tw._props.onProgress).toHaveBeenCalledWith .5, true

    it 'should include all delays and repeats', ->
      duration = 1000; delay = 200; repeat = 2
      tw = new Tween
        duration: duration,
        delay: delay,
        repeat: repeat,
        onProgress:->

      spyOn(tw, '_progress').and.callThrough()
      spyOn tw._props, 'onProgress'
      tw._setStartTime()
      time = tw._props.startTime + 2*(duration + delay) + duration/2
      tw._update time - 1
      tw._update time

      p = tw._props
      startPoint = p.startTime - p.delay
      resultProgress = (time - startPoint) / p.repeatTime

      expect(tw._progress).toHaveBeenCalledWith resultProgress, time
      expect(tw._props.onProgress).toHaveBeenCalledWith resultProgress, true

    it 'should be called only in active bounds regarding delay "-"', ->
      duration = 1000; delay = 200
      tw = new Tween
        duration: duration
        delay: delay
        onProgress:->

      tw._setStartTime()
      p = tw._props
      startPoint = p.startTime - p.delay

      spyOn(tw, '_progress').and.callThrough()
      spyOn tw._props, 'onProgress'

      time = p.startTime - delay/2
      tw._update time - 1
      tw._update time

      expect(tw._progress).toHaveBeenCalledWith (delay/2)/p.repeatTime, time
      expect(tw._progress.calls.count()).toBe 1
      expect(tw._props.onProgress).toHaveBeenCalledWith (delay/2)/p.repeatTime, true

    it 'should be called only in active bounds "-"', ->
      duration = 1000; delay = 200
      tw = new Tween duration: duration, delay: delay, onProgress:->
      spyOn(tw, '_progress').and.callThrough()
      spyOn tw._props, 'onProgress'
      tw._setStartTime()
      time = (tw._props.startTime - delay) - delay/2
      tw._update time - 1
      tw._update time
      expect(tw._progress).not.toHaveBeenCalled()
      expect(tw._props.onProgress).not.toHaveBeenCalled()

    it 'should be called only in active bounds "+"', ->
      duration = 1000
      tw = new Tween duration: duration, onProgress:->
      spyOn(tw, '_progress').and.callThrough()
      spyOn tw._props, 'onProgress'
      tw._setStartTime()
      time = tw._props.startTime + 2*duration
      tw._update time - 1
      tw._update time
      expect(tw._progress).not.toHaveBeenCalled()
      expect(tw._props.onProgress).not.toHaveBeenCalled()

    it 'should be called only once after active bounds "-"', ->
      duration = 1000
      tw = new Tween duration: duration, onProgress:->
      tw._setStartTime()
      time = tw._props.startTime + duration/2
      tw._update time
      tw._update time - 10
      spyOn(tw, '_progress').and.callThrough()
      spyOn tw._props, 'onProgress'
      tw._update time - duration
      tw._update time - duration - 10
      expect(tw._progress).toHaveBeenCalledWith 0, (time - duration), false
      expect(tw._progress.calls.count()).toBe 1
      expect(tw._props.onProgress).toHaveBeenCalledWith 0, false
      expect(tw._props.onProgress.calls.count()).toBe 1

    it 'should be called only once after active bounds "+"', ->
      duration = 1000
      tw = new Tween duration: duration, onProgress:->
      tw._setStartTime()
      time = tw._props.startTime + duration/2
      tw._update time
      tw._update time + 10
      spyOn(tw, '_progress').and.callThrough()
      spyOn tw._props, 'onProgress'
      tw._update time + duration
      tw._update time + duration + 10
      expect(tw._progress).toHaveBeenCalledWith 1, time + duration
      expect(tw._progress.calls.count()).toBe 1
      expect(tw._props.onProgress).toHaveBeenCalledWith 1, true
      expect(tw._props.onProgress.calls.count()).toBe 1

    it 'should run with right context', ->
      isRightContext = null
      t = new Tween onProgress: -> isRightContext = @ is t

      t.setProgress 0
      t.setProgress .1
      expect(isRightContext).toBe true

    it 'should run with custom context', ->
      isRightContext = null; contextObj = {}
      t = new Tween
        callbacksContext: contextObj,
        onProgress: -> isRightContext = @ is contextObj

      t.setProgress 0
      t.setProgress .1
      expect(isRightContext).toBe true

  describe '_normPrevTimeForward method', ->
    it 'should return normalized _prevTimee', ->
      duration = 1000
      tw = new Tween duration: duration, onProgress:->
      tw._setStartTime()
      p = tw._props
      expect(tw._normPrevTimeForward())
        .toBe p.startTime + tw._progressTime - p.delay

  describe 'playback ->', ->
    it 'should set state to stop when finished', (dfr)->
      duration = 50
      t = new Tween duration: duration
      t.play()
      setTimeout ->
        expect(t._state).toBe 'stop'
        dfr()
      , 2*duration

  describe '_onTweenerFinish method', ->
    it 'should call _playbackComplete method', ->
      tw = new Tween duration: 50
      spyOn tw, '_playbackComplete'
      tw._onTweenerFinish()
      expect(tw._playbackComplete).toHaveBeenCalled()

    it 'should set _state to stop', (dfr)->
      duration = 50
      tw = new Tween duration: duration
      tw.play()

      setTimeout ->
        expect(tw._state).toBe 'stop'
        expect(tw._prevState).toBe 'play'
        dfr()
      , 2*duration

  describe 'callbacksContext option', ->
    it 'should receive callbacks context object', ->
      obj = {}
      tw = new Tween callbacksContext: obj
      expect(tw._props.callbacksContext).toBe obj

  describe '_extendDefaults method', ->
    it 'should call super', ->
      spyOn(Module.prototype, '_extendDefaults')
        .and.callThrough()
      tw = new Tween
      tw._extendDefaults()
      expect(Module.prototype._extendDefaults).toHaveBeenCalled()
    it 'should parse easing', ->
      tw = new Tween
      tw._props.easing = 'ease.in'
      tw._extendDefaults()
      expect(typeof tw._props.easing).toBe 'function'
    it 'should set _parent on easing function', ->
      tw = new Tween
      tw._props.easing = 'ease.in'
      tw._extendDefaults()
      expect(typeof tw._props.easing).toBe 'function'
      expect(tw._props.easing._parent).toBe tw

    it 'should parse backwardEasing', ->
      tw = new Tween backwardEasing: 'ease.in'
      expect(typeof tw._props.backwardEasing).toBe 'function'
      expect(tw._props.backwardEasing).toBe easing.ease.in

    it 'should set _parent on easing function', ->
      tw = new Tween backwardEasing: 'ease.in'
      expect(typeof tw._props.backwardEasing).toBe 'function'
      expect(tw._props.backwardEasing).toBe easing.ease.in
      expect(tw._props.backwardEasing._parent).toBe tw

    it 'should not parse backwardEasing if `null`', ->
      tw = new Tween
      expect(tw._props.backwardEasing).toBe null

  describe '_callbackOverrides object ->', ->
    it 'should receive _callbackOverrides object', ->
      callbackOverrides = {}
      o = { duration: 200, callbackOverrides: callbackOverrides }
      tw = new Tween o
      expect(tw._callbackOverrides).toBe callbackOverrides
    it 'should fallback to empty object', ->
      callbackOverrides = null
      o = { duration: 200, callbackOverrides: callbackOverrides }
      tw = new Tween o
      expect(tw._callbackOverrides).toEqual {}
    it 'should delete _callbackOverrides object from options', ->
      callbackOverrides = {}
      o = { duration: 200, callbackOverrides: callbackOverrides }
      tw = new Tween o
      expect(tw._o.callbackOverrides).not.toBeDefined()

  describe '_overrideCallback method ->', ->
    it 'should override a callback', ->

      fun = ->
      tr = new Tween

      result = tr._overrideCallback fun, ->

      expect(result).not.toBe fun
      expect(typeof result).toBe 'function'

    it 'should call overriden callback', ->
      args = null; isRightScope = null
      fun = ->
        args = arguments
        isRightScope = @ is tr
      tr = new Tween

      result = tr._overrideCallback fun, ->

      result.call( tr, 'a' )
      expect(args[0]).toBe 'a'
      expect(args.length).toBe 1
      expect(isRightScope).toBe true

    it 'should call passed method callback', ->
      args = null; isRightScope = null
      tr = new Tween

      fun = ->
      cleanUpFun = ->
        args = arguments
        isRightScope = @ is tr

      result = tr._overrideCallback fun, cleanUpFun

      result.call( tr, 'a' )
      expect(args[0]).toBe 'a'
      expect(args.length).toBe 1
      expect(isRightScope).toBe true

    it 'should add isMojsCallbackOverride flag', ->
      args = null; isRightScope = null
      tr = new Tween

      fun = ->
      cleanUpFun = ->
        args = arguments
        isRightScope = @ is tr

      result = tr._overrideCallback fun, cleanUpFun
      expect(result.isMojsCallbackOverride).toBe true

  describe '_assignProp method ->', ->
    it 'should parse easing', ->
      tr = new Tween
      tr._assignProp 'easing', 'ease.in'
      expect(typeof tr._props.easing).toBe 'function'

    it 'should set parent on easing', ->
      tr = new Tween
      tr._assignProp 'easing', 'ease.in'
      expect(typeof tr._props.easing).toBe 'function'
      expect(tr._props.easing._parent).toBe tr

    it 'should fallback to defaults for null values', ->
      tr = new Tween
      tr._assignProp 'speed', null
      expect(tr._props.speed).toBe tr._defaults.speed

    it 'should override callbacks if key in _callbackOverrides object', ->
      tr = new Tween
      funBefore = ->
      controlCallback = ->
      tr._callbackOverrides = {
        onStart: controlCallback
      }
      spyOn(tr, '_overrideCallback').and.callThrough()
      tr._assignProp 'onStart', funBefore
      expect(tr._props.onStart).not.toBe funBefore
      expect(tr._overrideCallback)
        .toHaveBeenCalledWith funBefore, controlCallback

    it 'should not override callbacks if already overriden', ->
      tr = new Tween
      funBefore = ->
      controlCallback = ->
      tr._callbackOverrides = {
        onStart: controlCallback
      }
      spyOn(tr, '_overrideCallback').and.callThrough()
      funBefore.isMojsCallbackOverride = true
      tr._assignProp 'onStart', funBefore
      expect(tr._overrideCallback)
        .not.toHaveBeenCalledWith funBefore, controlCallback

    it 'should override undefined values', ->
      tr = new Tween
      controlCallback = ->
      tr._callbackOverrides = {
        onStart: controlCallback
      }
      spyOn(tr, '_overrideCallback').and.callThrough()
      tr._assignProp 'onStart', null
      expect(typeof tr._props.onStart).toBe 'function'
      expect(tr._overrideCallback)
        .toHaveBeenCalledWith null, controlCallback

  describe '_setResumeTime method ->', ->
    # it 'should set _resumeTime to now()', (dfr)->
    #   tw = new Tween
    #   setTimeout ->
    #     tw._setResumeTime( 'play' )
    #     now = performance.now()
    #     console.log now, tw._resumeTime
    #     expect(typeof tw._resumeTime).toBe 'number'
    #     expect(tw._resumeTime - now).not.toBeGreaterThan 5
    #     dfr()
    #   , 20

    it 'should call _setStartTime method', ()->
      tw = new Tween
      spyOn tw, '_setStartTime'
      shift = 20
      tw._setResumeTime( 'play', shift )
      time = tw._resumeTime - Math.abs(shift) - tw._progressTime
      expect(tw._setStartTime).toHaveBeenCalledWith time, false
    it 'should have default of 0 shift', ()->
      tw = new Tween
      spyOn tw, '_setStartTime'
      tw._setResumeTime( 'play' )
      time = tw._resumeTime - Math.abs(0) - tw._progressTime
      expect(tw._setStartTime).toHaveBeenCalledWith time, false
    describe '_prevTime normalization ->', ->
      it 'should not set _prevTime if it is undefined', ()->
        tw = new Tween
        tw._setResumeTime( 'play' )
        expect(tw._prevTime).toBe undefined
      it 'should set prevTime to _normPrevTimeForward() if `play`', ->
        tw = new Tween
        tw._prevTime = 200
        tw._setResumeTime( 'play' )
        expect(tw._prevTime).toBe tw._normPrevTimeForward()
      it 'should set prevTime to _normPrevTimeForward() if `reverse`', ->
        tw = new Tween
        tw._prevTime = 200
        tw._setResumeTime( 'reverse' )
        expect(tw._prevTime).toBe tw._props.endTime - tw._progressTime

    describe 'onRefresh callback ->', ->
      it 'should be called if time is less then startTime', ->
        delay = 200
        tw = new Tween
          delay: delay
          onRefresh: ->
        tw._setStartTime()

        p = tw._props
        tw._update p.startTime
        tw._update p.startTime + p.repeatTime/2
        tw._update p.endTime

        spyOn tw, '_refresh'

        tw._update p.endTime + 20
        tw._update p.startTime - 20
        tw._update p.startTime - 10

        expect( tw._refresh ).toHaveBeenCalledWith true
        expect( tw._refresh.calls.count() ).toBe 1

      it 'should be called only if progress !== 0', ->
        delay = 200
        tw = new Tween
          delay: delay
          onRefresh: ->
        tw._setStartTime()

        p = tw._props
        tw._update p.startTime
        tw._update p.startTime + p.repeatTime/2
        tw._update p.endTime

        spyOn tw, '_refresh'

        tw._update p.endTime + 20
        tw.progress = 0
        tw._update p.startTime - 20
        tw._update p.startTime - 10

        expect( tw._refresh ).not.toHaveBeenCalledWith true

      it 'should be called after another play', ->
        delay = 200
        tw = new Tween
          delay: delay
          onRefresh: ->
        tw._setStartTime()

        p = tw._props
        tw._update p.startTime
        tw._update p.startTime + p.repeatTime/2
        tw._update p.endTime

        tw._update p.endTime + 20
        tw._update p.startTime - 20
        tw._update p.startTime - 10

        # new play

        spyOn tw, '_refresh'

        tw._update p.startTime
        tw._update p.startTime + p.repeatTime/2
        tw._update p.endTime

        tw._update p.endTime + 20
        tw._update p.startTime - 20
        tw._update p.startTime - 10

        expect( tw._refresh ).toHaveBeenCalledWith true
        expect( tw._refresh.calls.count() ).toBe 1


    describe '_refresh method ->', ->
      it 'should call onRefresh callback if defined', ->
        tw = new Tween onRefresh: ->

        spyOn tw._props, 'onRefresh'
        tw._refresh true
        expect( tw._props.onRefresh ).toHaveBeenCalledWith true, 0, 0

      it 'should call onRefresh with eased progress', ->
        easing = mojs.easing.path('M0,50 L100, 0')
        tw = new Tween
          easing: easing
          onRefresh: ->

        spyOn tw._props, 'onRefresh'
        tw._refresh true
        expect( tw._props.onRefresh ).toHaveBeenCalledWith true, easing(0), 0

      it 'should call onRefresh with eased progress // after', ->
        easing = mojs.easing.path('M0,50 L100, 0')
        tw = new Tween
          easing: easing
          onRefresh: ->

        spyOn tw._props, 'onRefresh'
        tw._refresh false
        expect( tw._props.onRefresh ).toHaveBeenCalledWith false, easing(1), 1

      it 'should not throw if no callback set', ->
        tw = new Tween
        expect( -> tw._refresh true ).not.toThrow()

      it 'should call onRefresh callback with right context', ->
        context = {}
        isRightContext = null
        tw = new Tween
          callbacksContext: context
          onRefresh: -> isRightContext = @ is context

        tw._refresh true
        expect( isRightContext ).toBe true


  describe '_updateInActiveArea method ->', -> 
    it 'should refresh _isRefreshed flag', ->
      tw = new Tween

      tw._isRefreshed = true
      tw._updateInActiveArea 0

      expect( tw._isRefreshed ).toBe false
