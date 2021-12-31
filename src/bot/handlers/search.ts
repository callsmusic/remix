import { Composer } from '../composer'
import ytsr, { Item } from 'ytsr'
import env from '../../env'
import { truncate } from '../helpers/text'
import { humanize } from '../helpers/humanize'
import { numberEmojis } from '../constants'
import { youtube } from '../streamer'
import { __ } from '../i18n'

const composer = new Composer().on('message')

export default composer

composer.command(['search', 'find'], async ctx => {
  if (ctx.session.search) {
    await ctx.reply(__('search_active'))
    return
  }
  const query = ctx.msg.text.split(' ').slice(1).join(' ')
  if (!query) {
    await ctx.reply(__('no_query'))
    return
  }
  const results = (
    await ytsr(query, {
      limit: 10,
      requestOptions: { headers: { Cookie: env.COOKIES } }
    })
  ).items.filter(v => v.type == 'video') as (Item & { type: 'video' })[]
  if (!results) {
    await ctx.reply(__('no_results_found'))
    return
  }
  let text = ''
  text += __('search_header', { query }) + '\n\n'
  for (let i = 0; i < results.length; i++) {
    const result = results[i]
    text +=
      __('search_result', {
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
  text += __('search_footer')
  const message = await ctx.reply(text, { disable_web_page_preview: true })
  ctx.session.search = { results, message }
})

composer.command('cancel', async ctx => {
  const search = ctx.session.search
  if (search) {
    try {
      await ctx.api.deleteMessage(ctx.chat.id, search.message.message_id)
    } catch (_err) {}
    ctx.session.search = undefined
    await ctx.reply(__('search_canceled'))
    return
  }
  await ctx.reply(__('search_not_active'))
})

composer.filter(
  ctx => !!(ctx.session.search && Number(ctx.message.text)),
  async ctx => {
    const search = ctx.session.search
    if (!search) {
      return
    }
    const item = search.results[Number(ctx.msg.text) - 1]
    if (item) {
      const result = await youtube(ctx, ctx.from, item.id, item.title, item.url)
      try {
        await ctx.api.deleteMessage(ctx.chat.id, search.message.message_id)
      } catch (_err) {}
      ctx.session.search = undefined
      if (result == null) {
        await ctx.reply(__('streaming'))
        return
      }
      await ctx.reply(__('queued_at', { position: String(result) }))
    }
  }
)
