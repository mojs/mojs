h = require './h'

class Tween
  constructor:(@o={})-> @vars(); @
  vars:->
    @timelines = []; @duration = 0
    @loop = h.bind @loop, @
  add:(timeline)->
    @timelines.push timeline
    @duration = Math.max timeline.props.totalTime, @duration
  update:(time)->
    i = @timelines.length
    while(i--)
      @timelines[i].update time
    false
  start:->
    @startTime = Date.now(); @endTime = @startTime + @duration
    i = @timelines.length; @o.onStart?.apply @
    while(i--)
      @timelines[i].start @startTime
    @startLoop()

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "Tween", [], -> Tween
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = Tween
### istanbul ignore next ###
window?.mojs ?= {}
window?.mojs.Tween = Tween


