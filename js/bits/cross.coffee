Object = require './object'

class Cross extends Object
  name: 'Cross'

  render:->
    @preRender()

    @ctx.moveTo(1,0)
    @ctx.lineTo(1,2)
    @ctx.moveTo(0,1)
    @ctx.lineTo(2,1)
    
    @postRender()


module.exports = Cross