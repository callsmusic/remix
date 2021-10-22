// https://github.com/ollieglass/js-humanize/blob/master/js-humanize.js

export function magnitude(value: number) {
  var mag = 0

  while (value > 1) {
    mag++
    value = value / 10
  }

  return mag
}

export default function (value: number) {
  const mag = magnitude(value)

  if (mag <= 3) return String(value)

  if (mag > 3 && mag <= 6) {
    return String(value).substr(0, mag - 3) + 'K'
  }

  if (mag > 6 && mag <= 9) {
    return String(value).substr(0, mag - 6) + 'M'
  }

  if (mag > 9 && mag <= 12) {
    return String(value).substr(0, mag - 9) + 'B'
  }

  if (mag > 12 && mag <= 15) {
    return String(value).substr(0, mag - 12) + 'T'
  }

  return String(value)
}
