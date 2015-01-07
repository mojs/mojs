Cross     = require './cross'
Circle    = require './circle'
Triangle  = require './triangle'
Rect      = require './rect'
Line      = require './line'
Bit       = require './bit'
Byte      = require './byte'
svg       = document.getElementById 'js-svg'
div       = document.getElementById 'js-div'

rect = new Byte
  x:    100
  y:    100
  deg:  45
  # deg:          { 0: 360 }
  radius:       { 5: 75 }
  strokeWidth:  { 5: 10 }
  stroke:       { 'yellow': 'deeppink' }
  type:         'rect'
  # parent: div

setTimeout ->
  i = 0
  int = setInterval ->
    rect.setProgress i++/10
    rect.draw()
    # console.log rect.props.stroke
    if rect.progress is 1 then clearInterval int
  , 160
, 1000

# rect.draw()

# console.log rect.el.parentNode.tagName

# bit   = new Bit ctx: svg

# # line.type = 'circle'
# console.log bit.type, line.type

# # line = new Line

# class Mojs
#   constructor:->
#     @var = 'var'
#     # @bar = 'tar'
#   method:->
#     @gar = 'mar'
#   method2:->
#     @tar = 'nar'
#     line.method()

# mojs           = new Mojs
# window.mojs    = mojs
# module.exports = mojs
