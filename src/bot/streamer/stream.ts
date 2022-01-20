import { tgcalls } from '../../userbot'
import { queues, Item } from '../queues'
import { Context } from '../context'

export const next =
  (ctx: Context & { chat: NonNullable<Context['chat']> }, force?: boolean) =>
  async () => {
    if (tgcalls(ctx.chat.id).stopped) {
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
    return await tgcalls(ctx.chat.id).stop()
  }

export async function stream(
  ctx: Context & { chat: NonNullable<Context['chat']> },
  item: Item,
  force?: boolean
) {
  const finished = tgcalls(ctx.chat.id).finished != false
  if (finished || force) {
    const getReadablesResult = item.getReadables()
    const readables =
      getReadablesResult instanceof Promise
        ? await getReadablesResult
        : getReadablesResult
    await tgcalls(ctx.chat.id, () => next(ctx)).stream(readables)
    queues.setNow(ctx.chat.id, item)
    return null
  } else {
    const position = queues.push(ctx.chat.id, item)
    return position
  }
}
