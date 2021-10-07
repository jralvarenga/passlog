export const objectMemorySize = (object: any) => {
  let bytes = 0

  const sizeOf = (obj: any) => {
    if(obj !== null && obj !== undefined) {
      switch(typeof obj) {
      case 'number':
        bytes += 8
        break
      case 'string':
        bytes += obj.length * 2
        break
      case 'boolean':
        bytes += 4
        break
      case 'object':
        const objClass = Object.prototype.toString.call(obj).slice(8, -1)
        if(objClass === 'Object' || objClass === 'Array') {
          for(const key in obj) {
            if(!obj.hasOwnProperty(key)) continue
            sizeOf(obj[key])
          }
        } else bytes += obj.toString().length * 2
        break
      }
    }
    return bytes
  }

  const formatByteSize = (bytes: any) => {
    if(bytes < 1024) return bytes + " bytes"
    else return(bytes / 1024).toFixed(3) + " KiB"
  }

  return formatByteSize(sizeOf(object))
}

export const getCloudAvailableSpace = (space: string) => {
  let number: number
  if (space.includes('bytes')) {
    number = parseFloat(space.split(' ')[0])
    number = number/1024
  } else {
    number = parseFloat(space.split(' ')[0])
  }
  return `${(300 - number).toFixed(3)} KiB`
}