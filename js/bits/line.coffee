Object = require './object'

class Line extends Object
  name: 'Line'

  render:->
    @renderStart(); @rotation(); @radius()

    @ctx.moveTo(1,0)
    @ctx.lineTo(1,2)
    
    @ctx.restore(); @stroke()


module.exports = Line