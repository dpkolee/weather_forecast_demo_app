export const capitalizeFirstLetter = (str: string) => {
  if (str === null || str === undefined) return ''

  return str.charAt(0).toLocaleUpperCase() + str.slice(1)
}

export const getTime = (seconds: number) => {
  return new Date(seconds * 1000).toLocaleTimeString()
}
