### istanbul ignore next ###
# Adapted from https://gist.github.com/paulirish/1579671 which derived from 
# http://paulirish.com/2011/requestanimationframe-for-smart-animating/
# http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
# requestAnimationFrame polyfill by Erik Möller.
# Fixes from Paul Irish, Tino Zijdel, Andrew Mao, Klemen Slavič, Darius Bacon
# MIT license

do ->
  'use strict'
  vendors = [
    'webkit'
    'moz'
  ]
  i = 0
  w = window
  while i < vendors.length and !w.requestAnimationFrame
    vp = vendors[i]
    w.requestAnimationFrame = w[vp + 'RequestAnimationFrame']
    cancel = w[vp + 'CancelAnimationFrame']
    w.cancelAnimationFrame = cancel or w[vp + 'CancelRequestAnimationFrame']
    ++i
  isOldBrowser = !w.requestAnimationFrame or !w.cancelAnimationFrame
  if /iP(ad|hone|od).*OS 6/.test(w.navigator.userAgent) or isOldBrowser
    lastTime = 0

    w.requestAnimationFrame = (callback) ->
      now = Date.now()
      nextTime = Math.max(lastTime + 16, now)
      setTimeout (->
        callback lastTime = nextTime
        return
      ), nextTime - now

    w.cancelAnimationFrame = clearTimeout
  return