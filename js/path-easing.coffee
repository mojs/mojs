h = require './h'

# ## PathEasing
# Class allows you to specify custom easing function
# by **SVG path** [line commands](http://goo.gl/LzvV6P).
# Line commands should by in range of rect 100x100.
# @param {String, DOMNode}
# @param {Object} options  
#   - precision {Number} Presicion for the output,
#     defines amount of samples for the sample function. *default: 24*
#   - rect      {Number} The largest
#     number SVG path coordinates can have *default: 100*
class PathEasing
  constructor:(path, o={})->
    # the class can work as a "creator" of self instances
    # so no need to init if 'creator' passed insted of path
    return if path is 'creator'
    @path = h.parsePath(path)
    return h.error 'Error while parsing the path' if !@path?
    @pathLength = @path?.getTotalLength()
    @precision = o.precision or 100; @rect = o.rect or 100
    @sample = h.bind(@sample, @)
    @_hardSample = h.bind(@_hardSample, @)
    @_eps = 0.001
    
    # console.time 'pre sample'
    @_preSample()
    # console.timeEnd 'pre sample'
    @

  _preSample:->
    @_samples = {}

    @_fixed = 3
    stepsCount = 1000; step = 1/stepsCount; progress = 0
    for i in [0..stepsCount]
      y = @path.getPointAtLength(@pathLength*progress).y
      # divide y by rect value and invert it
      @_samples[progress] = 1 - (y/@rect)
      progress += step
      # fix decimal fraction issue
      progress = parseFloat progress.toFixed(@_fixed)

  # # ---

  # # Loop thru path trying to find the most closer x
  # # compared to current progress value
  # # 
  # # @method sample
  # # @param  {Number} easing progress in range [0,1]
  # # @return {Number} easing y
  # sample:(p)->
  #   p = h.clamp p, 0, 1
  #   # if there is sampled value, then use it
  #   sampled = @_samples[p]
  #   return sampled if sampled?
  #   # if there is no sampled value,
  #   # find the nearest start and end values
  #   #   nearest start:
  #   startKey = parseFloat(p.toFixed(@_fixed)); endKey = 1
  #   # if startKey compared to progress is about the same (_eps)
  #   # return the startKey right here
  #   keys = Object.keys(@_samples)
  #   # we called toFixed(2) to be sure that we have the sampled value
  #   # in _samples object but we need to check now, if startKey was rounded
  #   # to larger number, for instance .705 will coerce .71 and it is larger
  #   # then the progress itself so, decrease the startIndex value by 1 
  #   if startKey > p
  #     startObject = @_findSmaller(keys, startKey)
  #     startKey   = startObject.value; startIndex = startObject.index
  #   else startIndex = keys.indexOf(startKey+'')
  #   # return @_samples[startKey] if Math.abs(startKey - p) < @_eps
  #   endKey   = @_findLarger(keys, p, startIndex)
  #   # if endKey compared to progress is about the same (_eps)
  #   # return the startKey right here
  #   # return @_samples[endKey] if Math.abs(endKey - p) < @_eps

  #   # console.log p, startKey, endKey
  #   # console.time 'hard sample'
  #   console.log ''
  #   console.log 'start ->>>'
  #   console.log p, startKey, endKey
  #   @_hardSample p, startKey, endKey
  #   # console.timeEnd 'hard sample'


  # # ---
  
  # # @method _hardSample
  # # @param {Number} p: progress
  # # @param {Number} start
  # # @param {Number} end
  # # @param {Number} precision
  # # 
  # # @return {Number} y value for the progress
  # _hardSample:(p, start, end, precision = @precision, i=0)->
  #   # debugger
  #   # console.log 'step'
  #   center = start+((end-start)/2)
  #   # console.log "#{i+1}: ", start, end, center
  #   point  = @path.getPointAtLength (@pathLength*center)
  #   rect = @rect
    
  #   # @isIt and console.log center, rect*p - point.x
  #   if Math.abs(p - (point.x/100)) < @_eps
  #     # console.log("eps: #{i}", Math.abs(rect*p - point.x))
  #     return 1 - point.y/rect
  #   # orient is point.x
  #   if p > point.x/100      then newStart = center; newEnd = end
  #   else if p < point.x/100 then newStart = start; newEnd = center
  #   else
  #     # console.log("equal: #{i}")
  #     return 1 - point.y/rect
    
  #   # if precise enough then return result
  #   if --precision < 1
  #     # console.log("precision: #{i}", Math.abs(p - (point.x/100)))
  #     return 1 - point.y/rect
  #   # else sample further
  #   else @_hardSample p, newStart, newEnd, precision, i+1
  # # ---

  # # @method _findSmaller
  # # @param  {Array}  array of keys
  # # @param  {Number} value to start from
  # # @param  {Number, Null} index to start from
  # # @return {Object}
  # #         - value: smaller key value
  # #         - index: it's index in array
  # _findSmaller:(array, value, startIndex)->
  #   # find the index of the value
  #   if !startIndex?
  #     startIndex = array.indexOf(value+'')
  #   # return the smallest value possible if nothing was found
  #   return {value: 0, index: 0} if startIndex <= 0
    
  #   currentValue = array[startIndex-1]
  #   if currentValue < value
  #     return {value: parseFloat(currentValue), index: startIndex-1}
  #   else @_findSmaller array, value, startIndex-1
  # # ---

  # # @method _findLarger
  # # @param  {Array}  array of keys
  # # @param  {Number} value to start from
  # # @param  {Number, Null} index to start from
  # # @return {String} larger key
  # _findLarger:(array, value, startIndex)->
  #   if !startIndex? then startIndex = array.indexOf(value+'')
  #   return 1 if startIndex >= array.length or startIndex <= 0
  #   currentValue = array[startIndex+1]
  #   if currentValue > value then return parseFloat(currentValue)
  #   else @_findLarger array, value, startIndex+1
  # ---

  # Create new instance of PathEasing with specified parameters
  # *Please see the docs for PathEasing for more details on params.*
  # 
  # @method create
  # @param  {String, DOMNode} path
  # @return {Object} easing y
  create:(path, o)-> (new PathEasing(path, o)).sample

module.exports = PathEasing
