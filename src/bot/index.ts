import bot from './bot'
import handlers from './handlers'

bot.use(handlers)

export const start = () =>
  bot.start({
    drop_pending_updates: true,
    allowed_updates: ['message', 'callback_query', 'chat_member']
  })
