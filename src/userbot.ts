import { TelegramClient } from 'telegram'
import { StringSession } from 'telegram/sessions/index.js'
import { LogLevel } from 'telegram/extensions/Logger.js'
import env from './env.js'

export const client = new TelegramClient(
  new StringSession(env.STRING_SESSION),
  env.API_ID,
  env.API_HASH,
  {
    connectionRetries: 10,
  }
)

client.setLogLevel(LogLevel.NONE)

export const start = () => client.start({ botAuthToken: '' })
