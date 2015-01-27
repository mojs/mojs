h         = require './h'

class Tween
  defaults:
    duration: 600
    delay:    0
    yoyo:     false
    durationElapsed:  0
    delayElapsed:     0
    repeat:           0
    onStart:          null
    onComplete:       null
  constructor:(@o={})-> @vars(); @extendDefaults()
  vars:->
    @h = h; @progress = 0
    @props =
      totalElapsed:     0
      durationElapsed:  0
      delayElapsed:     0
  extendDefaults:-> @h.extend(@o, @defaults); @onUpdate = @o.onUpdate
  start:->
    @props.startTime = Date.now() + @o.delay
    @props.endTime = @props.startTime + @o.duration
    @isStarted = true
    if !@isOnStartFired then @o.onStart?.apply(@); @isOnStartFired = true
    @

  update:(time)->
    if time > @props.endTime
      return true
    else @props.elapsed = time - @props.startTime



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
#   getProgress:->
#     progress = Math.min (@props.durationElapsed/@props.durationSteps), 1
#     if @isReversed then 1-progress else progress

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


