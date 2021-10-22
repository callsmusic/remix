export default (string: string, number = 70) => {
  return string.substr(0, number - 1) + (string.length > number ? '...' : '')
}
