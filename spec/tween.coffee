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
  describe 'loop ->', ->
    it 'should loop over', (dfr)->
      t = new Tween
      t.add new Timeline duration: 500, delay: 200
      t.startLoop()
      spyOn t, 'loop'
      setTimeout ->
        expect(t.loop).toHaveBeenCalled(); dfr()
      , 100
    it 'should call update fun', (dfr)->
      t = new Tween
      t.add new Timeline duration: 500, delay: 200
      t.startLoop()
      spyOn t, 'update'
      setTimeout ->
        expect(t.update).toHaveBeenCalledWith(jasmine.any(Number)); dfr()
      , 100
    it 'should stop at the end', (dfr)->
      t = new Tween
      t.add new Timeline duration: 20
      t.start()
      setTimeout ->
        expect(t.isRunning).toBe false
        dfr()
      , 100
  describe 'startLoop method ->', ->
    it 'should call loop method', (dfr)->
      t = new Tween
      spyOn t, 'loop'
      t.startLoop()
      setTimeout ->
        expect(t.loop).toHaveBeenCalled()
        dfr()
      , 60
    it 'should set isRunning flag', ->
      t = new Tween
      expect(t.isRunning).toBeFalsy()
      t.startLoop()
      expect(t.isRunning).toBe true
    it 'should call loop only once', ->
      t = new Tween
      t.startLoop()
      spyOn t, 'loop'
      t.startLoop()
      expect(t.loop).not.toHaveBeenCalled()
  describe 'stopLoop method ->', ->
    it 'should set isRunning to false', ->
      t = new Tween
      t.startLoop()
      t.stopLoop()
      expect(t.isRunning).toBe false
