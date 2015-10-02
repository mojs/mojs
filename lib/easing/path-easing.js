(function() {
  var PathEasing, h;

  h = require('../h');

  PathEasing = (function() {
    PathEasing.prototype._vars = function() {
      this._precompute = h.clamp(this.o.precompute || 140, 100, 10000);
      this._step = 1 / this._precompute;
      this._rect = this.o.rect || 100;
      this._approximateMax = this.o.approximateMax || 5;
      this._eps = this.o.eps || 0.01;
      return this._boundsPrevProgress = -1;
    };

    function PathEasing(path, o) {
      this.o = o != null ? o : {};
      if (path === 'creator') {
        return;
      }
      this.path = h.parsePath(path);
      if (this.path == null) {
        return h.error('Error while parsing the path');
      }
      this.path.setAttribute('d', this._normalizePath(this.path.getAttribute('d')));
      this.pathLength = this.path.getTotalLength();
      this.sample = h.bind(this.sample, this);
      this._hardSample = h.bind(this._hardSample, this);
      this._vars();
      this._preSample();
      this;
    }

    PathEasing.prototype._preSample = function() {
      var i, length, point, progress, _i, _ref, _results;
      this._samples = [];
      _results = [];
      for (i = _i = 0, _ref = this._precompute; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        progress = i * this._step;
        length = this.pathLength * progress;
        point = this.path.getPointAtLength(length);
        _results.push(this._samples[i] = {
          point: point,
          length: length,
          progress: progress
        });
      }
      return _results;
    };

    PathEasing.prototype._findBounds = function(array, p) {
      var buffer, direction, end, i, len, loopEnd, pointP, pointX, start, value, _i, _ref;
      if (p === this._boundsPrevProgress) {
        return this._prevBounds;
      }
      if (this._boundsStartIndex == null) {
        this._boundsStartIndex = 0;
      }
      len = array.length;
      if (this._boundsPrevProgress > p) {
        loopEnd = 0;
        direction = 'reverse';
      } else {
        loopEnd = len;
        direction = 'forward';
      }
      if (direction === 'forward') {
        start = array[0];
        end = array[array.length - 1];
      } else {
        start = array[array.length - 1];
        end = array[0];
      }
      for (i = _i = _ref = this._boundsStartIndex; _ref <= loopEnd ? _i < loopEnd : _i > loopEnd; i = _ref <= loopEnd ? ++_i : --_i) {
        value = array[i];
        pointX = value.point.x / this._rect;
        pointP = p;
        if (direction === 'reverse') {
          buffer = pointX;
          pointX = pointP;
          pointP = buffer;
        }
        if (pointX < pointP) {
          start = value;
          this._boundsStartIndex = i;
        } else {
          end = value;
          break;
        }
      }
      this._boundsPrevProgress = p;
      return this._prevBounds = {
        start: start,
        end: end
      };
    };

    PathEasing.prototype.sample = function(p) {
      var bounds, res;
      p = h.clamp(p, 0, 1);
      bounds = this._findBounds(this._samples, p);
      res = this._checkIfBoundsCloseEnough(p, bounds);
      if (res != null) {
        return res;
      }
      return this._findApproximate(p, bounds.start, bounds.end);
    };

    PathEasing.prototype._checkIfBoundsCloseEnough = function(p, bounds) {
      var point, y;
      point = void 0;
      y = this._checkIfPointCloseEnough(p, bounds.start.point);
      if (y != null) {
        return y;
      }
      return this._checkIfPointCloseEnough(p, bounds.end.point);
    };

    PathEasing.prototype._checkIfPointCloseEnough = function(p, point) {
      if (h.closeEnough(p, point.x / this._rect, this._eps)) {
        return this._resolveY(point);
      }
    };

    PathEasing.prototype._approximate = function(start, end, p) {
      var deltaP, percentP;
      deltaP = end.point.x - start.point.x;
      percentP = (p - (start.point.x / 100)) / (deltaP / 100);
      return start.length + percentP * (end.length - start.length);
    };

    PathEasing.prototype._findApproximate = function(p, start, end, approximateMax) {
      var approximation, args, newPoint, point, x;
      if (approximateMax == null) {
        approximateMax = this._approximateMax;
      }
      approximation = this._approximate(start, end, p);
      point = this.path.getPointAtLength(approximation);
      x = point.x / 100;
      if (h.closeEnough(p, x, this._eps)) {
        return this._resolveY(point);
      } else {
        if (--approximateMax < 1) {
          return this._resolveY(point);
        }
        newPoint = {
          point: point,
          length: approximation
        };
        args = p < x ? [p, start, newPoint, approximateMax] : [p, newPoint, end, approximateMax];
        return this._findApproximate.apply(this, args);
      }
    };

    PathEasing.prototype._resolveY = function(point) {
      return 1 - (point.y / this._rect);
    };

    PathEasing.prototype._normalizePath = function(path) {
      var commands, endIndex, normalizedPath, points, startIndex, svgCommandsRegexp;
      svgCommandsRegexp = /[M|L|H|V|C|S|Q|T|A]/gim;
      points = path.split(svgCommandsRegexp);
      points.shift();
      commands = path.match(svgCommandsRegexp);
      startIndex = 0;
      points[startIndex] = this._normalizeSegment(points[startIndex]);
      endIndex = points.length - 1;
      points[endIndex] = this._normalizeSegment(points[endIndex], this._rect || 100);
      return normalizedPath = this._joinNormalizedPath(commands, points);
    };

    PathEasing.prototype._joinNormalizedPath = function(commands, points) {
      var command, i, normalizedPath, space, _i, _len;
      normalizedPath = '';
      for (i = _i = 0, _len = commands.length; _i < _len; i = ++_i) {
        command = commands[i];
        space = i === 0 ? '' : ' ';
        normalizedPath += "" + space + command + (points[i].trim());
      }
      return normalizedPath;
    };

    PathEasing.prototype._normalizeSegment = function(segment, value) {
      var i, lastPoint, nRgx, pairs, parsedX, point, space, x, _i, _len;
      if (value == null) {
        value = 0;
      }
      segment = segment.trim();
      nRgx = /(-|\+)?((\d+(\.(\d|\e(-|\+)?)+)?)|(\.?(\d|\e|(\-|\+))+))/gim;
      pairs = this._getSegmentPairs(segment.match(nRgx));
      lastPoint = pairs[pairs.length - 1];
      x = lastPoint[0];
      parsedX = Number(x);
      if (parsedX !== value) {
        segment = '';
        lastPoint[0] = value;
        for (i = _i = 0, _len = pairs.length; _i < _len; i = ++_i) {
          point = pairs[i];
          space = i === 0 ? '' : ' ';
          segment += "" + space + point[0] + "," + point[1];
        }
      }
      return segment;
    };

    PathEasing.prototype._getSegmentPairs = function(array) {
      var i, newArray, pair, value, _i, _len;
      if (array.length % 2 !== 0) {
        h.error('Failed to parse the path - segment pairs are not even.', array);
      }
      newArray = [];
      for (i = _i = 0, _len = array.length; _i < _len; i = _i += 2) {
        value = array[i];
        pair = [array[i], array[i + 1]];
        newArray.push(pair);
      }
      return newArray;
    };

    PathEasing.prototype.create = function(path, o) {
      var handler;
      handler = new PathEasing(path, o);
      handler.sample.path = handler.path;
      return handler.sample;
    };

    return PathEasing;

  })();

  module.exports = PathEasing;

}).call(this);
