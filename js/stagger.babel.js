import h from './h';
import Timeline from './tween/timeline';

class Stagger {
  constructor(options, Module) {
    return this.init(options, Module);
  }

  /*
    Method to get an option by modulo and name.
    @param {String} Name of the property to get.
    @param {Number} Index for the modulo calculation.
    @param {Object} Options hash to look in.
    @return {Any} Property.
  */
  _getOptionByMod(name, i, store) {
  	var props = store[name];
  	// if not dom list then clone it to array
  	if (props + '' === '[object NodeList]' || props + '' === '[object HTMLCollection]')
	    props = Array.prototype.slice.call(props, 0);
    // get the value in array or return the value itself
    var value = h.isArray(props) ? props[i % props.length] : props;
    // check if value has the stagger expression, if so parse it
    return h.parseIfStagger(value, i);
  }

  /*
    Method to get option by modulo of index.
    @param {Number} Index for modulo calculations.
    @param {Object} Options hash to look in.
  */
  _getOptionByIndex(i, store) {
  	var options = { };
  	Object.keys(store).forEach(key =>
  	  options[key] = this._getOptionByMod(key, i, store));
  	return options;
  }

  /*
    Method to get total child modules quantity.
    @param  {String} Name of quantifier in options hash.
    @param  {Object} Options hash object.
    @return {Number} Number of child object that should be defined.
  */
  _getChildQuantity(name, store) {
  	// if number was set
  	if (typeof name === 'number')
  	  return name;

  	var quantifier = store[name];
  	if (h.isArray(quantifier))
  	  return quantifier.length;
  	else if (quantifier + '' === '[object NodeList]')
  	  return quantifier.length;
  	else if (quantifier + '' === '[object HTMLCollection]')
  	  return Array.prototype.slice.call(quantifier, 0).length;
  	else if (quantifier instanceof HTMLElement)
  	  return 1;
  	else if (typeof quantifier == 'string')
  	  return 1;
  }

  /*
    Method to create timeline.
    @param {Object} Options. ** default ** empty object.
  */
  _createTimeline(options = { }) {
  	this.timeline = new Timeline({
      onStart:           options.onStaggerStart,
      onUpdate:          options.onStaggerUpdate,
      onComplete:        options.onStaggerComplete,
      onReverseComplete: options.onStaggerReverseComplete,
      delay:             options.moduleDelay,
  	})
  }

  /*
    Method to make stagger form options
    @param {Object} Options.
    @param {Object} Child class.
  */
  init(options, Module) {
  	var count = this._getChildQuantity(options.quantifier || 'el', options);
  	this._createTimeline(options); this.childModules = [ ]
  	for (var i = 0; i < count; i ++) {
  	  // get child module's option
      var option = this._getOptionByIndex(i, options); option.isRunLess = true;
      // create child module
      var module = new Module(option); this.childModules.push(module);
      // add child module's timeline to the self timeline
      this.timeline.add(module);
  	}
  	return this;
  }

  /*
    Method to start timeline.
  */
  run() {
  	this.timeline.play();
  }
}

module.exports = function(Module) {
  return options => new Stagger(options, Module);
};