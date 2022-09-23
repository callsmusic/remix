import { User } from '@grammyjs/types'
import { getMessageUrl } from '../helpers/message.js'
import { Context } from '../context.js'
import { stream } from './stream.js'
import convert from '../convert.js'

export default (
  ctx: Context & {
    chat: NonNullable<Context['chat']>
    from: NonNullable<Context['from']>
    message: NonNullable<Context['message']>
  },
  input: string
) =>
  stream(ctx, {
    url: getMessageUrl(ctx.message),
    title: ctx.t('inputs.custom'),
    requester: ctx.from as User,
    getReadables: () => ({ audio: convert(input) }),
  })
