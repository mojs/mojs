# Timeline = window.mojs.Timeline
# t = window.mojs.timeliner
# timeline = new Timeline duration: 32

# describe 'Timeliner ->', ->
#   it 'should have timelines var', ->
#     expect(t.timelines.length).toBe 0

#   describe 'removeAll method ->', ->
#     it 'should remove all timelines', ->
#       timeline = new Timeline duration: 32
#       t.add timeline
#       t.removeAll()
#       expect(t.timelines.length).toBe 0
#   describe 'loop ->', ->
#     it 'should loop over', (dfr)->
#       t.removeAll()
#       timeline = new Timeline duration: 32
#       t.add timeline
#       spyOn t, 'loop'
#       setTimeout (-> expect(t.loop).toHaveBeenCalled(); dfr()), 64
#     it 'should call update fun', (dfr)->
#       t.removeAll()
#       timeline = new Timeline duration: 32
#       t.add timeline
#       spyOn t, 'update'
#       setTimeout ->
#         expect(t.update).toHaveBeenCalled(); dfr()
#       , 60
#     it 'should stop if nothing to animate', ()->
#       timeline = new Timeline duration: 32
#       t.add timeline
#       t.removeAll()
#       expect(t.isRunning).toBe false
#   describe 'add method ->', ->
#     it 'should start raf loop', ->
#       spyOn t, 'startLoop'
#       t.add timeline
#       expect(t.startLoop).toHaveBeenCalled()
#     it 'should add timeline', ->
#       t.removeAll()
#       t.add timeline
#       expect(t.timelines.length).toBe 1
#   describe 'remove method ->', ->
#     it 'should add timeline', ->
#       t.removeAll()
#       timeline = new Timeline duration: 32
#       t.add timeline
#       t.remove timeline
#       expect(t.timelines.length).toBe 0
#   describe 'startLoop method ->', ->
#     it 'should call loop method', (dfr)->
#       t.isRunning = false
#       spyOn t, 'loop'
#       t.startLoop()
#       setTimeout ->
#         expect(t.loop).toHaveBeenCalled()
#         dfr()
#       , 60
#     it 'should set isRunning flag', ->
#       t.startLoop()
#       expect(t.isRunning).toBe true
#     it 'should call loop only once', ->
#       t.isRunning = false
#       t.startLoop()
#       spyOn t, 'loop'
#       t.startLoop()
#       expect(t.loop).not.toHaveBeenCalled()
#   describe 'stopLoop method ->', ->
#     it 'should set isRunning to false', ->
#       t.startLoop()
#       t.stopLoop()
#       expect(t.isRunning).toBe false
#   describe 'update method ->', ->
#     it 'should call tick on every timeline', (dfr)->
#       t.removeAll()
#       timeline1 = new Timeline duration: 32
#       timeline2 = new Timeline duration: 32
#       t.add(timeline1); t.add(timeline2)
#       spyOn timeline1, 'tick'
#       spyOn timeline2, 'tick'
#       setTimeout ->
#         expect(timeline1.tick).toHaveBeenCalled()
#         expect(timeline2.tick).toHaveBeenCalled()
#         dfr()
#       , 60
#     it 'should remove elapsed timelines', ()->
#       t.removeAll()
#       timeline1 = new Timeline duration: 16
#       timeline2 = new Timeline duration: 32
#       t.add(timeline1); t.add(timeline2)
#       t.isRunning = false
#       t.update()
#       expect(t.timelines.length).toBe 1
#       expect(t.timelines[0].isCompleted).toBeFalsy()




