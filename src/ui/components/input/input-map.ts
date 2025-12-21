import { TextInput } from './variants/default'
import { MultiSelectInput } from './variants/multi-select'
import { PasswordInput } from './variants/password-input'

export enum InputTypes {
  TEXT = 'text',
  PASSWORD = 'password',
  NUMBER = 'number',
  MULTI_SELECT = 'multi-select',
}

export const inputMaps = new Map([
  [InputTypes.TEXT, TextInput],
  [InputTypes.PASSWORD, PasswordInput],
  [InputTypes.MULTI_SELECT, MultiSelectInput],
])
