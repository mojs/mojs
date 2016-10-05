t        = window.mojs.tweener
Tween    = window.mojs.Tween
Timeline = window.mojs.Timeline

describe 'Tweener ->', ->
  afterEach  -> t._stopLoop(); t.removeAll()
  beforeEach -> t._stopLoop(); t.removeAll()
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
    it 'should call _onTweenerRemove method on each ', ->
      t1 = new Tween
      t.add t1
      expect(t.tweens.length).toBe 1
      spyOn t1, '_onTweenerRemove'
      t.remove t1
      expect(t1._onTweenerRemove).toHaveBeenCalled()
  describe 'removeAll method ->', ->
    it 'should remove all tweens', ->
      t1 = new Tween; t2 = new Tween
      t.add t1; t.add t2
      expect(t.tweens.length).toBe 2
      t.removeAll()
      expect(t.tweens.length).toBe 0

  describe '_update method ->', ->
    it 'should update the current time on every timeline',->
      t.add new Tween
      t.add new Tween
      spyOn t.tweens[0], '_update'
      spyOn t.tweens[1], '_update'
      t._update time = performance.now() + 200
      expect(t.tweens[0]._update).toHaveBeenCalledWith time
      expect(t.tweens[1]._update).toHaveBeenCalledWith time
    it 'should remove tween if ended',->
      tw = new Tween
      t.add tw
      tw._update = -> true
      expect(t.tweens[0]).toBe tw
      spyOn(t, 'remove').and.callThrough()
      t._update time = performance.now() + 200
      expect(t.remove).toHaveBeenCalledWith tw
      expect(t.tweens[0]).not.toBeDefined()

    it 'should set tween\'s _prevTime to undefined if ended', (dfr)->
      tw = new Tween duration: 100
      tw._setStartTime()
      t.add tw
      expect(t.tweens[0]).toBe tw
      spyOn(t, 'remove').and.callThrough()
      startTime = performance.now()

      setTimeout ->
        expect(tw._prevTime).toBe undefined
        dfr()
      , 400

    it 'should call tween\'s _onTweenerFinish if ended', (dfr)->
      duration = 50
      tw = new Tween duration: duration
      tw._setStartTime()
      t.add tw
      expect(t.tweens[0]).toBe tw
      spyOn tw, '_onTweenerFinish'

      setTimeout ->
        expect(tw._onTweenerFinish).toHaveBeenCalled()
        dfr()
      , 2*duration

  isPageVisibility = ->
    return (typeof document.hidden != "undefined") or (typeof document.mozHidden != "undefined") or (typeof document.msHidden != "undefined") or (typeof document.webkitHidden != "undefined")

  describe '_listenVisibilityChange method ->', ->
    if !isPageVisibility() then return

    describe 'page visibility init ->', ->
      it 'should have ran _listenVisibilityChange method ->', ->
        expect(typeof t._visibilityHidden).toBe 'string'
        expect(typeof t._visibilityChange).toBe 'string'

    it 'should set _visibilityHidden property', ->
      t._visibilityHidden = null
      t._listenVisibilityChange()

      isOldOpera = t._visibilityHidden == 'hidden'
      isMozilla = t._visibilityHidden == 'mozHidden'
      isIE = t._visibilityHidden == 'msHidden'
      isWebkit = t._visibilityHidden == 'webkitHidden'

      expect(isOldOpera or isMozilla or isIE or isWebkit).toBe true

    it 'should set _visibilityChange property', ->
      t._visibilityChange = null
      t._listenVisibilityChange()

      isOldOpera = t._visibilityChange == 'visibilitychange'
      isMozilla = t._visibilityChange == 'mozvisibilitychange'
      isIE = t._visibilityChange == 'msvisibilitychange'
      isWebkit = t._visibilityChange == 'webkitvisibilitychange'

      expect(isOldOpera or isMozilla or isIE or isWebkit).toBe true

    it 'should set up visiblilityChange even listener', ->
      spyOn document, 'addEventListener'
      t._listenVisibilityChange()

      expect( document.addEventListener )
        .toHaveBeenCalledWith t._visibilityChange, t._onVisibilityChange, false


  describe '_savePlayingTweens method ->', ->
    it 'should copy all playing tweens to _savedTweens array', (done)->
      tw1 = new Tween
      tw1._setStartTime()
      tw2 = new Tween
      tw2._setStartTime()
      tw3 = new Tween
      tw3._setStartTime()
      t.add tw1
      t.add tw2
      t.add tw3

      setTimeout ->
        t._savedTweens = []
        t._savePlayingTweens()
        expect(t._savedTweens.length).toBe 3
        expect(t._savedTweens[0]).toBe tw1
        expect(t._savedTweens[1]).toBe tw2
        expect(t._savedTweens[2]).toBe tw3
        done()
      , 50

    it 'should call `pause` on each tween', (done)->
      tw1 = new Tween
      tw1._setStartTime()
      tw2 = new Tween
      tw2._setStartTime()
      tw3 = new Tween
      tw3._setStartTime()
      t.add tw1
      t.add tw2
      t.add tw3

      spyOn tw1, 'pause'
      spyOn tw2, 'pause'
      spyOn tw3, 'pause'

      setTimeout ->
        t._savedTweens = []
        t._savePlayingTweens()
        expect(tw1.pause).toHaveBeenCalled()
        expect(tw2.pause).toHaveBeenCalled()
        expect(tw3.pause).toHaveBeenCalled()
        done()
      , 50


  describe '_restorePlayingTweens method ->', ->
    it 'should copy all _savedTweens tweens to tweens array', ->
      tw1 = new Tween
      tw2 = new Tween
      tw3 = new Tween
      tw1.play()
      tw2.play()
      tw3.play()

      t._savePlayingTweens()
      t._restorePlayingTweens()
      expect(t.tweens.length).toBe 3
      expect(t.tweens[0]).toBe tw1
      expect(t.tweens[1]).toBe tw2
      expect(t.tweens[2]).toBe tw3

    it 'should call `resume` on each tween', ->
      tw1 = new Tween
      tw1._setStartTime()
      tw2 = new Tween
      tw2._setStartTime()
      tw3 = new Tween
      tw3._setStartTime()

      spyOn tw1, 'resume'
      spyOn tw2, 'resume'
      spyOn tw3, 'resume'

      t.tweens = []
      t._savedTweens = [ tw1, tw2, tw3 ]
      t._restorePlayingTweens()

      expect(tw1.resume).toHaveBeenCalled()
      expect(tw2.resume).toHaveBeenCalled()
      expect(tw3.resume).toHaveBeenCalled()

  describe '_onVisibilityChange method ->', ->
    it 'should call _savePlayingTweens if hidden', ->

      t._visibilityHidden = 'mojs-tweener-visibility-test'
      document[t._visibilityHidden] = true
      spyOn t, '_savePlayingTweens'
      t._onVisibilityChange()
      expect( t._savePlayingTweens ).toHaveBeenCalled()

    it 'should call _restorePlayingTweens if visible', ->

      t._visibilityHidden = 'mojs-tweener-visibility-test'
      document[t._visibilityHidden] = false
      spyOn t, '_restorePlayingTweens'
      t._onVisibilityChange()
      expect( t._restorePlayingTweens ).toHaveBeenCalled()
