import lyricsSearcher from 'lyrics-searcher'
import { Composer } from '../composer'
import { queues } from '../queues'
import { __ } from '../i18n'

const composer = new Composer()

export default composer

composer.command(['ly', 'lyrics'], async ctx => {
  const title = queues.getNow(ctx.chat.id)?.title
  if (!title) {
    await ctx.reply(__('not_streaming'))
    return
  }
  try {
    const lyrics = await lyricsSearcher(title, '')
    await ctx.reply(__('lyrics', { lyrics, title }))
  } catch (err) {
    await ctx.reply(__('lyrics_not_found'))
  }
})
