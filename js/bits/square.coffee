Object = require './object'

class Square extends Object
  name: 'Square'
  vars:->
    @degree       = @default prop: 'degree',       def: 360
    @degreeOffset = @default prop: 'degreeOffset', def: 0
    super

  render:->
    @renderStart(); @rotation(); @radius()

    @ctx.rect(0, 0, 2, 2)
    
    @ctx.restore(); @stroke()


module.exports = Square