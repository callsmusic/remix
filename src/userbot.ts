import { TelegramClient } from 'telegram'
import { Logger } from 'telegram/extensions'
import { StringSession } from 'telegram/sessions'
import { TGCalls } from 'tgcalls-next'
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

class CustomTGCalls extends TGCalls {
  public volume?: number

  editSelf(params: EditParams) {
    this.volume = params.volume
    return super.edit(params)
  }
}

const instances = new Map<number, CustomTGCalls>()

export function tgcalls(chatId: number) {
  if (instances.has(chatId)) {
    return instances.get(chatId)!
  }
  instances.set(chatId, new CustomTGCalls(client, chatId))
  return instances.get(chatId)!
}

export const start = () => client.start({ botAuthToken: '' })
