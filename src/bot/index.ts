import { Bot } from 'grammy'
import env from '../env.js'
import { Context } from './context.js'
import { session } from './session.js'
import handlers from './handlers/index.js'
import errors from './errors.js'
import { fluent, load } from './fluent.js'
import { useFluent } from '@moebius/grammy-fluent'

export const bot = new Bot<Context>(env.BOT_TOKEN)

bot.use(session)
bot.use(useFluent({ fluent, defaultLocale: env.LOCALE }))

const isSafe = (s: string) => !s.includes(bot.token)

bot.api.config.use((prev, method, payload) =>
  prev(method, {
    parse_mode: 'HTML',
    ...payload,
  })
)

bot.catch(({ ctx, error }) => {
  console.error(error)
  const errors_ = errors(ctx)
  if (error instanceof Error) {
    let { message } = error
    message = message.toLocaleLowerCase()
    for (let key in errors_) {
      let [toInclude, toReply] = errors_[key]
      toInclude = toInclude.toLocaleLowerCase()
      if (message.includes(toInclude)) {
        return ctx.reply(toReply)
      }
    }
    if (isSafe(error.message)) {
      return ctx.reply(ctx.t('errors.error', { message: error.message }))
    }
  }
  return ctx.reply(ctx.t('errors.unknown'))
})

bot.use(handlers)

export const start = () =>
  Promise.all([
    load(),
    bot.start({
      drop_pending_updates: true,
      allowed_updates: ['message', 'callback_query', 'chat_member'],
    }),
  ])
