Tween    = window.mojs.Tween
Timeline = window.mojs.Timeline
easing   = window.mojs.easing
h        = window.mojs.h
tweener  = window.mojs.tweener

describe 'Tween ->', ->
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
      expect(t._defaults.duration).toBe  600
      expect(t._defaults.delay).toBe     0
      expect(t._defaults.yoyo).toBe      false
      expect(t._defaults.speed).toBeDefined()
      expect(t._defaults.onStart).toBeDefined()
      expect(t._defaults.onRepeatStart).toBeDefined()
      expect(t._defaults.onFirstUpdate).toBeDefined()
      expect(t._defaults.onRepeatComplete).toBeDefined()
      expect(t._defaults.onComplete).toBeDefined()
      expect(t._defaults.onUpdate).toBeDefined()
      expect(t._defaults.onProgress).toBeDefined()
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
    it 'should set _playTime',->
      t = new Tween
      t._setStartTime()
      now = performance.now()
      expect( t._playTime ).toBeDefined()
      expect( Math.abs( t._playTime - now ) ).not.toBeGreaterThan 10

    it 'should set _playTime to passed time',->
      t = new Tween
      now = performance.now() + 50
      t._setStartTime(now)
      expect( t._playTime ).toBe now
  
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
      t._update t._props.startTime + 500
      expect(t.progress).toBeCloseTo 0
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
    it 'should return true on the start', ->
      t = new Tween(duration: 1000, delay: 200, onUpdate:(p)-> console.log(p) )
      t._setStartTime()
      t._update t._props.startTime + t._props.duration/2
      returnValue = t._update t._props.startTime - 1000
      expect(t.progress).toBeCloseTo 0, 5
      expect(returnValue).toBe true
    it 'should not call update method if timeline isnt active "-"', ->
      t = new Tween(duration: 1000, onUpdate:->)
      t._setStartTime()
      spyOn t, 'onUpdate'
      t._update(t._props.startTime - 500)
      expect(t.onUpdate).not.toHaveBeenCalled()
    it 'should not call update method if timeline isnt active but was "-"', ->
      t = new Tween(duration: 1000, onUpdate:->)
      t._setStartTime()
      spyOn t, 'onUpdate'
      t._update(t._props.startTime + 500)
      t._update(t._props.startTime + 200)
      expect(t._isInActiveArea).toBe(true)

      t._update(t._props.startTime - 500)
      expect(t._isInActiveArea).toBe(false)
      expect(t.onUpdate).toHaveBeenCalledWith(0, 0, false, false)
      
      t._update(t._props.startTime - 500)
      expect(t._isInActiveArea).toBe(false)
      expect(t.onUpdate.calls.count()).toBe 2
    it 'should not call update method if timeline isnt active "+"', ->
      t = new Tween(duration: 1000, onUpdate:-> )
      spyOn t, 'onUpdate'
      t._setStartTime(); t._update(performance.now() + 1500)
      expect(t.onUpdate).not.toHaveBeenCalled()
    it 'should not call update method if timeline isnt active but was "+"', ->
      t = new Tween(duration: 1000, onUpdate:-> )
      spyOn t, 'onUpdate'
      t._setStartTime();
      t._update(t._props.startTime + 200)
      t._update(t._props.startTime + 500)
      expect(t._isInActiveArea).toBe(true)
      t._update(t._props.startTime + 1500)
      expect(t._isInActiveArea).toBe(false)
      expect(t.onUpdate).toHaveBeenCalledWith(1, 1, true, false)
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
      expect(t._progressTime).toBe delay + updateTime
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
    # TODO: PUT BACK when isYoyo argument is ready
    # it 'should receive _prevTime', ->
    #   t = new Tween(duration: 1000, delay: 200, repeat: 2, onStart:-> )
    #   t._setStartTime()
    #   prevTime = 1; time = 2
    #   spyOn( t, '_updateInActiveArea').and.callThrough()
    #   spyOn t._props, 'onStart'
    #   t._update (t._props.startTime + 1300), time, prevTime
    #   expect(t._updateInActiveArea).toHaveBeenCalled()
    #   expect(t._props.onStart).toHaveBeenCalledWith(true)
    # TODO: PUT BACK when isYoyo argument is ready
    # it 'should receive _prevTime #2', ->
    #   t = new Tween(duration: 1000, delay: 200, repeat: 2, onStart:-> )
    #   t._setStartTime()
    #   t._prevTime = 2
    #   prevTime = 1; time = 2
    #   spyOn( t, '_updateInActiveArea').and.callThrough()
    #   spyOn t._props, 'onStart'
    #   t._update (t._props.startTime + 1300), time, prevTime
    #   expect(t._updateInActiveArea).toHaveBeenCalled()
    #   expect(t._props.onStart).toHaveBeenCalledWith(true)

    # TODO: PUT BACK when isYoyo argument is done
    # it 'should call callbacks if on edge "+1" + was yoyo', ->
    #   tm = new mojs.Timeline repeat: 2, yoyo: true
    #   duration = 1000
    #   t = new Tween
    #     duration: duration
    #     onStart:->
    #     onRepeatStart:->
    #     onUpdate:->
    #     onProgress:->
    #     onRepeatComplete:->
    #     onComplete:->
    #     onFirstUpdate:->

    #   tm.add t

    #   tm.setProgress 0
    #   tm.setProgress .25
      
    #   tm.setProgress .35
    #   tm.setProgress .55
      
    #   spyOn t._props, 'onStart'
    #   spyOn t._props, 'onRepeatStart'

    #   tm.setProgress .85

    #   expect(t._props.onStart).toHaveBeenCalledWith false, false
    #   expect(t._props.onRepeatStart).toHaveBeenCalledWith false, true

    # TODO: PUT BACK when isYoyo argument is done
    # it 'should call callbacks if on edge "+1" + wasn\'t yoyo', ->
    #   tm = new mojs.Timeline repeat: 2#, yoyo: true
    #   duration = 1000
    #   t = new Tween
    #     duration: duration
    #     onStart:->
    #     onRepeatStart:->
    #     onUpdate:->
    #     onProgress:->
    #     onRepeatComplete:->
    #     onComplete:->
    #     onFirstUpdate:->

    #   tm.add t

    #   tm.setProgress 0
    #   tm.setProgress .25
      
    #   tm.setProgress .35
    #   tm.setProgress .55

    #   spyOn t._props, 'onRepeatComplete'
    #   spyOn t._props, 'onComplete'

    #   tm.setProgress .85

    #   expect(t._props.onRepeatComplete).toHaveBeenCalledWith true
    #   expect(t._props.onComplete).toHaveBeenCalledWith true
    
    # TODO: PUT BACK when isYoyo argument is done
    # it 'should call callbacks if on edge "-1" + was yoyo', ->
    #   tm = new mojs.Timeline repeat: 1, yoyo: true
    #   duration = 1000
    #   t = new Tween
    #     duration: duration
    #     onStart:->
    #     onRepeatStart:->
    #     onUpdate:->
    #     onProgress:->
    #     onRepeatComplete:->
    #     onComplete:->
    #     onFirstUpdate:->

    #   tm.add t

    #   tm.setProgress 0
    #   tm.setProgress .25
      
    #   tm.setProgress .35
    #   tm.setProgress .55
    #   tm.setProgress .56
    #   tm.setProgress .54
      
    #   spyOn t._props, 'onRepeatComplete'
    #   spyOn t._props, 'onComplete'

    #   tm.setProgress .25

    #   expect(t._props.onRepeatComplete).toHaveBeenCalledWith true
    #   expect(t._props.onComplete).toHaveBeenCalledWith true

    # TODO: PUT BACK when isYoyo argument is done
    # it 'should call callbacks if on edge "-1" + wasn\'t yoyo', ->
    #   tm = new mojs.Timeline repeat: 1#, yoyo: true
    #   duration = 1000
    #   t = new Tween
    #     duration: duration
    #     onStart:->
    #     onRepeatStart:->
    #     onUpdate:->
    #     onProgress:->
    #     onRepeatComplete:->
    #     onComplete:->
    #     onFirstUpdate:->

    #   tm.add t

    #   tm.setProgress 1
    #   tm.setProgress .85
      
    #   spyOn t._props, 'onRepeatStart'
    #   spyOn t._props, 'onStart'
      
    #   tm.setProgress .45

    #   expect(t._props.onRepeatStart).toHaveBeenCalledWith false
    #   expect(t._props.onStart).toHaveBeenCalledWith false


  describe 'onUpdate callback ->', ->
    it 'should be defined', ->
      t = new Tween onUpdate: ->
      expect(t._props.onUpdate).toBeDefined()
    it 'should call onUpdate callback with the current progress', ->
      t = new Tween duration: 1000, easing: 'bounce.out', onUpdate: ->
      spyOn t, 'onUpdate'
      t._setStartTime()
      t._update t._props.startTime + 499
      t._update t._props.startTime + 500
      expect(t.onUpdate).toHaveBeenCalledWith t.easedProgress, t.progress, true, false
    it 'should have the right scope', ->
      isRightScope = false
      t = new Tween onUpdate:-> isRightScope = @ instanceof Tween
      t._setStartTime()
      t._update t._props.startTime + 199
      t._update t._props.startTime + 200
      expect(isRightScope).toBe true
    it 'should be called just once on delay', ->
      t = new Tween delay: 200, repeat: 2, onUpdate:->
      spyOn(t, 'onUpdate').and.callThrough()
      t._setStartTime()
      t._update t._props.startTime + t._props.duration + 50
      t._update t._props.startTime + t._props.duration + 100
      t._update t._props.startTime + t._props.duration + 150
      expect(t.onUpdate.calls.count()).toBe 1
    it 'should pass eased progress and raw progress', ->
      easedProgress = null
      progress      = null
      t = new Tween
        easing: 'cubic.out'
        onUpdate:(ep, p)->
          easedProgress = ep
          progress = p

      t._setProgress .5
      expect(easedProgress).toBe mojs.easing.cubic.out progress

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
      expect(updateValue).toBe(0)
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
      expect(updateValue).toBe(1)
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
      expect(updateValue).toBe(1)
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
      expect(updateValue).toBe(0)
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
      expect(updateValue).toBe(1)
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
      expect(updateValue).toBe(0)
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
      expect(updateValue).toBe(1)
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
      expect(updateValue).toBe(1)
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
      expect(updateValue).toBe(1)
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
      expect(updateValue).toBe(1)
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
      expect(updateValue).toBe(1)
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
      expect(updateValue).toBe(1)
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
        repeat:     2
        duration:   duration
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
      expect(updateValue).toBe(0)
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
      expect(updateValue).toBe(0)
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
      expect(updateValue).toBe(0)
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
      expect(updateValue).toBe(0)
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
      expect(updateValue).toBe(0)
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
      expect(updateValue).toBe(.5)
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
      expect(updateValue).toBe(0)
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
      expect(updateValue).toBe(0)
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
      expect(updateValue).toBe(0)
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
      expect(updateValue).toBe(0)
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
      expect(updateValue).toBe(0)
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
      expect(updateValue).toBe(0)
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
      duration = 50; delay = 20; updateValue = null; updateDirection = null
      t = new Tween
        repeat:     2
        duration:   duration
        delay:      delay
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
      expect(updateValue).toBe(0)
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
      expect(updateValue).toBe(0)
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
      expect(updateValue).toBe(0)
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
      expect(updateValue).toBe(0)
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
      duration = 50
      t = new Tween
        repeat:     1
        yoyo:       true
        duration:   duration
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
      expect(updateValue).toBe(1)
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
      expect(updateValue).toBe(0)
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
        isIt:       1
        repeat:     1
        yoyo:       true
        duration:   duration
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

      # expect(t._wasUknownUpdate).toBe(false)
      # expect(oneCnt).toBe(0)
      # expect(zeroCnt).toBe(0)

      # expect(repeatStartCnt).toBe(1)
      # expect(repeatStartDirection).toBe(true)

      # expect(repeatCnt).toBe(0)
      # expect(repeatCompleteDirection).toBe(null)
      
      # expect(startCnt).toBe(1)
      # expect(startDirection).toBe(true)

      # expect(completeCnt).toBe(0)
      # expect(completeDirection).toBe(null)

      # expect(firstUpdateCnt).toBe(1)
      # expect(firstUpdateDirection).toBe(true)


  #     t._update t._props.startTime + timeShift + (duration) - gap
  #     expect(updateValue).toBeCloseTo(.9, 5)
  #     expect(updateDirection).toBe(true)

  #     expect(t._wasUknownUpdate).toBe(false)
  #     expect(oneCnt).toBe(0)
  #     expect(zeroCnt).toBe(0)
      
  #     expect(repeatStartCnt).toBe(1)
  #     expect(repeatStartDirection).toBe(true)

  #     expect(repeatCnt).toBe(0)
  #     expect(repeatCompleteDirection).toBe(null)
      
  #     expect(startCnt).toBe(1)
  #     expect(startDirection).toBe(true)

  #     expect(completeCnt).toBe(0)
  #     expect(completeDirection).toBe(null)

  #     expect(firstUpdateCnt).toBe(1)
  #     expect(firstUpdateDirection).toBe(true)

    
  #     timeShift = duration
  #     t._update t._props.startTime + timeShift + gap
  #     expect(updateValue).toBeCloseTo(.9, 5)
  #     expect(updateDirection).toBe(true)

  #     expect(t._wasUknownUpdate).toBe(false)
  #     expect(oneCnt).toBe(0)
  #     expect(zeroCnt).toBe(0)
      
  #     expect(repeatStartCnt).toBe(2)
  #     expect(repeatStartDirection).toBe(true)

  #     expect(repeatCnt).toBe(1)
  #     expect(repeatCompleteDirection).toBe(true)
      
  #     expect(startCnt).toBe(1)
  #     expect(startDirection).toBe(true)

  #     expect(completeCnt).toBe(0)
  #     expect(completeDirection).toBe(null)

  #     expect(firstUpdateCnt).toBe(1)
  #     expect(firstUpdateDirection).toBe(true)


  #     t._update t._props.startTime + timeShift + (duration/4)
  #     expect(updateValue).toBeCloseTo(.75, 5)
  #     expect(updateDirection).toBe(true)

  #     expect(t._wasUknownUpdate).toBe(false)
  #     expect(oneCnt).toBe(0)
  #     expect(zeroCnt).toBe(0)
      
  #     expect(repeatStartCnt).toBe(2)
  #     expect(repeatStartDirection).toBe(true)

  #     expect(repeatCnt).toBe(1)
  #     expect(repeatCompleteDirection).toBe(true)
      
  #     expect(startCnt).toBe(1)
  #     expect(startDirection).toBe(true)
      
  #     expect(completeCnt).toBe(0)
  #     expect(completeDirection).toBe(null)

  #     expect(firstUpdateCnt).toBe(1)
  #     expect(firstUpdateDirection).toBe(true)

  #     # end
  #     timeShift = 2*duration
  #     t._update t._props.startTime + timeShift + gap
  #     expect(updateValue).toBeCloseTo(0)
  #     expect(updateDirection).toBe(true)

  #     expect(t._wasUknownUpdate).toBe(false)
  #     expect(oneCnt).toBe(0)
  #     expect(zeroCnt).toBe(1)

  #     expect(repeatStartCnt).toBe(2)
  #     expect(repeatStartDirection).toBe(true)

  #     expect(repeatCnt).toBe(2)
  #     expect(repeatCompleteDirection).toBe(true)
      
  #     expect(startCnt).toBe(1)
  #     expect(startDirection).toBe(true)

  #     expect(completeCnt).toBe(1)
  #     expect(completeDirection).toBe(true)

  #     expect(firstUpdateCnt).toBe(1)
  #     expect(firstUpdateDirection).toBe(true)

  #   it 'should be called with 1 and 0 on each repeat period if delay || yoyo', ()->
  #     zeroCnt = 0; oneCnt = 0
  #     startCnt = 0; completeCnt = 0
  #     repeatCnt = 0; repeatStartCnt = 0
  #     firstUpdateCnt = 0; firstUpdateDirection = null
  #     startDirection = null; completeDirection = null
  #     repeatStartDirection = null; repeatCompleteDirection = null
  #     duration = 50; delay = 20; updateValue = null; updateDirection = null
  #     t = new Tween
  #       repeat:     2
  #       duration:   duration
  #       delay:      delay
  #       yoyo:       true
  #       onUpdate:(p, ep, isForward)->
  #         updateDirection = isForward
  #         updateValue = p
  #         (p is 0) and zeroCnt++
  #         (p is 1) and oneCnt++
  #       onRepeatComplete:(isForward)->
  #         repeatCompleteDirection = isForward
  #         repeatCnt++
  #       onRepeatStart:(isForward)->
  #         repeatStartDirection = isForward
  #         repeatStartCnt++
  #       onStart:(isForward)->
  #         startDirection = isForward
  #         startCnt++
  #       onComplete:(isForward)->
  #         completeDirection = isForward
  #         completeCnt++
  #       onFirstUpdate:(isForward)->
  #         firstUpdateDirection = isForward
  #         firstUpdateCnt++

  #     t._setStartTime()

  #     timeShift = 0
  #     t._update t._props.startTime + timeShift
  #     expect(updateValue).toBe(null)
  #     expect(updateDirection).toBe(null)

  #     expect(t._wasUknownUpdate).toBe(true)
  #     expect(oneCnt).toBe(0)
  #     expect(zeroCnt).toBe(0)
      
  #     expect(repeatStartCnt).toBe(0)
  #     expect(repeatStartDirection).toBe(null)

  #     expect(repeatCnt).toBe(0)
  #     expect(repeatCompleteDirection).toBe(null)
      
  #     expect(startCnt).toBe(0)
  #     expect(startDirection).toBe(null)

  #     expect(completeCnt).toBe(0)
  #     expect(completeDirection).toBe(null)

  #     expect(firstUpdateCnt).toBe(0)
  #     expect(firstUpdateDirection).toBe(null)


  #     t._update t._props.startTime + timeShift + (duration/2)
  #     expect(updateValue).toBeCloseTo(.5, 5)
  #     expect(updateDirection).toBe(true)

  #     expect(t._wasUknownUpdate).toBe(false)
  #     expect(oneCnt).toBe(0)
  #     expect(zeroCnt).toBe(0)
      
  #     expect(repeatStartCnt).toBe(1)
  #     expect(repeatStartDirection).toBe(true)

  #     expect(repeatCnt).toBe(0)
  #     expect(repeatCompleteDirection).toBe(null)

  #     expect(startCnt).toBe(1)
  #     expect(startDirection).toBe(true)

  #     expect(completeCnt).toBe(0)
  #     expect(completeDirection).toBe(null)

  #     expect(firstUpdateCnt).toBe(1)
  #     expect(firstUpdateDirection).toBe(true)


  #     t._update t._props.startTime + timeShift + (duration)
  #     expect(updateValue).toBe(1)
  #     expect(updateDirection).toBe(true)

  #     expect(t._wasUknownUpdate).toBe(false)
  #     expect(oneCnt).toBe(1)
  #     expect(zeroCnt).toBe(0)
      
  #     expect(repeatStartCnt).toBe(1)
  #     expect(repeatStartDirection).toBe(true)

  #     expect(repeatCnt).toBe(1)
  #     expect(repeatCompleteDirection).toBe(true)
      
  #     expect(startCnt).toBe(1)
  #     expect(startDirection).toBe(true)

  #     expect(completeCnt).toBe(0)
  #     expect(completeDirection).toBe(null)

  #     expect(firstUpdateCnt).toBe(1)
  #     expect(firstUpdateDirection).toBe(true)


  #     timeShift = duration + delay
  #     t._update t._props.startTime + timeShift
  #     expect(updateValue).toBe(1)
  #     expect(updateDirection).toBe(true)

  #     expect(t._wasUknownUpdate).toBe(false)
  #     expect(oneCnt).toBe(1)
  #     expect(zeroCnt).toBe(0)

  #     expect(repeatStartCnt).toBe(2)
  #     expect(repeatStartDirection).toBe(true)

  #     expect(repeatCnt).toBe(1)
  #     expect(repeatCompleteDirection).toBe(true)
      
  #     expect(startCnt).toBe(1)
  #     expect(startDirection).toBe(true)

  #     expect(completeCnt).toBe(0)
  #     expect(completeDirection).toBe(null)

  #     expect(firstUpdateCnt).toBe(1)
  #     expect(firstUpdateDirection).toBe(true)


  #     t._update t._props.startTime + timeShift + (duration/4)
  #     expect(updateValue).toBeCloseTo(.75, 5)
  #     expect(updateDirection).toBe(true)

  #     expect(t._wasUknownUpdate).toBe(false)
  #     expect(oneCnt).toBe(1)
  #     expect(zeroCnt).toBe(0)

  #     expect(repeatStartCnt).toBe(2)
  #     expect(repeatStartDirection).toBe(true)

  #     expect(repeatCnt).toBe(1)
  #     expect(repeatCompleteDirection).toBe(true)
      
  #     expect(startCnt).toBe(1)
  #     expect(startDirection).toBe(true)
      
  #     expect(completeCnt).toBe(0)
  #     expect(completeDirection).toBe(null)

  #     expect(firstUpdateCnt).toBe(1)
  #     expect(firstUpdateDirection).toBe(true)

  #     t._update t._props.startTime + timeShift + (duration)
  #     expect(updateValue).toBe(0)
  #     expect(updateDirection).toBe(true)

  #     expect(t._wasUknownUpdate).toBe(false)
  #     expect(oneCnt).toBe(1)
  #     expect(zeroCnt).toBe(1)
      
  #     expect(repeatStartCnt).toBe(2)
  #     expect(repeatStartDirection).toBe(true)

  #     expect(repeatCnt).toBe(2)
  #     expect(repeatCompleteDirection).toBe(true)
      
  #     expect(startCnt).toBe(1)
  #     expect(startDirection).toBe(true)

  #     expect(completeCnt).toBe(0)
  #     expect(completeDirection).toBe(null)

  #     expect(firstUpdateCnt).toBe(1)
  #     expect(firstUpdateDirection).toBe(true)


  #     timeShift = 2*(duration + delay)
  #     t._update t._props.startTime + timeShift
  #     expect(updateValue).toBe(0)
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


  #     t._update t._props.startTime + timeShift + (duration)
  #     expect(updateValue).toBe(1)
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
  #     t._update t._props.startTime + timeShift + (duration) + delay/2
  #     expect(updateValue).toBe(1)
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


  #   it 'should be called with 1 and 0 on each repeat period if in delay || yoyo', ()->
  #     zeroCnt = 0; oneCnt = 0
  #     startCnt = 0; completeCnt = 0
  #     repeatCnt = 0; repeatStartCnt = 0
  #     firstUpdateCnt = 0; firstUpdateDirection = null
  #     startDirection = null; completeDirection = null
  #     repeatStartDirection = null; repeatCompleteDirection = null
  #     duration = 50; delay = 20; updateValue = null; updateDirection = null
  #     t = new Tween
  #       repeat:     2
  #       duration:   duration
  #       delay:      delay
  #       yoyo:       true
  #       onUpdate:(p, ep, isForward)->
  #         updateDirection = isForward
  #         updateValue = p
  #         (p is 0) and zeroCnt++
  #         (p is 1) and oneCnt++
  #       onRepeatComplete:(isForward)->
  #         repeatCompleteDirection = isForward
  #         repeatCnt++
  #       onRepeatStart:(isForward)->
  #         repeatStartDirection = isForward
  #         repeatStartCnt++
  #       onStart:(isForward)->
  #         startDirection = isForward
  #         startCnt++
  #       onComplete:(isForward)->
  #         completeDirection = isForward
  #         completeCnt++
  #       onFirstUpdate:(isForward)->
  #         firstUpdateDirection = isForward
  #         firstUpdateCnt++

  #     t._setStartTime()

  #     timeShift = 0
  #     t._update t._props.startTime + timeShift
  #     expect(updateValue).toBe(null)
  #     expect(updateDirection).toBe(null)

  #     expect(t._wasUknownUpdate).toBe(true)
  #     expect(oneCnt).toBe(0)
  #     expect(zeroCnt).toBe(0)
      
  #     expect(repeatStartCnt).toBe(0)
  #     expect(repeatStartDirection).toBe(null)

  #     expect(repeatCnt).toBe(0)
  #     expect(repeatCompleteDirection).toBe(null)

  #     expect(startCnt).toBe(0)
  #     expect(startDirection).toBe(null)

  #     expect(completeCnt).toBe(0)
  #     expect(completeDirection).toBe(null)

  #     expect(firstUpdateCnt).toBe(0)
  #     expect(firstUpdateDirection).toBe(null)


  #     t._update t._props.startTime + timeShift + (duration/2)
  #     expect(updateValue).toBe(.5)
  #     expect(updateDirection).toBe(true)

  #     expect(t._wasUknownUpdate).toBe(false)
  #     expect(oneCnt).toBe(0)
  #     expect(zeroCnt).toBe(0)

  #     expect(repeatStartCnt).toBe(1)
  #     expect(repeatStartDirection).toBe(true)

  #     expect(repeatCnt).toBe(0)
  #     expect(repeatCompleteDirection).toBe(null)
      
  #     expect(startCnt).toBe(1)
  #     expect(startDirection).toBe(true)

  #     expect(completeCnt).toBe(0)
  #     expect(completeDirection).toBe(null)

  #     expect(firstUpdateCnt).toBe(1)
  #     expect(firstUpdateDirection).toBe(true)


  #     t._update t._props.startTime + timeShift + (duration) + delay/2
  #     expect(updateValue).toBe(1)
  #     expect(updateDirection).toBe(true)

  #     expect(t._wasUknownUpdate).toBe(false)
  #     expect(oneCnt).toBe(1)
  #     expect(zeroCnt).toBe(0)

  #     expect(repeatStartCnt).toBe(1)
  #     expect(repeatStartDirection).toBe(true)

  #     expect(repeatCnt).toBe(1)
  #     expect(repeatCompleteDirection).toBe(true)

  #     expect(startCnt).toBe(1)
  #     expect(startDirection).toBe(true)

  #     expect(completeCnt).toBe(0)
  #     expect(completeDirection).toBe(null)

  #     expect(firstUpdateCnt).toBe(1)
  #     expect(firstUpdateDirection).toBe(true)


  #     timeShift = duration + delay
  #     t._update t._props.startTime + timeShift + 10
  #     expect(updateValue).toBeCloseTo(.8, 5)
  #     expect(updateDirection).toBe(true)

  #     expect(t._wasUknownUpdate).toBe(false)
  #     expect(oneCnt).toBe(1)
  #     expect(zeroCnt).toBe(0)

  #     expect(repeatStartCnt).toBe(2)
  #     expect(repeatStartDirection).toBe(true)

  #     expect(repeatCnt).toBe(1)
  #     expect(repeatCompleteDirection).toBe(true)
      
  #     expect(startCnt).toBe(1)
  #     expect(startDirection).toBe(true)

  #     expect(completeCnt).toBe(0)
  #     expect(completeDirection).toBe(null)

  #     expect(firstUpdateCnt).toBe(1)
  #     expect(firstUpdateDirection).toBe(true)


  #     t._update t._props.startTime + timeShift + (duration/4)
  #     expect(updateValue).toBeCloseTo(.75, 5)
  #     expect(updateDirection).toBe(true)

  #     expect(t._wasUknownUpdate).toBe(false)
  #     expect(oneCnt).toBe(1)
  #     expect(zeroCnt).toBe(0)

  #     expect(repeatStartCnt).toBe(2)
  #     expect(repeatStartDirection).toBe(true)

  #     expect(repeatCnt).toBe(1)
  #     expect(repeatCompleteDirection).toBe(true)
      
  #     expect(startCnt).toBe(1)
  #     expect(startDirection).toBe(true)

  #     expect(completeCnt).toBe(0)
  #     expect(completeDirection).toBe(null)

  #     expect(firstUpdateCnt).toBe(1)
  #     expect(firstUpdateDirection).toBe(true)


  #     t._update t._props.startTime + timeShift + (duration) + delay/2
  #     expect(updateValue).toBe(0)
  #     expect(updateDirection).toBe(true)

  #     expect(t._wasUknownUpdate).toBe(false)
  #     expect(oneCnt).toBe(1)
  #     expect(zeroCnt).toBe(1)

  #     expect(repeatStartCnt).toBe(2)
  #     expect(repeatStartDirection).toBe(true)

  #     expect(repeatCnt).toBe(2)
  #     expect(repeatCompleteDirection).toBe(true)

  #     expect(startCnt).toBe(1)
  #     expect(startDirection).toBe(true)

  #     expect(completeCnt).toBe(0)
  #     expect(completeDirection).toBe(null)

  #     expect(firstUpdateCnt).toBe(1)
  #     expect(firstUpdateDirection).toBe(true)


  #     timeShift = 2*(duration + delay)
  #     t._update t._props.startTime + timeShift + 10
  #     expect(updateValue).toBeCloseTo(.2, 5)
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
  #     expect(updateValue).toBe(1)
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
  #     expect(updateValue).toBe(1)
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

  #   # ###
  #   #   TWEEN IN REVERSE DIRECTION || YOYO
  #   # ###

  #   it 'should be called with 0 and 1 on each repeat period || reverse yoyo', ()->
  #     zeroCnt = 0; oneCnt = 0
  #     startCnt = 0; completeCnt = 0
  #     repeatCnt = 0; repeatStartCnt = 0
  #     firstUpdateCnt = 0; firstUpdateDirection = null
  #     startDirection = null; completeDirection = null
  #     repeatStartDirection = null; repeatCompleteDirection = null
  #     duration = 50; updateValue = null; updateDirection = null
  #     t = new Tween
  #       repeat:     2
  #       duration:   duration
  #       yoyo:       true
  #       onUpdate:(p, ep, isForward)->
  #         updateDirection = isForward
  #         updateValue = p
  #         (p is 0) and zeroCnt++
  #         (p is 1) and oneCnt++
  #       onRepeatComplete:(isForward)->
  #         repeatCompleteDirection = isForward
  #         repeatCnt++
  #       onRepeatStart:(isForward)->
  #         repeatStartDirection = isForward
  #         repeatStartCnt++
  #       onStart:(isForward)->
  #         startDirection = isForward
  #         startCnt++
  #       onComplete:(isForward)->
  #         completeDirection = isForward
  #         completeCnt++
  #       onFirstUpdate:(isForward)->
  #         firstUpdateDirection = isForward
  #         firstUpdateCnt++
      
  #     t._setStartTime()
      
  #     timeShift = 3*duration
  #     t._update t._props.startTime + timeShift
  #     expect(updateValue).toBe(null)
  #     expect(updateDirection).toBe(null)

  #     expect(t._wasUknownUpdate).toBe(true)
  #     expect(oneCnt).toBe(0)
  #     expect(zeroCnt).toBe(0)

  #     expect(repeatStartCnt).toBe(0)
  #     expect(repeatStartDirection).toBe(null)

  #     expect(repeatCnt).toBe(0)
  #     expect(repeatCompleteDirection).toBe(null)
      
  #     expect(startCnt).toBe(0)
  #     expect(startDirection).toBe(null)

  #     expect(completeCnt).toBe(0)
  #     expect(completeDirection).toBe(null)

  #     expect(firstUpdateCnt).toBe(0)
  #     expect(firstUpdateDirection).toBe(null)


  #     t._update t._props.startTime + timeShift - duration/4
  #     expect(updateValue).toBeCloseTo(.75, 5)
  #     expect(updateDirection).toBe(false)

  #     expect(t._wasUknownUpdate).toBe(false)
  #     expect(oneCnt).toBe(0)
  #     expect(zeroCnt).toBe(0)

  #     expect(repeatStartCnt).toBe(0)
  #     expect(repeatStartDirection).toBe(null)

  #     expect(repeatCnt).toBe(1)
  #     expect(repeatCompleteDirection).toBe(false)
      
  #     expect(startCnt).toBe(0)
  #     expect(startDirection).toBe(null)

  #     expect(completeCnt).toBe(1)
  #     expect(completeDirection).toBe(false)

  #     expect(firstUpdateCnt).toBe(1)
  #     expect(firstUpdateDirection).toBe(false)


  #     timeShift = 2*duration
  #     t._update t._props.startTime + timeShift
  #     expect(updateValue).toBe(0)
  #     expect(updateDirection).toBe(false)

  #     expect(t._wasUknownUpdate).toBe(false)
  #     expect(oneCnt).toBe(0)
  #     expect(zeroCnt).toBe(1)

  #     expect(repeatStartCnt).toBe(1)
  #     expect(repeatStartDirection).toBe(false)

  #     expect(repeatCnt).toBe(1)
  #     expect(repeatCompleteDirection).toBe(false)
      
  #     expect(startCnt).toBe(0)
  #     expect(startDirection).toBe(null)

  #     expect(completeCnt).toBe(1)
  #     expect(completeDirection).toBe(false)

  #     expect(firstUpdateCnt).toBe(1)
  #     expect(firstUpdateDirection).toBe(false)


  #     t._update t._props.startTime + timeShift - duration/4
  #     expect(updateValue).toBeCloseTo(.25, 5)
  #     expect(updateDirection).toBe(false)

  #     expect(t._wasUknownUpdate).toBe(false)
  #     expect(oneCnt).toBe(0)
  #     expect(zeroCnt).toBe(1)

  #     expect(repeatStartCnt).toBe(1)
  #     expect(repeatStartDirection).toBe(false)

  #     expect(repeatCnt).toBe(2)
  #     expect(repeatCompleteDirection).toBe(false)
      
  #     expect(startCnt).toBe(0)
  #     expect(startDirection).toBe(null)

  #     expect(completeCnt).toBe(1)
  #     expect(completeDirection).toBe(false)

  #     expect(firstUpdateCnt).toBe(1)
  #     expect(firstUpdateDirection).toBe(false)


  #     timeShift = duration
  #     t._update t._props.startTime + timeShift
  #     expect(updateValue).toBe(1)
  #     expect(updateDirection).toBe(false)

  #     expect(t._wasUknownUpdate).toBe(false)
  #     expect(oneCnt).toBe(1)
  #     expect(zeroCnt).toBe(1)
      
  #     expect(repeatStartCnt).toBe(2)
  #     expect(repeatStartDirection).toBe(false)

  #     expect(repeatCnt).toBe(2)
  #     expect(repeatCompleteDirection).toBe(false)
      
  #     expect(startCnt).toBe(0)
  #     expect(startDirection).toBe(null)

  #     expect(completeCnt).toBe(1)
  #     expect(completeDirection).toBe(false)

  #     expect(firstUpdateCnt).toBe(1)
  #     expect(firstUpdateDirection).toBe(false)


  #     t._update t._props.startTime + timeShift - duration/4
  #     expect(updateValue).toBeCloseTo(.75, 5)
  #     expect(updateDirection).toBe(false)

  #     expect(updateDirection).toBe(false)

  #     expect(t._wasUknownUpdate).toBe(false)
  #     expect(oneCnt).toBe(1)
  #     expect(zeroCnt).toBe(1)

  #     expect(repeatStartCnt).toBe(2)
  #     expect(repeatStartDirection).toBe(false)

  #     expect(repeatCnt).toBe(3)
  #     expect(repeatCompleteDirection).toBe(false)
      
  #     expect(startCnt).toBe(0)
  #     expect(startDirection).toBe(null)

  #     expect(completeCnt).toBe(1)
  #     expect(completeDirection).toBe(false)

  #     expect(firstUpdateCnt).toBe(1)
  #     expect(firstUpdateDirection).toBe(false)

  #     # end
  #     timeShift = 0
  #     t._update t._props.startTime + timeShift
  #     expect(updateValue).toBe(0)
  #     expect(updateDirection).toBe(false)

  #     expect(t._wasUknownUpdate).toBe(false)
  #     expect(oneCnt).toBe(1)
  #     expect(zeroCnt).toBe(2)
      
  #     expect(repeatStartCnt).toBe(3)
  #     expect(repeatStartDirection).toBe(false)

  #     expect(repeatCnt).toBe(3)
  #     expect(repeatCompleteDirection).toBe(false)
      
  #     expect(startCnt).toBe(1)
  #     expect(startDirection).toBe(false)

  #     expect(completeCnt).toBe(1)
  #     expect(completeDirection).toBe(false)

  #     expect(firstUpdateCnt).toBe(1)
  #     expect(firstUpdateDirection).toBe(false)

  #     # repeat the last period
  #     t._update t._props.startTime + timeShift - duration/2
  #     expect(updateValue).toBe(0)
  #     expect(updateDirection).toBe(false)

  #     expect(t._wasUknownUpdate).toBe(false)
  #     expect(oneCnt).toBe(1)
  #     expect(zeroCnt).toBe(2)
      
  #     expect(repeatStartCnt).toBe(3)
  #     expect(repeatStartDirection).toBe(false)

  #     expect(repeatCnt).toBe(3)
  #     expect(repeatCompleteDirection).toBe(false)

  #     expect(startCnt).toBe(1)
  #     expect(startDirection).toBe(false)

  #     expect(completeCnt).toBe(1)
  #     expect(completeDirection).toBe(false)

  #     expect(firstUpdateCnt).toBe(1)
  #     expect(firstUpdateDirection).toBe(false)

  #   it 'should be called with 0 and 1 on each repeat period if missed time || yoyo reverse', ()->
  #     zeroCnt = 0; oneCnt = 0
  #     startCnt = 0; completeCnt = 0
  #     repeatCnt = 0; repeatStartCnt = 0
  #     firstUpdateCnt = 0; firstUpdateDirection = null
  #     startDirection = null; completeDirection = null
  #     repeatStartDirection = null; repeatCompleteDirection = null
  #     duration = 50; updateValue = null; updateDirection = null
  #     t = new Tween
  #       repeat:     2
  #       duration:   duration
  #       yoyo:       true
  #       onUpdate:(p, pe, isForward)->
  #         updateDirection = isForward
  #         updateValue = p
  #         (p is 0) and zeroCnt++
  #         (p is 1) and oneCnt++
  #       onRepeatComplete:(isForward)->
  #         repeatCompleteDirection = isForward
  #         repeatCnt++
  #       onRepeatStart:(isForward)->
  #         repeatStartDirection = isForward
  #         repeatStartCnt++
  #       onStart:(isForward)->
  #         startDirection = isForward
  #         startCnt++
  #       onComplete:(isForward)->
  #         completeDirection = isForward
  #         completeCnt++
  #       onFirstUpdate:(isForward)->
  #         firstUpdateDirection = isForward
  #         firstUpdateCnt++

  #     t._setStartTime()

  #     gap = 5
  #     timeShift = 3*duration
  #     t._update t._props.startTime + timeShift + gap
  #     expect(updateValue).toBe(null)
  #     expect(updateDirection).toBe(null)

  #     expect(t._wasUknownUpdate).toBe(true)
  #     expect(oneCnt).toBe(0)
  #     expect(zeroCnt).toBe(0)

  #     expect(repeatStartCnt).toBe(0)
  #     expect(repeatStartDirection).toBe(null)

  #     expect(repeatCnt).toBe(0)
  #     expect(repeatCompleteDirection).toBe(null)
      
  #     expect(startCnt).toBe(0)
  #     expect(startDirection).toBe(null)

  #     expect(completeCnt).toBe(0)
  #     expect(completeDirection).toBe(null)

  #     expect(firstUpdateCnt).toBe(0)
  #     expect(firstUpdateDirection).toBe(null)


  #     t._update t._props.startTime + timeShift - (duration/2)
  #     expect(updateValue).toBeCloseTo(.5, 5)
  #     expect(updateDirection).toBe(false)

  #     expect(t._wasUknownUpdate).toBe(false)
  #     expect(oneCnt).toBe(0)
  #     expect(zeroCnt).toBe(0)

  #     expect(repeatStartCnt).toBe(0)
  #     expect(repeatStartDirection).toBe(null)

  #     expect(repeatCnt).toBe(1)
  #     expect(repeatCompleteDirection).toBe(false)
      
  #     expect(startCnt).toBe(0)
  #     expect(startDirection).toBe(null)

  #     expect(completeCnt).toBe(1)
  #     expect(completeDirection).toBe(false)

  #     expect(firstUpdateCnt).toBe(1)
  #     expect(firstUpdateDirection).toBe(false)


  #     t._update t._props.startTime + timeShift - (duration) + gap
  #     expect(updateValue).toBeCloseTo(.1, 5)
  #     expect(updateDirection).toBe(false)

  #     expect(t._wasUknownUpdate).toBe(false)
  #     expect(oneCnt).toBe(0)
  #     expect(zeroCnt).toBe(0)

  #     expect(repeatStartCnt).toBe(0)
  #     expect(repeatStartDirection).toBe(null)

  #     expect(repeatCnt).toBe(1)
  #     expect(repeatCompleteDirection).toBe(false)
      
  #     expect(startCnt).toBe(0)
  #     expect(startDirection).toBe(null)

  #     expect(completeCnt).toBe(1)
  #     expect(completeDirection).toBe(false)

  #     expect(firstUpdateCnt).toBe(1)
  #     expect(firstUpdateDirection).toBe(false)


  #     timeShift = 2*duration
  #     t._update t._props.startTime + timeShift - gap
  #     expect(updateValue).toBeCloseTo(.1, 5)
  #     expect(updateDirection).toBe(false)

  #     expect(t._wasUknownUpdate).toBe(false)
  #     expect(oneCnt).toBe(0)
  #     expect(zeroCnt).toBe(0)

  #     expect(repeatStartCnt).toBe(1)
  #     expect(repeatStartDirection).toBe(false)

  #     expect(repeatCnt).toBe(2)
  #     expect(repeatCompleteDirection).toBe(false)
      
  #     expect(startCnt).toBe(0)
  #     expect(startDirection).toBe(null)

  #     expect(completeCnt).toBe(1)
  #     expect(completeDirection).toBe(false)

  #     expect(firstUpdateCnt).toBe(1)
  #     expect(firstUpdateDirection).toBe(false)


  #     t._update t._props.startTime + timeShift - (duration/4)
  #     expect(updateValue).toBeCloseTo(.25, 5)
  #     expect(updateDirection).toBe(false)

  #     expect(t._wasUknownUpdate).toBe(false)
  #     expect(oneCnt).toBe(0)
  #     expect(zeroCnt).toBe(0)

  #     expect(repeatStartCnt).toBe(1)
  #     expect(repeatStartDirection).toBe(false)

  #     expect(repeatCnt).toBe(2)
  #     expect(repeatCompleteDirection).toBe(false)
      
  #     expect(startCnt).toBe(0)
  #     expect(startDirection).toBe(null)

  #     expect(completeCnt).toBe(1)
  #     expect(completeDirection).toBe(false)

  #     expect(firstUpdateCnt).toBe(1)
  #     expect(firstUpdateDirection).toBe(false)


  #     t._update t._props.startTime + timeShift - (duration) + gap
  #     expect(updateValue).toBeCloseTo(.9, 5)
  #     expect(updateDirection).toBe(false)

  #     expect(t._wasUknownUpdate).toBe(false)
  #     expect(oneCnt).toBe(0)
  #     expect(zeroCnt).toBe(0)

  #     expect(repeatStartCnt).toBe(1)
  #     expect(repeatStartDirection).toBe(false)

  #     expect(repeatCnt).toBe(2)
  #     expect(repeatCompleteDirection).toBe(false)
      
  #     expect(startCnt).toBe(0)
  #     expect(startDirection).toBe(null)

  #     expect(completeCnt).toBe(1)
  #     expect(completeDirection).toBe(false)

  #     expect(firstUpdateCnt).toBe(1)
  #     expect(firstUpdateDirection).toBe(false)

  #     # END
  #     timeShift = duration
  #     t._update t._props.startTime + timeShift - (duration) - gap
  #     expect(updateValue).toBe(0)
  #     expect(updateDirection).toBe(false)

  #     expect(t._wasUknownUpdate).toBe(false)
  #     expect(oneCnt).toBe(0)
  #     expect(zeroCnt).toBe(1)

  #     expect(repeatStartCnt).toBe(2)
  #     expect(repeatStartDirection).toBe(false)

  #     expect(repeatCnt).toBe(2)
  #     expect(repeatCompleteDirection).toBe(false)
      
  #     expect(startCnt).toBe(1)
  #     expect(startDirection).toBe(false)

  #     expect(completeCnt).toBe(1)
  #     expect(completeDirection).toBe(false)

  #     expect(firstUpdateCnt).toBe(1)
  #     expect(firstUpdateDirection).toBe(false)

  #     # start again
  #     t._update t._props.startTime + timeShift - (duration/4)
  #     expect(updateValue).toBeCloseTo(.75, 5)
  #     expect(updateDirection).toBe(true)

  #     expect(t._wasUknownUpdate).toBe(false)
  #     expect(oneCnt).toBe(0)
  #     expect(zeroCnt).toBe(1)

  #     expect(repeatStartCnt).toBe(3)
  #     expect(repeatStartDirection).toBe(true)

  #     expect(repeatCnt).toBe(2)
  #     expect(repeatCompleteDirection).toBe(false)

  #     expect(startCnt).toBe(2)
  #     expect(startDirection).toBe(true)

  #     expect(completeCnt).toBe(1)
  #     expect(completeDirection).toBe(false)

  #     expect(firstUpdateCnt).toBe(2)
  #     expect(firstUpdateDirection).toBe(true)

  #     # return to "-" inactive area
  #     t._update t._props.startTime - gap
  #     expect(updateValue).toBe(0)
  #     expect(updateDirection).toBe(false)

  #     expect(t._wasUknownUpdate).toBe(false)
  #     expect(oneCnt).toBe(0)
  #     expect(zeroCnt).toBe(2)

  #     expect(repeatStartCnt).toBe(4)
  #     expect(repeatStartDirection).toBe(false)

  #     expect(repeatCnt).toBe(2)
  #     expect(repeatCompleteDirection).toBe(false)
      
  #     expect(startCnt).toBe(3)
  #     expect(startDirection).toBe(false)

  #     expect(completeCnt).toBe(1)
  #     expect(completeDirection).toBe(false)

  #     expect(firstUpdateCnt).toBe(2)
  #     expect(firstUpdateDirection).toBe(true)

  #     # repeat the previous step
  #     t._update t._props.startTime - gap - 15
  #     expect(updateValue).toBe(0)
  #     expect(updateDirection).toBe(false)

  #     expect(t._wasUknownUpdate).toBe(false)
  #     expect(oneCnt).toBe(0)
  #     expect(zeroCnt).toBe(2)

  #     expect(repeatStartCnt).toBe(4)
  #     expect(repeatStartDirection).toBe(false)

  #     expect(repeatCnt).toBe(2)
  #     expect(repeatCompleteDirection).toBe(false)
      
  #     expect(startCnt).toBe(3)
  #     expect(startDirection).toBe(false)

  #     expect(completeCnt).toBe(1)
  #     expect(completeDirection).toBe(false)

  #     expect(firstUpdateCnt).toBe(2)
  #     expect(firstUpdateDirection).toBe(true)

  #   it 'should be called with 0 and 1 on each repeat period if in delay || yoyo reverse', ()->
  #     zeroCnt = 0; oneCnt = 0
  #     startCnt = 0; completeCnt = 0
  #     repeatCnt = 0; repeatStartCnt = 0
  #     firstUpdateCnt = 0; firstUpdateDirection = null
  #     startDirection = null; completeDirection = null
  #     repeatStartDirection = null; repeatCompleteDirection = null
  #     duration = 50; delay = 20; updateValue = null; updateDirection = null
  #     t = new Tween
  #       repeat:     2
  #       duration:   duration
  #       delay:      delay
  #       yoyo:       true
  #       onUpdate:(p, pe, isForward)->
  #         updateDirection = isForward
  #         updateValue = p
  #         (p is 0) and zeroCnt++
  #         (p is 1) and oneCnt++
  #       onRepeatComplete:(isForward)->
  #         repeatCompleteDirection = isForward
  #         repeatCnt++
  #       onRepeatStart:(isForward)->
  #         repeatStartDirection = isForward
  #         repeatStartCnt++
  #       onStart:(isForward)->
  #         startDirection = isForward
  #         startCnt++
  #       onComplete:(isForward)->
  #         completeDirection = isForward
  #         completeCnt++
  #       onFirstUpdate:(isForward)->
  #         firstUpdateDirection = isForward
  #         firstUpdateCnt++

  #     t._setStartTime()

  #     timeShift = 3*(duration + delay) - delay
  #     t._update t._props.startTime + timeShift + 5
  #     expect(updateValue).toBe(null)
  #     expect(updateDirection).toBe(null)

  #     expect(t._wasUknownUpdate).toBe(true)
  #     expect(zeroCnt).toBe(0)
  #     expect(oneCnt).toBe(0)
      
  #     expect(repeatStartCnt).toBe(0)
  #     expect(repeatStartDirection).toBe(null)

  #     expect(repeatCnt).toBe(0)
  #     expect(repeatCompleteDirection).toBe(null)
      
  #     expect(startCnt).toBe(0)
  #     expect(startDirection).toBe(null)

  #     expect(completeCnt).toBe(0)
  #     expect(completeDirection).toBe(null)

  #     expect(firstUpdateCnt).toBe(0)
  #     expect(firstUpdateDirection).toBe(null)


  #     t._update t._props.startTime + timeShift - (duration/4)
  #     expect(updateValue).toBeCloseTo(.75, 5)
  #     expect(updateDirection).toBe(false)

  #     expect(t._wasUknownUpdate).toBe(false)
  #     expect(oneCnt).toBe(0)
  #     expect(zeroCnt).toBe(0)

  #     expect(repeatStartCnt).toBe(0)
  #     expect(repeatStartDirection).toBe(null)

  #     expect(repeatCnt).toBe(1)
  #     expect(repeatCompleteDirection).toBe(false)
      
  #     expect(startCnt).toBe(0)
  #     expect(startDirection).toBe(null)

  #     expect(completeCnt).toBe(1)
  #     expect(completeDirection).toBe(false)

  #     expect(firstUpdateCnt).toBe(1)
  #     expect(firstUpdateDirection).toBe(false)


  #     t._update t._props.startTime + timeShift - (duration) - 5
  #     expect(updateValue).toBe(0)
  #     expect(updateDirection).toBe(false)

  #     expect(t._wasUknownUpdate).toBe(false)
  #     expect(oneCnt).toBe(0)
  #     expect(zeroCnt).toBe(1)

  #     expect(repeatStartCnt).toBe(1)
  #     expect(repeatStartDirection).toBe(false)

  #     expect(repeatCnt).toBe(1)
  #     expect(repeatCompleteDirection).toBe(false)
      
  #     expect(startCnt).toBe(0)
  #     expect(startDirection).toBe(null)

  #     expect(completeCnt).toBe(1)
  #     expect(completeDirection).toBe(false)

  #     expect(firstUpdateCnt).toBe(1)
  #     expect(firstUpdateDirection).toBe(false)


  #     timeShift = 2*(duration + delay) - delay
  #     t._update t._props.startTime + timeShift - duration/4
  #     expect(updateValue).toBeCloseTo(.25, 5)
  #     expect(updateDirection).toBe(false)

  #     expect(t._wasUknownUpdate).toBe(false)
  #     expect(oneCnt).toBe(0)
  #     expect(zeroCnt).toBe(1)

  #     expect(repeatStartCnt).toBe(1)
  #     expect(repeatStartDirection).toBe(false)

  #     expect(repeatCnt).toBe(2)
  #     expect(repeatCompleteDirection).toBe(false)
      
  #     expect(startCnt).toBe(0)
  #     expect(startDirection).toBe(null)

  #     expect(completeCnt).toBe(1)
  #     expect(completeDirection).toBe(false)

  #     expect(firstUpdateCnt).toBe(1)
  #     expect(firstUpdateDirection).toBe(false)


  #     t._update t._props.startTime + timeShift - duration - 5
  #     expect(updateValue).toBe(1)
  #     expect(updateDirection).toBe(false)

  #     expect(t._wasUknownUpdate).toBe(false)
  #     expect(oneCnt).toBe(1)
  #     expect(zeroCnt).toBe(1)

  #     expect(repeatStartCnt).toBe(2)
  #     expect(repeatStartDirection).toBe(false)

  #     expect(repeatCnt).toBe(2)
  #     expect(repeatCompleteDirection).toBe(false)

  #     expect(startCnt).toBe(0)
  #     expect(startDirection).toBe(null)

  #     expect(completeCnt).toBe(1)
  #     expect(completeDirection).toBe(false)

  #     expect(firstUpdateCnt).toBe(1)
  #     expect(firstUpdateDirection).toBe(false)


  #     timeShift = duration
  #     t._update t._props.startTime + timeShift - duration/4
  #     expect(updateValue).toBeCloseTo(.75, 5)
  #     expect(updateDirection).toBe(false)

  #     expect(t._wasUknownUpdate).toBe(false)
  #     expect(oneCnt).toBe(1)
  #     expect(zeroCnt).toBe(1)

  #     expect(repeatStartCnt).toBe(2)
  #     expect(repeatStartDirection).toBe(false)

  #     expect(repeatCnt).toBe(3)
  #     expect(repeatCompleteDirection).toBe(false)
      
  #     expect(startCnt).toBe(0)
  #     expect(startDirection).toBe(null)

  #     expect(completeCnt).toBe(1)
  #     expect(completeDirection).toBe(false)

  #     expect(firstUpdateCnt).toBe(1)
  #     expect(firstUpdateDirection).toBe(false)


  #     t._update t._props.startTime + timeShift - duration - 5
  #     expect(updateValue).toBe(0)
  #     expect(updateDirection).toBe(false)

  #     expect(t._wasUknownUpdate).toBe(false)
  #     expect(oneCnt).toBe(1)
  #     expect(zeroCnt).toBe(2)

  #     expect(repeatStartCnt).toBe(3)
  #     expect(repeatStartDirection).toBe(false)

  #     expect(repeatCnt).toBe(3)
  #     expect(repeatCompleteDirection).toBe(false)
      
  #     expect(startCnt).toBe(1)
  #     expect(startDirection).toBe(false)

  #     expect(completeCnt).toBe(1)
  #     expect(completeDirection).toBe(false)

  #     expect(firstUpdateCnt).toBe(1)
  #     expect(firstUpdateDirection).toBe(false)

  #     # repeat the last period
  #     t._update t._props.startTime + timeShift - duration - 15
  #     expect(updateValue).toBe(0)
  #     expect(updateDirection).toBe(false)

  #     expect(t._wasUknownUpdate).toBe(false)
  #     expect(oneCnt).toBe(1)
  #     expect(zeroCnt).toBe(2)

  #     expect(repeatStartCnt).toBe(3)
  #     expect(repeatStartDirection).toBe(false)

  #     expect(repeatCnt).toBe(3)
  #     expect(repeatCompleteDirection).toBe(false)

  #     expect(startCnt).toBe(1)
  #     expect(startDirection).toBe(false)

  #     expect(completeCnt).toBe(1)
  #     expect(completeDirection).toBe(false)

  #     expect(firstUpdateCnt).toBe(1)
  #     expect(firstUpdateDirection).toBe(false)

  #   it 'should be called with 0 and 1 on each repeat period if delay || yoyo reverse', ()->
  #     zeroCnt = 0; oneCnt = 0
  #     startCnt = 0; completeCnt = 0
  #     repeatCnt = 0; repeatStartCnt = 0
  #     firstUpdateCnt = 0; firstUpdateDirection = null
  #     startDirection = null; completeDirection = null
  #     repeatStartDirection = null; repeatCompleteDirection = null
  #     duration = 500; delay = 200; updateValue = null; updateDirection = null
  #     t = new Tween
  #       repeat:     2
  #       duration:   duration
  #       delay:      delay
  #       yoyo:       true
  #       onUpdate:(p, pe, isForward)->
  #         updateDirection = isForward
  #         updateValue = p
  #         (p is 0) and zeroCnt++
  #         (p is 1) and oneCnt++
  #       onRepeatComplete:(isForward)->
  #         repeatCompleteDirection = isForward
  #         repeatCnt++
  #       onRepeatStart:(isForward)->
  #         repeatStartDirection = isForward
  #         repeatStartCnt++
  #       onStart:(isForward)->
  #         startDirection = isForward
  #         startCnt++
  #       onComplete:(isForward)->
  #         completeDirection = isForward
  #         completeCnt++
  #       onFirstUpdate:(isForward)->
  #         firstUpdateDirection = isForward
  #         firstUpdateCnt++

  #     t._setStartTime()

  #     timeShift = 3*(duration + delay) - delay
  #     t._update t._props.startTime + timeShift
  #     expect(updateValue).toBe(null)
  #     expect(updateDirection).toBe(null)

  #     expect(t._wasUknownUpdate).toBe(true)
  #     expect(oneCnt).toBe(0)
  #     expect(zeroCnt).toBe(0)
      
  #     expect(repeatStartCnt).toBe(0)
  #     expect(repeatStartDirection).toBe(null)

  #     expect(repeatCnt).toBe(0)
  #     expect(repeatCompleteDirection).toBe(null)
      
  #     expect(startCnt).toBe(0)
  #     expect(startDirection).toBe(null)

  #     expect(completeCnt).toBe(0)
  #     expect(completeDirection).toBe(null)

  #     expect(firstUpdateCnt).toBe(0)
  #     expect(firstUpdateDirection).toBe(null)


  #     t._update t._props.startTime + timeShift - (duration/2)
  #     expect(updateValue).toBeCloseTo(.5, 5)
  #     expect(updateDirection).toBe(false)

  #     expect(t._wasUknownUpdate).toBe(false)
  #     expect(oneCnt).toBe(0)
  #     expect(zeroCnt).toBe(0)

  #     expect(repeatStartCnt).toBe(0)
  #     expect(repeatStartDirection).toBe(null)

  #     expect(repeatCnt).toBe(1)
  #     expect(repeatCompleteDirection).toBe(false)
      
  #     expect(startCnt).toBe(0)
  #     expect(startDirection).toBe(null)

  #     expect(completeCnt).toBe(1)
  #     expect(completeDirection).toBe(false)

  #     expect(firstUpdateCnt).toBe(1)
  #     expect(firstUpdateDirection).toBe(false)


  #     t._update t._props.startTime + timeShift - duration
  #     expect(updateValue).toBe(0)
  #     expect(updateDirection).toBe(false)

  #     expect(t._wasUknownUpdate).toBe(false)
  #     expect(oneCnt).toBe(0)
  #     expect(zeroCnt).toBe(1)

  #     expect(repeatStartCnt).toBe(1)
  #     expect(repeatStartDirection).toBe(false)

  #     expect(repeatCnt).toBe(1)
  #     expect(repeatCompleteDirection).toBe(false)
      
  #     expect(startCnt).toBe(0)
  #     expect(startDirection).toBe(null)

  #     expect(completeCnt).toBe(1)
  #     expect(completeDirection).toBe(false)

  #     expect(firstUpdateCnt).toBe(1)
  #     expect(firstUpdateDirection).toBe(false)


  #     timeShift = 2*(duration + delay) - delay
  #     t._update t._props.startTime + timeShift - duration/4
  #     expect(updateValue).toBeCloseTo(.25, 5)
  #     expect(updateDirection).toBe(false)

  #     expect(t._wasUknownUpdate).toBe(false)
  #     expect(oneCnt).toBe(0)
  #     expect(zeroCnt).toBe(1)

  #     expect(repeatStartCnt).toBe(1)
  #     expect(repeatStartDirection).toBe(false)

  #     expect(repeatCnt).toBe(2)
  #     expect(repeatCompleteDirection).toBe(false)
      
  #     expect(startCnt).toBe(0)
  #     expect(startDirection).toBe(null)

  #     expect(completeCnt).toBe(1)
  #     expect(completeDirection).toBe(false)

  #     expect(firstUpdateCnt).toBe(1)
  #     expect(firstUpdateDirection).toBe(false)


  #     timeShift = 2*(duration + delay) - delay
  #     t._update t._props.startTime + timeShift - duration
  #     expect(updateValue).toBe(1)
  #     expect(updateDirection).toBe(false)

  #     expect(t._wasUknownUpdate).toBe(false)
  #     expect(oneCnt).toBe(1)
  #     expect(zeroCnt).toBe(1)

  #     expect(repeatStartCnt).toBe(2)
  #     expect(repeatStartDirection).toBe(false)

  #     expect(repeatCnt).toBe(2)
  #     expect(repeatCompleteDirection).toBe(false)

  #     expect(startCnt).toBe(0)
  #     expect(startDirection).toBe(null)

  #     expect(completeCnt).toBe(1)
  #     expect(completeDirection).toBe(false)

  #     expect(firstUpdateCnt).toBe(1)
  #     expect(firstUpdateDirection).toBe(false)


  #     timeShift = duration
  #     t._update t._props.startTime + timeShift - duration/4
  #     expect(updateValue).toBeCloseTo(.75, 5)
  #     expect(updateDirection).toBe(false)

  #     expect(t._wasUknownUpdate).toBe(false)
  #     expect(oneCnt).toBe(1)
  #     expect(zeroCnt).toBe(1)

  #     expect(repeatStartCnt).toBe(2)
  #     expect(repeatStartDirection).toBe(false)

  #     expect(repeatCnt).toBe(3)
  #     expect(repeatCompleteDirection).toBe(false)
      
  #     expect(startCnt).toBe(0)
  #     expect(startDirection).toBe(null)

  #     expect(completeCnt).toBe(1)
  #     expect(completeDirection).toBe(false)

  #     expect(firstUpdateCnt).toBe(1)
  #     expect(firstUpdateDirection).toBe(false)


  #     t._update t._props.startTime + timeShift - duration
  #     expect(updateValue).toBe(0)
  #     expect(updateDirection).toBe(false)

  #     expect(t._wasUknownUpdate).toBe(false)
  #     expect(oneCnt).toBe(1)
  #     expect(zeroCnt).toBe(2)

  #     expect(repeatStartCnt).toBe(3)
  #     expect(repeatStartDirection).toBe(false)

  #     expect(repeatCnt).toBe(3)
  #     expect(repeatCompleteDirection).toBe(false)
      
  #     expect(startCnt).toBe(1)
  #     expect(startDirection).toBe(false)

  #     expect(completeCnt).toBe(1)
  #     expect(completeDirection).toBe(false)

  #     expect(firstUpdateCnt).toBe(1)
  #     expect(firstUpdateDirection).toBe(false)

  #     # repeat the last period
  #     t._update t._props.startTime + timeShift - duration - 10
  #     expect(updateValue).toBe(0)
  #     expect(updateDirection).toBe(false)

  #     expect(t._wasUknownUpdate).toBe(false)
  #     expect(oneCnt).toBe(1)
  #     expect(zeroCnt).toBe(2)

  #     expect(repeatStartCnt).toBe(3)
  #     expect(repeatStartDirection).toBe(false)

  #     expect(repeatCnt).toBe(3)
  #     expect(repeatCompleteDirection).toBe(false)

  #     expect(startCnt).toBe(1)
  #     expect(startDirection).toBe(false)

  #     expect(completeCnt).toBe(1)
  #     expect(completeDirection).toBe(false)

  #     expect(firstUpdateCnt).toBe(1)
  #     expect(firstUpdateDirection).toBe(false)

  #     # start again
  #     t._update t._props.startTime + timeShift - duration/4
  #     expect(updateValue).toBeCloseTo(.75, 5)
  #     expect(updateDirection).toBe(true)

  #     expect(t._wasUknownUpdate).toBe(false)
  #     expect(oneCnt).toBe(1)
  #     expect(zeroCnt).toBe(2)

  #     expect(repeatStartCnt).toBe(4)
  #     expect(repeatStartDirection).toBe(true)

  #     expect(repeatCnt).toBe(3)
  #     expect(repeatCompleteDirection).toBe(false)

  #     expect(startCnt).toBe(2)
  #     expect(startDirection).toBe(true)

  #     expect(completeCnt).toBe(1)
  #     expect(completeDirection).toBe(false)

  #     expect(firstUpdateCnt).toBe(2)
  #     expect(firstUpdateDirection).toBe(true)

  # ###
  #   specific
  # ###

  # describe 'specific _update behaviour', ->
  #   it 'should call repeatComplete if imideatelly returned inside Timeline', ()->

  #     tm = new Timeline repeat:  1, yoyo: true
  #     t = new Tween onRepeatComplete:->

  #     tm.add t

  #     tm.setProgress 0
  #     tm.setProgress .1
  #     tm.setProgress .35
  #     tm.setProgress .5
  #     tm.setProgress .6
  #     spyOn t._props, 'onRepeatComplete'
  #     tm.setProgress .5

  #     expect(t._props.onRepeatComplete).toHaveBeenCalledWith true
      
  # describe '_getPeriod method ->', ->
  #   it 'should get current period', ->
  #     duration = 50; delay = 20
  #     t = new Tween repeat: 3, duration: duration, delay: delay

  #     t._setStartTime()

  #     expect(t._getPeriod(t._props.startTime)).toBe 0
  #     expect(t._getPeriod(t._props.startTime + duration/2)).toBe 0
  #     expect(t._getPeriod(t._props.startTime + duration)).toBe 1

  #     timeShift = duration + delay
  #     expect(t._getPeriod(t._props.startTime + timeShift - delay/2)).toBe 'delay'
  #     expect(t._delayT).toBe 1
  #     expect(t._getPeriod(t._props.startTime + timeShift)).toBe 1
  #     expect(t._getPeriod(t._props.startTime + timeShift + duration/2)).toBe 1
  #     expect(t._getPeriod(t._props.startTime + timeShift + duration)).toBe 2

  #     timeShift = 2*(duration + delay)
  #     expect(t._getPeriod(t._props.startTime + timeShift - delay/2)).toBe 'delay'
  #     expect(t._delayT).toBe 2
  #     expect(t._getPeriod(t._props.startTime + timeShift)).toBe 2
  #     expect(t._getPeriod(t._props.startTime + timeShift + duration/2)).toBe 2
  #     expect(t._getPeriod(t._props.startTime + timeShift + duration)).toBe 3

  #     timeShift = 3*(duration + delay)
  #     expect(t._getPeriod(t._props.startTime + timeShift - delay/2)).toBe 'delay'
  #     expect(t._delayT).toBe 3
  #     expect(t._getPeriod(t._props.startTime + timeShift)).toBe 3
  #     expect(t._getPeriod(t._props.startTime + timeShift + duration/2)).toBe 3
  #     expect(t._getPeriod(t._props.startTime + timeShift + duration)).toBe 4

  #   it 'should get the current period with no delay', ->
  #     duration = 50
  #     t = new Tween repeat: 3, duration: duration

  #     t._setStartTime()

  #     expect(t._getPeriod(t._props.startTime)).toBe 0
  #     expect(t._getPeriod(t._props.startTime + duration/2)).toBe 0
  #     expect(t._getPeriod(t._props.startTime + duration)).toBe 1
  #     expect(t._getPeriod(t._props.startTime + duration + 1)).toBe 1

  #     timeShift = duration
  #     expect(t._getPeriod(t._props.startTime + timeShift + duration/2)).toBe 1
  #     expect(t._getPeriod(t._props.startTime + timeShift + duration)).toBe 2
  #     expect(t._getPeriod(t._props.startTime + timeShift + duration + 1)).toBe 2

  #     timeShift = 2*duration
  #     expect(t._getPeriod(t._props.startTime + timeShift + duration/2)).toBe 2
  #     expect(t._getPeriod(t._props.startTime + timeShift + duration)).toBe 3
  #     expect(t._getPeriod(t._props.startTime + timeShift + duration + 1)).toBe 3

  #     timeShift = 3*duration
  #     expect(t._getPeriod(t._props.startTime + timeShift + duration/2)).toBe 3
  #     expect(t._getPeriod(t._props.startTime + timeShift + duration)).toBe 4
  #     expect(t._getPeriod(t._props.startTime + timeShift + duration + 1)).toBe 4

  #   it 'should return period number if time > endTime', ->
  #     duration = 50; delay = 20
  #     t = new Tween repeat: 2, duration: duration, delay: delay

  #     t._setStartTime()

  #     timeShift = 3*(duration + delay) - delay
  #     expect(t._getPeriod(t._props.startTime + timeShift + delay/2)).toBe 3

  #   it 'should round instead of floor if time >= endTime', ->
  #     # fifty plus something that will cause precision issue
  #     duration = 50 + 3/2.123
  #     t = new Tween repeat: 2, duration: duration
  #     t._setStartTime()
  #     expect(t._getPeriod(t._props.startTime + 3*duration)).toBe 3

  # describe 'onComplete callback ->', ->
  #   it 'should be defined', ->
  #     t = new Tween onComplete: ->
  #     expect(t._props.onComplete).toBeDefined()
  #   it 'should call onComplete callback', ->
  #     t = new Tween(duration: 100, onComplete:->)._setStartTime()
  #     spyOn(t._props, 'onComplete')
  #     t._update t._props.startTime + 50
  #     t._update t._props.startTime + 51
  #     t._update t._props.startTime + 101
  #     expect(t._props.onComplete).toHaveBeenCalled()
  #   it 'should be called just once', ->
  #     cnt = 0
  #     t = new Tween(duration: 32, onComplete:-> cnt++)._setStartTime()
  #     spyOn t._props, 'onComplete'
  #     t._update(t._props.startTime + 0)
  #     t._update(t._props.startTime + 10)
  #     t._update(t._props.startTime + 20)
  #     t._update(t._props.startTime + 30)
  #     t._update(t._props.startTime + 34)
  #     expect(t._props.onComplete).toHaveBeenCalledWith true
  #     expect(t._props.onComplete.calls.count()).toBe 1

  #   it 'should be called just once when inside timeline', ->
  #     tm = new mojs.Timeline
  #     duration = 32
  #     t = new Tween(duration: duration, onComplete:-> )._setStartTime()
  #     tm.add t
  #     tm._setStartTime()
  #     spyOn t._props, 'onComplete'
  #     tm._update(t._props.startTime + 0)
  #     tm._update(t._props.startTime + duration/2)
  #     tm._update(t._props.startTime + duration)
  #     expect(t._props.onComplete).toHaveBeenCalledWith true
  #     expect(t._props.onComplete.calls.count()).toBe 1

  #   it 'should fire only once when inside timeline #2', ()->
  #     cnt = 0; duration = 50; delay = 10
  #     tm = new mojs.Timeline # repeat: 1
  #     t1 = new Tween
  #       delay:      delay
  #       duration:   duration
  #       onComplete:-> cnt++
  #     t2 = new Tween
  #       delay:      2*delay
  #       duration:   2*duration

  #     tm.add t1, t2
  #     tm._setStartTime()

  #     tm._update t1._props.startTime
  #     tm._update t1._props.startTime + duration/2
  #     tm._update t1._props.startTime + duration + delay/2
  #     tm._update t1._props.startTime + duration + delay + 1

  #     tm._update t1._props.startTime + 2*duration + delay/2
  #     # end
  #     tm._update t1._props.startTime + 2*( duration + delay ) # <-- error
  #     tm._update t1._props.startTime + 2*( duration + delay ) + delay
  #     tm._update t1._props.startTime + 2*( duration + delay ) + 2*delay
  #     tm._update t1._props.startTime + 2*( duration + delay ) + 3*delay
  #     tm._update t1._props.startTime + 2*( duration + delay ) + 4*delay

  #     expect(cnt).toBe(1)

  #   # it 'should reset isCompleted and isFirstUpdate flag', ->
  #   it 'should reset isCompleted flag', ->
  #     t = new Tween( duration: 32 )._setStartTime()
  #     t._update(t._props.startTime + 10)
  #     t._update(t._props.startTime + 11)
  #     t._update(t._props.endTime)
  #     expect(t._isCompleted).toBe true
  #     # expect(t._isFirstUpdate).toBe false
  #     t._update(t._props.startTime + 10)
  #     expect(t._isCompleted).toBe false

  #   it 'should have the right scope', ->
  #     isRightScope = null
  #     t = new Tween
  #       duration: 10, onComplete:-> isRightScope = @ instanceof Tween
  #     t._setStartTime()._update t._props.startTime + 2
  #     t._setStartTime()._update t._props.startTime + 3
  #     t._setStartTime()._update t._props.startTime + 11
  #     expect(isRightScope).toBe true
  #   it 'should fire after the last onUpdate', (dfr)->
  #     proc = 0
  #     t = new Tween
  #       duration: 32,
  #       onUpdate:(p)-> proc = p
  #       onComplete:-> expect(proc).toBe(1); dfr()
  #     t._setStartTime()
  #     t._update t._props.startTime + 1
  #     t._update t._props.startTime + 2
  #     t._update t._props.startTime + 32

  # describe 'onStart callback ->', ->
  #   it 'should be defined', ->
  #     t = new Tween onStart: ->
  #     expect(t._props.onStart).toBeDefined()

  #   it 'should restart if tween was completed', ->
  #     startCnt = 0
  #     t = new Tween onStart: -> startCnt++

  #     t._setStartTime()
  #     t._update t._props.startTime + t._props.duration/2
  #     expect(startCnt).toBe 0 # because we ignore single updates
  #     t._update t._props.startTime + t._props.duration/2 + 10
  #     expect(startCnt).toBe 1
  #     t._update t._props.startTime + t._props.duration
  #     expect(startCnt).toBe 1
  #     t._update t._props.startTime - 10
  #     expect(startCnt).toBe 2
  #     t._update t._props.startTime + t._props.duration/2
  #     expect(startCnt).toBe 3

  #   it 'should run before onComplete if tween ended', ->
  #     startCnt = 0; callback = null
  #     t = new Tween
  #       onStart: ->   callback ?= 'start'; startCnt++
  #       onComplete:-> callback ?= 'complete'

  #     t._setStartTime()
  #     t._update t._props.startTime + t._props.duration/2
  #     expect(startCnt).toBe 0

  #     t._update t._props.startTime + t._props.duration/2 + 10
  #     expect(startCnt).toBe 1

  #     t._update t._props.startTime + t._props.duration
  #     expect(startCnt).toBe 1

  #     expect(callback).toBe 'start'

  # describe 'onFirstUpdate callback ->', ->
  #   it 'should be defined', ->
  #     t = new Tween onFirstUpdate: ->
  #     expect(t._props.onFirstUpdate).toBeDefined()

  # describe 'onRepeatStart callback ->', ->
  #   it 'should be defined', ->
  #     t = new Tween onRepeatStart: ->
  #     expect(t._props.onRepeatStart).toBeDefined()

  # describe 'onRepeatComplete callback ->', ->
  #   it 'should be defined', ->
  #     t = new Tween onRepeatComplete: ->
  #     expect(t._props.onRepeatComplete).toBeDefined()

  # describe 'yoyo option ->', ->
  #   it 'should receive yoyo option', ->
  #     t = new Tween yoyo: true
  #     expect(t._props.yoyo).toBe true

  # describe 'easing ->', ->
  #   it 'should parse easing string', ->
  #     t = new Tween(easing: 'Linear.None')
  #     expect(typeof t._props.easing).toBe 'function'
  #   it 'should parse standart easing', ->
  #     t = new Tween(easing: 'Sin.Out', duration: 100)
  #     t._setStartTime();
  #     t._update(t._props.startTime + 49)
  #     expect(t.progress).toBe 0
  #     expect(t.easedProgress).toBe undefined
  #     t._update(t._props.startTime + 50)
  #     expect(t.easedProgress).toBe easing.sin.out t.progress
  #   it 'should work with easing function', ->
  #     easings = one: -> a = 1
  #     t = new Tween(easing: easings.one)
  #     expect(t._props.easing.toString()).toBe easings.one.toString()
  #   it 'should work with easing function', (dfr)->
  #     easings = one:(k)-> k
  #     spyOn easings, 'one'
  #     t = new Tween(easing: easings.one)
  #     t._setStartTime();
  #     t._update t._props.startTime + 39
  #     t._update t._props.startTime + 40
  #     setTimeout (-> expect(easings.one).toHaveBeenCalled(); dfr()), 50
  # describe '_setProgress method ->', ->
  #   it 'should set the current progress', ->
  #     t = new Tween(easing: 'Bounce.Out')
  #     t._setProgress .75
  #     expect(t.progress).toBe .75
  #     expect(t.easedProgress.toFixed(2)).toBe '0.97'
  #   it 'should set return self', ->
  #     t = new Tween(easing: 'Bounce.Out')
  #     obj = t._setProgress .75
  #     expect(obj).toBe t

  # describe '_setProp method ->', ->
  #   it 'should set new timeline options', ->
  #     t = new Tween duration: 100, delay: 0
  #     t._setProp duration: 1000, delay: 200
  #     expect(t._props.duration).toBe 1000
  #     expect(t._props.delay).toBe    200
  #   it 'should work with arguments', ->
  #     t = new Tween duration: 100
  #     t._setProp 'duration', 1000
  #     expect(t._props.duration).toBe 1000
  #   it 'should call _calcDimentions method', ->
  #     t = new Tween duration: 100
  #     spyOn t, '_calcDimentions'
  #     t._setProp 'duration', 1000
  #     expect(t._calcDimentions).toHaveBeenCalled()
  #   it 'should update the time', ->
  #     t = new Tween duration: 100, delay: 100
  #     t._setProp 'duration', 1000
  #     expect(t._props.time).toBe 1100
  #   it 'should parse easing', ->
  #     t = new Tween duration: 100
  #     t._setProp 'easing', 'elastic.in'
  #     expect(t._props.easing).toBe mojs.easing.elastic.in

  # describe '_subPlay method ->', ->
  #   it 'should recalc _prevTime', (dfr)->
  #     t = new Tween
  #     t.play()
      
  #     setTimeout ->
  #       t.pause()

  #       now = performance.now()
  #       t.play().pause()
  #       expect(Math.abs(now - t._prevTime) ).not.toBeGreaterThan 5
  #       dfr()
  #     , 200

  #   it 'should recalc _prevTime if reversed', (dfr)->
  #     t = new Tween
  #     t.play()
      
  #     setTimeout ->
  #       t.pause()

  #       now = performance.now()
  #       prevTimeOld = t._prevTime
  #       shift = t._props.startTime - t._prevTime
  #       t.playBackward().pause()
  #       expect( Math.abs( t._prevTime - ( t._props.startTime - shift ) ) ).not.toBeGreaterThan 5
  #       dfr()
  #     , 200

  #   it 'should recalc startTime', (dfr)->
  #     duration = 1000; shift = 200
  #     t = new Tween duration: duration
  #     t.play()
  #     setTimeout ->
  #       t.pause()

  #       startTime = performance.now() - Math.abs(shift) - t._progressTime
  #       spyOn t, '_setStartTime'
  #       t.play(shift)
  #       expect(Math.abs(startTime - t._setStartTime.calls.argsFor(0)[0] ))
  #         .not.toBeGreaterThan 5
  #       dfr()
  #     , duration/2

  #   it 'should recalc startTime regarding speed', (dfr)->
  #     duration = 1000; shift = 200; speed = .5
  #     t = new Tween duration: duration, speed: speed
  #     t.play()
  #     setTimeout ->
  #       t.pause()
  #       startTime = performance.now() - Math.abs(shift) - t._progressTime/speed
  #       spyOn t, '_setStartTime'
  #       t.play(shift)
  #       expect(Math.abs(startTime - t._setStartTime.calls.argsFor(0)[0] ))
  #         .not.toBeGreaterThan 5
  #       dfr()
  #     , duration/2

  # describe 'play method ->', ->
  #   it 'should get the start time', ->
  #     t = new Tween
  #     t.play()
  #     p = t._props
  #     expect(p.startTime).toBeDefined()
  #     expect(p.endTime).toBe p.startTime + p.repeatTime
  #   it 'should set _state to "play"', ->
  #     t = new Tween
  #     t.play()
  #     expect(t._state).toBe 'play'
  #   it 'should reset _progressTime to 0 if tween ended', ->
  #     t = new Tween
  #     t._setStartTime()
  #     time = t._props.startTime
  #     t.setProgress(1).play()
  #     expect(Math.abs( time - t._props.startTime) ).not.toBeGreaterThan 5
  #   it 'should reset isReversed to false', ->
  #     t = new Tween
  #     t._props.isReversed = true
  #     t.play()
  #     expect(t._props.isReversed).toBe false
  #   it 'should call the setStartTime method',->
  #     t = new Tween
  #     spyOn t, '_setStartTime'
  #     t.play()
  #     expect(t._setStartTime).toHaveBeenCalled()
  #   it 'should add itself to tweener',->
  #     t = new Tween
  #     spyOn tweener, 'add'
  #     t.play()
  #     expect(tweener.add).toHaveBeenCalled()
  #   it 'should receive progress time',->
  #     t = new Tween
  #     t._setStartTime()
  #     time = t._props.startTime
  #     shift = 200
  #     t.play( shift )
  #     startTime = time - shift
  #     expect( startTime - t._props.startTime ).not.toBeGreaterThan 5
  #   it 'should treat negative progress time as positive',->
  #     t = new Tween
  #     t._setStartTime()
  #     time = t._props.startTime
  #     shift = -200
  #     t.play( shift )
  #     expect(t._props.startTime).toBe time - Math.abs(shift)
  #   it 'should encount time progress',->
  #     duration = 1000
  #     t = new Tween duration: duration
  #     progress = .5
  #     t.setProgress( progress - .1 )
  #     t.setProgress( progress )
  #     t.play()
  #     start = performance.now() - progress*t._props.repeatTime
  #     expect(Math.abs( t._props.startTime - start )).not.toBeGreaterThan 5
  #   it 'should recalc _progressTime if previous state was "reverse" + "pause"',->
  #     duration = 1000
  #     t = new Tween duration: duration
  #     t.setProgress(.75)
  #     progress = t._progressTime
  #     t
  #       .play()
  #       .playBackward()
  #       .pause()
  #       .play()
  #     expect(t._progressTime).toBe progress
  #   it 'should recalc _progressTime if previous state was "reverse"',->
  #     duration = 1000
  #     t = new Tween duration: duration
  #     t.setProgress(.75)
  #     progress = t._progressTime
  #     t
  #       .play()
  #       .playBackward()
  #       .play()
  #     expect(t._progressTime).toBe progress
  #   it 'should return immediately if already playing',->
  #     t = new Tween duration: 1000
  #     t.play()
  #     spyOn t, '_subPlay'
  #     t.play()
  #     expect(t._subPlay).not.toHaveBeenCalled()
  #   it 'should run if already playing but ended', (dfr)->
  #     duration = 50
  #     t = new Tween duration: duration
  #     t.play()
  #     setTimeout ->
  #       spyOn t, '_subPlay'
  #       t.play()
  #       expect(t._subPlay).toHaveBeenCalled()
  #       dfr()
  #     , 2*duration

  # describe 'reverse method ->', ->
  #   it 'should set _state to "reverse"',->
  #     t = new Tween
  #     t.playBackward()
  #     expect(t._state).toBe 'reverse'
  #   it 'should call _subPlay method',->
  #     t = new Tween
  #     spyOn t, '_subPlay'
  #     t.playBackward(200)
  #     expect(t._subPlay).toHaveBeenCalledWith 200
  #   it 'should return self',->
  #     t = new Tween
  #     obj = t.playBackward(200)
  #     expect(obj).toBe t
  #   it 'should overwrite play state',->
  #     t = new Tween
  #     t.playBackward(200)
  #     expect(t._prevState).toBe 'stop'
  #     expect(t._state).toBe 'reverse'
  #   # it 'should recalc _progressTime if previous state was "play" + "pause"',->
  #   it 'should recalc _progressTime',->
  #     duration = 1000
  #     t = new Tween duration: duration
  #     t.setProgress(.75)
  #     progress = t._progressTime
  #     t.playBackward()
  #     expect(t._progressTime).toBe progress
  #   it 'should recalc _progressTime if previous state was "play"',->
  #     duration = 1000
  #     t = new Tween duration: duration
  #     t.setProgress(.75)
  #     progress = t._progressTime
  #     t .play()
  #       .playBackward()
  #     expect(t._progressTime).toBe t._props.repeatTime - progress
  #   it 'should return immediately if already reversing',->
  #     t = new Tween duration: 1000
  #     t.playBackward()
  #     spyOn t, '_subPlay'
  #     t.playBackward()
  #     expect(t._subPlay).not.toHaveBeenCalled()

  #   it 'should run if already reversing but ended', (dfr)->
  #     duration = 50
  #     t = new Tween duration: duration
  #     t.playBackward()
  #     setTimeout ->
  #       spyOn t, '_subPlay'
  #       t.playBackward()
  #       expect(t._subPlay).toHaveBeenCalled()
  #       dfr()
  #     , 2*duration

  # describe 'stop method', ->
  #   it 'should call removeFromTweener method with self',->
  #     tweener.removeAll()
  #     timeline = new Tween duration: 2000
  #     timeline.play()
  #     spyOn timeline, '_removeFromTweener'
  #     timeline.stop()
  #     expect(timeline._removeFromTweener).toHaveBeenCalled()
  #   it 'should reset progress to 0 if played',->
  #     tweener.removeAll()
  #     tw = new Tween duration: 2000
  #     tw.play()
  #     spyOn tw, 'setProgress'
  #     tw.stop()
  #     expect(tw.setProgress).toHaveBeenCalledWith 0
  #   it 'should reset progress to 1 if playedBackward',->
  #     tweener.removeAll()
  #     tw = new Tween duration: 2000
  #     tw.playBackward()
  #     spyOn tw, 'setProgress'
  #     tw.stop()
  #     expect(tw.setProgress).toHaveBeenCalledWith 1
  #   it 'should receive progress to set',->
  #     tweener.removeAll()
  #     tw = new Tween duration: 2000
  #     tw.playBackward()
  #     spyOn tw, 'setProgress'
  #     tw.stop(.5)
  #     expect(tw.setProgress).toHaveBeenCalledWith .5
  #   it 'should reset _prevTime to null',->
  #     tweener.removeAll()
  #     tw = new Tween duration: 2000
  #     tw.play()
  #     tw.stop()
  #     expect(tw._prevTime).toBe null
  #   it 'should set _state to "stop"',->
  #     t = new Tween
  #     t.stop()
  #     expect(t._state).toBe 'stop'
  #   it 'should set isReversed to false',->
  #     t = new Tween
  #     t._props.isReversed = true
  #     t.stop()
  #     expect(t._props.isReversed).toBe false

  # describe 'pause method ->', ->
  #   it 'should call t.remove method with self',->
  #     tweener.removeAll()
  #     timeline = new Tween duration: 2000
  #     timeline.play()
  #     spyOn timeline, '_removeFromTweener'
  #     timeline.pause()
  #     expect(timeline._removeFromTweener).toHaveBeenCalled()
  #   it 'should set _state to "pause"',->
  #     t = new Tween
  #     t.pause()
    
  # describe '_setPlaybackState method ->', ->
  #   it 'should set playback state', ->
  #     t = new Tween
  #     t._setPlaybackState 'play'
  #     expect(t._state).toBe 'play'
  #   it 'should track previous playback state', ->
  #     t = new Tween
  #     t._setPlaybackState 'play'
  #     t._setPlaybackState 'pause'
  #     expect(t._prevState).toBe 'play'
  #     expect(t._state).toBe 'pause'

  #   it 'should overwrite previous playback state', ->
  #     t = new Tween
  #     t._setPlaybackState 'pause'
  #     t._setPlaybackState 'play'
  #     t._setPlaybackState 'reverse', true
  #     expect(t._prevState).toBe 'pause'
  #     expect(t._state).toBe 'reverse'

  # describe '_removeFromTweener method ->', ->
  #   it 'should call tweener.remove method with self',->
  #     tweener.removeAll()
  #     timeline = new Tween duration: 2000
  #     timeline.play()
  #     timeline._removeFromTweener()
  #     expect(tweener.tweens.length).toBe 0

  # describe '_complete method ->', ->
  #   it 'should call onComplete callback', ->
  #     isCalled = null
  #     fun = -> isCalled = true
  #     tw = new Tween onComplete: fun
  #     tw._complete()
  #     expect(isCalled).toBe true
    
  #   it 'should set isCompleted to true', ->
  #     tw = new Tween
  #     tw._complete()
  #     expect(tw._isCompleted).toBe true
  #   it 'should set isStarted flag to false', ->
  #     tw = new Tween
  #     tw._complete()
  #     expect(tw._isStarted).toBe false
  #   it 'should set isFirstUpdate flag to false', ->
  #     tw = new Tween
  #     tw._complete()
  #     expect(tw._isFirstUpdate).toBe false

  # describe '_start method ->', ->
  #   it 'should call onStart callback', ->
  #     isCalled = null
  #     fun = -> isCalled = true
  #     tw = new Tween onStart: fun
  #     tw._start()
  #     expect(isCalled).toBe true
  #   it 'should set isStarted to true', ->
  #     tw = new Tween
  #     tw._start()
  #     expect(tw._isStarted).toBe true
  #   it 'should set isCompleted flag to false', ->
  #     tw = new Tween
  #     tw._start()
  #     expect(tw._isCompleted).toBe false
  #   it 'should be called just once', ->
  #     tw = new Tween
  #     tw._start()
  #     tw._isCompleted = true
  #     tw._start()
  #     expect(tw._isCompleted).toBe true

  # describe '_repeatComplete method ->', ->
  #   it 'should call onRepeatComplete callback', ->
  #     isCalled = null
  #     fun = -> isCalled = true
  #     tw = new Tween onRepeatComplete: fun
  #     tw._repeatComplete()
  #     expect(isCalled).toBe true

  #   it 'should call onRepeatComplete callback only once', ->
  #     cnt = 0
  #     fun = -> cnt++
  #     tw = new Tween onRepeatComplete: fun
  #     tw._repeatComplete()
  #     tw._repeatComplete()
  #     expect(cnt).toBe 1
  #   it 'should set isRepeatCompleted to true', ->
  #     tw = new Tween
  #     tw._repeatComplete()
  #     expect(tw._isRepeatCompleted).toBe true

  # describe '_repeatStart method ->', ->
  #   it 'should call onRepeatStart callback', ->
  #     isCalled = null
  #     fun = -> isCalled = true
  #     tw = new Tween onRepeatStart: fun
  #     tw._repeatStart()
  #     expect(isCalled).toBe true

  #   it 'should call onRepeatStart callback only once', ->
  #     cnt = 0
  #     fun = -> cnt++
  #     tw = new Tween onRepeatStart: fun
  #     tw._repeatStart()
  #     tw._repeatStart()
  #     expect(cnt).toBe 1
  #   it 'should set isRepeatStart to true', ->
  #     tw = new Tween
  #     tw._repeatStart()
  #     expect(tw._isRepeatStart).toBe true

  # describe '_firstUpdate method ->', ->
  #   it 'should call onFirstUpdate callback', ->
  #     isCalled = null
  #     fun = -> isCalled = true
  #     tw = new Tween onFirstUpdate: fun
  #     tw._firstUpdate()
  #     expect(isCalled).toBe true
  #   it 'should call onFirstUpdate callback only once', ->
  #     cnt = 0
  #     fun = -> cnt++
  #     tw = new Tween onFirstUpdate: fun
  #     tw._firstUpdate()
  #     tw._firstUpdate()
  #     expect(cnt).toBe 1

  # describe 'callbacks order || forward ->', ->
  #   it 'should have the right order when normal direction || start', ->
  #     order = []
  #     tw = new Tween
  #       onStart:->          order.push( 'start' )
  #       onRepeatStart:->    order.push( 'repeat-start' )
  #       onFirstUpdate:->    order.push( 'first-update' )
  #       onUpdate:->         order.push( 'update' )
  #       onRepeatComplete:-> order.push( 'repeat-complete' )
  #       onComplete:->       order.push( 'complete' )

  #     tw._setStartTime()

  #     tw._update tw._props.startTime
  #     tw._update tw._props.startTime + 10

  #     expect(order[0]).toBe 'start'
  #     expect(order[1]).toBe 'repeat-start'
  #     expect(order[2]).toBe 'first-update'
  #     expect(order[3]).toBe 'update'
  #     expect(order[4]).toBe undefined

  #   it 'should have the right order when normal direction || start #2', ->
  #     order = []; isReact = false; duration = 500
  #     tw = new Tween
  #       duration:           duration
  #       onStart:->          isReact && order.push( 'start' )
  #       onRepeatStart:->    isReact && order.push( 'repeat-start' )
  #       onFirstUpdate:->    isReact && order.push( 'first-update' )
  #       onUpdate:->         isReact && order.push( 'update' )
  #       onRepeatComplete:-> isReact && order.push( 'repeat-complete' )
  #       onComplete:->       isReact && order.push( 'complete' )

  #     tw._setStartTime()

  #     tw._update tw._props.startTime
  #     tw._update tw._props.startTime + duration/2
  #     tw._update tw._props.startTime + duration/2 + 10
  #     tw._update tw._props.startTime + duration/2 - 10
  #     tw._update tw._props.startTime
      
  #     isReact = true
  #     tw._update tw._props.startTime + duration/2

  #     expect(order[0]).toBe 'start'
  #     expect(order[1]).toBe 'repeat-start'
  #     expect(order[2]).toBe 'first-update'
  #     expect(order[3]).toBe 'update'

  #   it 'should have the right order when normal direction || end', ->
  #     order = []; duration = 500
  #     tw = new Tween
  #       duration: duration
  #       onStart:-> order.push( 'start' )
  #       onRepeatStart:-> order.push( 'repeat-start' )
  #       onFirstUpdate:-> order.push( 'first-update' )
  #       onUpdate:-> order.push( 'update' )
  #       onRepeatComplete:-> order.push( 'repeat-complete' )
  #       onComplete:-> order.push( 'complete' )

  #     tw._setStartTime()

  #     tw._update tw._props.startTime + 10
  #     tw._update tw._props.startTime + duration/2
  #     tw._update tw._props.startTime + duration

  #     expect(order[0]).toBe 'start'
  #     expect(order[1]).toBe 'repeat-start'
  #     expect(order[2]).toBe 'first-update'
  #     expect(order[3]).toBe 'update'
  #     expect(order[4]).toBe 'update'
  #     expect(order[5]).toBe 'repeat-complete'
  #     expect(order[6]).toBe 'complete'
  #     expect(order[7]).toBe undefined

  #   it 'should have the right order when normal direction || repeat end', ->
  #     order = []; duration = 500
  #     tw = new Tween
  #       repeat: 1
  #       duration: duration
  #       onStart:->          order.push( 'start' )
  #       onRepeatStart:->    order.push( 'repeat-start' )
  #       onFirstUpdate:->    order.push( 'first-update' )
  #       onUpdate:->         order.push( 'update' )
  #       onRepeatComplete:-> order.push( 'repeat-complete' )
  #       onComplete:->       order.push( 'complete' )

  #     tw._setStartTime()

  #     tw._update tw._props.startTime + 10
  #     tw._update tw._props.startTime + duration/2
  #     tw._update tw._props.startTime + duration + 10
  #     tw._update tw._props.startTime + duration + duration/2
  #     tw._update tw._props.startTime + duration + duration

  #     expect(order[0]).toBe 'start'
  #     expect(order[1]).toBe 'repeat-start'
  #     expect(order[2]).toBe 'first-update'
  #     expect(order[3]).toBe 'update'
  #     expect(order[4]).toBe 'repeat-complete'
  #     expect(order[5]).toBe 'repeat-start'
  #     expect(order[6]).toBe 'update'
  #     expect(order[7]).toBe 'update'
  #     expect(order[8]).toBe 'update'
  #     expect(order[9]).toBe 'repeat-complete'
  #     expect(order[10]).toBe 'complete'
  #     expect(order[11]).toBe undefined

  #   it 'should have the right order when normal direction || end + delay', ->
  #     order = []; duration = 500; delay = 200
  #     tw = new Tween
  #       repeat:   1
  #       duration: duration
  #       delay:    delay
  #       onStart:->          order.push( 'start' )
  #       onRepeatStart:->    order.push( 'repeat-start' )
  #       onFirstUpdate:->    order.push( 'first-update' )
  #       onUpdate:->         order.push( 'update' )
  #       onRepeatComplete:-> order.push( 'repeat-complete' )
  #       onComplete:->       order.push( 'complete' )

  #     tw._setStartTime()

  #     tw._update tw._props.startTime + 10
  #     tw._update tw._props.startTime + duration/2
  #     tw._update tw._props.startTime + duration + delay/2
  #     tw._update tw._props.startTime + duration + delay + 10
  #     tw._update tw._props.startTime + duration + delay + duration/2
  #     tw._update tw._props.startTime + duration + delay + duration

  #     expect(order[0]).toBe 'start'
  #     expect(order[1]).toBe 'repeat-start'
  #     expect(order[2]).toBe 'first-update'
  #     expect(order[3]).toBe 'update'
  #     expect(order[4]).toBe 'update'
  #     expect(order[5]).toBe 'repeat-complete'
  #     expect(order[6]).toBe 'repeat-start'
  #     expect(order[7]).toBe 'update'
  #     expect(order[8]).toBe 'update'
  #     expect(order[9]).toBe 'update'
  #     expect(order[10]).toBe 'repeat-complete'
  #     expect(order[11]).toBe 'complete'
  #     expect(order[12]).toBe undefined

  # describe 'callbacks order || backward ->', ->
  #   it 'should have the right order when reverse direction || start', ->
  #     order = []; duration = 500
  #     tw = new Tween
  #       duration: duration
  #       onStart:->          order.push( 'start' )
  #       onRepeatStart:->    order.push( 'repeat-start' )
  #       onFirstUpdate:->    order.push( 'first-update' )
  #       onUpdate:->         order.push( 'update' )
  #       onRepeatComplete:-> order.push( 'repeat-complete' )
  #       onComplete:->       order.push( 'complete' )

  #     tw._setStartTime()

  #     tw._update tw._props.startTime + duration - duration/4
  #     tw._update tw._props.startTime + duration/2

  #     expect(order[0]).toBe 'complete'
  #     expect(order[1]).toBe 'repeat-complete'
  #     expect(order[2]).toBe 'first-update'
  #     expect(order[3]).toBe 'update'
  #     expect(order[4]).toBe undefined
      

  #   it 'should have the right order when reverse direction || end', ->
  #     order = []; duration = 500
  #     tw = new Tween
  #       duration:           duration
  #       onStart:->          order.push( 'start' )
  #       onRepeatStart:->    order.push( 'repeat-start' )
  #       onFirstUpdate:->    order.push( 'first-update' )
  #       onUpdate:->         order.push( 'update' )
  #       onRepeatComplete:-> order.push( 'repeat-complete' )
  #       onComplete:->       order.push( 'complete' )

  #     tw._setStartTime()

  #     tw._update tw._props.startTime + duration
  #     tw._update tw._props.startTime + duration/2
  #     tw._update tw._props.startTime + 10
  #     tw._update tw._props.startTime

  #     expect(order[0]).toBe 'complete'
  #     expect(order[1]).toBe 'repeat-complete'
  #     expect(order[2]).toBe 'first-update'
  #     expect(order[3]).toBe 'update'
  #     expect(order[4]).toBe 'update'
  #     expect(order[5]).toBe 'update'
  #     expect(order[6]).toBe 'repeat-start'
  #     expect(order[7]).toBe 'start'
  #     expect(order[8]).toBe undefined

  #   it 'should have the right order when reverse direction || repeat end', ->
  #     order = []; duration = 500
  #     tw = new Tween
  #       repeat:             1
  #       duration:           duration
  #       onStart:->          order.push( 'start' )
  #       onRepeatStart:->    order.push( 'repeat-start' )
  #       onFirstUpdate:->    order.push( 'first-update' )
  #       onUpdate:->         order.push( 'update' )
  #       onRepeatComplete:-> order.push( 'repeat-complete' )
  #       onComplete:->       order.push( 'complete' )

  #     tw._setStartTime()

  #     tw._update tw._props.startTime + duration + duration
  #     tw._update tw._props.startTime + duration + duration/2
  #     tw._update tw._props.startTime + duration + 10
  #     tw._update tw._props.startTime + duration/2
  #     tw._update tw._props.startTime + 10
  #     tw._update tw._props.startTime

  #     expect(order[0]).toBe 'complete'
  #     expect(order[1]).toBe 'repeat-complete'
  #     expect(order[2]).toBe 'first-update'
  #     expect(order[3]).toBe 'update'
  #     expect(order[4]).toBe 'update'
  #     expect(order[5]).toBe 'repeat-start'
  #     expect(order[6]).toBe 'repeat-complete'
  #     expect(order[7]).toBe 'update'
  #     expect(order[8]).toBe 'update'
  #     expect(order[9]).toBe 'update'
  #     expect(order[10]).toBe 'repeat-start'
  #     expect(order[11]).toBe 'start'
  #     expect(order[12]).toBe undefined
      
  #   it 'should have the right order when reverse direction || end + delay', ->
  #     order = []; duration = 500; delay = 200
  #     tw = new Tween
  #       repeat:             1
  #       duration:           duration
  #       delay:              delay
  #       onStart:->          order.push( 'start' )
  #       onRepeatStart:->    order.push( 'repeat-start' )
  #       onFirstUpdate:->    order.push( 'first-update' )
  #       onUpdate:->         order.push( 'update' )
  #       onRepeatComplete:-> order.push( 'repeat-complete' )
  #       onComplete:->       order.push( 'complete' )

  #     tw._setStartTime()

  #     tw._update tw._props.startTime + duration + delay + duration
  #     tw._update tw._props.startTime + duration + delay + duration/2
  #     tw._update tw._props.startTime + duration + delay + 10
  #     tw._update tw._props.startTime + duration + delay/2
  #     tw._update tw._props.startTime + duration/2
  #     tw._update tw._props.startTime + 10
  #     tw._update tw._props.startTime

  #     expect(order[0]).toBe 'complete'
  #     expect(order[1]).toBe 'repeat-complete'
  #     expect(order[2]).toBe 'first-update'
  #     expect(order[3]).toBe 'update'
  #     expect(order[4]).toBe 'update'
  #     expect(order[5]).toBe 'update'
  #     expect(order[6]).toBe 'repeat-start'
  #     expect(order[7]).toBe 'repeat-complete'
  #     expect(order[8]).toBe 'update'
  #     expect(order[9]).toBe 'update'
  #     expect(order[10]).toBe 'update'
  #     expect(order[11]).toBe 'repeat-start'
  #     expect(order[12]).toBe 'start'
  #     expect(order[13]).toBe undefined

  #   it 'should have the right order when reverse direction || end + delay #2', ->
  #     order = []; duration = 500; delay = 200
  #     tw = new Tween
  #       repeat:             1
  #       duration:           duration
  #       delay:              delay
  #       onStart:->          order.push( 'start' )
  #       onRepeatStart:->    order.push( 'repeat-start' )
  #       onFirstUpdate:->    order.push( 'first-update' )
  #       onUpdate:->         order.push( 'update' )
  #       onRepeatComplete:-> order.push( 'repeat-complete' )
  #       onComplete:->       order.push( 'complete' )

  #     tw._setStartTime()

  #     tw._update tw._props.startTime + duration + delay + duration
  #     tw._update tw._props.startTime + duration + delay + duration/2
  #     tw._update tw._props.startTime + duration + delay + 10
  #     tw._update tw._props.startTime + duration + delay/2
  #     tw._update tw._props.startTime + duration/2
  #     tw._update tw._props.startTime + 10
  #     tw._update tw._props.startTime - 10

  #     expect(order[0]).toBe 'complete'
  #     expect(order[1]).toBe 'repeat-complete'
  #     expect(order[2]).toBe 'first-update'
  #     expect(order[3]).toBe 'update'
  #     expect(order[4]).toBe 'update'
  #     expect(order[5]).toBe 'update'
  #     expect(order[6]).toBe 'repeat-start'
  #     expect(order[7]).toBe 'repeat-complete'
  #     expect(order[8]).toBe 'update'
  #     expect(order[9]).toBe 'update'
  #     expect(order[10]).toBe 'update'
  #     expect(order[11]).toBe 'repeat-start'
  #     expect(order[12]).toBe 'start'
  #     expect(order[13]).toBe undefined

  #   it 'should have the right order when reverse direction || end + delay #3', ->
  #     order = []; duration = 500; delay = 200
  #     isReact = false
  #     tw = new Tween
  #       repeat:             1
  #       duration:           duration
  #       delay:              delay
  #       onStart:->          isReact && order.push( 'start' )
  #       onRepeatStart:->    isReact && order.push( 'repeat-start' )
  #       onFirstUpdate:->    isReact && order.push( 'first-update' )
  #       onUpdate:->         isReact && order.push( 'update' )
  #       onRepeatComplete:-> isReact && order.push( 'repeat-complete' )
  #       onComplete:->       isReact && order.push( 'complete' )

  #     tw._setStartTime()

  #     tw._update tw._props.startTime
  #     tw._update tw._props.startTime + duration/2
  #     tw._update tw._props.startTime + duration
  #     tw._update tw._props.startTime + duration + delay
  #     tw._update tw._props.startTime + duration + delay + duration/2
  #     tw._update tw._props.startTime + duration + delay + duration + 10

  #     isReact = true

  #     tw._update tw._props.startTime + duration + delay + duration/2
  #     tw._update tw._props.startTime + duration + delay + 10
  #     tw._update tw._props.startTime + duration + delay/2
  #     tw._update tw._props.startTime + duration/2
  #     tw._update tw._props.startTime + 10
  #     tw._update tw._props.startTime - 10

  #     expect(order[0]).toBe 'complete'
  #     expect(order[1]).toBe 'repeat-complete'
  #     expect(order[2]).toBe 'first-update'
  #     expect(order[3]).toBe 'update'
  #     expect(order[4]).toBe 'update'
  #     expect(order[5]).toBe 'update'
  #     expect(order[6]).toBe 'repeat-start'
  #     expect(order[7]).toBe 'repeat-complete'
  #     expect(order[8]).toBe 'update'
  #     expect(order[9]).toBe 'update'
  #     expect(order[10]).toBe 'update'
  #     expect(order[11]).toBe 'repeat-start'
  #     expect(order[12]).toBe 'start'
  #     expect(order[13]).toBe undefined

  # it 'should have the right order when reverse direction || end + delay #3', ->
  #   order = []; duration = 500; delay = 200
  #   isReact = false
  #   tw = new Tween
  #     duration:           duration
  #     onStart:->          isReact && order.push( 'start' )
  #     onRepeatStart:->    isReact && order.push( 'repeat-start' )
  #     onFirstUpdate:->    isReact && order.push( 'first-update' )
  #     onUpdate:->         isReact && order.push( 'update' )
  #     onRepeatComplete:-> isReact && order.push( 'repeat-complete' )
  #     onComplete:->       isReact && order.push( 'complete' )

  #   tw._setStartTime()

  #   tw._update tw._props.startTime
  #   tw._update tw._props.startTime + duration/2
  #   tw._update tw._props.startTime + duration

  #   isReact = true
  #   tw._update tw._props.startTime + duration/2
  #   tw._update tw._props.startTime - 10

  #   expect(order[0]).toBe 'complete'
  #   expect(order[1]).toBe 'repeat-complete'
  #   expect(order[2]).toBe 'first-update'
  #   expect(order[3]).toBe 'update'
  #   expect(order[4]).toBe 'update'
  #   expect(order[5]).toBe 'repeat-start'
  #   expect(order[6]).toBe 'start'
  #   expect(order[7]).toBe undefined

  # describe 'negative delay', ->
  #   it 'should save negative delay to _negativeShift property', ->
  #     tw = new Tween
  #       delay: -200

  #     expect(tw._negativeShift).toBe -200

  #   it 'should set negative delay to 0', ->
  #     tw = new Tween delay: -200

  #     expect(tw._negativeShift).toBe -200
  #     expect(tw._props.delay).toBe 0

  #   it 'should calculate startTime regarding negative delay', ->
  #     delay = -200
  #     tw = new Tween delay: delay

  #     time = performance.now()
  #     tw._setStartTime(time)

  #     expect(tw._props.startTime).toBe time-200

  # describe 'setProgress method ->', ->
  #   it 'should call _setStartTime if there is no this._props.startTime', ->
  #     t = new Tween
  #     spyOn t, '_setStartTime'
  #     t.setProgress .5
  #     expect(t._setStartTime).toHaveBeenCalled()
  #   it 'should return self', ->
  #     t = new Tween
  #     result = t.setProgress .5
  #     expect(result).toBe t
  #   it 'should call self _update', ->
  #     duration = 500; progress = .75
  #     t   = new Tween duration: duration
  #     # t.add new Tween duration: duration
  #     spyOn t, '_update'
  #     t.setProgress progress
  #     expect(t._update).toHaveBeenCalledWith t._props.startTime + (progress*duration)
  #   it 'should not set the progress less then 0', ->
  #     delay = 5000
  #     t   = new Tween delay: delay
  #     spyOn t, '_update'
  #     t.setProgress -1.5
  #     expect(t._update).toHaveBeenCalledWith t._props.startTime - delay
  #   it 'should not set the progress more then 1', ->
  #     delay  = 200
  #     t   = new Tween delay: delay
  #     spyOn t, '_update'
  #     t.setProgress 1.5
  #     expect(t._update).toHaveBeenCalledWith (t._props.startTime - delay) + t._props.repeatTime
  #   it 'should set _playTime to null', ->
  #     delay  = 200
  #     t   = new Tween delay: delay
  #     t.play().pause()
  #     t.setProgress(.5)
  #     expect(t._playTime).toBe null

  # # TODO: return when timeline -> tween update is ready
  # describe 'onComplete callback ->', ->
  #   it 'should be called just once when finished and inside Timeline ->', ->
  #     zeroCnt = 0;    oneCnt = 0
  #     startCnt = 0;   completeCnt = 0
  #     repeatCnt = 0;  repeatStartCnt = 0
  #     firstUpdateCnt = 0; firstUpdateDirection = null
  #     startDirection = null; completeDirection = null
  #     repeatStartDirection = null; repeatCompleteDirection = null
  #     duration = 50; updateValue = null; updateDirection = null
      
  #     debug = false
  #     tm = new Timeline
  #     tw = new Tween
  #       duration:   duration
  #       onUpdate:(p, ep, isForward)->
  #         debug and console.log "ONUPDATE #{p}"
  #         updateDirection = isForward
  #         updateValue = p
  #         (p is 0) and zeroCnt++
  #         (p is 1) and oneCnt++
  #       onRepeatComplete:(isForward)->
  #         debug and console.log "REPEAT COMPLETE #{isForward}"
  #         repeatCompleteDirection = isForward
  #         repeatCnt++
  #       onRepeatStart:(isForward)->
  #         debug and console.log "REPEAT START #{isForward}"
  #         repeatStartDirection = isForward
  #         repeatStartCnt++
  #       onStart:(isForward)->
  #         debug and console.log "START #{isForward}"
  #         startDirection = isForward
  #         startCnt++
  #       onComplete:(isForward)->
  #         debug and console.log "COMPLETE #{isForward}"
  #         completeDirection = isForward
  #         completeCnt++
  #       onFirstUpdate:(isForward)->
  #         debug and console.log "FIRST UPDATE #{isForward}"
  #         firstUpdateDirection = isForward
  #         firstUpdateCnt++

  #     tm.add tw

  #     tm.setProgress(0)
  #     tm.setProgress(.5)
  #     tm.setProgress(.9)
  #     tm.setProgress(1)
  #     tm.setProgress(.9)
  #     tm.setProgress(.8)

  #     expect(completeCnt).toBe 2

  # describe '_progress method ->', ->
  #   it 'should call onProgress callback', ->
  #     duration = 1000
  #     tw = new Tween duration: duration, onProgress:->
  #     spyOn tw._props, 'onProgress'
  #     tw._setStartTime()
  #     time = tw._props.startTime + duration/2
  #     tw._prevTime = time - 1
  #     tw._progress( .5, time )
  #     expect(tw._props.onProgress).toHaveBeenCalledWith .5, true

  # describe 'onProgress callback ->', ->
  #   it 'should be called with current progress and direction', ->
  #     duration = 1000
  #     tw = new Tween duration: duration, onProgress:->
  #     spyOn(tw, '_progress').and.callThrough()
  #     spyOn tw._props, 'onProgress'
  #     tw._setStartTime()
  #     time = tw._props.startTime + duration/2
  #     tw._update time - 1
  #     tw._update time
  #     expect(tw._progress).toHaveBeenCalledWith .5, time
  #     expect(tw._props.onProgress).toHaveBeenCalledWith .5, true

  #   it 'should include all delays and repeats', ->
  #     duration = 1000; delay = 200; repeat = 2
  #     tw = new Tween
  #       duration: duration,
  #       delay: delay,
  #       repeat: repeat,
  #       onProgress:->

  #     spyOn(tw, '_progress').and.callThrough()
  #     spyOn tw._props, 'onProgress'
  #     tw._setStartTime()
  #     time = tw._props.startTime + 2*(duration + delay) + duration/2
  #     tw._update time - 1
  #     tw._update time

  #     p = tw._props
  #     startPoint = p.startTime - p.delay
  #     resultProgress = (time - startPoint) / p.repeatTime

  #     expect(tw._progress).toHaveBeenCalledWith resultProgress, time
  #     expect(tw._props.onProgress).toHaveBeenCalledWith resultProgress, true

  #   it 'should be called only in active bounds regarding delay "-"', ->
  #     duration = 1000; delay = 200
  #     tw = new Tween
  #       duration: duration
  #       delay: delay
  #       onProgress:->

  #     tw._setStartTime()
  #     p = tw._props
  #     startPoint = p.startTime - p.delay

  #     spyOn(tw, '_progress').and.callThrough()
  #     spyOn tw._props, 'onProgress'

  #     time = p.startTime - delay/2
  #     tw._update time - 1
  #     tw._update time

  #     expect(tw._progress).toHaveBeenCalledWith (delay/2)/p.repeatTime, time
  #     expect(tw._progress.calls.count()).toBe 1
  #     expect(tw._props.onProgress).toHaveBeenCalledWith (delay/2)/p.repeatTime, true

  #   it 'should be called only in active bounds "-"', ->
  #     duration = 1000; delay = 200
  #     tw = new Tween duration: duration, delay: delay, onProgress:->
  #     spyOn(tw, '_progress').and.callThrough()
  #     spyOn tw._props, 'onProgress'
  #     tw._setStartTime()
  #     time = (tw._props.startTime - delay) - delay/2
  #     tw._update time - 1
  #     tw._update time
  #     expect(tw._progress).not.toHaveBeenCalled()
  #     expect(tw._props.onProgress).not.toHaveBeenCalled()

  #   it 'should be called only in active bounds "+"', ->
  #     duration = 1000
  #     tw = new Tween duration: duration, onProgress:->
  #     spyOn(tw, '_progress').and.callThrough()
  #     spyOn tw._props, 'onProgress'
  #     tw._setStartTime()
  #     time = tw._props.startTime + 2*duration
  #     tw._update time - 1
  #     tw._update time
  #     expect(tw._progress).not.toHaveBeenCalled()
  #     expect(tw._props.onProgress).not.toHaveBeenCalled()

  #   it 'should be called only once after active bounds "-"', ->
  #     duration = 1000
  #     tw = new Tween duration: duration, onProgress:->
  #     tw._setStartTime()
  #     time = tw._props.startTime + duration/2
  #     tw._update time
  #     tw._update time - 10
  #     spyOn(tw, '_progress').and.callThrough()
  #     spyOn tw._props, 'onProgress'
  #     tw._update time - duration
  #     tw._update time - duration - 10
  #     expect(tw._progress).toHaveBeenCalledWith 0, time - duration
  #     expect(tw._progress.calls.count()).toBe 1
  #     expect(tw._props.onProgress).toHaveBeenCalledWith 0, false
  #     expect(tw._props.onProgress.calls.count()).toBe 1

  #   it 'should be called only once after active bounds "+"', ->
  #     duration = 1000
  #     tw = new Tween duration: duration, onProgress:->
  #     tw._setStartTime()
  #     time = tw._props.startTime + duration/2
  #     tw._update time
  #     tw._update time + 10
  #     spyOn(tw, '_progress').and.callThrough()
  #     spyOn tw._props, 'onProgress'
  #     tw._update time + duration
  #     tw._update time + duration + 10
  #     expect(tw._progress).toHaveBeenCalledWith 1, time + duration
  #     expect(tw._progress.calls.count()).toBe 1
  #     expect(tw._props.onProgress).toHaveBeenCalledWith 1, true
  #     expect(tw._props.onProgress.calls.count()).toBe 1








