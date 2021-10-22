import { InlineKeyboard } from 'grammy'
import env from '../env'

export const headers = { Cookie: env.COOKIES }

export const numberEmojis = new Map([
  [1, '1️⃣'],
  [2, '2️⃣'],
  [3, '3️⃣'],
  [4, '4️⃣'],
  [5, '5️⃣'],
  [6, '6️⃣'],
  [7, '7️⃣'],
  [8, '8️⃣'],
  [9, '9️⃣'],
  [10, '🔟']
])

export const panelOther = {
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
