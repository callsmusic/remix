import { Composer } from '../composer'
import { stream } from '../streamer'
import { queues } from '../queues'
import { __ } from '../i18n'

const composer = new Composer()

export default composer

composer.command(['shuffle', 'sh', 'mix'], async ctx => {
  const result = queues.suffle(ctx.chat.id)

  if (result == false) {
    await ctx.reply(__('no_enough_items'))
    return
  }

  await ctx.reply(__('shuffling'))
  await stream(ctx, result, true)
})
