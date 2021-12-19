import { Composer } from '../composer'
import i18n from '../i18n'

const composer = new Composer()

export default composer

composer.command(['loop', 'repeat'], ctx => {
  if (ctx.session.loop) {
    ctx.session.loop = false
    return ctx.reply(i18n('loop_off'))
  }

  ctx.session.loop = true
  return ctx.reply(i18n('loop_on'))
})
