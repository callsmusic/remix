export const getIncrement = (current?: number) => {
  const toReturn = current ? current + 1000 : 10000
  return toReturn > 20000 ? 20000 : toReturn
}

export const getDecrement = (current?: number) => {
  const toReturn = current ? current - 1000 : 5000
  return toReturn < 1 ? 1 : toReturn
}
