import { start as startBot } from './bot'
import { start as startUserbot } from './userbot'

Promise.all([startBot(), startUserbot()])
