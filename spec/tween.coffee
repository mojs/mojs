Tween    = window.mojs.Tween
Timeline = window.mojs.Timeline
tweener  = window.mojs.tweener

describe 'Tween ->', ->
  it 'should have timelines var', ->
    t = new Tween
    expect(t.timelines.length).toBe 0
    expect(t.props.totalTime) .toBe 0
  describe 'add method ->', ->
    it 'should add timeline',->
      t = new Tween
      t.add new Timeline
      expect(t.timelines.length).toBe 1
      expect(t.timelines[0] instanceof Timeline).toBe true
    it 'should calc self duration',->
      t = new Tween
      t.add new Timeline duration: 500, delay: 200
      expect(t.props.totalTime).toBe 700
      t.add new Timeline duration: 500, delay: 200, repeat: 1
      expect(t.props.totalTime).toBe 1400
    it 'should work with another tweens',->
      t1 = new Tween isIt: true
      t = new Tween
      t.add new Timeline duration: 500, delay: 200
      t.add new Timeline duration: 500, delay: 200, repeat: 1
      t1.add t
      expect(t1.props.totalTime).toBe 1400
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
    it 'should call the prepareStart method',->
      t = new Tween
      spyOn t, 'prepareStart'
      t.start()
      expect(t.prepareStart).toHaveBeenCalled()
    it 'should restart flags', ->
      t = new Tween
      t.add new Timeline duration: 20
      t.start()
      t.update t.props.startTime + 5
      t.update t.props.startTime + 60
      expect(t.isCompleted).toBe true
      t.start()
      expect(t.isCompleted).toBe false

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
    
  describe 'stop method ->', ->
    it 'should call t.remove method with self',->
      tweener.tweens = []
      t = new Tween
      timeline = new Timeline duration: 2000
      t.add timeline
      t.start()
      # spyOn tweener, 'remove'
      t.stop()
      # expect(tweener.remove).toHaveBeenCalledWith t
      expect(tweener.tweens.length).toBe 0

  describe 'onComplete callback ->', ->
    it 'should be defined', ->
      t = new Tween onComplete: ->
      expect(t.o.onComplete).toBeDefined()
    it 'should call onComplete callback', (dfr)->
      t = new Tween(onComplete:->)
      t.add new Timeline duration: 10
      spyOn(t.o, 'onComplete'); t.start()
      setTimeout ->
        expect(t.o.onComplete).toHaveBeenCalled()
        dfr()
      , 200
    it 'should be called just once', (dfr)->
      cnt = 0
      t = new Tween onComplete:-> cnt++
      t.add new Timeline duration: 20
      t.start()
      setTimeout (-> expect(cnt).toBe(1); dfr()), 100
    it 'should have the right scope', (dfr)->
      isRightScope = false
      t = new Tween onComplete:-> isRightScope = @ instanceof Tween
      t.add new Timeline duration: 20
      t.start()
      setTimeout (-> expect(isRightScope).toBe(true); dfr()), 100
  
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
    it 'should run if time is greater then endTime just once', ->
      cnt = 0
      t = new Tween onUpdate:-> cnt++
      t.add new Timeline duration: 20
      t.getDimentions()
      t.update t.props.startTime + 25
      t.update t.props.startTime + 26
      t.update t.props.startTime + 27
      expect(cnt).toBe 1
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
      t.update time = Date.now() + 200
      expect(t.timelines[0].update).toHaveBeenCalledWith time
      expect(t.timelines[1].update).toHaveBeenCalledWith time
    it 'should not update the current time on every timeline if isCompleted',->
      t = new Tween
      t.add new Timeline duration: 500, delay: 200
      t.add new Timeline duration: 500, delay: 100
      t.getDimentions()
      t.update t.props.startTime + 2000
      spyOn t.timelines[0], 'update'
      spyOn t.timelines[1], 'update'
      t.update t.props.startTime + 2000
      expect(t.timelines[0].update).not.toHaveBeenCalled()
      expect(t.timelines[1].update).not.toHaveBeenCalled()
    it 'should return true is ended',->
      t = new Tween
      t.add new Timeline duration: 500, delay: 200
      t.add new Timeline duration: 500, delay: 100
      t.start()
      expect(t.update(Date.now() + 2000)).toBe true

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

