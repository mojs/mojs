Tween = window.mojs.Tween

describe 'Tween ->', ->
  describe 'defaults ->', ->
    it 'should have vars', ->
      t = new Tween
      expect(t.props) .toBeDefined()
      expect(t.h)     .toBeDefined()
      expect(t.progress).toBe 0
    it 'should have defaults', ->
      t = new Tween
      expect(t.defaults.duration).toBe 600
      expect(t.defaults.delay).toBe    0
      expect(t.defaults.yoyo).toBe     false
    it 'should extend defaults to options', ->
      t = new Tween
        duration: 1000
      expect(t.o.duration).toBe 1000
      expect(t.o.delay).toBe    0
  describe 'start ->', ->
    it 'calculate start time', ->
      t = new Tween(duration: 1000, delay: 500)
        .start()
      now = Date.now() + 500
      expect(t.props.startTime).not.toBeGreaterThan now
      expect(t.props.startTime).toBeGreaterThan     now-50
    it 'set isStarted flag', ->
      t = new Tween(duration: 1000, delay: 500).start()
      expect(t.isStarted).toBe                      true
    it 'set call onStart callback', ->
      t = new Tween(duration: 1000, delay: 500)
      spyOn t.o, 'onStart'
      t.start()
      expect(t.o.onStart).toHaveBeenCalled()
  describe 'update time ->', ->
    it 'update elapsed time', ->
  # describe 'tick ->', ->
  #   it 'should add ticks to totalElapsed', ->
  #     t = new Tween
  #     t.tick()
  #     expect(t.props.totalElapsed).toBe 1
  #   it 'should add ticks to durationElapsed', ->
  #     t = new Tween
  #     t.tick()
  #     expect(t.props.durationElapsed).toBe 1
  #   it 'should add ticks to delayElapsed', ->
  #     t = new Tween delay: 200
  #     t.tick()
  #     expect(t.props.delayElapsed)   .toBe 1
  #     expect(t.props.durationElapsed).toBe 0
  #   it 'should add ticks to durationElapsed only after the delayElapsed', ->
  #     t = new Tween delay: 32
  #     t.tick(); t.tick()
  #     expect(t.props.delayElapsed)   .toBe 2
  #     expect(t.props.durationElapsed).toBe 0
  #   it 'should resolve delayElapsed -> durationElapsed border', ->
  #     t = new Tween delay: 32
  #     t.tick(); t.tick(2.5)
  #     expect(t.props.delayElapsed)   .toBe 2
  #     expect(t.props.durationElapsed).toBe 1.5

  #   it 'durationElapsed should not greater than duration', ->
  #     t = new Tween delay: 32, duration: 32
  #     t.tick(); t.tick(5.5)
  #     expect(t.props.delayElapsed)   .toBe 2
  #     expect(t.props.durationElapsed).toBe 2
  # describe 'progress ->', ->
  #   describe 'getProgress ->', ->
  #     it 'should calculate the current progress', ->
  #       t = new Tween duration: 32
  #       t.tick()
  #       expect(t.getProgress()).toBe .5
  #     it 'should not be bigger then 1', ->
  #       t = new Tween duration: 32
  #       t.tick(5)
  #       expect(t.getProgress()).toBe 1
  #   it 'should calculate the current progress', ->
  #     t = new Tween duration: 32
  #     t.tick()
  #     expect(t.progress).toBe .5

  # describe 'onUpdate callback ->', ->
  #   it 'should be defined', ->
  #     t = new Tween
  #       onUpdate: ->
  #     expect(t.o.onUpdate).toBeDefined()
  #   it 'should call onUpdate callback with the current progress', ->
  #     t = new Tween duration: 32, onUpdate: ->
  #     spyOn t, 'onUpdate'
  #     t.tick()
  #     expect(t.onUpdate).toHaveBeenCalledWith .5
  #   it 'should have the right scope', ->
  #     isRightScope = false
  #     t = new Tween onUpdate:-> isRightScope = @ instanceof Tween
  #     t.tick()
  #     expect(isRightScope).toBe true
  describe 'onStart callback ->', ->
    it 'should be defined', ->
      t = new Tween onStart: ->
      expect(t.o.onStart).toBeDefined()
    it 'should call onStart callback', ->
      t = new Tween duration: 32, onStart:->
      spyOn(t.o, 'onStart')
      t.start()
      expect(t.o.onStart).toHaveBeenCalled()
    it 'should be called just once', ->
      cnt = 0
      t = new Tween duration: 32, onStart:-> cnt++
      t.start(); t.start()
      expect(cnt).toBe 1
    it 'should have the right scope', ->
      isRightScope = false
      t = new Tween onStart:-> isRightScope = @ instanceof Tween
      t.start()
      expect(isRightScope).toBe true

  # describe 'onComplete callback ->', ->
  #   it 'should be defined', ->
  #     t = new Tween onComplete: ->
  #     expect(t.o.onComplete).toBeDefined()
  #   it 'should call onComplete callback', ->
  #     t = new Tween duration: 32, onComplete:->
  #     spyOn(t.o, 'onComplete')
  #     t.tick(); t.tick()
  #     expect(t.o.onComplete).toHaveBeenCalled()
  #   it 'should be called just once', ->
  #     cnt = 0
  #     t = new Tween duration: 32, onComplete:-> cnt++
  #     t.tick(); t.tick(); t.tick()
  #     expect(cnt).toBe 1
  #   it 'should have the right scope', ->
  #     isRightScope = false
  #     t = new Tween
  #       duration: 1,
  #       onComplete:-> isRightScope = @ instanceof Tween
  #     t.tick()
  #     expect(isRightScope).toBe true
  # describe 'repeat option ->', ->
  #   it 'should recieve repeat option', ->
  #     t = new Tween onComplete: ->
  #     expect(t.o.repeat).toBeDefined()
  #   it 'should decrease the repeat option onComplete', ->
  #     t = new Tween repeat: 5, duration: 1
  #     t.tick()
  #     expect(t.o.repeat).toBe 4
  #   it 'should not decrease the repeat option less then 0', ->
  #     t = new Tween repeat: 5, duration: 1
  #     t.tick(); t.tick(); t.tick(); t.tick(); t.tick(); t.tick(); t.tick()
  #     expect(t.o.repeat).toBe 0
  #   it 'should call onComplete after the repeat', ->
  #     t = new Tween
  #       repeat: 5, duration: 1, onComplete:->
  #     spyOn t.o, 'onComplete'
  #     t.tick()
  #     expect(t.o.onComplete).not.toHaveBeenCalled()
  #     t.tick(); t.tick(); t.tick(); t.tick(); t.tick()
  #     expect(t.o.onComplete).toHaveBeenCalled()
  #   it 'should call onComplete after the repeat only once', ->
  #     cnt = 0
  #     t = new Tween
  #       repeat: 5, duration: 1, onComplete:-> cnt++
  #     t.tick(); t.tick(); t.tick(); t.tick(); t.tick()
  #     expect(cnt).toBe 0
  #     t.tick()
  #     expect(cnt).toBe 1
  #   it 'should null the isCompleted flag and elapsed', ->
  #     t = new Tween repeat: 5, duration: 1
  #     t.tick()
  #     expect(t.isCompleted).toBe            false
  #     expect(t.props.durationElapsed).toBe  0
  #     expect(t.props.delayElapsed).toBe     0
  #     expect(t.props.totalElapsed).toBe     0
  # describe 'yoyo option ->', ->
  #   it 'should toggle the progress diraction on repeat', ->
  #     t = new Tween repeat: 2, duration: 64, yoyo: true
  #     t.tick(); expect(t.progress).toBe .25
  #     t.tick(); expect(t.progress).toBe .5
  #     t.tick(); expect(t.progress).toBe .75
  #     t.tick(); expect(t.progress).toBe 1
  #     t.tick(); expect(t.progress).toBe(.75); expect(t.isReversed).toBe true
  #     t.tick(); expect(t.progress).toBe(.5);  expect(t.isReversed).toBe true
  #     t.tick(); expect(t.progress).toBe(.25); expect(t.isReversed).toBe true
  #     t.tick(); expect(t.progress).toBe(0);   expect(t.isReversed).toBe false
  #     t.tick(); expect(t.progress).toBe(.25); expect(t.isReversed).toBe false
  #     t.tick(); expect(t.progress).toBe(.5);  expect(t.isReversed).toBe false
  #     t.tick(); expect(t.progress).toBe(.75); expect(t.isReversed).toBe false
  #     t.tick(); expect(t.progress).toBe(1);   expect(t.isCompleted).toBe true




