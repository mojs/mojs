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
    @_vars()
    
    # console.time 'pre sample'
    @_preSample()
    # console.timeEnd 'pre sample'
    @
  # ---

  # Method to create variables
  # @method _vars
  _vars:->
    @_stepsCount = 5000; @_step = 1/@_stepsCount
    @_boundsPrevProgress = -1
    @_eps = @_step/2

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
    @_boundsStartIndex ?= 0
    # console.log p, parseInt((p*5000)), array[parseInt((p*4000))-1].point.x/100
    # console.log @_boundsStartIndex
    # loop thru the array from the @_boundsStartIndex
    for i in [@_boundsStartIndex..len]
      value = array[i]
      # save the latest smaller value as start value
      # console.log "pointX: #{value.point.x}", p, i
      if value.point.x/@rect < p
        start = value
        index = if @_boundsPrevProgress < p then i else 0
        # console.log  @_boundsPrevProgress < p, @_boundsPrevProgress, p
        @_boundsStartIndex = index
        # console.log index
      # save the first larger value as end value
      # and break immediately
      else end = value; break
    @_boundsPrevProgress = p
    start: start, end: end
  # ---

  # Loop thru path trying to find the most closer x
  # compared to current progress value
  # 
  # @method sample
  # @param  {Number} easing progress in range [0,1]
  # @return {Number} easing y
  sample:(p)->
    # console.time 'sample'
    p = h.clamp p, 0, 1
    bounds = @_findBounds @_samples, p
    # console.log bounds.start.point.x/@rect, p
    # check if start bound is close enough
    if h.closeEnough p, bounds.start.point.x/@rect, @_eps
      # console.timeEnd 'sample'
      # console.log 'start is close enough'
      return @_resolveY(bounds.start.point)
    # console.log bounds.end.point.x/@rect, p
    # check if end bound is close enough
    if h.closeEnough p, bounds.end.point.x/@rect, @_eps
      # console.timeEnd 'sample'
      # console.log 'end is close enough'
      return @_resolveY(bounds.end.point)

    # at the end hard sample
    res = @_hardSample p, bounds.start.length, bounds.end.length
    # console.timeEnd 'sample'
    res
  # ---
  
  # @method _hardSample
  # @param {Number} p: progress
  # @param {Number} start
  # @param {Number} end
  # @param {Number} precision
  # 
  # @return {Number} y value for the progress
  _hardSample:(p, start, end, precision = @precision, i=0)->
    # debugger
    center = start+((end-start)/2)
    point  = @path.getPointAtLength (center)
    rect = @rect; x = point.x/rect
    
    if h.closeEnough p, x, @_eps
      # console.log("eps: #{i+1}", Math.abs(p - x), @_eps)
      return @_resolveY(point)
    # orient is point.x
    if p > x then newStart = center; newEnd = end
    else if p < x then newStart = start; newEnd = center
    else
      # console.log("equal: #{i}")
      return @_resolveY(point)
    
    # if precise enough then return result
    if --precision < 1
      # console.log("precision: #{i}", Math.abs(p - x))
      return @_resolveY(point)
    # else sample further
    else @_hardSample p, newStart, newEnd, precision, i+1
  # ---

  # 
  # 
  # @method resolveY
  # @param  {Object} SVG point
  # @return {Number} normalized y
  _resolveY:(point)-> 1 - (point.y/@rect)
  # ---

  # Create new instance of PathEasing with specified parameters
  # *Please see the docs for PathEasing for more details on params.*
  # 
  # @method create
  # @param  {String, DOMNode} path
  # @return {Object} easing y
  create:(path, o)-> (new PathEasing(path, o)).sample

module.exports = PathEasing
