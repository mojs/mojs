'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _tweenTweenable = require('./tween/tweenable');

var _tweenTweenable2 = _interopRequireDefault(_tweenTweenable);

var _h = require('./h');

/*
  The Thenable class adds .then public method and
  the ability to chain API calls.
*/

var _h2 = _interopRequireDefault(_h);

var Thenable = (function (_Tweenable) {
  _inherits(Thenable, _Tweenable);

  function Thenable() {
    _classCallCheck(this, Thenable);

    _get(Object.getPrototypeOf(Thenable.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Thenable, [{
    key: 'then',

    /*
      Method to create a then record for the module.
      @public
      @param    {Object} Options for the next animation.
      @returns  {Object} this.
    */
    value: function then(o) {
      // return if nothing was passed
      if (o == null || !Object.keys(o)) {
        return 1;
      }
      // merge then options with the current ones
      var prevRecord = this._history[this._history.length - 1],
          prevModule = this._modules[this._modules.length - 1],
          merged = this._mergeThenOptions(prevRecord, o);

      this._resetMergedFlags(merged);
      // reset isShowEnd flag on prev module
      prevModule._setProp && prevModule._setProp('isShowEnd', false);
      // create a submodule of the same type as the master module
      var module = new this.constructor(merged);
      // save the modules to the _modules array
      this._modules.push(module);
      // console.log( module, module.timeline );
      // add module's tween into master timeline
      this.timeline.append(module);
      return this;
    }

    // ^ PUBLIC  METHOD(S) ^
    // v PRIVATE METHOD(S) v

    /*
      Method to reset some flags on merged options object.
      @private
      @param   {Object} Options object.
      @returns {Object} Options object.
    */
  }, {
    key: '_resetMergedFlags',
    value: function _resetMergedFlags(obj) {
      // set the submodule to be without timeline for perf reasons
      obj.isTimelineLess = true;
      // reset isShowStart flag for the submodules
      obj.isShowStart = false;
      // set the submodule callbacks context
      obj.callbacksContext = this;
      return obj;
    }

    /*
      Method to initialize properties.
      @private
    */
  }, {
    key: '_vars',
    value: function _vars() {
      _get(Object.getPrototypeOf(Thenable.prototype), '_vars', this).call(this);
      // we are expect that the _o object
      // have been already extended by defaults
      this._history = [_h2['default'].cloneObj(this._o)];
      // the array holds all modules in the then chain
      this._modules = [this];
      // the props that to exclude from then merge
      this._nonMergeProps = { shape: 1 };
    }

    /*
      Method to merge two options into one. Used in .then chains.
      @private
      @param {Object} Start options for the merge.
      @param {Object} End options for the merge.
      @returns {Object} Merged options.
    */
  }, {
    key: '_mergeThenOptions',
    value: function _mergeThenOptions(start, end) {
      var o = {};
      this._mergeStartLoop(o, start);
      this._mergeEndLoop(o, start, end);
      this._history.push(o);
      return o;
    }

    /*
      Originally part of the _mergeThenOptions.
      Loops thru start object and copies all the props from it.
      @param {Object} An object to copy in.
      @parma {Object} Start options object.
    */
  }, {
    key: '_mergeStartLoop',
    value: function _mergeStartLoop(o, start) {
      // loop thru start options object
      for (var key in start) {
        var value = start[key];
        if (start[key] == null) {
          continue;
        };
        // copy all values from start if not tween prop or duration
        if (!_h2['default'].isTweenProp(key) || key === 'duration') {
          // if delta - copy only the end value
          if (this._isDelta(value)) {
            o[key] = _h2['default'].getDeltaEnd(value);
          } else {
            o[key] = value;
          }
        }
      }
    }

    /*
      Originally part of the _mergeThenOptions.
      Loops thru start object and copies all the props from it.
      @param {Object} An object to copy in.
      @parma {Object} Start options object.
      @parma {Object} End options object.
    */
  }, {
    key: '_mergeEndLoop',
    value: function _mergeEndLoop(o, start, end) {
      var endKeys = Object.keys(end);

      for (var endP in end) {
        // get key/value of the end object
        // endKey - name of the property, endValue - value of the property
        var endValue = end[endP],
            startValue = start[endP] != null ? start[endP] : this._defaults[endP];
        if (endValue == null) {
          continue;
        };
        // make ∆ of start -> end
        // if key name is radiusX/radiusY and
        // the startValue is not set fallback to radius value
        var isSubRadius = endP === 'radiusX' || endP === 'radiusY';
        if (isSubRadius && startValue == null) {
          startValue = start.radius;
        }
        // if isnt tween property
        if (!_h2['default'].isTweenProp(endP) && !this._nonMergeProps[endP]) {
          // if end value is delta - just save it
          if (this._isDelta(endValue)) {
            o[endP] = endValue;
          } else {
            // if end value is not delta - merge with start value
            if (this._isDelta(startValue)) {
              // if start value is delta - take the end value
              // as start value of the new delta
              o[endP] = _defineProperty({}, _h2['default'].getDeltaEnd(startValue), endValue);
              // if start value is not delta - make delta
            } else {
                o[endP] = _defineProperty({}, startValue, endValue);
              }
          }
          // copy the tween values unattended
        } else {
            o[endP] = endValue;
          }
      }
    }

    /*
      Method to check if the property is delta property.
      @private
      @param {Any} Parameter value to check.
      @returns {Boolean}
    */
  }, {
    key: '_isDelta',
    value: function _isDelta(optionsValue) {
      var isObject = _h2['default'].isObject(optionsValue);
      isObject = isObject && !optionsValue.unit;
      return !(!isObject || _h2['default'].isArray(optionsValue) || _h2['default'].isDOM(optionsValue));
    }
  }]);

  return Thenable;
})(_tweenTweenable2['default']);

exports['default'] = Thenable;
module.exports = exports['default'];