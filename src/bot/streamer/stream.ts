import { tgcalls } from '../../tgcalls'
import { queues, Item } from '../queues'
import { Context } from '../context'

export const next =
  (ctx: Context & { chat: NonNullable<Context['chat']> }, force?: boolean) =>
  async () => {
    const instance = tgcalls(ctx.chat.id)
    if (instance.stopped) {
      return false
    }
    if (ctx.session.loop && !force) {
      const now = queues.getNow(ctx.chat.id)
      if (now) {
        await stream(ctx, now)
        return true
      }
    }
    const item = queues.get(ctx.chat.id)
    if (item) {
      await stream(ctx, item, true)
      return true
    }
    return await instance.stop()
  }

export async function stream(
  ctx: Context & { chat: NonNullable<Context['chat']> },
  item: Item,
  force?: boolean
) {
  const instance = tgcalls(ctx.chat.id)
  if (!instance.listenerCount('call-discarded')) {
    instance.on('call-discarded', () => queues.clear(ctx.chat.id))
  }
  const finished = instance.finished != false
  if (finished || force) {
    await instance.stream(await item.getReadables())
    instance.once('finish', () => next(ctx))
    queues.setNow(ctx.chat.id, item)
    return null
  } else {
    const position = queues.push(ctx.chat.id, item)
    return position
  }
}
