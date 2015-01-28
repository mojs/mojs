h         = require './h'

class Tween
  defaults:
    duration: 600
    delay:    0
    repeat:   0
    yoyo:     false
    durationElapsed:  0
    delayElapsed:     0
    onStart:          null
    onComplete:       null
  constructor:(@o={})-> @vars(); @extendDefaults(); @
  vars:-> @h = h; @props = {}; @progress = 0
  extendDefaults:-> @h.extend(@o, @defaults); @onUpdate = @o.onUpdate
  start:->
    @props.startTime = Date.now() + @o.delay
    @props.totalDuration = (@o.repeat+1)*(@o.duration+@o.delay) - @o.delay
    @props.endTime     = @props.startTime + @props.totalDuration
    @isStarted = true
    if !@isOnStartFired then @o.onStart?.apply(@); @isOnStartFired = true
    @

  update:(time)->
    if (time > @props.startTime) and (time < @props.endTime)
      @o.isIt and console.log 'a'
      @props.elapsed = time - @props.startTime
      # in the first repeat or without any repeats
      if @props.elapsed < @o.duration
        @progress = @props.elapsed/@o.duration
      else # far in the repeats
        start = @props.startTime
        isFlip = false
        while(start <= time)
          isFlip = !isFlip
          start += if isFlip then @o.duration else @o.delay
        # is in start point + duration
        if isFlip
          start = start - @o.duration
          @props.elapsed = time - start
          @progress = @props.elapsed/@o.duration
        # is in start point + delay
        else @progress = 0
    else
      @props.elapsed = @props.endTime - @props.startTime
      @progress = 1
      return true

    # if time >= @props.currEndTime and time < @props.endTime
    #   if @o.repeat
    #     @o.repeat--; @o.yoyo and (@isReversed = !@isReversed)

    # @props.elapsed = time - @props.startTime
    # @onUpdate? @getProgress()
    # @o.isIt and
    # if time >= @props.endTime
    #   @props.elapsed = @o.duration
    #   if !@isCompleted then @o.onComplete?.apply(@); @isCompleted = true
    #   return true

  # getProgress:->
  #   progress = Math.min (@props.elapsed/@o.duration), 1
  #   if @isReversed and progress isnt 1 then 1-progress else progress

  # tick:(step=1)->
  #   @props.totalElapsed += step
  #   if @props.totalElapsed <= @props.delaySteps
  #     @props.delayElapsed += step
  #   else
  #     if !@isStarted
  #       @o.onStart?.apply(@); @isStarted = true

  #     addition = if @props.delayElapsed < @props.delaySteps
  #       step - (@props.delaySteps - @props.delayElapsed)
  #     else step
  #     @props.delayElapsed = @props.delaySteps
  #     @props.durationElapsed += addition
      
  #     @progress = @getProgress()
  #     @onUpdate?(@progress)

  #     if @props.durationElapsed >= @props.durationSteps
  #       @props.durationElapsed = @props.durationSteps
  #       if !@isCompleted
  #         if @o.repeat then @handleRepeat()
  #         else
  #           @o.onComplete?.apply(@); @isCompleted = true


#   handleRepeat:->
#     @props.delayElapsed    = 0
#     @props.durationElapsed = 0
#     @props.totalElapsed    = 0
#     @o.yoyo and (@isReversed = !@isReversed)
#     @o.repeat--; @isCompleted = false

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "Tween", [], -> Tween
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = Tween
### istanbul ignore next ###
window?.mojs ?= {}
window?.mojs.Tween = Tween


