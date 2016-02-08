h        = require './h'
Tween    = require './tween/tween'
Timeline = require './tween/timeline'

# ## Spriter
# Class for toggling opacity on bunch of elements
#
# @class Spriter
# @todo
#   - add isForce3d option
#   - add run new option merging
#   - add then chains
class Spriter
  # ---
  # ### Defaults/APIs
  # ---
  _defaults:
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
    
    # isRunLess option prevents animation from running immediately after
    # initialization.
    # 
    # @property isRunLess
    # @type     {Boolean}
    isRunLess:  false
    # ---
    
    # isShowEnd option defines if the last frame should be shown when
    # animation completed.
    # 
    # 
    # @property isShowEnd
    # @type     {Boolean}
    isShowEnd:  false
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
    @_vars(); @_extendDefaults(); @_parseFrames()
    if @_frames.length <= 2
      h.warn("Spriter: only #{@_frames.length} frames found")
    if @_frames.length < 1
      h.error("Spriter: there is no frames to animate, aborting")
    @_createTween()
    @
  _vars:->
    @_props = h.cloneObj(@o)
    @el = @o.el
    @_frames = []
  # ---

  # Method to run the spriter on demand
  # 
  # @method run
  # @param  {Object} New options
  # @todo   Implement new object merging
  run:(o)-> @timeline.play()
  # ---

  # Method to extend _props by options(this.o)
  # 
  # @method _extendDefaults
  _extendDefaults:-> h.extend(@_props, @_defaults)
  # ---

  # Method to parse frames as child nodes of el
  # 
  # @method _extendDefaults
  _parseFrames:->
    @_frames = Array::slice.call @el.children, 0
    for frame, i in @_frames
      frame.style.opacity = 0
    @_frameStep = 1/@_frames.length
  # ---

  # Method to create tween and timeline and supply callbacks
  # 
  # @method _createTween
  _createTween:->
    @_tween = new Tween
      duration:   @_props.duration
      delay:      @_props.delay
      yoyo:       @_props.yoyo
      repeat:     @_props.repeat
      easing:     @_props.easing
      onStart:    => @_props.onStart?()
      onComplete: => @_props.onComplete?()
      onUpdate:  (p)=> @_setProgress(p)
    @timeline = new Timeline; @timeline.add(@_tween)
    !@_props.isRunLess and @_startTween()
  # ---

  # Method to start tween
  # 
  # @method _startTween
  _startTween:-> setTimeout (=> @timeline.play()), 1
  # ---

  # Method to set progress of the sprite
  # 
  # @method _setProgress
  # @param  {Number} Progress in range **[0,1]**
  _setProgress:(p)->
    # get the frame number
    proc = Math.floor (p / @_frameStep)
    # react only if frame changes
    if @_prevFrame isnt @_frames[proc]
      # if previous frame isnt current one, hide it
      @_prevFrame?.style.opacity = 0
      # if end of animation and isShowEnd flag was specified
      # then show the last frame else show current frame
      currentNum = if p is 1 and @_props.isShowEnd then proc-1 else proc
      # show the current frame
      @_frames[currentNum]?.style.opacity = 1
      # set previous frame as current
      @_prevFrame = @_frames[proc]
    @_props.onUpdate? p






module.exports = Spriter