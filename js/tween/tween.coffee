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

    # if time is inside the active area of the tween.
    # active area is the area from start time to end time,
    # with all the repeat and delays in it
    if (time >= @props.startTime) and (time < @props.endTime)

      # reset callback flags
      @isOnReverseComplete = false; @isCompleted = false
      # onFirtUpdate callback
      (@props.onFirstUpdate?.apply(@); @isFirstUpdate = true) if !@isFirstUpdate
      # onStart callback
      (@props.onStart?.apply(@); @isStarted = true) if !@isStarted
      
      @_updateInActiveArea(time)
        
      if time < @prevTime and !@isFirstUpdateBackward
        @props.onFirstUpdateBackward?.apply(@); @isFirstUpdateBackward = true
    
    else

      # complete if time is larger then end time
      if time >= @props.endTime and !@isCompleted
        @setProc(1); @props.onComplete?.apply(@)
        @isOnReverseComplete = false; @isCompleted = true
      # rest isFirstUpdate flag if update was out of active zone
      @isFirstUpdate = false if time > @props.endTime or time < @props.startTime
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

  _updateInActiveArea:(time)->
    startPoint = @props.startTime - @props.delay
    elapsed = (time - startPoint) % (@props.delay + @props.duration)
    cnt = Math.floor (time - startPoint)/(@props.delay + @props.duration)
    # if time is inside the duration area of the tween
    if startPoint + elapsed >= @props.startTime
      # active zone or larger then end
      if time > @props.endTime then @setProc 1
        # set to end time
      else
        elapsed2 = (time-@props.startTime) % (@props.delay + @props.duration)
        proc = elapsed2/@props.duration
        # if not yoyo then set the plain progress
        @setProc if !@props.yoyo then proc
        # if yoyo then check if the current duration
        # period is even. If so set progress, otherwise
        # set inverset proc value
        else
          if cnt % 2 is 0 then proc
          else 1-if proc is 1 then 0 else proc
    # delay gap
    else @setProc if @prevTime < time then 1 else 0

  setProc:(p, isCallback=true)->
    @o.isIt and console.log p
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


