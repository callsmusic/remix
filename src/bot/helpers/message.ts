import { Message } from '@grammyjs/types'

export const getMessageUrl = (message: Message) =>
  `https://t.me/c/${String(message.chat.id).slice(4)}/${message.message_id}`
