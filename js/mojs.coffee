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
  type:       'line'
  x:            {100: 200}
  y:            100
  radius:       75
  strokeWidth: {5:0}
  strokeDasharray: 2*75
  strokeDashoffset: { 150: -150 }
  duration: 600
  deg: 50
  # isDrawLess: true
  delay: 2000
  # isRunLess: true

  # repeat: 10

# setTimeout ->
#   rect.startTween()
# , 1000

# setTimeout ->
#   i = 0
#   int = setInterval ->
#     rect.el.style['-webkit-transform'] = "translate(#{i++}px, 0)"
#   , 160
# , 1000

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
