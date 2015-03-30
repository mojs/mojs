h = require '../h'
t = require './tweener'

class Tween
  state: 'stop'
  constructor:(@o={})-> @vars(); @
  vars:->
    @timelines = []; @props = totalTime: 0
    @loop = h.bind @loop, @
    @onUpdate = @o.onUpdate
  add:->
    timeline = Array::slice.apply(arguments)
    @pushTimelineArray timeline
  pushTimelineArray:(array)->
    for tm, i in array
      # recursive push to handle arrays of arrays
      if h.isArray tm then @pushTimelineArray tm
      # simple push
      else @pushTimeline tm
  pushTimeline:(timeline)->
    @timelines.push timeline
    @props.totalTime = Math.max timeline.props.totalTime, @props.totalTime
  remove:(timeline)->
    index = @timelines.indexOf timeline
    if index isnt -1 then @timelines.splice index, 1
  append:(timeline)->
    if !h.isArray(timeline)
      timeline.index = @timelines.length
      @appendTimeline timeline
      @props.totalTime = Math.max timeline.props.totalTime, @props.totalTime
    else
      i = timeline.length
      @appendTimeline(timeline[i]) while(i--)
      @recalcDuration()
  appendTimeline:(timeline)->
    timeline.setProp(delay: timeline.o.delay + @props.totalTime)
    @timelines.push timeline
  # reset:(timeline)-> @remove(timeline); @add timeline
  recalcDuration:->
    len = @timelines.length; @props.totalTime = 0
    while(len--)
      timeline  = @timelines[len]
      @props.totalTime = Math.max timeline.props.totalTime, @props.totalTime
  update:(time)->
    # react only on endTime max
    if time > @props.endTime then time = @props.endTime
    # update self timelines
    i = -1; len = @timelines.length-1
    while(i++ < len)
      @timelines[i].update(time)
    # if isn't complete
    if time >= @props.startTime and time < @props.endTime
      @onUpdate? (time - @props.startTime)/@props.totalTime
    # if reverse completed
    if @prevTime > time and time <= @props.startTime
      @o.onReverseComplete?.apply(@)

    @prevTime = time
    # if completed
    if time is @props.endTime
      @onUpdate?(1); @o.onComplete?.apply(@); return true
  
  prepareStart:-> @getDimentions(); @o.onStart?.apply @
  startTimelines:(time)->
    i = @timelines.length
    while(i--)
      @timelines[i].start time or @props.startTime
  start:(time)->
    @setStartTime(time); !time and t.add(@); @state = 'play'
    @
  
  pause:-> @removeFromTweener(); @state = 'pause'; @
  stop:->  @removeFromTweener(); @setProgress(0); @state = 'stop'; @
  restart:-> @stop(); @start()
  removeFromTweener:-> t.remove(@); @

  getDimentions:->
    @props.startTime = performance.now()
    @props.endTime = @props.startTime + @props.totalTime

  setStartTime:(time)-> @prepareStart(); @startTimelines(time)

  # resetProgress:->
  #   @setProgress 0
  #   # update every timeline to its start time
  #   # i = -1; len = @timelines.length-1
  #   # while(i++ < len)
  #   #   timeline = @timelines[i]
  #   #   # if timeline is actually a tween then reset progress there
  #   #   if timeline.resetProgress? then timeline.resetProgress()
  #   #   else timeline.update(timeline.props.startTime)

  setProgress:(progress)->
    if !@props.startTime? then @setStartTime()
    progress = Math.max progress, 0
    progress = Math.min progress, 1
    @update @props.startTime + progress*@props.totalTime

module.exports = Tween

