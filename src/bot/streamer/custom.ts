import { User, Message } from '@grammyjs/types'
import { getMessageUrl } from '../helpers'
import i18n from '../i18n'
import convert from '../convert'
import { stream } from './stream'

export default async (input: string, message: Message) => {
  return await stream(message.chat.id, {
    url: getMessageUrl(message),
    title: i18n('custom_input'),
    requester: message.from as User,
    getReadable: () => convert(input)
  })
}
