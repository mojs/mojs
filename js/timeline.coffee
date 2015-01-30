h = require './h'

class Timeline
  defaults:
    duration: 600
    delay:    0
    repeat:   0
    yoyo:     false
    durationElapsed:  0
    delayElapsed:     0
    onStart:          null
    onComplete:       null
  constructor:(@o={})-> @extendDefaults(); @vars(); @
  vars:->
    @h = h; @props = {}; @progress = 0
    @props.totalTime     = (@o.repeat+1)*(@o.duration+@o.delay)
    @props.totalDuration = @props.totalTime - @o.delay
  extendDefaults:-> h.extend(@o, @defaults); @onUpdate = @o.onUpdate
  start:(time)->
    @isCompleted = false; @isStarted = false
    @props.startTime = (time or Date.now()) + @o.delay
    @props.endTime   = @props.startTime + @props.totalDuration
    @
  update:(time)->
    # easings = h.splitEasing(@props.easing)
    # ease = if typeof easings is 'function' then easings
    # else TWEEN.Easing[easings[0]][easings[1]]
    if (time >= @props.startTime) and (time < @props.endTime)
      if !@isStarted then @o.onStart?.apply(@); @isStarted = true
      elapsed = time - @props.startTime
      # in the first repeat or without any repeats
      if elapsed <= @o.duration
        @progress = elapsed/@o.duration
      else # far in the repeats
        start = @props.startTime
        isFlip = false; cnt = 0
        while(start <= time)
          isFlip = !isFlip
          start += if isFlip then cnt++; @o.duration else @o.delay
        # is in start point + duration
        if isFlip
          start = start - @o.duration
          elapsed = time - start
          @progress = elapsed/@o.duration
          # yoyo
          if @o.yoyo and @o.repeat
            @progress = if cnt % 2 is 1 then @progress
            # when reversed progress of 1 should be 0
            else 1-if @progress is 0 then 1 else @progress
        # is in start point + delay
        else @progress = 0
      @onUpdate? @progress
    else
      if time >= @props.endTime and !@isCompleted
        (@o.onComplete?.apply(@); @isCompleted = true)
        @progress = 1; @onUpdate? @progress

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "Timeline", [], -> Timeline
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = Timeline
### istanbul ignore next ###
window?.mojs ?= {}
window?.mojs.Timeline = Timeline


