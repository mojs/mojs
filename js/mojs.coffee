d = require '../dist/mojs'

class Mojs
  constructor:->
    @var = 'var'
    # @bar = 'tar'
  method:->
    @gar = 'mar'
  method2:->
    @tar = 'nar'

mojs = new Mojs
module.exports = mojs
window.mojs    = mojs