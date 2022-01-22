import { Api } from 'telegram'
import { GramTGCalls, EditParams } from 'tgcalls-next'
import { client } from './userbot'

class TGCalls extends GramTGCalls {
  volume?: number

  edit(params: EditParams, participant?: Api.TypeEntityLike) {
    this.volume = params.volume
    return super.edit(params, participant)
  }
}

const instances = new Map<number, TGCalls>()

export function tgcalls(chatId: number) {
  let instance = instances.get(chatId)
  if (instance) {
    return instance
  }
  instance = new TGCalls(client, chatId)
  instances.set(chatId, instance)
  return instance
}
