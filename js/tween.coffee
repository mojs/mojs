h = require './h'
t = require './tweener'

class Tween
  constructor:(@o={})-> @vars(); @
  vars:->
    @timelines = []; @duration = 0; @props = {}
    @loop = h.bind @loop, @
    @onUpdate = @o.onUpdate
  add:(timeline)->
    @timelines.push timeline
    @duration = Math.max timeline.props.totalTime, @duration
  remove:(timeline)->
    index = @timelines.indexOf timeline
    if index isnt -1 then @timelines.splice index, 1
  append:(timeline)->
    if !h.isArray(timeline)
      timeline.index = @timelines.length
      @appendTimeline timeline
      @duration = Math.max timeline.props.totalTime, @duration
    else
      i = timeline.length
      @appendTimeline(timeline[i]) while(i--)
      @recalcDuration()
  appendTimeline:(timeline)->
    timeline.setProp(delay: timeline.o.delay + @duration)
    @timelines.push timeline
  # reset:(timeline)-> @remove(timeline); @add timeline
  recalcDuration:->
    len = @timelines.length; @duration = 0
    while(len--)
      timeline  = @timelines[len]
      @duration = Math.max timeline.props.totalTime, @duration
  update:(time)->
    return if @isCompleted
    i = -1; len = @timelines.length-1
    while(i++ < len)
      @timelines[i].update time
    if (time >= @endTime)
      @o.onComplete?.apply(@); @onUpdate?(1)
      return @isCompleted = true
    if time >= @startTime
      @onUpdate? (time - @startTime)/@duration
  start:->
    @isCompleted = false; @getDimentions()
    i = @timelines.length; @o.onStart?.apply @
    while(i--)
      @timelines[i].start @startTime
    t.add @
    @
  stop:-> t.remove(@); @
  getDimentions:-> @startTime = Date.now(); @endTime = @startTime + @duration

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "Tween", [], -> Tween
### istanbul ignore next ###
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = Tween
### istanbul ignore next ###
window?.mojs ?= {}
window?.mojs.Tween = Tween

