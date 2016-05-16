(function() {
  var Bit, BitsMap, Circle, Cross, Curve, Equal, Line, Polygon, Rect, Zigzag, h;

  Bit = require('./bit')["default"] || require('./bit');

  Circle = require('./circle');

  Line = require('./line');

  Zigzag = require('./zigzag');

  Rect = require('./rect');

  Polygon = require('./polygon');

  Cross = require('./cross');

  Curve = require('./curve')["default"] || require('./curve');

  Equal = require('./equal');

  h = require('../h');

  BitsMap = (function() {
    function BitsMap() {}

    BitsMap.prototype.bit = Bit;

    BitsMap.prototype.circle = Circle;

    BitsMap.prototype.line = Line;

    BitsMap.prototype.zigzag = Zigzag;

    BitsMap.prototype.rect = Rect;

    BitsMap.prototype.polygon = Polygon;

    BitsMap.prototype.cross = Cross;

    BitsMap.prototype.equal = Equal;

    BitsMap.prototype.curve = Curve;

    BitsMap.prototype.getShape = function(name) {
      return this[name] || h.error("no \"" + name + "\" shape available yet, please choose from this list:", this);
    };

    return BitsMap;

  })();

  module.exports = new BitsMap;

}).call(this);
