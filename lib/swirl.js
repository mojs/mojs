
/* istanbul ignore next */

(function() {
  var Swirl, Transit,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Transit = require('./transit');

  Swirl = (function(_super) {
    __extends(Swirl, _super);

    function Swirl() {
      return Swirl.__super__.constructor.apply(this, arguments);
    }

    Swirl.prototype.skipPropsDelta = {
      x: 1,
      y: 1
    };

    Swirl.prototype.vars = function() {
      Swirl.__super__.vars.apply(this, arguments);
      return !this.o.isSwirlLess && this.generateSwirl();
    };

    Swirl.prototype.extendDefaults = function() {
      var angle, x, y, _base;
      Swirl.__super__.extendDefaults.apply(this, arguments);
      x = this.getPosValue('x');
      y = this.getPosValue('y');
      angle = 90 + Math.atan((y.delta / x.delta) || 0) * (180 / Math.PI);
      if (x.delta < 0) {
        angle += 180;
      }
      this.positionDelta = {
        radius: Math.sqrt(x.delta * x.delta + y.delta * y.delta),
        angle: angle,
        x: x,
        y: y
      };
      if ((_base = this.o).radiusScale == null) {
        _base.radiusScale = 1;
      }
      this.props.angleShift = this.h.parseIfRand(this.o.angleShift || 0);
      return this.props.radiusScale = this.h.parseIfRand(this.o.radiusScale);
    };

    Swirl.prototype.getPosValue = function(name) {
      var optVal, val;
      optVal = this.o[name];
      if (optVal && typeof optVal === 'object') {
        val = this.h.parseDelta(name, optVal);
        return {
          start: val.start.value,
          end: val.end.value,
          delta: val.delta,
          units: val.end.unit
        };
      } else {
        val = parseFloat(optVal || this.defaults[name]);
        return {
          start: val,
          end: val,
          delta: 0,
          units: 'px'
        };
      }
    };

    Swirl.prototype.setProgress = function(progress) {
      var angle, point, x, y;
      angle = this.positionDelta.angle;
      if (this.o.isSwirl) {
        angle += this.getSwirl(progress);
      }
      point = this.h.getRadialPoint({
        angle: angle,
        radius: this.positionDelta.radius * progress * this.props.radiusScale,
        center: {
          x: this.positionDelta.x.start,
          y: this.positionDelta.y.start
        }
      });
      x = point.x.toFixed(4);
      y = point.y.toFixed(4);
      this.props.x = this.o.ctx ? x : x + this.positionDelta.x.units;
      this.props.y = this.o.ctx ? y : y + this.positionDelta.y.units;
      return Swirl.__super__.setProgress.apply(this, arguments);
    };

    Swirl.prototype.generateSwirl = function() {
      var _base, _base1;
      this.props.signRand = Math.round(this.h.rand(0, 1)) ? -1 : 1;
      if ((_base = this.o).swirlSize == null) {
        _base.swirlSize = 10;
      }
      if ((_base1 = this.o).swirlFrequency == null) {
        _base1.swirlFrequency = 3;
      }
      this.props.swirlSize = this.h.parseIfRand(this.o.swirlSize);
      return this.props.swirlFrequency = this.h.parseIfRand(this.o.swirlFrequency);
    };

    Swirl.prototype.getSwirl = function(progress) {
      return this.props.signRand * this.props.swirlSize * Math.sin(this.props.swirlFrequency * progress);
    };

    return Swirl;

  })(Transit);

  module.exports = Swirl;

}).call(this);
