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
  x:           100
  y:           100
  radius:       75
  strokeDasharray: 2*75
  duration: 1000
  deg: {0: 60}
  isDrawLess: true
  delay: 1000
  strokeLinecap: {'round': 'butt'}
  # repeat: 3
  # yoyo: true

rect
  .then deg: 0
  .then
    deg:    1000
    delay:  0


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
