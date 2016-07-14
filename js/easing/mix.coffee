easing = null

# Method to check if need to parse easing expression.
#
# @param  {Object} Mix array item
# @return {Function, Number} Parsed easing or static easing number.
parseIfEasing = (item)->
  if typeof item.value is 'number' then item.value
  else easing.parseEasing item.value
# ---

# Method to sort an array form smallest to largest.
#
# @param  {Any} Array item.
# @param  {Any} Array item.
# @return {Number} Comparation indicator.
# @side-effect  Check if value on **array item** should be
#               parsed, and parses it if so.
sort = (a, b)->
  a.value = parseIfEasing(a); b.value = parseIfEasing(b)

  returnValue = 0
  a.to < b.to and (returnValue = -1)
  a.to > b.to and (returnValue =  1)
  returnValue
  
# ---

# Method to get the nearest to item to the progress.
#
# @param  {Array} Array to search in.
# @param  {Number} Progress to search for.
# @return {Number} Nearest item index.
getNearest = (array, progress)->
  index = 0
  (index = i; break if value.to > progress) for value, i in array
  index
# ---

# Method to get the nearest to item to the progress.
#
# @param  {Array} Array to search in.
# @param  {Number} Progress to search for.
# @return {Number} Nearest item index.
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
# ---

# Method initialize the mix function.
# It was made since requiring "easing" module cuases
# cycle dependensies issue but we need the module.
# So we pass it to the create method and it assigns it to
# already declared easing variable.
#
# @param  {Object} Easing module.
# @return {Function} Mix function.
create = (e)-> easing = e; mix

module.exports = create