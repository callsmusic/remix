import { Context as BaseContext, SessionFlavor } from 'grammy'
import { Session } from './session'

export type Context = BaseContext & SessionFlavor<Session>
