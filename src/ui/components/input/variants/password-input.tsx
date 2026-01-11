import { Input } from '@chakra-ui/react'
import type { DefaultBaseInputProps } from '../input-map'
import { Controller } from 'react-hook-form'

export interface PasswordInputProps extends DefaultBaseInputProps {
  placeholder?: string
}

export function PasswordInput({
  name,
  control,
  rules,
  placeholder,
}: PasswordInputProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <Input {...field} placeholder={placeholder} type="password" />
      )}
    />
  )
}
