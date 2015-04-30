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
    @path = h.parsePath(path); @pathLength = @path?.getTotalLength()
    @precision = o.precision or 24; @rect = o.rect or 100
    @
  # ---

  # @method sample
  # @param  {Number} easing progress in range [0,1]
  # @return {Number} easing y
  sample:(p, start=0, end=1, precision=@precision)->
    p = h.clamp p, 0, 1
    center = start+((end-start)/2)
    point  = @path.getPointAtLength (@pathLength*center)

    rect = @rect
    if rect*p > point.x      then newStart = center; newEnd = end
    else if rect*p < point.x then newStart = start; newEnd = center
    else return 1 - point.y/rect
    
    return if --precision < 1 then 1 - point.y/rect
    else @sample p, newStart, newEnd, precision
  # ---

  # Create new instance of PathEasing with specified parameters
  # *Please see the docs for PathEasing for more details on params.*
  # 
  # @method create
  # @param  {String, DOMNode} path
  # @return {Object} easing y
  create:(path, o)-> (new PathEasing(path, o)).sample

module.exports = PathEasing
