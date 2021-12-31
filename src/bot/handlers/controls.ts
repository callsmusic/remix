import { tgcalls } from '../../userbot'
import { stream, stop, next } from '../streamer'
import { Composer } from '../composer'
import { queues } from '../queues'
import { __ } from '../i18n'

const composer = new Composer().on('message')

export default composer

composer.command('pause', ctx => {
  switch (tgcalls(ctx.chat.id).pause()) {
    case true:
      return ctx.reply(__('paused'))
    case false:
      return ctx.reply(__('not_streaming'))
    case null:
      return ctx.reply(__('not_in_call'))
  }
})

composer.command(['resume', 're', 'res', 'continue'], ctx => {
  switch (tgcalls(ctx.chat.id).resume()) {
    case true:
      return ctx.reply(__('resumed'))
    case false:
      return ctx.reply(__('not_paused'))
    case null:
      return ctx.reply(__('not_in_call'))
  }
})

composer.command(['skip', 'next'], async ctx => {
  switch (await next(ctx, true)()) {
    case true:
      return ctx.reply(__('skipped'))
    case false:
      return ctx.reply(__('not_streaming'))
    case null:
      return ctx.reply(__('not_in_call'))
  }
})

composer.command(['leave', 'stop'], async ctx => {
  switch (await stop(ctx.chat.id)) {
    case true:
      return ctx.reply(__('stopped'))
    case false:
      return ctx.reply(__('not_streaming'))
    case null:
      return ctx.reply(__('not_in_call'))
  }
})

composer.command(['volume', 'vol', 'v'], async ctx => {
  const number = Number(ctx.message.text.split(/\s/)[1])
  const valid = number >= 0 && number <= 200
  if (!valid) {
    await ctx.reply(__('invalid_volume'))
    return
  }
  const volume = Math.round(number * 100) || 1
  if (await tgcalls(ctx.chat.id).editSelf({ volume })) {
    await ctx.reply(__('volume_set', { amount: String(number) }))
    return
  }
  await ctx.reply(__('not_in_call'))
})

composer.command(['mute', 'm'], async ctx => {
  switch (tgcalls(ctx.chat.id).mute()) {
    case true:
      return ctx.reply(__('muted'))
    case false:
      return ctx.reply(__('already_muted'))
    case null:
      return ctx.reply(__('not_in_call'))
  }
})

composer.command(['unmute', 'um'], async ctx => {
  switch (tgcalls(ctx.chat.id).unmute()) {
    case true:
      return ctx.reply(__('unmuted'))
    case false:
      return ctx.reply(__('not_muted'))
    case null:
      return ctx.reply(__('not_in_call'))
  }
})

composer.command(['shuffle', 'sh', 'mix'], async ctx => {
  const result = queues.suffle(ctx.chat.id)
  if (result == false) {
    await ctx.reply(__('no_enough_items'))
    return
  }
  await ctx.reply(__('shuffling'))
  await stream(ctx, result, true)
})

composer.command(['loop', 'repeat'], ctx => {
  if (ctx.session.loop) {
    ctx.session.loop = false
    return ctx.reply(__('loop_off'))
  }
  ctx.session.loop = true
  return ctx.reply(__('loop_on'))
})
