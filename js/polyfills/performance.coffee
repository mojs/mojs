### istanbul ignore next ###
# performance.now polyfill
((root)->
  if 'performance' in root == false then root.performance = {}
  # IE 8
  Date.now = Date.now or -> (new Date).getTime()
  if 'now' in root.performance == false
    offset = if root.performance?.timing?.navigationStart
      performance.timing.navigationStart
    else Date.now()
    root.performance.now = -> Date.now() - offset
)(window)