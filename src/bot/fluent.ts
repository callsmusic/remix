import { dirname, join } from 'path'
import { Fluent } from '@moebius/fluent'
import env from '../env.js'

export const fluent = new Fluent()

export const load = () =>
  fluent.addTranslation({
    locales: env.LOCALE,
    filePath: join(
      dirname(new URL(import.meta.url).pathname),
      '../../locales',
      env.LOCALE,
      `messages.ftl`
    ),
  })
