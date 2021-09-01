export const reduceIncrementColor = (color: string, format: 'increment' | 'reduce', num: number) => {
  let colorValues: any[] = color.substring(4, color.length-1).replace(/ /g, '').split(',');
  colorValues.map((value: string) => parseInt(value))

  if (format == 'increment') {
    const newColorValues = colorValues.map((value) => value + num)
    const joined = newColorValues.join(',')
    return `rgb(${joined})`
  } else {
    const newColorValues = colorValues.map((value) => value - num)
    const joined = newColorValues.join(',')
    return `rgb(${joined})`
  }
}