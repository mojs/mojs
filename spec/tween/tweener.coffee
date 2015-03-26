t        = window.mojs.tweener
Tween    = window.mojs.Tween
Timeline = window.mojs.Timeline

describe 'Twenner ->', ->
  afterEach  -> t.stopLoop(); t.tweens.length = 0
  beforeEach -> t.stopLoop(); t.tweens.length = 0
  it 'have tweens array', ->
    expect(t.tweens).toBeDefined()
    expect(t.tweens instanceof Array).toBe true

  describe 'polyfills ->', ->
    it 'should have performance now defined', ->
      expect(window.performance.now).toBeDefined()
    it 'should have requestAnimationFrame defined', ->
      expect(window.requestAnimationFrame).toBeDefined()

  describe 'loop ->', ->
    it 'should loop over', (dfr)->
      t.startLoop()
      t.add new Tween
      spyOn t, 'loop'
      setTimeout ->
        expect(t.loop).toHaveBeenCalled(); dfr()
      , 100
    it 'should call update fun', (dfr)->
      t.startLoop()
      spyOn t, 'update'
      setTimeout ->
        expect(t.update).toHaveBeenCalledWith(jasmine.any(Number)); dfr()
      , 100
    it 'should stop at the end', (dfr)->
      t.add new Tween
      t.startLoop()
      setTimeout (-> t.tweens[0].update = -> true), 100
      setTimeout (-> expect(t.isRunning).toBe(false); dfr()), 200
  describe 'startLoop method ->', ->
    it 'should call loop method', (dfr)->
      spyOn t, 'loop'
      t.startLoop()
      setTimeout ->
        expect(t.loop).toHaveBeenCalled()
        dfr()
      , 60
    it 'should set isRunning flag', ->
      expect(t.isRunning).toBeFalsy()
      t.startLoop()
      expect(t.isRunning).toBe true
    it 'should call loop only once', ->
      t.startLoop()
      spyOn t, 'loop'
      t.startLoop()
      expect(t.loop).not.toHaveBeenCalled()
    it 'should start only 1 concurrent loop', ()->
      t.startLoop()
      expect(t.isRunning).toBe true
      spyOn window, 'requestAnimationFrame'
      t.startLoop()
      expect(window.requestAnimationFrame).not.toHaveBeenCalled()
  describe 'stopLoop method ->', ->
    it 'should set isRunning to false', ->
      t.startLoop()
      t.stopLoop()
      expect(t.isRunning).toBe false
  describe 'add method ->', ->
    it 'should add to tweens', ->
      t.add new Tween
      expect(t.tweens.length).toBe 1
      expect(t.tweens[0] instanceof Tween).toBe true
    it 'should call startLoop method', ->
      spyOn t, 'startLoop'
      t.add new Tween
      expect(t.startLoop).toHaveBeenCalled()
  describe 'remove method ->', ->
    it 'should remove a tween', ->
      t1 = new Tween; t2 = new Tween
      t.add t1; t.add t2
      expect(t.tweens.length).toBe 2
      t.remove t2
      expect(t.tweens.length).toBe 1
    it 'should be able to remove by i', ->
      t1 = new Tween; t2 = new Tween
      t.add t1; t.add t2
      expect(t.tweens.length).toBe 2
      t.remove 1
      expect(t.tweens.length).toBe 1
      expect(t.tweens[0])    .toBe t1
  describe 'removeAll method ->', ->
    it 'should remove all tweens', ->
      t1 = new Tween; t2 = new Tween
      t.add t1; t.add t2
      expect(t.tweens.length).toBe 2
      t.removeAll()
      expect(t.tweens.length).toBe 0

  describe 'update method ->', ->
    it 'should update the current time on every timeline',->
      t.add new Tween
      t.add new Tween
      spyOn t.tweens[0], 'update'
      spyOn t.tweens[1], 'update'
      t.update time = performance.now() + 200
      expect(t.tweens[0].update).toHaveBeenCalledWith time
      expect(t.tweens[1].update).toHaveBeenCalledWith time



