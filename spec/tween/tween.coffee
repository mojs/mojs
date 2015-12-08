Tween    = window.mojs.Tween
easing   = window.mojs.easing
h        = window.mojs.h
tweener  = window.mojs.tweener


createUpdateInPeriod = (t, duration)->
  (timeShift)->
    t.update t.props.startTime + timeShift
    t.update t.props.startTime + timeShift + (duration/2)
    t.update t.props.startTime + timeShift + (duration)

createUpdateInPeriodWithGap = (t, duration, gap=5)->
  (timeShift)->
    t.update t.props.startTime + timeShift + gap
    t.update t.props.startTime + timeShift + (duration/2)
    t.update t.props.startTime + timeShift + (duration) - gap

r_createUpdateInPeriod = (t, duration)->
  (timeShift)->
    t.update t.props.startTime + timeShift + (duration)
    t.update t.props.startTime + timeShift + (duration/2)
    t.update t.props.startTime + timeShift

r_createUpdateInPeriodWithGap = (t, duration, gap=5)->
  (timeShift)->
    t.update t.props.startTime + timeShift + (duration) - gap
    t.update t.props.startTime + timeShift + (duration/2)
    t.update t.props.startTime + timeShift + gap

describe 'Tween ->', ->
  describe 'defaults ->', ->
    it 'should have vars', ->
      t = new Tween
      expect(t.props) .toBeDefined()
      expect(t.h)     .toBeDefined()
      expect(t.progress).toBe 0
    it 'should have defaults', ->
      t = new Tween
      expect(t.defaults.duration).toBe  600
      expect(t.defaults.delay).toBe     0
      expect(t.defaults.yoyo).toBe      false
      expect(t.defaults.isChained).toBe false
    it 'should extend defaults to props', ->
      t = new Tween duration: 1000
      expect(t.props.duration).toBe   1000
      expect(t.props.delay).toBe      0
  describe 'init ->', ->
    it 'should calc time, repeatTime', ->
      t = new Tween duration: 1000, delay: 100
      expect(t.props.time).toBe        1100
      expect(t.props.repeatTime).toBe  1100
    it 'should calc time, repeatTime #2', ->
      t = new Tween duration: 1000, delay: 100, repeat: 2
      expect(t.props.time).toBe        1100
      expect(t.props.repeatTime).toBe  3300
    # it 'should calculate shiftedRepeatTime', ->
    #   t = new Tween duration: 1000, delay: 100, repeat: 2
    #   expect(t.props.time).toBe             1100
    #   expect(t.props.repeatTime).toBe       3300
    #   expect(t.props.shiftedRepeatTime).toBe  3200
    # it 'should calculate shiftedRepeatTime #2', ->
    #   t = new Tween duration: 1000, delay: 100, repeat: 2
    #   t.setProp 'shiftTime', 700
    #   expect(t.props.time).toBe              1100
    #   expect(t.props.repeatTime).toBe        3300
    #   expect(t.props.shiftedRepeatTime).toBe 3900

  describe 'isChained option ->', ->
    it 'should recieve isChained option', ->
      t = new Tween
        duration: 1000, isChained: true
      expect(t.props.isChained).toBe  true
    it 'should fallback to default isChained option', ->
      t = new Tween duration: 1000
      expect(t.props.isChained).toBe false

  describe 'setStartTime ->', ->
    it 'should calculate start time', ->
      t = new Tween(duration: 1000, delay: 500).setStartTime()
      expectedTime = performance.now() + 500
      expect(t.props.startTime).toBeGreaterThan expectedTime - 50
      expect(t.props.startTime).not.toBeGreaterThan expectedTime
    it 'should recieve the start time', ->
      t = new Tween(duration: 1000).setStartTime 1
      expect(t.props.startTime).toBe 1
    it 'should calculate end time', ->
      duration = 1000; delay = 500
      t = new Tween(duration: duration, delay: delay).setStartTime()
      endTime = t.props.startTime + t.props.repeatTime - t.props.delay
      expect(t.props.endTime).toBe endTime
    it 'should calculate end time with repeat', ->
      duration = 1000; delay = 500
      t = new Tween(duration: duration, delay: delay, repeat: 2).setStartTime()
      endTime = t.props.startTime + t.props.repeatTime - t.props.delay
      expect(t.props.endTime).toBe endTime
    it 'should calculate end time if repeat', ->
      duration = 1000; delay = 500
      t = new Tween(duration: duration, delay: delay, repeat: 2).setStartTime()
      time = t.props.startTime + (3*(duration+delay)) - delay
      expect(t.props.endTime).toBe time
    it 'should calculate startTime and endTime if shifted', ->
      duration = 1000; delay = 500
      t = new Tween(duration: duration, delay: delay, repeat: 2)
      t.setProp 'shiftTime', 500
      t.setStartTime()

      expectedTime = performance.now() + 500 + delay
      expect(t.props.startTime).toBeGreaterThan expectedTime - 50
      expect(t.props.startTime).not.toBeGreaterThan expectedTime

      endTime = t.props.startTime + (3*(duration+delay)) - delay
      expect(t.props.endTime).toBe endTime

    # it 'should restart flags', ->
    #   t = new Tween(duration: 20, repeat: 2).setStartTime()
    #   t.update t.props.startTime + 10
    #   t.update t.props.startTime + 60
    #   expect(t.isCompleted).toBe true
    #   expect(t.isStarted)  .toBe false
    #   expect(t.isRepeatCompleted).toBe true
    #   t.setStartTime()
    #   expect(t.isCompleted).toBe false
    #   expect(t.isRepeatCompleted).toBe false
    #   expect(t.isStarted)  .toBe false
  
  describe 'update method ->', ->
    it 'should update progress', ->
      t = new Tween(duration: 1000, delay: 500)
      t.setStartTime()
      time = t.props.startTime + 199
      t.update time
      expect(t.progress).toBe 0
      time = t.props.startTime + 200
      t.update time
      expect(t.progress).toBeCloseTo .2, 5
    it 'should update progress with repeat', ->
      t = new Tween(duration: 1000, delay: 200, repeat: 2)
      t.setStartTime()
      t.update t.props.startTime + 1399
      expect(t.progress).toBeCloseTo 0
      t.update t.props.startTime + 1400
      expect(t.progress).toBeCloseTo .2
      t.update t.props.startTime + 2700
      expect(t.progress).toBeCloseTo .3
      t.update t.props.startTime + 3400
      expect(t.progress).toBe 1
    it 'should update progress to 1 if in delay gap and previous time value
        was smaller then the current one', ->
      t = new Tween(duration: 1000, delay: 200, repeat: 2)
      t.setStartTime()
      t.update t.props.startTime + 300
      t.update t.props.startTime + 1100
      expect(t.progress).toBe 1
    it 'should update progress to 1 if in delay gap and previous time value
        was bigger then the current one', ->
      t = new Tween(duration: 1000, delay: 200, repeat: 2)
      t.setStartTime()
      t.update t.props.startTime + 1300
      t.update t.props.startTime + 1100
      expect(t.progress).toBe 0
    it 'should update progress to 1 on the end', ->
      t = new Tween(duration: 1000, delay: 200, repeat: 2)
      t.setStartTime()
      t.update t.props.startTime + 500
      expect(t.progress).toBeCloseTo 0
      t.update t.props.startTime + 1000
      expect(t.progress).toBeCloseTo 1, 5
    # it 'should return true on the end', ->
    #   t = new Tween(duration: 1000, delay: 200)
    #   t.setStartTime()
    #   returnValue = t.update t.props.startTime + 1000
    #   expect(t.progress).toBeCloseTo 1, 5
    #   expect(t.isCompleted).toBe true
    #   expect(t.isRepeatCompleted).toBe true
    #   expect(returnValue).toBe true
    
    # remove it
    # it 'should set progress to 1 on delay gaps', ->
    #   t = new Tween(duration: 1000, delay: 200, isIt: true)
    #   t.setStartTime()

    #   spyOn(t, '_complete').and.callThrough()
    #   t.update t.props.startTime + 20, true
    #   t.update t.props.startTime - 20, true
    #   expect(t.progress).toBe 1
    #   expect(t._complete).toHaveBeenCalled()

    it 'should not call update method if timeline isnt active "-"', ->
      t = new Tween(duration: 1000, onUpdate:->)
      t.setStartTime()
      spyOn t, 'onUpdate'
      t.update(t.props.startTime - 500)
      expect(t.onUpdate).not.toHaveBeenCalled()

    it 'should not call update method if timeline isnt active but was "-"', ->
      t = new Tween(duration: 1000, onUpdate:->)
      t.setStartTime()
      spyOn t, 'onUpdate'
      t.update(t.props.startTime + 500)
      t.update(t.props.startTime + 200)
      expect(t._isInActiveArea).toBe(true)

      t.update(t.props.startTime - 500)
      expect(t._isInActiveArea).toBe(false)
      expect(t.onUpdate).toHaveBeenCalledWith(0,0)
      
      t.update(t.props.startTime - 500)
      expect(t._isInActiveArea).toBe(false)
      expect(t.onUpdate.calls.count()).toBe 3


    it 'should not call update method if timeline isnt active "+"', ->
      t = new Tween(duration: 1000, onUpdate:-> )
      spyOn t, 'onUpdate'
      t.setStartTime(); t.update(performance.now() + 1500)
      expect(t.onUpdate).not.toHaveBeenCalled()
    
    it 'should not call update method if timeline isnt active but was "+"', ->
      t = new Tween(duration: 1000, onUpdate:-> )
      spyOn t, 'onUpdate'
      t.setStartTime();
      t.update(t.props.startTime + 200)
      t.update(t.props.startTime + 500)
      expect(t._isInActiveArea).toBe(true)
      t.update(t.props.startTime + 1500)
      expect(t._isInActiveArea).toBe(false)
      expect(t.onUpdate).toHaveBeenCalledWith(1, 1)

    it 'should set Tween to the end if Tween ended', ->
      t = new Tween(duration: 1000, delay: 500)
      t.setStartTime()
      t.update t.props.startTime + 200
      t.update t.props.startTime + 1200
      expect(t.progress).not.toBe 1
  
  describe 'onUpdate callback ->', ->
    it 'should be defined', ->
      t = new Tween onUpdate: ->
      expect(t.props.onUpdate).toBeDefined()
    it 'should call onUpdate callback with the current progress', ->
      t = new Tween duration: 1000, easing: 'bounce.out', onUpdate: ->
      spyOn t, 'onUpdate'
      t.setStartTime()
      t.update t.props.startTime + 499
      t.update t.props.startTime + 500
      expect(t.onUpdate).toHaveBeenCalledWith t.easedProgress, t.progress
    it 'should have the right scope', ->
      isRightScope = false
      t = new Tween onUpdate:-> isRightScope = @ instanceof Tween
      t.setStartTime()
      t.update t.props.startTime + 199
      t.update t.props.startTime + 200
      expect(isRightScope).toBe true
    it 'should be called just once on delay', ->
      t = new Tween delay: 200, repeat: 2, onUpdate:->
      spyOn(t, 'onUpdate').and.callThrough()
      t.setStartTime()
      t.update t.props.startTime + t.props.duration + 50
      t.update t.props.startTime + t.props.duration + 100
      t.update t.props.startTime + t.props.duration + 150
      expect(t.onUpdate.calls.count()).toBe 1
    it 'should pass eased progress and raw progress', ->
      easedProgress = null
      progress      = null
      t = new Tween
        easing: 'cubic.out'
        onUpdate:(ep, p)->
          easedProgress = ep
          progress = p

      t.setProgress .5
      expect(easedProgress).toBe mojs.easing.cubic.out progress

    ###
      TWEEN IN NORMAL DIRECTION
    ###

    it 'should be called with 1 and 0 on each repeat period', ()->
      zeroCnt = 0; oneCnt = 0
      startCnt = 0; completeCnt = 0
      repeatCnt = 0; repeatStartCnt = 0
      duration = 50; updateValue = null
      t = new Tween
        repeat:     1
        duration:   duration
        onUpdate:(p)->
          updateValue = p
          (p is 0) and zeroCnt++
          (p is 1) and oneCnt++
        onRepeatComplete:-> repeatCnt++
        onRepeatStart:-> repeatStartCnt++
        onStart:-> startCnt++
      
      t.setStartTime()
      
      timeShift = 0
      t.update t.props.startTime + timeShift
      expect(updateValue).toBe(null)
      expect(t._wasUknownUpdate).toBe(true)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(0)
      expect(repeatStartCnt).toBe(0)
      expect(repeatCnt).toBe(0)
      expect(startCnt).toBe(0)

      t.update t.props.startTime + timeShift + (duration/2)
      expect(updateValue).toBeCloseTo(.5, 5)
      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(1)
      expect(repeatStartCnt).toBe(1)
      expect(repeatCnt).toBe(0)
      expect(startCnt).toBe(1)

      t.update t.props.startTime + timeShift + (duration)
      expect(updateValue).toBe(0)
      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(1)
      expect(zeroCnt).toBe(2)
      expect(repeatStartCnt).toBe(2)
      expect(repeatCnt).toBe(1)
      expect(startCnt).toBe(1)

      timeShift = duration
      t.update t.props.startTime + timeShift + (duration/2)
      expect(updateValue).toBeCloseTo(.5, 5)
      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(1)
      expect(zeroCnt).toBe(2)
      expect(repeatStartCnt).toBe(2)
      expect(repeatCnt).toBe(1)
      expect(startCnt).toBe(1)

      t.update t.props.startTime + timeShift + (duration)
      expect(updateValue).toBe(1)
      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(2)
      expect(zeroCnt).toBe(2)
      expect(repeatStartCnt).toBe(2)
      expect(startCnt).toBe(1)
      # expect(repeatCnt).toBe(2)

    it 'should be called with 1 and 0 on each repeat period if missed time', ()->
      zeroCnt = 0; oneCnt = 0
      startCnt = 0; completeCnt = 0
      repeatCnt = 0; repeatStartCnt = 0
      duration = 50; updateValue = null
      t = new Tween
        repeat:     1
        duration:   duration
        onUpdate:(p)->
          updateValue = p
          (p is 0) and zeroCnt++
          (p is 1) and oneCnt++
        onRepeatComplete:-> repeatCnt++
        onRepeatStart:-> repeatStartCnt++
        onStart:-> startCnt++

      t.setStartTime()

      gap = 5
      timeShift = 0
      t.update t.props.startTime + timeShift + gap
      
      expect(updateValue).toBe(null)
      expect(t._wasUknownUpdate).toBe(true)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(0)
      expect(repeatStartCnt).toBe(0)
      expect(repeatCnt).toBe(0)
      expect(startCnt).toBe(0)

      t.update t.props.startTime + timeShift + (duration/2)
      expect(updateValue).toBeCloseTo(.5, 5)
      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(1)
      expect(repeatStartCnt).toBe(1)
      expect(repeatCnt).toBe(0)
      expect(startCnt).toBe(1) 

      t.update t.props.startTime + timeShift + (duration) - gap
      expect(updateValue).toBeCloseTo(.9, 5)
      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(1)
      expect(repeatStartCnt).toBe(1)
      expect(repeatCnt).toBe(0)
      expect(startCnt).toBe(1)

      timeShift = duration
      t.update t.props.startTime + timeShift + gap
      expect(updateValue).toBeCloseTo(.1, 5)
      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(1)
      expect(zeroCnt).toBe(2)
      expect(repeatStartCnt).toBe(2)
      expect(repeatCnt).toBe(1)
      expect(startCnt).toBe(1)

      t.update t.props.startTime + timeShift + (duration/2)
      expect(updateValue).toBeCloseTo(.5, 5)
      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(1)
      expect(zeroCnt).toBe(2)
      expect(repeatStartCnt).toBe(2)
      expect(repeatCnt).toBe(1)
      expect(startCnt).toBe(1)

      timeShift = 2*duration
      t.update t.props.startTime + timeShift + gap
      expect(updateValue).toBeCloseTo(1)
      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(2)
      expect(zeroCnt).toBe(2)
      expect(repeatStartCnt).toBe(2)
      expect(repeatCnt).toBe(2)
      expect(startCnt).toBe(1)

    it 'should be called with 1 and 0 on each repeat period if delay', ()->
      zeroCnt = 0; oneCnt = 0
      startCnt = 0; completeCnt = 0
      repeatCnt = 0; repeatStartCnt = 0
      duration = 50; delay = 20; updateValue = null
      t = new Tween
        repeat:     2
        duration:   duration
        delay:      delay
        onUpdate:(p)->
          updateValue = p
          (p is 0) and zeroCnt++
          (p is 1) and oneCnt++
        onRepeatComplete:-> repeatCnt++
        onRepeatStart:-> repeatStartCnt++
        onStart:-> startCnt++

      t.setStartTime()

      timeShift = 0
      t.update t.props.startTime + timeShift
      expect(updateValue).toBe(null)
      expect(t._wasUknownUpdate).toBe(true)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(0)
      expect(repeatStartCnt).toBe(0)
      expect(repeatCnt).toBe(0)
      expect(startCnt).toBe(0)

      t.update t.props.startTime + timeShift + (duration/2)
      expect(updateValue).toBeCloseTo(.5, 5)
      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(1)
      expect(repeatStartCnt).toBe(1)
      expect(repeatCnt).toBe(0)
      expect(startCnt).toBe(1)

      t.update t.props.startTime + timeShift + (duration)
      expect(updateValue).toBe(1)
      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(1)
      expect(zeroCnt).toBe(1)
      expect(repeatStartCnt).toBe(1)
      expect(repeatCnt).toBe(1)
      expect(startCnt).toBe(1)

      timeShift = duration + delay
      t.update t.props.startTime + timeShift
      expect(updateValue).toBe(0)
      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(1)
      expect(zeroCnt).toBe(2)
      expect(repeatStartCnt).toBe(2)
      expect(repeatCnt).toBe(1)
      expect(startCnt).toBe(1)

      t.update t.props.startTime + timeShift + (duration/2)
      expect(updateValue).toBeCloseTo(.5, 5)
      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(1)
      expect(zeroCnt).toBe(2)
      expect(repeatStartCnt).toBe(2)
      expect(repeatCnt).toBe(1)
      expect(startCnt).toBe(1)

      t.update t.props.startTime + timeShift + (duration)
      expect(updateValue).toBe(1)
      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(2)
      expect(zeroCnt).toBe(2)
      expect(repeatStartCnt).toBe(2)
      expect(repeatCnt).toBe(2)
      expect(startCnt).toBe(1)

      timeShift = 2*(duration + delay)
      t.update t.props.startTime + timeShift
      expect(updateValue).toBe(0)
      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(2)
      expect(zeroCnt).toBe(3)
      expect(repeatStartCnt).toBe(3)
      expect(repeatCnt).toBe(2)
      expect(startCnt).toBe(1)

      t.update t.props.startTime + timeShift + (duration/2)
      expect(updateValue).toBeCloseTo(.5, 5)
      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(2)
      expect(zeroCnt).toBe(3)
      expect(repeatStartCnt).toBe(3)
      expect(repeatCnt).toBe(2)
      expect(startCnt).toBe(1)

      t.update t.props.startTime + timeShift + (duration)
      expect(updateValue).toBe(1)
      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(3)
      expect(zeroCnt).toBe(3)
      expect(repeatStartCnt).toBe(3)
      expect(repeatCnt).toBe(3)
      expect(startCnt).toBe(1)

      t.update t.props.startTime + timeShift + (duration) + delay/2
      expect(updateValue).toBe(1)
      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(3)
      expect(zeroCnt).toBe(3)
      expect(repeatStartCnt).toBe(3)
      expect(repeatCnt).toBe(3)
      expect(startCnt).toBe(1)

    it 'should be called with 1 and 0 on each repeat period if in delay', ()->
      zeroCnt = 0; oneCnt = 0
      startCnt = 0; completeCnt = 0
      repeatCnt = 0; repeatStartCnt = 0
      duration = 50; delay = 20; updateValue = null
      t = new Tween
        repeat:     2
        duration:   duration
        delay:      delay
        onUpdate:(p)->
          updateValue = p
          (p is 0) and zeroCnt++
          (p is 1) and oneCnt++
        onRepeatComplete:-> repeatCnt++
        onRepeatStart:-> repeatStartCnt++
        onStart:-> startCnt++

      t.setStartTime()

      timeShift = 0
      t.update t.props.startTime + timeShift
      expect(updateValue).toBe(null)
      expect(t._wasUknownUpdate).toBe(true)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(0)
      expect(repeatStartCnt).toBe(0)
      expect(repeatCnt).toBe(0)
      expect(startCnt).toBe(0)

      t.update t.props.startTime + timeShift + (duration/2)
      expect(updateValue).toBe(.5)
      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(1)
      expect(repeatStartCnt).toBe(1)
      expect(repeatCnt).toBe(0)
      expect(startCnt).toBe(1)

      t.update t.props.startTime + timeShift + (duration) + delay/2
      expect(updateValue).toBe(1)
      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(1)
      expect(zeroCnt).toBe(1)
      expect(repeatStartCnt).toBe(1)
      expect(repeatCnt).toBe(1)
      expect(startCnt).toBe(1)

      timeShift = duration + delay
      t.update t.props.startTime + timeShift + 10
      expect(updateValue).toBeCloseTo(.2, 5)
      expect(t._wasUknownUpdate).toBe(false)
      expect(zeroCnt).toBe(2)
      expect(oneCnt).toBe(1)
      expect(repeatStartCnt).toBe(2)
      expect(repeatCnt).toBe(1)
      expect(startCnt).toBe(1)

      t.update t.props.startTime + timeShift + (duration/2)
      expect(updateValue).toBeCloseTo(.5, 5)
      expect(t._wasUknownUpdate).toBe(false)
      expect(zeroCnt).toBe(2)
      expect(oneCnt).toBe(1)
      expect(repeatStartCnt).toBe(2)
      expect(repeatCnt).toBe(1)
      expect(startCnt).toBe(1)

      t.update t.props.startTime + timeShift + (duration) + delay/2
      expect(updateValue).toBe(1)
      expect(t._wasUknownUpdate).toBe(false)
      expect(zeroCnt).toBe(2)
      expect(oneCnt).toBe(2)
      expect(repeatStartCnt).toBe(2)
      expect(repeatCnt).toBe(2)
      expect(startCnt).toBe(1)

      timeShift = 2*(duration + delay)
      t.update t.props.startTime + timeShift + 10
      expect(updateValue).toBeCloseTo(.2, 5)
      expect(t._wasUknownUpdate).toBe(false)
      expect(zeroCnt).toBe(3)
      expect(oneCnt).toBe(2)
      expect(repeatStartCnt).toBe(3)
      expect(repeatCnt).toBe(2)
      expect(startCnt).toBe(1)

      t.update t.props.startTime + timeShift + (duration/2)
      expect(updateValue).toBeCloseTo(.5, 5)
      expect(t._wasUknownUpdate).toBe(false)
      expect(zeroCnt).toBe(3)
      expect(oneCnt).toBe(2)
      expect(repeatStartCnt).toBe(3)
      expect(repeatCnt).toBe(2)
      expect(startCnt).toBe(1)

      t.update t.props.startTime + timeShift + (duration) + delay/2
      expect(updateValue).toBe(1)
      expect(t._wasUknownUpdate).toBe(false)
      expect(zeroCnt).toBe(3)
      expect(oneCnt).toBe(3)
      expect(repeatStartCnt).toBe(3)
      expect(repeatCnt).toBe(3)
      expect(startCnt).toBe(1)

      t.update t.props.startTime + timeShift + (duration) + delay/2 + 10
      expect(updateValue).toBe(1)
      expect(t._wasUknownUpdate).toBe(false)
      expect(zeroCnt).toBe(3)
      expect(oneCnt).toBe(3)
      expect(repeatStartCnt).toBe(3)
      expect(repeatCnt).toBe(3)
      expect(startCnt).toBe(1)

    # ###
    #   TWEEN IN REVERSE DIRECTION
    # ###

    it 'should be called with 0 and 1 on each repeat period || reverse', ()->
      zeroCnt = 0; oneCnt = 0; repeatCnt = 0; repeatStartCnt = 0
      duration = 50; updateValue = null
      t = new Tween
        repeat:     2
        duration:   duration
        onUpdate:(p)->
          updateValue = p
          (p is 0) and zeroCnt++
          (p is 1) and oneCnt++
        onRepeatComplete:-> repeatCnt++
        onRepeatStart:-> repeatStartCnt++
      
      t.setStartTime()
      
      timeShift = 3*duration
      t.update t.props.startTime + timeShift
      expect(updateValue).toBe(null)
      expect(t._wasUknownUpdate).toBe(true)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(0)
      expect(repeatStartCnt).toBe(0)
      expect(repeatCnt).toBe(0)

      t.update t.props.startTime + timeShift - duration/2
      expect(updateValue).toBeCloseTo(.5, 5)
      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(1)
      expect(zeroCnt).toBe(0)
      expect(repeatStartCnt).toBe(0)
      expect(repeatCnt).toBe(1)

      timeShift = 2*duration
      t.update t.props.startTime + timeShift
      expect(updateValue).toBe(0)
      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(1)
      expect(zeroCnt).toBe(1)
      expect(repeatStartCnt).toBe(1)
      expect(repeatCnt).toBe(1)

      t.update t.props.startTime + timeShift - duration/2
      expect(updateValue).toBeCloseTo(.5, 5)
      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(2)
      expect(zeroCnt).toBe(1)
      expect(repeatStartCnt).toBe(1)
      expect(repeatCnt).toBe(2)

      timeShift = duration
      t.update t.props.startTime + timeShift
      expect(updateValue).toBe(0)
      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(2)
      expect(zeroCnt).toBe(2)
      expect(repeatStartCnt).toBe(2)
      expect(repeatCnt).toBe(2)

      t.update t.props.startTime + timeShift - duration/2
      expect(updateValue).toBeCloseTo(.5, 5)
      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(3)
      expect(zeroCnt).toBe(2)
      expect(repeatStartCnt).toBe(2)
      expect(repeatCnt).toBe(3)

      timeShift = 0
      t.update t.props.startTime + timeShift
      expect(updateValue).toBe(0)
      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(3)
      expect(zeroCnt).toBe(3)
      expect(repeatStartCnt).toBe(3)
      expect(repeatCnt).toBe(3)

      t.update t.props.startTime + timeShift - duration/2
      expect(updateValue).toBe(0)
      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(3)
      expect(zeroCnt).toBe(3)
      expect(repeatStartCnt).toBe(3)
      expect(repeatCnt).toBe(3)

    it 'should be called with 0 and 1 on each repeat period if missed time || reverse', ()->
      zeroCnt = 0; oneCnt = 0; repeatCnt = 0; repeatStartCnt = 0
      duration = 50; updateValue = null
      t = new Tween
        repeat:     2
        duration:   duration
        onUpdate:(p)->
          updateValue = p
          (p is 0) and zeroCnt++
          (p is 1) and oneCnt++
        onRepeatComplete:-> repeatCnt++
        onRepeatStart:-> repeatStartCnt++

      t.setStartTime()

      gap = 5
      timeShift = 3*duration
      t.update t.props.startTime + timeShift + gap
      expect(updateValue).toBe(null)
      expect(t._wasUknownUpdate).toBe(true)
      expect(zeroCnt).toBe(0)
      expect(oneCnt).toBe(0)
      expect(repeatStartCnt).toBe(0)
      expect(repeatCnt).toBe(0)

      t.update t.props.startTime + timeShift - (duration/2)
      expect(updateValue).toBeCloseTo(.5, 5)
      expect(t._wasUknownUpdate).toBe(false)
      expect(zeroCnt).toBe(0)
      expect(oneCnt).toBe(1)
      expect(repeatStartCnt).toBe(0)
      expect(repeatCnt).toBe(1)

      t.update t.props.startTime + timeShift - (duration) + gap
      expect(updateValue).toBeCloseTo(.1, 5)
      expect(t._wasUknownUpdate).toBe(false)
      expect(zeroCnt).toBe(0)
      expect(oneCnt).toBe(1)
      expect(repeatStartCnt).toBe(0)
      expect(repeatCnt).toBe(1)

      timeShift = 2*duration
      t.update t.props.startTime + timeShift - gap
      expect(updateValue).toBeCloseTo(.9, 5)
      expect(t._wasUknownUpdate).toBe(false)
      expect(zeroCnt).toBe(1)
      expect(oneCnt).toBe(2)
      expect(repeatStartCnt).toBe(1)
      expect(repeatCnt).toBe(2)

      t.update t.props.startTime + timeShift - (duration/2)
      expect(updateValue).toBeCloseTo(.5, 5)
      expect(t._wasUknownUpdate).toBe(false)
      expect(zeroCnt).toBe(1)
      expect(oneCnt).toBe(2)
      expect(repeatStartCnt).toBe(1)
      expect(repeatCnt).toBe(2)

      t.update t.props.startTime + timeShift - (duration) + gap
      expect(updateValue).toBeCloseTo(.1)
      expect(t._wasUknownUpdate).toBe(false)
      expect(zeroCnt).toBe(1)
      expect(oneCnt).toBe(2)
      expect(repeatStartCnt).toBe(1)
      expect(repeatCnt).toBe(2)

      timeShift = duration
      t.update t.props.startTime + timeShift - (duration) - gap
      expect(updateValue).toBe(0)
      expect(t._wasUknownUpdate).toBe(false)
      expect(zeroCnt).toBe(2)
      expect(oneCnt).toBe(2)
      expect(repeatStartCnt).toBe(2)
      expect(repeatCnt).toBe(2)

      t.update t.props.startTime + timeShift - (duration/2)
      expect(updateValue).toBe(.5)
      expect(t._wasUknownUpdate).toBe(false)
      expect(zeroCnt).toBe(2)
      expect(oneCnt).toBe(2)
      expect(repeatStartCnt).toBe(2)
      expect(repeatCnt).toBe(2)

      t.update t.props.startTime - gap
      expect(updateValue).toBe(0)
      expect(t._wasUknownUpdate).toBe(false)
      expect(zeroCnt).toBe(3)
      expect(oneCnt).toBe(2)
      expect(repeatStartCnt).toBe(3)
      expect(repeatCnt).toBe(2)

    it 'should be called with 0 and 1 on each repeat period if in delay || reverse', ()->
      zeroCnt = 0; oneCnt = 0; repeatCnt = 0; repeatStartCnt = 0
      duration = 50; delay = 20; updateValue = null
      t = new Tween
        repeat:     2
        duration:   duration
        delay:      delay
        onUpdate:(p)->
          updateValue = p
          (p is 0) and zeroCnt++
          (p is 1) and oneCnt++
        onRepeatComplete:-> repeatCnt++
        onRepeatStart:-> repeatStartCnt++

      t.setStartTime()

      timeShift = 3*(duration + delay) - delay
      t.update t.props.startTime + timeShift + 5
      expect(updateValue).toBe(null)
      expect(t._wasUknownUpdate).toBe(true)
      expect(zeroCnt).toBe(0)
      expect(oneCnt).toBe(0)
      expect(repeatStartCnt).toBe(0)
      expect(repeatCnt).toBe(0)

      t.update t.props.startTime + timeShift - (duration/2)
      expect(updateValue).toBeCloseTo(.5, 5)
      expect(t._wasUknownUpdate).toBe(false)
      expect(zeroCnt).toBe(0)
      expect(oneCnt).toBe(1)
      expect(repeatStartCnt).toBe(0)
      expect(repeatCnt).toBe(1)

      t.update t.props.startTime + timeShift - (duration) - 5
      expect(updateValue).toBe(0)
      expect(t._wasUknownUpdate).toBe(false)
      expect(zeroCnt).toBe(1)
      expect(oneCnt).toBe(1)
      expect(repeatStartCnt).toBe(1)
      expect(repeatCnt).toBe(1)

      timeShift = 2*(duration + delay) - delay
      t.update t.props.startTime + timeShift - duration/2
      expect(updateValue).toBeCloseTo(.5, 5)
      expect(t._wasUknownUpdate).toBe(false)
      expect(zeroCnt).toBe(1)
      expect(oneCnt).toBe(2)
      expect(repeatStartCnt).toBe(1)
      expect(repeatCnt).toBe(2)

      t.update t.props.startTime + timeShift - duration - 5
      expect(updateValue).toBe(0)
      expect(t._wasUknownUpdate).toBe(false)
      expect(zeroCnt).toBe(2)
      expect(oneCnt).toBe(2)
      expect(repeatStartCnt).toBe(2)
      expect(repeatCnt).toBe(2)

      timeShift = duration
      t.update t.props.startTime + timeShift - duration/2
      expect(updateValue).toBeCloseTo(.5, 5)
      expect(t._wasUknownUpdate).toBe(false)
      expect(zeroCnt).toBe(2)
      expect(oneCnt).toBe(3)
      expect(repeatStartCnt).toBe(2)
      expect(repeatCnt).toBe(3)

      t.update t.props.startTime + timeShift - duration - 5
      expect(updateValue).toBe(0)
      expect(t._wasUknownUpdate).toBe(false)
      expect(zeroCnt).toBe(3)
      expect(oneCnt).toBe(3)
      expect(repeatStartCnt).toBe(3)
      expect(repeatCnt).toBe(3)
      # repeat the last period
      t.update t.props.startTime + timeShift - duration - 15
      expect(updateValue).toBe(0)
      expect(t._wasUknownUpdate).toBe(false)
      expect(zeroCnt).toBe(3)
      expect(oneCnt).toBe(3)
      expect(repeatStartCnt).toBe(3)
      expect(repeatCnt).toBe(3)

    it 'should be called with 0 and 1 on each repeat period if delay || reverse', ()->
      zeroCnt = 0; oneCnt = 0; repeatCnt = 0; repeatStartCnt = 0
      duration = 50; delay = 20; updateValue = null
      t = new Tween
        repeat:     2
        duration:   duration
        delay:      delay
        onUpdate:(p)->
          updateValue = p
          (p is 0) and zeroCnt++
          (p is 1) and oneCnt++
        onRepeatComplete:-> repeatCnt++
        onRepeatStart:-> repeatStartCnt++

      t.setStartTime()

      timeShift = 3*(duration + delay) - delay
      t.update t.props.startTime + timeShift
      expect(updateValue).toBe(null)
      expect(t._wasUknownUpdate).toBe(true)
      expect(oneCnt).toBe(0)
      expect(zeroCnt).toBe(0)
      expect(repeatStartCnt).toBe(0)
      expect(repeatCnt).toBe(0)

      t.update t.props.startTime + timeShift - (duration/2)
      expect(updateValue).toBeCloseTo(.5, 5)
      expect(t._wasUknownUpdate).toBe(false)
      expect(zeroCnt).toBe(0)
      expect(oneCnt).toBe(1)
      expect(repeatStartCnt).toBe(0)
      expect(repeatCnt).toBe(1)

      t.update t.props.startTime + timeShift - duration
      expect(updateValue).toBe(0)
      expect(t._wasUknownUpdate).toBe(false)
      expect(oneCnt).toBe(1)
      expect(zeroCnt).toBe(1)
      expect(repeatStartCnt).toBe(1)
      expect(repeatCnt).toBe(1)

      timeShift = 2*(duration + delay) - delay
      t.update t.props.startTime + timeShift - duration/2
      expect(updateValue).toBeCloseTo(.5, 5)
      expect(t._wasUknownUpdate).toBe(false)
      expect(zeroCnt).toBe(1)
      expect(oneCnt).toBe(2)
      expect(repeatStartCnt).toBe(1)
      expect(repeatCnt).toBe(2)

      timeShift = 2*(duration + delay) - delay
      t.update t.props.startTime + timeShift - duration
      expect(updateValue).toBe(0)
      expect(t._wasUknownUpdate).toBe(false)
      expect(zeroCnt).toBe(2)
      expect(oneCnt).toBe(2)
      expect(repeatStartCnt).toBe(2)
      expect(repeatCnt).toBe(2)

      timeShift = duration
      t.update t.props.startTime + timeShift - duration/2
      expect(updateValue).toBeCloseTo(.5, 5)
      expect(t._wasUknownUpdate).toBe(false)
      expect(zeroCnt).toBe(2)
      expect(oneCnt).toBe(3)
      expect(repeatStartCnt).toBe(2)
      expect(repeatCnt).toBe(3)

      timeShift = duration
      t.update t.props.startTime + timeShift - duration
      expect(updateValue).toBe(0)
      expect(t._wasUknownUpdate).toBe(false)
      expect(zeroCnt).toBe(3)
      expect(oneCnt).toBe(3)
      expect(repeatStartCnt).toBe(3)
      expect(repeatCnt).toBe(3)
      # repeat the last period      
      t.update t.props.startTime + timeShift - duration - 10
      expect(updateValue).toBe(0)
      expect(t._wasUknownUpdate).toBe(false)
      expect(zeroCnt).toBe(3)
      expect(oneCnt).toBe(3)
      expect(repeatStartCnt).toBe(3)
      expect(repeatCnt).toBe(3)

  describe '_getPeriod method ->', ->
    it 'should get current period', ->
      duration = 50; delay = 20
      t = new Tween repeat: 3, duration: duration, delay: delay

      t.setStartTime()

      expect(t._getPeriod(t.props.startTime)).toBe 0
      expect(t._getPeriod(t.props.startTime + duration/2)).toBe 0
      expect(t._getPeriod(t.props.startTime + duration)).toBe 1

      timeShift = duration + delay
      expect(t._getPeriod(t.props.startTime + timeShift - delay/2)).toBe 'delay'
      expect(t._delayT).toBe 1
      expect(t._getPeriod(t.props.startTime + timeShift)).toBe 1
      expect(t._getPeriod(t.props.startTime + timeShift + duration/2)).toBe 1
      expect(t._getPeriod(t.props.startTime + timeShift + duration)).toBe 2

      timeShift = 2*(duration + delay)
      expect(t._getPeriod(t.props.startTime + timeShift - delay/2)).toBe 'delay'
      expect(t._delayT).toBe 2
      expect(t._getPeriod(t.props.startTime + timeShift)).toBe 2
      expect(t._getPeriod(t.props.startTime + timeShift + duration/2)).toBe 2
      expect(t._getPeriod(t.props.startTime + timeShift + duration)).toBe 3

      timeShift = 3*(duration + delay)
      expect(t._getPeriod(t.props.startTime + timeShift - delay/2)).toBe 'delay'
      expect(t._delayT).toBe 3
      expect(t._getPeriod(t.props.startTime + timeShift)).toBe 3
      expect(t._getPeriod(t.props.startTime + timeShift + duration/2)).toBe 3
      expect(t._getPeriod(t.props.startTime + timeShift + duration)).toBe 4

    it 'should get the current period with no delay', ->
      duration = 50
      t = new Tween repeat: 3, duration: duration

      t.setStartTime()

      expect(t._getPeriod(t.props.startTime)).toBe 0
      expect(t._getPeriod(t.props.startTime + duration/2)).toBe 0
      expect(t._getPeriod(t.props.startTime + duration)).toBe 1
      expect(t._getPeriod(t.props.startTime + duration + 1)).toBe 1

      timeShift = duration
      expect(t._getPeriod(t.props.startTime + timeShift + duration/2)).toBe 1
      expect(t._getPeriod(t.props.startTime + timeShift + duration)).toBe 2
      expect(t._getPeriod(t.props.startTime + timeShift + duration + 1)).toBe 2

      timeShift = 2*duration
      expect(t._getPeriod(t.props.startTime + timeShift + duration/2)).toBe 2
      expect(t._getPeriod(t.props.startTime + timeShift + duration)).toBe 3
      expect(t._getPeriod(t.props.startTime + timeShift + duration + 1)).toBe 3

      timeShift = 3*duration
      expect(t._getPeriod(t.props.startTime + timeShift + duration/2)).toBe 3
      expect(t._getPeriod(t.props.startTime + timeShift + duration)).toBe 4
      expect(t._getPeriod(t.props.startTime + timeShift + duration + 1)).toBe 4

  # describe 'onComplete callback ->', ->
  #   it 'should be defined', ->
  #     t = new Tween onComplete: ->
  #     expect(t.props.onComplete).toBeDefined()
  #   it 'should call onComplete callback', ->
  #     t = new Tween(duration: 100, onComplete:->).setStartTime()
  #     spyOn(t.props, 'onComplete')
  #     t.update t.props.startTime + 101
  #     expect(t.props.onComplete).toHaveBeenCalled()
  #   it 'should be called just once', ->
  #     cnt = 0
  #     t = new Tween(duration: 32, onComplete:-> cnt++).setStartTime()
  #     t.update(t.props.startTime + 33)
  #     t.update(t.props.startTime + 33)
  #     expect(cnt).toBe 1
  #   it 'should reset isCompleted flag', ->
  #     t = new Tween(duration: 32, onComplete:->).setStartTime()
  #     t.update(t.props.startTime + 10)
  #     t.update(t.props.endTime)
  #     expect(t.isCompleted).toBe true
  #     t.update(t.props.startTime + 10)
  #     expect(t.isCompleted).toBe false
  #   it 'should have the right scope', ->
  #     isRightScope = false
  #     t = new Tween
  #       duration: 1, onComplete:-> isRightScope = @ instanceof Tween
  #     t.setStartTime().update t.props.startTime + 2
  #     expect(isRightScope).toBe true
  #   it 'should fire after the last onUpdate', (dfr)->
  #     proc = 0
  #     t = new Tween
  #       duration: 1,
  #       onUpdate:(p)->  proc = p
  #       onComplete:-> expect(proc).toBe(1); dfr()
  #     t.setStartTime().update t.props.startTime + 2
  #   it 'should fire only once if inside timeline', ()->
  #     cnt = 0
  #     tm = new mojs.Timeline repeat: 1
  #     t1 = new Tween
  #       delay: 10
  #       duration: 50
  #       onComplete:-> cnt++
  #     t2 = new Tween
  #       delay: 20
  #       duration: 100

  #     tm.add t1, t2
  #     tm.setStartTime()

  #     tm.update t1.props.startTime
  #     tm.update t1.props.startTime + 11
  #     tm.update t1.props.startTime + 56
      
  #     tm.update t1.props.startTime + 61
  #     tm.update t1.props.startTime + 102

  #     tm.update t1.props.startTime + 120 # <-- error
  #     tm.update t1.props.startTime + 137
  #     tm.update t1.props.startTime + 169
  #     tm.update t1.props.startTime + 182
  #     tm.update t1.props.startTime + 201
  #     tm.update t1.props.startTime + 220
  #     tm.update t1.props.startTime + 231

  #     expect(cnt).toBe(2)

  # it 'should update with 0 if in timeline with yoyo and repeat', ()->
  #     progress = null; duration1 = 50; delay1 = 10
  #     tm = new mojs.Timeline repeat: 4
  #     t1 = new Tween
  #       delay:    delay1
  #       duration: duration1
  #       yoyo: true
  #       repeat: 1
  #       onUpdate:(p)-> progress = p
  #     t2 = new Tween
  #       delay: 20
  #       duration: 100

  #     tm.add t1
  #     tm.setStartTime()

  #     tm.update t1.props.startTime 
  #     tm.update t1.props.startTime + 2
  #     tm.update t1.props.startTime + duration1 - 4
  #     tm.update t1.props.startTime + duration1

  #     timeShift = duration1 + delay1
  #     tm.update t1.props.startTime + timeShift
  #     tm.update t1.props.startTime + timeShift + 2
  #     tm.update t1.props.startTime + timeShift + duration1 - 4
  #     tm.update t1.props.startTime + timeShift + timeShift

  #     expect(progress).toBe(0)

  #   it 'should update with 0 if in timeline with yoyo and repeat #2', ()->
  #     progress = null; duration1 = 50; delay1 = 10
  #     tm = new mojs.Timeline repeat: 4
  #     t1 = new Tween
  #       delay:    delay1
  #       duration: duration1
  #       yoyo: true
  #       repeat: 1
  #       onUpdate:(p)-> progress = p
  #     t2 = new Tween
  #       delay: 20
  #       duration: 100

  #     tm.add t1, t2
  #     tm.setStartTime()

  #     tm.update t1.props.startTime 
  #     tm.update t1.props.startTime + 2
  #     tm.update t1.props.startTime + duration1 - 4
  #     tm.update t1.props.startTime + duration1

  #     timeShift = duration1 + delay1
  #     tm.update t1.props.startTime + timeShift
  #     tm.update t1.props.startTime + timeShift + 2
  #     tm.update t1.props.startTime + timeShift + duration1 - 4
  #     tm.update t1.props.startTime + timeShift + timeShift

  #     expect(progress).toBe(0)

  #   # it 'should be called when inside timline with repeat', ()->
  #   #   cnt = 0
  #   #   duration = 50
  #   #   tm = new mojs.Timeline repeat: 2
  #   #   t1 = new Tween
  #   #     duration: duration
  #   #     onComplete:-> cnt++
  #   #     # onRepeatComplete:->
  #   #     #   console.log 'repeat complete'
      
  #   #   tm.add t1
  #   #   tm.setStartTime()

  #   #   shiftTime = 0
  #   #   tm.update t1.props.startTime + shiftTime
  #   #   tm.update t1.props.startTime + shiftTime + (duration/2)
  #   #   tm.update t1.props.startTime + shiftTime + (duration) - 10

  #   #   shiftTime = duration
  #   #   tm.update t1.props.startTime + shiftTime + 10
  #   #   tm.update t1.props.startTime + shiftTime + (duration/2.5)
  #   #   tm.update t1.props.startTime + shiftTime + (duration/2)
  #   #   tm.update t1.props.startTime + shiftTime + (duration)

  #   #   expect(cnt).toBe(2)

  describe 'onStart callback ->', ->
    it 'should be defined', ->
      t = new Tween onStart: ->
      expect(t.props.onStart).toBeDefined()

    it 'should restart if tween was completed', ->
      startCnt = 0
      t = new Tween onStart: -> startCnt++
      t.setStartTime()
      t.update t.props.startTime + t.props.duration/2
      expect(startCnt).toBe 0
      t.update t.props.startTime + t.props.duration/2 + 10
      expect(startCnt).toBe 1
      t.update t.props.startTime + t.props.duration + 10
      expect(startCnt).toBe 1
      t.update t.props.startTime + t.props.duration/2
      expect(startCnt).toBe 2

    it 'should restart if tween was completed after very first update', ->
      startCnt = 0
      t = new Tween onStart: -> startCnt++
      t.setStartTime()
      t.update t.props.startTime + t.props.duration/2
      expect(startCnt).toBe 0

      t.update t.props.startTime + t.props.duration
      expect(startCnt).toBe 1

      t.update t.props.startTime + t.props.duration + 10
      expect(startCnt).toBe 1

      t.update t.props.startTime + t.props.duration/2
      expect(startCnt).toBe 2

    it 'should run before onComplete if tween ended', ->
      startCnt = 0; callback = null
      t = new Tween
        onStart: ->   callback ?= 'start'; startCnt++
        onComplete:-> callback ?= 'complete'

      t.setStartTime()
      t.update t.props.startTime + t.props.duration/2
      expect(startCnt).toBe 0

      t.update t.props.startTime + t.props.duration
      expect(startCnt).toBe 1

      expect(callback).toBe 'start'

  describe 'onRepeatStart callback ->', ->
    it 'should be defined', ->
      t = new Tween onRepeatStart: ->
      expect(t.props.onRepeatStart).toBeDefined()

  describe 'onRepeatComplete callback ->', ->
    it 'should be defined', ->
      t = new Tween onRepeatComplete: ->
      expect(t.props.onRepeatComplete).toBeDefined()

  #   it 'should call onRepeatComplete callback', ->
  #     t = new Tween(duration: 100, onRepeatComplete:->).setStartTime()
  #     spyOn(t.props, 'onRepeatComplete')
  #     t.update t.props.startTime + 101
  #     expect(t.props.onRepeatComplete).toHaveBeenCalled()
  #   it 'should be called just once', ->
  #     cnt = 0
  #     t = new Tween(duration: 32, onComplete:-> cnt++).setStartTime()
  #     t.update(t.props.startTime + 33)
  #     t.update(t.props.startTime + 33)
  #     expect(cnt).toBe 1

  #   it 'should be called on each repeat period', ()->
  #     cnt = 0
  #     duration = 50
  #     t1 = new Tween
  #       repeat:     2
  #       duration:   duration
  #       onRepeatComplete:-> cnt++

  #     t1.setStartTime()
  #     timeShift = 0
  #     t1.update t1.props.startTime + timeShift
  #     t1.update t1.props.startTime + timeShift + (duration/2)
  #     t1.update t1.props.startTime + timeShift + (duration)

  #     timeShift = duration
  #     t1.update t1.props.startTime + timeShift
  #     t1.update t1.props.startTime + timeShift + (duration/2)
  #     t1.update t1.props.startTime + timeShift + (duration)

  #     timeShift = 2*duration
  #     t1.update t1.props.startTime + timeShift
  #     t1.update t1.props.startTime + timeShift + (duration/2)
  #     t1.update t1.props.startTime + timeShift + (duration)

  #     timeShift = 3*duration
  #     t1.update t1.props.startTime + timeShift
  #     t1.update t1.props.startTime + timeShift + (duration/2)
  #     t1.update t1.props.startTime + timeShift + (duration)

  #     expect(cnt).toBe(3)

  #   it 'should be called on each repeat period if yoyo', ()->
  #     cnt = 0
  #     duration = 50
  #     t1 = new Tween
  #       yoyo:       true
  #       repeat:     2
  #       duration:   duration
  #       onRepeatComplete:-> cnt++

  #     t1.setStartTime()
  #     timeShift = 0
  #     t1.update t1.props.startTime + timeShift
  #     t1.update t1.props.startTime + timeShift + (duration/2)
  #     t1.update t1.props.startTime + timeShift + (duration)

  #     timeShift = duration
  #     t1.update t1.props.startTime + timeShift
  #     t1.update t1.props.startTime + timeShift + (duration/2)
  #     t1.update t1.props.startTime + timeShift + (duration)

  #     timeShift = 2*duration
  #     t1.update t1.props.startTime + timeShift
  #     t1.update t1.props.startTime + timeShift + (duration/2)
  #     t1.update t1.props.startTime + timeShift + (duration)

  #     timeShift = 3*duration
  #     t1.update t1.props.startTime + timeShift
  #     t1.update t1.props.startTime + timeShift + (duration/2)
  #     t1.update t1.props.startTime + timeShift + (duration)

  #     expect(cnt).toBe(3)

  #   it 'should be called on each repeat period if yoyo and delay', ()->
  #     cnt = 0
  #     duration = 50
  #     delay    = 25
  #     t1 = new Tween
  #       delay:      delay
  #       yoyo:       true
  #       repeat:     3
  #       duration:   duration
  #       onRepeatComplete:-> cnt++

  #     t1.setStartTime()
  #     timeShift = 0
  #     t1.update t1.props.startTime + timeShift
  #     t1.update t1.props.startTime + timeShift + (duration/2)
  #     t1.update t1.props.startTime + timeShift + (duration)

  #     timeShift = duration + delay
  #     t1.update t1.props.startTime + timeShift
  #     t1.update t1.props.startTime + timeShift + (duration/2)
  #     t1.update t1.props.startTime + timeShift + (duration)

  #     timeShift = 2*(duration + delay)
  #     t1.update t1.props.startTime + timeShift
  #     t1.update t1.props.startTime + timeShift + (duration/2)
  #     t1.update t1.props.startTime + timeShift + (duration)

  #     timeShift = 3*(duration + delay)
  #     t1.update t1.props.startTime + timeShift
  #     t1.update t1.props.startTime + timeShift + (duration/2)
  #     t1.update t1.props.startTime + timeShift + (duration)

  #     timeShift = 4*(duration + delay)
  #     t1.update t1.props.startTime + timeShift
  #     t1.update t1.props.startTime + timeShift + (duration/2)
  #     t1.update t1.props.startTime + timeShift + (duration)

  #     timeShift = 5*(duration + delay)
  #     t1.update t1.props.startTime + timeShift
  #     t1.update t1.props.startTime + timeShift + (duration/2)
  #     t1.update t1.props.startTime + timeShift + (duration)

  #     expect(cnt).toBe(4)

  #   it 'should be called just once in delay gaps', ()->
  #     cnt = 0
  #     duration = 50
  #     delay    = 25
  #     t1 = new Tween
  #       delay:      delay
  #       yoyo:       true
  #       repeat:     3
  #       duration:   duration
  #       onRepeatComplete:-> cnt++

  #     t1.setStartTime()
  #     timeShift = 0
  #     t1.update t1.props.startTime + timeShift
  #     t1.update t1.props.startTime + timeShift + (duration/2)
  #     t1.update t1.props.startTime + timeShift + (duration)
  #     t1.update t1.props.startTime + timeShift + (duration) + 5
  #     t1.update t1.props.startTime + timeShift + (duration) + 10
  #     t1.update t1.props.startTime + timeShift + (duration) + 15
      
  #     expect(cnt).toBe(1)

  #   it 'should not be called on very start', ()->
  #     cnt = 0
  #     duration = 50
  #     tm = new mojs.Timeline
  #     t1 = new Tween
  #       repeat:     2
  #       duration:   duration
  #       onRepeatComplete:-> cnt++

  #     tm.add t1
  #     tm.setStartTime()

  #     updateInPeriod = (timeShift)->
  #       t1.update t1.props.startTime + timeShift
  #       t1.update t1.props.startTime + timeShift + duration/2
  #       t1.update t1.props.startTime + timeShift + duration  

  #     updateInPeriod(0)
  #     updateInPeriod(duration)
  #     updateInPeriod(2*duration)
      
  #     expect(cnt).toBe(3)

  # describe 'onFirstUpdate callback ->', ->
  #   it 'should be defined', ->
  #     t = new Tween onFirstUpdate: ->
  #     expect(t.props.onFirstUpdate).toBeDefined()
  #   it 'should call onFirstUpdate callback', ->
  #     t = new Tween(duration: 100, onFirstUpdate:->).setStartTime()
  #     spyOn(t.props, 'onFirstUpdate')
  #     t.update t.props.startTime + 3
  #     expect(t.props.onFirstUpdate).toHaveBeenCalled()
  #   it 'should be called just once', ->
  #     cnt = 0
  #     t = new Tween(duration: 100, onFirstUpdate:-> cnt++ ).setStartTime()
  #     t.update t.props.startTime + 3
  #     t.update t.props.startTime + 3
  #     t.update t.props.startTime + 3
  #     expect(cnt).toBe 1
  #   it 'should have the right scope', ->
  #     isRightScope = false
  #     t = new Tween
  #       duration: 10, onFirstUpdate:-> isRightScope = @ instanceof Tween
  #     t.setStartTime().update t.props.startTime + 2
  #     expect(isRightScope).toBe true
  #   it 'should be called after progress went further the timeline', ->
  #     isRightScope = false
  #     t = new Tween
  #       duration: 10
  #       onFirstUpdate:->
  #     .setStartTime()
  #     t.update t.props.startTime + 1
  #     t.update t.props.startTime + 12
  #     spyOn(t.props, 'onFirstUpdate')
  #     t.update t.props.startTime + 9
  #     expect(t.props.onFirstUpdate).toHaveBeenCalled()

  #   it 'should be called before onStart callback', ->
  #     isOnStart = false; isOnStartCalled = true
  #     t = new Tween
  #       duration: 10
  #       onStart:-> isOnStart = true
  #       onFirstUpdate:-> isOnStartCalled = isOnStart
  #     .setStartTime()
  #     t.update t.props.startTime + 1
  #     expect(isOnStartCalled).toBe false

  #   it 'should be called after progress went before the timeline', ->
  #     isRightScope = false
  #     t = new Tween
  #       duration: 10
  #       onFirstUpdate:->
  #     .setStartTime()
  #     t.update t.props.startTime + 1
  #     t.update t.props.startTime + -1
  #     spyOn(t.props, 'onFirstUpdate')
  #     t.update t.props.startTime + 2
  #     expect(t.props.onFirstUpdate).toHaveBeenCalled()

  describe 'yoyo option ->', ->
    it 'should recieve yoyo option', ->
      t = new Tween yoyo: true
      expect(t.props.yoyo).toBe true
    # it 'should toggle the progress direction on repeat', ->
    #   t = new Tween(repeat: 2, duration: 10, yoyo: true).setStartTime()
    #   time = t.props.startTime
    #   t.update(time+1);   expect(t.progress).toBe .1
    #   t.update(time+5);   expect(t.progress).toBe .5
    #   t.update(time+10);  expect(t.progress).toBe 1

    #   t.update(time+11);  expect(t.progress).toBe .9
    #   t.update(time+15);  expect(t.progress).toBe .5
    #   t.update(time+19);  expect(parseFloat t.progress.toFixed(1)).toBe .1

    #   t.update(time+20);  expect(t.progress).toBe 0
    #   t.update(time+21);  expect(t.progress).toBe .1
    #   t.update(time+25);  expect(t.progress).toBe .5
    #   t.update(time+29);  expect(t.progress).toBe .9
    #   t.update(time+30);  expect(t.progress).toBe 1
    #   expect(t.isCompleted).toBe true

    # it 'should set progress to 0 on return', ->
    #   p = 0; duration = 800; delay = 1000
    #   t = new mojs.Tween
    #     yoyo: true,
    #     repeat: 10,
    #     delay: delay,
    #     duration: duration,
    #     onUpdate: (progress)-> p = progress

    #   t.setStartTime()
    #   t.update t.props.startTime - 5
    #   t.update t.props.startTime
    #   t.update t.props.startTime + (duration/2)
    #   t.update t.props.startTime + duration
      
    #   expect(p).toBe 1

    #   t.update t.props.startTime + duration + 5
    #   t.update t.props.startTime + duration + delay
    #   t.update t.props.startTime + duration + delay + (duration/2)
    #   t.update t.props.startTime + duration + delay + duration

    #   expect(p).toBe 0

  describe 'easing ->', ->
    it 'should parse easing string', ->
      t = new Tween(easing: 'Linear.None')
      expect(typeof t.props.easing).toBe 'function'
    it 'should parse standart easing', ->
      t = new Tween(easing: 'Sin.Out', duration: 100)
      t.setStartTime();
      t.update(t.props.startTime + 49)
      expect(t.progress).toBe 0
      expect(t.easedProgress).toBe undefined
      t.update(t.props.startTime + 50)
      expect(t.easedProgress).toBe easing.sin.out t.progress
    it 'should work with easing function', ->
      easings = one: -> a = 1
      t = new Tween(easing: easings.one)
      expect(t.props.easing.toString()).toBe easings.one.toString()
    it 'should work with easing function', (dfr)->
      easings = one:(k)-> k
      spyOn easings, 'one'
      t = new Tween(easing: easings.one)
      t.setStartTime();
      t.update t.props.startTime + 39
      t.update t.props.startTime + 40
      setTimeout (-> expect(easings.one).toHaveBeenCalled(); dfr()), 50
  describe 'setProgress method ->', ->
    it 'should set the current progress', ->
      t = new Tween(easing: 'Bounce.Out')
      t.setProgress .75
      expect(t.progress).toBe .75
      expect(t.easedProgress.toFixed(2)).toBe '0.97'

  describe 'setProp method ->', ->
    it 'should set new timeline options', ->
      t = new Tween duration: 100, delay: 0
      t.setProp duration: 1000, delay: 200
      expect(t.props.duration).toBe 1000
      expect(t.props.delay).toBe    200
    it 'should work with arguments', ->
      t = new Tween duration: 100
      t.setProp 'duration', 1000
      expect(t.props.duration).toBe 1000
    it 'should call calcDimentions method', ->
      t = new Tween duration: 100
      spyOn t, 'calcDimentions'
      t.setProp 'duration', 1000
      expect(t.calcDimentions).toHaveBeenCalled()
    it 'should update the time', ->
      t = new Tween duration: 100, delay: 100
      t.setProp 'duration', 1000
      expect(t.props.time).toBe 1100
    it 'should parse easing', ->
      t = new Tween duration: 100
      t.setProp 'easing', 'elastic.in'
      expect(t.props.easing).toBe mojs.easing.elastic.in

  describe 'run method ->', ->
    it 'should get the start time',->
      t = new Tween
      t.play()
      expect(t.props.startTime).toBeDefined()
      expect(t.props.endTime).toBe t.props.startTime + t.props.repeatTime
    it 'should call the setStartTime method',->
      t = new Tween
      spyOn t, 'setStartTime'
      time = 0
      t.play time
      expect(t.setStartTime).toHaveBeenCalledWith time
    it 'should add itself to tweener',->
      t = new Tween
      spyOn tweener, 'add'
      t.play()
      expect(tweener.add).toHaveBeenCalled()
    it 'should not add itself to tweener if time was passed',->
      t = new Tween
      spyOn tweener, 'add'
      t.play 10239123
      expect(tweener.add).not.toHaveBeenCalled()

  describe '_removeFromTweener method ->', ->
    it 'should call tweener.remove method with self',->
      tweener.removeAll()
      timeline = new Tween duration: 2000
      timeline.play()
      timeline._removeFromTweener()
      expect(tweener.tweens.length).toBe 0

  describe 'stop method', ->
    it 'should call removeFromTweener method with self',->
      tweener.removeAll()
      timeline = new Tween duration: 2000
      timeline.play()
      spyOn timeline, '_removeFromTweener'
      timeline.stop()
      expect(timeline._removeFromTweener).toHaveBeenCalled()
    it 'should reset progress to 0',->
      tweener.removeAll()
      timeline = new Tween duration: 2000
      timeline.play()
      spyOn timeline, 'setProgress'
      timeline.stop()
      expect(timeline.setProgress).toHaveBeenCalledWith 0
    # it 'should set state to "stop"',->
    #   tweener.tweens = []
    #   t = new Tween
    #   timeline = new Tween duration: 2000
    #   t.add(timeline); t.setStartTime(); t.stop()
    #   expect(t.state).toBe 'stop'

  describe 'pause method ->', ->
    it 'should call t.remove method with self',->
      tweener.removeAll()
      timeline = new Tween duration: 2000
      timeline.play()
      spyOn timeline, '_removeFromTweener'
      timeline.pause()
      expect(timeline._removeFromTweener).toHaveBeenCalled()
    # it 'should set state to "pause"',->
    #   tweener.tweens = []
    #   t = new Tween
    #   timeline = new Tween duration: 2000
    #   t.add(timeline); t.setStartTime(); t.pause()
    #   expect(t.state).toBe 'pause'

  describe '_complete method ->', ->
    it 'should set progress to 1', ->
      tw = new Tween
      spyOn tw, 'setProgress'
      tw._complete()
      expect(tw.setProgress).toHaveBeenCalledWith 1
    it 'should set progress to number that was passed', ->
      tw = new Tween
      spyOn tw, 'setProgress'
      tw._complete(0)
      expect(tw.setProgress).toHaveBeenCalledWith 0
    it 'should call onRepeatComplete callback', ->
      isCalled = null
      fun = -> isCalled = true
      tw = new Tween onComplete: fun
      tw._complete()
      expect(isCalled).toBe true
    it 'should call onRepeatComplete callback', ->
      isCalled = null
      fun = -> isCalled = true
      tw = new Tween onRepeatComplete: fun
      tw._complete()
      expect(isCalled).toBe true
    it 'should set isCompleted to true', ->
      tw = new Tween
      tw._complete()
      expect(tw.isCompleted).toBe true
    it 'should set isStarted flag to false', ->
      tw = new Tween
      tw._complete()
      expect(tw.isStarted).toBe false

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
      expect(tw.isRepeatCompleted).toBe true

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
      expect(tw.isRepeatStart).toBe true





