import { start as startBot } from './bot/index.js'
import { start as startUserbot } from './userbot.js'

Promise.all([startBot(), startUserbot()])
