var Mojs, d, mojs;

d = require('../dist/mojs');

Mojs = (function() {
  function Mojs() {
    this["var"] = 'var';
  }

  Mojs.prototype.method = function() {
    return this.gar = 'mar';
  };

  Mojs.prototype.method2 = function() {
    return this.tar = 'nar';
  };

  return Mojs;

})();

mojs = new Mojs;

module.exports = mojs;

window.mojs = mojs;
