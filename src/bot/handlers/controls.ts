import { tgcalls } from '../../tgcalls'
import { stream, stop, next } from '../streamer'
import { Composer } from '../composer'
import { queues } from '../queues'

const composer = new Composer().on('message')

export default composer

composer.command('pause', ctx => {
  const result = String(tgcalls(ctx.chat.id).pause())
  return ctx.reply(ctx.t('pause', { result: String(result) }))
})

composer.command(['resume', 're', 'res', 'continue'], ctx => {
  const result = String(tgcalls(ctx.chat.id).resume())
  return ctx.reply(ctx.t('resume', { result }))
})

composer.command(['skip', 'next'], async ctx => {
  const result = String(await next(ctx, true)())
  await ctx.reply(ctx.t('skip', { result }))
})

composer.command(['leave', 'stop'], async ctx => {
  const result = String(await stop(ctx.chat.id))
  await ctx.reply(ctx.t('stop', { result }))
})

composer.command(['volume', 'vol', 'v'], async ctx => {
  const number = Number(ctx.message.text.split(/\s/)[1])
  const valid = number >= 0 && number <= 200
  if (!valid) {
    await ctx.reply(ctx.t('volume.invalid'))
    return
  }
  const volume = Math.round(number * 100) || 1
  if (await tgcalls(ctx.chat.id).edit({ volume })) {
    await ctx.reply(ctx.t('volume.set', { amount: String(number) }))
    return
  }
  await ctx.reply(ctx.t('not-in-call'))
})

composer.command(['mute', 'm'], async ctx => {
  const result = String(tgcalls(ctx.chat.id).mute())
  return ctx.reply(ctx.t('mute', { result }))
})

composer.command(['unmute', 'um'], async ctx => {
  const result = String(tgcalls(ctx.chat.id).unmute())
  return ctx.reply(ctx.t('unmute', { result }))
})

composer.command(['shuffle', 'sh', 'mix'], async ctx => {
  const result = queues.suffle(ctx.chat.id)
  if (result == false) {
    await ctx.reply(ctx.t('shuffle.no-enough-items'))
    return
  }
  await ctx.reply(ctx.t('shuffle.shuffling'))
  await stream(ctx, result, true)
})

composer.command(['loop', 'repeat'], ctx => {
  ctx.session.loop = !ctx.session.loop
  return ctx.reply(ctx.t('loop', { result: String(ctx.session.loop) }))
})
