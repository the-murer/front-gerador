import type React from 'react'
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
import { FileInput, type FileInputProps } from './variants/file-input'
import { BooleanInput, type BooleanInputProps } from './variants/boolean-input'
import { SelectInput, type SelectInputProps } from './variants/select-input'
import {
  QuerySelectableInput,
  type QuerySelectableInputProps,
} from './variants/query-selectable-input'

export enum InputTypes {
  SELECT = 'select',
  TEXT = 'text',
  STRING = 'text',
  PASSWORD = 'password',
  BOOLEAN = 'boolean',
  NUMBER = 'number',
  MULTI_SELECT = 'multi-select',
  QUERY_SELECTABLE = 'query-selectable',
  FILE = 'file',
}

export const inputMaps = new Map<InputTypes, React.ComponentType<any>>([
  [InputTypes.SELECT, SelectInput],
  [InputTypes.TEXT, TextInput],
  [InputTypes.NUMBER, NumberInput],
  [InputTypes.PASSWORD, PasswordInput],
  [InputTypes.BOOLEAN, BooleanInput],
  [InputTypes.QUERY_SELECTABLE, QuerySelectableInput],
  [InputTypes.MULTI_SELECT, MultiSelectInput],
  [InputTypes.FILE, FileInput],
])

export type MappedInputProps = {
  [InputTypes.SELECT]: SelectInputProps
  [InputTypes.TEXT]: TextInputProps
  [InputTypes.NUMBER]: NumberInputProps
  [InputTypes.PASSWORD]: PasswordInputProps
  [InputTypes.BOOLEAN]: BooleanInputProps
  [InputTypes.MULTI_SELECT]: MultiSelectInputProps
  [InputTypes.QUERY_SELECTABLE]: QuerySelectableInputProps
  [InputTypes.FILE]: FileInputProps
}

