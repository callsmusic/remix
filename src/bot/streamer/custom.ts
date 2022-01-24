import { User } from '@grammyjs/types'
import { getMessageUrl } from '../helpers/message'
import { Context } from '../context'
import { stream } from './stream'
import convert from '../convert'

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
