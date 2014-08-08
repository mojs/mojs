(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Bit;

Bit = (function() {
  Bit.prototype.x = 0;

  Bit.prototype.y = 0;

  Bit.prototype.deg = 0;

  function Bit(o) {
    this.o = o != null ? o : {};
    if (typeof this.vars === "function") {
      this.vars();
    }
    this.setProp({
      x: 10
    });
  }

  Bit.prototype.setProp = function(props) {
    var propName, propValue, _results;
    _results = [];
    for (propName in props) {
      propValue = props[propName];
      _results.push(this[propName] = propValue);
    }
    return _results;
  };

  return Bit;

})();

module.exports = Bit;


},{}],2:[function(require,module,exports){
var Bit, Line,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Bit = require('./bit');

Line = (function(_super) {
  __extends(Line, _super);

  function Line() {
    return Line.__super__.constructor.apply(this, arguments);
  }

  return Line;

})(Bit);

module.exports = Line;


},{"./bit":1}],3:[function(require,module,exports){
var Line;

Line = require('./bits/line');

new Line;


},{"./bits/line":2}]},{},[3])