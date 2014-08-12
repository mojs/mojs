h = require '../helpers'
Bit = require './bit'

class Byte extends Bit
  vars:->
    super
    @s = 1*h.time 1
    @parent = @o.parent or h.body
    console.log @o.el
    @el = @o.el or @createEl()
    @ctx = @o.ctx or @ctx or @el.getContext '2d'

  createEl:->
    @el = document.createElement('canvas')
    @el.style.position = 'absolute'; @el.style.left = 0; @el.style.top = 0
    @parent.appendChild(@el); @setElSize()

  setElSize:->
    @el.setAttribute 'width',  2*@sizeX
    @el.setAttribute 'height', 2*@sizeY

    # for retina
    if h.pixel > 1
      @el.style.width   = "#{@sizeX}px"
      @el.style.height  = "#{@sizeY}px"
    @el

module.exports = Byte
