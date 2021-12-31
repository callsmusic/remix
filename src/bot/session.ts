import { Item } from 'ytsr'
import { session as session_ } from 'grammy'
import { Message } from '@grammyjs/types'

export interface Session {
  admins: number[]
  search?: { results: (Item & { type: 'video' })[]; message: Message }
  loop: boolean
}

export const initial = (): Session => ({ admins: [], loop: false })

export const session = session_({ initial })
