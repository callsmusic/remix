import { User } from '@grammyjs/types'
import ytdl, { videoInfo } from 'ytdl-core'
import env from '../../env'
import convert from '../convert'
import { Context } from '../context'
import { stream } from './stream'

const filter = 'audioonly'
const highWaterMark = 1 << 25
export const requestOptions = { Headers: { Cookie: env.COOKIES } }

export default async function (
  ctx: Context & { chat: NonNullable<Context['chat']> },
  requester: User,
  id: string,
  title?: string,
  url?: string
) {
  let info: videoInfo
  if (!title || !url) {
    info = await ytdl.getInfo(id, {
      requestOptions,
    })
    title = info.videoDetails.title
    url = info.videoDetails.video_url
  }
  return await stream(ctx, {
    url,
    title,
    requester,
    getReadables: () => ({
      audio: convert(
        info
          ? ytdl.downloadFromInfo(info, {
              filter:
                info.videoDetails.lengthSeconds != '0' ? filter : undefined,
              highWaterMark,
              requestOptions,
            })
          : ytdl(id, { filter, highWaterMark, requestOptions })
      ),
    }),
  })
}
