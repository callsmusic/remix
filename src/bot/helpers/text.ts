export const truncate = (string: string, number = 70) =>
  string.substring(0, number - 1) + (string.length > number ? '...' : '')

export function chunkSubstr(string: string, size: number) {
  const numChunks = Math.ceil(string.length / size)
  const chunks = new Array(numChunks)

  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = string.substring(o, size)
  }

  return chunks.filter(chunk => chunk)
}
