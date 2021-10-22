import { Composer } from 'grammy'
import ytsr from 'ytsr'
import { Item } from 'ytsr'
import env from '../../env'
import { youtube } from '../streamer'
import { numberEmojis } from '../constants'
import { humanize, truncate } from '../helpers'
import { searches } from '../cache'
import i18n from '../i18n'

const composer = new Composer()

export default composer

composer.command(['search', 'find'], async ctx => {
  if (searches.has(ctx.chat.id)) {
    await ctx.reply(i18n('search_active'))
    return
  }

  const query = ctx.message?.text.split(' ').slice(1).join(' ')

  if (!query) {
    await ctx.reply(i18n('no_query'))
    return
  }

  const results = (
    await ytsr(query, {
      limit: 10,
      requestOptions: { headers: { Cookie: env.COOKIES } }
    })
  ).items.filter(v => v.type == 'video') as (Item & { type: 'video' })[]

  if (!results) {
    await ctx.reply(i18n('no_results_found'))
    return
  }

  let text = ''

  text += i18n('search_header', { query }) + '\n\n'

  for (let i = 0; i < results.length; i++) {
    const result = results[i]

    text +=
      i18n('search_result', {
        numberEmoji: numberEmojis.get(i + 1)!,
        title: truncate(result.title),
        url: result.url,
        durationEmoji: result.isLive ? '🔴' : '🕓',
        duration: result.isLive ? 'Live' : result.duration || 'N/A',
        views: result.views ? humanize(result.views) : 'N/A',
        uploadTime: result.uploadedAt || 'N/A',
        uploader: result.author?.name || 'N/A'
      }) + '\n\n'
  }

  text += i18n('search_footer')
  const message = await ctx.reply(text, { disable_web_page_preview: true })
  searches.set(ctx.chat.id, { results, message })
})

composer.command('cancel', async ctx => {
  const search = searches.get(ctx.chat.id)

  if (search) {
    try {
      await ctx.api.deleteMessage(ctx.chat!.id, search.message.message_id)
    } catch (err) {}

    searches.delete(ctx.chat.id)
    await ctx.reply(i18n('search_canceled'))
    return
  }

  await ctx.reply(i18n('search_not_active'))
})

composer.filter(
  ctx => {
    if (!ctx.chat || !ctx.message?.text) {
      return false
    }

    if (searches.get(ctx.chat.id) && Number(ctx.message.text)) {
      return true
    }

    return false
  },
  async ctx => {
    if (!ctx.chat) {
      return
    }

    const search = searches.get(ctx.chat!.id)

    if (!search) {
      return
    }

    const item = search.results[Number(ctx.message!.text) - 1]

    if (item) {
      const result = await youtube(
        ctx.chat!.id,
        ctx.from!,
        item.id,
        item.title,
        item.url
      )

      try {
        await ctx.api.deleteMessage(ctx.chat!.id, search.message.message_id)
      } catch (err) {}

      searches.delete(ctx.chat!.id)

      if (result == null) {
        await ctx.reply(i18n('streaming'))
        return
      }

      await ctx.reply(i18n('queued_at', { position: String(result) }))
    }
  }
)
