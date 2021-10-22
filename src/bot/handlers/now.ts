import { Composer } from 'grammy'
import i18n from '../i18n'
import queues from '../queues'

const composer = new Composer()

export default composer

composer.command(['now', 'ns', 'cs', 'np', 'cp'], ctx => {
  const now = queues.getNow(ctx.chat.id)

  if (now) {
    const { title, url, requester } = now

    return ctx.reply(
      i18n('ns', {
        title,
        titleUrl: url,
        requester: requester.first_name,
        requesterUrl: `tg://user?id=${requester.id}`
      })
    )
  }

  return ctx.reply(i18n('not_streaming'))
})
