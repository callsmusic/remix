import { Composer } from '../composer'
import { __ } from '../i18n'

const composer = new Composer()

export default composer

composer.command(['loop', 'repeat'], ctx => {
  if (ctx.session.loop) {
    ctx.session.loop = false
    return ctx.reply(__('loop_off'))
  }

  ctx.session.loop = true
  return ctx.reply(__('loop_on'))
})
