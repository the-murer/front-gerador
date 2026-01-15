import { TextInput, type TextInputProps } from './variants/default'
import {
  MultiSelectInput,
  type MultiSelectInputProps,
} from './variants/multi-select'
import {
  PasswordInput,
  type PasswordInputProps,
} from './variants/password-input'
import { NumberInput, type NumberInputProps } from './variants/number-input'
import type { Control, FieldValues, Path } from 'react-hook-form'
import { FileInput, type FileInputProps } from './variants/file-input'

export enum InputTypes {
  TEXT = 'text',
  PASSWORD = 'password',
  NUMBER = 'number',
  MULTI_SELECT = 'multi-select',
  FILE = 'file',
}

export const inputMaps = new Map([
  [InputTypes.TEXT, TextInput],
  [InputTypes.NUMBER, NumberInput],
  [InputTypes.PASSWORD, PasswordInput],
  [InputTypes.MULTI_SELECT, MultiSelectInput],
  [InputTypes.FILE, FileInput],
])

export type MappedInputProps = {
  [InputTypes.TEXT]: TextInputProps
  [InputTypes.NUMBER]: NumberInputProps
  [InputTypes.PASSWORD]: PasswordInputProps
  [InputTypes.MULTI_SELECT]: MultiSelectInputProps
  [InputTypes.FILE]: FileInputProps
}

export type DefaultBaseInputProps<TFieldValues extends FieldValues = FieldValues> = {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  rules?: any
  placeholder?: string
}
