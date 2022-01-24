import { InlineKeyboard } from 'grammy'
import escape from 'escape-html'
import { tgcalls } from '../../tgcalls'
import { stream, next } from '../streamer'
import { Composer } from '../composer'
import { Context } from '../context'
import { queues } from '../queues'

const composer = new Composer()

export default composer

const panelOther = {
  disable_web_page_preview: true,
  reply_markup: new InlineKeyboard()
    .text('🔀', 'panel_shuffle')
    .text('⏩', 'panel_skip')
    .text('⏸', 'panel_pause')
    .text('▶️', 'panel_resume')
    .row()
    .text('🔇', 'panel_mute')
    .text('🔈', 'panel_unmute')
    .text('🔉', 'panel_voldec')
    .text('🔊', 'panel_volinc')
    .row()
    .text('🔄', 'panel_update'),
}

const getPanelText = (
  ctx: Context & {
    chat: NonNullable<Context['chat']>
  }
) => {
  const nowItem = queues.getNow(ctx.chat.id)
  const nextItem = queues.getNext(ctx.chat.id)
  const now = nowItem?.title || ctx.t('panel.nothing-now')
  const next = nextItem?.title || ctx.t('panel.nothing-next')
  const nowUrl = nowItem?.url || ''
  const nextUrl = nextItem?.url || ''
  return ctx.t('panel.text', {
    now: escape(now),
    nowEmoji: ctx.session.loop ? '🔁' : '🎵',
    next: escape(next),
    nowUrl,
    nextUrl,
  })
}

const getIncrement = (current?: number) => {
  const toReturn = current ? current + 1000 : 10000
  return toReturn > 20000 ? 20000 : toReturn
}

const getDecrement = (current?: number) => {
  const toReturn = current ? current - 1000 : 5000
  return toReturn < 1 ? 1 : toReturn
}

const updatePanel = async (
  ctx: Context & { chat: NonNullable<Context['chat']> },
  answer?: boolean
) => {
  try {
    await ctx.editMessageText(getPanelText(ctx), panelOther)
  } catch (_err) {
  } finally {
    if (answer) {
      await ctx.answerCallbackQuery({ text: ctx.t('panel.updated') })
    }
  }
}

composer.on('message').command(['menu', 'control', 'controls', 'panel'], ctx =>
  ctx.reply(getPanelText(ctx), {
    ...panelOther,
    reply_to_message_id: ctx.message.message_id,
  })
)

composer.callbackQuery(/^panel_(.+)$/).filter(
  (
    ctx
  ): ctx is typeof ctx & {
    chat: NonNullable<typeof ctx['chat']>
    match: NonNullable<typeof ctx['match']>
  } => {
    return !!(
      ctx.chat &&
      ctx.from.id == ctx.callbackQuery.message?.reply_to_message?.from?.id &&
      ctx.match
    )
  },
  async ctx => {
    const command = ctx.match[1]
    const instance = tgcalls(ctx.chat.id)
    const current = instance.volume
    switch (command) {
      case 'update':
        await updatePanel(ctx, true)
        break
      case 'shuffle':
        const result = queues.suffle(ctx.chat.id)
        if (result == false) {
          await ctx.answerCallbackQuery({
            text: ctx.t('panel.no-enough-items'),
          })
          return
        }
        await ctx.answerCallbackQuery({
          text: ctx.t('panel.shuffling'),
        })
        await stream(ctx, result, true)
        await updatePanel(ctx)
        break
      case 'skip':
        await ctx.answerCallbackQuery({
          text: ctx.t('panel.skip', {
            result: String(await next(ctx, true)()),
          }),
        })
        break
      case 'pause':
        await ctx.answerCallbackQuery({
          text: ctx.t('panel.pause', {
            result: String(instance.pause()),
          }),
        })
        break
      case 'resume':
        await ctx.answerCallbackQuery({
          text: ctx.t('panel.resume', {
            result: String(instance.resume()),
          }),
        })
        break
      case 'mute':
        await ctx.answerCallbackQuery({
          text: ctx.t('panel.mute', {
            result: String(instance.mute()),
          }),
        })
        break
      case 'unmute':
        await ctx.answerCallbackQuery({
          text: ctx.t('panel.unmute', {
            result: String(instance.unmute()),
          }),
        })
        break
      case 'volinc':
        const increment = getIncrement(current)
        if (await instance.edit({ volume: increment })) {
          await ctx.answerCallbackQuery({
            text: ctx.t('panel.volume', {
              amount: String(Math.round(increment / 100)),
            }),
          })
        } else {
          await ctx.answerCallbackQuery({
            text: ctx.t('raw-not-in-call'),
          })
        }
        break
      case 'voldec':
        const decrement = getDecrement(current)
        if (await instance.edit({ volume: decrement })) {
          await ctx.answerCallbackQuery({
            text: ctx.t('panel.volume', {
              amount: String(Math.round(decrement / 100)),
            }),
          })
        } else {
          await ctx.answerCallbackQuery({
            text: ctx.t('raw-not-in-call'),
          })
        }
    }
  }
)
