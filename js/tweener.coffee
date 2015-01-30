# h = require './h'
class Tweener
  constructor:(@o={})-> @vars(); @
  vars:->
    


t = new Tweener

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "tweener", [], -> t
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = t
### istanbul ignore next ###
window?.mojs ?= {}
window?.mojs.tweener = t