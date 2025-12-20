import { Input } from '@chakra-ui/react'

export type TextInputProps = {
  field: any
  fieldState: any
  placeholder?: string
}

export function TextInput({ field, placeholder }: TextInputProps) {
  return <Input {...field} placeholder={placeholder} type="text" />
}
