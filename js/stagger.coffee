# ignore coffescript sudo code
### istanbul ignore next ###
h = require './h'
Timeline = require './tween/timeline'

class Stagger
  constructor:(options, Module)-> @init options, Module
  # ---

  # Method to get an option by modulo and name.
  # @param {String} Name of the property to get.
  # @param {Number} Index for the modulo calculation.
  # @param {Object} Options hash to look in.
  # @return {Any} Property.
  _getOptionByMod:(name, i, store)->
    props = store[name]
    # if not dom list then clone it to array
    props = Array::slice.call props, 0 if props+'' is '[object NodeList]'
    props = Array::slice.call props, 0 if props+'' is '[object HTMLCollection]'
    # get the value in array or return the value itself
    value = if h.isArray(props) then props[i % props.length] else props
    # check if value has the stagger expression, if so parse it
    h.parseIfStagger(value, i)
  # ---

  # Method to get option by modulo of index.
  # @param {Number} Index for modulo calculations.
  # @param {Object} Options hash to look in.
  _getOptionByIndex:(i, store)->
    options = {}
    for key, value of store
      options[key] = @_getOptionByMod key, i, store
    options
  # ---

  # Method to get total child modules quantity.
  # @param  {String} Name of quantifier in options hash.
  # @param  {Object} Options hash object.
  # @return {Number} Number of child object that should be defined.
  _getChildQuantity:(name, store)->
    # if number was set
    return name if typeof name is 'number'

    quantifier = store[name]
    if h.isArray(quantifier) then quantifier.length
    else if quantifier+'' is '[object NodeList]' then quantifier.length
    else if quantifier+'' is '[object HTMLCollection]'
      ary = Array::slice.call quantifier, 0
      ary.length
    else if quantifier instanceof HTMLElement then 1
    else if typeof quantifier is 'string'     then 1
  # ---

  # Method to create timeline.
  # @param {Object} Options. ** default ** empty object.
  _createTimeline:(options={})->
    @timeline = new Timeline
      onStart:           options.onStaggerStart
      onUpdate:          options.onStaggerUpdate
      onComplete:        options.onStaggerComplete
      onReverseComplete: options.onStaggerReverseComplete
      delay:             options.moduleDelay
  # ---

  # Method to make stagger form options
  # @param {Object} Options.
  # @param {Object} Child class.
  init:(options, Module)->
    count = @_getChildQuantity options.quantifier or 'el', options
    @_createTimeline(options); @childModules = []
    for i in [0...count]
      # get child module's option
      option = @_getOptionByIndex(i, options); option.isRunLess = true
      # create child module
      module = new Module(option); @childModules.push module
      # add child module's timeline to the self timeline
      @timeline.add module
    @
  # ---

  # Method to start timeline.
  run:-> @timeline.start()

class StaggerWrapper
  constructor:(Module)->
    M = Module; return (options)-> new Stagger options, M

module.exports = StaggerWrapper