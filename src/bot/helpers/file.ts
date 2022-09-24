import got from 'got'
import env from '../../env.js'
import { bot } from '../index.js'

export const getFile = async (fileId: string) =>
  got.stream(
    `https://api.telegram.org/file/bot${env.BOT_TOKEN}/${
      (await bot.api.getFile(fileId)).file_path
    }`
  )
