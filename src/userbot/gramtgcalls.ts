import { GramTGCalls } from 'gram-tgcalls'
import { EditParams } from 'gram-tgcalls/lib/types'
import { client } from '.'

class CustomGramTGCalls extends GramTGCalls {
  public volume?: number

  editSelf(params: EditParams) {
    this.volume = params.volume
    return super.editSelf(params)
  }
}

const instances = new Map<number, CustomGramTGCalls>()

export default (chatId: number) => {
  if (instances.has(chatId)) {
    return instances.get(chatId)!
  }

  instances.set(chatId, new CustomGramTGCalls(client, chatId))
  return instances.get(chatId)!
}
