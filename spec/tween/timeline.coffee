Timeline = window.mojs.Timeline
Tween    = window.mojs.Tween
tweener  = window.mojs.tweener
Transit  = window.mojs.Transit

describe 'Timeline ->', ->
  beforeEach -> tweener.removeAll()
  it 'should have timelines var', ->
    t = new Timeline
    expect(t.timelines.length).toBe 0
    expect(t.props.time)      .toBe 0
    expect(t.props.repeatTime).toBe 0
    expect(t.props.shiftedRepeatTime).toBe 0
  it 'should have initial state flags', ->
    t = new Timeline
    expect(t.state).toBe 'stop'
  describe 'defaults ->', ->
    it 'should have defaults', ->
      t = new Timeline
      expect(t.defaults.repeat).toBe 0
      expect(t.defaults.delay) .toBe 0
      expect(typeof t.props)   .toBe 'object'

  describe '_extendDefaults method ->', ->
    it 'should extend defaults by options #1', ->
      t = new Timeline delay: 200
      expect(t.props.delay)    .toBe 200
      expect(t.props.repeat)   .toBe 0
      expect(t.props.shiftedRepeatTime).toBe 0
    it 'should extend defaults by options #2', ->
      t = new Timeline repeat: 2
      expect(t.props.repeat)   .toBe 2
      expect(t.props.delay)    .toBe 0
      expect(t.props.shiftedRepeatTime).toBe 0
    it 'should extend defaults by options #3', ->
      t = new Timeline repeat: 2, delay: 300
      expect(t.props.repeat)   .toBe 2
      expect(t.props.delay)    .toBe 300
      expect(t.props.shiftedRepeatTime).toBe 0

  describe 'setProp method ->', ->
    it 'should set a prop to the props object', ->
      t = new Timeline repeat: 4
      t.setProp repeat: 8
      expect(t.props.repeat).toBe 8
    it 'should call recalcDuration method', ->
      t = new Timeline repeat: 4
      spyOn t, 'recalcDuration'
      t.setProp repeat: 8
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
      expect(t.props.repeatTime).toBe 1500
      expect(t.timelines[0] instanceof Tween).toBe true
      expect(t.timelines[1] instanceof Tween).toBe true
      expect(t.timelines[2] instanceof Timeline).toBe true
    it 'should calculate shiftedRepeatTime',->
      t = new Timeline
      t1 = new Tween duration: 1000
      t2 = new Tween duration: 1500
      t.add [t1, t2, new Timeline]
      expect(t.timelines.length).toBe 3
      expect(t.props.repeatTime).toBe 1500
      expect(t.props.shiftedRepeatTime).toBe 1500
    it 'should calculate shiftedRepeatTime #2',->
      t = new Timeline
      t1 = new Tween duration: 1000
      t2 = new Tween duration: 1500
      t.setProp 'shiftTime': 500
      t.add [t1, t2, new Timeline]
      expect(t.timelines.length).toBe 3
      expect(t.props.repeatTime).toBe 1500
      expect(t.props.shiftedRepeatTime).toBe 2000
    it 'should work with arguments',->
      tween = new Timeline
      t1 = new Tween duration: 500, delay: 200
      t2 = new Tween duration: 500, delay: 500
      tween.add t1, t2
      expect(tween.props.repeatTime).toBe 1000
      expect(tween.timelines.length).toBe 2
    it 'should work with mixed arguments',->
      t = new Timeline
      t1 = new Tween duration: 1000
      t2 = new Tween duration: 1500
      t.add [t1, new Tween, new Timeline], t2
      expect(t.timelines.length).toBe 4
      expect(t.props.repeatTime).toBe 1500
      expect(t.timelines[0] instanceof Tween).toBe true
      expect(t.timelines[1] instanceof Tween).toBe true
      expect(t.timelines[2] instanceof Timeline)   .toBe true
      expect(t.timelines[3] instanceof Tween).toBe true
    it 'should calc self duration',->
      t = new Timeline
      t.add new Tween duration: 500, delay: 200
      expect(t.props.repeatTime).toBe 700
      t.add new Tween duration: 500, delay: 200, repeat: 1
      expect(t.props.repeatTime).toBe 1400
    it 'should work with another tweens',->
      t1 = new Timeline
      t = new Timeline
      t.add new Tween duration: 500, delay: 200
      t.add new Tween duration: 500, delay: 200, repeat: 1
      t1.add t
      expect(t1.props.repeatTime).toBe 1400

  describe 'pushTimeline method ->', ->
    it 'should push timeline to timelines and calc repeatTime',->
      t = new Timeline
      t.pushTimeline new Tween duration: 4000
      expect(t.timelines.length).toBe 1
      expect(t.timelines[0] instanceof Tween).toBe true
      expect(t.props.repeatTime).toBe 4000

  describe 'repeat option ->', ->
    it 'should increase repeatTime', ->
      t = new Timeline repeat: 2
      t.add new Tween duration: 200
      expect(t.props.repeatTime).toBe 600
      expect(t.props.time)     .toBe 200
    it 'should set nearest start time', ->
      t = new Timeline repeat: 2
      t.add new Tween duration: 200
      t.setProgress .6
      expect(t.timelines[0].progress).toBeCloseTo .8, 5
  #   it 'should end at 1', (dfr)->
  #     t = new Timeline repeat: 2
  #     proc = -1
  #     t.add new Tween
  #       duration: 50,
  #       onUpdate:(p)-> proc = p
  #       onComplete:-> expect(proc).toBe(1); dfr()
  #     t.start()

  describe 'startTime ->', ->
    it 'should set startTime', ->
      t = new Timeline repeat: 2
      t.add new Tween duration: 200
      t.setStartTime()

      expectedTime = performance.now()
      expect(t.props.startTime).toBeGreaterThan expectedTime - 50
      expect(t.props.startTime).not.toBeGreaterThan expectedTime

  describe 'endTime ->', ->
    it 'should set endTime', ->
      t = new Timeline repeat: 2
      t.add new Tween duration: 200
      t.setStartTime()

      expectedTime = performance.now()
      expect(t.props.endTime).toBe t.props.startTime+t.props.shiftedRepeatTime

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
      expect(t.timelines[1].props.shiftTime).toBe 1500
      expect(t.props.time).toBe 3200
    it 'should treat arrays as parallel tweens #1', ->
      t = new Timeline
      tm1 = new Tween(duration: 500, delay: 500)
      tm2 = new Tween(duration: 500, delay: 700)
      tm3 = new Tween(duration: 500, delay: 700)
      t.append tm1, [tm2, tm3]
      expect(t.props.time).toBe 2200
    it 'should treat arrays as parallel tweens #2', ->
      t = new Timeline
      tm1 = new Tween(duration: 500, delay: 800)
      tm2 = new Tween(duration: 500, delay: 700)
      tm3 = new Tween(duration: 500, delay: 700)
      t.append [tm2, tm3], tm1
      expect(t.props.repeatTime).toBe 1200 + 1300
    it 'should arguments time = array time', ->

      # t = new Timeline delay: 2500, isIt: '0'
      t1 = new Timeline delay: 2500, isIt: '1'
      t2 = new Timeline delay: 2500, isIt: '2'
      tm0 = new Tween duration: 3000, delay: 200
      tm1 = new Tween(duration: 500, delay: 800)
      tm2 = new Tween(duration: 500, delay: 800)
      t1.add tm0; t2.add tm0
      t1.append tm1
      t2.append [tm2]
      time = performance.now()
      t1.setStartTime(time); t2.setStartTime(time)
      expect(tm2.props.startTime).toBe tm1.props.startTime

    it 'should delay the timeline to duration',->
      t = new Timeline
      t.add new Tween duration: 1000, delay: 200
      t.append new Tween duration: 500, delay: 500
      expect(t.timelines[1].props.shiftTime).toBe 1200
    it 'should recalc duration',->
      t = new Timeline
      t.add new Tween duration: 1000, delay: 200
      t.append new Tween duration: 500, delay: 500
      expect(t.props.time).toBe 2200
    it 'should work with array',->
      t = new Timeline
      t.add new Tween duration: 1000, delay: 200
      tm1 = new Tween(duration: 500, delay: 500)
      tm2 = new Tween(duration: 500, delay: 700)
      t.append [tm1, tm2]
      expect(t.timelines.length).toBe 3
      expect(t.props.time).toBe 2400
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
      expect(t.props.time).toBe 1000
    
  describe 'start method ->', ->
    it 'should get the start time',->
      t = new Timeline
      t.start()
      expect(t.props.startTime).toBeDefined()
      expect(t.props.endTime).toBe t.props.startTime + t.props.repeatTime
    it 'should call the setStartTime method',->
      t = new Timeline
      spyOn t, 'setStartTime'
      time = 0
      t.start time
      expect(t.setStartTime).toHaveBeenCalledWith time
    it 'should start every timeline',->
      it 'should update the current time on every timeline',->
      t = new Timeline
      t.add new Tween duration: 500, delay: 200
      t.add new Tween duration: 500, delay: 100
      spyOn t.timelines[0], 'start'
      spyOn t.timelines[1], 'start'
      t.start()
      expect(t.timelines[0].start).toHaveBeenCalledWith t.props.startTime
      expect(t.timelines[1].start).toHaveBeenCalledWith t.props.startTime
    it 'should add itself to tweener',->
      t = new Timeline
      spyOn tweener, 'add'
      t.start()
      expect(tweener.add).toHaveBeenCalled()
    it 'should not add itself to tweener if time was passed',->
      t = new Timeline
      spyOn tweener, 'add'
      t.start 10239123
      expect(tweener.add).not.toHaveBeenCalled()
    it 'should set state to "play"',->
      tweener.tweens = []
      t = new Timeline
      timeline = new Tween duration: 2000
      t.add(timeline); t.start()
      expect(t.state).toBe 'play'
    
  describe 'removeFromTweener method ->', ->
    it 'should call t.remove method with self',->
      tweener.tweens = []
      t = new Timeline
      timeline = new Tween duration: 2000
      t.add timeline
      t.start()
      t.removeFromTweener()
      expect(tweener.tweens.length).toBe 0

  describe 'pause method ->', ->
    it 'should call t.remove method with self',->
      tweener.tweens = []
      t = new Timeline
      timeline = new Tween duration: 2000
      t.add timeline
      t.start()
      spyOn t, 'removeFromTweener'
      t.pause()
      expect(t.removeFromTweener).toHaveBeenCalled()
    it 'should set state to "pause"',->
      tweener.tweens = []
      t = new Timeline
      timeline = new Tween duration: 2000
      t.add(timeline); t.start(); t.pause()
      expect(t.state).toBe 'pause'
  
  describe 'stop method ->', ->
    it 'should call t.removeFromTweener method with self',->
      tweener.tweens = []; t = new Timeline
      timeline = new Tween duration: 2000
      t.add timeline
      t.start()
      spyOn t, 'removeFromTweener'
      t.stop()
      expect(t.removeFromTweener).toHaveBeenCalled()
    it 'should reset progress to 0',->
      tweener.tweens = []; t = new Timeline
      timeline = new Tween duration: 2000
      t.add timeline
      t.start()
      spyOn t, 'setProgress'
      t.stop()
      expect(t.setProgress).toHaveBeenCalledWith 0
    it 'should set state to "stop"',->
      tweener.tweens = []
      t = new Timeline
      timeline = new Tween duration: 2000
      t.add(timeline); t.start(); t.stop()
      expect(t.state).toBe 'stop'

  describe 'restart method ->', ->
    it 'should call stop method',->
      tweener.tweens = []
      t = new Timeline
      timeline = new Tween duration: 2000
      t.add(timeline); t.start()
      spyOn t, 'stop'
      t.restart()
      expect(t.stop).toHaveBeenCalled()
    it 'should call start method',->
      tweener.tweens = []
      t = new Timeline
      timeline = new Tween duration: 2000
      t.add(timeline); t.start()
      spyOn t, 'start'
      t.restart()
      expect(t.start).toHaveBeenCalled()

  describe 'onReverseComplete callback ->', ->
    it 'should be defined', ->
      t = new Timeline onReverseComplete: ->
      expect(t.o.onReverseComplete).toBeDefined()
    it 'should call onReverseComplete callback', ()->
      t = new Timeline(onReverseComplete:->)
      t.add new Tween duration: 10
      spyOn(t.o, 'onReverseComplete'); t.start()
      t.setProgress .5
      t.setProgress 0
      expect(t.o.onReverseComplete).toHaveBeenCalled()
    it 'should not be called on start', ()->
      t = new Timeline(onReverseComplete:->)
      t.add new Tween duration: 10
      spyOn(t.o, 'onReverseComplete'); t.start()
      t.setProgress 0
      expect(t.o.onReverseComplete).not.toHaveBeenCalled()

  describe 'onComplete callback ->', ->
    it 'should be defined', ->
      t = new Timeline onComplete: ->
      expect(t.o.onComplete).toBeDefined()
    it 'should call onComplete callback', (dfr)->
      t = new Timeline(onComplete:->)
      t.add new Tween duration: 10
      spyOn(t.o, 'onComplete'); t.start()
      setTimeout ->
        expect(t.o.onComplete).toHaveBeenCalled(); dfr()
      , 200
    it 'should have the right scope', (dfr)->
      isRightScope = false
      t = new Timeline onComplete:-> isRightScope = @ instanceof Timeline
      t.add new Tween duration: 20
      t.start()
      setTimeout (-> expect(isRightScope).toBe(true); dfr()), 100
    it 'should fire after the last onUpdate', (dfr)->
      proc = 0
      tween = new Timeline
        onUpdate:(p)-> proc = p
        onComplete:-> expect(proc).toBe(1); dfr()
      tween.add new Tween duration: 20
      tween.start()
      tween.update tween.props.startTime + 22

  describe 'onUpdate callback ->', ->
    it 'should be defined', ->
      t = new Timeline onUpdate: ->
      expect(t.onUpdate).toBeDefined()
    it 'should call onUpdate callback', (dfr)->
      t = new Timeline(onUpdate:->)
      t.add new Tween duration: 20
      spyOn(t, 'onUpdate'); t.start()
      setTimeout ->
        expect(t.onUpdate).toHaveBeenCalled(); dfr()
      , 100
    it 'should have the right scope', (dfr)->
      isRightScope = false
      t = new Timeline onUpdate:-> isRightScope = @ instanceof Timeline
      t.add new Tween duration: 20
      t.start()
      setTimeout (-> expect(isRightScope).toBe(true); dfr()), 100
    it 'should pass the current progress', ->
      t = new Timeline onUpdate:->
      t.add new Tween duration: 20
      spyOn(t, 'onUpdate'); t.start()
      t.update t.props.startTime + 10
      expect(t.onUpdate).toHaveBeenCalledWith .5
    it 'should not run if time is less then startTime', ->
      t = new Timeline onUpdate:->
      t.add new Tween duration: 20
      spyOn(t, 'onUpdate'); t.start()
      t.update t.props.startTime - 10
      expect(t.onUpdate).not.toHaveBeenCalled()
    it 'should run if time is greater then endTime', ->
      t = new Timeline onUpdate:->
      t.add new Tween duration: 20
      spyOn(t, 'onUpdate'); t.start()
      t.update t.props.startTime + 25
      expect(t.onUpdate).toHaveBeenCalledWith 1

  describe 'onStart callback ->', ->
    it 'should be defined', ->
      t = new Timeline onStart: ->
      expect(t.o.onStart).toBeDefined()
    it 'should call onStart callback', ->
      t = new Timeline(onStart:->)
      t.add new Tween duration: 10
      spyOn(t.o, 'onStart'); t.start()
      expect(t.o.onStart).toHaveBeenCalled()
    it 'should have the right scope', ->
      isRightScope = false
      t = new Timeline onStart:-> isRightScope = @ instanceof Timeline
      t.add new Tween duration: 20
      t.start()
      expect(isRightScope).toBe(true)
  describe 'update method ->', ->
    it 'should update the current time on every timeline',->
      t = new Timeline
      t.add new Tween duration: 500, delay: 200
      t.add new Tween duration: 500, delay: 100
      t.start()
      spyOn t.timelines[0], 'update'
      spyOn t.timelines[1], 'update'
      t.update time = performance.now() + 200
      expect(t.timelines[0].update).toHaveBeenCalledWith time, true
      expect(t.timelines[1].update).toHaveBeenCalledWith time, true
    it 'should return true is ended',->
      t = new Timeline
      t.add new Tween duration: 500, delay: 200
      t.add new Tween duration: 500, delay: 100
      t.start()
      expect(t.update(performance.now() + 2000)).toBe true
    it 'should not go further then endTime',->
      t = new Timeline
      t.add new Tween duration: 500, delay: 200
      t.start()
      t.update t.props.startTime + 1000
      expect(t.prevTime).toBe t.props.endTime
    it 'should work with tweens', ->
      t  = new Timeline
      t1 = new Timeline
      t2 = new Timeline
      ti1 = new Tween duration: 500, delay: 200
      spyOn ti1, 'update'
      ti2 = new Tween duration: 500, delay: 100
      spyOn ti2, 'update'
      ti3 = new Tween duration: 100, delay: 0
      spyOn ti3, 'update'
      ti4 = new Tween duration: 800, delay: 500
      spyOn ti4, 'update'
      t1.add(ti1); t1.add(ti2); t2.add(ti3); t2.add(ti4)
      t.add(t1); t.add(t2)
      t.start()
      t.update time = t.props.startTime + 300
      expect(ti1.update).toHaveBeenCalledWith time, true
      expect(ti2.update).toHaveBeenCalledWith time, true
      expect(ti3.update).toHaveBeenCalledWith time, true
      expect(ti4.update).toHaveBeenCalledWith time, true

    it 'should save _previousUpdateTime', ->
      t  = new Timeline

      time = performance.now()
      t.update time
      expect(t._previousUpdateTime).toBe time

  describe '_updateTimelines method ->', ->
    it 'should set time to timelines', ->
      t = new Timeline
      t.add new Tween duration: 500, delay: 200
      t.add new Tween duration: 500, delay: 100
      t.setStartTime()
      time = t.props.startTime + 200
      spyOn t.timelines[0], 'update'
      spyOn t.timelines[1], 'update'
      t._updateTimelines(time)
      expect(t.timelines[0].update).toHaveBeenCalledWith time, true
      expect(t.timelines[1].update).toHaveBeenCalledWith time, true
    it 'should pass the endTime if the progress is much further', ->
      t = new Timeline
      t.add new Tween duration: 500, delay: 200
      t.add new Tween duration: 500, delay: 100
      t.setStartTime()
      time = t.props.startTime + 200
      spyOn t.timelines[0], 'update'
      spyOn t.timelines[1], 'update'
      t._updateTimelines(time+(5*t.props.time))
      expect(t.timelines[0].update).toHaveBeenCalledWith t.props.endTime, true
      expect(t.timelines[1].update).toHaveBeenCalledWith t.props.endTime, true

    it 'should pass the endTime if the progress is in delay period', ->
      t = new Timeline delay: 200
      t.add new Tween duration: 500, delay: 200
      t.add new Tween duration: 500, delay: 100
      t.setStartTime()
      spyOn t.timelines[0], 'update'
      spyOn t.timelines[1], 'update'
      time = t.props.startTime - 100
      timeAfterPeriod = t.props.startTime+t.props.delay+t.props.time-100
      t._updateTimelines(timeAfterPeriod)
      timeAtOne = t.props.startTime+t.props.time
      expect(t.timelines[0].update).toHaveBeenCalledWith timeAtOne, true
      expect(t.timelines[1].update).toHaveBeenCalledWith timeAtOne, true

    it 'should pass the endTime if the progress is in
        subsequent delay period', ->
      t = new Timeline delay: 200, repeat: 2
      t.add new Tween duration: 500
      t.setStartTime()
      time = t.props.startTime + t.props.time + 100
      spyOn t.timelines[0], 'update'
      t._updateTimelines(time)
      endTime = t.props.startTime + t.props.time
      expect(t.timelines[0].update).toHaveBeenCalledWith endTime, true

    it 'should pass false as second parameter if the new time is smaller', ->
      t = new Timeline delay: 200, repeat: 2
      t.add new Tween duration: 500
      t.setStartTime()
      time = t.props.startTime + 300
      t._updateTimelines(time)
      spyOn t.timelines[0], 'update'
      t._updateTimelines(time-10)
      expect(t.timelines[0].update).toHaveBeenCalledWith time-10, false

    it 'should set time to timelines with respect to repeat option', ->
      t = new Timeline repeat: 1
      t.add new Tween delay: 200, duration: 500
      t.add new Tween delay: 100, duration: 500
      t.setStartTime()
      spyOn t.timelines[0], 'update'
      spyOn t.timelines[1], 'update'
      time = t.props.startTime + 5
      t._updateTimelines(time + t.props.time)
      arg0 = t.timelines[0].update.calls.mostRecent().args[0]
      arg1 = t.timelines[1].update.calls.mostRecent().args[0]
      expect(arg0).toBeCloseTo time, 5
      expect(arg1).toBeCloseTo time, 5
    it 'should set time to timelines with repeat and delay option', (dfr)->
      tweener.removeAll()
      t = new Timeline repeat: 1, delay: 500
      t.add new Tween duration: 500, delay: 200
      t.add new Tween duration: 500, delay: 100
      t.setStartTime()
      spyOn t.timelines[0], 'update'
      spyOn t.timelines[1], 'update'
      time = t.props.startTime
      t._updateTimelines(time + t.props.time + t.props.delay + 5)
      arg0 = t.timelines[0].update.calls.mostRecent().args[0]
      arg1 = t.timelines[1].update.calls.mostRecent().args[0]
      expect(arg0).toBeCloseTo (time + 5), 5
      expect(arg1).toBeCloseTo (time + 5), 5
      dfr()

    it 'should pass thru the isGrow param', ->
      t = new Timeline repeat: 1, delay: 500
      tw = new mojs.Tween
      t.add tw
      t.setStartTime()
      spyOn tw, 'update'
      time = t.props.startTime + 100
      t._updateTimelines time, false
      expect(tw.update).toHaveBeenCalledWith time, false


  describe 'setProgress method ->', ->
    it 'should call the update on every child with progress time', ->
      t   = new Timeline
      t1  = new Timeline
      t2  = new Timeline
      ti1 = new Tween duration: 500, delay: 200
      spyOn ti1, 'update'
      ti2 = new Tween duration: 500, delay: 100
      spyOn ti2, 'update'
      ti3 = new Tween duration: 100, delay: 0
      spyOn ti3, 'update'
      ti4 = new Tween duration: 800, delay: 500
      spyOn ti4, 'update'
      t1.add(ti1, ti2); t2.add(ti3, ti4)
      t.add(t1, t2)
      t.setStartTime()
      # t.prepareStart(); t.startTimelines()
      t.setProgress .5
      time = t.props.startTime + 650
      expect(ti1.update).toHaveBeenCalledWith time, true
      expect(ti2.update).toHaveBeenCalledWith time, true
      expect(ti3.update).toHaveBeenCalledWith time, true
      expect(ti4.update).toHaveBeenCalledWith time, true
    it 'should call setStartTime if there is no @props.startTime', ->
      t = new Timeline
      spyOn t, 'setStartTime'
      t.setProgress .5
      expect(t.setStartTime).toHaveBeenCalled()

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
      t.setStartTime()
      spyOn t, 'update'
      t.setProgress .5
      expect(t.update).toHaveBeenCalledWith t.props.startTime + 650
    it 'should not set the progress more then 1', ->
      t   = new Timeline; t1  = new Timeline
      t1.add new Tween duration: 500, delay: 200
      t.add(t1); t.setStartTime() # t.prepareStart(); t.startTimelines()
      spyOn t, 'update'
      t.setProgress 1.5
      expect(t.update).toHaveBeenCalledWith t.props.startTime+t.props.repeatTime
    it 'should not set the progress less then 0', ->
      t   = new Timeline; t1  = new Timeline
      t1.add new Tween duration: 500, delay: 200
      t.add(t1); t.setStartTime() #t.prepareStart(); t.startTimelines()
      spyOn t, 'update'
      t.setProgress -1.5
      expect(t.update).toHaveBeenCalledWith t.props.startTime

  describe 'setStartTime method', ->
    it 'should call startTimelines methods', ->
      t   = new Timeline; t1  = new Timeline
      t1.add new Tween duration: 500, delay: 200
      spyOn t, 'startTimelines'
      time = 0
      t.setStartTime time
      expect(t.startTimelines).toHaveBeenCalledWith time

  describe 'startTimelines method ->', ->
    it 'should add self shiftTime to child timelines', ->
      t   = new Timeline
      t.add new Tween duration: 500
      time = 0; shift = 500
      t.setProp 'shiftTime': shift
      t.setStartTime time
      expect(t.timelines[0].props.startTime).toBe time + shift

    it 'should set time to startTime if no time was passed', ->
      t   = new Timeline
      t.add new Tween duration: 500
      spyOn t.timelines[0], 'start'
      t.setStartTime(null)

      expect(t.timelines[0].start).toHaveBeenCalledWith t.props.startTime


  describe 'time track ->', ->
    it 'should save the current time track', ->
      t   = new Timeline
      t.add new Tween duration: 500
      t.setProgress .5
      expect(t.prevTime).toBe t.props.startTime + 250

  describe 'recalcDuration method ->', ->
    it 'should recalc duration', ->
      t   = new Timeline
      t.add new Tween duration: 500
      t.recalcDuration()
      expect(t.props.time).toBe 500
      expect(t.props.repeatTime).toBe 500
    it 'should recalc duration with parallel tweens', ->
      t   = new Timeline
      tm1 = new Tween duration: 500
      tm2 = new Tween delay: 500, duration: 700
      tm3 = new Tween duration: 800
      tm4 = new Tween delay: 1500, duration: 500
      t.add tm1, [tm2, tm3], tm4
      time = t.props.time
      repeatTime = t.props.repeatTime
      t.recalcDuration()
      expect(t.props.time).toBe time
      expect(t.props.repeatTime).toBe repeatTime

  describe 'delay option ->', ->
    it 'should increase repeatTime', ->
      t = new Timeline repeat: 4, delay: 2000
      t.add new Tween duration: 600
      expect(t.props.repeatTime).toBe 13000

  describe 'getDimentions method ->', ->
    it 'should set startTime and endTime', ->
      t = new Timeline
      t.add new Tween
      t.getDimentions()
      expect(t.props.startTime).toBeDefined()
      expect(t.props.endTime)  .toBeDefined()
    it 'should have time option to start from', ->
      t = new Timeline delay: 600
      t.add new Tween
      time = performance.now() + 500
      t.getDimentions(time)
      expect(t.props.startTime).toBe time + 600

  describe 'nested timelines ->', ->
    it 'should work with nested timelines', ->
      tm0 = new mojs.Timeline
      tm1 = new mojs.Timeline
      tm2 = new mojs.Timeline

      tw1 = new mojs.Tween duration: 100, onUpdate:(p)->
      tm1.add tw1

      tw2 = new mojs.Tween duration: 400, onUpdate:(p)->
      tm2.add tw2

      tm0.add tm1
      tm0.append tm2
      tm0.setProgress .5
      expect(tw2.progress).toBe .375
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

      tm0.setStartTime()
      
      expect(tm0.props.endTime).toBe tm0.props.startTime + 500
      expect(tm2.props.endTime).toBe tm0.props.startTime + 500
      expect(tm2.props.startTime).toBe tm0.props.startTime + 100
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
      tm0.setStartTime()
      expect(tm2.props.shiftedRepeatTime).toBe 500

    it 'should calculate right dimentions', ->
      tm0 = new mojs.Timeline

      tm1 = new mojs.Timeline
      tm2 = new mojs.Timeline delay: 1000

      tw1 = new mojs.Tween
      tm1.add tw1

      tw2 = new mojs.Tween
      tm2.add tw2

      tm0.add tm1; tm0.append tm2

      tm0.setStartTime()

      expect(tm0.props.repeatTime).toBe 2200
      expect(tm2.props.repeatTime).toBe 1600
      expect(tm2.props.shiftedRepeatTime).toBe 1200
      expect(tm2.props.shiftTime).toBe 600

      expect(tm2.props.startTime).toBe tw2.props.startTime
      tm2StartTime = tm0.props.startTime + tm1.props.repeatTime + tm2.props.delay
      expect(tm2.props.startTime).toBe tm2StartTime


      tm2EndTime = tm2.props.startTime + tm2.props.repeatTime - tm2.props.delay
      expect(tm2.props.endTime).toBe tm2EndTime

      expect(tm0.props.endTime).toBe tm2.props.endTime

    it 'should set nesed tween progress to 1 at the end', ->
      tm0 = new mojs.Timeline

      tm1 = new mojs.Timeline

      tw1 = new mojs.Tween
      tm1.add tw1

      tw2 = new mojs.Tween

      tm0.add tm1; tm0.append tw2; tm0.setStartTime()

      tm0.update tm0.props.endTime - 20
      tm0.update tm0.props.endTime

      expect(tw2.progress).toBe 1

      expect(tm0.props.repeatTime).toBe 1200
      expect(tw2.props.repeatTime).toBe 600
      # expect(tw2.props.shiftedRepeatTime).toBe 1200

      expect(tw2.props.startTime).toBe tm0.props.startTime + tm1.props.repeatTime
      expect(tw2.props.endTime).toBe tm0.props.startTime + tm0.props.repeatTime

    it 'should set nesed tween inside timeline progress to 1 at the end', ->
      tm0 = new mojs.Timeline

      tm1 = new mojs.Timeline
      tm2 = new mojs.Timeline delay: 1000, isIt: true

      tw1 = new mojs.Tween
      tm1.add tw1

      tw2 = new mojs.Tween
      tm2.add tw2

      tm0.add tm1; tm0.append tm2; tm0.setStartTime()

      tm0.update tm0.props.endTime - 20
      tm0.update tm0.props.endTime

      expect(tw2.progress).toBe 1

