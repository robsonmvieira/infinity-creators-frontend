import { Container } from 'inversify'
import { TYPES } from './types'
import { KyHttpClient, type HttpClient } from '../http/http-client'

const container = new Container()

// --- HttpClient (singleton) ---
container
  .bind<HttpClient>(TYPES.HttpClient)
  .toDynamicValue(() => new KyHttpClient())
  .inSingletonScope()

export { container }
