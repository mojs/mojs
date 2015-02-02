h = require './h'
t = require './tweener'

class Tween
  t: t
  constructor:(@o={})-> @vars(); @
  vars:->
    @timelines = []; @duration = 0; @props = {}
    @loop = h.bind @loop, @
    @onUpdate = @o.onUpdate
  add:(timeline)->
    @timelines.push timeline
    @duration = Math.max timeline.props.totalTime, @duration
  update:(time)->
    return if @isCompleted

    i = @timelines.length
    while(i--)
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
    @t.add @

  getDimentions:-> @startTime = Date.now(); @endTime = @startTime + @duration

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "Tween", [], -> Tween
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = Tween
### istanbul ignore next ###
window?.mojs ?= {}
window?.mojs.Tween = Tween

