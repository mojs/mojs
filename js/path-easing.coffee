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
    @precision = o.precision or 10; @rect = o.rect or 100
    @sample = h.bind(@sample, @)
    @_hardSample = h.bind(@_hardSample, @)
    @_eps = 0.0001
    @_vars()
    
    # console.time 'pre sample'
    @_preSample()
    # console.timeEnd 'pre sample'
    @
  # ---

  # Method to create variables
  # @method _vars
  _vars:-> @_stepsCount = 1000; @_step = 1/@_stepsCount

  _preSample:->
    @_samples = []
    for i in [0..@_stepsCount]
      progress = i*@_step
      length = @pathLength*progress
      point = @path.getPointAtLength(length)
      @_samples[i] = point: point, length: length, progress: progress
  # ---

  # @method _findBounds
  # @param  {Array}   to search in
  # @param  {Number}  progress to search for
  # @return {Object}
  #         - start {Number}: lowest boundry
  #         - end   {Number}: highest boundry
  _findBounds:(array, p)->
    start = 0; end = null
    len = array.length
    # get the start index in the array
    startIndex = parseInt p*1000
    # loop thru the array from the startIndex
    for i in [startIndex..len]
      value = array[i]
      # save the latest smaller value as start value
      if value.progress < p
        start = value
      # save the first larger value as end value
      # and break immediately
      else end = value; break
    start: start, end: end
  # ---

  # Loop thru path trying to find the most closer x
  # compared to current progress value
  # 
  # @method sample
  # @param  {Number} easing progress in range [0,1]
  # @return {Number} easing y
  sample:(p)->
    p = h.clamp p, 0, 1
    bounds = @_findBounds @_samples, p
    @_hardSample p, bounds.start.length, bounds.end.length

  # ---
  
  # @method _hardSample
  # @param {Number} p: progress
  # @param {Number} start
  # @param {Number} end
  # @param {Number} precision
  # 
  # @return {Number} y value for the progress
  _hardSample:(p, start, end, precision = @precision, i=0)->
    center = start+((end-start)/2)
    point  = @path.getPointAtLength (center)
    rect = @rect; x = point.x/rect
    
    if Math.abs(p - x) < @_eps
      # console.log("eps: #{i}", Math.abs(rect*p - point.x))
      return 1 - point.y/rect
    # orient is point.x
    if p > x then newStart = center; newEnd = end
    else if p < x then newStart = start; newEnd = center
    else
      # console.log("equal: #{i}")
      return 1 - point.y/rect
    
    # if precise enough then return result
    if --precision < 1
      # console.log("precision: #{i}", Math.abs(p - x))
      return 1 - point.y/rect
    # else sample further
    else @_hardSample p, newStart, newEnd, precision, i+1
  # ---

  # Create new instance of PathEasing with specified parameters
  # *Please see the docs for PathEasing for more details on params.*
  # 
  # @method create
  # @param  {String, DOMNode} path
  # @return {Object} easing y
  create:(path, o)-> (new PathEasing(path, o)).sample

module.exports = PathEasing
