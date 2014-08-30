Object = require './object'

class Square extends Object
  name: 'Square'

  render:->
    @preRender()

    @ctx.rect(0, 0, 2, 2)
    
    @postRender()


module.exports = Square