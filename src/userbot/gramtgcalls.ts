import { TGCalls } from 'tgcalls-next'
import { EditParams } from 'tgcalls-next/lib/types'
import { client } from '.'

class CustomTGCalls extends TGCalls {
  public volume?: number

  editSelf(params: EditParams) {
    this.volume = params.volume
    return super.edit(params)
  }
}

const instances = new Map<number, CustomTGCalls>()

export default (chatId: number) => {
  if (instances.has(chatId)) {
    return instances.get(chatId)!
  }

  instances.set(chatId, new CustomTGCalls(client, chatId))
  return instances.get(chatId)!
}
