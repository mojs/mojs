h            = require '../h'
t            = require './tweener'
easing       = require '../easing/easing'

class Tween
  defaults:
    duration:               600
    delay:                  0
    repeat:                 0
    yoyo:                   false
    easing:                 'Linear.None'
    onStart:                null
    onComplete:             null
    onReverseComplete:      null
    onFirstUpdate:          null
    onUpdate:               null
    onFirstUpdateBackward:  null
    isChained:              false
  constructor:(@o={})-> @extendDefaults(); @vars(); @
  vars:->
    @h = h; @progress = 0; @prevTime = 0
    @calcDimentions()
  calcDimentions:->
    @props.totalTime     = (@props.repeat+1)*(@props.duration+@props.delay)
    @props.totalDuration = @props.totalTime - @props.delay
  extendDefaults:->
    @props = {}
    for key, value of @defaults
      @props[key] = if @o[key]? then @o[key] else value
    @props.easing = easing.parseEasing(@o.easing or @defaults.easing)
    @onUpdate     = @props.onUpdate
  start:(time)->
    @isCompleted = false; @isStarted = false
    time ?= performance.now()
    @props.startTime = time + @props.delay
    @props.endTime   = @props.startTime + @props.totalDuration
    @
  update:(time)->
    # # get elapsed with respect to repeat option
    # # so take a modulo of the elapsed time
    # startPoint = @props.startTime - @props.delay
    # elapsed = (time - startPoint) % (@props.delay + @props.time)
    # # get the time for timelines
    # timeToTimelines = if startPoint + elapsed >= @props.startTime
    #   if time >= @props.endTime then @props.endTime
    #   else startPoint + elapsed
    # else

    #   if time > @props.startTime + @props.time
    #     @props.startTime + @props.time
    #   else null
    # # set the normalized time to the timelines
    # if timeToTimelines?
    #   i = -1; len = @timelines.length-1
    #   @timelines[i].update(timeToTimelines) while(i++ < len)
    if (time >= @props.startTime) and (time < @props.endTime)
      @isOnReverseComplete = false; @isCompleted = false
      if !@isFirstUpdate
        @props.onFirstUpdate?.apply(@); @isFirstUpdate = true
      if !@isStarted then @props.onStart?.apply(@); @isStarted = true
      
      # startPoint = @props.startTime - @props.delay
      # elapsed1 = (time - startPoint) % (@props.delay + @props.time)
      elapsed = time - @props.startTime
      # console.log elapsed1, elapsed, startPoint, @props.delay

      # in the first repeat or without any repeats
      if elapsed <= @props.duration then @setProc elapsed/@props.duration
      # far in the repeats
      else
        start = @props.startTime
        isDuration = false; cnt = 0
        # get the last time point before time
        # by increasing the startTime by the
        # duration or delay in series
        # get the latest just before the time
        while(start <= time)
          isDuration = !isDuration
          start += if isDuration then cnt++; @props.duration else @props.delay
        # if have we stopped in start point + duration
        if isDuration
          # get the start point
          start = start - @props.duration
          elapsed = time - start
          @setProc elapsed/@props.duration
          # yoyo
          if @props.yoyo and @props.repeat
            @setProc if cnt % 2 is 1 then @progress
            # when reversed progress of 1 should be 0
            else 1-if @progress is 0 then 1 else @progress
        # we have stopped in start point + delay
        # set proc to 1 if previous time is smaller
        # then the current one, otherwise set to 0
        else @setProc if @prevTime < time then 1 else 0
      if time < @prevTime and !@isFirstUpdateBackward
        @props.onFirstUpdateBackward?.apply(@); @isFirstUpdateBackward = true
      # @onUpdate? @easedProgress
    else
      if time >= @props.endTime and !@isCompleted
        @setProc 1#; @onUpdate? @easedProgress
        @props.onComplete?.apply(@); @isCompleted = true
        @isOnReverseComplete = false
      if time > @props.endTime or time < @props.startTime
        @isFirstUpdate = false
      # reset isFirstUpdateBackward flag if progress went further the end time
      @isFirstUpdateBackward = false if time > @props.endTime
    if time < @prevTime and time <= @props.startTime
      if !@isFirstUpdateBackward
        @props.onFirstUpdateBackward?.apply(@); @isFirstUpdateBackward = true
      if !@isOnReverseComplete
        @isOnReverseComplete = true
        @setProc(0, !@props.isChained)
        #; !@o.isChained and @onUpdate? @easedProgress
        @props.onReverseComplete?.apply(@)
    @prevTime = time
    
    @isCompleted

  setProc:(p, isCallback=true)->
    # console.log @props.easing
    @progress = p; @easedProgress = @props.easing @progress
    if @props.prevEasedProgress isnt @easedProgress and isCallback
      @onUpdate?(@easedProgress, @progress)
    @props.prevEasedProgress = @easedProgress

  setProp:(obj, value)->
    if typeof obj is 'object'
      for key, val of obj
        @props[key] = val
        if key is 'easing' then @props.easing = easing.parseEasing @props.easing
    else if typeof obj is 'string'
      # if key is easing - parse it immediately
      if obj is 'easing' then @props.easing = easing.parseEasing value
      # else just save it to props
      else @props[obj] = value

    @calcDimentions()
  # ---

  # Method to run the Tween
  # @param  {Number} Start time
  # @return {Object} Self
  run:(time)->
    @start(time); !time and (t.add(@);)#@state = 'play'
    @
  # ---

  # Method to stop the Tween.
  stop:-> @pause(); @setProc(0); @
  # ---

  # Method to pause Tween.
  pause:-> @_removeFromTweener(); @

  # ---
  # 
  # Method to remove the Tween from the tweener.
  _removeFromTweener:-> t.remove(@); @


module.exports = Tween


