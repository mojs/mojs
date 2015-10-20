
/* istanbul ignore next */

(function() {
  var Burst, Swirl, Transit, bitsMap, h,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  bitsMap = require('./shapes/bitsMap');

  Transit = require('./transit');

  Swirl = require('./swirl');

  h = require('./h');

  Burst = (function(_super) {
    __extends(Burst, _super);

    function Burst() {
      return Burst.__super__.constructor.apply(this, arguments);
    }

    Burst.prototype.skipProps = {
      childOptions: 1
    };

    Burst.prototype.defaults = {
      count: 5,
      degree: 360,
      opacity: 1,
      randomAngle: 0,
      randomRadius: 0,
      x: 100,
      y: 100,
      shiftX: 0,
      shiftY: 0,
      easing: 'Linear.None',
      radius: {
        25: 75
      },
      radiusX: void 0,
      radiusY: void 0,
      angle: 0,
      size: null,
      sizeGap: 0,
      duration: 600,
      delay: 0,
      onStart: null,
      onComplete: null,
      onCompleteChain: null,
      onUpdate: null,
      isResetAngles: false
    };

    Burst.prototype.childDefaults = {
      radius: {
        7: 0
      },
      radiusX: void 0,
      radiusY: void 0,
      angle: 0,
      opacity: 1,
      onStart: null,
      onComplete: null,
      onUpdate: null,
      points: 3,
      duration: 500,
      delay: 0,
      repeat: 0,
      yoyo: false,
      easing: 'Linear.None',
      type: 'circle',
      fill: 'deeppink',
      fillOpacity: 1,
      isSwirl: false,
      swirlSize: 10,
      swirlFrequency: 3,
      stroke: 'transparent',
      strokeWidth: 0,
      strokeOpacity: 1,
      strokeDasharray: '',
      strokeDashoffset: '',
      strokeLinecap: null
    };

    Burst.prototype.optionsIntersection = {
      radius: 1,
      radiusX: 1,
      radiusY: 1,
      angle: 1,
      opacity: 1,
      onStart: 1,
      onComplete: 1,
      onUpdate: 1
    };

    Burst.prototype.run = function(o) {
      var i, key, keys, len, option, tr, _base, _i, _len, _ref, _ref1;
      if ((o != null) && Object.keys(o).length) {
        if (o.count || ((_ref = o.childOptions) != null ? _ref.count : void 0)) {
          this.h.warn('Sorry, count can not be changed on run');
        }
        this.extendDefaults(o);
        keys = Object.keys(o.childOptions || {});
        if ((_base = this.o).childOptions == null) {
          _base.childOptions = {};
        }
        for (i = _i = 0, _len = keys.length; _i < _len; i = ++_i) {
          key = keys[i];
          this.o.childOptions[key] = o.childOptions[key];
        }
        len = this.transits.length;
        while (len--) {
          option = this.getOption(len);
          if ((((_ref1 = o.childOptions) != null ? _ref1.angle : void 0) == null) && (o.angleShift == null)) {
            option.angle = this.transits[len].o.angle;
          } else if (!o.isResetAngles) {
            option.angle = this.getBitAngle(option.angle, len);
          }
          this.transits[len].tuneNewOption(option, true);
        }
        this.timeline.recalcDuration();
      }
      if (this.props.randomAngle || this.props.randomRadius) {
        len = this.transits.length;
        while (len--) {
          tr = this.transits[len];
          this.props.randomAngle && tr.setProp({
            angleShift: this.generateRandomAngle()
          });
          this.props.randomRadius && tr.setProp({
            radiusScale: this.generateRandomRadius()
          });
        }
      }
      return this.startTween();
    };

    Burst.prototype.createBit = function() {
      var i, option, _i, _ref, _results;
      this.transits = [];
      _results = [];
      for (i = _i = 0, _ref = this.props.count; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        option = this.getOption(i);
        option.ctx = this.ctx;
        option.index = i;
        option.isDrawLess = option.isRunLess = option.isTweenLess = true;
        this.props.randomAngle && (option.angleShift = this.generateRandomAngle());
        this.props.randomRadius && (option.radiusScale = this.generateRandomRadius());
        _results.push(this.transits.push(new Swirl(option)));
      }
      return _results;
    };

    Burst.prototype.addBitOptions = function() {
      var aShift, i, pointEnd, pointStart, points, step, transit, _i, _len, _ref, _results;
      points = this.props.count;
      this.degreeCnt = this.props.degree % 360 === 0 ? points : points - 1 || 1;
      step = this.props.degree / this.degreeCnt;
      _ref = this.transits;
      _results = [];
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        transit = _ref[i];
        aShift = transit.props.angleShift || 0;
        pointStart = this.getSidePoint('start', i * step + aShift);
        pointEnd = this.getSidePoint('end', i * step + aShift);
        transit.o.x = this.getDeltaFromPoints('x', pointStart, pointEnd);
        transit.o.y = this.getDeltaFromPoints('y', pointStart, pointEnd);
        if (!this.props.isResetAngles) {
          transit.o.angle = this.getBitAngle(transit.o.angle, i);
        }
        _results.push(transit.extendDefaults());
      }
      return _results;
    };

    Burst.prototype.getBitAngle = function(angle, i) {
      var angleAddition, angleShift, curAngleShift, degCnt, delta, end, keys, newEnd, newStart, points, start, step;
      points = this.props.count;
      degCnt = this.props.degree % 360 === 0 ? points : points - 1 || 1;
      step = this.props.degree / degCnt;
      angleAddition = i * step + 90;
      angleShift = this.transits[i].props.angleShift || 0;
      angle = typeof angle !== 'object' ? angle + angleAddition + angleShift : (keys = Object.keys(angle), start = keys[0], end = angle[start], curAngleShift = angleAddition + angleShift, newStart = parseFloat(start) + curAngleShift, newEnd = parseFloat(end) + curAngleShift, delta = {}, delta[newStart] = newEnd, delta);
      return angle;
    };

    Burst.prototype.getSidePoint = function(side, angle) {
      var pointStart, sideRadius;
      sideRadius = this.getSideRadius(side);
      return pointStart = this.h.getRadialPoint({
        radius: sideRadius.radius,
        radiusX: sideRadius.radiusX,
        radiusY: sideRadius.radiusY,
        angle: angle,
        center: {
          x: this.props.center,
          y: this.props.center
        }
      });
    };

    Burst.prototype.getSideRadius = function(side) {
      return {
        radius: this.getRadiusByKey('radius', side),
        radiusX: this.getRadiusByKey('radiusX', side),
        radiusY: this.getRadiusByKey('radiusY', side)
      };
    };

    Burst.prototype.getRadiusByKey = function(key, side) {
      if (this.deltas[key] != null) {
        return this.deltas[key][side];
      } else if (this.props[key] != null) {
        return this.props[key];
      }
    };

    Burst.prototype.getDeltaFromPoints = function(key, pointStart, pointEnd) {
      var delta;
      delta = {};
      if (pointStart[key] === pointEnd[key]) {
        return delta = pointStart[key];
      } else {
        delta[pointStart[key]] = pointEnd[key];
        return delta;
      }
    };

    Burst.prototype.draw = function(progress) {
      return this.drawEl();
    };

    Burst.prototype.isNeedsTransform = function() {
      return this.isPropChanged('shiftX') || this.isPropChanged('shiftY') || this.isPropChanged('angle');
    };

    Burst.prototype.fillTransform = function() {
      return "rotate(" + this.props.angle + "deg) translate(" + this.props.shiftX + ", " + this.props.shiftY + ")";
    };

    Burst.prototype.createTween = function() {
      var i, _results;
      Burst.__super__.createTween.apply(this, arguments);
      i = this.transits.length;
      _results = [];
      while (i--) {
        _results.push(this.timeline.add(this.transits[i].tween));
      }
      return _results;
    };

    Burst.prototype.calcSize = function() {
      var i, largestSize, radius, transit, _i, _len, _ref;
      largestSize = -1;
      _ref = this.transits;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        transit = _ref[i];
        transit.calcSize();
        if (largestSize < transit.props.size) {
          largestSize = transit.props.size;
        }
      }
      radius = this.calcMaxRadius();
      this.props.size = largestSize + 2 * radius;
      this.props.size += 2 * this.props.sizeGap;
      this.props.center = this.props.size / 2;
      return this.addBitOptions();
    };

    Burst.prototype.getOption = function(i) {
      var key, keys, len, option;
      option = {};
      keys = Object.keys(this.childDefaults);
      len = keys.length;
      while (len--) {
        key = keys[len];
        option[key] = this.getPropByMod({
          key: key,
          i: i,
          from: this.o.childOptions
        });
        if (this.optionsIntersection[key]) {
          if (option[key] == null) {
            option[key] = this.getPropByMod({
              key: key,
              i: i,
              from: this.childDefaults
            });
          }
          continue;
        }
        if (option[key] == null) {
          option[key] = this.getPropByMod({
            key: key,
            i: i,
            from: this.o
          });
        }
        if (option[key] == null) {
          option[key] = this.getPropByMod({
            key: key,
            i: i,
            from: this.childDefaults
          });
        }
      }
      return option;
    };

    Burst.prototype.getPropByMod = function(o) {
      var prop, _ref;
      prop = (_ref = o.from || this.o.childOptions) != null ? _ref[o.key] : void 0;
      if (this.h.isArray(prop)) {
        return prop[o.i % prop.length];
      } else {
        return prop;
      }
    };

    Burst.prototype.generateRandomAngle = function(i) {
      var randdomness, randomness;
      randomness = parseFloat(this.props.randomAngle);
      randdomness = randomness > 1 ? 1 : randomness < 0 ? 0 : void 0;
      return this.h.rand(0, randomness ? randomness * 360 : 180);
    };

    Burst.prototype.generateRandomRadius = function(i) {
      var randdomness, randomness, start;
      randomness = parseFloat(this.props.randomRadius);
      randdomness = randomness > 1 ? 1 : randomness < 0 ? 0 : void 0;
      start = randomness ? (1 - randomness) * 100 : (1 - .5) * 100;
      return this.h.rand(start, 100) / 100;
    };

    Burst.prototype.then = function(o) {
      this.h.error("Burst's \"then\" method is under consideration, you can vote for it in github repo issues");
      return this;
    };

    return Burst;

  })(Transit);

  module.exports = Burst;

}).call(this);
