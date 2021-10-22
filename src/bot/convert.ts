import { Readable, PassThrough } from 'stream'
import fluent from 'fluent-ffmpeg'

export default function (input: Readable | string) {
  return fluent(input)
    .format('s16le')
    .audioChannels(1)
    .audioFrequency(65000)
    .pipe() as PassThrough
}
