import { InlineKeyboard } from 'grammy'
import { tgcalls } from '../../tgcalls'
import { stream, next } from '../streamer'
import { Composer } from '../composer'
import { Context } from '../context'
import { queues } from '../queues'
import { __ } from '../i18n'

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

const getPanelText = (chatId: number, loop: boolean) => {
  const nowItem = queues.getNow(chatId)
  const nextItem = queues.getNext(chatId)
  const now = nowItem?.title || __('nothing_now')
  const next = nextItem?.title || __('nothing_next')
  const nowUrl = nowItem?.url || ''
  const nextUrl = nextItem?.url || ''
  return __('panel', {
    now,
    nowEmoji: loop ? '🔁' : '🎵',
    next,
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
    await ctx.editMessageText(
      getPanelText(ctx.chat.id, ctx.session.loop),
      panelOther
    )
  } catch (_err) {
  } finally {
    if (answer) {
      await ctx.answerCallbackQuery({ text: __('panel_updated') })
    }
  }
}

composer.on('message').command(['menu', 'control', 'controls', 'panel'], ctx =>
  ctx.reply(getPanelText(ctx.chat.id, ctx.session.loop), {
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
            text: __('panel_no_enough_items'),
          })
          return
        }
        await ctx.answerCallbackQuery({
          text: __('panel_shuffling'),
        })
        await stream(ctx, result, true)
        await updatePanel(ctx)
        break
      case 'skip':
        switch (await next(ctx, true)()) {
          case true:
            await ctx.answerCallbackQuery({
              text: __('panel_skipped'),
            })
            await updatePanel(ctx)
            break
          case false:
            await ctx.answerCallbackQuery({
              text: __('panel_not_streaming'),
            })
            break
          case null:
            await ctx.answerCallbackQuery({
              text: __('panel_not_in_call'),
            })
        }
        break
      case 'pause':
        switch (instance.pause()) {
          case true:
            await ctx.answerCallbackQuery({
              text: __('panel_paused'),
            })
            break
          case false:
            await ctx.answerCallbackQuery({
              text: __('panel_not_streaming'),
            })
            break
          case null:
            await ctx.answerCallbackQuery({
              text: __('panel_not_in_call'),
            })
        }
        break
      case 'resume':
        switch (instance.resume()) {
          case true:
            await ctx.answerCallbackQuery({
              text: __('panel_resumed'),
            })
            break
          case false:
            await ctx.answerCallbackQuery({
              text: __('panel_not_paused'),
            })
            break
          case null:
            await ctx.answerCallbackQuery({
              text: __('panel_not_in_call'),
            })
        }
        break
      case 'mute':
        switch (instance.mute()) {
          case true:
            await ctx.answerCallbackQuery({
              text: __('panel_muted'),
            })
            break
          case false:
            await ctx.answerCallbackQuery({
              text: __('panel_already_muted'),
            })
            break
          case null:
            await ctx.answerCallbackQuery({
              text: __('panel_not_in_call'),
            })
        }
        break
      case 'unmute':
        switch (instance.unmute()) {
          case true:
            await ctx.answerCallbackQuery({
              text: __('panel_unmuted'),
            })
            break
          case false:
            await ctx.answerCallbackQuery({
              text: __('panel_not_muted'),
            })
            break
          case null:
            await ctx.answerCallbackQuery({
              text: __('panel_not_in_call'),
            })
        }
        break
      case 'volinc':
        const increment = getIncrement(current)
        if (await instance.edit({ volume: increment })) {
          await ctx.answerCallbackQuery({
            text: __('panel_volume_set', {
              amount: String(Math.round(increment / 100)),
            }),
          })
        } else {
          await ctx.answerCallbackQuery({
            text: __('panel_not_in_call'),
          })
        }
        break
      case 'voldec':
        const decrement = getDecrement(current)
        if (await instance.edit({ volume: decrement })) {
          await ctx.answerCallbackQuery({
            text: __('panel_volume_set', {
              amount: String(Math.round(decrement / 100)),
            }),
          })
        } else {
          await ctx.answerCallbackQuery({
            text: __('panel_not_in_call'),
          })
        }
    }
  }
)
