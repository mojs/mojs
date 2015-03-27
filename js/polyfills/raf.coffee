### istanbul ignore next ###
# raf polyfill
(->
  lastTime = 0; x = 0
  vendors = ["ms", "moz", "webkit", "o" ]

  while x < vendors.length and not window.requestAnimationFrame
    window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"]
    k = window[vendors[x] + "CancelRequestAnimationFrame"]
    window.cancelAnimationFrame = window[vendors[x]+"CancelAnimationFrame"] or k
    ++x
  unless window.requestAnimationFrame
    window.requestAnimationFrame = (callback, element) ->
      currTime = new Date().getTime()
      timeToCall = Math.max(0, 16 - (currTime - lastTime))
      id = window.setTimeout(->
        callback currTime + timeToCall
        return
      , timeToCall)
      lastTime = currTime + timeToCall
      id
  unless window.cancelAnimationFrame
    window.cancelAnimationFrame = (id) ->
      clearTimeout id
      return
  return
)()