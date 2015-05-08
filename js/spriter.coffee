h = require './h'

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
    # ---
    
    # Repeat times count
    # 
    # @property repeat
    # @type     {Number}
    repeat:     0
    # ---
    
    # Yoyo option defines if animation should be altered on repeat.
    # 
    # @property yoyo
    # @type     {Boolean}
    yoyo:       false
    # ---
    
    # onStart callback will be called once on animation start.
    # 
    # @property onStart
    # @type     {Function}
    onStart:    null
    # ---
    
    # onUpdate callback will be called on every frame of the animation.
    # The current progress in range **[0,1]** will be passed to the callback.
    # 
    # @property onUpdate
    # @type     {Function}
    onUpdate:   null
    # ---
    
    # onComplete callback will be called once on animation complete.
    # 
    # @property onComplete
    # @type     {Function}
    onComplete: null

  constructor:(@o={})->
    return h.error('No "el" option specified, aborting') if !@o.el?
    @_vars(); @_extendDefaults(); @
  _vars:->
    @_props ?= {}
    @el = @o.el
    
  # ---

  # Method to extend _props by options(this.o)
  # 
  # @method _extendDefaults
  _extendDefaults:-> h.extend(@_props, @o)




module.exports = Spriter