import { Composer } from 'grammy'
import { stop } from '../streamer'

const composer = new Composer()

export default composer

composer.on(':voice_chat_ended', ctx => {
  console.log(1)
  stop(ctx.chat.id)
})
