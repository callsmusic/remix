import ytpl from 'ytpl'
import { Composer } from '../composer'
import { User } from '@grammyjs/types'
import env from '../../env'
import { youtube } from '../streamer'

const composer = new Composer().on('message')

export default composer

composer.command(['playlist', 'pl', 'list'], async ctx => {
  const url =
    ctx.message.reply_to_message?.text || ctx.message.text.split(/\s/)[1]
  if (!url) {
    return
  }
  const items = (
    await ytpl(url, {
      requestOptions: { headers: { Cookie: env.COOKIES } },
    })
  ).items.slice(0, env.MAX_PLAYLIST_SIZE)
  for (let i in items) {
    const result = await youtube(
      ctx,
      ctx.from as User,
      items[i].url,
      items[i].title,
      items[i].url
    )
    if (i == '0') {
      await ctx.reply(
        result == null
          ? ctx.t('playlist.streaming-queuing', { x: String(items.length) })
          : ctx.t('playlist.queuing', { x: String(items.length) })
      )
    }
  }
})
