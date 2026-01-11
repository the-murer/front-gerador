import { Input } from '@chakra-ui/react'
import type { DefaultBaseInputProps } from '../input-map'
import { Controller } from 'react-hook-form'

export interface TextInputProps extends DefaultBaseInputProps {
  placeholder?: string
}

export function TextInput({
  name,
  control,
  rules,
  placeholder,
}: TextInputProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <Input {...field} placeholder={placeholder} type="text" />
      )}
    />
  )
}
