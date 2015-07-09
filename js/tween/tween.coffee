h = require '../h'
t = require './tweener'
Timeline = require './timeline'

class Tween
  state: 'stop'
  constructor:(@o={})-> @vars(); @_addTimeline(); @
  vars:->
    @timelines = []; @props = totalTime: 0; @loop = h.bind @loop, @
    @_isDurationSet = @o.duration?
    # @onUpdate = @o.onUpdate
  # ---
  
  # Add 1 self timeline
  # 
  # @method     _addTimeline
  # @sideEffect adds _timeline variable on the object
  _addTimeline:-> @add new Timeline h.cloneObj(@o, {onComplete: 1})

  add:-> @pushTimelineArray Array::slice.apply(arguments)
  pushTimelineArray:(array)->
    for tm, i in array
      # recursive push to handle arrays of arrays
      if h.isArray tm then @pushTimelineArray tm
      # simple push
      else @pushTimeline tm
  pushTimeline:(timeline)->
    @timelines.push timeline
    @_updateTotalTime timeline
  # ---

  # Update the totalTime with respect to the timeline
  # 
  # @method remove
  # @param {Object} Timeline or Tween
  # @sideEffect updates @totalTime
  _updateTotalTime:(timeline)->
    @props.totalTime = 0 if @timelines.length is 2 and !@_isDurationSet
    @props.totalTime = Math.max timeline.props.totalTime, @props.totalTime
  # ---

  # Remove the timeline form tween
  # 
  # @method remove
  # @param {Object} Timeline or Tween
  # @sideEffect updates @timelines
  remove:(timeline)->
    index = @timelines.indexOf timeline
    if index isnt -1 then @timelines.splice index, 1
  # ---

  # Append the timeline or set of ones, to the end of the
  # current tween time
  # 
  # @method append
  # @param {Object, Array} Timeline or Tween or Array of those
  # @sideEffect updates @timelines
  # @sideEffect updates @totalTime
  append:(timeline)->
    if !h.isArray(timeline)
      timeline.index = @timelines.length
      @appendTimeline timeline
      @_updateTotalTime timeline
    else
      i = timeline.length
      @appendTimeline(timeline[i]) while(i--)
      @recalcDuration()
  # ---

  # Append the timeline, to the end of the
  # current tween time, by increasing it's delay to
  # the current tween's totalTime
  # 
  # @method appendTimeline
  # @param {Object, Array} Timeline or Tween or Array of those
  # @sideEffect updates @timelines
  # @sideEffect updates timeline's delay
  appendTimeline:(timeline)->
    timeline.setProp(delay: timeline.o.delay + @props.totalTime)
    @timelines.push timeline
  # reset:(timeline)-> @remove(timeline); @add timeline
  # ---

  # Recalculate the totalTime for the timelines array
  # 
  # @method recalcDuration
  # @sideEffect updates @props.totalTime
  recalcDuration:->
    len = @timelines.length; @props.totalTime = 0
    while(len--)
      # do not include the self's timeline if
      # duration wasn't set
      break if len is 0 and !@_isDurationSet
      @_updateTotalTime @timelines[len]
  update:(time)->
    # react only on endTime max
    if time > @props.endTime then time = @props.endTime
    # update self timelines
    i = -1; len = @timelines.length-1
    @timelines[i].update(time) while(i++ < len)
    # if isn't complete
    # if time >= @props.startTime and time < @props.endTime
    #   @onUpdate? (time - @props.startTime)/@props.totalTime
    # if reverse completed
    # if @prevTime > time and time <= @props.startTime
    #   @o.onReverseComplete?.apply(@)

    @prevTime = time
    # if completed
    if time is @props.endTime
      # @onUpdate?(1);
      @o.onComplete?.apply(@); return true
  
  prepareStart:-> @getDimentions(); @o.onStart?.apply @
  startTimelines:(time)->
    i = @timelines.length
    time = time or @props.startTime
    @timelines[i].start time while(i--)

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

  setProgress:(progress)->
    if !@props.startTime? then @setStartTime()
    @update @props.startTime + h.clamp(progress, 0, 1)*@props.totalTime

module.exports = Tween

