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
    it 'calculate end time', ->
      t = new Tween(duration: 1000, delay: 500).start()
      expect(t.props.endTime).toBe t.props.startTime + 1000
    it 'calculate end time if repeat', ->
      t = new Tween(duration: 1000, delay: 500, repeat: 2).start()
      expect(t.props.endTime).toBe t.props.startTime+(3*(1000+500))-500
  describe 'update time ->', ->
    it 'should update progress', ->
      t = new Tween(duration: 1000, delay: 500)
      t.start()
      time = t.props.startTime + 200
      t.update time
      expect(t.progress).toBe .2
    it 'should update progress with repeat', ->
      t = new Tween(duration: 1000, delay: 200, repeat: 2, isIt: true)
      t.start()
      t.update t.props.startTime + 1400
      expect(t.progress).toBe .2
      t.update t.props.startTime + 2700
      expect(t.progress).toBe .3
      t.update t.props.startTime + 3400
      expect(t.progress).toBe 1
    # it 'should return true if the tween was completed', ->
    #   t = new Tween(duration: 1000, delay: 500)
    #   t.start()
    #   time = t.props.startTime + 1200
    #   returnValue = t.update time
    #   expect(returnValue).toBe true
    it 'should set tween to the end if tween ended', ->
      t = new Tween(duration: 1000, delay: 500)
      t.start()
      t.update t.props.startTime + 1200
      expect(t.progress).toBe 1
  describe 'onUpdate callback ->', ->
    it 'should be defined', ->
      t = new Tween onUpdate: ->
      expect(t.o.onUpdate).toBeDefined()
    it 'should call onUpdate callback with the current progress', ->
      t = new Tween duration: 1000, onUpdate: ->
      spyOn t, 'onUpdate'
      t.start()
      t.update t.props.startTime + 500
      expect(t.onUpdate).toHaveBeenCalledWith .5
    it 'should have the right scope', ->
      isRightScope = false
      t = new Tween onUpdate:-> isRightScope = @ instanceof Tween
      t.update t.props.startTime + 200
      expect(isRightScope).toBe true
describe 'onStart callback ->', ->
  it 'should be defined', ->
    t = new Tween(onStart: ->)
    t.start()
    expect(t.o.onStart).toBeDefined()
  it 'should call onStart callback', ->
    t = new Tween duration: 32, onStart:->
    t.start()
    spyOn(t.o, 'onStart')
    t.update t.props.startTime + 1
    expect(t.o.onStart).toHaveBeenCalled()
  it 'should be called just once', ->
    cnt = 0
    t = new Tween(duration: 32, onStart:-> cnt++).start()
    t.update(t.props.startTime + 1); t.update(t.props.startTime + 1)
    expect(cnt).toBe 1
  it 'should have the right scope', ->
    isRightScope = false
    t = new Tween(onStart:-> isRightScope = @ instanceof Tween)
    t.start()
    t.update t.props.startTime + 1
    expect(isRightScope).toBe true
# describe 'onComplete callback ->', ->
#   it 'should be defined', ->
#     t = new Tween onComplete: ->
#     expect(t.o.onComplete).toBeDefined()
#   it 'should call onComplete callback', ->
#     t = new Tween(duration: 100, onComplete:->).start()
#     spyOn(t.o, 'onComplete')
#     t.update t.props.startTime + 101
#     expect(t.o.onComplete).toHaveBeenCalled()
#   it 'should be called just once', ->
#     cnt = 0
#     t = new Tween(duration: 32, onComplete:-> cnt++).start()
#     t.update(t.props.startTime + 33)
#     t.update(t.props.startTime + 33)
#     expect(cnt).toBe 1
#   it 'should have the right scope', ->
#     isRightScope = false
#     t = new Tween
#       duration: 1, onComplete:-> isRightScope = @ instanceof Tween
#     t.start().update t.props.startTime + 2
#     expect(isRightScope).toBe true
# describe 'repeat option ->', ->
#   it 'should recieve repeat option', ->
#     t = new Tween onComplete: ->
#     expect(t.o.repeat).toBeDefined()
#   it 'should decrease the repeat option onComplete', ->
#     t = new Tween(repeat: 5, duration: 1).start()
#     t.update t.props.startTime + 1
#     expect(t.o.repeat).toBe 4
#   it 'should not decrease the repeat option less then 0', ->
#     t = new Tween(repeat: 2, duration: 1).start()
#     t.update(t.props.startTime + 1); t.update(t.props.startTime + 1)
#     t.update(t.props.startTime + 1); t.update(t.props.startTime + 1)
#     t.update(t.props.startTime + 1); t.update(t.props.startTime + 1)
#     expect(t.o.repeat).toBe 0
#   it 'should call onComplete after the repeat', ->
#     t = new Tween(repeat: 2, duration: 1, isIt: true, onComplete:->).start()
#     spyOn t.o, 'onComplete'
#     t.update(t.props.startTime + 1); t.update(t.props.startTime + 2)
#     expect(t.o.onComplete).not.toHaveBeenCalled()
#     t.update(t.props.startTime + 3)
#     expect(t.o.onComplete).toHaveBeenCalled()
#   it 'should call onComplete after the repeat only once', ->
#     cnt = 0
#     t = new Tween(repeat: 2, duration: 1, onComplete:->cnt++).start()
#     time = t.props.startTime
#     t.update(time++); t.update(time++)
#     expect(cnt).toBe 0
#     t.update(time++); t.update(time++)
#     t.update(time++); t.update(time++)
#     t.update(time++); t.update(time++)
#     expect(cnt).toBe 1
#   it 'should null the isCompleted flag and completed', ->
#     t = new Tween(repeat: 5, duration: 1).start()
#     time = t.props.startTime
#     t.update(time++); t.update(time++)
#     expect(t.isCompleted).toBeFalsy()
#   it 'should null the isCompleted flag and completed', ->
#     t = new Tween(repeat: 1, duration: 1).start()
#     time = t.props.startTime
#     t.update(time++); t.update(time++)
#     expect(t.isCompleted).toBe true
# describe 'yoyo option ->', ->
#   it 'should recieve yoyo option', ->
#     t = new Tween yoyo: true
#     expect(t.o.yoyo).toBe true
#   it 'should toggle the progress direction on repeat', ->
#     t = new Tween(repeat: 2, duration: 10, yoyo: true).start()
#     time = t.props.startTime
#     t.update(time+1);   expect(t.getProgress()).toBe .1
#     t.update(time+5);   expect(t.getProgress()).toBe .5
#     t.update(time+10);  expect(t.getProgress()).toBe 1
#     t.update(time+11)
#     expect(t.getProgress()).toBe(.9); expect(t.isReversed).toBe true
#     # t.update(time+5)
#     # expect(t.getProgress()).toBe(.5); expect(t.isReversed).toBe true
#     # t.update(time+5)
#     # expect(t.getProgress()).toBe(.5); expect(t.isReversed).toBe true
#     # t.tick(); expect(t.progress).toBe(0);   expect(t.isReversed).toBe false
#     # t.tick(); expect(t.progress).toBe(.25); expect(t.isReversed).toBe false
#     # t.tick(); expect(t.progress).toBe(.5);  expect(t.isReversed).toBe false
#     # t.tick(); expect(t.progress).toBe(.75); expect(t.isReversed).toBe false
#     # t.tick(); expect(t.progress).toBe(1);   expect(t.isCompleted).toBe true

