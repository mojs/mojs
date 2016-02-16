'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _h = require('./h');

var _h2 = _interopRequireDefault(_h);

var _tweenTimeline = require('./tween/timeline');

var _tweenTimeline2 = _interopRequireDefault(_tweenTimeline);

var Stagger = (function () {
  function Stagger(options, Module) {
    _classCallCheck(this, Stagger);

    return this.init(options, Module);
  }

  /*
    Method to get an option by modulo and name.
    @param {String} Name of the property to get.
    @param {Number} Index for the modulo calculation.
    @param {Object} Options hash to look in.
    @return {Any} Property.
  */

  _createClass(Stagger, [{
    key: '_getOptionByMod',
    value: function _getOptionByMod(name, i, store) {
      var props = store[name];
      // if not dom list then clone it to array
      if (props + '' === '[object NodeList]' || props + '' === '[object HTMLCollection]') props = Array.prototype.slice.call(props, 0);
      // get the value in array or return the value itself
      var value = _h2['default'].isArray(props) ? props[i % props.length] : props;
      // check if value has the stagger expression, if so parse it
      return _h2['default'].parseIfStagger(value, i);
    }

    /*
      Method to get option by modulo of index.
      @param {Number} Index for modulo calculations.
      @param {Object} Options hash to look in.
    */
  }, {
    key: '_getOptionByIndex',
    value: function _getOptionByIndex(i, store) {
      var _this = this;

      var options = {};
      Object.keys(store).forEach(function (key) {
        return options[key] = _this._getOptionByMod(key, i, store);
      });
      return options;
    }

    /*
      Method to get total child modules quantity.
      @param  {String} Name of quantifier in options hash.
      @param  {Object} Options hash object.
      @return {Number} Number of child object that should be defined.
    */
  }, {
    key: '_getChildQuantity',
    value: function _getChildQuantity(name, store) {
      // if number was set
      if (typeof name === 'number') {
        return name;
      }

      var quantifier = store[name];
      if (_h2['default'].isArray(quantifier)) {
        return quantifier.length;
      } else if (quantifier + '' === '[object NodeList]') {
        return quantifier.length;
      } else if (quantifier + '' === '[object HTMLCollection]') {
        return Array.prototype.slice.call(quantifier, 0).length;
      } else if (quantifier instanceof HTMLElement) {
        return 1;
      } else if (typeof quantifier == 'string') {
        return 1;
      }
    }

    /*
      Method to create timeline.
      @param {Object} Options. ** default ** empty object.
    */
  }, {
    key: '_createTimeline',
    value: function _createTimeline() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      this.timeline = new _tweenTimeline2['default']({
        onStart: options.onStaggerStart,
        onUpdate: options.onStaggerUpdate,
        onComplete: options.onStaggerComplete,
        onReverseComplete: options.onStaggerReverseComplete,
        delay: options.moduleDelay
      });
    }

    /*
      Method to make stagger form options
      @param {Object} Options.
      @param {Object} Child class.
    */
  }, {
    key: 'init',
    value: function init(options, Module) {
      var count = this._getChildQuantity(options.quantifier || 'el', options);
      this._createTimeline(options);this.childModules = [];
      for (var i = 0; i < count; i++) {
        // get child module's option
        var option = this._getOptionByIndex(i, options);option.isRunLess = true;
        // create child module
        var module = new Module(option);this.childModules.push(module);
        // add child module's timeline to the self timeline
        this.timeline.add(module);
      }
      return this;
    }

    /*
      Method to start timeline.
    */
  }, {
    key: 'run',
    value: function run() {
      this.timeline.play();
    }
  }]);

  return Stagger;
})();

module.exports = function (Module) {
  return function (options) {
    return new Stagger(options, Module);
  };
};