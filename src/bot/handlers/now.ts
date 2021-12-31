import { Composer } from '../composer'
import { queues } from '../queues'
import { __ } from '../i18n'

const composer = new Composer()

export default composer

composer.command(['now', 'ns', 'cs', 'np', 'cp'], ctx => {
  const now = queues.getNow(ctx.chat.id)
  if (now) {
    const { title, url, requester } = now
    return ctx.reply(
      __('ns', {
        title,
        titleUrl: url,
        requester: requester.first_name,
        requesterUrl: `tg://user?id=${requester.id}`,
      })
    )
  }
  return ctx.reply(__('not_streaming'))
})
