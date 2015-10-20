
/* istanbul ignore next */

(function() {
  var Stagger, StaggerWrapper, Timeline, h;

  h = require('./h');

  Timeline = require('./tween/timeline');

  Stagger = (function() {
    function Stagger(options, Module) {
      this.init(options, Module);
    }

    Stagger.prototype._getOptionByMod = function(name, i, store) {
      var props, value;
      props = store[name];
      if (props + '' === '[object NodeList]') {
        props = Array.prototype.slice.call(props, 0);
      }
      if (props + '' === '[object HTMLCollection]') {
        props = Array.prototype.slice.call(props, 0);
      }
      value = h.isArray(props) ? props[i % props.length] : props;
      return h.parseIfStagger(value, i);
    };

    Stagger.prototype._getOptionByIndex = function(i, store) {
      var key, options, value;
      options = {};
      for (key in store) {
        value = store[key];
        options[key] = this._getOptionByMod(key, i, store);
      }
      return options;
    };

    Stagger.prototype._getChildQuantity = function(name, store) {
      var ary, quantifier;
      if (typeof name === 'number') {
        return name;
      }
      quantifier = store[name];
      if (h.isArray(quantifier)) {
        return quantifier.length;
      } else if (quantifier + '' === '[object NodeList]') {
        return quantifier.length;
      } else if (quantifier + '' === '[object HTMLCollection]') {
        ary = Array.prototype.slice.call(quantifier, 0);
        return ary.length;
      } else if (quantifier instanceof HTMLElement) {
        return 1;
      } else if (typeof quantifier === 'string') {
        return 1;
      }
    };

    Stagger.prototype._createTimeline = function(options) {
      if (options == null) {
        options = {};
      }
      return this.timeline = new Timeline({
        onStart: options.onStaggerStart,
        onUpdate: options.onStaggerUpdate,
        onComplete: options.onStaggerComplete,
        onReverseComplete: options.onStaggerReverseComplete,
        delay: options.moduleDelay
      });
    };

    Stagger.prototype.init = function(options, Module) {
      var count, i, module, option, _i;
      count = this._getChildQuantity(options.quantifier || 'el', options);
      this._createTimeline(options);
      this.childModules = [];
      for (i = _i = 0; 0 <= count ? _i < count : _i > count; i = 0 <= count ? ++_i : --_i) {
        option = this._getOptionByIndex(i, options);
        option.isRunLess = true;
        module = new Module(option);
        this.childModules.push(module);
        this.timeline.add(module);
      }
      return this;
    };

    Stagger.prototype.run = function() {
      return this.timeline.start();
    };

    return Stagger;

  })();

  StaggerWrapper = (function() {
    function StaggerWrapper(Module) {
      var M;
      M = Module;
      return function(options) {
        return new Stagger(options, M);
      };
    }

    return StaggerWrapper;

  })();

  module.exports = StaggerWrapper;

}).call(this);
