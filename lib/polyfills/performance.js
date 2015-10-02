
/* istanbul ignore next */

(function() {
  (function(root) {
    var offset, _ref, _ref1;
    if (root.performance == null) {
      root.performance = {};
    }
    Date.now = Date.now || function() {
      return (new Date).getTime();
    };
    if (root.performance.now == null) {
      offset = ((_ref = root.performance) != null ? (_ref1 = _ref.timing) != null ? _ref1.navigationStart : void 0 : void 0) ? performance.timing.navigationStart : Date.now();
      return root.performance.now = function() {
        return Date.now() - offset;
      };
    }
  })(window);

}).call(this);
