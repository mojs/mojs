t        = window.mojs.tweenner
Tween    = window.mojs.Tween
Timeline = window.mojs.Timeline

describe 'Twenner ->', ->
  describe 'loop ->', ->
    it 'should loop over', (dfr)->
      t = new Tween
      t.add new Timeline duration: 500, delay: 200
      t.startLoop()
      spyOn t, 'loop'
      setTimeout ->
        expect(t.loop).toHaveBeenCalled(); dfr()
      , 200
  #   it 'should call update fun', (dfr)->
  #     t = new Tween
  #     t.add new Timeline duration: 500, delay: 200
  #     t.startLoop()
  #     spyOn t, 'update'
  #     setTimeout ->
  #       expect(t.update).toHaveBeenCalledWith(jasmine.any(Number)); dfr()
  #     , 200
  #   it 'should stop at the end', (dfr)->
  #     t = new Tween
  #     t.add new Timeline duration: 20
  #     t.start()
  #     setTimeout ->
  #       expect(t.isRunning).toBe false
  #       dfr()
  #     , 200
  # describe 'startLoop method ->', ->
  #   it 'should call loop method', (dfr)->
  #     t = new Tween
  #     spyOn t, 'loop'
  #     t.startLoop()
  #     setTimeout ->
  #       expect(t.loop).toHaveBeenCalled()
  #       dfr()
  #     , 60
  #   it 'should set isRunning flag', ->
  #     t = new Tween
  #     expect(t.isRunning).toBeFalsy()
  #     t.startLoop()
  #     expect(t.isRunning).toBe true
  #   it 'should call loop only once', ->
  #     t = new Tween
  #     t.startLoop()
  #     spyOn t, 'loop'
  #     t.startLoop()
  #     expect(t.loop).not.toHaveBeenCalled()
  # describe 'stopLoop method ->', ->
  #   it 'should set isRunning to false', ->
  #     t = new Tween
  #     t.startLoop()
  #     t.stopLoop()
  #     expect(t.isRunning).toBe false