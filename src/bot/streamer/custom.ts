import { User } from '@grammyjs/types'
import { getMessageUrl } from '../helpers/message'
import { Context } from '../context'
import { stream } from './stream'
import convert from '../convert'
import { __ } from '../i18n'

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
    title: __('custom_input'),
    requester: ctx.from as User,
    getReadable: () => convert(input)
  })
}
