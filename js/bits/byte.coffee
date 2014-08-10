h = require '../helpers'
Bit = require './bit'

class Byte extends Bit
  vars:->
    super
    @s = 1*h.time 1
    @parent = @o.parent or h.body
    @el = @o.el or @createEl()
    @ctx = @o.ctx or @ctx or @el.getContext '2d'

  createEl:->
    @el = document.createElement('canvas'); @parent.appendChild @el
    @setElSize()

  setElSize:->
    @el.setAttribute 'width',  2*@size
    @el.setAttribute 'height', 2*@size

    # for retina
    if h.pixel > 1
      @el.style.width   = "#{@size}px"
      @el.style.height  = "#{@size}px"
    @el

module.exports = Byte
