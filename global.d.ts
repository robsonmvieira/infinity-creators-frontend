import type commonMessages from './src/messages/pt-BR/common.json'

type Messages = typeof commonMessages

declare global {
  interface IntlMessages extends Messages {}
}
