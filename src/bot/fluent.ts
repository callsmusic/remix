import { Fluent } from '@moebius/fluent'
import env from '../env'

export const fluent = new Fluent()

export const load = () =>
  fluent.addTranslation({
    locales: env.LOCALE,
    filePath: `locales/${env.LOCALE}.ftl`,
  })
