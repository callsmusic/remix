import { getFile } from '../helpers/file'
import { getMessageUrl } from '../helpers/message'
import convert from '../convert'
import { stream } from './stream'
import { Context } from '../context'

export default async (
  ctx: Context & {
    chat: NonNullable<Context['chat']>
    from: NonNullable<Context['from']>
    message: NonNullable<Context['message']>
  }
) => {
  const chatId = ctx.chat.id,
    audio = ctx.message.audio || ctx.message.reply_to_message?.audio,
    voice = ctx.message.voice || ctx.message.reply_to_message?.voice,
    fileId = String((audio || voice)?.file_id)

  return await stream(ctx, {
    url: getMessageUrl(ctx.message),
    title: audio ? audio.title || 'Audio file' : 'Voice message',
    requester: ctx.from,
    getReadable: async () => convert(await getFile(fileId))
  })
}
