import { Composer } from 'grammy'
import { loop } from '../cache'
import i18n from '../i18n'

const composer = new Composer()

export default composer

composer.command(['loop', 'repeat'], ctx => {
  if (loop.get(ctx.chat.id)) {
    loop.set(ctx.chat.id, false)
    return ctx.reply(i18n('loop_off'))
  }

  loop.set(ctx.chat.id, true)
  return ctx.reply(i18n('loop_on'))
})
