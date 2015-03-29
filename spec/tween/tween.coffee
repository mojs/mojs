Tween    = window.mojs.Tween
Timeline = window.mojs.Timeline
tweener  = window.mojs.tweener

describe 'Tween ->', ->
  beforeEach -> tweener.removeAll()
  it 'should have timelines var', ->
    t = new Tween
    expect(t.timelines.length).toBe 0
    expect(t.props.totalTime) .toBe 0
  it 'should have initial state flags', ->
    t = new Tween
    expect(t.state).toBe 'stop'
  describe 'add method ->', ->
    it 'should add timeline',->
      t = new Tween
      t.add new Timeline
      expect(t.timelines.length).toBe 1
      expect(t.timelines[0] instanceof Timeline).toBe true
    it 'should work with arrays of tweens',->
      t = new Tween
      t1 = new Timeline duration: 1000
      t2 = new Timeline duration: 1500
      t.add [t1, t2, new Tween]
      expect(t.timelines.length).toBe 3
      expect(t.props.totalTime).toBe 1500
      expect(t.timelines[0] instanceof Timeline).toBe true
      expect(t.timelines[1] instanceof Timeline).toBe true
      expect(t.timelines[2] instanceof Tween)   .toBe true
    it 'should work with arguments',->
      tween = new Tween isIt: true
      t1 = new Timeline duration: 500, delay: 200
      t2 = new Timeline duration: 500, delay: 500
      tween.add t1, t2
      expect(tween.props.totalTime) .toBe 1000
      expect(tween.timelines.length).toBe 2
    it 'should work with mixed arguments',->
      t = new Tween
      t1 = new Timeline duration: 1000
      t2 = new Timeline duration: 1500
      t.add [t1, new Timeline, new Tween], t2
      expect(t.timelines.length).toBe 4
      expect(t.props.totalTime).toBe 1500
      expect(t.timelines[0] instanceof Timeline).toBe true
      expect(t.timelines[1] instanceof Timeline).toBe true
      expect(t.timelines[2] instanceof Tween)   .toBe true
      expect(t.timelines[3] instanceof Timeline).toBe true
    it 'should calc self duration',->
      t = new Tween
      t.add new Timeline duration: 500, delay: 200
      expect(t.props.totalTime).toBe 700
      t.add new Timeline duration: 500, delay: 200, repeat: 1
      expect(t.props.totalTime).toBe 1400
    it 'should work with another tweens',->
      t1 = new Tween
      t = new Tween
      t.add new Timeline duration: 500, delay: 200
      t.add new Timeline duration: 500, delay: 200, repeat: 1
      t1.add t
      expect(t1.props.totalTime).toBe 1400

  describe 'pushTimeline method ->', ->
    it 'should push timeline to timelines and calc totalTime',->
      t = new Tween
      t.pushTimeline new Timeline duration: 4000
      expect(t.timelines.length).toBe 1
      expect(t.timelines[0] instanceof Timeline).toBe true
      expect(t.props.totalTime).toBe 4000

  describe 'append method ->', ->
    it 'should add timeline',->
      t = new Tween
      t.append new Timeline
      expect(t.timelines.length).toBe 1
      expect(t.timelines[0] instanceof Timeline).toBe true
    it 'should delay the timeline to duration',->
      t = new Tween
      t.add new Timeline duration: 1000, delay: 200
      t.append new Timeline duration: 500, delay: 500
      expect(t.timelines[1].o.delay).toBe 1700
    it 'should recalc duration',->
      t = new Tween
      t.add new Timeline duration: 1000, delay: 200
      t.append new Timeline duration: 500, delay: 500
      expect(t.props.totalTime).toBe 2200
    it 'should work with array',->
      t = new Tween
      t.add new Timeline duration: 1000, delay: 200
      tm1 = new Timeline(duration: 500, delay: 500)
      tm2 = new Timeline(duration: 500, delay: 700)
      t.append [tm1, tm2]
      expect(t.timelines.length).toBe 3
      expect(t.props.totalTime).toBe 2400
    it 'should work with array #2',->
      t = new Tween
      t.add new Timeline duration: 1000, delay: 200
      tm1 = new Timeline(duration: 500, delay: 500)
      tm2 = new Timeline(duration: 500, delay: 700)
      spyOn t, 'recalcDuration'
      t.append [tm1, tm2]
      expect(t.recalcDuration).toHaveBeenCalled()
    it 'should work with array #2',->
      t = new Tween
      t.append new Timeline duration: 1000, delay: 200
      expect(t.timelines.length).toBe 1
    it 'should add element index',->
      t = new Tween
      t.append new Timeline duration: 1000, delay: 200
      t.append new Timeline duration: 1000, delay: 200
      expect(t.timelines[0].index).toBe 0
      expect(t.timelines[1].index).toBe 1

  describe 'remove method ->', ->
    it 'should remove timeline',->
      t = new Tween
      timeline = new Timeline
      t.add timeline
      t.remove timeline
      expect(t.timelines.length).toBe 0
    it 'should remove tween',->
      t1 = new Tween
      t = new Tween
      timeline = new Timeline
      t.add timeline
      t1.add t
      t1.remove t
      expect(t1.timelines.length).toBe 0
  
  describe 'recalcDuration method ->', ->
    it 'should recalculate duration', ->
      t = new Tween
      timeline = new Timeline  duration: 100
      timeline2 = new Timeline duration: 1000
      t.add timeline
      t.timelines.push timeline2
      t.recalcDuration()
      expect(t.props.totalTime).toBe 1000
    
  describe 'start method ->', ->
    it 'should get the start time',->
      t = new Tween
      t.start()
      expect(t.props.startTime).toBeDefined()
      expect(t.props.endTime).toBe t.props.startTime + t.props.totalTime
    it 'should call the setStartTime method',->
      t = new Tween
      spyOn t, 'setStartTime'
      time = 0
      t.start time
      expect(t.setStartTime).toHaveBeenCalledWith time

    it 'should start every timeline',->
      it 'should update the current time on every timeline',->
      t = new Tween
      t.add new Timeline duration: 500, delay: 200
      t.add new Timeline duration: 500, delay: 100
      spyOn t.timelines[0], 'start'
      spyOn t.timelines[1], 'start'
      t.start()
      expect(t.timelines[0].start).toHaveBeenCalledWith t.props.startTime
      expect(t.timelines[1].start).toHaveBeenCalledWith t.props.startTime
    it 'should add itself to tweener',->
      t = new Tween
      spyOn tweener, 'add'
      t.start()
      expect(tweener.add).toHaveBeenCalled()
    it 'should not add itself to tweener if time was passed',->
      t = new Tween
      spyOn tweener, 'add'
      t.start 10239123
      expect(tweener.add).not.toHaveBeenCalled()
    it 'should set state to "play"',->
      tweener.tweens = []
      t = new Tween
      timeline = new Timeline duration: 2000
      t.add(timeline); t.start()
      expect(t.state).toBe 'play'
    
  describe 'removeFromTweener method ->', ->
    it 'should call t.remove method with self',->
      tweener.tweens = []
      t = new Tween
      timeline = new Timeline duration: 2000
      t.add timeline
      t.start()
      t.removeFromTweener()
      expect(tweener.tweens.length).toBe 0

  describe 'stop method ->', ->
    it 'should call t.remove method with self',->
      tweener.tweens = []
      t = new Tween
      timeline = new Timeline duration: 2000
      t.add timeline
      t.start()
      spyOn t, 'removeFromTweener'
      t.stop()
      expect(t.removeFromTweener).toHaveBeenCalled()

    it 'should set state to "stop"',->
      tweener.tweens = []
      t = new Tween
      timeline = new Timeline duration: 2000
      t.add(timeline); t.start(); t.stop()
      expect(t.state).toBe 'stop'

  describe 'restart method ->', ->
    it 'should call stop method',->
      tweener.tweens = []
      t = new Tween
      timeline = new Timeline duration: 2000
      t.add(timeline); t.start()
      spyOn t, 'stop'
      t.restart()
      expect(t.stop).toHaveBeenCalled()
    it 'should call setProgress method',->
      tweener.tweens = []
      t = new Tween
      timeline = new Timeline duration: 2000
      t.add(timeline); t.start()
      spyOn t, 'setProgress'
      t.restart()
      expect(t.setProgress).toHaveBeenCalledWith 0
    it 'should call start method',->
      tweener.tweens = []
      t = new Tween
      timeline = new Timeline duration: 2000
      t.add(timeline); t.start()
      spyOn t, 'start'
      t.restart()
      expect(t.start).toHaveBeenCalled()

  # probaly no needed for this
  # describe 'resetProgress method ->', ->
  #   it 'should call setProgress with 0', ->
  #     t = new Tween
  #     timeline1 = new Timeline duration: 2000
  #     timeline2 = new Timeline duration: 2000
  #     t.add(timeline1, timeline2)
  #     t.setStartTime()
  #     spyOn t, 'setProgress'
  #     t.resetProgress()
  #     expect(t.setProgress).toHaveBeenCalledWith 0
  #   it 'should update every timeline with its initial time', ->
  #     t = new Tween
  #     tm1 = new Timeline duration: 2000, delay: 500
  #     tm2 = new Timeline duration: 2000, delay: 100
  #     t.add(tm1, tm2)
  #     t.setStartTime()
  #     spyOn tm1, 'update'
  #     spyOn tm2, 'update'
  #     t.resetProgress()
  #     expect(tm1.update).toHaveBeenCalledWith tm1.props.startTime
  #     expect(tm2.update).toHaveBeenCalledWith tm2.props.startTime

  #   it 'should call resetProgress on every tween', ->
  #     t = new Tween
  #     tm1 = new Timeline duration: 2000, delay: 500
  #     tw1 = new Tween
  #     tw1.add tm1
  #     tm2 = new Timeline duration: 2000, delay: 100
  #     t.add(tw1, tm2)
  #     t.setStartTime()
  #     spyOn tw1, 'resetProgress'
  #     spyOn tm2, 'update'
  #     t.resetProgress()
  #     expect(tw1.resetProgress).toHaveBeenCalled()
  #     expect(tm2.update).toHaveBeenCalledWith tm2.props.startTime

  describe 'onReverseComplete callback ->', ->
    it 'should be defined', ->
      t = new Tween onReverseComplete: ->
      expect(t.o.onReverseComplete).toBeDefined()

    it 'should call onReverseComplete callback', ()->
      t = new Tween(onReverseComplete:->)
      t.add new Timeline duration: 10
      spyOn(t.o, 'onReverseComplete'); t.start()
      t.setProgress .5
      t.setProgress 0
      expect(t.o.onReverseComplete).toHaveBeenCalled()

    it 'should not be called on start', ()->
      t = new Tween(onReverseComplete:->)
      t.add new Timeline duration: 10
      spyOn(t.o, 'onReverseComplete'); t.start()
      t.setProgress 0
      expect(t.o.onReverseComplete).not.toHaveBeenCalled()

  describe 'onComplete callback ->', ->
    it 'should be defined', ->
      t = new Tween onComplete: ->
      expect(t.o.onComplete).toBeDefined()
    it 'should call onComplete callback', (dfr)->
      t = new Tween(onComplete:->)
      t.add new Timeline duration: 10
      spyOn(t.o, 'onComplete'); t.start()
      setTimeout ->
        expect(t.o.onComplete).toHaveBeenCalled(); dfr()
      , 200
    it 'should have the right scope', (dfr)->
      isRightScope = false
      t = new Tween onComplete:-> isRightScope = @ instanceof Tween
      t.add new Timeline duration: 20
      t.start()
      setTimeout (-> expect(isRightScope).toBe(true); dfr()), 100

    it 'should fire after the last onUpdate', (dfr)->
      proc = 0
      tween = new Tween
        isIt: true
        onUpdate:(p)-> proc = p
        onComplete:-> expect(proc).toBe(1); dfr()
      tween.add new Timeline duration: 20
      tween.start()
      tween.update tween.props.startTime + 22

  describe 'onUpdate callback ->', ->
    it 'should be defined', ->
      t = new Tween onUpdate: ->
      expect(t.onUpdate).toBeDefined()
    it 'should call onUpdate callback', (dfr)->
      t = new Tween(onUpdate:->)
      t.add new Timeline duration: 20
      spyOn(t, 'onUpdate'); t.start()
      setTimeout ->
        expect(t.onUpdate).toHaveBeenCalled()
        dfr()
      , 100
    it 'should have the right scope', (dfr)->
      isRightScope = false
      t = new Tween onUpdate:-> isRightScope = @ instanceof Tween
      t.add new Timeline duration: 20
      t.start()
      setTimeout (-> expect(isRightScope).toBe(true); dfr()), 100
    it 'should pass the current progress', ->
      t = new Tween onUpdate:->
      t.add new Timeline duration: 20
      spyOn(t, 'onUpdate'); t.start()
      t.update t.props.startTime + 10
      expect(t.onUpdate).toHaveBeenCalledWith .5
    it 'should not run if time is less then startTime', ->
      t = new Tween onUpdate:->
      t.add new Timeline duration: 20
      spyOn(t, 'onUpdate'); t.start()
      t.update t.props.startTime - 10
      expect(t.onUpdate).not.toHaveBeenCalled()
    it 'should run if time is greater then endTime', ->
      t = new Tween onUpdate:->
      t.add new Timeline duration: 20
      spyOn(t, 'onUpdate'); t.start()
      t.update t.props.startTime + 25
      expect(t.onUpdate).toHaveBeenCalledWith 1

  describe 'onStart callback ->', ->
    it 'should be defined', ->
      t = new Tween onStart: ->
      expect(t.o.onStart).toBeDefined()
    it 'should call onStart callback', ->
      t = new Tween(onStart:->)
      t.add new Timeline duration: 10
      spyOn(t.o, 'onStart'); t.start()
      expect(t.o.onStart).toHaveBeenCalled()
    it 'should have the right scope', ->
      isRightScope = false
      t = new Tween onStart:-> isRightScope = @ instanceof Tween
      t.add new Timeline duration: 20
      t.start()
      expect(isRightScope).toBe(true)
  describe 'update method ->', ->
    it 'should update the current time on every timeline',->
      t = new Tween
      t.add new Timeline duration: 500, delay: 200
      t.add new Timeline duration: 500, delay: 100
      spyOn t.timelines[0], 'update'
      spyOn t.timelines[1], 'update'
      t.update time = performance.now() + 200
      expect(t.timelines[0].update).toHaveBeenCalledWith time
      expect(t.timelines[1].update).toHaveBeenCalledWith time

    it 'should return true is ended',->
      t = new Tween
      t.add new Timeline duration: 500, delay: 200
      t.add new Timeline duration: 500, delay: 100
      t.start()
      expect(t.update(performance.now() + 2000)).toBe true

    it 'should not go further then endTime',->
      t = new Tween
      t.add new Timeline duration: 500, delay: 200
      t.start()
      t.update t.props.startTime + 1000
      expect(t.prevTime).toBe t.props.endTime

    it 'should work with tweens',->
      t = new Tween
      t1 = new Tween
      t2 = new Tween
      ti1 = new Timeline duration: 500, delay: 200
      spyOn ti1, 'update'
      ti2 = new Timeline duration: 500, delay: 100
      spyOn ti2, 'update'
      ti3 = new Timeline duration: 100, delay: 0
      spyOn ti3, 'update'
      ti4 = new Timeline duration: 800, delay: 500
      spyOn ti4, 'update'
      t1.add(ti1); t1.add(ti2); t2.add(ti3); t2.add(ti4)
      t.add(t1); t.add(t2)
      t.start()
      t.update time = t.props.startTime + 300
      expect(ti1.update).toHaveBeenCalledWith time
      expect(ti2.update).toHaveBeenCalledWith time
      expect(ti3.update).toHaveBeenCalledWith time
      expect(ti4.update).toHaveBeenCalledWith time

  describe 'setProgress method ->', ->
    it 'should call the update on every child with progress time', ->
      t   = new Tween
      t1  = new Tween
      t2  = new Tween
      ti1 = new Timeline duration: 500, delay: 200
      spyOn ti1, 'update'
      ti2 = new Timeline duration: 500, delay: 100
      spyOn ti2, 'update'
      ti3 = new Timeline duration: 100, delay: 0
      spyOn ti3, 'update'
      ti4 = new Timeline duration: 800, delay: 500
      spyOn ti4, 'update'
      t1.add(ti1); t1.add(ti2); t2.add(ti3); t2.add(ti4)
      t.add(t1); t.add(t2)
      t.prepareStart(); t.startTimelines()
      t.setProgress .5
      time = t.props.startTime + 650
      expect(ti1.update).toHaveBeenCalledWith time
      expect(ti2.update).toHaveBeenCalledWith time
      expect(ti3.update).toHaveBeenCalledWith time
      expect(ti4.update).toHaveBeenCalledWith time
    it 'should call setStartTime if there is no @props.startTime', ->
      t = new Tween
      spyOn t, 'setStartTime'
      t.setProgress .5
      expect(t.setStartTime).toHaveBeenCalled()

    it 'should call self update', ->
      t   = new Tween
      t1  = new Tween
      t2  = new Tween
      ti1 = new Timeline duration: 500, delay: 200
      ti2 = new Timeline duration: 500, delay: 100
      ti3 = new Timeline duration: 100, delay: 0
      ti4 = new Timeline duration: 800, delay: 500
      t1.add(ti1); t1.add(ti2); t2.add(ti3); t2.add(ti4)
      t.add(t1); t.add(t2)
      t.prepareStart(); t.startTimelines()
      spyOn t, 'update'
      t.setProgress .5
      expect(t.update).toHaveBeenCalledWith t.props.startTime + 650
    it 'should not set the progress more then 1', ->
      t   = new Tween; t1  = new Tween
      t1.add new Timeline duration: 500, delay: 200
      t.add(t1); t.prepareStart(); t.startTimelines()
      spyOn t, 'update'
      t.setProgress 1.5
      expect(t.update).toHaveBeenCalledWith t.props.startTime+t.props.totalTime
    it 'should not set the progress less then 0', ->
      t   = new Tween; t1  = new Tween
      t1.add new Timeline duration: 500, delay: 200
      t.add(t1); t.prepareStart(); t.startTimelines()
      spyOn t, 'update'
      t.setProgress -1.5
      expect(t.update).toHaveBeenCalledWith t.props.startTime

  describe 'setStartTime method', ->
    it 'should call prepareStart and startTimelines methods', ->
      t   = new Tween; t1  = new Tween
      t1.add new Timeline duration: 500, delay: 200
      spyOn t, 'prepareStart'
      spyOn t, 'startTimelines'
      time = 0
      t.setStartTime time
      expect(t.prepareStart)  .toHaveBeenCalled()
      expect(t.startTimelines).toHaveBeenCalledWith time

  describe 'time track', ->
    it 'should save the current time track', ->
      t   = new Tween
      t.add new Timeline duration: 500
      t.setProgress .5
      expect(t.prevTime).toBe t.props.startTime + 250


      



      


