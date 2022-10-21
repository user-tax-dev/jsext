JS_SUFFIX = '.js'

BUILDIN = new Set ['fs','stream']

export default (specifier)=>
  if specifier.includes ':'
    return specifier

  li = specifier.split '/'
  if li.length
    if BUILDIN.has li[0]
      return specifier

    if specifier.startsWith '@'
      begin = specifier.indexOf('/',1)+1
    else
      begin = 1

    pos = specifier.indexOf('/',begin)
    if pos > 0 and not li.pop().includes('.')
      specifier+=JS_SUFFIX

  specifier
