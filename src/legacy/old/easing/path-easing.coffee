h = require '../h'

# ## PathEasing
# Class allows you to specify custom easing function
# by **SVG path** [line commands](http://goo.gl/LzvV6P).
# Line commands should by in range of rect 100x100.
# @param {String, DOMNode}
# @param {Object} options
#   - eps  {Number}  Epsilon specifies how precise we
#     should be when sampling the path. Smaller number - more
#     precise is computation, but more CPU power it takes *default: 0.001*
#   - precompute {Number} Quantity of steps for sampling specified path
#     on init. It can be in *range of [100, 10000]*.
#     Larger number specified - more time it takes to init the module,
#     but less time it takes during the animation. *default: 1450*
#   - rect {Number} The largest
#     number SVG path coordinates can have *default: 100*
#   - approximateMax {Number} Number of loops avaliable
#     when approximating the path value *default: 5*
class PathEasing
  # Method to create variables
  # @method _vars
  _vars:->
    # options
    @_precompute = h.clamp (@o.precompute or 1450), 100, 10000
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

    @_vars()
    # normalize start and end x value of the path
    @path.setAttribute 'd', @_normalizePath @path.getAttribute('d')

    @pathLength = @path.getTotalLength()

    @sample = h.bind(@sample, @)
    @_hardSample = h.bind(@_hardSample, @)
    
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
    return @_prevBounds if p is @_boundsPrevProgress
    # get the start index in the array
    # reset the cached prev index if new progress
    # is smaller then previous one or it is not defined
    @_boundsStartIndex ?= 0
    
    len = array.length
    # get start and end indexes of the loop and save the direction
    if @_boundsPrevProgress > p then loopEnd = 0; direction = 'reverse'
    else loopEnd = len; direction = 'forward'

    # set default start and end bounds to the
    # very first and the very last items in array
    if direction is 'forward' then start = array[0]; end = array[array.length-1]
    else start = array[array.length-1]; end = array[0]
      
    # loop thru the array from the @_boundsStartIndex
    for i in [@_boundsStartIndex...loopEnd]
      value = array[i]; pointX = value.point.x/@_rect; pointP = p
      # if direction is reverse swap pointX and pointP
      # for if statement
      if direction is 'reverse'
        buffer = pointX; pointX = pointP; pointP = buffer
        # the next statement is nicer but it creates
        # a new object, so bothers GC
        # {pointX, pointP} = {pointX: pointP, pointP: pointX}
      # save the latest smaller value as start value
      if pointX < pointP
        start = value; @_boundsStartIndex = i
      # save the first larger value as end value
      # and break immediately
      else end = value; break
    @_boundsPrevProgress = p
    # return the first item if start wasn't found
    # start ?= array[0]
    # end   ?= array[array.length-1]

    @_prevBounds = start: start, end: end
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
    percentP = (p - (start.point.x/@_rect)) / (deltaP/@_rect)
    start.length + percentP*(end.length - start.length)
  # ---

  # @method _findApproximate
  # @param  {Number} progress to search for
  # @param  {Object} start point object
  # @param  {Object} end point object
  # @return {Nunomber} y approximation
  _findApproximate:(p, start, end, approximateMax = @_approximateMax)->
    approximation = @_approximate start, end, p
    point = @path.getPointAtLength(approximation); x = point.x/@_rect
    # if close enough resolve the y value
    if h.closeEnough p, x, @_eps then @_resolveY(point)
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

  # @method resolveY
  # @param  {Object} SVG point
  # @return {Number} normalized y
  _resolveY:(point)-> 1 - (point.y/@_rect)
  # ---
  # 
  # Method to normalize path's X start and end value
  # since it must start at 0 and end at 100
  # @param  {String} Path coordinates to normalize
  # @return {String} Normalized path coordinates
  _normalizePath:(path)->
    # SVG path commands
    svgCommandsRegexp = /[M|L|H|V|C|S|Q|T|A]/gim
    points = path.split svgCommandsRegexp
    # remove the first empty item - it is always
    # empty cuz we split by M
    points.shift(); commands = path.match svgCommandsRegexp
    # normalize the x value of the start segment to 0
    startIndex = 0
    points[startIndex] = @_normalizeSegment points[startIndex]
    # normalize the x value of the end segment to _rect value
    endIndex = points.length-1
    points[endIndex] = @_normalizeSegment points[endIndex], @_rect or 100

    # form the normalized path
    normalizedPath = @_joinNormalizedPath commands, points

  # ---

  # Method to form normalized path.
  # @param {Array} Commands array.
  # @param {Array} Points array.
  # @return {String} Formed normalized path.
  _joinNormalizedPath:(commands, points)->
    normalizedPath = ''
    for command, i in commands
      space = if i is 0 then '' else ' '
      normalizedPath += "#{space}#{command}#{points[i].trim()}"

    normalizedPath

  # ---

  # Method to normalize SVG path segment
  # @param  {String} Segment to normalize.
  # @param  {Number} Value to normalize to.
  # @return {String} Normalized Segment.
  _normalizeSegment:(segment, value=0)->
    segment = segment.trim()
    nRgx = /(-|\+)?((\d+(\.(\d|\e(-|\+)?)+)?)|(\.?(\d|\e|(\-|\+))+))/gim
    pairs   = @_getSegmentPairs segment.match nRgx
    # get x value of the latest point
    lastPoint = pairs[pairs.length-1]
    x = lastPoint[0]; parsedX = Number x
    # if the x point isn't the same as value, set it to the value
    if parsedX isnt value
      # join pairs to form segment
      segment = ''; lastPoint[0] = value
      for point, i in pairs
        space = if i is 0 then '' else ' '
        segment += "#{space}#{point[0]},#{point[1]}"
    segment
  
  # Method to geather array values to pairs.
  # @param  {Array} Array to search pairs in.
  # @return {Array} Matrix of pairs.
  _getSegmentPairs:(array)->
    if array.length % 2 isnt 0
      h.error 'Failed to parse the path - segment pairs are not even.', array
    newArray = []
    # loop over the array by 2
    # and save the pairs
    for value, i in array by 2
      pair = [ array[i], array[i+1] ]
      newArray.push pair
    newArray

  # ---

  # Create new instance of PathEasing with specified parameters
  # *Please see the docs for PathEasing for more details on params.*
  # 
  # @method create
  # @param  {String, DOMNode} path
  # @return {Object} easing y
  create:(path, o)->
    handler = new PathEasing(path, o)
    handler.sample.path = handler.path;
    handler.sample

module.exports = PathEasing
