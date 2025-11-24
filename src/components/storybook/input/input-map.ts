import { TextInput } from './variants/default'
import { PasswordInput } from './variants/password-input'

export enum InputTypes {
  TEXT = 'text',
  PASSWORD = 'password',
  NUMBER = 'number',
}

export const inputMaps = new Map([
  [InputTypes.TEXT, TextInput],
  [InputTypes.PASSWORD, PasswordInput],
])
