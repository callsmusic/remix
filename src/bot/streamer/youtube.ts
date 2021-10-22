import { videoInfo } from 'ytdl-core'
import ytdl from 'ytdl-core'
import { User } from '@grammyjs/types'
import env from '../../env'
import { stream } from './stream'
import convert from '../convert'

const filter = 'audioonly'
const highWaterMark = 1 << 25
export const requestOptions = { Headers: { Cookie: env.COOKIES } }

export default async function (
  chatId: number,
  requester: User,
  id: string,
  title?: string,
  url?: string
) {
  let info: videoInfo

  if (!title || !url) {
    info = await ytdl.getInfo(id, {
      requestOptions
    })
    title = info.videoDetails.title
    url = info.videoDetails.video_url
  }

  return await stream(chatId, {
    url,
    title,
    requester,
    getReadable: () =>
      convert(
        info
          ? ytdl.downloadFromInfo(info, {
              filter:
                info.videoDetails.lengthSeconds != '0' ? filter : undefined,
              highWaterMark,
              requestOptions
            })
          : ytdl(id, { filter, highWaterMark, requestOptions })
      )
  })
}
