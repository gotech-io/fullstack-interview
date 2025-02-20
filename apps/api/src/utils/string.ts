export const toCamelCase = (str: string): string => {
  str = str.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace('-', '').replace('_', '')
  })
  return str.charAt(0).toLowerCase() + str.slice(1)
}
