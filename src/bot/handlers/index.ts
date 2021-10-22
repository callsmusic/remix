import { Composer } from 'grammy'
import { admins } from '../cache'
import controls from './controls'
import end from './end'
import now from './now'
import panel from './panel'
import playlist from './playlist'
import shuffle from './shuffle'
import search from './search'
import stream from './stream'
import update from './update'
import cache from './cache'
import loop from './loop'

const composer = new Composer()

export default composer

composer
  .filter(ctx =>
    Boolean((ctx.chat || ctx.chatMember?.chat)?.type.includes('group'))
  )
  .use(stream)
  .use(playlist)
  .use(now)
  .use(search)
  .use(end)
  .use(update)

composer
  .filter(async ctx => {
    if (!ctx.chat?.type.includes('group') || !ctx.from) {
      return false
    }

    const chatId = ctx.chat.id

    if (admins.get(chatId) == undefined) {
      const members = (await ctx.api.getChatAdministrators(chatId)).filter(
        member =>
          (member.status == 'creator' ||
            (member.status == 'administrator' &&
              member.can_manage_voice_chats)) &&
          !member.is_anonymous
      )
      admins.set(chatId, [])

      for (const member of members) {
        admins.get(chatId)!.push(member.user.id)
      }
    }

    return admins.get(chatId)!.includes(ctx.from.id)
  })
  .use(controls)
  .use(panel)
  .use(shuffle)
  .use(cache)
  .use(loop)
