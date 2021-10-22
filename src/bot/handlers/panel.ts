import { Composer, Context, InlineKeyboard } from 'grammy'
import gramtgcalls from '../../userbot/gramtgcalls'
import queues from '../queues'
import { stream, next } from '../streamer'
import { loop } from '../cache'
import i18n from '../i18n'

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
    .text('🔄', 'panel_update')
}

const getPanelText = (chatId: number) => {
  const nowItem = queues.getNow(chatId)
  const nextItem = queues.getNext(chatId)
  const isLooping = loop.get(chatId)

  const now = nowItem?.title || i18n('nothing_now')
  const next = nextItem?.title || i18n('nothing_next')

  const nowUrl = nowItem?.url || ''
  const nextUrl = nextItem?.url || ''

  return i18n('panel', {
    now,
    nowEmoji: isLooping ? '🔁' : '🎵',
    next,
    nowUrl,
    nextUrl
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

const updatePanel = async (ctx: Context, answer?: boolean) => {
  try {
    await ctx.editMessageText(getPanelText(ctx.chat!.id), panelOther)
  } catch (err) {
  } finally {
    if (answer) {
      await ctx.answerCallbackQuery({ text: i18n('panel_updated') })
    }
  }
}

composer.command(['menu', 'control', 'controls', 'panel'], ctx =>
  ctx.reply(getPanelText(ctx.chat.id), {
    ...panelOther,
    reply_to_message_id: ctx.message?.message_id
  })
)

composer.callbackQuery(/^panel_(.+)$/, async ctx => {
  if (
    !ctx.chat?.id ||
    ctx.from.id != ctx.callbackQuery.message?.reply_to_message?.from?.id
  ) {
    return
  }

  const command = ctx.match?.[1]!
  const current = gramtgcalls(ctx.chat.id).volume

  switch (command) {
    case 'update':
      await updatePanel(ctx, true)
      break
    case 'shuffle':
      const result = queues.suffle(ctx.chat.id)

      if (result == false) {
        await ctx.answerCallbackQuery({
          text: i18n('panel_no_enough_items')
        })
        return
      }

      await ctx.answerCallbackQuery({
        text: i18n('panel_shuffling')
      })
      await stream(ctx.chat.id, result, true)
      await updatePanel(ctx)
      break
    case 'skip':
      switch (await next(ctx.chat.id, true)()) {
        case true:
          await ctx.answerCallbackQuery({
            text: i18n('panel_skipped')
          })
          await updatePanel(ctx)
          break
        case false:
          await ctx.answerCallbackQuery({
            text: i18n('panel_not_streaming')
          })
          break
        case null:
          await ctx.answerCallbackQuery({
            text: i18n('panel_not_in_call')
          })
      }
      break
    case 'pause':
      switch (gramtgcalls(ctx.chat.id).pauseAudio()) {
        case true:
          await ctx.answerCallbackQuery({
            text: i18n('panel_paused')
          })
          break
        case false:
          await ctx.answerCallbackQuery({
            text: i18n('panel_not_streaming')
          })
          break
        case null:
          await ctx.answerCallbackQuery({
            text: i18n('panel_not_in_call')
          })
      }
      break
    case 'resume':
      switch (gramtgcalls(ctx.chat.id).resumeAudio()) {
        case true:
          await ctx.answerCallbackQuery({
            text: i18n('panel_resumed')
          })
          break
        case false:
          await ctx.answerCallbackQuery({
            text: i18n('panel_not_paused')
          })
          break
        case null:
          await ctx.answerCallbackQuery({
            text: i18n('panel_not_in_call')
          })
      }
      break
    case 'mute':
      switch (gramtgcalls(ctx.chat.id).muteAudio()) {
        case true:
          await ctx.answerCallbackQuery({
            text: i18n('panel_muted')
          })
          break
        case false:
          await ctx.answerCallbackQuery({
            text: i18n('panel_already_muted')
          })
          break
        case null:
          await ctx.answerCallbackQuery({
            text: i18n('panel_not_in_call')
          })
      }
      break
    case 'unmute':
      switch (gramtgcalls(ctx.chat.id).unmuteAudio()) {
        case true:
          await ctx.answerCallbackQuery({
            text: i18n('panel_unmuted')
          })
          break
        case false:
          await ctx.answerCallbackQuery({
            text: i18n('panel_not_muted')
          })
          break
        case null:
          await ctx.answerCallbackQuery({
            text: i18n('panel_not_in_call')
          })
      }
      break
    case 'volinc':
      const increment = getIncrement(current)

      if (await gramtgcalls(ctx.chat.id).editSelf({ volume: increment })) {
        await ctx.answerCallbackQuery({
          text: i18n('panel_volume_set', {
            amount: String(Math.round(increment / 100))
          })
        })
      } else {
        await ctx.answerCallbackQuery({
          text: i18n('panel_not_in_call')
        })
      }
      break
    case 'voldec':
      const decrement = getDecrement(current)

      if (await gramtgcalls(ctx.chat.id).editSelf({ volume: decrement })) {
        await ctx.answerCallbackQuery({
          text: i18n('panel_volume_set', {
            amount: String(Math.round(decrement / 100))
          })
        })
      } else {
        await ctx.answerCallbackQuery({
          text: i18n('panel_not_in_call')
        })
      }
  }
})
