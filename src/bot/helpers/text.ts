export const truncate = (string: string, number = 70) =>
  string.substring(0, number - 1) + (string.length > number ? '...' : '')
