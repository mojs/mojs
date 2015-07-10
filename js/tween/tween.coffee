h = require '../h'
t = require './tweener'

class Tween
  state: 'stop'
  constructor:(@o={})-> @vars(); @
  vars:->
    @timelines = []; @props = totalTime: 0
    @loop = h.bind @loop, @
    @onUpdate = @o.onUpdate
  add:(args...)-> @pushTimelineArray(args); @
  pushTimelineArray:(array)->
    for tm, i in array
      # recursive push to handle arrays of arrays
      if h.isArray tm then @pushTimelineArray tm
      # simple push
      else @pushTimeline tm
  pushTimeline:(timeline)->
    # if timeline is a module with tween property then extract it
    timeline = timeline.tween if timeline.tween instanceof Tween
    @timelines.push timeline
    @props.time      = Math.max timeline.props.totalTime, @props.totalTime
    @props.totalTime = @props.time*(@o.repeat or 1)
  remove:(timeline)->
    index = @timelines.indexOf timeline
    if index isnt -1 then @timelines.splice index, 1
  
  append:(timeline...)->
    for tm, i in timeline
      if h.isArray(tm) then @_appendTimelineArray(tm)
      else @appendTimeline(tm, @timelines.length)
  _appendTimelineArray:(timelineArray)->
    i = timelineArray.length; time = @props.totalTime; index = @timelines.length
    @appendTimeline(timelineArray[i], index, time) while(i--)
  appendTimeline:(timeline, index, time)->
    delay = timeline.o.delay + (if time? then time else @props.totalTime)
    timeline.setProp(delay: delay); timeline.index = index
    @pushTimeline timeline

  recalcDuration:->
    len = @timelines.length; @props.totalTime = 0
    while(len--)
      timeline  = @timelines[len]
      @props.totalTime = Math.max timeline.props.totalTime, @props.totalTime
  # ---

  # Method to take care of the current time.
  # @param {Number} The current time
  # @return {Undefined, Boolean} Returns true if the tween
  # had ended it execution so should be removed form the 
  # tweener's active tweens array
  update:(time)->
    # don't go further then the endTime
    if time > @props.endTime then time = @props.endTime
    # set the time to timelines
    @_updateTimelines time
    # check the callbacks for the current time
    # NOTE: should be returned from this update
    # function, because it returns true if the tween
    # was completed, to indicate the tweener module
    # to remove it from the active tweens array for 
    # performance purposes
    return @_checkCallbacks(time)
  # ---

  # Method to check the callbacks
  # for the current time
  # @param {Number} The current time
  _checkCallbacks:(time)->
    # if isn't complete
    if time >= @props.startTime and time < @props.endTime
      @onUpdate? (time - @props.startTime)/@props.totalTime
    # if reverse completed
    if @prevTime > time and time <= @props.startTime
      @o.onReverseComplete?.apply(@)
    # save the current time as previous for future
    @prevTime = time
    # if completed
    if time is @props.endTime
      @onUpdate?(1); @o.onComplete?.apply(@); return true
  # ---
  # 
  # Method to set time on timelines,
  # with respect to repeat periods **if present**
  # @param {Number} Time to set
  _updateTimelines:(time)->
    # get elapsed with respect to repeat option
    # so take a modulo of the elapsed time
    elapsed = (time - @props.startTime) % @props.time
    # get the time for timelines
    timeToTimelines = if @props.endTime is time then @props.endTime
    else @props.startTime + elapsed
    # set the normalized time to the timelines
    i = -1; len = @timelines.length-1
    @timelines[i].update(timeToTimelines) while(i++ < len)
  
  startTimelines:(time)->
    i = @timelines.length
    @timelines[i].start(time or @props.startTime) while(i--)

  start:(time)->
    @setStartTime(time); !time and t.add(@); @state = 'play'
    @
  
  pause:-> @removeFromTweener(); @state = 'pause'; @
  stop:->  @removeFromTweener(); @setProgress(0); @state = 'stop'; @
  restart:-> @stop(); @start()
  removeFromTweener:-> t.remove(@); @

  setStartTime:(time)->
    @getDimentions(); @o.onStart?.apply(@); @startTimelines(time)

  setProgress:(progress)->
    if !@props.startTime? then @setStartTime()
    progress = Math.max progress, 0
    progress = Math.min progress, 1
    @update @props.startTime + progress*@props.totalTime
  getDimentions:->
    @props.startTime = performance.now()
    @props.endTime = @props.startTime + @props.totalTime

module.exports = Tween

