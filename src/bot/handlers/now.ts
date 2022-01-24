import { Composer } from '../composer'
import { queues } from '../queues'

const composer = new Composer()

export default composer

composer.command(['now', 'ns', 'cs', 'np', 'cp'], ctx => {
  const now = queues.getNow(ctx.chat.id)
  if (now) {
    const { title, url, requester } = now
    return ctx.reply(
      ctx.t('now', {
        title,
        titleUrl: url,
        requester: requester.first_name,
        requesterUrl: `tg://user?id=${requester.id}`,
      })
    )
  }
  return ctx.reply(ctx.t('not-streaming'))
})
