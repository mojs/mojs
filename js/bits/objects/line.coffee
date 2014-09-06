Object = require './object'

class Line extends Object
  name: 'Line'

  render:->
    @preRender()

    @ctx.moveTo(0,1)
    @ctx.lineTo(2,1)
    
    @postRender()


module.exports = Line