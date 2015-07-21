# ignore coffescript sudo code
### istanbul ignore next ###
h = require './h'
Timeline = require './tween/timeline'

class Staggler
  # ---

  # Method to get an option by modulo and name.
  # @param {String} Name of the property to get.
  # @param {Number} Index for the modulo calculation.
  # @param {Object} Options hash to look in.
  # @return {Any} Property.
  _getOptionByMod:(name, i, store)->
    props = store[name]
    if props+'' is '[object NodeList]' then props = Array::slice.call props, 0
    value = if h.isArray(props) then props[i % props.length] else props
    
    if typeof value is 'string' and value.match /stagger/g
      value = h.parseStagger(value, i)
    value
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
    quantifier = store[name]
    if h.isArray(quantifier) then quantifier.length
    else if quantifier+'' is '[object NodeList]' then quantifier.length
    else if quantifier instanceof HTMLElement then 1
    else if typeof quantifier is 'string'     then 1
  # ---

  # Method to create timeline.
  _createTimeline:-> @timeline = new Timeline
  # ---

  # Method to make stagger form options
  # @param {Object} Options.
  # @param {Object} Child class.
  init:(options, Module)->
    count = @_getChildQuantity 'el', options
    @_createTimeline(); @childModules = []
    for i in [0...count]
      # get child module's option
      option = @_getOptionByIndex(i, options); option.isRunLess = true
      # create child module
      module = new Module(option); @childModules.push module
      # add child module's timeline to the self timeline
      @timeline.add module.timeline
    @
  # ---

  # Method to start timeline.
  run:-> @timeline.start()

module.exports = Staggler