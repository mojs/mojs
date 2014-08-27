Object = require './object'

class Trangle extends Object
  name: 'Trangle'

  render:->
    @renderStart(); @rotation(); @radius()

    @ctx.moveTo(1,0,1,0)
    @ctx.lineTo(1,0,2,2)
    @ctx.lineTo(2,2,0,2)
    @ctx.lineTo(0,2,1,0)
    @ctx.closePath()
    
    @ctx.restore(); @stroke()


module.exports = Trangle