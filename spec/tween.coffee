Tween    = window.mojs.Tween
Timeline = window.mojs.Timeline

describe 'Tween ->', ->
  it 'should have timelines var', ->
    t = new Tween
    expect(t.timelines.length).toBe 0
    expect(t.duration)        .toBe 0
  describe 'add method ->', ->
    it 'should add timeline',->
      t = new Tween
      t.add new Timeline
      expect(t.timelines.length).toBe 1
      expect(t.timelines[0] instanceof Timeline).toBe true
    it 'should calc self duration',->
      t = new Tween
      t.add new Timeline duration: 500, delay: 200
      expect(t.duration).toBe 700
      t.add new Timeline duration: 500, delay: 200, repeat: 1
      expect(t.duration).toBe 1400
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
  describe 'start method ->', ->
    it 'should get the start time',->
      t = new Tween
      t.start()
      expect(t.startTime).toBeDefined()
      expect(t.endTime).toBe t.startTime + t.duration
    it 'should start every timeline',->
      it 'should update the current time on every timeline',->
      t = new Tween
      t.add new Timeline duration: 500, delay: 200
      t.add new Timeline duration: 500, delay: 100
      spyOn t.timelines[0], 'start'
      spyOn t.timelines[1], 'start'
      t.start()
      expect(t.timelines[0].start).toHaveBeenCalledWith t.startTime
      expect(t.timelines[1].start).toHaveBeenCalledWith t.startTime
    it 'should call the startLoop method',->
      t = new Tween
      spyOn t, 'startLoop'
      t.start()
      expect(t.startLoop).toHaveBeenCalled()
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
