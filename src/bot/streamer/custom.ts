import { User } from '@grammyjs/types'
import { getMessageUrl } from '../helpers/message'
import i18n from '../i18n'
import convert from '../convert'
import { stream } from './stream'
import { Context } from '../context'

export default async (
  ctx: Context & {
    chat: NonNullable<Context['chat']>
    from: NonNullable<Context['from']>
    message: NonNullable<Context['message']>
  },
  input: string
) => {
  return await stream(ctx, {
    url: getMessageUrl(ctx.message),
    title: i18n('custom_input'),
    requester: ctx.from as User,
    getReadable: () => convert(input)
  })
}
