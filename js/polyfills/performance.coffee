### istanbul ignore next ###
# performance.now polyfill
((root)->
  if !root.performance? then root.performance = {}
  # IE 8
  Date.now = Date.now or -> (new Date).getTime()
  if !root.performance.now?
    offset = if root.performance?.timing?.navigationStart
      performance.timing.navigationStart
    else Date.now()
    root.performance.now = -> Date.now() - offset
)(window)