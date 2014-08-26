Object = require './object'

class Square extends Object
  name: 'Square'

  render:->
    @renderStart(); @rotation(); @radius()

    @ctx.rect(0, 0, 2, 2)
    
    @ctx.restore(); @stroke()


module.exports = Square