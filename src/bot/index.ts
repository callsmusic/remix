import { Bot } from 'grammy'
import env from '../env'
import { Context } from './context'
import { session } from './session'
import handlers from './handlers'
import errors from './errors'
import { __ } from './i18n'

export const bot = new Bot<Context>(env.BOT_TOKEN)

bot.use(session)

const isSafe = (s: string) => {
  return !s.includes(bot.token)
}

bot.api.config.use((prev, method, payload) => {
  return prev(method, {
    parse_mode: 'HTML',
    ...payload
  })
})

bot.catch(({ ctx, error }) => {
  console.error(error)
  if (error instanceof Error) {
    let { message } = error
    message = message.toLocaleLowerCase()
    for (let key in errors) {
      let [toInclude, toReply] = errors[key]
      toInclude = toInclude.toLocaleLowerCase()
      if (message.includes(toInclude)) {
        return ctx.reply(toReply)
      }
    }
    if (isSafe(error.message)) {
      return ctx.reply(__('error_with_message', { message: error.message }))
    }
  }
  return ctx.reply(__('error'))
})

bot.use(handlers)

export const start = () =>
  bot.start({
    drop_pending_updates: true,
    allowed_updates: ['message', 'callback_query', 'chat_member']
  })
