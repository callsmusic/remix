import { TelegramClient } from 'telegram'
import { Logger } from 'telegram/extensions'
import { StringSession } from 'telegram/sessions'
import { GramTGCalls } from 'tgcalls-next'
import { EditParams } from 'tgcalls-next/lib/types'
import env from './env'

Logger.setLevel('none')

export const client = new TelegramClient(
  new StringSession(env.STRING_SESSION),
  env.API_ID,
  env.API_HASH,
  {
    connectionRetries: 10,
  }
)

class CustomTGCalls extends GramTGCalls {
  public volume?: number

  editSelf(params: EditParams) {
    this.volume = params.volume
    return super.edit(params)
  }
}

const instances = new Map<number, CustomTGCalls>()

export function tgcalls(chatId: number, onFinish?: () => void) {
  const current = instances.get(chatId)
  if (current) {
    if (onFinish) {
      current.removeAllListeners()
      current.on('finish', onFinish)
    }
    return current
  }
  const tgcalls = new CustomTGCalls(client, chatId)
  if (onFinish) {
    tgcalls.on('finish', onFinish)
  }
  instances.set(chatId, tgcalls)
  return tgcalls
}

export const start = () => client.start({ botAuthToken: '' })
