'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _h = require('./h');

var _h2 = _interopRequireDefault(_h);

var _thenable = require('./thenable');

var _thenable2 = _interopRequireDefault(_thenable);

var Tuneable = (function (_Thenable) {
  _inherits(Tuneable, _Thenable);

  function Tuneable() {
    _classCallCheck(this, Tuneable);

    _get(Object.getPrototypeOf(Tuneable.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Tuneable, [{
    key: 'tune',

    /*
      Method to start the animation with optional new options.
      @public
      @param {Object} New options to set on the run.
      @returns {Object} this.
    */
    value: function tune(o) {
      // if options object was passed
      if (o && Object.keys(o).length) {
        this._transformHistory(o);
        this._tuneNewOptions(o);
        // restore array prop values because _props
        // contain them as parsed arrays
        // but we need the as strings to store in history
        // and merge in history chains
        this._history[0] = _h2['default'].cloneObj(this._props);
        for (var key in this._arrayPropertyMap) {
          if (o[key] != null) {
            this._history[0][key] = this._preparsePropValue(key, o[key]);
          }
        }

        this._tuneSubModules();
        this._resetTweens();
      }
      return this;
    }

    /*
      Method to regenerate all the random properties form initial object.
      @public
      @returns this.
    */
  }, {
    key: 'generate',
    value: function generate() {
      return this.tune(this._o);
    }

    // ^ PUBLIC  METHOD(S) ^
    // v PRIVATE METHOD(S) v

    /*
      Method to preparse options in object.
      @private
      @param {Object} Object to preparse properties on.
      @returns {Object} Passed object with preparsed props.
    */
    // _preParseOptions ( o ) {
    //   for (var key in o) {
    //     o[key] = this._preparsePropValue( key, o[key] );
    //   }
    //   return o;
    // }
    /*
      Method to transform history rewrite new options object chain on run.
      @private
      @param {Object} New options to tune for.
    */
  }, {
    key: '_transformHistory',
    value: function _transformHistory(o) {
      for (var key in o) {
        var value = o[key];
        // don't transform for childOptions
        // if ( key === 'childOptions' ) { continue; }
        this._transformHistoryFor(key, this._preparsePropValue(key, value));
      }
    }

    /*
      Method to transform history chain for specific key/value.
      @param {String} Name of the property to transform history for.
      @param {Any} The new property's value.
    */
  }, {
    key: '_transformHistoryFor',
    value: function _transformHistoryFor(key, value) {
      for (var i = 0; i < this._history.length; i++) {
        if (value = this._transformHistoryRecord(i, key, value)) {
          // break if no further history modifications needed
          if (value == null) {
            break;
          }
        }
      }
    }

    /*
      Method to transform history recod with key/value.
      @param {Number} Index of the history record to transform.
      @param {String} Property name to transform.
      @param {Any} Property value to transform to.
      @param {Object} Optional the current history record.
      @param {Object} Optional the next history record.
      @returns {Boolean} Returns true if no further
                         history modifications is needed.
    */
  }, {
    key: '_transformHistoryRecord',
    value: function _transformHistoryRecord(index, key, newVal, currRecord, nextRecord) {
      // newVal = this._parseProperty( key, newVal );
      if (newVal == null) {
        return null;
      }

      // fallback to history records, if wasn't specified
      currRecord = currRecord == null ? this._history[index] : currRecord;
      nextRecord = nextRecord == null ? this._history[index + 1] : nextRecord;

      var oldVal = currRecord[key],
          nextVal = nextRecord == null ? null : nextRecord[key];

      // if index is 0 - always save the newVal
      // and return non-delta for subsequent modifications
      if (index === 0) {
        currRecord[key] = newVal;
        // always return on tween properties
        if (_h2['default'].isTweenProp(key) && key !== 'duration') {
          return null;
        }
        // nontween properties
        var isRewriteNext = this._isRewriteNext(oldVal, nextVal),
            returnVal = this._isDelta(newVal) ? _h2['default'].getDeltaEnd(newVal) : newVal;
        return isRewriteNext ? returnVal : null;
      } else {
        // if was delta and came none-deltta - rewrite
        // the start of the delta and stop
        if (this._isDelta(oldVal)) {
          currRecord[key] = _defineProperty({}, newVal, _h2['default'].getDeltaEnd(oldVal));
          return null;
        } else {
          // if the old value is not delta and the new one is
          currRecord[key] = newVal;
          // if the next item has the same value - return the
          // item for subsequent modifications or stop
          return this._isRewriteNext(oldVal, nextVal) ? newVal : null;
        }
      }
    }

    /*
      Method to check if the next item should
      be rewrited in transform history operation.
      @private
      @param {Any} Current value.
      @param {Any} Next value.
      @returns {Boolean} If need to rewrite the next value.
    */
  }, {
    key: '_isRewriteNext',
    value: function _isRewriteNext(currVal, nextVal) {
      // return false if nothing to rewrite next
      if (nextVal == null && currVal != null) {
        return false;
      }

      var isEqual = currVal === nextVal,
          isNextDelta = this._isDelta(nextVal),
          isDelta = this._isDelta(currVal),
          isValueDeltaChain = false,
          isDeltaChain = false;

      if (isDelta && isNextDelta) {
        if (_h2['default'].getDeltaEnd(currVal) == _h2['default'].getDeltaStart(nextVal)) {
          isDeltaChain = true;
        }
      } else if (isNextDelta) {
        isValueDeltaChain = _h2['default'].getDeltaStart(nextVal) === '' + currVal;
      }

      return isEqual || isValueDeltaChain || isDeltaChain;
    }

    /*
      Method to tune new history options to all the submodules.
      @private
    */
  }, {
    key: '_tuneSubModules',
    value: function _tuneSubModules() {
      for (var i = 1; i < this._modules.length; i++) {
        this._modules[i]._tuneNewOptions(this._history[i]);
      }
    }

    /*
      Method to set new options on run.
      @param {Boolean} If foreign context.
      @private
    */
  }, {
    key: '_resetTweens',
    value: function _resetTweens() {
      var i = 0,
          shift = 0,
          tweens = this.timeline._timelines;

      for (var i = 0; i < tweens.length; i++) {
        var tween = tweens[i],
            prevTween = tweens[i - 1];

        shift += prevTween ? prevTween._props.repeatTime : 0;
        this._resetTween(tween, this._history[i], shift);
      }
      this.timeline._setProp(this._props.timeline);
      this.timeline._recalcTotalDuration();
    }

    /*
      Method to reset tween with new options.
      @param {Object} Tween to reset.
      @param {Object} Tween's to reset tween with.
      @param {Number} Optional number to shift tween start time.
    */
  }, {
    key: '_resetTween',
    value: function _resetTween(tween, o) {
      var shift = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

      o.shiftTime = shift;tween._setProp(o);
    }
  }]);

  return Tuneable;
})(_thenable2['default']);

exports['default'] = Tuneable;
module.exports = exports['default'];