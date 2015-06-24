h = require './h'

# todo
#   - optimize _findBounds method caching for reverse order

# ## PathEasing
# Class allows you to specify custom easing function
# by **SVG path** [line commands](http://goo.gl/LzvV6P).
# Line commands should by in range of rect 100x100.
# @param {String, DOMNode}
# @param {Object} options
#   - eps  {Number}  Epsilon specifies how precise we
#     should be when sampling the path. Smaller number - more
#     precise is computation, but more CPU power it takes *default: 0.001*
#   - precompute {Number} Quantity of steps for sampling the path
#     on the init. In can be in *range of [1000, 10000]*.
#     Larger number specified - more time it takes to init the module,
#     but less time it takes during the animation. *default: 2000*
#   - rect {Number} The largest
#     number SVG path coordinates can have *default: 100*
#   - approximateMax {Number} Number of loops avaliable
#     when approximating the path value *default: 5*
class PathEasing
  # Method to create variables
  # @method _vars
  _vars:->
    # options
    @_precompute = h.clamp (@o.precompute or 2000), 100, 10000
    @_step = 1/@_precompute; @_rect = @o.rect or 100
    @_approximateMax = @o.approximateMax or 5
    @_eps = @o.eps or 0.001
    # util variables
    @_boundsPrevProgress = -1
  # ---

  # Constructor
  constructor:(path, @o={})->
    # the class can work as a "creator" of self instances
    # so no need to init if 'creator' passed insted of path
    return if path is 'creator'
    @path = h.parsePath(path)
    return h.error 'Error while parsing the path' if !@path?
    @pathLength = @path?.getTotalLength()
    @sample = h.bind(@sample, @)
    @_hardSample = h.bind(@_hardSample, @)
    @_vars()
    
    # console.time 'pre sample'
    @_preSample()
    # console.timeEnd 'pre sample'
    @
  # ---

  # Samples the path on init
  # 
  # @method _preSample
  # @sideEffect {Array} _samples - set of sampled points
  _preSample:->
    @_samples = []
    for i in [0..@_precompute]
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
    start = null; end = null
    len = array.length
    # get the start index in the array
    # reset the cached prev progress if new progress
    # is smaller then previous one or it is not defined
    @_boundsStartIndex = 0 if @_boundsPrevProgress > p or !@_boundsStartIndex?
    # loop thru the array from the @_boundsStartIndex
    for i in [@_boundsStartIndex..len]
      value = array[i]
      # save the latest smaller value as start value
      if value.point.x/@_rect < p
        start = value
        # cache the bounds start index for further usage
        @_boundsStartIndex = i if @_boundsPrevProgress < p
      # save the first larger value as end value
      # and break immediately
      else end = value; break
    @_boundsPrevProgress = p
    start ?= array[0]
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
    res = @_checkIfBoundsCloseEnough(p, bounds); return res if res?
    @_findApproximate p, bounds.start, bounds.end
  # ---

  # Check if one of bounds.start or bounds.end
  # is close enough to searched progress
  # 
  # @method _checkIfBoundsCloseEnough
  # @param  {Number} progress
  # @param  {Object} bounds
  # @return {Number, Undefined} returns Y value if true, undefined if false
  _checkIfBoundsCloseEnough:(p, bounds)->
    point = undefined
    # check if start bound is close enough
    y = @_checkIfPointCloseEnough p, bounds.start.point
    return y if y?
    # check if end bound is close enough
    @_checkIfPointCloseEnough p, bounds.end.point
  # ---

  # Check if bound point close enough to progress
  # 
  # @method _checkIfPointCloseEnough
  # @param  {Number} progress
  # @param  {Object} bound point (start or end)
  # @return {Number, Undefined} returns Y value if true, undefined if false
  _checkIfPointCloseEnough:(p, point)->
    @_resolveY(point) if h.closeEnough p, point.x/@_rect, @_eps
  # ---

  # @method _approximate
  # @param  {Object} start point object
  # @param  {Object} end point object
  # @param  {Number} progress to search
  # @return {Object} approximation
  _approximate:(start, end, p)->
    deltaP = end.point.x - start.point.x
    percentP = (p - (start.point.x/100))/(deltaP/100)
    start.length + percentP*(end.length - start.length)
  # ---

  # @method _findApproximate
  # @param  {Number} progress to search for
  # @param  {Object} start point object
  # @param  {Object} end point object
  # @return {Number} y approximation
  _findApproximate:(p, start, end, approximateMax = @_approximateMax)->
    approximation = @_approximate start, end, p
    point = @path.getPointAtLength(approximation); x = point.x/100
    # if close enough resolve the y value
    if h.closeEnough p, x, @_eps
      @_resolveY(point)
    else
      # if looping for a long time
      return @_resolveY(point) if (--approximateMax < 1)
      # not precise enough so we will call self
      # again recursively, lets find arguments for the call
      newPoint = {point: point, length: approximation}
      args = if p < x then [p, start, newPoint, approximateMax]
      else [p, newPoint, end, approximateMax]
      @_findApproximate.apply @, args
  # ---

  # 
  # 
  # @method resolveY
  # @param  {Object} SVG point
  # @return {Number} normalized y
  _resolveY:(point)-> 1 - (point.y/@_rect)
  # ---

  # Create new instance of PathEasing with specified parameters
  # *Please see the docs for PathEasing for more details on params.*
  # 
  # @method create
  # @param  {String, DOMNode} path
  # @return {Object} easing y
  create:(path, o)-> (new PathEasing(path, o)).sample

module.exports = PathEasing
