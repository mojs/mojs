Object = require './object'

class Circle extends Object
  name: 'circle'
  vars:->
    @degree       = @default prop: 'degree',       def: 360
    @degreeOffset = @default prop: 'degreeOffset', def: 0
    super

  render:->
    @renderStart()
    @rotation()
    @ellipse()
    @ctx.restore()
    @stroke()


module.exports = Circle