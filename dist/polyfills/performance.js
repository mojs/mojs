var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

(function(root) {
  var offset, _ref, _ref1;
  if (__indexOf.call(root, 'performance') >= 0 === false) {
    root.performance = {};
  }
  Date.now = Date.now || function() {
    return (new Date).getTime();
  };
  if (__indexOf.call(root.performance, 'now') >= 0 === false) {
    offset = ((_ref = root.performance) != null ? (_ref1 = _ref.timing) != null ? _ref1.navigationStart : void 0 : void 0) ? performance.timing.navigationStart : Date.now();
    return root.performance.now = function() {
      return Date.now() - offset;
    };
  }
})(window);
