# ignore coffescript sudo code
### istanbul ignore next ###
h = require './h'

class Staggler
  # ---

  # Method to get an option by modulo and name.
  # @param {String} Name of the property to get.
  # @param {Number} Index for the modulo calculation.
  # @param {Object} Options hash to look in.
  # @return {Any} Property.
  _getOptionByMod:(name, i, store)->
    props = store[name]
    if h.isArray(props) then props[i % props.length] else props
  # ---

  # Method to get option by modulo of index.
  # @param {Number} Index for modulo calculations.
  # @param {Object} Options hash to look in.
  _getOptionByIndex:(i, store)->
    options = {}
    for key, value of store
      options[key] = @_getOptionByMod key, i, store
    options


module.exports = Staggler