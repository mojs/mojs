Timeline = window.mojs.Timeline
Tween    = window.mojs.Tween
tweener  = window.mojs.tweener
Transit  = window.mojs.Transit

describe 'Timeline ->', ->
  beforeEach -> tweener.removeAll()
  it 'should have timelines var', ->
    t = new Timeline
    expect(t.timelines.length).toBe 0
    expect(t._props.time)      .toBe 0
    expect(t._props.repeatTime).toBe 0
    expect(t._props.shiftedRepeatTime).toBe 0
  it 'should have initial state flags', ->
    t = new Timeline
    expect(t.state).toBe 'stop'
  describe 'defaults ->', ->
    it 'should have defaults', ->
      t = new Timeline
      expect(t.defaults.repeat).toBe 0
      expect(t.defaults.delay) .toBe 0
      expect(typeof t._props)   .toBe 'object'

  describe '_extendDefaults method ->', ->
    it 'should extend defaults by options #1', ->
      t = new Timeline delay: 200
      expect(t._props.delay)    .toBe 200
      expect(t._props.repeat)   .toBe 0
      expect(t._props.shiftedRepeatTime).toBe 0
    it 'should extend defaults by options #2', ->
      t = new Timeline repeat: 2
      expect(t._props.repeat)   .toBe 2
      expect(t._props.delay)    .toBe 0
      expect(t._props.shiftedRepeatTime).toBe 0
    it 'should extend defaults by options #3', ->
      t = new Timeline repeat: 2, delay: 300
      expect(t._props.repeat)   .toBe 2
      expect(t._props.delay)    .toBe 300
      expect(t._props.shiftedRepeatTime).toBe 0

  describe 'setProp method ->', ->
    it 'should set a prop to the props object', ->
      t = new Timeline repeat: 4
      t._setProp repeat: 8
      expect(t._props.repeat).toBe 8
    it 'should call recalcDuration method', ->
      t = new Timeline repeat: 4
      spyOn t, 'recalcDuration'
      t._setProp repeat: 8
      expect(t.recalcDuration).toHaveBeenCalled()

  describe 'add method ->', ->
    it 'should add timeline',->
      t = new Timeline
      t.add new Tween
      expect(t.timelines.length).toBe 1
      expect(t.timelines[0] instanceof Tween).toBe true
    it 'should return self for chaining',->
      t = new Timeline
      obj = t.add new Tween
      expect(obj).toBe t
    it 'should treat a module with timeline object as a timeline',->
      t = new Timeline
      t.add new Transit
      expect(t.timelines.length).toBe 1
      expect(t.timelines[0] instanceof Timeline).toBe true
    it 'should work with arrays of tweens',->
      t = new Timeline
      t1 = new Tween duration: 1000
      t2 = new Tween duration: 1500
      t.add [t1, t2, new Timeline]
      expect(t.timelines.length).toBe 3
      expect(t._props.repeatTime).toBe 1500
      expect(t.timelines[0] instanceof Tween).toBe true
      expect(t.timelines[1] instanceof Tween).toBe true
      expect(t.timelines[2] instanceof Timeline).toBe true
    it 'should calculate shiftedRepeatTime',->
      t = new Timeline
      t1 = new Tween duration: 1000
      t2 = new Tween duration: 1500
      t.add [t1, t2, new Timeline]
      expect(t.timelines.length).toBe 3
      expect(t._props.repeatTime).toBe 1500
      expect(t._props.shiftedRepeatTime).toBe 1500
    it 'should calculate shiftedRepeatTime #2',->
      t = new Timeline
      t1 = new Tween duration: 1000
      t2 = new Tween duration: 1500
      t._setProp 'shiftTime': 500
      t.add [t1, t2, new Timeline]
      expect(t.timelines.length).toBe 3
      expect(t._props.repeatTime).toBe 1500
      expect(t._props.shiftedRepeatTime).toBe 2000
    it 'should work with arguments',->
      tween = new Timeline
      t1 = new Tween duration: 500, delay: 200
      t2 = new Tween duration: 500, delay: 500
      tween.add t1, t2
      expect(tween._props.repeatTime).toBe 1000
      expect(tween.timelines.length).toBe 2
    it 'should work with mixed arguments',->
      t = new Timeline
      t1 = new Tween duration: 1000
      t2 = new Tween duration: 1500
      t.add [t1, new Tween, new Timeline], t2
      expect(t.timelines.length).toBe 4
      expect(t._props.repeatTime).toBe 1500
      expect(t.timelines[0] instanceof Tween).toBe true
      expect(t.timelines[1] instanceof Tween).toBe true
      expect(t.timelines[2] instanceof Timeline)   .toBe true
      expect(t.timelines[3] instanceof Tween).toBe true
    it 'should calc self duration',->
      t = new Timeline
      t.add new Tween duration: 500, delay: 200
      expect(t._props.repeatTime).toBe 700
      t.add new Tween duration: 500, delay: 200, repeat: 1
      expect(t._props.repeatTime).toBe 1400
    it 'should work with another tweens',->
      t1 = new Timeline
      t = new Timeline
      t.add new Tween duration: 500, delay: 200
      t.add new Tween duration: 500, delay: 200, repeat: 1
      t1.add t
      expect(t1._props.repeatTime).toBe 1400

  describe 'pushTimeline method ->', ->
    it 'should push timeline to timelines and calc repeatTime',->
      t = new Timeline
      t.pushTimeline new Tween duration: 4000
      expect(t.timelines.length).toBe 1
      expect(t.timelines[0] instanceof Tween).toBe true
      expect(t._props.repeatTime).toBe 4000

  describe 'repeat option ->', ->
    it 'should increase repeatTime', ->
      t = new Timeline repeat: 2
      t.add new Tween duration: 200
      expect(t._props.repeatTime).toBe 600
      expect(t._props.time)     .toBe 200
    # it 'should set nearest start time', ->
    #   t = new Timeline repeat: 2
    #   t.add new Tween duration: 200
    #   t.setProgress .6
    #   expect(t.timelines[0].progress).toBeCloseTo .8, 5
  #   it 'should end at 1', (dfr)->
  #     t = new Timeline repeat: 2
  #     proc = -1
  #     t.add new Tween
  #       duration: 50,
  #       onUpdate:(p)-> proc = p
  #       onComplete:-> expect(proc).toBe(1); dfr()
  #     t.play()

  describe 'startTime ->', ->
    it 'should set startTime', ->
      t = new Timeline repeat: 2
      t.add new Tween duration: 200
      t._setStartTime()

      expectedTime = performance.now()
      expect(t._props.startTime).toBeGreaterThan expectedTime - 50
      expect(t._props.startTime).not.toBeGreaterThan expectedTime

  describe 'endTime ->', ->
    it 'should set endTime', ->
      t = new Timeline repeat: 2
      t.add new Tween duration: 200
      t._setStartTime()

      expectedTime = performance.now()
      expect(t._props.endTime).toBe t._props.startTime+t._props.shiftedRepeatTime

  describe 'append method ->', ->
    it 'should add timeline',->
      t = new Timeline
      t.append new Tween
      expect(t.timelines.length).toBe 1
      expect(t.timelines[0] instanceof Tween).toBe true
    it 'should treat every argument as new append call',->
      t = new Timeline
      tm1 = new Tween duration: 1000, delay: 500
      tm2 = new Tween duration: 1000, delay: 700
      t.append tm1, tm2
      expect(t.timelines.length).toBe 2
      expect(t.timelines[0] instanceof Tween).toBe true
      expect(t.timelines[1] instanceof Tween).toBe true
      expect(t.timelines[1]._props.shiftTime).toBe 1500
      expect(t._props.time).toBe 3200
    it 'should treat arrays as parallel tweens #1', ->
      t = new Timeline
      tm1 = new Tween(duration: 500, delay: 500)
      tm2 = new Tween(duration: 500, delay: 700)
      tm3 = new Tween(duration: 500, delay: 700)
      t.append tm1, [tm2, tm3]
      expect(t._props.time).toBe 2200
    it 'should treat arrays as parallel tweens #2', ->
      t = new Timeline
      tm1 = new Tween(duration: 500, delay: 800)
      tm2 = new Tween(duration: 500, delay: 700)
      tm3 = new Tween(duration: 500, delay: 700)
      t.append [tm2, tm3], tm1
      expect(t._props.repeatTime).toBe 1200 + 1300
    it 'should arguments time = array time', ->

      # t = new Timeline delay: 2500
      t1 = new Timeline delay: 2500
      t2 = new Timeline delay: 2500
      tm0 = new Tween duration: 3000, delay: 200
      tm1 = new Tween(duration: 500, delay: 800)
      tm2 = new Tween(duration: 500, delay: 800)
      t1.add tm0; t2.add tm0
      t1.append tm1
      t2.append [tm2]
      time = performance.now()
      t1._setStartTime(time); t2._setStartTime(time)
      expect(tm2._props.startTime).toBe tm1._props.startTime

    it 'should delay the timeline to duration',->
      t = new Timeline
      t.add new Tween duration: 1000, delay: 200
      t.append new Tween duration: 500, delay: 500
      expect(t.timelines[1]._props.shiftTime).toBe 1200
    it 'should recalc duration',->
      t = new Timeline
      t.add new Tween duration: 1000, delay: 200
      t.append new Tween duration: 500, delay: 500
      expect(t._props.time).toBe 2200
    it 'should work with array',->
      t = new Timeline
      t.add new Tween duration: 1000, delay: 200
      tm1 = new Tween(duration: 500, delay: 500)
      tm2 = new Tween(duration: 500, delay: 700)
      t.append [tm1, tm2]
      expect(t.timelines.length).toBe 3
      expect(t._props.time).toBe 2400
    it 'should work with one argument',->
      t = new Timeline
      t.append new Tween duration: 1000, delay: 200
      expect(t.timelines.length).toBe 1
    it 'should work with multiple arguments',->
      t = new Timeline
      tm1 = new Tween(duration: 500, delay: 500)
      tm2 = new Tween(duration: 500, delay: 700)
      t.append tm1, tm2
      expect(t.timelines.length).toBe 2
    it 'should work with array and set the indexes',->
      t = new Timeline
      t.add new Tween duration: 1000, delay: 200
      tm1 = new Tween(duration: 500, delay: 500)
      tm2 = new Tween(duration: 500, delay: 700)
      t.append [tm1, tm2]
      expect(tm1.index).toBe 1
      expect(tm2.index).toBe 1
    it 'should add element index',->
      t = new Timeline
      t.append new Tween duration: 1000, delay: 200
      t.append new Tween duration: 1000, delay: 200
      expect(t.timelines[0].index).toBe 0
      expect(t.timelines[1].index).toBe 1

  describe 'remove method ->', ->
    it 'should remove timeline',->
      t = new Timeline
      timeline = new Tween
      t.add timeline
      t.remove timeline
      expect(t.timelines.length).toBe 0
    it 'should remove tween',->
      t1 = new Timeline
      t = new Timeline
      timeline = new Tween
      t.add timeline
      t1.add t
      t1.remove t
      expect(t1.timelines.length).toBe 0
  
  describe 'recalcDuration method ->', ->
    it 'should recalculate duration', ->
      t = new Timeline
      timeline = new Tween  duration: 100
      timeline2 = new Tween duration: 1000
      t.add timeline
      t.timelines.push timeline2
      t.recalcDuration()
      expect(t._props.time).toBe 1000
    
  describe 'play method ->', ->
    it 'should get the start time',->
      t = new Timeline
      t.play()
      expect(t._props.startTime).toBeDefined()
      expect(t._props.endTime).toBe t._props.startTime + t._props.repeatTime
    it 'should call the setStartTime method',->
      t = new Timeline
      spyOn t, '_setStartTime'
      time = 0
      t.play time
      expect(t._setStartTime).toHaveBeenCalledWith time
    it 'should start every timeline',->
      t = new Timeline
      t.add new Tween duration: 500, delay: 200
      t.add new Tween duration: 500, delay: 100
      spyOn t.timelines[0], '_setStartTime'
      spyOn t.timelines[1], '_setStartTime'
      t.play()
      expect(t.timelines[0]._setStartTime).toHaveBeenCalledWith t._props.startTime
      expect(t.timelines[1]._setStartTime).toHaveBeenCalledWith t._props.startTime
    it 'should add itself to tweener',->
      t = new Timeline
      spyOn tweener, 'add'
      t.play()
      expect(tweener.add).toHaveBeenCalled()
    it 'should not add itself to tweener if time was passed',->
      t = new Timeline
      spyOn tweener, 'add'
      t.play 10239123
      expect(tweener.add).not.toHaveBeenCalled()
    it 'should set state to "play"',->
      tweener.tweens = []
      t = new Timeline
      timeline = new Tween duration: 2000
      t.add(timeline); t.play()
      expect(t.state).toBe 'play'
    
  describe 'removeFromTweener method ->', ->
    it 'should call t.remove method with self',->
      tweener.tweens = []
      t = new Timeline
      timeline = new Tween duration: 2000
      t.add timeline
      t.play()
      t.removeFromTweener()
      expect(tweener.tweens.length).toBe 0

  describe 'pause method ->', ->
    it 'should call t.remove method with self',->
      tweener.tweens = []
      t = new Timeline
      timeline = new Tween duration: 2000
      t.add timeline
      t.play()
      spyOn t, 'removeFromTweener'
      t.pause()
      expect(t.removeFromTweener).toHaveBeenCalled()
    it 'should set state to "pause"',->
      tweener.tweens = []
      t = new Timeline
      timeline = new Tween duration: 2000
      t.add(timeline); t.play(); t.pause()
      expect(t.state).toBe 'pause'
  
  describe 'stop method ->', ->
    it 'should call t.removeFromTweener method with self',->
      tweener.tweens = []; t = new Timeline
      timeline = new Tween duration: 2000
      t.add timeline
      t.play()
      spyOn t, 'removeFromTweener'
      t.stop()
      expect(t.removeFromTweener).toHaveBeenCalled()
    it 'should reset progress to 0',->
      tweener.tweens = []; t = new Timeline
      timeline = new Tween duration: 2000
      t.add timeline
      t.play()
      spyOn t, 'setProgress'
      t.stop()
      expect(t.setProgress).toHaveBeenCalledWith 0
    it 'should set state to "stop"',->
      tweener.tweens = []
      t = new Timeline
      timeline = new Tween duration: 2000
      t.add(timeline); t.play(); t.stop()
      expect(t.state).toBe 'stop'

  describe 'restart method ->', ->
    it 'should call stop method',->
      tweener.tweens = []
      t = new Timeline
      timeline = new Tween duration: 2000
      t.add(timeline); t.play()
      spyOn t, 'stop'
      t.restart()
      expect(t.stop).toHaveBeenCalled()
    it 'should call play method',->
      tweener.tweens = []
      t = new Timeline
      timeline = new Tween duration: 2000
      t.add(timeline); t.play()
      spyOn t, 'play'
      t.restart()
      expect(t.play).toHaveBeenCalled()

  describe 'onReverseComplete callback ->', ->
    it 'should be defined', ->
      t = new Timeline onReverseComplete: ->
      expect(t.o.onReverseComplete).toBeDefined()
    it 'should call onReverseComplete callback', ()->
      t = new Timeline(onReverseComplete:->)
      t.add new Tween duration: 10
      spyOn(t.o, 'onReverseComplete'); t.play()
      t.setProgress .5
      t.setProgress 0
      expect(t.o.onReverseComplete).toHaveBeenCalled()
    it 'should not be called on start', ()->
      t = new Timeline(onReverseComplete:->)
      t.add new Tween duration: 10
      spyOn(t.o, 'onReverseComplete'); t.play()
      t.setProgress 0
      expect(t.o.onReverseComplete).not.toHaveBeenCalled()

  describe 'onComplete callback ->', ->
    it 'should be defined', ->
      t = new Timeline onComplete: ->
      expect(t.o.onComplete).toBeDefined()
    it 'should call onComplete callback', (dfr)->
      t = new Timeline(onComplete:->)
      t.add new Tween duration: 10
      spyOn(t.o, 'onComplete'); t.play()
      setTimeout ->
        expect(t.o.onComplete).toHaveBeenCalled(); dfr()
      , 200
    it 'should call onComplete callback just once', ->
      t0 = new Timeline repeat: 5, delay: 400
      t  = new Timeline onComplete:->
      t.add new Tween
      t0.add t
      t0._setStartTime()
      spyOn(t.o, 'onComplete')

      t0._update t0._props.startTime - 250
      t0._update t0._props.startTime
      t0._update t0._props.startTime + 16
      t0._update t0._props.startTime + 32
      t0._update t0._props.endTime

      t0._update t0._props.startTime - 250
      t0._update t0._props.startTime
      t0._update t0._props.startTime + 16
      t0._update t0._props.startTime + 32
      t0._update t0._props.endTime

      expect(t.o.onComplete.calls.count()).toBe 2

    it 'should have the right scope', (dfr)->
      isRightScope = false
      t = new Timeline onComplete:-> isRightScope = @ instanceof Timeline
      t.add new Tween duration: 20
      t.play()
      setTimeout (-> expect(isRightScope).toBe(true); dfr()), 100
    it 'should fire after the last onUpdate', (dfr)->
      proc = 0
      tween = new Timeline
        onUpdate:(p)-> proc = p
        onComplete:-> expect(proc).toBe(1); dfr()
      tween.add new Tween duration: 20
      tween.play()
      tween._update tween._props.startTime + 22
    it 'should reset flags', ->
      t = new Timeline(onComplete:->)
      duration = 500
      t.add new Tween duration: duration

      t._update t._props.startTime + duration/2
      t._update t._props.endTime

      expect(t.isStarted).toBe false
      expect(t.isCompleted).toBe true

  describe 'onUpdate callback ->', ->
    it 'should be defined', ->
      t = new Timeline onUpdate: ->
      expect(t.onUpdate).toBeDefined()
    it 'should call onUpdate callback', (dfr)->
      t = new Timeline(onUpdate:->)
      t.add new Tween duration: 20
      spyOn(t, 'onUpdate'); t.play()
      setTimeout ->
        expect(t.onUpdate).toHaveBeenCalled(); dfr()
      , 100
    it 'should have the right scope', (dfr)->
      isRightScope = false
      t = new Timeline onUpdate:-> isRightScope = @ instanceof Timeline
      t.add new Tween duration: 20
      t.play()
      setTimeout (-> expect(isRightScope).toBe(true); dfr()), 100
    it 'should pass the current progress', ->
      progress = null
      t = new Timeline onUpdate:(p)-> progress = p
      t.add new Tween duration: 20
      t._setStartTime()
      t._update t._props.startTime + 10
      expect(progress).toBeCloseTo .5, 5
    it 'should not run if time is less then startTime', ->
      t = new Timeline onUpdate:->
      t.add new Tween duration: 20
      spyOn(t, 'onUpdate'); t.play()
      t._update t._props.startTime - 10
      expect(t.onUpdate).not.toHaveBeenCalled()
    it 'should run if time is greater then endTime', ->
      t = new Timeline onUpdate:->
      t.add new Tween duration: 20
      spyOn(t, 'onUpdate'); t.play()
      t._update t._props.startTime + 25
      expect(t.onUpdate).toHaveBeenCalledWith 1

    # it 'should be called with 0 on repeat if reversed and missed time', ->
    #   isZero = 0; duration = 20
    #   t = new Timeline repeat: 3
    #   t.add new Tween
    #     duration: duration,
    #     onUpdate:(p)-> (p is 0) and isZero++
    #   t._setStartTime()
      
    #   updateInPeriod = (shiftTime)->
    #     t._update t._props.startTime + shiftTime + (duration) - 5
    #     t._update t._props.startTime + shiftTime + (duration/2)
    #     t._update t._props.startTime + shiftTime + 5

    #   updateInPeriod( 3*duration )
    #   updateInPeriod( 2*duration )
    #   expect(isZero).toBe(1)

    #   updateInPeriod( 1*duration )
    #   expect(isZero).toBe(2)

    #   updateInPeriod( 0*duration )
    #   expect(isZero).toBe(3)

    # it 'should be called with 0 on repeat if reversed and tween in repeat', ->
    #   isZero = 0; duration = 20
    #   t = new Timeline repeat: 1
    #   t.add new Tween
    #     repeat: 1
    #     duration: duration,
    #     onUpdate:(p)-> (p is 0) and isZero++
    #   t._setStartTime()
      
    #   updateInPeriod = (shiftTime)->
    #     t._update t._props.startTime + shiftTime + (duration) - 5
    #     t._update t._props.startTime + shiftTime + (duration/2)
    #     t._update t._props.startTime + shiftTime + 5

    #   updateInPeriod( 3*duration )
    #   # updateInPeriod( 2*duration )
    #   t._update t._props.startTime + 2*duration + (duration) - 5
    #   expect(isZero).toBe(1)

      # updateInPeriod( 1*duration )
      # expect(isZero).toBe(2)



      # updateInPeriod( 2*duration )
      # expect(isZero).toBe(2)

      # updateInPeriod( 0*duration )
      # expect(isZero).toBe(3)


    # it 'should be called with 1 on repeat with missed time', ->
    #   isOne = 0; duration = 20
    #   t = new Timeline repeat: 3
    #   t.add new Tween duration: duration, onUpdate:(p)-> (p is 1) and isOne++
    #   t._setStartTime()
      
    #   updateInPeriod = (shiftTime)->
    #     t._update t._props.startTime + shiftTime + 5
    #     t._update t._props.startTime + shiftTime + (duration/2)
    #     t._update t._props.startTime + shiftTime + (duration) - 5

    #   updateInPeriod( 0 )
      
    #   updateInPeriod( duration )
    #   updateInPeriod( 2*duration )
      
    #   expect(isOne).toBe 2

    #   updateInPeriod( 3*duration )
      
    #   expect(isOne).toBe 3

    #   updateInPeriod( 4*duration )
    #   updateInPeriod( 5*duration )
    #   updateInPeriod( 6*duration )
      
    #   expect(isOne).toBe 4

  describe 'onStart callback ->', ->
    it 'should be defined', ->
      t = new Timeline onStart: ->
      expect(t.o.onStart).toBeDefined()
    it 'should call onStart callback', ->
      t = new Timeline(onStart:->)
      t.add new Tween duration: 500
      spyOn(t.o, 'onStart'); t.play()
      t._update t._props.startTime + 10
      expect(t.o.onStart).toHaveBeenCalled()
      expect(t.isStarted).toBe true
    it 'should call onStart callback only once', ->
      t = new Timeline(onStart:->)
      t.add new Tween duration: 500
      spyOn(t.o, 'onStart'); t.play()
      t._update t._props.startTime + 10
      t._update t._props.startTime + 15
      expect(t.o.onStart.calls.count()).toBe 1
    it 'should have the right scope', ->
      isRightScope = false
      t = new Timeline onStart:-> isRightScope = @ instanceof Timeline
      t.add new Tween duration: 20
      t.play()
      t._update t._props.startTime + 10
      expect(isRightScope).toBe(true)
    it 'should be called just once when nested', (dfr)->
      
      tm0 = new Timeline repeat: 2, delay: 50
      tm  = new Timeline onStart: ->
      tw1 = new Tween duration: 50

      tm.add tw1
      tm0.add tm, tw1

      spyOn(tm.o, 'onStart').and.callThrough()

      tm0.play()

      setTimeout ->
        expect(tm.o.onStart.calls.count()).toBe 3
        dfr()
      , 500

  describe 'update method ->', ->
    it 'should update the current time on every timeline',->
      t = new Timeline
      t.add new Tween duration: 500, delay: 200
      t.add new Tween duration: 500, delay: 100
      t.play()
      spyOn t.timelines[0], '_update'
      spyOn t.timelines[1], '_update'
      t._update time = performance.now() + 200
      expect(t.timelines[0]._update).toHaveBeenCalledWith time, true
      expect(t.timelines[1]._update).toHaveBeenCalledWith time, true
    it 'should return true is ended',->
      t = new Timeline
      t.add new Tween duration: 500, delay: 200
      t.add new Tween duration: 500, delay: 100
      t.play()
      expect(t._update(performance.now() + 2000)).toBe true
    it 'should not go further then endTime',->
      t = new Timeline
      t.add new Tween duration: 500, delay: 200
      t.play()
      t._update t._props.startTime + 1000
      expect(t.prevTime).toBe t._props.endTime
    it 'should work with tweens', ->
      t  = new Timeline
      t1 = new Timeline
      t2 = new Timeline
      ti1 = new Tween duration: 500, delay: 200
      spyOn ti1, '_update'
      ti2 = new Tween duration: 500, delay: 100
      spyOn ti2, '_update'
      ti3 = new Tween duration: 100, delay: 0
      spyOn ti3, '_update'
      ti4 = new Tween duration: 800, delay: 500
      spyOn ti4, '_update'
      t1.add(ti1); t1.add(ti2); t2.add(ti3); t2.add(ti4)
      t.add(t1); t.add(t2)
      t.play()
      t._update time = t._props.startTime + 300
      expect(ti1._update).toHaveBeenCalledWith time, true
      expect(ti2._update).toHaveBeenCalledWith time, true
      expect(ti3._update).toHaveBeenCalledWith time, true
      expect(ti4._update).toHaveBeenCalledWith time, true

    it 'should save _previousUpdateTime', ->
      t  = new Timeline

      time = performance.now()
      t._update time
      expect(t._previousUpdateTime).toBe time

  describe '_updateTimelines method ->', ->
    it 'should set time to timelines', ->
      t = new Timeline
      t.add new Tween duration: 500, delay: 200
      t.add new Tween duration: 500, delay: 100
      t._setStartTime()
      time = t._props.startTime + 200
      spyOn t.timelines[0], '_update'
      spyOn t.timelines[1], '_update'
      t._updateTimelines(time)
      expect(t.timelines[0]._update).toHaveBeenCalledWith time, true
      expect(t.timelines[1]._update).toHaveBeenCalledWith time, true
    it 'should pass the endTime if the progress is much further', ->
      t = new Timeline
      t.add new Tween duration: 500, delay: 200
      t.add new Tween duration: 500, delay: 100
      t._setStartTime()
      time = t._props.startTime + 200
      spyOn t.timelines[0], '_update'
      spyOn t.timelines[1], '_update'
      t._updateTimelines(time+(5*t._props.time))
      expect(t.timelines[0]._update).toHaveBeenCalledWith t._props.endTime, true
      expect(t.timelines[1]._update).toHaveBeenCalledWith t._props.endTime, true

    it 'should pass the endTime if the progress is in delay period', ->
      t = new Timeline delay: 200
      t.add new Tween duration: 500, delay: 200
      t.add new Tween duration: 500, delay: 100
      t._setStartTime()
      spyOn t.timelines[0], '_update'
      spyOn t.timelines[1], '_update'
      time = t._props.startTime - 100
      timeAfterPeriod = t._props.startTime+t._props.delay+t._props.time-100
      t._updateTimelines(timeAfterPeriod)
      timeAtOne = t._props.startTime+t._props.time
      expect(t.timelines[0]._update).toHaveBeenCalledWith timeAtOne, true
      expect(t.timelines[1]._update).toHaveBeenCalledWith timeAtOne, true

    it 'should pass the endTime if the progress is in
        subsequent delay period', ->
      t = new Timeline delay: 200, repeat: 2
      t.add new Tween duration: 500
      t._setStartTime()
      time = t._props.startTime + t._props.time + 100
      spyOn t.timelines[0], '_update'
      t._updateTimelines(time)
      endTime = t._props.startTime + t._props.time
      expect(t.timelines[0]._update).toHaveBeenCalledWith endTime, true

    it 'should pass false as second parameter if the new time is smaller', ->
      t = new Timeline delay: 200, repeat: 2
      t.add new Tween duration: 500
      t._setStartTime()
      time = t._props.startTime + 300
      t._updateTimelines(time)
      spyOn t.timelines[0], '_update'
      t._updateTimelines(time-10)
      expect(t.timelines[0]._update).toHaveBeenCalledWith time-10, false

    it 'should set time to timelines with respect to repeat option', ->
      t = new Timeline repeat: 1
      t.add new Tween delay: 200, duration: 500
      t.add new Tween delay: 100, duration: 500
      t._setStartTime()
      spyOn t.timelines[0], '_update'
      spyOn t.timelines[1], '_update'
      time = t._props.startTime + 5
      t._updateTimelines(time + t._props.time)
      arg0 = t.timelines[0]._update.calls.mostRecent().args[0]
      arg1 = t.timelines[1]._update.calls.mostRecent().args[0]
      expect(arg0).toBeCloseTo time, 5
      expect(arg1).toBeCloseTo time, 5
    it 'should set time to timelines with repeat and delay option', (dfr)->
      tweener.removeAll()
      t = new Timeline repeat: 1, delay: 500
      t.add new Tween duration: 500, delay: 200
      t.add new Tween duration: 500, delay: 100
      t._setStartTime()
      spyOn t.timelines[0], '_update'
      spyOn t.timelines[1], '_update'
      time = t._props.startTime
      t._updateTimelines(time + t._props.time + t._props.delay + 5)
      arg0 = t.timelines[0]._update.calls.mostRecent().args[0]
      arg1 = t.timelines[1]._update.calls.mostRecent().args[0]
      expect(arg0).toBeCloseTo (time + 5), 5
      expect(arg1).toBeCloseTo (time + 5), 5
      dfr()

    it 'should pass thru the isGrow param', ->
      t = new Timeline repeat: 1, delay: 500
      tw = new mojs.Tween
      t.add tw
      t._setStartTime()
      spyOn tw, '_update'
      time = t._props.startTime + 100
      t._updateTimelines time, false
      expect(tw._update).toHaveBeenCalledWith time, false

    it 'should not be called if the timeline was completed', ->
      tm    = new mojs.Timeline
      tm1   = new mojs.Timeline
      tm1.add new mojs.Tween duration: 1000
      tm2   = new mojs.Timeline delay: 1000
      tm2.add new mojs.Tween
      tm.add tm1, tm2

      tm._setStartTime()
      tm._update tm._props.startTime + 100
      tm._update tm._props.startTime + 200
      tm._update tm._props.startTime + 800
      tm._update tm._props.startTime + 1000
      
      spyOn(tm1, '_updateTimelines').and.callThrough()
      spyOn(tm1, '_checkCallbacks').and.callThrough()

      tm._update tm._props.startTime + 1200
      
      expect(tm1._updateTimelines).not.toHaveBeenCalled()
      expect(tm1._checkCallbacks).not.toHaveBeenCalled()


  describe 'setProgress method ->', ->
    it 'should call the update on every child with progress time', ->
      t   = new Timeline
      t1  = new Timeline
      t2  = new Timeline
      ti1 = new Tween duration: 500, delay: 200
      spyOn ti1, '_update'
      ti2 = new Tween duration: 500, delay: 100
      spyOn ti2, '_update'
      ti3 = new Tween duration: 100, delay: 0
      spyOn ti3, '_update'
      ti4 = new Tween duration: 800, delay: 500
      spyOn ti4, '_update'
      t1.add(ti1, ti2); t2.add(ti3, ti4)
      t.add(t1, t2)
      t._setStartTime()
      # t.prepareStart(); t.startTimelines()
      t.setProgress .5
      time = t._props.startTime + 650
      expect(ti1._update).toHaveBeenCalledWith time, true
      expect(ti2._update).toHaveBeenCalledWith time, true
      expect(ti3._update).toHaveBeenCalledWith time, true
      expect(ti4._update).toHaveBeenCalledWith time, true
    it 'should call _setStartTime if there is no @props.startTime', ->
      t = new Timeline
      spyOn t, '_setStartTime'
      t.setProgress .5
      expect(t._setStartTime).toHaveBeenCalled()

    it 'should call self update', ->
      t   = new Timeline
      t1  = new Timeline
      t2  = new Timeline
      ti1 = new Tween duration: 500, delay: 200
      ti2 = new Tween duration: 500, delay: 100
      ti3 = new Tween duration: 100, delay: 0
      ti4 = new Tween duration: 800, delay: 500
      t1.add(ti1); t1.add(ti2); t2.add(ti3); t2.add(ti4)
      t.add(t1); t.add(t2)
      # t.prepareStart(); t.startTimelines()
      t._setStartTime()
      spyOn t, '_update'
      t.setProgress .5
      expect(t._update).toHaveBeenCalledWith t._props.startTime + 650
    it 'should not set the progress more then 1', ->
      t   = new Timeline; t1  = new Timeline
      t1.add new Tween duration: 500, delay: 200
      t.add(t1); t._setStartTime() # t.prepareStart(); t.startTimelines()
      spyOn t, '_update'
      t.setProgress 1.5
      expect(t._update).toHaveBeenCalledWith t._props.startTime+t._props.repeatTime
    it 'should not set the progress less then 0', ->
      t   = new Timeline; t1  = new Timeline
      t1.add new Tween duration: 500, delay: 200
      t.add(t1); t._setStartTime() #t.prepareStart(); t.startTimelines()
      spyOn t, '_update'
      t.setProgress -1.5
      expect(t._update).toHaveBeenCalledWith t._props.startTime

  describe 'setStartTime method', ->
    it 'should call startTimelines methods', ->
      t   = new Timeline; t1  = new Timeline
      t1.add new Tween duration: 500, delay: 200
      spyOn t, 'startTimelines'
      time = 0
      t._setStartTime time
      expect(t.startTimelines).toHaveBeenCalledWith time

  describe 'startTimelines method ->', ->
    it 'should add self shiftTime to child timelines', ->
      t   = new Timeline
      t.add new Tween duration: 500
      time = 0; shift = 500
      t._setProp 'shiftTime': shift
      t._setStartTime time
      expect(t.timelines[0]._props.startTime).toBe time + shift

    it 'should set time to startTime if no time was passed', ->
      t   = new Timeline
      t.add new Tween duration: 500
      spyOn t.timelines[0], '_setStartTime'
      t._setStartTime(null)

      expect(t.timelines[0]._setStartTime).toHaveBeenCalledWith t._props.startTime


  describe 'time track ->', ->
    it 'should save the current time track', ->
      t   = new Timeline
      t.add new Tween duration: 500
      t.setProgress .5
      expect(t.prevTime).toBe t._props.startTime + 250

  describe 'recalcDuration method ->', ->
    it 'should recalc duration', ->
      t   = new Timeline
      t.add new Tween duration: 500
      t.recalcDuration()
      expect(t._props.time).toBe 500
      expect(t._props.repeatTime).toBe 500
    it 'should recalc duration with parallel tweens', ->
      t   = new Timeline
      tm1 = new Tween duration: 500
      tm2 = new Tween delay: 500, duration: 700
      tm3 = new Tween duration: 800
      tm4 = new Tween delay: 1500, duration: 500
      t.add tm1, [tm2, tm3], tm4
      time = t._props.time
      repeatTime = t._props.repeatTime
      t.recalcDuration()
      expect(t._props.time).toBe time
      expect(t._props.repeatTime).toBe repeatTime

  describe 'delay option ->', ->
    it 'should increase repeatTime', ->
      t = new Timeline repeat: 4, delay: 2000
      t.add new Tween duration: 600
      expect(t._props.repeatTime).toBe 13000

  describe 'getDimentions method ->', ->
    it 'should set startTime and endTime', ->
      t = new Timeline
      t.add new Tween
      t.getDimentions()
      expect(t._props.startTime).toBeDefined()
      expect(t._props.endTime)  .toBeDefined()
    it 'should have time option to start from', ->
      t = new Timeline delay: 600
      t.add new Tween
      time = performance.now() + 500
      t.getDimentions(time)
      expect(t._props.startTime).toBe time + 600

  describe 'nested timelines ->', ->
    # it 'should work with nested timelines', ->
    #   tm0 = new mojs.Timeline
    #   tm1 = new mojs.Timeline
    #   tm2 = new mojs.Timeline

    #   tw1 = new mojs.Tween duration: 100, onUpdate:(p)->
    #   tm1.add tw1

    #   tw2 = new mojs.Tween duration: 400, onUpdate:(p)->
    #   tm2.add tw2

    #   tm0.add tm1
    #   tm0.append tm2
    #   tm0.setProgress .5
    #   expect(tw2.progress).toBeCloseTo .375, 5
    it 'should set right endTime times', ->
      tm0 = new mojs.Timeline
      tm1 = new mojs.Timeline
      tm2 = new mojs.Timeline

      tw1 = new mojs.Tween duration: 100, onUpdate:(p)->
      tm1.add tw1

      tw2 = new mojs.Tween duration: 400, onUpdate:(p)->
      tm2.add tw2

      tm0.add tm1
      tm0.append tm2

      tm0._setStartTime()
      
      expect(tm0._props.endTime).toBeCloseTo tm0._props.startTime + 500, 3
      expect(tm2._props.endTime).toBeCloseTo tm0._props.startTime + 500, 3
      expect(tm2._props.startTime).toBeCloseTo tm0._props.startTime + 100, 3
    it 'should set right endTime times', ->
      tm0 = new mojs.Timeline repeat: 2
      tm1 = new mojs.Timeline
      tm2 = new mojs.Timeline

      tw1 = new mojs.Tween duration: 100, onUpdate:(p)->
      tm1.add tw1

      tw2 = new mojs.Tween duration: 400, onUpdate:(p)->
      tm2.add tw2

      tm0.add tm1
      tm0.append tm2
      tm0._setStartTime()
      expect(tm2._props.shiftedRepeatTime).toBe 500

    it 'should calculate right dimentions', ->
      tm0 = new mojs.Timeline

      tm1 = new mojs.Timeline
      tm2 = new mojs.Timeline delay: 1000

      tw1 = new mojs.Tween
      tm1.add tw1

      tw2 = new mojs.Tween
      tm2.add tw2

      tm0.add tm1; tm0.append tm2

      tm0._setStartTime()

      expect(tm0._props.repeatTime).toBe 2200
      expect(tm2._props.repeatTime).toBe 1600
      expect(tm2._props.shiftedRepeatTime).toBe 1200
      expect(tm2._props.shiftTime).toBe 600

      expect(tm2._props.startTime).toBe tw2._props.startTime
      tm2StartTime = tm0._props.startTime + tm1._props.repeatTime+tm2._props.delay
      expect(tm2._props.startTime).toBe tm2StartTime

      tm2EndTime = tm2._props.startTime + tm2._props.repeatTime - tm2._props.delay
      expect(tm2._props.endTime).toBe tm2EndTime

      expect(tm0._props.endTime).toBe tm2._props.endTime

    # it 'should set nested tween progress to 1 at the end', ->
    #   tm0 = new mojs.Timeline

    #   tm1 = new mojs.Timeline

    #   tw1 = new mojs.Tween
    #   tm1.add tw1

    #   tw2 = new mojs.Tween

    #   tm0.add tm1; tm0.append tw2; tm0._setStartTime()

    #   tm0._update tm0._props.endTime - 20
    #   tm0._update tm0._props.endTime

    #   expect(tw2.progress).toBe 1

    #   expect(tm0._props.repeatTime).toBe 1200
    #   expect(tw2._props.repeatTime).toBe 600
    #   # expect(tw2._props.shiftedRepeatTime).toBe 1200

    #   expect(tw2._props.startTime).toBe tm0._props.startTime+tm1._props.repeatTime
    #   expect(tw2._props.endTime).toBe tm0._props.startTime+tm0._props.repeatTime

    # it 'should set nested tween inside timeline progress to 1 at the end', ->
    #   tm0 = new mojs.Timeline

    #   tm1 = new mojs.Timeline
    #   tm2 = new mojs.Timeline delay: 1000

    #   tw1 = new mojs.Tween
    #   tm1.add tw1

    #   tw2 = new mojs.Tween
    #   tm2.add tw2

    #   tm0.add tm1; tm0.append tm2; tm0._setStartTime()

    #   tm0._update tm0._props.endTime - 20
    #   tm0._update tm0._props.endTime

    #   expect(tw2.progress).toBe 1

