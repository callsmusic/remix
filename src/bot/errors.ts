import { Context } from './context'

export default (ctx: Context) => [
  ['No active group call', ctx.t('errors.no-call')],
  ['No video id found', ctx.t('errors.no-video-found')],
  ['Too big', ctx.t('errors.file-too-big')],
  ['Could not find the input entity for', ctx.t('errors.no-assistant')],
]
