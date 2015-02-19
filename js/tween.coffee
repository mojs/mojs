h = require './h'
t = require './tweener'

class Tween
  constructor:(@o={})-> @vars(); @
  vars:->
    @timelines = []; @props = totalTime: 0
    @loop = h.bind @loop, @
    @onUpdate = @o.onUpdate
  add:(timeline)->
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
    if time > @props.endTime   then time = @props.endTime
    # if isn't complete
    if time >= @props.startTime and time < @props.endTime
      @onUpdate? (time - @props.startTime)/@props.totalTime
    # update self timelines
    i = -1; len = @timelines.length-1
    @timelines[i].update(time) while(i++ < len)

    # if reverse completed
    if @prevTime > time and time <= @props.startTime
      @o.onReverseComplete?.apply(@)

    @prevTime = time
    # if completed
    if time is @props.endTime
      @o.onComplete?.apply(@); @onUpdate?(1); return true
  
  prepareStart:-> @getDimentions(); @o.onStart?.apply @
  startTimelines:(time)->
    i = @timelines.length
    while(i--)
      @timelines[i].start time or @props.startTime
  start:(time)->
    @setStartTime(time); !time and t.add @
    @
  stop:-> t.remove(@); @
  getDimentions:->
    @props.startTime = Date.now()
    @props.endTime = @props.startTime + @props.totalTime

  setStartTime:(time)-> @prepareStart(time); @startTimelines(time)

  setProgress:(progress)->
    if !@props.startTime? then @setStartTime()
    progress = Math.max progress, 0
    progress = Math.min progress, 1
    @update @props.startTime + progress*@props.totalTime

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "Tween", [], -> Tween
### istanbul ignore next ###
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = Tween
### istanbul ignore next ###
window?.mojs ?= {}
### istanbul ignore next ###
window?.mojs.Tween = Tween

