(function() {
  var create, easing, getNearest, mix, parseIfEasing, sort,
    __slice = [].slice;

  easing = null;

  parseIfEasing = function(item) {
    if (typeof item.value === 'number') {
      return item.value;
    } else {
      return easing.parseEasing(item.value);
    }
  };

  sort = function(a, b) {
    var returnValue;
    a.value = parseIfEasing(a);
    b.value = parseIfEasing(b);
    returnValue = 0;
    a.to < b.to && (returnValue = -1);
    a.to > b.to && (returnValue = 1);
    return returnValue;
  };

  getNearest = function(array, progress) {
    var i, index, value, _i, _len;
    index = 0;
    for (i = _i = 0, _len = array.length; _i < _len; i = ++_i) {
      value = array[i];
      index = i;
      if (value.to > progress) {
        break;
      }
    }
    return index;
  };

  mix = function() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    if (args.length > 1) {
      args = args.sort(sort);
    } else {
      args[0].value = parseIfEasing(args[0]);
    }
    return function(progress) {
      var index, value;
      index = getNearest(args, progress);
      if (index !== -1) {
        value = args[index].value;
        if (index === args.length - 1 && progress > args[index].to) {
          return 1;
        }
        if (typeof value === 'function') {
          return value(progress);
        } else {
          return value;
        }
      }
    };
  };

  create = function(e) {
    easing = e;
    return mix;
  };

  module.exports = create;

}).call(this);
