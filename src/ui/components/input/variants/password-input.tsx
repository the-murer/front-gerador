import { Input } from '@chakra-ui/react'

export type PasswordInputProps = {
  field: any
  fieldState: any
  placeholder?: string
}

export function PasswordInput({ field, placeholder }: PasswordInputProps) {
  return <Input {...field} placeholder={placeholder} type="password" />
}
