import { join, dirname } from 'path'
import { Fluent } from '@moebius/fluent'
import env from '../env'

export const fluent = new Fluent()

export const load = () =>
  fluent.addTranslation({
    locales: env.LOCALE,
    filePath: join(
      dirname(dirname(__dirname)),
      'locales',
      env.LOCALE,
      `messages.ftl`
    ),
  })
