import { Composer } from 'grammy'
import { loop, admins, searches } from '../cache'
import i18n from '../i18n'

const composer = new Composer()

export default composer

composer.command(['cache', 'caches'], ctx => {
  loop.delete(ctx.chat.id)
  admins.delete(ctx.chat.id)
  searches.delete(ctx.chat.id)
  return ctx.reply(i18n('caches_deleted'))
})
