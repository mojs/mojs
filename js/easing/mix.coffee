


sort = (a, b)->
  if a.to < b.to then -1
  else if a.to > b.to then 1
  else 0

getNearest = (array, progress)->
  index = 0
  for value, i in array
    index = i; break if value.to > progress
  index

mix = (args...)->
  args = args.sort(sort)
  (progress)->
    index = getNearest(args, progress)
    if index isnt -1
      value = args[index].value
      # return 1 if not defined
      return 1 if index is args.length-1 and progress > args[index].to
      # evaluate the function if it was passed or return the value itself
      return if typeof value is 'function' then value(progress) else value

module.exports = mix