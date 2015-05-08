# ## Spriter
# Class for toggling opacity on bunch of elements
#
# @class Spriter
class Spriter
  # ---
  # ### Defaults/APIs
  # ---
  defaults:
    # Duration
    # 
    # @property duration
    # @type     {Number}
    duration:   500
    # ---
    
    # Delay
    # @property delay
    # @type     {Number}
    delay:      0
    # ---
    
    # Easing. Please see the 
    # [timeline module parseEasing function](timeline.coffee.html#parseEasing)
    # for all avaliable options.
    # 
    # @property easing
    # @type     {String, Function}
    easing:     'linear.none'



module.exports = Spriter