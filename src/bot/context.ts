import { Context as BaseContext, SessionFlavor } from 'grammy'
import { FluentContextFlavor } from '@moebius/grammy-fluent'
import { Session } from './session'

export type Context = BaseContext & SessionFlavor<Session> & FluentContextFlavor
