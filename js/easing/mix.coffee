easing = null

parseIfEasing = (item)->
  if typeof item.value is 'number' then item.value
  else easing.parseEasing item.value

sort = (a, b)->
  a.value = parseIfEasing a
  b.value = parseIfEasing b

  if a.to < b.to then -1
  else if a.to > b.to then 1
  else 0

getNearest = (array, progress)->
  index = 0
  for value, i in array
    index = i; break if value.to > progress
  index

mix = (args...)->
  # if there are more than 1 mix values - sort the array
  if args.length > 1 then args = args.sort(sort)
  # if there is just one value - parse it's easing expression
  else args[0].value = parseIfEasing args[0]

  (progress)->
    index = getNearest(args, progress)
    if index isnt -1
      value = args[index].value
      # return 1 if not defined
      return 1 if index is args.length-1 and progress > args[index].to
      # evaluate the function if it was passed or return the value itself
      return if typeof value is 'function' then value(progress) else value

create = (e)->
  easing = e
  mix

module.exports = create