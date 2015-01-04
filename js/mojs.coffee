Line = require './line'
Bit  = require './bit'

svg = document.getElementById 'js-svg'
console.log svg

line  = new Line
  ctx: svg
  x:   100
  y:   100
  deg: 90
  isDrawLess: true

line.draw()
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
