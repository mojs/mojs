require '../polyfills/raf'
require '../polyfills/performance'

h = require '../h'

class Tweener
  constructor:-> @vars(); @
  vars:-> @tweens = []; @loop = h.bind @loop, @
  loop:->
    return if !@isRunning
    time  = Date.now(); @update time
    if !@tweens.length then return @isRunning = false
    requestAnimationFrame @loop
    @
  startLoop:->
    return if @isRunning; @isRunning = true
    requestAnimationFrame @loop
  stopLoop:-> @isRunning = false
  update:(time)->
    i = @tweens.length
    while(i--)
      @remove(i) if @tweens[i].update(time) is true
  add:(tween)-> @tweens.push(tween); @startLoop()
  # cover
  removeAll:-> @tweens.length = 0
  remove:(tween)->
    index = if typeof tween is 'number' then tween
    else @tweens.indexOf tween
    if index isnt -1 then @tweens.splice index, 1

t = new Tweener
### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "tweener", [], -> t
### istanbul ignore next ###
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = t
### istanbul ignore next ###
window?.mojs ?= {}
### istanbul ignore next ###
window?.mojs.tweener = t