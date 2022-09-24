import { Composer } from '../composer.js'
import chatMemberUpdated from './chat_member_updated.js'
import controls from './controls.js'
import playlist from './playlist.js'
import search from './search.js'
import stream from './stream.js'
import lyrics from './lyrics.js'
import cache from './cache.js'
import panel from './panel.js'
import now from './now.js'

const composer = new Composer()

export default composer

composer.use(chatMemberUpdated)

composer
  .on('message')
  .filter(ctx => !!ctx.chat?.type.includes('group'))
  .use(stream)
  .use(playlist)
  .use(now)
  .use(search)
  .use(lyrics)

composer
  .filter(async ctx => {
    if (!ctx.chat?.type.includes('group') || !ctx.from) {
      return false
    }
    const chatId = ctx.chat.id
    if (ctx.session.admins.length == 0) {
      const members = (await ctx.api.getChatAdministrators(chatId)).filter(
        member =>
          (member.status == 'creator' ||
            (member.status == 'administrator' &&
              member.can_manage_video_chats)) &&
          !member.is_anonymous
      )
      ctx.session.admins = []
      for (const member of members) {
        ctx.session.admins.push(member.user.id)
      }
    }
    return ctx.session.admins.includes(ctx.from.id)
  })
  .use(panel)
  .use(cache)
  .on('message')
  .use(controls)
