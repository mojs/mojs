t        = window.mojs.tweener
Tween    = window.mojs.Tween
Timeline = window.mojs.Timeline

describe 'Twenner ->', ->
  afterEach  -> t._stopLoop(); t.tweens.length = 0
  beforeEach -> t._stopLoop(); t.tweens.length = 0
  it 'have tweens array', ->
    expect(t.tweens).toBeDefined()
    expect(t.tweens instanceof Array).toBe true

  describe 'polyfills ->', ->
    it 'should have performance now defined', ->
      expect(window.performance.now).toBeDefined()
    it 'should have requestAnimationFrame defined', ->
      expect(window.requestAnimationFrame).toBeDefined()

  describe '_loop ->', ->
    it 'should loop over', (dfr)->
      t._startLoop()
      t.add new Tween
      spyOn t, '_loop'
      setTimeout ->
        expect(t._loop).toHaveBeenCalled(); dfr()
      , 100
    it 'should call update fun', (dfr)->
      t._startLoop()
      spyOn t, '_update'
      setTimeout ->
        expect(t._update).toHaveBeenCalledWith(jasmine.any(Number)); dfr()
      , 100
    it 'should stop at the end', (dfr)->
      t.add new Tween
      t._startLoop()
      setTimeout (-> t.tweens[0]._update = -> true), 100
      setTimeout (-> expect(t._isRunning).toBe(false); dfr()), 200

    it 'should stop if !@isRunning', ()->
      t._isRunning = false
      spyOn window, 'requestAnimationFrame'
      spyOn t, '_update'
      t._loop()
      expect(window.requestAnimationFrame).not.toHaveBeenCalled()
      expect(t._update).not.toHaveBeenCalled()

  describe '_startLoop method ->', ->
    it 'should call loop method', (dfr)->
      spyOn t, '_loop'
      t._startLoop()
      setTimeout ->
        expect(t._loop).toHaveBeenCalled()
        dfr()
      , 60
    it 'should set isRunning flag', ->
      expect(t._isRunning).toBeFalsy()
      t._startLoop()
      expect(t._isRunning).toBe true
    it 'should call loop only once', ->
      t._startLoop()
      spyOn t, '_loop'
      t._startLoop()
      expect(t._loop).not.toHaveBeenCalled()
    it 'should start only 1 concurrent loop', ()->
      t._startLoop()
      expect(t._isRunning).toBe true
      spyOn window, 'requestAnimationFrame'
      t._startLoop()
      expect(window.requestAnimationFrame).not.toHaveBeenCalled()
  describe '_stopLoop method ->', ->
    it 'should set isRunning to false', ->
      t._startLoop()
      t._stopLoop()
      expect(t._isRunning).toBe false
  describe 'add method ->', ->
    it 'should add to tweens', ->
      t.add new Tween
      expect(t.tweens.length).toBe 1
      expect(t.tweens[0] instanceof Tween).toBe true
    it 'should add to tweens only once', ->
      t1 = new Tween
      t.add t1
      t.add t1
      expect(t.tweens.length).toBe 1
      expect(t.tweens[0]).toBe t1
    it 'should call _startLoop method', ->
      spyOn t, '_startLoop'
      t.add new Tween
      expect(t._startLoop).toHaveBeenCalled()
    it 'should set _isRunning to true', ->
      t1 = new Tween
      t.add t1
      expect(t1._isRunning).toBe true
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
    it 'should set _isRunning to false', ->
      t1 = new Tween; t2 = new Tween
      t.add t1; t.add t2
      expect(t.tweens.length).toBe 2
      t.remove t1
      expect(t1._isRunning).toBe false
      expect(t2._isRunning).toBe true
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
      spyOn t.tweens[0], '_update'
      spyOn t.tweens[1], '_update'
      t._update time = performance.now() + 200
      expect(t.tweens[0]._update).toHaveBeenCalledWith time
      expect(t.tweens[1]._update).toHaveBeenCalledWith time



