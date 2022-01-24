import lyricsSearcher from 'lyrics-searcher'
import escape from 'escape-html'
import { Composer } from '../composer'
import { queues } from '../queues'
import { chunkSubstr } from '../helpers/text'

const composer = new Composer()

export default composer

composer.command(['ly', 'lyrics'], async ctx => {
  const title = queues.getNow(ctx.chat.id)?.title
  if (!title) {
    await ctx.reply(ctx.t('not-streaming'))
    return
  }
  let lyrics
  try {
    lyrics = await lyricsSearcher(title, 'a')
  } catch (err) {
    await ctx.reply(ctx.t('lyrics.not-found'))
    return
  }
  const chunks = chunkSubstr(
    ctx.t('lyrics.lyrics', { lyrics: escape(lyrics), title: escape(title) }),
    4096
  )
  for (const chunk of chunks) {
    await ctx.reply(chunk)
  }
})
