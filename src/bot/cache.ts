import { Item } from 'ytsr'
import { Message } from '@grammyjs/types'

export const loop = new Map<number, boolean>()
export const admins = new Map<number, number[]>()
export const searches = new Map<
  number,
  { results: (Item & { type: 'video' })[]; message: Message }
>()
