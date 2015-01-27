# h = require './h'

# class Timeliner
#   constructor:(@o={})-> @vars()
#   vars:-> @timelines = []

#   removeAll:-> @timelines.length = 0; @stopLoop()
#   add:(timeline)->
#     # @loop = @loop.bind @
#     @timelines.push timeline
#     @startLoop()
#   remove:(timeline)->
#     index = @timelines.indexOf timeline
#     (index isnt -1) and @timelines.splice index, 1
#   loop:->
#     return t if !t.isRunning
#     if t.timelines.length is 0 then t.stopLoop(); return
#     t.update()
#     requestAnimationFrame t.loop
#     @
#   update:->
#     len = @timelines.length
#     while(len--)
#       timeline = @timelines[len]
#       timeline.tick(); timeline.isCompleted and @remove timeline

#   startLoop:->
#     return if @isRunning; @isRunning = true
#     requestAnimationFrame(t.loop)
#   stopLoop:-> @isRunning = false

# t = new Timeliner
# ### istanbul ignore next ###
# if (typeof define is "function") and define.amd
#   define "timeliner", [], -> t
# if (typeof module is "object") and (typeof module.exports is "object")
#   module.exports = t
# ### istanbul ignore next ###
# window?.mojs ?= {}
# window?.mojs.timeliner = t


